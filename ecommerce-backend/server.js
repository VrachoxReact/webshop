const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
});

const Product = mongoose.model("Product", productSchema);

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new product
app.post("/api/products", async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Seed some initial products
app.post("/api/seed", async (req, res) => {
  const sampleProducts = [
    {
      name: "Product 1",
      price: 19.99,
      description: "Description for Product 1",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Product 2",
      price: 29.99,
      description: "Description for Product 2",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Product 3",
      price: 39.99,
      description: "Description for Product 3",
      image: "https://via.placeholder.com/150",
    },
  ];

  try {
    await Product.deleteMany({});
    const seededProducts = await Product.insertMany(sampleProducts);
    res.status(201).json(seededProducts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
