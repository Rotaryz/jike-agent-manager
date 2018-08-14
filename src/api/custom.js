import request from 'common/js/request'

export default {
  /**
   * 客户列表
   * @returns {*}
   */
  getCustomList(limit, page) {
    let url = '/api/agent/agent-merchant-report'
    return request.get(url, {limit, page})
  },
  /**
   * 客户详情
   * @returns {*}
   */
  getCustomMsg(id) {
    let url = `/api/agent/agent-merchant-report/${id}`
    return request.get(url)
  },
  /**
   * 编辑客户资料
   * @returns {*}
   */
  createCustom(data) {
    let url = '/api/agent/agent-merchant'
    return request.put(url, data)
  },
  /**
   * 开单销售
   * @returns {*}
   */
  openBill(data) {
    let url = '/api/agent/agent-merchant'
    return request.post(url, data)
  },
  /**
   * 行业列表
   * @returns {*}
   */
  getIndustry() {
    let url = '/api/agent/industry'
    return request.get(url)
  },
  /**
   * 销售记录列表
   * @returns {*}
   */
  getRecordList(limit, id) {
    let url = '/api/agent/agent-sale-record'
    return request.get(url, {limit, agent_merchant_id: id})
  },
  /**
   * 销售记录详情
   * @returns {*}
   */
  getRecordDetail(id) {
    let url = `/api/agent/agent-sale-record/${id}`
    return request.get(url)
  }

}
