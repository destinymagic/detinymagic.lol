/**
 * 站点核心配置（Proxio暗黑预览版专属）
 */
module.exports = {
  // ===================== 必须改的核心配置 =====================
  NOTION_PAGE_ID: "【你的Proxio模板Notion Page ID】", // 关键！替换为预览版模板的32位ID
  THEME: "proxio", // 锁定Proxio主题（必须是proxio，不能改）
  THEME_CONFIG: {
    darkMode: true, // 强制开启暗黑模式（预览版核心）
    // Proxio主题动效开关（和预览版一致，全部开启）
    mouseTracker: true,
    scrollEffect: true,
    cardHover: true
  },

  // ===================== 可选改的个性化配置 =====================
  NEXT_PUBLIC_URL: "【你的博客域名】", // 例：https://yourblog.vercel.app（部署后填）
  TITLE: "【你的博客标题】", // 例：产品经理的思考沉淀
  DESCRIPTION: "【你的博客描述】", // 例：专注B端产品设计与AI应用落地
  AUTHOR: "【你的姓名】",
  LANG: "zh-CN", // 中文，不用改
  TIMEZONE: "Asia/Shanghai", // 时区，不用改

  // ===================== 无需改的默认配置（保留） =====================
  PER_PAGE: 6, // 每页显示6篇文章（和预览版一致）
  NAV: [ // 导航栏（和预览版结构一致）
    { name: "首页", path: "/" },
    { name: "产品案例", path: "/tag/产品案例" },
    { name: "方法论", path: "/tag/方法论" },
    { name: "关于我", path: "/about" }
  ],
  PAGINATION_SIZE: 10,
  NOTION_ACCESS_TOKEN: "",
  NOTION_API_BASE_URL: "https://api.notion.com/v1",
  CACHE_TYPE: "vercel",
  CACHE_TIME: 600,
  IS_VERCEL_ENV: true,
  ENABLE_CACHE: true,
  ENABLE_SEARCH: true,
  ENABLE_COMMENT: false,
  COMMENT_OPTIONS: {
    repo: "",
    owner: "",
    clientId: "",
    clientSecret: "",
    theme: "github-light",
    perPage: 10
  },
  ANALYTICS: {
    enable: false,
    baidu: "",
    google: "",
    umami: {
      scriptUrl: "",
      websiteId: ""
    }
  },
  FOOTER: {
    slogan: "【你的页脚标语】", // 例：用产品思维解决复杂问题
    copyright: ""
  }
};
