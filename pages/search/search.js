// pages/serach/serach.js
Page({

     /**
     * 页面的初始数据
     */
    data: {
        focus: false,
        inputValue: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    //输入框根据查询条件搜索点击事件
    inputSearch(e) {
        // 获取用户输入框中的值
        console.log(e)
        let inputValue = e.detail.value['search-input'] ? e.detail.value['search-input'] : e.detail.value;

        console.log(inputValue)

        this.requestData(inputValue);
    },
    //请求后端数据方法
    requestData(inputValue){
     console.log(inputValue)

    },
    //清空输入
    clearInput(){
        this.setData({
            inputVal: ''
        });
    },
    //检测input输入
    changeInput(e){
      console.log(e.detail.value);
        this.setData({
            inputVal: e.detail.value
        });
    }
})
