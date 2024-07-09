Chat Application
Overview
This is a simple chat application designed to facilitate communication between users through both one-to-one and group chats. Users can sign in securely and enjoy real-time messaging with friends or within groups.

Features
User Authentication: Secure sign-in and registration process.
One-to-One Chat: Real-time messaging between two users.
Group Chat: Chatting with multiple users in a single conversation.
User Profile: User can update their profile information.
Technologies Used
Frontend: HTML, CSS, JavaScript, React.js
Backend: Node.js, Express.js, MongoDB
Real-time Communication: Socket.io
Authentication: JSON Web Tokens (JWT)
Deployment: Render (for backend), Netlify (for frontend)
Getting Started
To run the application locally, follow these steps:

Prerequisites
Node.js and npm installed locally
MongoDB installed locally or access to a MongoDB instance
Installation
Clone the repository:



bash
Copy code
cd chat-sync/backend
npm install
Set up environment variables:

Create a .env file in the backend directory.
Define variables such as PORT, MONGODB_URI, JWT_SECRET, etc.
Repeat steps 2 and 3 for the frontend directory (cd chat-app/frontend).

Running the Application
Start the backend server:

bash
Copy code
cd chat-app/backend
npm start
The backend server should start on http://localhost:3000.

Start the frontend development server:

bash
Copy code
cd chat-app/frontend
npm start
The frontend should open in your default browser at http://localhost:5173.

Usage
Register a new account or sign in with existing credentials.
Navigate to the one-to-one chat or group chat section.



