"use client";

import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Star, Heart, Check, Info, Minus, Plus, MessageCircle, MapPin, Camera, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { TryOnModal } from '@/components/ui/TryOnModal';
import { useSearchParams } from 'next/navigation';

const powerTypes = [
  {
    id: 'with-power', name: 'With Power', description: 'Positive, Negative or Cylindrical', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8m-4-4v8" />
        <path d="M6 15l12-6" />
      </svg>
    )
  },
  {
    id: 'zero-power', name: 'Zero Power', description: 'Blue light block for screen protection', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2v4m0 12v4M2 12h4m12 0h4" />
        <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
      </svg>
    )
  },
  {
    id: 'progressive', name: 'Progressive/Bifocals', description: 'Two powers in one eye', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
        <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z" />
        <path d="M3 12h18" />
        <circle cx="12" cy="16" r="3" />
      </svg>
    )
  },
  {
    id: 'frame-only', name: 'Frame Only', description: 'With no lenses', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-10">
        <rect x="3" y="8" width="7" height="8" rx="2" />
        <rect x="14" y="8" width="7" height="8" rx="2" />
        <path d="M10 12h4" />
      </svg>
    )
  }
];

const lensOptions = [
  { id: 'basic', name: 'Basic Lenses', price: '₹250', description: 'Basic Lenses (Anti-Glare)' },
  { id: 'blue-cut', name: 'Blue Cut Lenses', price: '₹600', description: 'Protects from digital eye strain' },
  { id: 'photo-gray', name: 'Photo Gray', price: '₹900', description: 'Lenses turn dark in sunlight' }
];



