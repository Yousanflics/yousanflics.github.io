export interface Post {
  slug: string
  title: string
  date: string
  author: string
  description?: string
  tags: string[]
  content: string
  readingTime: string
  headerImage?: string
}

export interface PostMeta {
  slug: string
  title: string
  date: string
  author: string
  description?: string
  tags: string[]
  readingTime: string
  headerImage?: string
}

