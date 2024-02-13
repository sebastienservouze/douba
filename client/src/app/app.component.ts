import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  helloWorld?: string;

  constructor(httpClient: HttpClient) {
    httpClient.get('http://localhost:3000').subscribe((response: any) => this.helloWorld = response.toString());
  }

}
