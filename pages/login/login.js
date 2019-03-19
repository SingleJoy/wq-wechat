// pages/login/login.js
import { loginWesign} from '../../wxapi/api.js'
import util from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password:'',
    password:'',
    usernameErr:'',
    passwordErr:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(util)
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

  },
  formSubmit:function(e){
    console.log(e)
  },
  //输入框事件
  bindUsernameInput: function (e) {
    var user_val =  e.detail.value;
    this.setData({
        username: user_val,
    });
    
  },
  bindPasswordInput: function (e) {
    var pwd_val =  e.detail.value;
    this.setData({
      password: pwd_val
    });
  },
  //清除事件
  clearInput: function (e) {
    switch (e.currentTarget.id) {
      case 'clear-username':
        this.setData({
          username: ''
        });
        break;
      case 'clear-password':
        this.setData({
          password: ''
        });
        break;
      case 'clear-code':
        this.setData({
          code: ''
        });
        break;
    }
  },
  //长按识别二维码
    previewImage:function(e) {
        var current = e.target.dataset.src;
        wx.previewImage({
            current: current,
            urls: [current]
        })
    }
})
