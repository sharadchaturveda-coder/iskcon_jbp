import React, { useState, useEffect, useCallback } from 'react';
import { SectionHeading, MandalaPattern, OrnateDivider, GoldBorder } from '../ui/DesignElements';
import { usePosts, useCategories } from '../../src/hooks/useSanity';
import { urlFor } from '../../src/lib/sanity';
import { Calendar, Clock, User, Tag, Search, Filter } from 'lucide-react';

const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { posts, loading, hasMore, loadMore } = usePosts(6, selectedCategory);
  const categories = useCategories();

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      >= document.documentElement.offsetHeight - 1000
      && hasMore
      && !loading
    ) {
      loadMore();
    }
  }, [hasMore, loading, loadMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Filter posts based on search query
  const filteredPosts = posts.filter(post =>
    post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Separate featured and regular posts
  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="pt-24 pb-12 min-h-screen bg-stone-50 relative overflow-hidden">
      {/* Spiritual Background Patterns */}
      <MandalaPattern className="opacity-[0.02]" />

      {/* Floating Sacred Symbols */}
      <div className="absolute top-32 right-16 animate-float-1 opacity-10 text-gold-400 pointer-events-none">
        <div className="text-6xl drop-shadow-lg">📚</div>
      </div>
      <div className="absolute bottom-64 left-20 animate-float-2 opacity-8 text-saffron-400 pointer-events-none">
        <div className="text-5xl drop-shadow-lg">🕉️</div>
      </div>
      <div className="absolute top-1/2 right-8 animate-float-3 opacity-6 text-maroon-300 pointer-events-none">
        <div className="text-4xl">🪷</div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-20 text-center relative z-10">
        <SectionHeading title="Spiritual Teachings & News" subtitle="Wisdom from the Heart" />
        <OrnateDivider />

        <div className="max-w-3xl mx-auto">
          <p className="text-maroon-800 text-lg leading-relaxed mb-8">
            Discover timeless spiritual wisdom, temple updates, festival stories, and profound teachings
            from the sacred traditions of Lord Krishna. Each post carries the essence of divine knowledge
            to illuminate your spiritual journey.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-maroon-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search teachings, news, articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gold-200 focus:border-gold-400 focus:outline-none bg-white shadow-lg text-maroon-900 placeholder-maroon-400"
            />
          </div>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="container mx-auto px-4 mb-12 relative z-10">
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === null
                ? 'bg-gold-500 text-maroon-900 shadow-lg'
                : 'bg-white text-maroon-700 hover:bg-gold-100 border border-gold-200'
            }`}
          >
            All Teachings
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gold-500 text-maroon-900 shadow-lg'
                  : 'bg-white text-maroon-700 hover:bg-gold-100 border border-gold-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Post Section */}
      {featuredPosts.length > 0 && (
        <section className="container mx-auto px-4 mb-20 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-serif font-bold text-maroon-900 mb-2">✨ Featured Teaching</h2>
            <OrnateDivider className="mb-8" />
          </div>

          <GoldBorder className="bg-gradient-to-r from-maroon-900 to-maroon-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="text-white flex flex-col md:flex-row relative">
              <div className="absolute inset-0 opacity-5">
                <MandalaPattern />
              </div>

              {featuredPosts[0].featuredImage && (
                <div className="md:w-1/2 relative z-10">
                  <img
                    src={urlFor(featuredPosts[0].featuredImage).width(600).height(400).url()}
                    alt={featuredPosts[0].title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-maroon-900/30 to-transparent"></div>
                </div>
              )}

              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-gold-500 text-maroon-900 px-3 py-1 rounded-full text-xs font-bold">
                    ⭐ FEATURED
                  </span>
                  <span className="bg-saffron-100 text-saffron-800 px-3 py-1 rounded-full text-xs font-medium">
                    {featuredPosts[0].category}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-gold-100 leading-tight">
                  {featuredPosts[0].title}
                </h3>

                <p className="text-stone-200 mb-6 text-lg leading-relaxed">
                  {featuredPosts[0].excerpt}
                </p>

                <div className="flex items-center gap-4 text-sm text-stone-300 mb-6">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(featuredPosts[0].publishedAt).toLocaleDateString('en-IN')}</span>
                  </div>
                  {featuredPosts[0].readingTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{featuredPosts[0].readingTime} min read</span>
                    </div>
                  )}
                  {featuredPosts[0].author && (
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{featuredPosts[0].author}</span>
                    </div>
                  )}
                </div>

                <button className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-maroon-900 font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gold-300 self-start">
                  Read Full Teaching →
                </button>
              </div>
            </div>
          </GoldBorder>
        </section>
      )}

      {/* Posts Grid */}
      <section className="container mx-auto px-4 mb-20 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post: any) => (
            <GoldBorder key={post._id} className="group hover:scale-105 transition-all duration-300">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                {/* Post Image */}
                {post.featuredImage && (
                  <div className="relative overflow-hidden">
                    <img
                      src={urlFor(post.featuredImage).width(400).height(240).url()}
                      alt={post.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )}

                <div className="p-6">
                  {/* Category & Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-saffron-100 text-saffron-800 text-xs font-bold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    {post.tags?.slice(0, 2).map((tag: string, index: number) => (
                      <span key={index} className="bg-maroon-100 text-maroon-700 text-xs px-2 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-maroon-900 mb-3 group-hover:text-gold-600 transition-colors leading-tight">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-maroon-700 mb-4 leading-relaxed text-sm line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-maroon-600">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(post.publishedAt).toLocaleDateString('en-IN')}</span>
                      </div>
                      {post.readingTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readingTime}m</span>
                        </div>
                      )}
                    </div>
                    {post.author && (
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span className="text-xs">{post.author}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </GoldBorder>
          ))}
        </div>

        {/* Loading More Indicator */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gold-200 border-t-gold-500 mx-auto mb-4"></div>
            <p className="text-maroon-700">Loading more teachings...</p>
          </div>
        )}

        {/* End of Content */}
        {!loading && !hasMore && posts.length > 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🪷</div>
            <p className="text-maroon-700 font-medium">You've reached the end of our teachings</p>
            <p className="text-maroon-500 text-sm mt-2">More wisdom will be shared soon</p>
          </div>
        )}

        {/* Load More Button (Fallback) */}
        {hasMore && !loading && (
          <div className="text-center mt-8">
            <button
              onClick={loadMore}
              className="bg-gold-500 hover:bg-gold-600 text-maroon-900 font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Load More Teachings
            </button>
          </div>
        )}
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gradient-to-br from-saffron-50 via-gold-50/30 to-maroon-50/20 py-16">
        <div className="container mx-auto px-4 text-center">
          <GoldBorder className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm">
            <div className="p-8">
              <div className="text-4xl mb-4">📬</div>
              <h3 className="text-2xl font-serif font-bold text-maroon-900 mb-4">
                Stay Connected with Divine Wisdom
              </h3>
              <p className="text-maroon-700 mb-6">
                Subscribe to receive weekly spiritual teachings, temple updates, and festival announcements
                directly in your inbox. Join our community of spiritual seekers.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-full border-2 border-gold-200 focus:border-gold-400 focus:outline-none text-maroon-900 placeholder-maroon-400"
                />
                <button className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-maroon-900 font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 whitespace-nowrap">
                  Subscribe 🙏
                </button>
              </div>
            </div>
          </GoldBorder>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;