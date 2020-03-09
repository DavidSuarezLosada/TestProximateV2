import { Injectable } from '@angular/core';
import { Menu } from '../../Interface/Menu';
import { Products } from '../../Interface/Productos';
@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  public menuShare:Menu[]=[];
  public productsShare:Products[]=[];
  public productShare:Products;
  
  setMenu(array:Menu[]){
    this.menuShare = array;
  }

  getMenu(){
    return this.menuShare;
  }

  setProducts(array:Products[]){
    this.productsShare=array;
  }

  getProducts(){
    return this.productsShare;
  }

  setProduct(array:Products){
    this.productShare=array;
  }

  getProduct(){
    return this.productShare;
  }

  constructor(){}


}
