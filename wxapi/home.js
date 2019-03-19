const request = require('./main.js')

export function queryMobileLocation (data){
    return request ('/common/','get',data)
}