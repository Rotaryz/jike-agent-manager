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
  },
  /**
   * 推荐记录列表
   * @returns {*}
   */
  getInviteList(page = 1, check_status = 3, limit = 10) {
    let url = '/api/agent/invite-apply-list'
    let data = {
      page,
      check_status,
      limit
    }
    return request.get(url, data)
  },
  /**
   * 代理商级别
   * @returns {*}
   */
  getLevel() {
    let url = '/api/agent/level-reward'
    return request.get(url)
  },
  /**
   * 新增加盟推荐
   * @returns {*}
   */
  newAddAgent(data) {
    let url = '/api/agent/post-invite-apply'
    return request.post(url, data)
  }
}
