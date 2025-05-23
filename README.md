﻿# Taxi Industry Digital Management System

![Taxi Management System](https://your-project-logo-url.com/logo.png)

## 🚕 About The Project

The Taxi Industry Digital Management System is designed to help the taxi industry evolve and digitize their operations in the 4th industrial revolution. This system provides a comprehensive solution for taxi rank management, enabling real-time tracking, queue management, digital payments, and AI-powered reporting.

### Key Features:

- 🚖 Digital taxi rank management
- 📱 Real-time taxi tracking and location services
- 💳 Cashless payment solutions with QR code integration
- 🤖 AI-powered digital assistant for passengers
- 📊 Dynamic reporting and analytics
- 🗺️ Google Maps integration for route optimization

## 🛠️ Tech Stack

- **Frontend:**
  - Next.js with TypeScript
  - React
  - Ant Design (antd)

- **Backend:**
  - ASP.NET Boilerplate framework (ABP)
  - C# / .NET Core

- **Database:**
  - PostgreSQL

- **Containerization:**
  - Docker

- **Authentication:**
  - JWT

- **Maps & Geolocation:**
  - Google Maps API

## 👥 User Roles & Features

### 👨‍💼 Taxi Rank Manager

- **Driver Management:**
  - Add, update, and delete driver details
  - Assign taxis to specific drivers
  - Track driver performance and compliance

- **Queue Management:**
  - View and manage taxi queues in real-time
  - Monitor wait times and optimize dispatch

- **Lane Management:**
  - Add and update lanes for different routes
  - Configure lane capacity and operational hours

- **Reporting:**
  - Generate dynamic AI-powered reports
  - Analyze operational efficiency
  - Track revenue and passenger statistics

### 🧍 Passenger

- **Route Information:**
  - View details on specific routes
  - Get estimated arrival times
  - Check fare information

- **Taxi Tracking:**
  - View current location of specific taxis
  - Track all taxis in operation
  - Get estimated wait times

- **Digital Payment:**
  - Scan QR codes to pay drivers directly
  - View payment history
  - Generate receipts

- **Digital Assistant:**
  - Chat with AI-powered digital human
  - Get assistance with routes and taxi availability
  - Report issues or provide feedback

### 🚘 Driver

- **Queue Management:**
  - Join and view taxi queues
  - Receive notifications for dispatch
  - Track position in queue

- **Payment Reception:**
  - Receive payments via unique QR code
  - Track earnings in real-time
  - Generate financial reports

- **Navigation:**
  - Get optimized routes via Google Maps
  - Receive traffic updates
  - Track trip history

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v16.0+)
- npm (v8.0+) or yarn (v1.22+)
- .NET Core SDK (v6.0+)
- Docker and Docker Compose
- PostgreSQL (Docker image will be used)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/taxi-management-system.git
   cd taxi-management-system

   ### Installation

2. **Set up the frontend**
   ```bash
   cd frontend
   npm install
# or if using yarn
yarn install

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
# Edit .env.local with your configuration

4. **Start the development environment with Docker**
   ```bash
     cd ..
    docker-compose up -d
    
5. **Start the development environment with Docker**
   ```bash
    cd backend
   dotnet ef database update

6. **Start the development environment with Docker**
   ```bash
   cd ../frontend
   npm run dev
   # or if using yarn
   yarn dev

The frontend will be available at http://localhost:3000
The backend API will be available at http://localhost:5000/api

### Domain Modal

1. **Doami Modal**
   -https://lucid.app/lucidchart/03bbd9a1-ad81-46fe-b7cd-d87136052ba8/edit?viewport_loc=-2070%2C334%2C3813%2C1800%2C0_0&invitationId=inv_2ee79355-f835-466d-8269-aa34b421da18

