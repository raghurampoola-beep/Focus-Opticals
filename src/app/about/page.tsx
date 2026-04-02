import { ShieldCheck, History, Award } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">About Focus Opticals</h1>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
            Your trusted eye care partner in Chowk, Vijayawada. We believe everyone deserves to see the world clearly.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-16">
          <div className="grid md:grid-cols-2">
            <div className="h-64 md:h-auto relative bg-teal-100">
              <Image 
                src="https://images.unsplash.com/photo-1551061730-1c0f4f9f79dc?auto=format&fit=crop&q=80&w=800" 
                alt="Inside the optical store - Focus Opticals Vijayawada" 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our History</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Established with a vision to provide affordable and high-quality eye care, Focus Opticals has been serving the Vijayawada community for several years. Located conveniently in Chowk, we have grown from a small shop into a trusted destination for comprehensive eye testing and premium eyewear.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We pride ourselves on our personalized customer service. Our experienced opticians take the time to understand your lifestyle and visual needs to recommend the perfect frames and lenses.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 text-center mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Quality</h3>
            <p className="text-gray-600">
              We source our frames and lenses from reputed global manufacturers to ensure durability and style.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Trust & Reliability</h3>
            <p className="text-gray-600">
              With hundreds of satisfied customers and a 4.01 Google Rating, trust is the foundation of our business.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <History className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Years of Experience</h3>
            <p className="text-gray-600">
              Our seasoned opticians have the technical expertise to handle complex prescriptions and delicate repairs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
