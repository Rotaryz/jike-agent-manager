import request from 'common/js/request'

export default {
  /**
   * 账号信息接口
   * @returns {*}
   */
  getAccountInfo() {
    let url = '/api/agent/agent-show'
    return request.get(url)
  }
}
