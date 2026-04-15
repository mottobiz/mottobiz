// Central config — update these before deploying to production
export const WHATSAPP_NUMBER = '917487957972'
export const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi MottoBiz, I'd like to book a free automation audit."
)
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`
export const EMAIL = 'webmaster@mottobiz.com'
export const PHONE_DISPLAY = '+91 74879 57972'
export const BUSINESS_NAME = 'MottoBiz'
export const BUSINESS_CITY = 'Surat'
export const BUSINESS_STATE = 'Gujarat'
export const BUSINESS_COUNTRY = 'IN'
export const BUSINESS_POSTAL_CODE = '395001'
export const BUSINESS_LAT = '21.1702'
export const BUSINESS_LNG = '72.8311'
export const SITE_URL = 'https://mottobiz.com'

// Service Areas - Surat neighborhoods for local SEO
export const SERVICE_AREAS = [
  // Primary areas
  { name: 'Varachha', lat: '21.2333', lng: '72.9000', type: 'neighborhood' },
  { name: 'Adajan', lat: '21.2000', lng: '72.8000', type: 'neighborhood' },
  { name: 'Vesu', lat: '21.1500', lng: '72.7667', type: 'neighborhood' },
  { name: 'Piplod', lat: '21.1667', lng: '72.7833', type: 'neighborhood' },
  { name: 'Athwa', lat: '21.1833', lng: '72.8000', type: 'neighborhood' },
  { name: 'Ghod Dod Road', lat: '21.1700', lng: '72.7900', type: 'area' },
  { name: 'City Light', lat: '21.1630', lng: '72.7800', type: 'neighborhood' },
  { name: 'Parle Point', lat: '21.1750', lng: '72.7850', type: 'neighborhood' },
  { name: 'Nanpura', lat: '21.1900', lng: '72.8100', type: 'neighborhood' },
  
  // Extended areas
  { name: 'Katargam', lat: '21.2167', lng: '72.8333', type: 'neighborhood' },
  { name: 'Udhna', lat: '21.2333', lng: '72.8500', type: 'neighborhood' },
  { name: 'Rander', lat: '21.2167', lng: '72.7833', type: 'neighborhood' },
  { name: 'Chowk Bazar', lat: '21.2000', lng: '72.8167', type: 'neighborhood' },
  { name: 'Ring Road', lat: '21.1833', lng: '72.8333', type: 'area' },
  { name: 'New Civil Road', lat: '21.2100', lng: '72.8400', type: 'area' },
  { name: 'Palanpur', lat: '21.1833', lng: '72.8667', type: 'neighborhood' },
  { name: 'Jahangirabad', lat: '21.2200', lng: '72.8600', type: 'neighborhood' },
  { name: 'Anand Mahal Road', lat: '21.1500', lng: '72.7500', type: 'area' },
  { name: 'L P Savani Road', lat: '21.1400', lng: '72.7600', type: 'area' },
]

// Webhook — replace with your n8n/Make endpoint before going live
// For now, submissions will fail gracefully and show an error message
export const LEAD_WEBHOOK_URL = ''
