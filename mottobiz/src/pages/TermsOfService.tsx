import { SEOHead } from '@/components/SEOHead'
import { SITE_URL, EMAIL, BUSINESS_NAME, WHATSAPP_NUMBER } from '@/lib/config'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const lastUpdated = 'April 16, 2026'

const sections = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    content: `By accessing or using the ${BUSINESS_NAME} website and services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our website or services. These terms apply to all visitors, users, and clients of ${BUSINESS_NAME}.`,
  },
  {
    id: 'services',
    title: 'Services Description',
    content: `${BUSINESS_NAME} provides business automation services including, but not limited to:

• Smart Website Development — Design, development, and optimization of business websites with lead capture and SEO features.
• AI Automation — Setup and management of automated workflows, WhatsApp auto-responses, and AI-powered business processes.
• Social Media Automation — Content creation, scheduling, and management across social media platforms.
• Business Intelligence — Setup of analytics dashboards and reporting systems for business insights.
• Workflow Automation — Integration and automation of business processes using tools like n8n and Make.
• Lead Pipeline Management — CRM integration, lead scoring, and automated routing systems.

The specific scope of services is defined in individual service agreements or proposals provided to each client.`,
  },
  {
    id: 'engagement',
    title: 'Client Engagement',
    content: `Before engaging our services, we conduct a free 30-minute automation audit to understand your business needs. Following the audit:

• A detailed proposal will be provided outlining scope, timeline, and pricing
• Services begin only after written acceptance of the proposal
• We maintain a maximum of 5–8 active clients at any time to ensure quality
• All communication is available in English, Hindi, and Gujarati`,
  },
  {
    id: 'pricing-payment',
    title: 'Pricing & Payment',
    content: `• Our services operate on a monthly retainer model. Specific pricing is provided in individual proposals.
• Payment terms are specified in the service agreement.
• All prices are in Indian Rupees (INR) unless otherwise stated.
• We accept payment via bank transfer, UPI, credit card, and cash.
• Late payments may incur interest at 1.5% per month on outstanding balances.
• ${BUSINESS_NAME} reserves the right to adjust pricing with 30 days' written notice.`,
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    content: `• All content on the ${BUSINESS_NAME} website — including text, graphics, logos, images, and software — is our property or the property of our content suppliers and is protected by Indian and international copyright laws.
• The ${BUSINESS_NAME} logo, brand name, and service marks are our exclusive trademarks.
• You may not reproduce, distribute, modify, or republish any content from our website without prior written consent.
• After the first year of service, clients may request full ownership transfer of automation systems built specifically for them, as outlined in their service agreement.`,
  },
  {
    id: 'client-responsibilities',
    title: 'Client Responsibilities',
    content: `As a client, you agree to:

• Provide accurate and complete information necessary for service delivery
• Respond to requests for feedback or approval within reasonable timeframes
• Ensure you have the right to provide any content, data, or materials you share with us
• Maintain the security of any login credentials or access provided
• Review and test deliverables within agreed-upon timeframes
• Inform us promptly of any changes that may affect the scope of work`,
  },
  {
    id: 'confidentiality',
    title: 'Confidentiality',
    content: `Both parties agree to keep confidential all non-public information shared during the engagement:

• ${BUSINESS_NAME} will not disclose client business data, strategies, or trade secrets to third parties without consent.
• Clients will not disclose ${BUSINESS_NAME}'s proprietary methods, templates, or pricing to competitors.
• Confidentiality obligations survive the termination of the service agreement.
• This does not apply to information that becomes publicly available through no fault of the receiving party.`,
  },
  {
    id: 'limitations',
    title: 'Limitation of Liability',
    content: `• ${BUSINESS_NAME} provides services on an "as is" basis without warranties of any kind, either express or implied.
• We are not liable for any indirect, incidental, special, or consequential damages arising from the use of our services.
• Our total liability for any claim shall not exceed the amount paid by the client for the specific service in question during the prior 3-month period.
• We are not responsible for downtime, data loss, or service interruptions caused by third-party platforms (WhatsApp, social media, hosting providers, etc.).
• We are not liable for any loss of revenue, data, or business opportunities resulting from the use of our services.`,
  },
  {
    id: 'termination',
    title: 'Termination',
    content: `• Either party may terminate the service agreement with 30 days' written notice.
• ${BUSINESS_NAME} reserves the right to terminate services immediately if a client breaches these terms, engages in illegal activity, or fails to make payments.
• Upon termination:
  — All outstanding fees become immediately due
  — Access to any ${BUSINESS_NAME}-managed systems will be transitioned per the service agreement
  — Confidentiality obligations continue apply
  — Up to 90 days will be provided for system handover or migration`,
  },
  {
    id: 'dispute-resolution',
    title: 'Dispute Resolution',
    content: `• Any disputes arising from these terms or our services shall first be attempted to be resolved through good-faith negotiation.
• If negotiation fails, disputes will be referred to mediation in Surat, Gujarat.
• These Terms of Service are governed by the laws of India, and any legal proceedings shall be subject to the exclusive jurisdiction of the courts in Surat, Gujarat.`,
  },
  {
    id: 'modifications',
    title: 'Modifications to Terms',
    content: `${BUSINESS_NAME} reserves the right to modify these Terms of Service at any time. Changes will be effective when posted on this page with an updated "Last Updated" date. Continued use of our services after modifications constitutes acceptance of the revised terms. We will make reasonable efforts to notify existing clients of material changes via email or WhatsApp.`,
  },
  {
    id: 'contact-terms',
    title: 'Contact',
    content: `For questions about these Terms of Service, please contact us:

${BUSINESS_NAME}
Surat, Gujarat 395001, India
Email: ${EMAIL}
WhatsApp: +${WHATSAPP_NUMBER}

We aim to respond to all inquiries within 48 business hours.`,
  },
]

export function TermsOfService() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <>
      <SEOHead
        title="Terms of Service | MottoBiz"
        description="MottoBiz Terms of Service — the rules and guidelines governing your use of our website and business automation services."
        canonicalUrl={`${SITE_URL}/terms`}
      />
      <main className="pt-28 sm:pt-36 pb-20 px-6">
        <div className="max-w-3xl mx-auto" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gradient">
              Terms of Service
            </h1>
            <p className="text-white/40 text-sm mb-12">Last updated: {lastUpdated}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <p className="text-white/60 leading-relaxed">
              Welcome to {BUSINESS_NAME}. These Terms of Service govern your use of our website and
              business automation services. By using our website or engaging our services, you agree
              to these terms. Please read them carefully before proceeding.
            </p>
          </motion.div>

          {/* Table of contents */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-16 p-6 sm:p-8 glass rounded-2xl"
          >
            <h2 className="font-display text-lg font-semibold text-white mb-4">Contents</h2>
            <ol className="space-y-2">
              {sections.map((section, i) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-sm text-white/50 hover:text-indigo-400 transition-colors"
                  >
                    <span className="text-white/30 mr-2">{i + 1}.</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </motion.nav>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <motion.section
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.04 }}
                className="scroll-mt-24"
              >
                <h2 className="font-display text-xl sm:text-2xl font-semibold text-white mb-4">
                  <span className="text-indigo-400 mr-2">{i + 1}.</span>
                  {section.title}
                </h2>
                <div className="text-white/60 leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </motion.section>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 pt-8 border-t border-white/5 text-center"
          >
            <p className="text-white/30 text-sm">
              &copy; {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
            </p>
          </motion.div>
        </div>
      </main>
    </>
  )
}