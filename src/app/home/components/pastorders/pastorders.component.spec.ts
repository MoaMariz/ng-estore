import { TestBed, ComponentFixture } from '@angular/core/testing';
import { PastordersComponent } from './pastorders.component';
import { OrderService } from '../../../shared/services/order.service';
import { UserService } from '../../../shared/services/userService.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CurrencyPipe } from '@angular/common';
import { By } from '@angular/platform-browser';
import { LoggedUser } from '../../../shared/types/user.type';

fdescribe('PastordersComponent', () => {
  let component: PastordersComponent;
  let fixture: ComponentFixture<PastordersComponent>;
  let orderService: OrderService;
  let userService: UserService;

  const mockOrders = [
    { orderId: 1, userName: 'John', address: '123 St', country: 'USA', city: 'NY', total: 100, orderDate: '2024-09-19' },
    { orderId: 2, userName: 'Doe', address: '456 St', country: 'USA', city: 'LA', total: 150, orderDate: '2024-08-19' }
  ];

const mockUser: LoggedUser = {
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St',
    country: 'USA',
    city: 'New York',
    email: 'test@test.com'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [PastordersComponent],
      providers: [OrderService, UserService, CurrencyPipe, HttpClientTestingModule]
    });

    fixture = TestBed.createComponent(PastordersComponent);
    component = fixture.componentInstance;
    orderService = TestBed.inject(OrderService);
    userService = TestBed.inject(UserService);

    // Mocking loggedInUser email in the UserService
    spyOnProperty(userService, 'loggedInUser', 'get').and.returnValue(mockUser);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch past orders on ngOnInit', () => {
    spyOn(orderService, 'getOrders').and.returnValue(of(mockOrders));

    component.ngOnInit();
    expect(orderService.getOrders).toHaveBeenCalledWith(mockUser.email);
    expect(component.pastOrders).toEqual(mockOrders);
  });

  it('should handle error when fetching orders fails', () => {
    const consoleSpy = spyOn(console, 'error');
    spyOn(orderService, 'getOrders').and.returnValue(throwError('Error fetching orders'));

    component.ngOnInit();
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching past orders:', 'Error fetching orders');
  });

  it('should select an order based on event value', () => {
    component.pastOrders = mockOrders;

    const event = { target: { value: '1' } };
    component.selectOrder(event);
    expect(component.pastOrder.orderId).toEqual(1);

    const invalidEvent = { target: { value: '0' } };
    component.selectOrder(invalidEvent);
    expect(component.pastOrder).toBeUndefined();
  });

  it('should unsubscribe on ngOnDestroy', () => {
    const unsubscribeSpy = spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('should display the correct number of options in the select element', () => {
    component.pastOrders = mockOrders;
    fixture.detectChanges();

    const options = fixture.debugElement.queryAll(By.css('option'));
    expect(options.length).toBe(3); // 2 orders + default "Please select"
    expect(options[1].nativeElement.textContent).toContain('1 Date: 2024-09-19');
  });
});