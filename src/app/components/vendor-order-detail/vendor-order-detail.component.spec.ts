import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorOrderDetailComponent } from './vendor-order-detail.component';

describe('VendorOrderDetailComponent', () => {
  let component: VendorOrderDetailComponent;
  let fixture: ComponentFixture<VendorOrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorOrderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
