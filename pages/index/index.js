import {contractNum,} from '../../wxapi/api'
import { checkSession} from '../../utils/util.js';
const app = getApp();

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
        deadline:'',
        interfaceCode: ''

    },
    onPullDownRefresh() {
      wx.stopPullDownRefresh()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       checkSession().then((res)=>{
           console.log(res)
       })
      wx.showLoading({
        title: '加载中',
      })
      this.setData({
        interfaceCode: wx.getStorageSync('interfaceCode')
      })
      // this.getSignerList();
    },
    getSignerList() {
      let requestType = ['waitForMeSign', 'waitForOtherSign', 'takeEffect', 'deadline'];
      let accountCode = {
        accountCode: wx.getStorageSync('accountCode')
      }
      for (let i = 0; i < requestType.length; i++) {
        let type = requestType[i];
        contractNum[type](this.data.interfaceCode, accountCode).then(res => {
          wx.hideLoading()
          this.setData({
            [type]: res.data.count
          })
        }).catch(error => {
          wx.hideLoading()
        })
      }
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
      this.getSignerList();
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
    //发起合同applyContract
    applyContract() {
      wx.switchTab({
        url: '../template/templateList/templateList'
      })
    },
    goContractList(e){
        let contractStatus=e.currentTarget.dataset.contractstatus;
        // url:'/pages/contract/contract?contractStatus='+contractStatus
        wx.reLaunch({
            url: "/pages/contract/contractList/contractList?contractStatus="+contractStatus
        })

    },

    onShareAppMessage: function () {

    },

    //进入合同类表业
    goContract(e){
        let status = e.target.dataset.status;
        wx.reLaunch({
            url:'/pages/contract/contract?status='+status
        })
    },

    tapBanner: function (event) {

        var src = event.currentTarget.dataset.src;     //获取data-src
        var imgList = event.currentTarget.dataset.list;//获取data-list
        var list = [];
        imgList.map(function(item,index){
            list.push(item.picUrl)
        })
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
    },
})
