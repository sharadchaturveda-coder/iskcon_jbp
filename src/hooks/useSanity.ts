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

export const usePosts = (limit = 10, category = null) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    loadPosts()
  }, [category])

  const loadPosts = async (offset = 0) => {
    const categoryFilter = category ? `&& category == "${category}"` : ''
    const query = `
      *[_type == "post" ${categoryFilter}] | order(publishedAt desc) [${offset}...${offset + limit}] {
        _id,
        title,
        slug,
        excerpt,
        featuredImage,
        category,
        tags,
        author,
        publishedAt,
        featured,
        readingTime
      }
    `

    const data = await client.fetch(query)
    if (offset === 0) {
      setPosts(data)
    } else {
      setPosts(prev => [...prev, ...data])
    }

    setHasMore(data.length === limit)
    setLoading(false)
  }

  const loadMore = () => {
    if (!loading && hasMore) {
      loadPosts(posts.length)
    }
  }

  return { posts, loading, hasMore, loadMore }
}

export const useCategories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    client.fetch(`
      *[_type == "post"] {
        category
      } | count(category) > 0
    `).then(data => {
      const uniqueCategories = [...new Set(data.map(item => item.category))].filter(Boolean)
      setCategories(uniqueCategories)
    })
  }, [])

  return categories
}