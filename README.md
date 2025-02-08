# BikeShop

## 🚀 Live Demo

[BikeShop Live URL](https://bike-shop-ecru.vercel.app/)

## 📌 Project Description

BikeShop is a full-featured e-commerce platform where users can browse, add to cart, and purchase bikes after registering and logging in. It includes a role-based dashboard for customers and admins, a seamless payment integration using **SurjoPay**, and stock management to ensure availability. The project is designed with a **clean, responsive UI** and provides a smooth user experience.

## 🎯 Features

### **Customer Features**

- 🛒 **Buy Bikes** after registration & login.
- 💳 **Integrated Payment System** using SurjoPay.
- ❌ **Cancel Order Before Payment** (only pending orders can be deleted).
- 🔒 **Update Password** with previous password verification.
- 📋 **Dashboard** to view personal orders and order details.
- 🛍️ **Cart System** - Add, remove, increase, or decrease product quantity.
- 🚫 **Stock Management** - Out-of-stock products cannot be purchased.
- 🎉 **Real-time Notifications** with **Hot Toast**.

### **Admin Features**

- 📦 **Manage Products** (Add, update, delete products, view product list).
- 🛒 **Manage Orders** (View seller order details, delete pending orders, update delivery status after payment completion).
- 👥 **User Management** (Deactivate customers, manage user roles).
- 🔄 **Stock Management** (Stock reduces on order, restores if pending orders are deleted).
- 🔒 **Role-Based Dashboard** (Separate dashboards for customers & admins).

## 🛠️ Technologies Used

### **Frontend**

- ⚛️ React
- 🎨 Tailwind CSS
- 🛍 Redux Toolkit
- 🔄 React Redux
- 🎣 React Hook Form
- 🔐 JWT Decode
- 🔥 Heroicons & Lucide Icons
- 🔔 Hot Toast (Notifications)

### **Backend**

- 🚀 Node.js & Express.js
- 💾 MongoDB
- 🛡 JWT Authentication
- 🔐 Role-based Authorization

## 🛠️ Setup & Installation

### **1️⃣ Clone the Repository**

```sh
 git clone https://github.com/Shazzadhossensunny/bike-shop.git
 cd bike-shop
```

### **2️⃣ Install Dependencies**

```sh
 npm install  # For frontend
```

### **3️⃣ Start the Application**

```sh
 npm run dev  # Starts frontend
```

### **4️⃣ Backend Setup**

- Ensure MongoDB is running.
- Configure the environment variables for SurjoPay integration.

## 📌 Folder Structure

```
BikeShop/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Different pages (Home, Dashboard, etc.)
│   ├── redux/            # Redux state management
│   ├── hooks/            # Custom hooks
│   ├── utils/            # Utility functions
│   ├── assets/           # Images & Icons
│   ├── App.js            # Main app component
│   ├── index.js          # Entry point
│
├── public/               # Static files
├── package.json          # Dependencies & scripts
└── README.md             # Project documentation
```
