"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3000;
const products = [
    { id: 1, title: 'tomato' },
    { id: 2, title: 'orange' }
];
const addresses = [
    { id: 1, value: 'Nezaleznasci 12' },
    { id: 2, value: 'Selickaga 11' }
];
const parserMiddleware = (0, body_parser_1.default)({});
app.use(parserMiddleware);
app.get('/', (req, res) => {
    const greeting = 'Hello Incubator';
    res.send(greeting);
});
app.get('/products', (req, res) => {
    if (req.query.title) {
        const searchTitle = products.filter(p => p.title.indexOf(req.query.title.toString()) > -1);
        res.send(searchTitle);
    }
    else
        res.send(products);
});
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === Number(req.params.id));
    if (product)
        res.send(product);
    else
        res.send(404);
});
app.get('/addresses/id', (req, res) => {
    const address = addresses.find(a => a.id === Number(req.params.id));
    if (address)
        res.send(address);
    else
        res.send(404);
});
app.delete('/products/:id', (req, res) => {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === Number(req.params.id)) {
            products.splice(i, 1);
            res.send(204);
            return;
        }
    }
    res.send(404);
});
app.post('/products', (req, res) => {
    const newProduct = { id: Number(new Date()), title: req.body.title };
    products.push(newProduct);
    res.status(201).send(newProduct);
});
app.put('/products/:id', (req, res) => {
    const updatedProduct = products.find(p => p.id === Number(req.params.id));
    if (updatedProduct) {
        updatedProduct.title = req.body.title;
        res.status(201).send(updatedProduct);
    }
    else
        res.send(404);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
