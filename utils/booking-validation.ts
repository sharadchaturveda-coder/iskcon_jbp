/**
 * @fileoverview Validation utilities for booking forms.
 * Provides client-side validation for event registration forms.
 */

import { BookingFormData } from '../types';

/**
 * Validation error messages.
 */
export const VALIDATION_MESSAGES = {
  required: 'This field is required',
  invalidEmail: 'Please enter a valid email address',
  invalidPhone: 'Please enter a valid phone number (10 digits)',
  invalidTicketCount: 'Please select 1-10 tickets',
  nameTooShort: 'Name must be at least 2 characters long',
  nameTooLong: 'Name must be less than 100 characters',
};

/**
 * Validates an email address using a simple regex pattern.
 *
 * @param email - Email string to validate
 * @returns True if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Validates a phone number (Indian mobile numbers).
 *
 * @param phone - Phone string to validate
 * @returns True if phone is valid
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
};

/**
 * Validates ticket count is within acceptable range.
 *
 * @param count - Number of tickets
 * @returns True if count is valid
 */
export const isValidTicketCount = (count: number): boolean => {
  return count >= 1 && count <= 10 && Number.isInteger(count);
};

/**
 * Validates name field.
 *
 * @param name - Name string to validate
 * @returns True if name is valid
 */
export const isValidName = (name: string): boolean => {
  const trimmed = name.trim();
  return trimmed.length >= 2 && trimmed.length < 100;
};

/**
 * Comprehensive validation for booking form data.
 * Returns an object with field-specific error messages.
 *
 * @param formData - Booking form data to validate
 * @returns Object with error messages for invalid fields
 */
export const validateBookingForm = (formData: Partial<BookingFormData>): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Name validation
  if (!formData.name || !formData.name.trim()) {
    errors.name = VALIDATION_MESSAGES.required;
  } else if (!isValidName(formData.name)) {
    errors.name = formData.name.trim().length < 2
      ? VALIDATION_MESSAGES.nameTooShort
      : VALIDATION_MESSAGES.nameTooLong;
  }

  // Email validation
  if (!formData.email || !formData.email.trim()) {
    errors.email = VALIDATION_MESSAGES.required;
  } else if (!isValidEmail(formData.email)) {
    errors.email = VALIDATION_MESSAGES.invalidEmail;
  }

  // Phone validation
  if (!formData.phone || !formData.phone.trim()) {
    errors.phone = VALIDATION_MESSAGES.required;
  } else if (!isValidPhone(formData.phone)) {
    errors.phone = VALIDATION_MESSAGES.invalidPhone;
  }

  // Ticket count validation
  if (!formData.ticketCount || formData.ticketCount === 0) {
    errors.ticketCount = VALIDATION_MESSAGES.required;
  } else if (!isValidTicketCount(formData.ticketCount)) {
    errors.ticketCount = VALIDATION_MESSAGES.invalidTicketCount;
  }

  // Special requests validation (optional, but if provided should not be too long)
  if (formData.specialRequests && formData.specialRequests.length > 500) {
    errors.specialRequests = 'Special requests must be less than 500 characters';
  }

  return errors;
};

/**
 * Checks if a booking form has any validation errors.
 *
 * @param formData - Booking form data to check
 * @returns True if form is valid (no errors)
 */
export const isBookingFormValid = (formData: Partial<BookingFormData>): boolean => {
  return Object.keys(validateBookingForm(formData)).length === 0;
};
