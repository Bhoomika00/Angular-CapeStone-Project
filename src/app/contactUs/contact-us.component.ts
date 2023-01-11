import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  contactForm!:FormGroup;
  constructor(private fb:FormBuilder){}
  ngOnInit(): void {
    this.contactForm=this.fb.group({
      firstName:['',[Validators.required,Validators.minLength(2)]],
      lastName:['',[Validators.required]],
      comments:['',[Validators.required]],
      store:['',[Validators.required]],
    });
    
  }

  
  
  onSubmit(){
    console.log(this.contactForm.value);
  }


}
