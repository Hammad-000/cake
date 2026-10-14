import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { ImWhatsapp } from "react-icons/im";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const PHONE = "+923110250787";
const EMAIL = "cakesvilla@gmail.com";
const ADDRESS = "11/56 Block B, Area 51";

// Jis social link ka href khali ("") hoga, wo footer me nahi dikhega.
// Facebook aur X ka apna link yahan daal do.
const SOCIALS = [
  { name: "Instagram", href: "https://www.instagram.com/cakes_villa002", Icon: FaInstagram },
  { name: "WhatsApp", href: `https://wa.me/${PHONE.replace(/\D/g, "")}`, Icon: ImWhatsapp },
  { name: "Facebook", href: "", Icon: FaFacebook },
  { name: "X", href: "", Icon: FaXTwitter },
].filter((s) => s.href);

const serif = "font-[Fraunces,Georgia,serif]";
const link =
  "transition-colors hover:text-[#D4B27A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4B27A]";

const FooterContent = () => (
  <footer className="border-t border-[#C9A66B]/20 bg-[#2B1511] text-[#f3e5d8] dark:bg-[#0E0705]">
    <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-3">
      {/* Brand */}
      <div>
        <p className={`${serif} text-2xl font-medium`}>Cakes Villa</p>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#f3e5d8]/70">
          Freshly baked cakes and sweet moments, made with love.
        </p>
      </div>

      {/* Contact */}
      <div>
        <h3 className={`${serif} text-lg font-medium text-[#D4B27A]`}>Contact</h3>
        <address className="mt-4 space-y-3 text-sm not-italic">
          <a href={`tel:${PHONE}`} className={`flex items-center gap-3 ${link}`}>
            <FiPhone aria-hidden="true" /> {PHONE}
          </a>
          <a href={`mailto:${EMAIL}`} className={`flex items-center gap-3 ${link}`}>
            <FiMail aria-hidden="true" /> {EMAIL}
          </a>
          <p className="flex items-center gap-3">
            <FiMapPin aria-hidden="true" /> {ADDRESS}
          </p>
        </address>
      </div>

      {/* Social */}
      <div>
        <h3 className={`${serif} text-lg font-medium text-[#D4B27A]`}>Follow us</h3>
        <ul className="mt-4 flex flex-wrap gap-3">
          {SOCIALS.map(({ name, href, Icon }) => (
            <li key={name}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                title={name}
                className={`flex h-11 w-11 items-center justify-center rounded-full border border-[#C9A66B]/30 text-lg hover:border-[#D4B27A] ${link}`}
              >
                <Icon aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="border-t border-[#C9A66B]/20 py-5">
      <p className="text-center text-sm text-[#f3e5d8]/60">
        &copy; {new Date().getFullYear()} Cakes Villa. All rights reserved.
      </p>
    </div>
  </footer>
);

export default FooterContent;