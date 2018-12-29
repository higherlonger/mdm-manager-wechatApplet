const app = getApp();
Page({
  data:{
    list:[],
    item:{},
    userId:""
  }, 
  isOpen(e){
    console.log(e)
    var index = e.currentTarget.dataset.index
    var idx = e.currentTarget.dataset.idx
    var item = this.data.item
    var hidden = item.detail[index].list[idx].hidden

    if(hidden){
      item.detail[index].list[idx].hidden = false
    }else{
      item.detail[index].list[idx].hidden = true
    }

    this.setData({
      item: item
    })
    console.log(this.data.item)
  },
  hidden(){
    var item = this.data.item
    console.log(item.detail.length)
    console.log(item.detail[0].list.length)
    for (var i = 0; i<item.detail.length; i++)
    {
      for (var j = 0; j < item.detail[i].list.length; j++)
      {
        item.detail[i].list[j].hidden = true
      }
    }
    console.log(item)
  },
  onLoad(options){
    var _this=this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        _this.setData({
          userId: res.data
        })
      }
    })
    var checkInfo = JSON.parse(options.item)
    this.setData({
      item: checkInfo,
    })
    console.log(this.data.item)
    this.hidden()
  },
  checkPass(){
    var _this = this
    wx.showLoading({
      title: '',
    })
    wx.request({
      url: app.globalData.checkResult,
      data: {
        userId: _this.data.userId,
        checkId: _this.data.item.id,
        address: _this.data.item.department,
        status: "0"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        wx.hideLoading()
        wx.navigateBack();
      }
    })
  },
  checkRefuse(){
    var _this = this
    wx.showModal({
      //提示标题
      title: '考核失败',
      //提示内容
      content: '您要判断该员工考核失败，确定要继续吗？',
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
        if(res.confirm){
          wx.showLoading({
            title: '',
          })
          wx.request({
            url: app.globalData.checkResult,
            data: {
              userId: _this.data.userId,
              checkId: _this.data.item.id,
              address: _this.data.item.department,
              status: "1"
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              console.log(res.data)
              wx.hideLoading()
              wx.navigateBack();
            }
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
  }
})