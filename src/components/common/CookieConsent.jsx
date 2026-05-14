import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/cookie-consent.css";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-consent-banner">
      <div className="cookie-consent-content">
        <div className="cookie-consent-text">
          <p>
            We use cookies to enhance your experience and analyze our traffic. 
            By clicking "Accept", you consent to our use of cookies. 
            Read our <Link to="/privacy-policy">Privacy Policy</Link> to learn more.
          </p>
        </div>
        <div className="cookie-consent-actions">
          <button onClick={handleDecline} className="cookie-btn-decline">
            Decline
          </button>
          <button onClick={handleAccept} className="cookie-btn-accept">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
