// 将所有的接口请求都通过这个统一输出
import jwt from './jwt'
import upload from './upload'
import home from './home'
import account from './account'
import wallet from './wallet'
import income from './income'

// 授权模块
export const Jwt = jwt

// 上传图片
export const UpLoad = upload

// 首页
export const Home = home

// 账号信息
export const Account = account

// 我的钱包
export const Wallet = wallet

// 收益明细
export const Income = income
