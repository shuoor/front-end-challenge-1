import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  private _url = "assets/product.json";
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(this._url);
  }
}
