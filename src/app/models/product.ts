export interface Product{
    productNumber?: string,
    productDetails?: Detail,
    productSellPrice?: number,
    productBuyPrice?: number,
    inStock?: number,
    _id?: string
}

export interface Detail{
    name?: string,
    description?: string,
    unit?: string,
    image?: any
}