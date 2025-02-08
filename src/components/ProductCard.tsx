import { useState } from 'react';
import Waitlist from './Waitlist';

interface ProductCardProps {
  id: string;
  name: string;
  description?: string;
  price?: number;
  image?: string;
  isService?: boolean;
}

export default function ProductCard({ id, name, description, price, image, isService = false }: ProductCardProps) {
  const [showWaitlist, setShowWaitlist] = useState(false);

  return (
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="relative">
        {image && (
          <div className="w-full h-64 bg-[#F5F5DC] relative">
            <div className="absolute inset-0 rounded-bl-[100px]">
              <img 
                src={image} 
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>

      <div className="p-8">
        <div className="space-y-4">
          <h3 className="text-4xl font-bold text-gray-900">{name}</h3>
          {description && (
            <p className="text-xl text-gray-600">
              {description}
            </p>
          )}
          <button
            onClick={() => setShowWaitlist(true)}
            className="text-xl font-medium text-teal-600 hover:text-teal-700 transition-colors duration-200"
          >
            Join Waitlist
          </button>
        </div>
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
} 