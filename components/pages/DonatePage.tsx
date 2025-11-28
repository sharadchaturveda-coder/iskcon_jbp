import React from 'react';
import { SectionHeading, GoldBorder } from '../ui/DesignElements';

const DonatePage: React.FC = () => {
  return (
    <div className="pt-24 pb-12 min-h-screen bg-stone-50">
      
      {/* Section 1: Hero */}
      <section className="container mx-auto px-4 mb-12 text-center">
        <SectionHeading title="Support the Mission" subtitle="Seva Opportunities" />
        <p className="max-w-2xl mx-auto text-maroon-900 italic">
          "Whatever you do, whatever you eat, whatever you offer or give away, and whatever austerities you perform—do that, O son of Kuntī, as an offering to Me."
          <span className="block mt-2 font-bold not-italic font-sans text-sm">- Bhagavad Gita 9.27</span>
        </p>
      </section>

      {/* Section 2: Donation Options */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid md:grid-cols-3 gap-8">
           {[
             { title: "Annadanam", amount: "₹ 2,100", desc: "Sponsor meals for devotees and visitors." },
             { title: "Gau Seva", amount: "₹ 1,500", desc: "Care for our cows in the Goshala." },
             { title: "Deity Worship", amount: "₹ 5,001", desc: "Sponsor daily flowers and bhoga for Deities." },
             { title: "Festival Seva", amount: "₹ 11,000", desc: "Contribute towards upcoming festival arrangements." },
             { title: "Book Distribution", amount: "₹ 1,000", desc: "Sponsor Gita distribution to schools/prisons." },
             { title: "Temple Brick", amount: "₹ 5,000", desc: "One brick for the new temple construction." },
           ].map((item, idx) => (
             <div key={idx} className="bg-white p-6 rounded-lg shadow border border-stone-200 text-center hover:border-gold-500 transition-colors">
               <h4 className="text-xl font-bold text-maroon-900 mb-2">{item.title}</h4>
               <p className="text-gold-600 font-bold text-2xl mb-4">{item.amount}</p>
               <p className="text-stone-600 mb-6">{item.desc}</p>
               <button className="bg-maroon-900 text-white px-6 py-2 rounded hover:bg-maroon-800 transition-colors w-full">
                 Donate
               </button>
             </div>
           ))}
        </div>
      </section>

      {/* Section 3: Bank Details */}
      <section className="bg-gold-50 py-16 mb-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-serif font-bold text-maroon-900 mb-8">Bank Transfer Details</h3>
          <GoldBorder className="max-w-lg mx-auto bg-white inline-block text-left p-8">
             <div className="space-y-4 text-maroon-900">
               <div className="flex justify-between border-b border-gray-200 pb-2"><span className="font-bold">Account Name:</span> <span>ISKCON Jabalpur</span></div>
               <div className="flex justify-between border-b border-gray-200 pb-2"><span className="font-bold">Bank Name:</span> <span>State Bank of India</span></div>
               <div className="flex justify-between border-b border-gray-200 pb-2"><span className="font-bold">Account Number:</span> <span>1234 5678 9012</span></div>
               <div className="flex justify-between border-b border-gray-200 pb-2"><span className="font-bold">IFSC Code:</span> <span>SBIN0001234</span></div>
               <div className="flex justify-between"><span className="font-bold">Branch:</span> <span>Civil Lines, Jabalpur</span></div>
             </div>
          </GoldBorder>
        </div>
      </section>

      {/* Section 4: Tax Benefits */}
      <section className="container mx-auto px-4 text-center mb-8">
         <div className="bg-green-50 border border-green-200 p-6 rounded-lg inline-block">
           <p className="text-green-800 font-bold">
             All donations are eligible for tax exemption under section 80G of the Income Tax Act.
           </p>
         </div>
      </section>

    </div>
  );
};

export default DonatePage;