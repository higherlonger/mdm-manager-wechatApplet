const app = getApp();
Page({
  data: {
    editIndex: 0,
    delBtnWidth: 160,
    // 当前选择的导航字母
    selected: 0,
    // 选择字母视图滚动的位置id
    scrollIntoView: 'A',
    // 导航字母
    letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
      'U', 'V', 'W', 'X', 'Y', 'Z'],
    response: {},
    // 开始的x点坐标
    startX: '',
    userId:""
  },
  onLoad: function (options) {
    var _this = this
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        _this.setData({
          userId: res.data
        })
       
        wx.showLoading({
          title: '',
        })
        wx.request({
          url: app.globalData.addressBook,
          data: {
            managerId: _this.data.userId
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
    
    
    const res = wx.getSystemInfoSync(),
      letters = this.data.letters;
    // 设备信息
    this.setData({
      windowHeight: res.windowHeight,
      windowWidth: res.windowWidth,
      pixelRatio: res.pixelRatio
    });
    // 第一个字母距离顶部高度，单位使用的是rpx,须除以pixelRatio，才能与touch事件中的数值相加减，css中定义nav高度为94%，所以 *0.94
    const navHeight = this.data.windowHeight * 0.94, // 
      eachLetterHeight = navHeight / 26,
      comTop = (this.data.windowHeight - navHeight) / 2,
      temp = [];

    this.setData({
      eachLetterHeight: eachLetterHeight
    });

    // 求各字母距离设备左上角所处位置

    for (let i = 0, len = letters.length; i < len; i++) {
      const x = this.data.windowWidth - (10 + 50) / this.data.pixelRatio,
        y = comTop + (i * eachLetterHeight);
      temp.push([x, y]);
    }
    this.setData({
      lettersPosition: temp
    })
  },
  launchCheck(e) {
    var index = e.currentTarget.dataset.index
    var idx = e.currentTarget.dataset.idx
    console.log(index, idx)
    var staffId = this.data.response.list[index].users[idx].id
    wx.showModal({
      //提示标题
      title: '发起考核',
      //提示内容
      content: '您要向该员工发起考核么？',
      //是否显示取消按钮，默认true
      showCancel: true,
      //取消按钮文字，默认'取消'
      cancleText: '取消',
      //取消按钮文字颜色，默认'#000000'
      cancelColor: '#000000',
      //确认按钮文字,默认'确认'
      confirmText: '确定',
      //确认按钮文字颜色，默认'#3CC51F'
      confirmColor: '#e64340',
      //调用成功回调函数
      success: function (res) {
        console.log(res);
        //点击确定按钮res内容: Object{errMsg: "showModal:ok", confirm: 1}
        //点击取消按钮res内容: Object{errMsg: "showModal:ok", confirm: 0}
        if (res.confirm) {
          console.log(staffId)
          wx.navigateTo({
            url: '../launchCheck/launchCheck?staffId=' + staffId,
          })
        }
      },
      //调用失败回调函数
      fail: function () {

      },
      //无论调用成功还是失败会执行的回调函数
      complete: function () {

      }
    })
  },
  makeCall(e) {
    var phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  tabLetter(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      selected: index,
      scrollIntoView: index
    })

    this.cleanAcitvedStatus();
  },
  // 清除字母选中状态
  cleanAcitvedStatus() {
    setTimeout(() => {
      this.setData({
        selected: 0
      })
    }, 500);
  }
})
