# 🚀 theDevHamim - Professional Portfolio & Admin Dashboard

Welcome to **theDevHamim**—a premium, next-generation personal portfolio integrated with an advanced, secure Admin Panel. Built using **React**, **Vite**, **TypeScript**, **Tailwind CSS**, and **Firebase**, this application features a sleek dark mode UI, real-time database management, canvas-based high-definition image compression, and **Leo**, an intelligent animated AI assistant.

---

## ✨ Features

### 🌌 1. Sleek Personal Portfolio
* **Bespoke Animations:** Smooth transitions and vibrant modern gradients using `motion`.
* **Dynamic Content:** Automatically loaded in real-time from your Firestore Database.
* **Leo AI Assistant:** A custom Lottie-animated AI chatbot trained on your personal details (origin, family background, academic accolades, work experience, and tech stack) to answer any queries about you with elegant typography.
* **Interactive Media:** Direct support for downloading your latest resume and viewing live project platforms.

### 🛡️ 2. Premium Admin Control Center
* **Live CMS / Editors:** Real-time visual editors for skills, experience timeline markers, and journey checkpoints.
* **Massive Emoji Selection (120+):** Custom tech, spiritual, food, travel, and sports emoji pickers to represent each of your projects uniquely.
* **Canvas Image Compression Engine:** Dynamically analyzes profile picture file sizes. Bypasses compression for smaller images to show raw resolutions, and compresses high-res mobile photos to a **1200px Retina HD standard** (under $80\text{KB}$) before uploading, preventing Firestore size errors.
* **Secure Gateway:** Dual-layered authentication (Firebase Authentication with automated local session bypass fallback) with real-time error logging and password recovery.

---

## 🛠️ Technology Stack
* **Frontend Framework:** React 18, Vite, TypeScript
* **Styling & Icons:** Vanilla CSS, Tailwind CSS, Lucide Icons, Framer Motion
* **Database & Auth:** Firebase Firestore, Firebase Authentication
* **Animation Player:** Lottie (with JSON files)

---

## 💻 Local Installation & Setup

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/hamim5264/theDevHamim.git
cd theDevHamim
npm install
```

### 2. Configure Firebase Integration
Update the Firebase configuration inside the [`src/app/firebase.ts`](file:///d:/Portfolio%20and%20Admin%20Panel/src/app/firebase.ts) file with your project's credentials.

### 3. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

---

## 📂 Firebase Authentication & Console Setup

To secure the admin dashboard and enable **real password reset emails**, complete these two steps:

1. **Enable Email/Password sign-in provider:**
   * Go to **Firebase Console** -> **Build** -> **Authentication**.
   * Under **Sign-in method**, click **Add new provider**, select **Email/Password**, and click **Save**.
2. **Register your Administrator account:**
   * Under the **Users** tab, click **Add user**.
   * Enter:
     * **Email:** `hamim.leon@gmail.com`
     * **Password:** `123456` (or your preferred secure password)
   * Click **Add user**.

Once registered, you can log in, reset your password securely, and lock out the default fallback password automatically!

---

## 🚀 One-Click Vercel Deployment

This project includes a tailored [`vercel.json`](file:///d:/Portfolio%20and%20Admin%20Panel/vercel.json) file that handles SPA sub-routing, preventing `404 Not Found` errors when refreshing subpages directly.

1. Push your code to your GitHub repository.
2. Go to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import this repository.
4. Vercel will automatically detect the **Vite** preset:
   * **Build Command:** `npm run build`
   * **Output Directory:** `dist`
5. Click **Deploy**. Your site is now live!

---

### 📬 Contact & Socials
* **GitHub:** [hamim5264](https://github.com/hamim5264)
* **Branding Name:** `theDevHamim`