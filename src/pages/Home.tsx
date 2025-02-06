import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Shield, Truck } from 'lucide-react';

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
      <div className="py-16 bg-neutral-0">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-aboreto text-white mb-8">Trending Pet Stories</h2>
    
    <div className="relative">
      {/* Reels Scroll Container */}
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide">
        {[
  {
    id: 1,
    video: "https://player.vimeo.com/external/451641153.sd.mp4?s=0d73d37d7d20c5e8cb70947a3c33f994885c5283&profile_id=164&oauth2_token_id=57447761",
    title: "Playful Pup Training",
    likes: "23.5K",
    comments: "1.2K"
  },
  {
    id: 2,
    video: "https://player.vimeo.com/external/487647169.sd.mp4?s=f4f21ab1d3f5f3e62c3f7a73d8e4b8edd769b71c&profile_id=164&oauth2_token_id=57447761",
    title: "Cozy Cat Moments",
    likes: "18.2K",
    comments: "856"
  },
  {
    id: 3,
    video: "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761",
    title: "Bath Time Fun",
    likes: "45.1K",
    comments: "2.3K"
  },
  {
    id: 4,
    video: "https://player.vimeo.com/external/374751488.sd.mp4?s=d2b3bb4520e279c665c25f3af1eb9d0c70517adc&profile_id=164&oauth2_token_id=57447761",
    title: "Happy Walks",
    likes: "32.7K",
    comments: "1.8K"
  }
]
          .map((reel) => (
            <div 
              key={reel.id}
              className="flex-none w-[250px] snap-start"
            >
              <div className="relative bg-neutral-800 rounded-xl overflow-hidden aspect-[9/16]">
                {/* Video */}
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  src={reel.video}
                  loop
                  muted
                  playsInline
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => e.currentTarget.pause()}
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-aboreto text-sm mb-2">{reel.title}</h3>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    {reel.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"/>
                    </svg>
                    {reel.comments}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Buttons */}
      <button 
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm"
        onClick={() => document.querySelector('.snap-x')?.scrollBy(-260, 0)}
      >
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm"
        onClick={() => document.querySelector('.snap-x')?.scrollBy(260, 0)}
      >
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
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