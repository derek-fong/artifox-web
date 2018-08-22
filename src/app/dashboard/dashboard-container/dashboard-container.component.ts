import { isPlatformServer } from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';

@Component({ templateUrl: './dashboard-container.component.html' })
export class DashboardContainerComponent implements OnInit {
  isPlatformServer: boolean = isPlatformServer(this.platformId);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private meta: Meta,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.setMeta();
  }

  /**
   * Set meta.
   */
  private setMeta(): void {
    const description = 'Artifox dashboard. ';
    const imageUrl = `${environment.url}/assets/icons/icon-512x512.png`;
    const title = 'Dashboard | Artifox';
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
