const request = require('./main.js')
const api = '/zqsign-web-wesign/restapi/wesign'
//查询账户
function tenant(data){
  return request(api+'/v1/tenant','get',data)
}
function updateMobileTemplate(data) {
  return request(api + '/v1.8/applet/tenant/account/ACdcbfa3bb0d4a898a5eae66ae411aaf/updateMobileTemplate', 'post', data)
}
function getAccountTemplates(data) {
  return request(api + '/v1.5/tenant/AC5c1a0198e0664418ad724eae234174fe/getAccountTemplates', 'get', data)
}
module.exports = {
  tenant,
  updateMobileTemplate,
  getAccountTemplates
}
