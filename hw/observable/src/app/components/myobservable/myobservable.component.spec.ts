import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyobservableComponent } from './myobservable.component';

describe('MyobservableComponent', () => {
  let component: MyobservableComponent;
  let fixture: ComponentFixture<MyobservableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyobservableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyobservableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
