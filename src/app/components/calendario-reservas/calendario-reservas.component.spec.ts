import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioReservasComponent } from './calendario-reservas.component';

describe('CalendarioReservasComponent', () => {
  let component: CalendarioReservasComponent;
  let fixture: ComponentFixture<CalendarioReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarioReservasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarioReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
