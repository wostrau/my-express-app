import {MongoClient} from 'mongodb'

const mongoUri = process.env.mongoURI || 'mongodb://0.0.0.0:27017/?maxPoolSize=20&w=majority'

export const client = new MongoClient(mongoUri)

export async function runDb() {
    try {
        await client.connect()
        await client.db('products').command({ping: 1})
        console.log('connected successfully to mongo server')
    } catch {
        console.log('cannot connect to mongo database')
        await client.close()
    }
}

export type ProductType = { id: number, title: string }
export const productsCollection = client
    .db('store')
    .collection<ProductType>('products')

