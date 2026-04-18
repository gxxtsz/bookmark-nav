/**
 * localStorage 读写工具
 * 封装本地存储的读取和写入，带有 JSON 序列化/反序列化
 */

/**
 * 从 localStorage 读取数据
 * @param key 存储键名
 * @param defaultValue 默认值（读取失败时返回）
 * @returns 解析后的数据
 */
export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return defaultValue
    return JSON.parse(raw) as T
  } catch {
    // 解析失败时返回默认值
    return defaultValue
  }
}

/**
 * 将数据写入 localStorage
 * @param key 存储键名
 * @param value 要存储的数据
 */
export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error('保存数据到 localStorage 失败:', e)
  }
}

/**
 * 删除 localStorage 中的某个键
 * @param key 存储键名
 */
export function removeFromStorage(key: string): void {
  localStorage.removeItem(key)
}

/** 存储键名常量，统一管理避免拼写错误 */
export const STORAGE_KEYS = {
  BOOKMARKS: 'bookmark-nav-bookmarks',
  CATEGORIES: 'bookmark-nav-categories',
  THEME: 'bookmark-nav-theme',
} as const

/**
 * 生成唯一ID（简单实现，足够前端使用）
 * @returns 随机字符串ID
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9)
}
