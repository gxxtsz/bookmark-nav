/**
 * App 根组件 - 路由配置
 * 使用 HashRouter 避免部署后刷新 404 问题
 */
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './context/ThemeContext'
import { BookmarkProvider } from './context/BookmarkContext'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import SettingsPage from './pages/SettingsPage'
import AboutPage from './pages/AboutPage'

export default function App() {
  return (
    // 主题 Provider → 书签 Provider → 路由
    <ThemeProvider>
      <BookmarkProvider>
        <HashRouter>
          {/* 全局页面布局 */}
          <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
            {/* 顶部导航栏 */}
            <Navbar />
            {/* 页面内容区域 */}
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/categories" element={<CategoryPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </main>
          </div>
          {/* Toast 全局提示 */}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 2000,
              style: {
                borderRadius: '12px',
                padding: '8px 16px',
                fontSize: '14px',
              },
            }}
          />
        </HashRouter>
      </BookmarkProvider>
    </ThemeProvider>
  )
}
