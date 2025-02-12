# Bike Shop Client

Web Url: https://bike-shop-client-iota.vercel.app/

Admin: {
email: admin@mail.com
password: adm123
role: admin
}

Customer: {
email: adam@mail.com
password: adm123
role: customer
}

Project Overview
The Bike Shop Client is the frontend of a complete e-commerce bike store, built with React.js, TypeScript, and Vite. It provides an intuitive and user-friendly interface for browsing bikes, managing orders, and handling user accounts with authentication and role-based access control.

This project integrates seamlessly with the Bike Store Server to handle bike listings, orders, and payments.

Features
✅ Public Pages

Browse all available bikes
View bike details
User registration & login
Secure checkout & payment verification
✅ User Dashboard

View profile
Manage orders
✅ Admin Dashboard

Manage users
Manage products
Manage orders
✅ Authentication & Authorization

JWT-based authentication
Private routes for admins and customers
✅ Payment Integration

Supports ShurjoPay for secure transactions
Technologies Used
Frontend Stack
React.js – Component-based UI
TypeScript – Type safety & modern JavaScript features
Redux Toolkit – State management
React Router DOM – Client-side routing
Ant Design – UI components
React Hook Form – Form handling
Sonner – Toast notifications
Backend Integration
The client interacts with the Bike Store Server, which is built using:

Node.js & Express.js
MongoDB
JWT Authentication
ShurjoPay for payments
Multer & Cloudinary for image uploads
Project Structure
makefile
Copy
Edit
src/
│── components/ # Reusable UI components
│── pages/ # Public and private pages
│── private/ # Role-based dashboard components
│── routes/ # App routing configurations
│── store/ # Redux state management
│── App.tsx # Main React component
│── main.tsx # React entry point
│── index.css # Global styles
│── vite.config.ts # Vite configuration
Routes
Public Routes
/ → Home
/about → About page
/register → User registration
/login → User login
/all-products → List of all bikes
/details/:bikeId → Bike details page
/checkout/:bikeId → Checkout page
/payment-verification → Payment success page
Protected User Dashboard (/dashboard/user)
/profile → View & update profile
/my-orders → View order history
Admin Dashboard (/dashboard/admin)
/profile → Admin profile
/manage-users → Manage user accounts
/manage-products → Add, edit, delete bikes
/manage-orders → Manage orders

- Setup Instructions
  Follow these steps to set up the project locally:

1. Clone the repository
   git clone <repository-url>
   cd <project-directory>
2. Install Dependencies
   Run the following command to install all necessary dependencies:
   npm install
