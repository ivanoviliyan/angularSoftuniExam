# 🎬 angularSoftuniExam
SoftUni – Angular Project 2025

## 📥 Installation

### 1️⃣ Clone or Download the Project
Download the project files or clone the repository to your local machine.

### 2️⃣ Set up the Server

Open a new terminal window and navigate to the server folder:

```bash
cd angular-project
```

Install dependencies:

```bash
npm install
```

Start the server:
```bash
ng serve
```

### 3️⃣ Set up the Client

Open another terminal window and navigate to the client folder:

```bash
cd cinehub-client
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

**Cinehub** е Angular приложение, в което потребителите могат да разглеждат, добавят и управляват филми.

- **Автентикирани потребители** могат да добавят нови филми, да ги редактират или изтриват (ако са собственици).
- Всеки автентикиран потребител може да добавя коментари под филмите, а само собственикът на коментара може да го редактира или изтрие.
- **Неавтентикирани потребители** могат единствено да разглеждат вече добавените филми и техните детайли, но не могат да взаимодействат с тях.

---

## 📂 Project Structure

```plaintext
src/
 ├── app/
 │   ├── components/      # Reusable UI elements (header, footer, movie card)
 │   ├── guards/          # AuthGuard за защита на пътища
 │   ├── services/        # Angular услуги за потребители, филми и коментари
 │   ├── pages/           # Основни страници (Home, Catalog, Movie Details, Favorites)
 │   ├── models/          # Интерфейси и типове (Movie, User, Comment)
 │   ├── app-routing.module.ts
 │   └── app.module.ts
 ├── assets/              # Статични ресурси (изображения, икони, стилове)
 ├── environments/        # Настройки за development и production
```

---

## ⚙️ How the Application Works

- Angular клиентът изпраща заявки към сървъра за получаване, добавяне, обновяване или изтриване на филми.
- Действия като добавяне или изтриване на коментари се обработват чрез API заявки.
- Сървърът връща данни в **JSON** формат, които се визуализират динамично от клиента.
