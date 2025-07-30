import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mylist } from './mylist';

describe('Mylist', () => {
  let component: Mylist;
  let fixture: ComponentFixture<Mylist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mylist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mylist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
