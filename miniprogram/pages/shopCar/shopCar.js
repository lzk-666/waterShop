// pages/shopCar/shopCar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: '',
    allSelected: true
  },
  //改变商品选中状态
  changeSelected(e) {
    let arr = this.data.goods;
    let allPrice = this.data.allPrice
    arr.some((val, index) => {
      if (val._id == e.target.dataset.id) {
        val.selected = !val.selected;
        //判断商品是取消还是选择从而 判断加钱还是减钱
        if (!val.selected) {
          allPrice -= Number(val.sell_price) * Number(val.selectedNumber) * 100
        } else {
          allPrice += Number(val.sell_price) * Number(val.selectedNumber) * 100
        }
        this.setData({
          goods: arr,
          allPrice
        })
      }
    })
  },
  //改变全选的状态
  changeAllSelected() {
    let goods = this.data.goods;
    let allPrice = this.data.allPrice
    let is = !this.data.allSelected;
    if (is) {
      goods.forEach(val => {
        if (val.selected) return
        val.selected = true;
        allPrice += Number(val.sell_price) * Number(val.selectedNumber) * 100
      })
    } else {
      goods.forEach(val => {
        if (!val.selected) return
        val.selected = false;
        allPrice -= Number(val.sell_price) * Number(val.selectedNumber) * 100
      })
    }
    this.setData({
      goods,
      allSelected: is,
      allPrice
    })

  },
  //添加或者减少商品
  changeNumber(e) {
    let arr = this.data.goods;
    let allPrice = this.data.allPrice;
    arr.some((val, index) => {
      if (val._id == e.target.dataset.id && val.selected) {
        if (e.target.dataset.option == 'add') {
          ++val.selectedNumber
          allPrice += Number(val.sell_price) * 100
        } else {
          if (val.selectedNumber == 1) return --val.selectedNumber
          allPrice -= Number(val.sell_price) * 100
        }
      }
      this.setData({
        goods: arr,
        allPrice
      })
    })

  },

  //删除商品
  deleteGood(e) {
    let arr = this.data.goods;
    let allPrice = this.data.allPrice;
    arr.some((val, index) => {
      if (val._id == e.target.dataset.id) {
        wx.showModal({
          title: '确定删除吗',
          success: (res) => {
            if(res.cancel)return
            arr.splice(index, 1)
            allPrice -= Number(val.sell_price) * Number(val.selectedNumber) * 100
            this.setData({
              goods: arr,
              allPrice
            })
          }
        })

      }
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //获取本地存储的购物车信息
    let str = wx.getStorageSync('goods')
    let goods = JSON.parse(str);
    let allPrice = 0; //所有商品的价格总和
    goods.forEach(val => {
      if (val.selected) {
        allPrice += Number(val.sell_price) * Number(val.selectedNumber)
      }
    })
    this.setData({
      goods,
      allPrice: allPrice * 100
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    //离开购物车页面的时候把购物车最新的商品信息储存到本地缓存
    let data = this.data.goods;
    data = JSON.stringify(data)
    wx.setStorageSync('goods', data)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})