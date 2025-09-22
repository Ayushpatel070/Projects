import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../assets/logo.png";

const LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const PHONE = "+919898146433";
const WHATSAPP_LINK = `https://wa.me/919898146433`;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow font-poppins sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img src={logo} alt="Manish Industries logo" className="h-12 w-12 md:h-14 md:w-14 object-contain rounded" />
          <span className="font-bold text-lg text-primary">Manish Industries</span>
        </NavLink>
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {LINKS.map(link => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) =>
                `transition-colors ${isActive ? "text-primary" : "text-black hover:text-primary"}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={`tel:${PHONE}`}
            className="px-3 py-1 rounded bg-primary text-white font-semibold hover:bg-red-700 transition"
          >
            Call: {PHONE.replace("+91", "0")}
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-green-600 text-2xl hover:text-green-700"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>
        </div>
        {/* Mobile menu button */}
        <button
          className="md:hidden text-2xl text-black"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <HiMenu />
        </button>
      </div>
      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 md:hidden" onClick={() => setOpen(false)}>
          <div
            className="absolute top-0 right-0 w-64 h-full bg-white shadow-lg flex flex-col p-6"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="self-end text-2xl mb-6"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <HiX />
            </button>
            {LINKS.map(link => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  `mb-4 text-lg transition-colors ${isActive ? "text-primary" : "text-black hover:text-primary"}`
                }
                onClick={() => setOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            <a
              href={`tel:${PHONE}`}
              className="px-3 py-2 rounded bg-primary text-white font-semibold mb-3 text-center"
            >
              Call: {PHONE.replace("+91", "0")}
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 text-2xl text-center"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}