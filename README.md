# PRAN - Smoking Cessation & Recovery Tracking System

![PRAN Logo](https://img.shields.io/badge/PRAN-Health-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb)

**AI-powered smoking cessation and recovery tracking system** with BreathBot chatbot, craving logs, progress analytics, and personalized quit journey support.

---

## 🌟 Features

### 🤖 BreathBot AI Assistant
- 24/7 AI-powered chat support for craving intervention
- Personalized motivational messages
- Real-time conversation history

### 📊 Progress Tracking
- Visual recovery timeline
- Days smoke-free counter
- Money saved calculator
- Health improvement milestones

### 📝 Craving Log
- Log cravings with intensity levels
- Track triggers and patterns
- Analyze craving frequency
- Time-based craving insights

### 📈 Insights & Analytics
- Weekly craving patterns
- Progress charts and graphs
- Achievement badges
- Personalized statistics

### ⚙️ User Management
- Secure authentication (JWT)
- Profile customization
- Quit journey data management
- Notification preferences

---

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - UI framework
- **React Router v6** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - API communication
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing

---

## 📁 Project Structure

```
PRAN-Smoking-Cessation-App/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service layer
│   │   └── assets/          # Static assets
│   ├── public/
│   └── package.json
│
├── backend/                  # Node.js backend API
│   ├── controllers/         # Request handlers
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   └── server.js            # Entry point
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/kalashmishra21/PRAN-Smoking-Cessation-App.git
cd PRAN-Smoking-Cessation-App
```

2. **Setup Backend**
```bash
cd backend
npm install
```

3. **Configure Environment Variables**

Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

4. **Setup Frontend**
```bash
cd ../frontend
npm install
```

5. **Start Development Servers**

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run dev
```

6. **Access the Application**
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

---

## 🔐 Security Features

- ✅ **Password Hashing** - Bcrypt with salt rounds
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Strong Password Validation** - Min 8 chars, uppercase, lowercase, number
- ✅ **Environment Variables** - Sensitive data protection
- ✅ **CORS Configuration** - Cross-origin security
- ✅ **Input Validation** - Server-side validation

---

## 📱 Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Onboarding | Landing page with habit tracking form |
| `/auth` | Authentication | Login & Signup |
| `/dashboard` | Dashboard | Main overview with stats |
| `/cravings` | Craving Log | Log and track cravings |
| `/breathbot` | BreathBot | AI chat assistant |
| `/insights` | Insights | Analytics and progress |
| `/settings` | Settings | User profile and preferences |

---

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password_hash: String,
  quit_date: Date,
  cigarettes_per_day: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Craving Model
```javascript
{
  user_id: ObjectId,
  intensity: Number,
  trigger: String,
  notes: String,
  timestamp: Date
}
```

### Progress Model
```javascript
{
  user_id: ObjectId,
  days_smoke_free: Number,
  money_saved: Number,
  cigarettes_avoided: Number,
  last_updated: Date
}
```

---

## 🎨 Design System

- **Primary Color:** `#2D5AEE` (Blue)
- **Typography:** Manrope font family
- **Design Language:** Material Design 3
- **Responsive:** Mobile-first approach
- **Accessibility:** WCAG 2.1 compliant

---

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

---

## 📦 Build for Production

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd backend
npm start
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Kalash Mishra**
- GitHub: [@kalashmishra21](https://github.com/kalashmishra21)

---

## 🙏 Acknowledgments

- Evidence-based quit strategies from clinical research
- Material Design 3 guidelines
- MongoDB Atlas for cloud database
- React community for amazing tools

---

## 📞 Support

For support, email: [Your Email] or open an issue on GitHub.

---

## 🔮 Future Enhancements

- [ ] Mobile app (React Native)
- [ ] Social support groups
- [ ] Gamification features
- [ ] Integration with health devices
- [ ] Multi-language support
- [ ] Advanced AI recommendations

---

**Made with ❤️ for a smoke-free world**
