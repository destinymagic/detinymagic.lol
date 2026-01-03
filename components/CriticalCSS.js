import Head from 'next/head'
import { siteConfig } from '@/lib/config'

/**
 * 关键CSS内联组件
 * 用于优化首屏渲染性能
 */
const CriticalCSS = ({ themeCSS = '' }) => {
  // 获取关键字体配置
  const fontFamilies = siteConfig('FONT_FAMILY', 'serif')
  const fontDisplay = siteConfig('FONT_DISPLAY', 'swap')
  
  // 生成关键CSS
  const criticalCSS = `
    /* Critical styles for above-the-fold content */
    html {
      font-family: ${fontFamilies === 'serif' ? `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif` : `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`};
    }
    
    body {
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    #notion-article,
    .article-container,
    .post-detail {
      max-width: 100%;
    }
    
    /* 图片优化 */
    img {
      max-width: 100%;
      height: auto;
      transition: opacity 0.3s ease;
    }
    
    /* 字体预加载优化 */
    @media (prefers-reduced-motion: no-preference) {
      html {
        font-display: ${fontDisplay};
      }
    }
    
    /* 加载动画优化 */
    .animate-spin {
      animation: spin 1.5s linear infinite;
    }
    
    /* 响应式设计关键样式 */
    @media (max-width: 768px) {
      .container {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
      }
    }
    
    /* 主题相关的关键样式 */
    ${themeCSS}
    
    /* 深色模式预设 */
    html.dark {
      color-scheme: dark;
    }
    
    /* 避免FOUC（Flash of Unstyled Content） */
    .notion-presence {
      opacity: 0;
      animation: fadeIn 0.3s ease-in forwards;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `

  return (
    <Head>
      <style
        id="critical-css"
        dangerouslySetInnerHTML={{ __html: criticalCSS }}
      />
    </Head>
  )
}

export default CriticalCSS