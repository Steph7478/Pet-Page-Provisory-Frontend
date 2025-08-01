
# 🐾 Pet-Page-Frontend

## 📋 Project Overview

**Pet-Page-Frontend** is the frontend application of a pet adoption platform built with Next.js and TypeScript. It offers a user-friendly interface for browsing pets, managing adoption requests, and handling user authentication with seamless integration to the backend API.

## 🚧 Project Status

This project is currently **in progress**. Core features like authentication, pet listings, and adoption forms are implemented. Future plans include enhanced UI polish, accessibility improvements, and extensive testing.

## ✨ Features

- 🔐 **User Authentication**: Login, logout, and signup pages with JWT-based session handling.  
- 🐶 **Pet Browsing & Management**: View pets, filter by adopter or advertiser, and see detailed pet info.  
- 📝 **Adoption Process**: Forms for adoption requests and tracking application status.  
- 🎨 **Responsive UI**: Modular components with Tailwind CSS for modern design and responsiveness.  
- ⚛️ **State & Data Management**: React Query for API data fetching, caching, and synchronization.  
- 🌐 **OAuth Integration**: Google OAuth login support.  
- 🛠️ **Custom Hooks & Utilities**: For forms, modals, URL validation, and token refresh.

## 🛠️ Technologies Used

- ⚛️ Next.js (React framework)  
- 📜 TypeScript  
- 🔄 React Query  
- 📡 Axios  
- 🎨 Tailwind CSS (via PostCSS)  
- 🔍 Zod for schema validation  
- 🧹 ESLint for code quality

## ⚙️ Installation & Setup

### Prerequisites

- Node.js v16 or higher  
- npm or yarn  

### Steps

1. Clone the repository:  
   ```bash
   git clone https://your-repo-url.git
   cd your-repo-folder
   ```

2. Install dependencies:  
   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables:  
   - Create a `.env.local` file in the root directory.  
   - Add the API base URL:  
     ```
     NEXT_PUBLIC_API_URL=https://your-api-url
     ```

4. Run the development server:  
   ```bash
   npm run dev
   # or
   yarn dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🔗 Project Structure

- `/public`: Static assets like images used throughout the app.  
- `/src/api`: API client, DTOs, queries, mutations, and service hooks for backend communication.  
- `/src/app`: Next.js app directory containing page routes and layouts.  
- `/src/common`: Shared UI components, layouts, and route guards.  
- `/src/components`: Feature-specific React components (Adotar, Anunciante, Home, etc).  
- `/src/hooks`: Custom React hooks for UI effects, forms, routing, and modal handling.  
- `/src/schemas`: Zod schemas for validating forms and data.  
- `/src/utils`: Utility functions like error handling, URL validation, and token refresh.  
- `/src/constants`: Application-wide constants such as API endpoint paths.

## 🔗 API Endpoints Used

- `POST /auth/login` — User login  
- `POST /auth/register` — User registration  
- `POST /auth/logout` — User logout  
- `GET /auth/me` — Get current user info  
- `GET /pets` — List pets  
- `GET /pets?ownerId={id}` — Pets by advertiser  
- `POST /formularios` — Submit adoption forms  
- `GET /adoptions?clientId={id}` — Adoption data  

---
