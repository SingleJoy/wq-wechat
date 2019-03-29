// pages/template/templateSet/tempalteSet.js
import {templateImg} from '../../../wxapi/api.js'
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    contractList:[],
    baseUrl:app.globalData.baseUrl,
    templateSpecificType:'',
    templateNo:'',
    interfaceCode:wx.getStorageSync('interfaceCode'),
    imgHeight:app.globalData.imgHeight
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let param_data = app.globalData.contractParam;
    let param={
        templateSpecificType:param_data.templateSpecificType
    }
    
    templateImg(this.data.interfaceCode,param_data.templateNo,param).then(res=>{
        this.setData({
            contractList:res.data.list
        })
    }).catch(err=>{
        wx.showToast({
            title: '查询失败',
            icon: 'success',
            duration: 2000
        })
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

  },
  ImmediatelyStart: function() {
    wx.navigateTo({
      url: '../templateSet/templateSet?templateSpecificType='+this.data.templateSpecificType+'&templateNo='+this.data.templateNo,
    })
  },
})