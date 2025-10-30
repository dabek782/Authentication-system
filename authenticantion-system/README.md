# Authentication System

Full-stack authentication with user registration and login using JWT tokens.

## What it does

- User registration and login
- JWT token authentication
- Password hashing with bcrypt
- MongoDB database

## Packages Used

**Backend:**
- Express - Web framework
- Mongoose - MongoDB ODM
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- dotenv - Environment variables
- cors - Cross-origin requests

**Frontend:**
- React - UI library
- Vite - Build tool

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` in `src/back/`:
```env
VITE_MongoDB_URI=your_mongodb_connection_string
VITE_Port=3000
VITE_JWT_TOKEN=your_secret_key
```

3. Start backend:
```bash
node src/back/index.js
```

4. Start frontend:
```bash
npm run dev
```

## API Endpoints

**POST** `/api/v1/auth/register` - Register new user  
**POST** `/api/v1/auth/login` - Login user

## 🤝 Contributing

Feel free to submit issues and pull requests.

## 📄 License

MIT License - Open source
