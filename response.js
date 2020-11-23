class Response {
    constructor () {}
  
    success(data) {
      return this.buildResponse(true, null, data)
    }
  
    failure(errorMessage) {
      return this.buildResponse(false, errorMessage, null)
    }
  
    buildResponse (success, error, data) {
      return {
        success: success,
        error: error,
        data: data
      }
    }
  }
  
  module.exports = Response
  