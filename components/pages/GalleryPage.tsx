import React, { useState } from 'react';
import { SectionHeading, MandalaPattern, OrnateDivider, GoldBorder } from '../ui/DesignElements';
import { useGallery } from '../../src/hooks/useSanity';
import { urlFor } from '../../src/lib/sanity';
import { Calendar, Image, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  album: any;
  initialPhotoIndex: number;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ album, initialPhotoIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialPhotoIndex);

  const currentPhoto = album.photos?.[currentIndex];

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % album.photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + album.photos.length) % album.photos.length);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') nextPhoto();
    if (e.key === 'ArrowLeft') prevPhoto();
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = '';
    };
  }, []);

  if (!currentPhoto) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-60 text-white hover:text-gold-400 transition-colors p-2 rounded-full bg-black/50 hover:bg-black/70"
      >
        <X size={24} />
      </button>

      {/* Navigation Buttons */}
      {album.photos.length > 1 && (
        <>
          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-60 text-white hover:text-gold-400 transition-colors p-3 rounded-full bg-black/50 hover:bg-black/70"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-60 text-white hover:text-gold-400 transition-colors p-3 rounded-full bg-black/50 hover:bg-black/70"
          >
            <ChevronRight size={32} />
          </button>
        </>
      )}

      {/* Main Image */}
      <div className="max-w-5xl max-h-full p-4">
        <img
          src={urlFor(currentPhoto).width(1200).height(800).url()}
          alt={currentPhoto.caption || album.title}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
        />
      </div>

      {/* Photo Info */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
        <div className="text-center text-white">
          <div className="text-lg font-semibold mb-2">
            {album.title}
          </div>
          {currentPhoto.caption && (
            <div className="text-stone-200 mb-2">{currentPhoto.caption}</div>
          )}
          <div className="text-sm text-stone-400">
            {currentIndex + 1} of {album.photos.length}
          </div>
          {album.event && (
            <div className="text-sm text-gold-400 mt-1">
              📸 Related to: {album.event.title}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const GalleryPage: React.FC = () => {
  const { albums, loading } = useGallery();
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (album: any, photoIndex: number) => {
    setSelectedAlbum(album);
    setLightboxIndex(photoIndex);
  };

  const closeLightbox = () => {
    setSelectedAlbum(null);
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-stone-50 relative overflow-hidden">
      {/* Spiritual Background Patterns */}
      <MandalaPattern className="opacity-[0.02]" />

      {/* Floating Sacred Symbols */}
      <div className="absolute top-32 right-16 animate-float-1 opacity-10 text-gold-400 pointer-events-none">
        <div className="text-6xl drop-shadow-lg">📸</div>
      </div>
      <div className="absolute bottom-64 left-20 animate-float-2 opacity-8 text-saffron-400 pointer-events-none">
        <div className="text-5xl drop-shadow-lg">🪷</div>
      </div>
      <div className="absolute top-1/2 right-8 animate-float-3 opacity-6 text-maroon-300 pointer-events-none">
        <div className="text-4xl">🕉️</div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-20 text-center relative z-10">
        <SectionHeading title="Divine Moments" subtitle="Captured in Grace" />
        <OrnateDivider />

        <div className="max-w-3xl mx-auto">
          <p className="text-maroon-800 text-lg leading-relaxed mb-8">
            Witness the sacred beauty and divine grace captured through the lens of devotion.
            Each photograph tells a story of spiritual awakening, festival celebrations, and
            the eternal bond between the soul and the divine.
          </p>

          <div className="flex items-center justify-center gap-4 text-maroon-600">
            <div className="flex items-center gap-2">
              <Image className="w-5 h-5 text-gold-500" />
              <span>{albums.length} Sacred Albums</span>
            </div>
            <div className="w-1 h-1 bg-gold-400 rounded-full"></div>
            <div className="flex items-center gap-2">
              <span>📸 {albums.reduce((total: number, album: any) => total + (album.photos?.length || 0), 0)} Divine Moments</span>
            </div>
          </div>
        </div>
      </section>

      {/* Albums Grid */}
      <section className="container mx-auto px-4 mb-20 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-serif font-bold text-maroon-900 mb-4">Photo Albums</h2>
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
            <p className="text-maroon-700 text-lg font-medium">Loading sacred moments...</p>
            <p className="text-maroon-500 text-sm mt-2">Preparing divine gallery</p>
          </div>
        ) : albums.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 opacity-50">📸</div>
            <p className="text-maroon-700 text-lg font-medium">No albums yet</p>
            <p className="text-maroon-500 text-sm mt-2">Sacred moments will be shared soon</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {albums.map((album: any) => (
              <GoldBorder key={album._id} className="group cursor-pointer" onClick={() => openLightbox(album, 0)}>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                  {/* Album Cover */}
                  <div className="relative overflow-hidden aspect-[4/3]">
                    {album.coverPhoto ? (
                      <img
                        src={urlFor(album.coverPhoto).width(400).height(300).url()}
                        alt={album.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : album.photos?.[0] ? (
                      <img
                        src={urlFor(album.photos[0]).width(400).height(300).url()}
                        alt={album.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-maroon-100 to-gold-100 flex items-center justify-center">
                        <Image className="w-16 h-16 text-maroon-300" />
                      </div>
                    )}

                    {/* Overlay with photo count */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between text-white">
                          <div className="flex items-center gap-2">
                            <Image className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              {album.photos?.length || 0} photos
                            </span>
                          </div>
                          <span className="text-xs bg-gold-500 px-2 py-1 rounded-full">
                            View Album
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Album Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-maroon-900 mb-2 group-hover:text-gold-600 transition-colors">
                      {album.title}
                    </h3>

                    {album.description && (
                      <p className="text-maroon-700 mb-3 text-sm leading-relaxed line-clamp-2">
                        {album.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-sm text-maroon-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {album.publishedAt ? new Date(album.publishedAt).toLocaleDateString('en-IN') : 'Recent'}
                        </span>
                      </div>

                      {album.event && (
                        <div className="text-xs bg-saffron-100 text-saffron-800 px-2 py-1 rounded-full">
                          📸 {album.event.title}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </GoldBorder>
            ))}
          </div>
        )}
      </section>

      {/* Photo Grid Preview */}
      {albums.length > 0 && (
        <section className="bg-gradient-to-br from-saffron-50 via-gold-50/30 to-maroon-50/20 py-16">
          <div className="container mx-auto px-4 text-center">
            <SectionHeading title="Recent Divine Moments" subtitle="Latest Captures" />

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl mx-auto mt-8">
              {albums.slice(0, 3).map((album: any) =>
                album.photos?.slice(0, 2).map((photo: any, photoIndex: number) => (
                  <div
                    key={`${album._id}-${photoIndex}`}
                    className="aspect-square overflow-hidden rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={() => openLightbox(album, photoIndex)}
                  >
                    <img
                      src={urlFor(photo).width(200).height(200).url()}
                      alt={photo.caption || album.title}
                      className="w-full h-full object-cover hover:brightness-110 transition-all duration-300"
                    />
                  </div>
                ))
              ).flat()}
            </div>

            <div className="mt-8">
              <p className="text-maroon-700 mb-4">Experience the full beauty of our sacred moments</p>
              <button
                onClick={() => document.getElementById('albums-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-maroon-900 font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Explore All Albums 🪷
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      {selectedAlbum && (
        <Lightbox
          album={selectedAlbum}
          initialPhotoIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
};

export default GalleryPage;