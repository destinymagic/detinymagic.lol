import { createContext, useContext, useState, useMemo, useEffect } from 'react'
import { getApi } from '@/lib/cache/cache_manager'

// 创建缓存上下文
const CacheContext = createContext()

// 自定义缓存 Hook
export const useCache = () => {
  const context = useContext(CacheContext)
  if (!context) {
    throw new Error('useCache must be used within a CacheProvider')
  }
  return context
}

// 缓存提供者组件
export const CacheProvider = ({ children }) => {
  const [cacheStats, setCacheStats] = useState({
    hits: 0,
    misses: 0,
    sets: 0
  })

  // 获取缓存实例
  const cache = useMemo(() => getApi(), [])

  // 优化的缓存获取函数
  const getCachedData = async (key, force = false) => {
    try {
      const data = await cache.getCache(key, force)
      if (data) {
        setCacheStats(prev => ({ ...prev, hits: prev.hits + 1 }))
        return data
      } else {
        setCacheStats(prev => ({ ...prev, misses: prev.misses + 1 }))
        return null
      }
    } catch (error) {
      console.error('Cache get error:', error)
      setCacheStats(prev => ({ ...prev, misses: prev.misses + 1 }))
      return null
    }
  }

  // 优化的缓存设置函数
  const setCachedData = async (key, data, customCacheTime) => {
    if (!data) return

    try {
      await cache.setCache(key, data, customCacheTime)
      setCacheStats(prev => ({ ...prev, sets: prev.sets + 1 }))
    } catch (error) {
      console.error('Cache set error:', error)
    }
  }

  // 优化的缓存删除函数
  const deleteCachedData = async (key) => {
    try {
      await cache.delCache(key)
    } catch (error) {
      console.error('Cache delete error:', error)
    }
  }

  // 清空缓存统计
  const resetCacheStats = () => {
    setCacheStats({ hits: 0, misses: 0, sets: 0 })
  }

  // 缓存上下文值
  const value = useMemo(() => ({
    getCachedData,
    setCachedData,
    deleteCachedData,
    cacheStats,
    resetCacheStats
  }), [cacheStats])

  return (
    <CacheContext.Provider value={value}>
      {children}
    </CacheContext.Provider>
  )
}

// 缓存统计组件
export const CacheStats = () => {
  const { cacheStats, resetCacheStats } = useCache()

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-lg shadow-lg text-xs z-50">
      <div className="font-bold mb-1">Cache Stats</div>
      <div>Hits: {cacheStats.hits}</div>
      <div>Misses: {cacheStats.misses}</div>
      <div>Sets: {cacheStats.sets}</div>
      <div className="mt-1 text-gray-300">
        Rate: {cacheStats.hits + cacheStats.misses > 0 
          ? Math.round((cacheStats.hits / (cacheStats.hits + cacheStats.misses)) * 100) 
          : 0}%
      </div>
      <button 
        onClick={resetCacheStats}
        className="mt-2 text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
      >
        Reset
      </button>
    </div>
  )
}