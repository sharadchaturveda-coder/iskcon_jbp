import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'r6ujmq65',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true
})

// Helper for image URLs
const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)