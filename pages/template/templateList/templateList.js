
import { updateMobileTemplate, getAccountTemplates } from '../../../wxapi/api.js';
const app = getApp();
let pageNum = 1,
    useStatus = 1,
    pageSize = 10,
    // templateSpecies = "batch",
    order = "DESC";
Page({
    data: {
        hidden: true,
        list: [],
        //scrollTop: 0,
        //scrollHeight: 0,
        isRequest: false,
        changeChecked: false,
        loading: false,
        loaded: false,
        refreshing: false,
        totalItemNumber: 0,
    },
    onLoad: function () {
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        //这里要注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                // that.setData({
                //   scrollHeight: res.windowHeight
                // });
            }
        });
        if (wx.getStorageSync('mobileTemplate')) {
            this.setData({
                changeChecked: true
            });
            this.getData("applet");
            return;
        }
        this.getData();

    },
    // 查看详情
    lookUp(e) {
        let signParams ={
            templateNo:e.target.dataset.templateno,
            templateSpecificType:e.target.dataset.templatespecifictype,
            operateType:'',
            templateName:e.target.dataset.templatename,
            strCreateTime: e.target.dataset.strcreatetime
        }
        Object.assign(app.globalData.contractParam,signParams)
        wx.navigateTo({
            url: '../templateDetail/templateDetail'
        })
    },
    //切换移动端
    switchChange(e) {
        this.setData({
            loading: false,
            loaded: false
        })
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        let changeValue = e.detail.value;
        if (changeValue) {
            changeValue = 1;
        } else {
            changeValue = 0;
        }
        let data = {
            "mobileTemplate": changeValue
        }
        let accountCode = wx.getStorageSync('accountCode')
        updateMobileTemplate(data, accountCode).then(res => {
            if (res.data.resultCode == "1") {
                this.setData({
                    changeChecked: changeValue
                });
                this.setData({
                    isRequest: false,
                });
                if (this.data.changeChecked) {
                    // this.data.list = [];
                    this.setData({
                      list: []
                    })
                    pageNum = 1;
                    this.getData("applet");
                } else {
                    // this.data.list = [];
                    this.setData({
                      list: []
                    })
                    pageNum = 1;
                    this.getData();
                }
                wx.setStorage({
                    key: 'mobileTemplate',
                    data: changeValue
                })
            } else {
                wx.showToast({
                    title: res.data.resultMessage,
                    icon: 'none',
                    duration: 2000
                })
            }
        }).catch(res => {
            this.setData({
                changeChecked: !changeValue
            })
        });
    },
    // 请求分页数据getData
    getData(data) {
        let accountCode = wx.getStorageSync('accountCode')
        let uploadData = {
            pageNum: pageNum,
            useStatus: useStatus,
            pageSize: pageSize,
            // templateSpecies: templateSpecies,
            order: order
        }
        if (data == "applet") {
            uploadData = {
                pageNum: pageNum,
                useStatus: useStatus,
                pageSize: pageSize,
                // templateSpecies: templateSpecies,
                order: order,
                mobileTemplate: Number(this.data.changeChecked)
            }
            // this.data.list = [];
        }
        getAccountTemplates(uploadData, accountCode).then(res => {
            wx.stopPullDownRefresh();
            wx.hideLoading();
          wx.hideNavigationBarLoading()
            this.setData({
                loading: false,
                // refreshing: false,
                totalItemNumber: res.data.totalItemNumber
            });
            let totalItemNumber = res.data.totalItemNumber;
            var list = this.data.list;
            let contents = res.data.contents;
            for (let i = 0; i < contents.length; i++) {
                list.push(res.data.contents[i]);
            }
            if (this.data.list.length <= totalItemNumber) {
                this.setData({
                    list: list
                });
            } else {
                this.setData({
                    isRequest: true,
                });
            }
            pageNum++;
            this.setData({
                hidden: true
            });
        }).catch(res => {

        })

    },
    //页面滑动到底部
    onReachBottom: function () {
        if (this.data.totalItemNumber > this.data.list.length) {
            this.setData({
                loading: true,
                loaded: false
            })
            if (this.data.changeChecked) {
                this.getData("applet");
                return false;
            }
            this.getData();
        } else {
            this.setData({
                loading: false,
                loaded: true
            })
        }
    },
    //下拉刷新
    onPullDownRefresh: function (event) {
      wx.showNavigationBarLoading()
        this.setData({
            loading: false,
            loaded: false,
            // refreshing: true
        })
        this.setData({
            isRequest: false,
        });
        // this.setData({
        //   list: []
        // })
        pageNum = 1;
        if (wx.getStorageSync('mobileTemplate')) {
            this.getData("applet");
            return;
        }
        this.getData();
    }
})
