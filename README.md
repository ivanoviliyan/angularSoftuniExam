# 🎬 angularSoftuniExam
SoftUni – Angular Project 2025

## 📥 Installation

### 1️⃣ Clone or Download the Project
Download the project files or clone the repository to your local machine.

### 2️⃣ Set up the Server

Open a new terminal window and navigate to the server folder:

```bash
cd softuni-practice-server
cd softuni-practice-server-master
```

Install dependencies:

```bash
npm install
```

Start the server:
```bash
npm start
```

### 3️⃣ Set up the Client

Open another terminal window and navigate to the client folder:

```bash
cd angular-project
```

Install dependencies:

```bash
npm install
```

Run the Angular development server:
```bash
ng serve
```

### 4️⃣ Open the App

Open your browser and go to:

http://localhost:4200/

---

## 🔍 Overview

This is my SoftUni Exam Angular app that allows authenticated users to create new movies. Each authenticated user can create and delete movies. In the future, I plan to implement separate roles for Admin and User. Currently, every user has admin privileges and can interact with the application as an administrator.

Non-authenticated users can only view the existing movies and their details, but they cannot interact with them.

---

## 📂 Project Structure

```plaintext
src/
 ├── app/
 │   ├── shared/      # Reusable UI elements (header, footer, moviе-details)
 │   ├── guards/          # AuthGuard за защита на пътища
 │   ├── services/        # Angular услуги за потребители, филми и коментари
 │   ├── pages/           # Основни страници (Home, Movies, My List)
 │   ├── types/           # Интерфейси и типове (Movie, User, WatchListEntry)
 │   ├── app-routing.module.ts
 │   └── app.module.ts
 ├── assets/              # Статични ресурси (изображения, икони, стилове)
```

---

## ⚙️ How the Application Works

- The Angular application sends HTTP requests to the server for Create, Read, Update, and Delete (CRUD) operations.
- The SoftUni Practice server responds to each HTTP request, causing the corresponding changes to be reflected in the Angular application.