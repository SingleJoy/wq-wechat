import {
    contracttempimgs,
    getSignature,
    contractkeywordsign,
    verifySignPassword,
    contractmoresign,} from '../../../wxapi/api.js';
const app = getApp();
Page({
    data: {
        //弹框显示标识
        showModal: false,
        //密码提示信息标识
        psdHint: false,
        windowHeight:'',
        windowWidth:'',
        imgHeight:'',
        signVerify:"", //签署密码设置
        interfaceCode: "",
        accountCode: "",
        contractTempNo:'',  //合同编号
        baseUrl:app.globalData.baseUrl,

    },
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
        let param_data = app.globalData.contractParam;
        this.setData({
          contractTempNo: param_data.contractTempNo,
          interfaceCode: wx.getStorageSync('interfaceCode'),
          accountCode: wx.getStorageSync('accountCode'),
            signVerify: app.globalData.signVerify,
            windowHeight:app.globalData.userInfo.windowHeight,
            windowWidth:app.globalData.userInfo.windowWidth,
            imgHeight:app.globalData.imgHeight,
        })
      console.log(param_data);
        wx.showLoading({
            title: '加载中',
        })
        contracttempimgs(this.data.interfaceCode,this.data.contractTempNo).then(res=>{
            this.setData({
                contractImgList:res.data
            })
            setTimeout(function () {
                wx.hideLoading()
            }, 1000)
        }).catch(err=>{

        }) 
    },
    // 签署验证是否需要签署密码
    signContract(){
        if(this.data.signVerify){
            this.setData({
                showModal:true
            })
        }else{
            this.signSubmit()
        }
    },
     //提交表单数据并验证
    formSubmitModel: function(e) {
        console.log(e.detail.value.input)
        if (!e.detail.value.input) {
        this.setData({
            psdHint: true
        });
        return;
        } 
        this.setData({
            psdHint: false
        });
        this.setData({
            showModal: false
        });
    },
    //验证签署密码
    verifySignPwd(){
        let data={
            signVerifyPassword:this.data.signPawssword
        }
        // console.log(this.data.signPawssword)
        verifySignPassword(this.data.accountCode,data).then(res=>{
            if(res.data.resultCode == 1){
                this.signSubmit()    //校验成功提交签署
                this.setData({
                    showModal:false
                })
            }else{
                
            }
        }).catch(err=>{

        })
    },

    //签署提交
    signSubmit(){
        wx.showLoading({
            title: '提交中...',
            mask: true
        });
        contractkeywordsign(this.data.interfaceCode,this.data.contractTempNo).then(res=>{
            if(res.data.responseCode==0){
                setTimeout(()=>{
                    wx.hideLoading();
                },500);
                wx.showToast({
                    title: '签署成功',
                    icon:'none',
                    duration: 2000
                })
                wx.reLaunch({
                    url: '/pages/template/templateSuccess/templateSuccess',
                })
            }else{
                wx.showToast({
                    title: res.data.responseMsg,
                    icon:'none',
                    duration: 2000
                })
            }
        }).catch(err=>{

        })
    },
    //确定操作
    ImmediatelySure: function() {
        this.setData({
            showModal: true
        });
    },
    //取消操作
    hideModal: function() {
        this.setData({
        showModal: false
        });
    },
 
})