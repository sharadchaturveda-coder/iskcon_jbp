# ISKCON Jabalpur CMS Implementation Plan - $0 Forever (Sanity Only)

## Executive Summary

This plan outlines the implementation of a complete Content Management System for the ISKCON Jabalpur website using **Sanity CMS only** - no backend, no database, no hosting costs. Everything runs on Sanity's free tier with your existing payment integrations.

**Timeline:** 2 weeks
**Cost:** $0 forever
**Complexity:** Low (mostly configuration)

---

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │────│   Sanity API    │────│   Sanity Studio │
│   (Your existing) │    │   (Free)       │    │   (Admin CMS)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │ External Services │
                    │ - Razorpay       │
                    │ - EmailJS        │
                    └─────────────────┘
```

---

## Phase 1: Sanity Setup (Day 1)

### 1.1 Create Sanity Account
1. Go to [sanity.io](https://sanity.io)
2. Click "Sign Up" → "Sign up with Google"
3. Choose **Free** plan
4. Verify email

### 1.2 Create Project
1. Click "Create project"
2. **Name:** `iskcon-jabalpur-cms`
3. **Template:** Choose "Clean project"
4. Click "Create"

### 1.3 Install Sanity CLI
```bash
# Install globally
npm install -g @sanity/cli

# Login to your account
sanity login
```

### 1.4 Initialize Project
```bash
# Navigate to your React project
cd iskcon-jabalpur

# Initialize Sanity in subfolder
sanity init --project [your-project-id]
# Choose "Create a new dataset"
# Dataset name: production
```

### 1.5 Deploy Studio
```bash
# Deploy the admin interface
sanity deploy
```
**Result:** Get URL like `https://iskcon-jabalpur-cms.sanity.studio`

---

## Phase 2: Content Schema Design (Day 2-3)

### 2.1 Define Schema Types

Create `sanity.config.ts`:

```typescript
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

export default defineConfig({
  name: 'iskcon-cms',
  title: 'ISKCON Jabalpur CMS',
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: 'production',

  plugins: [deskTool()],

  schema: {
    types: [
      // Event Management
      {
        name: 'event',
        type: 'document',
        title: 'Events',
        fields: [
          {
            name: 'title',
            type: 'string',
            title: 'Event Title',
            validation: Rule => Rule.required()
          },
          {
            name: 'slug',
            type: 'slug',
            options: { source: 'title' }
          },
          {
            name: 'description',
            type: 'text',
            title: 'Description'
          },
          {
            name: 'shortDescription',
            type: 'string',
            title: 'Short Description (for cards)'
          },
          {
            name: 'startDate',
            type: 'datetime',
            title: 'Start Date & Time'
          },
          {
            name: 'endDate',
            type: 'datetime',
            title: 'End Date & Time'
          },
          {
            name: 'venue',
            type: 'string',
            title: 'Venue'
          },
          {
            name: 'poster',
            type: 'image',
            title: 'Event Poster',
            options: { hotspot: true }
          },
          {
            name: 'category',
            type: 'string',
            title: 'Category',
            options: {
              list: [
                'Festival',
                'Aarti',
                'Program',
                'Workshop',
                'Special Event'
              ]
            }
          },
          {
            name: 'status',
            type: 'string',
            title: 'Status',
            options: {
              list: ['draft', 'scheduled', 'published', 'archived']
            },
            initialValue: 'draft'
          },
          {
            name: 'featured',
            type: 'boolean',
            title: 'Featured on Homepage',
            initialValue: false
          },
          {
            name: 'registrationRequired',
            type: 'boolean',
            title: 'Registration Required',
            initialValue: false
          },
          {
            name: 'registrationLink',
            type: 'url',
            title: 'Registration Link',
            hidden: ({ document }) => !document?.registrationRequired
          },
          // SEO Fields
          {
            name: 'seoTitle',
            type: 'string',
            title: 'SEO Title'
          },
          {
            name: 'seoDescription',
            type: 'text',
            title: 'SEO Description'
          }
        ]
      },

      // Gallery Management
      {
        name: 'galleryAlbum',
        type: 'document',
        title: 'Gallery Albums',
        fields: [
          {
            name: 'title',
            type: 'string',
            title: 'Album Title'
          },
          {
            name: 'description',
            type: 'text',
            title: 'Description'
          },
          {
            name: 'coverPhoto',
            type: 'image',
            title: 'Cover Photo'
          },
          {
            name: 'photos',
            type: 'array',
            title: 'Photos',
            of: [
              {
                type: 'image',
                fields: [
                  {
                    name: 'caption',
                    type: 'string',
                    title: 'Caption'
                  },
                  {
                    name: 'alt',
                    type: 'string',
                    title: 'Alt Text'
                  }
                ],
                options: { hotspot: true }
              }
            ]
          },
          {
            name: 'event',
            type: 'reference',
            title: 'Related Event',
            to: [{ type: 'event' }]
          },
          {
            name: 'publishedAt',
            type: 'datetime',
            title: 'Publish Date'
          }
        ]
      },

      // Page Content Management
      {
        name: 'page',
        type: 'document',
        title: 'Pages',
        fields: [
          {
            name: 'title',
            type: 'string',
            title: 'Page Title'
          },
          {
            name: 'slug',
            type: 'slug',
            options: { source: 'title' }
          },
          {
            name: 'content',
            type: 'array',
            title: 'Content',
            of: [
              { type: 'block' },
              { type: 'image', options: { hotspot: true } }
            ]
          },
          {
            name: 'seoTitle',
            type: 'string',
            title: 'SEO Title'
          },
          {
            name: 'seoDescription',
            type: 'text',
            title: 'SEO Description'
          }
        ]
      },

      // Donation Tracking
      {
        name: 'donation',
        type: 'document',
        title: 'Donations',
        fields: [
          {
            name: 'amount',
            type: 'number',
            title: 'Amount (₹)'
          },
          {
            name: 'purpose',
            type: 'string',
            title: 'Purpose'
          },
          {
            name: 'donorName',
            type: 'string',
            title: 'Donor Name'
          },
          {
            name: 'donorEmail',
            type: 'email',
            title: 'Donor Email'
          },
          {
            name: 'event',
            type: 'reference',
            title: 'Related Event',
            to: [{ type: 'event' }]
          },
          {
            name: 'paymentStatus',
            type: 'string',
            options: {
              list: ['pending', 'completed', 'failed']
            }
          },
          {
            name: 'createdAt',
            type: 'datetime',
            initialValue: () => new Date().toISOString()
          }
        ]
      }
    ]
  }
})
```

