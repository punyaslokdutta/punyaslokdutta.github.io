import { useUser } from '@supabase/auth-helpers-react';
import VideoCall from '../components/VideoCall';

export default function Chews() {
  const user = useUser();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Chews</h1>
      
      {user ? (
        <VideoCall />
      ) : 
      (
        <VideoCall />
        // <div className="text-center py-12">
        //   <p className="text-gray-600">Please sign in to access video calls</p>
        //   {/* <Link 
        //     to="/auth" 
        //     className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        //   >
        //     Sign In
        //   </Link> */}
        // </div>
      )}
    </div>
  );
} 