const api = require('../../api/api.js');
const app = getApp();
import '../../utils/wxPromise.min.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: null,
  },
  submit: function(res){
    console.log(res)
    let data = res.detail.value
    wx.pro.request({
      url: api.good,
      method: 'POST',
      data: {
        userId: app.globalData.user.id,
        title: data.title,
        content: data.content,
        price: data.price,
        categoryId: 1,
      }
    }).then(res=>{
      app.showInfo('发布成功');
      
      wx.pro.switchTab({
        url: '/pages/index/index',
      })
    })
  },
  chooseImg: function(){
    let that = this;
    wx.pro.chooseImage({

    }).then(res=>{
      that.setData({
        tempFilePaths: res.tempFilePaths,
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})