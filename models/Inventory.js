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
    quantity: {
        type: Number,
        required: true,
    },
    weight: {
        type: String,
        required: true, // e.g., '500ml' or '1kg'
    },
    gstPercentage: {
        type: Number,
        required: true,
    },
    supplierName: {
        type: String,
        required: true,
    },
    purchaseDate: {
        type: Date,
        default: Date.now,
    },
    costPrice: {
        type: Number,
        required: true,
    },
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
