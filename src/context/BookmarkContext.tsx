/**
 * 书签上下文 - 管理书签和分类的全局状态
 * 包含书签和分类的 CRUD 操作
 */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { loadFromStorage, saveToStorage, STORAGE_KEYS, generateId } from '../utils/storage'
import type { Bookmark, Category } from '../types'

/** 默认分类数据（首次使用时的初始数据） */
const defaultCategories: Category[] = [
  { id: 'cat-default', name: '常用', sort: 0 },
  { id: 'cat-dev', name: '开发', sort: 1 },
  { id: 'cat-tools', name: '工具', sort: 2 },
  { id: 'cat-learn', name: '学习', sort: 3 },
]

/** 默认书签数据（首次使用时的示例书签） */
const defaultBookmarks: Bookmark[] = [
  { id: 'bm-1', title: 'GitHub', url: 'https://github.com', icon: '', categoryId: 'cat-dev', createdAt: Date.now() },
  { id: 'bm-2', title: 'Google', url: 'https://www.google.com', icon: '', categoryId: 'cat-default', createdAt: Date.now() },
  { id: 'bm-3', title: 'Stack Overflow', url: 'https://stackoverflow.com', icon: '', categoryId: 'cat-dev', createdAt: Date.now() },
  { id: 'bm-4', title: 'MDN Web Docs', url: 'https://developer.mozilla.org', icon: '', categoryId: 'cat-learn', createdAt: Date.now() },
  { id: 'bm-5', title: 'ChatGPT', url: 'https://chat.openai.com', icon: '', categoryId: 'cat-tools', createdAt: Date.now() },
  { id: 'bm-6', title: 'Bilibili', url: 'https://www.bilibili.com', icon: '', categoryId: 'cat-default', createdAt: Date.now() },
]

/** 书签上下文值类型 */
interface BookmarkContextValue {
  bookmarks: Bookmark[]
  categories: Category[]
  // 书签操作
  addBookmark: (data: Omit<Bookmark, 'id' | 'createdAt'>) => void
  updateBookmark: (id: string, data: Partial<Bookmark>) => void
  deleteBookmark: (id: string) => void
  // 分类操作
  addCategory: (name: string) => void
  updateCategory: (id: string, name: string) => void
  deleteCategory: (id: string) => void
  // 数据管理
  exportData: () => string
  importData: (json: string) => boolean
  resetData: () => void
}

const BookmarkContext = createContext<BookmarkContextValue | undefined>(undefined)

/**
 * 书签 Provider 组件
 * 管理所有书签和分类数据，自动同步 localStorage
 */
export function BookmarkProvider({ children }: { children: ReactNode }) {
  // 从 localStorage 初始化数据
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() =>
    loadFromStorage<Bookmark[]>(STORAGE_KEYS.BOOKMARKS, defaultBookmarks)
  )
  const [categories, setCategories] = useState<Category[]>(() =>
    loadFromStorage<Category[]>(STORAGE_KEYS.CATEGORIES, defaultCategories)
  )

  // 数据变化时自动保存到 localStorage
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.BOOKMARKS, bookmarks)
  }, [bookmarks])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CATEGORIES, categories)
  }, [categories])

  // ==================== 书签 CRUD ====================

  /** 新增书签 */
  const addBookmark = (data: Omit<Bookmark, 'id' | 'createdAt'>) => {
    const newBookmark: Bookmark = {
      ...data,
      id: generateId(),
      createdAt: Date.now(),
    }
    setBookmarks((prev) => [newBookmark, ...prev])
  }

  /** 更新书签 */
  const updateBookmark = (id: string, data: Partial<Bookmark>) => {
    setBookmarks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...data } : b))
    )
  }

  /** 删除书签 */
  const deleteBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id))
  }

  // ==================== 分类 CRUD ====================

  /** 新增分类 */
  const addCategory = (name: string) => {
    const maxSort = categories.reduce((max, c) => Math.max(max, c.sort), 0)
    const newCategory: Category = {
      id: generateId(),
      name,
      sort: maxSort + 1,
    }
    setCategories((prev) => [...prev, newCategory])
  }

  /** 更新分类名称 */
  const updateCategory = (id: string, name: string) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name } : c))
    )
  }

  /** 删除分类（同时删除该分类下的所有书签） */
  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id))
    setBookmarks((prev) => prev.filter((b) => b.categoryId !== id))
  }

  // ==================== 数据导入导出 ====================

  /** 导出所有数据为 JSON 字符串 */
  const exportData = (): string => {
    return JSON.stringify({ bookmarks, categories }, null, 2)
  }

  /** 导入 JSON 数据，成功返回 true */
  const importData = (json: string): boolean => {
    try {
      const data = JSON.parse(json)
      if (data.bookmarks && data.categories) {
        setBookmarks(data.bookmarks)
        setCategories(data.categories)
        return true
      }
      return false
    } catch {
      return false
    }
  }

  /** 重置为默认数据 */
  const resetData = () => {
    setBookmarks(defaultBookmarks)
    setCategories(defaultCategories)
  }

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        categories,
        addBookmark,
        updateBookmark,
        deleteBookmark,
        addCategory,
        updateCategory,
        deleteCategory,
        exportData,
        importData,
        resetData,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  )
}

/**
 * 自定义 Hook：获取书签上下文
 */
export function useBookmarks(): BookmarkContextValue {
  const ctx = useContext(BookmarkContext)
  if (!ctx) throw new Error('useBookmarks 必须在 BookmarkProvider 内部使用')
  return ctx
}
