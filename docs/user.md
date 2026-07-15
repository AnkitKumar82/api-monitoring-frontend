# User API Documentation

This document provides comprehensive documentation for all User-related APIs in the system.

## 1. Signup Initiate
**Endpoint:** `POST /user/signup-initiate`

**Description:** Initiates the signup process by sending an OTP to the user's email address for verification.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "otpId": "uuid-string"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/user/signup-initiate \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

**Example Response:**
```json
{
  "otpId": "550e8400-e29b-41d4-a716-446655440000"
}
```

---

## 2. Signup Complete
**Endpoint:** `POST /user/signup-complete`

**Description:** Completes the signup process by validating the OTP and creating a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "securePassword123",
  "otp": "123456",
  "otpId": "uuid-string"
}
```

**Response:**
```json
{
  "_id": "ObjectId",
  "name": "John Doe",
  "email": "user@example.com",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/user/signup-complete \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123",
    "otp": "123456",
    "otpId": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

**Example Response:**
```json
{
  "_id": "640012345678901234567890",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

---

## 3. Signin
**Endpoint:** `POST /user/signin`

**Description:** Authenticates a user and returns a JWT token for subsequent requests.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "token": "jwt-token-string"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/user/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

**Example Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDAwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAiLCJpYXQiOjE2NzUwMDAwMDAsImV4cCI6MTY3NTA4NjQwMH0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

---

## 4. Forgot Password Initiate
**Endpoint:** `POST /user/forgot-password-initiate`

**Description:** Initiates the forgot password process by sending an OTP to the user's email address. This endpoint works for both existing and non-existing users.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "otpId": "uuid-string"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/user/forgot-password-initiate \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com"}'
```

**Example Response:**
```json
{
  "otpId": "550e8400-e29b-41d4-a716-446655440000"
}
```

---

## 5. Forgot Password Complete
**Endpoint:** `POST /user/forgot-password-complete`

**Description:** Completes the forgot password process by validating OTP or JWT token and updating the user's password.

**Request Body (OTP Flow):**
```json
{
  "otp": "123456",
  "otpId": "uuid-string",
  "email": "user@example.com",
  "password": "newSecurePassword123"
}
```

**Request Body (JWT Flow):**
```json
{
  "token": "jwt-token-string",
  "password": "newSecurePassword123"
}
```

**Response:**
No response body on success.

**Example Request (OTP Flow):**
```bash
curl -X POST http://localhost:3000/user/forgot-password-complete \
  -H "Content-Type: application/json" \
  -d '{
    "otp": "123456",
    "otpId": "550e8400-e29b-41d4-a716-446655440000",
    "email": "john@example.com",
    "password": "newSecurePassword123"
  }'
```

**Example Request (JWT Flow):**
```bash
curl -X POST http://localhost:3000/user/forgot-password-complete \
  -H "Content-Type: application/json" \
  -d '{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "password": "newSecurePassword123"
  }'
```

---

## 6. Get Profile
**Endpoint:** `GET /user/get-profile`

**Description:** Retrieves the authenticated user's profile information.

**Request Headers:**
```
Authorization: Bearer jwt-token-string
```

**Response:**
```json
{
  "_id": "ObjectId",
  "name": "John Doe",
  "email": "user@example.com",
  "isVerified": true,
  "planDetails": {
    "type": "premium",
    "paymentId": "payment_123456",
    "expireAt": "2023-12-31T23:59:59.000Z",
    "planConfiguration": {
      "maxEndpoint": 100,
      "minTimeInterval": 10,
      "maxNotificationChannels": 5
    }
  },
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

**Example Request:**
```bash
curl -X GET http://localhost:3000/user/get-profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Example Response:**
```json
{
  "_id": "640012345678901234567890",
  "name": "John Doe",
  "email": "john@example.com",
  "isVerified": true,
  "planDetails": {
    "type": "premium",
    "paymentId": "payment_123456",
    "expireAt": "2023-12-31T23:59:59.000Z",
    "planConfiguration": {
      "maxEndpoint": 100,
      "minTimeInterval": 10,
      "maxNotificationChannels": 5
    }
  },
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

---

## 7. Contact Us
**Endpoint:** `POST /user/contact-us`

**Description:** Sends a contact message to the support team.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I have a question about your service."
}
```

**Response:**
No response body on success.

**Example Request:**
```bash
curl -X POST http://localhost:3000/user/contact-us \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I have a question about your service."
  }'