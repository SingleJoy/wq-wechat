const request = require('./main.js')

function queryMobileLocation (data){
    return request ('/common/','get',data)
}

function login (data) {
  return request ('/login','get', data )
}
function roleLogin(data) {
    return  request ('/login','get', data )
}

module.export = {
  login,
  queryMobileLocation,
  roleLogin

}
