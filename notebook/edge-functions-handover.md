# PRD: Migrating Razorpay Integration from Supabase Edge Functions to api.learnzy.co.in

**Version:** 1.0
**Date:** 2023-10-27
**Author:** AI Assistant

## 1. Introduction

This document outlines the current implementation of Razorpay payment processing using Supabase Edge Functions within the Learnzy application. It details the dependencies, frontend interactions, and the potential impact and steps required to migrate this functionality to a dedicated backend service hosted at `api.learnzy.co.in`.

**Goal:** To centralize backend logic, potentially improve performance, and decouple payment processing from the Supabase-specific infrastructure by moving Razorpay integration to a dedicated API service.

## 2. Current State: Supabase Edge Functions

Currently, Learnzy utilizes two Supabase Edge Functions to handle the Razorpay payment flow:

1.  **`create-razorpay-order`**:
    *   **Responsibility:** Creates a new order with Razorpay when a user initiates a payment.
    *   **Process:**
        *   Receives a request from the frontend.
        *   Authenticates the user using the JWT token via Supabase Auth (`supabase.auth.getUser`).
        *   Retrieves Razorpay API keys from environment variables.
        *   Calls the Razorpay Orders API (`POST /v1/orders`) using `fetch` to create an order with a fixed amount (₹1234) and associates the `user_id` in the `notes` field.
        *   Returns the `orderId`, `amount`, `currency`, and Razorpay `keyId` to the frontend.
    *   **Path:** `supabase/functions/create-razorpay-order/index.ts`

2.  **`verify-razorpay-payment`**:
    *   **Responsibility:** Verifies the payment status with Razorpay after the user completes the payment on the frontend.
    *   **Process:**
        *   Receives `razorpay_payment_id`, `razorpay_order_id`, and `razorpay_signature` from the frontend.
        *   Authenticates the user using the JWT token via Supabase Auth (`supabase.auth.getUser`).
        *   Retrieves Razorpay API keys from environment variables.
        *   Verifies the received `razorpay_signature` against a signature generated using the `razorpay_order_id`, `razorpay_payment_id`, and the Razorpay `keySecret`.
        *   If the signature is valid, it fetches the order details from Razorpay (`GET /v1/orders/:order_id`) using `fetch`.
        *   Verifies that the `user_id` stored in the order's `notes` matches the authenticated user's ID.
        *   If both checks pass, it updates the user's record in the `profiles` table in the Supabase database, setting `has_paid` to `true` and storing `razorpay_payment_id` and `payment_date`.
        *   Returns a success or failure response to the frontend.
    *   **Path:** `supabase/functions/verify-razorpay-payment/index.ts`

### 2.1 Frontend Interaction

*   The frontend (primarily `src/services/payment/globalPayment.ts` and potentially components like `src/components/payment/PaymentPromotionDialog.tsx`) calls these Edge Functions.
*   It passes the Supabase JWT token in the `Authorization` header for user authentication.
*   For creation, it sends relevant data (like UTM parameters, if implemented).
*   For verification, it sends the payment details received from the Razorpay SDK callback.

### 2.2 Dependencies (Current State)

*   **Supabase Auth:** For user authentication within the Edge Functions.
*   **Supabase Database:** Specifically the `profiles` table for updating payment status.
*   **Supabase Edge Function Runtime (Deno):** The execution environment.
*   **Razorpay API:** For creating orders and fetching order details.
*   **Deno Standard Library:** (`http/server`, `node/crypto` for HMAC).
*   **Environment Variables:** `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` (and potentially test keys).
*   **Frontend Code:** Calling the functions and handling responses.

## 3. Proposed State: Dedicated Backend API (`api.learnzy.co.in`)

The proposal is to migrate the logic from the two Supabase Edge Functions to two corresponding endpoints on the dedicated backend service:

1.  `POST /api/create-razorpay-order`
2.  `POST /api/verify-razorpay-payment`

These new API endpoints will replicate the *exact same functionality* as described in Section 2 for the respective Edge Functions.

## 4. Migration Impact

Migrating from Edge Functions to a dedicated API involves changes in both the frontend and the new backend service.

### 4.1 Frontend Changes