---

## Phase 3: React Integration (Day 4-7)

### 3.1 Install Sanity Client
```bash
npm install @sanity/client @sanity/image-url
```

### 3.2 Create Sanity Client
Create `src/lib/sanity.ts`:

```typescript
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true
})

// Helper for image URLs
const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)
```

### 3.3 Create API Hooks
Create `src/hooks/useSanity.ts`:

```typescript
import { useState, useEffect } from 'react'
import { client } from '../lib/sanity'

export const useEvents = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(`
      *[_type == "event" && status == "published"] | order(startDate asc) {
        _id,
        title,
        slug,
        shortDescription,
        startDate,
        endDate,
        venue,
        poster,
        category,
        featured,
        registrationRequired,
        registrationLink
      }
    `).then(data => {
      setEvents(data)
      setLoading(false)
    })
  }, [])

  return { events, loading }
}

export const useGallery = () => {
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(`
      *[_type == "galleryAlbum"] | order(publishedAt desc) {
        _id,
        title,
        description,
        coverPhoto,
        photos,
        event->{
          title,
          slug
        }
      }
    `).then(data => {
      setAlbums(data)
      setLoading(false)
    })
  }, [])

  return { albums, loading }
}
```

### 3.4 Update Components

**Update EventsPage.tsx:**
```typescript
import { useEvents } from '../hooks/useSanity'
import { urlFor } from '../lib/sanity'

const EventsPage = () => {
  const { events, loading } = useEvents()

  if (loading) return <div>Loading...</div>

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map(event => (
        <div key={event._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
          {event.poster && (
            <img
              src={urlFor(event.poster).width(400).height(300).url()}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
            <p className="text-gray-600 mb-4">{event.shortDescription}</p>
            <div className="text-sm text-gray-500">
              <p>📅 {new Date(event.startDate).toLocaleDateString()}</p>
              <p>📍 {event.venue}</p>
            </div>
            {event.registrationRequired && (
              <a href={event.registrationLink} className="btn-primary">
                Register Now
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
```

### 3.5 Environment Variables
Add to `.env.local`:
```env
VITE_SANITY_PROJECT_ID=your-project-id-here
```

