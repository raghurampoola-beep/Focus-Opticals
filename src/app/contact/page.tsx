"use client";

import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CONTACT_PHONE } from "@/data/store";

export default function ContactPage() {
  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
            Have a question or looking for a specific frame? Get in touch with us. We are always happy to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-teal-100 p-3 rounded-full flex-shrink-0">
                <MapPin className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">Our Store Address</h3>
                <p className="text-gray-600">
                  9-76-3, Vinnakota Vari St, near S.K.P.V.Hindu High School Line, Chowk, Vijayawada, Andhra Pradesh 520001
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-teal-100 p-3 rounded-full flex-shrink-0">
                <Phone className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">Phone & WhatsApp</h3>
                <p className="text-gray-600 mb-3">+91 9989362643</p>
                <WhatsAppButton label="Message Us" variant="outline" className="w-full" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-teal-100 p-3 rounded-full flex-shrink-0">
                <Clock className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">Business Hours</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>Monday - Saturday: 10 AM - 9 PM</li>
                  <li>Sunday: Holiday</li>
                  <li className="text-teal-600 font-medium text-sm mt-2">Peak Hours: Usually busiest around 12 pm.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-[300px] md:h-[500px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.2662998634563!2d80.61868341113054!3d16.512689384152523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35f00eecaa4a11%3A0xc49bd7178c78a05b!2sFocus%20opticals!5e0!3m2!1sen!2sus!4v1709400000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location - Focus Opticals"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
