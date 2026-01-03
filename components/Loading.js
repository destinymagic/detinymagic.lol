/**
 * 异步文件加载时的占位符
 * @returns
 */
const Loading = (props) => {
  return <div id="loading-container" className="z-50 w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-white dark:bg-black">
        <div id="loading-wrapper" className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              {props.text || '加载中...'} 
            </p>
        </div>
    </div>
}
export default Loading