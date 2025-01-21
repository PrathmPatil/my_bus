const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: path.join(__dirname, '.env') });

// Connect to database
connectDB();

const app = express();

const iscalled = (req, res, next) => {
  console.log('hello');
  console.log(req.body);
  next();
}
// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Routes
app.use('/api/users',iscalled, require('./routes/userRoutes'));
app.use('/api/buses', require('./routes/busRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});
