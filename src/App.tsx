import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import AdminConsole from './pages/AdminConsole';
import Auth from './pages/Auth';
import Orders from './pages/Orders';
import Footer from './components/Footer';
import ProductDetail from './pages/ProductDetail';
import WhatsAppButton from './components/WhatsAppButton';
import { supabase } from './lib/supabase';
import Profile from './pages/Profile';

function App() {

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/admin" element={<AdminConsole />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/products/:id" element={<ProductDetail/>} />
            <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
          </Routes>
        </main>
        <Footer />
        <Toaster position="bottom-right" />
        <WhatsAppButton />
      </div>
    </BrowserRouter>
  );
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/auth');
      }
      setUser(session?.user ?? null);
    });
  }, [navigate]);

  return user ? <>{children}</> : null;
}

export default App;