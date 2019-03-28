
import { backContractTempSigner, contractTemp } from '../../../wxapi/api.js';

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
    date: '',
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
    //模板相关数据
    createContract: {
      templateSpecificType: "",
      templateNo: ""
    }
  },
  onLoad: function (options) {
    this.setData({
      createContract:{
        templateSpecificType: options.templateSpecificType,
        templateNo: options.templateNo
      }
    })
    console.log(app.globalData);
    if (app.globalData) {
      this.getSignInfo(); 
    }
  },
  //获取签署设置
  getSignInfo() {
    let data = {
      operateType: "back",
      contractTempNo: "52b4d1e97e694a80b1d1894c0e9e3098"
      // contractTempNo: wx.getStorageSync('contractTempNo')
    }
    let accountCode = "ACf2773c7e514510baa500053efae912";
    // let accountCode = wx.getStorageSync('accountCode');
    backContractTempSigner(data, accountCode).then(res => {
      console.log(res);
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
      operateType = app.globalData,
      contractTempNo = wx.getStorageSync('contractTempNo'),
      contractName = this.data.contactName,
      templateNo = this.data.createContract.templateNo,
      validTime = this.data.date,
      perpetualValid = this.data.perpetualValid,
      templateSpecificType = this.data.createContract.templateSpecificType,
      accountCode = wx.getStorageSync('accountCode');
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
      // zqUserContractTempVo = {
      //   "creater": creater,
      //   "contractName": contractName,
      //   "templateNo": this.templateNo,
      //   "validTime": validTime,
      //   "perpetualValid": perpetualValid,
      //   "names": names,
      //   "idCards": id_nums,
      //   "mobiles": mobiles,
      //   "templateSpecificType": templateSpecificType,
      //   "accountCode": accountCode
      // }
      zqUserContractTempVo = {
        "creater": "ZQ98fcb07f8a4980862e1a5846d3c6f2",
        "contractName": "批量有参数-1",
        "templateNo": "7245f49e9cba4d5e85889d426e7cf4a7",
        "validTime": "",
        "perpetualValid": 1,
        "names": names,
        "idCards": idCards,
        "mobiles": mobiles,
        "templateSpecificType": "fillidcardreference",
        "accountCode": "ACf2773c7e514510baa500053efae912"
      }
    }
    contractTemp(zqUserContractTempVo, creater).then(res => {
        let signParams = {
            contractTempNo: res.data.data
        }
        Object.assign(app.globalData.contractParam,signParams)
        wx.navigateTo({
            url: '../templateAddInfo/templateAddInfo'
        })
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