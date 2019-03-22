// pages/contract/contractDetail/contractDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signerList:[
        {
            name:'测试1',
            phone:'43243242343',
            status:'0'
        },
        {
            name:'测试1',
            phone:'43243242343',
            status:'1'
        }
    ],
    contractStatus:4,   //合同状态:1 待我签署 2待他人签署 3已生效 4已截止
    showModalStatus:true,
    detailMask:false,
    defaultEmail:'tets@123.com',
    errMessage:'热热我',
    contractName:'北京中众签科技'
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

  },
  //下载
  downContract:function(e){

  },
  //延长签署日期
  extendDate:function(e){

  }

})