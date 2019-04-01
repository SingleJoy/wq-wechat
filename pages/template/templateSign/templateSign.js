import {
    contractImgs,
    getSignature,
    verifySignPassword,
    contractmoresign,
    signerpositions} from '../../../wxapi/api.js';
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
        baseUrl:app.globalData.baseUrl
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
    // 获取签章位置并展示签章图片
    getSignPosition(){
        signerpositions(this.data.interfaceCode,this.data.contractTempNo).then(res=>{
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
    //提交
    signSubmit:function(){
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
  }
})