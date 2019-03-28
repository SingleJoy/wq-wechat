
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
    scrollTop: 0,
    scrollHeight: 0,
    isRequest: false,
    changeChecked: false
  },
  onLoad: function () {
    //   这里要注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    if (wx.getStorageSync('mobileTemplate')) {
      this.setData({
        changeChecked: true
      });
      this.getData("applet");
    }
    this.getData();
  },
  // 查看详情
  lookUp(e) {
    let signParams ={
        templateNo:e.target.dataset.templateno,
        templateSpecificType:e.target.dataset.templatespecifictype,
        operateType:''
    }
    Object.assign(app.globalData.contractParam,signParams)
    wx.navigateTo({
      url: '../templateDetail/templateDetail'
    })
  },
  //切换移动端
  switchChange(e) {
    let changeValue = e.detail.value;
    if (changeValue) {
      changeValue = 1;
    } else {
      changeValue = 0;
    }
    let data = {
      "mobileTemplate": changeValue
    }
    let accountCode = "ACdcbfa3bb0d4a898a5eae66ae411aaf";
    updateMobileTemplate(data, accountCode).then(res => {
      this.setData({
        changeChecked: changeValue
      });
      if (this.data.changeChecked) {
        this.getData("applet");
      } else {
        this.getData();
      }
      wx.setStorage({
        key: 'mobileTemplate',
        data: changeValue
      })
      
    }).catch(res => {
      this.setData({
        changeChecked: !changeValue
      })
    });
  },
  // 请求分页数据getData
  getData(data) {
    this.setData({
      hidden: false
    });
    let accountCode = "AC5c1a0198e0664418ad724eae234174fe";
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
      this.data.list = [];
    }
    getAccountTemplates(uploadData, accountCode).then(res => {
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
      pageNum++
      this.setData({
        hidden: true
      });
    }).catch(res => {

    })

  },
  //页面滑动到底部
  bindDownLoad: function () {
    if (this.data.isRequest) {
      wx.showToast({
        title: '没有更多数据',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if(this.data.changeChecked) {
      this.getData("applet");
    }
    this.getData();
  },
  scroll: function (event) {
    //该方法绑定了页面滚动时的事件，记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  // topLoad: function (event) {
  //   //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
  //   this.setData({
  //     list: [],
  //     scrollTop: 0
  //   });
  //   this.getData(this.data.uploadData);
  //   console.log("lower");
  // }
})