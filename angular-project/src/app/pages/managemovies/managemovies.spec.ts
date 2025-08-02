import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Managemovies } from './managemovies';

describe('Managemovies', () => {
  let component: Managemovies;
  let fixture: ComponentFixture<Managemovies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Managemovies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Managemovies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
