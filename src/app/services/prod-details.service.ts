import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdDetailsService {

  constructor() { }

  public ProdDetails = new BehaviorSubject<any>(0);
  ProdDetails$ = this.ProdDetails.asObservable();
  updateProdDetails(prodID){
    this.ProdDetails.next(prodID);
  }
}
