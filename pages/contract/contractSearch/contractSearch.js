import {searchContractsForMiniProgram} from '../../../wxapi/api';

const app = getApp();
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
            focus: false,//自动聚焦
            hasInput: false,//是否查询过
            inputValue: '',//输入值
            height:height,  //scroll区域高度
            pageNo:1,         //默认当前页初始化为1
            flag:true,//是否允许继续请求数据
            contractDataList:[]  //查询数据列表
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onPullDownRefresh() {
            this.setData({
                pageNo:1
            });
            this.searchData();
            wx.stopPullDownRefresh();
        },
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
            this.setData({
                inputValue:inputValue,
                pageNo:1,
                contractDataList:[],
            });
            if(inputValue){
                this.searchData();
            }else{
                return false;
            }

        },
        //请求后端数据方法
        searchData(){
            let interfaceCode=this.data.interfaceCode;
            let accountCode=this.data.accountCode;
            let accountLevel=this.data.accountLevel;
            let param={
                contractName:this.data.inputValue,
                accountCode:accountLevel==1?'':accountCode,
                pageNo:this.data.pageNo,
                pageSize:10,
            };
            wx.showLoading({
                title: '加载中...',
                mask: true
            });
            searchContractsForMiniProgram(interfaceCode,param).then((res)=>{

                let totalItemNumber=res.data.totalItemNumber;
                setTimeout(()=>{
                    wx.hideLoading();
                },1000);
                this.setData({
                    contractDataList:this.data.contractDataList.concat(res.data.content),
                    hasInput:true
                });
                //判断是否允许继续请求

                if(this.data.contractDataList.length<totalItemNumber){
                    this.setData({
                        flag:true
                    });
                }else{
                    this.setData({
                        flag:false
                    });
                }
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
            // console.log(e.detail.value);
            this.setData({
                inputVal: e.detail.value
            });
        },
        upper(){

        },
        onReachBottom(){

            if(this.data.flag){
                this.setData({
                    pageNo:this.data.pageNo+1
                });
                this.searchData();
            }else{
                wx.showToast({
                    title: '没有更多数据',
                    icon: 'none',
                    duration: 1500
                })
            }
        },
        goDetail(e){
            let contractNo=e.currentTarget.dataset.contractno;
            let contractStatus=e.currentTarget.dataset.contractstatus;
            let contractType=e.currentTarget.dataset.contracttype;
            let creater=e.currentTarget.dataset.creater;
            let operator=e.currentTarget.dataset.operator;
            let validTime=e.currentTarget.dataset.validtime;
            let signParams={
                'contractNo':contractNo,
                'contractStatus':contractStatus,
                'operator':operator,
                'creater':creater,
                'num':contractType,
                'validTime':validTime,
            };

            Object.assign(app.globalData.searchParam,signParams);
            // contractType 1是b2c 0是b2b
            if(contractType==1){
                wx.navigateTo({
                    url: '/pages/contract/contractDetail/contractDetail'
                });
            }else{
                wx.navigateTo({
                    url: '/pages/contract/b2bContractDetail/b2bContractDetail'
                });
            }

        },
    })
