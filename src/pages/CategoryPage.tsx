/**
 * 分类管理页面
 * 支持新增、编辑、删除分类
 */
import { useState } from 'react'
import { Plus, Pencil, Trash2, FolderOpen } from 'lucide-react'
import { useBookmarks } from '../context/BookmarkContext'
import Modal from '../components/Modal'
import toast from 'react-hot-toast'

export default function CategoryPage() {
  const { categories, bookmarks, addCategory, updateCategory, deleteCategory } = useBookmarks()

  // 弹窗状态
  const [modalOpen, setModalOpen] = useState(false)
  // 正在编辑的分类ID（null 表示新增模式）
  const [editingId, setEditingId] = useState<string | null>(null)
  // 表单输入值
  const [inputName, setInputName] = useState('')

  // 按 sort 排序
  const sortedCategories = [...categories].sort((a, b) => a.sort - b.sort)

  /** 打开新增弹窗 */
  const handleAdd = () => {
    setEditingId(null)
    setInputName('')
    setModalOpen(true)
  }

  /** 打开编辑弹窗 */
  const handleEdit = (id: string, name: string) => {
    setEditingId(id)
    setInputName(name)
    setModalOpen(true)
  }

  /** 删除分类 */
  const handleDelete = (id: string, name: string) => {
    const count = bookmarks.filter((b) => b.categoryId === id).length
    const msg = count > 0
      ? `分类「${name}」下还有 ${count} 个书签，删除后书签也会一并删除，确定吗？`
      : `确定要删除分类「${name}」吗？`
    if (window.confirm(msg)) {
      deleteCategory(id)
      toast.success('分类已删除')
    }
  }

  /** 提交表单 */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputName.trim()) { toast.error('请输入分类名称'); return }

    if (editingId) {
      updateCategory(editingId, inputName.trim())
      toast.success('分类已更新')
    } else {
      addCategory(inputName.trim())
      toast.success('分类已添加')
    }
    setModalOpen(false)
  }

  /** 统计分类下的书签数量 */
  const getBookmarkCount = (categoryId: string) => {
    return bookmarks.filter((b) => b.categoryId === categoryId).length
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">分类管理</h1>
        <button
          onClick={handleAdd}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          新增分类
        </button>
      </div>

      {/* 分类列表 */}
      {sortedCategories.length > 0 ? (
        <div className="space-y-3">
          {sortedCategories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                  <FolderOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{cat.name}</p>
                  <p className="text-xs text-gray-400">{getBookmarkCount(cat.id)} 个书签</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleEdit(cat.id, cat.name)}
                  className="p-2 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
                  title="编辑"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(cat.id, cat.name)}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  title="删除"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <FolderOpen className="w-12 h-12 mx-auto mb-3" />
          <p className="text-sm">暂无分类</p>
        </div>
      )}

      {/* 新增/编辑分类弹窗 */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? '编辑分类' : '新增分类'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">分类名称</label>
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-sm"
              placeholder="如：开发工具"
              autoFocus
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              取消
            </button>
            <button type="submit" className="px-4 py-2 rounded-xl text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              {editingId ? '保存修改' : '添加分类'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
