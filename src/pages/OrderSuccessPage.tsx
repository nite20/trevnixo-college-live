import React from 'react';
import {
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  ShoppingBag,
  HelpCircle,
  Copy,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface OrderSuccessPageProps {
  orderId?: string;
}

export const OrderSuccessPage: React.FC<OrderSuccessPageProps> = ({ orderId }) => {
  const { getOrderById, orders, navigate, showToast } = useStore();

  // Find order by ID or use latest order
  const order = orderId ? getOrderById(orderId) : orders[0];

  const handleCopyOrderId = () => {
    if (order?.orderId) {
      navigator.clipboard?.writeText(order.orderId);
      showToast(`Copied Order ID: ${order.orderId}`, 'info');
    }
  };

  if (!order) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">No Order Found</h2>
        <p className="text-xs text-purple-300/70">
          We couldn&apos;t find this order record. Please check your order history or return to the shop.
        </p>
        <button
          onClick={() => navigate('shop')}
          className="bg-fuchsia-600 text-white text-xs font-semibold px-5 py-2.5 rounded-xl cursor-pointer"
        >
          Return to Store
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Success Hero Banner */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-bounce-short">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
          Order Successfully Placed!
        </h1>
        <p className="text-xs sm:text-sm text-purple-300/70 max-w-md mx-auto">
          Thank you for choosing TREVNIXO. We are preparing your smart everyday finds for dispatch.
        </p>
      </div>

      {/* Order Identity Card */}
      <div className="p-6 rounded-2xl bg-[#130f24] border border-purple-800/40 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-900/30 pb-4">
          <div>
            <span className="text-[11px] text-purple-400 font-semibold uppercase tracking-wider">
              Order Reference
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xl font-black text-white font-mono tracking-wide">
                #{order.orderId}
              </span>
              <button
                onClick={handleCopyOrderId}
                className="p-1 text-purple-400 hover:text-white rounded"
                title="Copy Order ID"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[11px] text-purple-400 font-semibold uppercase tracking-wider">
              Order Date
            </span>
            <div className="text-xs font-medium text-white mt-0.5">
              {new Date(order.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        </div>

        {/* Status Stepper Demo */}
        <div className="py-2">
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span className="text-fuchsia-400 flex items-center gap-1.5">
              <Package className="w-4 h-4" />
              <span>Confirmed</span>
            </span>
            <span className="text-purple-300/60">Processing</span>
            <span className="text-purple-300/60">Out for Delivery</span>
          </div>
          <div className="w-full h-2 bg-[#1b1532] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 w-1/3 rounded-full" />
          </div>
        </div>

        {/* Customer & Delivery Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-purple-900/30 text-xs">
          <div>
            <h4 className="font-semibold text-purple-300 uppercase tracking-wider text-[11px] mb-1">
              Delivery Address
            </h4>
            <div className="text-white font-medium">{order.customer.fullName}</div>
            <div className="text-purple-200/70">{order.customer.address}</div>
            <div className="text-purple-200/70">
              {order.customer.city}, {order.customer.state} — {order.customer.pincode}
            </div>
            <div className="text-purple-400 font-mono mt-1">
              📱 {order.customer.mobile}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-purple-300 uppercase tracking-wider text-[11px] mb-1">
              Payment & Dispatch
            </h4>
            <div className="text-emerald-400 font-bold">
              {order.paymentMethod}
            </div>
            <p className="text-purple-200/70 mt-1">
              {order.paymentStatus === 'DEMO PAID — NOT REAL' ? 'Demo payment status (simulated):' : 'Amount payable to courier upon delivery:'}
            </p>
            {order.paymentStatus === 'DEMO PAID — NOT REAL' && <div className="text-xs font-bold text-amber-300">DEMO PAID — NOT REAL</div>}
            <div className="text-lg font-black text-fuchsia-300 tabular-nums">
              ₹{order.total}
            </div>
          </div>
        </div>
      </div>

      {/* Ordered Items List */}
      <div className="p-6 rounded-2xl bg-[#130f24] border border-purple-900/30 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Items in this Package ({order.items.length})
        </h3>

        <div className="divide-y divide-purple-900/30">
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="py-3 flex items-center justify-between gap-4 text-xs"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-lg object-cover bg-[#18132e]"
                />
                <div>
                  <h4 className="font-semibold text-white">
                    {item.product.name}
                  </h4>
                  <span className="text-purple-300/60">
                    Qty: {item.quantity} × ₹{item.price}
                  </span>
                </div>
              </div>
              <span className="font-bold text-white tabular-nums">
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}
        </div>

        {/* Cost Summary Breakdown */}
        <div className="pt-4 border-t border-purple-900/40 space-y-1.5 text-xs">
          <div className="flex justify-between text-purple-200/80">
            <span>Subtotal</span>
            <span className="font-semibold tabular-nums text-white">
              ₹{order.subtotal}
            </span>
          </div>
          <div className="flex justify-between text-purple-200/80">
            <span>Shipping Charge</span>
            <span className="font-semibold tabular-nums text-white">
              {order.deliveryFee === 0 ? (
                <span className="text-emerald-400">FREE</span>
              ) : (
                `₹${order.deliveryFee}`
              )}
            </span>
          </div>
          <div className="pt-2 border-t border-purple-900/30 flex justify-between font-bold text-sm text-white">
            <span>Total Payable</span>
            <span className="text-base text-fuchsia-300 tabular-nums">
              ₹{order.total}
            </span>
          </div>
        </div>
      </div>

      {/* Next Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <button
          onClick={() => navigate('shop')}
          className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer transition-all hover:scale-105"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>

        <button
          onClick={() => navigate('contact')}
          className="w-full sm:w-auto bg-[#18132e] hover:bg-purple-900/40 text-purple-200 hover:text-white font-medium px-5 py-3 rounded-xl border border-purple-800/40 flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-purple-400" />
          <span>Need Help With Order?</span>
        </button>
      </div>
    </div>
  );
};
