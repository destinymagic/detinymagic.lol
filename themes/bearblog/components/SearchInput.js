import { useRouter } from 'next/router'
import { useImperativeHandle, useRef, useState } from 'react'

let lock = false

const SearchInput = ({ keyword, cRef, className }) => {
  const router = useRouter()
  const searchInputRef = useRef()
  const [onLoading, setLoadingState] = useState(false)

  useImperativeHandle(cRef, () => {
    return {
      focus: () => {
        searchInputRef?.current?.focus()
      }
    }
  })

  const handleSearch = () => {
    const key = searchInputRef.current.value

    if (key && key !== '') {
      setLoadingState(true)
      router.push({ pathname: '/search/' + key }).then(() => {
        setLoadingState(false)
      })
    } else {
      router.push({ pathname: '/' })
    }
  }

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) { // 回车
      handleSearch()
    } else if (e.keyCode === 27) { // ESC
      cleanSearch()
    }
  }

  const cleanSearch = () => {
    searchInputRef.current.value = ''
  }

  const [showClean, setShowClean] = useState(false)
  const updateSearchKey = (val) => {
    if (lock) {
      return
    }
    searchInputRef.current.value = val

    if (val) {
      setShowClean(true)
    } else {
      setShowClean(false)
    }
  }

  function lockSearchInput() {
    lock = true
  }

  function unLockSearchInput() {
    lock = false
  }

  return (
    <div className={`bearblog-search ${className}`}>
      <input
        ref={searchInputRef}
        type='text'
        placeholder='Search...'
        className='outline-none w-full p-2 border rounded'
        onKeyUp={handleKeyUp}
        onCompositionStart={lockSearchInput}
        onCompositionUpdate={lockSearchInput}
        onCompositionEnd={unLockSearchInput}
        onChange={e => updateSearchKey(e.target.value)}
        defaultValue={keyword}
      />
      <div className="mt-2 flex justify-end">
        <button 
          onClick={handleSearch}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm"
        >
          {onLoading ? (
            <i className="fas fa-spinner animate-spin" />
          ) : (
            <i className="fas fa-search" />
          )}
        </button>
      </div>
    </div>
  )
}

export default SearchInput