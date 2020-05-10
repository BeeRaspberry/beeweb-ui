import { Component, OnInit } from '@angular/core';
import { environment } from '../../../assets/env';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() {
    console.log('Api: ' + environment.apiUrl);
   }

  ngOnInit() {
  }

}
