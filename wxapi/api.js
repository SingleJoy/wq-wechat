const request = require('./main.js')
const api = '/zqsign-web-wesign/restapi/wesign'
//查询账户
function tenant(data){
  return request(api+'/v1/tenant','get',data)
}
module.exports = {
  tenant
}
