# Manchester United Web Page ⚽🔴

A tribute website dedicated to **Manchester United Football Club** (“The Red Devils”).  
This project showcases the club’s rich history, trophy cabinet, and fan testimonials using a **modern, responsive, and interactive web design** built with **HTML, CSS, and JavaScript**.

---

## ✨ Features

### 🏟️ User Interface
- **Responsive Hero Section**  
  Welcoming landing page with club branding and a *“Join Us”* call-to-action.
- **Club History Section**  
  A detailed timeline highlighting key milestones:
  - Founding (1878)
  - 1968 European Cup
  - 1999 Historic Treble
  - Sir Alex Ferguson farewell
- **Animated Trophy Cabinet**  
  Horizontal scrolling display of major honors:
  - Premier League
  - FA Cup
  - League Cup
  - UEFA Champions League
  - FIFA Club World Cup
- **Fan Testimonials**  
  Horizontally scrollable fan quotes with hover effects.

---

### 🔐 Authentication System (JavaScript)
- **User Registration & Login**
- **Password Hashing (SHA-256)** for security
- **Password Reset Feature**
- **Show / Hide Password Toggle**
- **Profile Management**
  - Edit name
  - Change password
- **Admin Panel**
  - View all registered users
  - Delete users (admin-only)
- **Role-Based Access**
  - Fan
  - Admin

> Default Admin Account  
> **Email:** admin@manutd.com  
> **Password:** admin123

---

### 🌙 Dark / Light Mode
- One-click theme toggle
- Theme preference saved using `localStorage`
- Fully compatible with:
  - Hero section
  - Trophy cards
  - Testimonials
  - Modals
  - Footer

---

### 🎨 Animations & UX
- Scroll-based **entry animations**
- Infinite sliding animation for trophies
- Hover scaling effects
- Smooth scrolling navigation
- Modal popups for login, register, profile, and admin panel

---

### 📱 Mobile Responsive
- Adaptive layout for screens up to **768px**
- Mobile-friendly navigation
- Optimized scrolling sections

---

## 🛠️ Technologies Used

### Frontend
- **HTML5**
  - Semantic elements
  - Structured sections
- **CSS3**
  - Flexbox & CSS Grid
  - CSS Variables (`--red`, `--dark`, `--light`)
  - Keyframe animations
  - Media queries for responsiveness
- **JavaScript (Vanilla JS)**
  - DOM manipulation
  - `localStorage` for data persistence
  - Authentication logic
  - Theme management
  - Crypto API for password hashing

### Fonts
- **Google Fonts**
  - *Outfit* – body text
  - *Playfair Display* – headings

---

## 🚀 How to Run

1. **Clone the repository** (or download the ZIP):
   ```bash
   git clone https://github.com/basitheman/HTML-AND-CSS-ASIGNMENT.git


## 📂 Project Structure

├── manchester united.html        # Main HTML structure
├── manchester.css         # Styling and animations
├── MA.js          # JavaScript logic (auth, dark mode, admin)
└── README.md     # Project documentation

