import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettleupComponent } from './settleup.component';

describe('SettleupComponent', () => {
  let component: SettleupComponent;
  let fixture: ComponentFixture<SettleupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettleupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettleupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
