import React from 'react';
import { ShoppingBag, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-2xl font-bold">SoleStyle</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Crafting premium footwear that combines comfort, style, and durability for every step of your journey.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-300 hover:text-orange-500 transition-colors duration-200">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-300 hover:text-orange-500 transition-colors duration-200">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-300 hover:text-orange-500 transition-colors duration-200">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-300 hover:text-orange-500 transition-colors duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-orange-500 transition-colors duration-200">
                  Shop
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-orange-500 transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-orange-500 transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Policies</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-300 hover:text-orange-500 transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-orange-500 transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-orange-500 transition-colors duration-200">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-orange-500 transition-colors duration-200">
                  Shipping Info
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-orange-500 mr-3" />
                <span className="text-slate-300">info@solestyle.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-orange-500 mr-3" />
                <span className="text-slate-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-orange-500 mr-3 mt-1" />
                <span className="text-slate-300">
                  123 Fashion Street<br />
                  New York, NY 10001
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8 text-center">
          <p className="text-slate-400">
            © 2024 SoleStyle. All rights reserved. Crafted with passion for premium footwear.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;