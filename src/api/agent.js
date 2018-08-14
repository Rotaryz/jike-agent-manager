import request from 'common/js/request'

export default {
  /**
   * 我的团队
   * @returns {*}
   */
  getMyTeam(page = 1, limit = 10) {
    let url = '/api/agent/agent-team'
    let data = {
      page,
      limit
    }
    return request.get(url, data)
  }
}
