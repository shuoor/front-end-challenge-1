import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
@Injectable({
  providedIn: "root"
})
export class SharedService {
  private cartQuantity = new BehaviorSubject<number>(0);
  sharedQuantity = this.cartQuantity.asObservable();

  private prodQuantity = new BehaviorSubject<number>(0);
  productQuantity = this.prodQuantity.asObservable();

  private subTotal = new BehaviorSubject<number>(0);
  subT = this.subTotal.asObservable();

  constructor() {}

  getQuantity(q: number) {
    this.cartQuantity.next(q);
  }

  getProdQuantity(pq: number) {
    this.prodQuantity.next(pq);
  }

  getSubTotal(st: number) {
    this.subTotal.next(st);
  }
}
