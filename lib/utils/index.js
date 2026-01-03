import { siteConfig } from '@/lib/config'
import { debounce, throttle } from './debounce-throttle'

/**
 * 延迟指定时间执行
 * @param {*} ms
 * @returns
 */
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

/**
 * 深拷贝
 * @param {*} obj
 * @returns
 */
export const deepClone = obj => {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof Array) return obj.map(deepClone)
  if (typeof obj === 'object') {
    const clonedObj = {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
}

/**
 * 从数组中随机获取元素
 * @param {*} array
 * @returns
 */
export function shuffleArray(array) {
  if (!array) return []
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

/**
 * 获取从0到指定数的随机整数
 * @param {*} num
 * @returns
 */
export function randomNum(num) {
  return Math.floor(Math.random() * num)
}

/**
 * 日期格式化
 * @param {*} date
 * @param {*} fmt
 * @returns
 */
export function dateFormat(date, fmt) {
  if (!date) return ''
  if (!fmt) fmt = 'yyyy-MM-dd'
  if (typeof date === 'string') {
    date = new Date(date.replace(/-/g, '/'))
  } else if (typeof date === 'number') {
    date = new Date(date)
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (const k in o) if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  return fmt
}

/**
 * 判断是否为中文
 * @param {*} str
 * @returns
 */
export function isChinese(str) {
  const reg = /^[\u4E00-\u9FA5]+$/g
  if (!str) return false
  return reg.test(str)
}

/**
 * 加密邮箱
 * @param {*} email
 * @returns
 */
export function encryptEmail(email) {
  if (!email) return ''
  const arr = email.split('@')
  const user = arr[0]
  const domain = arr[1]
  if (user.length < 3) {
    return `${user.slice(0, 1)}***@${domain}`
  } else {
    return `${user.slice(0, 2)}***@${domain}`
  }
}

/**
 * 简单的洗牌算法
 * @param {*} array
 * @returns
 */
export function shuffle(array) {
  if (!array) return []
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

/**
 * 休眠函数
 * @param {*} timeout
 * @returns
 */
export function sleep(timeout = 1000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}

/**
 * 比较版本号
 * @param {*} version1
 * @param {*} version2
 * @returns -1: version1 < version2, 0: version1 = version2, 1: version1 > version2
 */
export function compareVersion(version1, version2) {
  const v1Arr = version1.split('.')
  const v2Arr = version2.split('.')
  const maxLen = Math.max(v1Arr.length, v2Arr.length)

  for (let i = 0; i < maxLen; i++) {
    const num1 = parseInt(v1Arr[i] || '0')
    const num2 = parseInt(v2Arr[i] || '0')

    if (num1 < num2) {
      return -1
    } else if (num1 > num2) {
      return 1
    }
  }

  return 0
}

/**
 * 生成指定范围的随机整数 [min, max)
 * @param {*} min
 * @param {*} max
 * @returns
 */
export function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

/**
 * 生成uuid
 * @returns
 */
export function createUUID() {
  let uuid = ''
  const str = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  uuid = str.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
  return uuid
}

/**
 * 防抖动
 * @param {*} method
 * @param {*} delay
 * @returns
 */
export function throttleWrapper(method, delay) {
  return throttle(method, delay)
}

/**
 * 防抖动
 * @param {*} method
 * @param {*} delay
 * @returns
 */
export function debounceWrapper(method, delay) {
  return debounce(method, delay)
}

/**
 * 从URL获取参数
 * @param {*} url
 * @param {*} paramName
 * @returns
 */
export function getQueryParam(url, paramName) {
  if (!url || !paramName) return null
  const searchParams = new URLSearchParams(new URL(url).search)
  return searchParams.get(paramName)
}

/**
 * 获取URL参数
 * @param {*} variable
 * @returns
 */
export function getQueryVariable(variable) {
  const query = window.location.search.substring(1)
  const vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (pair[0] === variable) {
      return pair[1]
    }
  }
  return false
}

/**
 * 检查是否为浏览器环境
 */
export const isBrowser = typeof window !== 'undefined'

/**
 * 检查是否为移动端
 */
export function isMobile() {
  if (!isBrowser) return false
  return window.innerWidth < 768
}

/**
 * 生成随机字符串
 * @param {*} n
 * @returns
 */
export function randomString(n) {
  let str = ''
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const len = chars.length
  for (let i = 0; i < n; i++) {
    str += chars.charAt(Math.floor(Math.random() * len))
  }
  return str
}

/**
 * 获取页面标题
 * @param {*} page
 * @param {*} siteInfo
 * @returns
 */
export function getPageTitle(page, siteInfo) {
  const BLOG_TITLE = siteConfig('TITLE', siteInfo?.title)
  const BLOG_DESCRIPTION = siteConfig('DESCRIPTION', siteInfo?.description)
  
  if (page) {
    const pageTitle = page?.title || page?.slug
    return `${pageTitle} - ${BLOG_TITLE}`
  } else {
    return `${BLOG_TITLE} - ${BLOG_DESCRIPTION}`
  }
}

/**
 * 检查是否为有效的URL
 * @param {*} str
 * @returns
 */
export function isValidUrl(str) {
  try {
    new URL(str)
    return true
  } catch (e) {
    return false
  }
}

/**
 * 检查是否为外链
 * @param {*} url
 * @returns
 */
export function isHttpLink(url) {
  if (!url) return false
  return url.startsWith('http://') || url.startsWith('https://')
}

/**
 * 检查是否为邮件或电话链接
 * @param {*} url
 * @returns
 */
export function isMailOrTelLink(url) {
  if (!url) return false
  return url.startsWith('mailto:') || url.startsWith('tel:')
}

/**
 * 格式化大数字
 * @param {*} num
 * @returns
 */
export function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  } else {
    return num.toString()
  }
}

/**
 * 将相对URL转换为绝对URL
 * @param {*} url
 * @param {*} base
 * @returns
 */
export function toAbsoluteUrl(url, base) {
  if (isHttpLink(url)) {
    return url
  }
  return new URL(url, base).href
}

export {
  debounce,
  throttle
}