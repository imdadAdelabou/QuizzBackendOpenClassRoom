const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
let Product = require("./models/product");


mongoose.connect('mongodb+srv://adelabouimdad:adelabouimdad_96@backendopenclassroom.xsxwg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true,}).then(() => console.log('connection réussi')).catch(()=> console.log('connection échoué'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

app.post("/api/products", (req, res, next) => {
    delete req.body._id;
    console.log(req.body);
    let product = new Product({
        ...req.body,
    });
    product.save().then((product) => res.status(201).json({ product })).catch((err) => {
        res.status(400).json({ err })
    });
});

app.get("/api/products", (req, res, next) => {
    Product.find().then((products) => {
        res.status(201).json({ products: products })
    }).catch((err) => res.send(400).json({ err }));
});

app.get("/api/products/:id", (req, res, next) => {
    let id = req.params.id
    Product.findOne({ _id: id }).then((product) => res.status(201).json({ product })).catch((err) => res.status(404).json({err}));
});

app.put("/api/products/:id", (req, res, next) => {
    let id = req.params.id;
    Product.updateOne({ _id: id }, {
        ...req.body, _id: id,
    }).then(() => res.status(201).json({message: 'Modified!'})).catch((err) => res.status(404).json({err}));
});

app.delete("/api/products/:id", (req, res, next) => {
    let id = req.params.id;
    Product.deleteOne({_id: id}).then(()=> res.status(201).json({message: 'Deleted!'})).catch((err) => res.status(404).json({err}));
});
module.exports = app;