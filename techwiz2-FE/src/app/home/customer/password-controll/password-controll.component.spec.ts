import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordControllComponent } from './password-controll.component';

describe('PasswordControllComponent', () => {
  let component: PasswordControllComponent;
  let fixture: ComponentFixture<PasswordControllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordControllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordControllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
