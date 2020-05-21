var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, ContentChildren, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { RouterModule } from '@angular/router';
var TabMenu = /** @class */ (function () {
    function TabMenu() {
    }
    TabMenu.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'item':
                    _this.itemTemplate = item.template;
                    break;
                default:
                    _this.itemTemplate = item.template;
                    break;
            }
        });
    };
    TabMenu.prototype.itemClick = function (event, item) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
        this.activeItem = item;
    };
    __decorate([
        Input()
    ], TabMenu.prototype, "model", void 0);
    __decorate([
        Input()
    ], TabMenu.prototype, "activeItem", void 0);
    __decorate([
        Input()
    ], TabMenu.prototype, "popup", void 0);
    __decorate([
        Input()
    ], TabMenu.prototype, "style", void 0);
    __decorate([
        Input()
    ], TabMenu.prototype, "styleClass", void 0);
    __decorate([
        ContentChildren(PrimeTemplate)
    ], TabMenu.prototype, "templates", void 0);
    TabMenu = __decorate([
        Component({
            selector: 'p-tabMenu',
            template: "\n        <div [ngClass]=\"'ui-tabmenu ui-widget ui-widget-content ui-corner-all'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ul class=\"ui-tabmenu-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all\" role=\"tablist\">\n                <li *ngFor=\"let item of model; let i = index\" role=\"tab\" [attr.aria-selected]=\"activeItem==item\" [attr.aria-expanded]=\"activeItem==item\"\n                    [ngClass]=\"{'ui-tabmenuitem ui-state-default ui-corner-top':true,'ui-state-disabled':item.disabled,\n                        'ui-tabmenuitem-hasicon':item.icon,'ui-state-active':activeItem==item,'ui-helper-hidden': item.visible === false}\"\n                        [routerLinkActive]=\"'ui-state-active'\" [routerLinkActiveOptions]=\"item.routerLinkActiveOptions||{exact:false}\">\n                    <a *ngIf=\"!item.routerLink\" [attr.href]=\"item.url\" class=\"ui-menuitem-link ui-corner-all\" role=\"presentation\" (click)=\"itemClick($event,item)\" [attr.tabindex]=\"item.tabindex ? item.tabindex : '0'\"\n                        [attr.target]=\"item.target\" [attr.title]=\"item.title\" [attr.id]=\"item.id\">\n                        <ng-container *ngIf=\"!itemTemplate\">\n                            <span class=\"ui-menuitem-icon \" [ngClass]=\"item.icon\" *ngIf=\"item.icon\"></span>\n                            <span class=\"ui-menuitem-text\">{{item.label}}</span>\n                        </ng-container>\n                        <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item, index: i}\"></ng-container>\n                    </a>\n                    <a *ngIf=\"item.routerLink\" [routerLink]=\"item.routerLink\" [queryParams]=\"item.queryParams\" role=\"presentation\" class=\"ui-menuitem-link ui-corner-all\" (click)=\"itemClick($event,item)\" [attr.tabindex]=\"item.tabindex ? item.tabindex : '0'\"\n                        [attr.target]=\"item.target\" [attr.title]=\"item.title\" [attr.id]=\"item.id\"\n                        [fragment]=\"item.fragment\" [queryParamsHandling]=\"item.queryParamsHandling\" [preserveFragment]=\"item.preserveFragment\" [skipLocationChange]=\"item.skipLocationChange\" [replaceUrl]=\"item.replaceUrl\" [state]=\"item.state\">\n                        <ng-container *ngIf=\"!itemTemplate\">\n                            <span class=\"ui-menuitem-icon \" [ngClass]=\"item.icon\" *ngIf=\"item.icon\"></span>\n                            <span class=\"ui-menuitem-text\">{{item.label}}</span>\n                        </ng-container>\n                        <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item, index: i}\"></ng-container>\n                    </a>\n                </li>\n            </ul>\n        </div>\n    ",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], TabMenu);
    return TabMenu;
}());
export { TabMenu };
var TabMenuModule = /** @class */ (function () {
    function TabMenuModule() {
    }
    TabMenuModule = __decorate([
        NgModule({
            imports: [CommonModule, RouterModule, SharedModule],
            exports: [TabMenu, RouterModule, SharedModule],
            declarations: [TabMenu]
        })
    ], TabMenuModule);
    return TabMenuModule;
}());
export { TabMenuModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibWVudS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvdGFibWVudS8iLCJzb3VyY2VzIjpbInRhYm1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLGVBQWUsRUFBd0MsdUJBQXVCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEksT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRTdDLE9BQU8sRUFBQyxhQUFhLEVBQUUsWUFBWSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3hELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQWtDN0M7SUFBQTtJQTZDQSxDQUFDO0lBN0JHLG9DQUFrQixHQUFsQjtRQUFBLGlCQVlDO1FBWEcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO1lBQ3hCLFFBQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNuQixLQUFLLE1BQU07b0JBQ1AsS0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUN0QyxNQUFNO2dCQUVOO29CQUNJLEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDdEMsTUFBTTthQUNUO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsMkJBQVMsR0FBVCxVQUFVLEtBQVksRUFBRSxJQUFjO1FBQ2xDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixPQUFPO1NBQ1Y7UUFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNULGFBQWEsRUFBRSxLQUFLO2dCQUNwQixJQUFJLEVBQUUsSUFBSTthQUNiLENBQUMsQ0FBQztTQUNOO1FBRUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQTFDUTtRQUFSLEtBQUssRUFBRTswQ0FBbUI7SUFFbEI7UUFBUixLQUFLLEVBQUU7K0NBQXNCO0lBRXJCO1FBQVIsS0FBSyxFQUFFOzBDQUFnQjtJQUVmO1FBQVIsS0FBSyxFQUFFOzBDQUFZO0lBRVg7UUFBUixLQUFLLEVBQUU7K0NBQW9CO0lBRUk7UUFBL0IsZUFBZSxDQUFDLGFBQWEsQ0FBQzs4Q0FBMkI7SUFaakQsT0FBTztRQWhDbkIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFdBQVc7WUFDckIsUUFBUSxFQUFFLGt0RkEyQlQ7WUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztTQUNuRCxDQUFDO09BQ1csT0FBTyxDQTZDbkI7SUFBRCxjQUFDO0NBQUEsQUE3Q0QsSUE2Q0M7U0E3Q1ksT0FBTztBQW9EcEI7SUFBQTtJQUE2QixDQUFDO0lBQWpCLGFBQWE7UUFMekIsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFDLFlBQVksRUFBQyxZQUFZLENBQUM7WUFDakQsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFDLFlBQVksRUFBQyxZQUFZLENBQUM7WUFDNUMsWUFBWSxFQUFFLENBQUMsT0FBTyxDQUFDO1NBQzFCLENBQUM7T0FDVyxhQUFhLENBQUk7SUFBRCxvQkFBQztDQUFBLEFBQTlCLElBQThCO1NBQWpCLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxJbnB1dCxDb250ZW50Q2hpbGRyZW4sUXVlcnlMaXN0LEFmdGVyQ29udGVudEluaXQsVGVtcGxhdGVSZWYsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtNZW51SXRlbX0gZnJvbSAncHJpbWVuZy9hcGknO1xyXG5pbXBvcnQge1ByaW1lVGVtcGxhdGUsIFNoYXJlZE1vZHVsZX0gZnJvbSAncHJpbWVuZy9hcGknO1xyXG5pbXBvcnQge1JvdXRlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLXRhYk1lbnUnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cIid1aS10YWJtZW51IHVpLXdpZGdldCB1aS13aWRnZXQtY29udGVudCB1aS1jb3JuZXItYWxsJ1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cclxuICAgICAgICAgICAgPHVsIGNsYXNzPVwidWktdGFibWVudS1uYXYgdWktaGVscGVyLXJlc2V0IHVpLWhlbHBlci1jbGVhcmZpeCB1aS13aWRnZXQtaGVhZGVyIHVpLWNvcm5lci1hbGxcIiByb2xlPVwidGFibGlzdFwiPlxyXG4gICAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBpdGVtIG9mIG1vZGVsOyBsZXQgaSA9IGluZGV4XCIgcm9sZT1cInRhYlwiIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwiYWN0aXZlSXRlbT09aXRlbVwiIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwiYWN0aXZlSXRlbT09aXRlbVwiXHJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS10YWJtZW51aXRlbSB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci10b3AnOnRydWUsJ3VpLXN0YXRlLWRpc2FibGVkJzppdGVtLmRpc2FibGVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktdGFibWVudWl0ZW0taGFzaWNvbic6aXRlbS5pY29uLCd1aS1zdGF0ZS1hY3RpdmUnOmFjdGl2ZUl0ZW09PWl0ZW0sJ3VpLWhlbHBlci1oaWRkZW4nOiBpdGVtLnZpc2libGUgPT09IGZhbHNlfVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtyb3V0ZXJMaW5rQWN0aXZlXT1cIid1aS1zdGF0ZS1hY3RpdmUnXCIgW3JvdXRlckxpbmtBY3RpdmVPcHRpb25zXT1cIml0ZW0ucm91dGVyTGlua0FjdGl2ZU9wdGlvbnN8fHtleGFjdDpmYWxzZX1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cIiFpdGVtLnJvdXRlckxpbmtcIiBbYXR0ci5ocmVmXT1cIml0ZW0udXJsXCIgY2xhc3M9XCJ1aS1tZW51aXRlbS1saW5rIHVpLWNvcm5lci1hbGxcIiByb2xlPVwicHJlc2VudGF0aW9uXCIgKGNsaWNrKT1cIml0ZW1DbGljaygkZXZlbnQsaXRlbSlcIiBbYXR0ci50YWJpbmRleF09XCJpdGVtLnRhYmluZGV4ID8gaXRlbS50YWJpbmRleCA6ICcwJ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhcmdldF09XCJpdGVtLnRhcmdldFwiIFthdHRyLnRpdGxlXT1cIml0ZW0udGl0bGVcIiBbYXR0ci5pZF09XCJpdGVtLmlkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaXRlbVRlbXBsYXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLWljb24gXCIgW25nQ2xhc3NdPVwiaXRlbS5pY29uXCIgKm5nSWY9XCJpdGVtLmljb25cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLXRleHRcIj57e2l0ZW0ubGFiZWx9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IGl0ZW0sIGluZGV4OiBpfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cIml0ZW0ucm91dGVyTGlua1wiIFtyb3V0ZXJMaW5rXT1cIml0ZW0ucm91dGVyTGlua1wiIFtxdWVyeVBhcmFtc109XCJpdGVtLnF1ZXJ5UGFyYW1zXCIgcm9sZT1cInByZXNlbnRhdGlvblwiIGNsYXNzPVwidWktbWVudWl0ZW0tbGluayB1aS1jb3JuZXItYWxsXCIgKGNsaWNrKT1cIml0ZW1DbGljaygkZXZlbnQsaXRlbSlcIiBbYXR0ci50YWJpbmRleF09XCJpdGVtLnRhYmluZGV4ID8gaXRlbS50YWJpbmRleCA6ICcwJ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhcmdldF09XCJpdGVtLnRhcmdldFwiIFthdHRyLnRpdGxlXT1cIml0ZW0udGl0bGVcIiBbYXR0ci5pZF09XCJpdGVtLmlkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2ZyYWdtZW50XT1cIml0ZW0uZnJhZ21lbnRcIiBbcXVlcnlQYXJhbXNIYW5kbGluZ109XCJpdGVtLnF1ZXJ5UGFyYW1zSGFuZGxpbmdcIiBbcHJlc2VydmVGcmFnbWVudF09XCJpdGVtLnByZXNlcnZlRnJhZ21lbnRcIiBbc2tpcExvY2F0aW9uQ2hhbmdlXT1cIml0ZW0uc2tpcExvY2F0aW9uQ2hhbmdlXCIgW3JlcGxhY2VVcmxdPVwiaXRlbS5yZXBsYWNlVXJsXCIgW3N0YXRlXT1cIml0ZW0uc3RhdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpdGVtVGVtcGxhdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktbWVudWl0ZW0taWNvbiBcIiBbbmdDbGFzc109XCJpdGVtLmljb25cIiAqbmdJZj1cIml0ZW0uaWNvblwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktbWVudWl0ZW0tdGV4dFwiPnt7aXRlbS5sYWJlbH19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogaXRlbSwgaW5kZXg6IGl9XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgPC91bD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcclxufSlcclxuZXhwb3J0IGNsYXNzIFRhYk1lbnUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcclxuXHJcbiAgICBASW5wdXQoKSBtb2RlbDogTWVudUl0ZW1bXTtcclxuXHJcbiAgICBASW5wdXQoKSBhY3RpdmVJdGVtOiBNZW51SXRlbTtcclxuXHJcbiAgICBASW5wdXQoKSBwb3B1cDogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcclxuXHJcbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PGFueT47XHJcblxyXG4gICAgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgICAgICB0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIHN3aXRjaChpdGVtLmdldFR5cGUoKSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnaXRlbSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpdGVtQ2xpY2soZXZlbnQ6IEV2ZW50LCBpdGVtOiBNZW51SXRlbSnCoHtcclxuICAgICAgICBpZiAoaXRlbS5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaXRlbS5jb21tYW5kKSB7XHJcbiAgICAgICAgICAgIGl0ZW0uY29tbWFuZCh7XHJcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgICAgIGl0ZW06IGl0ZW1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSBpdGVtO1xyXG4gICAgfVxyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSxSb3V0ZXJNb2R1bGUsU2hhcmVkTW9kdWxlXSxcclxuICAgIGV4cG9ydHM6IFtUYWJNZW51LFJvdXRlck1vZHVsZSxTaGFyZWRNb2R1bGVdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbVGFiTWVudV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFRhYk1lbnVNb2R1bGUgeyB9XHJcbiJdfQ==