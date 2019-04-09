import {TrimAll} from '../../../utils/util.js';
import {
    contractImgs,
    getContractDetails,
    remind,
    showSignRoomInfo,
    sendEmailForUser,
    getSignature,
    verifySignPassword,
    contractmoresign,
    signerpositions,
    updateContractTime} from '../../../wxapi/api.js';
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
        errMessage:'',
        permanentLimit:false,
        animationData:'',

        accountLevel:'',
        contractNo:'',
        contractType:'',
        contractImgList:[],
        baseUrl:'',
        contractVo:'', //合同信息
        signUserVo:'', //签署人员
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
        validTime:'',//签署截止日期
        remindOnce:'',//提醒按钮单点操作
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
        })
    },

    onLoad: function (options) {
        let param_data = app.globalData.searchParam;
        this.setData({
            creater:app.globalData.searchParam.creater,
            contractStatus:param_data.contractStatus,
            validTime:param_data.validTime,
            operator:param_data.operator,
            contractNo:param_data.contractNo,
            accountLevel:app.globalData.searchParam.accountLevel,
            accountCode:wx.getStorageSync('accountCode'),
            interfaceCode:wx.getStorageSync('interfaceCode'),
            defaultEmail:wx.getStorageSync('email'),
            num:app.globalData.searchParam.num,
            windowHeight:app.globalData.userInfo.windowHeight,
            windowWidth:app.globalData.userInfo.windowWidth,
            imgHeight:app.globalData.imgHeight,
            signVerify:wx.getStorageSync('signVerify'), //签署密码设置
            baseUrl:app.globalData.baseUrl,
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

            })
        }
        //获取签章图片
        getSignature(this.data.interfaceCode).then(res=>{
            let imgBase64 = res.data;
            this.setData({
                signImg:imgBase64
            });
        }).catch(err=>{

        })

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
    copyLink:function(e){
        console.log(this.data.signRoomLink);
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
            permanentLimit:!this.data.permanentLimit
        });
        if(this.data.permanentLimit){
            this.setData({
                date:''
            })
        }
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
                let signImgW = this.data.windowWidth*19/90;  //宽高相等
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
                });
            }
        }).catch(err=>{

        })
    },
    //校验签署密码
    signPassword(){
        let data={
            signVerifyPassword:md5(this.data.signPawssword)
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
        if(!this.data.signVerify){     //需要签署密码
            this.setData({
                passwordDialog:true
            });
        }else{
            this.verifySuccess();        //提交签署
        }
    },
    //密码校验成功提交操作
    verifySuccess:function(){
        this.setData({
            passwordDialog:false
        });
        let contractNo = app.globalData.searchParam.contractNo;
        let data = {
            contractNum:contractNo,
            phoneHeight:this.data.windowHeight,
            phoneWidth:this.data.phoneWidth,
            signatureImg:this.data.signImg,
            signH:this.data.windowWidth*19/90,
            signW:this.data.windowWidth*19/90,
            signPositionStr:this.data.signPositionStr
        };
        contractmoresign(this.data.interfaceCode,contractNo,data).then(res=>{
            if(res.data.responseCode == 0){
                wx.reLaunch({
                    url:'/pages/template/templateSuccess'
                });
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
        };
        if(e.target.dataset.type == 'default'){
            data.email = TrimAll(this.data.defaultEmail)
        }else{
            if(!this.data.sendEmail){
                this.setData({
                    errMessage:'邮箱不可为空！'
                });
                return false
            }else if(this.data.sendEmail&&!util.validateEmail(this.data.sendEmail)){
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
        this.setData({
            showModalStatus:false
        });
        sendEmailForUser(this.data.interfaceCode,data).then((res)=>{
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
        if((!this.data.date)&&!(this.data.permanentLimit)){
            wx.showToast({
                title: '请选择日期',
                icon:'none',
                duration: 1000
            });
            return false;
        }

        let data={
            'validTime':this.data.date,
             'perpetualValid':this.data.permanentLimit?'1':'0',
        };
        this.setData({
            showModalStatus:false
        });
        updateContractTime(this.data.interfaceCode,this.data.contractNo,data).then(res=>{
           if(res.data.resultCode==0){
               wx.showToast({
                   title: res.data.resultMessage,
                   icon:'none',
                   duration: 1000
               });
               setTimeout(()=>{
                   wx.switchTab({
                       url: '/pages/contract/contractList/contractList'
                   })
               },1000)

           }

        })


    },
//延期选择时间
    showPicker(e){
        this.setData({
            date: e.detail.value
        });
        if(this.data.date){
            this.setData({
                permanentLimit: false
            });
        }
    },

    //获取签署密码
    getPwd(e){
        let input_val = e.detail.value
        this.setData({
            signPawssword:input_val
        });
    },
    //获取邮箱
    getEmail(e){
        let input_email = e.detail.value
        this.setData({
            sendEmail:input_email
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

});
