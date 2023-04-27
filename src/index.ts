import express, {NextFunction, Response, Request} from 'express'
import bodyParser from 'body-parser'
import {productsRouter} from './routes/products-router'
import {addressesRouter} from './routes/addresses-router'

const app = express()
const port = 3000

export let requestCounter = 0
const requestCounterMiddleware = (req: Request, res: Response, next: NextFunction) => {
    requestCounter++
    next()
}


const parserMiddleware = bodyParser({})
app.use(parserMiddleware)
app.use(requestCounterMiddleware)

app.use('/products', productsRouter)
app.use('/addresses', addressesRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})