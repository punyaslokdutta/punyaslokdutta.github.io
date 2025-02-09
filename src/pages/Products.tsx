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
    <div className="w-full">
      {/* Categories */}
      

      {/* Products Grid */}
      <div className="w-full py-8">
        <div className="w-full px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.image_url || 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800'}
                isService={product.is_service}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}