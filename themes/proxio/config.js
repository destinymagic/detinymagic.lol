module.exports = {
  // ===================== 官方基础配置（完全保留，未做任何修改）=====================
  mouseTracker: true,
  scrollEffect: true,
  cardHover: true,
  showAvatar: true,
  showBio: true,
  postsPerPage: 10, // 保留官方默认值，不强制修改
  postSummaryLength: 150, // 仅新增：适配PM案例摘要（不影响原有功能）
  showToc: true, // 仅新增：PM案例目录需求（不影响原有功能）
  showSkills: true, // 仅新增：显示PM核心能力矩阵（不影响原有功能）
  showSocial: true, // 仅新增：显示社交链接（不影响原有功能）

  // ===================== 仅新增：产品经理个人品牌核心配置（需替换）=====================
  author: {
    name: "【你的姓名】", // 例：张三
    title: "【产品经理 | 专注领域】", // 例：产品经理 | 专注B端产品设计与AI应用落地
    avatar: "【你的头像链接】", // 例：https://imgbed.com/avatar.png（1:1比例，200x200px）
    bio: "【3-5行个人简介】" // 例：8年B端产品经验，专注用户增长与AI产品落地，主导过3款百万级用户产品的从0到1。
  },

  // ===================== 官方默认配置（完全保留，仅修改少量PM专属文案）=====================
  // 欢迎页（保留默认开关，仅修改文案为PM友好版）
  PROXIO_WELCOME_COVER_ENABLE: true, 
  PROXIO_WELCOME_TEXT: '欢迎来到我的产品经理博客，点击任意位置进入', 

  // 英雄区（保留默认结构，仅修改核心文案为PM专属）
  PROXIO_HERO_ENABLE: true,
  PROXIO_HERO_TITLE_1: '【你的博客主标题】', // 例：产品经理的思考沉淀
  PROXIO_HERO_TITLE_2: '【你的博客副标题】', // 例：用数据驱动决策，用产品解决问题
  PROXIO_HERO_BUTTON_1_TEXT: '查看产品案例', 
  PROXIO_HERO_BUTTON_1_URL: '/tag/产品案例',
  PROXIO_HERO_BUTTON_2_TEXT: '我的GitHub', 
  PROXIO_HERO_BUTTON_2_URL: '【你的GitHub链接】', // 例：https://github.com/zhangsan
  PROXIO_HERO_BUTTON_2_ICON: '',
  PROXIO_HERO_BANNER_IMAGE: '【你的Banner背景图链接】', // 无则留空，用官方默认
  PROXIO_HERO_BANNER_IFRAME_URL: '',

  // 文章区块（保留默认结构，仅修改标题为PM专属）
  PROXIO_BLOG_ENABLE: true,
  PROXIO_BLOG_TITLE: '我的产品案例', // 仅改标题，其余保留默认
  PROXIO_BLOG_COUNT: 4,
  PROXIO_BLOG_TEXT_1: '近期产品实战复盘',
  PROXIO_BLOG_PLACEHOLDER_IMG_URL_1: '',
  PROXIO_BLOG_PLACEHOLDER_IMG_URL_2: '',
  PROXIO_BLOG_PLACEHOLDER_IMG_URL_3: '',
  PROXIO_BLOG_PLACEHOLDER_IMG_URL_4: '',

  // 特性区块（保留默认结构，仅替换为PM核心能力）
  PROXIO_FEATURE_ENABLE: true,
  PROXIO_FEATURE_TITLE: '我的核心能力',
  PROXIO_FEATURE_TEXT_1: '专注产品全生命周期，解决真实业务问题',
  PROXIO_FEATURE_TEXT_2: '从需求挖掘到上线迭代，输出可落地的解决方案',
  PROXIO_FEATURE_1_ICON_CLASS: 'fa-solid fa-pen-ruler',
  PROXIO_FEATURE_1_ICON_IMG_URL: '',
  PROXIO_FEATURE_1_TITLE_1: '产品设计',
  PROXIO_FEATURE_1_TEXT_1: 'PRD撰写、用户旅程设计、产品架构、原型设计',
  PROXIO_FEATURE_2_ICON_CLASS: 'fa-solid fa-chart-simple',
  PROXIO_FEATURE_2_TITLE_1: '数据分析',
  PROXIO_FEATURE_2_TEXT_1: '用户行为分析、留存率优化、增长实验、数据驱动决策',
  PROXIO_FEATURE_3_ICON_CLASS: 'fa-solid fa-robot',
  PROXIO_FEATURE_3_TITLE_1: 'AI应用',
  PROXIO_FEATURE_3_TEXT_1: 'Agent开发、LLM产品落地、智能交互设计、prompt工程',
  PROXIO_FEATURE_BUTTON_TEXT: '查看完整案例',
  PROXIO_FEATURE_BUTTON_URL: '/tag/产品案例',

  // 生涯区块（保留默认结构，替换为PM职业经历）
  PROXIO_CAREER_ENABLE: true,
  PROXIO_CAREER_TITLE: '我的职业经历',
  PROXIO_CAREER_TEXT: '从0到1搭建产品，从1到N优化增长',
  PROXIO_CAREERS: [
    {
      title: "【你的职位1】", // 例：XX公司 B端产品经理
      bio: "【时间范围1】", // 例：2020-至今
      text: "【职责与成果1】" // 例：负责企业SaaS产品核心模块设计，推动留存率提升20%。
    },
    {
      title: "【你的职位2】", // 例：XX创业公司 产品负责人
      bio: "【时间范围2】", // 例：2018-2020
      text: "【职责与成果2】" // 例：主导AI客服产品从0到1，半年付费用户破1000+。
    }
  ],

  // 用户测评/FAQ（完全保留官方默认值，未做修改）
  PROXIO_TESTIMONIALS_ENABLE: true,
  PROXIO_TESTIMONIALS_TITLE: '用户评价',
  PROXIO_TESTIMONIALS_TEXT_1: '用过的人怎么说',
  PROXIO_TESTIMONIALS_TEXT_2: '已帮助1000+用户搭建Notion站点，好评率99%',
  PROXIO_TESTIMONIALS_BUTTON_URL: '/contact',
  PROXIO_TESTIMONIALS_BUTTON_TEXT: '联系我',
  PROXIO_TESTIMONIALS_ITEMS: [
    {
      PROXIO_TESTIMONIALS_ITEM_TEXT: '跟着教程10分钟就部署好了，自定义域名也很简单，太省心了！',
      PROXIO_TESTIMONIALS_ITEM_AVATAR: '/images/avatar-1.png',
      PROXIO_TESTIMONIALS_ITEM_NICKNAME: '小李',
      PROXIO_TESTIMONIALS_ITEM_DESCRIPTION: '个人博客站长',
      PROXIO_TESTIMONIALS_ITEM_URL: 'https://小李的博客.com',
    }
  ],
  PROXIO_FAQ_ENABLE: true,
  PROXIO_FAQ_TITLE: '常见问题',
  PROXIO_FAQ_TEXT_1: '你可能想知道这些',
  PROXIO_FAQ_TEXT_2: '整理了用户最常问的问题，快速解答你的疑惑',
  PROXIO_FAQS: [
    {
      q: '部署后Notion内容不同步怎么办？',
      a: '先检查Notion_Page_ID是否正确，其次刷新页面（缓存问题），详情参考<a href="#" className="underline">同步教程</a>'
    }
  ],

  // 关于我区块（保留默认结构，仅替换为PM信息）
  PROXIO_ABOUT_ENABLE: true,
  PROXIO_ABOUT_TITLE: '关于我',
  PROXIO_ABOUT_TEXT_1: "【你的简短介绍1】", // 例：专注B端产品设计的资深产品经理
  PROXIO_ABOUT_TEXT_2: "【你的简短介绍2】", // 例：擅长用数据驱动决策，输出可复用的产品方法论
  PROXIO_ABOUT_PHOTO_URL: "【你的头像链接】", // 和author.avatar一致即可
  PROXIO_ABOUT_KEY_1: '从业年限',
  PROXIO_ABOUT_VAL_1: "【你的从业年限】", // 例：8年+
  PROXIO_ABOUT_KEY_2: '主导产品数',
  PROXIO_ABOUT_VAL_2: "【数字】", // 例：10+
  PROXIO_ABOUT_BUTTON_URL: '/about',
  PROXIO_ABOUT_BUTTON_TEXT: '了解更多',

  // 品牌标签（替换为PM核心关键词）
  PROXIO_BRANDS_ENABLE: true,
  PROXIO_BRANDS: ['产品设计', '用户增长', '数据分析', 'AI产品', 'PRD撰写'],

  // 页脚配置（保留默认结构，仅替换为PM专属链接/文案）
  PROXIO_FOOTER_SLOGAN: "【你的博客Slogan】", // 例：用产品思维解决复杂问题
  PROXIO_FOOTER_LINKS: [
    {
      name: '内容分类',
      menus: [
        { title: '产品案例', href: '/tag/产品案例' },
        { title: '方法论', href: '/tag/方法论' },
        { title: 'AI应用', href: '/tag/AI应用' }
      ]
    },
    {
      name: '联系我',
      menus: [
        { title: 'GitHub', href: '【你的GitHub链接】' },
        { title: '公众号', href: '【你的公众号链接】' },
        { title: '关于我', href: '/about' }
      ]
    }
  ],
  PROXIO_FOOTER_PRIVACY_POLICY_URL: '',
  PROXIO_FOOTER_PRIVACY_LEGAL_NOTICE_URL: '',
  PROXIO_FOOTER_PRIVACY_TERMS_OF_SERVICE_URL: '',

  // 404页面（完全保留官方默认提示，未做任何修改）
  PROXIO_404_TITLE: '页面走丢了 😕',
  PROXIO_404_TEXT: '你访问的页面不存在，可能是地址错误或已删除',
  PROXIO_404_BACK: '返回首页',

  // 底部CTA（保留默认结构，仅修改文案为PM专属）
  PROXIO_CTA_ENABLE: true,
  PROXIO_CTA_TITLE: '一起交流产品思维',
  PROXIO_CTA_TITLE_2: '欢迎探讨产品设计与增长方法论',
  PROXIO_CTA_DESCRIPTION: '如果你有产品相关的问题想交流，欢迎通过下方方式联系我',
  PROXIO_CTA_BUTTON: true,
  PROXIO_CTA_BUTTON_URL: '/about',
  PROXIO_CTA_BUTTON_TEXT: '联系我',

  // 其他配置（完全保留官方默认值，未做修改）
  PROXIO_POST_REDIRECT_ENABLE: false,
  PROXIO_POST_REDIRECT_URL: '',
  PROXIO_NEWSLETTER: false
};
