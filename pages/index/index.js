const api = require('../../api/api.js');
const app = getApp();
import '../../utils/wxPromise.min.js'

Page({

  data: {
    goodList: [],
  },

  goDetail: function(res) {
    let info = res.currentTarget.dataset;
    console.log(res)
    let url = '../good/good?';

    for (let key in info) {
      info[key] = encodeURIComponent(info[key]);
      url += key + '=' + info[key] + '&';
    }
    url = url.substring(0, url.length - 1);
    console.log(url)
    wx.navigateTo({
      url: url,
    });
  },

  getGoodList: function() {
    let that = this;
    wx.pro.request({
      url: api.good,
      method: "GET",
    }).then(res => {
      console.log(res)

      if (res.data.code == 200) {
        setTimeout(function() {
          that.setData({
            goodList: res.data.data.list,
          });
        }, 800);
      }
    }).catch(res => {
      console.log(res);
    })
  },

  onLoad: function(res) {
    let that = this;
    that.getGoodList();
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getGoodList();
  },

  onShareAppMessage: function(res) {
    return {
      title: '武科集市',
      path: '/pages/index/index',
      image: '/images/image/wx.png',
    }
  }



})