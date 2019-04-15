const app = getApp();
import { saveSignatureImg } from '../../wxapi/api.js';
let context = null;// 使用 wx.createContext 获取绘图上下文 context
let isButtonDown = false;
let arrx = [];
let arry = [];
let arrz = [];
let canvasw = 0;
let width;
let canvash = 0;
//获取系统信息
//获取系统信息
wx.getSystemInfo({
    success: function (res) {
        canvasw = res.windowWidth;//设备宽度
        canvash = res.windowHeight;
        width=res.screenWidth;
    }
});
//注册页面
Page({
    /**
     * 页面的初始数据
     */
    data: {
        src: "",
        canvasWidth:'',
        canvasHeight:'',
        width:'',
    },

    canvasIdErrorCallback: function (e) {
        console.error(e.detail.errMsg)
    },
//开始
    canvasStart: function (event) {
        isButtonDown = true;
        arrz.push(0);
        arrx.push(event.changedTouches[0].x);
        arry.push(event.changedTouches[0].y);


    },
//过程
    canvasMove: function (event) {
        if (isButtonDown) {
            arrz.push(1);
            arrx.push(event.changedTouches[0].x);
            arry.push(event.changedTouches[0].y);

        }

        for (let i = 0; i < arrx.length; i++) {
            if (arrz[i] == 0) {
                context.moveTo(arrx[i], arry[i])
            } else {
                context.lineTo(arrx[i], arry[i])
            }
        }
        context.clearRect(0, 0, canvasw, canvash);

        context.setStrokeStyle('#000');
        context.setLineWidth(4);
        context.setLineCap('round');
        context.setLineJoin('round');
        context.stroke();

        context.draw(false);
    },
    canvasEnd: function (event) {
        isButtonDown = false;
    },
    cleardraw: function () {
        //清除画布
        arrx = [];
        arry = [];
        arrz = [];
        context.clearRect(0, 0, canvasw, canvash);
        context.draw(true);
    },
    //导出图片
    getImg: function () {

        if (arrx.length == 0) {
            wx.showToast({
                title: '签名内容不能为空！',
                icon: 'none',
                duration: 1000
            });

            return false;
        }else{
            wx.showLoading({
                title: '加载中',
                mask: true
            });
            this.submit()
        }
    },
        //提交保存
      submit(){
        wx.canvasToTempFilePath({
          canvasId: 'canvas',
          success: (res) => {
            //设置保存的图片
            wx.getFileSystemManager().readFile({
            filePath: res.tempFilePath, //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: (res) => { //成功的回调
                  // console.log('data:image/png;base64,' + res.data)
                let base64=res.data;
                let base64Image={
                    'base64':base64
                };
                //往全局变量派发一个base64img 对象
                Object.assign(app.globalData.contractParam,base64Image);
                let num=app.globalData.contractParam.num;
                let contractNo = "applet" + app.globalData.searchParam.contractNo;
                let userCode=wx.getStorageSync('userCode');
                let dataParams={
                    signatureImg:'data:image/png;base64,'+base64
                };
                wx.showLoading({
                    title: '提交中...',
                    mask: true
                });
                saveSignatureImg(contractNo,userCode,dataParams).then((res)=>{
                    if(res.data.resultCode==1){
                        wx.showToast({
                            title: '签署成功',
                            icon: 'none',
                            duration: 1000
                        });
                        if(num==1){
                            wx.navigateTo({
                                url: '/pages/contract/contractDetail/contractDetail'
                            });
                        }else {
                            wx.navigateTo({
                                url: '/pages/contract/b2bContractShow/b2bContractShow'
                            });
                        }
                    }
                  this.cleardraw();
                }).catch(error=>{

                })
              }
            })
          }
        })
      },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 使用 wx.createContext 获取绘图上下文 context
        context = wx.createCanvasContext('canvas');
        context.beginPath();
        context.setStrokeStyle('#000000');
        context.setLineWidth(4);
        context.setLineCap('round');
        context.setLineJoin('round');
        this.setData({
            canvasWidth:app.globalData.userInfo.windowWidth,
            canvasHeight:app.globalData.userInfo.windowHeight-120,
            width:width,
        })
    },

    onShow:function () {
        this.cleardraw();
    }
})