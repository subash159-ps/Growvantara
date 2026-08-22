import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/brand/social-icons";
import { brand, footerNav, mainNav } from "@/lib/brand";

const socialLinks = [
  { href: brand.social.instagram, label: "Instagram", icon: InstagramIcon },
  { href: brand.social.linkedin, label: "LinkedIn", icon: LinkedinIcon },
  { href: brand.social.facebook, label: "Facebook", icon: FacebookIcon },
];

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <Logo className="text-navy-foreground" showTagline />
            <p className="mt-3 max-w-xs text-sm text-navy-muted">{brand.description}</p>
            <div className="mt-5 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="flex size-8 items-center justify-center rounded-full border border-white/15 text-navy-muted transition-colors hover:border-primary hover:text-primary"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold">Navigate</p>
            <ul className="mt-3 space-y-2">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-navy-muted hover:text-navy-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold">Contact</p>
            <ul className="mt-3 space-y-2 text-sm text-navy-muted">
              <li>
                <a href={`mailto:${brand.email}`} className="hover:text-navy-foreground">
                  {brand.email}
                </a>
              </li>
              <li>
                <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="hover:text-navy-foreground">
                  {brand.phone}
                </a>
              </li>
              <li>
                <a
                  href={brand.address.mapsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-navy-foreground"
                >
                  {brand.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-navy-muted">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            {footerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-navy-muted hover:text-navy-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
