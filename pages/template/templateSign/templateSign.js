const md5 = require('../../../utils/md5.js')
import {
    contracttempimgs,
  accountInformation,
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
      isSubmitCon: true
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
          signVerify: wx.getStorageSync('signVerify'),
            mobile: wx.getStorageSync('mobile'),
          windowHeight:app.globalData.userInfo.windowHeight,
          windowWidth:app.globalData.userInfo.windowWidth,
          imgHeight:app.globalData.imgHeight,
        })
        wx.showLoading({
            title: '加载中',
        })
        contracttempimgs(this.data.interfaceCode,this.data.contractTempNo).then(res=>{
            this.setData({
                contractImgList:res.data
            })
            wx.hideLoading()
        }).catch(err=>{

        })
    },
    // 签署验证是否需要签署密码
    signContract(){
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      accountInformation(this.data.interfaceCode, this.data.accountCode).then(res=>{
        if (res.data.resultCode == 1) {
          let signVerify = res.data.data.signVerify;
          this.setData({
            signVerify:signVerify
          });
          if(this.data.signVerify){
              this.setData({
                  showModal:true
              });
          }else{
            this.signSubmit();
          }
        }else{

        }
      }).catch(err=>{

        });

    },
    //提交表单数据并验证
    formSubmitModel: function(e) {
      if (!e.detail.value.input) {
        this.setData({
            psdHint: true
        });
        return false;
      } 
      this.setData({
        psdHint: false,
      });
      this.verifySignPwd(e.detail.value.input);
    },
    //验证签署密码
    verifySignPwd(value){
      let data = {
        signVerifyPassword: md5(value)
      }
      if (!this.data.isSubmitCon) {
        return false;
      }
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      this.setData({
        isSubmitCon: false
      })
      verifySignPassword(this.data.accountCode,data).then(res=>{
          if(res.data.resultCode == 1){
            this.signSubmit();    //校验成功提交签署
          }else{
            wx.showToast({
              title: "签署密码错误",
              icon: 'none',
              duration: 2000
            })
            this.setData({
              isSubmitCon: true
            })
          }
      }).catch(err=>{

      })
    },
    //签署提交
    signSubmit(){
      contractkeywordsign(this.data.interfaceCode,this.data.contractTempNo).then(res=>{
          if(res.data.responseCode==0){
            wx.showToast({
                title: '签署成功',
                icon:'none',
                duration: 2000
            })
            wx.reLaunch({
              url: '/pages/template/templateSuccess/templateSuccess',
            })
          }else if(res.data.responseCode == 2){
            wx.showToast({
                title: res.data.resultMessage,
                icon:'none',
                duration: 2000
            });
            wx.reLaunch({
                url: '/pages/template/templateList/templateList',
            });
          }else{
            wx.showToast({
                title: res.data.responseMsg,
                icon:'none',
                duration: 2000
            })
          }
      }).catch(err=>{
          // wx.hideLoading();
      })
    },
    //签署密码取消
  formReset() {
    this.setData({
      showModal: false,
      psdHint: false,
      isSubmitCon: true
    })
  },
    //取消合同签署
    cancelContract() {
      wx.switchTab({
        url: '/pages/template/templateList/templateList',
      })
    },
    //确定操作
    ImmediatelySure: function() {
        this.setData({
            showModal: false
        });
    },
    //取消操作
    hideModal: function() {
        this.setData({
            showModal: false
        });
    },

})