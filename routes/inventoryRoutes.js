const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory'); // import the inventory model
const Supplier = require('../models/Supplier'); // import the supplier model

// Route to Add a new inventory item
router.post('/add', async (req, res) => {
    const { prodBrand, prodCategory, prodName,  weight, quantity, rate, gstPercentage, supplier } = req.body;
    try {
        // Ensure the Supplier exists
        const existingSupplier = await Supplier.findById(supplier);
        if(!existingSupplier){
            res.status(404).json({message: 'Supplier not found'});
        }
            // if no such supplier found, the process will continue to create a new supplier further
        const newInventory = new Inventory({
            prodBrand,
            prodCategory,
            prodName,
            weight,
            quantity,
            rate,
            gstPercentage,
            supplier,
            
        });
        // Save the inventory in the database
        const savedInventory = await newInventory.save();
        res.status(201).json(savedInventory);
    } catch (error) {
        res.status(500).json({ message: 'Error adding inventory item', error });
    }
});

// Get all inventory items
router.get('/', async (req, res) => {
    try {
        // Populate the supplier field with supplier details
        const inventory = await Inventory.find().populate('supplier', 'supplierName contactNumber',);
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching inventory', error });
    }
});

module.exports = router;
