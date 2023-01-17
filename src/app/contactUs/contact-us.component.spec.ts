import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../materialModule/material.module';

import { ContactUsComponent } from './contact-us.component';

describe('ContactUsComponent', () => {
  let component: ContactUsComponent;
  let fixture: ComponentFixture<ContactUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactUsComponent],
      imports:[FormsModule,ReactiveFormsModule,
      MatFormFieldModule,MatInputModule,
      MaterialModule,BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check the page title',()=>{
    const ip=fixture.debugElement.query(By.css('#pageTitle'));
    expect(ip).toBeTruthy();

    expect(ip.nativeElement.textContent).toContain('Contact us');

  });

  it('should check the input attributes of firstName ',()=>{
    const ip=fixture.debugElement.query(By.css('#firstName'));
    expect(ip).toBeTruthy();

    expect(ip.nativeElement.getAttribute('type')).toEqual('text');
    expect(ip.nativeElement.getAttribute('name')).toEqual('firstName');
    expect(ip.nativeElement.getAttribute('formControlName')).toEqual('firstName');
  });

  it('should check the input attributes of lastName ',()=>{
    const ip=fixture.debugElement.query(By.css('#lastName'));
    expect(ip).toBeTruthy();

    expect(ip.nativeElement.getAttribute('type')).toEqual('text');
    expect(ip.nativeElement.getAttribute('name')).toEqual('lastName');
    expect(ip.nativeElement.getAttribute('formControlName')).toEqual('lastName');
  });

  it('should check the input attributes of comments ',()=>{
    const ip=fixture.debugElement.query(By.css('#comments'));
    expect(ip).toBeTruthy();

    
    expect(ip.nativeElement.getAttribute('name')).toEqual('comments');
    expect(ip.nativeElement.getAttribute('formControlName')).toEqual('comments');
  });

  it('should check button is disabled if form is not valid',()=>{
    const ip=fixture.debugElement.query(By.css('#btn'));
    expect(ip).toBeTruthy();

    
    fixture.detectChanges();
    expect(ip.nativeElement.disabled).toBeTruthy();
  });
  it('should check if form is valid',()=>{
    const ip=fixture.debugElement.query(By.css('#btn'));
    expect(ip).toBeTruthy();

    component.contactForm.setValue({
      firstName:'Bhoomika',
      lastName:'bhagwat',
      store:'Jio Mart,Mumbai',
      comments:'this is very nice shop'
    });
    fixture.detectChanges();
    expect(component.contactForm.valid).toBeTruthy();

  });
    

    

});
