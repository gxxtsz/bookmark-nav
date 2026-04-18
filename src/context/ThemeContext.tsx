/**
 * 主题上下文 - 管理浅色/暗黑模式切换
 * 使用 React Context 实现全局状态共享
 */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage'
import type { ThemeConfig } from '../types'

/** 主题上下文的值类型 */
interface ThemeContextValue {
  /** 当前主题配置 */
  theme: ThemeConfig
  /** 切换暗黑模式 */
  toggleDarkMode: () => void
}

/** 默认主题配置 */
const defaultTheme: ThemeConfig = {
  darkMode: false,
}

/** 创建主题上下文 */
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

/**
 * 主题 Provider 组件
 * 包裹在应用最外层，为子组件提供主题状态
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  // 从 localStorage 读取保存的主题，没有则使用默认值
  const [theme, setTheme] = useState<ThemeConfig>(() =>
    loadFromStorage<ThemeConfig>(STORAGE_KEYS.THEME, defaultTheme)
  )

  // 监听主题变化 → 同步到 localStorage 和 HTML class
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.THEME, theme)
    // Tailwind 暗黑模式：给 <html> 添加/移除 dark 类名
    if (theme.darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  /** 切换暗黑/浅色模式 */
  const toggleDarkMode = () => {
    setTheme((prev) => ({ ...prev, darkMode: !prev.darkMode }))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * 自定义 Hook：获取主题上下文
 * 使用时必须在 ThemeProvider 内部
 */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme 必须在 ThemeProvider 内部使用')
  return ctx
}
