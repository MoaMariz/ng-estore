import {ComponentFixture, TestBed} from '@angular/core/testing'
import {HttpTestingController, HttpClientTestingModule} from '@angular/common/http/testing'
import {UserService} from './userService.service'
import {OrderService} from './order.service'
import {PastOrder} from '../types/order.type'
import { CartService } from './cart.service'

describe('OrderService', () => {
  const spy = jasmine.createSpyObj('UserService', [], {token: 'mock-token'})
  let service: OrderService
  let httpMock: HttpTestingController
  let fixture: ComponentFixture<OrderService>
  let userServiceSpy: jasmine.SpyObj<UserService>
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderService, CartService, {provide: UserService, useValue: spy}],
    }).compileComponents()



    service = TestBed.inject(OrderService)
    httpMock = TestBed.inject(HttpTestingController)
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>
  })

  afterEach(() => {
    httpMock.verify()
  })


  it('Should correctly get email for getOrders method', () => {
    const mockEmail = 'teste@exemplo.com'
    const mockOrders: PastOrder[] = [
      {
        orderId: 1,
        userName: 'Usuario Teste',
        address: 'Rua Teste, 123',
        country: 'Brasil',
        city: 'São Paulo',
        total: 80.0,
        orderDate: '2024-09-17',
      },
      {
        orderId: 2,
        userName: 'Usuario Teste',
        address: 'Rua Teste, 123',
        country: 'Brasil',
        city: 'São Paulo',
        total: 30.0,
        orderDate: '2024-09-16',
      },
    ]

    service.getOrders(mockEmail).subscribe((orders) => {
      expect(orders).toEqual(mockOrders)
    })

    const req = httpMock.expectOne(
      `http://localhost:5001/orders/allorders?userEmail=${mockEmail}`
    )
    expect(req.request.method).toBe('GET')
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token')

    req.flush(mockOrders)
  })
})
