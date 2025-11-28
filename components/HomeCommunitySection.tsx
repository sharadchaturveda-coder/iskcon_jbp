import React from 'react';
import { SectionHeading } from './ui/DesignElements';
import { Heart, Users } from 'lucide-react';
import { Page } from '../types';

interface HomeCommunitySectionProps {
  onNavigate: (page: Page) => void;
}

const HomeCommunitySection: React.FC<HomeCommunitySectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-24 bg-gradient-to-b from-maroon-950 to-maroon-900 text-stone-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-30"></div>
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-gold-500/10 to-saffron-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-20 right-16 w-48 h-48 bg-gradient-to-r from-purple-500/10 to-gold-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-saffron-400/10 to-maroon-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <SectionHeading title="Our Community" subtitle="Voices of Devotion" />

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
          
          {/* Testimonial */}
          <div className="relative bg-maroon-900/50 p-8 rounded-xl border border-maroon-800 backdrop-blur-sm hover:bg-maroon-900/70 hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-gold-500/20 transform">
            <Heart className="text-gold-500 mb-4 w-10 h-10 animate-pulse" />
            <p className="font-serif text-xl italic leading-relaxed text-stone-200 mb-6 hover:text-stone-100 transition-colors duration-300">
              "Finding ISKCON Jabalpur was like finding a second home. The peace I feel during the Sunday kirtans is indescribable, and the philosophy has given my life a clear direction."
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gold-500 rounded-full mr-4 flex items-center justify-center text-maroon-900 font-bold text-xl hover:bg-gold-400 transition-colors duration-300 cursor-pointer">
                R
              </div>
              <div>
                <h5 className="font-bold text-gold-400 hover:text-gold-300 transition-colors duration-300">Rajesh Verma</h5>
                <p className="text-stone-800 text-sm hover:text-stone-400 transition-colors duration-300">Congregation Member</p>
              </div>
            </div>
          </div>

          {/* Connect CTA */}
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-serif font-bold mb-4 text-maroon-900">Join the Family</h3>
            <p className="text-stone-800 mb-8 leading-relaxed">
              Whether you are looking for spiritual wisdom, community service opportunities, or just a peaceful place to meditate, our doors are always open.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-maroon-900 p-4 rounded text-center hover:bg-gradient-to-br from-gold-600/20 to-maroon-900 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-gold-500/30 cursor-pointer relative overflow-hidden group">
                <span className="block text-3xl font-bold text-gold-500 mb-1 group-hover:text-gold-300 transition-colors duration-300">500+</span>
                <span className="text-xs uppercase tracking-wider text-stone-400 group-hover:text-stone-300 transition-colors duration-300">Families</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </div>
              <div className="bg-maroon-900 p-4 rounded text-center hover:bg-gradient-to-br from-saffron-600/20 to-maroon-900 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-saffron-500/30 cursor-pointer relative overflow-hidden group">
                <span className="block text-3xl font-bold text-gold-500 mb-1 group-hover:text-gold-300 transition-colors duration-300">Weekly</span>
                <span className="text-xs uppercase tracking-wider text-stone-400 group-hover:text-stone-300 transition-colors duration-300">Feasts</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-saffron-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </div>
            </div>

            <button 
              onClick={() => onNavigate('about')}
              className="bg-stone-100 text-maroon-900 font-bold px-8 py-3 rounded-full hover:bg-gold-500 hover:text-white transition-all duration-300 shadow-lg flex items-center justify-center mx-auto md:mx-0"
            >
              <Users size={18} className="mr-2" />
              Learn More About Us
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeCommunitySection;
