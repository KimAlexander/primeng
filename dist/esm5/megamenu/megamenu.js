var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, Input, Renderer2, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { RouterModule } from '@angular/router';
var MegaMenu = /** @class */ (function () {
    function MegaMenu(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.orientation = 'horizontal';
        this.autoZIndex = true;
        this.baseZIndex = 0;
    }
    MegaMenu.prototype.onItemMouseEnter = function (event, item, menuitem) {
        if (menuitem.disabled) {
            return;
        }
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
        this.activeItem = item;
        if (menuitem.items) {
            var submenu = item.children[0].nextElementSibling;
            if (submenu) {
                if (this.autoZIndex) {
                    submenu.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
                }
                if (this.orientation === 'horizontal') {
                    submenu.style.top = DomHandler.getOuterHeight(item.children[0]) + 'px';
                    submenu.style.left = '0px';
                }
                else if (this.orientation === 'vertical') {
                    submenu.style.top = '0px';
                    submenu.style.left = DomHandler.getOuterWidth(item.children[0]) + 'px';
                }
            }
        }
    };
    MegaMenu.prototype.onItemMouseLeave = function (event, link) {
        var _this = this;
        this.hideTimeout = setTimeout(function () {
            _this.activeItem = null;
        }, 1000);
    };
    MegaMenu.prototype.itemClick = function (event, item) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }
        if (!item.url) {
            event.preventDefault();
        }
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
        this.activeItem = null;
    };
    MegaMenu.prototype.getColumnClass = function (menuitem) {
        var length = menuitem.items ? menuitem.items.length : 0;
        var columnClass;
        switch (length) {
            case 2:
                columnClass = 'ui-g-6';
                break;
            case 3:
                columnClass = 'ui-g-4';
                break;
            case 4:
                columnClass = 'ui-g-3';
                break;
            case 6:
                columnClass = 'ui-g-2';
                break;
            default:
                columnClass = 'ui-g-12';
                break;
        }
        return columnClass;
    };
    MegaMenu.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    __decorate([
        Input()
    ], MegaMenu.prototype, "model", void 0);
    __decorate([
        Input()
    ], MegaMenu.prototype, "style", void 0);
    __decorate([
        Input()
    ], MegaMenu.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], MegaMenu.prototype, "orientation", void 0);
    __decorate([
        Input()
    ], MegaMenu.prototype, "autoZIndex", void 0);
    __decorate([
        Input()
    ], MegaMenu.prototype, "baseZIndex", void 0);
    MegaMenu = __decorate([
        Component({
            selector: 'p-megaMenu',
            template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\"\n            [ngClass]=\"{'ui-megamenu ui-widget ui-widget-content ui-corner-all':true,'ui-megamenu-horizontal': orientation == 'horizontal','ui-megamenu-vertical': orientation == 'vertical'}\">\n            <ul class=\"ui-megamenu-root-list\" role=\"menubar\">\n                <ng-template ngFor let-category [ngForOf]=\"model\">\n                    <li *ngIf=\"category.separator\" class=\"ui-menu-separator ui-widget-content\" [ngClass]=\"{'ui-helper-hidden': category.visible === false}\">\n                    <li *ngIf=\"!category.separator\" #item [ngClass]=\"{'ui-menuitem ui-corner-all':true,'ui-menuitem-active':item==activeItem, 'ui-helper-hidden': category.visible === false}\"\n                        (mouseenter)=\"onItemMouseEnter($event, item, category)\" (mouseleave)=\"onItemMouseLeave($event, item)\">\n   \n                        <a *ngIf=\"!category.routerLink\" [href]=\"category.url||'#'\" [attr.target]=\"category.target\" [attr.title]=\"category.title\" [attr.id]=\"category.id\" (click)=\"itemClick($event, category)\" [attr.tabindex]=\"category.tabindex ? category.tabindex : '0'\"\n                            [ngClass]=\"{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':category.disabled}\" [ngStyle]=\"category.style\" [class]=\"category.styleClass\">\n                            <span class=\"ui-menuitem-icon\" *ngIf=\"category.icon\" [ngClass]=\"category.icon\"></span>\n                            <span class=\"ui-menuitem-text\">{{category.label}}</span>\n                            <span *ngIf=\"category.items\" class=\"ui-submenu-icon pi pi-fw\" [ngClass]=\"{'pi-caret-down':orientation=='horizontal','pi-caret-right':orientation=='vertical'}\"></span>\n                        </a>\n                        <a *ngIf=\"category.routerLink\" [routerLink]=\"category.routerLink\" [queryParams]=\"category.queryParams\" [routerLinkActive]=\"'ui-menuitem-link-active'\" [routerLinkActiveOptions]=\"category.routerLinkActiveOptions||{exact:false}\" [attr.tabindex]=\"category.tabindex ? category.tabindex : '0'\" \n                            [attr.target]=\"category.target\" [attr.title]=\"category.title\" [attr.id]=\"category.id\"\n                            (click)=\"itemClick($event, category)\" [ngClass]=\"{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':category.disabled}\" [ngStyle]=\"category.style\" [class]=\"category.styleClass\"\n                            [fragment]=\"category.fragment\" [queryParamsHandling]=\"category.queryParamsHandling\" [preserveFragment]=\"category.preserveFragment\" [skipLocationChange]=\"category.skipLocationChange\" [replaceUrl]=\"category.replaceUrl\" [state]=\"category.state\">\n                            <span class=\"ui-menuitem-icon\" *ngIf=\"category.icon\" [ngClass]=\"category.icon\"></span>\n                            <span class=\"ui-menuitem-text\">{{category.label}}</span>\n                        </a>\n\n                        <div class=\"ui-megamenu-panel ui-widget-content ui-corner-all ui-shadow\" *ngIf=\"category.items\">\n                            <div class=\"ui-g\">\n                                <ng-template ngFor let-column [ngForOf]=\"category.items\">\n                                    <div [class]=\"getColumnClass(category)\">\n                                        <ng-template ngFor let-submenu [ngForOf]=\"column\">\n                                            <ul class=\"ui-megamenu-submenu\" role=\"menu\">\n                                                <li class=\"ui-widget-header ui-megamenu-submenu-header ui-corner-all\">{{submenu.label}}</li>\n                                                <ng-template ngFor let-item [ngForOf]=\"submenu.items\">\n                                                    <li *ngIf=\"item.separator\" class=\"ui-menu-separator ui-widget-content\" [ngClass]=\"{'ui-helper-hidden': item.visible === false}\" role=\"separator\">\n                                                    <li *ngIf=\"!item.separator\" class=\"ui-menuitem ui-corner-all\" [ngClass]=\"{'ui-helper-hidden': item.visible === false}\" role=\"none\">\n                                                        <a *ngIf=\"!item.routerLink\" role=\"menuitem\" [href]=\"item.url||'#'\" class=\"ui-menuitem-link ui-corner-all\" [attr.target]=\"item.target\" [attr.title]=\"item.title\" [attr.id]=\"item.id\" [attr.tabindex]=\"item.tabindex ? item.tabindex : '0'\"\n                                                            [ngClass]=\"{'ui-state-disabled':item.disabled}\" (click)=\"itemClick($event, item)\">\n                                                            <span class=\"ui-menuitem-icon\" *ngIf=\"item.icon\" [ngClass]=\"item.icon\"></span>\n                                                            <span class=\"ui-menuitem-text\">{{item.label}}</span>\n                                                        </a>\n                                                        <a *ngIf=\"item.routerLink\" role=\"menuitem\" [routerLink]=\"item.routerLink\" [queryParams]=\"item.queryParams\" [routerLinkActive]=\"'ui-menuitem-link-active'\" [attr.tabindex]=\"item.tabindex ? item.tabindex : '0'\"\n                                                            [routerLinkActiveOptions]=\"item.routerLinkActiveOptions||{exact:false}\" class=\"ui-menuitem-link ui-corner-all\" \n                                                             [attr.target]=\"item.target\" [attr.title]=\"item.title\" [attr.id]=\"item.id\"\n                                                            [ngClass]=\"{'ui-state-disabled':item.disabled}\" (click)=\"itemClick($event, item)\"\n                                                            [fragment]=\"item.fragment\" [queryParamsHandling]=\"item.queryParamsHandling\" [preserveFragment]=\"item.preserveFragment\" [skipLocationChange]=\"item.skipLocationChange\" [replaceUrl]=\"item.replaceUrl\" [state]=\"item.state\">\n                                                            <span class=\"ui-menuitem-icon\" *ngIf=\"item.icon\" [ngClass]=\"item.icon\"></span>\n                                                            <span class=\"ui-menuitem-text\">{{item.label}}</span>\n                                                        </a>\n                                                    </li>\n                                                </ng-template>\n                                            </ul>\n                                        </ng-template>\n                                    </div>\n                                </ng-template>\n                            </div>\n                        </div>\n                    </li>\n                </ng-template>\n                <li class=\"ui-menuitem ui-menuitem-custom ui-corner-all\" *ngIf=\"orientation === 'horizontal'\">\n                    <ng-content></ng-content>\n                </li>\n            </ul>\n        </div>\n    ",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], MegaMenu);
    return MegaMenu;
}());
export { MegaMenu };
var MegaMenuModule = /** @class */ (function () {
    function MegaMenuModule() {
    }
    MegaMenuModule = __decorate([
        NgModule({
            imports: [CommonModule, RouterModule],
            exports: [MegaMenu, RouterModule],
            declarations: [MegaMenu]
        })
    ], MegaMenuModule);
    return MegaMenuModule;
}());
export { MegaMenuModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVnYW1lbnUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL21lZ2FtZW51LyIsInNvdXJjZXMiOlsibWVnYW1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDcEcsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFFdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBb0U3QztJQWtCSSxrQkFBbUIsRUFBYyxFQUFTLFFBQW1CO1FBQTFDLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBVnBELGdCQUFXLEdBQVcsWUFBWSxDQUFDO1FBRW5DLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFM0IsZUFBVSxHQUFXLENBQUMsQ0FBQztJQU1nQyxDQUFDO0lBRWpFLG1DQUFnQixHQUFoQixVQUFpQixLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQXNCO1FBQ2hELElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRTtZQUNuQixPQUFPO1NBQ1Y7UUFFRCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbEIsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztTQUMzQjtRQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBRXZCLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRTtZQUNoQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDO1lBQ2xELElBQUksT0FBTyxFQUFFO2dCQUNULElBQUks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RCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztTQUNuRCxDQUFDO09BQ1csUUFBUSxDQXdHcEI7SUFBRCxlQUFDO0NBQUEsQUF4R0QsSUF3R0M7U0F4R1ksUUFBUTtBQStHckI7SUFBQTtJQUE4QixDQUFDO0lBQWxCLGNBQWM7UUFMMUIsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFDLFlBQVksQ0FBQztZQUNwQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUMsWUFBWSxDQUFDO1lBQ2hDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQztTQUMzQixDQUFDO09BQ1csY0FBYyxDQUFJO0lBQUQscUJBQUM7Q0FBQSxBQUEvQixJQUErQjtTQUFsQixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsRWxlbWVudFJlZixJbnB1dCxSZW5kZXJlcjIsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICdwcmltZW5nL2RvbSc7XHJcbmltcG9ydCB7TWVnYU1lbnVJdGVtLE1lbnVJdGVtfSBmcm9tICdwcmltZW5nL2FwaSc7XHJcbmltcG9ydCB7Um91dGVyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3AtbWVnYU1lbnUnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwic3R5bGVcIlxyXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLW1lZ2FtZW51IHVpLXdpZGdldCB1aS13aWRnZXQtY29udGVudCB1aS1jb3JuZXItYWxsJzp0cnVlLCd1aS1tZWdhbWVudS1ob3Jpem9udGFsJzogb3JpZW50YXRpb24gPT0gJ2hvcml6b250YWwnLCd1aS1tZWdhbWVudS12ZXJ0aWNhbCc6IG9yaWVudGF0aW9uID09ICd2ZXJ0aWNhbCd9XCI+XHJcbiAgICAgICAgICAgIDx1bCBjbGFzcz1cInVpLW1lZ2FtZW51LXJvb3QtbGlzdFwiIHJvbGU9XCJtZW51YmFyXCI+XHJcbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWNhdGVnb3J5IFtuZ0Zvck9mXT1cIm1vZGVsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpICpuZ0lmPVwiY2F0ZWdvcnkuc2VwYXJhdG9yXCIgY2xhc3M9XCJ1aS1tZW51LXNlcGFyYXRvciB1aS13aWRnZXQtY29udGVudFwiIFtuZ0NsYXNzXT1cInsndWktaGVscGVyLWhpZGRlbic6IGNhdGVnb3J5LnZpc2libGUgPT09IGZhbHNlfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cIiFjYXRlZ29yeS5zZXBhcmF0b3JcIiAjaXRlbSBbbmdDbGFzc109XCJ7J3VpLW1lbnVpdGVtIHVpLWNvcm5lci1hbGwnOnRydWUsJ3VpLW1lbnVpdGVtLWFjdGl2ZSc6aXRlbT09YWN0aXZlSXRlbSwgJ3VpLWhlbHBlci1oaWRkZW4nOiBjYXRlZ29yeS52aXNpYmxlID09PSBmYWxzZX1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAobW91c2VlbnRlcik9XCJvbkl0ZW1Nb3VzZUVudGVyKCRldmVudCwgaXRlbSwgY2F0ZWdvcnkpXCIgKG1vdXNlbGVhdmUpPVwib25JdGVtTW91c2VMZWF2ZSgkZXZlbnQsIGl0ZW0pXCI+XHJcbiAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cIiFjYXRlZ29yeS5yb3V0ZXJMaW5rXCIgW2hyZWZdPVwiY2F0ZWdvcnkudXJsfHwnIydcIiBbYXR0ci50YXJnZXRdPVwiY2F0ZWdvcnkudGFyZ2V0XCIgW2F0dHIudGl0bGVdPVwiY2F0ZWdvcnkudGl0bGVcIiBbYXR0ci5pZF09XCJjYXRlZ29yeS5pZFwiIChjbGljayk9XCJpdGVtQ2xpY2soJGV2ZW50LCBjYXRlZ29yeSlcIiBbYXR0ci50YWJpbmRleF09XCJjYXRlZ29yeS50YWJpbmRleCA/IGNhdGVnb3J5LnRhYmluZGV4IDogJzAnXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktbWVudWl0ZW0tbGluayB1aS1jb3JuZXItYWxsJzp0cnVlLCd1aS1zdGF0ZS1kaXNhYmxlZCc6Y2F0ZWdvcnkuZGlzYWJsZWR9XCIgW25nU3R5bGVdPVwiY2F0ZWdvcnkuc3R5bGVcIiBbY2xhc3NdPVwiY2F0ZWdvcnkuc3R5bGVDbGFzc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS1pY29uXCIgKm5nSWY9XCJjYXRlZ29yeS5pY29uXCIgW25nQ2xhc3NdPVwiY2F0ZWdvcnkuaWNvblwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktbWVudWl0ZW0tdGV4dFwiPnt7Y2F0ZWdvcnkubGFiZWx9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiY2F0ZWdvcnkuaXRlbXNcIiBjbGFzcz1cInVpLXN1Ym1lbnUtaWNvbiBwaSBwaS1md1wiIFtuZ0NsYXNzXT1cInsncGktY2FyZXQtZG93bic6b3JpZW50YXRpb249PSdob3Jpem9udGFsJywncGktY2FyZXQtcmlnaHQnOm9yaWVudGF0aW9uPT0ndmVydGljYWwnfVwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cImNhdGVnb3J5LnJvdXRlckxpbmtcIiBbcm91dGVyTGlua109XCJjYXRlZ29yeS5yb3V0ZXJMaW5rXCIgW3F1ZXJ5UGFyYW1zXT1cImNhdGVnb3J5LnF1ZXJ5UGFyYW1zXCIgW3JvdXRlckxpbmtBY3RpdmVdPVwiJ3VpLW1lbnVpdGVtLWxpbmstYWN0aXZlJ1wiIFtyb3V0ZXJMaW5rQWN0aXZlT3B0aW9uc109XCJjYXRlZ29yeS5yb3V0ZXJMaW5rQWN0aXZlT3B0aW9uc3x8e2V4YWN0OmZhbHNlfVwiIFthdHRyLnRhYmluZGV4XT1cImNhdGVnb3J5LnRhYmluZGV4ID8gY2F0ZWdvcnkudGFiaW5kZXggOiAnMCdcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhcmdldF09XCJjYXRlZ29yeS50YXJnZXRcIiBbYXR0ci50aXRsZV09XCJjYXRlZ29yeS50aXRsZVwiIFthdHRyLmlkXT1cImNhdGVnb3J5LmlkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJpdGVtQ2xpY2soJGV2ZW50LCBjYXRlZ29yeSlcIiBbbmdDbGFzc109XCJ7J3VpLW1lbnVpdGVtLWxpbmsgdWktY29ybmVyLWFsbCc6dHJ1ZSwndWktc3RhdGUtZGlzYWJsZWQnOmNhdGVnb3J5LmRpc2FibGVkfVwiIFtuZ1N0eWxlXT1cImNhdGVnb3J5LnN0eWxlXCIgW2NsYXNzXT1cImNhdGVnb3J5LnN0eWxlQ2xhc3NcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2ZyYWdtZW50XT1cImNhdGVnb3J5LmZyYWdtZW50XCIgW3F1ZXJ5UGFyYW1zSGFuZGxpbmddPVwiY2F0ZWdvcnkucXVlcnlQYXJhbXNIYW5kbGluZ1wiIFtwcmVzZXJ2ZUZyYWdtZW50XT1cImNhdGVnb3J5LnByZXNlcnZlRnJhZ21lbnRcIiBbc2tpcExvY2F0aW9uQ2hhbmdlXT1cImNhdGVnb3J5LnNraXBMb2NhdGlvbkNoYW5nZVwiIFtyZXBsYWNlVXJsXT1cImNhdGVnb3J5LnJlcGxhY2VVcmxcIiBbc3RhdGVdPVwiY2F0ZWdvcnkuc3RhdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktbWVudWl0ZW0taWNvblwiICpuZ0lmPVwiY2F0ZWdvcnkuaWNvblwiIFtuZ0NsYXNzXT1cImNhdGVnb3J5Lmljb25cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLXRleHRcIj57e2NhdGVnb3J5LmxhYmVsfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1tZWdhbWVudS1wYW5lbCB1aS13aWRnZXQtY29udGVudCB1aS1jb3JuZXItYWxsIHVpLXNoYWRvd1wiICpuZ0lmPVwiY2F0ZWdvcnkuaXRlbXNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1jb2x1bW4gW25nRm9yT2ZdPVwiY2F0ZWdvcnkuaXRlbXNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBbY2xhc3NdPVwiZ2V0Q29sdW1uQ2xhc3MoY2F0ZWdvcnkpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LXN1Ym1lbnUgW25nRm9yT2ZdPVwiY29sdW1uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwidWktbWVnYW1lbnUtc3VibWVudVwiIHJvbGU9XCJtZW51XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInVpLXdpZGdldC1oZWFkZXIgdWktbWVnYW1lbnUtc3VibWVudS1oZWFkZXIgdWktY29ybmVyLWFsbFwiPnt7c3VibWVudS5sYWJlbH19PC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1pdGVtIFtuZ0Zvck9mXT1cInN1Ym1lbnUuaXRlbXNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cIml0ZW0uc2VwYXJhdG9yXCIgY2xhc3M9XCJ1aS1tZW51LXNlcGFyYXRvciB1aS13aWRnZXQtY29udGVudFwiIFtuZ0NsYXNzXT1cInsndWktaGVscGVyLWhpZGRlbic6IGl0ZW0udmlzaWJsZSA9PT0gZmFsc2V9XCIgcm9sZT1cInNlcGFyYXRvclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpICpuZ0lmPVwiIWl0ZW0uc2VwYXJhdG9yXCIgY2xhc3M9XCJ1aS1tZW51aXRlbSB1aS1jb3JuZXItYWxsXCIgW25nQ2xhc3NdPVwieyd1aS1oZWxwZXItaGlkZGVuJzogaXRlbS52aXNpYmxlID09PSBmYWxzZX1cIiByb2xlPVwibm9uZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwiIWl0ZW0ucm91dGVyTGlua1wiIHJvbGU9XCJtZW51aXRlbVwiIFtocmVmXT1cIml0ZW0udXJsfHwnIydcIiBjbGFzcz1cInVpLW1lbnVpdGVtLWxpbmsgdWktY29ybmVyLWFsbFwiIFthdHRyLnRhcmdldF09XCJpdGVtLnRhcmdldFwiIFthdHRyLnRpdGxlXT1cIml0ZW0udGl0bGVcIiBbYXR0ci5pZF09XCJpdGVtLmlkXCIgW2F0dHIudGFiaW5kZXhdPVwiaXRlbS50YWJpbmRleCA/IGl0ZW0udGFiaW5kZXggOiAnMCdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWRpc2FibGVkJzppdGVtLmRpc2FibGVkfVwiIChjbGljayk9XCJpdGVtQ2xpY2soJGV2ZW50LCBpdGVtKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLWljb25cIiAqbmdJZj1cIml0ZW0uaWNvblwiIFtuZ0NsYXNzXT1cIml0ZW0uaWNvblwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS10ZXh0XCI+e3tpdGVtLmxhYmVsfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwiaXRlbS5yb3V0ZXJMaW5rXCIgcm9sZT1cIm1lbnVpdGVtXCIgW3JvdXRlckxpbmtdPVwiaXRlbS5yb3V0ZXJMaW5rXCIgW3F1ZXJ5UGFyYW1zXT1cIml0ZW0ucXVlcnlQYXJhbXNcIiBbcm91dGVyTGlua0FjdGl2ZV09XCIndWktbWVudWl0ZW0tbGluay1hY3RpdmUnXCIgW2F0dHIudGFiaW5kZXhdPVwiaXRlbS50YWJpbmRleCA/IGl0ZW0udGFiaW5kZXggOiAnMCdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcm91dGVyTGlua0FjdGl2ZU9wdGlvbnNdPVwiaXRlbS5yb3V0ZXJMaW5rQWN0aXZlT3B0aW9uc3x8e2V4YWN0OmZhbHNlfVwiIGNsYXNzPVwidWktbWVudWl0ZW0tbGluayB1aS1jb3JuZXItYWxsXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YXJnZXRdPVwiaXRlbS50YXJnZXRcIiBbYXR0ci50aXRsZV09XCJpdGVtLnRpdGxlXCIgW2F0dHIuaWRdPVwiaXRlbS5pZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtZGlzYWJsZWQnOml0ZW0uZGlzYWJsZWR9XCIgKGNsaWNrKT1cIml0ZW1DbGljaygkZXZlbnQsIGl0ZW0pXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2ZyYWdtZW50XT1cIml0ZW0uZnJhZ21lbnRcIiBbcXVlcnlQYXJhbXNIYW5kbGluZ109XCJpdGVtLnF1ZXJ5UGFyYW1zSGFuZGxpbmdcIiBbcHJlc2VydmVGcmFnbWVudF09XCJpdGVtLnByZXNlcnZlRnJhZ21lbnRcIiBbc2tpcExvY2F0aW9uQ2hhbmdlXT1cIml0ZW0uc2tpcExvY2F0aW9uQ2hhbmdlXCIgW3JlcGxhY2VVcmxdPVwiaXRlbS5yZXBsYWNlVXJsXCIgW3N0YXRlXT1cIml0ZW0uc3RhdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS1pY29uXCIgKm5nSWY9XCJpdGVtLmljb25cIiBbbmdDbGFzc109XCJpdGVtLmljb25cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktbWVudWl0ZW0tdGV4dFwiPnt7aXRlbS5sYWJlbH19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJ1aS1tZW51aXRlbSB1aS1tZW51aXRlbS1jdXN0b20gdWktY29ybmVyLWFsbFwiICpuZ0lmPVwib3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNZWdhTWVudSB7XHJcblxyXG4gICAgQElucHV0KCkgbW9kZWw6IE1lZ2FNZW51SXRlbVtdO1xyXG5cclxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBvcmllbnRhdGlvbjogc3RyaW5nID0gJ2hvcml6b250YWwnO1xyXG5cclxuICAgIEBJbnB1dCgpIGF1dG9aSW5kZXg6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIGJhc2VaSW5kZXg6IG51bWJlciA9IDA7XHJcbiAgICBcclxuICAgIGFjdGl2ZUl0ZW06IGFueTtcclxuXHJcbiAgICBoaWRlVGltZW91dDogYW55O1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxyXG4gICAgXHJcbiAgICBvbkl0ZW1Nb3VzZUVudGVyKGV2ZW50LCBpdGVtLCBtZW51aXRlbTogTWVnYU1lbnVJdGVtKSB7XHJcbiAgICAgICAgaWYgKG1lbnVpdGVtLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmhpZGVUaW1lb3V0KSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmhpZGVUaW1lb3V0KTtcclxuICAgICAgICAgICAgdGhpcy5oaWRlVGltZW91dCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IGl0ZW07XHJcblxyXG4gICAgICAgIGlmIChtZW51aXRlbS5pdGVtcykge1xyXG4gICAgICAgICAgICBsZXQgc3VibWVudSA9IGl0ZW0uY2hpbGRyZW5bMF0ubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICBpZiAoc3VibWVudSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXV0b1pJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1Ym1lbnUuc3R5bGUuekluZGV4ID0gU3RyaW5nKHRoaXMuYmFzZVpJbmRleCArICgrK0RvbUhhbmRsZXIuemluZGV4KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1Ym1lbnUuc3R5bGUudG9wID0gRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodChpdGVtLmNoaWxkcmVuWzBdKSArICdweCc7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VibWVudS5zdHlsZS5sZWZ0ID0gJzBweCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VibWVudS5zdHlsZS50b3AgPSAnMHB4JztcclxuICAgICAgICAgICAgICAgICAgICBzdWJtZW51LnN0eWxlLmxlZnQgPSBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgoaXRlbS5jaGlsZHJlblswXSkgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvbkl0ZW1Nb3VzZUxlYXZlKGV2ZW50LCBsaW5rKSB7XHJcbiAgICAgICAgdGhpcy5oaWRlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSBudWxsO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpdGVtQ2xpY2soZXZlbnQsIGl0ZW06IE1lbnVJdGVtIHwgTWVnYU1lbnVJdGVtKcKge1xyXG4gICAgICAgIGlmIChpdGVtLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCFpdGVtLnVybCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAoaXRlbS5jb21tYW5kKSB7XHJcbiAgICAgICAgICAgIGl0ZW0uY29tbWFuZCh7XHJcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgICAgIGl0ZW06IGl0ZW1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSBudWxsO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXRDb2x1bW5DbGFzcyhtZW51aXRlbTogTWVnYU1lbnVJdGVtKSB7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IG1lbnVpdGVtLml0ZW1zID8gbWVudWl0ZW0uaXRlbXMubGVuZ3RoOiAwO1xyXG4gICAgICAgIGxldCBjb2x1bW5DbGFzcztcclxuICAgICAgICBzd2l0Y2gobGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIGNvbHVtbkNsYXNzPSAndWktZy02JztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5DbGFzcz0gJ3VpLWctNCc7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgY29sdW1uQ2xhc3M9ICd1aS1nLTMnO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgIGNvbHVtbkNsYXNzPSAndWktZy0yJztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgY29sdW1uQ2xhc3M9ICd1aS1nLTEyJztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBjb2x1bW5DbGFzcztcclxuICAgIH1cclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsUm91dGVyTW9kdWxlXSxcclxuICAgIGV4cG9ydHM6IFtNZWdhTWVudSxSb3V0ZXJNb2R1bGVdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbTWVnYU1lbnVdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNZWdhTWVudU1vZHVsZSB7IH0iXX0=