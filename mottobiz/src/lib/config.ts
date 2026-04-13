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

// Webhook — replace with your n8n/Make endpoint before going live
// For now, submissions will fail gracefully and show an error message
export const LEAD_WEBHOOK_URL = ''
