import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import CONFIG from '../config'

/**
 * 标准博客列表分页
 * @param {*} props
 * @returns
 */
const BlogListPage = props => {
  const { page = 1, posts, postCount } = props
  const { NOTION_CONFIG } = useGlobal()
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
  const router = useRouter()
  const totalPage = Math.ceil(postCount / POSTS_PER_PAGE)
  const currentPage = parseInt(page)

  const showPrev = currentPage > 1
  const showNext = currentPage < totalPage
  const pagePrefix = router.asPath
    .split('?')[0]
    .replace(/\/page\/[1-9]\d*/, '')
    .replace(/\/$/, '')
    .replace('.html', '')

  return (
    <div className="blog-list-page">
      {posts?.map(post => (
        <BlogItem key={post.id} post={post} />
      ))}

      <Pagination
        showPrev={showPrev}
        showNext={showNext}
        page={page}
        totalPage={totalPage}
        pagePrefix={pagePrefix}
      />
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

/**
 * 分页组件
 * @param {*} props
 * @returns
 */
const Pagination = props => {
  const { showNext, showPrev, page, totalPage, pagePrefix } = props
  const router = useRouter()

  const goToPage = page => {
    if (page === 1) {
      router.push(pagePrefix)
    } else {
      router.push(`${pagePrefix}/page/${page}`)
    }
  }

  return (
    <div className="bearblog-paginator">
      {showPrev && (
        <button
          onClick={() => goToPage(parseInt(page) - 1)}
          className="prev"
        >
          ← Previous
        </button>
      )}

      <span>Page {page} of {totalPage}</span>

      {showNext && (
        <button
          onClick={() => goToPage(parseInt(page) + 1)}
          className="next"
        >
          Next →
        </button>
      )}
    </div>
  )
}

export default BlogListPage