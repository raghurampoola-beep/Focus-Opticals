"use client";

import Link from "next/link";
import Image from "next/image";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { getImageUrl } from "@/lib/imageUtils";
import { imagekitLoader } from "@/lib/imagekit";
import { Eye, ShieldCheck, Wrench, MapPin, CalendarDays, ThumbsUp, Glasses, Users, Award, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const FrameIcon = ({ type, className }: { type: 'rectangle' | 'square' | 'round' | 'geometric', className?: string }) => {
  const icons = {
    rectangle: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="9" width="7" height="4" rx="1" />
        <rect x="14" y="9" width="7" height="4" rx="1" />
        <path d="M10 11h4" />
      </svg>
    ),
    square: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="7" width="7" height="7" rx="1" />
        <rect x="14" y="7" width="7" height="7" rx="1" />
        <path d="M10 10h4" />
      </svg>
    ),
    round: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="7" cy="11" r="4" />
        <circle cx="17" cy="11" r="4" />
        <path d="M11 11h2" />
      </svg>
    ),
    geometric: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 11l2-3h4l2 3l-2 3h-4z" />
        <path d="M13 11l2-3h4l2 3l-2 3h-4z" />
        <path d="M11 11h2" />
      </svg>
    )
  };
  return icons[type] || null;
};

const KidIcon = ({ type, className }: { type: 'baby' | 'young' | 'regular' | 'teen', className?: string }) => {
  const icons = {
    baby: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <circle cx="8" cy="11" r="1" />
        <circle cx="16" cy="11" r="1" />
        <path d="M8 16a4 4 0 0 0 8 0" />
        <path d="M12 2v2" />
      </svg>
    ),
    young: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <circle cx="8" cy="11" r="1.5" />
        <circle cx="16" cy="11" r="1.5" />
        <path d="M8 16c1.5 1 6.5 1 8 0" />
        <path d="M12 2c.5 0 2 1 2 2" />
      </svg>
    ),
    regular: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <circle cx="8" cy="11" r="1.5" strokeWidth="3" />
        <circle cx="16" cy="11" r="1.5" strokeWidth="3" />
        <path d="M7 16s2 2 5 2 5-2 5-2" />
        <path d="M9 2l2 2m4-2l-2 2" />
      </svg>
    ),
    teen: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <path d="M8 11h.01M16 11h.01" strokeWidth="3" />
        <path d="M12 17c2 0 3-1 3-1H9s1 1 3 1z" />
        <path d="M4 8s2-2 3-2 3 1 5 1 5-1 5-1 3 2 3 2" />
      </svg>
    )
  };
  return icons[type] || null;
};

