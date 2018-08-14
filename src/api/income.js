import request from 'common/js/request'

export default {
  /**
   * 累计收入
   * @returns {*}
   */
  getIncomeList(data) {
    let url = '/api/money/earning-detail'
    return request.get(url, data)
  },
  /**
   * 累计收入[智推]
   * @returns {*}
   */
  getGrandTotal() {
    let url = '/api/report/my-grand-total'
    return request.get(url)
  },
  /**
   * 累计收入占比[微商]
   * @returns {*}
   */
  getRateTotal() {
    let url = '/api/report/income-total-rate'
    return request.get(url)
  }
}
