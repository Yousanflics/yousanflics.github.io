import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/blog/navbar'
import { Footer } from '@/components/blog/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Young Studio – Personal Blog & Projects',
  description: 'Full-stack engineer sharing insights on iOS, backend systems, and software architecture',
  keywords: ['Yousanflics', 'Full-Stack', 'iOS', 'Swift', 'Backend', 'Developer', 'Blog', 'Tech', 'Programming', 'Software Architecture'],
  authors: [{ name: 'Yousanflics' }],
  creator: 'Yousanflics',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yousanflics.github.io',
    title: 'Young Studio – Personal Blog & Projects',
    description: 'Full-stack engineer sharing insights on iOS, backend systems, and software architecture',
    siteName: 'Young Studio',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col bg-background">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
