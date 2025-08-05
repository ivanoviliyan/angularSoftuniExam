import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editmovie } from './editmovie';

describe('Editmovie', () => {
  let component: Editmovie;
  let fixture: ComponentFixture<Editmovie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Editmovie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Editmovie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
