import { Product } from './product';

export interface CartEntry {
    product: Product,
    quantity: number;
    cartTotal?:number,
    backOrder?: boolean
}