export const navMenu = [
  {
    label: "Home",
    path: "/",
    icon: "home",
  },
  {
    label: "Who We are",
    path: "/about",
    icon: "users",
    children: [
      {
        label: "About Us",
        path: "/about",
        icon: "users",
      },
      {
        label: "Meet Our Team",
        path: "/team",
        icon: "team",
      },
      {
        label: "Legal Documents",
        path: "/legal-documents",
        icon: "file",
      },
      {
        label: "Gallery",
        path: "/gallery",
        icon: "Gallery",
      },
    ],
  },
  {
    label: "What We do",
    path: "/child-education",
    icon: "education",
    children: [
      {
        label: "Child Education",
        path: "/child-education",
        icon: "education",
      },
      {
        label: "Child Health & Nutrition",
        path: "/child-health-nutrition",
        icon: "health",
      },
      {
        label: "Social Activity",
        path: "/social-activity",
        icon: "activity",
      },
    ],
  },
  {
    label: "Get Involved",
    path: "/contact",
    icon: "contact",
    children: [
      {
        label: "Contact Us",
        path: "/contact",
        icon: "contact",
      },
      {
        label: "Volunteer",
        path: "/volunteer",
        icon: "volunteer",
      },
    ],
  },
];

export const siteContact = {
  phone: "+91 90998 17143",
  phoneHref: "tel:+919099817143",
  email: "info@patelfoundation.in",
  emailHref: "mailto:info@patelfoundation.in",
  address: "Kavitha, Borsad, Anand, Gujarat, 388545 - India",
};

export const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61574684506372" },
  { label: "Instagram", href: "https://www.instagram.com/patelfoundation_borsad/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/patel-foundation-ind-8836473aa/" },
  { label: "YouTube", href: "https://www.youtube.com/@PatelFoundationBorsad" },
];