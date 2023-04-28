import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptionMiahootComponent } from './conception-miahoot.component';

describe('ConceptionMiahootComponent', () => {
  let component: ConceptionMiahootComponent;
  let fixture: ComponentFixture<ConceptionMiahootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptionMiahootComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptionMiahootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
