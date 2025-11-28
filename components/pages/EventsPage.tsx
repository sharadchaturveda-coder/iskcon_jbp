import React from 'react';
import { SectionHeading } from '../ui/DesignElements';

const EventsPage: React.FC = () => {
  return (
    <div className="pt-24 pb-12 min-h-screen bg-stone-50">
      
      {/* Section 1: Hero */}
      <section className="container mx-auto px-4 mb-16 text-center">
        <SectionHeading title="Festivals & Events" subtitle="Celebrate with Devotion" />
      </section>

      {/* Section 2: Upcoming Major Festival */}
      <section className="container mx-auto px-4 mb-16">
        <div className="bg-gradient-to-r from-maroon-900 to-maroon-800 rounded-2xl overflow-hidden shadow-2xl text-white flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1564669645228-5695029e2f9b?q=80&w=1000&auto=format&fit=crop" 
              alt="Janmashtami" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <span className="text-gold-400 font-bold tracking-widest uppercase mb-2">Upcoming Major Event</span>
            <h3 className="text-4xl font-serif font-bold mb-4">Sri Krishna Janmashtami</h3>
            <p className="text-stone-300 mb-6 text-lg">
              Join us for the biggest celebration of the year! The appearance day of Lord Krishna will be celebrated with midnight aarti, kirtan, drama, and huge feast.
            </p>
            <div className="flex gap-4">
              <button className="bg-gold-500 hover:bg-gold-600 text-maroon-900 font-bold px-6 py-3 rounded-full">
                View Schedule
              </button>
              <button className="border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-maroon-900 font-bold px-6 py-3 rounded-full transition-colors">
                Sponsor Seva
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Monthly Calendar Grid */}
      <section className="container mx-auto px-4 mb-16">
        <h3 className="text-2xl font-serif font-bold text-maroon-900 mb-8 border-b-2 border-gold-200 pb-2 inline-block">This Month's Events</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { day: '12', month: 'OCT', title: 'Ekadashi', desc: 'Fasting from grains and beans.' },
            { day: '16', month: 'OCT', title: 'Sunday Love Feast', desc: 'Kirtan, Discourse and Prasadam.' },
            { day: '24', month: 'OCT', title: 'Govardhan Puja', desc: 'Worship of the sacred hill.' },
            { day: '30', month: 'OCT', title: 'Diwali', desc: 'Festival of lights with Lord Rama.' }
          ].map((evt, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-stone-200 flex items-start gap-4">
               <div className="bg-maroon-100 text-maroon-900 rounded-lg p-3 text-center min-w-[70px]">
                 <span className="block text-2xl font-bold">{evt.day}</span>
                 <span className="block text-xs font-bold uppercase">{evt.month}</span>
               </div>
               <div>
                 <h4 className="text-xl font-bold text-maroon-900">{evt.title}</h4>
                 <p className="text-maroon-700">{evt.desc}</p>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Sunday Feast */}
      <section className="bg-saffron-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-serif font-bold text-maroon-900 mb-4">Sunday Love Feast</h3>
          <p className="max-w-2xl mx-auto text-maroon-800 mb-8">
            Every Sunday evening, we open our doors for a spiritual festival. Experience the joy of chanting, hearing timeless wisdom, and honoring delicious vegetarian feast.
          </p>
          <div className="inline-block bg-white px-8 py-4 rounded-lg shadow-md border border-gold-200">
            <div className="text-lg font-bold text-maroon-900">Every Sunday • 5:00 PM - 8:00 PM</div>
            <div className="text-maroon-600">Open to All • Free Admission</div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default EventsPage;