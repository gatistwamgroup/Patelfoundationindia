const MEASUREMENT_ID = "G-RJ9JGL19R9"; // 👈 apna real GA4 ID daalo

export const initGA = () => {
  if (!window.gtag || !MEASUREMENT_ID) return;

  window.gtag("config", MEASUREMENT_ID, {
    page_path: window.location.pathname + window.location.search,
  });
};

export const trackPageView = (path) => {
  if (!window.gtag || !MEASUREMENT_ID) return;

  window.gtag("config", MEASUREMENT_ID, {
    page_path: path,
  });
};

export const trackEvent = (action, category, label = "") => {
  if (!window.gtag) return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
  });
};