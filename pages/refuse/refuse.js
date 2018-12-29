// pages/refuse/refuse.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listid: '',
    reason: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      listid: options.listid
    })
  },
  checkRefuse() {
    console.log("拒绝")
    var _this = this
    wx.showLoading({
      title: '',
    })
    wx.request({
      url: app.globalData.replyCheck,
      data: {
        userId: "2ab92020caa045c39e820e916413ad47",
        status: "1",
        reason: _this.data.reason,
        listId: _this.data.listid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        wx.hideLoading()
        wx.navigateBack();
        // _this.setData({
        //   response: res.data
        // })
      }
    })
  },
  getRefuse(e) {
    console.log(e.detail.value)
    var val = e.detail.value;
    this.setData({
      reason: val
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})