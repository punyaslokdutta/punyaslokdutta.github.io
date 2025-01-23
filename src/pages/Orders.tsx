import React from 'react';
import { supabase } from '../lib/supabase';
import { useUser } from '@supabase/auth-helpers-react';

const Orders = () => {
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const user = useUser();

  React.useEffect(() => {
    console.log("wswqsqw");
    console.log(user);
    console.log("wswqsqw2we2e32");

    
    const fetchOrders = async () => {
      try {

        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });
          
    
        if (error) {
          throw error;
        }

        setOrders(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

      fetchOrders();

  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="space-y-4">
        {orders.map((order: any) => (
          <div key={order.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Order #{order.id}</span>
              <span className="text-gray-600">{new Date(order.created_at).toLocaleDateString()}</span>
            </div>
            <div className="text-gray-600">Status: {order.status}</div>
            <div className="mt-2">Total: {order.total_amount} ₹</div>
          </div>
        ))}
        {orders.length === 0 && (
          <div className="text-center text-gray-500">No orders found</div>
        )}
      </div>
    </div>
  );
};

export default Orders; 