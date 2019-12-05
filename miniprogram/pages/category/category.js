// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: '', //所有分类
    categoryTitle:'',//点击bar跳转的具体类别
    message:''  //某个分类下的具体信息
  },

  //获取商品分类的数据
  getCategoryData(category){
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'goodsCategory',
      data: {
        category
      }
    }).then(res2 => {
      this.setData({
        message: res2.result.data
      })
      wx.hideLoading()
    })
  },

  onChange(e) {
    this.setData({
      categoryTitle :e.detail.title
    })

    this.getCategoryData(this.data.categoryTitle)

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


    wx.cloud.callFunction({
      name: 'getCategory'
    }).then(res => {
      this.setData({
        category: res.result.data
      })
      this.getCategoryData('农夫山泉')
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