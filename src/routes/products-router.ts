import {Request, Response, Router} from 'express'
import {productsRepository} from '../repositories/products-repository'
import {requestCounter} from '../index'
import {body, validationResult} from 'express-validator'

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

productsRouter.post('/',
    body('title')
        .isLength({min: 3, max: 15})
        .withMessage('title length should be from 3 to 10 symbols'),
    (req: Request, res: Response) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({
                errors: errors.array()
            })
        }

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