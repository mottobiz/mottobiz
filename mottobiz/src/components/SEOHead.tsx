import { Helmet } from 'react-helmet-async'
import {
  SITE_URL, EMAIL, WHATSAPP_NUMBER,
  BUSINESS_LAT, BUSINESS_LNG, BUSINESS_POSTAL_CODE,
  SERVICE_AREAS,
} from '@/lib/config'

// Enhanced LocalBusiness schema with additional properties
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'MottoBiz',
  url: SITE_URL,
  logo: `${SITE_URL}/logo-static.svg`,
  image: `${SITE_URL}/logo-wordmark.svg`,
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
  areaServed: [
    { 
      '@type': 'City', 
      name: 'Surat',
      '@id': 'https://en.wikipedia.org/wiki/Surat',
      containedInPlace: {
        '@type': 'State',
        name: 'Gujarat',
      }
    },
    // Add all neighborhoods as service areas
    ...SERVICE_AREAS.map(area => ({
      '@type': 'Place',
      name: area.name,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: area.lat,
        longitude: area.lng,
      },
    })),
  ],
  serviceType: [
    'Business Automation', 
    'Web Development', 
    'AI Automation',
    'Workflow Automation', 
    'Social Media Automation', 
    'WhatsApp Automation',
    'Business Intelligence',
    'Lead Pipeline Automation',
  ],
  priceRange: '₹₹',
  telephone: `+${WHATSAPP_NUMBER}`,
  email: EMAIL,
  openingHours: ['Mo-Fr 09:00-18:00', 'Sa 10:00-14:00'],
  sameAs: [
    'https://www.instagram.com/mottobiz',
    `https://wa.me/${WHATSAPP_NUMBER}`,
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Business Automation Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Smart Website Development',
          description: 'High-converting, SEO-optimized websites with lead capture for Surat businesses',
          areaServed: SERVICE_AREAS.map(a => a.name).concat(['Surat', 'Gujarat']),
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI Automation',
          description: 'WhatsApp auto-replies, follow-ups, and intelligent workflows for small businesses',
          areaServed: SERVICE_AREAS.map(a => a.name).concat(['Surat', 'Gujarat']),
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Social Media Automation',
          description: 'Automated content creation and scheduling across multiple platforms',
          areaServed: SERVICE_AREAS.map(a => a.name).concat(['Surat', 'Gujarat']),
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Business Intelligence',
          description: 'Analytics dashboards and reporting systems to track business performance',
          areaServed: SERVICE_AREAS.map(a => a.name).concat(['Surat', 'Gujarat']),
        },
      },
    ],
  },
  // AI-friendly additional properties
  knowsAbout: [
    'Business Process Automation',
    'AI Workflow Automation',
    'WhatsApp Business Automation',
    'Social Media Marketing Automation',
    'Small Business Digital Transformation',
    'n8n Automation',
    'Make.com Automation',
    'Surat Business Technology',
    'Gujarat Small Business Solutions',
  ],
  foundingDate: '2024',
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    value: '2-10',
  },
  currenciesAccepted: 'INR',
  paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer', 'UPI'],
  languages: ['English', 'Hindi', 'Gujarati'],
}

// FAQPage schema for rich snippets
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does business automation cost in Surat?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MottoBiz operates on a retainer model with a monthly fee covering management and updates. Exact quotes are provided after a free 30-minute audit of your business needs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will I become dependent on MottoBiz for automation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. After one year, complete handover is optional. We document everything and provide training so you can manage your systems independently if desired.',
      },
    },
    {
      '@type': 'Question',
      name: 'I am not technical. Will automation work for my business?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our automation solutions are built specifically for non-technical business owners. You do not need to touch any technology — we run everything for you.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide support in Hindi or Gujarati?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All communication, calls, and documentation are available in Hindi or Gujarati to serve Surat and Gujarat business owners in their preferred language.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens after the first year of service?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'After year one, you have three options: continue on retainer, take full ownership of your systems, or upgrade to advanced services. There is no lock-in.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to see results from automation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lead automation typically shows results in 2-4 weeks. Full system implementation and optimization takes 60-90 days for complete workflow automation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need an existing website to use your services?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. We can build a new website from scratch. If you already have one, we will evaluate it and either improve the existing site or rebuild it for optimal automation.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many clients do you work with at a time?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We maintain a maximum of 5-8 active clients at any time to ensure quality over quantity and provide personalized attention to each business.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which areas in Surat do you serve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `We serve all major areas of Surat including Varachha, Adajan, Vesu, Piplod, Athwa, Ghod Dod Road, City Light, Parle Point, Nanpura, Katargam, Udhna, Rander, and surrounding neighborhoods.`,
      },
    },
  ],
}

// WebSite schema for entity recognition
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'MottoBiz',
  url: SITE_URL,
}

