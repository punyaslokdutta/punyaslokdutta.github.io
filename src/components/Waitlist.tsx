import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
import { Check } from 'lucide-react'; // Make sure to install lucide-react

interface WaitlistProps {
  serviceName: string;
  serviceId: string;
  onClose: () => void;
}

export default function Waitlist({ serviceName, serviceId, onClose }: WaitlistProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [petType, setPetType] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('waitlists')
        .insert([
          {
            service_id: serviceId,
            service_name: serviceName,
            user_name: name,
            email: email,
            mobile_number: mobile || null,
            pet_type: petType || null,
          },
        ]);

      if (error) throw error;
      setSuccess(true);
    } catch (error) {
      toast.error('Failed to join waitlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-[#1C1C1C] rounded-lg p-8 max-w-[48rem] w-full text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-white mb-2">
            We've added you to our waiting list!
          </h2>
          <p className="text-gray-400 mb-8">
            We'll let you know when {serviceName} is ready.
          </p>
          
          <div className="bg-[#2C2C2C] rounded-lg p-4 mb-6">
            <p className="text-gray-400">{email}</p>
          </div>
          
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-sm"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-black rounded-lg p-8 max-w-[48rem] w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Join the waitlist for</h2>
          <h3 className="text-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
            {serviceName}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="tel"
              placeholder="Want early access via WhatsApp? Share your number (optional, no spam!)."
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <select
              value={petType}
              onChange={(e) => setPetType(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select Pet Type (Optional)</option>
              <option value="Cat">Cat</option>
              <option value="Dog">Dog</option>
              <option value="Both">Both</option>
              <option value="Neither">Neither</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-800 text-white p-3 rounded-lg hover:bg-gray-700 flex items-center justify-center space-x-2"
          >
            {loading ? 'Joining...' : 'Join the waitlist'}
            <span className="ml-2">→</span>
          </button>
        </form>

        <button
          onClick={onClose}
          className="mt-4 text-gray-400 hover:text-white text-sm w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
} 