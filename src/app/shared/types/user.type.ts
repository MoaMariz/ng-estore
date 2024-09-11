export interface User {
    email: string
    firstName: string
    lastName: string
    address: string | null | undefined
    country: string | null | undefined
    state: string | null | undefined
    city: string | null | undefined
    pin: string | null | undefined
    password: string
}

export interface Login {
    email: string
    password: string
}

export interface LoginToken {
    token: string
    expirationTime: number
}