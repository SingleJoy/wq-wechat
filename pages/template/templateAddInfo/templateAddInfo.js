import {templateVal,template} from '../../../wxapi/api.js'
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        infoList:[],  //数据请求列表
        renderLidst:[],//渲染列表
        fillVal:'',
        interfaceCode:wx.getStorageSync('interfaceCode'),
        templateNo:'',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let param_data = app.globalData.contractParam;
        let data={
            templateNo:param_data.templateNo
        }
        Object.assign(app.globalData.contractParam,{operateType:'back'})  //标`记返回时数据回显
        console.log(app)
        templateVal(this.data.interfaceCode,param_data.templateNo,data).then(res=>{
            let arrData = res.data.lists;
            let newList = [];
            for(let i= 0;i<arrData.length;i++){
                let item = arrData[i];
                let obj = {
                    name:item,
                    value:''
                }
                newList.push(obj)
            }
            this.setData({
                renderLidst:newList
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
        let jsonVal = ''
        this.data.renderLidst.map(function(item,index){
            jsonVal += item.name + '=' + item.value +'&'
        })
        jsonVal = jsonVal.substring(0, jsonVal.length - 1) //去除最后一位&号
        let data={
            contractName:app.globalData.contractParam.templateName,
            templateNum:app.globalData.contractParam.templateNo,
            jsonVal:jsonVal,
            accountCode:wx.getStorageSync('accountCode')
        }
        template(this.data.interfaceCode,data).then(res=>{
            //真实合同编号
            let data = {          
                contractTempNo:res.data.contractNo
            }
            Object.assign(app.globalData.contractParam,data)
            if(res.data.resultCode){
                wx.navigateTo({
                    url: '/pages/template/templateSign/templateSign',
                })
            }
        }).catch(err=>{

        })
       
    },
    bindUsernameInput:function(e){
        var fill_val = e.detail.value;
        var fill_key = e.target.dataset.key;
        let list = this.data.renderLidst;
        list.map((item,index)=>{
            if(item.name == fill_key){
                item.value = fill_val;
            }
        })
        this.setData({
            renderLidst:list
        })
    },
    goBack:function(){
        wx.navigateBack({
            delta: 1
        })
    },
})