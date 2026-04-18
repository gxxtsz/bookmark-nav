/**
 * 设置页面
 * 支持数据导出备份、导入数据、重置数据
 */
import { useRef } from 'react'
import { Download, Upload, RotateCcw, Database } from 'lucide-react'
import { useBookmarks } from '../context/BookmarkContext'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const { bookmarks, categories, exportData, importData, resetData } = useBookmarks()
  // 隐藏的文件输入引用
  const fileInputRef = useRef<HTMLInputElement>(null)

  /** 导出数据为 JSON 文件并下载 */
  const handleExport = () => {
    const json = exportData()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `bookmark-nav-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('数据已导出')
  }

  /** 触发文件选择 */
  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  /** 读取导入的 JSON 文件 */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const text = ev.target?.result as string
      if (importData(text)) {
        toast.success('数据导入成功')
      } else {
        toast.error('导入失败，文件格式不正确')
      }
    }
    reader.readAsText(file)
    // 清空 input，允许重复选择同一文件
    e.target.value = ''
  }

  /** 重置数据 */
  const handleReset = () => {
    if (window.confirm('确定要重置所有数据吗？这将恢复为默认书签和分类，当前数据将丢失。')) {
      resetData()
      toast.success('数据已重置')
    }
  }

  /** 操作卡片通用样式 */
  const cardClass = 'flex items-center justify-between p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700'

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">设置</h1>

      {/* 数据统计 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl text-center">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{bookmarks.length}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">书签总数</p>
        </div>
        <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-2xl text-center">
          <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">{categories.length}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">分类总数</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* 导出数据 */}
        <div className={cardClass}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
              <Download className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">导出备份</p>
              <p className="text-xs text-gray-400">将所有书签和分类导出为 JSON 文件</p>
            </div>
          </div>
          <button onClick={handleExport} className="px-4 py-2 rounded-xl text-sm bg-green-600 text-white hover:bg-green-700 transition-colors">
            导出
          </button>
        </div>

        {/* 导入数据 */}
        <div className={cardClass}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
              <Upload className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">导入数据</p>
              <p className="text-xs text-gray-400">从 JSON 备份文件恢复数据</p>
            </div>
          </div>
          <button onClick={handleImportClick} className="px-4 py-2 rounded-xl text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            导入
          </button>
          {/* 隐藏的文件选择器 */}
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileChange} className="hidden" />
        </div>

        {/* 重置数据 */}
        <div className={cardClass}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
              <RotateCcw className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">重置数据</p>
              <p className="text-xs text-gray-400">清除所有数据并恢复为默认值</p>
            </div>
          </div>
          <button onClick={handleReset} className="px-4 py-2 rounded-xl text-sm bg-red-600 text-white hover:bg-red-700 transition-colors">
            重置
          </button>
        </div>

        {/* 存储信息 */}
        <div className={cardClass}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <Database className="w-5 h-5 text-gray-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">存储方式</p>
              <p className="text-xs text-gray-400">所有数据保存在浏览器 localStorage 中，清除浏览器缓存会丢失数据</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
