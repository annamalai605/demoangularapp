import {Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ServiceApi {
    
    private messageSource = new BehaviorSubject("defaultMessage");
    currentMessage$= this.messageSource.asObservable();
    
     private messageSource2 = new BehaviorSubject("defaultMessage");
    currentAlbum$= this.messageSource2.asObservable();
    
  constructor(private http : HttpClient) { 
  }
    
   getUsers(){
      return this.http.get('https://jsonplaceholder.typicode.com/users');
     
       }
    
    getAlbums(){
      return this.http.get('https://jsonplaceholder.typicode.com/albums');
     
       }
    
    getPhotos(){
      return this.http.get('https://jsonplaceholder.typicode.com/photos');
     
       }
    
    passMessage(message: any) {
    this.messageSource.next(message);
  }
    
    passAlbumId(message: any) {
    this.messageSource2.next(message);
  }
}