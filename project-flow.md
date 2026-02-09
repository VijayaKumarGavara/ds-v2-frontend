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

    - Forget Password Page, flow and backend logic.
    - For Farmers and Buyers need to add the edit to option update their profiles.
    - In recent farmers page of buyers need to add search option with debouncing.
    - Landing Page with neat, modren, professional & suitable UI.

    - Need to add filter in each page buyer's side.
    - As well as, In the farmer's side need to change the UI display the buyer's profile pics in requests, procurements, payment-dues, & transactions.
    - Add Filters( crop, buyer-wise, payment-status, request-status).

    # In Buyer's Side:
        - Need to add the respective filers alogn with the download and share features for the pdf files of the respective pages(can include filters) like a Ledger/Account Statements.

    - Admin Panel:
