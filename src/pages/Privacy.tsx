import React from 'react';
import PageTransition from '../components/PageTransition';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-base font-semibold text-[#2C2416] mb-3">{title}</h2>
    <div className="text-sm text-[#7A6A56] leading-relaxed space-y-2">{children}</div>
  </div>
);

const Privacy: React.FC = () => (
  <PageTransition>
    <div className="pt-16 bg-[#FDFAF4] min-h-screen">
      <div className="bg-white border-b border-[#F0E6D3]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C2416]">Privacy Policy</h1>
          <p className="text-sm text-[#7A6A56] mt-1">Last updated: January 2025</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-[#F0E6D3] p-6 sm:p-8">
          <Section title="1. Information We Collect">
            <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This includes name, email address, phone number, shipping address, and payment information.</p>
            <p>We also collect data automatically when you use our website — including IP address, browser type, pages visited, and device information.</p>
          </Section>
          <Section title="2. How We Use Your Information">
            <p>We use your information to process orders, send order confirmations, provide customer support, send promotional communications (with your consent), and improve our website.</p>
          </Section>
          <Section title="3. Information Sharing">
            <p>We do not sell, trade, or share your personal information with third parties except as necessary to fulfill orders (shipping partners, payment processors) or as required by law.</p>
          </Section>
          <Section title="4. Data Security">
            <p>We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or misuse.</p>
          </Section>
          <Section title="5. Cookies">
            <p>We use cookies to enhance your browsing experience, remember your preferences, and analyze website traffic. You can control cookies through your browser settings.</p>
          </Section>
          <Section title="6. Contact Us">
            <p>For privacy-related queries, contact us at: privacy@varaahacashews.com</p>
          </Section>
        </div>
      </div>
    </div>
  </PageTransition>
);

export default Privacy;
