import { Component, OnInit, Injectable, Input } from '@angular/core';
import { ActivatedRoute, Params, RouteConfigLoadEnd } from '@angular/router';
import { Router } from '@angular/router';

// Service import
import { ShareDataService } from '../../../services/shareData/share-data.service';
import { RestApiService } from '../../../services/restApi/rest-api.service';
import { HomePageComponent } from '../home-page.component'

// Interface import
import { Products } from '../../../Interface/Productos'

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-detail-component',
  templateUrl: './detail-component.component.html',
  styleUrls: ['./detail-component.component.css']
})
export class DetailComponentComponent implements OnInit {

  productsReceived: Products[] = this.shareData.getProducts();
  public valorfinal: Products;
  flag: boolean = false;
  indexName: number;
  indexSlice: number;
  itemsMenu: String[] = [];


  constructor(
    private route: ActivatedRoute,
    public shareData: ShareDataService,
    private router: Router,
    private service: RestApiService,
    private homePage: HomePageComponent) 
    
    {
    this.products2();
  }

  ngOnInit(): void {

  }


  products(linksito: String): void {
    this.service.getProducts()
      .subscribe(res => {
        this.productsReceived = res['data'];
        this.shareData.setProducts(this.productsReceived);
        this.productsReceived.forEach((item, index) => {
          this.itemsMenu.push(item['RouteLink']);
        });

        this.flag = false;
        const rLink = this.route.snapshot['_urlSegment']['segments']["2"];
        this.indexName = this.itemsMenu.indexOf(linksito);
        this.productsReceived[this.indexName]["Name"] = this.productsReceived[this.indexName]["Name"].replace('><', '> --- <');
        this.productsReceived[this.indexName]["Name"] = this.productsReceived[this.indexName]["Name"].replace(/<[^>]*>/g, '');
        this.indexSlice = this.productsReceived[this.indexName]["Name"].indexOf("---");
        this.productsReceived[this.indexName]["Subtitle"] = this.productsReceived[this.indexName]["Name"].slice(this.indexSlice + 3);
        this.productsReceived[this.indexName]["Name"] = this.productsReceived[this.indexName]["Name"].slice(0, this.indexSlice);
        this.productsReceived[this.indexName]["Description"] = this.productsReceived[this.indexName]["Description"].replace(/<[^>]*>/g, '');
        this.productsReceived[this.indexName]["AgeDescription"] = this.productsReceived[this.indexName]["AgeDescription"].replace(/<[^>]*>/g, '');
        this.shareData.setProduct(this.productsReceived[this.indexName]);
        this.homePage.spinnerhide();
      });
  }

  products2(): void {
    this.service.getProducts()
      .subscribe(res => {
        this.productsReceived = res['data'];
        this.shareData.setProducts(this.productsReceived);
        this.productsReceived.forEach((item, index) => {
          this.itemsMenu.push(item['RouteLink']);
        });
        this.flag = false;
        const rLink = this.route.snapshot['_urlSegment']['segments']["2"];
        this.indexName = this.itemsMenu.indexOf("/" + rLink);
        this.productsReceived[this.indexName]["Name"] = this.productsReceived[this.indexName]["Name"].replace('><', '> --- <');
        this.productsReceived[this.indexName]["Name"] = this.productsReceived[this.indexName]["Name"].replace(/<[^>]*>/g, '');
        this.indexSlice = this.productsReceived[this.indexName]["Name"].indexOf("---");
        this.productsReceived[this.indexName]["Subtitle"] = this.productsReceived[this.indexName]["Name"].slice(this.indexSlice + 3);
        this.productsReceived[this.indexName]["Name"] = this.productsReceived[this.indexName]["Name"].slice(0, this.indexSlice);
        this.productsReceived[this.indexName]["Description"] = this.productsReceived[this.indexName]["Description"].replace(/<[^>]*>/g, '');
        this.productsReceived[this.indexName]["AgeDescription"] = this.productsReceived[this.indexName]["AgeDescription"].replace(/<[^>]*>/g, '');
        this.shareData.setProduct(this.productsReceived[this.indexName]);
        this.homePage.spinnerhide();
      });
  }
}

