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
//只显示移动端模板开关
function updateMobileTemplate(data, accountCode) {
  return request(api + '/v1.8/applet/tenant/account/' + accountCode + '/updateMobileTemplate', 'post', data)
}
//获取所有模板列表
function getAccountTemplates(data, accountCode) {
  return request(api + '/v1.5/tenant/' + accountCode + '/getAccountTemplates', 'get', data)
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
//首页查询合同状态、数量
const contractNum  = {
    // 带我签署;待他人签署;已生效;已截止;
    waitForMeSign:(interfaceCode,data)=>{
        return request(api + '/v1.4/tenant/' + interfaceCode + '/waitForMeSign', 'get', data)
    },
    waitForOtherSign:(interfaceCode,data)=>{
        return request(api + '/v1.4/tenant/' + interfaceCode + '/waitForOtherSign', 'get', data)
    },
    takeEffect:(interfaceCode,data)=>{
        return request(api + '/v1.4/tenant/' + interfaceCode + '/takeEffect', 'get', data)
    },
    deadline:(interfaceCode,data)=>{
        return request(api + '/v1.4/tenant/' + interfaceCode + '/deadline', 'get', data)
    }
}

module.exports = {
    tenant,
    login,
    bindEnterprises,
    homePage,
    contractNum,
    getCertificate,
    getAccountInformation,
    getSignatures,
    exitAndDeleteSession,
    updateMobileTemplate,
    getAccountTemplates

}
