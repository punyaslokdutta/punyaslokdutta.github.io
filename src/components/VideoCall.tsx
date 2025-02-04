import { useState, useEffect } from 'react';
import AgoraRTC, { IAgoraRTCRemoteUser, ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-sdk-ng';

const appId = "f252cf8201b6441d9bcd129b73b1ec0f"; // Replace with your Agora App ID
const token = null; // For testing only. In production, token should be generated from server
const channelName = "kraftisland-chews"; // Fixed channel for now

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

export default function VideoCall() {
  const [inCall, setInCall] = useState(false);
  const [tracks, setTracks] = useState<[IMicrophoneAudioTrack, ICameraVideoTrack]>();

  const startCall = async () => {
    const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
    setTracks([audioTrack, videoTrack]);
    await client.join(appId, channelName, token, null);
    await client.publish([audioTrack, videoTrack]);
    setInCall(true);
  };

  const leaveCall = async () => {
    if (tracks) {
      tracks.forEach((track) => track.close());
      await client.unpublish(tracks);
    }
    await client.leave();
    setInCall(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
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
            {tracks && (
              <div 
                className="h-64 w-full bg-gray-800 rounded-lg" 
                ref={(element) => {
                  if (element) tracks[1].play(element);
                }} 
              />
            )}
          </div>
          <button
            onClick={leaveCall}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
          >
            Leave Call
          </button>
        </div>
      )}
    </div>
  );
} 