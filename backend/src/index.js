require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./db'); // initialize DB

const employeeRoutes = require('./routes/employeeRoutes');
const taskRoutes = require('./routes/taskRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/employees', employeeRoutes);
app.use('/tasks', taskRoutes);
app.use('/dashboard', dashboardRoutes);

app.get('/', (req, res) => res.json({ message: 'Backend API is running 🚀' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
