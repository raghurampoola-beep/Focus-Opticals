"use client";

import { ChevronDown, Star, Heart, Sparkles } from "lucide-react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Product3DCard } from "@/components/ui/Product3DCard";
import { motion } from "framer-motion";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ProductsContent() {
  const searchParams = useSearchParams();
  const shape = searchParams.get('shape');
  const type = searchParams.get('type');
  const item = searchParams.get('item');

  // Dynamic labels based on source
  const frameText = shape === 'square' ? 'Square Frames' :
    shape === 'rectangle' ? 'Rectangle Frames' :
      shape === 'geometric' ? 'Geometric Frames' :
        type === 'special' ? (item === 'zero-power' ? 'Zero Power Lenses' : 'Reading Glasses') :
          !shape ? 'All Products' :
            'Premium Frames';

  const titleText = shape === 'square' ? 'Square' :
    shape === 'rectangle' ? 'Rectangle' :
      shape === 'geometric' ? 'Geometric' :
        type === 'special' ? (item === 'zero-power' ? 'Zero Power' : 'Reading') :
          !shape ? 'All Products' :
            'Premium';

  const allProducts = [
    {
      id: 'geometric',
      name: 'Geometric Hex Vision',
      price: '₹999',
      rating: '4.3',
      desc: 'Modern Hexagonal Design',
      front: "https://ik.imagekit.io/FocusOpticals/geo2.png",
      side: "https://ik.imagekit.io/FocusOpticals/geo3.png",
      href: "/product/1?shape=geometric",
      shapes: ['geometric']
    },
    {
      id: 'rectangle',
      name: 'Rectangle Pro View',
      price: '₹750',
      rating: '4.0',
      desc: 'Wide Vision Rectangular Frame',
      front: "https://ik.imagekit.io/FocusOpticals/square1.png?updatedAt=1774424748071",
      side: "https://ik.imagekit.io/FocusOpticals/square2.png?updatedAt=1774424748158",
      href: "/product/1?shape=rectangle",
      shapes: ['rectangle', 'square']
    },
    {
      id: 'wayfarer',
      name: 'Gradient Wayfarer Frame',
      price: '₹899',
      rating: '4.5',
      desc: 'Black-to-Clear Gradient',
      front: "https://ik.imagekit.io/FocusOpticals/new_L.png",
      side: "https://ik.imagekit.io/FocusOpticals/new_F.png",
      href: "/product/1?shape=wayfarer",
      shapes: ['wayfarer', 'square', 'geometric']
    },
    {
      id: 'beta-ultem',
      name: 'Crystal/Gunmetal β-Ultem',
      price: '₹1,299',
      rating: '4.8',
      desc: 'High-flexibility performance eyewear',
      front: "https://ik.imagekit.io/FocusOpticals/front.png?updatedAt=1775112199067",
      side: "https://ik.imagekit.io/FocusOpticals/right.png?updatedAt=1775112197641",
      href: "/product/1?shape=beta-ultem",
      shapes: ['square', 'wayfarer', 'rectangle']
    },
    {
      id: 'vector-slate',
      name: 'Vector Slate',
      price: '₹850',
      rating: '4.7',
      desc: 'The Executive Browline • Semi-Rimless',
      front: "https://ik.imagekit.io/FocusOpticals/front-k.png",
      side: "https://ik.imagekit.io/FocusOpticals/side-k.png",
      href: "/product/1?shape=vector-slate",
      shapes: ['rectangle', 'square']
    }
  ];

  // Filter products based on search shape, or show both if no specific search or general 'products'
  const displayProducts = shape
    ? allProducts.filter(p => p.shapes.includes(shape as string))
    : allProducts;

  return (
    <div className="bg-white min-h-screen">
      {/* Category Header with Breadcrumbs */}
      <div className="border-b border-gray-100 bg-gray-50/30">
        <div className="container mx-auto px-4 py-3 md:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-widest gap-1 sm:gap-0">
          <div className="flex items-center gap-2">
            <Link href="/#collections" className="hover:text-teal-600 transition-colors">Eyewear</Link>
            <span className="text-gray-300">/</span>
            <Link href="/#collections" className="hover:text-teal-600 transition-colors">Eyeglasses</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900">{frameText}</span>
          </div>
          <div className="hidden md:block text-gray-400">Problem in placing order? Give a missed call +91 9989362643</div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-4 tracking-tighter uppercase italic">
            Featured <span className="text-teal-600">Collection</span>
          </h1>
          <p className="text-gray-500 font-medium">Hover on any frame to see a different profile</p>
        </div>

        {/* Products Grid - Consistent Sizing for both 1 and 2 products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto">
          {displayProducts.map((product) => (
            <div key={product.id} className="w-full max-w-md mx-auto">
              <Link href={product.href} className="block group">
                <div className="w-full bg-white p-0 h-full">
                  <Product3DCard
                    name={product.name}
                    price={product.price}
                    description={product.desc}
                    // Geometric/Beta-Ultem/Vector-Slate: Side first, Front hover | Rectangle/Wayfarer: Front first, Side hover
                    frontViewSrc={(product.id === 'geometric' || product.id === 'beta-ultem' || product.id === 'vector-slate') ? product.side : product.front}
                    otherViewSrc={(product.id === 'geometric' || product.id === 'beta-ultem' || product.id === 'vector-slate') ? product.front : product.side}
                    alt={product.name}
                    rating={product.rating}
                    reviewCount={1540}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Visit Store Helper */}
        <div className="mt-20 text-center border-t border-gray-100 pt-12 w-full">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Want more styles?</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">Visit our showroom in Vijayawada to try on our full collection of over 500+ premium designs.</p>
          <WhatsAppButton
            message={`Hi! I saw your frame collection on your website. I want to visit your store to see more collections.`}
            label="Contact via WhatsApp"
            className="px-10 py-4 text-lg font-black rounded-full"
          />
        </div>

      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
