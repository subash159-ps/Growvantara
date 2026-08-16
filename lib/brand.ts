export const brand = {
  name: "Global Hood",
  tagline: "Smarter Digital Marketing for Growing Businesses",
  description:
    "Global Hood helps businesses build their online presence, attract customers, and grow through digital marketing strategies.",
  email: "hello@globalhood.example",
  phone: "+1 (555) 010-1234",
  social: {
    instagram: "https://instagram.com/globalhood",
    linkedin: "https://linkedin.com/company/globalhood",
    facebook: "https://facebook.com/globalhood",
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
