import { ChevronDoubleUpIcon, PhoneIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  const linkSections = [
    {
      titleKey: "footer.product",
      links: [
        { nameKey: "nav.features", href: "/feature", isRoute: true },
        { nameKey: "nav.pricing", href: "/#pricing", isRoute: false },
        { nameKey: "footer.aboutUs", href: "/about", isRoute: true },
        { nameKey: "footer.contactUs", href: "/contact", isRoute: true },
      ],
    },
    {
      titleKey: "footer.resources",
      links: [
        { nameKey: "footer.blog", href: "/blog", isRoute: true },
        { nameKey: "footer.careers", href: "/career", isRoute: true },
        { nameKey: "nav.testimonials", href: "/#testimonials", isRoute: false },
      ],
    },
    {
      titleKey: "footer.legal",
      links: [
        { nameKey: "footer.privacyPolicy", href: "/privacy-policy", isRoute: true },
        { nameKey: "footer.termsOfService", href: "/terms", isRoute: true },
        { nameKey: "footer.cookiePolicy", href: "/cookie-policy", isRoute: true },
        { nameKey: "footer.gdprCompliance", href: "/gdpr-compliance", isRoute: true },
        { nameKey: "footer.licenses", href: "/license", isRoute: true },
      ],
    },
  ];

  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="relative mt-20 border-t border-gray-200/80 dark:border-gray-800/80 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl transition-colors">
      {/* Scroll to top button */}
      {isVisible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed z-50 p-3 text-white transition rounded-2xl cursor-pointer bottom-6 right-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:scale-110 shadow-xl"
          title="Scroll to top"
          aria-label="Scroll to top"
        >
          <ChevronDoubleUpIcon className="w-5 h-5" />
        </button>
      )}

      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Brand & Developer Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 via-emerald-500 to-cyan-400 p-0.5 shadow-lg shadow-emerald-500/20">
                <div className="w-full h-full bg-white dark:bg-gray-900 rounded-[10px] flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
              <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400 font-heading">
                PulseCare AI
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
              PulseCare AI is an intelligent clinical & patient healthcare platform integrating AI symptom triage, real-time vital log analytics, medication alarms, and teleconsultations.
            </p>
            <div className="pt-2">
              <div className="inline-flex flex-col space-y-1 p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 text-xs">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-600 dark:text-emerald-400">Architect & Developer</span>
                <span className="font-bold text-gray-900 dark:text-white">Vaibhava G</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 grid grid-cols-3 gap-6">
            {linkSections.map((section) => (
              <div key={section.titleKey}>
                <h4 className="text-xs font-bold text-gray-900 dark:text-gray-200 uppercase tracking-wider mb-4 font-heading">
                  {t(section.titleKey)}
                </h4>
                <ul className="space-y-2.5 text-xs font-medium">
                  {section.links.map((link) => (
                    <li key={link.nameKey}>
                      {link.isRoute ? (
                        <Link
                          to={link.href}
                          className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                        >
                          {t(link.nameKey)}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                        >
                          {t(link.nameKey)}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-1 space-y-3">
            <h4 className="text-xs font-bold text-gray-900 dark:text-gray-200 uppercase tracking-wider mb-4 font-heading">
              Contact & Hospital Partner
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-600 dark:text-gray-300 font-medium">
              <li className="flex items-start space-x-2">
                <PhoneIcon className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <a href="tel:+919731971568" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">+91 9731971568</a>
              </li>
              <li className="flex items-start space-x-2">
                <EnvelopeIcon className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <a href="mailto:vaibhavg8121@gmail.com" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition truncate">vaibhavg8121@gmail.com</a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPinIcon className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Dr TMA Pai Hospital, N.H. 66, Udupi, Karnataka 576101</span>
              </li>
            </ul>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-block px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition shadow-sm"
              >
                Get Directions
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200/80 dark:border-gray-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} PulseCare AI. Developed by Vaibhava G. All rights reserved.</p>
          <div className="flex items-center space-x-6 font-semibold">
            <Link to="/privacy-policy" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
