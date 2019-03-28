// pages/contract/contractDetail/contractDetail.js
import {contractImgs,getContractDetails} from '../../../wxapi/api.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contractStatus:'',   //合同状态:1 待我签署 2待他人签署 3已生效 4已截止
    showModalStatus:false,
    detailMask:false,
    errMessage:'',
    permanentLimit:false,
    animationData:'',
    interfaceCode:wx.getStorageSync('interfaceCode'),
    contractNo:'',
    contractImgList:[],
    baseUrl:app.globalData.baseUrl,
    contractVo:'', //合同信息
    signUserVo:'', //签署人员
    email:wx.getStorageSync('email'),
    sendEmail:''//指定发送邮箱
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let param_data = JSON.parse(options.param)
    this.setData({
        contractStatus:options.contractStatus,
        contractNo:options.contractNo
    })
    wx.showLoading({
        title: '加载中',
    })
    contractImgs(this.data.interfaceCode,this.data.contractNo).then(res=>{
        this.setData({
            contractImgList:res.data
        })
    }).catch(err=>{

    })
    getContractDetails(this.data.interfaceCode,this.data.contractNo).then(res=>{
        this.setData({
            contractVo:res.data.contractVo,
            signUserVo:res.data.signUserVo
        })
        setTimeout(function () {
            wx.hideLoading()
        }, 1000)
    }).catch(err=>{

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
  //详情三角切换
  changeDetailBox:function(e){
      console.log(this.data.detailMask)
    this.setData({
        detailMask:!this.data.detailMask
    })
  },
  //隐藏mask
  powerDrawer:function(e){
    this.setData({
        detailMask:false
    })
  },
  move:function(e){
      console.log(e)
      return
  },
  //签署合同
  signContract:function(e){

  },
  //短信提醒
  smsTip:function(e){

  },
  //复制链接
  copyLink:function(e){
    wx.setClipboardData({
        data: 'data',
        success(res) {
          wx.getClipboardData({
            success(res) {
              console.log(res.data) // data
            }
          })
        }
      })
  },
  //下载
  downContract:function(e){
    this.setData({
        showModalStatus:true
    })
  },
  //延长签署日期
  extendDate:function(e){
    this.setData({
        showModalStatus:true
    })
  },
  //是否永久有效
  changePermanent:function(e){
      this.setData({
        permanentLimit:!this.data.permanentLimit
      })
  },
  //弹框关闭
  cancelDialog:function(){
    this.setData({
        showModalStatus:false
    })
  },
  //邮箱发送
  emailSubmit:function(){

  },
  //延期确定按钮
  dateSubmit:function(){

  },
  //延期选择时间
  showPicker:function(e){
    console.log(e)
    this.setData({
      date: e.detail.value
    })
  },
})