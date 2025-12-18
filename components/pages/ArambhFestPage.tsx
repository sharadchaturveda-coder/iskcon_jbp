/**
 * @fileoverview ArambhFestPage component - Event booking page for ARAMBH – Hare Krishna Fest 2026.
 * Features event details, booking form, Razorpay payment integration, and email confirmations.
 */

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Gift, Music, Mic, Heart, Ticket, Mail, Phone } from 'lucide-react';
import { SectionHeading, GoldBorder, OrnateDivider } from '../ui/DesignElements';
import { BookingFormData, BookingConfirmation } from '../../types';
import { createOrder, initializeRazorpayCheckout, loadRazorpayScript } from '../../lib/razorpay';
import { sendBookingConfirmation, initializeEmailJS } from '../../lib/email';
import { validateBookingForm, VALIDATION_MESSAGES } from '../../utils/booking-validation';

const ArambhFestPage: React.FC = () => {
  // Form state - only 1 ticket per booking
  const [formData, setFormData] = useState<Partial<BookingFormData>>({
    ticketCount: 1, // Fixed to 1 ticket per booking
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Event details
  const eventDetails = {
    name: 'ARAMBH – Hare Krishna Fest 2026',
    date: 'Sunday, 4th January 2026',
    time: '12:00 PM – 5:00 PM',
    venue: 'ISKCON Jabalpur, Chowkital, Lamhetaghat, Jabalpur (M.P.)',
    ticketPrice: 99,
  };

  // Lucky draw prizes
  const prizes = [
    'Television',
    'Tablet',
    'Microwave',
    'And many more surprises',
  ];

  // Initialize services on component mount
  useEffect(() => {
    const initializeServices = async () => {
      try {
        // Load Razorpay script
        await loadRazorpayScript();
        setRazorpayLoaded(true);

        // Initialize EmailJS
        initializeEmailJS();
      } catch (error) {
        console.error('Failed to initialize services:', error);
      }
    };

    initializeServices();
  }, []);

  // Handle form input changes
  const handleInputChange = (field: keyof BookingFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error for this field when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Redirect to Razorpay payment link
    window.location.href = 'https://pages.razorpay.com/pl_RskjfyGw1AvjLM/view';
  };

  // Handle successful payment
  const handlePaymentSuccess = async (response: any) => {
    try {
      // Create booking confirmation
      const confirmation: BookingConfirmation = {
        bookingId: response.razorpay_order_id || `BK_${Date.now()}`,
        paymentStatus: 'success',
        ticketCount: formData.ticketCount!,
        totalAmount: (formData.ticketCount! * eventDetails.ticketPrice * 100),
        eventInfo: {
          name: eventDetails.name,
          date: eventDetails.date,
          time: eventDetails.time,
          venue: eventDetails.venue,
        },
        customerInfo: {
          name: formData.name!,
          email: formData.email!,
          phone: formData.phone!,
        },
      };

      // Send confirmation email
      await sendBookingConfirmation(confirmation);

      setBookingStatus('success');
      alert(`Booking successful! Confirmation email sent to ${formData.email}`);

    } catch (error) {
      console.error('Error processing successful payment:', error);
      setBookingStatus('error');
      alert('Payment successful but confirmation email failed. Please contact support with your payment ID.');
    }
  };

  // Handle payment failure
  const handlePaymentFailure = (error: any) => {
    console.error('Payment failed:', error);
    setBookingStatus('error');
    alert('Payment failed. Please try again or contact support.');
  };

  // Calculate total amount
  const totalAmount = (formData.ticketCount || 0) * eventDetails.ticketPrice;

  return (
    <div className="pt-24 pb-12 min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-16 text-center">
        <SectionHeading title="ARAMBH – The Eternal Beginning" subtitle="Hare Krishna Festival 2026" />

        <div className="max-w-4xl mx-auto mb-8">
          <p className="text-maroon-800 text-lg italic mb-6">
            "ISKCON Jabalpur cordially invites you to ARAMBH – Hare Krishna Fest, a spiritually enriching and culturally vibrant celebration designed for all age groups."
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <GoldBorder className="p-6 bg-white">
              <Calendar className="w-8 h-8 text-gold-600 mx-auto mb-2" />
              <div className="text-maroon-900 font-bold">{eventDetails.date}</div>
            </GoldBorder>

            <GoldBorder className="p-6 bg-white">
              <Clock className="w-8 h-8 text-gold-600 mx-auto mb-2" />
              <div className="text-maroon-900 font-bold">{eventDetails.time}</div>
            </GoldBorder>

            <GoldBorder className="p-6 bg-white">
              <MapPin className="w-8 h-8 text-gold-600 mx-auto mb-2" />
              <div className="text-maroon-900 font-bold text-sm">{eventDetails.venue}</div>
            </GoldBorder>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="container mx-auto px-4 mb-16">
        <SectionHeading title="Book Your Tickets" subtitle="Secure Your Spot" />

        <div className="max-w-2xl mx-auto">
          <GoldBorder className="p-8 bg-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Banner Image */}
              <div className="bg-saffron-50 p-4 rounded-lg border border-gold-200">
                <picture className="w-full h-auto rounded-lg">
                  <source srcSet="/posternew.avif" type="image/avif" />
                  <source srcSet="/posternew.webp" type="image/webp" />
                  <img
                    src="/posternew.webp"
                    alt="Event Banner"
                    className="w-full h-auto rounded-lg"
                  />
                </picture>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || bookingStatus === 'processing'}
                className="w-full bg-gradient-to-r from-saffron-500 to-maroon-800 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting || bookingStatus === 'processing' ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Ticket className="w-5 h-5 mr-2" />
                    Book Now - ₹{eventDetails.ticketPrice}
                  </span>
                )}
              </button>

              {/* Status Messages */}
              {bookingStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
                  <div className="flex items-center">
                    <Heart className="w-5 h-5 mr-2" />
                    <span className="font-bold">Booking Successful!</span>
                  </div>
                  <p className="mt-2">Confirmation email sent. See you at the festival!</p>
                </div>
              )}

              {bookingStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                  <p className="font-bold">Booking Failed</p>
                  <p className="mt-2">Please try again or contact support.</p>
                </div>
              )}
            </form>
          </GoldBorder>
        </div>
      </section>

      {/* Event Highlights */}
      <section className="bg-gradient-to-r from-maroon-900 to-saffron-600 py-16 mb-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-serif font-bold text-white text-center mb-12">✨ Event Highlights</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center text-white">
              <Music className="w-12 h-12 mx-auto mb-4 text-gold-400" />
              <h4 className="font-bold mb-2">Classical & Contemporary Dance</h4>
            </div>

            <div className="text-center text-white">
              <Mic className="w-12 h-12 mx-auto mb-4 text-gold-400" />
              <h4 className="font-bold mb-2">Beatboxing & Youth Cultural Acts</h4>
            </div>

            <div className="text-center text-white">
              <Heart className="w-12 h-12 mx-auto mb-4 text-gold-400" />
              <h4 className="font-bold mb-2">Spiritual Dramas</h4>
            </div>

            <div className="text-center text-white">
              <Users className="w-12 h-12 mx-auto mb-4 text-gold-400" />
              <h4 className="font-bold mb-2">Bhajan Clubbing</h4>
            </div>
          </div>

          <OrnateDivider color="text-gold-400" />

          <div className="text-center text-white">
            <h4 className="text-2xl font-bold mb-4">Delicious Prasadam (Lunch)</h4>
            <p className="text-gold-200">Experience divine vegetarian cuisine prepared with devotion</p>
          </div>
        </div>
      </section>

      {/* Bhagavad Gita Quiz & Lucky Draw */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <GoldBorder className="p-8 bg-gradient-to-br from-saffron-50 to-gold-50">
            <h3 className="text-2xl font-serif font-bold text-maroon-900 mb-6 text-center">
              📚 Bhagavad Gita Quiz Competition
            </h3>
            <p className="text-maroon-700 text-center">
              Test your knowledge of spiritual wisdom and stand a chance to win exciting prizes!
            </p>
          </GoldBorder>

          <GoldBorder className="p-8 bg-gradient-to-br from-maroon-50 to-gold-50">
            <h3 className="text-2xl font-serif font-bold text-maroon-900 mb-6 text-center">
              🎁 Mega Lucky Draw
            </h3>
            <div className="space-y-2">
              {prizes.map((prize, index) => (
                <div key={index} className="flex items-center text-maroon-700">
                  <Gift className="w-4 h-4 text-gold-600 mr-2 flex-shrink-0" />
                  <span>{prize}</span>
                </div>
              ))}
            </div>
          </GoldBorder>
        </div>
      </section>

      {/* Special Talk */}
      <section className="bg-saffron-50 py-16 mb-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-serif font-bold text-maroon-900 mb-6">🎤 Special Talk</h3>
          <GoldBorder className="max-w-2xl mx-auto p-8 bg-white">
            <h4 className="text-2xl font-bold text-maroon-900 mb-4">"Hum Honge Kaamyab"</h4>
            <p className="text-gold-600 font-semibold mb-2">By His Grace Amogh Lila Prabhuji</p>
            <p className="text-maroon-700">(Monk, Life Coach & Youth Preacher)</p>
          </GoldBorder>
        </div>
      </section>



      {/* Contact Information */}
      <section className="bg-maroon-900 py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h3 className="text-2xl font-serif font-bold mb-8">📞 Contact Us</h3>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <Phone className="w-8 h-8 text-gold-400 mb-4" />
              <div className="space-y-2">
                <div className="font-bold">7897091361</div>
                <div className="font-bold">9111188108</div>
                <div className="font-bold">9755984854</div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <Mail className="w-8 h-8 text-gold-400 mb-4" />
              <div className="font-bold">info@iskconjabalpur.in</div>
            </div>

            <div className="flex flex-col items-center">
              <Heart className="w-8 h-8 text-gold-400 mb-4" />
              <div className="font-bold">@iskcon_jabalpur_official</div>
              <div className="text-gold-300 text-sm">Instagram</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArambhFestPage;
