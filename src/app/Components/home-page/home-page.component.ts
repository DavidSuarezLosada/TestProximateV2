
// Angular import
import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import { NestedTreeControl } from '@angular/cdk/tree';

// Service import
import { RestApiService } from '../../services/restApi/rest-api.service';
import { ShareDataService } from '../../services/shareData/share-data.service';
import { NgxSpinnerService } from 'ngx-spinner'

// Interface import
import { Login } from '../../Interface/Login';
import { Menu } from '../../Interface/Menu';
import { Products } from '../../Interface/Productos';

// Component import
import { DetailComponentComponent } from '../home-page/detail-component/detail-component.component'

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;
  UserName = localStorage.getItem('UserName');;
  Password = localStorage.getItem('Password');;
  typedevice: number = 1;
  menuReceived: Menu[];
  dataReceived: String;
  productsReceived: Products[];
  treeControl = new NestedTreeControl<Menu>(node => node.Children);
  dataSource = new MatTreeNestedDataSource<Menu>();

  constructor(
    private router: Router,
    private service: RestApiService,
    private shareData: ShareDataService,
    private spinnerService: NgxSpinnerService) {

  }

  close() {
    this.sidenav.close();
  }

  ngOnInit(): void {
    if (this.UserName) {
      this.products();
      this.menu(this.typedevice, this.UserName, this.Password);
      this.spinnershow();
    } //Si no hay variables en el localstorage redirecciona a la login page
    else {
      this.router.navigate([''])
    }
  }

  menu(TypeDevice: number, UserName: string, Password: string): void {
    if (!UserName) { return; }
    else {
      this.service.postLogin({ TypeDevice, UserName, Password } as Login)
        .subscribe(res => {
          if (res.codeStatus === 'Ok') {
            this.menuReceived = res['data'];
            this.dataReceived = res['data']["UserData"]["Name1"] + " " + res['data']["UserData"]["Name2"];
            this.dataSource.data = this.menuReceived['Menu'];
            this.shareData.setMenu(this.menuReceived['Menu']);
          }
        });
    }
  }

  products(): void {
    this.service.getProducts()
      .subscribe(res => {
        this.productsReceived = res['data'];
        this.shareData.setProducts(this.productsReceived);

      });
  }

  spinnershow(): void {
    this.spinnerService.show();
  }

  spinnerhide(): void {
    this.spinnerService.hide();
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login'])
  }

}
