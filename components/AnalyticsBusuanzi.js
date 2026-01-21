/**
 * 不蒜子统计组件（支持SSR）
 * @param {object} props 
 * @param {boolean} [props.showLabels] - 是否显示文字标签
 */
export default function AnalyticsBusuanzi({ showLabels = true }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex gap-2 text-gray-400">
        <span className="h-4 w-20 bg-gray-100 animate-pulse rounded" />
        <span className="h-4 w-20 bg-gray-100 animate-pulse rounded" />
      </div>
    );
  }

  return (
    <div className="analytics-group flex gap-x-3 text-sm">
      {/* PV 统计 */}
      <span className="busuanzi_container_site_pv flex items-center">
        <i 
          className="fas fa-eye mr-1" 
          aria-hidden="true"
          title="页面访问量"
        />
        {showLabels && <span className="sr-only">访问量：</span>}
        <span className="busuanzi_value_site_pv min-w-[2ch]"></span>
      </span>

      {/* UV 统计 */}
      <span className="busuanzi_container_site_uv flex items-center">
        <i
          className="fas fa-users mr-1"
          aria-hidden="true"
          title="独立访客"
        />
        {showLabels && <span className="sr-only">访客数：</span>}
        <span className="busuanzi_value_site_uv min-w-[2ch]"></span>
      </span>
    </div>
  );
}
