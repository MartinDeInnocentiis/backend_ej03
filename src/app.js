import express from "express";
import { ProductManager } from "./ProductManager.js";

const app = express(); //SE CREA UNA INSTANCIA DE EXPRESS
const PORT = 8080; //SE DEFINE EL NUMERO DE PUERTO EN EL CUAL SE EJECUTARÁ EL SERVIDOR
const prodMngr = new ProductManager("products.json"); //INSTACNIAMOS LA CLASS ProductManager

//SE CREA LA RUTA PRINCIPAL QUE DEVUELVE "HELLO WORLD" AL ACCEDER A ELLA
app.get("/", (req, res) => {
  res.send("Hello world!");
});


//CREAMOS UNA RUTA LLAMADA PRODUCTS QUE DEVUELVE UNA LISTA DE PRODUCTOS, QUE VIENE DESDE LA INSTANCIA prodMngr DE LA CLASS ProductManager
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

//CREAMOS RUTA DINAMICA QUE DEVUELVE UN PRODUCTO SEGÚN SU NUMERO DE ID
app.get("/products/:prodid", async (req, res) => {
  const { prodid } = req.params;

  let product = await prodMngr.getProductById(parseInt(prodid));

  if (product && product.id) {
    res.json({ message: "Success.", data: product });
  } else {
    res.json({
      message: "ERROR: Product is not found.",
    });
  }
});


//INICIAMOS EL SERVIDOR EN EL PUERTO ESPECIFICADO
app.listen(PORT, () => {
  console.log("Server is running on port..." + PORT);
});