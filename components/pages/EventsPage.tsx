import React from 'react';
import { SectionHeading, MandalaPattern, OrnateDivider, GoldBorder } from '../ui/DesignElements';
import { useEvents } from '../../src/hooks/useSanity';
import { urlFor } from '../../src/lib/sanity';

const EventsPage: React.FC = () => {
  const { events, loading } = useEvents();

  return (
    <div className="pt-24 pb-12 min-h-screen bg-stone-50 relative overflow-hidden">
      {/* Spiritual Background Patterns */}
      <MandalaPattern className="opacity-[0.02]" />

      {/* Floating Sacred Symbols */}
      <div className="absolute top-32 right-16 animate-float-1 opacity-10 text-gold-400 pointer-events-none">
        <div className="text-6xl drop-shadow-lg">🪷</div>
      </div>
      <div className="absolute bottom-64 left-20 animate-float-2 opacity-8 text-saffron-400 pointer-events-none">
        <div className="text-5xl drop-shadow-lg">📿</div>
      </div>
      <div className="absolute top-1/2 right-8 animate-float-3 opacity-6 text-maroon-300 pointer-events-none">
        <div className="text-4xl">🕉️</div>
      </div>

      {/* Section 1: Hero */}
      <section className="container mx-auto px-4 mb-20 text-center relative z-10">
        <SectionHeading title="Festivals & Events" subtitle="Celebrate with Devotion" />
        <OrnateDivider />
      </section>

      {/* Section 2: Featured Event Showcase */}
      <section className="container mx-auto px-4 mb-20 relative z-10">
        <GoldBorder className="bg-gradient-to-r from-maroon-900 to-maroon-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="text-white flex flex-col md:flex-row relative">
            {/* Background Pattern Overlay */}
            <div className="absolute inset-0 opacity-5">
              <MandalaPattern />
            </div>

            <div className="md:w-1/2 relative z-10">
              <img
                src="https://images.unsplash.com/photo-1564669645228-5695029e2f9b?q=80&w=1000&auto=format&fit=crop"
                alt="Janmashtami"
                className="w-full h-64 md:h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-maroon-900/20 to-transparent"></div>
            </div>

            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-10">
              <span className="text-gold-400 font-bold tracking-[0.2em] uppercase text-sm mb-3 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-gold-400"></span>
                Featured Event
                <span className="w-8 h-[1px] bg-gold-400"></span>
              </span>
              <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-maroon-900 leading-tight">
                ARAMBH – The Eternal Beginning
              </h3>
              <p className="text-maroon-900 mb-6 text-lg leading-relaxed">
                Join us for the grand celebration of Lord Krishna's appearance day! Experience midnight aarti, divine kirtan, spiritual dramas, and sacred prasadam in an atmosphere of pure devotion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-maroon-900 font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gold-300">
                  📅 View Schedule
                </button>
                <button className="border-2 border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-maroon-900 font-bold px-8 py-3 rounded-full transition-all duration-300 backdrop-blur-sm hover:shadow-lg">
                  🙏 Sponsor Seva
                </button>
              </div>
            </div>
          </div>
        </GoldBorder>
      </section>

      {/* Section 3: Dynamic Events from Sanity */}
      <section className="container mx-auto px-4 mb-20 relative z-10">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-serif font-bold text-maroon-900 mb-4">Upcoming Events</h3>
          <OrnateDivider className="mb-8" />
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-gold-200 border-t-gold-500 mx-auto mb-6"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-gold-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="text-maroon-700 text-lg font-medium">Loading divine events...</p>
            <p className="text-maroon-500 text-sm mt-2">Please wait with devotion</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 opacity-50">🪷</div>
            <p className="text-maroon-700 text-lg font-medium">No upcoming events at this time.</p>
            <p className="text-maroon-500 text-sm mt-2">Check back soon for spiritual celebrations</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event: any) => (
              <GoldBorder key={event._id} className="group hover:scale-105 transition-all duration-300">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                  {/* Event Poster */}
                  {event.poster && (
                    <div className="relative overflow-hidden">
                      <img
                        src={urlFor(event.poster).width(400).height(240).url()}
                        alt={event.title}
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Featured Badge */}
                      {event.featured && (
                        <div className="absolute top-4 right-4 bg-gold-500 text-maroon-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          ⭐ Featured
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-6">
                    {/* Date Badge */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-gradient-to-br from-maroon-500 to-maroon-700 text-white rounded-xl p-4 text-center min-w-[80px] shadow-lg">
                        <span className="block text-2xl font-bold leading-none">
                          {new Date(event.startDate).getDate()}
                        </span>
                        <span className="block text-xs font-bold uppercase tracking-wide mt-1">
                          {new Date(event.startDate).toLocaleString('default', { month: 'short' })}
                        </span>
                      </div>

                      <div className="flex-1">
                        {/* Category Badge */}
                        <span className="inline-block bg-saffron-100 text-saffron-800 text-xs font-bold px-3 py-1 rounded-full mb-2">
                          {event.category}
                        </span>

                        <h4 className="text-xl font-bold text-maroon-900 mb-3 group-hover:text-gold-600 transition-colors leading-tight">
                          {event.title}
                        </h4>
                      </div>
                    </div>

                    {/* Event Details */}
                    <p className="text-maroon-700 mb-4 leading-relaxed text-sm">
                      {event.shortDescription}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-maroon-600">
                        <span className="text-gold-500">📅</span>
                        <span>{new Date(event.startDate).toLocaleDateString('en-IN', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>

                      {event.startDate !== event.endDate && (
                        <div className="flex items-center gap-2 text-sm text-maroon-600">
                          <span className="text-gold-500">⏰</span>
                          <span>
                            {new Date(event.startDate).toLocaleTimeString('en-IN', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                            {event.endDate && ` - ${new Date(event.endDate).toLocaleTimeString('en-IN', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}`}
                          </span>
                        </div>
                      )}

                      {event.venue && (
                        <div className="flex items-center gap-2 text-sm text-maroon-600">
                          <span className="text-gold-500">📍</span>
                          <span>{event.venue}</span>
                        </div>
                      )}
                    </div>

                    {/* Registration Button */}
                    {event.registrationRequired && event.registrationLink && (
                      <a
                        href={event.registrationLink}
                        className="inline-flex items-center gap-2 w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-maroon-900 font-bold px-6 py-3 rounded-full text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 justify-center"
                      >
                        <span>🙏</span>
                        <span>Register Now</span>
                      </a>
                    )}
                  </div>
                </div>
              </GoldBorder>
            ))}
          </div>
        )}
      </section>

      {/* Section 4: Sunday Love Feast */}
      <section className="bg-gradient-to-br from-saffron-50 via-gold-50/30 to-maroon-50/20 py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <MandalaPattern />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <SectionHeading title="Sunday Love Feast" subtitle="Weekly Spiritual Celebration" />

            <p className="max-w-2xl mx-auto text-maroon-800 mb-12 text-lg leading-relaxed">
              Every Sunday evening, we open our doors for a divine spiritual festival. Experience the bliss of congregational chanting, receive timeless wisdom from sacred scriptures, and honor pure vegetarian prasadam in an atmosphere of pure devotion.
            </p>

            <GoldBorder className="max-w-md mx-auto bg-white/90 backdrop-blur-sm">
              <div className="p-8 text-center">
                <div className="text-4xl mb-4">🪷</div>
                <div className="text-2xl font-serif font-bold text-maroon-900 mb-2">Every Sunday</div>
                <div className="text-lg font-bold text-gold-600 mb-4">5:00 PM - 8:00 PM</div>
                <OrnateDivider className="mb-4" />
                <div className="text-maroon-700 font-medium">Open to All • Free Admission</div>
                <div className="text-maroon-600 text-sm mt-2">No Registration Required</div>
              </div>
            </GoldBorder>

            <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gold-200/50">
                <div className="text-3xl mb-3">🎵</div>
                <h4 className="font-bold text-maroon-900 mb-2">Kirtan & Bhajans</h4>
                <p className="text-maroon-700 text-sm">Congregational chanting of divine names</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gold-200/50">
                <div className="text-3xl mb-3">📖</div>
                <h4 className="font-bold text-maroon-900 mb-2">Spiritual Discourse</h4>
                <p className="text-maroon-700 text-sm">Wisdom from Bhagavad Gita and scriptures</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gold-200/50">
                <div className="text-3xl mb-3">🍛</div>
                <h4 className="font-bold text-maroon-900 mb-2">Sacred Prasadam</h4>
                <p className="text-maroon-700 text-sm">Pure vegetarian feast offered with love</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default EventsPage;