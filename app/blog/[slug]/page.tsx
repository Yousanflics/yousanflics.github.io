import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { getAllPosts, getPostBySlug } from '@/lib/blog/posts'
import { Markdown } from '@/components/blog/markdown'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  
  if (!post) {
    return {}
  }

  return {
    title: `${post.title} - Yousanflics`,
    description: post.description,
    keywords: post.tags,
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  let post

  try {
    post = getPostBySlug(slug)
  } catch (error) {
    notFound()
  }

  return (
    <article className="container py-20">
      <Button 
        variant="ghost" 
        asChild 
        className="mb-12 hover:text-accent"
      >
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Articles
        </Link>
      </Button>

      <header className="mb-12 max-w-4xl">
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <Link key={tag} href={`/tags/${tag}`}>
              <Badge 
                variant="secondary" 
                className="bg-accent/10 text-accent-foreground border-accent/20 hover:bg-accent hover:text-accent-foreground"
              >
                {tag}
              </Badge>
            </Link>
          ))}
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          {post.title}
        </h1>
        
        {post.description && (
          <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
            {post.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-l-2 border-accent pl-4">
          <div className="flex items-center gap-2">
            <span className="font-medium">{post.author}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.date}>
              {format(new Date(post.date), 'MMM dd, yyyy')}
            </time>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{post.readingTime}</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl">
        <Markdown content={post.content} />
      </div>
    </article>
  )
}

