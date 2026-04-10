# 🎓 Scholarship Application System — REST API

A structured **Node.js + Express.js** REST API for managing scholarship applications with business logic validation, custom logging middleware, and MVC architecture.

---

## 📁 Project Structure

```
scholarship-application-system/
├── server.js                  # Entry point — Express app & server
├── routes/
│   └── scholarshipRoutes.js   # All API route definitions
├── controllers/
│   └── scholarshipController.js  # Request handlers & business logic calls
├── middleware/
│   ├── logger.js              # Custom logging middleware
│   └── validator.js           # Input validation middleware
├── utils/
│   └── helpers.js             # Business rule functions & calculations
└── package.json
```

---

## 🚀 How to Run the Project

### Prerequisites
- Node.js v16+ installed
- npm (comes with Node.js)

### Steps

```bash
# 1. Navigate to the project folder
cd scholarship-application-system

# 2. Install dependencies
npm install

# 3. Start the server
npm start

# OR for development with auto-restart
npm run dev
```

Server runs at: **http://localhost:3000**

---

## 📡 API Endpoints

| # | Method | Endpoint | Description |
|---|--------|----------|-------------|
| 1 | POST | `/scholarships/apply` | Apply for scholarship |
| 2 | GET | `/scholarships` | Get all applications |
| 3 | GET | `/scholarships/:id` | Get application by ID |
| 4 | PUT | `/scholarships/verify/:id` | Approve or Reject application |
| 5 | PUT | `/scholarships/:id` | Update an application |
| 6 | DELETE | `/scholarships/:id` | Delete an application |

Optional query filter: `GET /scholarships?status=Approved`

---

## 🧾 Business Rules

### Rule 1 — Income Limit Validation
- Annual family income **> ₹6,00,000** → ❌ Not eligible
- Annual family income **≤ ₹3,00,000** → ✅ Full scholarship
- Annual family income **₹3,00,001 – ₹6,00,000** → ✅ Partial scholarship

### Rule 2 — Minimum Academic Percentage
- Academic percentage **< 60%** → ❌ Not eligible
- Academic percentage **≥ 60%** → ✅ Eligible

### Rule 3 — Age Eligibility
- Age **< 15 or > 30** → ❌ Not eligible
- Age **15 – 30** → ✅ Eligible

### Scholarship Amount Calculation
| Income Range | Percentage ≥ 80% | Percentage 60–79% |
|---|---|---|
| ≤ ₹3,00,000 | ₹50,000/year | ₹30,000/year |
| ₹3,00,001 – ₹6,00,000 | ₹25,000/year | ₹15,000/year |

---

## 📋 Sample API Requests (Postman)

### 1. Apply for Scholarship — POST /scholarships/apply

**Request Body:**
```json
{
  "name": "Rahul Sharma",
  "age": 20,
  "annualIncome": 250000,
  "percentage": 82,
  "course": "BCA",
  "contactEmail": "rahul@email.com"
}
```

**Success Response (201):**
```json
{
  "message": "Scholarship application submitted successfully",
  "data": {
    "id": 1,
    "name": "Rahul Sharma",
    "age": 20,
    "annualIncome": 250000,
    "percentage": 82,
    "course": "BCA",
    "contactEmail": "rahul@email.com",
    "status": "Pending",
    "scholarshipAmount": 50000,
    "appliedAt": "2026-04-04T10:00:00.000Z"
  }
}
```

**Failure Response (400 — Income too high):**
```json
{
  "message": "Annual family income ₹700000 exceeds the maximum limit of ₹6,00,000. Not eligible for scholarship."
}
```

### 2. Get All Applications — GET /scholarships

**Response (200):**
```json
{
  "message": "Applications fetched successfully",
  "total": 1,
  "data": [ ... ]
}
```

### 3. Get Application by ID — GET /scholarships/1

**Not Found (404):**
```json
{
  "message": "Application with ID 1 not found"
}
```

### 4. Verify Application — PUT /scholarships/verify/1

**Request Body:**
```json
{
  "decision": "Approved",
  "verifiedBy": "Dr. A. Mehta",
  "remarks": "All documents verified successfully"
}
```

**Success Response (200):**
```json
{
  "message": "Application Approved successfully",
  "data": { ... }
}
```

---

## 📊 HTTP Status Codes Used

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation / business rule failure) |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## 🔍 Logging System

Every request is logged in the format:

```
[2026-04-04 15:30:00] POST /scholarships/apply 201 (42ms)
[2026-04-04 15:30:12] GET /scholarships 200 (5ms)
```

---

## 👩‍💻 Author

**Student Name**: _Your Name Here_  
**Subject**: Internet Programming (IP) — FEB2026  
**Branch**: EXTC A|B  
