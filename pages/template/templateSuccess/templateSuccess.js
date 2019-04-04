// pages/template/templateSuccess/templateSuccess.js
import { getContractSuccessDetails, getSignLink } from '../../../wxapi/api.js'
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    //合同名称
    contractName:'北京众签科技',
    //合同状态
    contractStatus:0,
    //截止时间
    validTime:'2019-3-23 23:59',
    //签署链接
    signLink: '',
    //签署人员信息
    signList:[

    ]
  },
  //获取签署连接
  getLink() {
      let interfaceCode =wx.getStorageSync('interfaceCode');
      let contractNo = app.globalData.searchParam.contractNo;
      this.setData({
          contractNo:contractNo,
          interfaceCode:interfaceCode,
          contractStatus:3,
      });
    getSignLink(interfaceCode, contractNo).then(res => {
      this.setData({
        signLink: res.data
      });
      wx.hideLoading()
    }).catch(res => {

    })
  },
  //获取合同成功信息
  getContractInfo() {
    getContractSuccessDetails(this.data.interfaceCode, this.data.contractNo).then(res => {
      this.getLink();
      let contractVo = res.data.contractVo,
          signUserVo = res.data.signUserVo;
      if (!contractVo.validTime) {
        contractVo.validTime = contractVo.signTime
      }
      switch (contractVo.status) {
        case "1":
          contractVo.status = '签署中'
          break;
        case "2":
          contractVo.status = '已生效'
          break;
        default:
          contractVo.status = '已截止'
          break;
      }
      //设置合同信息
      this.setData({
        contractName: contractVo.contractName,
        contractStatus: contractVo.status,
        validTime: contractVo.validTime
      });
      //设置签署人员信息
      this.setData({
        signList: signUserVo
      })
    }).catch(res => {
      
    })
  },
  //复制链接
  copyBtn() {
    wx.setClipboardData({
      //准备复制的数据
      data: this.data.signLink,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    this.getContractInfo();
    this.setData({
      navH: app.globalData.navHeight
    });

  },
  //跳转到首页
  backHome() {

    wx.switchTab({
      url: '../../index/index'
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