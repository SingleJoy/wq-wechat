import { homePage} from '../../../wxapi/api.js'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    accountList:[],
    subAccountList:[],
    mobile:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getStorage({
      key:'dataList',
      success(res){
          let list = JSON.parse(res.data);
          that.setData({
            accountList:list[0],
            subAccountList:list[1]
            })
      }
    });
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

    let accountInfo = e.currentTarget.dataset.info;
    let accountStatus = accountInfo.accountStatus;  //子账号激活状态
    let auditSteps = accountInfo.auditSteps;    //一级账号可登陆进入
    let accountLevel = accountInfo.accountLevel;

    
    if(accountLevel == 1 && auditSteps != 3){
        wx.navigateTo({
            url: '/pages/auth/auth/auth'
        });
        return
    }
    if(accountLevel == 2 && accountStatus !=3){
        wx.navigateTo({
            url: '/pages/auth/auth/auth'
        });
        return false
    }
    wx.setStorage({key: 'accountCode',data: accountInfo.accountCode})
    wx.setStorage({key: 'interfaceCode',data: accountInfo.interfaceCode})
    wx.setStorage({key: 'enterpriseName',data: accountInfo.enterpriseName})
    wx.setStorage({key: 'accountLevel',data: accountInfo.accountLevel})
    wx.setStorage({key: 'mobile',data: accountInfo.mobile})
    let interfaceCode = accountInfo.interfaceCode
    let login_mobile = accountInfo.mobile
    let data = {
        mobile:login_mobile
    }
    homePage(interfaceCode,data).then(res=>{
        if (res.data.resultCode == 1) {
            let signVerify = {
                signVerify: res.data.dataList[1].signVerify
            }
            Object.assign(app.globalData, signVerify)
            wx.setStorage({ key: 'mobileTemplate', data: res.data.dataList[1].mobileTemplate });
            app.globalData.signVerify = res.data.dataList[1].signVerify;
            wx.setStorage({key:'email',data:res.data.dataList[1].email});
            wx.setStorage({key:'userCode',data:res.data.dataList[0].userCode});
            wx.setStorage({ key: 'parentAccountmobile', data: res.data.dataList[1].parentAccountmobile });
            wx.switchTab({
                url:'/pages/index/index'
            })
        }else{
            
        }
    }).catch(err=>{

    })
   
    }
})