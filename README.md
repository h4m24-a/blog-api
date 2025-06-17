# 📝 Blog API

A **RESTful API** for a blog platform, supporting authenticated authors. Built with **Node.js**, **Express**, and **PostgreSQL** using **Prisma ORM**. This API enables blog post management, user authentication, and comment handling.

---

##  Tech Stack

|  |  |
|------------|-------------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) | Server-side JavaScript runtime |
| ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) | Routing and server logic |
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) | Relational database |
| ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white) | Type-safe ORM |
| ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white) | Token-based authentication |
| ![bcrypt](https://img.shields.io/badge/bcrypt-35495E?style=for-the-badge&logo=lock&logoColor=white) | Password hashing |


---

## Features
- JWT-based auth: Token issued at login, required for protected routes
- Admin can create and manage posts and user comments
- Users can login to view and comments on posts
- Role-based access control handled using JWT