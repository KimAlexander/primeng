var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, AfterContentInit, Input, Output, ViewChild, EventEmitter, ContentChild, ContentChildren, QueryList, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header, Footer, PrimeTemplate, SharedModule } from 'primeng/api';
import { ScrollingModule } from '@angular/cdk/scrolling';
let VirtualScroller = class VirtualScroller {
    constructor(el) {
        this.el = el;
        this.cache = true;
        this.first = 0;
        this.trackBy = (index, item) => item;
        this.onLazyLoad = new EventEmitter();
        this._totalRecords = 0;
        this.lazyValue = [];
        this.page = 0;
    }
    get totalRecords() {
        return this._totalRecords;
    }
    set totalRecords(val) {
        this._totalRecords = val;
        this.lazyValue = Array.from({ length: this._totalRecords });
        this.onLazyLoad.emit(this.createLazyLoadMetadata());
        this.first = 0;
        this.scrollTo(0);
    }
    get value() {
        return this.lazy ? this.lazyValue : this._value;
    }
    set value(val) {
        if (this.lazy) {
            if (val) {
                let arr = this.cache ? [...this.lazyValue] : Array.from({ length: this._totalRecords });
                for (let i = this.first, j = 0; i < (this.first + this.rows); i++, j++) {
                    arr[i] = val[j];
                }
                this.lazyValue = arr;
            }
        }
        else {
            this._value = val;
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                case 'loadingItem':
                    this.loadingItemTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    onScrollIndexChange(index) {
        let p = Math.floor(index / this.rows);
        if (p !== this.page) {
            this.page = p;
            this.first = this.page * this.rows;
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
    }
    createLazyLoadMetadata() {
        return {
            first: this.first,
            rows: this.rows
        };
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    scrollTo(index) {
        if (this.viewPortViewChild && this.viewPortViewChild['elementRef'] && this.viewPortViewChild['elementRef'].nativeElement) {
            this.viewPortViewChild['elementRef'].nativeElement.scrollTop = index * this.itemSize;
        }
    }
};
VirtualScroller.ctorParameters = () => [
    { type: ElementRef }
];
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
        template: `
        <div [ngClass]="'ui-virtualscroller ui-widget'" [ngStyle]="style" [class]="styleClass">
            <div class="ui-virtualscroller-header ui-widget-header ui-corner-top" *ngIf="header">
                <ng-content select="p-header"></ng-content>
            </div>
            <div #content class="ui-virtualscroller-content ui-widget-content">
                <ul class="ui-virtualscroller-list">
                    <cdk-virtual-scroll-viewport #viewport [ngStyle]="{'height': scrollHeight}" [itemSize]="itemSize" (scrolledIndexChange)="onScrollIndexChange($event)">
                        <ng-container *cdkVirtualFor="let item of value; trackBy: trackBy; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd; ">
                            <li [ngStyle]="{'height': itemSize + 'px'}">
                                <ng-container *ngTemplateOutlet="item ? itemTemplate : loadingItemTemplate; context: {$implicit: item, index: i, count: c, first: f, last: l, even: e, odd: o}"></ng-container>
                            </li>
                        </ng-container>
                    </cdk-virtual-scroll-viewport>
                </ul>
            </div>
            <div class="ui-virtualscroller-footer ui-widget-header ui-corner-bottom" *ngIf="footer">
                <ng-content select="p-footer"></ng-content>
            </div>
        </div>
    `,
        changeDetection: ChangeDetectionStrategy.Default
    })
], VirtualScroller);
export { VirtualScroller };
let VirtualScrollerModule = class VirtualScrollerModule {
};
VirtualScrollerModule = __decorate([
    NgModule({
        imports: [CommonModule, ScrollingModule],
        exports: [VirtualScroller, SharedModule, ScrollingModule],
        declarations: [VirtualScroller]
    })
], VirtualScrollerModule);
export { VirtualScrollerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbHNjcm9sbGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy92aXJ0dWFsc2Nyb2xsZXIvIiwic291cmNlcyI6WyJ2aXJ0dWFsc2Nyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLGdCQUFnQixFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLFlBQVksRUFBQyxZQUFZLEVBQUMsZUFBZSxFQUFDLFNBQVMsRUFBQyxXQUFXLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUwsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDckUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBNEJ2RCxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBMEN4QixZQUFtQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQTlCeEIsVUFBSyxHQUFZLElBQUksQ0FBQztRQUl0QixVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBRWxCLFlBQU8sR0FBYSxDQUFDLEtBQWEsRUFBRSxJQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQztRQVV0RCxlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFNN0Qsa0JBQWEsR0FBVyxDQUFDLENBQUM7UUFJMUIsY0FBUyxHQUFVLEVBQUUsQ0FBQztRQUV0QixTQUFJLEdBQVcsQ0FBQyxDQUFDO0lBRW1CLENBQUM7SUFFNUIsSUFBSSxZQUFZO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM5QixDQUFDO0lBQ0QsSUFBSSxZQUFZLENBQUMsR0FBVztRQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBQyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVRLElBQUksS0FBSztRQUNkLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNwRCxDQUFDO0lBQ0QsSUFBSSxLQUFLLENBQUMsR0FBVTtRQUNoQixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLEdBQUcsRUFBRTtnQkFDTCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUMsQ0FBQyxDQUFDO2dCQUN0RixLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDcEUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDbkI7Z0JBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7YUFDeEI7U0FDSjthQUNJO1lBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7U0FDckI7SUFDTCxDQUFDO0lBRUQsa0JBQWtCO1FBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM1QixRQUFPLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDbkIsS0FBSyxNQUFNO29CQUNQLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDdEMsTUFBTTtnQkFFTixLQUFLLGFBQWE7b0JBQ2QsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQzdDLE1BQU07Z0JBRU47b0JBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUN0QyxNQUFNO2FBQ1Q7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxLQUFhO1FBQzdCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQztTQUN2RDtJQUNMLENBQUM7SUFFRCxzQkFBc0I7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7U0FDbEIsQ0FBQztJQUNOLENBQUM7SUFFRCxtQkFBbUI7UUFDZixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQWE7UUFDbEIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxhQUFhLEVBQUU7WUFDdEgsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDeEY7SUFDTCxDQUFDO0NBRUosQ0FBQTs7WUEzRTBCLFVBQVU7O0FBeEN4QjtJQUFSLEtBQUssRUFBRTtpREFBa0I7QUFFakI7SUFBUixLQUFLLEVBQUU7OENBQVk7QUFFWDtJQUFSLEtBQUssRUFBRTttREFBb0I7QUFFbkI7SUFBUixLQUFLLEVBQUU7cURBQW1CO0FBRWxCO0lBQVIsS0FBSyxFQUFFOzZDQUFlO0FBRWQ7SUFBUixLQUFLLEVBQUU7OENBQXVCO0FBRXRCO0lBQVIsS0FBSyxFQUFFOzZDQUFjO0FBRWI7SUFBUixLQUFLLEVBQUU7OENBQW1CO0FBRWxCO0lBQVIsS0FBSyxFQUFFO2dEQUF3RDtBQUUxQztJQUFyQixZQUFZLENBQUMsTUFBTSxDQUFDOytDQUFRO0FBRVA7SUFBckIsWUFBWSxDQUFDLE1BQU0sQ0FBQzsrQ0FBUTtBQUVHO0lBQS9CLGVBQWUsQ0FBQyxhQUFhLENBQUM7a0RBQTJCO0FBRW5DO0lBQXRCLFNBQVMsQ0FBQyxVQUFVLENBQUM7MERBQStCO0FBRTNDO0lBQVQsTUFBTSxFQUFFO21EQUFvRDtBQWdCcEQ7SUFBUixLQUFLLEVBQUU7bURBRVA7QUFTUTtJQUFSLEtBQUssRUFBRTs0Q0FFUDtBQXpEUSxlQUFlO0lBekIzQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsbUJBQW1CO1FBQzdCLFFBQVEsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FvQlI7UUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztLQUNuRCxDQUFDO0dBQ1csZUFBZSxDQXFIM0I7U0FySFksZUFBZTtBQTRINUIsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7Q0FBSSxDQUFBO0FBQXpCLHFCQUFxQjtJQUxqQyxRQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUMsZUFBZSxDQUFDO1FBQ3ZDLE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBQyxZQUFZLEVBQUMsZUFBZSxDQUFDO1FBQ3ZELFlBQVksRUFBRSxDQUFDLGVBQWUsQ0FBQztLQUNsQyxDQUFDO0dBQ1cscUJBQXFCLENBQUk7U0FBekIscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsRWxlbWVudFJlZixBZnRlckNvbnRlbnRJbml0LElucHV0LE91dHB1dCxWaWV3Q2hpbGQsRXZlbnRFbWl0dGVyLENvbnRlbnRDaGlsZCxDb250ZW50Q2hpbGRyZW4sUXVlcnlMaXN0LFRlbXBsYXRlUmVmLENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7SGVhZGVyLEZvb3RlcixQcmltZVRlbXBsYXRlLFNoYXJlZE1vZHVsZX0gZnJvbSAncHJpbWVuZy9hcGknO1xyXG5pbXBvcnQge1Njcm9sbGluZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XHJcbmltcG9ydCB7QmxvY2thYmxlVUl9IGZyb20gJ3ByaW1lbmcvYXBpJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLXZpcnR1YWxTY3JvbGxlcicsXHJcbiAgICB0ZW1wbGF0ZTpgXHJcbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCIndWktdmlydHVhbHNjcm9sbGVyIHVpLXdpZGdldCdcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS12aXJ0dWFsc2Nyb2xsZXItaGVhZGVyIHVpLXdpZGdldC1oZWFkZXIgdWktY29ybmVyLXRvcFwiICpuZ0lmPVwiaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWhlYWRlclwiPjwvbmctY29udGVudD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgI2NvbnRlbnQgY2xhc3M9XCJ1aS12aXJ0dWFsc2Nyb2xsZXItY29udGVudCB1aS13aWRnZXQtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwidWktdmlydHVhbHNjcm9sbGVyLWxpc3RcIj5cclxuICAgICAgICAgICAgICAgICAgICA8Y2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0ICN2aWV3cG9ydCBbbmdTdHlsZV09XCJ7J2hlaWdodCc6IHNjcm9sbEhlaWdodH1cIiBbaXRlbVNpemVdPVwiaXRlbVNpemVcIiAoc2Nyb2xsZWRJbmRleENoYW5nZSk9XCJvblNjcm9sbEluZGV4Q2hhbmdlKCRldmVudClcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqY2RrVmlydHVhbEZvcj1cImxldCBpdGVtIG9mIHZhbHVlOyB0cmFja0J5OiB0cmFja0J5OyBsZXQgaSA9IGluZGV4OyBsZXQgYyA9IGNvdW50OyBsZXQgZiA9IGZpcnN0OyBsZXQgbCA9IGxhc3Q7IGxldCBlID0gZXZlbjsgbGV0IG8gPSBvZGQ7IFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIFtuZ1N0eWxlXT1cInsnaGVpZ2h0JzogaXRlbVNpemUgKyAncHgnfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtID8gaXRlbVRlbXBsYXRlIDogbG9hZGluZ0l0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogaXRlbSwgaW5kZXg6IGksIGNvdW50OiBjLCBmaXJzdDogZiwgbGFzdDogbCwgZXZlbjogZSwgb2RkOiBvfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9jZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnQ+XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXZpcnR1YWxzY3JvbGxlci1mb290ZXIgdWktd2lkZ2V0LWhlYWRlciB1aS1jb3JuZXItYm90dG9tXCIgKm5nSWY9XCJmb290ZXJcIj5cclxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtZm9vdGVyXCI+PC9uZy1jb250ZW50PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcclxufSlcclxuZXhwb3J0IGNsYXNzIFZpcnR1YWxTY3JvbGxlciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsQmxvY2thYmxlVUkge1xyXG5cclxuICAgIEBJbnB1dCgpIGl0ZW1TaXplOiBudW1iZXI7IFxyXG5cclxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBzY3JvbGxIZWlnaHQ6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBsYXp5OiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIGNhY2hlOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBASW5wdXQoKSByb3dzOiBudW1iZXI7XHJcblxyXG4gICAgQElucHV0KCkgZmlyc3Q6IG51bWJlciA9IDA7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHRyYWNrQnk6IEZ1bmN0aW9uID0gKGluZGV4OiBudW1iZXIsIGl0ZW06IGFueSkgPT4gaXRlbTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgQENvbnRlbnRDaGlsZChIZWFkZXIpIGhlYWRlcjtcclxuXHJcbiAgICBAQ29udGVudENoaWxkKEZvb3RlcikgZm9vdGVyO1xyXG4gICAgXHJcbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PGFueT47XHJcblxyXG4gICAgQFZpZXdDaGlsZCgndmlld3BvcnQnKSB2aWV3UG9ydFZpZXdDaGlsZDogRWxlbWVudFJlZjtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25MYXp5TG9hZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAgIGxvYWRpbmdJdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgX3RvdGFsUmVjb3JkczogbnVtYmVyID0gMDtcclxuXHJcbiAgICBfdmFsdWU6IGFueVtdO1xyXG5cclxuICAgIGxhenlWYWx1ZTogYW55W10gPSBbXTtcclxuXHJcbiAgICBwYWdlOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZikge31cclxuXHJcbiAgICBASW5wdXQoKSBnZXQgdG90YWxSZWNvcmRzKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RvdGFsUmVjb3JkcztcclxuICAgIH1cclxuICAgIHNldCB0b3RhbFJlY29yZHModmFsOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl90b3RhbFJlY29yZHMgPSB2YWw7XHJcbiAgICAgICAgdGhpcy5sYXp5VmFsdWUgPSBBcnJheS5mcm9tKHtsZW5ndGg6IHRoaXMuX3RvdGFsUmVjb3Jkc30pO1xyXG4gICAgICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHRoaXMuY3JlYXRlTGF6eUxvYWRNZXRhZGF0YSgpKTtcclxuICAgICAgICB0aGlzLmZpcnN0ID0gMDtcclxuICAgICAgICB0aGlzLnNjcm9sbFRvKDApO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIGdldCB2YWx1ZSgpOiBhbnlbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGF6eSA/IHRoaXMubGF6eVZhbHVlIDogdGhpcy5fdmFsdWU7XHJcbiAgICB9XHJcbiAgICBzZXQgdmFsdWUodmFsOiBhbnlbXSkge1xyXG4gICAgICAgIGlmICh0aGlzLmxhenkpIHtcclxuICAgICAgICAgICAgaWYgKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFyciA9IHRoaXMuY2FjaGUgPyBbLi4udGhpcy5sYXp5VmFsdWVdIDogQXJyYXkuZnJvbSh7bGVuZ3RoOiB0aGlzLl90b3RhbFJlY29yZHN9KTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSB0aGlzLmZpcnN0LCBqID0gMDsgaSA8ICh0aGlzLmZpcnN0ICsgdGhpcy5yb3dzKTsgaSsrLCBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBhcnJbaV0gPSB2YWxbal07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhenlWYWx1ZSA9IGFycjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgICAgICB0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIHN3aXRjaChpdGVtLmdldFR5cGUoKSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnaXRlbSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnbG9hZGluZ0l0ZW0nOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZ0l0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2Nyb2xsSW5kZXhDaGFuZ2UoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwID0gTWF0aC5mbG9vcihpbmRleCAvIHRoaXMucm93cyk7XHJcbiAgICAgICAgaWYgKHAgIT09IHRoaXMucGFnZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UgPSBwO1xyXG4gICAgICAgICAgICB0aGlzLmZpcnN0ID0gdGhpcy5wYWdlICogdGhpcy5yb3dzO1xyXG4gICAgICAgICAgICB0aGlzLm9uTGF6eUxvYWQuZW1pdCh0aGlzLmNyZWF0ZUxhenlMb2FkTWV0YWRhdGEoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUxhenlMb2FkTWV0YWRhdGEoKTogYW55IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBmaXJzdDogdGhpcy5maXJzdCxcclxuICAgICAgICAgICAgcm93czogdGhpcy5yb3dzXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRCbG9ja2FibGVFbGVtZW50KCk6IEhUTUxFbGVtZW50wqB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXTtcclxuICAgIH1cclxuXHJcbiAgICBzY3JvbGxUbyhpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMudmlld1BvcnRWaWV3Q2hpbGQgJiYgdGhpcy52aWV3UG9ydFZpZXdDaGlsZFsnZWxlbWVudFJlZiddICYmIHRoaXMudmlld1BvcnRWaWV3Q2hpbGRbJ2VsZW1lbnRSZWYnXS5uYXRpdmVFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlld1BvcnRWaWV3Q2hpbGRbJ2VsZW1lbnRSZWYnXS5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IGluZGV4ICogdGhpcy5pdGVtU2l6ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsU2Nyb2xsaW5nTW9kdWxlXSxcclxuICAgIGV4cG9ydHM6IFtWaXJ0dWFsU2Nyb2xsZXIsU2hhcmVkTW9kdWxlLFNjcm9sbGluZ01vZHVsZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtWaXJ0dWFsU2Nyb2xsZXJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBWaXJ0dWFsU2Nyb2xsZXJNb2R1bGUgeyB9XHJcblxyXG4iXX0=