const request = require('./main.js')
const api = '/zqsign-web-wesign/restapi/wesign'
//查询账户
function tenant(data){
  return request(api+'/v1/tenant','get',data)
}
//登录接口
function login(data){
  return request(api +'/v1/tenant/login','get',data)
}
//查询企业数量
function bindEnterprises(data){
  return request(api + '/v1.4/user/bindEnterprises', 'get', data)
}
//查询当前账户信息
function homePage(interfaceCode,data){
    return request(api + '/v1.4/tenant/'+interfaceCode +'/homePage', 'get', data)
}
module.exports = {
  tenant,
  login,
  bindEnterprises,
  homePage
}
