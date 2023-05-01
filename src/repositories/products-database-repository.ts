import {productsCollection} from './db'


export type ProductType = { id: number, title: string }


export const productsDatabaseRepository = {
    async findProducts(title: string | null): Promise<ProductType[]> {
        const filter: any = {}
        if (title) filter.title = {$regex: title}
        return await productsCollection.find(filter).toArray()
    },
    async findProductById(id: number): Promise<ProductType | null> {
        const foundProduct = await productsCollection.findOne({id})
        if (foundProduct) {
            return foundProduct
        } else return null
    },
    async createProduct(title: string): Promise<ProductType> {
        const newProduct: ProductType = {id: Number(new Date()), title}
        await productsCollection.insertOne(newProduct)
        return newProduct
    },
    async updateProduct(id: number, title: string): Promise<boolean> {
        const result = await productsCollection
            .updateOne({id}, {$set: {title: title}})
        return result.matchedCount === 1
    },
    async deleteProduct(id: number): Promise<boolean> {
        const result = await productsCollection.deleteOne({id})
        return result.deletedCount === 1
    }
}