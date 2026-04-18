/**
 * 关于页面
 * 展示项目信息、技术栈、开源协议
 */
import { Heart, Github, Code2, Shield } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">关于</h1>

      <div className="space-y-4">
        {/* 项目简介 */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">书签导航 Bookmark Nav</h2>
              <p className="text-xs text-gray-400">v1.0.0</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            一款极简私有化书签导航主页，替代浏览器默认新标签页。本地管理网站书签，无广告、无登录、无后端，
            所有数据存储在浏览器本地 localStorage 中，完全保护你的隐私。
          </p>
        </div>

        {/* 技术栈 */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">技术栈</h3>
          <div className="flex flex-wrap gap-2">
            {['React', 'TypeScript', 'Vite', 'TailwindCSS', 'React Router', 'Lucide Icons'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* 特性 */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">核心特性</h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              纯前端应用，无需后端服务，无需数据库
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              数据存储在浏览器 localStorage，隐私安全
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              支持浅色/暗黑模式切换，持久化保存
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              分类管理、模糊搜索、数据导入导出
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              响应式设计，适配桌面端和移动端
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              代码开源，可自由部署到 Vercel / Netlify 等平台
            </li>
          </ul>
        </div>

        {/* 开源协议 */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">开源协议</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            本项目基于 MIT 协议开源，你可以自由使用、修改和分发。
          </p>
        </div>

        {/* 底部 */}
        <div className="text-center py-4">
          <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-500" /> by Bookmark Nav
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-2 text-xs text-gray-400 hover:text-blue-500 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
