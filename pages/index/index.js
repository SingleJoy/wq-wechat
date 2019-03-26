// pages/index/index.js
import {contractNum} from '../../wxapi/api'

const app = getApp()
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    loadingHidden: false, // loading
    userInfo: {},
    selectCurrent: 0,
    categories: [],
    activeCategoryId: 0,
    goods: [],
    scrollTop: 0,
    loadingMoreHidden: true,
    banners:[
      {
        picUrl: '../../images/banner01.jpg',
        id: 19181,
      },
      {
        picUrl: '../../images/banner02.jpg',
        id: 19182,
      },
      {
        picUrl: '../../images/banner03.jpg',
        id: 19183,
      }
    ],
    hasNoCoupons: true,
    coupons: [],
    searchInput: '',
    swiperMaxNumber: 3,
    swiperCurrent: 0,
    curPage: 1,
    pageSize: 20,
    files: [],
    // slideHeight: wx.getSystemInfoSync().windowHeight,
    slideHeight: '100%',
    animationData:'',
    waitForMeSign:'',
    waitForOtherSign:'',
    takeEffect:'',
    deadline:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let requestType = ['waitForMeSign', 'waitForOtherSign', 'takeEffect', 'deadline'];
    const interfaceCode = wx.getStorageSync('interfaceCode');
    for (let i = 0; i < requestType.length; i++) {
        let type = requestType[i]
        contractNum[type](interfaceCode).then(res => {
            console.log(type,res.data.count)
            this.setData({
                type:res.data.count
            })
      }).catch(error => {

      })
    }
    console.log(this.data.waitForMeSign)
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

  },

  tapBanner: function (event) {
    console.log(event.currentTarget.dataset.list)
    var src = event.currentTarget.dataset.src;     //获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    var list = [];
        imgList.map(function(item,index){
          list.push(item.picUrl)
        })
    console.log(src, list)
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: list // 需要预览的图片http链接列表
    })
  },
  swiperchange: function (e) {
    //console.log(e.detail.current)
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  chooseFile: function (e) {
   
  }, 
  goToIndex: function (e) {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },

  //点击展示侧面弹框
  showSlide(e){
    let currentStatus = e.currentTarget.dataset.status;
    this.init(currentStatus) 
  },

  init:function (status){
    var animation = wx.createAnimation({
        duration:500,
        timingFunctio
    })
  }
})