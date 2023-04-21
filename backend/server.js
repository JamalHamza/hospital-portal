require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const colors = require('colors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
const app = express();
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorMiddleware');
const adminRoutes = require('./routes/adminRoutes');

// ! Middleware -----------
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://auth-app.app'],
    credentials: true,
  })
);

// ! Routes  ------------
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Home Page');
});

// ----------
connectDB();
// ----------

// ! Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(colors.bgBlue.bold(`Server is running on ${PORT}...`));
});
