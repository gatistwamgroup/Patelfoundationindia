import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import LogoLoader from "./components/loader/LogoLoader";
import { Toaster } from "react-hot-toast";
import CookieConsent from "./components/common/CookieConsent";
import BackToTop from "./components/common/BackToTop";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import TeamPage from "./pages/TeamPage";
import LegalDocumentsPage from "./pages/LegalDocumentsPage";
import ChildEducationPage from "./pages/ChildEducationPage";
import ChildHealthNutritionPage from "./pages/ChildHealthNutritionPage";
import SocialActivityPage from "./pages/SocialActivityPage";
import ContactUsPage from "./pages/ContactUsPage";
import VolunteerPage from "./pages/VolunteerPage";
import GalleryPage from "./pages/GalleryPage";
import DonatePage from "./pages/DonatePage";
import RakshaBandhanDonatePage from "./pages/RakshaBandhanDonatePage";
import NotFoundPage from "./pages/NotFoundPage";
import DonationSuccess from "./pages/DonationSuccess";
import IndiaDonationSuccess from "./pages/IndiaDonationSuccess";
import DonationCancel from "./pages/DonationCancel";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";


import { initGA, trackPageView } from "./utils/analytics";

// 🔥 Route tracking component
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
}

function AppContent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // GA initialize once
    initGA();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 300); // loader timing

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LogoLoader />;
  }

  return (
    <>
      <ScrollToTop />
      <AnalyticsTracker />
      <Toaster position="top-right" reverseOrder={false} />
      <CookieConsent />
      <BackToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/legal-documents" element={<LegalDocumentsPage />} />
        <Route path="/child-education" element={<ChildEducationPage />} />
        <Route path="/child-health-nutrition" element={<ChildHealthNutritionPage />} />
        <Route path="/social-activity" element={<SocialActivityPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/volunteer" element={<VolunteerPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/raksha-bandhan-donate" element={<RakshaBandhanDonatePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/donation-success" element={<DonationSuccess />} />
        <Route path="/donation-success-india" element={<IndiaDonationSuccess />} />
        <Route path="/donation-cancel" element={<DonationCancel />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />

      </Routes>

      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;