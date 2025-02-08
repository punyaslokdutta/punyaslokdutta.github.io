import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Waitlist from './Waitlist';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  brand?: string;
  isService?: boolean;
  // ... other props
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, brand, isService = true }) => {
  const [showWaitlist, setShowWaitlist] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        
        {isService ? (
          <button
            onClick={() => setShowWaitlist(true)}
            className="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Join Waitlist
          </button>
        ) : (
          <p className="mt-2 text-gray-600">₹{price.toLocaleString('en-IN')}.00</p>
        )}
      </div>

      {showWaitlist && (
        <Waitlist
          serviceId={id}
          serviceName={name}
          onClose={() => setShowWaitlist(false)}
        />
      )}
    </div>
  );
};

export default ProductCard; 