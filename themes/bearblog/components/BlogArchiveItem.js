/**
 * 归档分组文章
 * @param {*} param0
 * @returns
 */
export default function BlogArchiveItem({ archiveTitle, archivePosts }) {
  return (
    <div key={archiveTitle}>
      <h3 id={archiveTitle} className='text-xl font-bold mb-2'>
        {archiveTitle}
      </h3>

      <ul>
        {archivePosts[archiveTitle].map(post => {
          return (
            <li key={post.id} className="bearblog-archive-item">
              <span className="bearblog-archive-date">{post.date?.start_date}</span>
              <a href={post.href} className="hover:underline">
                {post.title}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}