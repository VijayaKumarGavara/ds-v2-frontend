src/
├─ landing/
│ ├─ LandingPage.jsx
│ ├─ components/
│ │ ├─ Hero.jsx
│ │ ├─ Features.jsx
│ │ ├─ Navbar.jsx
│ │ └─ CTASection.jsx
│
├─ buyer/
│ ├─ pages/
│ │ ├─ BuyerDashboard.jsx
│ │ ├─ Procurements.jsx
│ │ ├─ Payments.jsx
│ │ └─ Transactions.jsx
│ ├─ components/
│ │ ├─ BuyerNavbar.jsx
│ │ ├─ FarmerSearch.jsx
│ │ └─ PaymentModal.jsx
│
├─ farmer/
│ ├─ pages/
│ │ ├─ FarmerDashboard.jsx
│ │ └─ MyProcurements.jsx
│ ├─ components/
│ │ └─ FarmerNavbar.jsx
│
├─ admin/
│ ├─ pages/
│ │ ├─ AdminDashboard.jsx
│ │ └─ UserManagement.jsx
│
├─ common/
│ ├─ api.js
│ ├─ auth.js
│ └─ ProtectedRoute.jsx
│
├─ routes/
│ ├─ BuyerRoutes.jsx
│ ├─ FarmerRoutes.jsx
│ └─ AdminRoutes.jsx
│
├─ App.jsx
└─ main.jsx

# Tasks:

- 1. Redux for State Management
- 2. Forget Password Page, flow and backend logic.
- 3. For Farmers and Buyers need to add the edit to option update their profiles.
- 4. While at Registration, provide an optional input field to upload/take photo and upload into backend(cloudinary).
- 5. And in the backend need to add the middlewares to check the requested user is authorized or not.
