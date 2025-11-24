# Young Studio – Personal Blog & Projects

A modern personal blog built with Next.js 16 and shadcn/ui, featuring a sleek dark theme and elegant design.

## ✨ Features

- 🚀 **Next.js 16** - Latest React framework with App Router
- 🎨 **shadcn/ui** - Beautiful, accessible UI components
- 🌓 **Dark Mode** - System-aware theme switching
- 📝 **Markdown Blog** - Write articles in Markdown
- 🏷️ **Tag System** - Organize posts by topics
- 📱 **Responsive** - Perfect on all devices
- ⚡ **Static Export** - Blazing fast performance
- 🎯 **SEO Optimized** - Built-in metadata support

## 🛠️ Tech Stack

- **Framework**: Next.js 16
- **UI Library**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Markdown**: react-markdown, gray-matter
- **Icons**: lucide-react
- **Theme**: next-themes

## 📦 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the blog.

## 📝 Adding New Posts

Create a new Markdown file in `content/posts/` with the following format:

```markdown
---
title: Your Post Title
description: Brief description
date: 2025-01-01
author: Your Name
tags:
  - Tag1
  - Tag2
---

Your content here...
```

## 📂 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── blog/              # Blog pages
│   ├── tags/              # Tag pages
│   ├── about/             # About page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── blog/             # Blog-specific components
│   └── ui/               # shadcn/ui components
├── content/              # Content directory
│   └── posts/           # Markdown blog posts
├── lib/                  # Utility functions
│   ├── blog/            # Blog utilities
│   └── types.ts         # TypeScript types
├── public/              # Static assets
│   └── images/         # Blog images
└── out/                 # Build output (for deployment)
```

## 🚀 Deployment

### GitHub Pages

1. Build the project:
```bash
npm run build
```

2. The `out/` directory contains the static export

3. GitHub Actions will automatically deploy to GitHub Pages

### Manual Deployment

```bash
# Build and export
npm run build

# Deploy the 'out' folder to your hosting service
```

## 🎨 Customization

### Update Personal Info

Edit these files to customize:
- `app/layout.tsx` - Site metadata
- `app/about/page.tsx` - About page content
- `components/blog/navbar.tsx` - Navigation bar
- `components/blog/footer.tsx` - Footer

### Theme Colors

Modify `app/globals.css` to change the color scheme.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 👤 Author

**Yousanflics**

- GitHub: [@yousanflics](https://github.com/yousanflics)
- Website: [https://yousanflics.github.io](https://yousanflics.github.io)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
