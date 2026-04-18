/**
 * 书签卡片组件
 * 展示单个书签信息，支持点击跳转、编辑、删除、复制链接
 */
import { ExternalLink, Pencil, Trash2, Copy, Globe } from 'lucide-react'
import toast from 'react-hot-toast'
import type { Bookmark } from '../types'

interface BookmarkCardProps {
  /** 书签数据 */
  bookmark: Bookmark
  /** 点击编辑回调 */
  onEdit: (bookmark: Bookmark) => void
  /** 点击删除回调 */
  onDelete: (id: string) => void
}

/**
 * 获取网站 favicon 地址
 * 使用 Google Favicon 服务作为备选
 */
function getFaviconUrl(url: string): string {
  try {
    const u = new URL(url)
    return `https://www.google.com/s2/favicons?domain=${u.hostname}&sz=64`
  } catch {
    return ''
  }
}

export default function BookmarkCard({ bookmark, onEdit, onDelete }: BookmarkCardProps) {
  /** 复制链接到剪贴板 */
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bookmark.url)
      toast.success('链接已复制')
    } catch {
      toast.error('复制失败')
    }
  }

  /** 在新标签页打开链接 */
  const handleOpen = () => {
    window.open(bookmark.url, '_blank', 'noopener,noreferrer')
  }

  // favicon 地址：优先使用自定义 icon，否则自动获取
  const iconUrl = bookmark.icon || getFaviconUrl(bookmark.url)

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
      {/* 卡片主体 - 点击跳转 */}
      <div onClick={handleOpen} className="flex items-start gap-3">
        {/* 网站图标 */}
        <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {iconUrl ? (
            <img
              src={iconUrl}
              alt=""
              className="w-6 h-6 object-contain"
              onError={(e) => {
                // 图标加载失败时显示默认图标
                (e.target as HTMLImageElement).style.display = 'none'
                e.currentTarget.parentElement!.querySelector('.fallback-icon')?.classList.remove('hidden')
              }}
            />
          ) : null}
          <Globe className={`w-5 h-5 text-gray-400 fallback-icon ${iconUrl ? 'hidden' : ''}`} />
        </div>

        {/* 书签信息 */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
            {bookmark.title}
          </h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 truncate mt-0.5">
            {bookmark.url}
          </p>
        </div>

        {/* 跳转箭头 */}
        <ExternalLink className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-blue-500 transition-colors flex-shrink-0 mt-0.5" />
      </div>

      {/* 操作按钮组 - 悬浮时显示 */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => { e.stopPropagation(); handleCopy() }}
          className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
          title="复制链接"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(bookmark) }}
          className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-colors"
          title="编辑"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(bookmark.id) }}
          className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
          title="删除"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
