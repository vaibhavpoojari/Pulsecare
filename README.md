# 🏥 PulseCare – Healthcare Management Platform

A modern full-stack healthcare management platform designed to streamline healthcare services for **Patients, Doctors, and Pharmacists** through a secure, responsive, and intelligent web application.

---

# 🌐 Live Demo

### 🚀 Frontend

https://pulsecare-ai-a06h.onrender.com

### ⚙️ Backend API

https://pulsecare-ai-backend.onrender.com

---

# 📖 Overview

**PulseCare** is a full-stack healthcare management platform developed to simplify and manage essential healthcare services through a single web application.

The platform provides separate role-based experiences for **Patients, Doctors, and Pharmacists**, allowing users to manage appointments, health records, medications, prescriptions, communication, and healthcare information efficiently.

It also includes an **AI Health Assistant** that provides basic symptom guidance, health recommendations, and medical summary assistance.

The project demonstrates modern full-stack development practices including secure authentication, REST APIs, database integration, real-time communication, responsive UI development, and cloud deployment.

---

# ✨ Key Features

## 👤 Authentication & Security

- Secure user registration and login
- Firebase Google Authentication
- JWT-based authentication
- Forgot Password functionality
- Role-Based Access Control
- Protected routes
- Secure user sessions

---

## 🩺 Patient Portal

Patients can manage their healthcare activities through a dedicated dashboard.

### Features

- Patient Dashboard
- Book Appointments
- View Appointment Status
- Health Dashboard
- Health Logs
- Medication Reminders
- Health Record Management
- AI Health Assistant
- Download Health Reports as PDF
- Profile Management
- Doctor Communication

---

## 👨‍⚕️ Doctor Portal

Doctors can manage patients and appointments through their dedicated dashboard.

### Features

- Doctor Dashboard
- Patient Overview
- Appointment Management
- Schedule Overview
- Clinical Statistics
- Patient Health Information
- Appointment Tracking

---

## 💊 Pharmacist Portal

Pharmacists can manage medicines and prescriptions.

### Features

- Pharmacist Dashboard
- Prescription Management
- Medicine Inventory
- Medicine Availability
- Pharmacy Management

---

# 🤖 AI Health Assistant

PulseCare includes an AI-powered health assistant designed to provide basic healthcare assistance.

### AI Features

- AI Health Assistant
- Symptom Guidance
- Health Recommendations
- Medical Summary Assistance
- Healthcare-related conversational assistance

> **Note:** The AI Health Assistant is intended for informational assistance and does not replace professional medical advice, diagnosis, or treatment.

---

# 📅 Appointment Management

The appointment management system allows patients and doctors to efficiently manage healthcare appointments.

### Features

- Appointment Booking
- Appointment Tracking
- Doctor Schedule Overview
- Appointment Status Management
- Patient Appointment History

---

# 💊 Medication Management

The platform helps patients manage their medications.

### Features

- Medication Reminders
- Medication Tracking
- Prescription Information
- Medicine Availability
- Pharmacist Prescription Management

---

# 💬 Communication

PulseCare provides real-time communication functionality between users.

### Features

- Real-Time Messaging
- Socket.IO Integration
- User-to-User Communication
- Responsive Chat Interface

---

# 📊 Dashboard & Analytics

Each user role has a dedicated dashboard with relevant healthcare information.

### Features

- Interactive Charts
- Patient Statistics
- Clinical Statistics
- Health Analytics
- Appointment Statistics
- Dashboard Cards
- Data Visualization

---

# 📄 PDF Reports

PulseCare provides healthcare report generation functionality.

### Features

- Health Report Generation
- PDF Export
- Patient Health Summary
- Downloadable Reports

---

# 🎨 User Experience

The platform focuses on a modern and responsive user experience.

### UI Features

- Fully Responsive Design
- Desktop and Mobile Support
- Dark Mode
- Light Mode
- Modern Glassmorphism UI
- Smooth Animations
- Interactive Components
- Progressive Web App (PWA)

---

# 🛠️ Tech Stack

## Frontend

- React 19
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Chart.js
- Hero Icons
- Lucide React

---

## Backend

- Node.js
- Express.js
- MongoDB
- Firebase Authentication
- JWT
- Socket.IO

---

## Additional Libraries

- jsPDF
- html2pdf.js
- React Hot Toast
- React Calendar
- AOS Animation

---

# 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │       Users         │
                    │                     │
                    │ Patients / Doctors  │
                    │     / Pharmacists   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │      + Vite         │
                    │                     │
                    │ Tailwind CSS        │
                    │ React Router        │
                    │ Dashboard UI        │
                    └──────────┬──────────┘
                               │
                         REST API / JWT
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Node.js +         │
                    │   Express.js        │
                    │                     │
                    │ Authentication      │
                    │ Controllers         │
                    │ Routes              │
                    │ Middleware          │
                    └──────┬───────┬──────┘
                           │       │
                ┌──────────┘       └──────────┐
                ▼                             ▼
       ┌─────────────────┐          ┌─────────────────┐
       │    MongoDB      │          │    Firebase     │
       │                 │          │                 │
       │ Users           │          │ Google Auth     │
       │ Appointments    │          │ Authentication  │
       │ Health Records  │          └─────────────────┘
       │ Prescriptions   │
       └─────────────────┘
                           │
                           ▼
                    ┌─────────────────┐
                    │    Socket.IO    │
                    │                 │
                    │ Real-Time       │
                    │ Messaging       │
                    └─────────────────┘
