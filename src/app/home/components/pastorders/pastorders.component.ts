import {Component, inject, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core'
import {PastOrder, PastOrderProduct} from '../../../shared/types/order.type'
import {CurrencyPipe} from '@angular/common'
import {OrderService} from '../../../shared/services/order.service'
import {UserService} from '../../../shared/services/userService.service'
import {Subscription, lastValueFrom} from 'rxjs'

@Component({
  selector: 'app-pastorders',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './pastorders.component.html',
  styleUrl: './pastorders.component.scss',
})
export class PastordersComponent implements OnInit, OnDestroy {
  private userService = inject(UserService)
  private orderService = inject(OrderService)
  subscription: Subscription = new Subscription()

  pastOrderProducts: PastOrderProduct[] = []
  pastOrder: PastOrder
  pastOrders: PastOrder[] = []

  async ngOnInit(): Promise<void> {
    try {
      const pastOrders = await lastValueFrom(this.orderService.getOrders(this.userService.loggedInUser.email));
      this.pastOrders = pastOrders;
    } catch (error) {
      console.error('Error fetching past orders:', error);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  selectOrder(event: any): void {
    const orderId = Number.parseInt(event.target.value);
    if (orderId > 0) {
      const selectedOrder = this.pastOrders.find(order => order.orderId === orderId);
  
      if (selectedOrder) {
        this.pastOrder = selectedOrder;
  
        this.orderService.getOrderProduct(orderId.toString())
          .subscribe({
            next: products => this.pastOrderProducts = products,
            error: error => console.error('Error fetching order products:', error)
          });
      } else {
        this.pastOrder = <any>undefined;
        this.pastOrderProducts = [];
      }
    } else {
      this.pastOrder = <any>undefined;
      this.pastOrderProducts = [];
    }
  }
}
