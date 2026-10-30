import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingFeedback } from './components/FloatingFeedback';
import { Toast } from './components/Toast';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { WishlistPage } from './pages/WishlistPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { FeedbackPage } from './pages/FeedbackPage';
import { ContactPage } from './pages/ContactPage';
import {
  AboutPage,
  ShippingPolicyPage,
  ReturnsPolicyPage,
  PrivacyPolicyPage,
  TermsPage,
} from './pages/PolicyPages';

const MainRouter: React.FC = () => {
  const { route } = useStore();

  const renderView = () => {
    switch (route.view) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'category':
        return <CategoryPage slug={route.params?.slug || 'electronics'} />;
      case 'product':
        return <ProductDetailPage productId={route.params?.id || 1} />;
      case 'cart':
        return <CartPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-success':
        return <OrderSuccessPage orderId={route.params?.orderId} />;
      case 'feedback':
        return <FeedbackPage />;
      case 'contact':
        return <ContactPage />;
      case 'about':
        return <AboutPage />;
      case 'shipping':
        return <ShippingPolicyPage />;
      case 'returns':
        return <ReturnsPolicyPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0914] text-[#f1f0f7]">
      <Header />
      <main className="flex-1">{renderView()}</main>
      <Footer />
      <FloatingFeedback />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainRouter />
    </StoreProvider>
  );
}
