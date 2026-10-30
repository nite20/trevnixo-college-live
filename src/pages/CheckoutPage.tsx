import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Banknote,
  CreditCard,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { getProductById, calculateDeliveryFee } from '../data/products';
import { CustomerInfo } from '../types';

export const CheckoutPage: React.FC = () => {
  const {
    buyNowState,
    cartProducts,
    cartSubtotal,
    cartDeliveryFee,
    cartTotal,
    placeOrder,
    navigate,
    route,
  } = useStore();

  // Determine if this is a Buy Now flow or Cart flow
  const isBuyNow = Boolean(route.params?.fromBuyNow || buyNowState);

  // Buy Now item details
  const buyNowProduct = useMemo(() => {
    if (!buyNowState) return null;
    const prod = getProductById(buyNowState.productId);
    if (!prod) return null;
    return { product: prod, quantity: buyNowState.quantity };
  }, [buyNowState]);

  // Derived checkout items and pricing
  const checkoutItems = useMemo(() => {
    if (isBuyNow && buyNowProduct) {
      return [buyNowProduct];
    }
    return cartProducts;
  }, [isBuyNow, buyNowProduct, cartProducts]);

  const subtotal = useMemo(() => {
    if (isBuyNow && buyNowProduct) {
      return buyNowProduct.product.price * buyNowProduct.quantity;
    }
    return cartSubtotal;
  }, [isBuyNow, buyNowProduct, cartSubtotal]);

  const deliveryFee = useMemo(() => {
    return calculateDeliveryFee(subtotal);
  }, [subtotal]);

  const grandTotal = subtotal + deliveryFee;

  // Form State
  const [formData, setFormData] = useState<CustomerInfo>({
    fullName: '',
    mobile: '',
    email: '',
    address: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'demo-online'>('cod');
  const [showDemoPayment, setShowDemoPayment] = useState(false);
  const [paymentNotice, setPaymentNotice] = useState('');

  // Validate form
  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required';
    }

    const cleanMobile = formData.mobile.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      errs.mobile = 'Enter a valid 10-digit mobile number';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Enter a valid email address';
    }

    if (!formData.address.trim()) {
      errs.address = 'Delivery address is required';
    }

    if (!formData.city.trim()) {
      errs.city = 'City is required';
    }

    const cleanPin = formData.pincode.replace(/\D/g, '');
    if (!/^\d{6}$/.test(cleanPin)) {
      errs.pincode = 'Enter a valid 6-digit postal pincode';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const finishOrder = (method: 'Cash on Delivery' | 'Demo Online Payment (Simulated)') => {
    setIsSubmitting(true);
    setPaymentNotice('');
    setTimeout(() => {
      const order = placeOrder(formData, isBuyNow, method);
      setIsSubmitting(false);
      setShowDemoPayment(false);
      if (order) navigate('order-success', { orderId: order.orderId });
    }, 450);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || checkoutItems.length === 0) return;
    if (paymentMethod === 'demo-online') {
      setShowDemoPayment(true);
      return;
    }
    finishOrder('Cash on Delivery');
  };

  if (checkoutItems.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">No items to checkout</h2>
        <p className="text-xs text-purple-300/70">
          Your cart is empty or no item was selected for Buy Now.
        </p>
        <button
          onClick={() => navigate('shop')}
          className="bg-fuchsia-600 text-white text-xs font-semibold px-5 py-2.5 rounded-xl cursor-pointer"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div>
        <button
          onClick={() => navigate(isBuyNow ? 'shop' : 'cart')}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-purple-300 hover:text-white transition-colors cursor-pointer mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isBuyNow ? 'Back to Store' : 'Back to Cart'}</span>
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
          Complete Your Order
        </h1>
        <p className="text-xs sm:text-sm text-purple-300/60 mt-0.5">
          {isBuyNow
            ? 'Instant Buy Now Checkout'
            : 'Delivery and payment information'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Customer & Address Form */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSubmitOrder} className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#130f24] border border-purple-900/40 space-y-4">
              <div className="flex items-center justify-between border-b border-purple-900/30 pb-3">
                <h3 className="text-base font-bold text-white">
                  1. Delivery Details
                </h3>
                <span className="text-[11px] text-purple-300/60">
                  All fields marked * are required
                </span>
              </div>

              {/* Full Name & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-purple-200 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    maxLength={80}
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value.replace(/[^\p{L}\p{M} .'-]/gu, '') })
                    }
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-[#18132e] text-xs sm:text-sm text-white px-3.5 py-2.5 rounded-xl border border-purple-800/40 focus:outline-none focus:border-fuchsia-500"
                  />
                  {errors.fullName && (
                    <span className="text-[11px] text-rose-400 mt-0.5 block">
                      {errors.fullName}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-purple-200 mb-1">
                    Mobile Number (10 digits) *
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[6-9][0-9]{9}"
                    autoComplete="tel-national"
                    required
                    maxLength={10}
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })
                    }
                    placeholder="9876543210"
                    className="w-full bg-[#18132e] text-xs sm:text-sm text-white px-3.5 py-2.5 rounded-xl border border-purple-800/40 focus:outline-none focus:border-fuchsia-500 tabular-nums"
                  />
                  {errors.mobile && (
                    <span className="text-[11px] text-rose-400 mt-0.5 block">
                      {errors.mobile}
                    </span>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-purple-200 mb-1">
                  Email Address (For Order Receipts)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="rahul@example.com"
                  className="w-full bg-[#18132e] text-xs sm:text-sm text-white px-3.5 py-2.5 rounded-xl border border-purple-800/40 focus:outline-none focus:border-fuchsia-500"
                />
                {errors.email && (
                  <span className="text-[11px] text-rose-400 mt-0.5 block">
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Complete Address */}
              <div>
                <label className="block text-xs font-semibold text-purple-200 mb-1">
                  Flat, House No., Building, Street *
                </label>
                <textarea
                  required
                  rows={2}
                  maxLength={300}
                  autoComplete="street-address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value.slice(0, 300) })
                  }
                  placeholder="House 42, Green Avenue, Near Metro Station"
                  className="w-full bg-[#18132e] text-xs sm:text-sm text-white p-3 rounded-xl border border-purple-800/40 focus:outline-none focus:border-fuchsia-500 resize-none"
                />
                {errors.address && (
                  <span className="text-[11px] text-rose-400 mt-0.5 block">
                    {errors.address}
                  </span>
                )}
              </div>

              {/* City, State, Pincode */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-purple-200 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="address-level2"
                    maxLength={80}
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value.replace(/[^\p{L}\p{M} .'-]/gu, '') })
                    }
                    placeholder="Mumbai"
                    className="w-full bg-[#18132e] text-xs sm:text-sm text-white px-3.5 py-2.5 rounded-xl border border-purple-800/40 focus:outline-none focus:border-fuchsia-500"
                  />
                  {errors.city && (
                    <span className="text-[11px] text-rose-400 mt-0.5 block">
                      {errors.city}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-purple-200 mb-1">
                    State *
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                    className="w-full bg-[#18132e] text-xs sm:text-sm text-white px-3 py-2.5 rounded-xl border border-purple-800/40 focus:outline-none focus:border-fuchsia-500"
                  >
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Delhi">Delhi NCR</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Other">Other State / UT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-purple-200 mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    autoComplete="postal-code"
                    required
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) =>
                      setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })
                    }
                    placeholder="400001"
                    className="w-full bg-[#18132e] text-xs sm:text-sm text-white px-3.5 py-2.5 rounded-xl border border-purple-800/40 focus:outline-none focus:border-fuchsia-500 tabular-nums"
                  />
                  {errors.pincode && (
                    <span className="text-[11px] text-rose-400 mt-0.5 block">
                      {errors.pincode}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="p-6 rounded-2xl bg-[#130f24] border border-purple-900/40 space-y-4">
              <h3 className="text-base font-bold text-white border-b border-purple-900/30 pb-3">2. Payment Method</h3>
              <label className={`flex items-center justify-between p-4 rounded-xl bg-[#1c1635] border-2 ${paymentMethod === 'cod' ? 'border-fuchsia-500/80' : 'border-purple-900/40'} cursor-pointer`}>
                <div className="flex items-center gap-3"><div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400"><Banknote className="w-5 h-5" /></div><div><div className="text-sm font-bold text-white">Cash on Delivery (COD)</div><div className="text-xs text-purple-300/60 mt-0.5">Pay when your order arrives.</div></div></div>
                <input type="radio" name="paymentMethod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} aria-label="Cash on Delivery" />
              </label>
              <label className={`flex items-center justify-between p-4 rounded-xl bg-[#1c1635] border-2 ${paymentMethod === 'demo-online' ? 'border-fuchsia-500/80' : 'border-purple-900/40'} cursor-pointer`}>
                <div className="flex items-center gap-3"><div className="p-2 rounded-lg bg-purple-950 text-purple-300"><CreditCard className="w-5 h-5" /></div><div><div className="text-sm font-bold text-white">Online Payment — Demo Mode</div><div className="text-xs text-purple-300/70 mt-0.5">Simulated UPI / Card flow. No real money, no real payment.</div><span className="inline-block mt-2 text-[10px] bg-amber-500/15 text-amber-300 px-2 py-1 rounded">COLLEGE DEMO ONLY</span></div></div>
                <input type="radio" name="paymentMethod" checked={paymentMethod === 'demo-online'} onChange={() => setPaymentMethod('demo-online')} aria-label="Demo online payment" />
              </label>
              {paymentNotice && <p role="alert" className="text-sm text-rose-300">{paymentNotice}</p>}
              <p className="text-[11px] text-amber-200/80">Demo payment is simulated locally and does not contact a bank, UPI app, or payment gateway.</p>
            </div>

            {/* Place Order CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 px-6 rounded-2xl shadow-[0_4px_25px_rgba(217,70,239,0.4)] flex items-center justify-center gap-2 text-base cursor-pointer transition-all active:scale-98 disabled:opacity-50"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>
                {isSubmitting
                  ? 'Confirming Order...'
                  : `${paymentMethod === 'cod' ? 'Confirm Order (COD)' : 'Continue to Demo Payment'} · ₹${grandTotal}`}
              </span>
            </button>
          </form>
        </div>

        {/* Right: Order Summary Sidebar */}
        <div className="lg:col-span-5">
          <div className="p-6 rounded-2xl bg-[#141028] border border-purple-800/40 space-y-5 sticky top-24">
            <h3 className="text-base font-bold text-white border-b border-purple-900/30 pb-3">
              Order Items ({checkoutItems.length})
            </h3>

            {/* List of items */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {checkoutItems.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-lg object-cover bg-[#18132e] border border-purple-800/30"
                    />
                    <div>
                      <h4 className="font-semibold text-white line-clamp-1">
                        {product.name}
                      </h4>
                      <span className="text-purple-300/60">
                        Qty: {quantity} × ₹{product.price}
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-white tabular-nums">
                    ₹{product.price * quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 pt-4 border-t border-purple-900/30 text-xs sm:text-sm">
              <div className="flex justify-between text-purple-200/80">
                <span>Items Subtotal</span>
                <span className="font-semibold text-white tabular-nums">
                  ₹{subtotal}
                </span>
              </div>

              <div className="flex justify-between text-purple-200/80">
                <span>Delivery Fee</span>
                <span className="font-semibold tabular-nums">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-400 font-bold">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-[11px] text-purple-400/60">
                <span>Taxes</span>
                <span>Included as applicable</span>
              </div>

              <div className="pt-3 border-t border-purple-900/40 flex justify-between items-baseline text-base font-bold text-white">
                <span>Grand Total</span>
                <span className="text-xl font-black text-fuchsia-300 tabular-nums">
                  ₹{grandTotal}
                </span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="pt-2 space-y-2 text-xs text-purple-300/60 border-t border-purple-900/30">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-fuchsia-400 shrink-0" />
                <span>Standard delivery in 2-4 business days</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified prototype checkout with instant receipt</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDemoPayment && (
        <div className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="demo-payment-title">
          <div className="w-full max-w-md rounded-2xl border border-purple-700/60 bg-[#130f24] p-6 space-y-4 shadow-2xl">
            <div className="text-center"><div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20 text-purple-200"><CreditCard className="h-6 w-6" /></div><h2 id="demo-payment-title" className="text-xl font-bold text-white">Demo Payment Gateway</h2><p className="mt-2 text-sm text-amber-200">SIMULATION ONLY — NO REAL PAYMENT</p><p className="mt-1 text-xs text-purple-200/70">Amount: ₹{grandTotal}. Choose an outcome to demonstrate the checkout flow.</p></div>
            <button type="button" disabled={isSubmitting} onClick={() => finishOrder('Demo Online Payment (Simulated)')} className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white disabled:opacity-50">Simulate Successful Payment</button>
            <button type="button" onClick={() => { setPaymentNotice('Demo payment failed. No order was placed. You can retry or choose COD.'); setShowDemoPayment(false); }} className="w-full rounded-xl border border-rose-500/50 px-4 py-3 text-sm font-semibold text-rose-200">Simulate Failed Payment</button>
            <button type="button" onClick={() => { setShowDemoPayment(false); setPaymentNotice('Demo payment cancelled. No order was placed.'); }} className="w-full rounded-xl border border-purple-700 px-4 py-3 text-sm font-semibold text-purple-200">Cancel Payment</button>
            <p className="text-[10px] leading-relaxed text-purple-300/60">This is a college demonstration, not a real payment service. Do not enter card numbers, UPI PINs, OTPs, or banking credentials.</p>
          </div>
        </div>
      )}
    </div>
  );
};
