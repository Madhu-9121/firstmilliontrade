import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import EnquiryModal from './EnquiryModal';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const location = useLocation();

  // Show enquiry modal on first visit (only on home page)
  useEffect(() => {
    if (location.pathname === '/') {
      const hasSeenModal = sessionStorage.getItem('hasSeenEnquiryModal');
      if (!hasSeenModal) {
        const timer = setTimeout(() => {
          setShowEnquiryModal(true);
          sessionStorage.setItem('hasSeenEnquiryModal', 'true');
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <EnquiryModal 
        isOpen={showEnquiryModal} 
        onClose={() => setShowEnquiryModal(false)} 
      />
    </div>
  );
}
