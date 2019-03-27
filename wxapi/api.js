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
    return request(api + '/v1.8/applet/user/miniProgramBindEnterprises', 'get', data)
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

function getAccountInformation(accountCode) {
    return request(api+'/v1.5/tenant/'+accountCode+'/getAccountInformation', 'get')
}
//查询默认签章
function getSignatures(interfaceCode){
    return request(api+'/v1.5/tenant/'+interfaceCode+'/getSignatures', 'get')
}

//退出
function exitAndDeleteSession(){
    return request(api+'/v1/tenant/exitAndDeleteSession','get')
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
//合同详情
function contractImgs(interfaceCode,contractNo){
    return request(api + '/v1.4/tenant/' + interfaceCode + '/contract/'+ contractNo+'/contractimgs', 'get')
}
//模板合同图片请求
function templateImg(interfaceCode,templateNo,data){
    console.log(data)
    return request(api + '/v1/tenant/'+ interfaceCode +'/template/'+templateNo+'/getTemplateImags', 'get',data)
}

//合同归档接口
function contractFilings(interfaceCode,accountCode) {
    return request(api+'/v1.7/tenant/'+interfaceCode+'/contract/'+accountCode+'/contractFilings','get')
}
//查询合同列表角色
function getAccounts(interfaceCode){
    return request(api+'/v1.5/tenant/' + interfaceCode + '/getAccounts','get')

}

/* b2c合同 列表查询 */
function contracts(interfaceCode,data){
    return request(api+'/v1/tenant/' + interfaceCode + '/contracts','get',data)

}

/* b2b合同 列表查询 */
function b2bContrants(interfaceCode,data){
    return request(api+'/v1.4/tenant/' + interfaceCode + '/b2bContrants','get',data)

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
    getAccountTemplates,
    contractFilings,
    getAccounts,
    contracts,
    b2bContrants,
    contractImgs,
    templateImg
}
