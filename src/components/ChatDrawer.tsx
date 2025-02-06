import { X } from 'lucide-react';

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatDrawer({ isOpen, onClose }: ChatDrawerProps) {
  return (
    <>
      {/* Drawer */}
      <div className={`fixed inset-y-0 right-0 w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-aboreto">Chat with our AI Expert</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto">
              {/* Messages will go here */}
            </div>
            <div className="border-t p-4">
              <input 
                type="text"
                placeholder="Type your message..."
                className="w-full p-2 border rounded-lg font-aboreto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
          onClick={onClose}
        />
      )}
    </>
  );
} 