import { Component, OnInit } from '@angular/core';
import { EnvService } from '../../shared/env-service/env.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(
    private env: EnvService
  ) {
    console.log('Api: ' + env.apiUrl);
   }

  ngOnInit() {
  }

}
