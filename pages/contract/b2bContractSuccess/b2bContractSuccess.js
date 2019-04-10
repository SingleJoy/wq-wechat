
import {b2bsignFinish} from '../../../wxapi/api.js'

const app = getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        //合同名称
        contractName:'',
        //截止时间
        validTime:'',
        //签署链接
        signRoomLink: '',
        //签署人员信息
        signList:[],
        interfaceCode: ''
    },
    //获取合同成功信息
    getContractInfo() {
        b2bsignFinish(this.data.contractNo).then(res => {



                this.setData({
                    contractName: res.data.data.contractName,
                    validTime: res.data.data.validTime,
                    signList: res.data.dataList,

                });

        }).catch(res => {
        })
    },
    //复制链接
    copyBtn() {
        wx.setClipboardData({
            //准备复制的数据
            data: this.data.signRoomLink,
            success: (res)=> {
                wx.showToast({
                    title: '链接已复制',
                });
            }
        });
    },
    onPullDownRefresh() {
        wx.stopPullDownRefresh()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: '加载中',
        });
        let interfaceCode = wx.getStorageSync('interfaceCode');

        let contractNo = app.globalData.searchParam.contractNo;

        this.setData({
            contractNo:contractNo,
            interfaceCode: interfaceCode,
        });
        this.getContractInfo();
        this.setData({
            navH: app.globalData.navHeight
        });

        setTimeout(()=>{
            wx.hideLoading();
        },500);
    },
    //跳转到首页
    backHome() {
        app.globalData.searchParam={};
        app.globalData.contractParam={};
        wx.switchTab({
            url: '../../index/index'
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
})