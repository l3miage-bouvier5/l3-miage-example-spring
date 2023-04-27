import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiahootChoiceComponent } from './miahoot-choice.component';

describe('MiahootChoiceComponent', () => {
  let component: MiahootChoiceComponent;
  let fixture: ComponentFixture<MiahootChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiahootChoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiahootChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
