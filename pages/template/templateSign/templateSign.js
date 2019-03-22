Page({
  data: {
    //弹框显示标识
    showModal: false,
    //密码提示信息标识
    psdHint: false
  },
  //确定操作
  ImmediatelySure: function() {
    this.setData({
      showModal: true
    });
  },
  //取消操作
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  //提交表单数据并验证
  formSubmitModel: function(e) {
    if (!e.detail.value.input) {
      this.setData({
        psdHint: true
      });
      return;
    } 
    this.setData({
      psdHint: false
    });
    this.setData({
      showModal: false
    });
  }
})