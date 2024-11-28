const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes'); // import authentication routes
const inventoryRoutes = require('./routes/inventoryRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const cors = require('cors'); // import cors middleware to handle cross-origin requests)
require('dotenv').config();

// Middleware for parsing JSON requests
app.use(express.json());
//Middleware to enable CORS for all routes
app.use(cors({origin: '*',}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

  // import the exported inventory route to integrate
  const inventoryRoutes = require('./routes/inventoryRoutes');
  // Use inventory routes
  app.use('/api/inventory', inventoryRoutes);
  
  // import the exported supplier route to integrate on server
  const supplierRoutes = require('./routes/supplierRoutes');
  // use the supplier route under '/api/suppliers'
  app.use('/api/suppliers', supplierRoutes);

  // Use the authentication routes under `/api/auth`
  app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Inventory management backend is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
