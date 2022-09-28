import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getLocalItem(key:string){
    let local = localStorage.getItem(key);
    return local ? JSON.parse(local): null;
  }

  getLocalList(key:string): any[]{
    return JSON.parse(localStorage.getItem(key)||'[]');
  }

  setLocalKey(key:string, value:any){
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeLocalKey(key:string){
    localStorage.removeItem(key);
  }

  createItemInLocalList(key:string, value:any){
    let localMovies =this.getLocalList(key);
    localMovies.push(value);
    this.setLocalKey(key, localMovies)
  }

  updateItemInLocalList(id:string | number, IDKey:string, key:string, newValue:any){
    let list = this.getLocalList(key);
    const INDEX = list.findIndex(item=> item[IDKey] === id);
    list[INDEX] = newValue;
    this.setLocalKey(key, list);
  }

  getItemInLocalList(id:string | number, key:string, itemID: string){
    const INDEX = this.getLocalList(key).findIndex(item=> item[itemID] == id);
    return this.getLocalList(key)[INDEX];
  }

  removeItemInLocalList(id:string | number, key:string){
    let list = this.getLocalList(key);
    const INDEX = this.getLocalList(key).findIndex(item=> item.id === id);
    list.splice(INDEX, 1);
    this.setLocalKey(key, list);
  }

  removeItemInLocalListByIndex(index:number | number, key:string){
    let list = this.getLocalList(key);
    list.splice(index, 1);
    this.setLocalKey(key, list);
    return list
  }
}
