const CONFIG = {
  // Bear Blog主题配置
  BEAR_BLOG_MENU_CATEGORY: true, // 显示分类
  BEAR_BLOG_MENU_TAG: true, // 显示标签
  BEAR_BLOG_MENU_ARCHIVE: true, // 显示归档
  BEAR_BLOG_MENU_SEARCH: true, // 显示搜索

  // Logo和描述
  BEAR_BLOG_LOGO: process.env.NEXT_PUBLIC_BEAR_BLOG_LOGO || '',
  BEAR_BLOG_TITLE_APPEND: process.env.NEXT_PUBLIC_BEAR_BLOG_TITLE_APPEND || ' | Bear Blog Theme',
  BEAR_BLOG_FOOTER_ICON: process.env.NEXT_PUBLIC_BEAR_BLOG_FOOTER_ICON || '🐾',
  
  // 外观设置
  BEAR_BLOG_FONT_SIZE: process.env.NEXT_PUBLIC_BEAR_BLOG_FONT_SIZE || 'large', // small, medium, large
  BEAR_BLOG_USE_SANS: process.env.NEXT_PUBLIC_BEAR_BLOG_USE_SANS || 'true', // true: sans-serif, false: serif

  // 文章设置
  BEAR_BLOG_POST_LIST_COVER: false, // 不显示封面 - 保持极简
  BEAR_BLOG_POST_LIST_PREVIEW: false, // 不显示预览 - 保持极简
  BEAR_BLOG_POST_LIST_SUMMARY: true, // 显示摘要
  BEAR_BLOG_ARTICLE_WIDTH: process.env.NEXT_PUBLIC_BEAR_BLOG_ARTICLE_WIDTH || 'narrow', // narrow, medium, wide

  // 评论设置
  BEAR_BLOG_COMMENT: process.env.NEXT_PUBLIC_BEAR_BLOG_COMMENT || true, // 是否显示评论

  // 页脚设置
  BEAR_BLOG_SHOW_FOOTER: true, // 显示页脚
  BEAR_BLOG_SHOW_COPYRIGHT: process.env.NEXT_PUBLIC_BEAR_BLOG_SHOW_COPYRIGHT || true, // 显示版权信息
  BEAR_BLOG_SINCE: process.env.NEXT_PUBLIC_BEAR_BLOG_SINCE || '', // 站点建立年份
  BEAR_BLOG_FOOTER_TEXT: process.env.NEXT_PUBLIC_BEAR_BLOG_FOOTER_TEXT || '', // 自定义页脚文字
}

export default CONFIG