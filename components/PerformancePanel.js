import { useState, useEffect } from 'react'
import { usePerformance, getPagePerformanceScore } from '@/lib/hooks/usePerformance'

/**
 * 性能监控面板
 * 显示页面性能指标和建议
 */
const PerformancePanel = () => {
  const [showPanel, setShowPanel] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const performanceMetrics = usePerformance()
  const performanceScore = getPagePerformanceScore(performanceMetrics)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  const togglePanel = () => {
    setShowPanel(!showPanel)
  }

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-500'
    if (score >= 70) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getScoreBg = (score) => {
    if (score >= 90) return 'bg-green-500'
    if (score >= 70) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  // 获取性能建议
  const getPerformanceRecommendations = () => {
    const recommendations = []
    
    if (performanceMetrics.calculated?.fcp > 2000) {
      recommendations.push('首屏内容加载时间过长，建议优化关键资源加载')
    }
    
    if (performanceMetrics.calculated?.domContentLoaded > 2000) {
      recommendations.push('DOM内容加载时间过长，建议减少DOM复杂度')
    }
    
    if (performanceMetrics.calculated?.loadComplete > 3000) {
      recommendations.push('页面完全加载时间过长，建议优化资源加载')
    }
    
    if (performanceMetrics.calculated?.longTaskCount > 5) {
      recommendations.push('存在过多长任务，建议拆分长任务')
    }
    
    if (performanceMetrics.resources.length > 10) {
      recommendations.push('资源数量过多，建议合并和压缩资源')
    }
    
    const slowResources = performanceMetrics.resources.filter(r => r.duration > 1000)
    if (slowResources.length > 0) {
      recommendations.push(`发现 ${slowResources.length} 个慢资源，建议优化`)
    }
    
    return recommendations
  }

  const recommendations = getPerformanceRecommendations()

  return (
    <>
      <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${showPanel ? 'w-80' : ''}`}>
        <div className="relative">
          <button
            onClick={togglePanel}
            className={`p-3 rounded-full shadow-lg ${
              performanceScore.score >= 90 
                ? 'bg-green-500' 
                : performanceScore.score >= 70 
                  ? 'bg-yellow-500' 
                  : 'bg-red-500'
            } text-white font-bold text-lg`}
          >
            ⚡ {performanceScore.score}
          </button>
          
          {showPanel && (
            <div className="absolute bottom-14 right-0 w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 border border-gray-200 dark:border-gray-700 max-h-[70vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-lg">性能监控</h3>
                <button 
                  onClick={togglePanel}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between">
                    <span className="font-medium">性能评分</span>
                    <span className={`font-bold ${getScoreColor(performanceScore.score)}`}>
                      {performanceScore.score}/100
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className={`h-2 rounded-full ${getScoreBg(performanceScore.score)}`} 
                      style={{ width: `${performanceScore.score}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm">
                    <div className="text-gray-500 dark:text-gray-400">FCP</div>
                    <div className="font-medium">{performanceScore.details.fcp}</div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm">
                    <div className="text-gray-500 dark:text-gray-400">DOM加载</div>
                    <div className="font-medium">{performanceScore.details.domContentLoaded}</div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm">
                    <div className="text-gray-500 dark:text-gray-400">完全加载</div>
                    <div className="font-medium">{performanceScore.details.loadComplete}</div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm">
                    <div className="text-gray-500 dark:text-gray-400">长任务数</div>
                    <div className="font-medium">{performanceScore.details.longTaskCount}</div>
                  </div>
                </div>
                
                {recommendations.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">优化建议</h4>
                    <ul className="space-y-1 text-sm">
                      {recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {performanceMetrics.resources.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">慢资源 (>{'>'}1s)</h4>
                    <div className="max-h-40 overflow-y-auto">
                      {performanceMetrics.resources
                        .filter(r => r.duration > 1000)
                        .sort((a, b) => b.duration - a.duration)
                        .map((resource, index) => (
                          <div key={index} className="flex justify-between text-sm py-1 border-b border-gray-100 dark:border-gray-700">
                            <span className="truncate max-w-[60%]">{resource.name}</span>
                            <span className="font-medium">{resource.duration}ms</span>
                          </div>
                        ))
                      }
                      {performanceMetrics.resources.filter(r => r.duration > 1000).length === 0 && (
                        <p className="text-gray-500 dark:text-gray-400 text-sm">无慢资源</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default PerformancePanel