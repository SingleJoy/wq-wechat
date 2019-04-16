
import { TrimAll,formatTime,validateEmail} from '../../../utils/util.js';
import {
    accountInformation,
    contractImgs,
    getContractDetails,
    remind,
    showSignRoomInfo,
    sendEmailForUser,
    getSignature,
    verifySignPassword,
    contractmoresign,
    updateContractTime,
    signerpositions,
} from '../../../wxapi/api.js';

const app = getApp();
const md5 = require('../../../utils/md5.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        windowHeight:'',
        windowWidth:'',
        imgHeight:'',
        signVerify:'', //签署密码设置
        contractStatus:'',   //合同状态:1 待我签署 2待他人签署 3已生效 4已截止
        showModalStatus:false,
        detailMask:false,
        enterpriseName:'', //企业名称
        errMessage:'',
        permanentLimit:false,
        animationData:'',
        interfaceCode:'',
        accountCode:'',
        accountLevel:'',
        contractNo:'',
        contractType:'',
        contractImgList:[],
        baseUrl:'',
        contractVo:'', //合同信息
        signUserVo:'', //签署人员
        defaultEmail:'',
        sendEmail:'',//指定发送邮箱
        optionAuthority:true,  //合同详情按钮权限
        signRoomLink:'',
        passwordDialog:false,
        signPassword:'',
        signImg:'',
        signPositionList:[],
        signPositionStr:'',
        submitBtn:false,  //签署按钮和提交按钮展示
        signPawssword:'',//签署密码
        contractInfo:'',      //合同信息
        remindOnce:'',      //短信提醒单击操作
        psdHint: false //签署密码为空提示
    },

    /**
     * 生命周期函数--监听页面加载
     */
    //图片预览
    previewImage:function(e) {
        let list=[];
        for(let i=0;i<this.data.contractImgList.length;i++){
            list.push(this.data.baseUrl+'/restapi/wesign/v1/tenant/contract/img?contractUrl='+this.data.contractImgList[i].contractUrl)
        }
        let current = e.target.dataset.src;
        wx.previewImage({
            current: current,
            urls: list
        });

    },

    onLoad: function (options) {
        let param_data = app.globalData.searchParam;
        console.log(param_data.contractStatus)
        this.setData({
            contractStatus:param_data.contractStatus,
            contractNo:param_data.contractNo,
            accountLevel:param_data.accountLevel,
            interfaceCode:wx.getStorageSync('interfaceCode'),
            accountCode:wx.getStorageSync('accountCode'),
            defaultEmail:wx.getStorageSync('email'),
            mobile:wx.getStorageSync('mobile'),
            enterpriseName:wx.getStorageSync('enterpriseName'),
            validTime:param_data.validTime.substring(0,10),
            num:param_data.num,
            contractInfo:param_data,
            windowHeight:app.globalData.userInfo.windowHeight,
            windowWidth:app.globalData.userInfo.windowWidth,
            imgHeight:app.globalData.imgHeight,
            signVerify:app.globalData.signVerify, //签署密码设置
            baseUrl:app.globalData.baseUrl,
            startDate:formatTime(new Date(),false,'-')
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
                wx.hideLoading()
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

            });
        }
        //获取签章图片
        getSignature(this.data.interfaceCode).then(res=>{
            let imgBase64 = res.data
            this.setData({
                signImg:imgBase64
            });
        }).catch(err=>{

        });

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
        return false;
    },
//短信提醒
    smsTip:function(e){
        let data ={
            contractType:1,
            remindType:0
        };
        if(this.data.remindOnce){
            return false;
        }
        this.setData({
            remindOnce:true
        });
        remind(this.data.interfaceCode,this.data.contractNo,data).then(res=>{
            this.setData({
                remindOnce:false
            });
            if(res.data.resultCode == 0){
                wx.showToast({
                    title: '提醒成功',
                    duration: 2000
                });
            }else{
                wx.showToast({
                    title: '每日仅可提醒一次，提醒次数已用尽',
                    icon:'none',
                    duration: 2000
                });
            }
        }).catch(err=>{

        })
    },
//复制链接
    copyLink: function (e) {
        wx.setClipboardData({
            //准备复制的数据
            data: this.data.signRoomLink,
            success: (res) => {
                wx.showToast({
                    title: '链接已复制',
                });
            }
        });
    },
//下载
    downContract:function(e){
        this.setData({
            showModalStatus:true
        });
    },
