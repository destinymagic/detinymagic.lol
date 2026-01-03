import { useState, useEffect } from 'react'

/**
 * 性能监控Hook
 * 监控页面加载时间、资源加载情况等性能指标
 */
export const usePerformance = () => {
  const [performanceMetrics, setPerformanceMetrics] = useState({
    navigation: null,
    resources: [],
    paint: null,
    navigationV2: null
  })

  useEffect(() => {
    // 确保页面完全加载后再收集性能数据
    const collectPerformanceData = () => {
      if (typeof window !== 'undefined' && window.performance) {
        // 获取导航性能数据
        const navigation = performance.getEntriesByType('navigation')[0]
        
        // 获取资源性能数据
        const resources = performance.getEntriesByType('resource')
        
        // 获取绘制性能数据
        const paint = performance.getEntriesByType('paint')
        
        // 获取长任务数据（如果支持）
        const longTasks = performance.getEntriesByType('longtask') || []
        
        setPerformanceMetrics({
          navigation: navigation ? {
            loadEventEnd: navigation.loadEventEnd,
            domContentLoadedEventEnd: navigation.domContentLoadedEventEnd,
            responseStart: navigation.responseStart,
            responseEnd: navigation.responseEnd,
            connectStart: navigation.connectStart,
            connectEnd: navigation.connectEnd,
            domainLookupStart: navigation.domainLookupStart,
            domainLookupEnd: navigation.domainLookupEnd,
            redirectStart: navigation.redirectStart,
            redirectEnd: navigation.redirectEnd,
            requestStart: navigation.requestStart,
            loadEventStart: navigation.loadEventStart,
            unloadEventStart: navigation.unloadEventStart,
            unloadEventEnd: navigation.unloadEventEnd,
            domComplete: navigation.domComplete,
            domInteractive: navigation.domInteractive,
            fetchStart: navigation.fetchStart,
            loadEventEnd: navigation.loadEventEnd,
            responseStart: navigation.responseStart,
            secureConnectionStart: navigation.secureConnectionStart,
            navigationStart: navigation.navigationStart
          } : null,
          resources: resources.map(r => ({
            name: r.name.split('/').pop(),
            duration: Math.round(r.duration),
            transferSize: r.transferSize,
            encodedBodySize: r.encodedBodySize,
            decodedBodySize: r.decodedBodySize,
            initiatorType: r.initiatorType
          })).filter(r => r.duration > 500), // 只保留加载时间超过500ms的资源
          paint: paint.length > 0 ? {
            firstPaint: paint.find(p => p.name === 'first-paint'),
            firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')
          } : null,
          longTasks: longTasks.map(task => ({
            duration: task.duration,
            startTime: task.startTime
          })),
          calculated: {
            fcp: paint.find(p => p.name === 'first-contentful-paint')?.startTime,
            domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.navigationStart,
            loadComplete: navigation?.loadEventEnd - navigation?.navigationStart,
            // 计算长任务数量（执行时间超过50ms的任务）
            longTaskCount: longTasks.filter(task => task.duration > 50).length
          }
        })
      }
    }

    // 等待页面完全加载
    if (document.readyState === 'complete') {
      collectPerformanceData()
    } else {
      window.addEventListener('load', collectPerformanceData)
      return () => window.removeEventListener('load', collectPerformanceData)
    }
  }, [])

  return performanceMetrics
}

/**
 * 获取页面性能评分
 * @param {*} metrics 
 * @returns 
 */
export const getPagePerformanceScore = (metrics) => {
  if (!metrics.calculated || !metrics.navigation) {
    return { score: 0, details: {} }
  }

  const { fcp, domContentLoaded, loadComplete } = metrics.calculated
  
  // 计算性能评分 (0-100)
  let score = 100
  
  // FCP 评分
  if (fcp && fcp > 3000) {
    score -= 30 // FCP > 3s 严重扣分
  } else if (fcp && fcp > 2000) {
    score -= 15 // FCP > 2s 中等扣分
  } else if (fcp && fcp > 1000) {
    score -= 5 // FCP > 1s 轻微扣分
  }
  
  // DOM 内容加载时间评分
  if (domContentLoaded && domContentLoaded > 3000) {
    score -= 20
  } else if (domContentLoaded && domContentLoaded > 2000) {
    score -= 10
  }
  
  // 页面完全加载时间评分
  if (loadComplete && loadComplete > 5000) {
    score -= 30
  } else if (loadComplete && loadComplete > 3000) {
    score -= 15
  }
  
  // 长任务数量评分
  if (metrics.calculated.longTaskCount > 10) {
    score -= 30
  } else if (metrics.calculated.longTaskCount > 5) {
    score -= 15
  }
  
  // 确保评分在0-100之间
  score = Math.max(0, Math.min(100, Math.round(score)))
  
  return {
    score,
    details: {
      fcp: fcp ? `${fcp.toFixed(0)}ms` : 'N/A',
      domContentLoaded: domContentLoaded ? `${domContentLoaded.toFixed(0)}ms` : 'N/A',
      loadComplete: loadComplete ? `${loadComplete.toFixed(0)}ms` : 'N/A',
      longTaskCount: metrics.calculated.longTaskCount,
      resourceCount: metrics.resources.length
    }
  }
}