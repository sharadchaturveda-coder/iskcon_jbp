import React from 'react';
import { SectionHeading, MandalaPattern, GoldBorder } from './ui/DesignElements';
import { Clock, Sun, Moon, Bell } from 'lucide-react';
import { TimingEvent } from '../types';

const MORNING_EVENTS: TimingEvent[] = [
  { time: '04:30 AM', event: 'Mangala Aarti', description: 'First auspicious ceremony' },
  { time: '07:30 AM', event: 'Sringar Aarti', description: 'Deity greeting' },
  { time: '08:00 AM', event: 'Guru Puja', description: 'Worship of spiritual master' },
  { time: '08:30 AM', event: 'Bhagavatam Class', description: 'Scriptural discourse' },
];

const EVENING_EVENTS: TimingEvent[] = [
  { time: '04:15 PM', event: 'Dhupa Aarti', description: 'Afternoon offering' },
  { time: '06:30 PM', event: 'Tulasi Aarti', description: 'Prayer to sacred plant' },
  { time: '07:00 PM', event: 'Sandhya Aarti', description: 'Main evening ceremony' },
  { time: '08:30 PM', event: 'Shayana Aarti', description: 'Resting ceremony' },
];

const TimingCard: React.FC<{ event: TimingEvent, icon: React.ReactNode }> = ({ event, icon }) => (
  <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-saffron-50 transition-colors duration-300 border-b border-stone-200 last:border-0">
    <div className="mt-1 text-gold-600 bg-saffron-100 p-2 rounded-full">
      {icon}
    </div>
    <div>
      <h4 className="font-serif font-bold text-maroon-900 text-lg">{event.event}</h4>
      <div className="flex items-center text-maroon-800 font-semibold text-sm mb-1">
        <Clock size={14} className="mr-1 text-gold-600" />
        {event.time}
      </div>
      <p className="text-maroon-700/80 text-sm font-sans italic">{event.description}</p>
    </div>
  </div>
);

const DarshanTimings: React.FC = () => {
  return (
    <section id="darshan" className="relative py-20 px-4 md:px-8 bg-stone-50 overflow-hidden">
      <MandalaPattern className="text-gold-200 opacity-20" />
      
      <div className="container mx-auto relative z-10">
        <SectionHeading 
          title="Temple Schedule" 
          subtitle="Daily Darshan & Aarti Timings" 
        />

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 max-w-5xl mx-auto">
          {/* Morning Schedule */}
          <GoldBorder className="hover:-translate-y-2 transition-transform duration-500">
            <div className="bg-white p-8 h-full">
              <div className="flex items-center justify-center mb-6 space-x-2 border-b-2 border-gold-100 pb-4">
                <Sun className="text-saffron-500 w-8 h-8" />
                <h3 className="text-2xl font-serif text-maroon-900 font-bold">Morning Seva</h3>
              </div>
              <div className="space-y-2">
                {MORNING_EVENTS.map((evt, idx) => (
                  <TimingCard key={idx} event={evt} icon={<Bell size={18} />} />
                ))}
              </div>
            </div>
          </GoldBorder>

          {/* Evening Schedule */}
          <GoldBorder className="hover:-translate-y-2 transition-transform duration-500">
            <div className="bg-white p-8 h-full">
              <div className="flex items-center justify-center mb-6 space-x-2 border-b-2 border-gold-100 pb-4">
                <Moon className="text-indigo-900 w-8 h-8" />
                <h3 className="text-2xl font-serif text-maroon-900 font-bold">Evening Seva</h3>
              </div>
              <div className="space-y-2">
                {EVENING_EVENTS.map((evt, idx) => (
                  <TimingCard key={idx} event={evt} icon={<Bell size={18} />} />
                ))}
              </div>
            </div>
          </GoldBorder>
        </div>

        <div className="text-center mt-12">
          <p className="text-maroon-800 font-serif italic text-lg bg-gold-100 inline-block px-6 py-2 rounded-full border border-gold-300">
            "The temple remains closed between 1:00 PM and 4:15 PM"
          </p>
        </div>
      </div>
    </section>
  );
};

export default DarshanTimings;