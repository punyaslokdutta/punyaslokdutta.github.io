import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  profile_image_url: string | null;
  bio: string | null;
  is_admin: boolean;
}

const DEFAULT_BIOS = [
  "Proud pet parent on a journey to give my furry friends the best life possible! 🐾",
  "Creating pawsome memories with my four-legged family members 🐱🐶",
  "Dedicated to finding the best products for my pet's health and happiness 🦮",
  "On a mission to spoil my pets with the finest treats and care 🐾",
  "Building a better world for pets, one treat at a time 🐕",
];

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/auth');
        return;
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      // If no bio, assign a random one
      if (!profile.bio) {
        const randomBio = DEFAULT_BIOS[Math.floor(Math.random() * DEFAULT_BIOS.length)];
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ bio: randomBio })
          .eq('id', user.id);

        if (!updateError) {
          profile.bio = randomBio;
        }
      }

      setProfile(profile);
      setEditedBio(profile.bio || '');
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSaveBio = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          bio: editedBio,
        })
        .eq('id', profile?.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, bio: editedBio } : null);
      setIsEditing(false);
      toast.success('Bio updated successfully!');
    } catch (error) {
      console.error('Error updating bio:', error);
      toast.error('Failed to update bio');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold font-aboreto">Profile</h1>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-800 transition-colors font-aboreto"
          >
            Sign Out
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={profile?.profile_image_url || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
              <button
                className="absolute bottom-0 right-0 bg-neutral-900 text-white p-2 rounded-full hover:bg-neutral-800 transition-colors"
                onClick={() => toast.error('Image upload coming soon!')}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 font-aboreto">Name</label>
              <p className="mt-1 text-neutral-900 font-aboreto">{profile?.full_name || 'Not provided'}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 font-aboreto">Email</label>
              <p className="mt-1 text-neutral-900 font-aboreto">{profile?.email}</p>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700 font-aboreto">Bio</label>
                <button
                  onClick={() => isEditing ? handleSaveBio() : setIsEditing(true)}
                  className="text-sm text-neutral-900 hover:text-neutral-700 font-aboreto"
                >
                  {isEditing ? 'Save' : 'Edit'}
                </button>
              </div>
              {isEditing ? (
                <textarea
                  value={editedBio}
                  onChange={(e) => setEditedBio(e.target.value)}
                  className="mt-1 w-full p-2 border rounded-md font-aboreto"
                  rows={3}
                />
              ) : (
                <p className="mt-1 text-neutral-900 font-aboreto">{profile?.bio}</p>
              )}
            </div>

            {profile?.is_admin && (
              <div className="mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 font-aboreto">
                  Admin
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 