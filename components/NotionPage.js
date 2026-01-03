import { siteConfig } from '@/lib/config'
import { isBrowser } from '@/lib/utils'

// 动态导入Notion组件，减少初始包大小
const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(async (m) => {
    // 动态加载样式
    await Promise.all([
      import('react-notion-x/src/styles.css'),
      import('@/styles/notion.css')
    ])
    return m.Collection
  })
)

const Equation = dynamic(() =>
  import('@/components/Equation').then(m => m.Equation)
)

// 代码块组件需要动态导入
const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then(m => {
    // 加载代码块样式
    import('@/styles/notion-code.css')
    return m.Code
  })
)

const Pdf = dynamic(
  () => import('react-notion-x/build/third-party/pdf').then(m => m.Pdf),
  {
    ssr: false
  }
)

const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then(m => m.Modal),
  {
    ssr: false
  }
)

// 优化的NotionPage组件
const NotionPage = ({ post, className }) => {
  if (!post || !post.blockMap) {
    return <></>
  }

  // 优化渲染性能，只在浏览器中渲染
  if (!isBrowser) {
    return (
      <div className="flex items-center justify-center min-h-24">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300"></div>
      </div>
    )
  }

  return (
    <div id="notion-article" className={className}>
      <BlockMap
        recordMap={post.blockMap}
        mapPageUrl={(id) => {
          // 如果是内部链接，转换为相对路径
          return `/article/${id}`
        }}
        mapImageUrl={(url) => {
          // 图片URL映射，优化加载
          return url
        }}
        components={{
          equation: Equation,
          code: Code,
          collection: Collection,
          pdf: Pdf,
          modal: Modal
        }}
      />
    </div>
  )
}

export default NotionPage
