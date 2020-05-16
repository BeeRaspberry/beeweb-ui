import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AppConfigService {
  private config: any;

  constructor(private http: HttpClient) { }

  public loadConfig() {
    return this.http.get('./assets/config/config.json')
      .toPromise()
      .then((data: any) => {
        this.config = data;
        console.log(JSON.stringify(data));
      })
      .catch((err: any) => {
        console.error(err);
      });
  }
  getApiURL(): string {
    console.log('Get API URL: ' + this.config.apiUrl);
    return this.config.apiUrl + '/graphql';
  }
}