// 将所有的接口请求都通过这个统一输出
import jwt from './jwt'
import upload from './upload'

// 授权模块
export const Jwt = jwt

// 上传图片
export const Upload = upload
