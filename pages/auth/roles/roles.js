import {roleLogin} from '../../../wxapi/api.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    accountList:[
      {
        name:'测试一',
        status:'1'
      }, {
        name: '测试二',
        status: '0'
      },
      {
        name: '测试三',
        status: '2'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  goIndex:function(e){

      wx.switchTab({
          url:'/pages/index/index'
      })
  }
})