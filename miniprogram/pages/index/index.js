// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lunboList: ['cloud://mydemo-1.6d79-mydemo-1-1300749996/lunbo/lunbo1.jpg', 'cloud://mydemo-1.6d79-mydemo-1-1300749996/lunbo/lunbo2.jpg', 'cloud://mydemo-1.6d79-mydemo-1-1300749996/lunbo/lunbo3.jpg'],
    goodList:[]
  },
  onGoGood() {
    console.log('a')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.cloud.callFunction({
      name:'showIndexGood'
    }).then(res=>{
      this.setData({
        goodList:res.result.data
      })
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