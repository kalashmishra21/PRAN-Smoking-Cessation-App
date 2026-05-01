# PRAN - Smoking Cessation & Recovery Tracking System

![PRAN Logo](https://img.shields.io/badge/PRAN-Health-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css)

**AI-powered smoking cessation and recovery tracking system** with intelligent BreathBot chatbot, advanced craving analytics, real-time progress tracking, and personalized quit journey support.

---

## 🌟 Key Features

### 🤖 BreathBot AI Assistant
- **24/7 Intelligent Support** - Context-aware AI chatbot with 40+ unique responses
- **Smart Intent Detection** - Understands cravings, stress, motivation, and health queries
- **Personalized Responses** - Integrates user data (smoke-free days, name, progress)
- **Conversation Memory** - Tracks topics to avoid repetition
- **Real-time Chat History** - Persistent conversation storage
- **Quick Action Buttons** - Instant access to breathing exercises and motivation

### 📊 Advanced Progress Tracking
- **Visual Recovery Timeline** - Health milestone tracking with progress bars
- **Real-time Statistics** - Days smoke-free, money saved, cigarettes avoided
- **Dynamic Calculations** - Based on user's actual smoking habits and costs
- **Achievement System** - Unlock badges and milestones
- **Health Improvements** - Track lung function, circulation, and nicotine levels
- **Financial Insights** - See exactly how much money you're saving

### 📝 Smart Craving Log
- **Intensity Tracking** - Rate cravings from 1-5 with visual indicators
- **Trigger Analysis** - Identify patterns and common triggers
- **Advanced Filters** - Filter by strength, trigger, date range
- **Recent Log View** - Quick access to your latest craving
- **Timeline Visualization** - See all cravings in chronological order
- **Resisted/Not Resisted** - Track your success rate

### 📈 Insights & Analytics
- **Weekly Patterns** - Identify high-risk times and days
- **Progress Charts** - Visual representation of your journey
- **Craving Statistics** - Total count, average intensity, success rate
- **Trend Analysis** - See improvements over time
- **Personalized Recommendations** - AI-driven insights

### 🎨 Modern UI/UX
- **Dark/Light Mode** - User-specific theme preferences
- **Responsive Design** - Works seamlessly on all devices
- **Material Design 3** - Clean, modern interface
- **Smooth Animations** - Delightful user experience
- **Accessibility** - WCAG 2.1 compliant

### ⚙️ User Management
- **Secure Authentication** - JWT-based with strong password validation
- **Profile Customization** - Upload profile pictures, update preferences
- **Quit Journey Data** - Track cigarettes per day, cost per piece, quit date
- **Theme Persistence** - Your theme choice syncs across devices
- **Data Privacy** - Your data stays secure and private

---

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - Modern UI framework with hooks
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - Promise-based HTTP client
- **Vite** - Lightning-fast build tool
- **Context API** - State management (Auth & Theme)

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Minimal web framework
- **MongoDB Atlas** - Cloud-hosted NoSQL database
- **Mongoose** - Elegant MongoDB ODM
- **JWT** - Secure token-based authentication
- **Bcrypt** - Password hashing with salt
- **Multer** - File upload handling
- **Nodemon** - Auto-restart development server

---

## 📁 Project Structure

```
PRAN-Smoking-Cessation-App/
├── frontend/                      # React frontend application
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── AuthComponents.jsx
│   │   │   ├── DashboardComponents.jsx
│   │   │   ├── CravingLogComponents.jsx
│   │   │   ├── BreathBotComponents.jsx
│   │   │   ├── InsightsComponents.jsx
│   │   │   ├── SettingsComponents.jsx
│   │   │   ├── OnboardingComponents.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── NotificationCard.jsx
│   │   ├── pages/                # Page components
│   │   │   ├── Auth.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CravingLog.jsx
│   │   │   ├── BreathBot.jsx
│   │   │   ├── Insights.jsx
│   │   │   ├── Settings.jsx
│   │   │   └── OnboardingStep2.jsx
│   │   ├── context/              # Global state management
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── services/             # API service layer
│   │   │   └── api.js
│   │   ├── assets/               # Static assets
│   │   ├── App.jsx               # Root component
│   │   ├── main.jsx              # Entry point
│   │   └── index.css             # Global styles
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/                       # Node.js backend API
│   ├── controllers/              # Request handlers
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── dashboardController.js
│   │   ├── cravingController.js
│   │   ├── chatController.js
│   │   └── progressController.js
│   ├── models/                   # MongoDB schemas
│   │   ├── User.js
│   │   ├── Craving.js
│   │   ├── Progress.js
│   │   └── ChatHistory.js
│   ├── routes/                   # API routes
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── cravingRoutes.js
│   │   └── chatRoutes.js
│   ├── middleware/               # Custom middleware
│   │   ├── auth.js
│   │   └── upload.js
│   ├── uploads/                  # User uploaded files
│   ├── .env.example              # Environment variables template
│   ├── server.js                 # Entry point
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB Atlas Account** - [Sign up](https://www.mongodb.com/cloud/atlas)
- **npm** or **yarn** package manager
- **Git** - [Download](https://git-scm.com/)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/kalashmishra21/PRAN-Smoking-Cessation-App.git
cd PRAN-Smoking-Cessation-App
```

#### 2. Setup Backend

```bash
cd backend
npm install
```

#### 3. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=your_mongodb_connection_string_here

# JWT Configuration
JWT_SECRET=your_secure_jwt_secret_key_here
JWT_EXPIRE=7d

# CORS Configuration (optional)
FRONTEND_URL=http://localhost:5173
```

**Important:** 
- Replace `your_mongodb_connection_string_here` with your actual MongoDB Atlas connection string
- Replace `your_secure_jwt_secret_key_here` with a strong random string
- Never commit the `.env` file to version control

#### 4. Setup Frontend

```bash
cd ../frontend
npm install
```

#### 5. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Server will start on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
App will open on `http://localhost:3000`

#### 6. Access the Application

Open your browser and navigate to:
- **Frontend:** `http://localhost:5173`
- **Backend API:** `http://localhost:5000/api`

---

## 🔐 Security Features

- ✅ **Password Hashing** - Bcrypt with 10 salt rounds
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Strong Password Policy** - Minimum 8 characters, uppercase, lowercase, number
- ✅ **Environment Variables** - Sensitive data protection via `.env`
- ✅ **CORS Configuration** - Cross-origin request security
- ✅ **Input Validation** - Server-side validation for all inputs
- ✅ **Protected Routes** - Middleware-based route protection
- ✅ **Email Immutability** - Email cannot be changed after signup
- ✅ **Secure File Upload** - Validated image uploads with size limits

---

## 📱 Pages & Routes

| Route | Page | Description | Auth Required |
|-------|------|-------------|---------------|
| `/` | Onboarding | Landing page with habit tracking form | ❌ |
| `/auth` | Authentication | Login & Signup with validation | ❌ |
| `/dashboard` | Dashboard | Main overview with real-time stats | ✅ |
| `/cravings` | Craving Log | Log and track cravings with filters | ✅ |
| `/breathbot` | BreathBot | AI chat assistant with smart responses | ✅ |
| `/insights` | Insights | Analytics, charts, and progress | ✅ |
| `/settings` | Settings | Profile, preferences, theme toggle | ✅ |

---

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String,                    // User's full name
  email: String (unique),          // Email address (cannot be changed)
  password_hash: String,           // Bcrypt hashed password
  quit_date: Date,                 // Target quit date
  cigarettes_per_day: Number,      // Daily cigarette consumption
  cost_per_pack: Number,           // Cost per piece (₹)
  profile_image: String,           // Profile picture URL
  theme: String,                   // 'light' or 'dark'
  createdAt: Date,                 // Account creation timestamp
  updatedAt: Date                  // Last update timestamp
}
```

### Craving Model
```javascript
{
  user_id: ObjectId,               // Reference to User
  intensity: Number (1-5),         // Craving strength
  trigger: String,                 // What triggered the craving
  notes: String,                   // Additional notes
  resisted: Boolean,               // Did user resist?
  timestamp: Date                  // When craving occurred
}
```

### Progress Model
```javascript
{
  user_id: ObjectId,               // Reference to User
  smoke_free_days: Number,         // Days since quit date
  cigarettes_avoided: Number,      // Total cigarettes not smoked
  money_saved: Number,             // Total money saved (₹)
  last_updated: Date               // Last calculation timestamp
}
```

### ChatHistory Model
```javascript
{
  user_id: ObjectId,               // Reference to User
  sender: String,                  // 'user' or 'bot'
  message: String,                 // Message content
  timestamp: Date                  // Message timestamp
}
```

---

## 🎨 Design System

### Color Palette
- **Primary:** `#2D5AEE` (Blue) - Main brand color
- **Secondary:** `#10B981` (Green) - Success states
- **Error:** `#EF4444` (Red) - Error states
- **Background (Light):** `#FFFFFF` - Light mode background
- **Background (Dark):** `#111827` - Dark mode background

