import express from "express";
import { ProductManager } from "./ProductManager.js";

const app = express();
const PORT = 8080;
const prodMngr = new ProductManager("products.json");
let productos = [];

app.get("/", (req, res) => {
  res.send("Hello world!");
});



app.get("/products", async (req, res) => {
  const { limit } = req.query;
  try {
    let response = await prodMngr.getProducts();
    if (limit) {
      let tempArray = response.filter((dat, index) => index < limit);

      res.json({ data: tempArray, limit: limit, quantity: tempArray.length });
    } else {
      res.json({ data: response, limit: false, quantity: response.length });
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/products/:prodid", async (req, res) => {
  const { prodid } = req.params;

  let product = await prodMngr.getProductById(parseInt(prodid));

  if (product) {
    res.json({ message: "Success.", data: product });
  } else {
    res.json({
      message: "ERROR: Product is not found.",
    });
  }
});



app.listen(PORT, () => {
  console.log("Server is running on port..." + PORT);
});