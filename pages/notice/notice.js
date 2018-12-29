const app = getApp();
Page({
  data:{
    response: {
      "code": 1,
      "list": [],
      "userId":""
    }
  },
  onLoad() {
    var _this = this
    wx.showLoading({
      title: '',
    })
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        _this.setData({
          userId: res.data
        })
        wx.request({
          url: app.globalData.notice,
          data: {
            id: _this.data.userId
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res.data)
            _this.setData({
              response: res.data
            })
            wx.hideLoading()
          }
        })
      }
    })
    
  },
  onShow() {
    this.onLoad()
  },
  agree(e){
    var _this = this;
    var listid = e.currentTarget.dataset.staffid
    var id = e.currentTarget.dataset.id
    var orderId = e.currentTarget.dataset.typeId
    console.log(listid)
    wx.navigateTo({
      url: "../agreeCheck/agreeCheck?listid=" + listid + "&id=" + id +"&orderId="+_this.data.orderId
    })
  },
  disagree(e) {
    var _this = this;
    var listid = e.currentTarget.dataset.id
    wx.navigateTo({
      url: "../refuse/refuse?listid=" + listid
    })
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading();

    this.onLoad()//重新请求代码

    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  }
})