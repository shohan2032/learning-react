import React from "react";
import About from "./About";
import Contact from "./Contact";
import Social from "./Social";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <About />
        <Contact />
        <Social />
      </div>
      <div className="text-center text-gray-500 mt-8">
        <p>&copy; 2025 Climate Captains. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;