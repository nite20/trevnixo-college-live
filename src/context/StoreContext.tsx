import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import {
  Product,
  CartItem,
  BuyNowState,
  OrderRecord,
  FeedbackRecord,
  CustomerInfo,
} from '../types';
import {
  PRODUCTS,
  getProductById,
  calculateDeliveryFee,
  normalizeCategorySlug,
} from '../data/products';

const STORAGE_KEYS = {
  CART: 'tx_cart',
  WISH: 'tx_wish',
  BUY: 'tx_buy',
  ORDER: 'tx_order',
  FEEDBACK: 'tx_feedback',
} as const;

// Safe localStorage parsing helper
function safeGetItem<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`Error reading ${key} from localStorage, resetting to default`, err);
    try {
      localStorage.setItem(key, JSON.stringify(defaultValue));
    } catch {
      // ignore
    }
    return defaultValue;
  }
}

function safeSetItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving ${key} to localStorage`, err);
  }
}

export interface NavigationRoute {
  view:
    | 'home'
    | 'shop'
    | 'category'
    | 'product'
    | 'cart'
    | 'wishlist'
    | 'checkout'
    | 'order-success'
    | 'feedback'
    | 'contact'
    | 'about'
    | 'shipping'
    | 'returns'
    | 'privacy'
    | 'terms';
  params?: {
    slug?: string;
    id?: number;
    orderId?: string;
    fromBuyNow?: boolean;
    query?: string;
  };
}

interface ToastMessage {
  id: string;
  text: string;
  type?: 'success' | 'info' | 'error';
}

interface StoreContextType {
  // Navigation
  route: NavigationRoute;
  navigate: (view: NavigationRoute['view'], params?: NavigationRoute['params']) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Cart
  cart: CartItem[];
  cartCount: number;
  cartProducts: { product: Product; quantity: number }[];
  cartSubtotal: number;
  cartDeliveryFee: number;
  cartTotal: number;
  addToCart: (productId: number, quantity?: number, showToast?: boolean) => void;
  updateCartQuantity: (productId: number, newQty: number) => void;
  removeFromCart: (productId: number) => void;
  moveCartToWishlist: (productId: number) => void;
  clearCart: () => void;

  // Wishlist
  wishlist: number[];
  wishlistCount: number;
  wishlistProducts: Product[];
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  removeFromWishlist: (productId: number) => void;
  moveWishlistToCart: (productId: number) => void;

  // Buy Now
  buyNowState: BuyNowState | null;
  triggerBuyNow: (productId: number, quantity?: number) => void;
  clearBuyNow: () => void;

  // Orders
  orders: OrderRecord[];
  placeOrder: (customer: CustomerInfo, isBuyNow: boolean, paymentMethod?: OrderRecord['paymentMethod']) => OrderRecord | null;
  getOrderById: (orderId: string) => OrderRecord | undefined;

  // Feedback
  feedbacks: FeedbackRecord[];
  submitFeedback: (data: Omit<FeedbackRecord, 'id' | 'createdAt'>) => void;

  // Toast
  toasts: ToastMessage[];
  showToast: (text: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Navigation State
  const [route, setRoute] = useState<NavigationRoute>(() => {
    // Initial parse from location hash or pathname
    return parseUrlToRoute();
  });
  const [searchQuery, setSearchQuery] = useState('');

  // 2. Storage States
  const [cart, setCart] = useState<CartItem[]>(() =>
    safeGetItem<CartItem[]>(STORAGE_KEYS.CART, [])
  );
  const [wishlist, setWishlist] = useState<number[]>(() =>
    safeGetItem<number[]>(STORAGE_KEYS.WISH, [])
  );
  const [buyNowState, setBuyNowState] = useState<BuyNowState | null>(() =>
    safeGetItem<BuyNowState | null>(STORAGE_KEYS.BUY, null)
  );
  const [orders, setOrders] = useState<OrderRecord[]>(() =>
    safeGetItem<OrderRecord[]>(STORAGE_KEYS.ORDER, [])
  );
  const [feedbacks, setFeedbacks] = useState<FeedbackRecord[]>(() =>
    safeGetItem<FeedbackRecord[]>(STORAGE_KEYS.FEEDBACK, [])
  );

  // 3. Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Sync state to localStorage
  useEffect(() => {
    safeSetItem(STORAGE_KEYS.CART, cart);
  }, [cart]);

  useEffect(() => {
    safeSetItem(STORAGE_KEYS.WISH, wishlist);
  }, [wishlist]);

  useEffect(() => {
    safeSetItem(STORAGE_KEYS.BUY, buyNowState);
  }, [buyNowState]);

  useEffect(() => {
    safeSetItem(STORAGE_KEYS.ORDER, orders);
  }, [orders]);

  useEffect(() => {
    safeSetItem(STORAGE_KEYS.FEEDBACK, feedbacks);
  }, [feedbacks]);

  // URL parsing helper to support both hash and .html legacy files
  function parseUrlToRoute(): NavigationRoute {
    const hash = window.location.hash.replace(/^#\/?/, '');
    const path = window.location.pathname.toLowerCase();
    const search = new URLSearchParams(window.location.search);

    // Check .html filenames or path
    if (path.includes('auto-bike.html') || path.includes('auto.html') || hash.startsWith('category/auto')) {
      return { view: 'category', params: { slug: 'auto' } };
    }
    if (path.includes('him.html') || hash.startsWith('category/him')) {
      return { view: 'category', params: { slug: 'him' } };
    }
    if (path.includes('her.html') || hash.startsWith('category/her')) {
      return { view: 'category', params: { slug: 'her' } };
    }
    if (path.includes('grocery.html') || hash.startsWith('category/grocery')) {
      return { view: 'category', params: { slug: 'grocery' } };
    }
    if (path.includes('electronics.html') || hash.startsWith('category/electronics')) {
      return { view: 'category', params: { slug: 'electronics' } };
    }
    if (path.includes('clothes.html') || hash.startsWith('category/clothes')) {
      return { view: 'category', params: { slug: 'clothes' } };
    }
    if (path.includes('shoes.html') || hash.startsWith('category/shoes')) {
      return { view: 'category', params: { slug: 'shoes' } };
    }
    if (path.includes('home.html') || hash.startsWith('category/home')) {
      return { view: 'category', params: { slug: 'home' } };
    }
    if (path.includes('beauty.html') || hash.startsWith('category/beauty')) {
      return { view: 'category', params: { slug: 'beauty' } };
    }
    if (path.includes('fitness.html') || hash.startsWith('category/fitness')) {
      return { view: 'category', params: { slug: 'fitness' } };
    }
    if (path.includes('jewellery.html') || hash.startsWith('category/jewellery')) {
      return { view: 'category', params: { slug: 'jewellery' } };
    }
    if (path.includes('travel.html') || hash.startsWith('category/travel')) {
      return { view: 'category', params: { slug: 'travel' } };
    }
    if (path.includes('shop.html') || hash === 'shop') {
      return { view: 'shop', params: { slug: search.get('category') || undefined, query: search.get('q') || undefined } };
    }
    if (path.includes('cart.html') || hash === 'cart') {
      return { view: 'cart' };
    }
    if (path.includes('wishlist.html') || hash === 'wishlist') {
      return { view: 'wishlist' };
    }
    if (path.includes('checkout.html') || hash === 'checkout') {
      return { view: 'checkout' };
    }
    if (path.includes('order-success.html') || hash.startsWith('order-success')) {
      const orderId = search.get('orderId') || undefined;
      return { view: 'order-success', params: { orderId } };
    }
    if (path.includes('feedback.html') || hash === 'feedback') {
      return { view: 'feedback' };
    }
    if (path.includes('contact.html') || hash === 'contact') {
      return { view: 'contact' };
    }
    if (path.includes('about.html') || hash === 'about') {
      return { view: 'about' };
    }
    if (path.includes('shipping.html') || hash === 'shipping') {
      return { view: 'shipping' };
    }
    if (path.includes('returns.html') || hash === 'returns') {
      return { view: 'returns' };
    }
    if (path.includes('privacy.html') || hash === 'privacy') {
      return { view: 'privacy' };
    }
    if (path.includes('terms.html') || hash === 'terms') {
      return { view: 'terms' };
    }
    if (path.includes('product.html') || hash.startsWith('product/')) {
      const idStr = search.get('id') || hash.split('/')[1];
      const id = idStr ? parseInt(idStr, 10) : 1;
      return { view: 'product', params: { id: isNaN(id) ? 1 : id } };
    }

    // Default hash routes
    if (hash.startsWith('category/')) {
      const slug = hash.split('/')[1] || 'all';
      return { view: 'category', params: { slug: normalizeCategorySlug(slug) } };
    }
    if (hash.startsWith('product/')) {
      const id = parseInt(hash.split('/')[1], 10);
      return { view: 'product', params: { id: isNaN(id) ? 1 : id } };
    }
    if (hash === 'cart') return { view: 'cart' };
    if (hash === 'wishlist') return { view: 'wishlist' };
    if (hash === 'checkout') return { view: 'checkout' };
    if (hash.startsWith('order-success/')) {
      return { view: 'order-success', params: { orderId: hash.split('/')[1] } };
    }

    return { view: 'home' };
  }

  // Handle browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseUrlToRoute());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const navigate = useCallback(
    (view: NavigationRoute['view'], params?: NavigationRoute['params']) => {
      setRoute({ view, params });
      let hash = view as string;
      if (view === 'category' && params?.slug) {
        hash = `category/${params.slug}`;
      } else if (view === 'product' && params?.id) {
        hash = `product/${params.id}`;
      } else if (view === 'order-success' && params?.orderId) {
        hash = `order-success/${params.orderId}`;
      }
      window.location.hash = hash;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  // Global click interceptor for legacy .html links and internal navigation
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (
        !href ||
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:')
      ) {
        return;
      }

      e.preventDefault();
      const clean = href.replace(/^\/+/, '');
      if (clean.includes('auto-bike.html') || clean.includes('auto.html') || clean.startsWith('#category/auto')) {
        navigate('category', { slug: 'auto' });
      } else if (clean.includes('him.html') || clean.startsWith('#category/him')) {
        navigate('category', { slug: 'him' });
      } else if (clean.includes('her.html') || clean.startsWith('#category/her')) {
        navigate('category', { slug: 'her' });
      } else if (clean.includes('grocery.html') || clean.startsWith('#category/grocery')) {
        navigate('category', { slug: 'grocery' });
      } else if (clean.includes('electronics.html') || clean.startsWith('#category/electronics')) {
        navigate('category', { slug: 'electronics' });
      } else if (clean.includes('clothes.html') || clean.startsWith('#category/clothes')) {
        navigate('category', { slug: 'clothes' });
      } else if (clean.includes('shoes.html') || clean.startsWith('#category/shoes')) {
        navigate('category', { slug: 'shoes' });
      } else if (clean.includes('home.html') || clean.startsWith('#category/home')) {
        navigate('category', { slug: 'home' });
      } else if (clean.includes('beauty.html') || clean.startsWith('#category/beauty')) {
        navigate('category', { slug: 'beauty' });
      } else if (clean.includes('fitness.html') || clean.startsWith('#category/fitness')) {
        navigate('category', { slug: 'fitness' });
      } else if (clean.includes('jewellery.html') || clean.startsWith('#category/jewellery')) {
        navigate('category', { slug: 'jewellery' });
      } else if (clean.includes('travel.html') || clean.startsWith('#category/travel')) {
        navigate('category', { slug: 'travel' });
      } else if (clean.includes('shop.html') || clean === '#shop') {
        navigate('shop');
      } else if (clean.includes('cart.html') || clean === '#cart') {
        navigate('cart');
      } else if (clean.includes('wishlist.html') || clean === '#wishlist') {
        navigate('wishlist');
      } else if (clean.includes('checkout.html') || clean === '#checkout') {
        navigate('checkout');
      } else if (clean.includes('feedback.html') || clean === '#feedback') {
        navigate('feedback');
      } else if (clean.includes('contact.html') || clean === '#contact') {
        navigate('contact');
      } else if (clean.includes('about.html') || clean === '#about') {
        navigate('about');
      } else if (clean.includes('shipping.html') || clean === '#shipping') {
        navigate('shipping');
      } else if (clean.includes('returns.html') || clean === '#returns') {
        navigate('returns');
      } else if (clean.includes('privacy.html') || clean === '#privacy') {
        navigate('privacy');
      } else if (clean.includes('terms.html') || clean === '#terms') {
        navigate('terms');
      } else if (clean.includes('product.html')) {
        const url = new URL(href, window.location.origin);
        const id = parseInt(url.searchParams.get('id') || '1', 10);
        navigate('product', { id: isNaN(id) ? 1 : id });
      } else if (clean === '' || clean === 'index.html' || clean === '#home') {
        navigate('home');
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [navigate]);

  // Cart Helpers
  const addToCart = useCallback(
    (productId: number, quantity = 1, showToastMsg = true) => {
      const product = getProductById(productId);
      if (!product) return;

      setCart((prev) => {
        const existingIndex = prev.findIndex((item) => item.productId === productId);
        if (existingIndex > -1) {
          const next = [...prev];
          next[existingIndex] = {
            ...next[existingIndex],
            quantity: next[existingIndex].quantity + quantity,
          };
          return next;
        } else {
          return [
            ...prev,
            { productId, quantity, addedAt: new Date().toISOString() },
          ];
        }
      });

      if (showToastMsg) {
        showToast(`Added "${product.name}" to cart`, 'success');
      }
    },
    [showToast]
  );

  const updateCartQuantity = useCallback((productId: number, newQty: number) => {
    setCart((prev) => {
      if (newQty <= 0) {
        return prev.filter((item) => item.productId !== productId);
      }
      return prev.map((item) =>
        item.productId === productId ? { ...item, quantity: newQty } : item
      );
    });
  }, []);

  const removeFromCart = useCallback(
    (productId: number) => {
      const product = getProductById(productId);
      setCart((prev) => prev.filter((item) => item.productId !== productId));
      if (product) {
        showToast(`Removed "${product.name}" from cart`, 'info');
      }
    },
    [showToast]
  );

  const moveCartToWishlist = useCallback(
    (productId: number) => {
      const product = getProductById(productId);
      setCart((prev) => prev.filter((item) => item.productId !== productId));
      setWishlist((prev) => (prev.includes(productId) ? prev : [...prev, productId]));
      if (product) {
        showToast(`Moved "${product.name}" to wishlist`, 'success');
      }
    },
    [showToast]
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Wishlist Helpers
  const toggleWishlist = useCallback(
    (productId: number) => {
      const product = getProductById(productId);
      if (!product) return;

      setWishlist((prev) => {
        const exists = prev.includes(productId);
        if (exists) {
          showToast(`Removed "${product.name}" from wishlist`, 'info');
          return prev.filter((id) => id !== productId);
        } else {
          showToast(`Saved "${product.name}" to wishlist`, 'success');
          return [...prev, productId];
        }
      });
    },
    [showToast]
  );

  const isInWishlist = useCallback(
    (productId: number) => {
      return wishlist.includes(productId);
    },
    [wishlist]
  );

  const removeFromWishlist = useCallback(
    (productId: number) => {
      const product = getProductById(productId);
      setWishlist((prev) => prev.filter((id) => id !== productId));
      if (product) {
        showToast(`Removed "${product.name}" from wishlist`, 'info');
      }
    },
    [showToast]
  );

  const moveWishlistToCart = useCallback(
    (productId: number) => {
      const product = getProductById(productId);
      if (!product) return;
      addToCart(productId, 1, false);
      setWishlist((prev) => prev.filter((id) => id !== productId));
      showToast(`Moved "${product.name}" to cart`, 'success');
    },
    [addToCart, showToast]
  );

  // Buy Now Helpers
  const triggerBuyNow = useCallback(
    (productId: number, quantity = 1) => {
      const product = getProductById(productId);
      if (!product) return;
      const state: BuyNowState = { productId, quantity: Math.max(1, quantity) };
      setBuyNowState(state);
      safeSetItem(STORAGE_KEYS.BUY, state);
      navigate('checkout', { fromBuyNow: true });
    },
    [navigate]
  );

  const clearBuyNow = useCallback(() => {
    setBuyNowState(null);
    localStorage.removeItem(STORAGE_KEYS.BUY);
  }, []);

  // Cart Derived States
  const cartProducts = useMemo(() => {
    return cart
      .map((item) => {
        const product = getProductById(item.productId);
        return product ? { product, quantity: item.quantity } : null;
      })
      .filter((item): item is { product: Product; quantity: number } => item !== null);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cartProducts.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cartProducts]);

  const cartDeliveryFee = useMemo(() => {
    return calculateDeliveryFee(cartSubtotal);
  }, [cartSubtotal]);

  const cartTotal = useMemo(() => {
    return cartSubtotal + cartDeliveryFee;
  }, [cartSubtotal, cartDeliveryFee]);

  // Wishlist Derived States
  const wishlistProducts = useMemo(() => {
    return wishlist
      .map((id) => getProductById(id))
      .filter((p): p is Product => p !== undefined);
  }, [wishlist]);

  const wishlistCount = useMemo(() => {
    return wishlistProducts.length;
  }, [wishlistProducts]);

  // Orders
  const placeOrder = useCallback(
    (customer: CustomerInfo, isBuyNow: boolean, paymentMethod: OrderRecord['paymentMethod'] = 'Cash on Delivery'): OrderRecord | null => {
      let itemsToOrder: { product: Product; quantity: number; price: number }[] = [];
      let subtotal = 0;

      if (isBuyNow && buyNowState) {
        const prod = getProductById(buyNowState.productId);
        if (prod) {
          itemsToOrder = [
            {
              product: prod,
              quantity: buyNowState.quantity,
              price: prod.price,
            },
          ];
          subtotal = prod.price * buyNowState.quantity;
        }
      } else {
        itemsToOrder = cartProducts.map((cp) => ({
          product: cp.product,
          quantity: cp.quantity,
          price: cp.product.price,
        }));
        subtotal = cartSubtotal;
      }

      if (itemsToOrder.length === 0) {
        showToast('No items to checkout', 'error');
        return null;
      }

      const deliveryFee = calculateDeliveryFee(subtotal);
      const total = subtotal + deliveryFee;
      const orderId = `TX-${Math.floor(100000 + Math.random() * 900000)}`;

      const order: OrderRecord = {
        orderId,
        createdAt: new Date().toISOString(),
        items: itemsToOrder,
        subtotal,
        deliveryFee,
        total,
        customer,
        paymentMethod,
        paymentStatus: paymentMethod === 'Demo Online Payment (Simulated)' ? 'DEMO PAID — NOT REAL' : 'Pending/Cash on Delivery',
        status: 'Confirmed',
      };

      setOrders((prev) => [order, ...prev]);
      // Save to local demo API; warn clearly if the backend is offline.
      void fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(order) })
        .then(async (response) => {
          if (!response.ok) {
            const detail = await response.json().catch(() => ({}));
            console.error('Backend order save failed:', detail);
            showToast('Backend save failed. Check API server.', 'error');
          }
        })
        .catch((error) => {
          console.error('TREVNIXO API unavailable:', error);
          showToast('Backend offline; order is only in this browser.', 'error');
        });

      // Clear buy now or cart
      if (isBuyNow) {
        clearBuyNow();
      } else {
        clearCart();
      }

      showToast(`Order #${orderId} confirmed successfully!`, 'success');
      return order;
    },
    [buyNowState, cartProducts, cartSubtotal, clearBuyNow, clearCart, showToast]
  );

  const getOrderById = useCallback(
    (orderId: string) => {
      return orders.find((o) => o.orderId === orderId);
    },
    [orders]
  );

  // Feedback
  const submitFeedback = useCallback(
    (data: Omit<FeedbackRecord, 'id' | 'createdAt'>) => {
      const record: FeedbackRecord = {
        ...data,
        id: `FB-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      setFeedbacks((prev) => [record, ...prev]);
      showToast('Thank you for your feedback! It helps improve TREVNIXO.', 'success');
    },
    [showToast]
  );

  return (
    <StoreContext.Provider
      value={{
        route,
        navigate,
        searchQuery,
        setSearchQuery,
        cart,
        cartCount,
        cartProducts,
        cartSubtotal,
        cartDeliveryFee,
        cartTotal,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        moveCartToWishlist,
        clearCart,
        wishlist,
        wishlistCount,
        wishlistProducts,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        moveWishlistToCart,
        buyNowState,
        triggerBuyNow,
        clearBuyNow,
        orders,
        placeOrder,
        getOrderById,
        feedbacks,
        submitFeedback,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return ctx;
};
