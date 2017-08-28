export interface Admin{
    _id?: string,
    name?: string,
    email: string,
    password: string,
    contact?: Contact,
    role?: string
}

export interface Contact {
    address?: Address,
    phone?: string
}

export interface Address{
    street?: string,
    city?: string,
    state?: string,
    zip?: string
}