import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientOrderDetailComponent } from './client-order-detail.component';

describe('ClientOrderDetailComponent', () => {
  let component: ClientOrderDetailComponent;
  let fixture: ComponentFixture<ClientOrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientOrderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
