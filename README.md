# Chat App with Next.js, MongoDB, Node.js, and Socket.io

This is a real-time chat application built using Next.js for the frontend, Node.js for the backend, MongoDB for the database, and Socket.io for real-time communication.

## Features

- Real-time chat with multiple users
- User authentication and authorization
- MongoDB database for storing chat messages
- Socket.io for real-time communication between clients and server

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js and npm
- MongoDB

## Installation

1. **Clone the repository:**

    ```bash
   [ git clone https://github.com/Jitendra1295/chat-app.git](https://github.com/Jitendra1295/chat-app.git)
    cd chat-app
    ```

2. **Install dependencies for both frontend and backend:**

    ```bash
    cd client
    npm install

    cd ../server
    npm install
    ```

3. **Configure environment variables:**

    Create a `.env` file in the `backend` directory and add the following variables:

    ```
    PORT=3001
    MONGODB_URI=mongodb://localhost:000000/chat_app
    ```

    Replace `mongodb://localhost:000000/chat_app` with your MongoDB connection URI.

4. **Start the backend server:**

    ```bash
    cd Server
    node index.js
    ```

5. **Start the frontend development server:**

    ```bash
    cd Client
    npm run dev
    ```

6. **Open your browser and navigate to `http://localhost:3000` to use the chat app.**

## Usage

- Register/Login: Users can register or login to the chat app.
- Chat: Users can join chat rooms and send/receive messages in real-time.
- Logout: Users can log out from the app.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Socket.io](https://socket.io/)

## Contributors

- [Jitendra Patel]([https://github.com/Jitendra1295](https://github.com/Jitendra1295))


