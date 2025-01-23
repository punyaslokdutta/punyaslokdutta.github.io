import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cart';
import { supabase } from '../lib/supabase';

export default function Navbar() {
  const [user, setUser] = React.useState(null);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      } else {
        setIsAdmin(false);
      }
    });
  }, []);

  const checkAdminStatus = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', userId)
      .single();
    setIsAdmin(data?.is_admin ?? false);
  };

  return (
    <div className="bg-white">
      {/* Top bar */}
      <div className="border-b">
        <div className="container mx-auto px-2">
          <div className="flex justify-end items-center h-8 space-x-8 text-sm">
            <Link to="/sustainability" className="hover:underline font-aboreto">
              Sustainability
            </Link>
            <Link to="/customer-service" className="hover:underline font-aboreto">
              Customer Service
            </Link>
            <Link to="/newsletter" className="hover:underline font-aboreto">
              Newsletter
            </Link>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-neutral-900 font-aboreto">
            PawPal Mafia
          </Link>

          {/* Right side icons */}
          <div className="flex items-center space-x-6">
            <div className="flex flex-col items-center">
              {user ? (
                <Link to="/profile" className="text-center group">
                  <svg className="w-6 h-6 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                  </svg>
                  <span className="text-xs mt-1 font-aboreto">Profile</span>
                </Link>
                
              ) : (
                <Link to="/auth" className="text-center group">
                  <svg className="w-6 h-6 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                  </svg>
                  <span className="text-xs mt-1 font-aboreto">Sign in</span>
                </Link>
              )}
            </div>
            {user && (
              <Link to="/orders" className="text-center group">
                <svg className="w-6 h-6 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <span className="text-xs mt-1 font-aboreto">My Orders</span>
              </Link>
            )}

            

            <Link to="/cart" className="text-center group relative">
              <svg className="w-6 h-6 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-2 right-0 bg-neutral-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-aboreto">
                  {itemCount}
                </span>
              )}
              <span className="text-xs mt-1 font-aboreto">Shopping bag ({itemCount})</span>
            </Link>
          </div>
        </div>

        {/* Categories */}
        <div className="flex justify-center space-x-8 mt-6 font-aboreto text-sm">
          <Link to="/category/food" className="hover:underline">Supplements</Link>
          <Link to="/category/toys" className="hover:underline">Chews</Link>
          <Link to="/category/accessories" className="hover:underline">Accessories</Link>
          {isAdmin && (
            <Link to="/admin" className="hover:underline text-red-600">
              Admin
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}