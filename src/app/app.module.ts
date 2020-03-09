import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './Modules/MaterialModule/material.module'
import { LoginComponent } from './Components/login/login.component'
import { RouteModule } from './Modules/Routes/routes.module';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { ProductsComponent } from './Components/home-page/products/products.component';
import { MenuComponent } from './Components/menu/menu.component';
import { DetailComponentComponent } from './Components/home-page/detail-component/detail-component.component';
import { ShareDataService } from './services/shareData/share-data.service'
import { NgxSpinnerModule } from 'ngx-spinner'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    ProductsComponent,
    MenuComponent,
    DetailComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouteModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [ShareDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
