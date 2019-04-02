
import { backContractTempSigner, contractTemp } from '../../../wxapi/api.js';
import { validateCard } from '../../../utils/util.js';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //弹框赋值
    listValue: {
      nameValue: "",
      nameIdcard: "",
      namePhone: ""
    },
    date: '2019-04-01',
    //合同名称
    contactName: "1", 
    //签署日期
    validTime: "",
    //标识是否永久有效
    perpetualValid: "",
    //是否永久有效
    isChecked: false,
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
      { name: "小明", idCard: "545214552233663321", mobile: "15685474458" },
      { name: "大明", idCard: "545214552233663321", mobile: "15545454545" }
    ],
    showModal: false,
    //删除样式
    delate: "9",
  },
  onLoad: function (options) {
    if (app.globalData.contractParam.operateType) {
      this.getSignInfo(); 
    }
    console.log(app.globalData)
  },
  //获取签署设置
  getSignInfo() {
    let data = {
      operateType: app.globalData.contractParam.operateType,
      contractTempNo: app.globalData.contractParam.contractTempNo
    }
    backContractTempSigner(data, accountCode).then(res => {
      if (res.data.validTime !== null) {
        this.setData({
          contactName: res.data.contractName,
          date: res.data.validTime
        })
        return;
      }
      this.setData({
        contactName: res.data.contractName,
        isChecked: false
      })
    }).catch(res => {

    })
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
    this.setData({
      delate: "100"
    })
    dataList.splice(this.data.listIndex, 1)
    this.setData({
      dataList
    });
    return false;
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
        nameIdcard: modelList.idCard,
        namePhone: modelList.mobile
      },
      addSignature: "修改签署人",
      model: {
        nameHint: modelList.name,
        isShowNameHint: false,
        idcardHint: modelList.idCard,
        isShowIdcardHint: false,
        mobileHint: modelList.mobile,
        isShowMobileHint: false,
      }
    })
    return false;
  },
  preventTouchMove() {
    console.log(111)
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
    console.log(e)
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
    if (!e.detail.value.idCard) {
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
    if (!validateCard(e.detail.value.idCard)) {
      console.log(222)
      this.setData({
        model: {
          idcardHint: "身份证格式错误",
          isShowIdcardHint: true,
        }
      });
      return;
    } else {
      this.setData({
        model: {
          idcardHint: "身份证格式错误",
          isShowIdcardHint: false,
        }
      })
    }
    //验证手机号
    if (!e.detail.value.mobile) {
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
  //生成合同
  formSubmit: function(e) {
    
    let dataList = this.data.dataList;
    let names = "",
        idCards = "",
        mobiles = "";
    for (var i = 0; i < dataList.length; i++) {
      names += dataList[i].name + ",";
      idCards += dataList[i].idCard + ",";
      mobiles += dataList[i].mobile + ",";
    }
    // return
    let creater = wx.getStorageSync('interfaceCode'),
        contractName = this.data.contactName,
        accountCode = wx.getStorageSync('accountCode'),
        contractTempNo = app.globalData.contractParam.contractTempNo,
        templateNo = app.globalData.contractParam.templateNo,
        operateType = app.globalData.contractParam.operateType,
        validTime = this.data.date,
        perpetualValid = this.data.perpetualValid,
        templateSpecificType = app.globalData.contractParam.templateSpecificType;
    let zqUserContractTempVo = {};
    if (operateType != '') {
      zqUserContractTempVo = {
        "creater": creater,
        "operateType": operateType,
        "contractTempNo": contractTempNo,
        "contractName": contractName,
        "templateNo": templateNo,
        "validTime": validTime,
        "perpetualValid": perpetualValid,
        "names": names,
        "idCards": idCards,
        "mobiles": mobiles,
        "templateSpecificType": templateSpecificType,
        "accountCode": accountCode
      }
    } else {
      zqUserContractTempVo = {
        "creater": creater,
        "contractName": contractName,
        "templateNo": templateNo,
        "validTime": validTime,
        "perpetualValid": perpetualValid,
        "names": names,
        "idCards": idCards,
        "mobiles": mobiles,
        "templateSpecificType": templateSpecificType,
        "accountCode": accountCode
      }
    }
    contractTemp(zqUserContractTempVo, creater).then(res => {
        if(res.data.resultCode==0){
            //临时合同编号
            let signParams = {
                contractTempNo: res.data.data
            }
            Object.assign(app.globalData.contractParam,signParams)
            wx.navigateTo({
                url: '../templateAddInfo/templateAddInfo'
            })
        }else{
            wx.showToast({
                title: res.data.resultMessage,
                icon:'none',
                duration: 2000
            })
        }
        
    }).catch(res => {

    })
    return;
  },
  //弹框确定操作
  onConfirm: function (e) {
    
  },
  //多选框操作
  checkboxChange: function (e) {
    if (e.detail.value == '') {
      this.setData({
        perpetualValid: "",
      })
    } else {
      this.setData({
        date: "",
        perpetualValid: "1",
      })
    }
  }, 
  //日期时间选择控件
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
    if (this.data.date) {
      this.setData({
        isChecked: false
      })
    } else {
      this.setData({
        isChecked: true,
      })
    }
  },
})