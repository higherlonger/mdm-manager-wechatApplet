const basePath = "http://192.168.1.110:8080/hrms/wx/";
App({
  onLaunch: function () {
    var _this=this;

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: _this.globalData.login,
          data: {
            code: res.code,
            type:1
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log("success:" + res.data)
            let openid = res.data.data.openid;
            //openid = "oTPru06arCL3hgLaxHHqIxefcXcw";
            console.log(openid);
            _this.globalData.openid = openid;
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
          wx.navigateTo({
            url: '/pages/checkInfo/checkInfo'
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    userId: "",
    warehouseId: "",
    checkList: basePath + "manager/querycheckList",
    notice: basePath + "manager/queryNotice",
    replyCheck: basePath + "manager/replyCheck",
    checkResult: basePath + "manager/applyCheckResult",
    addressBook: basePath + "manager/getAddressbookList",
    launchCheck: basePath + "manager/launchCheck",
    showJobs: basePath + "manager/showJobs",
    listStore: basePath + "manager/listStore",
    login: basePath + "common/wxLogin",
    check: basePath + "common/login"
  }
})