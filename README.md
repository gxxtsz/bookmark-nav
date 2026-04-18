# 📑 书签导航 Bookmark Nav

极简私有化书签导航主页，替代浏览器默认新标签页。本地管理网站书签，无广告、无登录、无后端。

## ✨ 功能特性

- 📚 **书签分类管理** - 新增、编辑、删除分类，分类标签横向切换筛选
- 🔖 **书签完整 CRUD** - 新增、编辑、删除书签，复制链接、新窗口打开
- 🔍 **全局模糊搜索** - 实时搜索书签名称和网址
- 🌓 **暗黑模式** - 一键切换浅色/暗黑模式，本地持久化
- 📱 **响应式设计** - 适配电脑和手机移动端
- 💾 **本地数据存储** - 全部数据 localStorage 持久化，刷新不丢失
- 📦 **数据导入导出** - 支持 JSON 备份和恢复
- 🔒 **隐私安全** - 纯前端，无后端、无数据库、无接口调用

## 🛠️ 技术栈

| 技术 | 说明 |
|------|------|
| [React](https://react.dev) | UI 框架 |
| [TypeScript](https://www.typescriptlang.org) | 类型安全 |
| [Vite](https://vite.dev) | 构建工具 |
| [TailwindCSS](https://tailwindcss.com) | 原子化 CSS |
| [React Router](https://reactrouter.com) | 路由管理 |
| [Lucide React](https://lucide.dev) | 图标库 |
| [React Hot Toast](https://react-hot-toast.com) | 轻量提示 |

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 📁 项目结构

```
src/
├── types/
│   └── index.ts          # TS 类型定义
├── utils/
│   └── storage.ts        # localStorage 读写工具
├── context/
│   ├── ThemeContext.tsx   # 主题全局上下文
│   └── BookmarkContext.tsx # 书签全局上下文
├── components/
│   ├── Navbar.tsx         # 顶部导航栏
│   ├── SearchBar.tsx      # 搜索栏
│   ├── BookmarkCard.tsx   # 书签卡片
│   ├── BookmarkForm.tsx   # 书签表单弹窗
│   └── Modal.tsx          # 通用弹窗
├── pages/
│   ├── HomePage.tsx       # 首页
│   ├── CategoryPage.tsx   # 分类管理页
│   ├── SettingsPage.tsx   # 设置页
│   └── AboutPage.tsx      # 关于页
├── App.tsx                # 路由配置
├── main.tsx               # 应用入口
└── index.css              # 全局样式
```

## 🌐 部署

### Vercel 部署

1. Fork 本项目到你的 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 框架选择 Vite，点击部署即可

### Netlify 部署

1. 构建命令：`npm run build`
2. 发布目录：`dist`

## 📄 开源协议

[MIT License](./LICENSE) - 自由使用、修改和分发。
