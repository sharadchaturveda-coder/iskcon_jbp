import React from 'react';
import { SectionHeading, GoldBorder, MandalaPattern } from '../ui/DesignElements';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-24 pb-12 min-h-screen bg-stone-50">
      <MandalaPattern className="opacity-10 text-maroon-900" />
      
      {/* Section 1: Introduction */}
      <section className="container mx-auto px-4 mb-16 relative z-10">
        <SectionHeading title="About Us" subtitle="Our Heritage & Mission" />
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl text-maroon-900 leading-relaxed font-serif">
            ISKCON Jabalpur is a spiritual oasis dedicated to the practice of Bhakti Yoga. 
            We strive to propagate the teachings of the Bhagavad Gita and Srimad Bhagavatam, 
            creating a community centered around the loving service of Lord Krishna.
          </p>
        </div>
      </section>

      {/* Section 2: Founder */}
      <section className="bg-saffron-50 text-maroon-900 py-16 mb-16 relative overflow-hidden shadow-inner">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="md:w-1/3">
             <GoldBorder>
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/2/23/Bhaktivedanta_Swami_Prabhupada_Dictionary_Picture.jpg" 
                  alt="Srila Prabhupada" 
                  className="w-full h-auto rounded-md"
                />
             </GoldBorder>
          </div>
          <div className="md:w-2/3">
            <h3 className="text-3xl font-serif font-bold text-maroon-900 mb-4 border-b-4 border-gold-400 inline-block pb-2">Founder-Acharya</h3>
            <h4 className="text-xl font-bold mb-6 text-maroon-800">His Divine Grace A.C. Bhaktivedanta Swami Prabhupada</h4>
            <p className="text-maroon-900 mb-4 leading-relaxed font-medium text-lg">
              Srila Prabhupada appeared in this world in 1896 in Calcutta, India. He met his spiritual master, Srila Bhaktisiddhanta Sarasvati Goswami, in 1922. 
              At the age of 69, he traveled to the United States to fulfill his master's mission to spread Krishna Consciousness in the English-speaking world.
            </p>
            <p className="text-maroon-900 leading-relaxed font-medium text-lg">
              Between 1966 and 1977, Srila Prabhupada translated over 60 volumes of classic Vedic scriptures and established 108 temples worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Our Philosophy */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid md:grid-cols-3 gap-8">
           {[
             { title: 'Chanting', desc: 'The meditation of chanting Hare Krishna invokes spiritual peace.' },
             { title: 'Education', desc: 'Systematic study of Vedic scriptures for practical living.' },
             { title: 'Prasadam', desc: 'Distribution of sanctified vegetarian food to purify the senses.' }
           ].map((item, idx) => (
             <div key={idx} className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-gold-500 hover:-translate-y-2 transition-transform">
                <h3 className="text-2xl font-serif font-bold text-maroon-900 mb-4">{item.title}</h3>
                <p className="text-maroon-800">{item.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* Section 4: History */}
      <section className="container mx-auto px-4 mb-8">
        <div className="bg-white p-8 rounded-xl border border-gold-200 shadow-md">
           <h3 className="text-2xl font-serif font-bold text-maroon-900 mb-4 text-center">Our Journey in Jabalpur</h3>
           <p className="text-maroon-900 leading-relaxed text-center max-w-3xl mx-auto text-lg">
             Established in 1996, the Jabalpur center began as a small gathering of devotees. 
             Over the decades, it has grown into a vibrant community. We are currently in the process 
             of constructing a magnificent temple complex that will serve as a cultural landmark for the city.
           </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;