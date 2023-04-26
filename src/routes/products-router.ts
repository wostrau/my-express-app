import {Request, Response, Router} from 'express'


const products = [
    {id: 1, title: 'tomato'},
    {id: 2, title: 'orange'}
]


export const productsRouter = Router({})


productsRouter.get('/', (req: Request, res: Response) => {
    if (req.query.title) {
        const searchTitle = products.filter(p => p.title.indexOf(req.query.title.toString()) > -1)
        res.send(searchTitle)
    } else res.send(products)
})

productsRouter.get('/:id', (req: Request, res: Response) => {
    const product = products.find(p => p.id === Number(req.params.id))
    if (product) res.send(product)
    else res.send(404)
})

productsRouter.delete('/:id', (req: Request, res: Response) => {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === Number(req.params.id)) {
            products.splice(i, 1)
            res.send(204)
            return
        }
    }
    res.send(404)
})

productsRouter.post('/', (req: Request, res: Response) => {
    const newProduct = {id: Number(new Date()), title: req.body.title}
    products.push(newProduct)
    res.status(201).send(newProduct)
})

productsRouter.put('/:id', (req: Request, res: Response) => {
    const updatedProduct = products.find(p => p.id === Number(req.params.id))
    if (updatedProduct) {
        updatedProduct.title = req.body.title
        res.status(201).send(updatedProduct)
    } else res.send(404)
})