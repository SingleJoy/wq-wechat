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
            let type = requestType[i];
            contractNum[type](interfaceCode).then(res => {
                // console.log(type,res.data.count)
                this.setData({
                    [type]:res.data.count
                })
            }).catch(error => {

            })
        }

    },
    goContractList(e){
      // console.log(e)
      let contractStatus=e.currentTarget.dataset.contractstatus;
        // url:'/pages/contract/contract?contractStatus='+contractStatus
        wx.reLaunch({
            url: "/pages/contract/contractList/contractList?contractStatus="+contractStatus
        })

        // wx.navigateTo({
        //     url: '/pages/canvas/canvas'
        // })
    },


    tapBanner: function (event) {
        console.log(event.currentTarget.dataset.list)
        let src = event.currentTarget.dataset.src;     //获取data-src
        let imgList = event.currentTarget.dataset.list;//获取data-list
        let list = [];
        imgList.map(function(item,index){
            list.push(item.picUrl)
        });
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