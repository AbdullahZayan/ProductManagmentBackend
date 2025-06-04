const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productCode: { type: String, required: true },
  productName: { type: String, required: true },
  description: { type: String },
  price: { type: String, required: true }, //  Focus abdullah this will be Encrypted string 
  lastEditedAt: { type: Date },
  lastEditedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lastEditedField: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
