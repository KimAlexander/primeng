var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { NgModule, Component, ElementRef, AfterContentInit, Input, Output, ViewChild, EventEmitter, ContentChild, ContentChildren, QueryList, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header, Footer, PrimeTemplate, SharedModule } from 'primeng/api';
import { ScrollingModule } from '@angular/cdk/scrolling';
var VirtualScroller = /** @class */ (function () {
    function VirtualScroller(el) {
        this.el = el;
        this.cache = true;
        this.first = 0;
        this.trackBy = function (index, item) { return item; };
        this.onLazyLoad = new EventEmitter();
        this._totalRecords = 0;
        this.lazyValue = [];
        this.page = 0;
    }
    Object.defineProperty(VirtualScroller.prototype, "totalRecords", {
        get: function () {
            return this._totalRecords;
        },
        set: function (val) {
            this._totalRecords = val;
            this.lazyValue = Array.from({ length: this._totalRecords });
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
            this.first = 0;
            this.scrollTo(0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualScroller.prototype, "value", {
        get: function () {
            return this.lazy ? this.lazyValue : this._value;
        },
        set: function (val) {
            if (this.lazy) {
                if (val) {
                    var arr = this.cache ? __spread(this.lazyValue) : Array.from({ length: this._totalRecords });
                    for (var i = this.first, j = 0; i < (this.first + this.rows); i++, j++) {
                        arr[i] = val[j];
                    }
                    this.lazyValue = arr;
                }
            }
            else {
                this._value = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    VirtualScroller.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'item':
                    _this.itemTemplate = item.template;
                    break;
                case 'loadingItem':
                    _this.loadingItemTemplate = item.template;
                    break;
                default:
                    _this.itemTemplate = item.template;
                    break;
            }
        });
    };
    VirtualScroller.prototype.onScrollIndexChange = function (index) {
        var p = Math.floor(index / this.rows);
        if (p !== this.page) {
            this.page = p;
            this.first = this.page * this.rows;
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
    };
    VirtualScroller.prototype.createLazyLoadMetadata = function () {
        return {
            first: this.first,
            rows: this.rows
        };
    };
    VirtualScroller.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    VirtualScroller.prototype.scrollTo = function (index) {
        if (this.viewPortViewChild && this.viewPortViewChild['elementRef'] && this.viewPortViewChild['elementRef'].nativeElement) {
            this.viewPortViewChild['elementRef'].nativeElement.scrollTop = index * this.itemSize;
        }
    };
    VirtualScroller.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], VirtualScroller.prototype, "itemSize", void 0);
    __decorate([
        Input()
    ], VirtualScroller.prototype, "style", void 0);
    __decorate([
        Input()
    ], VirtualScroller.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], VirtualScroller.prototype, "scrollHeight", void 0);
    __decorate([
        Input()
    ], VirtualScroller.prototype, "lazy", void 0);
    __decorate([
        Input()
    ], VirtualScroller.prototype, "cache", void 0);
    __decorate([
        Input()
    ], VirtualScroller.prototype, "rows", void 0);
    __decorate([
        Input()
    ], VirtualScroller.prototype, "first", void 0);
    __decorate([
        Input()
    ], VirtualScroller.prototype, "trackBy", void 0);
    __decorate([
        ContentChild(Header)
    ], VirtualScroller.prototype, "header", void 0);
    __decorate([
        ContentChild(Footer)
    ], VirtualScroller.prototype, "footer", void 0);
    __decorate([
        ContentChildren(PrimeTemplate)
    ], VirtualScroller.prototype, "templates", void 0);
    __decorate([
        ViewChild('viewport')
    ], VirtualScroller.prototype, "viewPortViewChild", void 0);
    __decorate([
        Output()
    ], VirtualScroller.prototype, "onLazyLoad", void 0);
    __decorate([
        Input()
    ], VirtualScroller.prototype, "totalRecords", null);
    __decorate([
        Input()
    ], VirtualScroller.prototype, "value", null);
    VirtualScroller = __decorate([
        Component({
            selector: 'p-virtualScroller',
            template: "\n        <div [ngClass]=\"'ui-virtualscroller ui-widget'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-virtualscroller-header ui-widget-header ui-corner-top\" *ngIf=\"header\">\n                <ng-content select=\"p-header\"></ng-content>\n            </div>\n            <div #content class=\"ui-virtualscroller-content ui-widget-content\">\n                <ul class=\"ui-virtualscroller-list\">\n                    <cdk-virtual-scroll-viewport #viewport [ngStyle]=\"{'height': scrollHeight}\" [itemSize]=\"itemSize\" (scrolledIndexChange)=\"onScrollIndexChange($event)\">\n                        <ng-container *cdkVirtualFor=\"let item of value; trackBy: trackBy; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd; \">\n                            <li [ngStyle]=\"{'height': itemSize + 'px'}\">\n                                <ng-container *ngTemplateOutlet=\"item ? itemTemplate : loadingItemTemplate; context: {$implicit: item, index: i, count: c, first: f, last: l, even: e, odd: o}\"></ng-container>\n                            </li>\n                        </ng-container>\n                    </cdk-virtual-scroll-viewport>\n                </ul>\n            </div>\n            <div class=\"ui-virtualscroller-footer ui-widget-header ui-corner-bottom\" *ngIf=\"footer\">\n                <ng-content select=\"p-footer\"></ng-content>\n            </div>\n        </div>\n    ",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], VirtualScroller);
    return VirtualScroller;
}());
export { VirtualScroller };
var VirtualScrollerModule = /** @class */ (function () {
    function VirtualScrollerModule() {
    }
    VirtualScrollerModule = __decorate([
        NgModule({
            imports: [CommonModule, ScrollingModule],
            exports: [VirtualScroller, SharedModule, ScrollingModule],
            declarations: [VirtualScroller]
        })
    ], VirtualScrollerModule);
    return VirtualScrollerModule;
}());
export { VirtualScrollerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbHNjcm9sbGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy92aXJ0dWFsc2Nyb2xsZXIvIiwic291cmNlcyI6WyJ2aXJ0dWFsc2Nyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsZ0JBQWdCLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsWUFBWSxFQUFDLFlBQVksRUFBQyxlQUFlLEVBQUMsU0FBUyxFQUFDLFdBQVcsRUFBQyx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1TCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUNyRSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUE0QnZEO0lBMENJLHlCQUFtQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQTlCeEIsVUFBSyxHQUFZLElBQUksQ0FBQztRQUl0QixVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBRWxCLFlBQU8sR0FBYSxVQUFDLEtBQWEsRUFBRSxJQUFTLElBQUssT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFDO1FBVXRELGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQU03RCxrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUkxQixjQUFTLEdBQVUsRUFBRSxDQUFDO1FBRXRCLFNBQUksR0FBVyxDQUFDLENBQUM7SUFFbUIsQ0FBQztJQUU1QixzQkFBSSx5Q0FBWTthQUFoQjtZQUNMLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM5QixDQUFDO2FBQ0QsVUFBaUIsR0FBVztZQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FB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SDNCO0lBQUQsc0JBQUM7Q0FBQSxBQXJIRCxJQXFIQztTQXJIWSxlQUFlO0FBNEg1QjtJQUFBO0lBQXFDLENBQUM7SUFBekIscUJBQXFCO1FBTGpDLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBQyxlQUFlLENBQUM7WUFDdkMsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFDLFlBQVksRUFBQyxlQUFlLENBQUM7WUFDdkQsWUFBWSxFQUFFLENBQUMsZUFBZSxDQUFDO1NBQ2xDLENBQUM7T0FDVyxxQkFBcUIsQ0FBSTtJQUFELDRCQUFDO0NBQUEsQUFBdEMsSUFBc0M7U0FBekIscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsRWxlbWVudFJlZixBZnRlckNvbnRlbnRJbml0LElucHV0LE91dHB1dCxWaWV3Q2hpbGQsRXZlbnRFbWl0dGVyLENvbnRlbnRDaGlsZCxDb250ZW50Q2hpbGRyZW4sUXVlcnlMaXN0LFRlbXBsYXRlUmVmLENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7SGVhZGVyLEZvb3RlcixQcmltZVRlbXBsYXRlLFNoYXJlZE1vZHVsZX0gZnJvbSAncHJpbWVuZy9hcGknO1xyXG5pbXBvcnQge1Njcm9sbGluZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XHJcbmltcG9ydCB7QmxvY2thYmxlVUl9IGZyb20gJ3ByaW1lbmcvYXBpJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLXZpcnR1YWxTY3JvbGxlcicsXHJcbiAgICB0ZW1wbGF0ZTpgXHJcbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCIndWktdmlydHVhbHNjcm9sbGVyIHVpLXdpZGdldCdcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS12aXJ0dWFsc2Nyb2xsZXItaGVhZGVyIHVpLXdpZGdldC1oZWFkZXIgdWktY29ybmVyLXRvcFwiICpuZ0lmPVwiaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWhlYWRlclwiPjwvbmctY29udGVudD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgI2NvbnRlbnQgY2xhc3M9XCJ1aS12aXJ0dWFsc2Nyb2xsZXItY29udGVudCB1aS13aWRnZXQtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwidWktdmlydHVhbHNjcm9sbGVyLWxpc3RcIj5cclxuICAgICAgICAgICAgICAgICAgICA8Y2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0ICN2aWV3cG9ydCBbbmdTdHlsZV09XCJ7J2hlaWdodCc6IHNjcm9sbEhlaWdodH1cIiBbaXRlbVNpemVdPVwiaXRlbVNpemVcIiAoc2Nyb2xsZWRJbmRleENoYW5nZSk9XCJvblNjcm9sbEluZGV4Q2hhbmdlKCRldmVudClcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqY2RrVmlydHVhbEZvcj1cImxldCBpdGVtIG9mIHZhbHVlOyB0cmFja0J5OiB0cmFja0J5OyBsZXQgaSA9IGluZGV4OyBsZXQgYyA9IGNvdW50OyBsZXQgZiA9IGZpcnN0OyBsZXQgbCA9IGxhc3Q7IGxldCBlID0gZXZlbjsgbGV0IG8gPSBvZGQ7IFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIFtuZ1N0eWxlXT1cInsnaGVpZ2h0JzogaXRlbVNpemUgKyAncHgnfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtID8gaXRlbVRlbXBsYXRlIDogbG9hZGluZ0l0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogaXRlbSwgaW5kZXg6IGksIGNvdW50OiBjLCBmaXJzdDogZiwgbGFzdDogbCwgZXZlbjogZSwgb2RkOiBvfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9jZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnQ+XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXZpcnR1YWxzY3JvbGxlci1mb290ZXIgdWktd2lkZ2V0LWhlYWRlciB1aS1jb3JuZXItYm90dG9tXCIgKm5nSWY9XCJmb290ZXJcIj5cclxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtZm9vdGVyXCI+PC9uZy1jb250ZW50PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcclxufSlcclxuZXhwb3J0IGNsYXNzIFZpcnR1YWxTY3JvbGxlciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsQmxvY2thYmxlVUkge1xyXG5cclxuICAgIEBJbnB1dCgpIGl0ZW1TaXplOiBudW1iZXI7IFxyXG5cclxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBzY3JvbGxIZWlnaHQ6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBsYXp5OiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIGNhY2hlOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBASW5wdXQoKSByb3dzOiBudW1iZXI7XHJcblxyXG4gICAgQElucHV0KCkgZmlyc3Q6IG51bWJlciA9IDA7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHRyYWNrQnk6IEZ1bmN0aW9uID0gKGluZGV4OiBudW1iZXIsIGl0ZW06IGFueSkgPT4gaXRlbTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgQENvbnRlbnRDaGlsZChIZWFkZXIpIGhlYWRlcjtcclxuXHJcbiAgICBAQ29udGVudENoaWxkKEZvb3RlcikgZm9vdGVyO1xyXG4gICAgXHJcbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PGFueT47XHJcblxyXG4gICAgQFZpZXdDaGlsZCgndmlld3BvcnQnKSB2aWV3UG9ydFZpZXdDaGlsZDogRWxlbWVudFJlZjtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25MYXp5TG9hZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAgIGxvYWRpbmdJdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgX3RvdGFsUmVjb3JkczogbnVtYmVyID0gMDtcclxuXHJcbiAgICBfdmFsdWU6IGFueVtdO1xyXG5cclxuICAgIGxhenlWYWx1ZTogYW55W10gPSBbXTtcclxuXHJcbiAgICBwYWdlOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZikge31cclxuXHJcbiAgICBASW5wdXQoKSBnZXQgdG90YWxSZWNvcmRzKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RvdGFsUmVjb3JkcztcclxuICAgIH1cclxuICAgIHNldCB0b3RhbFJlY29yZHModmFsOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl90b3RhbFJlY29yZHMgPSB2YWw7XHJcbiAgICAgICAgdGhpcy5sYXp5VmFsdWUgPSBBcnJheS5mcm9tKHtsZW5ndGg6IHRoaXMuX3RvdGFsUmVjb3Jkc30pO1xyXG4gICAgICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHRoaXMuY3JlYXRlTGF6eUxvYWRNZXRhZGF0YSgpKTtcclxuICAgICAgICB0aGlzLmZpcnN0ID0gMDtcclxuICAgICAgICB0aGlzLnNjcm9sbFRvKDApO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIGdldCB2YWx1ZSgpOiBhbnlbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGF6eSA/IHRoaXMubGF6eVZhbHVlIDogdGhpcy5fdmFsdWU7XHJcbiAgICB9XHJcbiAgICBzZXQgdmFsdWUodmFsOiBhbnlbXSkge1xyXG4gICAgICAgIGlmICh0aGlzLmxhenkpIHtcclxuICAgICAgICAgICAgaWYgKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFyciA9IHRoaXMuY2FjaGUgPyBbLi4udGhpcy5sYXp5VmFsdWVdIDogQXJyYXkuZnJvbSh7bGVuZ3RoOiB0aGlzLl90b3RhbFJlY29yZHN9KTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSB0aGlzLmZpcnN0LCBqID0gMDsgaSA8ICh0aGlzLmZpcnN0ICsgdGhpcy5yb3dzKTsgaSsrLCBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBhcnJbaV0gPSB2YWxbal07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhenlWYWx1ZSA9IGFycjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgICAgICB0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIHN3aXRjaChpdGVtLmdldFR5cGUoKSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnaXRlbSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnbG9hZGluZ0l0ZW0nOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZ0l0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2Nyb2xsSW5kZXhDaGFuZ2UoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwID0gTWF0aC5mbG9vcihpbmRleCAvIHRoaXMucm93cyk7XHJcbiAgICAgICAgaWYgKHAgIT09IHRoaXMucGFnZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UgPSBwO1xyXG4gICAgICAgICAgICB0aGlzLmZpcnN0ID0gdGhpcy5wYWdlICogdGhpcy5yb3dzO1xyXG4gICAgICAgICAgICB0aGlzLm9uTGF6eUxvYWQuZW1pdCh0aGlzLmNyZWF0ZUxhenlMb2FkTWV0YWRhdGEoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUxhenlMb2FkTWV0YWRhdGEoKTogYW55IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBmaXJzdDogdGhpcy5maXJzdCxcclxuICAgICAgICAgICAgcm93czogdGhpcy5yb3dzXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRCbG9ja2FibGVFbGVtZW50KCk6IEhUTUxFbGVtZW50wqB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXTtcclxuICAgIH1cclxuXHJcbiAgICBzY3JvbGxUbyhpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMudmlld1BvcnRWaWV3Q2hpbGQgJiYgdGhpcy52aWV3UG9ydFZpZXdDaGlsZFsnZWxlbWVudFJlZiddICYmIHRoaXMudmlld1BvcnRWaWV3Q2hpbGRbJ2VsZW1lbnRSZWYnXS5uYXRpdmVFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlld1BvcnRWaWV3Q2hpbGRbJ2VsZW1lbnRSZWYnXS5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IGluZGV4ICogdGhpcy5pdGVtU2l6ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsU2Nyb2xsaW5nTW9kdWxlXSxcclxuICAgIGV4cG9ydHM6IFtWaXJ0dWFsU2Nyb2xsZXIsU2hhcmVkTW9kdWxlLFNjcm9sbGluZ01vZHVsZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtWaXJ0dWFsU2Nyb2xsZXJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBWaXJ0dWFsU2Nyb2xsZXJNb2R1bGUgeyB9XHJcblxyXG4iXX0=