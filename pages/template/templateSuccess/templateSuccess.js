// pages/template/templateSuccess/templateSuccess.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contractName:'北京众签科技',
    contractStatus:0,
    validTime:'2019-3-23 23:59',
    signList:[
        {
            name:'测试1',
            status:'0'
        },
        {
            name:'测试2',
            status:'1'
        },
        {
            name:'测试3',
            status:'1'
        },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navH: App.globalData.navHeight
    })
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

  }
})