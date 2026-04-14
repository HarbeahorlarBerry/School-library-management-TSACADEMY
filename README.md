# 📚 School Library Management API

A RESTful API built with **Node.js, Express.js, and MongoDB (Mongoose)** for managing a school library system.  
It supports authors, books, students, attendants, authentication, and full book borrowing/returning logic.

---

## 🚀 Features

### 📚 Core Modules
- Authors CRUD (Create, Read, Update, Delete)
- Books CRUD with:
  - Borrowing system
  - Returning system
  - Overdue detection
- Students management
- Library attendants management

### 🔐 Authentication
- User registration
- User login
- JWT authentication
- Protected routes

### 🔎 Advanced Features
- Pagination (books, authors, students, attendants)
- Search functionality (books by title/author)
- ISBN duplicate prevention
- Data validation middleware
- Overdue book tracking

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- bcrypt.js

---

## 📁 Project Structure


## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/library-system.git

npm install

Create .env file

npm run dev



POSTMAN  DOCUMENTATION

📡 API Endpoints
🔐 Auth
Method	Endpoint	Description
POST	/auth/reg	Register user
POST	/auth/log	Login user

📚 Books
Method	Endpoint	Description
POST	/books	Create book
GET	/books	Get all books
GET	/books/:id	Get single book
PUT	/books/:id	Update book
DELETE	/books/:id	Delete book
POST	/books/:id/borrow	Borrow book
POST	/books/:id/return	Return book

✍️ Authors
Method	Endpoint	Description
POST	/authors	Create author
GET	/authors	Get all authors
GET	/authors/:id	Get author
PUT	/authors/:id	Update author
DELETE	/authors/:id	Delete author

🎓 Students
Method	Endpoint	Description
POST	/students	Create student
GET	/students	Get all students
GET	/students/:id	Get student

👨‍💼 Attendants
Method	Endpoint	Description
POST	/attendants	Create attendant
GET	/attendants	Get all attendants