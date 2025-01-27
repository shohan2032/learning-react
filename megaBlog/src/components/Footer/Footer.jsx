import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Header/Logo";

function Footer() {
  const sections = [
    {
      title: "Company",
      links: [
        { name: "Features", to: "/" },
        { name: "Pricing", to: "/" },
        { name: "Affiliate Program", to: "/" },
        { name: "Press Kit", to: "/" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Account", to: "/" },
        { name: "Help", to: "/" },
        { name: "Contact Us", to: "/" },
        { name: "Customer Support", to: "/" },
      ],
    },
    {
      title: "Legals",
      links: [
        { name: "Terms & Conditions", to: "/" },
        { name: "Privacy Policy", to: "/" },
        { name: "Licensing", to: "/" },
      ],
    },
  ];

  return (
    <footer className="py-10 bg-gray-400 border-t border-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap -mx-6">
          {/* Logo and Copyright Section */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex flex-col justify-between h-full">
              <div className="mb-4">
                <Logo width="100px" />
              </div>
              <p className="text-sm text-gray-600">
                &copy; {new Date().getFullYear()} DevUI. All Rights Reserved.
              </p>
            </div>
          </div>

          {/* Sections */}
          {sections.map((section, index) => (
            <div
              key={index}
              className="w-full p-6 md:w-1/2 lg:w-2/12"
              aria-labelledby={`${section.title}-links`}
            >
              <h3
                id={`${section.title}-links`}
                className="mb-6 text-xs font-semibold uppercase tracking-wide text-gray-500"
              >
                {section.title}
              </h3>
              <ul>
                {section.links.map((link, idx) => (
                  <li key={idx} className="mb-4 last:mb-0">
                    <Link
                      to={link.to}
                      className="text-base font-medium text-gray-900 hover:text-gray-700 transition-colors"
                      aria-label={`Navigate to ${link.name}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
