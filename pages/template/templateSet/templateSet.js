import { backContractTempSigner, contractTemp,conNum } from '../../../wxapi/api.js';
import { validateCard, validateMoblie,TrimAll ,formatTime} from '../../../utils/util.js';
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
    //单点操作
    isDisabled: false,
    date: '',
    //合同名称
    contactName: "1", 
    //签署日期
    validTime: "",
    //标识是否永久有效
    perpetualValid: 1,
    //是否永久有效
    isChecked: true,
    //编辑/添加签署人保存标识
    identification: "",
    //编辑/添加签署人数据索引
    listIndex: "",
    //编辑索引id
    editId: "",
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
    ],
    showModal: false,
    //删除样式
    delate: "9",
    hasContract:true,
      flag:false
  },
  onLoad: function (options) {
    this.setData({
      contactName: app.globalData.contractParam.templateName,
      interfaceCode:wx.getStorageSync('interfaceCode'),
      startDate:formatTime(new Date(),false,'-')
    });
    if (app.globalData.contractParam.operateType) {
      this.getSignInfo(); 
    }
  },
  //获取签署设置
  getSignInfo() {
    let data = {
      operateType: app.globalData.contractParam.operateType,
      contractTempNo: app.globalData.contractParam.contractTempNo
    };
    backContractTempSigner(data, wx.getStorageSync('accountCode')).then(res => {
      if (res.data.validTime !== null) {
        this.setData({
          contactName: res.data.contractName,
          date: res.data.validTime
        });
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
    this.setData({
      "touch.x": e.changedTouches[0].clientX,
      "touch.y": e.changedTouches[0].clientY
    });
  },
  //右滑操作
  getTouchData (endX, endY, startX, startY){
    let _this = this;
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
    });
    let x = e.changedTouches[0].clientX;
    let y = e.changedTouches[0].clientY;
    this.getTouchData(x, y, this.data.touch.x, this.data.touch.y);
  },
  //删除签署人
  delDialogBtn: function(e) {
    let dataList = this.data.dataList;
    this.setData({
      delate: "100"
    });
    dataList.splice(this.data.listIndex, 1)
    this.setData({
      dataList
    });
    return false;
  },
  //添加签署人（显示弹框）操作
  showDialogBtn: function (e) {
    if (e.target.dataset.id == 0 || e.target.dataset.id) {
      this.setData({
        editId: e.target.dataset.id
      })
    };
    this.isDisabled = false;
    let value = e.target.dataset.type?e.target.dataset.type:e._relatedInfo.anchorTargetText
    this.setData({
      identification: value
    });
    //添加签署人
    if (value == "添加签署人") {
      let interfaceCode = this.data.interfaceCode;
      conNum(interfaceCode).then((res) => {
        if (res.data.resultCode == 1) {
          let b2cNum = res.data.data.b2cNum;
          if (b2cNum <= 0) {
            wx.showModal({
              title: '提示',
              content: '合同余量不足,当前剩余合同份数' + b2cNum + '份',
              success(res) {
              }
            });
            wx.hideLoading();
          } else if (b2cNum <= this.data.dataList.length) {
            wx.showModal({
              title: '提示',
              content: '不可添加更多签署人，当前合同余量' + b2cNum + '份，至多可添加' + b2cNum + '个签署人',
              success(res) {
              }
            });
          } else {
            this.setData({
              showModal: true
            });
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
            });
            return;
          }
        }
      }).catch(error => {})
      
    } else {
      //修改签署人
      this.setData({
        showModal: true
      });
      let modelList = this.data.dataList[e.target.dataset.id];
      this.setData({
        listIndex: e.target.dataset.id || e.target.dataset.id == 0 ? e.target.dataset.id : ''
      });
      if (!modelList) {
        modelList = [];
      }
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
      });
      return false;
    }
    
  },
  preventTouchMove() {
    
  },
  //弹框关闭操作
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  //获取input输入的值
  inputChange: function(e) {
    
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
      });
      return;
    } 
    if (e.detail.value.name.replace(/\s+/g, "").length < 2) {
      this.setData({
        model: {
          nameHint: "姓名长度至少两位",
          isShowNameHint: true,
        }
      })
      return;
    }
    this.setData({
      model: {
        nameHint: "请输入姓名",
        isShowNameHint: false,
      }
    })
    //验证身份证
    // if (!e.detail.value.idCard) {
    //   this.setData({
    //     model: {
    //       idcardHint: "请输入身份证",
    //       isShowIdcardHint: true,
    //     }
    //   })
    //   return;
    // }
    if (e.detail.value.idCard) {
      if (!validateCard(e.detail.value.idCard)) {
        this.setData({
          model: {
            idcardHint: "身份证格式错误",
            isShowIdcardHint: true,
          }
        });
        return;
      } 
    }
    this.setData({
      model: {
        idcardHint: "请输入身份证",
        isShowIdcardHint: false,
      }
    })
    //验证手机号
    if (!e.detail.value.mobile) {
      this.setData({
        model: {
          mobileHint: "请输入手机号",
          isShowMobileHint: true,
        }
      })
      return;
    }
    if (!validateMoblie(e.detail.value.mobile)) {
        this.setData({
            model: {
            mobileHint: "手机号格式错误",
            isShowMobileHint: true,
            }
        });
        return;
    }
    if (e.detail.value.mobile == wx.getStorageSync('mobile')) {
      this.setData({
        model: {
          mobileHint: "不能与发起方手机号相同",
          isShowMobileHint: true,
        }
      });
      return;
    }
    if (e.detail.value.mobile == wx.getStorageSync('parentAccountmobile')) {
      this.setData({
        model: {
          mobileHint: "不能与一级账号的手机号相同",
          isShowMobileHint: true,
        }
      });
      return;
    }
    this.setData({
      model: {
        idcardHint: "手机号不能为空",
        isShowIdcardHint: false,
      }
    });
    if (this.data.identification == "添加签署人") {
      let dataListALL = this.data.dataList;
      if (dataListALL) {
        let currentSigner = e.detail.value.mobile;
        let isRepetitionSign = dataListALL.find((element) => {
          return element.mobile == currentSigner;
        });
        if (isRepetitionSign) {
          wx.showToast({
            title: '此手机号已添加',
            icon: 'none'
          })
          return false;
        }
      }
      this.setData({
        showModal: false
      });
    } else {
      let edutValueAll = this.data.dataList;
      let newValue = [];
      for (var i = 0; i < edutValueAll.length; i++) {
        if (i != this.data.editId) {
          newValue.push(edutValueAll[i])
        }
      }
      let currentSigner = e.detail.value.mobile;
      let isEditRepetitionSign = newValue.find((element) => {
        return element.mobile == currentSigner;
      });
      if (isEditRepetitionSign) {
        wx.showToast({
          title: '此手机号已添加',
          icon: 'none'
        })
        return false;
      }
    }

    this.hideModal();
    //添加签署人提交/修改签署人提交
    if (this.data.identification == "添加签署人") {
      let dataList = this.data.dataList;
      dataList.push(e.detail.value)
      this.setData({
        dataList
      });
    } else {
      this.hideModal();
      let dataList = this.data.dataList;
      dataList[this.data.listIndex] = e.detail.value;
      this.setData({
        dataList
      });
    }
  },

  //生成合同
  formSubmit: function(e) {
    let value = e.detail.value;
    if(!value.input) {
        wx.showModal({
            title: '提示',
            content: '合同名称不能为空',
            confirmColor: '#4091fb',
            cancelColor: '#666',
            success: function (res) {}
        });
        return;
    }
    if (!value.time && !this.data.perpetualValid) {
        wx.showModal({
            title: '提示',
            content: '签署截止日期不能为空',
            confirmColor: '#4091fb',
            cancelColor: '#666',
            success: function (res) {}
        });
        return;
    }
    if (!this.data.dataList.length) {
        wx.showModal({
            title: '提示',
            content: '您还没有添加签署人',
            confirmColor: '#4091fb',
            cancelColor: '#666',
            success: function (res) {}
        });
        return;
    }
    let dataList = this.data.dataList;
    let names = "",
        idCards = "",
        mobiles = "";
    for (let i = 0; i < dataList.length; i++) {
        names += TrimAll(dataList[i].name) + ",";
        idCards += (dataList[i].idCard?TrimAll(dataList[i].idCard):' ') + ",";
        mobiles += TrimAll(dataList[i].mobile) + ",";
    }
    names = names.substring(0, names.length - 1);
    idCards = idCards.substring(0, idCards.length - 1);
    mobiles = mobiles.substring(0, mobiles.length - 1);
    let creater = wx.getStorageSync('interfaceCode'),
        contractName = value.input,
        accountCode = wx.getStorageSync('accountCode'),
        contractTempNo = app.globalData.contractParam.contractTempNo,
        templateNo = app.globalData.contractParam.templateNo,
        operateType = app.globalData.contractParam.operateType,
        validTime = this.data.date,
        perpetualValid = this.data.perpetualValid?1:0,
        templateSpecificType = app.globalData.contractParam.templateSpecificType;
        if(validTime){
            validTime += ' 23:59:59'
        }
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
    this.submitSigner(zqUserContractTempVo, creater);
    return false;
  },
  //提交签署人
  submitSigner(zqUserContractTempVo,creater){
     if(this.data.flag){
       return false
     }
     this.setData({
         flag:true
     });

    contractTemp(zqUserContractTempVo, creater).then(res => {
        if(res.data.resultCode=="0"){

            //临时合同编号
            let signParams = {
                contractTempNo: res.data.data
            };
            Object.assign(app.globalData.contractParam,signParams);
            wx.navigateTo({
                url: '../templateAddInfo/templateAddInfo'
            });
            this.setData({
                flag:false
            });
            wx.hideLoading();
        }else{
            wx.hideLoading();
            wx.showToast({
                title: res.data.resultMessage,
                icon:'none',
                duration: 2000
            });
        }   
    }).catch(res => {

    });
  },
  //弹框确定操作
  onConfirm: function (e) {
    this.setData({
      showModal: false
    });
    this.hideModal();
  },
  //多选框操作
  checkboxChange: function (e) {
      this.setData({
        perpetualValid:!this.data.perpetualValid,
        date:''
      })
  }, 
  //日期时间选择控件
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
    if (this.data.date) {
      this.setData({
        isChecked: false,
        perpetualValid:false
      })
    } else {
      this.setData({
        isChecked: true,
        perpetualValid:true
      })
    }
  },
})