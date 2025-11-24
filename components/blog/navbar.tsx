'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Work', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/tags' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center">
        <div className="mr-auto flex">
          <Link href="/" className="group flex items-center space-x-2">
            <div className="relative">
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105" style={{ fontFamily: 'Georgia, serif' }}>
                Young
              </span>
              <span className="ml-1 text-xl font-light text-muted-foreground transition-all duration-300 group-hover:text-accent" style={{ fontFamily: 'Georgia, serif' }}>
                Studio
              </span>
              <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-accent to-transparent transition-all duration-300 group-hover:w-full"></div>
            </div>
          </Link>
        </div>
        <div className="flex items-center space-x-8">
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-foreground ${
                  pathname === item.href
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/yousanflics"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <ThemeToggle />
            <Button 
              className="ml-2 bg-accent hover:bg-accent/90 text-accent-foreground hidden md:inline-flex"
              asChild
            >
              <Link href="https://github.com/yousanflics">Contact Me</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

