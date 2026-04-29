# 💬 Real-Time Chat App

A full-stack real-time chat application built with **React**, **Node.js**, **Express**, and **Socket.IO**, supporting instant messaging and room-based conversations.

🔗 **Live Demo:** [real-time-chat-apps-gamma.vercel.app](https://real-time-chat-apps-gamma.vercel.app/)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [Deployment](#deployment)
- [License](#license)

---

## ✨ Features

- 💬 Real-time messaging powered by WebSockets (Socket.IO)
- 🚪 Join and leave chat rooms by username and room name
- 👥 See active users currently in a room
- ☁️ Deployed on Vercel (frontend + backend as separate services)

---

## 🛠 Tech Stack

| Layer      | Technology                                         |
|------------|----------------------------------------------------|
| Frontend   | React 19, Vite, Tailwind CSS, DaisyUI, Zustand     |
| Backend    | Node.js, Express.js, Socket.IO                     |
| Database   | MongoDB (via Mongoose)                             |
| Storage    | Cloudinary                                         |
| Deployment | Vercel                                             |

---

## 📁 Project Structure

```
real-time-chat-apps/
├── backend/          # Express.js + Socket.IO server
│   ├── src/
│   └── package.json
├── frontend/         # React + Vite app
│   ├── src/
│   └── package.json
├── package.json      # Root build & start scripts
└── vercel.json       # Vercel deployment config
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v20 or higher
- [MongoDB](https://www.mongodb.com/) local instance (dev) or [Atlas](https://www.mongodb.com/cloud/atlas) (prod)
- [Cloudinary](https://cloudinary.com/) account

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mrkeylost/real-time-chat-apps.git
   cd real-time-chat-apps
   ```

2. **Install all dependencies and build the frontend:**
   ```bash
   npm run build
   ```

### Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
DB_URL=your_mongodb_atlas_connection_string

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

JWT_KEY=your_jwt_secret_key

PORT=5001
```

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

### Running the App

**Start the backend (Terminal 1):**
```bash
cd backend
npm run dev
```

**Start the frontend (Terminal 2):**
```bash
cd frontend
npm run dev
```

Frontend runs at `http://localhost:5173`, backend at `http://localhost:5001`.

---

## ☁️ Deployment

This project is configured for **Vercel** using `experimentalServices`. The frontend is served at `/` and the backend is routed under `/_/backend`.

---

<p align="center">Made with ❤️ by <a href="https://github.com/mrkeylost">mrkeylost</a></p>
