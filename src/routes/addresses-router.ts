import {Request, Response, Router} from 'express'


const addresses = [
    {id: 1, value: 'Nezaleznasci 12'},
    {id: 2, value: 'Selickaga 11'}
]


export const addressesRouter = Router({})


addressesRouter.get('/', (req: Request, res: Response) => {
    if (req.query.value) {
        const searchValue = addresses.filter(p => p.value.indexOf(req.query.value.toString()) > -1)
        res.send(searchValue)
    } else res.send(addresses)
})

addressesRouter.get('/id', (req: Request, res: Response) => {
    const address = addresses.find(a => a.id === Number(req.params.id))
    if (address) res.send(address)
    else res.send(404)
})