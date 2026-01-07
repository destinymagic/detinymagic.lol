/* eslint-disable react/no-unknown-property */
/**
 * Bear Blog主题样式
 * 极简、高可读性、响应式设计
 * @returns
 */
const Style = () => {
  return <style jsx global>{`
    /* Bear Blog 极简样式 */
    
    /* 基础样式重置和字体设置 */
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #fff;
    }
    
    .dark body {
      color: #e0e0e0;
      background-color: #1e1e1e;
    }
    
    /* Bear Blog 主体容器 */
    #theme-bearblog {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }
    
    /* 标题样式 */
    h1, h2, h3, h4, h5, h6 {
      margin-top: 0;
      margin-bottom: 1rem;
      font-weight: 600;
      line-height: 1.25;
      color: #111;
    }
    
    .dark h1, .dark h2, .dark h3, .dark h4, .dark h5, .dark h6 {
      color: #fff;
    }
    
    h1 {
      font-size: 2.5em;
    }
    
    h2 {
      font-size: 2em;
      border-bottom: 1px solid #eaecef;
      padding-bottom: 0.3em;
    }
    
    h3 {
      font-size: 1.5em;
    }
    
    /* 段落和文本样式 */
    p {
      margin-bottom: 1em;
      font-size: 1.125rem;
      line-height: 1.8;
    }
    
    /* 链接样式 */
    a {
      color: #0074d9;
      text-decoration: none;
    }
    
    a:hover {
      text-decoration: underline;
    }
    
    .dark a {
      color: #64b5f6;
    }
    
    /* 文章区域 */
    #article-wrapper {
      margin: 2rem 0;
    }
    
    /* 博客列表 */
    .bearblog-blog-item {
      margin-bottom: 3rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #eee;
    }
    
    .dark .bearblog-blog-item {
      border-bottom: 1px solid #444;
    }
    
    .bearblog-blog-item:last-child {
      border-bottom: none;
    }
    
    .bearblog-blog-item-title {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    
    .bearblog-blog-item-title a {
      color: #111;
      text-decoration: none;
    }
    
    .dark .bearblog-blog-item-title a {
      color: #fff;
    }
    
    .bearblog-blog-item-title a:hover {
      color: #0074d9;
    }
    
    .dark .bearblog-blog-item-title a:hover {
      color: #64b5f6;
    }
    
    .bearblog-blog-item-date {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }
    
    .dark .bearblog-blog-item-date {
      color: #aaa;
    }
    
    .bearblog-blog-item-summary {
      margin-top: 0.8rem;
      color: #555;
      line-height: 1.7;
    }
    
    .dark .bearblog-blog-item-summary {
      color: #ccc;
    }
    
    /* 导航栏 */
    .bearblog-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #eee;
    }
    
    .dark .bearblog-nav {
      border-bottom: 1px solid #444;
    }
    
    .bearblog-nav-title {
      font-size: 1.5rem;
      font-weight: bold;
      margin: 0;
    }
    
    .bearblog-nav-menu {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      font-size: 1rem;
    }
    
    .bearblog-nav-menu li {
      margin-left: 1.5rem;
    }
    
    .bearblog-nav-menu a {
      color: #555;
      text-decoration: none;
      font-weight: 500;
    }
    
    .dark .bearblog-nav-menu a {
      color: #aaa;
    }
    
    .bearblog-nav-menu a:hover {
      color: #0074d9;
    }
    
    .dark .bearblog-nav-menu a:hover {
      color: #64b5f6;
    }
    
    /* 页脚 */
    .bearblog-footer {
      margin-top: 4rem;
      padding-top: 1.5rem;
      border-top: 1px solid #eee;
      text-align: center;
      color: #888;
      font-size: 0.9rem;
    }
    
    .dark .bearblog-footer {
      border-top: 1px solid #444;
      color: #aaa;
    }
    
    /* 响应式设计 */
    @media (max-width: 768px) {
      #theme-bearblog {
        padding: 1rem 0.5rem;
      }
      
      .bearblog-nav {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .bearblog-nav-menu {
        margin-top: 1rem;
        width: 100%;
        flex-wrap: wrap;
      }
      
      .bearblog-nav-menu li {
        margin: 0.5rem 1rem;
      }
      
      h1 {
        font-size: 2rem;
      }
      
      h2 {
        font-size: 1.6rem;
      }
      
      p {
        font-size: 1rem;
      }
    }
    
    /* 归档页面样式 */
    .bearblog-archive-item {
      margin: 0.5rem 0;
    }
    
    .bearblog-archive-date {
      display: inline-block;
      width: 120px;
      color: #666;
    }
    
    .dark .bearblog-archive-date {
      color: #aaa;
    }
    
    /* 分页按钮 */
    .bearblog-paginator {
      display: flex;
      justify-content: center;
      margin-top: 2rem;
      gap: 1rem;
    }
    
    .bearblog-paginator a, .bearblog-paginator span {
      padding: 0.5rem 1rem;
      text-decoration: none;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    .dark .bearblog-paginator a, .dark .bearblog-paginator span {
      border: 1px solid #444;
    }
    
    .bearblog-paginator a:hover {
      background-color: #f5f5f5;
    }
    
    .dark .bearblog-paginator a:hover {
      background-color: #333;
    }
    
    /* 评论区域 */
    .bearblog-comment {
      margin-top: 3rem;
    }
    
    /* 搜索框 */
    .bearblog-search {
      margin-bottom: 2rem;
    }
    
    .bearblog-search input {
      width: 100%;
      padding: 0.7rem 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    
    .dark .bearblog-search input {
      background-color: #333;
      color: #fff;
      border: 1px solid #555;
    }
    
    /* 分类和标签列表 */
    #category-list, #tags-list {
      margin-top: 1rem;
    }
    
    #category-list a, #tags-list a {
      display: inline-block;
      margin: 0.3rem 0.5rem;
      padding: 0.3rem 0.8rem;
      background: #f5f5f5;
      border-radius: 4px;
      color: #555;
      font-size: 0.9rem;
    }
    
    .dark #category-list a, .dark #tags-list a {
      background: #333;
      color: #aaa;
    }
    
    #category-list a:hover, #tags-list a:hover {
      background: #e0e0e0;
      color: #333;
    }
    
    .dark #category-list a:hover, .dark #tags-list a:hover {
      background: #444;
      color: #fff;
    }
    
    /* 文章详情页标题 */
    .bearblog-article-title {
      margin: 1rem 0;
      font-size: 2rem;
      font-weight: bold;
    }
    
    .dark .bearblog-article-title {
      color: #fff;
    }
    
    /* 文章信息 */
    .bearblog-article-info {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
    }
    
    .dark .bearblog-article-info {
      color: #aaa;
    }
    
    /* 上下篇文章导航 */
    .bearblog-article-around {
      margin: 2rem 0;
      padding: 1rem 0;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
    }
    
    .dark .bearblog-article-around {
      border-top: 1px solid #444;
      border-bottom: 1px solid #444;
    }
    
    /* Notion内容样式优化 */
    .notion {
      font-size: 1.125rem;
    }
    
    .notion-text, .notion-quote, .notion-h1, .notion-h2, .notion-h3, .notion-h4, .notion-h5, .notion-h6 {
      margin: 0.8rem 0;
    }
    
    .notion-asset-caption {
      font-size: 0.9rem;
      color: #666;
    }
    
    .dark .notion-asset-caption {
      color: #aaa;
    }
    
    /* 代码块样式 */
    .notion-code {
      background: #f8f8f8;
      border-radius: 4px;
      padding: 1rem;
      font-size: 0.9rem;
      margin: 1rem 0;
    }
    
    .dark .notion-code {
      background: #2d2d2d;
    }
    
    /* 表格样式 */
    .notion-table, .notion-th, .notion-td {
      border: 1px solid #ddd;
    }
    
    .dark .notion-table, .dark .notion-th, .dark .notion-td {
      border-color: #444;
    }
    
    /* 分割线 */
    .notion-divider {
      margin: 2rem 0;
    }
    
    /* 加粗、斜体文本 */
    .notion-bold {
      font-weight: 600;
    }
    
    .notion-italic {
      font-style: italic;
    }
    
    /* 引用块 */
    .notion-quote {
      border-left: 4px solid #0074d9;
      padding-left: 1rem;
      background: #f9f9f9;
    }
    
    .dark .notion-quote {
      background: #2d2d2d;
    }
  `}</style>
}

export { Style }