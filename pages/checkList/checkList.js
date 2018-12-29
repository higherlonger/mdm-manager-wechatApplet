const app = getApp();
Page({
  data:{
    selected: true,
    select: false,
    response: {},
    localNotice: "",
    localNotice2: "",
    Number: "",
    userId:""
  },
  onLoad() {
    var _this = this;
    wx.showLoading({
      title: '',
    })
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        _this.setData({
          userId: res.data
        })
        // 处理未读数据数量
        _this.unRead();
        wx.request({
          url: app.globalData.checkList,
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
            wx.hideLoading();
          }
        })
      }
    })
    
    
  },
  onShow() {
    this.onLoad()   
  },
  toDetail(e) {
    // console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    var checkInfo = JSON.stringify(this.data.response.list[index])
    wx.navigateTo({
      url: '../checkDetail/checkDetail?item=' + checkInfo
    })
  },
  makeCall(e) {
    var phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  tabed: function (e) {
    this.setData({
      selected: true,
      select: false
    })
  },
  tab: function (e) {
    this.setData({
      selected: false,
      select: true
    })
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading();

    this.onLoad()//重新请求代码

    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  toNotice() {
    var _this = this;
    for (var i = 0; i < _this.data.localNotice2.length; i++) {
      _this.data.localNotice2[i].status = 1;
    }
    console.log(_this.data.localNotice2)
    _this.setData({
      localNotice: _this.data.localNotice2,
      Number: 0
    })
    wx.setStorage({
      key: 'notice',
      data: JSON.stringify(_this.data.localNotice2),
    })
    wx.navigateTo({
      url: '../notice/notice'
    })
  },
  unRead() {
    var _this = this;
    var noticeFlag = false;
    wx.getStorage({
      key: 'notice',
      success: function (res) {
        let test = JSON.parse(res.data);
        _this.setData({
          localNotice: test,
          localNotice2: test
        })
        noticeFlag = true;
      },
      fail: function () {
        noticeFlag = false;
      }
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
        //res.data.list
        if (noticeFlag == false) {
          // 本地没消息，进行初始化
          _this.initNotice(res.data.list);
          _this.getNumber();
        } else {
          // 更新本地消息
          _this.updateNotice(res.data.list);
          _this.getNumber();
        }
      }
    })
  },
  initNotice(noticeVal) {
    var noticeAry = [];
    for (var i = 0; i < noticeVal.length; i++) {
      noticeAry.push({
        "id": noticeVal[i].id,
        "status": 0
      })
    }
    this.setData({
      localNotice: noticeAry,
      localNotice2: noticeAry
    })
    wx.setStorage({
      key: 'notice',
      data: JSON.stringify(noticeAry)
    })
  },
  updateNotice(noticeVal) {
    var _this = this;
    var timeFlag = false;
    for (var i = 0; i < noticeVal.length; i++) {
      timeFlag = false;
      for (var j = 0; j < _this.data.localNotice.length; j++) {
        if (noticeVal[i].id == _this.data.localNotice[j].id) {
          timeFlag = true;
          break;
        }
      }
      if (!timeFlag) {
        _this.data.localNotice.push({
          "id": noticeVal[i].id,
          "status": 0
        })
      }
    }
    _this.setData({
      localNotice: _this.data.localNotice,
      localNotice2: _this.data.localNotice
    })
    wx.setStorage({
      key: 'notice',
      data: JSON.stringify(_this.data.localNotice)
    })
  },
  getNumber() {
    var _this = this;
    var sum = 0;
    for (var i = 0; i < _this.data.localNotice.length; i++) {
      if (_this.data.localNotice[i].status == 0) {
        sum++;
      }
    }
    _this.setData({
      Number: sum
    })
  }
})