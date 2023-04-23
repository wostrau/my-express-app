import express from 'express'
import {Request, Response} from 'express'

const app = express()
const port = 3000

app.get('/', (req: Request, res: Response) => {
    const greeting: string = 'Hello Incubator'
    res.send(greeting)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})