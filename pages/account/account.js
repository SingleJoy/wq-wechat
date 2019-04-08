
import { getAccountInformation,getCertificate,getSignatures,exitAndDeleteSession} from '../../wxapi/api.js';


Page({
    data: {
        interfaceCode:"" ,
        accountCode:"" ,
        enterpriseName: "",
        mobile: "",
        authorizerName: "",
        email: "",
        b2bNum:"",
        b2cNum:"",
        certificateNo:'',
        companyName:'',
        effectiveStartTime:'',
        effectiveEndTime:'',
        signaturePath:''

    },
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },
    //事件处理函数
    loginOut(){

        wx.showModal({
            title: '提示',
            content: '确定退出当前账号?',
            success(res) {
                if (res.confirm) {
                    exitAndDeleteSession().then((res)=>{
                        try {
                            //清除缓存数据
                            wx.clearStorageSync();
                            //清除成功后跳转登录页
                            wx.redirectTo({
                                url:'/pages/auth/login/login'
                            })
                        } catch (e) {

                        }

                    }).catch(error=>{

                    })



                } else if (res.cancel) {
                    return false
                }
            }
        })


    },


    onLoad: function () {
      wx.showLoading({
        title: '加载中',
      })
        try {
            const interfaceCode = wx.getStorageSync('interfaceCode');
            const accountCode = wx.getStorageSync('accountCode');
            const mobile = wx.getStorageSync('mobile');
            this.setData({
                interfaceCode:interfaceCode,
                accountCode:accountCode,
                mobile:mobile,
            });
            this.getAccountInformation();
            this.getCertificate();
            this.getSignatures();
        } catch (e) {

        }

    },

    getAccountInformation(){
      wx.hideLoading()
        let accountCode=this.data.accountCode;
        getAccountInformation(accountCode).then(res=> {
            if(res.data.resultCode=='1'){
                this.setData({
                    mobile:res.data.data.mobile,
                    email:res.data.data.email,
                    enterpriseName:res.data.data.enterpriseName,
                    b2bNum:res.data.data.b2bNum,
                    b2cNum:res.data.data.b2cNum,
                    authorizerName:res.data.data.authorizerName,
                })

            }
        }).catch(error=>{

        })
    },
    getCertificate(){
      wx.hideLoading()
        let interfaceCode=this.data.interfaceCode;
        getCertificate(interfaceCode).then(res=> {
            if(res.data.resultCode=='1'){
                this.setData({
                    effectiveStartTime:res.data.data.certificateStartTime,
                    effectiveEndTime:res.data.data.certificateDueTime,
                    companyName:res.data.data.companyName,
                    certificateNo:res.data.data.certificateNo,
                })

            }
        }).catch(error=>{

        })
    },
    getSignatures(){
      wx.hideLoading()
        let interfaceCode=this.data.interfaceCode;
        getSignatures(interfaceCode).then(res=> {

            if(res.data.resultCode=='1'){

                for(let i=0;i<res.data.dataList.length;i++){
                    if(res.data.dataList[i].defultCode==1){
                        this.setData({
                            signaturePath:res.data.dataList[i].signaturePath
                        })

                        console.log(res.data.dataList[i].signaturePath)
                    }
                }

            }else{

            }
        }).catch(error=>{

        })
    },


})
