import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {UsersComponent } from './users/users.component';
import {AlbumComponent } from './albums/albums.component';
import {PhotosComponent } from './photos/photos.component';
import {ServiceApi} from './ServiceApi';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'

const appRoutes: Routes = [
  { path: 'users', component: UsersComponent},
       {path: 'albums', component: AlbumComponent},
       {path: 'photos', component: PhotosComponent}
   
];

@NgModule({
  declarations: [
    AppComponent,UsersComponent,AlbumComponent,PhotosComponent
  ],
  imports: [
     BrowserModule, FormsModule ,RouterModule, RouterModule.forRoot(appRoutes),HttpClientModule,HttpModule
  ],
  providers: [ServiceApi],
  bootstrap: [AppComponent]
})
export class AppModule { }
