import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemGroupTransComponent } from './mem-group-trans.component';

describe('MemGroupTransComponent', () => {
  let component: MemGroupTransComponent;
  let fixture: ComponentFixture<MemGroupTransComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemGroupTransComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemGroupTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
