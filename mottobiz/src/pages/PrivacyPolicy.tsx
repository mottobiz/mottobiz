import { SEOHead } from '@/components/SEOHead'
import { SITE_URL, EMAIL, BUSINESS_NAME } from '@/lib/config'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const lastUpdated = 'April 16, 2026'

const sections = [
  {
    id: 'info-we-collect',
    title: 'Information We Collect',
    content: `We collect information you provide directly to us, including:

• Personal Information — When you submit our audit form, we collect your name, email address, WhatsApp number, and business type.
• Communication Data — When you contact us via WhatsApp, email, or phone, we retain the content of those communications.
• Usage Data — We automatically collect information about how you interact with our website, including pages visited, time spent, and navigation patterns.
• Device Information — We collect your device type, operating system, browser type, IP address, and approximate geographic location.`,
  },
  {
    id: 'how-we-use',
    title: 'How We Use Your Information',
    content: `We use the information we collect to:

• Respond to your inquiries and provide automation audit results
• Send you relevant updates about our services (only with your consent)
• Improve our website, services, and user experience
• Analyze website usage patterns to optimize content and functionality
• Protect against fraudulent or unauthorized activity
• Comply with legal obligations`,
  },
  {
    id: 'information-sharing',
    title: 'Information Sharing',
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your information only in these circumstances:

• Service Providers — We may share data with trusted third-party services that help us operate our website (hosting, analytics, form processing). These providers are bound by confidentiality agreements.
• Legal Requirements — We may disclose information when required by law, regulation, or legal process.
• Business Transfers — In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
• With Your Consent — We may share information when you have given us explicit permission to do so.`,
  },
  {
    id: 'cookies',
    title: 'Cookies & Tracking',
    content: `Our website uses cookies and similar technologies:

• Essential Cookies — Required for basic website functionality and security.
• Analytics Cookies — Help us understand how visitors interact with our website (we may use Google Analytics).
• Performance Cookies — Help us optimize page load times and user experience.

You can control cookie preferences through your browser settings. Disabling cookies may affect certain features of our website.`,
  },
  {
    id: 'data-security',
    title: 'Data Security',
    content: `We implement reasonable security measures to protect your personal information, including:

• SSL/TLS encryption for all data transmission
• Secure form submission with webhook-based processing
• Access controls limiting who can view your data
• Regular security reviews of our systems

While we strive to protect your information, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.`,
  },
  {
    id: 'data-retention',
    title: 'Data Retention',
    content: `We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected:

• Lead form submissions are retained for 12 months, then archived
• Communication records are retained for 24 months
• Analytics data is aggregated and anonymized after 26 months
• You may request deletion of your data at any time by contacting us`,
  },
  {
    id: 'your-rights',
    title: 'Your Rights',
    content: `Depending on your jurisdiction, you may have the following rights:

• Access — Request a copy of your personal data
• Correction — Request correction of inaccurate data
• Deletion — Request deletion of your personal data
• Portability — Request transfer of your data in a structured format
• Objection — Object to processing of your personal data
• Withdrawal — Withdraw consent at any time

To exercise any of these rights, contact us at ${EMAIL}.`,
  },
  {
    id: 'childrens-privacy',
    title: "Children's Privacy",
    content: `Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a person under 18, please contact us immediately and we will take steps to delete that information.`,
  },
  {
    id: 'third-party-links',
    title: 'Third-Party Links',
    content: `Our website may contain links to third-party websites, including WhatsApp and social media platforms. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.`,
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date. Your continued use of our website after changes constitutes acceptance of the updated policy.`,
  },
  {
    id: 'contact',
    title: 'Contact Us',
    content: `If you have questions about this Privacy Policy or our data practices, please contact us:

${BUSINESS_NAME}
Surat, Gujarat 395001, India
Email: ${EMAIL}
WhatsApp: +91 74879 57972

We aim to respond to all privacy-related inquiries within 48 hours.`,
  },
]

export function PrivacyPolicy() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <>
      <SEOHead
        title="Privacy Policy | MottoBiz"
        description="MottoBiz Privacy Policy — how we collect, use, and protect your personal information when you use our website and services."
        canonicalUrl={`${SITE_URL}/privacy`}
      />
      <main className="pt-28 sm:pt-36 pb-20 px-6">
        <div className="max-w-3xl mx-auto" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gradient">
              Privacy Policy
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
              At {BUSINESS_NAME}, we take your privacy seriously. This policy explains how we collect,
              use, disclose, and safeguard your information when you visit our website or use our services.
              Please read this policy carefully. By using our website, you consent to the data practices
              described herein.
            </p>
          </motion.div>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <motion.section
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.05 }}
                className="scroll-mt-24"
              >
                <h2 className="font-display text-xl sm:text-2xl font-semibold text-white mb-4">
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