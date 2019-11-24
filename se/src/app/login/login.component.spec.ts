import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { WebStorageService } from 'angular-webstorage-service';
import { LoginComponent } from './login.component';
import {SESSION_STORAGE} from 'angular-webstorage-service';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  beforeEach(() => {
    const routerStub = { navigate: array => ({}) };
    const authServiceStub = {
      getUserDetails: (email, password) => ({ subscribe: () => ({}) })
    };
    const webStorageServiceStub = {
      set: (string, email) => ({}),
      get: string => ({})
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginComponent],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: AuthService, useValue: authServiceStub },
        { provide : SESSION_STORAGE},
        { provide: WebStorageService, useValue: webStorageServiceStub }
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
