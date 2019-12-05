// pages/xiangqing/xiangqing.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    good: '',
    xiangqing: ''
  },
  //商品图片预览
  previewImage(e) {
    wx.previewImage({
      current: e.target.dataset.url, // 当前显示图片的http链接
      urls: [e.target.dataset.url] // 需要预览的图片http链接列表
    })
  },
  //添加购物车信息
  addToShopCar() {
    wx.showLoading({
      title: '正在提交',
    })
    //设置需要添加到购物车的商品数据
    let message = this.data.good;
    message.selected = true;
    message.selectedNumber = 1;

    let msg = wx.getStorageSync("goods") || '[]'
    let arr = JSON.parse(msg)
    
    //判断商品是否已经加入购物车
    let temp = arr.some(val => {
      return val._id == message._id
    })
    if(temp) {
      wx.hideLoading();
      wx.showToast({
        title: '已加入，如需改变数量请到购物车页',
        icon:'none'
      })
      return 
    }
    
    arr.unshift(message)
    let str = JSON.stringify(arr)
    wx.setStorageSync('goods', str)
    
    wx.hideLoading();
    wx.showToast({
      title: '加入购物车成功'
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.cloud.callFunction({
      name: 'getGood',
      data: {
        id: options.id
      }
    }).then(res => {
      this.setData({
        good: res.result.data
      })
    })

    wx.cloud.callFunction({
      name: 'getXiangQing',
    }).then(res => {
      this.setData({
        xiangqing: res.result.data[0].xiangqing
      })
    })
  },
  goHome() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  goShopCar() {
    wx.switchTab({
      url: '/pages/shopCar/shopCar',
    })
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

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