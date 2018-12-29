const app = getApp();
Page({
  data: {
    id: '',
    listid: '',
    dates: '2016-11-08',
    times: '12:00',
    address: '',
    pic_array: [],
    hx_index: 0,
    userId:"",
    orderId:""
  },
  onLoad(options) {
    console.log("ID="+this.data.orderId)
    var _this=this;
    wx.getStorage({ 
      key: 'userId',
      success: function (res) {
        _this.setData({
          userId: res.data
        })
        // 处理未读数据数量
        _this.unRead();
      }
    })
    this.setData({
      listid: options.listid,
      id: options.id,
      orderId:options.orderId
    })
    this.getAddress()
    console.log(this.data.address)
  },
  getAddress() {
    var _this = this
    console.log(this.data.listid)
    wx.request({
      url: app.globalData.listStore,
      data: {
        staffId: _this.data.listid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        var list = res.data.list
        for (var i = 0; i < list.length; i++) {
          if (list[i].isDefaultValue == "1") {
            _this.setData({
              hx_index: i,
              address: list[i].name
            })
          }
        }
        _this.setData({
          pic_array: res.data.list
        })
      }
    })
  },
  checkAgree () {
    console.log("同意")
    var _this = this
    var time = this.data.dates +' ' + this.data.times
    wx.showLoading({
      title: '',
    })
    wx.request({
      url: app.globalData.replyCheck,
      data: {
        userId: _this.data.userId,
        status: "0",
        time:time,
        address: _this.data.address,
        listId: _this.data.id,
        typeId: _this.orderId
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
  bindTimeChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      times: e.detail.value
    })
  },  //  点击日期组件确定事件
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  // bindPickerChange_hx: function (e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value);
  //   this.setData({   //给变量赋值
  //     hx_index: e.detail.value,  //每次选择了下拉列表的内容同时修改下标然后修改显示的内容，显示的内容和选择的内容一致
  //   })
  //   // console.log('自定义值:', this.data.hx_select);
  // },
  bindPickerChange_hx: function (e) {
    console.log('picker发送选择改变，携带值为', e);
    var address = this.data.pic_array[e.detail.value].name
    this.setData({   //给变量赋值
      hx_index: e.detail.value,  //每次选择了下拉列表的内容同时修改下标然后修改显示的内容，显示的内容和选择的内容一致
      address: address
    })
    console.log(this.data.address)
    // console.log('自定义值:', this.data.hx_select);
  },

})