import React from 'react';
import { SectionHeading, OrnateDivider, GoldBorder } from '../ui/DesignElements';

const ProjectsPage: React.FC = () => {
  return (
    <div className="pt-24 pb-12 min-h-screen bg-stone-50">
      
      {/* Section 1: Intro */}
      <section className="container mx-auto px-4 mb-12 text-center">
        <SectionHeading title="New Temple Project" subtitle="A Home for Sri Sri Radha Krishna" />
        <p className="max-w-3xl mx-auto text-maroon-900 text-lg">
          We are building a magnificent cultural complex in Jabalpur that will serve as a beacon of spirituality, peace, and culture for generations to come.
        </p>
      </section>

      {/* Section 2: Render Image */}
      <section className="container mx-auto px-4 mb-16">
        <GoldBorder className="max-w-5xl mx-auto">
          <img 
            src="https://images.unsplash.com/photo-1590076215667-874d414ed96e?q=80&w=2000&auto=format&fit=crop" 
            alt="New Temple Render" 
            className="w-full h-auto"
          />
        </GoldBorder>
      </section>

      {/* Section 3: Project Features */}
      <section className="bg-stone-100 py-16 mb-16">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-serif font-bold text-maroon-900 mb-8 text-center">Project Highlights</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Grand Temple Hall", desc: "Capacity for 2000 devotees." },
              { title: "Vedic Museum", desc: "Interactive exhibits on Indian heritage." },
              { title: "Govinda's Restaurant", desc: "Pure vegetarian fine dining." },
              { title: "Guest House", desc: "50-room facility for pilgrims." },
              { title: "Convention Center", desc: "Hall for weddings and cultural events." },
              { title: "Gardens", desc: "Lush green meditation gardens." }
            ].map((item, idx) => (
               <div key={idx} className="bg-white p-6 rounded shadow border-b-4 border-gold-500">
                 <h4 className="font-bold text-lg text-maroon-900 mb-2">{item.title}</h4>
                 <p className="text-stone-600">{item.desc}</p>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Construction Status */}
      <section className="container mx-auto px-4 mb-16">
        <h3 className="text-2xl font-serif font-bold text-maroon-900 mb-8 text-center">Current Status</h3>
        <div className="flex flex-col md:flex-row gap-8 items-center max-w-4xl mx-auto">
           <div className="w-full md:w-1/2 bg-gray-200 h-64 rounded-lg flex items-center justify-center text-gray-500">
             {/* Placeholder for status image */}
             <span className="font-bold">Construction Site View</span>
           </div>
           <div className="w-full md:w-1/2">
             <div className="space-y-6">
                <div>
                   <div className="flex justify-between mb-1 font-bold text-maroon-900"><span>Foundation</span> <span>100%</span></div>
                   <div className="w-full bg-stone-200 rounded-full h-3"><div className="bg-green-600 h-3 rounded-full w-full"></div></div>
                </div>
                <div>
                   <div className="flex justify-between mb-1 font-bold text-maroon-900"><span>Superstructure</span> <span>60%</span></div>
                   <div className="w-full bg-stone-200 rounded-full h-3"><div className="bg-gold-500 h-3 rounded-full w-[60%]"></div></div>
                </div>
                <div>
                   <div className="flex justify-between mb-1 font-bold text-maroon-900"><span>Finishing</span> <span>10%</span></div>
                   <div className="w-full bg-stone-200 rounded-full h-3"><div className="bg-maroon-900 h-3 rounded-full w-[10%]"></div></div>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* Section 5: CTA */}
      <section className="container mx-auto px-4 text-center">
        <OrnateDivider />
        <h3 className="text-2xl font-bold text-maroon-900 mt-8 mb-4">Be a part of history</h3>
        <p className="mb-8 text-maroon-800">Your contribution will help raise this monument of devotion.</p>
        <button className="bg-gold-500 hover:bg-gold-600 text-maroon-900 font-bold px-8 py-3 rounded shadow-lg">
          Donate Bricks
        </button>
      </section>
    </div>
  );
};

export default ProjectsPage;