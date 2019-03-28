import {searchContractsForMiniProgram} from '../../../wxapi/api';
//获取设备高度
let height;
wx.getSystemInfo({
    success: function (res) {
        height=res.screenHeight;
    },
}),
    Page({

        /**
         * 页面的初始数据
         */
        data: {
            focus: false,
            inputValue: '',
            height:height,
            pageNo:1,
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
            const interfaceCode = wx.getStorageSync('interfaceCode');
            const accountCode = wx.getStorageSync('accountCode');
            const accountLevel = wx.getStorageSync('accountLevel');
            this.setData({
                interfaceCode:interfaceCode,
                accountCode:accountCode,
                accountLevel:accountLevel,
            });
        },

        //输入框根据查询条件搜索点击事件
        inputSearch(e) {
            // 获取用户输入框中的值

            let inputValue = e.detail.value['search-input'] ? e.detail.value['search-input'] : e.detail.value;
            if(inputValue){
                this.requestData(inputValue);
            }else{
                return false
            }

        },
        //请求后端数据方法
        requestData(inputValue){
            let interfaceCode=this.data.interfaceCode;
            let accountCode=this.data.accountCode;
            let accountLevel=this.data.accountLevel;
            let param={
                contractName:inputValue,
                accountCode:accountLevel==1?'':accountCode,
                pageNo:this.data.pageNo,
                pageSize:10,
            };
            searchContractsForMiniProgram(interfaceCode,param).then((res)=>{
                console.log(res)

            }).catch(error=>{

            })

        },
        //清空输入
        clearInput(){
            this.setData({
                inputVal: ''
            });
        },
        //检测input输入
        changeInput(e){
            console.log(e.detail.value);
            this.setData({
                inputVal: e.detail.value
            });
        },
        upper(){

        },
        lower(){

        }
    })
