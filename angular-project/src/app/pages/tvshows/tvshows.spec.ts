import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tvshows } from './tvshows';

describe('Tvshows', () => {
  let component: Tvshows;
  let fixture: ComponentFixture<Tvshows>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tvshows]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tvshows);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
