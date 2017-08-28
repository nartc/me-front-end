export interface Client {
    firstName?: string,
    lastName?: string,
    email: string,
    password: string,
    contact?: Contact,
    balance?: number,
    _id?: string,
    role?: string
}

export interface Contact{
    address: Address,
    phone: string
}

export interface Address{
    street?: string,
    street2?: string,
    city?: string,
    state?: string,
    zip?: string
}