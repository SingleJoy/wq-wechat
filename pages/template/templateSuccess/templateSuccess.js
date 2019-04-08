// pages/template/templateSuccess/templateSuccess.js
import { signFinish, getSignLink } from '../../../wxapi/api.js'
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    //合同名称
    contractName:'',
    //截止时间
    validTime:'',
    //签署链接
    signRoomLink: '',
    //签署人员信息
    signList:[

    ],
    contractTempNo: '',
    interfaceCode: ''
  },
  //获取合同成功信息
  getContractInfo() {
    signFinish(this.data.contractTempNo).then(res => {
      const signInfo = res.data.data;
      if (res.data.resultCode == "1") {
        this.setData({
          contractName: signInfo.contractName,
          signRoomLink: signInfo.signRoomLink,
          validTime: signInfo.validTime
        });
        wx.hideLoading()
      } else {
        wx.hideLoading()
        wx.showToast({
          title: res.data.resultMessage,
          icon: 'none',
          duration: 2000
        })
      }
    }).catch(res => {
    })
  },
  //复制链接
  copyBtn() {
    wx.setClipboardData({
      //准备复制的数据
      data: this.data.signRoomLink,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    let interfaceCode = wx.getStorageSync('interfaceCode');
    let contractTempNo = app.globalData.contractParam.contractTempNo;
    this.setData({
      contractTempNo: contractTempNo,
      interfaceCode: interfaceCode,
    });
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
})