### Typography
- **Font Family:** Manrope (Google Fonts)
- **Headings:** Bold, 24-48px
- **Body:** Regular, 14-16px
- **Labels:** Medium, 12-14px

### Design Principles
- **Material Design 3** - Modern design language
- **Mobile-First** - Responsive on all devices
- **Accessibility** - WCAG 2.1 Level AA compliant
- **Consistency** - Unified component library
- **Performance** - Optimized for speed

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/signup          - Create new account
POST   /api/auth/login           - Login to account
```

### User Management
```
GET    /api/user/profile         - Get user profile
PATCH  /api/user/update-profile  - Update profile
POST   /api/user/upload-profile-image - Upload profile picture
DELETE /api/user/delete-account  - Delete account
```

### Dashboard
```
GET    /api/dashboard            - Get all dashboard data
```

### Cravings
```
GET    /api/cravings             - Get all cravings (with filters)
POST   /api/cravings             - Log new craving
```

### Chat
```
POST   /api/chat                 - Send message to BreathBot
GET    /api/chat/history         - Get chat history
```

### Progress
```
GET    /api/progress             - Get progress statistics
```

---

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Run all tests
npm run test:all
```

---

## 📦 Build for Production

### Frontend Build
```bash
cd frontend
npm run build
```
Output will be in `frontend/dist/`

