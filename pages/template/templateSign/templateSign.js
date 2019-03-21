Page({
  data: {
    showModal: false
  },
  ImmediatelySure: function() {
    this.setData({
      showModal: true
    });
  },
  hideModal: function() {
    this.setData({
      showModal: false
    });
  }
})