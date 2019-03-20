// pages/template/templateAddInfo/templateAddInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoList:[
      {
        name:'价格',
      },
      {
        name:"金额",
      },
      {
        name:'位置'
      }
    ],
    fillVal:'',
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
  signSetting:function(e){
    wx.navigateTo({
      url: '/pages/template/templateSet/templateSet',
    })
  },
  bindUsernameInput:function(e){
    console.log(e.detail.value,e.target.dataset.key)
    var fill_val = e.detail.value;
    var fill_key = e.target.dataset.key;
    var obj = {};
    console.log(obj)
  }
})