# 🚀 Trackora
## 📱 Overview

Trackora is a modern mobile issue tracking application built using React Native and TypeScript.

The application focuses on offline-first architecture, local persistence, issue management workflows, and a clean user experience.

This project was developed as part of a mobile application development assessment.

---

## ✨ Features

### 🔐 Authentication

- Mock login flow
- Email/password validation
- Logout functionality

### 📋 Issue Management

- Create issues
- Edit issues
- Delete issues
- View issue details
- Mark issues as:
  - Open
  - In Progress
  - Resolved
  - Closed

### 📊 Dashboard

- Summary statistics
- Counts by issue status
- Theme Support (Light Mode/ Dark Mode)

### 🔍 Search & Filtering

- Search by title
- Filter by status
- Filter by priority

### 📂 Offline-First Functionality

- Local SQLite persistence
- Offline queue architecture
- Retry sync mechanism
- Data survives app restarts

### 🎨 UI/UX

- Dark mode support
- Reusable UI components
- Responsive mobile UI
- Floating action button
- Confirmation dialogs

### 🖼️ Attachments & Export

- Image attachment support
- Export issues as JSON

---

## 🛠️ Tech Stack

- React Native
- TypeScript
- Zustand
- SQLite
- React Navigation
- Expo Image Picker
- Expo

---

## 📁 Project Structure

```bash
assets/
 ┗ images/
    ┗ logo.png

src/
 ┣ features/
 ┃ ┣ auth/
 ┃ ┗ issues/
 ┣ navigation/
 ┣ infrastructure/
 ┣ shared/
 ┃ ┣ components/
 ┃ ┣ hooks/
 ┃ ┣ theme/
 ┃ ┗ utils/
````

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_LINK>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start Expo

```bash
npx expo start
```

---

## 🔑 Demo Credentials

```text
Email: admin@gmail.com
Password: Admin@1234
```

---

## 🌐 Offline Sync Assumptions

This project demonstrates an offline-first architecture using a local sync queue.

Since this assessment does not include a real backend:

* API calls are mocked/simulated
* Sync queue behavior is demonstrated architecturally
* Local SQLite storage acts as the primary source of truth

---

## 📹 Deliverables

Included with submission:

* Source code repository
* README documentation
* Completion note
* Screen recording

---

## 👨‍💻 Developer

Developed using React Native + TypeScript as part of a mobile engineering assessment.

```
