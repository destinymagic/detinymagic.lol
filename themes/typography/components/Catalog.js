import { useGlobal } from '@/lib/global'
import { siteConfig } from '@/lib/config'
import throttle from 'lodash.throttle'
import { uuidToId } from 'notion-utils'
import { useEffect, useRef, useState, useMemo } from 'react'
import CONFIG from '../config'

/**
 * 目录导航组件
 * 支持最多6级目录，可配置最大层级和滚动折叠
 * @param post
 * @returns {JSX.Element}
 */
const Catalog = ({ post }) => {
  const { locale } = useGlobal()
  const tRef = useRef(null)
  const clickLockRef = useRef(false) // 防止点击时滚动监听覆盖高亮
  const [activeSection, setActiveSection] = useState(null)
  const [expandedSections, setExpandedSections] = useState(new Set())

  // 读取配置
  const maxDepth = siteConfig('TYPOGRAPHY_TOC_MAX_DEPTH', 3, CONFIG)
  const collapseOnScroll = siteConfig('TYPOGRAPHY_TOC_COLLAPSE_ON_SCROLL', false, CONFIG)
  const scrollBehavior = siteConfig('TYPOGRAPHY_TOC_SCROLL_BEHAVIOR', 'instant', CONFIG)

  // 过滤目录，只显示 maxDepth 以内的层级
  const filteredToc = useMemo(() => {
    if (!post?.toc) return []
    return post.toc.filter(item => item.indentLevel < maxDepth)
  }, [post?.toc, maxDepth])

  // 构建层级关系，用于折叠功能
  const tocHierarchy = useMemo(() => {
    const hierarchy = new Map()
    let currentParents = []

    filteredToc.forEach((item, index) => {
      const id = uuidToId(item.id)
      // 找到当前项的父级
      while (currentParents.length > 0 && currentParents[currentParents.length - 1].level >= item.indentLevel) {
        currentParents.pop()
      }

      hierarchy.set(id, {
        item,
        index,
        parentId: currentParents.length > 0 ? currentParents[currentParents.length - 1].id : null,
        children: []
      })

      // 将当前项添加为父级的子项
      if (currentParents.length > 0) {
        const parentId = currentParents[currentParents.length - 1].id
        hierarchy.get(parentId)?.children.push(id)
      }

      currentParents.push({ id, level: item.indentLevel })
    })

    return hierarchy
  }, [filteredToc])

  // 监听滚动事件
  useEffect(() => {
    if (!post || !filteredToc || filteredToc.length < 1) {
      return
    }

    const throttleMs = 100

    const actionSectionScrollSpy = throttle(() => {
      // 如果点击锁生效，跳过滚动检测
      if (clickLockRef.current) return

      const sections = document.getElementsByClassName('notion-h')
      if (!sections || sections.length === 0) return

      const container = document.querySelector('#container-inner')
      if (!container) return
      const containerTop = container.getBoundingClientRect().top

      let currentSectionId = null

      for (let i = 0; i < sections.length; ++i) {
        const section = sections[i]
        if (!section || !(section instanceof Element)) continue

        const bbox = section.getBoundingClientRect()
        // 使用相对于容器的位置，与点击跳转的 20px 偏移一致
        const relativeTop = bbox.top - containerTop

        if (relativeTop <= 30) {
          currentSectionId = section.getAttribute('data-id')
        } else {
          break
        }
      }

      if (!currentSectionId && sections.length > 0) {
        currentSectionId = sections[0].getAttribute('data-id')
      }

      if (currentSectionId !== activeSection) {
        setActiveSection(currentSectionId)

        // 如果开启折叠模式，更新展开状态
        if (collapseOnScroll && currentSectionId) {
          const newExpanded = new Set()
          // 展开当前项及其所有祖先
          let current = currentSectionId
          while (current) {
            newExpanded.add(current)
            const node = tocHierarchy.get(current)
            current = node?.parentId
          }
          // 也展开当前项的直接子项
          const currentNode = tocHierarchy.get(currentSectionId)
          currentNode?.children.forEach(childId => newExpanded.add(childId))

          setExpandedSections(newExpanded)
        }

        // 滚动目录使当前项可见
        const index = filteredToc.findIndex(
          obj => uuidToId(obj.id) === currentSectionId
        )

        if (index !== -1 && tRef?.current) {
          const itemHeight = 28
          const containerHeight = tRef.current.clientHeight
          const scrollTop = Math.max(0, itemHeight * index - containerHeight / 2 + itemHeight / 2)
          tRef.current.scrollTo({ top: scrollTop, behavior: scrollBehavior })
        }
      }
    }, throttleMs)

    const content = document.querySelector('#container-inner')
    if (!content) return

    content.addEventListener('scroll', actionSectionScrollSpy)

    setTimeout(() => {
      actionSectionScrollSpy()
    }, 300)

    return () => {
      content?.removeEventListener('scroll', actionSectionScrollSpy)
    }
  }, [post, filteredToc, collapseOnScroll, tocHierarchy])

  // 初始化时设置展开状态
  useEffect(() => {
    if (collapseOnScroll) {
      // 折叠模式：只展开顶级项
      const topLevelIds = new Set(
        filteredToc
          .filter(item => item.indentLevel === 0)
          .map(item => uuidToId(item.id))
      )
      setExpandedSections(topLevelIds)
    } else {
      // 非折叠模式：展开所有项
      const allIds = new Set(filteredToc.map(item => uuidToId(item.id)))
      setExpandedSections(allIds)
    }
  }, [collapseOnScroll, filteredToc])

  // 判断某项是否应该显示
  const shouldShowItem = (id, indentLevel) => {
    if (!collapseOnScroll) return true
    if (indentLevel === 0) return true // 顶级总是显示

    // 检查父级是否在展开列表中
    const node = tocHierarchy.get(id)
    if (!node) return true

    let current = node.parentId
    while (current) {
      if (!expandedSections.has(current)) return false
      const parentNode = tocHierarchy.get(current)
      current = parentNode?.parentId
    }
    return true
  }

  if (!post || !filteredToc || filteredToc.length < 1) {
    return <></>
  }

  return (
    <div className='catalog-wrapper h-full flex flex-col'>
      {/* 标题 */}
      <div className='catalog-title text-sm font-bold mb-2 text-[var(--primary-color)] dark:text-gray-400 flex items-center flex-shrink-0'>
        <i className='mr-2 fas fa-list-ul text-xs' />
        {locale.COMMON.TABLE_OF_CONTENTS}
      </div>

      {/* 目录列表 */}
      <div
        className='catalog-list overflow-y-auto overscroll-none flex-1'
        ref={tRef}>
        <nav className='text-xs'>
          {filteredToc.map(tocItem => {
            const id = uuidToId(tocItem.id)
            const isActive = activeSection === id
            const show = shouldShowItem(id, tocItem.indentLevel)

            if (!show) return null

            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault()
                  // 激活点击锁，防止滚动监听覆盖
                  clickLockRef.current = true

                  const target = document.querySelector(`[data-id="${id}"]`)
                  if (target) {
                    const container = document.querySelector('#container-inner')
                    if (container) {
                      const targetRect = target.getBoundingClientRect()
                      const containerRect = container.getBoundingClientRect()
                      const scrollOffset = container.scrollTop + targetRect.top - containerRect.top - 20
                      container.scrollTo({ top: scrollOffset, behavior: scrollBehavior })
                    }
                  }

                  // 滚动完成后解除锁并更新高亮
                  const delay = scrollBehavior === 'smooth' ? 500 : 50
                  setTimeout(() => {
                    setActiveSection(id)
                    clickLockRef.current = false
                  }, delay)
                }}
                className={`catalog-item block py-1 border-l-2 transition-all duration-200 ease-out
                  ${isActive
                    ? 'border-[var(--primary-color)] dark:border-gray-300 text-[var(--primary-color)] dark:text-white font-medium'
                    : 'border-transparent text-gray-500 dark:text-gray-500 hover:text-[var(--primary-color)] dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                style={{ paddingLeft: `${8 + tocItem.indentLevel * 8}px` }}>
                <span className='block truncate'>
                  {tocItem.text}
                </span>
              </a>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default Catalog
