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
//获取签署人信息
function backContractTempSigner(data, interfaceCode) {
  return request(api + '/v1/tenant/' + interfaceCode + '/backContractTempSigner', 'get', data)
}
//生成合同
function contractTemp(data, interfaceCode) {
  return request(api + '/v1/tenant/' + interfaceCode + '/contractTemp', 'post', data)
}
function getAccountInformation(accountCode) {
    return request(api+'/v1.5/tenant/'+accountCode+'/getAccountInformation', 'get')
}
//合同签署成功获取信息
function getContractSuccessDetails(interfaceCode, contractNo) {
  return request(api + '/v1/tenant/' + interfaceCode + '/contract/' + contractNo + '/getContractDetails', 'get')
}
//获取合同连接
function getSignLink(interfaceCode, contractNo) {
  return request(api + '/v1/tenant/' + interfaceCode + '/contract/' + contractNo + '/getSignLink', 'get')
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
//合同详情图片
function contractImgs(interfaceCode,contractNo){
    return request(api + '/v1/tenant/' + interfaceCode + '/contract/'+ contractNo+'/contractimgs', 'get')
}
//模板合同图片
function contracttempimgs(interfaceCode,contractNo){
    return request(api + '/v1/tenant/' + interfaceCode + '/contract/'+ contractNo+'/contracttempimgs', 'get')
}

//模板合同图片请求
function templateImg(interfaceCode,templateNo,data){
    return request(api + '/v1/tenant/'+ interfaceCode +'/template/'+templateNo+'/getTemplateImags', 'get',data)
}
//合同图片
function getContractDetails(interfaceCode,contractNo){
    return request(api+'/v1/tenant/' + interfaceCode + '/contract/'+ contractNo+'/getContractDetails', 'get')
}
//短信提醒
function remind(interfaceCode,contractNo,data){
    return request(api+'/v1/tenant/' + interfaceCode + '/contract/'+ contractNo+'/remind', 'get',data)
}
//发送邮件
function sendEmailForUser(interfaceCode,data){
    return request(api+'/v1/tenant/'+interfaceCode+'/sendEmailForUser','get',data)
}
//签约室信息(链接)
function showSignRoomInfo(interfaceCode){
    return request(api+'/v1/tenant/' + interfaceCode +'/signRoom/showSignRoomInfo', 'post')
}
//b2c签署获取签章位置
function signerpositions(interfaceCode,contractNo){
    return request(api+'/v1/tenant/'+ interfaceCode + '/contract/'+ contractNo +'/user/'+ interfaceCode + '/signerpositions','get')
}
//获取签章图片
function getSignature(interfaceCode){
    return request(api+'/v1/user/'+interfaceCode+'/signature','get')
}
//校验签署密码
function verifySignPassword(accountCode,data){
    return request(api+'/v1.7/tenant/account/'+accountCode+'/verifySignPassword','post',data) 
}
//我的合同签署提交
function contractmoresign(interfaceCode,contractNo,data){
    return request(api+'/v1/tenant/'+interfaceCode+'/user/'+interfaceCode+'/contractmoresign/'+contractNo,'post',data)
}
//我的合同签署提交
function b2bContractmoresign(interfaceCode,userCode,contractNo,data){
    return request(api+'/v1.4/tenant/'+interfaceCode+'/user/'+userCode+'/contractmoresign/'+contractNo,'post',data)
}

//模板发起】
function templateBatchSign(interfaceCode,data){
    return request(api+'/v1/tenant/'+interfaceCode+'/templateBatchSign','post',data)
}
//对手方信息
function userInfo(interfaceCode,contractTempNo){
    return request(api+'/v1/tenant/'+interfaceCode+'/batchSign'+contractTempNo,'get')
}
//合同参数查询
function templateVal(interfaceCode,templateNo,data){
    return request(api+'/v1/tenant/'+ interfaceCode + '/template/'+ templateNo + '/templateVal','get',data)
}
//合同参数提交
function template(interfaceCode,data){
    return request(api+'/v1/tenant/'+ interfaceCode + '/template','post',data)
}
//模板发起签署
function contractkeywordsign(interfaceCode,contractNo){
    return request(api+'/v1/tenant/'+ interfaceCode + '/user/'+interfaceCode +'/contractkeywordsign/'+contractNo ,'post')
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
// 全局无状态合同搜索（合同名称、签署人）
function searchContractsForMiniProgram(interfaceCode,data){
    return request(api+'/v1.8/applet/tenant/' + interfaceCode + '/contract/searchContractsForMiniProgram','get',data)
}
//合同延期
function updateContractTime(interfaceCode,contractNo,data) {
    return request(api+'/v1/tenant/' + interfaceCode + '/contract/'+contractNo+'/updateContractTime','post',data)
}

//b2b签署获取签章位置
function b2bSignerpositions(interfaceCode,contractNo){
    return request(api+'/v1.4/tenant/'+ interfaceCode + '/contract/'+ contractNo +'/user/'+ interfaceCode + '/signerpositions','get')
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
  contracttempimgs,
  templateImg,
  remind,
  signerpositions,
  getSignature,
  verifySignPassword,
  getContractDetails,
  searchContractsForMiniProgram,
  showSignRoomInfo,
  sendEmailForUser,
  backContractTempSigner,
  contractTemp,
  getContractSuccessDetails,
  getSignLink,
  contractmoresign,
  templateVal,
  template,
  templateBatchSign,
  userInfo,
  contractkeywordsign,
b2bSignerpositions,
b2bContractmoresign,
updateContractTime
}