*   **API Endpoint URLs:** Update all frontend code currently calling `supabase.functions.invoke('create-razorpay-order', ...)` and `supabase.functions.invoke('verify-razorpay-payment', ...)` to instead make `fetch` (or `axios`, etc.) requests to `https://api.learnzy.co.in/api/create-razorpay-order` and `https://api.learnzy.co.in/api/verify-razorpay-payment` respectively.
*   **Authentication:** The method of passing the user's authentication context needs to be consistent. The frontend should continue sending the Supabase JWT token in the `Authorization: Bearer <token>` header to the new API endpoints.
*   **Request/Response Handling:** Ensure the request body format (e.g., sending UTM params, payment IDs) and response parsing logic align with the new API's expected format (though the goal is to keep it identical to the Edge Function's current format).
*   **File(s) to Modify (Likely):**
    *   `src/services/payment/globalPayment.ts` (or equivalent service layer)
    *   Potentially other files invoking these services.

### 4.2 Backend Changes (`api.learnzy.co.in`)

*   **Endpoint Implementation:** Create the two new `POST` endpoints.
*   **Logic Replication:** Implement the exact logic currently present in the `index.ts` files of both Edge Functions.
*   **Authentication:** The backend must be configured to:
    *   Receive the Supabase JWT from the `Authorization` header.
    *   Verify the JWT signature using Supabase's public key or by calling a Supabase verification endpoint.
    *   Extract the `user_id` from the verified token.
*   **Database Connection:** Establish a secure connection to the Supabase database from the `api.learnzy.co.in` service.
*   **Database Interaction:** Use a suitable database client (e.g., `node-postgres`, `@supabase/supabase-js` if feasible in Node.js) to perform the `UPDATE` operation on the `profiles` table in the `verify-razorpay-payment` endpoint logic.
*   **Razorpay Interaction:** Use `fetch` or a suitable HTTP client to interact with the Razorpay Orders API (`/v1/orders`).
*   **Environment Variables:** Securely manage and access the required environment variables (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` or specific DB credentials, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, JWT Secret/Public Key for verification) within the `api.learnzy.co.in` deployment environment.
*   **CORS:** Configure CORS headers on the new API endpoints to allow requests from the Learnzy frontend domain.
*   **Signature Verification:** Ensure the `crypto` module (or equivalent) is available in the backend environment (e.g., Node.js) to perform the HMAC-SHA256 signature verification.

### 4.3 Edge Function Decommissioning

*   Once the new API endpoints are deployed, tested, and the frontend is successfully switched over, the existing `create-razorpay-order` and `verify-razorpay-payment` Supabase Edge Functions should be deleted.

### 4.4 Dependencies (Proposed State - `api.learnzy.co.in`)

*   **Backend Framework:** (e.g., Express, NestJS, Fastify)
*   **HTTP Client:** (e.g., `node-fetch`, `axios`)
*   **Database Client:** (e.g., `pg`, `@supabase/supabase-js`)
*   **Authentication Library:** (e.g., `jsonwebtoken`, libraries for Supabase JWT verification)
*   **Cryptography Library:** (Node.js built-in `crypto`)
*   **Environment Variable Management:** (e.g., `dotenv`)
*   **CORS Middleware:** (e.g., `cors` for Express)
*   **Hosting Environment:** Where `api.learnzy.co.in` is hosted.

## 5. Non-Goals

*   Changing the payment provider from Razorpay.
*   Altering the core payment amount or currency.
*   Introducing new payment features.
*   Changing the database schema for the `profiles` table.

## 6. Success Metrics

*   Users can successfully complete payments via Razorpay using the new API endpoints.
*   The `profiles` table is correctly updated with `has_paid = true` and payment details upon successful verification.
*   Frontend receives appropriate success/error responses.
*   No regressions in the payment flow.
*   The old Edge Functions are successfully removed.

## 7. Open Questions/Risks

*   **Authentication:** How will JWT verification be implemented in the new backend? (Using Supabase public key vs. calling a Supabase endpoint). Need to ensure security.
*   **Secret Management:** How will Supabase and Razorpay secrets be securely managed in the `api.learnzy.co.in` environment?
*   **Performance:** Will the new API endpoints introduce different latency characteristics compared to Edge Functions? Needs testing.
*   **Error Handling:** Ensure robust error handling and logging are implemented in the new backend.
*   **Database Access:** How will the new backend securely connect to the Supabase database? (Service role key vs. dedicated DB user/password).
*   **Deployment:** Coordinating frontend and backend deployments to minimize disruption.
