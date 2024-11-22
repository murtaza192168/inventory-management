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
           return res.status(404).json({message: 'Supplier not found'});
        }
         const totalAmount = quantity * rate * (1 + gstPercentage / 100) // calculate total cost including GST
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

        // Update supplier balance and transaction history
        existingSupplier.balance += totalAmount;
        existingSupplier.transactions.push({
            type: 'purchase',
            amount: totalAmount,
            reference: savedInventory._id,
            note: `Purchase of ${quantity}, ${weight}, ${prodName}`
        })

        await existingSupplier.save();

        res.status(201).json(savedInventory);
    } catch (error) {
        res.status(500).json({ message: 'Error adding inventory item', error });
    }
});

///////////////////////////////////////////////////////////////
// Create Payment route to deduct payments and track details:
    router.post('/payment', async(req,res) => {
        const { supplierId, amount, mode, note } = req.body;

        try{
            const supplier = await Supplier.findById(supplierId);
            if(!supplier){
                return res.status(404).json({messsage: 'Supplier not found'})
            }

            // Deduct the payment from the supplier's amount
            supplier.balance -= amount;

            // Add a payment transaction to the history
            supplier.transactions.push({
                type: 'payment',
                amount: -amount,
                note: note || `Payment of Rs.${amount}`,
                date: new Date(),
            })
            await supplier.save();
            res.status(200).json({message: 'Payment recorded successfully', supplier})
            
        }catch(error){
            res.status(500).json({message: 'Error recording payment', error})
        }
    })
    // /////////////////////////////////////////////////////////////////

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
