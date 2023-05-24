const express = require("express");
const router = new express.Router();
const Auth = require("../auth");
const db = require("../db");

roles =["Admin", "User"]

router.post("/add",Auth.authHelper(roles[0]), (req, res) => {
    const { product_name, price, qty } = req.body;
    const product = db.query("INSERT INTO products_table (product_name, price, qty) VALUES ($1, $2, $3)",[product_name, price, qty]);
    res.send("Product added")
})

router.get("/get", async (req, res) => {
    const product = await db.query("SELECT * FROM products_table");
    res.send(product.rows)
})
router.get("/get/:product_name", async (req, res) => {
    const product = await db.query("SELECT * FROM products_table WHERE product_name = $1", [req.params.product_name]);
    res.send(product.rows)
})

router.put("/update/:product_name", async (req, res) => {
    const { price, qty } = req.body;
    const product_name = req.params.product_name;
    const update_data = await db.query("UPDATE products_table SET price = $1, qty = $2 WHERE product_name = $3", [price, qty, product_name]);
    res.send("Product updated");
})

router.delete("/delete/:product_name", async (req, res) => {
    const product_name = req.params.product_name;
    const delete_data = await db.query("DELETE FROM products_table WHERE product_name = $1 ", [product_name]);
    res.send("Deleted");
})

module.exports = router;