function ProductDetailContent() {
  const searchParams = useSearchParams();
  const shape = searchParams.get('shape') || 'square';
  const [step, setStep] = useState(1);

  const productInfo = {
    square: {
      name: "Square Aviator",
      price: "₹700",
      rating: "4.0",
      desc: "Ultra Lightweight TR90 Square Frame",
      images: [
        { label: 'Front View', url: 'https://ik.imagekit.io/FocusOpticals/square1.png?updatedAt=1774424748071', color: 'bg-teal-500' },
        { label: 'Side Profile', url: 'https://ik.imagekit.io/FocusOpticals/square2.png?updatedAt=1774424748158', color: 'bg-gray-900' }
      ],
      colors: [
        { name: 'Matte Black', hex: '#000000', image: 'https://ik.imagekit.io/FocusOpticals/square2.png?updatedAt=1774424748158' }
      ]
    },
    rectangle: {
      name: "Rectangle Pro",
      price: "₹750",
      rating: "4.0",
      desc: "Wide Vision Rectangular Frame",
      images: [
        { label: 'Front View', url: 'https://ik.imagekit.io/FocusOpticals/square2.png?updatedAt=1774424748158', color: 'bg-teal-500' },
        { label: 'Side Profile', url: 'https://ik.imagekit.io/FocusOpticals/square1.png?updatedAt=1774424748071', color: 'bg-gray-900' }
      ],
      colors: [
        { name: 'Matte Black', hex: '#000000', image: 'https://ik.imagekit.io/FocusOpticals/square2.png?updatedAt=1774424748158' }
      ]
    },
    geometric: {
      name: "Geometric Hex Vision",
      price: "₹999",
      rating: "4.3",
      desc: "Modern Hexagonal Design • Premium Titanium",
      images: [
        { label: 'Front View', url: 'https://ik.imagekit.io/FocusOpticals/geo2.png', color: 'bg-blue-400' },
        { label: 'Right View', url: 'https://ik.imagekit.io/FocusOpticals/geo3.png', color: 'bg-teal-500' },
        { label: 'Top View', url: 'https://ik.imagekit.io/FocusOpticals/geo1.png', color: 'bg-blue-600' }
      ],
      colors: [
        { name: 'Ocean Blue', hex: '#1e3a8a', image: 'https://ik.imagekit.io/FocusOpticals/geo3.png' }
      ]
    },
    wayfarer: {
      name: "Gradient Wayfarer Frame",
      price: "₹899",
      rating: "4.5",
      desc: "Black-to-Clear Gradient",
      images: [
        { label: 'Front View', url: 'https://ik.imagekit.io/FocusOpticals/new_F.png', color: 'bg-teal-600' },
        { label: 'Side Profile', url: 'https://ik.imagekit.io/FocusOpticals/new_L.png', color: 'bg-gray-900' },
        { label: 'Top View', url: 'https://ik.imagekit.io/FocusOpticals/Topview.png', color: 'bg-blue-500' },
        { label: 'Right View', url: 'https://ik.imagekit.io/FocusOpticals/new_R.png', color: 'bg-blue-400' }
      ],
      colors: [
        { name: 'Black-to-Clear Gradient', hex: '#333333', image: 'https://ik.imagekit.io/FocusOpticals/new_F.png' }
      ]
    },
    'beta-ultem': {
      name: "Crystal/Gunmetal β-Ultem",
      price: "₹1,299",
      rating: "4.8",
      desc: "High-flexibility performance eyewear • β-Ultem (Beta-Ultem)",
      images: [
        { label: 'Front View', url: 'https://ik.imagekit.io/FocusOpticals/front.png?updatedAt=1775112199067', color: 'bg-teal-500' },
        { label: 'Side Profile', url: 'https://ik.imagekit.io/FocusOpticals/right.png?updatedAt=1775112197641', color: 'bg-gray-900' },
        { label: 'Top View', url: 'https://ik.imagekit.io/FocusOpticals/topview.png?updatedAt=1775112198982', color: 'bg-blue-500' },
        { label: 'Left Profile', url: 'https://ik.imagekit.io/FocusOpticals/left.png?updatedAt=1775112199305', color: 'bg-blue-600' }
      ],
      colors: [
        { name: 'Crystal/Gunmetal', hex: '#8e9196', image: 'https://ik.imagekit.io/FocusOpticals/front.png?updatedAt=1775112199067' }
      ]
    },
    'vector-slate': {
      name: "Vector Slate",
      price: "₹850",
      rating: "4.7",
      desc: "The Executive Browline • Semi-Rimless Rectangular Frame",
      images: [
        { label: 'Front View', url: 'https://ik.imagekit.io/FocusOpticals/front-k.png', color: 'bg-teal-500' },
        { label: 'Side Profile', url: 'https://ik.imagekit.io/FocusOpticals/side-k.png', color: 'bg-gray-900' },
        { label: 'Right View Full', url: 'https://ik.imagekit.io/FocusOpticals/right-k.png', color: 'bg-blue-600' }
      ],
      colors: [
        { name: 'Matte Black', hex: '#000000', image: 'https://ik.imagekit.io/FocusOpticals/front-k.png' }
      ]
    }
  };

  const currentProduct = productInfo[shape as keyof typeof productInfo] || productInfo.square;

  const [selectedPowerType, setSelectedPowerType] = useState<string | null>(null);
  const [selectedLens, setSelectedLens] = useState<string | null>(null);
  const [manualPower, setManualPower] = useState('');
  const [selectedColor, setSelectedColor] = useState(currentProduct.colors[0]);
  const [isLiked, setIsLiked] = useState(false);
  const [isTryOnOpen, setIsTryOnOpen] = useState(false);

  const powerTypeName = powerTypes.find(p => p.id === selectedPowerType)?.name;
  const lensName = lensOptions.find(l => l.id === selectedLens)?.name;

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handlePowerTypeSelect = (id: string) => {
    setSelectedPowerType(id);
    if (id === 'frame-only') {
      setStep(3); // Skip to final summary/checkout
    } else {
      nextStep();
    }
  };

  const handleLensSelect = (id: string) => {
    setSelectedLens(id);
    if (selectedPowerType === 'zero-power') {
      setStep(3); // Skip manual power entry
    } else {
      nextStep();
    }
  };

  const parsePrice = (priceStr: string) => parseInt(priceStr.replace(/[^\d]/g, '')) || 0;
  const framePrice = parsePrice(currentProduct.price);
  const lensPrice = selectedLens ? parsePrice(lensOptions.find(l => l.id === selectedLens)?.price || '0') : 0;
  const totalPrice = framePrice + lensPrice;

  const originalPriceNumber = framePrice * 2;
  const formattedOriginalPrice = `₹${originalPriceNumber.toLocaleString()}`;
  const formattedTotalPrice = `₹${totalPrice.toLocaleString()}`;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Top Nav / Breadcrumbs */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-500">
          <Link href="/products" className="flex items-center gap-1 hover:text-teal-600 transition-colors">
            <ChevronLeft size={16} />
            Back to Collection
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900">{currentProduct.name}</span>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

          {/* Left Column - Dynamic Images */}
          <div className="space-y-6">
            {currentProduct.images.map((img, idx) => (
              <motion.div
                key={img.url}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 aspect-[16/9] relative lg:aspect-[4/3] overflow-hidden group"
              >
                <div className={`absolute top-6 left-6 z-10 ${img.color} text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest`}>
                  {img.label}
                </div>
                {idx === 0 && (
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white shadow-md text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Heart size={20} fill={isLiked ? "currentColor" : "none"} className={isLiked ? "text-red-500" : ""} />
                  </button>
                )}
                <Image
                  src={img.url}
                  alt={`${currentProduct.name} - ${img.label}`}
                  fill
                  className="object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </div>

          {/* Right Column - Controls */}
          <div className="lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <span className="text-sm font-bold text-gray-900">{currentProduct.rating}</span>
                <span className="text-xs text-gray-400 font-medium">(1,540 Reviews)</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-2 tracking-tight uppercase italic">
                {currentProduct.name}
              </h1>
              <p className="text-gray-500 text-lg mb-8 font-medium">{currentProduct.desc}</p>

              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-4xl font-black text-gray-900">{currentProduct.price}</span>
                <span className="text-xl text-gray-400 line-through">{formattedOriginalPrice}</span>
                <span className="bg-teal-100 text-teal-700 text-xs font-black px-2 py-1 rounded-md">50% OFF</span>
              </div>

              {/* AR Try On Trigger */}
              <button
                onClick={() => setIsTryOnOpen(true)}
                className="w-full mb-10 flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg shadow-teal-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <Camera size={24} />
                  </div>
                  <div className="text-left">
                    <p className="font-black uppercase italic tracking-wider text-sm leading-none mb-1">Virtual Try-On</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">See how they look on you</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  <Sparkles size={12} className="animate-pulse" />
                  Live AR
                </div>
              </button>

              <div className="w-full h-px bg-gray-100 mb-10" />

              {/* Color & Size Selection */}
              <div className="mb-10 flex items-start gap-12">
                <div>
                  <label className="text-[11px] font-black uppercase tracking-widest text-teal-600 mb-4 block">
                    Frame Color: <span className="text-gray-900">{selectedColor.name}</span>
                  </label>
                  <div className="flex gap-4">
                    {currentProduct.colors.map((color) => (
                      <div
                        key={color.name}
                        className="w-12 h-12 rounded-full border-2 border-teal-600 scale-110 shadow-lg p-1"
                      >
                        <div
                          className="w-full h-full rounded-full shadow-inner"
                          style={{ backgroundColor: color.hex }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase tracking-widest text-teal-600 mb-4 block">
                    Frame Size:
                  </label>
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl border-2 border-gray-100 bg-white font-black text-xl text-gray-900 shadow-sm">
                    M
                  </div>
                </div>
              </div>

              {/* Lens Selection Multi-Step Flow */}
              <div className="mb-10 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    {[1, 2, 3].map((s) => (
                      <div key={s} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs transition-colors ${step >= s ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                          {s}
                        </div>
                        {s < 3 && <div className={`w-8 h-0.5 ${step > s ? 'bg-teal-600' : 'bg-gray-100'}`} />}
                      </div>
                    ))}
                  </div>
                  {step > 1 && (
                    <button onClick={prevStep} className="text-xs font-black uppercase tracking-widest text-teal-600 hover:text-teal-700">
                      Back
                    </button>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h3 className="text-xl font-black text-gray-900 uppercase">Select Power Type</h3>
                      <div className="grid grid-cols-1 gap-3">
                        {powerTypes.map((type) => (
                          <button
                            key={type.id}
                            onClick={() => handlePowerTypeSelect(type.id)}
                            className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left group relative ${selectedPowerType === type.id ? 'border-teal-600 bg-teal-50/50 shadow-sm' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                          >
                            <div className={`p-2 rounded-xl transition-colors ${selectedPowerType === type.id ? 'text-teal-600 bg-white shadow-sm' : 'bg-gray-100 text-gray-400'}`}>
                              {type.icon}
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-gray-900">{type.name}</p>
                              <p className="text-xs text-gray-500 font-medium">{type.description}</p>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedPowerType === type.id ? 'bg-teal-600 border-teal-600' : 'border-gray-300'}`}>
                              {selectedPowerType === type.id && <Check size={14} className="text-white" />}
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h3 className="text-xl font-black text-gray-900 uppercase">Choose Lenses</h3>
                      <div className="grid grid-cols-1 gap-3">
                        {lensOptions.map((lens) => (
                          <button
                            key={lens.id}
                            onClick={() => handleLensSelect(lens.id)}
                            className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all text-left group ${selectedLens === lens.id ? 'border-teal-600 bg-teal-50/50 shadow-sm' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedLens === lens.id ? 'bg-teal-600 border-teal-600' : 'border-gray-300'}`}>
                                {selectedLens === lens.id && <Check size={14} className="text-white" />}
                              </div>
                              <div>
                                <p className={`font-bold text-base transition-colors ${selectedLens === lens.id ? 'text-teal-900' : 'text-gray-900'}`}>
                                  {lens.name}
                                </p>
                                <p className="text-xs text-gray-500 font-medium">{lens.description}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-black text-teal-600">{lens.price}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h3 className="text-xl font-black text-gray-900 uppercase">Power Details</h3>
                      {selectedPowerType === 'frame-only' ? (
                        <div className="p-6 bg-teal-50 rounded-2xl border-2 border-teal-100 text-center">
                          <p className="font-bold text-teal-900">You've selected Frame Only.</p>
                          <p className="text-sm text-teal-700">No lenses will be included.</p>
                        </div>
                      ) : selectedPowerType === 'zero-power' ? (
                        <div className="p-6 bg-teal-50 rounded-2xl border-2 border-teal-100">
                          <p className="font-bold text-teal-900">Zero Power Blue Cut Lenses</p>
                          <p className="text-sm text-teal-700">Perfect for digital protection without eyesight correction.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-widest text-teal-600 block">
                            Enter Power Details Manually:
                          </label>
                          <textarea
                            value={manualPower}
                            onChange={(e) => setManualPower(e.target.value)}
                            placeholder="Example: R: -2.25, L: -2.50 with 0.5 Cyl..."
                            className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-teal-500 focus:outline-none transition-colors min-h-[120px] text-sm font-medium text-gray-700"
                          />
                        </div>
                      )}

                      <div className="pt-4 border-t border-gray-100 mt-6">
                        <div className="flex flex-col gap-2 mb-6">
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Order Summary</p>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">Frame: {currentProduct.name}</span>
                            <span className="font-bold text-gray-900">{currentProduct.price}</span>
                          </div>
                          {selectedPowerType !== 'frame-only' && selectedLens && (
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-600">Lens: {lensName} ({powerTypeName})</span>
                              <span className="font-bold text-gray-900">{lensOptions.find(l => l.id === selectedLens)?.price}</span>
                            </div>
                          )}
                          <div className="flex justify-between items-center pt-2 border-t border-dashed border-gray-200 mt-2">
                            <span className="font-black text-gray-900 uppercase italic">Total Amount</span>
                            <span className="text-2xl font-black text-teal-600">{formattedTotalPrice}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <WhatsAppButton
                  message={`Hi! I'm interested in the ${currentProduct.name}.

Order Details:
- Frame: ${currentProduct.name} (${currentProduct.price})
- Power Type: ${powerTypeName}
${selectedLens ? `- Lens: ${lensName} (${lensOptions.find(l => l.id === selectedLens)?.price})` : ''}
${manualPower ? `- Power Details: ${manualPower}` : ''}
- Color: ${selectedColor.name}

Total Amount: ${formattedTotalPrice}`}
                  disabled={step < 3}
                  className={`flex-1 py-6 text-lg font-black rounded-2xl shadow-xl transition-all ${step < 3 ? 'opacity-50 grayscale' : 'shadow-teal-600/20'}`}
                />
                <Button variant="outline" className="px-8 py-6 rounded-2xl border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center gap-2">
                  <Info size={20} />
                  Care Guide
                </Button>
              </div>

              <Link href="/contact" className="block pt-3">
                <button className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-black uppercase tracking-widest transition-colors shadow-md">
                  <MapPin size={18} />
                  Visit Our Store
                </button>
              </Link>

            </motion.div>
          </div>
        </div>
      </main>

      <TryOnModal
        isOpen={isTryOnOpen}
        onClose={() => setIsTryOnOpen(false)}
        productImage={currentProduct.images[0].url}
        productName={currentProduct.name}
      />
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetailContent />
    </Suspense>
  );
}
