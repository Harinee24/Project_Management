# 📊 Project Management Dashboard

A simplified Trello-style project management application built using the MERN Stack.

This application allows users to manage boards, lists, and task cards with drag-and-drop functionality and role-based access control.


---

🚀 Features

🔐 User Registration & Login (JWT Authentication)

👥 Role-Based Access (Admin / User)

📋 Create Boards (Admin only)

🗂 Create Lists inside Boards

📝 Create Task Cards inside Lists

🔄 Drag & Drop Tasks between Lists

💾 MongoDB Data Persistence

🌐 REST API Integration with React Frontend



---

🛠 Tech Stack

Frontend

React (MainPage.js)

CSS (MainPage.css)

Axios


Backend

Node.js

Express.js

MongoDB

Mongoose

JWT (Authentication)

bcryptjs (Password Encryption)



---

📁 Project Structure

All files are in the main branch (no separate frontend/backend folders):

server.js        → Backend API
MainPage.js      → React Frontend
MainPage.css     → Styling


---

⚙ Installation & Setup

1️⃣ Install Backend Dependencies

npm init -y
npm install express mongoose cors bcryptjs jsonwebtoken

2️⃣ Start MongoDB

Make sure MongoDB is running locally:

mongodb://127.0.0.1:27017/projectDashboardDB

3️⃣ Run Backend

node server.js

Server runs on:

http://localhost:5000


---

4️⃣ Setup React Frontend

Inside your React project:

npm install axios
npm start


---

🔐 Role-Based Access Control

Admin

Can create boards

Can manage lists and tasks


User

Can view boards

Can add lists and tasks

Cannot create new boards




---

🔄 Drag and Drop Implementation

HTML5 Drag & Drop API is used.

When a task is moved between lists:

The updated list structure is sent to backend.

MongoDB stores the updated board data.

Changes persist after refresh.




---

🗄 Database Structure

User

name

email

password (hashed)

role (admin / user)


Board

title

lists

title

tasks

text





---

🎯 Learning Outcomes

Implementing JWT Authentication

Role-based authorization

MongoDB nested schema handling

Drag-and-drop UI interactions

Full MERN stack data flow



---

📌 Future Enhancements

Task editing & deletion

Due dates & priority levels

Real-time collaboration (WebSockets)

Admin dashboard analytics



---
