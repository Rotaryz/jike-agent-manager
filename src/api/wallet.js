import request from 'common/js/request'

export default {
  /**
   * 余额
   * @returns {*}
   */
  getAgentMoney() {
    let url = '/api/money/agent-money'
    return request.get(url)
  },
  /**
   * 提现详情
   * @returns {*}
   */
  getOrderDetail(orderSn) {
    let url = `/api/money/order-detail?order_sn=${orderSn}`
    return request.get(url)
  },
  /**
   * 提现详情
   * @returns {*}
   */
  getPayList(data) {
    let url = `/api/money/payment-details`
    return request.get(url, data)
  }
}
