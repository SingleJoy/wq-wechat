import {
    contractFilings,
    getAccounts,
    contracts,
    b2bContrants, getAccountInformation,

} from '../../../wxapi/api';
const app = getApp();

//获取设备高度
let height;
wx.getSystemInfo({
    success:  (res)=> {
        height:res.screenHeight
    },
});
Page({

    /**
     * 页面的初始数据
     */
    data: {
        folderName:'默认文件夹',
        contractTypeName:'企业对个人',
        accountTypeName:'',
        accountNo:'',
        currentTab:0,
        height:height,
        model:true,
        show:false,
        selected:0,
        num:1,
        contractStatus:3,
        folderList:[], //归档文件夹列表
        accountList:[], //账户角色列表
        pageNo:1, //页码数默认为1
        filingNo:'', //选择归档文件编号 查询数据接口使用
        contractDataList:[], //查询数据
        scrollTop:'', //页面滑动
        flag:true,
        refreshing:false,
        queryAccountCode:'', //筛选列表 accountCode
    },
    /**
     * 生命周期函数--监听页面加载
     */

    onPullDownRefresh() {
      wx.showNavigationBarLoading();
        this.setData({
            // refreshing: true
        });
        this.setData({
            pageNo:1,
            contractDataList:[],
        });
        this.searchData();
    },
    onLoad: function (options) {
        let interfaceCode =wx.getStorageSync('interfaceCode');
        let accountCode= wx.getStorageSync('accountCode');
        let mobile= wx.getStorageSync('mobile');
        let enterpriseName= wx.getStorageSync('enterpriseName');
        let accountLevel=wx.getStorageSync('accountLevel');
        let contractStatus=options.contractStatus;
        if(contractStatus){
            this.setData({
                contractStatus:contractStatus,
                interfaceCode:interfaceCode,
                accountCode:accountCode,
                mobile:mobile,
                enterpriseName:enterpriseName,
                accountLevel:accountLevel,
            })
        }else{
            this.setData({
                contractStatus:3,
                interfaceCode:interfaceCode,
                accountCode:accountCode,
                mobile:mobile,
                enterpriseName:enterpriseName,
                accountLevel:accountLevel,
            })
        }
        if(this.data.accountLevel==2){
            this.setData({
                queryAccountCode:accountCode,
            });
            this.getAccountInformation();
        }

    },
    getAccountInformation(){

        let accountCode=this.data.accountCode;
        getAccountInformation(accountCode).then(res=> {
            if(res.data.resultCode=='1'){
                this.setData({
                    accountName: res.data.data.accountName,
                })

            }
        }).catch(error=>{

        });
    },
    //查询所有规定文件夹
    contractFilings(){
        let interfaceCode=this.data.interfaceCode;
        let accountCode=this.data.accountCode;
        contractFilings(interfaceCode,accountCode).then(res=>{
            if(res.data.resultCode==1){
                let dataList=res.data.dataList;
                dataList.unshift({filingName:'默认文件夹',filingNo:''});
                this.setData({
                    folderList: dataList
                });
            }else{

            }
        }).catch(error=>{

        })
    },
    //查询账号关联角色
    getAccounts(){
        let interfaceCode=this.data.interfaceCode;
        let accountCode=this.data.accountCode;
        let enterpriseName=this.data.enterpriseName;
        getAccounts(interfaceCode).then(res=>{
            let dataList=[];
            //有二级账号角色
            if(res.data.resultCode == 1){
                if(res.data.dataList&&res.data.dataList.length){
                     dataList=res.data.dataList;
                }
                //一级账号 把一级账号数据Push进入数组
                if(this.data.accountLevel==1){
                    dataList.unshift({accountCode:'',accountName:'全部账号'},{accountCode:accountCode,accountName:enterpriseName})
                }

                this.setData({
                    accountList:dataList,
                    accountTypeName:app.globalData.searchParam.accountTypeName?app.globalData.searchParam.accountTypeName:dataList[0].accountName,
                });


            }else{
                //没有二级账号
                this.setData({
                    accountList:dataList,
                    accountTypeName:app.globalData.searchParam.accountTypeName?app.globalData.searchParam.accountTypeName:'',
                });
            }
        })
    },
    //列表查询  包括b2c,b2b数据
    searchData(){
        if(this.data.accountLevel==2){
            this.setData({
                queryAccountCode:wx.getStorageSync('accountCode')
            })
        }
        let  param ={
            'pageNo':this.data.pageNo,
            'pageSize':10,
            'contractStatus':this.data.contractStatus,
            'accountCode':this.data.queryAccountCode,
            'filingNo':this.data.folderNo?this.data.folderNo:'',
            'accountLevel':this.data.accountLevel,
        };
        if(this.data.num==1){
            this.contracts(param);
        }else{
            this.b2bContrants(param);
        }

    },
    //b2c列表
    contracts(param){

        let interfaceCode=this.data.interfaceCode;
        wx.showLoading({
            title: '加载中...',
            mask: true
        });
        contracts(interfaceCode,param).then(res=>{
          wx.stopPullDownRefresh();
          wx.hideNavigationBarLoading();
            let totalItemNumber=res.data.totalItemNumber;
            if(this.data.num==1){
                setTimeout(()=>{
                    wx.hideLoading();
                },500);
                this.setData({
                    contractDataList:this.data.contractDataList.concat(res.data.content)
                });
            }else{
                this.setData({
                    contractDataList:res.data.content
                });
            }
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
            this.setData({
                refreshing: false
            });
        }).catch(error=>{

        })
    },
    //b2b列表
    b2bContrants(param){
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading()
        let interfaceCode=this.data.interfaceCode;
        wx.showLoading({
            title: '加载中...',
            mask: true
        });
        b2bContrants(interfaceCode,param).then(res=>{

            let totalItemNumber=res.data.totalItemNumber;
            if(this.data.num==2){
                setTimeout(()=>{
                    wx.hideLoading();
                },500);
                this.setData({
                    contractDataList:this.data.contractDataList.concat(res.data.content)
                });
            }else{
                this.setData({
                    contractDataList:res.data.content
                });
            }

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
            this.setData({
                refreshing: false
            });
        }).catch(error=>{

        })
    },
    // 展开文件夹
    tabFolder(e){
        // console.log(e.currentTarget.dataset.current)
        let current=e.currentTarget.dataset.current;
        if(current==this.data.selected){
            this.setData({
                selected:0,
                currentTab:0,
            });
        }else{
            this.setData({
                selected:current,
                currentTab:current,
            });
        }

    },
    //选择文件夹
    chooseFolder(e){
        this.resetStyle();
        let folderNo=e.currentTarget.dataset.filingno;
        let filingName=e.currentTarget.dataset.filingname;

        this.setData({
            pageNo:1,
            contractDataList:[],
            folderName:filingName,
            folderNo:folderNo,
        });
        this.searchData();
    },
    //展开对企业对个人选择
    tabContractType(e){
        let current=e.currentTarget.dataset.current;
        if(current==this.data.selected){
            this.setData({
                selected:0,
                currentTab:0,
            });
        }else{
            this.setData({
                selected:current,
                currentTab:current,
            });
        }

    },
    //展开账号选择
    tabAccountNo(e){
        let current=e.currentTarget.dataset.current;

        if(current==this.data.selected){
            this.setData({
                selected:0,
                currentTab:0,
            });
        }else{
            this.setData({
                selected:current,
                currentTab:current,
            });
        }
    },
    //选择对企业或者对个人合同
    chooseContractType(e){
        this.resetStyle();
        let num=e.currentTarget.dataset.num;

        this.setData({
            pageNo:1,
            num:num,
            contractDataList:[],
        });

        if(this.data.num==1){
            this.setData({
                contractTypeName:"企业对个人",
            });
        }else{
            this.setData({
                contractTypeName:"企业对企业",
            });
        }
        this.searchData();
    },
    //选择账号
    accountType(e){
        this.resetStyle();
        let accountName=e.currentTarget.dataset.accountname;
        let queryAccountCode=e.currentTarget.dataset.accountcode;

        this.setData({
            pageNo:1,
            contractDataList:[],
            accountTypeName:accountName,
            queryAccountCode:queryAccountCode,
        });
        this.searchData();
    },

    //关闭弹窗model蒙层
    closeModel(){
        this.setData({
            selected:0,
            currentTab:0,
        });
    },
    tabNavContract(e){
        let contractStatus=e.currentTarget.dataset.current;
        if(contractStatus!=this.data.contractStatus){
            this.setData({
                flag:true,
            });
        }
        this.setData({
            pageNo:1,
            contractDataList:[],
            contractStatus:contractStatus,
        });
        this.searchData();
    },
    //去搜索页面
    goSearch(){
        this.setData({
            show:true
        });
        let signParams={
            'num':this.data.num,
            'contractStatus':this.data.contractStatus,
            'pageNo':1,
            'pageSize':10,
            'show':false,
            'queryAccountCode':this.data.queryAccountCode,
            'filingNo':this.data.folderNo?this.data.folderNo:'',
            'accountLevel':this.data.accountLevel,
            'folderName':this.data.folderName,
            'contractTypeName':this.data.contractTypeName,
            'accountTypeName':this.data.accountTypeName,
        };
        Object.assign(app.globalData.searchParam,signParams);
        wx.navigateTo({
            url: '/pages/contract/contractSearch/contractSearch'
        });
    },
    //去合同详情页面
    goDetail(e){
        let contractNo=e.currentTarget.dataset.contractno;
        let contractStatus=e.currentTarget.dataset.contractstatus;
        let creater=e.currentTarget.dataset.creater;
        let operator=e.currentTarget.dataset.operator;
        let validTime=e.currentTarget.dataset.validtime;
        this.setData({
            show:true
        });

        let signParams={
            'contractNo':contractNo,
            'contractStatus':contractStatus,
            'operator':operator,
            'creater':creater,
            'validTime':validTime,
            'num':this.data.num,
            'show':false,
            'pageNo':1,
            'pageSize':10,
            'queryAccountCode':this.data.queryAccountCode,
            'filingNo':this.data.folderNo?this.data.folderNo:'',
            'accountLevel':this.data.accountLevel,
            'folderName':this.data.folderName,
            'contractTypeName':this.data.contractTypeName,
            'accountTypeName':this.data.accountTypeName,
        };
        Object.assign(app.globalData.searchParam,signParams);
        if(this.data.num==1){
            wx.navigateTo({
                url: '/pages/contract/contractDetail/contractDetail'
            });
        }else{
            wx.navigateTo({
                url: '/pages/contract/b2bContractDetail/b2bContractDetail'
            });
        }

    },
    upper(){

    },
    // 上滑懒加载
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

    resetStyle(){
        this.setData({
            selected:0,
            currentTab:0,
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
        wx.getSystemInfo({
            success:  (res)=> {
                this.setData({
                    height:res.screenHeight
                });
            },
        });

        let searchParam=app.globalData.searchParam;
        let search=Object.keys(searchParam);
        //判断页面是从哪个进入，如果是从contractSearch 保存从contractSearch 获取app.data存储的数据
        if (search.length>0) {

            Object.keys(searchParam).forEach((key)=>{
                this.setData({
                    [key]:searchParam[key],
                });
            });
            this.setData({
                contractDataList:[]
            });

            this.setData({
                contractStatus:this.data.contractStatus==0?4:this.data.contractStatus,
            });
            // console.log(this.data.contractStatus)
            //查询所有归档文件夹
            this.contractFilings();
            if(this.data.accountLevel==1){
                this.getAccounts();
            }
            this.searchData();

        }else{

            //查询所有归档文件夹
            this.contractFilings();
            if(this.data.accountLevel==1){
                this.getAccounts();
            }
            this.searchData();
        }

    },
    move(){

    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

        if(this.data.show){

        }else{
            this.setData({
                folderName:'默认文件夹',
                contractTypeName:'企业对个人',
                accountTypeName:'',
                accountNo:'',
                currentTab:0,
                model:true,
                selected:0,
                show:false,
                num:1,
                contractStatus:3,
                folderList:[], //归档文件夹列表
                accountList:[], //账户角色列表
                pageNo:1, //页码数默认为1
                folderNo:'', //选择归档文件编号 查询数据接口使用
                contractDataList:[], //查询数据
                scrollTop:'', //页面滑动
                queryAccountCode:'', //二级账号accountCode
                flag:true,
            });
            app.globalData.searchParam={};

        }



    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

});