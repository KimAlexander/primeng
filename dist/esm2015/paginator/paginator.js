var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, OnInit, Input, Output, ChangeDetectorRef, EventEmitter, TemplateRef, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from 'primeng/api';
let Paginator = class Paginator {
    constructor(cd) {
        this.cd = cd;
        this.pageLinkSize = 5;
        this.onPageChange = new EventEmitter();
        this.alwaysShow = true;
        this.dropdownScrollHeight = '200px';
        this.currentPageReportTemplate = '{currentPage} of {totalPages}';
        this.totalRecords = 0;
        this.rows = 0;
        this._first = 0;
    }
    ngOnInit() {
        this.updatePaginatorState();
    }
    ngOnChanges(simpleChange) {
        if (simpleChange.totalRecords) {
            this.updatePageLinks();
            this.updatePaginatorState();
            this.updateFirst();
            this.updateRowsPerPageOptions();
        }
        if (simpleChange.first) {
            this._first = simpleChange.first.currentValue;
            this.updatePageLinks();
            this.updatePaginatorState();
        }
        if (simpleChange.rows) {
            this.updatePageLinks();
            this.updatePaginatorState();
        }
        if (simpleChange.rowsPerPageOptions) {
            this.updateRowsPerPageOptions();
        }
    }
    get first() {
        return this._first;
    }
    set first(val) {
        this._first = val;
    }
    updateRowsPerPageOptions() {
        if (this.rowsPerPageOptions) {
            this.rowsPerPageItems = [];
            for (let opt of this.rowsPerPageOptions) {
                if (typeof opt == 'object' && opt['showAll']) {
                    this.rowsPerPageItems.unshift({ label: opt['showAll'], value: this.totalRecords });
                }
                else {
                    this.rowsPerPageItems.push({ label: String(opt), value: opt });
                }
            }
        }
    }
    isFirstPage() {
        return this.getPage() === 0;
    }
    isLastPage() {
        return this.getPage() === this.getPageCount() - 1;
    }
    getPageCount() {
        return Math.ceil(this.totalRecords / this.rows) || 1;
    }
    calculatePageLinkBoundaries() {
        let numberOfPages = this.getPageCount(), visiblePages = Math.min(this.pageLinkSize, numberOfPages);
        //calculate range, keep current in middle if necessary
        let start = Math.max(0, Math.ceil(this.getPage() - ((visiblePages) / 2))), end = Math.min(numberOfPages - 1, start + visiblePages - 1);
        //check when approaching to last page
        var delta = this.pageLinkSize - (end - start + 1);
        start = Math.max(0, start - delta);
        return [start, end];
    }
    updatePageLinks() {
        this.pageLinks = [];
        let boundaries = this.calculatePageLinkBoundaries(), start = boundaries[0], end = boundaries[1];
        for (let i = start; i <= end; i++) {
            this.pageLinks.push(i + 1);
        }
    }
    changePage(p) {
        var pc = this.getPageCount();
        if (p >= 0 && p < pc) {
            this._first = this.rows * p;
            var state = {
                page: p,
                first: this.first,
                rows: this.rows,
                pageCount: pc
            };
            this.updatePageLinks();
            this.onPageChange.emit(state);
            this.updatePaginatorState();
        }
    }
    updateFirst() {
        const page = this.getPage();
        if (page > 0 && this.totalRecords && (this.first >= this.totalRecords)) {
            Promise.resolve(null).then(() => this.changePage(page - 1));
        }
    }
    getPage() {
        return Math.floor(this.first / this.rows);
    }
    changePageToFirst(event) {
        if (!this.isFirstPage()) {
            this.changePage(0);
        }
        event.preventDefault();
    }
    changePageToPrev(event) {
        this.changePage(this.getPage() - 1);
        event.preventDefault();
    }
    changePageToNext(event) {
        this.changePage(this.getPage() + 1);
        event.preventDefault();
    }
    changePageToLast(event) {
        if (!this.isLastPage()) {
            this.changePage(this.getPageCount() - 1);
        }
        event.preventDefault();
    }
    onPageLinkClick(event, page) {
        this.changePage(page);
        event.preventDefault();
    }
    onRppChange(event) {
        this.changePage(this.getPage());
    }
    updatePaginatorState() {
        this.paginatorState = {
            page: this.getPage(),
            pageCount: this.getPageCount(),
            rows: this.rows,
            first: this.first,
            totalRecords: this.totalRecords
        };
    }
    get currentPageReport() {
        return this.currentPageReportTemplate
            .replace("{currentPage}", String(this.getPage() + 1))
            .replace("{totalPages}", String(this.getPageCount()))
            .replace("{first}", String(this._first + 1))
            .replace("{last}", String(Math.min(this._first + this.rows, this.totalRecords)))
            .replace("{rows}", String(this.rows))
            .replace("{totalRecords}", String(this.totalRecords));
    }
};
Paginator.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], Paginator.prototype, "pageLinkSize", void 0);
__decorate([
    Output()
], Paginator.prototype, "onPageChange", void 0);
__decorate([
    Input()
], Paginator.prototype, "style", void 0);
__decorate([
    Input()
], Paginator.prototype, "styleClass", void 0);
__decorate([
    Input()
], Paginator.prototype, "alwaysShow", void 0);
__decorate([
    Input()
], Paginator.prototype, "templateLeft", void 0);
__decorate([
    Input()
], Paginator.prototype, "templateRight", void 0);
__decorate([
    Input()
], Paginator.prototype, "dropdownAppendTo", void 0);
__decorate([
    Input()
], Paginator.prototype, "dropdownScrollHeight", void 0);
__decorate([
    Input()
], Paginator.prototype, "currentPageReportTemplate", void 0);
__decorate([
    Input()
], Paginator.prototype, "showCurrentPageReport", void 0);
__decorate([
    Input()
], Paginator.prototype, "totalRecords", void 0);
__decorate([
    Input()
], Paginator.prototype, "rows", void 0);
__decorate([
    Input()
], Paginator.prototype, "rowsPerPageOptions", void 0);
__decorate([
    Input()
], Paginator.prototype, "first", null);
Paginator = __decorate([
    Component({
        selector: 'p-paginator',
        template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'ui-paginator ui-widget ui-widget-header ui-unselectable-text ui-helper-clearfix'"
            *ngIf="alwaysShow ? true : (pageLinks && pageLinks.length > 1)">
            <div class="ui-paginator-left-content" *ngIf="templateLeft">
                <ng-container *ngTemplateOutlet="templateLeft; context: {$implicit: paginatorState}"></ng-container>
            </div>
            <span class="ui-paginator-current" *ngIf="showCurrentPageReport">{{currentPageReport}}</span>
            <a [attr.tabindex]="isFirstPage() ? null : '0'" class="ui-paginator-first ui-paginator-element ui-state-default ui-corner-all"
                    (click)="changePageToFirst($event)" (keydown.enter)="changePageToFirst($event)" [ngClass]="{'ui-state-disabled':isFirstPage()}" [tabindex]="isFirstPage() ? -1 : null">
                <span class="ui-paginator-icon pi pi-step-backward"></span>
            </a>
            <a tabindex="0" [attr.tabindex]="isFirstPage() ? null : '0'" class="ui-paginator-prev ui-paginator-element ui-state-default ui-corner-all"
                    (click)="changePageToPrev($event)" (keydown.enter)="changePageToPrev($event)" [ngClass]="{'ui-state-disabled':isFirstPage()}" [tabindex]="isFirstPage() ? -1 : null">
                <span class="ui-paginator-icon pi pi-caret-left"></span>
            </a>
            <span class="ui-paginator-pages">
                <a tabindex="0" *ngFor="let pageLink of pageLinks" class="ui-paginator-page ui-paginator-element ui-state-default ui-corner-all"
                    (click)="onPageLinkClick($event, pageLink - 1)" (keydown.enter)="onPageLinkClick($event, pageLink - 1)" [ngClass]="{'ui-state-active': (pageLink-1 == getPage())}">{{pageLink}}</a>
            </span>
            <a [attr.tabindex]="isLastPage() ? null : '0'" class="ui-paginator-next ui-paginator-element ui-state-default ui-corner-all"
                    (click)="changePageToNext($event)" (keydown.enter)="changePageToNext($event)" [ngClass]="{'ui-state-disabled':isLastPage()}" [tabindex]="isLastPage() ? -1 : null">
                <span class="ui-paginator-icon pi pi-caret-right"></span>
            </a>
            <a [attr.tabindex]="isLastPage() ? null : '0'" class="ui-paginator-last ui-paginator-element ui-state-default ui-corner-all"
                    (click)="changePageToLast($event)" (keydown.enter)="changePageToLast($event)" [ngClass]="{'ui-state-disabled':isLastPage()}" [tabindex]="isLastPage() ? -1 : null">
                <span class="ui-paginator-icon pi pi-step-forward"></span>
            </a>
            <p-dropdown [options]="rowsPerPageItems" [(ngModel)]="rows" *ngIf="rowsPerPageOptions" 
                (onChange)="onRppChange($event)" [appendTo]="dropdownAppendTo" [scrollHeight]="dropdownScrollHeight"></p-dropdown>
            <div class="ui-paginator-right-content" *ngIf="templateRight">
                <ng-container *ngTemplateOutlet="templateRight; context: {$implicit: paginatorState}"></ng-container>
            </div>
        </div>
    `,
        changeDetection: ChangeDetectionStrategy.Default
    })
], Paginator);
export { Paginator };
let PaginatorModule = class PaginatorModule {
};
PaginatorModule = __decorate([
    NgModule({
        imports: [CommonModule, DropdownModule, FormsModule, SharedModule],
        exports: [Paginator, DropdownModule, FormsModule, SharedModule],
        declarations: [Paginator]
    })
], PaginatorModule);
export { PaginatorModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9wYWdpbmF0b3IvIiwic291cmNlcyI6WyJwYWdpbmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsaUJBQWlCLEVBQUMsWUFBWSxFQUFDLFdBQVcsRUFBQyxTQUFTLEVBQUMsYUFBYSxFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2hLLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRWhELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxhQUFhLENBQUM7QUF3Q3pDLElBQWEsU0FBUyxHQUF0QixNQUFhLFNBQVM7SUFzQ2xCLFlBQW9CLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBcENoQyxpQkFBWSxHQUFXLENBQUMsQ0FBQztRQUV4QixpQkFBWSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBTXRELGVBQVUsR0FBWSxJQUFJLENBQUM7UUFRM0IseUJBQW9CLEdBQVcsT0FBTyxDQUFDO1FBRXZDLDhCQUF5QixHQUFXLCtCQUErQixDQUFDO1FBSXBFLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBRXpCLFNBQUksR0FBVyxDQUFDLENBQUM7UUFVMUIsV0FBTSxHQUFXLENBQUMsQ0FBQztJQUV5QixDQUFDO0lBRTdDLFFBQVE7UUFDSixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsV0FBVyxDQUFDLFlBQTJCO1FBQ25DLElBQUksWUFBWSxDQUFDLFlBQVksRUFBRTtZQUMzQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7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Q1csZUFBZSxDQUFJO1NBQW5CLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxPbkluaXQsSW5wdXQsT3V0cHV0LENoYW5nZURldGVjdG9yUmVmLEV2ZW50RW1pdHRlcixUZW1wbGF0ZVJlZixPbkNoYW5nZXMsU2ltcGxlQ2hhbmdlcyxDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge0Zvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7RHJvcGRvd25Nb2R1bGV9IGZyb20gJ3ByaW1lbmcvZHJvcGRvd24nO1xyXG5pbXBvcnQge1NlbGVjdEl0ZW19IGZyb20gJ3ByaW1lbmcvYXBpJztcclxuaW1wb3J0IHtTaGFyZWRNb2R1bGV9IGZyb20gJ3ByaW1lbmcvYXBpJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLXBhZ2luYXRvcicsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtuZ0NsYXNzXT1cIid1aS1wYWdpbmF0b3IgdWktd2lkZ2V0IHVpLXdpZGdldC1oZWFkZXIgdWktdW5zZWxlY3RhYmxlLXRleHQgdWktaGVscGVyLWNsZWFyZml4J1wiXHJcbiAgICAgICAgICAgICpuZ0lmPVwiYWx3YXlzU2hvdyA/IHRydWUgOiAocGFnZUxpbmtzICYmIHBhZ2VMaW5rcy5sZW5ndGggPiAxKVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktcGFnaW5hdG9yLWxlZnQtY29udGVudFwiICpuZ0lmPVwidGVtcGxhdGVMZWZ0XCI+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGVMZWZ0OyBjb250ZXh0OiB7JGltcGxpY2l0OiBwYWdpbmF0b3JTdGF0ZX1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktcGFnaW5hdG9yLWN1cnJlbnRcIiAqbmdJZj1cInNob3dDdXJyZW50UGFnZVJlcG9ydFwiPnt7Y3VycmVudFBhZ2VSZXBvcnR9fTwvc3Bhbj5cclxuICAgICAgICAgICAgPGEgW2F0dHIudGFiaW5kZXhdPVwiaXNGaXJzdFBhZ2UoKSA/IG51bGwgOiAnMCdcIiBjbGFzcz1cInVpLXBhZ2luYXRvci1maXJzdCB1aS1wYWdpbmF0b3ItZWxlbWVudCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGxcIlxyXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZ2VQYWdlVG9GaXJzdCgkZXZlbnQpXCIgKGtleWRvd24uZW50ZXIpPVwiY2hhbmdlUGFnZVRvRmlyc3QoJGV2ZW50KVwiIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtZGlzYWJsZWQnOmlzRmlyc3RQYWdlKCl9XCIgW3RhYmluZGV4XT1cImlzRmlyc3RQYWdlKCkgPyAtMSA6IG51bGxcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktcGFnaW5hdG9yLWljb24gcGkgcGktc3RlcC1iYWNrd2FyZFwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICA8YSB0YWJpbmRleD1cIjBcIiBbYXR0ci50YWJpbmRleF09XCJpc0ZpcnN0UGFnZSgpID8gbnVsbCA6ICcwJ1wiIGNsYXNzPVwidWktcGFnaW5hdG9yLXByZXYgdWktcGFnaW5hdG9yLWVsZW1lbnQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsXCJcclxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2hhbmdlUGFnZVRvUHJldigkZXZlbnQpXCIgKGtleWRvd24uZW50ZXIpPVwiY2hhbmdlUGFnZVRvUHJldigkZXZlbnQpXCIgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1kaXNhYmxlZCc6aXNGaXJzdFBhZ2UoKX1cIiBbdGFiaW5kZXhdPVwiaXNGaXJzdFBhZ2UoKSA/IC0xIDogbnVsbFwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1wYWdpbmF0b3ItaWNvbiBwaSBwaS1jYXJldC1sZWZ0XCI+PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktcGFnaW5hdG9yLXBhZ2VzXCI+XHJcbiAgICAgICAgICAgICAgICA8YSB0YWJpbmRleD1cIjBcIiAqbmdGb3I9XCJsZXQgcGFnZUxpbmsgb2YgcGFnZUxpbmtzXCIgY2xhc3M9XCJ1aS1wYWdpbmF0b3ItcGFnZSB1aS1wYWdpbmF0b3ItZWxlbWVudCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGxcIlxyXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvblBhZ2VMaW5rQ2xpY2soJGV2ZW50LCBwYWdlTGluayAtIDEpXCIgKGtleWRvd24uZW50ZXIpPVwib25QYWdlTGlua0NsaWNrKCRldmVudCwgcGFnZUxpbmsgLSAxKVwiIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtYWN0aXZlJzogKHBhZ2VMaW5rLTEgPT0gZ2V0UGFnZSgpKX1cIj57e3BhZ2VMaW5rfX08L2E+XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPGEgW2F0dHIudGFiaW5kZXhdPVwiaXNMYXN0UGFnZSgpID8gbnVsbCA6ICcwJ1wiIGNsYXNzPVwidWktcGFnaW5hdG9yLW5leHQgdWktcGFnaW5hdG9yLWVsZW1lbnQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsXCJcclxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2hhbmdlUGFnZVRvTmV4dCgkZXZlbnQpXCIgKGtleWRvd24uZW50ZXIpPVwiY2hhbmdlUGFnZVRvTmV4dCgkZXZlbnQpXCIgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1kaXNhYmxlZCc6aXNMYXN0UGFnZSgpfVwiIFt0YWJpbmRleF09XCJpc0xhc3RQYWdlKCkgPyAtMSA6IG51bGxcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktcGFnaW5hdG9yLWljb24gcGkgcGktY2FyZXQtcmlnaHRcIj48L3NwYW4+XHJcbiAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgPGEgW2F0dHIudGFiaW5kZXhdPVwiaXNMYXN0UGFnZSgpID8gbnVsbCA6ICcwJ1wiIGNsYXNzPVwidWktcGFnaW5hdG9yLWxhc3QgdWktcGFnaW5hdG9yLWVsZW1lbnQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsXCJcclxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2hhbmdlUGFnZVRvTGFzdCgkZXZlbnQpXCIgKGtleWRvd24uZW50ZXIpPVwiY2hhbmdlUGFnZVRvTGFzdCgkZXZlbnQpXCIgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1kaXNhYmxlZCc6aXNMYXN0UGFnZSgpfVwiIFt0YWJpbmRleF09XCJpc0xhc3RQYWdlKCkgPyAtMSA6IG51bGxcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktcGFnaW5hdG9yLWljb24gcGkgcGktc3RlcC1mb3J3YXJkXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgIDxwLWRyb3Bkb3duIFtvcHRpb25zXT1cInJvd3NQZXJQYWdlSXRlbXNcIiBbKG5nTW9kZWwpXT1cInJvd3NcIiAqbmdJZj1cInJvd3NQZXJQYWdlT3B0aW9uc1wiIFxyXG4gICAgICAgICAgICAgICAgKG9uQ2hhbmdlKT1cIm9uUnBwQ2hhbmdlKCRldmVudClcIiBbYXBwZW5kVG9dPVwiZHJvcGRvd25BcHBlbmRUb1wiIFtzY3JvbGxIZWlnaHRdPVwiZHJvcGRvd25TY3JvbGxIZWlnaHRcIj48L3AtZHJvcGRvd24+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1wYWdpbmF0b3ItcmlnaHQtY29udGVudFwiICpuZ0lmPVwidGVtcGxhdGVSaWdodFwiPlxyXG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlUmlnaHQ7IGNvbnRleHQ6IHskaW1wbGljaXQ6IHBhZ2luYXRvclN0YXRlfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcclxufSlcclxuZXhwb3J0IGNsYXNzIFBhZ2luYXRvciBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuXHJcbiAgICBASW5wdXQoKSBwYWdlTGlua1NpemU6IG51bWJlciA9IDU7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uUGFnZUNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgYWx3YXlzU2hvdzogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHRlbXBsYXRlTGVmdDogVGVtcGxhdGVSZWY8YW55PjtcclxuICAgIFxyXG4gICAgQElucHV0KCkgdGVtcGxhdGVSaWdodDogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgICBASW5wdXQoKSBkcm9wZG93bkFwcGVuZFRvOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgZHJvcGRvd25TY3JvbGxIZWlnaHQ6IHN0cmluZyA9ICcyMDBweCc7XHJcblxyXG4gICAgQElucHV0KCkgY3VycmVudFBhZ2VSZXBvcnRUZW1wbGF0ZTogc3RyaW5nID0gJ3tjdXJyZW50UGFnZX0gb2Yge3RvdGFsUGFnZXN9JztcclxuXHJcbiAgICBASW5wdXQoKSBzaG93Q3VycmVudFBhZ2VSZXBvcnQ6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgdG90YWxSZWNvcmRzOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIEBJbnB1dCgpIHJvd3M6IG51bWJlciA9IDA7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHJvd3NQZXJQYWdlT3B0aW9uczogYW55W107XHJcblxyXG4gICAgcGFnZUxpbmtzOiBudW1iZXJbXTtcclxuXHJcbiAgICByb3dzUGVyUGFnZUl0ZW1zOiBTZWxlY3RJdGVtW107XHJcbiAgICBcclxuICAgIHBhZ2luYXRvclN0YXRlOiBhbnk7XHJcblxyXG4gICAgX2ZpcnN0OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7fVxyXG4gICAgXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVBhZ2luYXRvclN0YXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoc2ltcGxlQ2hhbmdlOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS50b3RhbFJlY29yZHMpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVQYWdlTGlua3MoKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVQYWdpbmF0b3JTdGF0ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZpcnN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUm93c1BlclBhZ2VPcHRpb25zKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLmZpcnN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcnN0ID0gc2ltcGxlQ2hhbmdlLmZpcnN0LmN1cnJlbnRWYWx1ZTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVQYWdlTGlua3MoKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVQYWdpbmF0b3JTdGF0ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS5yb3dzKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGFnZUxpbmtzKCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGFnaW5hdG9yU3RhdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2Uucm93c1BlclBhZ2VPcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUm93c1BlclBhZ2VPcHRpb25zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIGdldCBmaXJzdCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9maXJzdDtcclxuICAgIH1cclxuICAgIHNldCBmaXJzdCh2YWw6bnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fZmlyc3QgPSB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlUm93c1BlclBhZ2VPcHRpb25zKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnJvd3NQZXJQYWdlT3B0aW9ucykge1xyXG4gICAgICAgICAgICB0aGlzLnJvd3NQZXJQYWdlSXRlbXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgb3B0IG9mIHRoaXMucm93c1BlclBhZ2VPcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdCA9PSAnb2JqZWN0JyAmJiBvcHRbJ3Nob3dBbGwnXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm93c1BlclBhZ2VJdGVtcy51bnNoaWZ0KHtsYWJlbDogb3B0WydzaG93QWxsJ10sIHZhbHVlOiB0aGlzLnRvdGFsUmVjb3Jkc30pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3dzUGVyUGFnZUl0ZW1zLnB1c2goe2xhYmVsOiBTdHJpbmcob3B0KSwgdmFsdWU6IG9wdH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlzRmlyc3RQYWdlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhZ2UoKSA9PT0gMDtcclxuICAgIH1cclxuXHJcbiAgICBpc0xhc3RQYWdlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhZ2UoKSA9PT0gdGhpcy5nZXRQYWdlQ291bnQoKSAtIDE7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGFnZUNvdW50KCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwodGhpcy50b3RhbFJlY29yZHMvdGhpcy5yb3dzKXx8MTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxjdWxhdGVQYWdlTGlua0JvdW5kYXJpZXMoKSB7XHJcbiAgICAgICAgbGV0IG51bWJlck9mUGFnZXMgPSB0aGlzLmdldFBhZ2VDb3VudCgpLFxyXG4gICAgICAgIHZpc2libGVQYWdlcyA9IE1hdGgubWluKHRoaXMucGFnZUxpbmtTaXplLCBudW1iZXJPZlBhZ2VzKTtcclxuXHJcbiAgICAgICAgLy9jYWxjdWxhdGUgcmFuZ2UsIGtlZXAgY3VycmVudCBpbiBtaWRkbGUgaWYgbmVjZXNzYXJ5XHJcbiAgICAgICAgbGV0IHN0YXJ0ID0gTWF0aC5tYXgoMCwgTWF0aC5jZWlsKHRoaXMuZ2V0UGFnZSgpIC0gKCh2aXNpYmxlUGFnZXMpIC8gMikpKSxcclxuICAgICAgICBlbmQgPSBNYXRoLm1pbihudW1iZXJPZlBhZ2VzIC0gMSwgc3RhcnQgKyB2aXNpYmxlUGFnZXMgLSAxKTtcclxuXHJcbiAgICAgICAgLy9jaGVjayB3aGVuIGFwcHJvYWNoaW5nIHRvIGxhc3QgcGFnZVxyXG4gICAgICAgIHZhciBkZWx0YSA9IHRoaXMucGFnZUxpbmtTaXplIC0gKGVuZCAtIHN0YXJ0ICsgMSk7XHJcbiAgICAgICAgc3RhcnQgPSBNYXRoLm1heCgwLCBzdGFydCAtIGRlbHRhKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFtzdGFydCwgZW5kXTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVQYWdlTGlua3MoKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlTGlua3MgPSBbXTtcclxuICAgICAgICBsZXQgYm91bmRhcmllcyA9IHRoaXMuY2FsY3VsYXRlUGFnZUxpbmtCb3VuZGFyaWVzKCksXHJcbiAgICAgICAgc3RhcnQgPSBib3VuZGFyaWVzWzBdLFxyXG4gICAgICAgIGVuZCA9IGJvdW5kYXJpZXNbMV07XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IHN0YXJ0OyBpIDw9IGVuZDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZUxpbmtzLnB1c2goaSArIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VQYWdlKHAgOm51bWJlcikge1xyXG4gICAgICAgIHZhciBwYyA9IHRoaXMuZ2V0UGFnZUNvdW50KCk7XHJcblxyXG4gICAgICAgIGlmIChwID49IDAgJiYgcCA8IHBjKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpcnN0ID0gdGhpcy5yb3dzICogcDtcclxuICAgICAgICAgICAgdmFyIHN0YXRlID0ge1xyXG4gICAgICAgICAgICAgICAgcGFnZTogcCxcclxuICAgICAgICAgICAgICAgIGZpcnN0OiB0aGlzLmZpcnN0LFxyXG4gICAgICAgICAgICAgICAgcm93czogdGhpcy5yb3dzLFxyXG4gICAgICAgICAgICAgICAgcGFnZUNvdW50OiBwY1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBhZ2VMaW5rcygpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5vblBhZ2VDaGFuZ2UuZW1pdChzdGF0ZSk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGFnaW5hdG9yU3RhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlRmlyc3QoKSB7XHJcbiAgICAgICAgY29uc3QgcGFnZSA9IHRoaXMuZ2V0UGFnZSgpO1xyXG4gICAgICAgIGlmIChwYWdlID4gMCAmJiB0aGlzLnRvdGFsUmVjb3JkcyAmJiAodGhpcy5maXJzdCA+PSB0aGlzLnRvdGFsUmVjb3JkcykpIHtcclxuICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKG51bGwpLnRoZW4oKCkgPT4gdGhpcy5jaGFuZ2VQYWdlKHBhZ2UgLSAxKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFBhZ2UoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLmZpcnN0IC8gdGhpcy5yb3dzKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VQYWdlVG9GaXJzdChldmVudCkge1xyXG4gICAgICBpZiAoIXRoaXMuaXNGaXJzdFBhZ2UoKSl7XHJcbiAgICAgICAgICB0aGlzLmNoYW5nZVBhZ2UoMCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlUGFnZVRvUHJldihldmVudCkge1xyXG4gICAgICAgIHRoaXMuY2hhbmdlUGFnZSh0aGlzLmdldFBhZ2UoKSAtIDEpO1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlUGFnZVRvTmV4dChldmVudCkge1xyXG4gICAgICAgIHRoaXMuY2hhbmdlUGFnZSh0aGlzLmdldFBhZ2UoKSAgKyAxKTtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVBhZ2VUb0xhc3QoZXZlbnQpIHtcclxuICAgICAgaWYgKCF0aGlzLmlzTGFzdFBhZ2UoKSl7XHJcbiAgICAgICAgICB0aGlzLmNoYW5nZVBhZ2UodGhpcy5nZXRQYWdlQ291bnQoKSAtIDEpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUGFnZUxpbmtDbGljayhldmVudCwgcGFnZSkge1xyXG4gICAgICAgIHRoaXMuY2hhbmdlUGFnZShwYWdlKTtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUnBwQ2hhbmdlKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VQYWdlKHRoaXMuZ2V0UGFnZSgpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdXBkYXRlUGFnaW5hdG9yU3RhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5wYWdpbmF0b3JTdGF0ZSA9IHtcclxuICAgICAgICAgICAgcGFnZTogdGhpcy5nZXRQYWdlKCksXHJcbiAgICAgICAgICAgIHBhZ2VDb3VudDogdGhpcy5nZXRQYWdlQ291bnQoKSxcclxuICAgICAgICAgICAgcm93czogdGhpcy5yb3dzLFxyXG4gICAgICAgICAgICBmaXJzdDogdGhpcy5maXJzdCxcclxuICAgICAgICAgICAgdG90YWxSZWNvcmRzOiB0aGlzLnRvdGFsUmVjb3Jkc1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgY3VycmVudFBhZ2VSZXBvcnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFBhZ2VSZXBvcnRUZW1wbGF0ZVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoXCJ7Y3VycmVudFBhZ2V9XCIsIFN0cmluZyh0aGlzLmdldFBhZ2UoKSArIDEpKVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoXCJ7dG90YWxQYWdlc31cIiwgU3RyaW5nKHRoaXMuZ2V0UGFnZUNvdW50KCkpKVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoXCJ7Zmlyc3R9XCIsIFN0cmluZyh0aGlzLl9maXJzdCArIDEpKVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoXCJ7bGFzdH1cIiwgU3RyaW5nKE1hdGgubWluKHRoaXMuX2ZpcnN0ICsgdGhpcy5yb3dzLCB0aGlzLnRvdGFsUmVjb3JkcykpKVxyXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoXCJ7cm93c31cIiwgU3RyaW5nKHRoaXMucm93cykpXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZShcInt0b3RhbFJlY29yZHN9XCIsIFN0cmluZyh0aGlzLnRvdGFsUmVjb3JkcykpO1xyXG4gICAgfVxyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSxEcm9wZG93bk1vZHVsZSxGb3Jtc01vZHVsZSxTaGFyZWRNb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW1BhZ2luYXRvcixEcm9wZG93bk1vZHVsZSxGb3Jtc01vZHVsZSxTaGFyZWRNb2R1bGVdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbUGFnaW5hdG9yXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGFnaW5hdG9yTW9kdWxlIHsgfVxyXG4iXX0=