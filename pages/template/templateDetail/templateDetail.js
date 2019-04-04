// pages/template/templateSet/tempalteSet.js
import {templateImg} from '../../../wxapi/api.js'
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    contractImgList:[],
    baseUrl:app.globalData.baseUrl,
    templateNo:'',
    interfaceCode:'',
    imgHeight:app.globalData.imgHeight,
    templateSpecificType:app.globalData.contractParam.templateSpecificType
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  //图片预览
  previewImage:function(e) {
      let list=[];
      for(let i=0;i<this.data.contractImgList.length;i++){
          list.push(this.data.baseUrl+'/restapi/wesign/v1/tenant/contract/img?contractUrl='+this.data.contractImgList[i].contractUrl)
      }
      let current = e.target.dataset.src;
      wx.previewImage({
          current: current,
          urls: list
      })
  },
  onLoad: function (options) {
    let param_data = app.globalData.contractParam;
    console.log(this.data.interfaceCode);
    let param={
        templateSpecificType:param_data.templateSpecificType
    }
    this.setData({
        interfaceCode:wx.getStorageSync('interfaceCode')
    })
    wx.showLoading({
        title: '加载中',
    })
    templateImg(this.data.interfaceCode,param_data.templateNo,param).then(res=>{
        this.setData({
            contractImgList:res.data.list
        })
        setTimeout(function () {
            wx.hideLoading()
        }, 1000)
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