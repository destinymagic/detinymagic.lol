import '@/styles/globals.css'
import '@/styles/utility-patterns.css'
import '@/styles/prism.css'
import '@/styles/notion.css' // 重写部分notion样式
import 'react-notion-x/src/styles.css' // 原版的react-notion-x

import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { GlobalContextProvider } from '@/lib/global'
import { CacheProvider } from '@/components/CacheProvider'
import { LoadingProgress } from '@/components/LoadingProgress'
import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { Analytics } from '@vercel/analytics/react'

// 动态导入性能监控组件
const PerformanceMonitor = dynamic(() => import('@/components/PerformanceMonitor'), {
  ssr: false
})

// 优化的App组件
const MyApp = ({ Component, pageProps, router }) => {
  const routerInfo = useRouter()
  const PERFORMANCE = siteConfig('PERFORMANCE')
  const DEBUG = siteConfig('DEBUG')

  // 预加载常用资源
  useEffect(() => {
    // 预连接到关键域名
    const preconnectLinks = [
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://fonts.googleapis.com',
      'https://notion.so',
      'https://notion.site'
    ]

    preconnectLinks.forEach(href => {
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = href
      document.head.appendChild(link)
    })

    // 预加载关键资源
    const preloadLinks = [
      { href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' }
    ]

    preloadLinks.forEach(resource => {
      const link = document.createElement('link')
      link.rel = 'preload'
      Object.keys(resource).forEach(attr => {
        link.setAttribute(attr, resource[attr])
      })
      document.head.appendChild(link)
    })
  }, [])

  return (
    <CacheProvider>
      <GlobalContextProvider {...pageProps}>
        <div id='root' className='min-h-screen dark:bg-black'>
          <LoadingProgress />
          <Component {...pageProps} key={router.route} />
          {siteConfig('DEBUG', false) && <DebugPanel />}
          {siteConfig('PERFORMANCE', false) && <PerformancePanel />}
          {siteConfig('ANALYTICS_VERCEL', false) && <Analytics />}
        </div>
        {siteConfig('ENABLE_WEB_VITALS', false) && <PerformanceMonitor />}
      </GlobalContextProvider>
    </CacheProvider>
  )
}

export default MyApp
