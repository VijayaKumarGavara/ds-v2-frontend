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

    
    - Forget Password Page, flow and backend logic. <-- Needs admin panel to do it with our current infra.
    
    - For Farmers and Buyers need to add the edit to option update their profiles.
    

    # In Buyer's Side:
        Insighs Page(Panel, shows the stats, reports & visalisations).
        - Need to add the respective filters along with the download and share features for the pdf files of the respective pages(can include filters) like a Ledger/Account Statements.
    # For Farmers:
        A dashboard, shows the insights, reports, graphs of the procurements, analytics.
    
    - Admin Panel:
        1. All about the permissions, approvals for the users to update their credientials, make the buyer account status as activate or diactivate based on their subscription.

        2. Analytics, such as buyers, each buyer's bussiness whcih is recorded with our app... such kind of things but not all the complete draft of their  business secrets and confidential info...
