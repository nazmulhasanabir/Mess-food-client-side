

# 🍽️ Mess Meals - Hostel Management System

**Mess Meals** is a **Hostel Management System** designed for university hostels. It enables students to log in, view meals, post reviews, and request meals, while administrators can efficiently manage meal data, reviews, and student information.  
Built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js), this system ensures streamlined operations and enhances the overall student experience in university hostels.

![Mess Meals](https://i.ibb.co.com/5g6KBJFh/image.png)


## 🌐 Live Demo  
🔗 **Live Site:** [MEAL MANAGEMENT](https://hostel-meal-management-ec2af.web.app/)

---

## 📌 Table of Contents

- [🚀 Key Features](#-key-features)
- [🛠 Technologies Used](#-technologies-used)
- [📥 Installation](#-installation)
- [📦 Dependencies](#-dependencies)
- [📖 Usage](#-usage)
- [💳 Payment Integration](#-payment-integration)
- [🤝 Contact](#-contact)
- [📜 License](#-license)

---

## 🚀 Key Features

✅ **Student Login**  
   - Students can log in to view meals, post reviews, and request meals.  

✅ **Meal Management**  
   - Admins can add, update, and delete meals.  
   - Manage upcoming meals efficiently.  

✅ **Review System**  
   - Students can post, edit, and delete reviews for meals.  

✅ **Subscription Packages**  
   - Students can upgrade to **Silver, Gold, or Platinum** packages for additional features.  

✅ **Payment Integration**  
   - Secure payment processing via **Stripe**.  

✅ **Responsive Design**  
   - Fully responsive for **mobile, tablet, and desktop** views.  

✅ **Persistent Login**  
   - Users remain logged in even after page reloads.  

✅ **Search & Filter**  
   - Server-side search and filtering for meals by **category, price range, and more**.  

✅ **Admin Dashboard**  
   - Manage users, meals, reviews, and serve requested meals.  

---

## 🛠 Technologies Used

### **Frontend:**  
- **React.js** – Frontend framework  
- **Tailwind CSS** – Modern UI design  
- **React Hook Form** – Form validation  
- **TanStack Query** – Data fetching & caching  
- **SweetAlert2** – Custom alerts & popups  

### **Backend:**  
- **Node.js** – JavaScript runtime  
- **Express.js** – Web framework  
- **MongoDB** – NoSQL database  

### **Authentication:**  
- **Firebase Authentication** – Secure user authentication  

### **Payment:**  
- **Stripe** – Secure payment processing  

### **Image Upload:**  
- **ImageBB** – Image hosting service  

### **Version Control:**  
- **Git & GitHub** – Version control and repository hosting  

---

## 🛠️ How to Run Locally  

1️⃣ **Clone the Repository**  
```sh
git clone https://github.com/your-repo/staff-sync.git
cd staff-sync
```

2️⃣ **Install Dependencies**  
```sh
npm install
```

3️⃣ **Set Up environment file**  
Here’s the `.env` configuration formatted in Markdown:

# Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
VITE_apiKey=your_firebase_apiKey
VITE_authDomain=your_firebase_authDomain
VITE_projectId=your_firebase_projectId
VITE_storageBucket=your_firebase_storageBucket
VITE_messagingSenderId=your_firebase_messagingSenderId
VITE_appId=your_firebase_appId
VITE_imageUploadKey=your_imageUploadKey
VITE_baseUrl=your_server_baseUrl
VITE_stripe_key=your_stripe_key
```
> **Note:** Replace `your_firebase_apiKey`, `your_imageUploadKey`, etc., with your actual keys.

Make sure to add `.env` to your `.gitignore` file to keep your credentials secure.

4️⃣ **Run the Application**  
```sh
npm run dev
```

---
## 📦 Dependencies

```json
{
  "react": "^18.0.0",
  "react-router-dom": "^6.0.0",
  "tailwindcss": "^3.0.0",
  "firebase": "^9.0.0",
  "swiper": "^8.0.0",
  "aos": "^2.3.4"
}
```

---
📖 Usage
Student Portal
View Meals: Browse the meal menu.
Post Reviews: Share feedback on meals.
Request Meals: Request specific meal options.
Upgrade Subscription: Choose Silver, Gold, or Platinum packages.
Admin Dashboard
Manage Meals: Add, update, delete, and schedule meals.
Handle Reviews: Approve, edit, or delete student reviews.
Serve Requested Meals: Track and manage student meal requests.
💳 Payment Integration
Payments are securely processed via Stripe.
Users can upgrade their subscriptions for premium features.
Admins can track payments and manage subscriptions.
🤝 Contact
For any queries, feel free to reach out:

📧 Email: hasanabir617@gmail.com
👨‍💻 GitHub: nazmul-hasan-abir

📧 Admin Email: nazmulhasanabir2025@gmail.com
💳 Admin Pass: Abir2@

