// pages/template/templateSet/tempalteSet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //弹框赋值
    listValue: {
      nameValue: "11",
      nameIdcard: "2",
      namePhone: "3"
    },
    //编辑/添加签署人保存标识
    identification: "",
    //编辑/添加签署人数据索引
    listIndex: "",
    //model弹框验证
    model: {
      nameHint: "请输入姓名",
      isShowNameHint: false,
      idcardHint: "请输入身份证",
      isShowIdcardHint: false,
      mobileHint: "请输入手机号",
      isShowMobileHint: false,
    },
    //添加签署人信息保存
    dataList: [
      { name: "小明", idCode: "545214552233663321", phone: "15685474458" },
      { name: "大明", idCode: "545214552233663321", phone: "15545454545" }
    ],
    nameHint: "请输入姓名",
    showModal: false
  },
  //添加签署人（显示弹框）操作
  showDialogBtn: function (e) {
    let value = e._relatedInfo.anchorTargetText;
    this.setData({
      identification: value
    });
    this.setData({
      showModal: true
    });
    if (value == "添加签署人") {
      this.setData({
        listValue: {
          nameValue: "",
          nameIdcard: "",
          namePhone: ""
        },
        model: {
          nameHint: "请输入姓名",
          isShowNameHint: false,
          idcardHint: "请输入身份证",
          isShowIdcardHint: false,
          mobileHint: "请输入手机号",
          isShowMobileHint: false,
        }
      })
      console.log(11132344)
      return;
    } 
    let modelList = this.data.dataList[e.target.dataset.id];
    console.log(e.target.dataset.id)
    this.setData({
      listIndex: e.target.dataset.id
    })
    this.setData({
      listValue: {
        nameValue: modelList.name,
        nameIdcard: modelList.idCode,
        namePhone: modelList.phone
      },
      model: {
        nameHint: modelList.name,
        isShowNameHint: false,
        idcardHint: modelList.idCode,
        isShowIdcardHint: false,
        mobileHint: modelList.phone,
        isShowMobileHint: false,
      }
    })
  },
  //弹框关闭操作
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  //获取input输入的值
  inputChange: function(e) {
    // console.log(e)
  },
  //提交表单数据
  formSubmitModel: function(e) {
    if (!e.detail.value.name) {
      this.setData({
        model: {
          nameHint: "请输入姓名",
          isShowNameHint: true,
        }
      })
      return;
    } else {
      this.setData({
        model: {
          nameHint: "请输入姓名",
          isShowNameHint: false,
        }
      })
    }
    if (!e.detail.value.idCode) {
      this.setData({
        model: {
          idcardHint: "请输入身份证",
          isShowIdcardHint: true,
        }
      })
      return;
    } else {
      this.setData({
        model: {
          idcardHint: "请输入身份证",
          isShowIdcardHint: false,
        }
      })
    }
    if (!e.detail.value.phone) {
      this.setData({
        model: {
          mobileHint: "请输入手机号",
          isShowMobileHint: true,
        }
      })
      return;
    } else {
      this.setData({
        model: {
          mobileHint: "请输入手机号",
          isShowMobileHint: false,
        }
      })
    }
    if (this.data.identification == "添加签署人") {
      let dataList = this.data.dataList;
      dataList.push(e.detail.value)
      this.setData({
        dataList
      })
      console.log(222)
      this.hideModal()
    } else {
      let dataList = this.data.dataList;
      dataList[this.data.listIndex] = e.detail.value;
      this.setData({
        dataList
      })
      this.hideModal()
    }
  },
  checkboxChange: function(e) {
    console.log(e.detail.value)
  }, 
  //生成合同
  formSubmit: function(e) {
    console.log(e)
  },
  //弹框确定操作
  onConfirm: function (e) {
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  /**
   * 日期时间选择控件
   */
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
})