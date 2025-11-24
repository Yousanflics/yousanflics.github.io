import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getAllPosts, getAllTags } from '@/lib/blog/posts'
import { PostCard } from '@/components/blog/post-card'
import { ArrowRight, Code, Terminal, Smartphone } from 'lucide-react'

export default function Home() {
  const posts = getAllPosts().slice(0, 4)
  const allPosts = getAllPosts()
  const tags = getAllTags()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container flex flex-col items-start justify-center py-20 md:py-32 lg:py-40">
        <Badge 
          variant="secondary" 
          className="mb-8 bg-accent/10 dark:text-foreground text-accent-foreground border-accent/20 hover:bg-accent/20"
        >
          ✨ AVAILABLE FOR COLLABORATION
        </Badge>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-4xl">
          Young is an experienced{' '}
          <span className="text-muted-foreground">
            full-stack engineer who builds elegant solutions from backend to interface.
          </span>
        </h1>
        
        <div className="flex flex-wrap gap-4 mt-8">
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold" 
            asChild
          >
            <Link href="/blog">
              View Blog
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/about">About Me</Link>
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-8 md:gap-16 mt-20 pt-20 border-t w-full max-w-3xl">
          <div>
            <div className="text-4xl md:text-5xl font-bold mb-2">{allPosts.length}+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">
              Articles Published
            </div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold mb-2">{tags.length}+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">
              Tech Tags
            </div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold mb-2">100<span className="text-accent">%</span></div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">
              Tech Passion
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="container py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          My Skills <span className="text-muted-foreground">& Expertise</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6">
              iOS DEVELOPMENT
            </h3>
            <ul className="space-y-3 text-lg">
              <li>Swift & Objective-C</li>
              <li>UIKit & SwiftUI</li>
              <li>Runtime Mechanism</li>
              <li>Performance Optimization</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6">
              ALGORITHMS
            </h3>
            <ul className="space-y-3 text-lg">
              <li>Data Structures</li>
              <li>Algorithm Design</li>
              <li>System Design</li>
              <li>Performance Analysis</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6">
              ARCHITECTURE
            </h3>
            <ul className="space-y-3 text-lg">
              <li>Design Patterns</li>
              <li>Architecture Design</li>
              <li>Code Refactoring</li>
              <li>Best Practices</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="container py-20">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            My Featured <span className="text-muted-foreground">Articles</span>
          </h2>
          <Button 
            variant="outline" 
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            asChild
          >
            <Link href="/blog">
              View All Works
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="container py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-muted-foreground">Cutting-Edge</span> Technologies
        </h2>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          Leveraging the latest tech stack and tools to create high-performance, maintainable applications
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="p-6 rounded-xl border bg-card hover:border-accent transition-colors">
            <Smartphone className="h-8 w-8 mb-3 text-accent" />
            <h3 className="font-semibold mb-1">iOS</h3>
            <p className="text-sm text-muted-foreground">Mobile Development</p>
          </div>
          
          <div className="p-6 rounded-xl border bg-card hover:border-accent transition-colors">
            <Code className="h-8 w-8 mb-3 text-accent" />
            <h3 className="font-semibold mb-1">Swift</h3>
            <p className="text-sm text-muted-foreground">Programming Language</p>
          </div>
          
          <div className="p-6 rounded-xl border bg-card hover:border-accent transition-colors">
            <Code className="h-8 w-8 mb-3 text-accent" />
            <h3 className="font-semibold mb-1">SwiftUI</h3>
            <p className="text-sm text-muted-foreground">UI Framework</p>
          </div>
          
          <div className="p-6 rounded-xl border bg-card hover:border-accent transition-colors">
            <Terminal className="h-8 w-8 mb-3 text-accent" />
            <h3 className="font-semibold mb-1">Node.js</h3>
            <p className="text-sm text-muted-foreground">Backend Runtime</p>
          </div>
          
          <div className="p-6 rounded-xl border bg-card hover:border-accent transition-colors">
            <Code className="h-8 w-8 mb-3 text-accent" />
            <h3 className="font-semibold mb-1">Python</h3>
            <p className="text-sm text-muted-foreground">Backend & Scripts</p>
          </div>
          
          <div className="p-6 rounded-xl border bg-card hover:border-accent transition-colors">
            <Code className="h-8 w-8 mb-3 text-accent" />
            <h3 className="font-semibold mb-1">TypeScript</h3>
            <p className="text-sm text-muted-foreground">Frontend & Backend</p>
          </div>
          
          <div className="p-6 rounded-xl border bg-card hover:border-accent transition-colors">
            <Terminal className="h-8 w-8 mb-3 text-accent" />
            <h3 className="font-semibold mb-1">Docker</h3>
            <p className="text-sm text-muted-foreground">Containerization</p>
          </div>
          
          <div className="p-6 rounded-xl border bg-card hover:border-accent transition-colors">
            <Code className="h-8 w-8 mb-3 text-accent" />
            <h3 className="font-semibold mb-1">Kubernetes</h3>
            <p className="text-sm text-muted-foreground">Orchestration</p>
          </div>
          
          <div className="p-6 rounded-xl border bg-card hover:border-accent transition-colors">
            <Terminal className="h-8 w-8 mb-3 text-accent" />
            <h3 className="font-semibold mb-1">PostgreSQL</h3>
            <p className="text-sm text-muted-foreground">Database</p>
          </div>
          
          <div className="p-6 rounded-xl border bg-card hover:border-accent transition-colors">
            <Code className="h-8 w-8 mb-3 text-accent" />
            <h3 className="font-semibold mb-1">Redis</h3>
            <p className="text-sm text-muted-foreground">Caching</p>
          </div>
          
          <div className="p-6 rounded-xl border bg-card hover:border-accent transition-colors">
            <Terminal className="h-8 w-8 mb-3 text-accent" />
            <h3 className="font-semibold mb-1">AWS</h3>
            <p className="text-sm text-muted-foreground">Cloud Infrastructure</p>
          </div>
          
          <div className="p-6 rounded-xl border bg-card hover:border-accent transition-colors">
            <Code className="h-8 w-8 mb-3 text-accent" />
            <h3 className="font-semibold mb-1">Git</h3>
            <p className="text-sm text-muted-foreground">Version Control</p>
          </div>
        </div>
      </section>
    </div>
  )
}
