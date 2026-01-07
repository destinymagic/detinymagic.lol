import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import { Transition } from '@headlessui/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useRef } from 'react'
import CONFIG from './config'
import { Style } from './style'

// 动态导入组件
const AlgoliaSearchModal = dynamic(
  () => import('@/components/AlgoliaSearchModal'),
  { ssr: false }
)
const Comment = dynamic(() => import('@/components/Comment'), { ssr: false })
const NotionPage = dynamic(() => import('@/components/NotionPage'), { ssr: false })
const ShareBar = dynamic(() => import('@/components/ShareBar'), { ssr: false })

// Bear Blog主题组件
const BlogListPage = dynamic(() => import('./components/BlogListPage'), { ssr: false })
const BlogListScroll = dynamic(() => import('./components/BlogListScroll'), { ssr: false })
const ArticleInfo = dynamic(() => import('./components/ArticleInfo'), { ssr: false })
const ArticleAround = dynamic(() => import('./components/ArticleAround'), { ssr: false })
const ArticleLock = dynamic(() => import('./components/ArticleLock'), { ssr: false })
const BlogArchiveItem = dynamic(() => import('./components/BlogArchiveItem'), { ssr: false })
const SearchInput = dynamic(() => import('./components/SearchInput'), { ssr: false })
const BlogPostBar = dynamic(() => import('./components/BlogPostBar'), { ssr: false })

// 主题全局状态
const ThemeGlobalBearBlog = createContext()
export const useBearBlogGlobal = () => useContext(ThemeGlobalBearBlog)

/**
 * 基础布局
 */
const LayoutBase = (props) => {
  const { children, slotTop, post, siteInfo } = props
  const { onLoading } = useGlobal()
  const searchModal = useRef(null)
  const router = useRouter()

  return (
    <ThemeGlobalBearBlog.Provider value={{ searchModal }}>
      <div id="theme-bearblog" className="min-h-screen flex flex-col">
        <Style />
        
        {/* 导航栏 */}
        <header className="bearblog-nav">
          <h1 className="bearblog-nav-title">
            <a href="/" className="no-underline">
              {siteConfig('BLOG_TITLE', siteInfo?.title || 'Bear Blog')}
            </a>
          </h1>
          <nav>
            <ul className="bearblog-nav-menu">
              <li><a href="/">Home</a></li>
              <li><a href="/archive">Archive</a></li>
              <li><a href="/category">Categories</a></li>
              <li><a href="/tag">Tags</a></li>
              {siteConfig('BEAR_BLOG_MENU_SEARCH') && <li><a href="/search">Search</a></li>}
            </ul>
          </nav>
        </header>

        <main>
          <Transition
            show={!onLoading}
            appear={true}
            enter="transition ease-in-out duration-700 transform order-first"
            enterFrom="opacity-0 translate-y-16"
            enterTo="opacity-100"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-16"
            unmount={false}>
            {slotTop}
            {children}
          </Transition>
        </main>

        <footer className="bearblog-footer">
          <p>
            {siteConfig('BEAR_BLOG_FOOTER_ICON', null, CONFIG)} 
            {siteConfig('BEAR_BLOG_FOOTER_TEXT', null, CONFIG) || 
              `© ${siteConfig('BLOG_AUTHOR')} ${new Date().getFullYear()} | Powered by NotionNext ${siteConfig('VERSION')}`}
          </p>
        </footer>

        {/* 搜索模态框 */}
        <AlgoliaSearchModal cRef={searchModal} {...props} />
      </div>
    </ThemeGlobalBearBlog.Provider>
  )
}

/**
 * 首页布局 - 博客列表
 */
const LayoutIndex = (props) => {
  return <LayoutPostList {...props} />
}

/**
 * 博客列表布局
 */
const LayoutPostList = (props) => {
  return (
    <>
      <BlogPostBar {...props} />
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogListPage {...props} />
      ) : (
        <BlogListScroll {...props} />
      )}
    </>
  )
}

/**
 * 搜索页面布局
 */
const LayoutSearch = (props) => {
  const { keyword } = props

  useEffect(() => {
    if (isBrowser) {
      // 高亮搜索结果
      import('@/components/Mark').then(({ default: replaceSearchResult }) => {
        replaceSearchResult({
          doms: document.getElementById('posts-wrapper'),
          search: keyword,
          target: {
            element: 'span',
            className: 'text-red-500 bg-yellow-200'
          }
        })
      })
    }
  }, [keyword])

  const slotTop = siteConfig('ALGOLIA_APP_ID') ? null : <SearchInput {...props} />

  return <LayoutPostList {...props} slotTop={slotTop} />
}

/**
 * 归档页面布局
 */
const LayoutArchive = (props) => {
  const { archivePosts } = props
  return (
    <div className="bearblog-archive">
      <h2>Archive</h2>
      {Object.keys(archivePosts).map(archiveTitle => (
        <BlogArchiveItem
          key={archiveTitle}
          archiveTitle={archiveTitle}
          archivePosts={archivePosts}
        />
      ))}
    </div>
  )
}

/**
 * 文章详情页布局
 */
const LayoutSlug = (props) => {
  const { post, lock, validPassword, prev, next } = props

  if (!post) {
    return <Layout404 />
  }

  return (
    <>
      {lock && <ArticleLock validPassword={validPassword} />}
      
      {!lock && (
        <article>
          <header>
            <h1 className="bearblog-article-title">{post.title}</h1>
            <div className="bearblog-article-info">
              <span>{post.date?.start_date || post.createdTime}</span>
              {post.category && <span> • <a href={`/category/${post.category}`}>{post.category}</a></span>}
              {post.tags && post.tags.length > 0 && (
                <span> • 
                  {post.tags.map(tag => (
                    <a key={tag} href={`/tag/${tag}`} className="ml-1">#{tag}</a>
                  ))}
                </span>
              )}
            </div>
          </header>
          
          <div id="article-wrapper">
            <NotionPage post={post} />
          </div>
          
          <div className="bearblog-article-around">
            <ArticleAround prev={prev} next={next} />
          </div>
          
          <div className="bearblog-share">
            <ShareBar post={post} />
          </div>
          
          {siteConfig('BEAR_BLOG_COMMENT', null, CONFIG) && (
            <div className="bearblog-comment">
              <Comment frontMatter={post} />
            </div>
          )}
        </article>
      )}
    </>
  )
}

/**
 * 404页面
 */
const Layout404 = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-2xl font-bold mb-4">404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <a href="/" className="text-blue-500 hover:underline mt-4 inline-block">Go back home</a>
    </div>
  )
}

/**
 * 分类列表页
 */
const LayoutCategoryIndex = (props) => {
  const { categoryOptions } = props
  return (
    <div>
      <h2>Categories</h2>
      <div id="category-list">
        {categoryOptions?.map(category => (
          <a 
            key={category.name} 
            href={`/category/${category.name}`}
            className="category-item"
          >
            {category.name} ({category.count})
          </a>
        ))}
      </div>
    </div>
  )
}

/**
 * 标签列表页
 */
const LayoutTagIndex = (props) => {
  const { tagOptions } = props
  return (
    <div>
      <h2>Tags</h2>
      <div id="tags-list">
        {tagOptions.map(tag => (
          <a 
            key={tag.name} 
            href={`/tag/${encodeURIComponent(tag.name)}`}
            className="tag-item"
          >
            {tag.name} ({tag.count})
          </a>
        ))}
      </div>
    </div>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}