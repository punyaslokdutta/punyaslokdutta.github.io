import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Shield, Truck } from 'lucide-react';
import Products from './Products';

const SLIDER_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1625316708582-7c38734be31d?w=1600', // Indian street dog being examined by vet
    title: "24/7 Virtual Vet Care",
    description: "Connect with experienced veterinarians anytime, anywhere. Get expert medical advice and care for your furry family member from the comfort of your home."
  },
  {
    url: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=1600', // Professional dog grooming
    title: "Luxury Grooming Sessions",
    description: "Transform your pet with our premium grooming services. From pawdicures to spa baths, give your companion the pampering they deserve."
  },
  {
    url: 'https://images.unsplash.com/photo-1589441161120-8781d5644435?w=1600', // Indian family with pet
    title: "Training & Behavior Experts",
    description: "Master the art of communication with your pet. Our certified trainers help build lasting bonds through positive reinforcement techniques."
  },
  {
    url: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=1600', // Dog playing in park
    title: "Socialization & Day Care",
    description: "Let your dog make new friends in our supervised playgroups. Safe, fun, and enriching experiences for your social butterfly."
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDER_IMAGES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-16">
      {/* Full-height Slider Section */}
      <div className="w-full h-screen">
        <div className="relative bg-neutral-900 text-white h-full">
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
              <div className="relative h-full flex flex-col justify-center max-w-[1400px] mx-auto px-8">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  {slide.title}
                </h1>
                <p className="mt-6 text-xl">
                  {slide.description}
                </p>
                <div className="mt-10">
                  <button
                    onClick={scrollToProducts}
                    className="inline-block bg-white text-neutral-900 px-8 py-3 hover:bg-gray-100 transition-colors"
                  >
                    Request early access
                  </button>
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

      {/* Our Services Section */}
      <div className="w-full py-16 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-8">
          <h2 className="text-4xl font-bold text-teal-800 mb-12 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Pet Grooming</h3>
              <p className="text-gray-600">Professional grooming services for your furry friends, including bathing, trimming, and styling.</p>
            </div>

            {/* Service Card 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Pet Training</h3>
              <p className="text-gray-600">Expert training sessions to help your pets develop good behavior and social skills.</p>
            </div>

            {/* Service Card 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                <Truck className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Pet Boarding</h3>
              <p className="text-gray-600">Safe and comfortable boarding facilities for your pets when you're away.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div ref={productsRef}>
        <Products />
      </div>

      {/* Rest of your content */}
      <div className="w-full bg-neutral-0 py-16">
        <div className="max-w-[1400px] mx-auto px-8">
          <h2 className="text-3xl text-white mb-8">Trending Pet Stories</h2>
          {/* Rest of your reels content */}
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full py-16">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Your feature cards */}
          </div>
        </div>
      </div>
    </div>
  );
}