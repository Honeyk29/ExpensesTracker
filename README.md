# Money Manager 💸

![Money Manager Banner](https://img.shields.io/badge/Stack-MERN-blue.svg) ![Framer Motion](https://img.shields.io/badge/Animations-Framer%20Motion-ff0055.svg) ![Status](https://img.shields.io/badge/Status-Active-brightgreen.svg)

Money Manager is a highly interactive, full-stack personal finance application engineered with the **MERN** (MongoDB, Express, React, Node.js) stack. It is designed around a premium Glassmorphic aesthetic and physics-based animations to create a flawless user experience for tracking daily incomes, expenses, and managing financial flow.

---

## ✨ Core Features & Functionality

### 📊 Advanced Dashboard & Data Visualization
- **Dynamic Graphical Overviews:** Utilizes `Chart.js` via `react-chartjs-2` to plot all your categorized income and expense transactions onto an adaptive line graph.
- **Real-Time Financial Aggregation:** Calculates your **Total Income**, **Total Expense**, and net **Total Balance** in real-time as values are injected into the database.
- **Statistical Min/Max Indexing:** Automatically evaluates your transaction history to fetch the highest and lowest spending boundaries across both income and expenses.

### 💰 Transaction System (Incomes & Expenses)
- **Categorization:** Every transaction requires a defined title, amount, date, and semantic category (e.g., Salary, Groceries, Bitcoin, Freelancing, Medical).
- **CRUD Architecture:** Add new items instantly to MongoDB, or dynamically tap the trash-can icon on any mapped grid element to securely purge the item from both the database and the frontend context state.
- **Automated Color Referencing:** Incomes are universally marked with green indicators while Expenses map dynamically to distinct reds to guarantee scannability.

### 🔐 2FA Email Authentication & Security Sandbox
- **JSON Web Tokens (JWT):** Advanced encryptions through `bcryptjs` paired with custom middleware ensuring no user can fetch or modify another user's private data structure.
- **Nodemailer OTP Defense:** Upgraded server logic enforces a Two-Factor Authentication standard. Whether signing up or logging into an existing account, users are presented with a sleek dynamic sub-menu requiring a 6-digit One Time Password directly emailed to their inbox via SMTP.

### 👤 Profile Image Management
- **Local File Processing via Multer:** An interactive profile widget allowing users to directly upload graphical avatars (`.jpeg`, `.png`, etc.) which are subsequently preserved in a scalable `public/uploads/` backend directory natively linked to their schema.

### 🎨 Physics-Based Glassmorphic Interface
- **Framer Motion Interactivity:** Almost every layout runs mathematically calculated variants. When changing menus, pages render a `<AnimatePresence>` staggered transition causing elements to fluidly cascade onto the viewport.
- **Styled-Components Aesthetics:** Drop shadows, blurred gradients spanning `rgba(255, 255, 255, 0.4)`, dynamic `flexbox` boundaries, and custom font weights (`Outfit` / `Inter`) compose a layout feeling natively lightweight and heavily engaging.

---

## 🛠️ Technology Stack Breakdown

<details>
<summary><strong>Frontend Stack</strong></summary>

- **React.js (Vite)**
- **Framer Motion** (Staggered cascading animations & gesture scaling)
- **Styled-Components** (Encapsulated CSS / Glassmorphism)
- **Chart.js / react-chartjs-2** (Data Visualization)
- **Axios** (API handling)
- **React Router v6** (Protected application routing)

</details>

<details>
<summary><strong>Backend Stack</strong></summary>

- **Node.js & Express.js**
- **MongoDB & Mongoose**
- **Bcrypt.js & JSONWebTokens** (Password hashing & authorization)
- **Nodemailer** (Ethereal test accounts & live SMTP OTP injections)
- **Multer** (Multiform image uploading to local storage)

</details>

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed along with a [MongoDB cluster](https://www.mongodb.com/) URI (either local or MongoDB Atlas).

### 1. Clone the Repository

```bash
git clone https://github.com/Honeyk29/Money-Manager.git
cd Money-Manager
```

### 2. Backend Environment Setup

Navigate to the backend directory, install the dependencies, and configure the `.env` file.

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder containing the following properties:

```env
PORT=5000
MONGO_URL=your-mongodb-connection-string

# To dispatch real OTPs securely, provide a 16-digit App Password from Google:
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-digit-app-password
```

Start the backend node server:

```bash
npm start
```
*The server will securely connect to MongoDB and operate on `http://localhost:5000`.*

### 3. Frontend Environment Setup

Open a new terminal window, navigate to the frontend directory, install dependencies, and run the React app:

```bash
cd frontend
npm install
npm run dev
```

*The frontend application will spin up at `http://localhost:5173`.*

---

## 🔒 Testing the 2FA System (No Real Email Required!)

The application contains an invisible two-step OTP wall on the entry gates. 
If you choose not to configure your `EMAIL_USER` and `EMAIL_PASS` variables in the `.env` file immediately, **fear not!**
The `auth.js` controller is natively configured to catch its own traffic and automatically dispatch `Ethereal Email` mock URLs directly into your active Node server terminal. 

You can click these console preview URLs dynamically to fetch the 6-digit OTP code without actually owning a live domain/email!

---

## 📝 Configuration Rules & Guidelines
- Make sure to add `node_modules`, `public/uploads`, and `.env` variables to a `.gitignore` array before pushing this stack to Github.
- Keep image uploads strictly below extensive bandwidth limits, as the backend uses simple disc-storage allocation arrays via Multer.
- To manipulate specific color tones and font thresholds, traverse into `frontend/src/styles/GlobalStyle.js`.

---

*Authored inside the MERN environment.*
