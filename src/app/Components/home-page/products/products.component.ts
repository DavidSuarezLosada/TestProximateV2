
// Angular import
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Service import
import { RestApiService } from '../../../services/restApi/rest-api.service'
import { ShareDataService } from '../../../services/shareData/share-data.service';
import { HomePageComponent } from '../../home-page/home-page.component'

// Interface import
import { Products } from '../../../Interface/Productos'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  productsReceived: Products[];
  nombres: String[] = [];
  imagenes: String[] = [];
  routes: String[] =[];
  indexnumber: number;

  constructor(public shareData: ShareDataService,
    private service: RestApiService,
    private router: Router,
    private homePage: HomePageComponent ) {
  }

  ngOnInit(): void {
    this.products();
  }

  products(): void {
    this.service.getProducts()
      .subscribe(res => {
        this.productsReceived = res['data'];
        this.shareData.setProducts(this.productsReceived);
        this.productsReceived.forEach((item, index) => {
          this.nombres.push(item['Name']);
          this.nombres[index] = this.nombres[index].replace('><', '> --- <');
          this.nombres[index] = this.nombres[index].replace(/<[^>]*>/g, '');
          this.indexnumber = this.nombres[index].indexOf("---");
          this.nombres[index] = this.nombres[index].slice(0, this.indexnumber);
        });
        this.productsReceived.forEach((item, index) => {
          this.imagenes.push(item['CardImgUrl']);
          this.imagenes[index] = this.imagenes[index].replace('\r\n', '');
        });
        this.productsReceived.forEach((item, index) => {
          this.routes.push(item['RouteLink']);
          
        });
        this.homePage.spinnerhide();
      });
  }

}
