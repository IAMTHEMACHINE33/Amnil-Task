const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')

require("dotenv").config();

app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const userRoute = require("./routes/user");
app.use("/users", userRoute);

const productRoute = require("./routes/product");
app.use("/products",productRoute);

app.listen(9000,() => {
    console.log("Server running on 9000")
})