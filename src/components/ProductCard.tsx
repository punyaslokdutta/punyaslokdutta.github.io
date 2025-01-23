import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  // ... other props
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image }) => {
  return (
    <Link
      to={`/products/${id}`}
      className="block bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105"
    >
      <img
        src={image}
        alt={name}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">Rs. {price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default ProductCard; 