
// Angular imports
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Service imports
import { RestApiService } from '../../services/restApi/rest-api.service';


// Interface imports
import { Login } from '../../Interface/Login';
import { Menu } from '../../Interface/Menu';

// Components imports
import { DetailComponentComponent } from '../home-page/detail-component/detail-component.component'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public dataReceived: Menu[];
  message: String = "";
  treeControl = new NestedTreeControl<Menu>(node => node.Children);
  dataSource = new MatTreeNestedDataSource<Menu>();

  hasChild = (_: number, node: Menu) => !!node.Children && node.Children.length > 0;

  constructor(private router: Router,
    private service: RestApiService) {

  }

  ngOnInit(): void {

  }

  login(TypeDevice: number, UserName: string, Password: string): void {
    UserName = UserName.trim();
    Password = Password.trim();
    if (!UserName||!Password) { this.message = "Por favor introduzca un usuario y una contraseña"; return; }
    else {
      this.service.postLogin({ TypeDevice, UserName, Password } as Login)
        .subscribe(res => {

          if (res.codeStatus === "Ok") {
            localStorage.setItem('UserName', UserName);
            localStorage.setItem('Password', Password);
            this.router.navigate(['/home-page']);
            this.dataReceived = res['data'];
            this.dataSource.data = this.dataReceived;
          }
          else if (res.codeStatus === "0x005"){
            this.message = "Usuario y/o contraseña incorrecta";
          }
          else {
            this.message = "No hay respuesta del servidor";
          }
        });

    }
  }

  cleanMessage() {
    this.message = "";
  }

}
