import cache from 'memory-cache'
import BLOG from '@/blog.config'

// 根据环境配置不同的缓存时间
const cacheTime = BLOG.isProd 
  ? (process.env.MEMORY_CACHE_TTL || 10 * 60)  // 生产环境默认10分钟
  : (process.env.DEV_MEMORY_CACHE_TTL || 120 * 60) // 开发环境默认2小时

// 缓存大小限制
const MAX_CACHE_SIZE = parseInt(process.env.MAX_MEMORY_CACHE_SIZE) || 500

export async function getCache(key, options) {
  try {
    // 检查缓存大小，如果超过限制则清理部分缓存
    const allKeys = cache.keys()
    if (allKeys.length > MAX_CACHE_SIZE) {
      // 删除最早的一批缓存项（10%）
      const keysToDelete = allKeys.slice(0, Math.floor(MAX_CACHE_SIZE * 0.1))
      keysToDelete.forEach(k => cache.del(k))
    }
    
    return cache.get(key)
  } catch (error) {
    console.error('Memory cache get error:', error)
    return null
  }
}

export async function setCache(key, data, customCacheTime) {
  try {
    // 检查缓存大小，如果接近限制则先清理
    const allKeys = cache.keys()
    if (allKeys.length > MAX_CACHE_SIZE * 0.9) {
      // 删除最早的一批缓存项（10%）
      const keysToDelete = allKeys.slice(0, Math.floor(MAX_CACHE_SIZE * 0.1))
      keysToDelete.forEach(k => cache.del(k))
    }
    
    const ttl = customCacheTime || cacheTime
    cache.put(key, data, ttl * 1000)
  } catch (error) {
    console.error('Memory cache set error:', error)
  }
}

export async function delCache(key) {
  try {
    cache.del(key)
  } catch (error) {
    console.error('Memory cache del error:', error)
  }
}

export default { getCache, setCache, delCache }