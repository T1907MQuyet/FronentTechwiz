import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestApiComponent } from './test-api/test-api.component';


@NgModule({
  declarations: [
    AppComponent,
    TestApiComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule, FormsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
