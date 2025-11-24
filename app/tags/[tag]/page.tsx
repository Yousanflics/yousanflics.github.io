import { notFound } from 'next/navigation'
import { getAllTags, getPostsByTag } from '@/lib/blog/posts'
import { PostCard } from '@/components/blog/post-card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface TagPageProps {
  params: Promise<{
    tag: string
  }>
}

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    tag: tag,
  }))
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params
  
  return {
    title: `${tag} - Tags - Yousanflics`,
    description: `Articles tagged with ${tag}`,
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const posts = getPostsByTag(tag)

  if (posts.length === 0) {
    notFound()
  }

  return (
    <div className="container py-10">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/tags">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tags
        </Link>
      </Button>

      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Tag: {tag}
        </h1>
        <p className="text-xl text-muted-foreground">
          {posts.length} {posts.length === 1 ? 'article' : 'articles'}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}

