import {templateVal} from '../../../wxapi/api.js'
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        infoList:[],
        fillVal:'',
        interfaceCode:wx.getStorageSync('interfaceCode'),
        templateNo:'',
        contractTempNo:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let param_data = app.globalData.contractParam;
        let data={
            contractTempNo:param_data.contractTempNo
        }
        Object.assign(app.globalData.contractParam,{operateType:'back'})  //标记返回时数据回显
        console.log(app)
        templateVal(this.data.interfaceCode,param_data.templateNo,data).then(res=>{
            this.setData({
                infoList:res.data.lists
            })
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
    },
    goBack:function(){
        wx.navigateBack({
            delta: 1
        })
    },
})