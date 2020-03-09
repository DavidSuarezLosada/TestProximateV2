
// Angular import
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import { NestedTreeControl } from '@angular/cdk/tree';
import { ActivatedRoute } from '@angular/router';

// Service import
import { RestApiService } from '../../services/restApi/rest-api.service';
import { ShareDataService } from '../../services/shareData/share-data.service';
import { HomePageComponent } from '../home-page/home-page.component'

// Interface import
import { Login } from '../../Interface/Login';
import { Menu } from '../../Interface/Menu';

// Component import
import { DetailComponentComponent } from '../home-page/detail-component/detail-component.component'



@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    UserName = localStorage.getItem('UserName');;
    Password = localStorage.getItem('Password');;
    typedevice: number = 1;
    dataReceived: Menu[];
    treeControl = new NestedTreeControl<Menu>(node => node.Children);
    dataSource = new MatTreeNestedDataSource<Menu>();

    constructor(private router: Router,
        private service: RestApiService,
        private shareData: ShareDataService,
        private route: ActivatedRoute,
        private compo: DetailComponentComponent,
        private homePage: HomePageComponent) {

    }

    hasChild = (_: number, node: Menu) => !!node.Children && node.Children.length > 0;

    ngOnInit(): void {
        if (this.shareData.getMenu().length == 0) {
            this.menu(this.typedevice, this.UserName, this.Password);
        }
        this.dataReceived = this.shareData.getMenu();
    }

    menu(TypeDevice: number, UserName: string, Password: string): void {
        if (!UserName) { return; }
        else {
            this.service.postLogin({ TypeDevice, UserName, Password } as Login)
                .subscribe(res => {
                    if (res.codeStatus === 'Ok') {
                        this.dataReceived = res['data'];
                        this.dataSource.data = this.dataReceived['Menu'];
                    }
                });
        }
    }

    detailProductos(routeLink: String) {
        this.router.navigate(['/home-page/products' + routeLink]);
        this.compo.products(routeLink);
        this.homePage.spinnershow();
    }
}
