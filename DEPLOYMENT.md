# 部署指南

本指南将帮助你将新的 Next.js 博客部署到 GitHub Pages。

## 📋 前提条件

- Node.js 18.0 或更高版本
- Git
- GitHub 账户

## 🚀 部署到 GitHub Pages

### 方法一：自动部署（推荐）

1. **初始化 Git 仓库**

```bash
cd blog-next
git init
git add .
git commit -m "Initial commit: Next.js 16 blog"
```

2. **创建 GitHub 仓库**

在 GitHub 上创建一个新仓库，名称为 `yousanflics.github.io`

3. **推送代码**

```bash
git remote add origin https://github.com/yousanflics/yousanflics.github.io.git
git branch -M main
git push -u origin main
```

4. **配置 GitHub Pages**

- 进入仓库的 Settings > Pages
- 在 "Build and deployment" 部分
- Source 选择 "GitHub Actions"

5. **等待部署完成**

GitHub Actions 会自动构建和部署你的网站。几分钟后，你的网站就会在 `https://yousanflics.github.io` 上线。

### 方法二：手动部署

1. **构建项目**

```bash
npm run build
```

这会在 `out` 目录生成静态文件。

2. **部署到 GitHub Pages**

你可以使用 `gh-pages` 分支来部署：

```bash
npm install -g gh-pages
gh-pages -d out
```

## 🔄 更新网站

每次更新博客内容后：

```bash
git add .
git commit -m "更新博客内容"
git push
```

GitHub Actions 会自动重新构建和部署网站。

## 📝 添加新文章

1. 在 `content/posts/` 目录下创建新的 Markdown 文件
2. 添加 front matter：

```markdown
---
title: 文章标题
description: 文章描述
date: 2025-01-01
author: 水水
tags:
  - 标签1
  - 标签2
---

文章内容...
```

3. 提交并推送到 GitHub

## 🎨 自定义配置

### 修改网站信息

编辑 `app/layout.tsx` 中的 metadata 配置

### 修改个人信息

编辑 `app/about/page.tsx`

### 修改导航和页脚

编辑 `components/blog/navbar.tsx` 和 `components/blog/footer.tsx`

## 🔧 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run start
```

## 📦 项目迁移

如果你想用新博客替换旧博客：

1. 备份旧博客（可选）

```bash
cd /Users/young027/Downloads/dev/yousanflics.github.io
mv _posts _posts.backup
mv _config.yml _config.yml.backup
```

2. 将新博客文件移动到根目录

```bash
# 备份旧文件
mkdir ../old-blog
mv * ../old-blog/

# 移动新博客文件
mv ../blog-next/* .
mv ../blog-next/.* . 2>/dev/null || true
```

3. 推送更新

```bash
git add .
git commit -m "Migrate to Next.js 16"
git push
```

## 🎯 性能优化

新博客已经包含以下优化：

- ✅ 静态生成（SSG）
- ✅ 图片优化
- ✅ 代码分割
- ✅ Tree Shaking
- ✅ CSS 优化
- ✅ 暗黑模式

## 🐛 故障排除

### 构建失败

```bash
# 清除缓存
rm -rf .next node_modules
npm install
npm run build
```

### 样式问题

确保 Tailwind CSS 正确配置，检查 `app/globals.css`

### 部署后404

确保 `next.config.ts` 中的 `output: 'export'` 配置正确

## 📞 支持

如果遇到问题，可以：

1. 查看 Next.js 官方文档：https://nextjs.org/docs
2. 查看 shadcn/ui 文档：https://ui.shadcn.com
3. 提交 Issue 到 GitHub 仓库

## 🎉 完成

现在你已经成功部署了一个现代化的个人博客！访问 `https://yousanflics.github.io` 查看效果。