### Backend Production
```bash
cd backend
npm start
```

### Environment Variables for Production
Update `.env` with production values:
```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
FRONTEND_URL=your_production_frontend_url
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open** a Pull Request

### Contribution Guidelines
- Follow existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Kalash Mishra**
- GitHub: [@kalashmishra21](https://github.com/kalashmishra21)
- Repository: [PRAN-Smoking-Cessation-App](https://github.com/kalashmishra21/PRAN-Smoking-Cessation-App)

---

## 🙏 Acknowledgments

- Evidence-based quit strategies from clinical research
- Material Design 3 guidelines by Google
- MongoDB Atlas for reliable cloud database
- React community for amazing tools and libraries
- Tailwind CSS for utility-first styling
- All contributors and supporters

---

## 🔮 Future Enhancements

- [ ] **Mobile App** - React Native version for iOS and Android
- [ ] **Social Features** - Support groups and community forums
- [ ] **Gamification** - Points, levels, and rewards system
- [ ] **Health Device Integration** - Connect with fitness trackers
- [ ] **Multi-language Support** - Hindi, Spanish, French, etc.
- [ ] **Advanced AI** - GPT-powered personalized recommendations
- [ ] **Telemedicine** - Connect with healthcare professionals
- [ ] **Relapse Prevention** - Predictive analytics and alerts
- [ ] **Export Data** - Download progress reports as PDF
- [ ] **Offline Mode** - Progressive Web App (PWA) support

---

## 📞 Support

Need help? Here's how to get support:

- 🐛 **Bug Reports:** [Open an issue](https://github.com/kalashmishra21/PRAN-Smoking-Cessation-App/issues)
- 💡 **Feature Requests:** [Open an issue](https://github.com/kalashmishra21/PRAN-Smoking-Cessation-App/issues)
- 📧 **Email:** Contact via GitHub profile
- 📖 **Documentation:** Check this README and code comments

---

## ⚠️ Disclaimer

PRAN is a supportive tool for smoking cessation and should not replace professional medical advice. Always consult with healthcare professionals for personalized quit plans and medical guidance.

---

## 📊 Project Stats

- **Total Files:** 50+
- **Lines of Code:** 10,000+
- **Components:** 30+
- **API Endpoints:** 15+
- **Database Models:** 4
- **Features:** 25+

---

**Made with ❤️ for a smoke-free world**

*"Every cigarette you don't smoke is a victory. PRAN is here to celebrate each one with you."*
