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
    //弹框标题
    addSignature: "添加签署人",
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
    showModal: false,
    //删除样式
    delate: "9",
  },
  //右滑开始
  touchStart(e) {
    console.log(e.target)
    this.setData({
      "touch.x": e.changedTouches[0].clientX,
      "touch.y": e.changedTouches[0].clientY
    });
  },
  //右滑操作
  getTouchData (endX, endY, startX, startY){
    let _this = this;
    // console.log(_this.data.listIndex);
    let turn = "";
    if (endX - startX > 50 && Math.abs(endY - startY) < 50) {      //右滑
      turn = "right";
      this.setData({
        delate: "100"
      })
    } else if (endX - startX < -50 && Math.abs(endY - startY) < 50) {   //左滑
      turn = "left";
      this.setData({
        delate: _this.data.listIndex
      })
    }
    return turn;
  },
  //右滑结束
  touchEnd(e) {
    this.setData({
      listIndex: e.target.dataset.id
    })
    let x = e.changedTouches[0].clientX;
    let y = e.changedTouches[0].clientY;
    this.getTouchData(x, y, this.data.touch.x, this.data.touch.y);
  },
  //删除签署人
  delDialogBtn: function(e) {
    let dataList = this.data.dataList;
    // this.setData({
    //   delate: "100"
    // })
    dataList.splice(this.data.listIndex, 1)
    this.setData({
      dataList
    });
    return false;
    console.log(this.data.listIndex)
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
    //添加签署人
    if (value == "添加签署人") {
      this.setData({
        listValue: {
          nameValue: "",
          nameIdcard: "",
          namePhone: ""
        },
        addSignature: "添加签署人",
        model: {
          nameHint: "请输入姓名",
          isShowNameHint: false,
          idcardHint: "请输入身份证",
          isShowIdcardHint: false,
          mobileHint: "请输入手机号",
          isShowMobileHint: false,
        }
      })
      return;
    } 
    //修改签署人
    let modelList = this.data.dataList[e.target.dataset.id];
    this.setData({
      listIndex: e.target.dataset.id
    })
    this.setData({
      listValue: {
        nameValue: modelList.name,
        nameIdcard: modelList.idCode,
        namePhone: modelList.phone
      },
      addSignature: "修改签署人",
      model: {
        nameHint: modelList.name,
        isShowNameHint: false,
        idcardHint: modelList.idCode,
        isShowIdcardHint: false,
        mobileHint: modelList.phone,
        isShowMobileHint: false,
      }
    })
    return false;
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
    //验证姓名
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
    //验证身份证
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
    //验证手机号
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
    //添加签署人提交/修改签署人提交
    if (this.data.identification == "添加签署人") {
      let dataList = this.data.dataList;
      dataList.push(e.detail.value)
      this.setData({
        dataList
      })
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
  //多选框操作
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
  //日期时间选择控件
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
})