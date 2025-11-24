import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Github, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'About - Yousanflics',
  description: 'Full-stack engineer driven by curiosity, specializing in iOS, backend systems, and elegant interface design',
}

export default function AboutPage() {
  return (
    <div className="container py-20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            About <span className="text-muted-foreground">Me</span>
          </h1>
          <p className="text-xl text-muted-foreground italic mb-6 border-l-4 border-accent pl-6 py-2">
            "Rome wasn't built in a day, neither is mastery"
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Introduction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg leading-relaxed">
              I'm a full-stack engineer driven by curiosity for how things actually work. I've worked across backend systems, infrastructure, and front-end frameworks in big-tech environments, but Swift and SwiftUI remain where I feel most at home. I love turning complex technical ideas into simple, elegant interfaces that feel effortless to use.
            </p>
            <Separator className="my-6" />
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">iOS Development</Badge>
              <Badge variant="secondary">Swift</Badge>
              <Badge variant="secondary">SwiftUI</Badge>
              <Badge variant="secondary">UIKit</Badge>
              <Badge variant="secondary">Objective-C</Badge>
              <Badge variant="secondary">Full-Stack Engineering</Badge>
              <Badge variant="secondary">Backend Systems</Badge>
              <Badge variant="secondary">Infrastructure</Badge>
              <Badge variant="secondary">System Design</Badge>
              <Badge variant="secondary">Algorithms</Badge>
              <Badge variant="secondary">Data Structures</Badge>
              <Badge variant="secondary">Performance Optimization</Badge>
              <Badge variant="secondary">API Design</Badge>
              <Badge variant="secondary">Clean Architecture</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>About This Blog</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="leading-relaxed">
              This blog is built with <strong>Next.js 16</strong> and <strong>shadcn/ui</strong>,
              featuring modern design principles, dark mode support, and a smooth reading experience.
            </p>
            <p className="leading-relaxed">
              Here, I share articles about full-stack development, iOS engineering, system architecture, algorithms, and technical insights,
              documenting my journey of building elegant solutions across the entire tech stack.
            </p>
            <p className="leading-relaxed italic text-muted-foreground">
              "Since I've chosen the path ahead, I'll march on through wind and rain"
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Github className="h-5 w-5 text-muted-foreground" />
                <a
                  href="https://github.com/yousanflics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-1"
                >
                  github.com/yousanflics
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Feel free to reach out via GitHub for technical discussions
          </p>
          <Button asChild>
            <Link href="/blog">View My Articles</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

