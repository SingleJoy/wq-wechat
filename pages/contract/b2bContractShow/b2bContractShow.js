
import {
    contractImgs,
    getContractDetails,
    showSignRoomInfo,
    getSignature,
    verifySignPassword,
    contractmoresign,
    signerpositions,
    b2bSignerpositions,
    b2bContractmoresign
} from '../../../wxapi/api.js';
const app = getApp();
// const base64src=require("../../../utils/base64src");
const md5 = require('../../../utils/md5.js');
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
        interfaceCode:wx.getStorageSync('interfaceCode'),
        accountCode:wx.getStorageSync('accountCode'),
        accountLevel:'',
        contractNo:'',
        contractType:'',
        contractImgList:[],
        baseUrl:app.globalData.baseUrl,
        contractVo:'', //合同信息
        signUserVo:'', //签署人员
        optionAuthority:true,  //合同详情按钮权限
        signRoomLink:'',
        passwordDialog:false,
        signImg:'',
        signPositionList:[],
        signPositionStr:'',
        submitBtn:false,  //签署按钮和提交按钮展示
        signPassword:'',//签署密码
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let param_data = app.globalData.searchParam;

        this.setData({
            creater:app.globalData.searchParam.creater,
            contractStatus:param_data.contractStatus,
            operator:param_data.operator,
            contractNo:param_data.contractNo,
            accountLevel:app.globalData.searchParam.accountLevel,
            interfaceCode:wx.getStorageSync('interfaceCode')
        });

        wx.showLoading({
            title: '加载中',
        });
        contractImgs(this.data.interfaceCode,this.data.contractNo).then(res=>{
            this.setData({
                contractImgList:res.data
            });
        }).catch(err=>{

        });
        getContractDetails(this.data.interfaceCode,this.data.contractNo).then(res=>{
            this.setData({
                contractVo:res.data.contractVo,
                signUserVo:res.data.signUserVo
            });
            setTimeout(function () {
                wx.hideLoading();
            }, 1000);
        }).catch(err=>{

        });
        //待他人签署时展示复制链接按钮调此接口获取签署连接
        if(this.data.contractStatus==2){
            showSignRoomInfo(this.data.interfaceCode).then(res=>{
                this.setData({
                    signRoomLink:res.data.data.signRoomLink
                });
            }).catch(err=>{

            })
        }
        //获取签章图片
        getSignature(this.data.interfaceCode).then(res=>{
            let imgBase64 = res.data;
            this.setData({
                signImg:imgBase64
            });
        }).catch(err=>{

        });
        let base64Image = "data:image/jpeg;base64,"+app.globalData.contractParam.base64;

        let signPictureWidth=this.data.windowWidth*19/90;
        let signPictureHeight=this.data.windowWidth*19/180;
        this.setData({
            signPictureWidth:signPictureWidth,
            signPictureHeight:signPictureHeight,
        });

        this.setData({
            base64Image:base64Image,
        });

        this.b2bSignerpositions()
    },

    //详情三角切换
    changeDetailBox:function(e){

        this.setData({
            detailMask:!this.data.detailMask
        });
    },
//隐藏mask
    powerDrawer:function(e){
        this.setData({
            detailMask:false
        });
    },
    move:function(e){
        console.log(e);
        return false
    },

//弹框关闭
    cancelDialog:function(){
        this.setData({
            showModalStatus:false,
            passwordDialog:false
        });
    },
