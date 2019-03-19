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

/**
 * @param {*moblie} str
*/
function checkPhone(str){
  const reg = /^0?(13[0-9]|15[0123456789]|18[0123456789]|14[135789]|17[0123467859]|16[6]|19[89])[0-9]{8}$/
  return reg.test(str)
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
module.exports = {
  formatTime,
  checkSession,
  loginByWeiXin,
  checkLogin,
  checkPhone
}


