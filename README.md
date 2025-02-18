# CS-499 Computer Science ePortfolio

## Introduction

Welcome to my **CS-499 Computer Science ePortfolio**, a showcase of my journey through Southern New Hampshire University's Computer Science program. This portfolio highlights my **technical expertise, software development projects, and key enhancements** made to my final capstone project.

I have been in the technology industry for **over 16 years**, specializing in **technical support, software development, and DevOps**. Throughout my career, I have developed a deep passion for solving complex problems using **modern software engineering principles and industry best practices**.

The purpose of this ePortfolio is to present my **capstone project**, a **full-stack inventory management system**, and demonstrate my **competencies in software design, database management, and algorithms**. You can explore my **Professional Self-Assessment, Code Review, and three major project enhancements** below.

---

##  Contents of this ePortfolio

This ePortfolio contains the following sections:

###  [Professional Self-Assessment](#professional-self-assessment)
A reflection on my growth as a software developer and the skills I have gained throughout the CS program.

###  [Code Review](#code-review)
A formal evaluation of my **original mobile application**, identifying areas for improvement in **security, efficiency, and maintainability**.

###  [Enhancement 1 - Software Design & Engineering](#enhancement-1-software-design--engineering)
Migration from a **Java-based Android mobile application** to a **.NET 8 Blazor Server full-stack web application**.

###  [Enhancement 2 - Data Structures & Algorithms](#enhancement-2-data-structures--algorithms)
Optimization of **low-stock notifications** by replacing an inefficient **linear search algorithm** with a **self-balancing AVL Tree**.

###  [Enhancement 3 - Databases](#enhancement-3-databases)
Transition from **SQLite** to **Microsoft SQL Server**, improving **data security, multi-user support, and performance**.

###  [Final Enhanced Artifact](#final-enhanced-artifact)
The completed **Inventory Management System**, now a **fully scalable, secure, and enterprise-ready solution**.

---

##  Professional Self-Assessment

Returning to school was a **strategic decision** to expand my **technical expertise** and gain **academic credentials** for career growth. The SNHU Computer Science program covered a wide range of topics, from **system design and architecture to secure coding practices**.

Throughout my studies, I strengthened my skills in:

- **Programming Languages:** Java, Python, C++
- **Full-Stack Development:** .NET 8 Blazor Server, ASP.NET, Entity Framework
- **Mobile & Web Development:** Android Development, Responsive UI Design
- **Databases:** SQL, Microsoft SQL Server, SQLite
- **Software Security:** Secure Coding, Reverse Engineering, Encryption Techniques
- **Data Structures & Algorithms:** Trees, Sorting, Searching, Algorithm Analysis

These experiences have helped refine my **problem-solving skills, technical expertise, and professional communication abilities**.

---

##  Code Review

Before implementing enhancements, I conducted a **formal code review** of my original **Android Inventory Manager** application. This review focused on:

 **Functionality** - Assessing core features such as login, inventory tracking, and role-based authentication.  
 **Code Structure** - Evaluating **readability, modularity, and maintainability**.  
 **Security** - Identifying vulnerabilities such as **plaintext credential storage** and **lack of input validation**.  
 **Database Optimization** - Noting the use of **inefficient database queries** and **lack of user management CRUD operations**.  
 **Performance** - Finding **linear search inefficiencies** in low-stock alerting.

Key Findings:
-  **Methods violated the Single Responsibility Principle**.
-  **User roles stored in plaintext**, making them vulnerable.
-  **No input validation for login credentials**.
-  **Used outdated Cursor API instead of an ORM**.
-  **Hardcoded strings, reducing maintainability**.

[ Watch the Full Code Review Video](https://www.youtube.com/embed/kh6HDyalhuY?si=ACmY4D3u2YLwN681)  

---

##  Enhancement 1: Software Design & Engineering

**Original Issue:** The original artifact was an **Android-only mobile application**, limiting accessibility and scalability.

**Enhancement:**  
I converted the Android-based **Inventory Manager** into a **full-stack .NET 8 Blazor Server** application with:

 **Blazor Components** replacing Android XML layouts  
 **Identity Framework** for **secure authentication & authorization**  
 **Platform Independence** - Now accessible from **any device** with a web browser  

 **Business Impact:**  
 Employees can now **manage inventory from any device**, improving workflow efficiency.  
 Security improvements **hardened authentication** and **protected user data**.  
 A **scalable, cloud-ready** solution for modern enterprises.

---

##  Enhancement 2: Data Structures & Algorithms

**Original Issue:**  
Low-stock notifications were implemented using an **O(n) linear search**, leading to performance bottlenecks.

**Enhancement:**  
I replaced the **linear search** with a **self-balancing AVL Tree**, reducing lookup time to **O(log n)**.

 **Faster low-stock alerts**  
 **Better scalability for large inventories**  
 **Side-by-side benchmark comparison showed significant speed improvements**  

 **Business Impact:**  
 Businesses can now **process thousands of inventory items efficiently**.  
 System **remains highly responsive** even as inventory grows.  

---

##  Enhancement 3: Databases

**Original Issue:**  
The application used **SQLite**, which lacked **scalability, security, and multi-user support**.

**Enhancement:**  
I **migrated the database to Microsoft SQL Server** and implemented **Entity Framework ORM**.

 **Improved database integrity** with **normalized tables & foreign keys**  
 **Enabled multi-user support**  
 **Implemented parameterized queries** to **prevent SQL injection**  

 **Business Impact:**  
 More **secure and scalable database architecture**.  
 Employees can **update inventory in real-time across multiple locations**.  
 **Future enhancements** are easier to implement with an ORM.

---

##  Final Enhanced Artifact

The final **Inventory Management System** is now a **fully scalable, secure, enterprise-ready** solution.

###  Features:
 **Role-Based Authentication** (Admin/User)  
 **Inventory Tracking & Management**  
 **Low-Stock Notifications with AVL Tree**  
 **Enterprise-Grade Database (Microsoft SQL Server)**  
 **Web-Based Access from Any Device**  

 [**View the Enhanced Artifact on GitHub**](https://github.com/jfrostsnhu/CS-499-Computer-Science-Capstone/tree/master/InventoryManagerApp)  

 **Live Demo:** [**Try it out!**](https://inventorymanager.jamesfrost.dev)  

| **Role**  | **Email**            | **Password**  |
|-----------|----------------------|--------------|
| User      | test@user.com        | Test!ng25    |
| Admin     | test@admin.com       | Test!ng25    |

---

##  Additional Resources

- [ CS-360 Original Artifact Repository](https://github.com/jfrostsnhu/CS-360-MobileArchitectAndProgramming.git)  
- [ CS-499 Capstone Project Repository](https://github.com/jfrostsnhu/CS-499-Computer-Science-Capstone)  
- [ ePortfolio Live Site](https://jfrostsnhu.github.io/)  

---

##  Final Thoughts

This ePortfolio demonstrates **my technical expertise and growth** as a **software developer** through the SNHU Computer Science program. From **software engineering to database management and algorithm optimization**, I have applied industry best practices to build a **scalable, secure, and maintainable** system.

If you have any questions or feedback, feel free to **reach out**! [james@jamesfrost.dev](james@jamesfrost.dev)

---
