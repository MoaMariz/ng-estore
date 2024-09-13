export interface OrderItem {
    productId: number
    qty: number
    price: number
    amount: number
}

export interface Order {
    userName: string
    address: string
    country: string
    city: string
    total: number
    userEmail: string
    orderDetails: OrderItem[]
}