import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '../../core/services/app-config.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor( private config: AppConfigService) {
    console.log('about: ' + this.config.getApiURL());
   }

  ngOnInit() {
  }

}
