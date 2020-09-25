import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { NavbarModule } from 'src/app/shared/components/navbar/navbar.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    NavbarModule
  ],
  exports: [HomeComponent],
  providers: [HomeComponent]
})
export class HomeModule { }
