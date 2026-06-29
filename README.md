# 🏥 HealthNest

HealthNest is a full-stack Hospital Appointment & Healthcare Management System that streamlines the healthcare experience for Patients, Doctors, and Administrators. It provides secure authentication, appointment booking, payment processing, prescription management, reviews, and role-based dashboards.

---

## 🌐 Live Links

- **Client:** https://healthnest-care.vercel.app

---

## 🚀 Features

### 👤 Authentication
- Secure Email & Password Authentication
- Google Sign In
- Role-Based Access Control (Patient, Doctor, Admin)
- Protected Routes

### 🩺 Patient Features
- Book Doctor Appointments
- View Upcoming Appointments
- Appointment History
- Stripe Payment
- Payment History
- Download Prescriptions
- Submit Doctor Reviews
- Manage Profile

### 👨‍⚕️ Doctor Features
- View Appointment Requests
- Approve/Reject Appointments
- Create Prescriptions
- Manage Patients
- Earnings Overview
- Profile Management

### 🛡️ Admin Features
- Dashboard Analytics
- Manage Users
- Verify Doctor Licenses
- Manage Doctors
- Clinical Appointments Registry
- Stripe Cash Flow Monitoring
- Platform Statistics

---

## 🛠 Tech Stack

### Frontend

- Next.js 15
- React.js
- Tailwind CSS
- Framer Motion
- Lucide React
- React Hot Toast

### Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Better Auth

### Payment

- Stripe Payment Gateway

### Deployment

- Vercel
- MongoDB Atlas

---

## 📂 Folder Structure

```
HealthNest
│
├── client
│   ├── app
│   ├── components
│   ├── hooks
│   ├── lib
│   └── public
│
├── server
│   ├── routes
│   ├── middleware
│   ├── controllers
│   ├── utils
│   └── index.js
```

---

## ⚙️ Environment Variables

### Client (.env.local)

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

### Server (.env)

```env
PORT=
MONGODB_URI=

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

STRIPE_SECRET_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## 📦 Installation

Clone the repositories

```bash
git clone https://github.com/arafaths/healthnest-client

git clone https://github.com/arafaths/healthnest-server
```

Install dependencies

```bash
npm install
```

Run the client

```bash
npm run dev
```

Run the server

```bash
npm run dev
```

---

## 🔐 User Roles

### Patient

- Book appointments
- Make payments
- View prescriptions
- Submit reviews

### Doctor

- Manage appointments
- Create prescriptions
- View patients

### Admin

- Manage users
- Verify doctors
- View analytics
- Monitor Stripe transactions

---

## 💳 Payment

HealthNest uses Stripe Payment Gateway for secure online consultation payments.

---

## 📸 Screenshots

- Home Page
- Doctor Details
- Appointment Booking
- Patient Dashboard
- Doctor Dashboard
- Admin Dashboard

(Add screenshots here)

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 📄 License

This project is created for educational purposes.

---

## 👨‍💻 Developer

**MD. Arafat**

GitHub: https://github.com/arafaths/healthnest-client
LinkedIn: https://github.com/arafaths/healthnest-server