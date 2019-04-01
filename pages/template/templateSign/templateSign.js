import {
    contractImgs,
    getSignature,
    verifySignPassword,
    contractmoresign,} from '../../../wxapi/api.js';
const app = getApp();
Page({
    data: {
        //弹框显示标识
        showModal: false,
        //密码提示信息标识
        psdHint: false,
        windowHeight:app.globalData.userInfo.windowHeight,
        windowWidth:app.globalData.userInfo.windowWidth,
        imgHeight:app.globalData.imgHeight,
        signVerify:app.globalData.signVerify, //签署密码设置
        interfaceCode:wx.getStorageSync('interfaceCode'),
        accountCode:wx.getStorageSync('accountCode'),
        contractTempNo:'',  //合同编号
        baseUrl:app.globalData.baseUrl,

    },
    onLoad: function (options) {
        console.log(app)
        let param_data = app.globalData.contractParam;
        this.setData({
            contractTempNo:param_data.contractTempNo
        })
        wx.showLoading({
            title: '加载中',
        })
        contractImgs(this.data.interfaceCode,this.data.contractTempNo).then(res=>{
            this.setData({
                contractImgList:res.data
            })
            setTimeout(function () {
                wx.hideLoading()
            }, 1000)
        }).catch(err=>{
            
        }),
        //获取签章
        getSignature(this.data.interfaceCode).then(res=>{
            let imgBase64 = res.data
            this.setData({
                signImg:imgBase64
            })
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
            this.submit()
        }
    },
     //提交表单数据并验证
    formSubmitModel: function(e) {
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

    //签署提交
    submit(){

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