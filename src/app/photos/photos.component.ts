import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import {ServiceApi} from '../ServiceApi';
import {Location} from '@angular/common';


@Component({
    selector: 'my-photos',
    template: `
 <p>Photos:</p>
  <ul>
    <li *ngFor="let photo of data">
     <img src={{photo.url}} 
alt="Image loading" />
    </li>
  </ul>

<br>
<br>
 <button type="button" (click)="back()">BACK</button> 
  `,
})
export class PhotosComponent implements OnInit {


    private data: any;
    private message: any;
    private filteredData: any;
    constructor(private serviceApi: ServiceApi,private location: Location) {
        this.filteredData = [];
        //api call to get the photos
        serviceApi.getPhotos().subscribe(data => {
            //filtering the photos to this specified album
            // .filter function also works fine, but here due to version conflict i had to do this on my own
            this.filterData(data);
            debugger;
        })

    }

    //this function is is to filter the photos which is associated with the clicked album and get just the first 5 photos 
    public filterData(data: any) {
        //iterating the photos
        for (var i = 0; i < data.length; i++) {
            //if the photo has album id which is clicked , then push it into the result list filteredData
            //if the length reaches 5, then stop pushing, as we need to just display the first 5 photos
            if (data[i].albumId == this.message) {
                this.filteredData.push(data[i]);
                if (this.filteredData.length == 5)
                    break;
            }

        }
        //set the final result as data, which is to be displayed
        this.data = this.filteredData;
    }

    ngOnInit() {
        this.serviceApi.currentAlbum$.subscribe(message => this.message = message)
    }
    
    //function to go back to the previous page when clicked on back
    back() {
        this.location.back();
    }

}
