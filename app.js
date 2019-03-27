//app.js
const WXAPI = require('./config.js')
App({
  onLaunch: function () {
    var that =this;
        that.getOpenId()
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // console.log(res)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    wx.getSystemInfo({
      success: res => {
        //导航高度
        this.globalData.navHeight = res.statusBarHeight + 46;
        // console.log(this.globalData.navHeight)
      }, fail(err) {
        // console.log(err);
      }
    })
  },

  globalData: {
    userInfo: null,
    appid: 'wx1c9cf5eea2984b74',//appid需自己提供
    accountCode:'',
    interfaceCode:'',
    accountLevel:'',
    mobile:'',
    baseUrl:WXAPI.API_BASE_URL

  },
  //全局可通过app.getApp().getOpenId()获取openId, sessionKey, unionId 等信息
  getOpenId: function () { 
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          if (res.code) {
            // console.log(res.code)
            //发送code到后台获取 openId, sessionKey, unionId
            // wx.request({
            //   url: WXAPI.API_BASE_URL,
            //   method: 'GET',
            //   data: {
            //     code: res.code
            //   },
            //   success(res) {
            //     //成功返回数据后，将token值存储到localStorage中
            //     console.log(res)
            //     wx.setStorage({
            //       key: 'wesignToken',
            //       data: res.data.token
            //     });
            //   }
            // })
          }
        }
      })
    })
  }
})