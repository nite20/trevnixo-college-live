# TREVNIXO payment gateway status

The current checkout is a prototype and does NOT collect online payments. Cash on Delivery is the only enabled method.

## To activate Razorpay safely
1. Register/activate a Razorpay merchant account and complete KYC/business verification.
2. Obtain Test API Key ID and Key Secret from the Razorpay Dashboard.
3. Keep the Key Secret only on a server in environment variables; never put it in React/browser code, a ZIP shared publicly, or GitHub.
4. Add a backend endpoint that creates an order using the server-side Razorpay SDK, returns the order ID and public Key ID, and verifies the checkout signature server-side before marking an order paid.
5. Test using Razorpay test mode and test payment methods before switching to live keys.
6. Configure webhook signature verification, idempotency, payment-failure handling, refunds, privacy/terms and order confirmation.

No real gateway can be enabled from frontend code alone. This package does not contain merchant credentials or a deployed backend; therefore online payments remain disabled and COD remains available. Do not enter real card/UPI details into a prototype checkout.
