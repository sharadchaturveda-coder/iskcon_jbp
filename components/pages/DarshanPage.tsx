import React from 'react';
import { SectionHeading, GoldBorder } from '../ui/DesignElements';
import DarshanTimings from '../DarshanTimings'; 

const DarshanPage: React.FC = () => {
  return (
    <div className="pt-24 pb-12 min-h-screen bg-stone-50 overflow-x-hidden">
      
      {/* Section 1: Header */}
      <div className="text-center mb-12 container mx-auto px-4">
        <SectionHeading title="Divine Darshan" subtitle="Behold the Lord" />
        <p className="max-w-2xl mx-auto text-maroon-900 font-medium">
          "The eyes are purified when they see the beautiful form of the Lord."
        </p>
      </div>

      {/* Section 2: Main Deity Image */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto relative">
          <GoldBorder>
            <div className="aspect-[3/4] md:aspect-video w-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1581881067989-6e3e5361350a?q=80&w=2000&auto=format&fit=crop" 
                alt="Sri Sri Radha Krishna" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
            <div className="text-center py-4 bg-maroon-900 text-gold-400 font-serif text-xl border-t border-gold-500">
              Sri Sri Radha Gopinath
            </div>
          </GoldBorder>
        </div>
      </section>

      {/* Section 3: Live Darshan Info */}
      <section className="bg-maroon-900 text-white py-12 mb-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-serif font-bold text-gold-500 mb-6">Live Darshan</h3>
          <p className="mb-8 font-medium">Tune in daily at 4:30 AM and 7:00 PM IST for live aarti broadcasts.</p>
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105 border border-red-800">
            Watch on YouTube
          </button>
        </div>
      </section>

      {/* Section 4: Timings */}
      <div className="mb-16">
        <DarshanTimings />
      </div>

      {/* Section 5: Guidelines */}
      <section className="container mx-auto px-4 mt-16 mb-12">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md border-l-4 border-gold-500">
          <h3 className="text-2xl font-serif font-bold text-maroon-900 mb-4">Temple Etiquette</h3>
          <ul className="list-disc list-inside space-y-3 text-maroon-800 font-medium">
            <li>Please leave your footwear at the designated shoe stand.</li>
            <li>Dress modestly. Shoulders and knees should be covered.</li>
            <li>Photography of the Deities is allowed only during specific times.</li>
            <li>Please maintain silence inside the temple hall.</li>
            <li>Respect the queue during peak Darshan hours.</li>
          </ul>
        </div>
      </section>

    </div>
  );
};

export default DarshanPage;