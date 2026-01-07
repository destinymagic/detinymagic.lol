/**
 * 上一篇/下一篇文章导航
 * @param {*} props
 * @returns
 */
export default function ArticleAround({ prev, next }) {
  if (!prev && !next) {
    return null
  }

  return (
    <div className="bearblog-article-around">
      <div className="flex flex-col space-y-4">
        {prev && (
          <div className="prev-article">
            <span>← </span>
            <a href={prev.href} className="hover:underline">
              {prev.title}
            </a>
          </div>
        )}
        
        {next && (
          <div className="next-article">
            <a href={next.href} className="hover:underline">
              {next.title}
            </a>
            <span> →</span>
          </div>
        )}
      </div>
    </div>
  )
}