import { useState, useEffect } from 'react'

/**
 * 页面加载进度组件
 * 提供更流畅的加载体验
 */
const LoadingProgress = () => {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // 模拟加载进度
    let progressTimer
    let finishTimer

    const startLoading = () => {
      setLoading(true)
      setProgress(10)
      
      progressTimer = setInterval(() => {
        setProgress(prev => {
          // 模拟逐渐增加的进度，但故意不达到100%，直到完成
          const newProgress = prev + Math.floor(Math.random() * 10)
          return newProgress > 80 ? 80 : newProgress
        })
      }, 300)
    }

    const finishLoading = () => {
      setProgress(100)
      finishTimer = setTimeout(() => {
        setLoading(false)
        clearInterval(progressTimer)
      }, 300)
    }

    // 监听路由变化事件
    const handleStart = () => startLoading()
    const handleComplete = () => finishLoading()

    window.addEventListener('beforeunload', handleStart)
    window.addEventListener('load', handleComplete)
    
    // 如果页面已经加载完成，则直接完成进度
    if (document.readyState === 'complete') {
      handleComplete()
    }

    return () => {
      window.removeEventListener('beforeunload', handleStart)
      window.removeEventListener('load', handleComplete)
      clearInterval(progressTimer)
      clearTimeout(finishTimer)
    }
  }, [])

  if (!loading) {
    return null
  }

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-1 z-50 transition-all duration-300"
      style={{ backgroundColor: 'rgba(59, 130, 246, 0.5)' }}
    >
      <div
        className="h-full bg-blue-500 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export default LoadingProgress