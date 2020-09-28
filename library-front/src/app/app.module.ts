import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './components/home/home.module';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
    ToastrModule.forRoot({
      progressBar: true,
      closeButton: true,
      maxOpened: 1,
      autoDismiss: true,
      preventDuplicates: true
    }), // ToastrModule added
  ],
  providers: [],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
