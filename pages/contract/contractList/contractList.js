import {
    contractFilings,
    getAccounts,
    contracts,
    b2bContrants
} from '../../../wxapi/api';
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
            folderName:'默认文件夹',
            contractTypeName:'对个人合同',
            accountTypeName:'全部账号',
            accountNo:'',
            currentTab:0,
            height:height,
            sum:1,
            model:true,
            selected:0,
            contractStatus:3,
            folderList:[], //归档文件夹列表
            accountList:[], //账户角色列表
            pageNo:1, //页码数默认为1
            folderNo:'', //选择归档文件编号 查询数据接口使用
            contractDataList:[], //查询数据
            scrollTop:'', //页面滑动
            secondAccountCode:'', //二级账号accountCode
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onPageScroll: function (e) {//监听页面滚动
            this.setData({
                scrollTop: e.scrollTop
            })
        },

        onLoad: function (options) {
            let contractStatus=options.contractStatus;
            if(contractStatus){
                this.setData({
                    contractStatus:contractStatus
                })
            }else{
                this.setData({
                    contractStatus:3
                })
            }
            const interfaceCode = wx.getStorageSync('interfaceCode');
            const accountCode = wx.getStorageSync('accountCode');
            const mobile = wx.getStorageSync('mobile');
            const enterpriseName = wx.getStorageSync('enterpriseName');
            const accountLevel = wx.getStorageSync('accountLevel');
            this.setData({
                interfaceCode:interfaceCode,
                accountCode:accountCode,
                secondAccountCode:accountCode,
                mobile:mobile,
                enterpriseName:enterpriseName,
                accountLevel:accountLevel,
            });
            //查询所有归档文件夹
            this.contractFilings();
            this.getAccounts();
            this.searchData();

        },
        //查询所有规定文件夹
        contractFilings(){
            let interfaceCode=this.data.interfaceCode;
            let accountCode=this.data.accountCode;
            contractFilings(interfaceCode,accountCode).then(res=>{
                if(res.data.resultCode==1){
                    this.setData({
                        folderList: res.data.dataList
                    })

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
                if(res.data.resultCode == 1){
                    let dataList=res.data.dataList;
                    //一级账号 把一级账号数据
                    if(this.data.accountLevel==1){
                        dataList.unshift({accountCode:'',accountName:'全部'},{accountCode:accountCode,accountName:enterpriseName})
                    }
                    this.setData({
                        accountList:dataList
                    })
                     // console.log(this.data.accountList)
                }
            })
        },
        //列表查询  包括b2c,b2b数据
        searchData(num){
            if(!num){
                num=1;
            }
            let  param ={
                'pageNo':this.data.pageNo,
                'pageSize':10,
                'contractStatus':this.data.contractStatus,
                'accountCode':this.data.secondAccountCode,
                'filingNo':this.data.folderNo?this.data.folderNo:'',
                'accountLevel':this.data.accountLevel,
            };
            if(num==1){
                this.contracts(param);
            }else{
                this.b2bContrants(param);
            }

        },
        //b2c列表
        contracts(param){
            let interfaceCode=this.data.interfaceCode;
            contracts(interfaceCode,param).then(res=>{
                // console.log(res);
                this.setData({
                    contractDataList:res.data.content
                })

            }).catch(error=>{

            })
        },
        //b2b列表
        b2bContrants(param){
            let interfaceCode=this.data.interfaceCode;
            b2bContrants(interfaceCode,param).then(res=>{
                // console.log(res);
                this.setData({
                    contractDataList:res.data.content
                })


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
                })
            }else{
                this.setData({
                    selected:current,
                    currentTab:current,
                })
            }

        },
        //选择文件夹
        chooseFolder(e){
            this.resetStyle();
            let folderNo=e.currentTarget.dataset.filingno;
            let filingName=e.currentTarget.dataset.filingname;
            // console.log(e.currentTarget.dataset)

            this.setData({
                folderName:filingName,
                folderNo:folderNo,
            })
            this.searchData()
        },
        //展开对企业对个人选择
        tabContractType(e){
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
        //展开账号选择
        tabAccountNo(e){
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
        //选择对企业或者对个人合同
        chooseContractType(e){
            this.resetStyle();
            let num=e.currentTarget.dataset.num;
            if(num==1){
                this.setData({
                    contractTypeName:"企业对个人",
                })
            }else{
                this.setData({
                    contractTypeName:"企业对企业",
                })
            }
            this.searchData(num);
        },
        //选择账号
        accountType(e){
            this.resetStyle();
            let accountName=e.currentTarget.dataset.accountname;
            let secondAccountCode=e.currentTarget.dataset.accountcode;

            this.setData({
                accountTypeName:accountName,
                secondAccountCode:secondAccountCode,
            });

            this.searchData();
        },

        //关闭弹窗model蒙层
        closeModel(){
            this.setData({
                selected:0,
                currentTab:0,
            })
        },
        tabNavContract(e){
            let contractStatus=e.currentTarget.dataset.current;
            this.setData({
                contractStatus:contractStatus,
            });
            this.searchData()
        },
        //去搜索页面
        goSearch(){

            wx.navigateTo({
                url: '/pages/contract/contractSearch/contractSearch'
            })
        },
        //去合同详情页面
        goDetail(e){
            let contractNo=e.currentTarget.dataset.contractno;
            let contractStatus=e.currentTarget.dataset.contractstatus;
            let creater=e.currentTarget.dataset.creater;
            let operator=e.currentTarget.dataset.operator;
            let contract={
                'contractNo':contractNo,
                'contractStatus':contractStatus,
                'operator':operator,
                'creater':creater,
            };
            wx.setStorage({ key: 'contractNo',data: contractNo});
            wx.navigateTo({
                url: '/pages/contract/contractDetail/contractDetail?contract='+JSON.stringify(contract)
            })
        },
        upper(){

        },

        lower(e) {

        },

        resetStyle(){
            this.setData({
                selected:0,
                currentTab:0,
                contractStatus:3,
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
            let pages =  getCurrentPages();
            let currPage = pages[pages.length - 1];
            if (currPage.data.param) {
                
            }
            const interfaceCode = wx.getStorageSync('interfaceCode');
            const accountCode = wx.getStorageSync('accountCode');
            const mobile = wx.getStorageSync('mobile');
            const enterpriseName = wx.getStorageSync('enterpriseName');
            const accountLevel = wx.getStorageSync('accountLevel');
            this.setData({
                interfaceCode:interfaceCode,
                accountCode:accountCode,
                secondAccountCode:accountCode,
                mobile:mobile,
                enterpriseName:enterpriseName,
                accountLevel:accountLevel,
            });
            //查询所有归档文件夹
            this.contractFilings();
            this.getAccounts();
            this.searchData();
        },

        /**
         * 生命周期函数--监听页面隐藏
         */
        onHide: function () {
            this.setData({
                folderName:'默认文件夹',
                contractTypeName:'对个人合同',
                accountTypeName:'全部账号',
                accountNo:'',
                currentTab:0,
                height:height,
                sum:1,
                model:true,
                selected:0,
                contractStatus:3,
                folderList:[], //归档文件夹列表
                accountList:[], //账户角色列表
                pageNo:1, //页码数默认为1
                folderNo:'', //选择归档文件编号 查询数据接口使用
                contractDataList:[], //查询数据
                scrollTop:'', //页面滑动
                secondAccountCode:'', //二级账号accountCode
            })
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

        }
    })