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

export interface PastOrder {
    orderId: number
    userName: string
    address: string
    country: string
    city: string
    total: number
    orderDate: string
}

export interface PastOrderProduct {
    amount: number
    price: number
    productId: number
    productImage: string
    productName: string
    qty: number
}