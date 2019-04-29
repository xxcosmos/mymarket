// pages/wifi/wifi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wifiList: null,
    errMsg: null,
    selectedWifi: null,
    username: '201713137042',
    pwd: '10271027',
    response: null
  },
  connect(res){
    var that = this
    var id = res.target.dataset.id
    var wifi = this.data.wifiList[id]
    console.log(wifi)
    that.setData({
      selectedWifi: wifi
    })
    wx.connectWifi({
      SSID: wifi.SSID,
      BSSID: wifi.BSSID,
      password: '',
      success: (res) => {
        wx.showToast({
          title: "ok",
        })
        that.setData({
          errMsg: res.errMsg
        })
        wx.request({
          url: 'http://202.114.240.108:8080/zportal/login/do',
          method: 'POST',
          data: {
            qrCodeId: '请输入编号',
            username: that.data.username,
            pwd: that.data.pwd,
            validCode: '验证码',
            validCodeFlag: 'false',
            ssid: wifi.SSID,
            mac: wifi.BSSID,
            t: 'wireless-v2-plain',
            wlanacname: '182b6ff913c0d9a508d195bca363a86f',
            nasip: '5340d13e4208e1b891476c890b7f5f5c',
            wlanuserip: "f09df0ee06255f08c28797b2f2383ef8",
          },
          success(res){
            console.log(res.data)
            that.setData({
              response: res.data
            })
          },
          fail(res){
            console.log(res.data)
            that.setData({
              response: res.data
            })
          }

        })
      },
      fail: (res) => {
        wx.showToast({
          title: "fail",
          icon: "none"
        })
        that.setData({
          setWifiInfo: res
        })

      }
    })
    wx.onWifiConnected(function(res){
      wx.showToast({
        title: 'connectToWIFI!',
      })
      
    })
  },
  getWifi() {
    var that = this
    wx.startWifi({})
    wx.onGetWifiList(function(res) {
      if (res.wifiList.length) {
        that.setData({
          wifiList: res.wifiList
        })
      } else {
        wx.showToast({
          title: 'error',
        })
      }
    })
    wx.getWifiList({})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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