import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import { CREATE_COUNTRY, UPDATE_COUNTRY } from './queries';
@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor() { }
}
