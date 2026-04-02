"use client";

import Link from 'next/link';
import { MapPin, Phone, Clock, Facebook, Instagram } from 'lucide-react';
import { useState } from 'react';
import { Toast } from '@/components/ui/Toast';

export default function Footer() {
  const [showToast, setShowToast] = useState(false);

  const handleSocialClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowToast(true);
  };

  return (
    <>
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Info */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                Focus Opticals
              </h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                Your trusted partner for clear vision in Vijayawada. We provide professional eye testing and qualitative eye wear since years.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={handleSocialClick}
                  className="text-gray-400 hover:text-teal-500 transition-colors cursor-pointer"
                >
                  <span className="sr-only">Facebook</span>
                  <Facebook className="h-5 w-5" />
                </button>
                <button 
                  onClick={handleSocialClick}
                  className="text-gray-400 hover:text-teal-500 transition-colors cursor-pointer"
                >
                  <span className="sr-only">Instagram</span>
                  <Instagram className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-sm text-gray-400 hover:text-teal-400 transition-colors">Home</Link>
                </li>
                <li>
                  <Link 
                    href="/products"
                    className="text-sm text-gray-400 hover:text-teal-400 transition-colors text-left"
                  >
                    Frames & Glasses
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-sm text-gray-400 hover:text-teal-400 transition-colors">Eye Testing</Link>
                </li>

                <li>
                  <Link href="/contact" className="text-sm text-gray-400 hover:text-teal-400 transition-colors">Contact</Link>
                </li>
              </ul>
            </div>

            {/* Contact Details */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-gray-400">
                  <MapPin className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                  <span>9-76-3, Vinnakota Vari St, near S.K.P.V.Hindu High School Line, Chowk, Vijayawada, Andhra Pradesh 520001</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-400">
                  <Phone className="h-5 w-5 text-teal-500 flex-shrink-0" />
                  <span>+91 9989362643</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-400">
                  <Clock className="h-5 w-5 text-teal-500 flex-shrink-0" />
                  <span>Mon - Sat: 10 AM - 9 PM | Sunday: Holiday</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Focus Opticals. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <Toast 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
        message="Social Media coming soon!" 
      />
    </>
  );
}
