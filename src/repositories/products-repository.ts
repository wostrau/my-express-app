const products = [
    {id: 1, title: 'tomato'},
    {id: 2, title: 'orange'}
]

export const productsRepository = {
    findProducts(title: string | null) {
        if (title) {
            return products.filter(p => p.title.indexOf(title) > -1)
        } else return products
    },
    findProductById(id: number) {
        const searchedProduct = products.find(p => p.id === id)
        return searchedProduct
    },
    createProduct(title: string) {
        const newProduct = {
            id: Number(new Date()),
            title: title
        }
        products.push(newProduct)
        return newProduct
    },
    updateProduct(id: number, title: string) {
        const updatedProduct = products.find(p => p.id === id)
        if (updatedProduct) {
            updatedProduct.title = title
            return true
        } else return false
    },
    deleteProduct(id: number) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                products.splice(i, 1)
                return true
            }
        }
        return false
    }
}