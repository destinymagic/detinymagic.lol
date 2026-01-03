import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级 UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // 你可以将错误信息发送给服务器
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    
    // 在生产环境中，可以将错误发送到日志服务
    if (process.env.NODE_ENV === 'production') {
      console.error('Error caught by boundary:', error, errorInfo)
      // 这里可以发送错误到你的错误监控服务
      //例如：logErrorToService(error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      // 你可以渲染任何自定义降级 UI
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
            <h2 className="text-2xl font-bold text-red-500 mb-4">出现错误</h2>
            <p className="text-gray-700 mb-4">很抱歉，页面出现错误，请尝试刷新页面或稍后再试。</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              刷新页面
            </button>
            {process.env.NODE_ENV === 'development' && (
              <details className="text-left mt-4">
                <summary className="text-red-500 cursor-pointer">更多信息</summary>
                <p className="text-red-500 text-sm mt-2">
                  {this.state.error && this.state.error.toString()}
                </p>
                <pre className="text-red-500 text-xs mt-2 overflow-auto max-h-32">
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary