import request from 'common/js/request'

export default {
  /**
   * 验证码登录
   * @returns {*}
   */
  login(mobile, authCode) {
    let url = '/api/jwt/login'
    const data = {
      mobile,
      auth_code: authCode
    }
    return request.post(url, data)
  },
  /**
   * 获取短信验证码
   * @returns {*}
   */
  getCode(mobile) {
    let url = `/api/jwt/auth-code?mobile=${mobile}`
    return request.get(url)
  }
}
