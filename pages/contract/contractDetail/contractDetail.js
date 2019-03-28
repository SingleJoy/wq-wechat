// pages/contract/contractDetail/contractDetail.js
import {
    contractImgs,
    getContractDetails,
    remind,
    showSignRoomInfo,
    sendEmailForUser,
    signerpositions} from '../../../wxapi/api.js';

const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        contractStatus:'',   //合同状态:1 待我签署 2待他人签署 3已生效 4已截止
        showModalStatus:false,
        detailMask:false,
        errMessage:'',
        permanentLimit:false,
        animationData:'',
        interfaceCode:wx.getStorageSync('interfaceCode'),
        contractNo:'',
        contractImgList:[],
        baseUrl:app.globalData.baseUrl,
        contractVo:'', //合同信息
        signUserVo:'', //签署人员
        defaultEmail:wx.getStorageSync('email'),
        sendEmail:'',//指定发送邮箱
        optionAuthority:true,  //合同详情按钮权限
        signRoomLink:'',
        passwordDialog:false,
        signPassword:'123456',
        searchData:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let param_data = JSON.parse(options.contract)
        console.log(param_data)
        this.setData({
            contractStatus:param_data.contractStatus,
            contractNo:param_data.contractNo,
            searchData:options.contract
        })
        wx.showLoading({
            title: '加载中',
        })
        contractImgs(this.data.interfaceCode,this.data.contractNo).then(res=>{
            this.setData({
                contractImgList:res.data
            })
        }).catch(err=>{

        })
        getContractDetails(this.data.interfaceCode,this.data.contractNo).then(res=>{
            this.setData({
                contractVo:res.data.contractVo,
                signUserVo:res.data.signUserVo
            })
            setTimeout(function () {
                wx.hideLoading()
            }, 1000)
        }).catch(err=>{

        })
        //待他人签署时展示复制链接按钮调此接口获取签署连接
        if(this.data.contractStatus==2){
            showSignRoomInfo(this.data.interfaceCode).then(res=>{
                this.setData({
                    signRoomLink:res.data.data.signRoomLink
                })
            }).catch(err=>{

            })
        }
    },

    //详情三角切换
    changeDetailBox:function(e){
        console.log(this.data.detailMask)
        this.setData({
            detailMask:!this.data.detailMask
        })
    },
//隐藏mask
    powerDrawer:function(e){
        this.setData({
            detailMask:false
        })
    },
    move:function(e){
        console.log(e)
        return
    },
//签署合同
    signContract:function(e){
        this.setData({
            passwordDialog:true
        })
    },
//短信提醒
    smsTip:function(e){
        let data ={
            contractType:1,
            remindType:0
        }
        remind(this.data.interfaceCode,this.data.contractNo,data).then(res=>{
            if(res.data.resultCode == 0){
                wx.showToast({
                    title: '提醒成功',
                    duration: 2000
                })
            }else{
                wx.showToast({
                    title: '每日仅可提醒一次，提醒次数已用尽',
                    icon:'none',
                    duration: 2000
                })
            }
        }).catch(err=>{

        })
    },
//复制链接
    copyLink:function(e){
        console.log(this.data.signRoomLink)
        wx.setClipboardData({
            data: this.data.signRoomLink,
            success(res) {
                wx.getClipboardData({
                    success(res) {
                        console.log(res.data) // data
                    }
                })
            }
        })
    },
//下载
    downContract:function(e){
        this.setData({
            showModalStatus:true
        })
    },
//延长签署日期
    extendDate:function(e){
        this.setData({
            showModalStatus:true
        })
    },
//是否永久有效
    changePermanent:function(e){
        this.setData({
            permanentLimit:!this.data.permanentLimit
        })
    },
//弹框关闭
    cancelDialog:function(){
        this.setData({
            showModalStatus:false,
            passwordDialog:false

        })
    },
//签署提交
    signSubmit:function(){
        signerpositions(this.data.interfaceCode,this.data.contractNo).then(res=>{

        }).catch(err=>{

        })  
    },
//邮箱发送
    emailSubmit:function(e){
        let data={
            email:'',
            type:'1',
            contractNo:this.data.contractNo
        }
        if(e.target.dataset.type == 'default'){
            data.email = this.data.defaultEmail
        }else{
            data.email = this.data.sendEmail
        }
        sendEmailForUser(this.data.interfaceCode,data).then(res=>{
            wx.showToast({
                title: '邮件发送成功',
                icon: 'none',
                duration: 2000
            })
        }).catch(err=>{

        })

    },
//延期确定按钮
    dateSubmit:function(){

    },
//延期选择时间
    showPicker:function(e){
        console.log(e)
        this.setData({
            date: e.detail.value
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
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];   //当前页面
        var prevPage = pages[pages.length - 2];  //上一个页面
        //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
        prevPage.setData({
            param: this.data.searchData
        })
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
