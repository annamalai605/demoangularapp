import { Component, OnInit  } from '@angular/core';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import 'rxjs/operators';
import {ServiceApi} from '../ServiceApi';
import {Location} from '@angular/common';




@Component({
    selector: 'my-albums',
    template: `
 <p>Albums:</p>
  <ul>
    <li *ngFor="let album of data">
     <a [routerLink]="['/photos']" (click)="clickMe(album.id)"> {{ album.title }} </a>
    </li>
  </ul>
<br>
<br>
 <button type="button" (click)="back()">BACK</button> 
  `,
})
export class AlbumComponent implements OnInit {


    private data: any;
    private filteredData: any;
    private message: any;
    constructor(private serviceApi: ServiceApi, private location: Location) {
        this.filteredData = [];
        //api call to get all the albums
        serviceApi.getAlbums().subscribe(data => {
            //filtering the albums to this specified users
            // .filter function also works fine, but here due to version conflict i had to do this on my own
            this.filterData(data);
        })

    }

    //this will receive the user id value which has been clicked by subscribing an observable
    ngOnInit() {
        this.serviceApi.currentMessage$.subscribe(message => this.message = message)
    }

    //this function is is to filter the albums which is associated with the clicked user 
    public filterData(data: any) {
        //iterating the albums
        for (var i = 0; i < data.length; i++) {
            //if the album has user id which is clicked , then add it into the result list filteredData
            if (data[i].userId == this.message) {
                this.filteredData.push(data[i]);
            }

        }
        //set the final result as data, which is to be displayed
        this.data = this.filteredData;
    }

    //this function is to pass the album id ,which has been clicked ,in order to get the photos
    //this value passing has been executed using the "pass through service" concept in angular
    clickMe(data: any) {
        this.serviceApi.passAlbumId(data);
    }

    
    //function to go back to the previous page when clicked on back
    back() {
        this.location.back();
    }
}
