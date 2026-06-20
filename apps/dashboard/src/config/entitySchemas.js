import React from 'react'

export const entitySchemas = {
  projects: {
    label: 'Project',
    endpoint: '/projects',
    searchFields: ['title', 'description', 'shortDescription'],
    columns: [
      { key: 'title', label: 'Title', sortable: true },
      { key: 'category', label: 'Category', sortable: true },
      { key: 'featured', label: 'Featured', render: (val) => (val ? 'Yes' : 'No') },
      { key: 'displayOrder', label: 'Order', sortable: true }
    ],
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text', required: true, placeholder: 'e.g. voice-ai-assistant' },
      { name: 'category', label: 'Category', type: 'select', required: true, options: [
        { label: 'Web Development', value: 'web' },
        { label: 'AI / Machine Learning', value: 'ai' },
        { label: 'Mobile Apps', value: 'mobile' },
        { label: 'Data Science', value: 'data' },
        { label: 'UI/UX Design', value: 'design' },
        { label: 'Cybersecurity', value: 'security' },
        { label: 'Other', value: 'other' }
      ]},
      { name: 'shortDescription', label: 'Short Description', type: 'textarea', required: true },
      { name: 'description', label: 'Detailed Description (Markdown)', type: 'markdown', required: true },
      { name: 'techStack', label: 'Tech Stack (Array)', type: 'tags' },
      { name: 'tags', label: 'Tags', type: 'tags' },
      { name: 'githubUrl', label: 'GitHub URL', type: 'text' },
      { name: 'liveUrl', label: 'Live URL', type: 'text' },
      { name: 'coverImage', label: 'Cover Image', type: 'image', uploadType: 'project' },
      { name: 'displayOrder', label: 'Display Order', type: 'number' },
      { name: 'startDate', label: 'Start Date', type: 'date' },
      { name: 'endDate', label: 'End Date', type: 'date' },
      { name: 'featured', label: 'Pin to Highlight Showcase', type: 'checkbox' },
      { name: 'status', label: 'Status', type: 'select', options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' }
      ]}
    ]
  },
  skills: {
    label: 'Skill',
    endpoint: '/skills',
    searchFields: ['name', 'category'],
    columns: [
      { key: 'name', label: 'Skill Name', sortable: true },
      { key: 'category', label: 'Category', sortable: true },
      { key: 'proficiency', label: 'Proficiency', render: (val) => `${val}%`, sortable: true },
      { key: 'displayOrder', label: 'Order', sortable: true }
    ],
    fields: [
      { name: 'name', label: 'Skill Name', type: 'text', required: true },
      { name: 'category', label: 'Category', type: 'select', required: true, options: [
        { label: 'Frontend', value: 'Frontend' },
        { label: 'Backend', value: 'Backend' },
        { label: 'Tools', value: 'Tools' },
        { label: 'Languages', value: 'Languages' }
      ]},
      { name: 'proficiency', label: 'Proficiency (%)', type: 'number', required: true },
      { name: 'icon', label: 'Icon (Lucide tag / Class)', type: 'text' },
      { name: 'tags', label: 'Tags', type: 'tags' },
      { name: 'displayOrder', label: 'Display Order', type: 'number' },
      { name: 'status', label: 'Status', type: 'select', options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' }
      ]}
    ]
  },
  certificates: {
    label: 'Certificate',
    endpoint: '/certificates',
    searchFields: ['title', 'issuer'],
    columns: [
      { key: 'title', label: 'Certificate Title', sortable: true },
      { key: 'issuer', label: 'Issuer', sortable: true },
      { key: 'issueDate', label: 'Issue Date', render: (val) => val ? new Date(val).toLocaleDateString() : '', sortable: true }
    ],
    fields: [
      { name: 'title', label: 'Certificate Title', type: 'text', required: true },
      { name: 'issuer', label: 'Issuer Name', type: 'text', required: true },
      { name: 'issueDate', label: 'Issue Date', type: 'date', required: true },
      { name: 'credentialId', label: 'Credential ID', type: 'text' },
      { name: 'credentialUrl', label: 'Verification Link (URL)', type: 'text' },
      { name: 'image', label: 'Certificate Image / Badge', type: 'image', uploadType: 'certificate' },
      { name: 'tags', label: 'Tags', type: 'tags' },
      { name: 'displayOrder', label: 'Display Order', type: 'number' },
      { name: 'featured', label: 'Featured Pin', type: 'checkbox' },
      { name: 'status', label: 'Status', type: 'select', options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' }
      ]}
    ]
  },
  experience: {
    label: 'Work Experience',
    endpoint: '/experience',
    searchFields: ['company', 'role', 'description'],
    columns: [
      { key: 'company', label: 'Company', sortable: true },
      { key: 'role', label: 'Role/Position', sortable: true },
      { key: 'startDate', label: 'Start Date', render: (val) => val ? new Date(val).toLocaleDateString() : '', sortable: true },
      { key: 'currentlyWorking', label: 'Current', render: (val) => (val ? 'Yes' : 'No') }
    ],
    fields: [
      { name: 'company', label: 'Company/Organization Name', type: 'text', required: true },
      { name: 'role', label: 'Role / Position', type: 'text', required: true },
      { name: 'location', label: 'Job Location (e.g. Remote, Bangalore)', type: 'text' },
      { name: 'description', label: 'Job Description', type: 'textarea', required: true },
      { name: 'techStack', label: 'Technologies Used', type: 'tags' },
      { name: 'startDate', label: 'Start Date', type: 'date', required: true },
      { name: 'endDate', label: 'End Date', type: 'date' },
      { name: 'currentlyWorking', label: 'Currently Employed Here', type: 'checkbox' },
      { name: 'companyLogo', label: 'Company Logo', type: 'image', uploadType: 'profile' },
      { name: 'displayOrder', label: 'Display Order', type: 'number' },
      { name: 'status', label: 'Status', type: 'select', options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' }
      ]}
    ]
  },
  blogs: {
    label: 'Blog Post',
    endpoint: '/blogs',
    searchFields: ['title', 'content', 'excerpt'],
    columns: [
      { key: 'title', label: 'Blog Title', sortable: true },
      { key: 'readTime', label: 'Read Time', render: (val) => `${val} min`, sortable: true },
      { key: 'featured', label: 'Featured', render: (val) => (val ? 'Yes' : 'No') }
    ],
    fields: [
      { name: 'title', label: 'Blog Title', type: 'text', required: true },
      { name: 'slug', label: 'URL Slug', type: 'text', required: true },
      { name: 'excerpt', label: 'Excerpt (Short Summary)', type: 'textarea', required: true },
      { name: 'content', label: 'Blog Body (Markdown)', type: 'markdown', required: true },
      { name: 'coverImage', label: 'Cover Image', type: 'image', uploadType: 'blog' },
      { name: 'tags', label: 'Tags', type: 'tags' },
      { name: 'readTime', label: 'Read Time (Minutes)', type: 'number' },
      { name: 'publishedAt', label: 'Publication Date', type: 'date' },
      { name: 'featured', label: 'Pin to Showcase', type: 'checkbox' },
      { name: 'status', label: 'Status', type: 'select', options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' }
      ]}
    ]
  },
  timeline: {
    label: 'Timeline Milestone',
    endpoint: '/timeline',
    searchFields: ['title', 'description', 'type'],
    columns: [
      { key: 'title', label: 'Milestone Title', sortable: true },
      { key: 'year', label: 'Year', sortable: true },
      { key: 'type', label: 'Type', sortable: true }
    ],
    fields: [
      { name: 'title', label: 'Milestone Title', type: 'text', required: true },
      { name: 'description', label: 'Milestone Description', type: 'textarea', required: true },
      { name: 'year', label: 'Milestone Year (YYYY)', type: 'number', required: true },
      { name: 'date', label: 'Milestone Date', type: 'date', required: true },
      { name: 'type', label: 'Milestone Type', type: 'select', required: true, options: [
        { label: 'Education', value: 'education' },
        { label: 'Project', value: 'project' },
        { label: 'Award', value: 'award' },
        { label: 'Professional Experience', value: 'experience' },
        { label: 'Personal Milestone', value: 'personal' }
      ]},
      { name: 'icon', label: 'Icon Code', type: 'text' },
      { name: 'displayOrder', label: 'Display Order', type: 'number' },
      { name: 'status', label: 'Status', type: 'select', options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' }
      ]}
    ]
  },
  achievements: {
    label: 'Achievement',
    endpoint: '/achievements',
    searchFields: ['title', 'description', 'issuer'],
    columns: [
      { key: 'title', label: 'Achievement Title', sortable: true },
      { key: 'issuer', label: 'Issuer', sortable: true },
      { key: 'date', label: 'Date Attained', render: (val) => val ? new Date(val).toLocaleDateString() : '', sortable: true }
    ],
    fields: [
      { name: 'title', label: 'Achievement Title', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'issuer', label: 'Issuer Organization', type: 'text' },
      { name: 'date', label: 'Date Attained', type: 'date', required: true },
      { name: 'image', label: 'Image / Badge / Certificate', type: 'image', uploadType: 'certificate' },
      { name: 'featured', label: 'Pin to Highlights', type: 'checkbox' },
      { name: 'displayOrder', label: 'Display Order', type: 'number' },
      { name: 'status', label: 'Status', type: 'select', options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' }
      ]}
    ]
  },
  testimonials: {
    label: 'Testimonial',
    endpoint: '/testimonials',
    searchFields: ['name', 'role', 'company', 'message'],
    columns: [
      { key: 'name', label: 'Provider Name', sortable: true },
      { key: 'company', label: 'Company', sortable: true },
      { key: 'rating', label: 'Rating', render: (val) => val ? `${val} / 5` : '-', sortable: true }
    ],
    fields: [
      { name: 'name', label: 'Provider Name', type: 'text', required: true },
      { name: 'role', label: 'Role/Title', type: 'text' },
      { name: 'company', label: 'Company Name', type: 'text' },
      { name: 'message', label: 'Feedback Message', type: 'textarea', required: true },
      { name: 'avatar', label: 'Avatar / Photo', type: 'image', uploadType: 'testimonial' },
      { name: 'rating', label: 'Rating (1 to 5)', type: 'number' },
      { name: 'displayOrder', label: 'Display Order', type: 'number' },
      { name: 'featured', label: 'Featured Pin', type: 'checkbox' },
      { name: 'status', label: 'Status', type: 'select', options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' }
      ]}
    ]
  }
}
