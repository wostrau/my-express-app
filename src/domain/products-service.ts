import {productsDatabaseRepository} from '../repositories/products-database-repository'
import {productsCollection, ProductType} from '../repositories/db'


export const productsService = {
    async findProducts(title: string | null): Promise<ProductType[]> {
        return await productsDatabaseRepository.findProducts(title)
    },
    async findProductById(id: number): Promise<ProductType | null> {
        return await productsDatabaseRepository.findProductById(id)
    },
    async createProduct(title: string): Promise<ProductType> {
        const newProduct: ProductType = {id: Number(new Date()), title}
        const createdProduct = await productsDatabaseRepository.createProduct(newProduct)
        return createdProduct
    },
    async updateProduct(id: number, title: string): Promise<boolean> {
        return await productsDatabaseRepository.updateProduct(id, title)
    },
    async deleteProduct(id: number): Promise<boolean> {
        const result = await productsCollection.deleteOne({id})
        return result.deletedCount === 1
    }
}
