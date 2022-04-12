import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

/**
 * Utility service necessary to translate the mat-paginator
 * References:
 * https://material.angular.io/components/paginator/overview
 * https://stackoverflow.com/questions/46869616/how-to-use-matpaginatorintl
 */
@Injectable()
export class MatPaginationIntlService extends MatPaginatorIntl {
  constructor(private translateService: TranslateService) {
    super();

    // React whenever the language is changed
    this.translateService.onLangChange.subscribe((_event: Event) => {
      this.translateLabels();
    });

    // Initialize the translations once at construction time
    this.translateLabels();
  }

  getRangeLabel = (page: number, pageSize: number, length: number): string => {
    const of = this.translateService
      ? this.translateService.instant('paginator.of')
      : 'of';
    if (length === 0 || pageSize === 0) {
      return '0 ' + of + ' ' + length;
    }
    length = Math.max(length, 0);
    const startIndex =
      page * pageSize > length
        ? (Math.ceil(length / pageSize) - 1) * pageSize
        : page * pageSize;

    const endIndex = Math.min(startIndex + pageSize, length);
    return startIndex + 1 + ' - ' + endIndex + ' ' + of + ' ' + length;
  };

  injectTranslateService(translate: TranslateService): void {
    this.translateService = translate;

    this.translateService.onLangChange.subscribe(() => {
      this.translateLabels();
    });

    this.translateLabels();
  }

  translateLabels(): void {
    this.firstPageLabel = this.translateService.instant(
      'paginator.paginatorIntl.firstPageLabel'
    );
    this.itemsPerPageLabel = this.translateService.instant(
      'paginator.paginatorIntl.itemsPerPageLabel'
    );
    this.lastPageLabel = this.translateService.instant(
      'paginator.paginatorIntl.lastPageLabel'
    );
    this.nextPageLabel = this.translateService.instant(
      'paginator.paginatorIntl.nextPageLabel'
    );
    this.previousPageLabel = this.translateService.instant(
      'paginator.paginatorIntl.previousPageLabel'
    );
    this.changes.next();
  }
}
