import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../../Components/login/login.component'
import { HomePageComponent } from '../../Components/home-page/home-page.component'
import { ProductsComponent } from '../../Components/home-page/products/products.component'
import { DetailComponentComponent } from '../../Components/home-page/detail-component/detail-component.component'

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'home-page', component: HomePageComponent,
        children: [
            { path: '', redirectTo: '/home-page/products', pathMatch: 'full' },
            { path: 'products', component: ProductsComponent },
            { path: 'products/:routeLink', component: DetailComponentComponent }
        ]
    },
    { path: '**', redirectTo: '/home-page/products', pathMatch: 'full' }
]

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule
    ],
})
export class RouteModule { }