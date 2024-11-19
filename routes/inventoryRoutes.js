const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

// Add a new inventory item
router.post('/add', async (req, res) => {
    const { prodBrand, prodCategory, prodName, quantity, weight, gstPercentage, supplierName, costPrice } = req.body;
    try {
        const newInventory = new Inventory({
            prodBrand,
            prodCategory,
            prodName,
            quantity,
            weight,
            gstPercentage,
            supplierName,
            costPrice
        });

        const savedInventory = await newInventory.save();
        res.status(201).json(savedInventory);
    } catch (error) {
        res.status(500).json({ message: 'Error adding inventory item', error });
    }
});

// Get all inventory items
router.get('/', async (req, res) => {
    try {
        const inventory = await Inventory.find();
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching inventory', error });
    }
});

module.exports = router;
