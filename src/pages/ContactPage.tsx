import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Save contact inquiry locally
    try {
      const existing = JSON.parse(localStorage.getItem('tx_contact') || '[]');
      existing.unshift({
        name,
        email,
        message,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('tx_contact', JSON.stringify(existing));
    } catch {
      // ignore
    }

    setSubmitted(true);
    showToast('Inquiry submitted! Our support team will respond shortly.', 'success');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
          Contact Customer Care
        </h1>
        <p className="text-xs sm:text-sm text-purple-300/70 max-w-md mx-auto">
          Have a question about an order, shipment, or item exchange? We&apos;re here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-[#130f24] border border-purple-900/40 space-y-5">
            <h3 className="text-base font-bold text-white border-b border-purple-900/30 pb-3">
              Direct Channels
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-purple-950 text-fuchsia-400 border border-purple-800/40 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-purple-400 block font-medium">Email Support</span>
                  <a
                    href="mailto:support@trevnixo.in"
                    className="text-white hover:text-fuchsia-400 font-semibold transition-colors"
                  >
                    support@trevnixo.in
                  </a>
                  <span className="text-[11px] text-purple-300/50 block mt-0.5">
                    Replies within 12 business hours
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-purple-950 text-fuchsia-400 border border-purple-800/40 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-purple-400 block font-medium">WhatsApp Assistance</span>
                  <span className="text-white font-semibold">+91 98200 45789</span>
                  <span className="text-[11px] text-purple-300/50 block mt-0.5">
                    Mon - Sat, 10:00 AM - 7:00 PM IST
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-purple-950 text-fuchsia-400 border border-purple-800/40 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-purple-400 block font-medium">Fulfillment Centers</span>
                  <span className="text-white font-semibold">
                    Andheri East, Mumbai & Okhla, New Delhi
                  </span>
                  <span className="text-[11px] text-purple-300/50 block mt-0.5">
                    India Logistics Hub
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-purple-950 text-fuchsia-400 border border-purple-800/40 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-purple-400 block font-medium">Operating Hours</span>
                  <span className="text-white font-semibold">
                    Monday to Saturday, 9:30 AM to 6:30 PM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-[#130f24] border border-purple-900/40 rounded-3xl p-6 sm:p-8 shadow-xl">
          <h3 className="text-base font-bold text-white mb-1">
            Send an Inquiry
          </h3>
          <p className="text-xs text-purple-300/70 mb-6">
            Fill in your details and our team will get back to you promptly.
          </p>

          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Message Received!</h3>
              <p className="text-xs text-purple-300/70 max-w-xs mx-auto">
                Thank you. We have logged your request and our support coordinator will contact you.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-semibold text-fuchsia-400 hover:text-fuchsia-300 underline cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-purple-200 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Vikram Verma"
                    className="w-full bg-[#18132e] text-xs sm:text-sm text-white px-3.5 py-2.5 rounded-xl border border-purple-800/40 focus:outline-none focus:border-fuchsia-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-purple-200 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vikram@example.com"
                    className="w-full bg-[#18132e] text-xs sm:text-sm text-white px-3.5 py-2.5 rounded-xl border border-purple-800/40 focus:outline-none focus:border-fuchsia-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-purple-200 mb-1">
                  Message or Order Reference *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us how we can help with your order or questions..."
                  className="w-full bg-[#18132e] text-xs sm:text-sm text-white p-3.5 rounded-xl border border-purple-800/40 focus:outline-none focus:border-fuchsia-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer transition-all active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
