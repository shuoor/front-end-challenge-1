import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ProductsService } from "../services/products.service";
import { SharedService } from "./../shared.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  data$;
  product$;
  sizes$;
  sources$;
  quantity;
  cartQuantity$;
  prodQ;
  constructor(
    private prodService: ProductsService,
    private sharedService: SharedService
  ) {}

  async ngOnInit() {
    await this.prodService.getData().subscribe(res => {
      this.data$ = res;
      let sizes = this.data$.product.sizes;
      this.sizes$ = Object.keys(sizes);
    });
    this.sharedService.sharedQuantity.subscribe(
      cq => (this.cartQuantity$ = cq)
    );
    this.sharedService.productQuantity.subscribe(pq => (this.prodQ = pq));

    let localcart = localStorage.getItem("cart");
    let localCartQ = localStorage.getItem("cartQ");
    if (localcart) localStorage.removeItem("cart");
    if (localCartQ) localStorage.removeItem("cartQ");
  }

  sizeSelect(val) {
    this.getAllSources(val);
  }

  getAllSources(size) {
    this.sources$ = this.data$.product.sizes[size].sources;
  }

  createCart(prod, size, sourceid) {
    let productId = prod.product_id;
    let image = prod.image;
    let name = prod.title;
    this.cartQuantity$ = 1;
    this.prodQ = 1;
    let selectedSize = size;
    let selectedSource = sourceid;
    let sourceObj = this.getSourceById(selectedSize, selectedSource);

    let cartObj = {
      product_Id: productId,
      imageArr: image,
      productName: name,
      quantity: this.prodQ,
      selected_size: selectedSize,
      source_obj: sourceObj
    };

    this.sharedService.getProdQuantity(this.prodQ);
    localStorage.setItem("cart", JSON.stringify(cartObj));
    localStorage.setItem("cartQ", this.cartQuantity$);
    this.sharedService.getQuantity(this.cartQuantity$);
  }

  getSourceById(size, sourceId) {
    let sourcesArr = this.data$.product.sizes[size].sources;
    let sizeObj = sourcesArr.find(function(itm) {
      return sourceId.indexOf(itm.id) > -1;
    });
    return sizeObj;
  }
}
