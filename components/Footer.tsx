import React from 'react';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Heart } from 'lucide-react';
import { SocialLink, Page } from '../types';
import { MandalaPattern } from './ui/DesignElements';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'Facebook', url: '#', icon: Facebook },
  { platform: 'Instagram', url: '#', icon: Instagram },
  { platform: 'YouTube', url: '#', icon: Youtube },
];

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-saffron-50 text-maroon-900 relative border-t-8 border-gold-600 overflow-hidden">
      {/* Decorative Background */}
      <MandalaPattern className="text-maroon-900 opacity-5" />
      <div className="w-full h-2 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>

      <div className="container mx-auto px-8 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: About */}
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold text-maroon-900 mb-4">ISKCON Jabalpur</h3>
            <p className="text-sm leading-relaxed text-maroon-800 font-medium">
              International Society for Krishna Consciousness. Founder-Acharya: His Divine Grace A.C. Bhaktivedanta Swami Prabhupada.
            </p>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map((link) => (
                <a 
                  key={link.platform} 
                  href={link.url} 
                  className="bg-maroon-900 text-gold-500 p-2 rounded-full hover:bg-gold-500 hover:text-maroon-900 transition-all duration-300 shadow-md"
                >
                  <link.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-serif font-bold text-maroon-900 mb-6 border-b border-gold-300 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-3 text-sm font-semibold text-maroon-800">
              <li><button onClick={() => onNavigate('darshan')} className="hover:text-gold-600 transition-colors flex items-center text-left"><span className="text-gold-500 mr-2">›</span> Daily Darshan</button></li>
              <li><button onClick={() => onNavigate('events')} className="hover:text-gold-600 transition-colors flex items-center text-left"><span className="text-gold-500 mr-2">›</span> Festival Calendar</button></li>
              <li><button onClick={() => onNavigate('gita-course')} className="hover:text-gold-600 transition-colors flex items-center text-left"><span className="text-gold-500 mr-2">›</span> Gita Course</button></li>
              <li><button onClick={() => onNavigate('projects')} className="hover:text-gold-600 transition-colors flex items-center text-left"><span className="text-gold-500 mr-2">›</span> New Temple Project</button></li>
              <li><button onClick={() => onNavigate('donate')} className="hover:text-gold-600 transition-colors flex items-center text-left"><span className="text-gold-500 mr-2">›</span> Donate</button></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-xl font-serif font-bold text-maroon-900 mb-6 border-b border-gold-300 pb-2 inline-block">Contact Us</h3>
            <ul className="space-y-4 text-sm font-semibold text-maroon-800">
              <li className="flex items-start">
                <MapPin size={18} className="text-gold-600 mr-3 mt-1 flex-shrink-0" />
                <span>Bhedaghat Road, Sagda,<br/>Jabalpur, Madhya Pradesh 482003</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-gold-600 mr-3 flex-shrink-0" />
                <span>+91 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-gold-600 mr-3 flex-shrink-0" />
                <span>info@iskconjabalpur.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-xl font-serif font-bold text-maroon-900 mb-6 border-b border-gold-300 pb-2 inline-block">Newsletter</h3>
            <p className="text-sm text-maroon-800 mb-4 font-medium">Subscribe to get daily darshan and festival updates directly to your inbox.</p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your Email Address" 
                className="w-full bg-white border border-gold-300 rounded px-4 py-2 text-maroon-900 focus:outline-none focus:border-gold-600 text-sm shadow-sm"
              />
              <button className="w-full bg-maroon-900 hover:bg-maroon-800 text-white font-bold py-2 px-4 rounded transition-colors text-sm shadow-md">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-gold-300 text-center text-maroon-800 text-sm flex flex-col items-center font-medium">
          <p className="font-serif mb-2">© 2024 ISKCON Jabalpur. All rights reserved.</p>
          <div className="flex items-center space-x-1 opacity-80">
            <span>Made with</span>
            <Heart size={12} className="text-red-600 fill-current" />
            <span>for the pleasure of Sri Sri Radha Krishna</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;