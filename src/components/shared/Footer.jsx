import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPaperPlane,
  FaHeartbeat,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-[#020613] text-gray-400 text-sm border-t border-gray-900/60 pt-16 pb-8 px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-10 pb-12 border-b border-gray-950">
          {/* Column 1: Brand & Socials */}
          <div className="lg:col-span-3 flex flex-col space-y-5">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="text-[#10b981] text-2xl">
                <FaHeartbeat />
              </div>
              <span className="text-xl font-bold text-white tracking-wide">
                Health<span className="text-[#10b981]">Nest</span>
              </span>
            </div>
            <p className="text-gray-400 font-normal leading-relaxed text-[13px]">
              Your trusted healthcare companion. We connect you with the best
              doctors and healthcare services.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="#"
                className="p-2.5 bg-[#091424] hover:bg-[#10b981] text-white hover:text-black rounded-lg border border-gray-800 transition-all"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="#"
                className="p-2.5 bg-[#091424] hover:bg-[#10b981] text-white hover:text-black rounded-lg border border-gray-800 transition-all"
              >
                <FaTwitter size={14} />
              </a>
              <a
                href="#"
                className="p-2.5 bg-[#091424] hover:bg-[#10b981] text-white hover:text-black rounded-lg border border-gray-800 transition-all"
              >
                <FaInstagram size={14} />
              </a>
              <a
                href="#"
                className="p-2.5 bg-[#091424] hover:bg-[#10b981] text-white hover:text-black rounded-lg border border-gray-800 transition-all"
              >
                <FaLinkedinIn size={14} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 flex flex-col space-y-4 md:pl-4">
            <h4 className="text-white font-semibold text-base tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-[13px]">
              <li className="hover:text-[#10b981] cursor-pointer transition-colors">
                Home
              </li>
              <li className="hover:text-[#10b981] cursor-pointer transition-colors">
                Find Doctors
              </li>
              <li className="hover:text-[#10b981] cursor-pointer transition-colors">
                About Us
              </li>
              <li className="hover:text-[#10b981] cursor-pointer transition-colors">
                Contact
              </li>
              <li className="hover:text-[#10b981] cursor-pointer transition-colors">
                Dashboard
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h4 className="text-white font-semibold text-base tracking-wide">
              Services
            </h4>
            <ul className="space-y-2.5 text-[13px]">
              <li className="hover:text-[#10b981] cursor-pointer transition-colors">
                Book Appointment
              </li>
              <li className="hover:text-[#10b981] cursor-pointer transition-colors">
                Online Consultation
              </li>
              <li className="hover:text-[#10b981] cursor-pointer transition-colors">
                Prescriptions
              </li>
              <li className="hover:text-[#10b981] cursor-pointer transition-colors">
                Health Checkups
              </li>
              <li className="hover:text-[#10b981] cursor-pointer transition-colors">
                Health Packages
              </li>
            </ul>
          </div>

          {/* Column 4: Emergency Hotline */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h4 className="text-white font-semibold text-base tracking-wide">
              Emergency Hotline
            </h4>
            <p className="text-gray-400 text-[13px]">24/7 Emergency Support</p>
            <div className="text-[#10b981] text-lg font-bold tracking-wider pt-1">
              +91 1234 567 890
            </div>
            <button className="w-full py-2.5 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-[#10b981] to-[#059669] hover:opacity-95 transition-all text-sm shadow-md shadow-[#10b981]/10">
              Call Now
            </button>
          </div>

          {/* Column 5: Subscribe to Newsletter */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <h4 className="text-white font-semibold text-base tracking-wide">
              Subscribe to Newsletter
            </h4>
            <p className="text-gray-400 text-[13px] leading-relaxed">
              Get health tips and updates delivered to your inbox.
            </p>

            {/* Input Field with Send Button inside */}
            <div className="flex items-center w-full bg-[#091424] border border-gray-800 rounded-xl p-1 focus-within:border-emerald-500/50 transition-all">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-gray-600 outline-none"
              />
              <button className="p-2.5 rounded-lg text-white bg-gradient-to-r from-[#10b981] to-[#059669] hover:opacity-95 transition-all flex items-center justify-center">
                <FaPaperPlane size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-[12px] text-gray-500 gap-4">
          <div>&copy; 2025 HealthNest. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Terms of Service
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Refund Policy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
