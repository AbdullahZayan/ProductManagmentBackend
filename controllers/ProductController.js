const Product = require('../models/ProductModel');
const { encrypt, decrypt } = require('../utils/encrypt');


exports.createProduct = async (req, res) => {
  const { productCode, productName, description, price } = req.body;

  try {
    const encryptedPrice = encrypt(price);

    const product = await Product.create({
      productCode,
      productName,
      description,
      price: encryptedPrice,
      lastEditedAt: new Date(),
      lastEditedBy: req.user._id, // requires valid token
      lastEditedField: "All Fields"  // <-- FIXED: use string directly
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("Create product failed:", err); // helpful log
    res.status(500).json({ message: 'Failed to create product' });
  }
};


exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('lastEditedBy', 'username');

    const decrypted = products.map(p => ({
      ...p.toObject(),
      price: decrypt(p.price)
    }));

    res.json(decrypted);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const { productName, description, price, productCode } = req.body;

    const encryptedPrice = encrypt(price); 

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        productCode,
        productName,
        description,
        price: encryptedPrice,
        lastEditedBy: req.user._id,
        lastEditedField: req.body.lastEditedField || "All Fields",
        lastEditedAt: new Date()
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
};