//签署合同
    signContract(){

        wx.navigateTo({
            url:'/pages/canvas/canvas'
        });
    },

    // 获取签章位置并展示签章图片
    b2bSignerpositions(){
        b2bSignerpositions(this.data.interfaceCode,this.data.contractNo,this.data.userCode).then(res=>{

            let arr = res.data.lists[0];
            let arr2 = res.data.lists[1];
            console.log(arr);
            console.log(arr2);
            let signPositionStr='';
            let signPositionStr2='';
            let userCode=res.data.list[0].userCode;
            this.setData({
                userCode:userCode
            });

            for(let i=0;i<arr.length;i++){
                let item = arr[i];
                let pageNum = item.pageNum;
                let offsetX = item.offsetX;
                let offsetY = item.offsetY;
                let imgHeight = this.data.imgHeight;
                let leftX = offsetX * this.data.windowWidth;
                let topY = (pageNum-1 + offsetY)*imgHeight;
                let signImgW = this.data.windowWidth*19/90;  //宽高相等
                item.style='position:absolute;top:'+topY+'px;left:'+leftX+'px;width:'+signImgW+'px;height:'+signImgW+'px;';
                if(i == arr.length-1){
                    signPositionStr += pageNum+","+leftX+","+offsetY * (imgHeight);
                }else{
                    signPositionStr+= pageNum+","+leftX+","+offsetY * (imgHeight)+"&";
                }
                this.setData({
                    signPositionList:arr,
                    signPositionStr:signPositionStr
                });

            }
            for(let i=0;i<arr2.length;i++){
                let item = arr2[i];
                let pageNum = item.pageNum;
                let offsetX = item.offsetX;
                let offsetY = item.offsetY;
                let imgHeight = this.data.imgHeight;
                let leftX = offsetX * this.data.windowWidth;
                let topY = (pageNum-1 + offsetY)*imgHeight;
                let signImgW = this.data.windowWidth*19/90;  //个人签名  签章图片高度是宽度一半
                item.style='position:absolute;top:'+topY+'px;left:'+leftX+'px;width:'+signImgW+'px;height:'+signImgW/2+'px;';
                if(i == arr2.length-1){
                   signPositionStr2 += pageNum+","+leftX+","+offsetY * (imgHeight);
                }else{
                    signPositionStr2+= pageNum+","+leftX+","+offsetY * (imgHeight)+"&";
                }
                this.setData({
                    signPositionList2:arr2,
                    submitBtn:true,
                    signPositionStr2:signPositionStr2
                });
            }
        }).catch(err=>{

        })
    },
    //校验签署密码
    signPassword(){
        let data={
            signVerifyPassword:md5(this.data.signPassword)
        };
        verifySignPassword(this.data.accountCode,data).then(res=>{
            if(res.data.resultCode == 1){
                this.verifySuccess();    //校验成功提交签署
                this.setData({
                    passwordDialog:true
                });
            }else{
                wx.showToast({
                    title: res.data.resultMessage,
                    icon:'none',
                    duration: 2000
                });
            }
        }).catch(err=>{

        })
    },
    signSubmit(){
        if(!this.data.signVerify){
            //需要签署密码
            this.setData({
                passwordDialog:true
            });
        }else{
            this.verifySuccess();        //提交签署
        }
    },
    //密码校验成功提交操作
    verifySuccess:function(){
        let contractNo = app.globalData.searchParam.contractNo;
        let data = {
            'tenantSignCode':this.data.interfaceCode,
            'userSignCode':this.data.userCode,
            'enterpriseSignImg':this.data.signImg.split(",")[1],  //企业签章
            'signatureImg':app.globalData.contractParam.base64,      //
            'phoneHeight':this.data.windowHeight,
            'phoneWidth':this.data.windowWidth,
            'signH':this.data.windowWidth*19/90,
            'signW':this.data.windowWidth*19/90,
            'signatureW':this.data.windowWidth*19/90,
            'signatureH':this.data.windowWidth*19/180,
            'enterprisePositionStr':this.data.signPositionStr,
            'personalPositionStr':this.data.signPositionStr2,
        };
        b2bContractmoresign(this.data.interfaceCode,this.data.userCode,contractNo,data).then(res=>{
          console.log(res)
            if(res.data.responseCode == 1){
                wx.reLaunch({
                    url:'/pages/template/templateSuccess/templateSuccess'
                });
            }
        }).catch(err=>{

        })
    },
    
    //获取签署密码
    getPwd(e){
        let value = e.detail.value;
        this.setData({
            signPassword:value
        });
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

    }

});