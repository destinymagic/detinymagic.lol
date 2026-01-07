import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import throttle from 'lodash.throttle'
import { useCallback, useEffect, useRef, useState } from 'react'
import CONFIG from '../config'

/**
 * 滚动博客列表
 * @param {*} props
 * @returns
 */
export default function BlogListScroll(props) {
  const { posts } = props
  const { locale, NOTION_CONFIG } = useGlobal()
  const [page, updatePage] = useState(1)
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
  let hasMore = false
  const postsToShow = posts
    ? Object.assign(posts).slice(0, POSTS_PER_PAGE * page)
    : []

  if (posts) {
    const totalCount = posts.length
    hasMore = page * POSTS_PER_PAGE < totalCount
  }

  const handleGetMore = () => {
    if (!hasMore) return
    updatePage(page + 1)
  }

  const targetRef = useRef(null)

  // 监听滚动自动分页加载
  const scrollTrigger = useCallback(
    throttle(() => {
      const scrollS = window.scrollY + window.outerHeight
      const clientHeight = targetRef
        ? targetRef.current
          ? targetRef.current.clientHeight
          : 0
        : 0
      if (scrollS > clientHeight + 100) {
        handleGetMore()
      }
    }, 500)
  )

  useEffect(() => {
    window.addEventListener('scroll', scrollTrigger)
    return () => {
      window.removeEventListener('scroll', scrollTrigger)
    }
  })

  return (
    <div id="posts-wrapper" className="w-full" ref={targetRef}>
      {postsToShow.map(p => (
        <BlogItem key={p.id} post={p} />
      ))}

      <div
        onClick={handleGetMore}
        className="text-center py-4 cursor-pointer"
      >
        {hasMore ? (
          <div>
            <i className="mr-2 fas fa-spinner animate-spin" /> {locale.COMMON.LOAD_MORE}
          </div>
        ) : (
          <div>{locale.COMMON.NO_MORE} 😰</div>
        )}
      </div>
    </div>
  )
}

/**
 * 博客列表项
 * @param {*} props
 * @returns
 */
const BlogItem = props => {
  const { post } = props
  const showPreview = siteConfig('BEAR_BLOG_POST_LIST_PREVIEW', null, CONFIG)
  const showSummary = siteConfig('BEAR_BLOG_POST_LIST_SUMMARY', null, CONFIG)

  return (
    <article className="bearblog-blog-item">
      <header>
        <h2 className="bearblog-blog-item-title">
          <a href={post.href}>{post.title}</a>
        </h2>
        <div className="bearblog-blog-item-date">
          {post.date?.start_date || post.createdTime}
          {post.category && <span> • {post.category}</span>}
        </div>
      </header>
      
      {showPreview && post?.blockMap && (
        <div className="bearblog-blog-item-preview">
          <div className="notion-page">
            <div className="notion-text">{post.summary}</div>
          </div>
        </div>
      )}
      
      {showSummary && !showPreview && (
        <div className="bearblog-blog-item-summary">
          {post.summary}
        </div>
      )}
    </article>
  )
}