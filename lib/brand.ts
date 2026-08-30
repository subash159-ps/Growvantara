const addressQuery =
  "1-1-261, 1st Cross Road, Srinivasa Nagar Colony, Near St. High School, A S Rao Nagar, Kapra, Hyderabad 500062";

export const brand = {
  name: "Growvantra",
  tagline: "Smarter Digital Marketing for Growing Businesses",
  description:
    "Growvantra helps businesses build their online presence, attract customers, and grow through digital marketing strategies.",
  email: "hello@growvantra.in",
  phone: "+91 90597 80843",
  address: {
    lines: [
      "1-1-261, 1st Cross Road",
      "Srinivasa Nagar Colony, Near St. High School",
      "A S Rao Nagar, Kapra, Hyderabad 500062",
    ],
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressQuery)}`,
    mapsEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(addressQuery)}&output=embed`,
  },
  social: {
    instagram: "https://instagram.com/growvantra",
    linkedin: "https://linkedin.com/company/growvantra",
    facebook: "https://facebook.com/growvantra",
  },
} as const;

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
] as const;
