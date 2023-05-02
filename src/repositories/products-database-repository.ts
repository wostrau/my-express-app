import {productsCollection, ProductType} from './db'


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
    async createProduct(newProduct: ProductType): Promise<ProductType> {
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