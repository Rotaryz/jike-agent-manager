import request from '../common/js/request'

export default {
  /**
   * 上传图片
   * @param data
   * @returns {*}
   */
  upLoadImage (data) {
    let url = '/api/agent/images'
    return request.post(url, data)
  },
  /**
   * 修改头像
   * @param imageId
   * @returns {*}
   */
  updateAvatar(imageId) {
    let url = `/api/agent/update-image?image_id=${imageId}`
    return request.get(url)
  }
}
