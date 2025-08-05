import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputErrorMessage } from './input-error-message';

describe('InputErrorMessage', () => {
  let component: InputErrorMessage;
  let fixture: ComponentFixture<InputErrorMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputErrorMessage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputErrorMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
