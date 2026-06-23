import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getBlogs } from '../api'
import { FALLBACK_BLOGS } from '../data/blogsData'

const fjalla = { fontFamily: "'Fjalla One', sans-serif" }

export default function BlogListPage() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState('')

  useEffect(() => {
    async function loadBlogs() {
      try {
        const response = await getBlogs()
        const data = response.data?.data || response.data || []
        if (Array.isArray(data) && data.length > 0) {
          setBlogs(data)
        } else {
          setBlogs(FALLBACK_BLOGS)
        }
      } catch (err) {
        console.warn('API error, falling back to static blogs data:', err)
        setBlogs(FALLBACK_BLOGS)
      } finally {
        setLoading(false)
      }
    }
    loadBlogs()
  }, [])

  // Extract all unique tags
  const allTags = Array.from(
    new Set(blogs.flatMap((blog) => blog.tags || []))
  )

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title?.toLowerCase().includes(search.toLowerCase()) ||
      blog.excerpt?.toLowerCase().includes(search.toLowerCase()) ||
      blog.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    
    const matchesTag = selectedTag ? blog.tags?.includes(selectedTag) : true

    return matchesSearch && matchesTag
  })

  return (
    <main className="max-w-5xl mx-auto px-6 py-14 pt-[4.5rem] pb-24">
      <p className="anim d1 font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase mb-2">Thoughts &amp; Insights</p>
      <h1 className="anim d1 mb-4 text-white" style={{ ...fjalla, fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
        My <span className="text-yellow-400">Blog</span>
      </h1>
      <p className="anim d2 text-neutral-500 text-sm max-w-lg leading-relaxed mb-12">
        Reviews, deep dives, benchmarks, and guides exploring advanced software engineering, systems design, and AI tooling.
      </p>

      {/* Controls: Search & Tags */}
      <div className="anim d2 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-neutral-950 border border-neutral-900 text-sm text-neutral-200 placeholder-neutral-600 rounded-xl px-4 py-2.5 outline-none focus:border-yellow-500/50 transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-neutral-300 text-xs bg-transparent border-none cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-start md:justify-end w-full md:w-auto">
            <button
              onClick={() => setSelectedTag('')}
              className={`font-mono text-xs px-3 py-1.5 rounded-full transition-all border ${
                !selectedTag
                  ? 'bg-yellow-400/10 text-yellow-400 border-yellow-700/50'
                  : 'bg-neutral-950 text-neutral-400 border-neutral-900 hover:border-neutral-700'
              }`}
            >
              All Tags
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? '' : tag)}
                className={`font-mono text-xs px-3 py-1.5 rounded-full transition-all border ${
                  tag === selectedTag
                    ? 'bg-yellow-400/10 text-yellow-400 border-yellow-700/50'
                    : 'bg-neutral-950 text-neutral-400 border-neutral-900 hover:border-neutral-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {loading ? (
        <div className="py-20 text-center text-neutral-500 font-mono text-sm">
          Loading articles...
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="py-20 text-center text-neutral-500 font-mono text-sm border border-dashed border-neutral-900 rounded-2xl">
          No articles match your search or filter criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBlogs.map((blog) => (
            <article
              key={blog._id}
              className="proj-card anim d3 bg-neutral-950 rounded-2xl overflow-hidden border border-neutral-900 hover:border-yellow-500/35 hover:-translate-y-1.5 transition-all duration-300 flex flex-col p-6 h-full"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] text-neutral-500">
                  {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
                <span className="font-mono text-[10px] text-yellow-500/80 bg-yellow-400/5 border border-yellow-950 px-2 py-0.5 rounded">
                  {blog.readTime || 1} MIN READ
                </span>
              </div>
              <h3 className="font-bold text-white text-lg mb-2 line-clamp-2 hover:text-yellow-400 transition-colors">
                <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
              </h3>
              <p className="text-neutral-500 text-xs leading-relaxed mb-6 flex-1 line-clamp-3">
                {blog.excerpt}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {blog.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] bg-neutral-900 border border-neutral-800 text-neutral-400 px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                to={`/blog/${blog.slug}`}
                className="font-bold text-yellow-500 text-xs hover:underline flex items-center gap-1 mt-auto w-fit"
              >
                Read Article <span className="text-[10px]">→</span>
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
