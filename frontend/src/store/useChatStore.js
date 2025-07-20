import {create } from "zustand";
import {toast} from "react-hot-toast";
import {axiosInstance} from "../lib/axios.js"
import { useAuthStore } from "./useAuthStore.js";
export const useChatStore = create((set,get) => ({
  messages: [],       
  users:[],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,      

  getUsers:async()=>{
    set({isUsersLoading: true});
    try {
      const res = await axiosInstance.get("/messages/users");
      set({users: res.data});
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");

    } finally {
      set({isUsersLoading: false});
    }
  },
  getMessages:async(userId)=>{
    set({isMessagesLoading: true});
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({messages: res.data});
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to load messages");
    } finally {
      set({isMessagesLoading: false});
    }  
  },
  sendMessage:async(messageData)=>{
const {selectedUser,messages}=get()
try {
  const res=await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData);
  set({messages:[...messages,res.data]})
  
} catch (error) {
  toast.error(error.response.data.messages);
}
  },
 deleteChat: async (receiverId) => {
  try {
    await axiosInstance.delete(`/messages/chat/${receiverId}`);
    
    const updatedUsers = get().users.filter(user => user._id !== receiverId);
    
    set({ 
      selectedUser: null, 
      messages: [], 
      users: updatedUsers // 🧹 remove from sidebar manually
    });

    toast.success("Contact & chat deleted");
  } catch (error) {
    console.error("Failed to delete chat", error);
    toast.error("Failed to delete chat");
  }
},


  subscribeToMessage:()=>{
const {selectedUser} =get();
if(!selectedUser) return ;
const socket=useAuthStore.getState().socket;

socket.on("newMessage",(newMessage)=>{
  if(newMessage.senderId!=selectedUser._id) return;
  set({
    messages:[...get().messages,newMessage],
  })
})


  },
  unsubscribeFromMessages:()=>{
const socket=useAuthStore.getState().socket;
socket.off("newMessage");
  },
  setSelectedUser:(selectedUser) => set({selectedUser}),
}));