
import { updateMobileTemplate, getAccountTemplates } from '../../../wxapi/api.js';
const app = getApp();
let pageNum = 1,
    useStatus = 1,
    pageSize = 10,
    templateSpecies = "batch",
    order = "DESC";
Page({
  data: {
    hidden: true,
    list: [],
    //scrollTop: 0,
    //scrollHeight: 0,
    isRequest: false,
    changeChecked: false,
    // loading: false,
    // loaded: false,
  },
  onLoad: function () {
    //这里要注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        // that.setData({
        //   scrollHeight: res.windowHeight
        // });
      }
    });
    console.log(wx.getStorageSync('mobileTemplate'))
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
      scrollTop: "0"
    });
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
          this.data.list = [];
          pageNum = 1;
          this.getData("applet");
        } else {
          this.data.list = [];
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
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    // this.setData({
    //   hidden: false,
    //   loading: true,
    // });
    // let accountCode = "AC5c1a0198e0664418ad724eae234174fe";
    let accountCode = wx.getStorageSync('accountCode')
    let uploadData = {
      pageNum: pageNum,
      useStatus: useStatus,
      pageSize: pageSize,
      templateSpecies: templateSpecies,
      order: order
    }
    if (data == "applet") {
      uploadData = {
        pageNum: pageNum,
        useStatus: useStatus,
        pageSize: pageSize,
        templateSpecies: templateSpecies,
        order: order,
        mobileTemplate: Number(this.data.changeChecked)
      }
      // this.data.list = [];
    }
    getAccountTemplates(uploadData, accountCode).then(res => {
      wx.hideLoading()
      // this.setData({
      //   loading: false,
      // });
      let totalItemNumber = res.data.totalItemNumber;
      var list = this.data.list;
      let contents = res.data.contents;
      for (var i = 0; i < contents.length; i++) {
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
      console.log(this.data.isRequest)
      // if (totalItemNumber <= 0) {
      //   this.setData({
      //     scrollHeight: "100rpx"
      //   });
      // }
      pageNum++
      this.setData({
        hidden: true
      });
    }).catch(res => {

    })

  },
  // onPullDownRefresh() {
  //   console.log(3332134)
  //   pageNum = 1;
  //   this.setData({
  //     isRequest: false,
  //   });
  //   this.getData();
  // },
  //页面滑动到底部
  onReachBottom: function () {
    console.log(1111)
    if (this.data.isRequest) {
      wx.showToast({
        title: '没有更多数据了',
        icon: "none",
        mask: true
      })
      setTimeout(() => {
        wx.hideLoading()
      }, 1000)
      return false;
    }
    if(this.data.changeChecked) {
      this.getData("applet");
      return false;
    }
    this.getData();
  },
  // scroll: function (event) {
  //   console.log(event.detail.scrollTop)
  //   //该方法绑定了页面滚动时的事件，记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
  //   this.setData({
  //     scrollTop: event.detail.scrollTop
  //   });
  // },
  onPullDownRefresh: function (event) {
    //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    // this.setData({
    //   scrollTop: "0"
    // });
    this.setData({
      isRequest: false,
    });
    console.log(333)
    this.data.list = [];
    pageNum = 1;
    if (wx.getStorageSync('mobileTemplate')) {
      this.getData("applet");
      return;
    }
    this.getData();
  }
})