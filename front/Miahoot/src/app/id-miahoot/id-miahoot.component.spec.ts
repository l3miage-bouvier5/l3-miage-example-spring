import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdMiahootComponent } from './id-miahoot.component';

describe('IdMiahootComponent', () => {
  let component: IdMiahootComponent;
  let fixture: ComponentFixture<IdMiahootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdMiahootComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdMiahootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
