import { Component, OnInit } from "@angular/core";
import { SharedService } from "./../shared.service";

@Component({
  selector: "app-top-nav",
  templateUrl: "./top-nav.component.html",
  styleUrls: ["./top-nav.component.css"]
})
export class TopNavComponent implements OnInit {
  cartQ;
  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.sharedQuantity.subscribe(q => (this.cartQ = q));
  }
}
