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
    <div className="bg-white rounded-3xl p-8 hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col md:flex-row items-start gap-8">
        {/* Left Content */}
        <div className="flex-1 space-y-4">
          <h3 className="text-4xl font-bold text-gray-900">{name}</h3>
          {description && (
            <p className="text-xl text-gray-500 leading-relaxed">
              {description}
            </p>
          )}
          <button
            onClick={() => setShowWaitlist(true)}
            className="mt-6 px-8 py-3 bg-white text-gray-900 border-2 border-gray-200 rounded-full text-lg font-medium hover:border-teal-600 hover:text-teal-600 transition-colors duration-300"
          >
            Join Waitlist
          </button>
        </div>

        {/* Right Image */}
        {image && (
          <div className="flex-1">
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-[#EEF3FF]"> {/* Light blue background */}
              <img 
                src={image} 
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
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
} 