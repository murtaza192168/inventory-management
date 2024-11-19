// import required modules
const express = require('express');
const router = express.Router(); // Initialize the Express Router
// Import the Supplier Model here
const Supplier = require('../models/Supplier');

// Route to add a new supplier using POST request
router.post('/add', async(req, res) => {
    // Extract the data from the request body
    const { supplierName, contactNumber, email, address } = req.body;

    try{
        // Create supplier new Object
        const newSupplier = new Supplier({
            supplierName,
            contactNumber,
            email,
            address,
        })
        // save the supplier in Database
        // await: wait till the details of the supplier is added 
        const savedSupplier = await newSupplier.save();
        // Send a saved supplier a a response
        res.status(201).json(savedSupplier);
    }catch(error){
        res.status(500).json({message: "Error adding the supplier", error})
    }
});

// Route to get All suupliers using GET request
router.get('/', async (req, res) => {
    try{
    // Retrieve all supplier records from the database
    const suppliers = await Supplier.find();
    res.json(suppliers);
    }catch(error){
        // Handle any errors during the process
        res.status(500).json({message: "Error fetching suppliers", error})
    }
   
})

// Route to update the balance made to the supplier each time
router.put('/update-balance/:id', async(req, res) =>{
    // Extract supplier ID and balance update from the request
    const {id} = req.params;
    const {balance} = req.body;

    try{
        // Find the supplier by ID and update the balance
        const updatedSupplier = await Supplier.findByIdAndUpdate(
            id,
            {balance},
            {new: true} // Return the updated document
        )
        // Send updated supplier as a Response
        res.json(updatedSupplier);
    }catch(error){
        // Handle any errors during the process
        res.status(500).json({message: "Error updating the supplier balance", error});
    }
})
module.exports = router; // Export the router to use in server.js