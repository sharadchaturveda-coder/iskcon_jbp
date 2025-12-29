import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

export default defineConfig({
  name: 'iskcon-cms',
  title: 'ISKCON Jabalpur CMS',
  projectId: 'r6ujmq65',
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

      // Blog Posts Management (Replaces static pages)
      {
        name: 'post',
        type: 'document',
        title: 'Blog Posts',
        fields: [
          {
            name: 'title',
            type: 'string',
            title: 'Post Title',
            validation: Rule => Rule.required()
          },
          {
            name: 'slug',
            type: 'slug',
            options: { source: 'title' }
          },
          {
            name: 'excerpt',
            type: 'text',
            title: 'Excerpt (short summary)',
            rows: 3
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
            name: 'featuredImage',
            type: 'image',
            title: 'Featured Image',
            options: { hotspot: true }
          },
          {
            name: 'category',
            type: 'string',
            title: 'Category',
            options: {
              list: [
                'Spiritual Teachings',
                'Temple News',
                'Event Updates',
                'Festival Stories',
                'Guest Articles',
                'Bhagavad Gita Insights',
                'Meditation & Practice'
              ]
            }
          },
          {
            name: 'tags',
            type: 'array',
            of: [{ type: 'string' }],
            title: 'Tags',
            options: {
              layout: 'tags'
            }
          },
          {
            name: 'author',
            type: 'string',
            title: 'Author (optional)'
          },
          {
            name: 'publishedAt',
            type: 'datetime',
            title: 'Publish Date',
            initialValue: () => new Date().toISOString()
          },
          {
            name: 'featured',
            type: 'boolean',
            title: 'Featured Post',
            initialValue: false
          },
          {
            name: 'readingTime',
            type: 'number',
            title: 'Reading Time (minutes)',
            description: 'Estimated reading time in minutes'
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