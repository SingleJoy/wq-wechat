const request = require('./main.js')

module.exports = {
    queryMobileLocation: (data) =>{
        return request ('/common/','get',data)
    },
    loginWesign: (data) =>{
      return request('/api/v1/tenant','get',data)
    }
}