import {inject, Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable, PartialObserver} from 'rxjs'
import {CartService} from './cart.service'
import {OrderItem, Order} from '../types/order.type'
import {DeliveryAddress} from '../types/cart.type'
import {UserService} from './userService.service'
import { PastOrder, PastOrderProduct } from '../types/order.type'

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  private httpClient = inject(HttpClient)
  private cartService = inject(CartService)
  private userService = inject(UserService)


  saveOrder(deliveryAddress: DeliveryAddress, userEmail: string): Observable<any> {
    const url: string = 'http://localhost:5001/orders/add'
    const orderDetails: OrderItem[] = []
    this.cartService.cart.products.forEach(product => {
      const orderItem: OrderItem = {
        productId: product.product.id,
        price: product.product.price,
        qty: product.quantity,
        amount: product.amount,
      }
      orderDetails.push(orderItem)
    }); 

    const order: Order = {
      userName: deliveryAddress.userName,
      address: deliveryAddress.address,
      country: deliveryAddress.country,
      city: deliveryAddress.city,
      total: this.cartService.cart.totalAmount,
      userEmail: userEmail,
      orderDetails: orderDetails
    }
    return this.httpClient.post(url, order, {
      headers: {authorization: this.userService.token}
    })
  }

  getOrders(userEmail: string): Observable<PastOrder[]> {
    const url: string = `http://localhost:5001/orders/allorders?userEmail=${userEmail}`

    return this.httpClient.get<PastOrder[]>(url, {headers: {authorization: this.userService.token}})
  }

  getOrderProduct(orderId: string): Observable<PastOrderProduct[]> {
    const url: string = `http://localhost:5001/orders/orderproducts?orderId=${orderId}`

    return this.httpClient.get<PastOrderProduct[]>(url, {headers: {authorization: this.userService.token}})
  }
  
  
}
