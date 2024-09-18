import {TestBed, ComponentFixture} from '@angular/core/testing'
import {PastordersComponent} from './pastorders.component'
import {OrderService} from '../../../shared/services/order.service'
import {UserService} from '../../../shared/services/userService.service'
import {of} from 'rxjs'
import {PastOrder} from '../../../shared/types/order.type'
import {CurrencyPipe} from '@angular/common'

describe('PastordersComponent', () => {
  let component: PastordersComponent
  let fixture: ComponentFixture<PastordersComponent>
  let orderService: jasmine.SpyObj<OrderService> // Agora a tipagem é como espião
  let userService: UserService

  beforeEach(async () => {
    const orderServiceSpy = jasmine.createSpyObj('OrderService', ['getOrders']) // Corrigido para incluir getOrders como espião
    const userServiceSpy = jasmine.createSpyObj('UserService', [], {
      loggedInUser: {email: 'test@example.com'},
    })

    await TestBed.configureTestingModule({
      imports: [CurrencyPipe, PastordersComponent],
      declarations: [],
      providers: [
        {provide: OrderService, useValue: orderServiceSpy},
        {provide: UserService, useValue: userServiceSpy},
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(PastordersComponent)
    component = fixture.componentInstance
    orderService = TestBed.inject(OrderService) as jasmine.SpyObj<OrderService> // Agora é espião
    userService = TestBed.inject(UserService)
  })

  // 1. Teste para verificar se os pedidos são carregados corretamente na inicialização
  it('should fetch past orders on initialization', () => {
    const mockOrders: PastOrder[] = [
      {
        orderId: 1,
        userName: 'User 1',
        address: 'Address 1',
        country: 'Country 1',
        city: 'City 1',
        total: 100,
        orderDate: '2024-09-01',
      },
      {
        orderId: 2,
        userName: 'User 2',
        address: 'Address 2',
        country: 'Country 2',
        city: 'City 2',
        total: 200,
        orderDate: '2024-09-02',
      },
    ]

    // Configura o método getOrders como espião retornando um valor mock
    orderService.getOrders.and.returnValue(of(mockOrders))

    component.ngOnInit()

    expect(component.pastOrders).toEqual(mockOrders)
    expect(orderService.getOrders).toHaveBeenCalledWith(
      userService.loggedInUser.email
    )
  })

  // 2. Teste para verificar se a assinatura é removida na destruição
  it('should unsubscribe on destroy', () => {
    const subscriptionSpy = spyOn(component.subscription, 'unsubscribe')

    component.ngOnDestroy()

    expect(subscriptionSpy).toHaveBeenCalled()
  })

  // 3. Teste para verificar se o pedido é selecionado corretamente
  it('should select order by id', () => {
    const mockOrders: PastOrder[] = [
      {
        orderId: 1,
        userName: 'User 1',
        address: 'Address 1',
        country: 'Country 1',
        city: 'City 1',
        total: 100,
        orderDate: '2024-09-01',
      },
      {
        orderId: 2,
        userName: 'User 2',
        address: 'Address 2',
        country: 'Country 2',
        city: 'City 2',
        total: 200,
        orderDate: '2024-09-02',
      },
    ]

    component.pastOrders = mockOrders

    const event = {target: {value: mockOrders[0].orderId.toString()}}
    component.selectOrder(event)

    expect(component.pastOrder).toEqual(mockOrders[0])
  })

  // 4. Teste para verificar se pastOrder é definido como indefinido ao selecionar valor inválido
  it('should set pastOrder to undefined when value is 0', () => {
    const event = {target: {value: '0'}}

    component.selectOrder(event)

    expect(component.pastOrder).toBeUndefined()
  })
})
