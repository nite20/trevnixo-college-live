import React from 'react';
import { ArrowLeft, ShieldCheck, Truck, RotateCcw, Lock } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface PolicyWrapperProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const PolicyWrapper: React.FC<PolicyWrapperProps> = ({ title, subtitle, children }) => {
  const { navigate } = useStore();
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <div>
        <button
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-purple-300 hover:text-white transition-colors cursor-pointer mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Store</span>
        </button>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-purple-300/60 mt-1">{subtitle}</p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-[#130f24] border border-purple-900/40 text-xs sm:text-sm text-purple-200/80 space-y-6 leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export const AboutPage: React.FC = () => {
  return (
    <PolicyWrapper
      title="About TREVNIXO"
      subtitle="Smart Finds. Everyday Life."
    >
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white">Our Philosophy</h2>
        <p>
          TREVNIXO was built around one simple observation: modern e-commerce has become crowded with endless low-quality catalogs, deceptive countdowns, and products that fail within days of arrival.
        </p>
        <p>
          We curate everyday essentials that deliver tangible utility—whether it&apos;s an ergonomic magnetic phone holder that stays locked over bumpy city roads, a personal portable blender for post-workout smoothies, or minimalist eye-care lighting for late-night desk study.
        </p>

        <h2 className="text-base font-bold text-white pt-2">The Zero-Inventory Model</h2>
        <p>
          As a zero-inventory and modern direct-reselling brand, TREVNIXO bridges certified local manufacturers and trusted warehouse distribution hubs straight to Indian consumers. By eliminating bloated retail overhead and middlemen markups, we ensure fair pricing and swift dispatch.
        </p>

        <h2 className="text-base font-bold text-white pt-2">Transparent Prototype Standards</h2>
        <p className="text-purple-300/60 text-xs">
          Notice: This application is a fully functional digital storefront prototype for TREVNIXO. Real logistics APIs (Delhivery/Shiprocket) and Razorpay payment gateways are structured for straightforward plug-and-play production activation.
        </p>
      </div>
    </PolicyWrapper>
  );
};

export const ShippingPolicyPage: React.FC = () => {
  return (
    <PolicyWrapper
      title="Shipping & Delivery Policy"
      subtitle="Transparent rates and swift nationwide fulfillment."
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-purple-950/60 border border-purple-800/40 text-white">
          <Truck className="w-6 h-6 text-fuchsia-400 shrink-0" />
          <div>
            <div className="font-bold text-sm">Delivery Fee: ₹49 Flat Rate</div>
            <div className="text-xs text-purple-200/80">
              Free Express Shipping automatically unlocked on all orders of ₹999 or above!
            </div>
          </div>
        </div>

        <h2 className="text-base font-bold text-white pt-2">Fulfillment Timelines</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-purple-200/80">
          <li>Orders are processed and verified within 24 to 48 business hours.</li>
          <li>Standard transit time across tier-1 & tier-2 Indian cities is 2 to 4 business days.</li>
          <li>Remote or rural pincodes may require 4 to 6 business days.</li>
        </ul>

        <h2 className="text-base font-bold text-white pt-2">Cash on Delivery (COD)</h2>
        <p>
          Cash on Delivery is available across 18,000+ Indian pincodes. Our delivery partners will collect the exact invoice amount in cash or offer a dynamic UPI QR code on their delivery terminal upon package handover.
        </p>
      </div>
    </PolicyWrapper>
  );
};

export const ReturnsPolicyPage: React.FC = () => {
  return (
    <PolicyWrapper
      title="Returns & Replacement Policy"
      subtitle="Hassle-free 5-day exchange support."
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-purple-950/60 border border-purple-800/40 text-white">
          <RotateCcw className="w-6 h-6 text-fuchsia-400 shrink-0" />
          <div>
            <div className="font-bold text-sm">5-Day Replacement Guarantee</div>
            <div className="text-xs text-purple-200/80">
              Received a damaged or defective item? We arrange a swift replacement.
            </div>
          </div>
        </div>

        <h2 className="text-base font-bold text-white pt-2">Eligibility for Replacement</h2>
        <p>
          To qualify for a free replacement, the item must be reported within 5 days of confirmed delivery with:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-purple-200/80">
          <li>Original brand packaging and all included accessories/cords intact</li>
          <li>Brief photo/video proof demonstrating transit damage or manufacturing defect</li>
          <li>Valid order reference number (e.g. TX-XXXXXX)</li>
        </ul>

        <h2 className="text-base font-bold text-white pt-2">Resolution Process</h2>
        <p>
          Once our support coordinator verifies the reported defect via WhatsApp or email, a replacement package will be dispatched with priority courier routing.
        </p>
      </div>
    </PolicyWrapper>
  );
};

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <PolicyWrapper
      title="Privacy Policy"
      subtitle="Respecting and securing your shopper data."
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-purple-950/60 border border-purple-800/40 text-white">
          <Lock className="w-6 h-6 text-fuchsia-400 shrink-0" />
          <div>
            <div className="font-bold text-sm">Zero Data Selling</div>
            <div className="text-xs text-purple-200/80">
              We never sell or distribute your private contact details to spam aggregators.
            </div>
          </div>
        </div>

        <h2 className="text-base font-bold text-white pt-2">Data Collected</h2>
        <p>
          When placing an order or submitting feedback on TREVNIXO, we collect your full name, shipping destination, phone number, and email address strictly for logistics execution and order confirmation communication.
        </p>

        <h2 className="text-base font-bold text-white pt-2">Local Prototype Storage</h2>
        <p>
          In this frontend prototype, order details, cart contents, and feedback are safely maintained in browser localStorage (<code className="text-fuchsia-300">tx_cart</code>, <code className="text-fuchsia-300">tx_wish</code>, <code className="text-fuchsia-300">tx_order</code>, <code className="text-fuchsia-300">tx_feedback</code>).
        </p>
      </div>
    </PolicyWrapper>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <PolicyWrapper
      title="Terms & Conditions"
      subtitle="Standard terms governing usage of TREVNIXO store."
    >
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white">Store Usage</h2>
        <p>
          By browsing or interacting with TREVNIXO, you agree to submit genuine shipping addresses and contact phone numbers for cash-on-delivery order fulfillment.
        </p>

        <h2 className="text-base font-bold text-white pt-2">Product Information & Pricing</h2>
        <p>
          All product descriptions, maximum retail prices (MRP), and offer pricing are calibrated to represent realistic market standards for zero-inventory e-commerce curation.
        </p>

        <h2 className="text-base font-bold text-white pt-2">Prototype Disclaimer</h2>
        <p className="text-purple-300/60 text-xs">
          Notice: This application is a client-side architecture showcase built for the TREVNIXO brand. Orders generated produce demo receipts and records in client state.
        </p>
      </div>
    </PolicyWrapper>
  );
};
