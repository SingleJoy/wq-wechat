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
      width:width-40,
      b2c:40,
      b2b:20,
      identificationCode:'wqreqwr21423423',
      awardOwer:'众签科技-测试人员',
      startTime:'2019-01-01',
      endTime:'2020-01-01',

  },
  //事件处理函数
    loginOut(){

        wx.showModal({
            title: '提示',
            content: '确定退出当前账号?',
            success(res) {
                if (res.confirm) {
                    wx.redirectTo({
                        url:'/pages/login/login'
                    })
                } else if (res.cancel) {
                       return false
                }
            }
        })



    },


  onLoad: function () {


  },



})
