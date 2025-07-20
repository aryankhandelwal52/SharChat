import { MoreVertical, Trash, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import toast from 'react-hot-toast'
import { useState } from "react";

const ChatHeader = () => {
   const [menuOpen, setMenuOpen] = useState(false);
  const { selectedUser, setSelectedUser,deleteChat  } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300 relative">
      <div className="flex items-center justify-between">
        {/* Left - Avatar and Info */}
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Right - 3 Dot Menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 hover:bg-gray-100 rounded-full"
            title="Options"
          >
            <MoreVertical size={20} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md border w-40 z-10">
              <ul className="text-sm text-left">
                <li>
                  <button
                    onClick={() => {
                      setSelectedUser(null);
                      setMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 hover:bg-gray-100"
                  >
                    ❌ Close Chat
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      deleteChat(selectedUser._id);
                      setMenuOpen(false);
                      toast.success("Chat deleted");
                    }}
                    className="block w-full px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    🗑️ Delete Chat
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ChatHeader;