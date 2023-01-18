import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/materialModule/material.module';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[HttpClientTestingModule,FormsModule,ReactiveFormsModule,MaterialModule,BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check the input attributes of userName ',()=>{
    const ip=fixture.debugElement.query(By.css('#userName'));
    expect(ip).toBeTruthy();

    expect(ip.nativeElement.getAttribute('type')).toEqual('text');
    expect(ip.nativeElement.getAttribute('name')).toEqual('userName');
    expect(ip.nativeElement.getAttribute('id')).toEqual('userName');
  });

  it('should check the input attributes of password ',()=>{
    const ip=fixture.debugElement.query(By.css('#password'));
    expect(ip).toBeTruthy();

    expect(ip.nativeElement.getAttribute('type')).toEqual('password');
    expect(ip.nativeElement.getAttribute('name')).toEqual('password');
    expect(ip.nativeElement.getAttribute('id')).toEqual('password');
  });

});
