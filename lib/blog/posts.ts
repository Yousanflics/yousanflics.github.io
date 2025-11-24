import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { Post, PostMeta } from '@/lib/types'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export function getAllPosts(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const stats = readingTime(content)

      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        author: data.author || 'Yousanflics',
        description: data.description || data.subtitle || '',
        tags: data.tags || [],
        readingTime: stats.text,
        headerImage: data.headerImage,
      } as PostMeta
    })

  return allPostsData.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1
    } else {
      return -1
    }
  })
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const stats = readingTime(content)

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    author: data.author || 'Yousanflics',
    description: data.description || data.subtitle || '',
    tags: data.tags || [],
    content,
    readingTime: stats.text,
    headerImage: data.headerImage,
  }
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = new Set<string>()
  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort()
}

export function getPostsByTag(tag: string): PostMeta[] {
  const posts = getAllPosts()
  return posts.filter((post) => post.tags.includes(tag))
}

