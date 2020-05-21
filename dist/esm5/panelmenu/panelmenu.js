var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
import { NgModule, Component, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
var BasePanelMenuItem = /** @class */ (function () {
    function BasePanelMenuItem(ref) {
        this.ref = ref;
    }
    BasePanelMenuItem.prototype.handleClick = function (event, item) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }
        item.expanded = !item.expanded;
        this.ref.detectChanges();
        if (!item.url) {
            event.preventDefault();
        }
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
    };
    return BasePanelMenuItem;
}());
export { BasePanelMenuItem };
var PanelMenuSub = /** @class */ (function (_super) {
    __extends(PanelMenuSub, _super);
    function PanelMenuSub(ref) {
        return _super.call(this, ref) || this;
    }
    PanelMenuSub.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], PanelMenuSub.prototype, "item", void 0);
    __decorate([
        Input()
    ], PanelMenuSub.prototype, "expanded", void 0);
    __decorate([
        Input()
    ], PanelMenuSub.prototype, "transitionOptions", void 0);
    PanelMenuSub = __decorate([
        Component({
            selector: 'p-panelMenuSub',
            template: "\n        <ul class=\"ui-submenu-list\" [@submenu]=\"expanded ? {value: 'visible', params: {transitionParams: transitionOptions, height: '*'}} : {value: 'hidden', params: {transitionParams: transitionOptions, height: '0'}}\" role=\"tree\">\n            <ng-template ngFor let-child [ngForOf]=\"item.items\">\n                <li *ngIf=\"child.separator\" class=\"ui-menu-separator ui-widget-content\" role=\"separator\">\n                <li *ngIf=\"!child.separator\" class=\"ui-menuitem ui-corner-all\" [ngClass]=\"child.styleClass\" [class.ui-helper-hidden]=\"child.visible === false\" [ngStyle]=\"child.style\">\n                    <a *ngIf=\"!child.routerLink\" [href]=\"child.url||'#'\" class=\"ui-menuitem-link ui-corner-all\" [attr.tabindex]=\"item.expanded ? null : child.tabindex ? child.tabindex : '-1'\" [attr.id]=\"child.id\"\n                        [ngClass]=\"{'ui-state-disabled':child.disabled, 'ui-state-active': child.expanded}\" role=\"treeitem\" [attr.aria-expanded]=\"child.expanded\"\n                        (click)=\"handleClick($event,child)\" [attr.target]=\"child.target\" [attr.title]=\"child.title\">\n                        <span class=\"ui-panelmenu-icon pi pi-fw\" [ngClass]=\"{'pi-caret-right':!child.expanded,'pi-caret-down':child.expanded}\" *ngIf=\"child.items\"></span\n                        ><span class=\"ui-menuitem-icon\" [ngClass]=\"child.icon\" *ngIf=\"child.icon\"></span\n                        ><span class=\"ui-menuitem-text\">{{child.label}}</span>\n                    </a>\n                    <a *ngIf=\"child.routerLink\" [routerLink]=\"child.routerLink\" [queryParams]=\"child.queryParams\" [routerLinkActive]=\"'ui-menuitem-link-active'\" [routerLinkActiveOptions]=\"child.routerLinkActiveOptions||{exact:false}\" class=\"ui-menuitem-link ui-corner-all\" \n                        [ngClass]=\"{'ui-state-disabled':child.disabled}\" [attr.tabindex]=\"item.expanded ? null : child.tabindex ? child.tabindex : '-1'\" [attr.id]=\"child.id\" role=\"treeitem\" [attr.aria-expanded]=\"child.expanded\"\n                        (click)=\"handleClick($event,child)\" [attr.target]=\"child.target\" [attr.title]=\"child.title\"\n                        [fragment]=\"child.fragment\" [queryParamsHandling]=\"child.queryParamsHandling\" [preserveFragment]=\"child.preserveFragment\" [skipLocationChange]=\"child.skipLocationChange\" [replaceUrl]=\"child.replaceUrl\" [state]=\"child.state\">\n                        <span class=\"ui-panelmenu-icon pi pi-fw\" [ngClass]=\"{'pi-caret-right':!child.expanded,'pi-caret-down':child.expanded}\" *ngIf=\"child.items\"></span\n                        ><span class=\"ui-menuitem-icon\" [ngClass]=\"child.icon\" *ngIf=\"child.icon\"></span\n                        ><span class=\"ui-menuitem-text\">{{child.label}}</span>\n                    </a>\n                    <p-panelMenuSub [item]=\"child\" [expanded]=\"child.expanded\" [transitionOptions]=\"transitionOptions\" *ngIf=\"child.items\"></p-panelMenuSub>\n                </li>\n            </ng-template>\n        </ul>\n    ",
            animations: [
                trigger('submenu', [
                    state('hidden', style({
                        height: '0px'
                    })),
                    state('void', style({
                        height: '{{height}}'
                    }), { params: { height: '0' } }),
                    state('visible', style({
                        height: '*'
                    })),
                    transition('visible => hidden', animate('{{transitionParams}}')),
                    transition('hidden => visible', animate('{{transitionParams}}')),
                    transition('void => hidden', animate('{{transitionParams}}')),
                    transition('void => visible', animate('{{transitionParams}}'))
                ])
            ]
        })
    ], PanelMenuSub);
    return PanelMenuSub;
}(BasePanelMenuItem));
export { PanelMenuSub };
var PanelMenu = /** @class */ (function (_super) {
    __extends(PanelMenu, _super);
    function PanelMenu(ref) {
        var _this = _super.call(this, ref) || this;
        _this.multiple = true;
        _this.transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
        return _this;
    }
    PanelMenu.prototype.collapseAll = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.model), _c = _b.next(); !_c.done; _c = _b.next()) {
                var item = _c.value;
                if (item.expanded) {
                    item.expanded = false;
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
    };
    PanelMenu.prototype.handleClick = function (event, item) {
        var e_2, _a;
        if (!this.multiple) {
            try {
                for (var _b = __values(this.model), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var modelItem = _c.value;
                    if (item !== modelItem && modelItem.expanded) {
                        modelItem.expanded = false;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        this.animating = true;
        _super.prototype.handleClick.call(this, event, item);
    };
    PanelMenu.prototype.onToggleDone = function () {
        this.animating = false;
    };
    PanelMenu.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], PanelMenu.prototype, "model", void 0);
    __decorate([
        Input()
    ], PanelMenu.prototype, "style", void 0);
    __decorate([
        Input()
    ], PanelMenu.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], PanelMenu.prototype, "multiple", void 0);
    __decorate([
        Input()
    ], PanelMenu.prototype, "transitionOptions", void 0);
    PanelMenu = __decorate([
        Component({
            selector: 'p-panelMenu',
            template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" [ngClass]=\"'ui-panelmenu ui-widget'\">\n            <ng-container *ngFor=\"let item of model;let f=first;let l=last;\">\n                <div class=\"ui-panelmenu-panel\" [ngClass]=\"{'ui-helper-hidden': item.visible === false}\">\n                    <div [ngClass]=\"{'ui-widget ui-panelmenu-header ui-state-default':true,'ui-corner-top':f,'ui-corner-bottom':l&&!item.expanded,\n                    'ui-state-active':item.expanded,'ui-state-disabled':item.disabled}\" [class]=\"item.styleClass\" [ngStyle]=\"item.style\">\n                        <a *ngIf=\"!item.routerLink\" [href]=\"item.url||'#'\" (click)=\"handleClick($event,item)\" [attr.tabindex]=\"item.tabindex ? item.tabindex : '0'\" [attr.id]=\"item.id\"\n                           [attr.target]=\"item.target\" [attr.title]=\"item.title\" class=\"ui-panelmenu-header-link\" [attr.aria-expanded]=\"item.expanded\" [attr.id]=\"item.id + '_header'\" [attr.aria-controls]=\"item.id +'_content'\">\n                        <span *ngIf=\"item.items\" class=\"ui-panelmenu-icon pi pi-fw\" [ngClass]=\"{'pi-chevron-right':!item.expanded,'pi-chevron-down':item.expanded}\"></span\n                        ><span class=\"ui-menuitem-icon\" [ngClass]=\"item.icon\" *ngIf=\"item.icon\"></span\n                        ><span class=\"ui-menuitem-text\">{{item.label}}</span>\n                        </a>\n                        <a *ngIf=\"item.routerLink\" [routerLink]=\"item.routerLink\" [queryParams]=\"item.queryParams\" [routerLinkActive]=\"'ui-menuitem-link-active'\" [routerLinkActiveOptions]=\"item.routerLinkActiveOptions||{exact:false}\"\n                           (click)=\"handleClick($event,item)\" [attr.target]=\"item.target\" [attr.title]=\"item.title\" class=\"ui-panelmenu-header-link\" [attr.id]=\"item.id\" [attr.tabindex]=\"item.tabindex ? item.tabindex : '0'\"\n                           [fragment]=\"item.fragment\" [queryParamsHandling]=\"item.queryParamsHandling\" [preserveFragment]=\"item.preserveFragment\" [skipLocationChange]=\"item.skipLocationChange\" [replaceUrl]=\"item.replaceUrl\" [state]=\"item.state\">\n                        <span *ngIf=\"item.items\" class=\"ui-panelmenu-icon pi pi-fw\" [ngClass]=\"{'pi-chevron-right':!item.expanded,'pi-chevron-down':item.expanded}\"></span\n                        ><span class=\"ui-menuitem-icon\" [ngClass]=\"item.icon\" *ngIf=\"item.icon\"></span\n                        ><span class=\"ui-menuitem-text\">{{item.label}}</span>\n                        </a>\n                    </div>\n                    <div *ngIf=\"item.items\" class=\"ui-panelmenu-content-wrapper\" [@rootItem]=\"item.expanded ? {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*'}} : {value: 'hidden', params: {transitionParams: transitionOptions, height: '0'}}\"  (@rootItem.done)=\"onToggleDone()\"\n                         [ngClass]=\"{'ui-panelmenu-content-wrapper-overflown': !item.expanded||animating}\">\n                        <div class=\"ui-panelmenu-content ui-widget-content\" role=\"region\" [attr.id]=\"item.id +'_content' \" [attr.aria-labelledby]=\"item.id +'_header'\">\n                            <p-panelMenuSub [item]=\"item\" [expanded]=\"true\" [transitionOptions]=\"transitionOptions\" class=\"ui-panelmenu-root-submenu\"></p-panelMenuSub>\n                        </div>\n                    </div>\n                </div>\n            </ng-container>\n        </div>\n    ",
            animations: [
                trigger('rootItem', [
                    state('hidden', style({
                        height: '0px'
                    })),
                    state('void', style({
                        height: '{{height}}'
                    }), { params: { height: '0' } }),
                    state('visible', style({
                        height: '*'
                    })),
                    transition('visible => hidden', animate('{{transitionParams}}')),
                    transition('hidden => visible', animate('{{transitionParams}}')),
                    transition('void => hidden', animate('{{transitionParams}}')),
                    transition('void => visible', animate('{{transitionParams}}'))
                ])
            ],
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], PanelMenu);
    return PanelMenu;
}(BasePanelMenuItem));
export { PanelMenu };
var PanelMenuModule = /** @class */ (function () {
    function PanelMenuModule() {
    }
    PanelMenuModule = __decorate([
        NgModule({
            imports: [CommonModule, RouterModule],
            exports: [PanelMenu, RouterModule],
            declarations: [PanelMenu, PanelMenuSub]
        })
    ], PanelMenuModule);
    return PanelMenuModule;
}());
export { PanelMenuModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWxtZW51LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9wYW5lbG1lbnUvIiwic291cmNlcyI6WyJwYW5lbG1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLGlCQUFpQixFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pHLE9BQU8sRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDM0UsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRTdDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUU3QztJQUVJLDJCQUFvQixHQUFzQjtRQUF0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtJQUFHLENBQUM7SUFFOUMsdUNBQVcsR0FBWCxVQUFZLEtBQUssRUFBRSxJQUFJO1FBQ25CLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMvQixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRXpCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1gsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQzFCO1FBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDVCxhQUFhLEVBQUUsS0FBSztnQkFDcEIsSUFBSSxFQUFFLElBQUk7YUFDYixDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFDTCx3QkFBQztBQUFELENBQUMsQUF4QkQs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QVksQ0FBQztTQUN6QyxDQUFDO09BQ1csZUFBZSxDQUFJO0lBQUQsc0JBQUM7Q0FBQSxBQUFoQyxJQUFnQztTQUFuQixlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsSW5wdXQsQ2hhbmdlRGV0ZWN0b3JSZWYsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge3RyaWdnZXIsc3RhdGUsc3R5bGUsdHJhbnNpdGlvbixhbmltYXRlfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7TWVudUl0ZW19IGZyb20gJ3ByaW1lbmcvYXBpJztcclxuaW1wb3J0IHtSb3V0ZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZVBhbmVsTWVudUl0ZW0ge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cclxuICAgICAgICBcclxuICAgIGhhbmRsZUNsaWNrKGV2ZW50LCBpdGVtKSB7XHJcbiAgICAgICAgaWYgKGl0ZW0uZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpdGVtLmV4cGFuZGVkID0gIWl0ZW0uZXhwYW5kZWQ7XHJcbiAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICghaXRlbS51cmwpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICBpZiAoaXRlbS5jb21tYW5kKSB7XHJcbiAgICAgICAgICAgIGl0ZW0uY29tbWFuZCh7XHJcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgICAgIGl0ZW06IGl0ZW1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC1wYW5lbE1lbnVTdWInLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8dWwgY2xhc3M9XCJ1aS1zdWJtZW51LWxpc3RcIiBbQHN1Ym1lbnVdPVwiZXhwYW5kZWQgPyB7dmFsdWU6ICd2aXNpYmxlJywgcGFyYW1zOiB7dHJhbnNpdGlvblBhcmFtczogdHJhbnNpdGlvbk9wdGlvbnMsIGhlaWdodDogJyonfX0gOiB7dmFsdWU6ICdoaWRkZW4nLCBwYXJhbXM6IHt0cmFuc2l0aW9uUGFyYW1zOiB0cmFuc2l0aW9uT3B0aW9ucywgaGVpZ2h0OiAnMCd9fVwiIHJvbGU9XCJ0cmVlXCI+XHJcbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtY2hpbGQgW25nRm9yT2ZdPVwiaXRlbS5pdGVtc1wiPlxyXG4gICAgICAgICAgICAgICAgPGxpICpuZ0lmPVwiY2hpbGQuc2VwYXJhdG9yXCIgY2xhc3M9XCJ1aS1tZW51LXNlcGFyYXRvciB1aS13aWRnZXQtY29udGVudFwiIHJvbGU9XCJzZXBhcmF0b3JcIj5cclxuICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cIiFjaGlsZC5zZXBhcmF0b3JcIiBjbGFzcz1cInVpLW1lbnVpdGVtIHVpLWNvcm5lci1hbGxcIiBbbmdDbGFzc109XCJjaGlsZC5zdHlsZUNsYXNzXCIgW2NsYXNzLnVpLWhlbHBlci1oaWRkZW5dPVwiY2hpbGQudmlzaWJsZSA9PT0gZmFsc2VcIiBbbmdTdHlsZV09XCJjaGlsZC5zdHlsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwiIWNoaWxkLnJvdXRlckxpbmtcIiBbaHJlZl09XCJjaGlsZC51cmx8fCcjJ1wiIGNsYXNzPVwidWktbWVudWl0ZW0tbGluayB1aS1jb3JuZXItYWxsXCIgW2F0dHIudGFiaW5kZXhdPVwiaXRlbS5leHBhbmRlZCA/IG51bGwgOiBjaGlsZC50YWJpbmRleCA/IGNoaWxkLnRhYmluZGV4IDogJy0xJ1wiIFthdHRyLmlkXT1cImNoaWxkLmlkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1kaXNhYmxlZCc6Y2hpbGQuZGlzYWJsZWQsICd1aS1zdGF0ZS1hY3RpdmUnOiBjaGlsZC5leHBhbmRlZH1cIiByb2xlPVwidHJlZWl0ZW1cIiBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cImNoaWxkLmV4cGFuZGVkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudCxjaGlsZClcIiBbYXR0ci50YXJnZXRdPVwiY2hpbGQudGFyZ2V0XCIgW2F0dHIudGl0bGVdPVwiY2hpbGQudGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1wYW5lbG1lbnUtaWNvbiBwaSBwaS1md1wiIFtuZ0NsYXNzXT1cInsncGktY2FyZXQtcmlnaHQnOiFjaGlsZC5leHBhbmRlZCwncGktY2FyZXQtZG93bic6Y2hpbGQuZXhwYW5kZWR9XCIgKm5nSWY9XCJjaGlsZC5pdGVtc1wiPjwvc3BhblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA+PHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS1pY29uXCIgW25nQ2xhc3NdPVwiY2hpbGQuaWNvblwiICpuZ0lmPVwiY2hpbGQuaWNvblwiPjwvc3BhblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA+PHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS10ZXh0XCI+e3tjaGlsZC5sYWJlbH19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cImNoaWxkLnJvdXRlckxpbmtcIiBbcm91dGVyTGlua109XCJjaGlsZC5yb3V0ZXJMaW5rXCIgW3F1ZXJ5UGFyYW1zXT1cImNoaWxkLnF1ZXJ5UGFyYW1zXCIgW3JvdXRlckxpbmtBY3RpdmVdPVwiJ3VpLW1lbnVpdGVtLWxpbmstYWN0aXZlJ1wiIFtyb3V0ZXJMaW5rQWN0aXZlT3B0aW9uc109XCJjaGlsZC5yb3V0ZXJMaW5rQWN0aXZlT3B0aW9uc3x8e2V4YWN0OmZhbHNlfVwiIGNsYXNzPVwidWktbWVudWl0ZW0tbGluayB1aS1jb3JuZXItYWxsXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtZGlzYWJsZWQnOmNoaWxkLmRpc2FibGVkfVwiIFthdHRyLnRhYmluZGV4XT1cIml0ZW0uZXhwYW5kZWQgPyBudWxsIDogY2hpbGQudGFiaW5kZXggPyBjaGlsZC50YWJpbmRleCA6ICctMSdcIiBbYXR0ci5pZF09XCJjaGlsZC5pZFwiIHJvbGU9XCJ0cmVlaXRlbVwiIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwiY2hpbGQuZXhwYW5kZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiaGFuZGxlQ2xpY2soJGV2ZW50LGNoaWxkKVwiIFthdHRyLnRhcmdldF09XCJjaGlsZC50YXJnZXRcIiBbYXR0ci50aXRsZV09XCJjaGlsZC50aXRsZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtmcmFnbWVudF09XCJjaGlsZC5mcmFnbWVudFwiIFtxdWVyeVBhcmFtc0hhbmRsaW5nXT1cImNoaWxkLnF1ZXJ5UGFyYW1zSGFuZGxpbmdcIiBbcHJlc2VydmVGcmFnbWVudF09XCJjaGlsZC5wcmVzZXJ2ZUZyYWdtZW50XCIgW3NraXBMb2NhdGlvbkNoYW5nZV09XCJjaGlsZC5za2lwTG9jYXRpb25DaGFuZ2VcIiBbcmVwbGFjZVVybF09XCJjaGlsZC5yZXBsYWNlVXJsXCIgW3N0YXRlXT1cImNoaWxkLnN0YXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktcGFuZWxtZW51LWljb24gcGkgcGktZndcIiBbbmdDbGFzc109XCJ7J3BpLWNhcmV0LXJpZ2h0JzohY2hpbGQuZXhwYW5kZWQsJ3BpLWNhcmV0LWRvd24nOmNoaWxkLmV4cGFuZGVkfVwiICpuZ0lmPVwiY2hpbGQuaXRlbXNcIj48L3NwYW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPjxzcGFuIGNsYXNzPVwidWktbWVudWl0ZW0taWNvblwiIFtuZ0NsYXNzXT1cImNoaWxkLmljb25cIiAqbmdJZj1cImNoaWxkLmljb25cIj48L3NwYW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPjxzcGFuIGNsYXNzPVwidWktbWVudWl0ZW0tdGV4dFwiPnt7Y2hpbGQubGFiZWx9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAtcGFuZWxNZW51U3ViIFtpdGVtXT1cImNoaWxkXCIgW2V4cGFuZGVkXT1cImNoaWxkLmV4cGFuZGVkXCIgW3RyYW5zaXRpb25PcHRpb25zXT1cInRyYW5zaXRpb25PcHRpb25zXCIgKm5nSWY9XCJjaGlsZC5pdGVtc1wiPjwvcC1wYW5lbE1lbnVTdWI+XHJcbiAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICAgIDwvdWw+XHJcbiAgICBgLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICAgIHRyaWdnZXIoJ3N1Ym1lbnUnLCBbXHJcbiAgICAgICAgICAgIHN0YXRlKCdoaWRkZW4nLCBzdHlsZSh7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcwcHgnXHJcbiAgICAgICAgICAgIH0pKSxcclxuICAgICAgICAgICAgc3RhdGUoJ3ZvaWQnLCBzdHlsZSh7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICd7e2hlaWdodH19J1xyXG4gICAgICAgICAgICB9KSwge3BhcmFtczoge2hlaWdodDogJzAnfX0pLFxyXG4gICAgICAgICAgICBzdGF0ZSgndmlzaWJsZScsIHN0eWxlKHtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogJyonXHJcbiAgICAgICAgICAgIH0pKSxcclxuICAgICAgICAgICAgdHJhbnNpdGlvbigndmlzaWJsZSA9PiBoaWRkZW4nLCBhbmltYXRlKCd7e3RyYW5zaXRpb25QYXJhbXN9fScpKSxcclxuICAgICAgICAgICAgdHJhbnNpdGlvbignaGlkZGVuID0+IHZpc2libGUnLCBhbmltYXRlKCd7e3RyYW5zaXRpb25QYXJhbXN9fScpKSxcclxuICAgICAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiBoaWRkZW4nLCBhbmltYXRlKCd7e3RyYW5zaXRpb25QYXJhbXN9fScpKSxcclxuICAgICAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiB2aXNpYmxlJywgYW5pbWF0ZSgne3t0cmFuc2l0aW9uUGFyYW1zfX0nKSlcclxuICAgICAgICBdKVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGFuZWxNZW51U3ViIGV4dGVuZHMgQmFzZVBhbmVsTWVudUl0ZW0ge1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBpdGVtOiBNZW51SXRlbTtcclxuICAgIFxyXG4gICAgQElucHV0KCkgZXhwYW5kZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgdHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihyZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XHJcbiAgICAgICAgc3VwZXIocmVmKTtcclxuICAgIH1cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3AtcGFuZWxNZW51JyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW25nQ2xhc3NdPVwiJ3VpLXBhbmVsbWVudSB1aS13aWRnZXQnXCI+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgbW9kZWw7bGV0IGY9Zmlyc3Q7bGV0IGw9bGFzdDtcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1wYW5lbG1lbnUtcGFuZWxcIiBbbmdDbGFzc109XCJ7J3VpLWhlbHBlci1oaWRkZW4nOiBpdGVtLnZpc2libGUgPT09IGZhbHNlfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyd1aS13aWRnZXQgdWktcGFuZWxtZW51LWhlYWRlciB1aS1zdGF0ZS1kZWZhdWx0Jzp0cnVlLCd1aS1jb3JuZXItdG9wJzpmLCd1aS1jb3JuZXItYm90dG9tJzpsJiYhaXRlbS5leHBhbmRlZCxcclxuICAgICAgICAgICAgICAgICAgICAndWktc3RhdGUtYWN0aXZlJzppdGVtLmV4cGFuZGVkLCd1aS1zdGF0ZS1kaXNhYmxlZCc6aXRlbS5kaXNhYmxlZH1cIiBbY2xhc3NdPVwiaXRlbS5zdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwiaXRlbS5zdHlsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cIiFpdGVtLnJvdXRlckxpbmtcIiBbaHJlZl09XCJpdGVtLnVybHx8JyMnXCIgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudCxpdGVtKVwiIFthdHRyLnRhYmluZGV4XT1cIml0ZW0udGFiaW5kZXggPyBpdGVtLnRhYmluZGV4IDogJzAnXCIgW2F0dHIuaWRdPVwiaXRlbS5pZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhcmdldF09XCJpdGVtLnRhcmdldFwiIFthdHRyLnRpdGxlXT1cIml0ZW0udGl0bGVcIiBjbGFzcz1cInVpLXBhbmVsbWVudS1oZWFkZXItbGlua1wiIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwiaXRlbS5leHBhbmRlZFwiIFthdHRyLmlkXT1cIml0ZW0uaWQgKyAnX2hlYWRlcidcIiBbYXR0ci5hcmlhLWNvbnRyb2xzXT1cIml0ZW0uaWQgKydfY29udGVudCdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJpdGVtLml0ZW1zXCIgY2xhc3M9XCJ1aS1wYW5lbG1lbnUtaWNvbiBwaSBwaS1md1wiIFtuZ0NsYXNzXT1cInsncGktY2hldnJvbi1yaWdodCc6IWl0ZW0uZXhwYW5kZWQsJ3BpLWNoZXZyb24tZG93bic6aXRlbS5leHBhbmRlZH1cIj48L3NwYW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPjxzcGFuIGNsYXNzPVwidWktbWVudWl0ZW0taWNvblwiIFtuZ0NsYXNzXT1cIml0ZW0uaWNvblwiICpuZ0lmPVwiaXRlbS5pY29uXCI+PC9zcGFuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID48c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLXRleHRcIj57e2l0ZW0ubGFiZWx9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cIml0ZW0ucm91dGVyTGlua1wiIFtyb3V0ZXJMaW5rXT1cIml0ZW0ucm91dGVyTGlua1wiIFtxdWVyeVBhcmFtc109XCJpdGVtLnF1ZXJ5UGFyYW1zXCIgW3JvdXRlckxpbmtBY3RpdmVdPVwiJ3VpLW1lbnVpdGVtLWxpbmstYWN0aXZlJ1wiIFtyb3V0ZXJMaW5rQWN0aXZlT3B0aW9uc109XCJpdGVtLnJvdXRlckxpbmtBY3RpdmVPcHRpb25zfHx7ZXhhY3Q6ZmFsc2V9XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImhhbmRsZUNsaWNrKCRldmVudCxpdGVtKVwiIFthdHRyLnRhcmdldF09XCJpdGVtLnRhcmdldFwiIFthdHRyLnRpdGxlXT1cIml0ZW0udGl0bGVcIiBjbGFzcz1cInVpLXBhbmVsbWVudS1oZWFkZXItbGlua1wiIFthdHRyLmlkXT1cIml0ZW0uaWRcIiBbYXR0ci50YWJpbmRleF09XCJpdGVtLnRhYmluZGV4ID8gaXRlbS50YWJpbmRleCA6ICcwJ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmcmFnbWVudF09XCJpdGVtLmZyYWdtZW50XCIgW3F1ZXJ5UGFyYW1zSGFuZGxpbmddPVwiaXRlbS5xdWVyeVBhcmFtc0hhbmRsaW5nXCIgW3ByZXNlcnZlRnJhZ21lbnRdPVwiaXRlbS5wcmVzZXJ2ZUZyYWdtZW50XCIgW3NraXBMb2NhdGlvbkNoYW5nZV09XCJpdGVtLnNraXBMb2NhdGlvbkNoYW5nZVwiIFtyZXBsYWNlVXJsXT1cIml0ZW0ucmVwbGFjZVVybFwiIFtzdGF0ZV09XCJpdGVtLnN0YXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaXRlbS5pdGVtc1wiIGNsYXNzPVwidWktcGFuZWxtZW51LWljb24gcGkgcGktZndcIiBbbmdDbGFzc109XCJ7J3BpLWNoZXZyb24tcmlnaHQnOiFpdGVtLmV4cGFuZGVkLCdwaS1jaGV2cm9uLWRvd24nOml0ZW0uZXhwYW5kZWR9XCI+PC9zcGFuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID48c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLWljb25cIiBbbmdDbGFzc109XCJpdGVtLmljb25cIiAqbmdJZj1cIml0ZW0uaWNvblwiPjwvc3BhblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA+PHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS10ZXh0XCI+e3tpdGVtLmxhYmVsfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiaXRlbS5pdGVtc1wiIGNsYXNzPVwidWktcGFuZWxtZW51LWNvbnRlbnQtd3JhcHBlclwiIFtAcm9vdEl0ZW1dPVwiaXRlbS5leHBhbmRlZCA/IHt2YWx1ZTogJ3Zpc2libGUnLCBwYXJhbXM6IHt0cmFuc2l0aW9uUGFyYW1zOiBhbmltYXRpbmcgPyB0cmFuc2l0aW9uT3B0aW9ucyA6ICcwbXMnLCBoZWlnaHQ6ICcqJ319IDoge3ZhbHVlOiAnaGlkZGVuJywgcGFyYW1zOiB7dHJhbnNpdGlvblBhcmFtczogdHJhbnNpdGlvbk9wdGlvbnMsIGhlaWdodDogJzAnfX1cIiAgKEByb290SXRlbS5kb25lKT1cIm9uVG9nZ2xlRG9uZSgpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktcGFuZWxtZW51LWNvbnRlbnQtd3JhcHBlci1vdmVyZmxvd24nOiAhaXRlbS5leHBhbmRlZHx8YW5pbWF0aW5nfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktcGFuZWxtZW51LWNvbnRlbnQgdWktd2lkZ2V0LWNvbnRlbnRcIiByb2xlPVwicmVnaW9uXCIgW2F0dHIuaWRdPVwiaXRlbS5pZCArJ19jb250ZW50JyBcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiaXRlbS5pZCArJ19oZWFkZXInXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cC1wYW5lbE1lbnVTdWIgW2l0ZW1dPVwiaXRlbVwiIFtleHBhbmRlZF09XCJ0cnVlXCIgW3RyYW5zaXRpb25PcHRpb25zXT1cInRyYW5zaXRpb25PcHRpb25zXCIgY2xhc3M9XCJ1aS1wYW5lbG1lbnUtcm9vdC1zdWJtZW51XCI+PC9wLXBhbmVsTWVudVN1Yj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICAgIHRyaWdnZXIoJ3Jvb3RJdGVtJywgW1xyXG4gICAgICAgICAgICBzdGF0ZSgnaGlkZGVuJywgc3R5bGUoe1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnMHB4J1xyXG4gICAgICAgICAgICB9KSksXHJcbiAgICAgICAgICAgIHN0YXRlKCd2b2lkJywgc3R5bGUoe1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAne3toZWlnaHR9fSdcclxuICAgICAgICAgICAgfSksIHtwYXJhbXM6IHtoZWlnaHQ6ICcwJ319KSxcclxuICAgICAgICAgICAgc3RhdGUoJ3Zpc2libGUnLCBzdHlsZSh7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcqJ1xyXG4gICAgICAgICAgICB9KSksXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3Zpc2libGUgPT4gaGlkZGVuJywgYW5pbWF0ZSgne3t0cmFuc2l0aW9uUGFyYW1zfX0nKSksXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ2hpZGRlbiA9PiB2aXNpYmxlJywgYW5pbWF0ZSgne3t0cmFuc2l0aW9uUGFyYW1zfX0nKSksXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gaGlkZGVuJywgYW5pbWF0ZSgne3t0cmFuc2l0aW9uUGFyYW1zfX0nKSksXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gdmlzaWJsZScsIGFuaW1hdGUoJ3t7dHJhbnNpdGlvblBhcmFtc319JykpXHJcbiAgICAgICAgXSlcclxuICAgIF0sXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcclxufSlcclxuZXhwb3J0IGNsYXNzIFBhbmVsTWVudSBleHRlbmRzIEJhc2VQYW5lbE1lbnVJdGVtIHtcclxuICAgIFxyXG4gICAgQElucHV0KCkgbW9kZWw6IE1lbnVJdGVtW107XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgbXVsdGlwbGU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIHRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnNDAwbXMgY3ViaWMtYmV6aWVyKDAuODYsIDAsIDAuMDcsIDEpJztcclxuICAgIFxyXG4gICAgcHVibGljIGFuaW1hdGluZzogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihyZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XHJcbiAgICAgICAgc3VwZXIocmVmKTtcclxuICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgY29sbGFwc2VBbGwoKSB7XHJcbiAgICBcdGZvcihsZXQgaXRlbSBvZiB0aGlzLm1vZGVsKSB7XHJcbiAgICBcdFx0aWYgKGl0ZW0uZXhwYW5kZWQpIHtcclxuICAgIFx0XHRcdGl0ZW0uZXhwYW5kZWQgPSBmYWxzZTtcclxuICAgIFx0XHR9XHJcbiAgICBcdH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDbGljayhldmVudCwgaXRlbSkge1xyXG4gICAgXHRpZiAoIXRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgICAgICAgZm9yKGxldCBtb2RlbEl0ZW0gb2YgdGhpcy5tb2RlbCkge1xyXG4gICAgICAgIFx0XHRpZiAoaXRlbSAhPT0gbW9kZWxJdGVtICYmIG1vZGVsSXRlbS5leHBhbmRlZCkge1xyXG4gICAgICAgIFx0XHRcdG1vZGVsSXRlbS5leHBhbmRlZCA9IGZhbHNlO1xyXG4gICAgICAgIFx0XHR9XHJcbiAgICAgICAgXHR9XHJcbiAgICBcdH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmFuaW1hdGluZyA9IHRydWU7XHJcbiAgICAgICAgc3VwZXIuaGFuZGxlQ2xpY2soZXZlbnQsIGl0ZW0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvblRvZ2dsZURvbmUoKSB7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpbmcgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLFJvdXRlck1vZHVsZV0sXHJcbiAgICBleHBvcnRzOiBbUGFuZWxNZW51LFJvdXRlck1vZHVsZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtQYW5lbE1lbnUsUGFuZWxNZW51U3ViXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGFuZWxNZW51TW9kdWxlIHsgfVxyXG4iXX0=