// Organization schema for AI entity recognition
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'MottoBiz',
  alternateName: 'MottoBiz AI Automation Studio',
  url: SITE_URL,
  logo: `${SITE_URL}/logo-static.svg`,
  sameAs: [
    'https://www.instagram.com/mottobiz',
    `https://wa.me/${WHATSAPP_NUMBER}`,
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: `+${WHATSAPP_NUMBER}`,
    contactType: 'customer service',
    availableLanguage: ['English', 'Hindi', 'Gujarati'],
    areaServed: ['IN-GJ', 'Surat'],
  },
}

// Service schema for detailed service information
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Business Automation',
  provider: {
    '@type': 'LocalBusiness',
    name: 'MottoBiz',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Surat',
      addressRegion: 'Gujarat',
      addressCountry: 'IN',
    },
  },
  areaServed: SERVICE_AREAS.map(area => ({
    '@type': 'Place',
    name: area.name,
  })),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Automation Services',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Business Automation',
            description: 'Automate WhatsApp, social media, and workflows for small businesses',
          },
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Smart Website Development',
            description: 'SEO-optimized websites with lead capture for Surat businesses',
          },
        },
      },
    ],
  },
}

// Local SEO - Place schema for Surat
const placeSchema = {
  '@context': 'https://schema.org',
  '@type': 'Place',
  name: 'Surat, Gujarat',
  geo: {
    '@type': 'GeoCoordinates',
    latitude: BUSINESS_LAT,
    longitude: BUSINESS_LNG,
  },
  containsPlace: SERVICE_AREAS.map(area => ({
    '@type': 'Place',
    name: area.name,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: area.lat,
      longitude: area.lng,
    },
  })),
}

interface SEOHeadProps {
  title?: string
  description?: string
  canonicalUrl?: string
  ogImage?: string
}

export function SEOHead({ 
  title = 'Business Automation & Web Design in Surat | MottoBiz',
  description = "MottoBiz helps solopreneurs and small businesses in Surat automate their daily operations — WhatsApp follow-ups, social media, lead pipelines — without hiring a team. Book a free 30-min audit.",
  canonicalUrl = SITE_URL,
  ogImage = `${SITE_URL}/og-image.png`
}: SEOHeadProps = {}) {
  const isHomePage = canonicalUrl === SITE_URL

  return (
    <Helmet>
      <title>{title}</title>
      <meta
        name="description"
        content={description}
      />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="MottoBiz" />
      <link rel="canonical" href={canonicalUrl} />

      {/* AI Search Optimization Meta Tags */}
      <meta name="AI-friendly" content="true" />
      <meta name="content-type" content="business-service" />
      <meta name="last-modified" content="2026-04-13" />
      
      {/* Open Graph */}
      <meta property="og:type" content={isHomePage ? 'business.business' : 'article'} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:site_name" content="MottoBiz" />
      <meta property="business:contact_data:locality" content="Surat" />
      <meta property="business:contact_data:region" content="Gujarat" />
      <meta property="business:contact_data:country_name" content="India" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Local SEO - Enhanced Geo Tags */}
      <meta name="geo.region" content="IN-GJ" />
      <meta name="geo.placename" content="Surat" />
      <meta name="geo.position" content={`${BUSINESS_LAT};${BUSINESS_LNG}`} />
      <meta name="ICBM" content={`${BUSINESS_LAT}, ${BUSINESS_LNG}`} />
      
      {/* Service Areas for Local SEO */}
      <meta name="service-area" content="Surat, Gujarat, India" />
      <meta name="service-area" content="Varachha, Surat" />
      <meta name="service-area" content="Adajan, Surat" />
      <meta name="service-area" content="Vesu, Surat" />
      <meta name="service-area" content="Piplod, Surat" />
      <meta name="service-area" content="Athwa, Surat" />
      <meta name="service-area" content="Ghod Dod Road, Surat" />
      <meta name="service-area" content="City Light, Surat" />
      <meta name="service-area" content="Parle Point, Surat" />
      <meta name="service-area" content="Nanpura, Surat" />
      <meta name="service-area" content="Katargam, Surat" />
      <meta name="service-area" content="Udhna, Surat" />
      <meta name="service-area" content="Rander, Surat" />

      {/* Language and Locale */}
      <meta name="language" content="English, Hindi, Gujarati" />
      <meta name="coverage" content="Surat, Gujarat, India" />

      {/* Schema Markup */}
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      {isHomePage && (
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      )}
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(placeSchema)}</script>

      {/* Preconnect fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      
      {/* llms.txt reference for AI systems */}
      <link rel="alternate" type="text/plain" title="LLM Context" href={`${SITE_URL}/llms.txt`} />
      
      {/* Pricing reference for AI agents */}
      <link rel="alternate" type="text/markdown" title="Pricing Information" href={`${SITE_URL}/pricing.md`} />
    </Helmet>
  )
}
