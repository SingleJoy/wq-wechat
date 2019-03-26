const CONFIG = require('../config.js')     //配置文件
const API_URL = CONFIG.API_BASE_URL;       //接口域名

const util = require('../utils/util.js')

const request = (url,method,data,header) => {
    //接口具体地址
    let _url = API_URL + url;             
    // 默认是'application/json',如图片等内容需要'image/png' 需单独在接口中传
    //post 需要application/x-www-form-urlencoded 格式
    let header_type = header ? header :'application/json';
    if (method == "post") {
      header_type = 'application/x-www-form-urlencoded';
    }
    return new Promise((resolve,reject) => {
        wx.request({
            url:_url,
            method:method,
            data:data,
            header:{
                'Content-Type':header_type,
                // 'token': wx.getStorageSync('token')
            },
            success(res) {
                if(res.status == 200){
                    if(res.data.sessionStatus == '000000'){
                        return util.getToken() 
                    }else{
                        resolve(res.data)
                    }
                }else {
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
   
