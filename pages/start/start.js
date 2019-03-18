// pages/start/start.js
const util = require('../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [
      {
        picUrl:'../../images/banner1.png',
        id: 19181,
      },
      {
        picUrl: '../../images/banner2.png',
        id: 19182,
      },
      {
        picUrl: '../../images/banner3.png',
        id: 19183,
      }
    ],
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
    app.globalData.appid = '33333333'
    console.log(app.globalData.appid )


    app.getToken().then(function () {
        that.setData({
          token: wx.getStorageSync('wesignToken')
        });
        console.log(that.data.token)
    })
    //判断是否登录（不一定用此接口判断）
    util.checkSession().then((res) => {
      console.log(res)
      if(res){
        console.log(res)
        wx.switchTab({
          url: '/pages/index/index'
        })
      }else{   //未登录则显示登录窗口


        //   wx.showModal({
        //     title: '弹窗标题',
        //     content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
        //     confirmText: "主操作",
        //     cancelText: "辅助操作",
        //     success: function (res) {
        //       console.log(res);
        //       if (res.confirm) {
        //         console.log('用户点击主操作')
        //       } else {
        //         console.log('用户点击辅助操作')
        //       }
        //     }
        // });
      }

    }).catch((err) => {
        console.log(err)
    })
    
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

    },2000)
    // 显示
    if (currentStatus == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
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
    console.log(e.detail.current)
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
  goToIndex: function (e) {
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