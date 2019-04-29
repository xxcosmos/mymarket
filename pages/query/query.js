// pages/query/query.js
const api = require('../../api/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentId: null,
    studentName: null,
    majorName:null,
    collegeName: null,
    url: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideTabBar({
      
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  queryPic: function(res){
    this.clearData()
    var that = this
    var id = res.detail.value.id
    var name = res.detail.value.name
    console.log(id)
    console.log(name)
    if(id==''|| name == ''){
      wx.showToast({
        title: '请检查输入',
        icon: 'none',
      })
      return
    }
    wx.request({
      url: api.queryStudentPic,
      method: 'POST',
      data: {
        studentName: name,
        studentId: id
      },
      success:(res)=>{
        if(res.data.code==200){
          that.setData({
            studentId: res.data.data.studentInfo.studentId,
            studentName: res.data.data.studentInfo.studentName,
            majorName: res.data.data.majorInfo.majorName,
            collegeName: res.data.data.collegeInfo.collegeName,
            url: res.data.data.url
          })
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }
      },
      fail:(res)=>{
        wx.showToast({
          title: '请求错误',
          icon: 'none'
        })
      }
    })
  },
  queryId: function(res) {
    this.clearData()
    var name = res.detail.value.name
    let that = this
    console.log(name)
    if(name==''){
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
      })
    }else{
      wx.request({
        url: api.queryStudentId + '/' + name,
        success: (res) => {
          if (res.data.code == 200) {
            that.setData({
              studentId: res.data.data.studentInfo.studentId,
              studentName: res.data.data.studentInfo.studentName,
              majorName: res.data.data.majorInfo.majorName,
              collegeName: res.data.data.collegeInfo.collegeName,
            })
            wx.showToast({
              title: '查询成功',
            })
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none'
            })
          }

        },
        fail: (res) => {
          wx.showToast({
            title: '请求错误',
            icon: 'none'
          })
        }
      })
    }
    
  },
  clearData: function(){
    this.setData({
      studentId: null,
      studentName: null,
      majorName: null,
      collegeName: null,
      url: null
    })
  },
  queryName: function(res) {
    this.clearData()
    var id = res.detail.value.id
    let that = this
    console.log(id)
    if (id == '') {
      wx.showToast({
        title: '请输入学号',
        icon: 'none',
      })
    } else {
      wx.request({
        url: api.queryStudentName + '/' + id,
        success: (res) => {
          if (res.data.code == 200) {
            console.log(res.data.data)
            that.setData({
              studentId: res.data.data.studentInfo.studentId,
              studentName: res.data.data.studentInfo.studentName,
              majorName: res.data.data.majorInfo.majorName,
              collegeName: res.data.data.collegeInfo.collegeName,
            }),
              wx.showToast({
                title: '查询成功',
              })
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none'
            })
          }

        },
        fail: (res) => {
          wx.showToast({
            title: '请求错误',
            icon: 'none'
          })
        }
      })
    }

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