import {Request, Response, Router} from 'express'
import {productsRepository} from '../repositories/products-repository'
import {requestCounter} from '../index'

export const productsRouter = Router({})

productsRouter.get('/', (req: Request, res: Response) => {
    const title = typeof req.query.title === 'string'
        ? req.query.title?.toString()
        : null

    const foundProducts = productsRepository.findProducts(title)

    if (foundProducts) res.send(foundProducts + requestCounter)
    else res.send(404)
})

productsRouter.get('/:id', (req: Request, res: Response) => {
    const product = productsRepository.findProductById(Number(req.params.id))
    if (product) res.send(product)
    else res.send(404)
})

productsRouter.delete('/:id', (req: Request, res: Response) => {
    const isDeleted = productsRepository.deleteProduct(Number(req.params.id))
    if (isDeleted) res.send(204)
    else res.send(404)
})

productsRouter.post('/', (req: Request, res: Response) => {
    const newProduct = productsRepository.createProduct(req.body.title)
    res.status(201).send(newProduct)
})

productsRouter.put('/:id', (req: Request, res: Response) => {
    const isUpdated = productsRepository.updateProduct(Number(req.params.id), req.body.title)
    if (isUpdated) {
        const product = productsRepository.findProductById(Number(req.params.id))
        res.send(product)
    } else res.send(404)
})