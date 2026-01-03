/**
 * 防抖函数
 * @param {Function} func - 要执行的函数
 * @param {number} wait - 延迟执行的毫秒数
 * @param {boolean} immediate - 是否立即执行
 * @returns {Function} 返回一个防抖函数
 */
export function debounce(func, wait, immediate = false) {
  let timeout
  return function (...args) {
    const callNow = immediate && !timeout
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      timeout = null
      if (!immediate) func.apply(this, args)
    }, wait)

    if (callNow) func.apply(this, args)
  }
}

/**
 * 节流函数
 * @param {Function} func - 要执行的函数
 * @param {number} limit - 限制执行的间隔时间（毫秒）
 * @returns {Function} 返回一个节流函数
 */
export function throttle(func, limit) {
  let inThrottle
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * 高性能节流函数（使用时间戳）
 * @param {Function} func - 要执行的函数
 * @param {number} limit - 限制执行的间隔时间（毫秒）
 * @returns {Function} 返回一个节流函数
 */
export function throttleByTimestamp(func, limit) {
  let lastFunc
  let lastRan

  return function (...args) {
    const context = this
    const now = Date.now()

    if (!lastRan) {
      func.apply(context, args)
      lastRan = now
      return
    }

    if (now - lastRan >= limit) {
      func.apply(context, args)
      lastRan = now
      return
    }

    clearTimeout(lastFunc)
    lastFunc = setTimeout(function () {
      if (now - lastRan >= limit) {
        func.apply(context, args)
        lastRan = now
      }
    }, limit - (now - lastRan))
  }
}

/**
 * 防抖动并返回Promise的版本
 * @param {Function} func - 要执行的函数
 * @param {number} wait - 延迟执行的毫秒数
 * @returns {Function} 返回一个防抖函数，返回Promise
 */
export function debouncePromise(func, wait) {
  let timeout
  return function (...args) {
    return new Promise((resolve, reject) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        try {
          resolve(func.apply(this, args))
        } catch (error) {
          reject(error)
        }
      }, wait)
    })
  }
}

/**
 * 防抖动并取消执行的版本
 * @param {Function} func - 要执行的函数
 * @param {number} wait - 延迟执行的毫秒数
 * @returns {Function} 返回一个防抖函数，带有一个cancel方法
 */
export function debounceWithCancel(func, wait) {
  let timeout
  const debounced = function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
  debounced.cancel = function () {
    clearTimeout(timeout)
    timeout = null
  }
  return debounced
}