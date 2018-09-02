import { isPlatformServer } from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { Product } from '../shared/product.model';
import { ProductsService } from '../shared/products.service';
import { environment } from '../../../environments/environment';

@Component({
  styleUrls: [ './product-list-container.component.scss' ],
  templateUrl: './product-list-container.component.html'
})
export class ProductListContainerComponent implements OnInit, OnDestroy {
  getProductsError: Error;
  isLoading = true;
  isPlatformServer: boolean = isPlatformServer(this.platformId);
  products: Product[];
  private productsSubscription: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private meta: Meta,
    private productsService: ProductsService,
    private router: Router,
    private title: Title,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.setMeta();

    this.productsSubscription = this.productsService.getProducts$().subscribe(
      (products: Product[]) => {
        this.getProductsError = null;
        this.products = products;
        this.isLoading = false;
      },
      (error: Error) => {
        this.toastrService.error(error.message, 'Failed to Load Products');
        this.getProductsError = error;
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe(this.productsSubscription);
    this.toastrService.clear();
  }

  /**
   * Unsubscribe.
   * @param {Subscription} subscription - Subscription to be unsubscribed.
   */
  /* istanbul ignore next */
  private unsubscribe(subscription: Subscription): void {
    if (subscription && subscription instanceof Subscription) {
      subscription.unsubscribe();
    }
  }

  /**
   * Set meta.
   */
  private setMeta(): void {
    const description = 'Artifox product list. ';
    const imageUrl = `${environment.url}/assets/icons/icon-512x512.png`;
    const title = 'Products | Artifox';
    const url = `${environment.url}${this.router.url}`;

    this.title.setTitle(title);
    this.meta.addTags([
      { name: 'description', content: description },
      { name: 'url', content: url },
      { name: 'og:description', content: description },
      { name: 'og:image', content: imageUrl },
      { name: 'og:title', content: title },
      { name: 'og:site_name', content: 'Artifox' },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: url }
    ]);
  }
}
