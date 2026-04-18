/**
 * 首页 - 书签导航主页面
 * 包含搜索、分类筛选、书签网格展示
 */
import { useState, useMemo } from 'react'
import { Plus, BookmarkPlus } from 'lucide-react'
import { useBookmarks } from '../context/BookmarkContext'
import SearchBar from '../components/SearchBar'
import BookmarkCard from '../components/BookmarkCard'
import BookmarkForm from '../components/BookmarkForm'
import toast from 'react-hot-toast'
import type { Bookmark } from '../types'

export default function HomePage() {
  const { bookmarks, categories, deleteBookmark } = useBookmarks()

  // 搜索关键词
  const [searchQuery, setSearchQuery] = useState('')
  // 当前选中的分类ID（空字符串表示"全部"）
  const [activeCategoryId, setActiveCategoryId] = useState('')
  // 书签表单弹窗状态
  const [formOpen, setFormOpen] = useState(false)
  // 正在编辑的书签（null 表示新增模式）
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null)

  // 根据搜索词和分类筛选书签
  const filteredBookmarks = useMemo(() => {
    let result = bookmarks
    // 按分类筛选
    if (activeCategoryId) {
      result = result.filter((b) => b.categoryId === activeCategoryId)
    }
    // 按搜索词模糊匹配（名称或网址）
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (b) => b.title.toLowerCase().includes(query) || b.url.toLowerCase().includes(query)
      )
    }
    return result
  }, [bookmarks, activeCategoryId, searchQuery])

  /** 打开新增书签弹窗 */
  const handleAdd = () => {
    setEditingBookmark(null)
    setFormOpen(true)
  }

  /** 打开编辑书签弹窗 */
  const handleEdit = (bookmark: Bookmark) => {
    setEditingBookmark(bookmark)
    setFormOpen(true)
  }

  /** 删除书签（带确认） */
  const handleDelete = (id: string) => {
    if (window.confirm('确定要删除这个书签吗？')) {
      deleteBookmark(id)
      toast.success('书签已删除')
    }
  }

  // 按 sort 排序分类
  const sortedCategories = [...categories].sort((a, b) => a.sort - b.sort)

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* 顶部区域：搜索 + 新增按钮 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <button
          onClick={handleAdd}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          新增书签
        </button>
      </div>

      {/* 分类标签横向滚动 */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
        {/* "全部"标签 */}
        <button
          onClick={() => setActiveCategoryId('')}
          className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            activeCategoryId === ''
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          全部
        </button>
        {sortedCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategoryId(cat.id)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategoryId === cat.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* 书签网格 */}
      {filteredBookmarks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredBookmarks.map((bookmark) => (
            <BookmarkCard
              key={bookmark.id}
              bookmark={bookmark}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        /* 空状态提示 */
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <BookmarkPlus className="w-12 h-12 mb-3" />
          <p className="text-sm">
            {searchQuery ? '没有找到匹配的书签' : '还没有书签，点击上方按钮添加'}
          </p>
        </div>
      )}

      {/* 新增/编辑书签弹窗 */}
      <BookmarkForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        editingBookmark={editingBookmark}
      />
    </div>
  )
}
