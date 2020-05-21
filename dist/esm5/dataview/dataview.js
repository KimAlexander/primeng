var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, OnInit, AfterContentInit, Input, Output, EventEmitter, ContentChild, ContentChildren, QueryList, TemplateRef, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectUtils } from 'primeng/utils';
import { Header, Footer, PrimeTemplate, SharedModule } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { FilterUtils } from 'primeng/utils';
var DataView = /** @class */ (function () {
    function DataView(el) {
        this.el = el;
        this.layout = 'list';
        this.pageLinks = 5;
        this.paginatorPosition = 'bottom';
        this.alwaysShowPaginator = true;
        this.paginatorDropdownScrollHeight = '200px';
        this.currentPageReportTemplate = '{currentPage} of {totalPages}';
        this.emptyMessage = 'No records found';
        this.onLazyLoad = new EventEmitter();
        this.trackBy = function (index, item) { return item; };
        this.loadingIcon = 'pi pi-spinner';
        this.first = 0;
        this.onPage = new EventEmitter();
        this.onSort = new EventEmitter();
        this.onChangeLayout = new EventEmitter();
    }
    DataView.prototype.ngOnInit = function () {
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        this.initialized = true;
    };
    DataView.prototype.ngOnChanges = function (simpleChanges) {
        if (simpleChanges.value) {
            this._value = simpleChanges.value.currentValue;
            this.updateTotalRecords();
            if (!this.lazy && this.hasFilter()) {
                this.filter(this.filterValue);
            }
        }
        if (simpleChanges.sortField || simpleChanges.sortOrder) {
            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                this.sort();
            }
        }
    };
    DataView.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'listItem':
                    _this.listItemTemplate = item.template;
                    break;
                case 'gridItem':
                    _this.gridItemTemplate = item.template;
                    break;
                case 'paginatorleft':
                    _this.paginatorLeftTemplate = item.template;
                    break;
                case 'paginatorright':
                    _this.paginatorRightTemplate = item.template;
                    break;
            }
        });
        this.updateItemTemplate();
    };
    DataView.prototype.updateItemTemplate = function () {
        switch (this.layout) {
            case 'list':
                this.itemTemplate = this.listItemTemplate;
                break;
            case 'grid':
                this.itemTemplate = this.gridItemTemplate;
                break;
        }
    };
    DataView.prototype.changeLayout = function (layout) {
        this.layout = layout;
        this.onChangeLayout.emit({
            layout: this.layout
        });
        this.updateItemTemplate();
    };
    DataView.prototype.updateTotalRecords = function () {
        this.totalRecords = this.lazy ? this.totalRecords : (this._value ? this._value.length : 0);
    };
    DataView.prototype.paginate = function (event) {
        this.first = event.first;
        this.rows = event.rows;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        this.onPage.emit({
            first: this.first,
            rows: this.rows
        });
    };
    DataView.prototype.sort = function () {
        var _this = this;
        this.first = 0;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else if (this.value) {
            this.value.sort(function (data1, data2) {
                var value1 = ObjectUtils.resolveFieldData(data1, _this.sortField);
                var value2 = ObjectUtils.resolveFieldData(data2, _this.sortField);
                var result = null;
                if (value1 == null && value2 != null)
                    result = -1;
                else if (value1 != null && value2 == null)
                    result = 1;
                else if (value1 == null && value2 == null)
                    result = 0;
                else if (typeof value1 === 'string' && typeof value2 === 'string')
                    result = value1.localeCompare(value2);
                else
                    result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
                return (_this.sortOrder * result);
            });
            if (this.hasFilter()) {
                this.filter(this.filterValue);
            }
        }
        this.onSort.emit({
            sortField: this.sortField,
            sortOrder: this.sortOrder
        });
    };
    DataView.prototype.isEmpty = function () {
        var data = this.filteredValue || this.value;
        return data == null || data.length == 0;
    };
    DataView.prototype.createLazyLoadMetadata = function () {
        return {
            first: this.first,
            rows: this.rows,
            sortField: this.sortField,
            sortOrder: this.sortOrder
        };
    };
    DataView.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    DataView.prototype.filter = function (filter, filterMatchMode) {
        if (filterMatchMode === void 0) { filterMatchMode = "contains"; }
        this.filterValue = filter;
        if (this.value && this.value.length) {
            var searchFields = this.filterBy.split(',');
            this.filteredValue = FilterUtils.filter(this.value, searchFields, filter, filterMatchMode, this.filterLocale);
            if (this.filteredValue.length === this.value.length) {
                this.filteredValue = null;
            }
            if (this.paginator) {
                this.first = 0;
                this.totalRecords = this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0;
            }
        }
    };
    DataView.prototype.hasFilter = function () {
        return this.filterValue && this.filterValue.trim().length > 0;
    };
    DataView.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], DataView.prototype, "layout", void 0);
    __decorate([
        Input()
    ], DataView.prototype, "paginator", void 0);
    __decorate([
        Input()
    ], DataView.prototype, "rows", void 0);
    __decorate([
        Input()
    ], DataView.prototype, "totalRecords", void 0);
    __decorate([
        Input()
    ], DataView.prototype, "pageLinks", void 0);
    __decorate([
        Input()
    ], DataView.prototype, "rowsPerPageOptions", void 0);
    __decorate([
        Input()
    ], DataView.prototype, "paginatorPosition", void 0);
    __decorate([
        Input()
    ], DataView.prototype, "alwaysShowPaginator", void 0);
    __decorate([
        Input()
    ], DataView.prototype, "paginatorDropdownAppendTo", void 0);
    __decorate([
        Input()
    ], DataView.prototype, "paginatorDropdownScrollHeight", void 0);
    __decorate([
        Input()
    ], DataView.prototype, "currentPageReportTemplate", void 0);
    __decorate([
        Input()
    ], DataView.prototype, "showCurrentPageReport", void 0);
    __decorate([
        Input()
    ], DataView.prototype, "lazy", void 0);
    __decorate([
        Input()
    ], DataView.prototype, "emptyMessage", void 0);
    __decorate([
        Output()
    ], DataView.prototype, "onLazyLoad", void 0);
    __decorate([
        Input()
    ], DataView.prototype, "style", void 0);
    __decorate([
        Input()
    ], DataView.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], DataView.prototype, "trackBy", void 0);
    __decorate([
        Input()
    ], DataView.prototype, "filterBy", void 0);
    __decorate([
        Input()
    ], DataView.prototype, "filterLocale", void 0);
    __decorate([
        Input()
    ], DataView.prototype, "loading", void 0);
    __decorate([
        Input()
    ], DataView.prototype, "loadingIcon", void 0);
    __decorate([
        Input()
    ], DataView.prototype, "first", void 0);
    __decorate([
        Input()
    ], DataView.prototype, "sortField", void 0);
    __decorate([
        Input()
    ], DataView.prototype, "sortOrder", void 0);
    __decorate([
        Input()
    ], DataView.prototype, "value", void 0);
    __decorate([
        Output()
    ], DataView.prototype, "onPage", void 0);
    __decorate([
        Output()
    ], DataView.prototype, "onSort", void 0);
    __decorate([
        Output()
    ], DataView.prototype, "onChangeLayout", void 0);
    __decorate([
        ContentChild(Header)
    ], DataView.prototype, "header", void 0);
    __decorate([
        ContentChild(Footer)
    ], DataView.prototype, "footer", void 0);
    __decorate([
        ContentChildren(PrimeTemplate)
    ], DataView.prototype, "templates", void 0);
    DataView = __decorate([
        Component({
            selector: 'p-dataView',
            template: "\n        <div [ngClass]=\"{'ui-dataview ui-widget': true, 'ui-dataview-list': (layout === 'list'), 'ui-dataview-grid': (layout === 'grid')}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-dataview-loading ui-widget-overlay\" *ngIf=\"loading\"></div>\n            <div class=\"ui-dataview-loading-content\" *ngIf=\"loading\">\n                <i [class]=\"'ui-dataview-loading-icon pi-spin ' + loadingIcon\"></i>\n            </div>\n            <div class=\"ui-dataview-header ui-widget-header ui-corner-top\">\n                <ng-content select=\"p-header\"></ng-content>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"paginate($event)\" styleClass=\"ui-paginator-top\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'top' || paginatorPosition =='both')\"\n                [dropdownAppendTo]=\"paginatorDropdownAppendTo\" [dropdownScrollHeight]=\"paginatorDropdownScrollHeight\" [templateLeft]=\"paginatorLeftTemplate\" [templateRight]=\"paginatorRightTemplate\"\n                [currentPageReportTemplate]=\"currentPageReportTemplate\" [showCurrentPageReport]=\"showCurrentPageReport\"></p-paginator>\n            <div class=\"ui-dataview-content ui-widget-content\">\n                <div class=\"ui-g\">\n                    <ng-template ngFor let-rowData let-rowIndex=\"index\" [ngForOf]=\"paginator ? ((filteredValue||value) | slice:(lazy ? 0 : first):((lazy ? 0 : first) + rows)) : (filteredValue||value)\" [ngForTrackBy]=\"trackBy\">\n                        <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: rowData, rowIndex: rowIndex}\"></ng-container>\n                    </ng-template>\n                    <div *ngIf=\"isEmpty()\" class=\"ui-g-12 ui-dataview-emptymessage\">{{emptyMessage}}</div>\n                </div>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"paginate($event)\" styleClass=\"ui-paginator-bottom\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')\"\n                [dropdownAppendTo]=\"paginatorDropdownAppendTo\" [dropdownScrollHeight]=\"paginatorDropdownScrollHeight\" [templateLeft]=\"paginatorLeftTemplate\" [templateRight]=\"paginatorRightTemplate\"\n                [currentPageReportTemplate]=\"currentPageReportTemplate\" [showCurrentPageReport]=\"showCurrentPageReport\"></p-paginator>\n            <div class=\"ui-dataview-footer ui-widget-header ui-corner-bottom\" *ngIf=\"footer\">\n                <ng-content select=\"p-footer\"></ng-content>\n            </div>\n        </div>\n    ",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], DataView);
    return DataView;
}());
export { DataView };
var DataViewLayoutOptions = /** @class */ (function () {
    function DataViewLayoutOptions(dv) {
        this.dv = dv;
    }
    DataViewLayoutOptions.prototype.changeLayout = function (event, layout) {
        this.dv.changeLayout(layout);
        event.preventDefault();
    };
    DataViewLayoutOptions.ctorParameters = function () { return [
        { type: DataView }
    ]; };
    __decorate([
        Input()
    ], DataViewLayoutOptions.prototype, "style", void 0);
    __decorate([
        Input()
    ], DataViewLayoutOptions.prototype, "styleClass", void 0);
    DataViewLayoutOptions = __decorate([
        Component({
            selector: 'p-dataViewLayoutOptions',
            template: "\n        <div [ngClass]=\"'ui-dataview-layout-options ui-selectbutton ui-buttonset'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <a tabindex=\"0\" class=\"ui-button ui-button-icon-only ui-state-default\" (click)=\"changeLayout($event, 'list')\" (keydown.enter)=\"changeLayout($event, 'list')\"\n                [ngClass]=\"{'ui-state-active': dv.layout === 'list'}\">\n                <i class=\"pi pi-bars ui-button-icon-left\"></i>\n                <span class=\"ui-button-text ui-clickable\">ui-btn</span>\n            </a><a tabindex=\"0\" class=\"ui-button ui-button-icon-only ui-state-default\" (click)=\"changeLayout($event, 'grid')\" (keydown.enter)=\"changeLayout($event, 'grid')\"\n                [ngClass]=\"{'ui-state-active': dv.layout === 'grid'}\">\n                <i class=\"pi pi-th-large ui-button-icon-left\"></i>\n                <span class=\"ui-button-text ui-clickable\">ui-btn</span>\n            </a>\n        </div>\n    "
        })
    ], DataViewLayoutOptions);
    return DataViewLayoutOptions;
}());
export { DataViewLayoutOptions };
var DataViewModule = /** @class */ (function () {
    function DataViewModule() {
    }
    DataViewModule = __decorate([
        NgModule({
            imports: [CommonModule, SharedModule, PaginatorModule],
            exports: [DataView, SharedModule, DataViewLayoutOptions],
            declarations: [DataView, DataViewLayoutOptions]
        })
    ], DataViewModule);
    return DataViewModule;
}());
export { DataViewModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXZpZXcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2RhdGF2aWV3LyIsInNvdXJjZXMiOlsiZGF0YXZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxnQkFBZ0IsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxZQUFZLEVBQUMsZUFBZSxFQUFDLFNBQVMsRUFBQyxXQUFXLEVBQUMsU0FBUyxFQUFDLGFBQWEsRUFBQyx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqTixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUVsRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBb0MxQztJQW9GSSxrQkFBbUIsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7UUFsRnhCLFdBQU0sR0FBVyxNQUFNLENBQUM7UUFReEIsY0FBUyxHQUFXLENBQUMsQ0FBQztRQUl0QixzQkFBaUIsR0FBVyxRQUFRLENBQUM7UUFFckMsd0JBQW1CLEdBQVksSUFBSSxDQUFDO1FBSXBDLGtDQUE2QixHQUFXLE9BQU8sQ0FBQztRQUVoRCw4QkFBeUIsR0FBVywrQkFBK0IsQ0FBQztRQU1wRSxpQkFBWSxHQUFXLGtCQUFrQixDQUFDO1FBRXpDLGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQU1wRCxZQUFPLEdBQWEsVUFBQyxLQUFhLEVBQUUsSUFBUyxJQUFLLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBQztR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T0FBTyxFQUFFLENBQUMsUUFBUSxFQUFDLFlBQVksRUFBQyxxQkFBcUIsQ0FBQztZQUN0RCxZQUFZLEVBQUUsQ0FBQyxRQUFRLEVBQUMscUJBQXFCLENBQUM7U0FDakQsQ0FBQztPQUNXLGNBQWMsQ0FBSTtJQUFELHFCQUFDO0NBQUEsQUFBL0IsSUFBK0I7U0FBbEIsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LEVsZW1lbnRSZWYsT25Jbml0LEFmdGVyQ29udGVudEluaXQsSW5wdXQsT3V0cHV0LEV2ZW50RW1pdHRlcixDb250ZW50Q2hpbGQsQ29udGVudENoaWxkcmVuLFF1ZXJ5TGlzdCxUZW1wbGF0ZVJlZixPbkNoYW5nZXMsU2ltcGxlQ2hhbmdlcyxDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge09iamVjdFV0aWxzfSBmcm9tICdwcmltZW5nL3V0aWxzJztcclxuaW1wb3J0IHtIZWFkZXIsRm9vdGVyLFByaW1lVGVtcGxhdGUsU2hhcmVkTW9kdWxlfSBmcm9tICdwcmltZW5nL2FwaSc7XHJcbmltcG9ydCB7UGFnaW5hdG9yTW9kdWxlfSBmcm9tICdwcmltZW5nL3BhZ2luYXRvcic7XHJcbmltcG9ydCB7QmxvY2thYmxlVUl9IGZyb20gJ3ByaW1lbmcvYXBpJztcclxuaW1wb3J0IHtGaWx0ZXJVdGlsc30gZnJvbSAncHJpbWVuZy91dGlscyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC1kYXRhVmlldycsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyd1aS1kYXRhdmlldyB1aS13aWRnZXQnOiB0cnVlLCAndWktZGF0YXZpZXctbGlzdCc6IChsYXlvdXQgPT09ICdsaXN0JyksICd1aS1kYXRhdmlldy1ncmlkJzogKGxheW91dCA9PT0gJ2dyaWQnKX1cIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1kYXRhdmlldy1sb2FkaW5nIHVpLXdpZGdldC1vdmVybGF5XCIgKm5nSWY9XCJsb2FkaW5nXCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1kYXRhdmlldy1sb2FkaW5nLWNvbnRlbnRcIiAqbmdJZj1cImxvYWRpbmdcIj5cclxuICAgICAgICAgICAgICAgIDxpIFtjbGFzc109XCIndWktZGF0YXZpZXctbG9hZGluZy1pY29uIHBpLXNwaW4gJyArIGxvYWRpbmdJY29uXCI+PC9pPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWRhdGF2aWV3LWhlYWRlciB1aS13aWRnZXQtaGVhZGVyIHVpLWNvcm5lci10b3BcIj5cclxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtaGVhZGVyXCI+PC9uZy1jb250ZW50PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPHAtcGFnaW5hdG9yIFtyb3dzXT1cInJvd3NcIiBbZmlyc3RdPVwiZmlyc3RcIiBbdG90YWxSZWNvcmRzXT1cInRvdGFsUmVjb3Jkc1wiIFtwYWdlTGlua1NpemVdPVwicGFnZUxpbmtzXCIgW2Fsd2F5c1Nob3ddPVwiYWx3YXlzU2hvd1BhZ2luYXRvclwiXHJcbiAgICAgICAgICAgICAgICAob25QYWdlQ2hhbmdlKT1cInBhZ2luYXRlKCRldmVudClcIiBzdHlsZUNsYXNzPVwidWktcGFnaW5hdG9yLXRvcFwiIFtyb3dzUGVyUGFnZU9wdGlvbnNdPVwicm93c1BlclBhZ2VPcHRpb25zXCIgKm5nSWY9XCJwYWdpbmF0b3IgJiYgKHBhZ2luYXRvclBvc2l0aW9uID09PSAndG9wJyB8fCBwYWdpbmF0b3JQb3NpdGlvbiA9PSdib3RoJylcIlxyXG4gICAgICAgICAgICAgICAgW2Ryb3Bkb3duQXBwZW5kVG9dPVwicGFnaW5hdG9yRHJvcGRvd25BcHBlbmRUb1wiIFtkcm9wZG93blNjcm9sbEhlaWdodF09XCJwYWdpbmF0b3JEcm9wZG93blNjcm9sbEhlaWdodFwiIFt0ZW1wbGF0ZUxlZnRdPVwicGFnaW5hdG9yTGVmdFRlbXBsYXRlXCIgW3RlbXBsYXRlUmlnaHRdPVwicGFnaW5hdG9yUmlnaHRUZW1wbGF0ZVwiXHJcbiAgICAgICAgICAgICAgICBbY3VycmVudFBhZ2VSZXBvcnRUZW1wbGF0ZV09XCJjdXJyZW50UGFnZVJlcG9ydFRlbXBsYXRlXCIgW3Nob3dDdXJyZW50UGFnZVJlcG9ydF09XCJzaG93Q3VycmVudFBhZ2VSZXBvcnRcIj48L3AtcGFnaW5hdG9yPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZGF0YXZpZXctY29udGVudCB1aS13aWRnZXQtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWdcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LXJvd0RhdGEgbGV0LXJvd0luZGV4PVwiaW5kZXhcIiBbbmdGb3JPZl09XCJwYWdpbmF0b3IgPyAoKGZpbHRlcmVkVmFsdWV8fHZhbHVlKSB8IHNsaWNlOihsYXp5ID8gMCA6IGZpcnN0KTooKGxhenkgPyAwIDogZmlyc3QpICsgcm93cykpIDogKGZpbHRlcmVkVmFsdWV8fHZhbHVlKVwiIFtuZ0ZvclRyYWNrQnldPVwidHJhY2tCeVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiByb3dEYXRhLCByb3dJbmRleDogcm93SW5kZXh9XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiaXNFbXB0eSgpXCIgY2xhc3M9XCJ1aS1nLTEyIHVpLWRhdGF2aWV3LWVtcHR5bWVzc2FnZVwiPnt7ZW1wdHlNZXNzYWdlfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPHAtcGFnaW5hdG9yIFtyb3dzXT1cInJvd3NcIiBbZmlyc3RdPVwiZmlyc3RcIiBbdG90YWxSZWNvcmRzXT1cInRvdGFsUmVjb3Jkc1wiIFtwYWdlTGlua1NpemVdPVwicGFnZUxpbmtzXCIgW2Fsd2F5c1Nob3ddPVwiYWx3YXlzU2hvd1BhZ2luYXRvclwiXHJcbiAgICAgICAgICAgICAgICAob25QYWdlQ2hhbmdlKT1cInBhZ2luYXRlKCRldmVudClcIiBzdHlsZUNsYXNzPVwidWktcGFnaW5hdG9yLWJvdHRvbVwiIFtyb3dzUGVyUGFnZU9wdGlvbnNdPVwicm93c1BlclBhZ2VPcHRpb25zXCIgKm5nSWY9XCJwYWdpbmF0b3IgJiYgKHBhZ2luYXRvclBvc2l0aW9uID09PSAnYm90dG9tJyB8fCBwYWdpbmF0b3JQb3NpdGlvbiA9PSdib3RoJylcIlxyXG4gICAgICAgICAgICAgICAgW2Ryb3Bkb3duQXBwZW5kVG9dPVwicGFnaW5hdG9yRHJvcGRvd25BcHBlbmRUb1wiIFtkcm9wZG93blNjcm9sbEhlaWdodF09XCJwYWdpbmF0b3JEcm9wZG93blNjcm9sbEhlaWdodFwiIFt0ZW1wbGF0ZUxlZnRdPVwicGFnaW5hdG9yTGVmdFRlbXBsYXRlXCIgW3RlbXBsYXRlUmlnaHRdPVwicGFnaW5hdG9yUmlnaHRUZW1wbGF0ZVwiXHJcbiAgICAgICAgICAgICAgICBbY3VycmVudFBhZ2VSZXBvcnRUZW1wbGF0ZV09XCJjdXJyZW50UGFnZVJlcG9ydFRlbXBsYXRlXCIgW3Nob3dDdXJyZW50UGFnZVJlcG9ydF09XCJzaG93Q3VycmVudFBhZ2VSZXBvcnRcIj48L3AtcGFnaW5hdG9yPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZGF0YXZpZXctZm9vdGVyIHVpLXdpZGdldC1oZWFkZXIgdWktY29ybmVyLWJvdHRvbVwiICpuZ0lmPVwiZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWZvb3RlclwiPjwvbmctY29udGVudD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRhVmlldyBpbXBsZW1lbnRzIE9uSW5pdCxBZnRlckNvbnRlbnRJbml0LEJsb2NrYWJsZVVJLE9uQ2hhbmdlcyB7XHJcblxyXG4gICAgQElucHV0KCkgbGF5b3V0OiBzdHJpbmcgPSAnbGlzdCc7XHJcblxyXG4gICAgQElucHV0KCkgcGFnaW5hdG9yOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIHJvd3M6IG51bWJlcjtcclxuXHJcbiAgICBASW5wdXQoKSB0b3RhbFJlY29yZHM6IG51bWJlcjtcclxuXHJcbiAgICBASW5wdXQoKSBwYWdlTGlua3M6IG51bWJlciA9IDU7XHJcblxyXG4gICAgQElucHV0KCkgcm93c1BlclBhZ2VPcHRpb25zOiBhbnlbXTtcclxuXHJcbiAgICBASW5wdXQoKSBwYWdpbmF0b3JQb3NpdGlvbjogc3RyaW5nID0gJ2JvdHRvbSc7XHJcblxyXG4gICAgQElucHV0KCkgYWx3YXlzU2hvd1BhZ2luYXRvcjogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgQElucHV0KCkgcGFnaW5hdG9yRHJvcGRvd25BcHBlbmRUbzogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIHBhZ2luYXRvckRyb3Bkb3duU2Nyb2xsSGVpZ2h0OiBzdHJpbmcgPSAnMjAwcHgnO1xyXG5cclxuICAgIEBJbnB1dCgpIGN1cnJlbnRQYWdlUmVwb3J0VGVtcGxhdGU6IHN0cmluZyA9ICd7Y3VycmVudFBhZ2V9IG9mIHt0b3RhbFBhZ2VzfSc7XHJcblxyXG4gICAgQElucHV0KCkgc2hvd0N1cnJlbnRQYWdlUmVwb3J0OiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIGxhenk6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgZW1wdHlNZXNzYWdlOiBzdHJpbmcgPSAnTm8gcmVjb3JkcyBmb3VuZCc7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uTGF6eUxvYWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIHRyYWNrQnk6IEZ1bmN0aW9uID0gKGluZGV4OiBudW1iZXIsIGl0ZW06IGFueSkgPT4gaXRlbTtcclxuXHJcbiAgICBASW5wdXQoKSBmaWx0ZXJCeTogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGZpbHRlckxvY2FsZTogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGxvYWRpbmc6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgbG9hZGluZ0ljb246IHN0cmluZyA9ICdwaSBwaS1zcGlubmVyJztcclxuXHJcbiAgICBASW5wdXQoKSBmaXJzdDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBASW5wdXQoKSBzb3J0RmllbGQ6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBzb3J0T3JkZXI6IG51bWJlcjtcclxuXHJcbiAgICBASW5wdXQoKSB2YWx1ZTogYW55W107XHJcblxyXG4gICAgQE91dHB1dCgpIG9uUGFnZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uU29ydDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uQ2hhbmdlTGF5b3V0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAQ29udGVudENoaWxkKEhlYWRlcikgaGVhZGVyO1xyXG5cclxuICAgIEBDb250ZW50Q2hpbGQoRm9vdGVyKSBmb290ZXI7XHJcblxyXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xyXG5cclxuICAgIF92YWx1ZTogYW55W107XHJcblxyXG4gICAgbGlzdEl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgICBncmlkSXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAgIGl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgICBwYWdpbmF0b3JMZWZ0VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgcGFnaW5hdG9yUmlnaHRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgICBmaWx0ZXJlZFZhbHVlOiBhbnlbXTtcclxuXHJcbiAgICBmaWx0ZXJWYWx1ZTogc3RyaW5nO1xyXG5cclxuICAgIGluaXRpYWxpemVkOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZikge31cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5sYXp5KSB7XHJcbiAgICAgICAgICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHRoaXMuY3JlYXRlTGF6eUxvYWRNZXRhZGF0YSgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoc2ltcGxlQ2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2VzLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gc2ltcGxlQ2hhbmdlcy52YWx1ZS5jdXJyZW50VmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVG90YWxSZWNvcmRzKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMubGF6eSAmJiB0aGlzLmhhc0ZpbHRlcigpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcih0aGlzLmZpbHRlclZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZXMuc29ydEZpZWxkIHx8IHNpbXBsZUNoYW5nZXMuc29ydE9yZGVyKSB7XHJcbiAgICAgICAgICAgIC8vYXZvaWQgdHJpZ2dlcmluZyBsYXp5IGxvYWQgcHJpb3IgdG8gbGF6eSBpbml0aWFsaXphdGlvbiBhdCBvbkluaXRcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmxhenkgfHwgdGhpcy5pbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoKGl0ZW0uZ2V0VHlwZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdsaXN0SXRlbSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0SXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ2dyaWRJdGVtJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyaWRJdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAncGFnaW5hdG9ybGVmdCc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdpbmF0b3JMZWZ0VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAncGFnaW5hdG9ycmlnaHQnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFnaW5hdG9yUmlnaHRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZUl0ZW1UZW1wbGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUl0ZW1UZW1wbGF0ZSgpIHtcclxuICAgICAgICBzd2l0Y2godGhpcy5sYXlvdXQpIHtcclxuICAgICAgICAgICAgY2FzZSAnbGlzdCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1UZW1wbGF0ZSA9IHRoaXMubGlzdEl0ZW1UZW1wbGF0ZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdncmlkJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gdGhpcy5ncmlkSXRlbVRlbXBsYXRlO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlTGF5b3V0KGxheW91dDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5sYXlvdXQgPSBsYXlvdXQ7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZUxheW91dC5lbWl0KHtcclxuICAgICAgICAgICAgbGF5b3V0OiB0aGlzLmxheW91dFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudXBkYXRlSXRlbVRlbXBsYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVG90YWxSZWNvcmRzKCkge1xyXG4gICAgICAgIHRoaXMudG90YWxSZWNvcmRzID0gdGhpcy5sYXp5ID8gdGhpcy50b3RhbFJlY29yZHMgOiAodGhpcy5fdmFsdWUgPyB0aGlzLl92YWx1ZS5sZW5ndGggOiAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwYWdpbmF0ZShldmVudCkge1xyXG4gICAgICAgIHRoaXMuZmlyc3QgPSBldmVudC5maXJzdDtcclxuICAgICAgICB0aGlzLnJvd3MgPSBldmVudC5yb3dzO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5sYXp5KSB7XHJcbiAgICAgICAgICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHRoaXMuY3JlYXRlTGF6eUxvYWRNZXRhZGF0YSgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMub25QYWdlLmVtaXQoe1xyXG4gICAgICAgICAgICBmaXJzdDogdGhpcy5maXJzdCxcclxuICAgICAgICAgICAgcm93czogdGhpcy5yb3dzXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc29ydCgpIHtcclxuICAgICAgICB0aGlzLmZpcnN0ID0gMDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMubGF6eSkge1xyXG4gICAgICAgICAgICB0aGlzLm9uTGF6eUxvYWQuZW1pdCh0aGlzLmNyZWF0ZUxhenlMb2FkTWV0YWRhdGEoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMudmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZS5zb3J0KChkYXRhMSwgZGF0YTIpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZTEgPSBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKGRhdGExLCB0aGlzLnNvcnRGaWVsZCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUyID0gT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShkYXRhMiwgdGhpcy5zb3J0RmllbGQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlMSA9PSBudWxsICYmIHZhbHVlMiAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUxICE9IG51bGwgJiYgdmFsdWUyID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gMTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlMSA9PSBudWxsICYmIHZhbHVlMiA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IDA7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUxID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgdmFsdWUyID09PSAnc3RyaW5nJylcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB2YWx1ZTEubG9jYWxlQ29tcGFyZSh2YWx1ZTIpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9ICh2YWx1ZTEgPCB2YWx1ZTIpID8gLTEgOiAodmFsdWUxID4gdmFsdWUyKSA/IDEgOiAwO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5zb3J0T3JkZXIgKiByZXN1bHQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc0ZpbHRlcigpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcih0aGlzLmZpbHRlclZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5vblNvcnQuZW1pdCh7XHJcbiAgICAgICAgICAgIHNvcnRGaWVsZDogdGhpcy5zb3J0RmllbGQsXHJcbiAgICAgICAgICAgIHNvcnRPcmRlcjogdGhpcy5zb3J0T3JkZXJcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpc0VtcHR5KCkge1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5maWx0ZXJlZFZhbHVlfHx0aGlzLnZhbHVlO1xyXG4gICAgICAgIHJldHVybiBkYXRhID09IG51bGwgfHwgZGF0YS5sZW5ndGggPT0gMDtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVMYXp5TG9hZE1ldGFkYXRhKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZmlyc3Q6IHRoaXMuZmlyc3QsXHJcbiAgICAgICAgICAgIHJvd3M6IHRoaXMucm93cyxcclxuICAgICAgICAgICAgc29ydEZpZWxkOiB0aGlzLnNvcnRGaWVsZCxcclxuICAgICAgICAgICAgc29ydE9yZGVyOiB0aGlzLnNvcnRPcmRlclxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QmxvY2thYmxlRWxlbWVudCgpOiBIVE1MRWxlbWVudMKge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF07XHJcbiAgICB9XHJcblxyXG4gICAgZmlsdGVyKGZpbHRlcjogc3RyaW5nLCBmaWx0ZXJNYXRjaE1vZGU6c3RyaW5nID1cImNvbnRhaW5zXCIpIHtcclxuICAgICAgICB0aGlzLmZpbHRlclZhbHVlID0gZmlsdGVyO1xyXG5cclxuICAgICAgICBpZiAodGhpcy52YWx1ZSAmJiB0aGlzLnZhbHVlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBsZXQgc2VhcmNoRmllbGRzID0gdGhpcy5maWx0ZXJCeS5zcGxpdCgnLCcpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlcmVkVmFsdWUgPSBGaWx0ZXJVdGlscy5maWx0ZXIodGhpcy52YWx1ZSwgc2VhcmNoRmllbGRzLCBmaWx0ZXIsIGZpbHRlck1hdGNoTW9kZSwgdGhpcy5maWx0ZXJMb2NhbGUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVyZWRWYWx1ZS5sZW5ndGggPT09IHRoaXMudmFsdWUubGVuZ3RoICkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJlZFZhbHVlID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMucGFnaW5hdG9yKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0ID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMudG90YWxSZWNvcmRzID0gdGhpcy5maWx0ZXJlZFZhbHVlID8gdGhpcy5maWx0ZXJlZFZhbHVlLmxlbmd0aCA6IHRoaXMudmFsdWUgPyB0aGlzLnZhbHVlLmxlbmd0aCA6IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFzRmlsdGVyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlclZhbHVlICYmIHRoaXMuZmlsdGVyVmFsdWUudHJpbSgpLmxlbmd0aCA+IDA7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLWRhdGFWaWV3TGF5b3V0T3B0aW9ucycsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwiJ3VpLWRhdGF2aWV3LWxheW91dC1vcHRpb25zIHVpLXNlbGVjdGJ1dHRvbiB1aS1idXR0b25zZXQnXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiPlxyXG4gICAgICAgICAgICA8YSB0YWJpbmRleD1cIjBcIiBjbGFzcz1cInVpLWJ1dHRvbiB1aS1idXR0b24taWNvbi1vbmx5IHVpLXN0YXRlLWRlZmF1bHRcIiAoY2xpY2spPVwiY2hhbmdlTGF5b3V0KCRldmVudCwgJ2xpc3QnKVwiIChrZXlkb3duLmVudGVyKT1cImNoYW5nZUxheW91dCgkZXZlbnQsICdsaXN0JylcIlxyXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1hY3RpdmUnOiBkdi5sYXlvdXQgPT09ICdsaXN0J31cIj5cclxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwicGkgcGktYmFycyB1aS1idXR0b24taWNvbi1sZWZ0XCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1idXR0b24tdGV4dCB1aS1jbGlja2FibGVcIj51aS1idG48L3NwYW4+XHJcbiAgICAgICAgICAgIDwvYT48YSB0YWJpbmRleD1cIjBcIiBjbGFzcz1cInVpLWJ1dHRvbiB1aS1idXR0b24taWNvbi1vbmx5IHVpLXN0YXRlLWRlZmF1bHRcIiAoY2xpY2spPVwiY2hhbmdlTGF5b3V0KCRldmVudCwgJ2dyaWQnKVwiIChrZXlkb3duLmVudGVyKT1cImNoYW5nZUxheW91dCgkZXZlbnQsICdncmlkJylcIlxyXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1hY3RpdmUnOiBkdi5sYXlvdXQgPT09ICdncmlkJ31cIj5cclxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwicGkgcGktdGgtbGFyZ2UgdWktYnV0dG9uLWljb24tbGVmdFwiPjwvaT5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktYnV0dG9uLXRleHQgdWktY2xpY2thYmxlXCI+dWktYnRuPC9zcGFuPlxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYXRhVmlld0xheW91dE9wdGlvbnMgIHtcclxuXHJcbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHY6IERhdGFWaWV3KSB7fVxyXG5cclxuICAgIGNoYW5nZUxheW91dChldmVudDogRXZlbnQsIGxheW91dDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5kdi5jaGFuZ2VMYXlvdXQobGF5b3V0KTtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG59XHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLFNoYXJlZE1vZHVsZSxQYWdpbmF0b3JNb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW0RhdGFWaWV3LFNoYXJlZE1vZHVsZSxEYXRhVmlld0xheW91dE9wdGlvbnNdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbRGF0YVZpZXcsRGF0YVZpZXdMYXlvdXRPcHRpb25zXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGF0YVZpZXdNb2R1bGUgeyB9XHJcbiJdfQ==