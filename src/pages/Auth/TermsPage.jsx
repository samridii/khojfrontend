import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: `By creating an account or using the KHOJ platform, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the platform. KHOJ reserves the right to update these terms at any time, and continued use of the platform constitutes acceptance of any revised terms.`,
  },
  {
    title: "2. Use of the Platform",
    body: `KHOJ is a cultural discovery platform designed to connect users with the heritage communities, craft traditions, and experiential workshops of Nepal. You agree to use the platform only for lawful purposes and in a manner that does not infringe the rights of others. You must not misuse, reproduce, or redistribute content without prior written consent.`,
  },
  {
    title: "3. User Accounts",
    body: `You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate and complete information during registration and to keep your account details up to date. KHOJ is not liable for any loss or damage arising from unauthorised use of your account.`,
  },
  {
    title: "4. Workshop Bookings",
    body: `Workshop bookings made through KHOJ are subject to availability and artisan confirmation. Payment is collected at the venue unless otherwise stated. Cancellations must be made at least 48 hours in advance. KHOJ acts as a platform connecting users with artisans and is not directly responsible for the conduct of individual workshop sessions.`,
  },
  {
    title: "5. Intellectual Property",
    body: `All content on the KHOJ platform, including text, images, logos, and cultural documentation, is the property of KHOJ or its content contributors. You may not reproduce, distribute, or create derivative works from any platform content without explicit permission. Cultural heritage content is shared with respect for the communities that own it.`,
  },
  {
    title: "6. Privacy and Data",
    body: `Your use of KHOJ is also governed by our Privacy Policy. We collect personal information including your name, email address, and usage data to provide and improve our services. We do not sell your personal data to third parties. All data is processed in accordance with applicable data protection laws.`,
  },
  {
    title: "7. AI-Generated Content",
    body: `KHOJ uses artificial intelligence to generate cultural recommendations and journey itineraries. AI outputs are provided as suggestions only and do not constitute professional travel advice. KHOJ makes no warranty regarding the accuracy or completeness of AI-generated content. Users are encouraged to verify recommendations independently before acting on them.`,
  },
  {
    title: "8. Limitation of Liability",
    body: `KHOJ is provided on an "as is" basis without warranties of any kind. To the fullest extent permitted by law, KHOJ shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform, including but not limited to loss of data, loss of revenue, or damage to reputation.`,
  },
  {
    title: "9. Cultural Responsibility",
    body: `Users of KHOJ are expected to engage with Nepali cultural content and community experiences with respect, sensitivity, and ethical awareness. KHOJ promotes sustainable and responsible cultural tourism. Users are asked to follow the etiquette guidelines provided by artisans and community hosts during workshop and studio visits.`,
  },
  {
    title: "10. Governing Law",
    body: `These Terms and Conditions are governed by the laws of Nepal. Any disputes arising from your use of the KHOJ platform shall be subject to the exclusive jurisdiction of the courts of Kathmandu, Nepal.`,
  },
  {
    title: "11. Contact",
    body: `If you have any questions about these Terms and Conditions, please contact us at legal@khoj.np or write to KHOJ Heritage Platform, Kathmandu, Nepal.`,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ background: "#FAF7F2" }}>

      {/* Header */}
      <div className="border-b border-[#E8E2D8]" style={{ background: "#F5F0E8" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10 py-10 space-y-3">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 font-body text-sm text-ink-muted hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} /> Back to Sign Up
          </Link>
          <div className="space-y-1">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[3px] text-copper">
              Legal
            </p>
            <h1 className="font-display font-bold text-4xl text-ink">
              Terms and Conditions
            </h1>
            <p className="font-body text-sm text-ink-muted">
              Last updated: July 2025
            </p>
          </div>
        </div>
      </div>

      {/* Intro */}
      <div className="max-w-3xl mx-auto px-6 lg:px-10 py-10">
        <div className="border-l-4 border-copper pl-5 mb-10">
          <p className="font-body text-sm text-ink-muted leading-relaxed">
            These Terms and Conditions govern your use of the KHOJ cultural discovery platform. By accessing or using KHOJ, you confirm that you have read, understood, and agreed to be bound by these terms. Please read them carefully before creating an account or using any features of the platform.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {SECTIONS.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="space-y-3 pb-8 border-b border-[#E8E2D8] last:border-0"
            >
              <h2 className="font-display font-bold text-lg text-ink">
                {section.title}
              </h2>
              <p className="font-body text-sm text-ink-muted leading-relaxed">
                {section.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 p-6 border border-[#E8E2D8] bg-white text-center space-y-3">
          <p className="font-display font-bold text-base text-ink">
            Ready to explore Nepal deeply?
          </p>
          <p className="font-body text-sm text-ink-muted">
            By creating your account you confirm agreement to these terms.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-primary-light transition-colors"
          >
            Create Account <ArrowLeft size={14} className="rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}