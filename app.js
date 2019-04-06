const api = require('./api/api.js')
import './utils/wxPromise.min.js'

App({

  onLaunch: function() {
    let that = this;
    that.checkLoginStatus();
  },

  checkLoginStatus: function() {
    let that = this;
    wx.pro.checkSession({

    }).then(res=>{
      let user = wx.getStorageSync('user')
      if(user){
        that.globalData.user = user;
      } else {
        that.showInfo('缓存信息缺失');
        that.doLogin();
      }
    }).catch(res=>{
      that.doLogin();
    })
  },

  doLogin: function() {
    let that = this;
    wx.pro.login({

    }).then(res => {
      if (res.code) {
        wx.pro.getUserInfo({

        }).then(infoRes => {
          wx.pro.request({
            url: api.user,
            method: "POST",
            header: {
              'content-type': 'application/json'
            },
            data: {
              code: res.code,
              userInfo: infoRes.userInfo,
            }

          }).then(res => {
            if (res.data.code == 200) {
              that.globalData.user = res.data.data;
              wx.setStorageSync('user', res.data.data);
            }

          }).catch(err => {
            that.showInfo('调用接口失败');
            console.log(err);
          })
        }).catch(res=>{
          that.showInfo('获取用户信息失败');
        })
      }
    })

  },

  checkUserInfoPermission: function(callback = () => {}) {
    wx.getSetting({
      success: function(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.openSetting({
            success: function(authSetting) {
              console.log(authSetting);
            }
          });
        }
      },
      fail: function(error) {
        console.log(error);
      }
    });
  },



  showInfo: function(info = 'error', icon = 'none') {
    wx.showToast({
      title: info,
      icon: icon,
      duration: 1500,
      mask: true,
    });
  },

  globalData: {
    user: null,
  }

})