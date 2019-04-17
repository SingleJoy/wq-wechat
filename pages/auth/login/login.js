
import util from '../../../utils/util.js';
import { tenant, login, bindEnterprises,homePage} from '../../../wxapi/api.js';
const md5 = require('../../../utils/md5.js');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        username:'',
        password:'',
        usernameErr:'',
        passwordErr:'',
        canSubmit:true, //点击按钮
        isSubmit:false,// 单点操作
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(app.globalData)
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
    formSubmit:function(e){
      wx.showLoading({
        title: '加载中',
      })
        if(!this.data.isSubmit){
            this.setData({
                isSubmit:true
            })
            let data={
                username: this.data.username
            }
            let login_data = {
                username: this.data.username,
                password:md5(this.data.password)
            }
            let homepage_data = {
                mobile: this.data.username
            }
            //验证账户
            tenant(data).then(res=>{
                if(res.data == 0){
                    //登录
                    this.setData({
                        isSubmit:false
                    })
                    login(login_data).then(res=>{

                        if(res.data.resultCode==1){
                          wx.setStorageSync("wesign_token", res.data.data);
                            //获取登录列表
                            bindEnterprises(homepage_data).then(res=>{
                                if (res.data.bindTenantNum == 1) {
                                    let res_data = '';
                                    if (res.data.dataList[0].length > 0) {   //判断是一级账号还是二级账号直接进首页
                                        res_data = res.data.dataList[0][0];
                                    } else {
                                        res_data = res.data.dataList[1][0];
                                    }
                                    wx.setStorage({ key: 'accountCode',data: res_data.accountCode})

                                    wx.setStorage({ key: 'interfaceCode',data: res_data.interfaceCode})
                                    wx.setStorage({key: 'accountLevel',data: res_data.accountLevel})
                                    wx.setStorage({key: 'enterpriseName',data: res_data.enterpriseName})
                                    wx.setStorage({key: 'mobile',data: res_data.mobile})
                                    //登录=>主页
                                    let data={
                                        mobile:res_data.mobile
                                    }
                                    homePage(res_data.interfaceCode,data).then(res=>{
                                      let signVerify = {
                                        signVerify: res.data.dataList[1].signVerify
                                      }
                                      Object.assign(app.globalData, signVerify)
                                      wx.setStorage({ key: 'mobileTemplate', data: res.data.dataList[1].mobileTemplate });
                                        wx.setStorage({key:'signVerify',data:res.data.dataList[1].signVerify});
                                        wx.setStorage({key:'email',data:res.data.dataList[0].email});
                                        wx.setStorage({ key: 'userCode',data:res.data.dataList[0].userCode});
                                        wx.setStorage({ key: 'parentAccountmobile', data: res.data.dataList[1].parentAccountmobile })
                                        if(res.data.resultCode==1){
                                          wx.hideLoading()
                                            if(res.data.dataList[1].auditSteps=='3'){
                                                if(res.data.dataList[1].accountStatus=='3'){
                                                    wx.switchTab({
                                                        url: '/pages/index/index'
                                                    })
                                                }
                                            }else{
                                                wx.navigateTo({
                                                    url: '/pages/auth/auth/auth'
                                                });
                                            }

                                        }else{
                                          wx.hideLoading()
                                        }
                                    }).catch(err=>{

                                    })
                                } else {
                                    wx.setStorage({key: 'dataList',data: JSON.stringify(res.data.dataList)})
                                  wx.hideLoading()
                                    wx.redirectTo({
                                        url: '/pages/auth/roles/roles'
                                    })
                                }
                            })
                        }else{
                          wx.hideLoading()
                            this.setData({
                                passwordErr:res.data.resultMessage
                            });
                        }
                    }).catch(err=>{

                    })
                }else{
                  wx.hideLoading()
                    this.setData({
                        usernameErr:'账户不存在',
                        isSubmit:false
                    });
                }
            }).catch(err=>{

            })
        }else{
            return false
        }

    },



    //输入框事件
    bindUsernameInput: function (e) {
        var user_val =  e.detail.value;

        this.setData({
            username: user_val,
        },()=>{
            this.checkBtn()
        });
    },
    bindPasswordInput: function (e) {
        var pwd_val =  e.detail.value;
        this.setData({
            password: pwd_val
        },()=>{
            this.checkBtn()
        });

    },
    //清除事件
    clearInput: function (e) {

        switch (e.currentTarget.id) {
            case 'clear-username':
                this.setData({
                    username: '',
                    usernameErr:''
                });
                break;
            case 'clear-password':
                this.setData({
                    password: '',
                    passwordErr:''
                });
                break;
            case 'clear-code':
                this.setData({
                    code: ''
                });
                break;
        }
        return false;
    },
    //手机号校验
    checkPhone(e){
        // console.log(e.detail.value)
        var input_value = e.detail.value;
        if(input_value&&!util.checkPhone(input_value)){
            this.setData({
                usernameErr:'手机号格式不正确'
            })
        }else{
            this.setData({
                usernameErr:''
            })
        }
    },
    //密码校验
    checkPwd(e){
        var pwd_value = e.detail.value;
        // console.log(pwd_value)
        if(pwd_value&&!util.checkPwd(pwd_value)){
            this.setData({
                passwordErr:'密码为8-16位字母加数字'
            })
        }else{
            this.setData({
                passwordErr:''
            })
        }
    },
    //提交按钮校验
    checkBtn(){
        // console.log(this.data.username,this.data.password)
        if(util.checkPhone(this.data.username)&&util.checkPwd(this.data.password)){
            this.setData({
                canSubmit:false
            })
        }else{
            this.setData({
                canSubmit:true
            })
        }
    },
    //长按识别二维码
    previewImage:function(e) {
        var current = e.target.dataset.src;
        wx.previewImage({
            current: current,
            urls: [current]
        })
    }
})
