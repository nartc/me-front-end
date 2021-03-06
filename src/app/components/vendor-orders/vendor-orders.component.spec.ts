import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorOrdersComponent } from './vendor-orders.component';

describe('VendorOrdersComponent', () => {
  let component: VendorOrdersComponent;
  let fixture: ComponentFixture<VendorOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
