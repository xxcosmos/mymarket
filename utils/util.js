const api = require('../api/api.js');

const formatTime = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};

const formatNumber = n => {
    n = n.toString();
    return n[1] ? n : '0' + n
};


function request(url, data = {}, method = "GET") {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: url,
            data: data,
            method: method,
            header: {
                'Content-Type': 'application/json',
                'Token': wx.getStorageSync('token')
            },
            success: function (res) {
                console.log("success");

                if (res.statusCode == 200) {

                    //Todo 修改代码
                    if (res.data.code == 401) {
                        //需要登录后才可以操作

                        let code = null;
                        return login().then((res) => {
                            code = res.code;
                            return getUserInfo();
                        }).then((userInfo) => {
                            //登录远程服务器
                            //Todo 修改代码
                            request(api.AuthLoginByWeixin, {code: code, userInfo: userInfo}, 'POST').then(res => {
                                if (res.data.code === 0) {
                                    //存储用户信息
                                    wx.setStorageSync('userInfo', res.data.userInfo);
                                    wx.setStorageSync('token', res.data.token);

                                    resolve(res);
                                } else {
                                    reject(res);
                                }
                            }).catch((err) => {
                                reject(err);
                            });
                        }).catch((err) => {
                            reject(err);
                        })
                    } else {
                        resolve(res.data);
                    }
                } else {
                    reject(res.errMsg);
                }

            },
            fail: function (err) {
                reject(err)
                console.log("failed")
            }
        })
    });
}

function get(url, data = {}) {
    return request(url, data, 'GET')
}

function post(url, data = {}) {
    return request(url, data, 'POST')
}

/**
 * 检查微信会话是否过期
 */
function checkSession() {
    return new Promise(function (resolve, reject) {
        wx.checkSession({
            success: function () {
                resolve(true);
            },
            fail: function () {
                reject(false);
            }
        })
    });
}

/**
 * 调用微信登录
 */
function login() {
    return new Promise(function (resolve, reject) {
        wx.login({
            success: function (res) {
                if (res.code) {
                    resolve(res.code);
                } else {
                    reject(res);
                }
            },
            fail: function (err) {
                reject(err);
            }
        });
    });
}

function getUserInfo() {
    return new Promise(function (resolve, reject) {
        wx.getUserInfo({
            withCredentials: true,
            success: function (res) {
                if (res.detail.errMsg === 'getUserInfo:ok') {
                    resolve(res);
                } else {
                    reject(res)
                }
            },
            fail: function (err) {
                reject(err);
            }
        })
    });
}


function showErrorToast(msg) {
    wx.showToast({
        title: msg,
        image: '/static/images/icon_error.png'
    })
}


function loginByWeixin() {

    let code = null;
    return new Promise(function (resolve, reject) {
        return login().then((res) => {
            code = res.code;
            return getUserInfo();
        }).then((userInfo) => {
            //登录远程服务器
            request(api.AuthLoginByWeixin, {code: code, userInfo: userInfo}, 'POST').then(res => {
                //Todo something
                if (res.code === 0) {
                    //存储用户信息
                    wx.setStorageSync('userInfo', res.data.userInfo);
                    wx.setStorageSync('token', res.data.token);

                    resolve(res);
                } else {
                    reject(res);
                }
            }).catch((err) => {
                reject(err);
            });
        }).catch((err) => {
            reject(err);
        })
    });
}

/**
 * 判断用户是否登录
 */
function checkLogin() {
    return new Promise(function (resolve, reject) {
        if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {

            checkSession().then(() => {
                resolve(true);
            }).catch(() => {
                reject(false);
            });

        } else {
            reject(false);
        }
    });
}

module.exports = {
    formatTime,
    request,
    get,
    post,
    redirect,
    showErrorToast,
    checkSession,
    login,
    getUserInfo,
    loginByWeixin,
    checkLogin,
};


