// // pages/template/template.js
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     list:[
//       {
//         name:'fdsfds',
//         short_description:'sfsdf'
//       }
//     ],
//     hidden:true,
//     scrollTop:'10px',
//     scrollHeight:0,
//     scrollTop:0
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     let that = this;
//     wx.getSystemInfo({
//       success: function(res) {
//         console.log(res)
//         that.setData({
//           scrollHeight: res.windowHeight
//         })
//       },
//     })
//   },
//   loadingChange:function(){


//   },
//   topLoad:function(){

//   },
//   bindDownLoad:function(){

//   },
//   scroll: function (event) {
//     //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
//     this.setData({
//         scrollTop : event.detail.scrollTop
//     });
    
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })

var url = "http://www.imooc.com/course/ajaxlist";
var page =0;
var page_size = 5;
var sort = "last";
var is_easy = 0;
var lange_id = 0;
var pos_id = 0;
var unlearn = 0;


// 请求数据
var loadMore = function(that){
    that.setData({
        hidden:false
    });
    wx.request({
        url:url,
        data:{
            page : page,
            page_size : page_size,
            sort : sort,
            is_easy : is_easy,
            lange_id : lange_id,
            pos_id : pos_id,
            unlearn : unlearn
        },
        success:function(res){
            //console.info(that.data.list);
            var list = that.data.list;
            for(var i = 0; i < res.data.list.length; i++){
                list.push(res.data.list[i]);
            }
            that.setData({
                list : list
            });
            page ++;
            that.setData({
                hidden:true
            });
        }
    });
}
Page({
  data:{
    hidden:true,
    list:[],
    scrollTop : 0,
    scrollHeight:0
  },
  onLoad:function(){
    //   这里要注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
      var that = this;
      wx.getSystemInfo({
          success:function(res){
              that.setData({
                  scrollHeight:res.windowHeight
              });
          }
      });
       loadMore(that);
  },
  //页面滑动到底部
  bindDownLoad:function(){   
      var that = this;
      loadMore(that);
      console.log("lower");
  },
  scroll:function(event){
    //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
     this.setData({
         scrollTop : event.detail.scrollTop
     });
  },
  topLoad:function(event){
    //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
      page = 0;
      this.setData({
          list : [],
          scrollTop : 0
      });
      loadMore(this);
      console.log("lower");
  }
})