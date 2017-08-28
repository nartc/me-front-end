export interface Order{
    userId: string,
    orderNumber?: string,
    orderDate?: Date,
    orderBalance?: number,
    orderDetails?: Array<Product>,
    isDelivered?: boolean,
    isPaid?: boolean,
    _id?: string
}

export interface Product{
    productNumber?: string,
    productName?: string,
    productPrice?: number,
    productQuantity?: number,
    totalBalance?: number
}