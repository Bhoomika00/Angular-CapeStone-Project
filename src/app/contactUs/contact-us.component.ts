import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  pageTitle:string='Contact us';
  contactForm!:FormGroup;
  constructor(private fb:FormBuilder){}
  ngOnInit(): void {
    this.contactForm=this.fb.group({
      firstName:['',[Validators.required,Validators.minLength(2)]],
      lastName:['',[Validators.required,Validators.minLength(2)]],
      comments:['',[Validators.required,Validators.minLength(4),Validators.maxLength(100)]],
      store:['',[Validators.required]],
    });
    
  }

  
  
  onSubmit(){
    console.log(this.contactForm.value);
    alert('Form submitted!!!');
  }
  public myError = (controlName: string, errorName: string) =>{
    return this.contactForm.controls[controlName].hasError(errorName);
    }

}
