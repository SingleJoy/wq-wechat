const CONFIG = require('../config.js')     //配置文件
const API_URL = CONFIG.API_BASE_URL;       //接口域名

const util = require('../utils/util.js')

const request = (url, method, data, header) => {
  // console.log(data)
  //接口具体地址
  let _url = API_URL + url;
  // 默认是'application/json',如图片等内容需要'image/png' 需单独在接口中传
  //post 需要application/x-www-form-urlencoded 格式

  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method,
      data: data,
        header: {
            'content-type': method == 'GET'?'application/json':'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        },
      success(res) {
        if (res.statusCode == 200) {
          if (res.data.sessionStatus == '000000') {
            return util.getToken()
          } else {
            resolve(res)
          }
        } else {
          reject(res.errMsg)
        }
      },
      fail(error) {
        reject(error)
      },
      complete(aaa) {
        // 加载完成
      }
      
    })
  })
}

module.exports = request;

