import Link from 'next/link'
import { format } from 'date-fns'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight } from 'lucide-react'
import { PostMeta } from '@/lib/types'

interface PostCardProps {
  post: PostMeta
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <Card className="h-full transition-all hover:border-accent overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <CardHeader className="relative">
          <div className="flex items-start justify-between mb-3">
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 2).map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary"
                  className="bg-accent/20 dark:bg-accent/30 text-foreground dark:text-foreground border-accent/30 dark:border-accent/40"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="rounded-full p-2 bg-accent/10 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
          
          <h3 className="text-xl font-bold line-clamp-2 group-hover:text-accent transition-colors">
            {post.title}
          </h3>
        </CardHeader>
        
        <CardContent className="relative">
          <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
            {post.description}
          </p>
        </CardContent>
        
        <CardFooter className="relative">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="uppercase tracking-wider">
              {format(new Date(post.date), 'MMM dd, yyyy')}
            </span>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

