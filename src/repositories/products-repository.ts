const products = [
    {id: 1, title: 'tomato'},
    {id: 2, title: 'orange'}
]

export const productsRepository = {
    findProducts(searchTerm: string | null) {
        if (searchTerm) {
            return products.filter(p => p.title.indexOf(searchTerm) > -1)
        } else return products
    }
}