const VisionCompare = () => {
  const [width, setWidth] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInteraction = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setWidth(percent);
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] md:aspect-video lg:aspect-square cursor-col-resize select-none touch-none"
      onMouseMove={(e) => handleInteraction(e.clientX)}
      onTouchMove={(e) => {
        e.preventDefault();
        handleInteraction(e.touches[0].clientX);
      }}
    >
      {/* Blurred Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center grayscale blur-[30px] scale-110"
        style={{ backgroundImage: `url(https://ik.imagekit.io/FocusOpticals/clear.jpg?tr=w-600,bl-50,q-10)` }}
        role="img"
        aria-label="Blurry vision representation without glasses"
      ></div>
      <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-bold border border-white/20">
        Without Glasses
      </div>

      {/* Focus Layer (Revealed by drag/touch) */}
      <div
        className="absolute inset-y-0 left-0 bg-cover bg-center border-r-4 border-teal-400 overflow-hidden transition-none"
        style={{
          backgroundImage: `url(https://ik.imagekit.io/FocusOpticals/clear.jpg?tr=w-600,q-80)`,
          width: `${width}%`
        }}
      >
        <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-teal-600 text-white px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-bold shadow-lg whitespace-nowrap">
          With Focus Opticals
        </div>
      </div>

      {/* Drag Handle */}
      <div
        className="absolute top-0 bottom-0 z-10 flex items-center justify-center"
        style={{ left: `${width}%`, transform: 'translateX(-50%)' }}
      >
        <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full shadow-2xl flex items-center justify-center border-2 border-teal-400">
          <ArrowRight className="text-teal-600 w-4 h-4 md:w-5 md:h-5 rotate-180" />
          <ArrowRight className="text-teal-600 w-4 h-4 md:w-5 md:h-5 -ml-2" />
        </div>
      </div>

      {/* Instruction overlay */}
      {width === 50 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-white/90 backdrop-blur-md px-4 py-2 md:px-6 md:py-3 rounded-full shadow-2xl flex items-center gap-2 md:gap-3 animate-float-slow">
            <span className="font-bold text-gray-900 text-sm md:text-base">Drag to compare</span>
            <ArrowRight className="text-teal-600 w-4 h-4 md:w-5 md:h-5" />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default function Home() {
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);
  const [tappedCat, setTappedCat] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-teal-50 py-12 sm:py-16 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4 md:mb-6 font-heading">
                See the World Clearly with Focus Opticals
              </h1>
              <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8 font-sans">
                Your trusted local experts for eye testing, premium frames, and quality sunglasses in Chowk, Vijayawada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/services#book">
                  <Button className="w-full sm:w-auto text-lg px-8 py-4">
                    <CalendarDays className="mr-2 h-5 w-5" />
                    Book Eye Test
                  </Button>
                </Link>
                <WhatsAppButton
                  message="Hi, I would like to know more about your optical services and frames."
                  className="w-full sm:w-auto text-lg px-8 py-4"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative isolate text-center mt-8 lg:mt-0"
            >
              <div className="absolute inset-0 -z-10 bg-teal-200 rounded-full blur-3xl opacity-50 transform translate-x-10 translate-y-10"></div>
              <Image
                loader={imagekitLoader}
                src="100.jpg"
                alt="Focus Opticals Eyewear Collection - Best frames in Vijayawada"
                width={600}
                height={450}
                className="rounded-3xl shadow-2xl object-contain h-auto max-h-[250px] lg:max-h-[450px] w-full animate-float-slow mx-auto"
                priority
              />
              <div className="mt-4 lg:mt-8">
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-teal-800 tracking-tight animate-pulse uppercase font-heading">
                  Book Free Eye Test For Free
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Categories Section */}
      <section id="collections" className="py-24 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Explore Our Collections</h2>
            <div className="w-24 h-1.5 bg-teal-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mb-20 text-center">
            {[
              { id: 'eye', label: 'Eyeglasses', img: 'eye.jpg', items: ['Rectangle', 'Square', 'Round', 'Geometric'] },
              { id: 'sun', label: 'Sunglasses', img: 'sun.png', items: ['Rectangle', 'Square', 'Round', 'Geometric'] },
              { id: 'special', label: 'Special Power', img: 'spcial.jpeg', items: ['Zero power', 'Reading'] },
              { id: 'kids', label: 'Kids Glasses', img: 'Kids.jpg', items: ['8-12 Years', '13-17 Years'] }
            ].map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onMouseEnter={() => { if (!('ontouchstart' in window)) setHoveredCat(cat.id); }}
                onMouseLeave={() => { if (!('ontouchstart' in window)) setHoveredCat(null); }}
                onClick={() => {
                  if ('ontouchstart' in window) {
                    setTappedCat(tappedCat === cat.id ? null : cat.id);
                  }
                }}
                className="flex flex-col items-center group cursor-pointer relative"
              >
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.15), 0 10px 15px -10px rgb(0 0 0 / 0.15)",
                    borderColor: "#0d9488"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-24 h-24 md:w-36 md:h-36 rounded-full border-2 border-gray-100 overflow-hidden bg-white shadow-sm relative transition-colors duration-300"
                >
                  <Image
                    loader={imagekitLoader}
                    src={cat.img}
                    alt={`Browse ${cat.label} - Focus Opticals Vijayawada`}
                    fill
                    quality={90}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </motion.div>
                <h3 className="mt-3 md:mt-6 font-bold text-sm md:text-lg text-gray-900 group-hover:text-teal-600 transition-colors">{cat.label}</h3>
                <div className="mt-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity text-teal-600 text-xs md:text-sm font-semibold flex items-center gap-1">
                  Tap to explore <ArrowRight size={14} />
                </div>

                {/* Improved Dropdown with AnimatePresence and Bridge Area */}
                <AnimatePresence>
                  {(hoveredCat === cat.id || tappedCat === cat.id) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, visibility: "hidden" }}
                      animate={{ opacity: 1, y: 0, visibility: "visible" }}
                      exit={{
                        opacity: 0,
                        y: 10,
                        transition: { delay: 0.1, duration: 0.2 }
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2 md:pt-4 w-48 md:w-64 z-50 pointer-events-auto"
                    >
                      {/* Invisible Bridge to maintain hover state */}
                      <div className="absolute top-0 left-0 right-0 h-4 bg-transparent" />

                      <div className="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-200 p-4 md:p-6">
                        <ul className="space-y-3 md:space-y-4 text-left">
                          {cat.items.map((item) => {
                            const isProductLink = (cat.id === 'eye' || cat.id === 'sun') && (item === 'Rectangle' || item === 'Square' || item === 'Geometric');
                            const isSpecialLink = cat.id === 'special';

                            // Prevent Sunglasses -> Rectangle/Geometric/Square from redirecting
                            const shouldLink = isProductLink && !(cat.id === 'sun' && (item === 'Rectangle' || item === 'Geometric' || item === 'Square'));

                            const content = (
                              <li key={item} className={`flex items-center gap-3 md:gap-4 text-sm md:text-base font-bold cursor-pointer transition-colors group/item py-1 text-gray-800 hover:text-teal-600`}>
                                <div className="flex-shrink-0">
                                  {cat.id === 'kids' ? (
                                    <KidIcon type={item.includes('8') ? 'regular' : 'teen'} className="w-9 h-9 text-gray-500 group-hover/item:text-teal-500 transition-colors" />
                                  ) : (cat.id === 'eye' || cat.id === 'sun') ? (
                                    <FrameIcon type={item.toLowerCase() as any} className="w-9 h-9 text-gray-500 group-hover/item:text-teal-500 transition-colors" />
                                  ) : <ShieldCheck className="w-6 h-6 text-gray-500 group-hover/item:text-teal-500 transition-colors" />}
                                </div>
                                <span>{item}</span>
                              </li>
                            );

                            if (shouldLink) {
                              return (
                                <Link key={item} href={`/products?shape=${item.toLowerCase()}`} className="block">
                                  {content}
                                </Link>
                              );
                            }

                            if (isSpecialLink) {
                              return (
                                <Link key={item} href={`/products?type=special&item=${item.toLowerCase().replace(' ', '-')}`} className="block">
                                  {content}
                                </Link>
                              );
                            }

                            return content;
                          })}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 bg-teal-600 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-5 left-5 w-48 h-48 border-4 border-white rounded-full"></div>
          <div className="absolute bottom-5 right-5 w-72 h-72 border-4 border-white rounded-full"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-teal-100" />
              </div>
              <h4 className="text-2xl md:text-3xl font-black mb-1">10,000+</h4>
              <p className="text-teal-100 font-medium uppercase tracking-wider text-[10px] md:text-xs">Happy Customers</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-teal-100" />
              </div>
              <h4 className="text-2xl md:text-3xl font-black mb-1">FREE</h4>
              <p className="text-teal-100 font-medium uppercase tracking-wider text-[10px] md:text-xs">Eye Test</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-teal-100" />
              </div>
              <h4 className="text-2xl md:text-3xl font-black mb-1">1 YEAR</h4>
              <p className="text-teal-100 font-medium uppercase tracking-wider text-[10px] md:text-xs">Lens Warranty</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <Glasses className="h-6 w-6 text-teal-100" />
              </div>
              <h4 className="text-2xl md:text-3xl font-black mb-1">500+</h4>
              <p className="text-teal-100 font-medium uppercase tracking-wider text-[10px] md:text-xs">Frames Available</p>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Before/After Vision Section */}
      <section className="py-14 md:py-24 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 md:mb-6 leading-tight">
                Experience the <span className="text-teal-600">Perfect Clarity</span>
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
                Why settle for blurry vision? Our high-definition lenses provide crystal clear sight, perfect for night driving, reading, and digital device use.
              </p>
              <ul className="space-y-4 mb-10">
                {['Premium Anti-Glare Coating', 'Blue Light Protection', 'Scratch Resistant Lenses', 'Digital Eye Strain Relief'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-700 font-medium">
                    <div className="bg-teal-100 p-1 rounded-full text-teal-600">
                      <CheckCircle2 size={18} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/services#book">
                <Button className="px-8 py-3 md:px-10 md:py-4 text-base md:text-lg">Book Your Free Test Now</Button>
              </Link>
            </motion.div>

            <VisionCompare />
          </div>
        </div>
      </section>

      {/* Lens Replacement Banner Section */}
      <section className="bg-[#1a2b4b] text-white overflow-hidden relative min-h-[350px] md:min-h-[500px] flex items-center">
        {/* Background Image / Decoration */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full md:w-1/2 h-full opacity-20 md:opacity-100 pointer-events-none flex items-center justify-center p-4">
          <Image
            loader={imagekitLoader}
            src="focus.jpeg"
            alt="Focus Opticals Premium Eyewear - Quality lenses and frames"
            width={800}
            height={600}
            className="w-full h-full object-contain animate-float-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#1a2b4b]/60 to-[#1a2b4b]"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-20">
          <div className="max-w-4xl">
            <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-black mb-4 md:mb-6 tracking-tighter leading-none italic uppercase">
              FREE LENS <br />
              <span className="text-teal-400">REPLACEMENT</span>
            </h2>

            <p className="text-sm sm:text-lg md:text-2xl lg:text-4xl font-bold mb-6 md:mb-10 uppercase tracking-[0.1em] md:tracking-[0.2em] text-white/90">
              Any Frame | Any Power | Any Reason
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-10 mb-8 md:mb-12">
              <Link href="/contact">
                <Button className="bg-teal-600 text-white hover:bg-teal-700 px-8 py-4 md:px-14 md:py-8 text-base md:text-2xl font-black rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(13,148,136,0.3)] border-none uppercase">
                  Find Store
                </Button>
              </Link>
              <div className="text-left border-l-4 border-teal-500 pl-4 md:pl-6 py-2">
                <p className="text-xs md:text-lg font-bold opacity-80 uppercase tracking-widest text-teal-400">
                  Visit our showroom
                </p>
                <p className="text-lg md:text-3xl font-black text-white leading-none uppercase tracking-tight">
                  Any Frame | Any Power
                </p>
              </div>
            </div>

            <div className="inline-block bg-white/10 backdrop-blur-md px-4 py-2 md:px-6 md:py-3 rounded-lg border border-white/20">
              <p className="text-[10px] sm:text-sm md:text-lg font-bold tracking-wider text-teal-300 uppercase">
                ₹100/- FITTING CHARGES APPLY | APPLICABLE ON ALL FRAMES
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gray-50/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 py-6 md:py-12">
            {/* Authentic Brands */}
            <div className="flex flex-col items-center text-center px-4">
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-6 shadow-sm border border-teal-100">
                <ShieldCheck className="h-7 w-7 text-teal-500" />
              </div>
              <h4 className="font-bold text-lg text-gray-900 mb-3">Authentic Brands</h4>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[250px]">100% genuine lenses and frames from leading global optical brands.</p>
            </div>

            {/* Expert Fitting */}
            <div className="flex flex-col items-center text-center px-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6 shadow-sm border border-green-100">
                <Eye className="h-7 w-7 text-green-500" />
              </div>
              <h4 className="font-bold text-lg text-gray-900 mb-3">Professional Fitting</h4>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[250px]">Lenses customized for your precise power and frame fit.</p>
            </div>

            {/* On-Time Delivery */}
            <div className="flex flex-col items-center text-center px-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 shadow-sm border border-blue-100">
                <ThumbsUp className="h-7 w-7 text-blue-500" />
              </div>
              <h4 className="font-bold text-lg text-gray-900 mb-3">On-Time Delivery</h4>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[250px]">Quick processing and delivery of your prescription glasses with accurate fitting.</p>
            </div>
          </div>
        </div>
      </section>



      {/* Location Section */}
      <section className="py-12 md:py-20 bg-gray-900 text-white border-t-4 border-teal-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Visit Our Store</h2>
              <p className="text-gray-300 mb-6 md:mb-8 max-w-lg leading-relaxed text-sm md:text-base">
                We are conveniently located in the heart of Vijayawada. Drop by for a free consultation or to browse our extensive collection of frames and sunglasses.
              </p>

              <ul className="space-y-6 mb-8">
                <li className="flex items-start gap-4">
                  <div className="bg-teal-900/50 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-teal-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Address</h4>
                    <p className="text-gray-400 leading-relaxed">9-76-3, Vinnakota Vari St, near S.K.P.V.Hindu High School Line, Chowk, Vijayawada, Andhra Pradesh 520001</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-teal-900/50 p-3 rounded-full">
                    <CalendarDays className="h-6 w-6 text-teal-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Opening Hours</h4>
                    <p className="text-gray-400">Mon - Sat: 10 AM - 9 PM</p>
                    <p className="text-red-400 text-sm mt-1">Sunday: Holiday</p>
                  </div>
                </li>
              </ul>

              <WhatsAppButton
                message="Hi, I am planning to visit the store. Are you open right now?"
                className="w-full sm:w-auto"
                variant="outline"
                label="Message Before Visit"
              />
            </div>

            <div className="h-[280px] md:h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl bg-gray-800 border border-gray-700">
              {/* Note: Embedding actual google map iframe here */}
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
      </section>
    </div>
  );
}
