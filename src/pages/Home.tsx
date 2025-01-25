import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Shield, Truck } from 'lucide-react';

const SLIDER_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1600',
    title: "Your Pet's Health, Our Priority",
    description: "Discover our premium collection of pet care essentials. From rustic comfort to modern luxury, give your pets the style they deserve."
  },
  {
    url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1600',
    title: "Quality Products for Happy Pets",
    description: "Explore our carefully curated selection of premium pet supplies and accessories."
  },
  {
    url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1600',
    title: "Natural & Organic Options",
    description: "Choose from our range of natural and organic products for your pet's wellbeing."
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDER_IMAGES.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-4">
        <div className="relative bg-neutral-900 text-white rounded-2xl overflow-hidden h-[600px]">
          {SLIDER_IMAGES.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                currentSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-30 transition-transform duration-1000 scale-105"
                style={{ backgroundImage: `url('${slide.url}')` }}
              />
              <div className="relative max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl font-aboreto">
                  {slide.title}
                </h1>
                <p className="mt-6 text-xl max-w-2xl font-aboreto">
                  {slide.description}
                </p>
                <div className="mt-10">
                  <Link
                    to="/products"
                    className="inline-block bg-white text-neutral-900 px-8 py-3 rounded-none font-aboreto hover:bg-gray-100 transition-colors"
                  >
                    Shop now
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Slide indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {SLIDER_IMAGES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index 
                    ? 'bg-white w-4' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
        <div className="text-center p-6">
          <div className="mx-auto mb-4">
            <svg className="w-6 h-6 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 className="text-sm font-normal font-aboreto">Quality Products</h3>
          <p className="mt-2 text-xs text-gray-600 font-aboreto">Premium supplements and care items for your pets</p>
        </div>

        <div className="text-center p-6">
          <div className="mx-auto mb-4">
            <svg className="w-6 h-6 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-sm font-normal font-aboreto">Safe & Trusted</h3>
          <p className="mt-2 text-xs text-gray-600 font-aboreto">Verified products from reliable manufacturers</p>
        </div>

        <div className="text-center p-6">
          <div className="mx-auto mb-4">
            <svg className="w-6 h-6 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </div>
          <h3 className="text-sm font-normal font-aboreto">Fast Delivery</h3>
          <p className="mt-2 text-xs text-gray-600 font-aboreto">Quick and secure shipping across India</p>
        </div>
      </div>

      {/* Featured Categories */}
     
    </div>
  );
}