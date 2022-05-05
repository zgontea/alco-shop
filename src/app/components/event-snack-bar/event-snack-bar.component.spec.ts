import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSnackBarComponent } from './event-snack-bar.component';

describe('EventSnackBarComponent', () => {
  let component: EventSnackBarComponent;
  let fixture: ComponentFixture<EventSnackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventSnackBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
