import BLOG from '@/blog.config'
import { getGlobalData } from '@/lib/db/getSiteData'
import { DynamicLayout } from '@/themes/theme'

// 预加载常用的组件和资源
const PreloadResources = () => {
  return (
    <>
      <link rel="preload" href="/api/config" as="fetch" crossOrigin="anonymous" />
      <link rel="prefetch" href="/api/config" />
    </>
  )
}

const Index = props => {
  const theme = props.NOTION_CONFIG?.THEME || BLOG.THEME

  return (
    <>
      <PreloadResources />
      <DynamicLayout theme={theme} layoutName='LayoutIndex' {...props} />
    </>
  )
}

/**
 * SSG 获取数据
 * @returns
 */
export async function getStaticProps() {
  const props = await getGlobalData({ from: 'index', pageType: ['Post'] })
  // 仅返回主页需要的数据，减少传输量
  const filteredProps = {
    siteInfo: props.siteInfo,
    allPages: props.allPages,
    postCount: props.postCount,
    categoryOptions: props.categoryOptions,
    tagOptions: props.tagOptions,
    customNav: props.customNav,
    customMenu: props.customMenu,
    NOTION_CONFIG: props.NOTION_CONFIG,
    latestPosts: props.latestPosts
  }

  return {
    props: filteredProps,
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND)
  }
}

export default Index
