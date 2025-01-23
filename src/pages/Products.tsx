import React from 'react';
import { toast } from 'react-hot-toast';
import { useCartStore } from '../store/cart';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Product = Database['public']['Tables']['products']['Row'];

export default function Products() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const addItem = useCartStore((state) => state.addItem);

  React.useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to load products');
      return;
    }

    setProducts(data);
  }

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
    });
    toast.success('Added to cart!');
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={product.image_url || 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800'}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                  ₹{(product.price / 100).toFixed(2)}
                </span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center text-gray-600 text-sm">
        <div>Manufactured By: Kraft Island</div>
        <div>FSSAI License No: XXXXXXXXXX</div>
      </div>
    </div>
  );
}