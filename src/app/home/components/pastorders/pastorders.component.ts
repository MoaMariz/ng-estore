import {Component, inject, OnDestroy, OnInit} from '@angular/core'
import {PastOrder, PastOrderProduct} from '../../../shared/types/order.type'
import {CurrencyPipe} from '@angular/common'
import {OrderService} from '../../../shared/services/order.service'
import {UserService} from '../../../shared/services/userService.service'
import {Subscription} from 'rxjs'

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

  ngOnInit(): void {
    this.subscription.add(
      this.orderService
        .getOrders(this.userService.loggedInUser.email)
        .subscribe((pastOrders) => {
          this.pastOrders = pastOrders
        })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  selectOrder(event: any): void {
    if (Number.parseInt(event.target.value) > 0) {
      this.pastOrder = this.pastOrders.filter(
        order => order.orderId === Number.parseInt(event.target.value)
      )[0]
    } else {
      this.pastOrder = <any>undefined
    }
  }
}
