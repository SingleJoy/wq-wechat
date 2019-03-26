import { homePage} from '../../../wxapi/api.js';

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
    wx.getStorage({
        key:'mobile',
        success(res){
            that.setData({
                 mobile:res.data
            })
        }
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
  goIndex:function(e){
      console.log(e)
    let interfaceCode = e.target.dataset.interface
    let data = {
          mobile:this.data.mobile
    }
    homePage(interfaceCode,data).then(res=>{
       
    }).catch(err=>{

    })
    wx.switchTab({
        url:'/pages/index/index'
    })
  }
})