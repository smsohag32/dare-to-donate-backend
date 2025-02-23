# 🩸 Dare To Donate - Blood Donation Application (Backend)

Dare To Donate is a backend service that enables users to **donate blood**, **request blood**, and **manage donor information**. This backend provides RESTful APIs for a seamless blood donation process.

## 📖 API Base URL

🔗 **Live API**: [https://api.daretodonate.com](https://api.daretodonate.com)
🔧 **Local Development**: `http://localhost:4500`

## 🚀 Features

-  User authentication (Register/Login)
-  Donor management (Create, Read, Update, Delete)
-  Blood request system
-  Search for donors based on location & blood type
-  Admin dashboard support (Optional)

---

#### 📌 Api Documentation

**POST** `/api/v1/auth/sign-up`

#### 📤 Example Request

`````json
{
   "email": "sohag@gmail.com",
   "password": "11223344",
   "first_name": "Sohag",
   "last_name": "Sheik",
   "phone": "01922026932",
   "blood_group": "A+",
   "address": {
      "street": "123 Main St",
      "city": "Somewhere",
      "state": "CA",
      "zip": "90001",
      "country": "USA"
   }
}

## 📤 Example response

````json
{
    "message": "User registered successfully",
    "user": {
        "_id": "67bb215d7b4ee4c3745f42cd",
        "email": "sohag@gmail.com",
        "is_active": true,
        "phone": "01922026932",
        "blood_group": "A+"
    }
}
`````

**POST** `/api/v1/auth/sign-in`

#### 📤 Example Request

```json
{
   "email": "sohag@gmail.com",
   "password": "11223344"
}
```

## 📤 Example response

```json
{
   "message": "User logged in successfully",
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2JiMjE1ZDdiNGVlNGMzNzQ1ZjQyY2QiLCJlbWFpbCI6InNvaGFnQGdtYWlsLmNvbSIsImlhdCI6MTc0MDMxNzA5NiwiZXhwIjoxNzQwNDAzNDk2fQ.GEYUP28R4_2OK5wsGO0ClSPf-jAsFFuQKqbxP_0Y1Ak",
   "user": {
      "_id": "67bb215d7b4ee4c3745f42cd",
      "email": "sohag@gmail.com",
      "is_active": true,
      "phone": "",
      "blood_group": ""
   }
}
```
