import { Component, OnInit, Input } from "@angular/core";
import { SharedService } from "./../shared.service";

@Component({
  selector: "app-cart-button",
  templateUrl: "./cart-button.component.html",
  styleUrls: ["./cart-button.component.css"]
})
export class CartButtonComponent implements OnInit {
  @Input("cartQuantity$") cartQuantityC;
  @Input("source_selected") source_sel;
  @Input("size_selected") size_sel;
  @Input("data$.product") dataProd;
  @Input("prodQ") pQ;

  constructor(private sharedService: SharedService) {}

  ngOnInit() {}

  increaseCart(quantity) {
    this.pQ = quantity + 1;
    this.sharedService.getProdQuantity(this.pQ);
    let localCart = JSON.parse(localStorage.getItem("cart"));
    let UpcartObj = {
      product_Id: localCart.product_Id,
      imageArr: localCart.imageArr,
      quantity: this.pQ,
      selected_size: localCart.selected_size,
      source_obj: localCart.source_obj
    };

    localStorage.setItem("cart", JSON.stringify(UpcartObj));
    this.calculateTotal(this.pQ, localCart.source_obj.discounted_price);
  }

  decreaseCart(quantity) {
    this.pQ = quantity - 1;
    this.sharedService.getProdQuantity(this.pQ);
    let localCart = JSON.parse(localStorage.getItem("cart"));
    let UpcartObj = {
      product_Id: localCart.product_Id,
      imageArr: localCart.imageArr,
      quantity: this.pQ,
      selected_size: localCart.selected_size,
      source_obj: localCart.source_obj
    };

    localStorage.setItem("cart", JSON.stringify(UpcartObj));

    if (this.pQ == 0) {
      this.sharedService.getQuantity(this.pQ);
      localStorage.removeItem("cart");
      localStorage.removeItem("cartQ");
    }
    this.calculateTotal(this.pQ, localCart.source_obj.discounted_price);
  }

  calculateTotal(unit, price) {
    let subTotal = unit * price;
    this.sharedService.getSubTotal(subTotal);
  }
}
