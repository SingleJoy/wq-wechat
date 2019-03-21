// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        focus: false,
        inputValue: '',
        contractName:'合同名称合同名称',
        signUser:'签署人签署人',
        time:'2019-01-01',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    //输入框根据查询条件搜索点击事件
    inputSearch(e) {
        // 获取用户输入框中的值
        console.log(e);
        let inputValue = e.detail.value['search-input'] ? e.detail.value['search-input'] : e.detail.value;
        if(inputValue){
            this.requestData(inputValue);
        }else{
            return false
        }

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