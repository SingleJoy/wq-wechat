// pages/contract/contract.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        folder:'默认文件夹',
        contractType:'对个人合同',
        accountType:'全部账号',
        currentTab:0,
        sum:1,
        model:true,
        selected:0,
        contractStatus:3
    },

    /**
     * 生命周期函数--监听页面加载
     */

    tabNav(e){
        console.log(e.currentTarget.dataset.current)
        let current=e.currentTarget.dataset.current;
        if(current==this.data.selected){
            this.setData({
                selected:0,
                currentTab:0,

            })
        }else{
            this.setData({
                selected:current,
                currentTab:current,

            })
        }

    },
    clickFolder(){
        this.setData({
            selected:0,
            currentTab:0,
            contractStatus:3,
        })
    },
    chooseContractType(){
        this.setData({
            selected:0,
            currentTab:0,
            contractStatus:3,
        })
    },
    accoutType(){
        this.setData({
            selected:0,
            currentTab:0,
            contractStatus:3,
        })
    },
    closeModel(){
        this.setData({
            selected:0,
            currentTab:0,
        })
    },
    tabNavContract(e){
     let contractStatus=e.currentTarget.dataset.current;
     console.log(contractStatus)
        this.setData({
            contractStatus:contractStatus,
        })
    },
    goSearch(){

        wx.navigateTo({
            url: '/pages/search/search'
        })
    },

    onLoad: function (options) {
        console.log("onLoad")

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        console.log("onReady")
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        console.log("onShow")
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        console.log("onHide")
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        console.log("onUnload")
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        console.log("onPullDownRefresh")
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        console.log("onReachBottom")
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        console.log("onShareAppMessage")
    }
})