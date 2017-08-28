export interface VendorOrder{
    vendorOrderNumber?: string,
    vendorOrderDate?: Date,
    vendorOrderBalance?: number,
    isReceived?: boolean,
    isPaid?: boolean,
    _id?: string
}

export interface Product{
    productNumber?: string,
    productName?: string,
    productQuantity?: number,
    productPrice?: number,
    totalbalance?: number
}