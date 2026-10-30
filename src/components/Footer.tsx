import React from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/products';
import { ShieldCheck, Truck, RefreshCw, MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useStore();

  return (
    <footer className="bg-[#080611] text-purple-200/80 border-t border-purple-900/30 pt-12 pb-8">
      {/* Service Value Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-12 border-b border-purple-900/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="p-2.5 rounded-xl bg-purple-950/70 text-fuchsia-400 border border-purple-800/40">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white tracking-wide uppercase">
                Fast Dispatch
              </h4>
              <p className="text-xs text-purple-300/60 mt-0.5">
                Shipped within 24-48 hours across India.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="p-2.5 rounded-xl bg-purple-950/70 text-fuchsia-400 border border-purple-800/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white tracking-wide uppercase">
                Cash on Delivery
              </h4>
              <p className="text-xs text-purple-300/60 mt-0.5">
                Inspect package before payment.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="p-2.5 rounded-xl bg-purple-950/70 text-fuchsia-400 border border-purple-800/40">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white tracking-wide uppercase">
                Easy Replacement
              </h4>
              <p className="text-xs text-purple-300/60 mt-0.5">
                Hassle-free 5-day exchange support.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <div className="p-2.5 rounded-xl bg-purple-950/70 text-fuchsia-400 border border-purple-800/40">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white tracking-wide uppercase">
                Direct Support
              </h4>
              <p className="text-xs text-purple-300/60 mt-0.5">
                Dedicated WhatsApp & email assistance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Links Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-8 pb-12">
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black font-display tracking-tight bg-gradient-to-r from-white via-purple-100 to-fuchsia-300 bg-clip-text text-transparent">
              TREVNIXO
            </span>
          </div>
          <p className="text-xs text-purple-300/70 leading-relaxed max-w-sm">
            Smart Finds. Everyday Life. We curate innovative, problem-solving, and
            daily utility items that make living simpler, smarter, and more exciting.
          </p>
          <div className="text-xs text-purple-400/80 font-mono">
            Direct Store Dispatch · Mumbai & Delhi Hubs
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Explore
          </h4>
          <ul className="space-y-1.5 text-xs text-purple-300/70">
            {CATEGORIES.slice(0, 6).map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => navigate('category', { slug: cat.slug })}
                  className="hover:text-fuchsia-400 transition-colors cursor-pointer text-left"
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            More Categories
          </h4>
          <ul className="space-y-1.5 text-xs text-purple-300/70">
            {CATEGORIES.slice(6).map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => navigate('category', { slug: cat.slug })}
                  className="hover:text-fuchsia-400 transition-colors cursor-pointer text-left"
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Care / Legal */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Customer Care
          </h4>
          <ul className="space-y-1.5 text-xs text-purple-300/70">
            <li>
              <button
                onClick={() => navigate('contact')}
                className="hover:text-fuchsia-400 transition-colors cursor-pointer"
              >
                Contact Us
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('feedback')}
                className="hover:text-fuchsia-400 transition-colors cursor-pointer"
              >
                Submit Feedback
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('shipping')}
                className="hover:text-fuchsia-400 transition-colors cursor-pointer"
              >
                Shipping Policy
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('returns')}
                className="hover:text-fuchsia-400 transition-colors cursor-pointer"
              >
                Returns & Replacement
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('privacy')}
                className="hover:text-fuchsia-400 transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('terms')}
                className="hover:text-fuchsia-400 transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar & Prototype Notice */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-purple-900/30 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-purple-400/50">
        <div>
          © {new Date().getFullYear()} TREVNIXO. Smart Finds. Everyday Life. All rights reserved.
        </div>
        <div className="text-[11px] text-center md:text-right text-purple-400/60 max-w-lg">
          Prototype Store Notice: This is a frontend architectural build for TREVNIXO. Real supplier inventory APIs and Razorpay gateways can be integrated seamlessly.
        </div>
      </div>
    </footer>
  );
};
