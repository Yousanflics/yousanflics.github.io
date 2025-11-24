import { getAllPosts } from '@/lib/blog/posts'
import { PostCard } from '@/components/blog/post-card'

export const metadata = {
  title: 'Work - Yousanflics',
  description: 'Technical articles and learning notes',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="container py-20">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          My <span className="text-muted-foreground">Articles</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Recording technical learning and development experience, sharing knowledge and insights
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No articles yet</p>
        </div>
      )}
    </div>
  )
}

