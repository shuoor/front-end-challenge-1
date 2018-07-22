import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from "./app.component";
import { TopNavComponent } from "./top-nav/top-nav.component";
import { HomeComponent } from "./home/home.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

import { ProductsService } from "./services/products.service";
import { SharedService } from "./shared.service";
import { CartButtonComponent } from "./cart-button/cart-button.component";
import { CartComponent } from "./cart/cart.component";
@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    HomeComponent,
    SidebarComponent,
    CartButtonComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,

    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,

    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "cart",
        component: CartComponent
      }
    ])
  ],
  providers: [ProductsService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule {}
