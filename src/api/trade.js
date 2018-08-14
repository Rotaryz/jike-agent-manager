import request from '../common/js/request'

export default {
  /**
   * 本日数据统计
   * @param data
   * @returns {*}
   */
  getTodayData (data) {
    let url = '/api/report/agent-day-report'
    return request.get(url, data)
  },
  /**
   * 我的收入
   * @param data
   * @returns {*}
   */
  getMyIncome (data) {
    let url = '/api/report/earning-days-report'
    return request.get(url, data)
  },
  /**
   * 我的收入占比
   * @param data
   * @returns {*}
   */
  getMyIncomePid (data) {
    let url = '/api/report/earning-rate'
    return request.get(url, data)
  },
  /**
   * 核心数据指标
   * @param data
   * @returns {*}
   */
  getMyBar (data) {
    let url = '/api/report/agent-core-data'
    return request.get(url, data)
  },
  /**
   * 新增团队成员
   * @param data
   * @returns {*}
   */
  getNewMember (data) {
    let url = '/api/report/new-user-count'
    return request.get(url, data)
  },
  /**
   * 我的团队分销收入
   * @param data
   * @returns {*}
   */
  getTeamIncome (data) {
    let url = '/api/report/team-income'
    return request.get(url, data)
  },
  /**
   * 我的账号销量[智推]
   * @param data
   * @returns {*}
   */
  getAccountSale (data) {
    let url = '/api/report/my-account-sale'
    return request.get(url, data)
  }
}
