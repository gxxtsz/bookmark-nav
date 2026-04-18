/**
 * 书签表单组件
 * 用于新增和编辑书签的表单弹窗内容
 */
import { useState, useEffect } from 'react'
import { useBookmarks } from '../context/BookmarkContext'
import Modal from './Modal'
import toast from 'react-hot-toast'
import type { Bookmark } from '../types'

interface BookmarkFormProps {
  /** 是否打开 */
  open: boolean
  /** 关闭回调 */
  onClose: () => void
  /** 编辑时传入已有书签数据，新增时为 null */
  editingBookmark: Bookmark | null
}

export default function BookmarkForm({ open, onClose, editingBookmark }: BookmarkFormProps) {
  const { categories, addBookmark, updateBookmark } = useBookmarks()

  // 表单状态
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [icon, setIcon] = useState('')
  const [categoryId, setCategoryId] = useState('')

  // 打开弹窗时初始化表单数据
  useEffect(() => {
    if (open) {
      if (editingBookmark) {
        // 编辑模式：填充已有数据
        setTitle(editingBookmark.title)
        setUrl(editingBookmark.url)
        setIcon(editingBookmark.icon)
        setCategoryId(editingBookmark.categoryId)
      } else {
        // 新增模式：重置表单
        setTitle('')
        setUrl('')
        setIcon('')
        setCategoryId(categories[0]?.id || '')
      }
    }
  }, [open, editingBookmark, categories])

  /** 提交表单 */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 校验必填项
    if (!title.trim()) { toast.error('请输入书签名称'); return }
    if (!url.trim()) { toast.error('请输入网址'); return }
    if (!categoryId) { toast.error('请选择分类'); return }

    // 自动补全 http 协议
    let finalUrl = url.trim()
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = 'https://' + finalUrl
    }

    if (editingBookmark) {
      // 编辑模式
      updateBookmark(editingBookmark.id, { title: title.trim(), url: finalUrl, icon: icon.trim(), categoryId })
      toast.success('书签已更新')
    } else {
      // 新增模式
      addBookmark({ title: title.trim(), url: finalUrl, icon: icon.trim(), categoryId })
      toast.success('书签已添加')
    }
    onClose()
  }

  /** 输入框样式 */
  const inputClass = 'w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-sm'

  return (
    <Modal open={open} onClose={onClose} title={editingBookmark ? '编辑书签' : '新增书签'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 书签名称 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">书签名称 *</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} placeholder="如：GitHub" />
        </div>
        {/* 网址 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">网址 *</label>
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className={inputClass} placeholder="如：https://github.com" />
        </div>
        {/* 自定义图标（可选） */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">图标地址（可选）</label>
          <input type="text" value={icon} onChange={(e) => setIcon(e.target.value)} className={inputClass} placeholder="留空则自动获取网站图标" />
        </div>
        {/* 所属分类 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">所属分类 *</label>
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className={inputClass}>
            <option value="">请选择分类</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        {/* 提交按钮 */}
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            取消
          </button>
          <button type="submit" className="px-4 py-2 rounded-xl text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            {editingBookmark ? '保存修改' : '添加书签'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