//延长签署日期
    extendDate:function(e){

        this.setData({
            showModalStatus:true
        });
    },
    //是否永久有效
    changePermanent:function(e){
        this.setData({
            permanentLimit:!this.data.permanentLimit,
            date:''
        });
    },
    //弹框关闭
    cancelDialog:function(){
        this.setData({
          showModalStatus:false,
          passwordDialog:false,
          psdHint: false,
          signPawssword: '',
        });
    },
    //签署合同
    signContract:function(e){
        this.getSignPosition();
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
      if (!this.data.signPawssword) {
        this.setData({
          psdHint: true,
        });
        return false;
      }
      this.setData({
        psdHint: false,
      });
        let data={
            signVerifyPassword:md5(this.data.signPawssword)
        };

        verifySignPassword(this.data.accountCode,data).then(res=>{
            if(res.data.resultCode == 1){
                this.verifySuccess();    //校验成功提交签署
                this.setData({
                    passwordDialog:true
                })
            }else{
                wx.showToast({
                    title: "签署密码错误",
                    icon:'none',
                    duration: 2000
                })
            }
        }).catch(err=>{

        })
    },
    //提交签署
    signSubmit(){
        accountInformation(this.data.interfaceCode, this.data.accountCode).then(res=>{
            if (res.data.resultCode == 1) {
                let signVerify = res.data.data.signVerify;
                this.setData({
                    signVerify:signVerify
                });
                if(this.data.signVerify){
                    this.setData({
                        passwordDialog:true
                    });
                }else{
                    this.verifySuccess();          //提交签署
                }
            }else{

            }
        }).catch(err=>{

        });

    },
    //密码校验成功提交操作
    verifySuccess:function(){
        let contractNo = app.globalData.searchParam.contractNo;
        let data = {
            contractNum:contractNo,
            phoneHeight:this.data.windowHeight,
            phoneWidth: this.data.windowWidth,
            signatureImg:this.data.signImg.split(',')[1],
            signH:this.data.windowWidth*0.21,
            signW:this.data.windowWidth*0.21,
            signPositionStr:this.data.signPositionStr
        };
        this.setData({
            passwordDialog:false
        });
        contractmoresign(this.data.interfaceCode,contractNo,data).then(res=>{
            if(res.data.responseCode == 0){
                wx.reLaunch({
                    url:'/pages/contract/b2cContractSuccess/b2cContractSuccess'
                });
            }else if(res.data.responseCode == 2){
                wx.showToast({
                    title: res.data.responseMsg,
                    icon:'none',
                    duration: 2000
                });
                wx.reLaunch({
                    url: '/pages/contract/contractList/contractList',
                });
            }else{
                wx.reLaunch({
                    url:'/pages/index/index'
                });
            }
        }).catch(err=>{

        });
    },
    // 邮箱发送
    emailSubmit:function(e){
        let data={
            email:'',
            type:'1',
            contractNo:this.data.contractNo
        };
        if(e.target.dataset.type == 'default'){
            data.email = TrimAll(this.data.defaultEmail);
        }else{
            if(!this.data.sendEmail){
                this.setData({
                    errMessage:'邮箱不可为空！'
                });
                return false;
            }else if(this.data.sendEmail&&!validateEmail(this.data.sendEmail)){
                this.setData({
                    errMessage:'邮箱格式不正确'
                });
                return false
            }
            else{
                data.email = TrimAll(this.data.sendEmail);
                this.setData({
                    errMessage:''
                });
            }
        }
        wx.showLoading({
            title: '下载中...',
            mask: true
        });
        this.setData({
            showModalStatus:false
        });
        sendEmailForUser(this.data.interfaceCode,data).then((res)=>{
            wx.hideLoading();
            wx.showToast({
                title: '邮件发送成功',
                icon: 'none',
                duration: 2000
            });

        }).catch(err=>{

        });

    },
//延期确定按钮
    dateSubmit:function(){
        let data={
           'validTime':this.data.date+' 23:59:59',
           'perpetualValid':this.data.permanentLimit?1:0,
        };
        this.setData({
            showModalStatus:false
        });

        updateContractTime(this.data.interfaceCode,this.data.contractNo,data).then(res=>{
            if(res.data.resultCode == 0){
                wx.showToast({
                    title: '截止时间修改成功',
                    icon: 'none',
                    duration: 2000
                });
                Object.assign(app.globalData.contractParam,{contractStatus:4})
                wx.switchTab({
                    url:'/pages/contract/contractList/contractList'
                });
            }else{
                wx.showToast({
                    title: res.data.resultMessage,
                    icon: 'none',
                    duration: 2000
                });
            }
        }).catch(err=>{

        })
    },
//延期选择时间
    showPicker:function(e){
        this.setData({
            date: e.detail.value,
            permanentLimit:false
        });
    },

    //获取签署密码
    getPwd(e){
        let input_val = e.detail.value;
        this.setData({
            signPawssword:input_val
        });
    },
    //获取邮箱
    getEmail(e){
        let input_email = e.detail.value;
        this.setData({
            sendEmail:input_email
        });
    },


})

