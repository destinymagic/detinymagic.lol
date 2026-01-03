import { siteConfig } from '@/lib/config'
import Head from 'next/head'
import { useEffect, useRef, useState, useCallback, useMemo } from 'react'

/**
 * 图片懒加载
 * @param {*} param0
 * @returns
 */
export default function LazyImage({
  priority,
  id,
  src,
  alt,
  placeholderSrc,
  className,
  width,
  height,
  title,
  onLoad,
  onClick,
  style,
  quality = 80,
  loading = 'lazy'
}) {
  const maxWidth = siteConfig('IMAGE_COMPRESS_WIDTH')
  const defaultPlaceholderSrc = siteConfig('IMG_LAZY_LOAD_PLACEHOLDER')
  const imageRef = useRef(null)
  const [currentSrc, setCurrentSrc] = useState(
    placeholderSrc || defaultPlaceholderSrc
  )
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // 原图加载完成
  const handleImageLoaded = useCallback(() => {
    setIsLoading(false)
    setImageLoaded(true)
    if (typeof onLoad === 'function') {
      onLoad() // 触发传递的onLoad回调函数
    }
    // 移除占位符类名
    if (imageRef.current) {
      imageRef.current.classList.remove('lazy-image-placeholder')
    }
  }, [onLoad])

  /**
   * 图片加载失败回调
   */
  const handleImageError = useCallback(() => {
    setLoadError(true)
    setIsLoading(false)
    if (imageRef.current) {
      // 尝试加载 placeholderSrc，如果失败则加载 defaultPlaceholderSrc
      if (imageRef.current.src !== placeholderSrc && placeholderSrc) {
        imageRef.current.src = placeholderSrc
      } else {
        imageRef.current.src = defaultPlaceholderSrc
      }
      // 移除占位符类名
      if (imageRef.current) {
        imageRef.current.classList.remove('lazy-image-placeholder')
      }
    }
  }, [placeholderSrc, defaultPlaceholderSrc])

  useEffect(() => {
    if (!src) return

    const adjustedImageSrc = adjustImgSize(src, maxWidth, quality) || defaultPlaceholderSrc

    // 如果是优先级图片，直接加载
    if (priority) {
      const img = new window.Image()
      img.src = adjustedImageSrc
      img.onload = handleImageLoaded
      img.onerror = handleImageError
      return
    }

    // 检查浏览器是否支持IntersectionObserver
    if (!window.IntersectionObserver) {
      // 降级处理：直接加载图片
      const img = new window.Image()
      img.src = adjustedImageSrc
      img.onload = handleImageLoaded
      img.onerror = handleImageError
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // 预加载图片
            const img = new window.Image()
            // 设置图片解码优先级
            if ('decoding' in img) {
              img.decoding = 'async'
            }
            img.src = adjustedImageSrc
            img.onload = handleImageLoaded
            img.onerror = handleImageError

            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: siteConfig('LAZY_LOAD_THRESHOLD', '200px'),
        threshold: 0.1
      }
    )

    if (imageRef.current) {
      observer.observe(imageRef.current)
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current)
      }
    }
  }, [src, maxWidth, priority, handleImageLoaded, handleImageError, quality])

  // 动态添加width、height和className属性，仅在它们为有效值时添加
  const imgProps = useMemo(() => {
    const props = {
      ref: imageRef,
      src: loadError ? defaultPlaceholderSrc : currentSrc,
      'data-src': src, // 存储原始图片地址
      alt: alt || 'Lazy loaded image',
      className: `${className || ''} ${isLoading ? 'lazy-image-placeholder animate-pulse' : ''} ${loadError ? 'bg-gray-200 dark:bg-gray-700' : ''}`,
      style,
      width: width || 'auto',
      height: height || 'auto',
      onClick,
      // 性能优化属性
      loading: priority ? 'eager' : loading,
      decoding: 'async',
      // 现代图片格式支持
      ...(siteConfig('WEBP_SUPPORT') && { 'data-webp': true }),
      ...(siteConfig('AVIF_SUPPORT') && { 'data-avif': true })
    }

    if (id) props.id = id
    if (title) props.title = title

    return props
  }, [loadError, defaultPlaceholderSrc, currentSrc, alt, className, style, width, height, onClick, priority, loading, id, title, isLoading])

  if (!src) {
    return null
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...imgProps} />
      {/* 预加载 */}
      {priority && (
        <Head>
          <link rel='preload' as='image' href={adjustImgSize(src, maxWidth, quality)} />
        </Head>
      )}
    </>
  )
}

/**
 * 根据窗口尺寸决定压缩图片宽度
 * @param {*} src
 * @param {*} maxWidth
 * @param {*} quality
 * @returns
 */
const adjustImgSize = (src, maxWidth, quality = 80) => {
  if (!src) {
    return null
  }
  const screenWidth =
    (typeof window !== 'undefined' && window?.screen?.width) || maxWidth

  // 屏幕尺寸大于默认图片尺寸，没必要再压缩
  if (screenWidth > maxWidth) {
    return src
  }

  // 正则表达式，用于匹配 URL 中的 width 参数
  const widthRegex = /width=\d+/
  // 正则表达式，用于匹配 URL 中的 w 参数
  const wRegex = /w=\d+/
  // 正则表达式，用于匹配 Notion 图片尺寸参数
  const notionSizeRegex = /[^,]*?(\?|&)width=\d+/
  // 正则表达式，用于匹配 Notion 图片质量参数
  const notionQualityRegex = /[^,]*?(\?|&)height=\d+/
  // 用于添加质量参数的正则
  const qualityRegex = /(\?|&)width=\d+/

  // 检查是否为 Notion 图片
  if (src.includes('notion.so') || src.includes('notion.site')) {
    // 对于 Notion 图片，使用不同的处理方式
    const hasQuery = notionSizeRegex.test(src)
    if (hasQuery) {
      // 如果已经包含width参数，则替换
      let updatedSrc = src.replace(notionSizeRegex, `?width=${screenWidth}`)
      // 添加质量参数
      if (!updatedSrc.includes('height=')) {
        updatedSrc = `${updatedSrc}&height=${Math.round(screenWidth * 0.66)}`
      }
      if (!updatedSrc.includes('quality=')) {
        updatedSrc = `${updatedSrc}&quality=${quality}`
      }
      return updatedSrc
    } else {
      // 如果没有参数，添加参数
      return `${src}?width=${screenWidth}&height=${Math.round(screenWidth * 0.66)}&quality=${quality}`
    }
  }

  // 使用正则表达式替换 width/w 参数
  let updatedSrc = src
    .replace(widthRegex, `width=${screenWidth}`)
    .replace(wRegex, `w=${screenWidth}`)
  
  // 如果URL中已有参数，添加质量参数
  if (updatedSrc.includes('?') && !updatedSrc.includes('quality=')) {
    updatedSrc = `${updatedSrc}&quality=${quality}`
  } else if (!updatedSrc.includes('?')) {
    updatedSrc = `${updatedSrc}?quality=${quality}`
  }
  
  return updatedSrc
}