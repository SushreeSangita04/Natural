const express = require('express');
const path = require('path');
const app = express();
const hbs = require("hbs");
const collection = require("./db/conn");
// const { name } = require('ejs');
const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, '../mernbackend/public');
const template_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');
app.use(express.static(static_path));
app.use(express.json())
app.set("view engine", "hbs");
app.set("views", template_path);
app.use(express.urlencoded({ extended: false }))
// hbs.registerPartials(partials_path);
app.get("/", (req, res) => {
    res.render("login");
})
app.get("/signup", (req, res) => {
    res.render("signup");
})
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password,
    }
    await collection.insertMany([data])
    res.render("index");
})
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.name })
        if (check.password === req.body.password) {
            res.render("index");
        }
        else {
            res.send("Wrong password")
        }

    }
    catch {
        res.send("Wrong details!");
    }
})
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})