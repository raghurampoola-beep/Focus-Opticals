"use client";

import { Eye, ShieldCheck, Wrench, Microscope, CalendarDays, ContactRound } from "lucide-react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { useState } from "react";
import { WHATSAPP_LINK } from "@/data/store";

export default function ServicesPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: 'Morning (10:00 AM - 1:00 PM)',
  });

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi Focus Opticals! I would like to book an eye test appointment.
Name: ${formData.name}
Phone: ${formData.phone}
Preferred Date: ${formData.date}
Preferred Time: ${formData.time}

Please confirm my appointment.`;
    
    window.open(`${WHATSAPP_LINK}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Our Professional Services</h1>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
            Focus Opticals provides comprehensive eye care services with state-of-the-art equipment in Vijayawada.
          </p>
        </div>

        {/* Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16 lg:mb-32">
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
              <Eye className="h-8 w-8 text-teal-600" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">Computerized Eye Testing</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use modern auto-refractometers to accurately determine your eye prescription. Our experienced opticians ensure that you get the precise vision correction tailored to your visual needs.
              </p>
              <WhatsAppButton variant="outline" message="I have a question about Computerized Eye Testing." label="Inquire" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <ShieldCheck className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">Lens Fitting & Dispensing</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We offer precision lens fitting (single vision, bifocals, progressives). Select from anti-glare, blue-light blocking, and photochromatic lenses customized for your daily lifestyle.
              </p>
              <WhatsAppButton variant="outline" message="I want to know lens pricing and options." label="Inquire" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
              <Wrench className="h-8 w-8 text-orange-600" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">Frame Repair & Alignment</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Broken frame or loose screws? Bring your glasses to our store. We perform quick repairs, nose pad replacements, string fixing, and perfect alignment checks to ensure comfort.
              </p>
              <WhatsAppButton variant="outline" message="I have a broken frame. Can you repair it today?" label="Inquire" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <ContactRound className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">Contact Lenses</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We dispense high-quality spherical and toric contact lenses. Our experts provide guidance on how to wear, clean, and maintain your lenses safely. Top brands available.
              </p>
              <WhatsAppButton variant="outline" message="I'm interested in buying contact lenses." label="Inquire" />
            </div>
          </div>

        </div>

        {/* Appointment Booking Section */}
        <div id="book" className="max-w-4xl mx-auto bg-gray-50 rounded-3xl p-6 md:p-8 lg:p-12 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-sm font-semibold mb-6">
                <CalendarDays className="h-4 w-4" />
                Easy Scheduling
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 md:mb-6">Book an Eye Test</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Regular eye exams are crucial for maintaining healthy vision. Fill out this simple form, and you will be redirected to WhatsApp to confirm your appointment instantly.
              </p>
              <ul className="space-y-4 mb-4">
                <li className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span> Fast and accurate testing
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span> Expert consultation provided
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span> No hidden fees
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    placeholder="9876543210"
                  />
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    id="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-teal-500 focus:border-teal-500 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                  <select
                    id="time"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-teal-500 focus:border-teal-500 transition-colors"
                  >
                    <option>Morning (10:00 AM - 1:00 PM)</option>
                    <option>Afternoon (1:00 PM - 4:00 PM)</option>
                    <option>Evening (4:00 PM - 8:00 PM)</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors shadow-sm"
                >
                  Confirm on WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
