/**
 * @fileoverview Razorpay integration utilities for payment processing.
 * Handles checkout initialization and payment flow for event bookings.
 */

import { PaymentData, BookingFormData } from '../types';

/**
 * Configuration for Razorpay payment integration.
 */
const RAZORPAY_CONFIG = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID || '',
  currency: 'INR',
  name: 'ISKCON Jabalpur',
  description: 'ARAMBH – Hare Krishna Fest 2026',
  image: '/Iskcon.svg', // Temple logo if available
};

/**
 * Generates a unique order ID for the booking.
 * In production, this should come from your backend API.
 *
 * @param bookingData - The booking form data
 * @returns Promise resolving to order data
 */
export const createOrder = async (bookingData: BookingFormData): Promise<PaymentData> => {
  const ticketPrice = 140; // ₹140 per ticket
  const totalAmount = bookingData.ticketCount * ticketPrice * 100; // Convert to paisa

  // Generate a unique order ID (in production, get from backend)
  const orderId = `ARAMBH_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  return {
    orderId,
    amount: totalAmount,
    currency: RAZORPAY_CONFIG.currency,
    name: bookingData.name,
    email: bookingData.email,
    phone: bookingData.phone,
  };
};

/**
 * Initializes and opens the Razorpay checkout modal.
 * Handles payment success/failure callbacks.
 *
 * @param paymentData - Payment order data
 * @param onSuccess - Callback for successful payment
 * @param onFailure - Callback for failed payment
 */
export const initializeRazorpayCheckout = (
  paymentData: PaymentData,
  onSuccess: (response: any) => void,
  onFailure: (error: any) => void
): void => {
  // Check if Razorpay is available
  if (!window.Razorpay) {
    alert('Razorpay SDK failed to load. Please refresh the page and try again.');
    return;
  }

  const options = {
    key: RAZORPAY_CONFIG.key,
    amount: paymentData.amount,
    currency: paymentData.currency,
    name: RAZORPAY_CONFIG.name,
    description: RAZORPAY_CONFIG.description,
    image: RAZORPAY_CONFIG.image,
    order_id: paymentData.orderId,
    prefill: {
      name: paymentData.name,
      email: paymentData.email,
      contact: paymentData.phone,
    },
    theme: {
      color: '#d4af37', // Gold color matching site theme
    },
    handler: function (response: any) {
      // Payment successful
      onSuccess(response);
    },
    modal: {
      ondismiss: function () {
        // Payment cancelled by user
        onFailure({ reason: 'Payment cancelled by user' });
      },
    },
  };

  const rzp = new window.Razorpay(options);

  // Handle payment failure
  rzp.on('payment.failed', function (response: any) {
    onFailure(response.error);
  });

  // Open checkout
  rzp.open();
};

/**
 * Loads the Razorpay checkout script dynamically.
 * Must be called before initializing payments.
 *
 * @returns Promise that resolves when script is loaded
 */
export const loadRazorpayScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
    document.body.appendChild(script);
  });
};

// Extend window interface for Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}
