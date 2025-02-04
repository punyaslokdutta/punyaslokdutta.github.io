import { useState, useEffect } from 'react';
import AgoraRTC, { IAgoraRTCRemoteUser, ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-sdk-ng';

const appId = "f252cf8201b6441d9bcd129b73b1ec0f"; // Replace with your Agora App ID
const token = "007eJxTYGCpn7hT9lTkeW2VfonzEzI65ObcvL9n9ocd5pNWvpH8biSkwJBmZGqUnGZhZGCYZGZiYphimZScYmhkmWRunGSYmmyQdsZvUXpDICNDSe5PBkYoBPEFGbKLEtNKMotzEvNSdJMzUsuLGRgAXuAl+A=="; // For testing only. In production, token should be generated from server
const channelName = "kraftisland-chews"; // Fixed channel for now

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

export default function VideoCall() {
  const [inCall, setInCall] = useState(false);
  const [tracks, setTracks] = useState<[IMicrophoneAudioTrack, ICameraVideoTrack]>();
  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const handleUserPublished = async (user: IAgoraRTCRemoteUser, mediaType: 'audio' | 'video') => {
      try {
        await client.subscribe(user, mediaType);
        console.log('Subscribed to', mediaType, 'from user:', user.uid);
        
        if (mediaType === 'video') {
          const remoteTrack = user.videoTrack;
          if (remoteTrack) {
            // Force a small delay to ensure DOM is ready
            setTimeout(() => {
              remoteTrack.play(`user-${user.uid}`);
            }, 100);
          }
        }
        if (mediaType === 'audio') {
          user.audioTrack?.play();
        }
        
        setRemoteUsers(prev => {
          if (prev.find(u => u.uid === user.uid)) {
            return prev;
          }
          return [...prev, user];
        });
      } catch (err) {
        console.error('Error handling remote user:', err);
      }
    };

    const handleUserLeft = (user: IAgoraRTCRemoteUser) => {
      setRemoteUsers(prev => prev.filter(u => u.uid !== user.uid));
    };

    client.on('user-published', handleUserPublished);
    client.on('user-left', handleUserLeft);

    return () => {
      client.off('user-published', handleUserPublished);
      client.off('user-left', handleUserLeft);
    };
  }, []);

  const startCall = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Video calls are not supported in this browser.');
      }
      
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      
      const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
      setTracks([audioTrack, videoTrack]);
      
      await client.join(appId, channelName, token, null);
      await client.publish([audioTrack, videoTrack]);
      
      // Force a small delay to ensure DOM is ready
      setTimeout(() => {
        videoTrack.play('local-video');
      }, 100);
      
      setInCall(true);
      setError('');
    } catch (err) {
      console.error('Error starting call:', err);
      setError(err instanceof Error ? err.message : 'Failed to start call');
    }
  };

  const leaveCall = async () => {
    try {
      if (tracks) {
        tracks.forEach((track) => track.close());
        await client.unpublish(tracks);
      }
      await client.leave();
      setRemoteUsers([]);
    } catch (err) {
      console.error('Error leaving call:', err);
    } finally {
      setInCall(false);
      setTracks(undefined);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {!inCall ? (
        <button
          onClick={startCall}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Attend Meeting
        </button>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div 
              id="local-video"
              className="h-[40vh] bg-gray-800 rounded-lg overflow-hidden"
            />
            {remoteUsers.map(user => (
              <div 
                key={user.uid}
                id={`user-${user.uid}`}
                className="h-[40vh] bg-gray-800 rounded-lg overflow-hidden"
              />
            ))}
          </div>
          <button
            onClick={leaveCall}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 w-full"
          >
            Leave Call
          </button>
        </div>
      )}
    </div>
  );
} 