# TREVNIXO Demo Payment Guide (College Prototype)

## What this is
The checkout includes a **simulated payment flow only**. It does not connect to a bank, UPI app, card network, or payment gateway, and it cannot collect or charge real money. The screen explicitly says `SIMULATION ONLY — NO REAL PAYMENT`.

## Demonstration
1. Start the backend with `npm run api` in one terminal.
2. Start the website with `npm run dev` in a second terminal.
3. Open `http://localhost:3000`, add a product to cart, and go to checkout.
4. Fill the demo delivery form using fictional/non-sensitive details.
5. Select **Online Payment — Demo Mode** and click Continue to Demo Payment.
6. Choose `Simulate Successful Payment` to create an order marked `DEMO PAID — NOT REAL`, or choose failed/cancelled to show those states without placing an order.
7. Explain to the examiner: this is a UI/workflow simulation; real payment needs merchant onboarding, server-side order creation, signature verification and webhooks.

## Safety
Never enter real card numbers, CVV, UPI PIN, OTP, or banking credentials into this demo. Do not describe the simulated payment as a real transaction.
