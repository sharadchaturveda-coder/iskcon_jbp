import React from 'react';
import { SectionHeading, GoldBorder } from './ui/DesignElements';
import { Calendar, ChevronRight } from 'lucide-react';
import { Page } from '../types';

interface HomeEventsSectionProps {
  onNavigate: (page: Page) => void;
}

const HomeEventsSection: React.FC<HomeEventsSectionProps> = ({ onNavigate }) => {
  const events = [
    { date: '12 OCT', title: 'Rama Ekadashi', desc: 'Fasting for Lord Krishna' },
    { date: '16 OCT', title: 'Sunday Feast', desc: 'Weekly spiritual gathering' },
    { date: '24 OCT', title: 'Damodar Lila', desc: 'Special month of lamps' },
  ];

  return (
    <section className="py-20 bg-stone-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading title="Upcoming Celebrations" subtitle="Festival Calendar" />
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {events.map((evt, idx) => (
            <div key={idx} className="group cursor-pointer" onClick={() => onNavigate('events')}>
              <GoldBorder className="h-full hover:-translate-y-2 transition-transform duration-300">
                <div className="bg-white p-6 h-full flex flex-col items-center text-center">
                  <div className="bg-maroon-50 text-maroon-900 rounded-lg p-3 mb-4 w-20 shadow-inner">
                    <span className="block text-xl font-bold leading-none mb-1">{evt.date.split(' ')[0]}</span>
                    <span className="block text-xs font-bold uppercase">{evt.date.split(' ')[1]}</span>
                  </div>
                  <h4 className="text-xl font-serif font-bold text-maroon-900 mb-2 group-hover:text-gold-600 transition-colors">
                    {evt.title}
                  </h4>
                  <p className="text-maroon-800/70 text-sm mb-4">
                    {evt.desc}
                  </p>
                  <div className="mt-auto pt-4 border-t border-stone-100 w-full flex justify-center text-gold-600 font-bold text-sm uppercase tracking-wider items-center">
                    Details <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </GoldBorder>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={() => onNavigate('events')}
            className="inline-flex items-center text-maroon-900 font-bold border-b-2 border-gold-500 pb-1 hover:text-gold-600 transition-colors"
          >
            View Full Calendar <Calendar size={18} className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeEventsSection;