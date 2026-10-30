import React, { useState } from 'react';
import { MessageSquarePlus, X, Star, Send } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FloatingFeedback: React.FC = () => {
  const { submitFeedback, navigate } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Product Suggestion');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    submitFeedback({
      name: name.trim() || 'Anonymous Shopper',
      email: email.trim(),
      topic,
      rating,
      message: message.trim(),
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
      setMessage('');
      setName('');
      setEmail('');
    }, 1800);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-40 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white px-3.5 py-2.5 rounded-full shadow-[0_4px_20px_rgba(217,70,239,0.4)] flex items-center gap-2 text-xs font-semibold tracking-wide cursor-pointer transition-all hover:scale-105"
        aria-label="Give Website Feedback"
      >
        <MessageSquarePlus className="w-4 h-4" />
        <span className="hidden sm:inline">Feedback</span>
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-[#130f24] border border-purple-500/30 rounded-2xl p-6 shadow-2xl text-white">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-purple-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold font-display text-white">
              Share Your Thoughts
            </h3>
            <p className="text-xs text-purple-300/70 mt-1 mb-4">
              Help us refine the TREVNIXO shopping experience.
            </p>

            {submitted ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Star className="w-6 h-6 fill-current" />
                </div>
                <h4 className="text-sm font-semibold text-white">Feedback Saved!</h4>
                <p className="text-xs text-purple-300/70">
                  Thank you for helping us build a better everyday store.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-purple-200/80 mb-1">
                    Your Rating
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 text-purple-400 hover:text-amber-400 transition-colors"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-purple-700'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-purple-200/80 mb-1">
                      Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex"
                      className="w-full bg-[#1b1532] text-xs text-white px-3 py-2 rounded-xl border border-purple-800/40 focus:outline-none focus:border-fuchsia-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-purple-200/80 mb-1">
                      Topic
                    </label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full bg-[#1b1532] text-xs text-white px-2.5 py-2 rounded-xl border border-purple-800/40 focus:outline-none focus:border-fuchsia-500"
                    >
                      <option value="Product Suggestion">Product Suggestion</option>
                      <option value="Website Design">Website Design</option>
                      <option value="Checkout & Delivery">Checkout & Delivery</option>
                      <option value="General Query">General Query</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-purple-200/80 mb-1">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you liked or what products you want to see..."
                    className="w-full bg-[#1b1532] text-xs text-white p-3 rounded-xl border border-purple-800/40 focus:outline-none focus:border-fuchsia-500 resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      navigate('feedback');
                    }}
                    className="text-xs text-purple-400 hover:text-fuchsia-300 underline"
                  >
                    Open Full Page
                  </button>

                  <button
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
