const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    prodBrand: {
        type: String,
        required: true, 
    },
    prodCategory: {
        type: String,
        required: true,
    },
    prodName: {
        type: String,
        required: true,
    },
    weight: {
        type: String,
        required: true, // e.g., '500ml' or '1kg'
    },
    quantity: {
        type: Number,
        required: true,
    },
    rate: {
        type: Number, // rate pere unit
        required: true, 
    },
    
    gstPercentage: {
        type: Number,
        required: true,
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId, // reference  to the supplier model
        ref: 'Supplier',
        required: true,
    },
    purchaseDate: {
        type: Date,
        default: Date.now, // By default set the current date, if purchased is done on the date while filling these details
    },
    createdDate: {
        type: Date,
        default: Date.now, // Automatically set the created date
    },
   
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
