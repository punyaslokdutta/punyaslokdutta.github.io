import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  brand?: string;
  // ... other props
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, brand }) => {
  return (
    <Link
      to={`/products/${id}`}
      className="group block bg-white hover:bg-neutral-50 transition-all duration-300"
    >
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-[400px] object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
        />
        {/* Optional hover overlay */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
      </div>
      
      <div className="p-6 text-center">
        <h3 className="text-xs uppercase tracking-wider text-neutral-500 font-aboreto mb-2">
          {brand || 'PAWSITIVE NUTRITION'}
        </h3>
        <h2 className="text-sm font-aboreto mb-2">
          {name}
        </h2>
        <p className="text-sm font-aboreto text-neutral-900">
          ₹{price.toLocaleString('en-IN')}.00
        </p>
      </div>
    </Link>
  );
};

export default ProductCard; 