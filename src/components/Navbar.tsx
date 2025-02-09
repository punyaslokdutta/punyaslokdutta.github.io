import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, MessageCircle, Phone } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

interface NavbarProps {
  onChatOpen: () => void;
}

export default function Navbar({ onChatOpen }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();
  const { user } = useAuth();

  return (
    <nav className="bg-white shadow-sm w-full">
      <div className="w-full px-8 pt-8 pb-16 flex justify-between">
        {/* Left side - Logo and Brand */}
        <div className="flex items-center gap-3">
          <img src="/logo192.png" alt="Logo" className="h-10 w-10" />
          <Link to="/" className="text-3xl font-bold text-teal-800">
            Sunday For Paws
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-6">
          {/* Talk to Experts Button */}
          <button 
            onClick={onChatOpen}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm font-medium">Talk to our Experts</span>
          </button>

          {/* Cart Icon */}
          {/* <Link
            to="/cart"
            className="p-2 hover:bg-gray-100 rounded-full relative"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link> */}
        </div>
      </div>
    </nav>
  );
}