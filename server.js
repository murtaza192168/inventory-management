const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

// Middleware
app.use(express.json());

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

// Test route
app.get('/', (req, res) => {
  res.send('Inventory management backend is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
