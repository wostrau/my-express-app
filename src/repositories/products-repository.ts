export type ProductType = { id: number, title: string }

const products = [
    {id: 1, title: 'tomato'},
    {id: 2, title: 'orange'}
]

export const productsRepository = {
    async findProducts(title: string | null): Promise<ProductType[]> {
        if (title) {
            return products.filter(p => p.title.indexOf(title) > -1)
        } else return products
    },
    findProductById(id: number): ProductType | null {
        const foundProduct = products.find(p => p.id === id)
        if (foundProduct) {
            return foundProduct
        } else return null
    },
    async createProduct(title: string): Promise<ProductType> {
        const newProduct: ProductType = {
            id: Number(new Date()),
            title: title
        }
        products.push(newProduct)
        return newProduct
    },
    async updateProduct(id: number, title: string): Promise<boolean> {
        const updatedProduct = products.find(p => p.id === id)
        if (updatedProduct) {
            updatedProduct.title = title
            return true
        } else return false
    },
    async deleteProduct(id: number): Promise<boolean> {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                products.splice(i, 1)
                return true
            }
        }
        return false
    }
}