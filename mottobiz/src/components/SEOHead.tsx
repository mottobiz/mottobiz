import { Helmet } from 'react-helmet-async'
import {
  SITE_URL, EMAIL, WHATSAPP_NUMBER,
  BUSINESS_LAT, BUSINESS_LNG, BUSINESS_POSTAL_CODE,
} from '@/lib/config'

const schema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'MottoBiz',
  url: SITE_URL,
  logo: `${SITE_URL}/logo-static.svg`,
  description:
    "Surat's first AI business automation studio. We build smart websites, automate daily operations, and create business intelligence systems for solopreneurs and small businesses in Surat, Gujarat.",
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Surat',
    addressLocality: 'Surat',
    addressRegion: 'Gujarat',
    postalCode: BUSINESS_POSTAL_CODE,
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: BUSINESS_LAT,
    longitude: BUSINESS_LNG,
  },
  areaServed: { '@type': 'City', name: 'Surat' },
  serviceType: [
    'Business Automation', 'Web Development', 'AI Automation',
    'Workflow Automation', 'Social Media Automation', 'WhatsApp Automation',
    'Business Intelligence',
  ],
  priceRange: '₹₹',
  telephone: `+${WHATSAPP_NUMBER}`,
  email: EMAIL,
  sameAs: [
    'https://www.instagram.com/mottobiz',
    `https://wa.me/${WHATSAPP_NUMBER}`,
  ],
}

export function SEOHead() {
  return (
    <Helmet>
      <title>Business Automation & Web Design in Surat | MottoBiz</title>
      <meta
        name="description"
        content="MottoBiz helps solopreneurs and small businesses in Surat automate their daily operations — WhatsApp follow-ups, social media, lead pipelines — without hiring a team. Book a free 30-min audit."
      />
      <meta name="keywords" content="business automation Surat, AI automation small business Surat, website development Surat, digital automation services Gujarat, WhatsApp automation Surat" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="MottoBiz" />
      <link rel="canonical" href={SITE_URL} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:title" content="Business Automation & Web Design in Surat | MottoBiz" />
      <meta property="og:description" content="We build the digital system Surat's sharpest small businesses run on — so you grow without the chaos." />
      <meta property="og:image" content={`${SITE_URL}/logo-wordmark.svg`} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Business Automation & Web Design in Surat | MottoBiz" />
      <meta name="twitter:description" content="We build the digital system Surat's sharpest small businesses run on." />

      {/* Local SEO */}
      <meta name="geo.region" content="IN-GJ" />
      <meta name="geo.placename" content="Surat" />
      <meta name="geo.position" content={`${BUSINESS_LAT};${BUSINESS_LNG}`} />
      <meta name="ICBM" content={`${BUSINESS_LAT}, ${BUSINESS_LNG}`} />

      {/* Schema */}
      <script type="application/ld+json">{JSON.stringify(schema)}</script>

      {/* Preconnect fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    </Helmet>
  )
}
