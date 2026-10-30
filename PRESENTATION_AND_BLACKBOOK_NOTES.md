# TREVNIXO — Mini Project Presentation & Black Book Notes

> Update the author/college details and insert screenshots from the actual running build. Mark each test as Pass only after running it.

## Project title
**TREVNIXO — Smart Finds. Everyday Life.**

## Short presentation script
Good morning, respected examiner. My name is Nitesh Pandey, and my mini project is TREVNIXO, an e-commerce website prototype. It demonstrates product browsing, category-based navigation, cart and wishlist interactions, delivery details, checkout, a simulated online-payment workflow, order confirmation, and a feedback module. The frontend is built with React and Vite, and the demo backend uses Node.js and Express. Order and feedback records can be written to JSON files by the local API. The online-payment screen is a simulation only; it does not process real money. I will demonstrate the workflow and explain the architecture, testing, limitations, and future improvements.

## Technology stack
- HTML/CSS/TypeScript/React: user interface and interactions (verify project configuration before claiming each detail).
- Vite: local development server and frontend build tool.
- Node.js + Express: local API server.
- REST-style HTTP endpoints: `/api/health`, `/api/orders`, `/api/feedback`, and admin endpoints.
- JSON files: local prototype persistence in `data/orders.json` and `data/feedback.json`.
- Browser localStorage: persists selected frontend state such as cart and locally cached orders/feedback.

## Architecture
User/browser → React frontend → HTTP API request → Express backend → JSON file storage → API response → UI update.

## Main modules
1. Home and category browsing.
2. Product details and search (where available).
3. Cart and wishlist.
4. Checkout and delivery form validation.
5. Demo payment outcome simulation.
6. Order confirmation and order record.
7. Feedback form.
8. Admin view (local demo, token-protected when configured).

## Black Book chapter plan
1. Title page, certificate/declaration/acknowledgement (only if required by college), index.
2. Introduction and project overview.
3. Problem statement.
4. Objectives and scope.
5. Existing system and proposed system.
6. Hardware/software requirements.
7. System architecture, DFD, use-case diagram, and flowchart.
8. Module descriptions and implementation.
9. Data storage/API design.
10. Test cases and actual test results.
11. Screenshots from the actual running project.
12. Limitations and future scope.
13. Conclusion and references.

## Test cases to execute before submission
| Test | Expected result | Actual result |
|---|---|---|
| Homepage opens | UI loads | Fill after testing |
| Add product to cart | Cart count/contents update | Fill after testing |
| Submit valid checkout (COD) | Order confirmation | Fill after testing |
| Demo payment success | Confirmation labels `DEMO PAID — NOT REAL` | Fill after testing |
| Demo payment failure | No order is placed | Fill after testing |
| Demo payment cancel | No order is placed | Fill after testing |
| Order API save | New record appears in `data/orders.json` | Fill after testing |
| Submit feedback with API running | New record appears in `data/feedback.json` | Fill after testing |
| Invalid feedback name | Numeric/symbol-only input is rejected or filtered | Fill after testing |

## Viva questions and answers
**What is TREVNIXO?** An e-commerce website prototype for demonstrating a basic shopping workflow.

**What is frontend?** The part of the application users see and interact with.

**What is backend?** Server-side code that handles requests, validates input, and accesses data storage.

**What is an API?** A defined interface that lets software components exchange requests and responses.

**Why Express?** It simplifies creating HTTP routes and APIs in Node.js.

**Which database is used?** The current prototype uses JSON files for backend demo persistence and localStorage for some browser-side state; it does not currently use MySQL/MongoDB.

**Is online payment real?** No. It is a simulated demonstration with no gateway connection and no money movement. A real implementation needs a merchant account, server-side payment-order creation, signature verification, webhook handling, and secure secrets.

**Limitations?** File-based storage is not scalable, production security/authentication needs improvement, and live payments are not integrated.

**Future scope?** Database, authentication, secure payment gateway, order tracking, better administration, automated tests, and deployment.

## Before presenting
- Start the API and frontend in separate terminals.
- Confirm `/api/health` returns an OK response.
- Run at least one end-to-end cart/order demo.
- Test success, failed, and cancelled demo-payment states.
- Check the two JSON files after submitting a demo order and feedback.
- Take fresh screenshots and update the test-results table honestly.
