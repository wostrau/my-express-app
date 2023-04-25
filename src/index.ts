import express from 'express'
import {Request, Response} from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = 3000

const products = [
    {id: 1, title: 'tomato'},
    {id: 2, title: 'orange'}
]
const addresses = [
    {id: 1, value: 'Nezaleznasci 12'},
    {id: 2, value: 'Selickaga 11'}
]

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.get('/', (req: Request, res: Response) => {
    const greeting: string = 'Hello Incubator'
    res.send(greeting)
})
app.get('/products', (req: Request, res: Response) => {
    if (req.query.title) {
        const searchTitle = products.filter(p => p.title.indexOf(req.query.title.toString()) > -1)
        res.send(searchTitle)
    } else res.send(products)
})
app.get('/products/:id', (req: Request, res: Response) => {
    const product = products.find(p => p.id === Number(req.params.id))
    if (product) res.send(product)
    else res.send(404)
})
app.get('/addresses/id', (req: Request, res: Response) => {
    const address = addresses.find(a => a.id === Number(req.params.id))
    if (address) res.send(address)
    else res.send(404)
})

app.delete('/products/:id', (req: Request, res: Response) => {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === Number(req.params.id)) {
            products.splice(i, 1)
            res.send(204)
            return
        }
    }
    res.send(404)
})
app.post('/products', (req: Request, res: Response) => {
    const newProduct = {id: Number(new Date()), title: req.body.title}
    products.push(newProduct)
    res.status(201).send(newProduct)
})
app.put('/products/:id', (req: Request, res: Response) => {
    const updatedProduct = products.find(p => p.id === Number(req.params.id))
    if (updatedProduct) {
        updatedProduct.title = req.body.title
        res.status(201).send(updatedProduct)
    } else res.send(404)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})