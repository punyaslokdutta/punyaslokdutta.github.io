import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Shield, Truck } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative bg-indigo-600 text-white rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1600')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Your Pet's Health, Our Priority
          </h1>
          <p className="mt-6 text-xl max-w-2xl">
            Discover premium supplements and care products for your furry friends. Quality you can trust, care they deserve.
          </p>
          <div className="mt-10">
            <Link
              to="/products"
              className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6">
          <div className="mx-auto w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold">Quality Products</h3>
          <p className="mt-2 text-gray-600">Premium supplements and care items for your pets</p>
        </div>
        <div className="text-center p-6">
          <div className="mx-auto w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold">Safe & Trusted</h3>
          <p className="mt-2 text-gray-600">Verified products from reliable manufacturers</p>
        </div>
        <div className="text-center p-6">
          <div className="mx-auto w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
            <Truck className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold">Fast Delivery</h3>
          <p className="mt-2 text-gray-600">Quick and secure shipping across India</p>
        </div>
      </div>

      {/* Featured Categories */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-8">Featured Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link to="/products" className="group">
            <div className="relative rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1582788186835-c5b7c2c0bff2?w=800"
                alt="Supplements"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">Supplements</h3>
              </div>
            </div>
          </Link>
          <Link to="/products" className="group">
            <div className="relative rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1585766765952-b26936e5bdb5?w=800"
                alt="Accessories"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">Accessories</h3>
              </div>
            </div>
          </Link>
          <Link to="/products" className="group">
            <div className="relative rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1615502731978-f8ac9f13e2eb?w=800"
                alt="Chewables"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">Chewables</h3>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}