const api = require('../../api/api.js');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        banners: [],
        swiperMaxNumber: 0,
        swiperCurrent: 0,
        height: wx.getSystemInfoSync().windowHeight
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        const _this = this;
        // 展示启动页
        WXAPI.banners().then(function (res) {

            _this.setData({
                banners: res.data,
                swiperMaxNumber: res.data.length
            });

        });
        wx.switchTab({
            url: '/pages/index/index',
        });

    },


    login: function () {
        const that = this;

        wx.checkSession({

            success() {
                wx.redirectTo({
                    url: '/pages/index/index',
                })
            },

            fail() {
                wx.login({
                    success: function (res) {
                        wx.getUserInfo({
                            success(res) {
                                app.globalData.userInfo = res.userInfo;
                                console.log(app.globalData.userInfo)
                            },
                            fail(res) {
                                console.log("fail")
                            }
                        });
                        if (res.code) {
                            console.log("this");
                            console.log(app.globalData.userInfo);
                            wx.request({
                                url: app.globalData.url + '/user',
                                method: "POST",

                                data: {
                                    code: res.code,
                                    userInfo
                                },

                                success: function (res) {
                                    app.globalData.user = res.data;
                                    console.log("user= " + res.data);
                                    wx.redirectTo({
                                        url: '/pages/index/index',
                                    })
                                }
                            })
                        }
                    }
                });
            }
        })
    },

    swiperchange: function (e) {
        //console.log(e.detail.current)
        this.setData({
            swiperCurrent: e.detail.current
        })
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