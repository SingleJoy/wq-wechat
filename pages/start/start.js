// pages/start/start.js
//ES6引入
import util from '../../utils/util.js'
import {queryMobileLocation} from '../../wxapi/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    accountCode:'',
    swiperMaxNumber: 3,
    swiperCurrent: 0,
    height: wx.getSystemInfoSync().screenHeight,
    showModalStatus:false,
    animationData:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      const accountCode = wx.getStorageSync('accountCode')
      if (accountCode) {
        wx.switchTab({
          url: '/pages/index/index'
        })
      }else{
        wx.redirectTo({
          url: '/pages/auth/login/login'
        })
      }
    } catch (e) {

    }
  },
  //显示弹框
  powerDrawer:function(e){
    var currentStatus = e.currentTarget.dataset.status;

    this.init(currentStatus)
  },
  //弹框初始化
  init: function (currentStatus){
    // 创建动画实例
    var animation = wx.createAnimation({
      duration:500,
      timingFunction:'linear',
      delay:1
    });
    //
    this.animation = animation;
    //动画1
    animation.opacity(0).rotateX(-100).step();
    this.setData({
      animationData:animation.export()
    })
    setTimeout(()=>{
      //动画2
      animation.opacity(1).rotateX(0).step()
      this.setData({
        animationData: animation.export()
      })
       
      if(currentStatus == 'close') {
        this.setData({
          showModalStatus: false
        })
      }

    },500)
    // 显示
    if (currentStatus == "open") {
      this.setData({
        showModalStatus: true
      });
    }
  },

  onGotUserInfo: function (e) {
    // console.log(e.detail.errMsg)
    // console.log(e.detail.userInfo)
    // console.log(e.detail.rawData)
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
  swiperchange: function (e) {

    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  tapBanner: function (e) {
    if (e.currentTarget.dataset.id != 0) {
      wx.navigateTo({
        url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
      })
    }
  },
  toLogin:function(){
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  toIndex: function (e) {
    wx.switchTab({
      url: '/pages/index/index'
    })
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