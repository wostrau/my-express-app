import {Request, Response, Router} from 'express'
import {productsDatabaseRepository, ProductType} from '../repositories/products-database-repository'
import {body} from 'express-validator'
import {inputValidationMiddleware} from '../middlewares/input-validation-middleware'

export const productsRouter = Router({})

const titleValidation = body('title')
    .trim()
    .isLength({min: 3, max: 15})
    .withMessage('title length should be from 3 to 10 symbols')


productsRouter.get('/', async (req: Request, res: Response) => {
    const title = typeof req.query.title === 'string'
        ? req.query.title?.toString()
        : null

    const foundProducts: ProductType[] = await productsDatabaseRepository.findProducts(title)

    let start = performance.now()
    while (performance.now() - start < 3000) {
        console.log(performance.now() - start)
    }


    if (foundProducts) res.send(foundProducts)
    else res.send(404)
})

productsRouter.get('/:id', async (req: Request, res: Response) => {
    const product: ProductType | null = await productsDatabaseRepository.findProductById(Number(req.params.id))

    if (product) res.send(product)
    else res.send(404)
})

productsRouter.delete('/:id', async (req: Request, res: Response) => {
    const isDeleted: boolean = await productsDatabaseRepository.deleteProduct(Number(req.params.id))

    if (isDeleted) res.send(204)
    else res.send(404)
})

productsRouter.post('/',
    titleValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const newProduct: ProductType = await productsDatabaseRepository.createProduct(req.body.title)

        res.status(201).send(newProduct)
    })

productsRouter.put('/:id',
    titleValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const isUpdated: boolean = await productsDatabaseRepository.updateProduct(Number(req.params.id), req.body.title)

        if (isUpdated) {
            const product = productsDatabaseRepository.findProductById(Number(req.params.id))
            res.send(product)
        } else res.send(404)
    })