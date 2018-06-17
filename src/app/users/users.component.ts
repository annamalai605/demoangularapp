import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import {ServiceApi} from '../ServiceApi';

@Component({
    selector: 'my-user',
    template: `
 <p>Users:</p>
  <ul>
    <li *ngFor="let user of data">
     <a [routerLink]="['/albums']" (click)="clickMe(user.id)"> {{ user.name }} </a>
    </li>
  </ul>
  `,
})
export class UsersComponent {


    private data: any;
    constructor(private serviceApi: ServiceApi) {
        //api call to get all the users
        serviceApi.getUsers().subscribe(data => {
            this.data = data;
        })

    }

    //this function is to pass the user id ,which has been clicked ,in order to get the albums
    //this value passing has been executed using the "pass through service" concept in angular
    clickMe(data: any) {
        this.serviceApi.passMessage(data);
    }

}
