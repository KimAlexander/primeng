var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, Input, Renderer2, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { RouterModule } from '@angular/router';
var MenubarSub = /** @class */ (function () {
    function MenubarSub(renderer, cd) {
        this.renderer = renderer;
        this.cd = cd;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.menuHoverActive = false;
    }
    Object.defineProperty(MenubarSub.prototype, "parentActive", {
        get: function () {
            return this._parentActive;
        },
        set: function (value) {
            if (!this.root) {
                this._parentActive = value;
                if (!value)
                    this.activeItem = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    MenubarSub.prototype.onItemMenuClick = function (event, item, menuitem) {
        if (!this.autoDisplay) {
            if (menuitem.disabled) {
                return;
            }
            this.activeItem = this.activeMenu ? (this.activeMenu.isEqualNode(item) ? null : item) : item;
            var nextElement = item.children[0].nextElementSibling;
            if (nextElement) {
                var sublist = nextElement.children[0];
                if (this.autoZIndex) {
                    sublist.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
                }
                if (this.root) {
                    sublist.style.top = DomHandler.getOuterHeight(item.children[0]) + 'px';
                    sublist.style.left = '0px';
                }
                else {
                    sublist.style.top = '0px';
                    sublist.style.left = DomHandler.getOuterWidth(item.children[0]) + 'px';
                }
            }
            this.menuClick = true;
            this.menuHoverActive = this.activeMenu ? (!this.activeMenu.isEqualNode(item)) : true;
            this.activeMenu = this.activeMenu ? (this.activeMenu.isEqualNode(item) ? null : item) : item;
            this.bindEventListener();
        }
    };
    MenubarSub.prototype.bindEventListener = function () {
        var _this = this;
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', function (event) {
                if (!_this.menuClick) {
                    _this.activeItem = null;
                    _this.menuHoverActive = false;
                    _this.activeMenu = false;
                }
                _this.menuClick = false;
            });
        }
    };
    MenubarSub.prototype.onItemMouseEnter = function (event, item, menuitem) {
        if (this.autoDisplay || (!this.autoDisplay && this.root && this.menuHoverActive)) {
            if (menuitem.disabled) {
                return;
            }
            if ((this.activeItem && !this.activeItem.isEqualNode(item) || !this.activeItem)) {
                this.activeItem = item;
                var nextElement = item.children[0].nextElementSibling;
                if (nextElement) {
                    var sublist = nextElement.children[0];
                    sublist.style.zIndex = String(++DomHandler.zindex);
                    if (this.root) {
                        sublist.style.top = DomHandler.getOuterHeight(item.children[0]) + 'px';
                        sublist.style.left = '0px';
                    }
                    else {
                        sublist.style.top = '0px';
                        sublist.style.left = DomHandler.getOuterWidth(item.children[0]) + 'px';
                    }
                }
                this.activeMenu = item;
            }
        }
    };
    MenubarSub.prototype.itemClick = function (event, item) {
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
    MenubarSub.prototype.listClick = function (event) {
        if (this.autoDisplay) {
            this.activeItem = null;
        }
    };
    MenubarSub.prototype.ngOnDestroy = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    };
    MenubarSub.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], MenubarSub.prototype, "item", void 0);
    __decorate([
        Input()
    ], MenubarSub.prototype, "root", void 0);
    __decorate([
        Input()
    ], MenubarSub.prototype, "autoDisplay", void 0);
    __decorate([
        Input()
    ], MenubarSub.prototype, "autoZIndex", void 0);
    __decorate([
        Input()
    ], MenubarSub.prototype, "baseZIndex", void 0);
    __decorate([
        Input()
    ], MenubarSub.prototype, "parentActive", null);
    MenubarSub = __decorate([
        Component({
            selector: 'p-menubarSub',
            template: "\n        <ul [ngClass]=\"{'ui-menubar-root-list':root, 'ui-widget-content ui-corner-all ui-submenu-list ui-shadow':!root}\"\n            (click)=\"listClick($event)\">\n            <ng-template ngFor let-child [ngForOf]=\"(root ? item : item.items)\">\n                <li *ngIf=\"child.separator\" class=\"ui-menu-separator ui-widget-content\" [ngClass]=\"{'ui-helper-hidden': child.visible === false}\">\n                <li *ngIf=\"!child.separator\" #listItem [ngClass]=\"{'ui-menuitem ui-corner-all':true,\n                        'ui-menu-parent':child.items,'ui-menuitem-active':listItem==activeItem,'ui-helper-hidden': child.visible === false}\"\n                        (mouseenter)=\"onItemMouseEnter($event,listItem,child)\" (click)=\"onItemMenuClick($event, listItem, child)\">\n                    <a *ngIf=\"!child.routerLink\" [href]=\"child.url||'#'\" [attr.data-automationid]=\"child.automationId\" [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\" (click)=\"itemClick($event, child)\"\n                         [ngClass]=\"{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':child.disabled}\" [ngStyle]=\"child.style\" [class]=\"child.styleClass\" \n                         [attr.tabindex]=\"child.tabindex ? child.tabindex : '0'\" [attr.aria-haspopup]=\"item.items != null\" [attr.aria-expanded]=\"item === activeItem\">\n                        <span class=\"ui-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                        <span class=\"ui-submenu-icon pi pi-fw\" *ngIf=\"child.items\" [ngClass]=\"{'pi-caret-down':root,'pi-caret-right':!root}\"></span>\n                    </a>\n                    <a *ngIf=\"child.routerLink\" [routerLink]=\"child.routerLink\" [attr.data-automationid]=\"child.automationId\" [queryParams]=\"child.queryParams\" [routerLinkActive]=\"'ui-menuitem-link-active'\" [routerLinkActiveOptions]=\"child.routerLinkActiveOptions||{exact:false}\"\n                        [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\" [attr.tabindex]=\"child.tabindex ? child.tabindex : '0'\" role=\"menuitem\"\n                        (click)=\"itemClick($event, child)\" [ngClass]=\"{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':child.disabled}\" [ngStyle]=\"child.style\" [class]=\"child.styleClass\"\n                        [fragment]=\"child.fragment\" [queryParamsHandling]=\"child.queryParamsHandling\" [preserveFragment]=\"child.preserveFragment\" [skipLocationChange]=\"child.skipLocationChange\" [replaceUrl]=\"child.replaceUrl\" [state]=\"child.state\">\n                        <span class=\"ui-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                        <span class=\"ui-submenu-icon pi pi-fw\" *ngIf=\"child.items\" [ngClass]=\"{'pi-caret-down':root,'pi-caret-right':!root}\"></span>\n                    </a>\n                    <p-menubarSub class=\"ui-submenu\" [parentActive]=\"listItem==activeItem\" [item]=\"child\" *ngIf=\"child.items\" [autoDisplay]=\"true\"></p-menubarSub>\n                </li>\n            </ng-template>\n        </ul>\n    "
        })
    ], MenubarSub);
    return MenubarSub;
}());
export { MenubarSub };
var Menubar = /** @class */ (function () {
    function Menubar(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.autoZIndex = true;
        this.baseZIndex = 0;
    }
    Object.defineProperty(Menubar.prototype, "autoDisplay", {
        get: function () {
            return this._autoDisplay;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menubar.prototype, "utc", {
        set: function (_utc) {
            console.log("AutoDisplay property is deprecated and functionality is not available.");
        },
        enumerable: true,
        configurable: true
    });
    Menubar.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    __decorate([
        Input()
    ], Menubar.prototype, "model", void 0);
    __decorate([
        Input()
    ], Menubar.prototype, "style", void 0);
    __decorate([
        Input()
    ], Menubar.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], Menubar.prototype, "autoZIndex", void 0);
    __decorate([
        Input()
    ], Menubar.prototype, "baseZIndex", void 0);
    __decorate([
        Input()
    ], Menubar.prototype, "autoDisplay", null);
    Menubar = __decorate([
        Component({
            selector: 'p-menubar',
            template: "\n        <div [ngClass]=\"{'ui-menubar ui-widget ui-widget-content ui-corner-all':true}\" [class]=\"styleClass\" [ngStyle]=\"style\">\n            <p-menubarSub [item]=\"model\" root=\"root\" [baseZIndex]=\"baseZIndex\" [autoZIndex]=\"autoZIndex\">\n                <ng-content></ng-content>\n            </p-menubarSub>\n            <div class=\"ui-menubar-custom\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n    ",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], Menubar);
    return Menubar;
}());
export { Menubar };
var MenubarModule = /** @class */ (function () {
    function MenubarModule() {
    }
    MenubarModule = __decorate([
        NgModule({
            imports: [CommonModule, RouterModule],
            exports: [Menubar, RouterModule],
            declarations: [Menubar, MenubarSub]
        })
    ], MenubarModule);
    return MenubarModule;
}());
export { MenubarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudWJhci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvbWVudWJhci8iLCJzb3VyY2VzIjpbIm1lbnViYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLGlCQUFpQixFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hJLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQWlDL0M7SUFxQ0ksb0JBQW1CLFFBQW1CLEVBQVUsRUFBcUI7UUFBbEQsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBN0I1RCxlQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFxQmhDLG9CQUFlLEdBQVksS0FBSyxDQUFDO0lBTXdDLENBQUM7SUF6QmpFLHNCQUFJLG9DQUFZO2FBQWhCO1lBRUwsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzlCLENBQUM7YUFDRCxVQUFpQixLQUFLO1lBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNaLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO2dCQUUzQixJQUFJLENBQUMsS0FBSztvQkFDTixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQzthQUM5QjtRQUNMLENBQUM7OztPQVJBO0lBd0JELG9DQUFlLEdBQWYsVUFBZ0IsS0FBWSxFQUFFLElBQW1CLEVBQUUsUUFBa0I7UUFDakUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbkIsSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFO2dC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bWVudFJlZiwgSW5wdXQsIFJlbmRlcmVyMiwgT25EZXN0cm95LENoYW5nZURldGVjdG9yUmVmLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xyXG5pbXBvcnQgeyBNZW51SXRlbSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcclxuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLW1lbnViYXJTdWInLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8dWwgW25nQ2xhc3NdPVwieyd1aS1tZW51YmFyLXJvb3QtbGlzdCc6cm9vdCwgJ3VpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwgdWktc3VibWVudS1saXN0IHVpLXNoYWRvdyc6IXJvb3R9XCJcclxuICAgICAgICAgICAgKGNsaWNrKT1cImxpc3RDbGljaygkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtY2hpbGQgW25nRm9yT2ZdPVwiKHJvb3QgPyBpdGVtIDogaXRlbS5pdGVtcylcIj5cclxuICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cImNoaWxkLnNlcGFyYXRvclwiIGNsYXNzPVwidWktbWVudS1zZXBhcmF0b3IgdWktd2lkZ2V0LWNvbnRlbnRcIiBbbmdDbGFzc109XCJ7J3VpLWhlbHBlci1oaWRkZW4nOiBjaGlsZC52aXNpYmxlID09PSBmYWxzZX1cIj5cclxuICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cIiFjaGlsZC5zZXBhcmF0b3JcIiAjbGlzdEl0ZW0gW25nQ2xhc3NdPVwieyd1aS1tZW51aXRlbSB1aS1jb3JuZXItYWxsJzp0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktbWVudS1wYXJlbnQnOmNoaWxkLml0ZW1zLCd1aS1tZW51aXRlbS1hY3RpdmUnOmxpc3RJdGVtPT1hY3RpdmVJdGVtLCd1aS1oZWxwZXItaGlkZGVuJzogY2hpbGQudmlzaWJsZSA9PT0gZmFsc2V9XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKG1vdXNlZW50ZXIpPVwib25JdGVtTW91c2VFbnRlcigkZXZlbnQsbGlzdEl0ZW0sY2hpbGQpXCIgKGNsaWNrKT1cIm9uSXRlbU1lbnVDbGljaygkZXZlbnQsIGxpc3RJdGVtLCBjaGlsZClcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cIiFjaGlsZC5yb3V0ZXJMaW5rXCIgW2hyZWZdPVwiY2hpbGQudXJsfHwnIydcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb25pZF09XCJjaGlsZC5hdXRvbWF0aW9uSWRcIiBbYXR0ci50YXJnZXRdPVwiY2hpbGQudGFyZ2V0XCIgW2F0dHIudGl0bGVdPVwiY2hpbGQudGl0bGVcIiBbYXR0ci5pZF09XCJjaGlsZC5pZFwiIChjbGljayk9XCJpdGVtQ2xpY2soJGV2ZW50LCBjaGlsZClcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1tZW51aXRlbS1saW5rIHVpLWNvcm5lci1hbGwnOnRydWUsJ3VpLXN0YXRlLWRpc2FibGVkJzpjaGlsZC5kaXNhYmxlZH1cIiBbbmdTdHlsZV09XCJjaGlsZC5zdHlsZVwiIFtjbGFzc109XCJjaGlsZC5zdHlsZUNsYXNzXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCJjaGlsZC50YWJpbmRleCA/IGNoaWxkLnRhYmluZGV4IDogJzAnXCIgW2F0dHIuYXJpYS1oYXNwb3B1cF09XCJpdGVtLml0ZW1zICE9IG51bGxcIiBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cIml0ZW0gPT09IGFjdGl2ZUl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS1pY29uXCIgKm5nSWY9XCJjaGlsZC5pY29uXCIgW25nQ2xhc3NdPVwiY2hpbGQuaWNvblwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS10ZXh0XCI+e3tjaGlsZC5sYWJlbH19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXN1Ym1lbnUtaWNvbiBwaSBwaS1md1wiICpuZ0lmPVwiY2hpbGQuaXRlbXNcIiBbbmdDbGFzc109XCJ7J3BpLWNhcmV0LWRvd24nOnJvb3QsJ3BpLWNhcmV0LXJpZ2h0Jzohcm9vdH1cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwiY2hpbGQucm91dGVyTGlua1wiIFtyb3V0ZXJMaW5rXT1cImNoaWxkLnJvdXRlckxpbmtcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb25pZF09XCJjaGlsZC5hdXRvbWF0aW9uSWRcIiBbcXVlcnlQYXJhbXNdPVwiY2hpbGQucXVlcnlQYXJhbXNcIiBbcm91dGVyTGlua0FjdGl2ZV09XCIndWktbWVudWl0ZW0tbGluay1hY3RpdmUnXCIgW3JvdXRlckxpbmtBY3RpdmVPcHRpb25zXT1cImNoaWxkLnJvdXRlckxpbmtBY3RpdmVPcHRpb25zfHx7ZXhhY3Q6ZmFsc2V9XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFyZ2V0XT1cImNoaWxkLnRhcmdldFwiIFthdHRyLnRpdGxlXT1cImNoaWxkLnRpdGxlXCIgW2F0dHIuaWRdPVwiY2hpbGQuaWRcIiBbYXR0ci50YWJpbmRleF09XCJjaGlsZC50YWJpbmRleCA/IGNoaWxkLnRhYmluZGV4IDogJzAnXCIgcm9sZT1cIm1lbnVpdGVtXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIml0ZW1DbGljaygkZXZlbnQsIGNoaWxkKVwiIFtuZ0NsYXNzXT1cInsndWktbWVudWl0ZW0tbGluayB1aS1jb3JuZXItYWxsJzp0cnVlLCd1aS1zdGF0ZS1kaXNhYmxlZCc6Y2hpbGQuZGlzYWJsZWR9XCIgW25nU3R5bGVdPVwiY2hpbGQuc3R5bGVcIiBbY2xhc3NdPVwiY2hpbGQuc3R5bGVDbGFzc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtmcmFnbWVudF09XCJjaGlsZC5mcmFnbWVudFwiIFtxdWVyeVBhcmFtc0hhbmRsaW5nXT1cImNoaWxkLnF1ZXJ5UGFyYW1zSGFuZGxpbmdcIiBbcHJlc2VydmVGcmFnbWVudF09XCJjaGlsZC5wcmVzZXJ2ZUZyYWdtZW50XCIgW3NraXBMb2NhdGlvbkNoYW5nZV09XCJjaGlsZC5za2lwTG9jYXRpb25DaGFuZ2VcIiBbcmVwbGFjZVVybF09XCJjaGlsZC5yZXBsYWNlVXJsXCIgW3N0YXRlXT1cImNoaWxkLnN0YXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktbWVudWl0ZW0taWNvblwiICpuZ0lmPVwiY2hpbGQuaWNvblwiIFtuZ0NsYXNzXT1cImNoaWxkLmljb25cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktbWVudWl0ZW0tdGV4dFwiPnt7Y2hpbGQubGFiZWx9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1zdWJtZW51LWljb24gcGkgcGktZndcIiAqbmdJZj1cImNoaWxkLml0ZW1zXCIgW25nQ2xhc3NdPVwieydwaS1jYXJldC1kb3duJzpyb290LCdwaS1jYXJldC1yaWdodCc6IXJvb3R9XCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8cC1tZW51YmFyU3ViIGNsYXNzPVwidWktc3VibWVudVwiIFtwYXJlbnRBY3RpdmVdPVwibGlzdEl0ZW09PWFjdGl2ZUl0ZW1cIiBbaXRlbV09XCJjaGlsZFwiICpuZ0lmPVwiY2hpbGQuaXRlbXNcIiBbYXV0b0Rpc3BsYXldPVwidHJ1ZVwiPjwvcC1tZW51YmFyU3ViPlxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICA8L3VsPlxyXG4gICAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWVudWJhclN1YiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcblxyXG4gICAgQElucHV0KCkgaXRlbTogTWVudUl0ZW07XHJcblxyXG4gICAgQElucHV0KCkgcm9vdDogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSBhdXRvRGlzcGxheTogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSBhdXRvWkluZGV4OiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBASW5wdXQoKSBiYXNlWkluZGV4OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIEBJbnB1dCgpIGdldCBwYXJlbnRBY3RpdmUoKTpib29sZWFuIFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnRBY3RpdmU7XHJcbiAgICB9XHJcbiAgICBzZXQgcGFyZW50QWN0aXZlKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnJvb3QpIHtcclxuICAgICAgICAgICAgdGhpcy5fcGFyZW50QWN0aXZlID0gdmFsdWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXZhbHVlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3BhcmVudEFjdGl2ZTpib29sZWFuO1xyXG5cclxuICAgIGRvY3VtZW50Q2xpY2tMaXN0ZW5lcjogYW55O1xyXG5cclxuICAgIG1lbnVDbGljazogYm9vbGVhbjtcclxuICBcclxuICAgIG1lbnVIb3ZlckFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGFjdGl2ZUl0ZW06IGFueTtcclxuXHJcbiAgICBhY3RpdmVNZW51OiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7IH1cclxuXHJcbiAgICBvbkl0ZW1NZW51Q2xpY2soZXZlbnQ6IEV2ZW50LCBpdGVtOiBIVE1MTElFbGVtZW50LCBtZW51aXRlbTogTWVudUl0ZW0pIHtcclxuICAgICAgICBpZiAoIXRoaXMuYXV0b0Rpc3BsYXkpIHtcclxuICAgICAgICAgICAgaWYgKG1lbnVpdGVtLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IHRoaXMuYWN0aXZlTWVudSA/ICh0aGlzLmFjdGl2ZU1lbnUuaXNFcXVhbE5vZGUoaXRlbSkgPyBudWxsIDogaXRlbSkgOiBpdGVtO1xyXG4gICAgICAgICAgICBsZXQgbmV4dEVsZW1lbnQgPSA8SFRNTExJRWxlbWVudD5pdGVtLmNoaWxkcmVuWzBdLm5leHRFbGVtZW50U2libGluZztcclxuICAgICAgICAgICAgaWYgKG5leHRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3VibGlzdCA9IDxIVE1MVUxpc3RFbGVtZW50Pm5leHRFbGVtZW50LmNoaWxkcmVuWzBdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXV0b1pJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1Ymxpc3Quc3R5bGUuekluZGV4ID0gU3RyaW5nKHRoaXMuYmFzZVpJbmRleCArICgrK0RvbUhhbmRsZXIuemluZGV4KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucm9vdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1Ymxpc3Quc3R5bGUudG9wID0gRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodChpdGVtLmNoaWxkcmVuWzBdKSArICdweCc7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VibGlzdC5zdHlsZS5sZWZ0ID0gJzBweCdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1Ymxpc3Quc3R5bGUudG9wID0gJzBweCc7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VibGlzdC5zdHlsZS5sZWZ0ID0gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKGl0ZW0uY2hpbGRyZW5bMF0pICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51Q2xpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1lbnVIb3ZlckFjdGl2ZSA9IHRoaXMuYWN0aXZlTWVudSA/ICghdGhpcy5hY3RpdmVNZW51LmlzRXF1YWxOb2RlKGl0ZW0pKSA6IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlTWVudSA9IHRoaXMuYWN0aXZlTWVudSA/ICh0aGlzLmFjdGl2ZU1lbnUuaXNFcXVhbE5vZGUoaXRlbSkgPyBudWxsOiBpdGVtKSA6IGl0ZW07XHJcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50TGlzdGVuZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYmluZEV2ZW50TGlzdGVuZXIoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdjbGljaycsKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubWVudUNsaWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbnVIb3ZlckFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlTWVudSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tZW51Q2xpY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uSXRlbU1vdXNlRW50ZXIoZXZlbnQ6IEV2ZW50LCBpdGVtOiBIVE1MTElFbGVtZW50LCBtZW51aXRlbTogTWVudUl0ZW0pIHtcclxuICAgICAgICBpZiAodGhpcy5hdXRvRGlzcGxheSB8fCAoIXRoaXMuYXV0b0Rpc3BsYXkgJiYgdGhpcy5yb290ICYmIHRoaXMubWVudUhvdmVyQWN0aXZlKSkge1xyXG4gICAgICAgICAgICBpZiAobWVudWl0ZW0uZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCh0aGlzLmFjdGl2ZUl0ZW0gJiYgIXRoaXMuYWN0aXZlSXRlbS5pc0VxdWFsTm9kZShpdGVtKSB8fCAhdGhpcy5hY3RpdmVJdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtID0gaXRlbTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXh0RWxlbWVudCA9IDxIVE1MTElFbGVtZW50Pml0ZW0uY2hpbGRyZW5bMF0ubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5leHRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN1Ymxpc3QgPSA8SFRNTFVMaXN0RWxlbWVudD5uZXh0RWxlbWVudC5jaGlsZHJlblswXTtcclxuICAgICAgICAgICAgICAgICAgICBzdWJsaXN0LnN0eWxlLnpJbmRleCA9IFN0cmluZygrK0RvbUhhbmRsZXIuemluZGV4KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucm9vdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJsaXN0LnN0eWxlLnRvcCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQoaXRlbS5jaGlsZHJlblswXSkgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJsaXN0LnN0eWxlLmxlZnQgPSAnMHB4J1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VibGlzdC5zdHlsZS50b3AgPSAnMHB4JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VibGlzdC5zdHlsZS5sZWZ0ID0gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKGl0ZW0uY2hpbGRyZW5bMF0pICsgJ3B4JztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZU1lbnUgPSBpdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpdGVtQ2xpY2soZXZlbnQsIGl0ZW06IE1lbnVJdGVtKSDCoHtcclxuICAgICAgICBpZiAoaXRlbS5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWl0ZW0udXJsKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaXRlbS5jb21tYW5kKSB7XHJcbiAgICAgICAgICAgIGl0ZW0uY29tbWFuZCh7XHJcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgICAgIGl0ZW06IGl0ZW1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGxpc3RDbGljayhldmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLmF1dG9EaXNwbGF5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICBpZiAodGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIpIHtcclxuICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xyXG4gICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gbnVsbDtcclxuICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3AtbWVudWJhcicsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyd1aS1tZW51YmFyIHVpLXdpZGdldCB1aS13aWRnZXQtY29udGVudCB1aS1jb3JuZXItYWxsJzp0cnVlfVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwic3R5bGVcIj5cclxuICAgICAgICAgICAgPHAtbWVudWJhclN1YiBbaXRlbV09XCJtb2RlbFwiIHJvb3Q9XCJyb290XCIgW2Jhc2VaSW5kZXhdPVwiYmFzZVpJbmRleFwiIFthdXRvWkluZGV4XT1cImF1dG9aSW5kZXhcIj5cclxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgICAgICAgICAgPC9wLW1lbnViYXJTdWI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1tZW51YmFyLWN1c3RvbVwiPlxyXG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcclxufSlcclxuZXhwb3J0IGNsYXNzIE1lbnViYXIge1xyXG5cclxuICAgIEBJbnB1dCgpIG1vZGVsOiBNZW51SXRlbVtdO1xyXG5cclxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGF1dG9aSW5kZXg6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIGJhc2VaSW5kZXg6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBfYXV0b0Rpc3BsYXk6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgZ2V0IGF1dG9EaXNwbGF5KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hdXRvRGlzcGxheTtcclxuICAgIH1cclxuICAgIHNldCB1dGMoX3V0YzogYm9vbGVhbikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQXV0b0Rpc3BsYXkgcHJvcGVydHkgaXMgZGVwcmVjYXRlZCBhbmQgZnVuY3Rpb25hbGl0eSBpcyBub3QgYXZhaWxhYmxlLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyKSB7IH1cclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFJvdXRlck1vZHVsZV0sXHJcbiAgICBleHBvcnRzOiBbTWVudWJhciwgUm91dGVyTW9kdWxlXSxcclxuICAgIGRlY2xhcmF0aW9uczogW01lbnViYXIsIE1lbnViYXJTdWJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNZW51YmFyTW9kdWxlIHsgfVxyXG4iXX0=