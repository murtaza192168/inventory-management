// import mongoose for defining schemas
const mongoose = require('mongoose');

// Define the schema for supplier information
const supplierSchema = new mongoose.Schema(
    {
        supplierName: {
            type: String,
            required: true,
        },
        contactNumber: {
            type: String, // Supplier's phone number
            required: false, // This field is optional
          },
          email: {
            type: String, // Supplier's email address
            required: false, // This field is optional
          },
          address: {
            type: String, // Supplier's physical address
            required: false, // This field is optional
          },
          balance: {
            type: Number, // Balance amount owed to the supplier
            default: 0, // Default value is zero
          },
    }
)

// Create a Model based on the structure
const Supplier = mongoose.model('Supplier', supplierSchema);
// Export the model to use in other files
module.exports = Supplier; 