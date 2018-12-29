const app = getApp();
Page({
  data: {
    staffId: '',
    dates: '2016-11-08',
    times: '12:00',
    address: '',
    project: '',
    value: '',
    pic_array: [],
    hx_index: 0,
    add_array: [],
    add_index: 0
  },
  onLoad(options) {
    this.setData({
      staffId: options.staffId
    })
    this.getAddress()
    this.getProject()
  },
  getAddress() {
    var _this = this
    wx.request({
      url: app.globalData.listStore,
      data: {
        staffId: _this.data.staffId,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        var list = res.data.list
        for(var i = 0;i < list.length;i++){
          if (list[i].isDefaultValue == "1"){
            _this.setData({
              add_index: i,
              address: list[i].name
            })
          }
        }
        _this.setData({
          add_array: res.data.list
        })
      }
    })
  },
  getProject() {
    var _this = this
    wx.request({
      url: app.globalData.showJobs,
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        _this.setData({
          pic_array: res.data.list,
          project: res.data.list[0].name,
          value: res.data.list[0].value
        })
      }
    })
  },
  check() {
    console.log("发起考核")
    var _this = this
    var time = this.data.dates + ' ' + this.data.times
    console.log(this.data.address)
    wx.showLoading({
      title: '',
    })
    wx.request({
      url: app.globalData.launchCheck,
      data: {
        managerId: "2ab92020caa045c39e820e916413ad47",
        staffId: _this.data.staffId,
        time: time,
        address: _this.data.address,
        name: _this.data.project,
        value: _this.data.value
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
  bindPickerChange_hx: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    var project = this.data.pic_array[e.detail.value].name
    var value = this.data.pic_array[e.detail.value].value
    this.setData({   //给变量赋值
      hx_index: e.detail.value,  //每次选择了下拉列表的内容同时修改下标然后修改显示的内容，显示的内容和选择的内容一致
      project: project,
      value: value
    })
    // console.log('自定义值:', this.data.hx_select);
  },
  bindPickerChange_add: function (e) {
    console.log('picker发送选择改变，携带值为', e);
    var address = this.data.add_array[e.detail.value].name
    this.setData({   //给变量赋值
      add_index: e.detail.value,  //每次选择了下拉列表的内容同时修改下标然后修改显示的内容，显示的内容和选择的内容一致
      address: address
    })
    console.log(this.data.address)
    // console.log('自定义值:', this.data.hx_select);
  },

})