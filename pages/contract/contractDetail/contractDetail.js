// pages/contract/contractDetail/b2bContractDetail.js
import {
    contractImgs,
    getContractDetails,
    remind,
    showSignRoomInfo,
    sendEmailForUser,
    getSignature,
    verifySignPassword,
    contractmoresign,
    signerpositions} from '../../../wxapi/api.js';
const app = getApp();
const md5 = require('../../../utils/md5.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        windowHeight:app.globalData.userInfo.windowHeight,
        windowWidth:app.globalData.userInfo.windowWidth,
        imgHeight:app.globalData.imgHeight,
        signVerify:app.globalData.signVerify, //签署密码设置
        contractStatus:'',   //合同状态:1 待我签署 2待他人签署 3已生效 4已截止
        showModalStatus:false,
        detailMask:false,
        errMessage:'',
        permanentLimit:false,
        animationData:'',
        interfaceCode:'',
        accountCode:wx.getStorageSync('accountCode'),
        accountLevel:'',
        contractNo:'',
        contractType:'',
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
        signImg:'',
        signPositionList:[],
        signPositionStr:'',
        submitBtn:false,  //签署按钮和提交按钮展示
        signPawssword:'',//签署密码
        contractInfo:''      //合同信息
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let param_data = app.globalData.searchParam;
        this.setData({
            contractStatus:param_data.contractStatus,
            contractNo:param_data.contractNo,
            accountLevel:app.globalData.searchParam.accountLevel,
            interfaceCode:wx.getStorageSync('interfaceCode'),
            validTime:param_data.validTime,
            contractInfo:param_data,
        })
        wx.showLoading({
            title: '加载中',
        })
        console.log(param_data)
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
        //获取签章图片
        getSignature(this.data.interfaceCode).then(res=>{
            let imgBase64 = res.data
            this.setData({
                signImg:imgBase64
            })
        }).catch(err=>{

        })
        
    },

    //详情三角切换
    changeDetailBox:function(e){
        // console.log(this.data.detailMask)
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
        console.log(this.data.contractStatus)
        this.setData({
            showModalStatus:true
        })
    },
    //是否永久有效
    changePermanent:function(e){
        this.setData({
            permanentLimit:!this.data.permanentLimit,
            date:''
        })
    },
    //弹框关闭
    cancelDialog:function(){
        this.setData({
            showModalStatus:false,
            passwordDialog:false
        })
    },
    //签署合同
    signContract:function(e){
        this.getSignPosition()
    },
    // 签署合同获取签章位置并展示签章图片
    getSignPosition(){
        signerpositions(this.data.interfaceCode,this.data.contractNo).then(res=>{
            let arr = res.data.list;
            for(let i=0;i<arr.length;i++){
                let item = arr[i];
                let pageNum = item.pageNum;
                let offsetX = item.offsetX;
                let offsetY = item.offsetY;
                let imgHeight = this.data.imgHeight;
                let leftX = offsetX * this.data.windowWidth;
                let topY = (pageNum-1 + offsetY)*imgHeight;
                let signImgW = this.data.windowWidth*0.21;  //宽高相等
                item.style='position:absolute;top:'+topY+'px;left:'+leftX+'px;width:'+signImgW+'px;height:'+signImgW+'px;';
                if(i == arr.length-1){
                    this.data.signPositionStr += pageNum+","+leftX+","+offsetY * (imgHeight);
                }else{
                    this.data.signPositionStr+= pageNum+","+leftX+","+offsetY * (imgHeight)+"&";
                }
                this.setData({
                    signPositionList:arr,
                    submitBtn:true,
                    signPositionStr:this.data.signPositionStr
                })
            }
        }).catch(err=>{

        })
    },
    //校验签署密码
    signPassword(){
        let data={
            signVerifyPassword:md5(this.data.signPawssword)
        }
        verifySignPassword(this.data.accountCode,data).then(res=>{
            if(res.data.resultCode == 1){
                this.verifySuccess()    //校验成功提交签署
                this.setData({
                    passwordDialog:true
                })
            }else{
                wx.showToast({
                    title: res.data.resultMessage,
                    icon:'none',
                    duration: 2000
                })
            }
        }).catch(err=>{

        })
    },
    //提交签署
    signSubmit(){
        if(!this.data.signVerify){     //需要签署密码
            this.setData({
                passwordDialog:true
            })
        }else{
            this.verifySuccess()           //提交签署                    
        }
    },
    //密码校验成功提交操作
    verifySuccess:function(){
        let contractNo = app.globalData.searchParam.contractNo;
        let data = {
            contractNum:contractNo,
            phoneHeight:this.data.windowHeight,
            phoneWidth:this.data.phoneWidth,
            signatureImg:this.data.signImg,
            signH:this.data.windowWidth*0.21,
            signW:this.data.windowWidth*0.21,
            signPositionStr:this.data.signPositionStr
        }
        contractmoresign(this.data.interfaceCode,contractNo,data).then(res=>{
            if(res.data.responseCode == 0){
                wx.reLaunch({
                    url:'/pages/template/templateSuccess'
                })
            }
        }).catch(err=>{

        })
    },
    // 邮箱发送
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
        this.setData({
            date: e.detail.value,
            permanentLimit:false
        })
    },

    //获取签署密码
    getPwd(e){
        let input_val = e.detail.value
        this.setData({
            signPawssword:input_val
        })
    },
    //获取邮箱
    getEmail(e){
        let input_email = e.detail.value
        this.setData({
            sendEmail:input_email
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
        // var pages = getCurrentPages();
        // var currPage = pages[pages.length - 1];   //当前页面
        // var prevPage = pages[pages.length - 2];  //上一个页面
        // //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
        // prevPage.setData({
        //     param: this.data.searchData
        // })
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

