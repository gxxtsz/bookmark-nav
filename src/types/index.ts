/**
 * 全局类型定义文件
 * 定义书签、分类、主题等核心数据结构
 */

/** 书签数据类型 */
export interface Bookmark {
  /** 唯一标识，使用随机字符串 */
  id: string
  /** 书签标题 */
  title: string
  /** 书签网址 */
  url: string
  /** 图标地址（可选，默认使用 favicon） */
  icon: string
  /** 所属分类ID */
  categoryId: string
  /** 创建时间戳 */
  createdAt: number
}

/** 分类数据类型 */
export interface Category {
  /** 唯一标识 */
  id: string
  /** 分类名称 */
  name: string
  /** 排序权重（数字越小越靠前） */
  sort: number
}

/** 主题配置类型 */
export interface ThemeConfig {
  /** 是否暗黑模式 */
  darkMode: boolean
}
