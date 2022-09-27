import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './LocalStorage.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  public localKey = 'shoppingCartItems';
  public localKeyTotal = 'shoppingCartTotal';
  constructor(public localService: LocalStorageService) { }

  getShoppingCartTotal(){
    return this.localService.getLocalItem(this.localKeyTotal)??0;
  }
  getShoppintCartItems(){
    return of(this.localService.getLocalList(this.localKey))
  }
}
