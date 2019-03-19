const request = require('./main.js')

function queryMobileLocation (data){
    return request ('/common/','get',data)
}

function loginWesign (data) {
  return request ('/login','get', data )
}

module.export = {
  loginWesign,
  queryMobileLocation

}
