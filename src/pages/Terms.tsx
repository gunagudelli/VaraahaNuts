import React from 'react';
import PageTransition from '../components/PageTransition';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-base font-semibold text-[#2C2416] mb-3">{title}</h2>
    <div className="text-sm text-[#7A6A56] leading-relaxed space-y-2">{children}</div>
  </div>
);

const Terms: React.FC = () => (
  <PageTransition>
    <div className="pt-16 bg-[#FDFAF4] min-h-screen">
      <div className="bg-white border-b border-[#F0E6D3]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C2416]">Terms & Conditions</h1>
          <p className="text-sm text-[#7A6A56] mt-1">Last updated: January 2025</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-[#F0E6D3] p-6 sm:p-8">
          <Section title="1. Acceptance of Terms">
            <p>By accessing and using the Varaaha Cashews website, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.</p>
          </Section>
          <Section title="2. Products & Pricing">
            <p>All prices are in Indian Rupees (INR) and include applicable taxes. We reserve the right to change prices without prior notice. Product images are for illustration purposes and may vary slightly from actual products.</p>
          </Section>
          <Section title="3. Orders & Payments">
            <p>By placing an order, you represent that you are authorized to use the payment method. Orders are confirmed only after payment verification. We reserve the right to cancel orders at our discretion.</p>
          </Section>
          <Section title="4. Shipping & Delivery">
            <p>We aim to dispatch orders within 24 hours. Delivery typically takes 3-5 business days. We are not responsible for delays caused by courier services or external factors.</p>
          </Section>
          <Section title="5. Returns & Refunds">
            <p>We offer a 7-day freshness guarantee. If the product quality does not meet our standards, we will replace or refund. Opened products are generally non-refundable unless defective.</p>
          </Section>
          <Section title="6. Intellectual Property">
            <p>All content on this website — including logos, images, and text — is the property of Varaaha Cashew Processing and may not be used without written permission.</p>
          </Section>
        </div>
      </div>
    </div>
  </PageTransition>
);

export default Terms;
