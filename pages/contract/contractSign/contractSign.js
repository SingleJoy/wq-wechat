Page({
    data: {
      showModal: false
    },
    signPwd: function() {
      this.setData({
        showModal: true
      });
    },
    hideModal: function() {
      this.setData({
        showModal: false
      });
    },
    onConfirm:function(e){
        wx.navigateTo({
            url: '../templateAddInfo/templateAddInfo',
          })
    }
  })