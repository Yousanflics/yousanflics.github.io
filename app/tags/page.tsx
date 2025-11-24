import Link from 'next/link'
import { getAllTags, getAllPosts } from '@/lib/blog/posts'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { ArrowUpRight } from 'lucide-react'

export const metadata = {
  title: 'Tags - Yousanflics',
  description: 'Browse articles by tags',
}

export default function TagsPage() {
  const tags = getAllTags()
  const posts = getAllPosts()

  const tagCounts = tags.map((tag) => ({
    name: tag,
    count: posts.filter((post) => post.tags.includes(tag)).length,
  }))

  return (
    <div className="container py-20">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Browse by <span className="text-muted-foreground">Tags</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Explore articles by topic and category
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tagCounts.map((tag) => (
          <Link key={tag.name} href={`/tags/${tag.name}`} className="group">
            <Card className="p-6 transition-all hover:border-accent relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold group-hover:text-accent transition-colors">
                  {tag.name}
                </h3>
                <div className="rounded-full p-2 bg-accent/10 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
              
              <div className="relative flex items-center gap-2">
                <Badge 
                  variant="secondary"
                  className="bg-accent/10 text-accent-foreground border-accent/20"
                >
                  {tag.count}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {tag.count === 1 ? 'article' : 'articles'}
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {tags.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No tags yet</p>
        </div>
      )}
    </div>
  )
}

