
/**
 * @param {*} 
 * date:时间;hms;是否显示时分秒（true,false）line:分割线类型('/''-')
*/

const formatTime = (date,hms,line) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
    if(hms){
        return [year, month, day].map(formatNumber).join(line) + ' ' + [hour, minute, second].map(formatNumber).join(':')
    }else{
        return [year, month, day].map(formatNumber).join(line)
    }
  
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


//自定义过滤字符串长度  str为字符串 length为自定义长度
const filterStr =function (value) {
  let length=value.length;
    if (length>20){
       let str=value.slice(0,10)+'...'+value.slice(length-10,length);
        return str
    }

}


/**
 * @param {*moblie} str
*/
function checkPhone(str){
  const reg = /^0?(13[0-9]|15[0123456789]|18[0123456789]|14[135789]|17[0123467859]|16[6]|19[89])[0-9]{8}$/
  return reg.test(str)
}
/**
 * @param {*pwd(8-16)} str
*/
function checkPwd(str){
    const reg  = /^[a-zA-Z0-9]{8,16}$/;
    if(str){
        return reg.test(str)
    }else{
        return false
    }
}

//去除输入框所有空格
function TrimAll(str){
    if(str){
    return str.replace(/\s/g, "");
    }
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

//获取token
function getToken(){

}

//验证身份证号
function validateCard(str) {
  const reg = /(^\d{18}$)|(^\d{17}(X|x)$)/
  return reg.test(str)
}
//验证手机号
function validateMoblie(str) {
  const reg = /^0?(13[0-9]|15[0123456789]|18[0123456789]|14[135789]|17[0123467859]|16[6]|19[89])[0-9]{8}$/
  return reg.test(str)
}

function validateEmail(str) {

    const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
    return reg.test(str)
}

module.exports = {
  formatTime,
    filterStr,
  checkSession,
  loginByWeiXin,
  checkLogin,
  checkPhone,
  checkPwd,
  getToken,
  validateCard,
  validateMoblie,
    validateEmail,
    TrimAll
}


