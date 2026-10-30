import React, { useState } from 'react';
import { Star, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FeedbackPage: React.FC = () => {
  const { submitFeedback, feedbacks, navigate, showToast } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Product Suggestion');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const cleanName = name.trim();
    if (cleanName && !/^[\p{L}\p{M} .'-]{2,60}$/u.test(cleanName)) {
      showToast('Name must contain letters and spaces only.', 'error');
      return;
    }
    const feedbackRecord = {
      name: cleanName || 'Anonymous Shopper',
      email: email.trim(),
      topic,
      rating,
      message: message.trim(),
    };
    submitFeedback(feedbackRecord);
    // Persist a copy to the local Express demo API. The UI still works if the API is offline.
    void fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedbackRecord),
    }).then(async (response) => {
      if (!response.ok) throw new Error('API rejected feedback');
      showToast('Feedback saved to backend JSON file.', 'success');
    }).catch((error) => {
      console.error('Feedback backend save failed:', error);
      showToast('Feedback saved in this browser only; check that API server is running.', 'error');
    });

    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-700/40 text-purple-300 text-xs">
          <MessageSquare className="w-3.5 h-3.5 text-fuchsia-400" />
          <span>Customer Voice</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black font-display text-white">
          We Value Your Feedback
        </h1>
        <p className="text-xs sm:text-sm text-purple-300/70 max-w-lg mx-auto">
          Help us curate better products and refine our everyday shopping experience.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Feedback Form */}
        <div className="lg:col-span-7 bg-[#130f24] border border-purple-900/40 rounded-3xl p-6 sm:p-8 shadow-xl">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Thank You!</h3>
              <p className="text-xs text-purple-300/70 max-w-xs mx-auto">
                Your feedback has been submitted. Backend persistence depends on the local API server being online.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-semibold text-fuchsia-400 hover:text-fuchsia-300 underline cursor-pointer"
              >
                Send Another Response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-purple-200 mb-1.5">
                  How was your experience? *
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-purple-800'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-purple-300/60 ml-2">
                    {rating === 5
                      ? 'Excellent'
                      : rating === 4
                      ? 'Good'
                      : rating === 3
                      ? 'Average'
                      : 'Needs Improvement'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-purple-200 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    maxLength={60}
                    value={name}
                    onChange={(e) => setName(e.target.value.replace(/[^\p{L}\p{M} .'-]/gu, ''))}
                    placeholder="e.g. Ananya"
                    className="w-full bg-[#18132e] text-xs sm:text-sm text-white px-3.5 py-2.5 rounded-xl border border-purple-800/40 focus:outline-none focus:border-fuchsia-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-purple-200 mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ananya@example.com"
                    className="w-full bg-[#18132e] text-xs sm:text-sm text-white px-3.5 py-2.5 rounded-xl border border-purple-800/40 focus:outline-none focus:border-fuchsia-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-purple-200 mb-1">
                  Feedback Topic
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full bg-[#18132e] text-xs sm:text-sm text-white px-3.5 py-2.5 rounded-xl border border-purple-800/40 focus:outline-none focus:border-fuchsia-500"
                >
                  <option value="Product Suggestion">Product Suggestion / What to add next</option>
                  <option value="Website Design">Website Design & User Experience</option>
                  <option value="Checkout & Delivery">Checkout, COD & Delivery Experience</option>
                  <option value="Customer Support">Customer Support Query</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-purple-200 mb-1">
                  Your Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details, ideas, or suggestions..."
                  className="w-full bg-[#18132e] text-xs sm:text-sm text-white p-3.5 rounded-xl border border-purple-800/40 focus:outline-none focus:border-fuchsia-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer transition-all active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>Submit Feedback</span>
              </button>
            </form>
          )}
        </div>

        {/* Right: Community Ideas & Stored Submissions */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-[#141028] border border-purple-900/30 space-y-3">
            <h3 className="text-base font-bold text-white">Why We Ask</h3>
            <p className="text-xs text-purple-300/70 leading-relaxed">
              TREVNIXO thrives on curating products that actually eliminate daily hassles.
              If you’ve seen a smart tool, travel gadget, or home organizer you want us to source with reliable local dispatch, let us know!
            </p>
          </div>

          {feedbacks.length > 0 && (
            <div className="p-6 rounded-3xl bg-[#141028] border border-purple-900/30 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Recent Submissions ({feedbacks.length})
              </h4>
              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {feedbacks.slice(0, 5).map((f) => (
                  <div key={f.id} className="p-2.5 rounded-xl bg-[#18132e] text-xs space-y-1">
                    <div className="flex justify-between text-purple-300 font-semibold">
                      <span>{f.name}</span>
                      <span className="text-amber-400">★ {f.rating}/5</span>
                    </div>
                    <p className="text-purple-200/70 text-[11px] line-clamp-2">
                      {f.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
