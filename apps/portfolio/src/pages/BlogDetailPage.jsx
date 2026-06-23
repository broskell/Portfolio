import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBlogBySlug } from '../api'
import { FALLBACK_BLOGS } from '../data/blogsData'

const fjalla = { fontFamily: "'Fjalla One', sans-serif" }

// Inline formatting helper
function renderInlineText(text) {
  if (!text) return ''

  let parts = [{ type: 'text', content: text }]

  // 1. Math formulas: $$...$$
  parts = parts.flatMap((part) => {
    if (part.type !== 'text') return part
    const splitParts = part.content.split(/\$\$(.*?)\$\$/g)
    return splitParts.map((item, index) =>
      index % 2 === 1
        ? { type: 'math', content: item }
        : { type: 'text', content: item }
    )
  })

  // 2. Links: [text](url)
  parts = parts.flatMap((part) => {
    if (part.type !== 'text') return part
    const regex = /\[(.*?)\]\((.*?)\)/g
    const result = []
    let lastIndex = 0
    let match
    while ((match = regex.exec(part.content)) !== null) {
      if (match.index > lastIndex) {
        result.push({
          type: 'text',
          content: part.content.substring(lastIndex, match.index),
        })
      }
      result.push({ type: 'link', text: match[1], url: match[2] })
      lastIndex = regex.lastIndex
    }
    if (lastIndex < part.content.length) {
      result.push({ type: 'text', content: part.content.substring(lastIndex) })
    }
    return result.length > 0 ? result : part
  })

  // 3. Bold: **text**
  parts = parts.flatMap((part) => {
    if (part.type !== 'text') return part
    const splitParts = part.content.split(/\*\*(.*?)\*\*/g)
    return splitParts.map((item, index) =>
      index % 2 === 1
        ? { type: 'bold', content: item }
        : { type: 'text', content: item }
    )
  })

  // 4. Inline code: `code`
  parts = parts.flatMap((part) => {
    if (part.type !== 'text') return part
    const splitParts = part.content.split(/`(.*?)`/g)
    return splitParts.map((item, index) =>
      index % 2 === 1
        ? { type: 'code', content: item }
        : { type: 'text', content: item }
    )
  })

  return parts.map((part, i) => {
    if (part.type === 'bold') {
      return (
        <strong key={i} className="text-white font-bold">
          {part.content}
        </strong>
      )
    }
    if (part.type === 'code') {
      return (
        <code
          key={i}
          className="bg-neutral-900 border border-neutral-800 text-yellow-500 font-mono text-[11px] px-1.5 py-0.5 rounded"
        >
          {part.content}
        </code>
      )
    }
    if (part.type === 'math') {
      return (
        <span
          key={i}
          className="font-mono text-yellow-400 bg-neutral-950 px-2 py-1 rounded border border-neutral-900 text-xs inline-block my-1"
        >
          {part.content}
        </span>
      )
    }
    if (part.type === 'link') {
      return (
        <a
          key={i}
          href={part.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-400 underline hover:text-yellow-300 transition-colors"
        >
          {part.text}
        </a>
      )
    }
    return part.content
  })
}

// Markdown block parser and renderer
function renderMarkdown(content) {
  if (!content) return null

  const lines = content.split('\n')
  const blocks = []
  let currentBlock = null

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Code blocks
    if (line.trim().startsWith('```')) {
      if (currentBlock && currentBlock.type === 'code') {
        blocks.push(currentBlock)
        currentBlock = null
      } else {
        if (currentBlock) blocks.push(currentBlock)
        const lang = line.trim().slice(3)
        currentBlock = { type: 'code', lang, lines: [] }
      }
      continue
    }

    if (currentBlock && currentBlock.type === 'code') {
      currentBlock.lines.push(line)
      continue
    }

    // Headers
    if (line.startsWith('#')) {
      if (currentBlock) blocks.push(currentBlock)
      const match = line.match(/^(#+)\s+(.*)$/)
      if (match) {
        blocks.push({
          type: 'header',
          level: match[1].length,
          text: match[2],
        })
      }
      currentBlock = null
      continue
    }

    // Table rows
    if (line.trim().startsWith('|')) {
      if (currentBlock && currentBlock.type === 'table') {
        currentBlock.lines.push(line)
      } else {
        if (currentBlock) blocks.push(currentBlock)
        currentBlock = { type: 'table', lines: [line] }
      }
      continue
    }

    // List items
    if (
      line.trim().startsWith('* ') ||
      line.trim().startsWith('- ') ||
      /^\d+\.\s/.test(line.trim())
    ) {
      if (currentBlock && currentBlock.type === 'list') {
        currentBlock.lines.push(line)
      } else {
        if (currentBlock) blocks.push(currentBlock)
        currentBlock = { type: 'list', lines: [line] }
      }
      continue
    }

    // Captions/Figure subtitles
    if (
      line.trim().startsWith('*') &&
      line.trim().endsWith('*') &&
      line.trim().length > 2
    ) {
      if (currentBlock) blocks.push(currentBlock)
      blocks.push({ type: 'caption', text: line.trim().slice(1, -1) })
      currentBlock = null
      continue
    }

    // Empty separator line
    if (line.trim() === '') {
      if (currentBlock) {
        blocks.push(currentBlock)
        currentBlock = null
      }
      continue
    }

    // Standard paragraph
    if (currentBlock && currentBlock.type === 'paragraph') {
      currentBlock.lines.push(line)
    } else {
      if (currentBlock) blocks.push(currentBlock)
      currentBlock = { type: 'paragraph', lines: [line] }
    }
  }

  if (currentBlock) blocks.push(currentBlock)

  // Render HTML nodes from blocks
  return blocks.map((block, index) => {
    switch (block.type) {
      case 'header': {
        if (block.level === 1) {
          return (
            <h1
              key={index}
              className="text-white font-extrabold mt-8 mb-4 border-b border-neutral-900 pb-2"
              style={{ ...fjalla, fontSize: '2.5rem' }}
            >
              {renderInlineText(block.text)}
            </h1>
          )
        }
        if (block.level === 2) {
          return (
            <h2
              key={index}
              className="text-white mt-10 mb-5 border-b border-neutral-900/60 pb-3"
              style={{ ...fjalla, fontSize: '1.8rem' }}
            >
              {renderInlineText(block.text)}
            </h2>
          )
        }
        if (block.level === 3) {
          return (
            <h3
              key={index}
              className="text-yellow-400 mt-8 mb-4 font-bold flex items-center"
              style={{ ...fjalla, fontSize: '1.3rem' }}
            >
              {renderInlineText(block.text)}
            </h3>
          )
        }
        return (
          <h4
            key={index}
            className="text-neutral-200 mt-6 mb-3 font-semibold text-sm"
          >
            {renderInlineText(block.text)}
          </h4>
        )
      }
      case 'paragraph': {
        const joined = block.lines.join(' ')
        // Exclude drawing rules (horizontal lines) if there's any ---
        if (joined.trim() === '---') {
          return <hr key={index} className="border-neutral-900 my-8" />
        }
        return (
          <p
            key={index}
            className="text-neutral-400 leading-relaxed text-sm mb-6 whitespace-pre-line"
          >
            {renderInlineText(joined)}
          </p>
        )
      }
      case 'caption': {
        return (
          <p
            key={index}
            className="text-center font-mono text-[10px] text-neutral-500 uppercase tracking-widest italic -mt-4 mb-8"
          >
            {renderInlineText(block.text)}
          </p>
        )
      }
      case 'code': {
        return (
          <div
            key={index}
            className="my-8 border border-neutral-900 bg-neutral-950 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="bg-neutral-950 border-b border-neutral-900 px-4 py-2.5 flex items-center justify-between">
              <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                {block.lang || 'CLI/Code'}
              </span>
              <span className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
              </span>
            </div>
            <pre className="p-6 overflow-x-auto text-[11px] font-mono text-neutral-300 leading-relaxed">
              <code>{block.lines.join('\n')}</code>
            </pre>
          </div>
        )
      }
      case 'list': {
        const listItems = block.lines.map((line, idx) => {
          const cleanLine = line.trim().replace(/^[\*\-\d+\.]\s*/, '')
          return (
            <li
              key={idx}
              className="mb-2 leading-relaxed text-neutral-400 text-sm"
            >
              {renderInlineText(cleanLine)}
            </li>
          )
        })
        const isOrdered = /^\d+\./.test(block.lines[0].trim())
        if (isOrdered) {
          return (
            <ol
              key={index}
              className="list-decimal pl-6 mb-6 text-neutral-400 text-sm"
            >
              {listItems}
            </ol>
          )
        } else {
          return (
            <ul
              key={index}
              className="list-disc pl-6 mb-6 text-neutral-400 text-sm"
            >
              {listItems}
            </ul>
          )
        }
      }
      case 'table': {
        const rows = block.lines
          .map((line) =>
            line
              .trim()
              .split('|')
              .map((cell) => cell.trim())
              .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
          )
          .filter((cells) => cells.length > 0)

        const headerRow = rows[0]
        const bodyRows = rows.slice(1).filter((cells) => !cells[0].includes('---'))

        return (
          <div
            key={index}
            className="overflow-x-auto my-8 border border-neutral-900 rounded-2xl bg-neutral-950/80"
          >
            <table className="w-full text-sm border-collapse text-left">
              <thead>
                <tr className="border-b border-neutral-800">
                  {headerRow.map((cell, idx) => (
                    <th
                      key={idx}
                      className="font-mono text-xs font-bold text-yellow-600 uppercase px-6 py-4"
                    >
                      {renderInlineText(cell)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, rowIdx) => (
                  <tr
                    key={rowIdx}
                    className="border-b border-neutral-900/50 hover:bg-neutral-900/30 transition-colors"
                  >
                    {row.map((cell, cellIdx) => (
                      <td
                        key={cellIdx}
                        className="px-6 py-4 text-neutral-400 font-mono text-xs leading-relaxed"
                      >
                        {renderInlineText(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }
      default:
        return null
    }
  })
}

export default function BlogDetailPage() {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadBlog() {
      try {
        const response = await getBlogBySlug(slug)
        const data = response.data?.data || response.data
        if (data && data.title) {
          setBlog(data)
        } else {
          // Find in fallback
          const fallback = FALLBACK_BLOGS.find((b) => b.slug === slug)
          setBlog(fallback || null)
        }
      } catch (err) {
        console.warn('API error, locating blog from fallbacks:', err)
        const fallback = FALLBACK_BLOGS.find((b) => b.slug === slug)
        setBlog(fallback || null)
      } finally {
        setLoading(false)
      }
    }
    loadBlog()
  }, [slug])

  if (loading) {
    return (
      <div className="py-32 text-center text-neutral-500 font-mono text-sm">
        Loading article reader...
      </div>
    )
  }

  if (!blog) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-32 text-center">
        <p className="font-mono text-[10px] tracking-[0.25em] text-red-500 uppercase mb-2">
          404 Error
        </p>
        <h2 className="text-white mb-6" style={fjalla}>
          Article Not Found
        </h2>
        <p className="text-neutral-500 text-sm leading-relaxed mb-8">
          The article you are looking for might have been renamed, deleted, or is temporarily unavailable.
        </p>
        <Link
          to="/blog"
          className="font-bold text-yellow-500 text-sm hover:underline font-mono"
        >
          ← Back to Blog
        </Link>
      </main>
    )
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-14 pt-[4.5rem] pb-24">
      {/* Back Button */}
      <div className="anim d1 mb-8">
        <Link
          to="/blog"
          className="font-bold text-yellow-500/80 hover:text-yellow-400 text-xs flex items-center gap-1.5 w-fit"
        >
          <span>←</span> Back to Articles
        </Link>
      </div>

      {/* Hero Info */}
      <header className="anim d1 mb-12 border-b border-neutral-900 pb-10">
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-[10px] text-neutral-500">
            PUBLISHED ·{' '}
            {new Date(blog.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <span className="font-mono text-[10px] text-yellow-500/80 bg-yellow-400/5 border border-yellow-950 px-2 py-0.5 rounded">
            {blog.readTime || 1} MIN READ
          </span>
        </div>

        <h1
          className="text-white mb-6 leading-tight"
          style={{ ...fjalla, fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}
        >
          {blog.title}
        </h1>

        <p className="text-neutral-500 text-sm leading-relaxed mb-6 font-mono border-l-2 border-yellow-500/60 pl-4">
          {blog.excerpt}
        </p>

        <div className="flex flex-wrap gap-2">
          {blog.tags?.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] bg-neutral-900 border border-neutral-800 text-neutral-400 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Main Body */}
      <div className="anim d2 text-neutral-300 font-sans">
        {renderMarkdown(blog.content)}
      </div>

      {/* Share / Footer */}
      <footer className="anim d3 border-t border-neutral-900 mt-16 pt-8 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-neutral-500">
            Share this review:
          </span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              alert('Article link copied to clipboard!')
            }}
            className="font-mono text-[10px] bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white px-3 py-1.5 rounded transition-all cursor-pointer"
          >
            Copy Link
          </button>
        </div>
        <Link
          to="/blog"
          className="font-bold text-yellow-500 text-xs hover:underline flex items-center gap-1.5"
        >
          View other articles <span>→</span>
        </Link>
      </footer>
    </article>
  )
}
