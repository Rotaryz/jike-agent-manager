import request from 'common/js/request'

export default {
  /**
   * 本日数据统计
   * @returns {*}
   */
  getHomeInfo() {
    let url = '/api/report/agent-day-report'
    return request.get(url)
  }
}
