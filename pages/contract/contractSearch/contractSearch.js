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
            focus: false,//自动聚焦
            inputValue: '',//输入值
            height:height,  //scroll区域高度
            pageNo:1,         //默认当前页初始化为1
            flag:true,//是否允许继续请求数据
             contractDataList:[]  //查询数据列表
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
            this.setData({
                inputValue:inputValue
            })
            if(inputValue){
                this.requestData();
            }else{
                return false
            }

        },
        //请求后端数据方法
        requestData(){
            let interfaceCode=this.data.interfaceCode;
            let accountCode=this.data.accountCode;
            let accountLevel=this.data.accountLevel;
            let param={
                contractName:this.data.inputValue,
                accountCode:accountLevel==1?'':accountCode,
                pageNo:this.data.pageNo,
                pageSize:10,
            };
            searchContractsForMiniProgram(interfaceCode,param).then((res)=>{
                let totalItemNumber=res.data.content;

                this.setData({
                    contractDataList:this.data.contractDataList.concat(res.data.content)
                });
                //判断是否允许继续请求
                if(this.data.contractDataList.length<totalItemNumber){
                    this.setData({
                        flag:true
                    })
                }else{
                    this.setData({
                        flag:false
                    })
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
        lower(){
            if(this.data.flag){
                this.setData({
                    page:this.data.page+1
                });
                this.requestData();
            }
        }
    })
