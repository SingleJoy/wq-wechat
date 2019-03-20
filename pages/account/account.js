//index.js
//获取应用实例
//获取系统信息
let width;
wx.getSystemInfo({
    success: function (res) {
        width=res.screenWidth;
    },
})

Page({
  data: {
      accountName: "北京众签科技",
      phone: "13341081511",
      userName: "测试---",
      email: "zhongqiankeji@51signing.com",
      width:width-40+'px',

  },
  //事件处理函数

  onLoad: function () {


  },



})
