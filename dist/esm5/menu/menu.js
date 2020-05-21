var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { NgModule, Component, ElementRef, OnDestroy, Input, Output, EventEmitter, Renderer2, ViewChild, Inject, forwardRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { RouterModule } from '@angular/router';
var MenuItemContent = /** @class */ (function () {
    function MenuItemContent(menu) {
        this.menu = menu;
    }
    MenuItemContent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return Menu; }),] }] }
    ]; };
    __decorate([
        Input("pMenuItemContent")
    ], MenuItemContent.prototype, "item", void 0);
    MenuItemContent = __decorate([
        Component({
            selector: '[pMenuItemContent]',
            template: "\n        <a *ngIf=\"!item.routerLink\" [attr.href]=\"item.url||null\" class=\"ui-menuitem-link ui-corner-all\" [attr.tabindex]=\"item.tabindex ? item.tabindex : '0'\" [attr.data-automationid]=\"item.automationId\" [attr.target]=\"item.target\" [attr.title]=\"item.title\" [attr.id]=\"item.id\"\n            [ngClass]=\"{'ui-state-disabled':item.disabled}\" (click)=\"menu.itemClick($event, item)\" role=\"menuitem\">\n            <span class=\"ui-menuitem-icon\" *ngIf=\"item.icon\" [ngClass]=\"item.icon\"></span>\n            <span class=\"ui-menuitem-text\">{{item.label}}</span>\n        </a>\n        <a *ngIf=\"item.routerLink\" [routerLink]=\"item.routerLink\" [attr.data-automationid]=\"item.automationId\" [queryParams]=\"item.queryParams\" [routerLinkActive]=\"'ui-menuitem-link-active'\"\n            [routerLinkActiveOptions]=\"item.routerLinkActiveOptions||{exact:false}\" class=\"ui-menuitem-link ui-corner-all\" [attr.target]=\"item.target\" [attr.id]=\"item.id\" [attr.tabindex]=\"item.tabindex ? item.tabindex : '0'\" \n            [attr.title]=\"item.title\" [ngClass]=\"{'ui-state-disabled':item.disabled}\" (click)=\"menu.itemClick($event, item)\" role=\"menuitem\"\n            [fragment]=\"item.fragment\" [queryParamsHandling]=\"item.queryParamsHandling\" [preserveFragment]=\"item.preserveFragment\" [skipLocationChange]=\"item.skipLocationChange\" [replaceUrl]=\"item.replaceUrl\" [state]=\"item.state\">\n            <span class=\"ui-menuitem-icon\" *ngIf=\"item.icon\" [ngClass]=\"item.icon\"></span>\n            <span class=\"ui-menuitem-text\">{{item.label}}</span>\n        </a>\n    "
        }),
        __param(0, Inject(forwardRef(function () { return Menu; })))
    ], MenuItemContent);
    return MenuItemContent;
}());
export { MenuItemContent };
var Menu = /** @class */ (function () {
    function Menu(el, renderer, cd) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.showTransitionOptions = '225ms ease-out';
        this.hideTransitionOptions = '195ms ease-in';
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
    }
    Menu.prototype.toggle = function (event) {
        if (this.visible)
            this.hide();
        else
            this.show(event);
        this.preventDocumentDefault = true;
    };
    Menu.prototype.show = function (event) {
        this.target = event.currentTarget;
        this.visible = true;
        this.preventDocumentDefault = true;
    };
    Menu.prototype.onOverlayAnimationStart = function (event) {
        switch (event.toState) {
            case 'visible':
                if (this.popup) {
                    this.container = event.element;
                    this.moveOnTop();
                    this.onShow.emit({});
                    this.appendOverlay();
                    DomHandler.absolutePosition(this.container, this.target);
                    this.bindDocumentClickListener();
                    this.bindDocumentResizeListener();
                }
                break;
            case 'void':
                this.onOverlayHide();
                this.onHide.emit({});
                break;
        }
    };
    Menu.prototype.appendOverlay = function () {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.container);
            else
                DomHandler.appendChild(this.container, this.appendTo);
        }
    };
    Menu.prototype.restoreOverlayAppend = function () {
        if (this.container && this.appendTo) {
            this.el.nativeElement.appendChild(this.container);
        }
    };
    Menu.prototype.moveOnTop = function () {
        if (this.autoZIndex) {
            this.container.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
    };
    Menu.prototype.hide = function () {
        this.visible = false;
        this.cd.detectChanges();
    };
    Menu.prototype.onWindowResize = function () {
        this.hide();
    };
    Menu.prototype.itemClick = function (event, item) {
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
        if (this.popup) {
            this.hide();
        }
    };
    Menu.prototype.bindDocumentClickListener = function () {
        var _this = this;
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', function () {
                if (!_this.preventDocumentDefault) {
                    _this.hide();
                }
                _this.preventDocumentDefault = false;
            });
        }
    };
    Menu.prototype.unbindDocumentClickListener = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    };
    Menu.prototype.bindDocumentResizeListener = function () {
        this.documentResizeListener = this.onWindowResize.bind(this);
        window.addEventListener('resize', this.documentResizeListener);
    };
    Menu.prototype.unbindDocumentResizeListener = function () {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    };
    Menu.prototype.onOverlayHide = function () {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.preventDocumentDefault = false;
        this.target = null;
    };
    Menu.prototype.ngOnDestroy = function () {
        if (this.popup) {
            this.restoreOverlayAppend();
            this.onOverlayHide();
        }
    };
    Menu.prototype.hasSubMenu = function () {
        var e_1, _a;
        if (this.model) {
            try {
                for (var _b = __values(this.model), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    if (item.items) {
                        return true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return false;
    };
    Menu.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], Menu.prototype, "model", void 0);
    __decorate([
        Input()
    ], Menu.prototype, "popup", void 0);
    __decorate([
        Input()
    ], Menu.prototype, "style", void 0);
    __decorate([
        Input()
    ], Menu.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], Menu.prototype, "appendTo", void 0);
    __decorate([
        Input()
    ], Menu.prototype, "autoZIndex", void 0);
    __decorate([
        Input()
    ], Menu.prototype, "baseZIndex", void 0);
    __decorate([
        Input()
    ], Menu.prototype, "showTransitionOptions", void 0);
    __decorate([
        Input()
    ], Menu.prototype, "hideTransitionOptions", void 0);
    __decorate([
        ViewChild('container')
    ], Menu.prototype, "containerViewChild", void 0);
    __decorate([
        Output()
    ], Menu.prototype, "onShow", void 0);
    __decorate([
        Output()
    ], Menu.prototype, "onHide", void 0);
    Menu = __decorate([
        Component({
            selector: 'p-menu',
            template: "\n        <div #container [ngClass]=\"{'ui-menu ui-widget ui-widget-content ui-corner-all': true, 'ui-menu-dynamic ui-shadow': popup}\"\n            [class]=\"styleClass\" [ngStyle]=\"style\" (click)=\"preventDocumentDefault=true\" *ngIf=\"!popup || visible\"\n            [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" [@.disabled]=\"popup !== true\" (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\">\n            <ul>\n                <ng-template ngFor let-submenu [ngForOf]=\"model\" *ngIf=\"hasSubMenu()\">\n                    <li class=\"ui-menu-separator ui-widget-content\" *ngIf=\"submenu.separator\" [ngClass]=\"{'ui-helper-hidden': submenu.visible === false}\"></li>\n                    <li class=\"ui-submenu-header ui-widget-header ui-corner-all\" [attr.data-automationid]=\"submenu.automationId\" *ngIf=\"!submenu.separator\" [ngClass]=\"{'ui-helper-hidden': submenu.visible === false}\">{{submenu.label}}</li>\n                    <ng-template ngFor let-item [ngForOf]=\"submenu.items\">\n                        <li class=\"ui-menu-separator ui-widget-content\" *ngIf=\"item.separator\" [ngClass]=\"{'ui-helper-hidden': (item.visible === false ||\u00A0submenu.visible === false)}\"></li>\n                        <li class=\"ui-menuitem ui-widget ui-corner-all\" *ngIf=\"!item.separator\" [pMenuItemContent]=\"item\" [ngClass]=\"{'ui-helper-hidden': (item.visible === false || submenu.visible === false)}\" [ngStyle]=\"item.style\" [class]=\"item.styleClass\"></li>\n                    </ng-template>\n                </ng-template>\n                <ng-template ngFor let-item [ngForOf]=\"model\" *ngIf=\"!hasSubMenu()\">\n                    <li class=\"ui-menu-separator ui-widget-content\" *ngIf=\"item.separator\" [ngClass]=\"{'ui-helper-hidden': item.visible === false}\"></li>\n                    <li class=\"ui-menuitem ui-widget ui-corner-all\" *ngIf=\"!item.separator\" [pMenuItemContent]=\"item\" [ngClass]=\"{'ui-helper-hidden': item.visible === false}\" [ngStyle]=\"item.style\" [class]=\"item.styleClass\"></li>\n                </ng-template>\n            </ul>\n        </div>\n    ",
            animations: [
                trigger('overlayAnimation', [
                    state('void', style({
                        transform: 'translateY(5%)',
                        opacity: 0
                    })),
                    state('visible', style({
                        transform: 'translateY(0)',
                        opacity: 1
                    })),
                    transition('void => visible', animate('{{showTransitionParams}}')),
                    transition('visible => void', animate('{{hideTransitionParams}}'))
                ])
            ],
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], Menu);
    return Menu;
}());
export { Menu };
var MenuModule = /** @class */ (function () {
    function MenuModule() {
    }
    MenuModule = __decorate([
        NgModule({
            imports: [CommonModule, RouterModule],
            exports: [Menu, RouterModule],
            declarations: [Menu, MenuItemContent]
        })
    ], MenuModule);
    return MenuModule;
}());
export { MenuModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvbWVudS8iLCJzb3VyY2VzIjpbIm1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxpQkFBaUIsRUFBQyx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNoTCxPQUFPLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBZ0IsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUV2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFtQjdDO0lBTUkseUJBQTRDLElBQUk7UUFDNUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFZLENBQUM7SUFDN0IsQ0FBQzs7Z0RBRlksTUFBTSxTQUFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBQzs7SUFKZjtRQUExQixLQUFLLENBQUMsa0JBQWtCLENBQUM7aURBQWdCO0lBRmpDLGVBQWU7UUFqQjNCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsUUFBUSxFQUFFLGtsREFhVDtTQUNKLENBQUM7UUFPZSxXQUFBLE1BQU0sQ0FBQyxVQUFVLENBQUMsY0FBTSxPQUFBLElBQUksRUFBSixDQUFJLENBQUMsQ0FBQyxDQUFBO09BTmxDLGVBQWUsQ0FTM0I7SUFBRCxzQkFBQztDQUFBLEFBVEQsSUFTQztTQVRZLGVBQWU7QUFpRDVCO0lBc0NJLGNBQW1CLEVB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OExqQjtJQUFBO0lBQTBCLENBQUM7SUFBZCxVQUFVO1FBTHRCLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBQyxZQUFZLENBQUM7WUFDcEMsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFDLFlBQVksQ0FBQztZQUM1QixZQUFZLEVBQUUsQ0FBQyxJQUFJLEVBQUMsZUFBZSxDQUFDO1NBQ3ZDLENBQUM7T0FDVyxVQUFVLENBQUk7SUFBRCxpQkFBQztDQUFBLEFBQTNCLElBQTJCO1NBQWQsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LEVsZW1lbnRSZWYsT25EZXN0cm95LElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXIsUmVuZGVyZXIyLFZpZXdDaGlsZCxJbmplY3QsZm9yd2FyZFJlZixDaGFuZ2VEZXRlY3RvclJlZixDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7dHJpZ2dlcixzdGF0ZSxzdHlsZSx0cmFuc2l0aW9uLGFuaW1hdGUsQW5pbWF0aW9uRXZlbnR9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICdwcmltZW5nL2RvbSc7XHJcbmltcG9ydCB7TWVudUl0ZW19IGZyb20gJ3ByaW1lbmcvYXBpJztcclxuaW1wb3J0IHtSb3V0ZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnW3BNZW51SXRlbUNvbnRlbnRdJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGEgKm5nSWY9XCIhaXRlbS5yb3V0ZXJMaW5rXCIgW2F0dHIuaHJlZl09XCJpdGVtLnVybHx8bnVsbFwiIGNsYXNzPVwidWktbWVudWl0ZW0tbGluayB1aS1jb3JuZXItYWxsXCIgW2F0dHIudGFiaW5kZXhdPVwiaXRlbS50YWJpbmRleCA/IGl0ZW0udGFiaW5kZXggOiAnMCdcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb25pZF09XCJpdGVtLmF1dG9tYXRpb25JZFwiIFthdHRyLnRhcmdldF09XCJpdGVtLnRhcmdldFwiIFthdHRyLnRpdGxlXT1cIml0ZW0udGl0bGVcIiBbYXR0ci5pZF09XCJpdGVtLmlkXCJcclxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1kaXNhYmxlZCc6aXRlbS5kaXNhYmxlZH1cIiAoY2xpY2spPVwibWVudS5pdGVtQ2xpY2soJGV2ZW50LCBpdGVtKVwiIHJvbGU9XCJtZW51aXRlbVwiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLWljb25cIiAqbmdJZj1cIml0ZW0uaWNvblwiIFtuZ0NsYXNzXT1cIml0ZW0uaWNvblwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS10ZXh0XCI+e3tpdGVtLmxhYmVsfX08L3NwYW4+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICAgIDxhICpuZ0lmPVwiaXRlbS5yb3V0ZXJMaW5rXCIgW3JvdXRlckxpbmtdPVwiaXRlbS5yb3V0ZXJMaW5rXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uaWRdPVwiaXRlbS5hdXRvbWF0aW9uSWRcIiBbcXVlcnlQYXJhbXNdPVwiaXRlbS5xdWVyeVBhcmFtc1wiIFtyb3V0ZXJMaW5rQWN0aXZlXT1cIid1aS1tZW51aXRlbS1saW5rLWFjdGl2ZSdcIlxyXG4gICAgICAgICAgICBbcm91dGVyTGlua0FjdGl2ZU9wdGlvbnNdPVwiaXRlbS5yb3V0ZXJMaW5rQWN0aXZlT3B0aW9uc3x8e2V4YWN0OmZhbHNlfVwiIGNsYXNzPVwidWktbWVudWl0ZW0tbGluayB1aS1jb3JuZXItYWxsXCIgW2F0dHIudGFyZ2V0XT1cIml0ZW0udGFyZ2V0XCIgW2F0dHIuaWRdPVwiaXRlbS5pZFwiIFthdHRyLnRhYmluZGV4XT1cIml0ZW0udGFiaW5kZXggPyBpdGVtLnRhYmluZGV4IDogJzAnXCIgXHJcbiAgICAgICAgICAgIFthdHRyLnRpdGxlXT1cIml0ZW0udGl0bGVcIiBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWRpc2FibGVkJzppdGVtLmRpc2FibGVkfVwiIChjbGljayk9XCJtZW51Lml0ZW1DbGljaygkZXZlbnQsIGl0ZW0pXCIgcm9sZT1cIm1lbnVpdGVtXCJcclxuICAgICAgICAgICAgW2ZyYWdtZW50XT1cIml0ZW0uZnJhZ21lbnRcIiBbcXVlcnlQYXJhbXNIYW5kbGluZ109XCJpdGVtLnF1ZXJ5UGFyYW1zSGFuZGxpbmdcIiBbcHJlc2VydmVGcmFnbWVudF09XCJpdGVtLnByZXNlcnZlRnJhZ21lbnRcIiBbc2tpcExvY2F0aW9uQ2hhbmdlXT1cIml0ZW0uc2tpcExvY2F0aW9uQ2hhbmdlXCIgW3JlcGxhY2VVcmxdPVwiaXRlbS5yZXBsYWNlVXJsXCIgW3N0YXRlXT1cIml0ZW0uc3RhdGVcIj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS1pY29uXCIgKm5nSWY9XCJpdGVtLmljb25cIiBbbmdDbGFzc109XCJpdGVtLmljb25cIj48L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktbWVudWl0ZW0tdGV4dFwiPnt7aXRlbS5sYWJlbH19PC9zcGFuPlxyXG4gICAgICAgIDwvYT5cclxuICAgIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIE1lbnVJdGVtQ29udGVudCB7XHJcblxyXG4gICAgQElucHV0KFwicE1lbnVJdGVtQ29udGVudFwiKSBpdGVtOiBNZW51SXRlbTtcclxuXHJcbiAgICBtZW51OiBNZW51O1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTWVudSkpIG1lbnUpIHtcclxuICAgICAgICB0aGlzLm1lbnUgPSBtZW51IGFzIE1lbnU7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLW1lbnUnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2ICNjb250YWluZXIgW25nQ2xhc3NdPVwieyd1aS1tZW51IHVpLXdpZGdldCB1aS13aWRnZXQtY29udGVudCB1aS1jb3JuZXItYWxsJzogdHJ1ZSwgJ3VpLW1lbnUtZHluYW1pYyB1aS1zaGFkb3cnOiBwb3B1cH1cIlxyXG4gICAgICAgICAgICBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgKGNsaWNrKT1cInByZXZlbnREb2N1bWVudERlZmF1bHQ9dHJ1ZVwiICpuZ0lmPVwiIXBvcHVwIHx8IHZpc2libGVcIlxyXG4gICAgICAgICAgICBbQG92ZXJsYXlBbmltYXRpb25dPVwie3ZhbHVlOiAndmlzaWJsZScsIHBhcmFtczoge3Nob3dUcmFuc2l0aW9uUGFyYW1zOiBzaG93VHJhbnNpdGlvbk9wdGlvbnMsIGhpZGVUcmFuc2l0aW9uUGFyYW1zOiBoaWRlVHJhbnNpdGlvbk9wdGlvbnN9fVwiIFtALmRpc2FibGVkXT1cInBvcHVwICE9PSB0cnVlXCIgKEBvdmVybGF5QW5pbWF0aW9uLnN0YXJ0KT1cIm9uT3ZlcmxheUFuaW1hdGlvblN0YXJ0KCRldmVudClcIj5cclxuICAgICAgICAgICAgPHVsPlxyXG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1zdWJtZW51IFtuZ0Zvck9mXT1cIm1vZGVsXCIgKm5nSWY9XCJoYXNTdWJNZW51KClcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJ1aS1tZW51LXNlcGFyYXRvciB1aS13aWRnZXQtY29udGVudFwiICpuZ0lmPVwic3VibWVudS5zZXBhcmF0b3JcIiBbbmdDbGFzc109XCJ7J3VpLWhlbHBlci1oaWRkZW4nOiBzdWJtZW51LnZpc2libGUgPT09IGZhbHNlfVwiPjwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwidWktc3VibWVudS1oZWFkZXIgdWktd2lkZ2V0LWhlYWRlciB1aS1jb3JuZXItYWxsXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uaWRdPVwic3VibWVudS5hdXRvbWF0aW9uSWRcIiAqbmdJZj1cIiFzdWJtZW51LnNlcGFyYXRvclwiIFtuZ0NsYXNzXT1cInsndWktaGVscGVyLWhpZGRlbic6IHN1Ym1lbnUudmlzaWJsZSA9PT0gZmFsc2V9XCI+e3tzdWJtZW51LmxhYmVsfX08L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtaXRlbSBbbmdGb3JPZl09XCJzdWJtZW51Lml0ZW1zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInVpLW1lbnUtc2VwYXJhdG9yIHVpLXdpZGdldC1jb250ZW50XCIgKm5nSWY9XCJpdGVtLnNlcGFyYXRvclwiIFtuZ0NsYXNzXT1cInsndWktaGVscGVyLWhpZGRlbic6IChpdGVtLnZpc2libGUgPT09IGZhbHNlIHx8wqBzdWJtZW51LnZpc2libGUgPT09IGZhbHNlKX1cIj48L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJ1aS1tZW51aXRlbSB1aS13aWRnZXQgdWktY29ybmVyLWFsbFwiICpuZ0lmPVwiIWl0ZW0uc2VwYXJhdG9yXCIgW3BNZW51SXRlbUNvbnRlbnRdPVwiaXRlbVwiIFtuZ0NsYXNzXT1cInsndWktaGVscGVyLWhpZGRlbic6IChpdGVtLnZpc2libGUgPT09IGZhbHNlIHx8IHN1Ym1lbnUudmlzaWJsZSA9PT0gZmFsc2UpfVwiIFtuZ1N0eWxlXT1cIml0ZW0uc3R5bGVcIiBbY2xhc3NdPVwiaXRlbS5zdHlsZUNsYXNzXCI+PC9saT5cclxuICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtaXRlbSBbbmdGb3JPZl09XCJtb2RlbFwiICpuZ0lmPVwiIWhhc1N1Yk1lbnUoKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInVpLW1lbnUtc2VwYXJhdG9yIHVpLXdpZGdldC1jb250ZW50XCIgKm5nSWY9XCJpdGVtLnNlcGFyYXRvclwiIFtuZ0NsYXNzXT1cInsndWktaGVscGVyLWhpZGRlbic6IGl0ZW0udmlzaWJsZSA9PT0gZmFsc2V9XCI+PC9saT5cclxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJ1aS1tZW51aXRlbSB1aS13aWRnZXQgdWktY29ybmVyLWFsbFwiICpuZ0lmPVwiIWl0ZW0uc2VwYXJhdG9yXCIgW3BNZW51SXRlbUNvbnRlbnRdPVwiaXRlbVwiIFtuZ0NsYXNzXT1cInsndWktaGVscGVyLWhpZGRlbic6IGl0ZW0udmlzaWJsZSA9PT0gZmFsc2V9XCIgW25nU3R5bGVdPVwiaXRlbS5zdHlsZVwiIFtjbGFzc109XCJpdGVtLnN0eWxlQ2xhc3NcIj48L2xpPlxyXG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICAgICAgPC91bD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgICAgdHJpZ2dlcignb3ZlcmxheUFuaW1hdGlvbicsIFtcclxuICAgICAgICAgICAgc3RhdGUoJ3ZvaWQnLCBzdHlsZSh7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDUlKScsXHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXHJcbiAgICAgICAgICAgIH0pKSxcclxuICAgICAgICAgICAgc3RhdGUoJ3Zpc2libGUnLCBzdHlsZSh7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJyxcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDFcclxuICAgICAgICAgICAgfSkpLFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHZpc2libGUnLCBhbmltYXRlKCd7e3Nob3dUcmFuc2l0aW9uUGFyYW1zfX0nKSksXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3Zpc2libGUgPT4gdm9pZCcsIGFuaW1hdGUoJ3t7aGlkZVRyYW5zaXRpb25QYXJhbXN9fScpKVxyXG4gICAgICAgIF0pXHJcbiAgICBdLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNZW51IGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuXHJcbiAgICBASW5wdXQoKSBtb2RlbDogTWVudUl0ZW1bXTtcclxuXHJcbiAgICBASW5wdXQoKSBwb3B1cDogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcclxuICAgIFxyXG4gICAgQElucHV0KCkgYXBwZW5kVG86IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBhdXRvWkluZGV4OiBib29sZWFuID0gdHJ1ZTtcclxuICAgIFxyXG4gICAgQElucHV0KCkgYmFzZVpJbmRleDogbnVtYmVyID0gMDtcclxuICAgIFxyXG4gICAgQElucHV0KCkgc2hvd1RyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnMjI1bXMgZWFzZS1vdXQnO1xyXG5cclxuICAgIEBJbnB1dCgpIGhpZGVUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJzE5NW1zIGVhc2UtaW4nO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicpIGNvbnRhaW5lclZpZXdDaGlsZDogRWxlbWVudFJlZjtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25TaG93OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIFxyXG4gICAgQE91dHB1dCgpIG9uSGlkZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBcclxuICAgIGNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBcclxuICAgIGRvY3VtZW50Q2xpY2tMaXN0ZW5lcjogYW55O1xyXG5cclxuICAgIGRvY3VtZW50UmVzaXplTGlzdGVuZXI6IGFueTtcclxuICAgIFxyXG4gICAgcHJldmVudERvY3VtZW50RGVmYXVsdDogYm9vbGVhbjtcclxuXHJcbiAgICB0YXJnZXQ6IGFueTtcclxuXHJcbiAgICB2aXNpYmxlOiBib29sZWFuO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyLHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7fVxyXG5cclxuICAgIHRvZ2dsZShldmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLnZpc2libGUpXHJcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5zaG93KGV2ZW50KTtcclxuXHJcbiAgICAgICAgdGhpcy5wcmV2ZW50RG9jdW1lbnREZWZhdWx0ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93KGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy50YXJnZXQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5wcmV2ZW50RG9jdW1lbnREZWZhdWx0ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBvbk92ZXJsYXlBbmltYXRpb25TdGFydChldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcclxuICAgICAgICBzd2l0Y2goZXZlbnQudG9TdGF0ZSkge1xyXG4gICAgICAgICAgICBjYXNlICd2aXNpYmxlJzpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBvcHVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPSBldmVudC5lbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZU9uVG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblNob3cuZW1pdCh7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRPdmVybGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hYnNvbHV0ZVBvc2l0aW9uKHRoaXMuY29udGFpbmVyLCB0aGlzLnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ3ZvaWQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk92ZXJsYXlIaWRlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uSGlkZS5lbWl0KHt9KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFwcGVuZE92ZXJsYXkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8gPT09ICdib2R5JylcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyLCB0aGlzLmFwcGVuZFRvKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVzdG9yZU92ZXJsYXlBcHBlbmQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyICYmIHRoaXMuYXBwZW5kVG8pIHtcclxuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG1vdmVPblRvcCgpIHtcclxuICAgICAgICBpZiAodGhpcy5hdXRvWkluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnpJbmRleCA9IFN0cmluZyh0aGlzLmJhc2VaSW5kZXggKyAoKytEb21IYW5kbGVyLnppbmRleCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgaGlkZSgpIHtcclxuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbldpbmRvd1Jlc2l6ZSgpIHtcclxuICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaXRlbUNsaWNrKGV2ZW50LCBpdGVtOiBNZW51SXRlbSnCoHtcclxuICAgICAgICBpZiAoaXRlbS5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICghaXRlbS51cmwpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGl0ZW0uY29tbWFuZCkge1xyXG4gICAgICAgICAgICBpdGVtLmNvbW1hbmQoe1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXHJcbiAgICAgICAgICAgICAgICBpdGVtOiBpdGVtXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5wb3B1cCkge1xyXG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnByZXZlbnREb2N1bWVudERlZmF1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZlbnREb2N1bWVudERlZmF1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpIHtcclxuICAgICAgICBpZiAodGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBiaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpIHtcclxuICAgICAgICB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIgPSB0aGlzLm9uV2luZG93UmVzaXplLmJpbmQodGhpcyk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKTtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25PdmVybGF5SGlkZSgpIHtcclxuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xyXG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpO1xyXG4gICAgICAgIHRoaXMucHJldmVudERvY3VtZW50RGVmYXVsdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gbnVsbDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucG9wdXApIHtcclxuICAgICAgICAgICAgdGhpcy5yZXN0b3JlT3ZlcmxheUFwcGVuZCgpO1xyXG4gICAgICAgICAgICB0aGlzLm9uT3ZlcmxheUhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGhhc1N1Yk1lbnUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMubW9kZWwpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaXRlbSBvZiB0aGlzLm1vZGVsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5pdGVtcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsUm91dGVyTW9kdWxlXSxcclxuICAgIGV4cG9ydHM6IFtNZW51LFJvdXRlck1vZHVsZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtNZW51LE1lbnVJdGVtQ29udGVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE1lbnVNb2R1bGUgeyB9XHJcbiJdfQ==