
import { updateMobileTemplate, getAccountTemplates } from '../../../wxapi/api.js';
Page({
  data: {
    hidden: true,
    lists: [],
    scrollTop: 0,
    scrollHeight: 0
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
    let pageDate = {
      pageNum: 1,
      useStatus: 1,
      pageSize: 10,
      templateSpecies: "single",
      order: "DESC"
    }
    this.getData(pageDate);
  },
  getData(data) {
    getAccountTemplates(data).then(res =>{
      this.setData({
        lists: res.data.contents
      })
      console.log(res.data.contents)
    }).catch(res => {
      
    })
  },
  switch1Change(e) {
    let changeValue = e.detail.value;
    if (changeValue) {
      changeValue = 1;
    } else {
      changeValue = null;
    }
    let data = {
      "mobileTemplate": "1"
    }
    console.log(typeof JSON.stringify(data));
    updateMobileTemplate(data).then(res => {
      console.log(res)
    }).catch(res => {

    });
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
  },
  // 查看详情
  lookUp() {
    wx.navigateTo({
      url: '../templateDetail/templateDetail'
    })
  },
  //页面滑动到底部
  bindDownLoad: function () {
    var that = this;
    loadMore(that);
    console.log("lower");
  },
  scroll: function (event) {
    //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  topLoad: function (event) {
    //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    page = 0;
    this.setData({
      list: [],
      scrollTop: 0
    });
    loadMore(this);
    console.log("lower");
  }
})