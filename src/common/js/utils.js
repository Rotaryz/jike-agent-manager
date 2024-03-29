import _this from '@/main'
import storage from 'storage-controller'
import CITY_JSON from 'common/js/city'

const REGPASS = /^[a-zA-Z0-9]{6,18}$/
const REGPHONE = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
// const LOSE_EFFICACY = 10000
// const DISABLE = 110002
// const DELETE = 1 // TODO
// const NET_404 = 404
const TIME_OUT = 10000

export default class utils {
  static checkIsPhoneNumber(phoneNum) {
    return REGPHONE.test(phoneNum)
  }
  static checkPassWord(password) {
    return REGPASS.test(password)
  }
  static formatDate (time) {
    let resTime = new Date(time * 1000)
    let nowDate = this.formatDateTime(resTime)
    let nowTime = this.formatTime(resTime)
    let todayTime = new Date()
    let todayDate = this.formatDateTime(todayTime)
    let yesToday = todayTime.setDate(todayTime.getDate() - 1)
    let yesTodayDateTime = new Date(yesToday)
    let yesTodayDate = this.formatDateTime(yesTodayDateTime)
    nowDate = nowDate.replace(todayDate, '今天')
    nowDate = nowDate.replace(yesTodayDate, '昨天')
    nowTime = nowTime.replace(todayDate, '今天')
    nowTime = nowTime.replace(yesTodayDate, '昨天')
    return {
      date: nowDate,
      time: nowTime
    }
  }
  static radarTimeFormat(time) {
    let resTime = new Date(time * 1000)
    let nowDate = resTime.toLocaleDateString()
    let nowTime = this.formatTime(resTime)
    let todayTime = new Date()
    let todayDate = this.formatDateTime(todayTime)
    let yesToday = todayTime.setDate(todayTime.getDate() - 1)
    let yesTodayDateTime = new Date(yesToday)
    let yesTodayDate = this.formatDateTime(yesTodayDateTime)
    nowDate = nowDate.replace(todayDate, '')
    nowDate = nowDate.replace(yesTodayDate, '昨天').trim()
    nowTime = nowTime.replace(todayDate, '')
    nowTime = nowTime.replace(yesTodayDate, '昨天').trim()
    return {
      date: nowDate,
      time: nowTime
    }
  }

  static formatDateTime(time) {
    let date = new Date(time)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return [year, month, day].join('/')
  }

  static formatTime (time) {
    let date = new Date(time)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const hour = date.getHours()
    const minute = date.getMinutes()

    const t1 = [year, month, day].join('/')
    const t2 = [hour, minute].map(this.formatNumber).join(':')
    return `${t1} ${t2}`
  }

  static formatNumber (n) {
    const str = n.toString()
    return str[1] ? str : `0${str}`
  }

  // 错误码检查
  static _handleErrorType (code) {
    switch (code) {
      case TIME_OUT : {
        storage.clear()
        _this.$router.replace({path: '/login', query: {changeProject: true}})
        break
      }
      // case NET_404: {
      //   _toErrorPage(`404`)
      //   break
      // }
      // case DELETE: { // todo
      //   _toErrorPage(`delcard`) // 名片被删除，请联系公司管理员
      //   break
      // }
      // case DISABLE: {
      //   _toErrorPage(`disablecard`) // 名片被禁用，请联系公司管理员
      //   break
      // }
      // case LOSE_EFFICACY: {
      //   _handleLoseEfficacy()
      //   break
      // }
      default:
        break
    }
  }

  // 获取设备信息
  static getPlatform () {
    const navigator = window.navigator
    const u = navigator.userAgent
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    return isiOS ? 'ios' : 'android'
  }

  static shuffle (arr) {
    let _arr = arr.slice()
    for (let i = 0; i < _arr.length; i++) {
      let j = getRandomInt(0, i)
      let t = _arr[i]
      _arr[i] = _arr[j]
      _arr[j] = t
    }
    return _arr
  }

  static debounce (func, delay) {
    let timer

    return function (...args) {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  }
}

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// function _toErrorPage (useType) {
//   const path = `/page-error`
//   _this.$router.replace({path, query: {useType}})
// }
//
// function _handleLoseEfficacy () {
//   const currentRoute = _this.$route.path
//   if (currentRoute !== '/') {
//     storage.set('beforeLoginRoute', currentRoute)
//   }
//   storage.remove('token')
//   _this.$router.replace('/oauth')
// }

function doCity(city) {
  let arr = []
  for (let [, value] of Object.entries(city)) {
    let obj1 = {}
    obj1.value = value.name
    obj1.children = []
    const two = value.child
    for (let [, val] of Object.entries(two)) {
      let obj2 = {}
      obj2.value = val.name
      obj2.children = []
      const three = val.child
      for (let [, cc] of Object.entries(three)) {
        obj2.children.push({value: cc})
      }
      obj1.children.push({value: obj2.value, children: obj2.children})
    }
    arr.push(obj1)
  }
  return arr
}

export const cityData = doCity(CITY_JSON)
