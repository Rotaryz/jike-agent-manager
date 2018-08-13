import request from 'common/js/request'

export default {
  /**
   * 账号信息接口
   * @returns {*}
   */
  getAccountInfo() {
    let url = '/api/agent/agent-show'
    return request.get(url)
  },
  /**
   * 项目说明
   * @returns {*}
   */
  getProjectList() {
    let url = '/api/agent/project-description'
    return request.get(url)
  }
}
