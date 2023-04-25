import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionUtilisateurComponent } from './connection-utilisateur.component';

describe('ConnectionUtilisateurComponent', () => {
  let component: ConnectionUtilisateurComponent;
  let fixture: ComponentFixture<ConnectionUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectionUtilisateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectionUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
