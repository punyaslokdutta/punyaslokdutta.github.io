import React, { useEffect, useState } from 'react';
import { Heart, Store, Clock } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { useCartStore } from '../store/cart';



interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;  // Changed from images array to single image_url
    category: string;
    stock: number;
    created_at: string;
  }

const ProductDetail: React.FC = () => {

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addItem); 

  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;


  const handleAddToCart = () => {
    if (!product) return;
    
    
    addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
      });
    toast.success('Added to cart!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <img
            src={product?.image_url}
            alt={product?.name}
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-semibold">{product.name}</h1>
              <p className="text-gray-500">MRP inclusive of all taxes</p>
              <p className="text-xl font-bold mt-2">Rs. {product.price.toFixed(2)}</p>
            </div>
            {/* ... heart button ... */}
          </div>
          

         

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-4 px-6 rounded hover:bg-gray-800"
          >
            Add
          </button>

          {/* Delivery Information */}
          <div className="space-y-4 border-t pt-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Store className="w-5 h-5" />
              <span>Not available in stores</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span>Delivery Time: 2-7 days</span>
            </div>
          </div>

          {/* Accordion Sections */}
          <div className="space-y-4 border-t pt-4">
            <Accordion title="Description & fit" content="Product description goes here" />
            <Accordion title="Materials" content="Materials information goes here" />
            <Accordion title="Care guide" content="Care instructions go here" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Accordion Component
const Accordion: React.FC<{ title: string; content: string }> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b pb-2">
      <button
        className="flex justify-between items-center w-full py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{title}</span>
        <span>{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && <div className="py-2 text-gray-600">{content}</div>}
    </div>
  );
};

export default ProductDetail; 