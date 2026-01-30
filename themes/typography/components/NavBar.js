import { siteConfig } from '@/lib/config'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSimpleGlobal } from '..'
import { MenuList } from './MenuList'
import SocialButton from './SocialButton'
import SmartLink from '@/components/SmartLink'
import Catalog from './Catalog'
import CONFIG from '../config'

/**
 * 菜单导航
 * @param {*} props
 * @returns
 */
export default function NavBar(props) {
  const { post } = props
  const hasToc = post?.toc && post.toc.length > 0
  const tocEnable = siteConfig('TYPOGRAPHY_TOC_ENABLE', true, CONFIG)
  const subtitleDarkOnly = siteConfig('TYPOGRAPHY_SUBTITLE_DARK_ONLY', false, CONFIG)

  return (
    <div className='flex flex-col justify-between md:mt-20 md:h-[70vh]'>
      <header id='site-header' className='w-fit self-center md:self-start md:pb-8 md:border-l-2 dark:md:border-white dark:text-white md:border-[var(--primary-color)] text-[var(--primary-color)] md:[writing-mode:vertical-lr] px-4 hover:bg-[var(--primary-color)] dark:hover:bg-white hover:text-white dark:hover:text-[var(--primary-color)] ease-in-out duration-700 md:hover:pt-4 md:hover:pb-4 mb-2'>
        <SmartLink href='/'>
          <div className='flex flex-col-reverse md:flex-col items-center md:items-start'>
            <div className='font-bold text-4xl text-center' id='blog-name'>
              {siteConfig('TYPOGRAPHY_BLOG_NAME')}
            </div>
            <div
              className={`font-bold text-xl text-center ${subtitleDarkOnly ? 'hidden dark:block' : ''}`}
              id='blog-name-en'>
              {siteConfig('TYPOGRAPHY_BLOG_NAME_EN')}
            </div>
          </div>
        </SmartLink>
      </header>

      {/* 目录区域 - 在标题和导航之间，仅在有目录时显示 */}
      {tocEnable && hasToc && (
        <div className='hidden md:block flex-1 overflow-hidden my-4'>
          <Catalog post={post} />
        </div>
      )}

      <nav className='md:pt-0  z-20   flex-shrink-0'>
        <div id='nav-bar-inner' className='text-sm md:text-md'>
          <MenuList {...props} />
        </div>
        <SocialButton />
      </nav>
    </div>
  )
}
