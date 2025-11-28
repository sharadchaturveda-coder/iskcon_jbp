import React from 'react';
import { SectionHeading, MandalaPattern } from './ui/DesignElements';
import { BookOpen, Users, Star, ArrowRight, Quote } from 'lucide-react';
import { CourseFeature, Page } from '../types';

interface GitaCourseProps {
  onNavigate: (page: Page) => void;
}

const FEATURES: CourseFeature[] = [
  { icon: BookOpen, title: 'Systematic Study', description: 'Chapter by chapter deep dive into wisdom.' },
  { icon: Users, title: 'Community Support', description: 'Join 500+ students in active learning groups.' },
  { icon: Star, title: 'Life Application', description: 'Practical tools for stress management & peace.' },
];

const GitaCourse: React.FC<GitaCourseProps> = ({ onNavigate }) => {
  return (
    <section id="gita-course" className="relative py-24 bg-maroon-900 text-stone-100 overflow-hidden">
      {/* Background patterns */}
      <MandalaPattern className="text-white opacity-5 left-0" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-black/40 to-transparent"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Side: Daily Wisdom Card (Replaced Image) */}
          <div className="w-full lg:w-1/2">
             <div className="relative bg-stone-100 text-maroon-900 p-8 md:p-12 rounded-lg shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500 max-w-lg mx-auto border-t-8 border-gold-500">
               {/* Decorative corners */}
               <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-maroon-900/30"></div>
               <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-maroon-900/30"></div>
               <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-maroon-900/30"></div>
               <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-maroon-900/30"></div>

               <div className="flex justify-center mb-6 text-gold-600 opacity-80">
                 <Quote size={40} />
               </div>
               
               <h3 className="text-center font-serif text-xl font-bold mb-6 tracking-wide uppercase text-maroon-800 border-b border-maroon-200 pb-4">
                 Verse of the Day
               </h3>
               
               <p className="font-serif italic text-2xl md:text-3xl text-center leading-relaxed mb-6 text-maroon-900">
                 "For one who has conquered the mind, the mind is the best of friends; but for one who has failed to do so, his mind will remain the greatest enemy."
               </p>
               
               <div className="text-center font-bold text-sm uppercase tracking-widest text-gold-600">
                 — Bhagavad Gita 6.6
               </div>

               <div className="mt-8 pt-6 border-t border-maroon-100 text-center">
                 <span className="inline-block bg-maroon-100 text-maroon-800 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                   Join Today's Class
                 </span>
               </div>
             </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2 text-left">
            <h4 className="text-gold-400 font-bold uppercase tracking-widest mb-2">Education for Life</h4>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
              Unlock the Wisdom of <br/>
              <span className="text-gold-500">Bhagavad Gita</span>
            </h2>
            <p className="text-stone-300 text-lg mb-8 leading-relaxed">
              Discover the timeless manual of life. Our comprehensive course is designed to help you understand the profound philosophy of the Gita and apply it to modern living.
            </p>

            <div className="grid gap-6 mb-10">
              {FEATURES.map((feature, idx) => (
                <div key={idx} className="flex items-start p-4 bg-maroon-800/50 rounded-lg border border-maroon-700 hover:bg-maroon-800 transition-colors">
                  <div className="bg-gold-500/20 p-3 rounded-full mr-4 text-gold-400">
                    <feature.icon size={24} />
                  </div>
                  <div>
                    <h5 className="font-serif font-bold text-xl mb-1 text-stone-100">{feature.title}</h5>
                    <p className="text-stone-400 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onNavigate('gita-course')}
                className="flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-maroon-900 font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-gold-500/20 transition-all duration-300 group cursor-pointer"
              >
                Enroll & Take Quiz
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default GitaCourse;