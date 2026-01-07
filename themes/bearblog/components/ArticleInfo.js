/**
 * 文章信息组件
 * @param {*} props
 * @returns
 */
export default function ArticleInfo(props) {
  const { post } = props

  if (!post) {
    return null
  }

  return (
    <div className="bearblog-article-info">
      <div className="date-author">
        Published {post.date?.start_date || post.createdTime}
        {post.author && <span> • By {post.author}</span>}
        {post.category && <span> • In {post.category}</span>}
      </div>
      {post.tags && post.tags.length > 0 && (
        <div className="post-tags mt-2">
          {post.tags.map(tag => (
            <a 
              key={tag} 
              href={`/tag/${tag}`}
              className="post-tag mr-2"
            >
              #{tag}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}