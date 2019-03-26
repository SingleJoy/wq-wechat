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
//查询证书
function getCertificate(interfaceCode){
    return request(api + '/v1.5/tenant/'+interfaceCode +'/getCertificate', 'get')
}

// getAccountInformation  获取账户信息
function getAccountInformation(accountCode) {
    return request(api+'/v1.5/tenant/'+accountCode+'/getAccountInformation', 'get',)
}
//查询默认签章
function getSignatures(interfaceCode){
    return request(api+'/v1.5/tenant/'+interfaceCode+'/getSignatures', 'get',)
}

// exitAndDeleteSession 退出
function exitAndDeleteSession(){
    return request(api+'/v1/tenant/exitAndDeleteSession','get',)
}
module.exports = {
    tenant,
    login,
    bindEnterprises,
    homePage,
    getCertificate,
    getAccountInformation,
    getSignatures,
    exitAndDeleteSession,
}
