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

# API documentation

# 1. Sign-up Of A User

This API allows a user to sign up.

## 📌 URL

**POST** `/auth/sign-up`

---

## 📤 Example Request

````json
{
  "name": "John Doe",
  "email": "b4@example.com",
  "password": "mypassword"
}


## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/smsohag32/dare-to-donate-backend.git

# Navigate to the project directory
cd dare-to-donate-backend

# Install dependencies
npm install

# Create a .env file and add the required environment variables
cp .env.example .env

npm start
````
