const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//检查微信会话是否过期
function checkSession() {
  return new Promise(function (resolve, reject) {
    wx.checkSession({
      success: function () {
        resolve(true);
      },
      fail: function () {
        reject(false);
      }
    })
  });
}

//微信登录
function loginByWeiXin() {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        if (res.code) {
          resolve(res.code);
        } else {
          reject(res);
        }
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
}
//判断是否登录

function checkLogin() {

}

function getToken(){
    return new Promise((resolve,reject) =>{
      wx.login({
        success:res=>{
          if(res.code) {
            console.log(res.code)
            //发送code到后台获取 openId, sessionKey, unionId
            // wx.request({
            //   url: WXAPI.API_BASE_URL,
            //   method:'GET',
            //   data:{
            //     code:res.code
            //   },
            //   success(res) {
            //     //成功返回数据后，将token值存储到localStorage中
            //     console.log(res) 
            //     wx.setStorage({
            //       key: 'wesignToken',
            //       data: res.data.token
            //     });
            //   }
            // })
          }
        }
      })
    })
  }


module.exports = {
  formatTime,
  checkSession,
  loginByWeiXin,
  checkLogin,
  getToken
}


