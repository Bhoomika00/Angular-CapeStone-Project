import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit,OnChanges {
  @Input() rating:number=0;
  
  cropWidth:number=75;

  
  ngOnInit(): void {
    console.log('in the star');
    
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.cropWidth=this.rating *75/5;
  }
  

}
