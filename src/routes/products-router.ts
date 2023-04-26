import {Request, Response, Router} from 'express'
import {productsRepository} from '../repositories/products-repository'

export const productsRouter = Router({})

productsRouter.get('/', (req: Request, res: Response) => {
    const title = typeof req.query.title === 'string'
        ? req.query.title
        : null

    const foundProducts = productsRepository.findProducts(title)

    if (foundProducts) res.send(foundProducts)
    else res.send(404)
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