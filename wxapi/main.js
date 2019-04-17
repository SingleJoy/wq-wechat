const CONFIG = require('../config.js')     //配置文件
const API_URL = CONFIG.API_BASE_URL;       //接口域名

const util = require('../utils/util.js')


const request = (url, method, data, contentType) => {

    //接口具体地址
    let _url = API_URL + url;
    // 默认是'application/json',如图片等内容需要'image/png' 需单独在接口中传
    //post 需要application/x-www-form-urlencoded 格式
    let content_type = contentType?contentType:(method.toLowerCase() == 'get'?'application/json':'application/x-www-form-urlencoded')
    return new Promise((resolve, reject) => {

        wx.request({
            url: _url,
            method: method,
            data: data,
            header: {
                'Content-Type':content_type,
                'cookie':wx.getStorageSync("wesign_token")
            },
            success(res) {

                let wesign_token=res.header["Set-Cookie"];
                if(wesign_token){
                    wx.setStorageSync("wesign_token",wesign_token)
                }

                if (res.statusCode == 200) {

                    if (res.data.sessionStatus == '000000') {

                        // return util.getToken()
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

