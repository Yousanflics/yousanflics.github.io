'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'

interface MarkdownProps {
  content: string
}

export function Markdown({ content }: MarkdownProps) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
        h1: ({ children }) => (
          <h1 className="text-4xl font-bold mt-8 mb-4 scroll-mt-20" id={String(children).toLowerCase().replace(/\s+/g, '-')}>
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-3xl font-bold mt-8 mb-4 scroll-mt-20" id={String(children).toLowerCase().replace(/\s+/g, '-')}>
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-2xl font-bold mt-6 mb-3 scroll-mt-20" id={String(children).toLowerCase().replace(/\s+/g, '-')}>
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-xl font-bold mt-6 mb-2 scroll-mt-20" id={String(children).toLowerCase().replace(/\s+/g, '-')}>
            {children}
          </h4>
        ),
        p: ({ children }) => <p className="my-4 leading-7">{children}</p>,
        ul: ({ children }) => <ul className="my-4 ml-6 list-disc">{children}</ul>,
        ol: ({ children }) => <ol className="my-4 ml-6 list-decimal">{children}</ol>,
        li: ({ children }) => <li className="my-2">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground">
            {children}
          </blockquote>
        ),
        code: ({ className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '')
          const isInline = !match
          
          if (isInline) {
            return (
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            )
          }
          
          return (
            <code className={`${className} block bg-muted p-4 rounded-lg overflow-x-auto my-4`} {...props}>
              {children}
            </code>
          )
        },
        pre: ({ children }) => (
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-4">
            {children}
          </pre>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-primary hover:underline font-medium"
            target={href?.startsWith('http') ? '_blank' : undefined}
            rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {children}
          </a>
        ),
        img: ({ src, alt }) => (
          <img src={src} alt={alt} className="rounded-lg my-4 w-full" />
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto my-4">
            <table className="w-full border-collapse border border-border">
              {children}
            </table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-border bg-muted px-4 py-2 text-left font-semibold">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-border px-4 py-2">{children}</td>
        ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

