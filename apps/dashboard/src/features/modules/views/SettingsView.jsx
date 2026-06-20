import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'
import { http } from '../../../api/http.js'
import { ImageUploader } from '../../../components/ImageUploader.jsx'
import { useNotificationStore } from '../../../app/notification.store.js'
import { Loader2 } from 'lucide-react'

export const SettingsView = () => {
  const { showNotification } = useNotificationStore()
  const [activeTab, setActiveTab] = useState('profile')

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      try {
        const response = await http.get('/settings')
        return response.data?.data || {}
      } catch (err) {
        if (err.response?.status === 404) {
          return null // Not configured yet
        }
        throw err
      }
    }
  })

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      profile: {
        fullName: '',
        headline: '',
        bio: '',
        location: '',
        email: '',
        phone: '',
        profileImageUrl: '',
        resumeUrl: ''
      },
      socials: {
        github: '',
        linkedin: '',
        twitter: '',
        leetcode: '',
        codeforces: ''
      },
      seo: {
        title: '',
        description: '',
        keywords: []
      }
    }
  })

  useEffect(() => {
    if (data) {
      reset({
        profile: {
          fullName: data.profile?.fullName || '',
          headline: data.profile?.headline || '',
          bio: data.profile?.bio || '',
          location: data.profile?.location || '',
          email: data.profile?.email || '',
          phone: data.profile?.phone || '',
          profileImageUrl: data.profile?.profileImageUrl || '',
          resumeUrl: data.profile?.resumeUrl || ''
        },
        socials: {
          github: data.socials?.github || '',
          linkedin: data.socials?.linkedin || '',
          twitter: data.socials?.twitter || '',
          leetcode: data.socials?.leetcode || '',
          codeforces: data.socials?.codeforces || ''
        },
        seo: {
          title: data.seo?.title || '',
          description: data.seo?.description || '',
          keywords: data.seo?.keywords || []
        }
      })
    }
  }, [data, reset])

  const updateMutation = useMutation({
    mutationFn: (payload) => http.put('/settings', payload),
    onSuccess: () => {
      showNotification('Settings updated successfully.')
      refetch()
    },
    onError: (err) => {
      showNotification(err.response?.data?.error?.message || 'Failed to update settings', 'error')
    }
  })

  const onSubmit = (formData) => {
    updateMutation.mutate(formData)
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-muted font-mono">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading configurations...
      </div>
    )
  }

  const tabs = [
    { id: 'profile', label: 'Developer Profile' },
    { id: 'socials', label: 'Social Connections' },
    { id: 'seo', label: 'Search Engine Optimization' }
  ]

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 border-b border-line pb-5">
        <div>
          <p className="text-sm text-muted">CMS Configuration</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-normal font-sans text-ink">Global Settings</h1>
        </div>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Navigation Tabs */}
        <div className="flex flex-row md:flex-col gap-1 border-b md:border-b-0 border-line pb-4 md:pb-0 md:w-64 shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`h-10 px-4 text-left text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'border border-ink bg-ink text-canvas'
                  : 'border border-transparent text-muted hover:text-ink hover:bg-neutral-950'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 border border-line bg-surface p-6 space-y-6">
          {/* Tab 1: Profile */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold tracking-wider uppercase font-mono text-ink border-b border-line pb-2">
                Developer Identity
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono tracking-wider uppercase text-muted">Full Name *</label>
                  <input
                    type="text"
                    {...register('profile.fullName', { required: 'Full Name is required' })}
                    className="block w-full border border-line bg-canvas px-3 py-2 text-sm text-ink focus:border-ink focus:outline-none"
                  />
                  {errors.profile?.fullName && (
                    <span className="text-xs text-red-400">{errors.profile.fullName.message}</span>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono tracking-wider uppercase text-muted">Headline *</label>
                  <input
                    type="text"
                    {...register('profile.headline', { required: 'Headline is required' })}
                    className="block w-full border border-line bg-canvas px-3 py-2 text-sm text-ink focus:border-ink focus:outline-none"
                  />
                  {errors.profile?.headline && (
                    <span className="text-xs text-red-400">{errors.profile.headline.message}</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono tracking-wider uppercase text-muted">Biography / Intro *</label>
                <textarea
                  rows={4}
                  {...register('profile.bio', { required: 'Biography is required' })}
                  className="block w-full border border-line bg-canvas px-3 py-2 text-sm text-ink font-mono focus:border-ink focus:outline-none"
                />
                {errors.profile?.bio && (
                  <span className="text-xs text-red-400">{errors.profile.bio.message}</span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono tracking-wider uppercase text-muted">Email *</label>
                  <input
                    type="email"
                    {...register('profile.email', { required: 'Email is required' })}
                    className="block w-full border border-line bg-canvas px-3 py-2 text-sm text-ink focus:border-ink focus:outline-none"
                  />
                  {errors.profile?.email && (
                    <span className="text-xs text-red-400">{errors.profile.email.message}</span>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono tracking-wider uppercase text-muted">Phone Number</label>
                  <input
                    type="text"
                    {...register('profile.phone')}
                    className="block w-full border border-line bg-canvas px-3 py-2 text-sm text-ink focus:border-ink focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono tracking-wider uppercase text-muted">Location</label>
                  <input
                    type="text"
                    {...register('profile.location')}
                    className="block w-full border border-line bg-canvas px-3 py-2 text-sm text-ink focus:border-ink focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-line pt-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono tracking-wider uppercase text-muted">Avatar / Profile Image</label>
                  <Controller
                    name="profile.profileImageUrl"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <ImageUploader
                        value={value ? { url: value } : null}
                        onChange={(val) => onChange(val?.url || '')}
                        type="profile"
                      />
                    )}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono tracking-wider uppercase text-muted">Resume PDF Document</label>
                  <Controller
                    name="profile.resumeUrl"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <ImageUploader
                        value={value ? { url: value } : null}
                        onChange={(val) => onChange(val?.url || '')}
                        type="resume"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Socials */}
          {activeTab === 'socials' && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold tracking-wider uppercase font-mono text-ink border-b border-line pb-2">
                External Integrations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['github', 'linkedin', 'twitter', 'leetcode', 'codeforces'].map((soc) => (
                  <div key={soc} className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono tracking-wider uppercase text-muted">
                      {soc.charAt(0).toUpperCase() + soc.slice(1)} URL
                    </label>
                    <input
                      type="text"
                      {...register(`socials.${soc}`)}
                      placeholder={`https://${soc}.com/username`}
                      className="block w-full border border-line bg-canvas px-3 py-2 text-sm text-ink focus:border-ink focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: SEO */}
          {activeTab === 'seo' && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold tracking-wider uppercase font-mono text-ink border-b border-line pb-2">
                Metadata &amp; Crawling
              </h3>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono tracking-wider uppercase text-muted">SEO Default Title *</label>
                <input
                  type="text"
                  {...register('seo.title', { required: 'SEO Title is required' })}
                  className="block w-full border border-line bg-canvas px-3 py-2 text-sm text-ink focus:border-ink focus:outline-none"
                />
                {errors.seo?.title && (
                  <span className="text-xs text-red-400">{errors.seo.title.message}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono tracking-wider uppercase text-muted">SEO Description *</label>
                <textarea
                  rows={3}
                  {...register('seo.description', {
                    required: 'SEO Description is required',
                    maxLength: { value: 160, message: 'SEO description must be under 160 characters' }
                  })}
                  className="block w-full border border-line bg-canvas px-3 py-2 text-sm text-ink font-mono focus:border-ink focus:outline-none"
                />
                {errors.seo?.description && (
                  <span className="text-xs text-red-400">{errors.seo.description.message}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono tracking-wider uppercase text-muted">Keywords</label>
                <Controller
                  name="seo.keywords"
                  control={control}
                  render={({ field: { value = [], onChange } }) => {
                    const [keywordVal, setKeywordVal] = useState('')

                    const handleAddKeyword = (e) => {
                      if (e.key === 'Enter' || e.key === ',') {
                        e.preventDefault()
                        const val = keywordVal.trim()
                        if (val && !value.includes(val)) {
                          onChange([...value, val])
                        }
                        setKeywordVal('')
                      }
                    }

                    const handleRemoveKeyword = (tag) => {
                      onChange(value.filter((t) => t !== tag))
                    }

                    return (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={keywordVal}
                          onChange={(e) => setKeywordVal(e.target.value)}
                          onKeyDown={handleAddKeyword}
                          placeholder="Type keyword and press Enter or comma"
                          className="block w-full border border-line bg-canvas px-3 py-2 text-sm text-ink focus:border-ink focus:outline-none"
                        />
                        {value.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 border border-line bg-canvas p-2">
                            {value.map((kw) => (
                              <span
                                key={kw}
                                className="inline-flex items-center gap-1 bg-neutral-900 border border-neutral-800 text-neutral-400 px-2.5 py-0.5 text-xs font-mono rounded"
                              >
                                {kw}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveKeyword(kw)}
                                  className="text-neutral-500 hover:text-white"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  }}
                />
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-end border-t border-line pt-5">
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="inline-flex h-9 items-center justify-center border border-ink bg-ink px-6 text-sm font-medium text-canvas hover:bg-canvas hover:text-ink disabled:opacity-50 transition-colors"
            >
              {updateMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving Configurations...
                </>
              ) : (
                'Save Settings'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
