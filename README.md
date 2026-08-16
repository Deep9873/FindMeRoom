# FindMeRoom 🏠

FindMeRoom is a full-stack rental platform designed to make finding and listing rooms, houses, PGs, and rental properties easier.

Users can browse available properties, view property details, contact property owners, and manage their own listings. Property owners can publish listings with images, rent details, amenities, and availability, while administrators can manage users, properties, and customer support.

## ✨ Features

### 🏠 Property Discovery

* Browse rooms, houses, PGs, and other rental properties
* Search and filter properties
* View detailed property information
* View rent, deposit, location, amenities, images, and availability
* City-based property discovery

### 👤 User Features

* User registration and login
* Secure authentication using JWT
* Create and manage property listings
* Update property information
* Manage property availability
* Contact property owners through chat

### 💬 Messaging

* Property-based conversations
* Send and receive messages
* Read/unread message status
* Conversation summaries

### 🛠️ Admin Dashboard

* Admin authentication
* User management
* Property management
* Customer support management
* Admin settings
* Support ticket/status management

### 📚 Rental Resources

* Rental agreement templates
* Security deposit guidelines
* Tenant rights checklist
* Property inspection guide
* Property listing optimization guide
* Rent calculator

### 🔎 SEO & Discoverability

* Dynamic page metadata
* City-specific property pages
* Property sitemap
* SEO-friendly resource pages
* Open Graph and Twitter metadata

## 🧑‍💻 Tech Stack

### Frontend

* React
* React Router
* Axios
* Tailwind CSS
* CRACO

### Backend

* Python
* FastAPI
* Pydantic
* JWT Authentication
* bcrypt / Passlib

### Database

* MongoDB
* Motor for asynchronous MongoDB access

## 📁 Project Structure

```text
FindMeRoom/
│
├── backend/
│   ├── server.py
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.js
│   ├── package.json
│   └── tailwind.config.js
│
├── backend_test.py
├── comprehensive_backend_test.py
├── health_check_test.py
├── generate_mock_properties.py
├── investigate_cities.py
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm or Yarn
* Python 3.9+
* MongoDB or a MongoDB Atlas database

### 1. Clone the repository

```bash
git clone https://github.com/Deep9873/FindMeRoom.git
cd FindMeRoom
```

### 2. Configure the backend

```bash
cd backend
python -m venv venv
```

Activate the virtual environment.

**Windows:**

```bash
venv\Scripts\activate
```

**macOS/Linux:**

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file:

```env
MONGO_URL=your_mongodb_connection_string
DB_NAME=findmeroom
JWT_SECRET=your_secure_jwt_secret
```

### 3. Start the backend

From the `backend` directory:

```bash
uvicorn server:app --reload
```

The API will be available at:

```text
http://localhost:8000
```

FastAPI documentation:

```text
http://localhost:8000/docs
```

### 4. Start the frontend

Open another terminal:

```bash
cd frontend
npm install
npm start
```

The frontend will normally run at:

```text
http://localhost:3000
```

Configure the backend URL in the frontend environment if required:

```env
REACT_APP_BACKEND_URL=http://localhost:8000
```

## 🔐 Environment Variables

Never commit real credentials to GitHub.

Use environment variables for:

* MongoDB connection strings
* JWT secrets
* API keys
* Other private configuration

A `.env.example` file should be used as a template.

## 🔄 Application Flow

```text
User
  │
  ▼
React Frontend
  │
  │ HTTP / REST API
  ▼
FastAPI Backend
  │
  ├── Authentication
  ├── Property Management
  ├── Chat / Messaging
  ├── Admin Management
  └── Customer Support
  │
  ▼
MongoDB
```

## 🧪 Testing

The repository contains backend and application testing scripts, including:

```bash
python backend_test.py
python comprehensive_backend_test.py
python health_check_test.py
```

These scripts are used to test API functionality, backend health, property workflows, and other application behaviour.

## 🚀 Future Improvements

Some planned improvements include:

* Location-based property search
* Map integration
* Advanced property filtering
* Image optimization and cloud storage
* Email and notification system
* Improved authentication and authorization
* Automated CI/CD testing
* Better mobile responsiveness
* More comprehensive automated tests

## 📌 Project Purpose

FindMeRoom was built as a practical full-stack project to solve a common problem: making it easier for tenants to discover suitable rental properties while giving property owners a simple platform to publish and manage their listings.

## 👨‍💻 Author

**Deep Jangid**

BCA Student | Full-Stack Web Development

GitHub: https://github.com/Deep9873
