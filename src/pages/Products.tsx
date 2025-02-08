import React from 'react';
import { toast } from 'react-hot-toast';
import { useCartStore } from '../store/cart';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

type Product = Database['public']['Tables']['products']['Row'];

export default function Products() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const addItem = useCartStore((state) => state.addItem);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: true });

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

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image_url || 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800'}
          />
        ))}
      </div>
      
      <div className="mt-16 text-center text-gray-600 text-sm">
        <div>Manufactured By: Kraft Island</div>
        <div>FSSAI License No: XXXXXXXXXX</div>
      </div>
    </div>
  );
}