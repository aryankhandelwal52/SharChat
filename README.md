# 💬 Real-Time Chat Application

A full-stack real-time chat application built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)** with **Socket.IO** for instant messaging and **OpenAI integration** for smart commands. Users can sign up, chat in real time, share images, and even interact with an AI assistant using natural language.

---

## 🚀 Features

- 🔐 **Authentication** – Secure signup/login with JWT-based session handling  
- 🧑‍🤝‍🧑 **Real-Time Messaging** – Instant bidirectional messaging with Socket.IO  
- 📷 **Image Sharing** – Send and receive image attachments in chat  
- 🟢 **Online User Tracking** – Live online status visibility using socket connections  
- 📜 **Message History** – Full chat history fetched via RESTful APIs  
- 🤖 **AI Assistant (Shar-AI)** – Powered by OpenAI (GPT), allowing smart message broadcasting using commands like:  
 🧼 **Contact Cleanup** – Option to delete contacts and associated chats  
- ⚛️ **State Management** – Zustand store for efficient and reactive global state  
- 📱 **Responsive UI** – Modern and mobile-friendly interface using TailwindCSS  

---

## 🧪 Tech Stack

| Layer      | Technology                       |
|------------|----------------------------------|
| Frontend   | React.js, TailwindCSS            |
| Backend    | Node.js, Express.js              |
| Realtime   | Socket.IO                        |
| AI Engine  | OpenAI API (ChatGPT)             |
| Database   | MongoDB (Mongoose ODM)           |
| State Mgmt | Zustand (Frontend)               |
| Auth       | JWT-based authentication         |

---

## 📸 Screenshots

> *(Add these screenshots in a `/screenshots` folder)*  
> Example: `client/public/screenshots/chat-ui.png`

- Main Chat Interface  
![Chat UI](screenshots/chat-ui.png)

- AI Command Feature  
![AI Broadcast](screenshots/ai-command.png)

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/real-time-chat-app.git
cd real-time-chat-app
2. Install Dependencies
Backend
bash
Copy
Edit
cd backend
npm install
Frontend
bash
Copy
Edit
cd client
npm install
3. Set Environment Variables
Create a .env file in the backend/ folder:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENAI_API_KEY=your_openai_api_key
4. Run the App
Backend
bash
Copy
Edit
npm run dev
Frontend
bash
Copy
Edit
npm run dev
