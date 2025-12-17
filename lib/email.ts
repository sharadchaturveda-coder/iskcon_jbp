/**
 * @fileoverview EmailJS integration for sending booking confirmations.
 * Handles email sending for successful event registrations.
 */

import emailjs from '@emailjs/browser';
import { BookingConfirmation } from '../types';

/**
 * EmailJS configuration - replace with your actual service details.
 */
const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
};

/**
 * Initializes EmailJS with the public key.
 * Must be called before sending emails.
 */
export const initializeEmailJS = (): void => {
  emailjs.init(EMAILJS_CONFIG.publicKey);
};

/**
 * Sends a booking confirmation email to the attendee.
 * Uses EmailJS template with booking details.
 *
 * @param confirmation - Booking confirmation data
 * @returns Promise resolving when email is sent
 */
export const sendBookingConfirmation = async (
  confirmation: BookingConfirmation
): Promise<void> => {
  try {
    const templateParams = {
      // Customer information
      to_name: confirmation.customerInfo.name,
      to_email: confirmation.customerInfo.email,

      // Booking details
      booking_id: confirmation.bookingId,
      ticket_count: confirmation.ticketCount,
      total_amount: `₹${(confirmation.totalAmount / 100).toFixed(2)}`,

      // Event information
      event_name: confirmation.eventInfo.name,
      event_date: confirmation.eventInfo.date,
      event_time: confirmation.eventInfo.time,
      event_venue: confirmation.eventInfo.venue,

      // Contact information
      customer_name: confirmation.customerInfo.name,
      customer_email: confirmation.customerInfo.email,
      customer_phone: confirmation.customerInfo.phone,

      // Status
      payment_status: confirmation.paymentStatus.toUpperCase(),
    };

    const result = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );

    if (result.status !== 200) {
      throw new Error(`Email sending failed with status: ${result.status}`);
    }

    console.log('Booking confirmation email sent successfully:', result);
  } catch (error) {
    console.error('Failed to send booking confirmation email:', error);
    throw new Error('Failed to send confirmation email. Please contact support.');
  }
};

/**
 * Sends a notification email to the temple administrators.
 * Optional: Notify temple staff about new bookings.
 *
 * @param confirmation - Booking confirmation data
 * @returns Promise resolving when notification is sent
 */
export const sendAdminNotification = async (
  confirmation: BookingConfirmation
): Promise<void> => {
  try {
    // This would use a different template for admin notifications
    // For now, we'll skip this as it's optional
    console.log('Admin notification would be sent here:', confirmation);
  } catch (error) {
    console.warn('Failed to send admin notification (non-critical):', error);
  }
};
