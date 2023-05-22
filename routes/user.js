const express = require("express");
require('dotenv').config()
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");
const auth = require("../auth");

router.post("/register", async (req, res) => {
    const { firstname, lastname, username, password, role} = req.body;
    const users = await db.query('SELECT * FROM users_table WHERE username = $1', [username]);
    // console.log("Users", users);
    if (users.rows.length)
    {
        return res.status(400).send("User already exists");
    }
    
    const newUser = await db.query(`INSERT INTO users_table (firstname, lastname, username, password, role) VALUES ($1, $2, $3, $4, $5)`, [firstname, lastname, username, password, role]);
    // console.log(newUser);
    res.send("User create");
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const userResult = await db.query('SELECT * FROM users_table WHERE username = $1', [username]);
    const user = userResult.rows[0];

    if (user.username == username && user.password == password)
    {
        const token = jwt.sign({username}, process.env.JWT_SECRET);
        // res.cookie("authToken", token, {maxAge : 10000, signed : true});
        return res.status(200).json({success: true, token, message: 'User authenticated successfully.'})
    }
    return res.status(401).send("Invalid username or password");
})

module.exports = router;