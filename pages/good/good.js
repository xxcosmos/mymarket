// pages/good/good.js
const api = require('../../api/api.js');
const app = getApp();
import '../../utils/wxPromise.min.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodInfo: null,
    goodId: null,
    commentList: [],
  },
  goComment: function(){
    app.showInfo('此功能不开发了 呜呜呜');
  },
  getGoodInfo: function() {
    let that = this;
    console.log(that.data.goodId)
    wx.pro.request({
      url: api.good+'/'+that.data.goodId,
      method: 'GET',
      
    }).then(res=>{
      console.log(res)
      if(res.data.code==200){
        that.setData({
            goodInfo: res.data.data
        });
      
      }else{
        app.showInfo('返回数据异常');
      }
    }).catch(res=>{
      app.showInfo(res);
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    let id = options['id']
    console.log(id)
    that.setData({
      goodId: id,
    });
    that.getGoodInfo();
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