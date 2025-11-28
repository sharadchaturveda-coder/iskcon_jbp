import React from 'react';
import { SectionHeading, OrnateDivider, MandalaPattern } from './ui/DesignElements';
import { Play } from 'lucide-react';
import { Page } from '../types';

interface ProjectVideoProps {
  onNavigate: (page: Page) => void;
}

const ProjectVideoSection: React.FC<ProjectVideoProps> = ({ onNavigate }) => {
  return (
    <section id="projects" className="py-24 bg-stone-100 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-maroon-900/10 to-transparent pointer-events-none"></div>
      <MandalaPattern className="text-maroon-900 opacity-[0.03]" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <SectionHeading 
          title="New Temple Project" 
          subtitle="Building a Spiritual Oasis"
        />

        <div className="max-w-5xl mx-auto mb-12">
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-2xl border border-stone-200">
            {/* Decorative Frame around Video */}
            <div className="relative border-4 border-double border-gold-400 rounded-lg overflow-hidden bg-black group cursor-pointer aspect-video z-0" onClick={() => onNavigate('projects')}>
              
              {/* Thumbnail / Placeholder */}
              <img 
                src="https://images.unsplash.com/photo-1590076215667-874d414ed96e?q=80&w=2000&auto=format&fit=crop" 
                alt="Temple Construction Project" 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
              />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                 <div className="w-20 h-20 bg-gold-500/90 rounded-full flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(245,158,11,0.6)] group-hover:scale-110 transition-transform duration-300">
                    <Play size={40} className="text-maroon-900 ml-2" fill="currentColor" />
                 </div>
                 <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2 drop-shadow-md">
                    Vision 2025
                 </h3>
                 <p className="text-stone-200 max-w-lg mx-auto drop-shadow-md hidden sm:block">
                    Watch the architectural walkthrough of the upcoming glorious temple complex dedicated to Sri Sri Radha Krishna.
                 </p>
              </div>

              {/* Corner Ornaments - Now contained within the relative parent */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-gold-500 rounded-tl-xl pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-gold-500 rounded-tr-xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-gold-500 rounded-bl-xl pointer-events-none"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-gold-500 rounded-br-xl pointer-events-none"></div>
            </div>
            
            <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
               <div className="flex-1 w-full">
                 <h4 className="font-serif text-xl font-bold text-maroon-900 mb-2">Help Us Build</h4>
                 <div className="w-full bg-stone-200 rounded-full h-4 mb-2">
                    <div className="bg-gradient-to-r from-gold-400 to-saffron-600 h-4 rounded-full w-3/4 shadow-inner relative overflow-hidden">
                       <div className="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite]"></div>
                    </div>
                 </div>
                 <div className="flex justify-between text-sm font-bold text-maroon-800">
                    <span>Raised: ₹7.5 Cr</span>
                    <span>Goal: ₹10 Cr</span>
                 </div>
               </div>
               <button 
                  onClick={() => onNavigate('projects')}
                  className="bg-maroon-900 text-white px-8 py-3 rounded-md font-bold hover:bg-maroon-800 transition-colors shadow-lg border border-maroon-700 min-w-[200px] cursor-pointer"
               >
                  Contribute
               </button>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <OrnateDivider color="text-maroon-900/30" />
        </div>
      </div>
    </section>
  );
};

export default ProjectVideoSection;