# TREVNIXO — College Project Backend Demo

React/Vite storefront + Express API + JSON-file order/feedback persistence + admin page. This is a **local college-demo prototype**, not production-hardened or publicly deployed.

## Run on Windows
1. Install Node.js LTS.
2. Extract ZIP.
3. Copy `.env.example` to `.env`; replace `ADMIN_TOKEN` with a long private random value.
4. Run `npm install` in this folder.
5. Terminal 1: `npm run api` (backend port 4000).
6. Terminal 2: `npm run dev` (frontend, usually port 3000).
7. Storefront: http://localhost:3000
8. Admin: http://localhost:3000/admin.html. Enter the token from `.env`.

## API
GET /api/health; POST /api/orders; POST /api/feedback; GET /api/admin/orders; PATCH /api/admin/orders/:id; GET /api/admin/feedback.
Orders are saved to data/orders.json and feedback to data/feedback.json.

## Payment and deployment
Cash on Delivery only. Razorpay is NOT connected or live. Real payments require merchant onboarding, server-side order creation, signature verification, webhooks, and private environment variables. Public hosting requires deployment accounts and environment variables; this package does not publish itself.

## Production limitations
JSON-file storage is only for a single-machine demo. The demo accepts client-calculated totals; production must recalculate from trusted product data, use a managed database, authentication, rate limiting, HTTPS, backups and security review.