---

## Phase 4: Admin Interface Customization (Day 8-10)

### 4.1 Customize Studio
Create `sanity.config.ts` with custom desk structure:

```typescript
import { deskTool } from 'sanity/desk'

export default defineConfig({
  // ... existing config
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Events')
              .child(
                S.documentTypeList('event')
                  .title('All Events')
                  .filter('_type == "event"')
              ),
            S.listItem()
              .title('Gallery')
              .child(
                S.documentTypeList('galleryAlbum')
                  .title('Photo Albums')
              ),
            S.listItem()
              .title('Pages')
              .child(
                S.documentTypeList('page')
                  .title('Content Pages')
              ),
            S.listItem()
              .title('Donations')
              .child(
                S.documentTypeList('donation')
                  .title('Donation Records')
              )
          ])
    })
  ]
})
```

### 4.2 Add User Roles
1. Go to Sanity Studio → Manage
2. Add team members with appropriate roles:
   - **Administrator:** Full access
   - **Editor:** Can create/edit content
   - **Viewer:** Read-only access

---

## Phase 5: Advanced Features (Day 11-14)

### 5.1 Real-time Updates
Sanity automatically provides real-time updates - no extra code needed.

### 5.2 SEO Integration
All content types include SEO fields that integrate with your existing meta tags.

### 5.3 Backup & Versioning
Sanity automatically versions all changes and provides unlimited history.

### 5.4 Analytics Integration
Add Google Analytics to track CMS usage and content performance.

---

## External Integrations (Keep Existing)

### Payments - Razorpay
- Keep your existing Razorpay integration
- Add donation records to Sanity via API calls

### Email - EmailJS
- Keep existing email confirmations
- Add webhooks for automated notifications

---

## Maintenance & Operations

### Daily Operations
1. **Content Updates:** Use Sanity Studio at `https://your-project.sanity.studio`
2. **Media Upload:** Drag-drop images directly in the studio
3. **User Management:** Add/remove team members as needed

### Monthly Tasks
1. **Review Analytics:** Check content performance
2. **Clean Up:** Archive old draft content
3. **Backup:** Sanity handles automatic backups

### Scaling
- **Free forever** for temple usage
- **Upgrade only if:** 10GB storage exceeded or 3 users not enough
- **Pro plan:** $99/month for larger needs

---

## Success Metrics

### Technical
- ✅ Studio loads in <3 seconds
- ✅ Content updates appear instantly on website
- ✅ Images optimized automatically
- ✅ Mobile-responsive admin interface

### Content
- ✅ Events published within 24 hours of scheduling
- ✅ Gallery photos uploaded within hours of events
- ✅ All content SEO-optimized

### User Experience
- ✅ Admin interface intuitive for non-technical staff
- ✅ Real-time collaboration works smoothly
- ✅ Content versioning prevents accidental deletions

---

## Troubleshooting

### Common Issues
1. **Studio not loading:** Check project ID in config
2. **Images not showing:** Verify image field configuration
3. **Content not updating:** Check GROQ queries syntax
4. **Authentication issues:** Verify team member roles

### Support
- **Sanity Community:** Active Discord community
- **Documentation:** Comprehensive at sanity.io/docs
- **Free Support:** Email support for free tier users

---

## Cost Summary

| Service | Cost | Purpose |
|---------|------|---------|
| Sanity CMS | $0 | Content management, media, admin interface |
| Your existing hosting | $0 | Frontend deployment |
| Razorpay | Transaction fees | Payment processing |
| EmailJS | $0 free tier | Email confirmations |

**Total: $0/month forever**

---

## Go-Live Checklist

- [ ] Sanity project created and configured
- [ ] All content schemas defined
- [ ] Studio deployed and accessible
- [ ] React app connected to Sanity
- [ ] Sample content created and tested
- [ ] Admin users added with appropriate roles
- [ ] External integrations (Razorpay, EmailJS) working
- [ ] Mobile responsiveness verified
- [ ] SEO meta tags implemented
- [ ] Analytics tracking added

---

**This plan delivers a professional, scalable CMS that will serve ISKCON Jabalpur for years to come, all while costing absolutely nothing beyond what you're already paying for your website hosting.**

*Implementation Timeline: 2 weeks*
*Total Cost: $0 forever*
*Maintenance: Minimal ( Sanity handles everything)*