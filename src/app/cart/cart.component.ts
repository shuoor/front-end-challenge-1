import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../services/products.service";
import { SharedService } from "../shared.service";
import { Router } from "../../../node_modules/@angular/router";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  cartQuantity$;
  source_selected;
  size_selected;
  data$;
  dataProduct$;
  prodQ;
  fullObj;
  subTotal;
  constructor(
    private prodService: ProductsService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit() {
    let localCart = [];
    let localQ = parseInt(localStorage.getItem("cartQ"));
    this.sharedService.getQuantity(localQ);
    this.sharedService.sharedQuantity.subscribe(sq => {
      this.cartQuantity$ = sq;
    });
    this.prodService.getData().subscribe(res => {
      this.data$ = res;
      this.dataProduct$ = this.data$.product;
    });
    localCart.push(JSON.parse(localStorage.getItem("cart")));
    let localObj = JSON.parse(localStorage.getItem("cart"));

    this.fullObj = localCart;
    if (localObj) {
      let mult = localObj.quantity * localObj.source_obj.discounted_price;
      this.sharedService.getSubTotal(mult);
      this.sharedService.subT.subscribe(st => {
        this.subTotal = st;
      });
    } else {
      this.router.navigate(["/"]);
    }
  }
}
