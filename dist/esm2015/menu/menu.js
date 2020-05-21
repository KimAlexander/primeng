var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { NgModule, Component, ElementRef, OnDestroy, Input, Output, EventEmitter, Renderer2, ViewChild, Inject, forwardRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { RouterModule } from '@angular/router';
let MenuItemContent = class MenuItemContent {
    constructor(menu) {
        this.menu = menu;
    }
};
MenuItemContent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => Menu),] }] }
];
__decorate([
    Input("pMenuItemContent")
], MenuItemContent.prototype, "item", void 0);
MenuItemContent = __decorate([
    Component({
        selector: '[pMenuItemContent]',
        template: `
        <a *ngIf="!item.routerLink" [attr.href]="item.url||null" class="ui-menuitem-link ui-corner-all" [attr.tabindex]="item.tabindex ? item.tabindex : '0'" [attr.data-automationid]="item.automationId" [attr.target]="item.target" [attr.title]="item.title" [attr.id]="item.id"
            [ngClass]="{'ui-state-disabled':item.disabled}" (click)="menu.itemClick($event, item)" role="menuitem">
            <span class="ui-menuitem-icon" *ngIf="item.icon" [ngClass]="item.icon"></span>
            <span class="ui-menuitem-text">{{item.label}}</span>
        </a>
        <a *ngIf="item.routerLink" [routerLink]="item.routerLink" [attr.data-automationid]="item.automationId" [queryParams]="item.queryParams" [routerLinkActive]="'ui-menuitem-link-active'"
            [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}" class="ui-menuitem-link ui-corner-all" [attr.target]="item.target" [attr.id]="item.id" [attr.tabindex]="item.tabindex ? item.tabindex : '0'" 
            [attr.title]="item.title" [ngClass]="{'ui-state-disabled':item.disabled}" (click)="menu.itemClick($event, item)" role="menuitem"
            [fragment]="item.fragment" [queryParamsHandling]="item.queryParamsHandling" [preserveFragment]="item.preserveFragment" [skipLocationChange]="item.skipLocationChange" [replaceUrl]="item.replaceUrl" [state]="item.state">
            <span class="ui-menuitem-icon" *ngIf="item.icon" [ngClass]="item.icon"></span>
            <span class="ui-menuitem-text">{{item.label}}</span>
        </a>
    `
    }),
    __param(0, Inject(forwardRef(() => Menu)))
], MenuItemContent);
export { MenuItemContent };
let Menu = class Menu {
    constructor(el, renderer, cd) {
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
    toggle(event) {
        if (this.visible)
            this.hide();
        else
            this.show(event);
        this.preventDocumentDefault = true;
    }
    show(event) {
        this.target = event.currentTarget;
        this.visible = true;
        this.preventDocumentDefault = true;
    }
    onOverlayAnimationStart(event) {
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
    }
    appendOverlay() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.container);
            else
                DomHandler.appendChild(this.container, this.appendTo);
        }
    }
    restoreOverlayAppend() {
        if (this.container && this.appendTo) {
            this.el.nativeElement.appendChild(this.container);
        }
    }
    moveOnTop() {
        if (this.autoZIndex) {
            this.container.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
    }
    hide() {
        this.visible = false;
        this.cd.detectChanges();
    }
    onWindowResize() {
        this.hide();
    }
    itemClick(event, item) {
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
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', () => {
                if (!this.preventDocumentDefault) {
                    this.hide();
                }
                this.preventDocumentDefault = false;
            });
        }
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
    bindDocumentResizeListener() {
        this.documentResizeListener = this.onWindowResize.bind(this);
        window.addEventListener('resize', this.documentResizeListener);
    }
    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    }
    onOverlayHide() {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.preventDocumentDefault = false;
        this.target = null;
    }
    ngOnDestroy() {
        if (this.popup) {
            this.restoreOverlayAppend();
            this.onOverlayHide();
        }
    }
    hasSubMenu() {
        if (this.model) {
            for (var item of this.model) {
                if (item.items) {
                    return true;
                }
            }
        }
        return false;
    }
};
Menu.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
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
        template: `
        <div #container [ngClass]="{'ui-menu ui-widget ui-widget-content ui-corner-all': true, 'ui-menu-dynamic ui-shadow': popup}"
            [class]="styleClass" [ngStyle]="style" (click)="preventDocumentDefault=true" *ngIf="!popup || visible"
            [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" [@.disabled]="popup !== true" (@overlayAnimation.start)="onOverlayAnimationStart($event)">
            <ul>
                <ng-template ngFor let-submenu [ngForOf]="model" *ngIf="hasSubMenu()">
                    <li class="ui-menu-separator ui-widget-content" *ngIf="submenu.separator" [ngClass]="{'ui-helper-hidden': submenu.visible === false}"></li>
                    <li class="ui-submenu-header ui-widget-header ui-corner-all" [attr.data-automationid]="submenu.automationId" *ngIf="!submenu.separator" [ngClass]="{'ui-helper-hidden': submenu.visible === false}">{{submenu.label}}</li>
                    <ng-template ngFor let-item [ngForOf]="submenu.items">
                        <li class="ui-menu-separator ui-widget-content" *ngIf="item.separator" [ngClass]="{'ui-helper-hidden': (item.visible === false || submenu.visible === false)}"></li>
                        <li class="ui-menuitem ui-widget ui-corner-all" *ngIf="!item.separator" [pMenuItemContent]="item" [ngClass]="{'ui-helper-hidden': (item.visible === false || submenu.visible === false)}" [ngStyle]="item.style" [class]="item.styleClass"></li>
                    </ng-template>
                </ng-template>
                <ng-template ngFor let-item [ngForOf]="model" *ngIf="!hasSubMenu()">
                    <li class="ui-menu-separator ui-widget-content" *ngIf="item.separator" [ngClass]="{'ui-helper-hidden': item.visible === false}"></li>
                    <li class="ui-menuitem ui-widget ui-corner-all" *ngIf="!item.separator" [pMenuItemContent]="item" [ngClass]="{'ui-helper-hidden': item.visible === false}" [ngStyle]="item.style" [class]="item.styleClass"></li>
                </ng-template>
            </ul>
        </div>
    `,
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
export { Menu };
let MenuModule = class MenuModule {
};
MenuModule = __decorate([
    NgModule({
        imports: [CommonModule, RouterModule],
        exports: [Menu, RouterModule],
        declarations: [Menu, MenuItemContent]
    })
], MenuModule);
export { MenuModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvbWVudS8iLCJzb3VyY2VzIjpbIm1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsaUJBQWlCLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDaEwsT0FBTyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQWdCLE1BQU0scUJBQXFCLENBQUM7QUFDMUYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFFdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBbUI3QyxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBTXhCLFlBQTRDLElBQUk7UUFDNUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFZLENBQUM7SUFDN0IsQ0FBQztDQUNKLENBQUE7OzRDQUhnQixNQUFNLFNBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQzs7QUFKZjtJQUExQixLQUFLLENBQUMsa0JBQWtCLENBQUM7NkNBQWdCO0FBRmpDLGVBQWU7SUFqQjNCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxvQkFBb0I7UUFDOUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7O0tBYVQ7S0FDSixDQUFDO0lBT2UsV0FBQSxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7R0FObEMsZUFBZSxDQVMzQjtTQVRZLGVBQWU7QUFpRDVCLElBQWEsSUFBSSxHQUFqQixNQUFhLElBQUk7SUFzQ2IsWUFBbUIsRUFBYyxFQUFTLFFBQW1CLEVBQVMsRUFBcUI7UUFBeEUsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBUyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQTFCbEYsZUFBVSxHQUFZLElBQUksQ0FBQztRQUUzQixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBRXZCLDBCQUFxQixHQUFXLGdCQUFnQixDQUFDO1FBRWpELDBCQUFxQixHQUFXLGVBQWUsQ0FBQztRQUkvQyxXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFL0MsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBY3FDLENBQUM7SUFFL0YsTUFBTSxDQUFDLEtBQUs7UUFDUixJQUFJLElBQUksQ0FBQyxPQUFPO1lBQ1osSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDOztZQUVaLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFckIsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztJQUN2QyxDQUFDO0lBRUQsSUFBSSxDQUFDLEtBQUs7UUFDTixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztJQUN2QyxDQUFDO0lBRUQsdUJBQXVCLENBQUMsS0FBcUI7UUFDekMsUUFBTyxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ2xCLEtBQUssU0FBUztnQkFDVixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1osSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO29CQUMvQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNyQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDekQsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7b0JBQ2pDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO2lCQUNyQztnQkFDTCxNQUFNO1lBRU4sS0FBSyxNQUFNO2dCQUNQLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3pCLE1BQU07U0FDVDtJQUNMLENBQUM7SUFFRCxhQUFhO1FBQ1QsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE1BQU07Z0JBQ3hCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzs7Z0JBRTFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDN0Q7SUFDTCxDQUFDO0lBRUQsb0JBQW9CO1FBQ2hCLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDckQ7SUFDTCxDQUFDO0lBRUQsU0FBUztRQUNMLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQ2pGO0lBQ0wsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxjQUFjO1FBQ1YsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBSyxFQUFFLElBQWM7UUFDM0IsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1gsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQzFCO1FBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDVCxhQUFhLEVBQUUsS0FBSztnQkFDcEIsSUFBSSxFQUFFLElBQUk7YUFDYixDQUFDLENBQUM7U0FDTjtRQUVELElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNmO0lBQ0wsQ0FBQztJQUVELHlCQUF5QjtRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFO1lBQzdCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRTtnQkFDeEUsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtvQkFDOUIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUNmO2dCQUVELElBQUksQ0FBQyxzQkFBc0IsR0FBRyxLQUFLLENBQUM7WUFDeEMsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFFRCwyQkFBMkI7UUFDdkIsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDNUIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztTQUNyQztJQUNMLENBQUM7SUFFRCwwQkFBMEI7UUFDdEIsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELDRCQUE0QjtRQUN4QixJQUFJLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtZQUM3QixNQUFNLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ2xFLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7U0FDdEM7SUFDTCxDQUFDO0lBRUQsYUFBYTtRQUNULElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxLQUFLLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRUQsVUFBVTtRQUNOLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLEtBQUssSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDekIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNaLE9BQU8sSUFBSSxDQUFDO2lCQUNmO2FBQ0o7U0FDSjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Q0FDSixDQUFBOztZQWpKMEIsVUFBVTtZQUFtQixTQUFTO1lBQWEsaUJBQWlCOztBQXBDbEY7SUFBUixLQUFLLEVBQUU7bUNBQW1CO0FBRWxCO0lBQVIsS0FBSyxFQUFFO21DQUFnQjtBQUVmO0lBQVIsS0FBSyxFQUFFO21DQUFZO0FBRVg7SUFBUixLQUFLLEVBQUU7d0NBQW9CO0FBRW5CO0lBQVIsS0FBSyxFQUFFO3NDQUFlO0FBRWQ7SUFBUixLQUFLLEVBQUU7d0NBQTRCO0FBRTNCO0lBQVIsS0FBSyxFQUFFO3dDQUF3QjtBQUV2QjtJQUFSLEtBQUssRUFBRTttREFBa0Q7QUFFakQ7SUFBUixLQUFLLEVBQUU7bURBQWlEO0FBRWpDO0lBQXZCLFNBQVMsQ0FBQyxXQUFXLENBQUM7Z0RBQWdDO0FBRTdDO0lBQVQsTUFBTSxFQUFFO29DQUFnRDtBQUUvQztJQUFULE1BQU0sRUFBRTtvQ0FBZ0Q7QUF4QmhELElBQUk7SUF0Q2hCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQW1CVDtRQUNELFVBQVUsRUFBRTtZQUNSLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRTtnQkFDeEIsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7b0JBQ2hCLFNBQVMsRUFBRSxnQkFBZ0I7b0JBQzNCLE9BQU8sRUFBRSxDQUFDO2lCQUNiLENBQUMsQ0FBQztnQkFDSCxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQztvQkFDbkIsU0FBUyxFQUFFLGVBQWU7b0JBQzFCLE9BQU8sRUFBRSxDQUFDO2lCQUNiLENBQUMsQ0FBQztnQkFDSCxVQUFVLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7Z0JBQ2xFLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQzthQUNyRSxDQUFDO1NBQ0w7UUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztLQUNuRCxDQUFDO0dBQ1csSUFBSSxDQXVMaEI7U0F2TFksSUFBSTtBQThMakIsSUFBYSxVQUFVLEdBQXZCLE1BQWEsVUFBVTtDQUFJLENBQUE7QUFBZCxVQUFVO0lBTHRCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBQyxZQUFZLENBQUM7UUFDcEMsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFDLFlBQVksQ0FBQztRQUM1QixZQUFZLEVBQUUsQ0FBQyxJQUFJLEVBQUMsZUFBZSxDQUFDO0tBQ3ZDLENBQUM7R0FDVyxVQUFVLENBQUk7U0FBZCxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsRWxlbWVudFJlZixPbkRlc3Ryb3ksSW5wdXQsT3V0cHV0LEV2ZW50RW1pdHRlcixSZW5kZXJlcjIsVmlld0NoaWxkLEluamVjdCxmb3J3YXJkUmVmLENoYW5nZURldGVjdG9yUmVmLENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHt0cmlnZ2VyLHN0YXRlLHN0eWxlLHRyYW5zaXRpb24sYW5pbWF0ZSxBbmltYXRpb25FdmVudH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcclxuaW1wb3J0IHtNZW51SXRlbX0gZnJvbSAncHJpbWVuZy9hcGknO1xyXG5pbXBvcnQge1JvdXRlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdbcE1lbnVJdGVtQ29udGVudF0nLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8YSAqbmdJZj1cIiFpdGVtLnJvdXRlckxpbmtcIiBbYXR0ci5ocmVmXT1cIml0ZW0udXJsfHxudWxsXCIgY2xhc3M9XCJ1aS1tZW51aXRlbS1saW5rIHVpLWNvcm5lci1hbGxcIiBbYXR0ci50YWJpbmRleF09XCJpdGVtLnRhYmluZGV4ID8gaXRlbS50YWJpbmRleCA6ICcwJ1wiIFthdHRyLmRhdGEtYXV0b21hdGlvbmlkXT1cIml0ZW0uYXV0b21hdGlvbklkXCIgW2F0dHIudGFyZ2V0XT1cIml0ZW0udGFyZ2V0XCIgW2F0dHIudGl0bGVdPVwiaXRlbS50aXRsZVwiIFthdHRyLmlkXT1cIml0ZW0uaWRcIlxyXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWRpc2FibGVkJzppdGVtLmRpc2FibGVkfVwiIChjbGljayk9XCJtZW51Lml0ZW1DbGljaygkZXZlbnQsIGl0ZW0pXCIgcm9sZT1cIm1lbnVpdGVtXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktbWVudWl0ZW0taWNvblwiICpuZ0lmPVwiaXRlbS5pY29uXCIgW25nQ2xhc3NdPVwiaXRlbS5pY29uXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLXRleHRcIj57e2l0ZW0ubGFiZWx9fTwvc3Bhbj5cclxuICAgICAgICA8L2E+XHJcbiAgICAgICAgPGEgKm5nSWY9XCJpdGVtLnJvdXRlckxpbmtcIiBbcm91dGVyTGlua109XCJpdGVtLnJvdXRlckxpbmtcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb25pZF09XCJpdGVtLmF1dG9tYXRpb25JZFwiIFtxdWVyeVBhcmFtc109XCJpdGVtLnF1ZXJ5UGFyYW1zXCIgW3JvdXRlckxpbmtBY3RpdmVdPVwiJ3VpLW1lbnVpdGVtLWxpbmstYWN0aXZlJ1wiXHJcbiAgICAgICAgICAgIFtyb3V0ZXJMaW5rQWN0aXZlT3B0aW9uc109XCJpdGVtLnJvdXRlckxpbmtBY3RpdmVPcHRpb25zfHx7ZXhhY3Q6ZmFsc2V9XCIgY2xhc3M9XCJ1aS1tZW51aXRlbS1saW5rIHVpLWNvcm5lci1hbGxcIiBbYXR0ci50YXJnZXRdPVwiaXRlbS50YXJnZXRcIiBbYXR0ci5pZF09XCJpdGVtLmlkXCIgW2F0dHIudGFiaW5kZXhdPVwiaXRlbS50YWJpbmRleCA/IGl0ZW0udGFiaW5kZXggOiAnMCdcIiBcclxuICAgICAgICAgICAgW2F0dHIudGl0bGVdPVwiaXRlbS50aXRsZVwiIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtZGlzYWJsZWQnOml0ZW0uZGlzYWJsZWR9XCIgKGNsaWNrKT1cIm1lbnUuaXRlbUNsaWNrKCRldmVudCwgaXRlbSlcIiByb2xlPVwibWVudWl0ZW1cIlxyXG4gICAgICAgICAgICBbZnJhZ21lbnRdPVwiaXRlbS5mcmFnbWVudFwiIFtxdWVyeVBhcmFtc0hhbmRsaW5nXT1cIml0ZW0ucXVlcnlQYXJhbXNIYW5kbGluZ1wiIFtwcmVzZXJ2ZUZyYWdtZW50XT1cIml0ZW0ucHJlc2VydmVGcmFnbWVudFwiIFtza2lwTG9jYXRpb25DaGFuZ2VdPVwiaXRlbS5za2lwTG9jYXRpb25DaGFuZ2VcIiBbcmVwbGFjZVVybF09XCJpdGVtLnJlcGxhY2VVcmxcIiBbc3RhdGVdPVwiaXRlbS5zdGF0ZVwiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLWljb25cIiAqbmdJZj1cIml0ZW0uaWNvblwiIFtuZ0NsYXNzXT1cIml0ZW0uaWNvblwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS10ZXh0XCI+e3tpdGVtLmxhYmVsfX08L3NwYW4+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWVudUl0ZW1Db250ZW50IHtcclxuXHJcbiAgICBASW5wdXQoXCJwTWVudUl0ZW1Db250ZW50XCIpIGl0ZW06IE1lbnVJdGVtO1xyXG5cclxuICAgIG1lbnU6IE1lbnU7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBNZW51KSkgbWVudSkge1xyXG4gICAgICAgIHRoaXMubWVudSA9IG1lbnUgYXMgTWVudTtcclxuICAgIH1cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3AtbWVudScsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgI2NvbnRhaW5lciBbbmdDbGFzc109XCJ7J3VpLW1lbnUgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwnOiB0cnVlLCAndWktbWVudS1keW5hbWljIHVpLXNoYWRvdyc6IHBvcHVwfVwiXHJcbiAgICAgICAgICAgIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwic3R5bGVcIiAoY2xpY2spPVwicHJldmVudERvY3VtZW50RGVmYXVsdD10cnVlXCIgKm5nSWY9XCIhcG9wdXAgfHwgdmlzaWJsZVwiXHJcbiAgICAgICAgICAgIFtAb3ZlcmxheUFuaW1hdGlvbl09XCJ7dmFsdWU6ICd2aXNpYmxlJywgcGFyYW1zOiB7c2hvd1RyYW5zaXRpb25QYXJhbXM6IHNob3dUcmFuc2l0aW9uT3B0aW9ucywgaGlkZVRyYW5zaXRpb25QYXJhbXM6IGhpZGVUcmFuc2l0aW9uT3B0aW9uc319XCIgW0AuZGlzYWJsZWRdPVwicG9wdXAgIT09IHRydWVcIiAoQG92ZXJsYXlBbmltYXRpb24uc3RhcnQpPVwib25PdmVybGF5QW5pbWF0aW9uU3RhcnQoJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LXN1Ym1lbnUgW25nRm9yT2ZdPVwibW9kZWxcIiAqbmdJZj1cImhhc1N1Yk1lbnUoKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInVpLW1lbnUtc2VwYXJhdG9yIHVpLXdpZGdldC1jb250ZW50XCIgKm5nSWY9XCJzdWJtZW51LnNlcGFyYXRvclwiIFtuZ0NsYXNzXT1cInsndWktaGVscGVyLWhpZGRlbic6IHN1Ym1lbnUudmlzaWJsZSA9PT0gZmFsc2V9XCI+PC9saT5cclxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJ1aS1zdWJtZW51LWhlYWRlciB1aS13aWRnZXQtaGVhZGVyIHVpLWNvcm5lci1hbGxcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb25pZF09XCJzdWJtZW51LmF1dG9tYXRpb25JZFwiICpuZ0lmPVwiIXN1Ym1lbnUuc2VwYXJhdG9yXCIgW25nQ2xhc3NdPVwieyd1aS1oZWxwZXItaGlkZGVuJzogc3VibWVudS52aXNpYmxlID09PSBmYWxzZX1cIj57e3N1Ym1lbnUubGFiZWx9fTwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1pdGVtIFtuZ0Zvck9mXT1cInN1Ym1lbnUuaXRlbXNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwidWktbWVudS1zZXBhcmF0b3IgdWktd2lkZ2V0LWNvbnRlbnRcIiAqbmdJZj1cIml0ZW0uc2VwYXJhdG9yXCIgW25nQ2xhc3NdPVwieyd1aS1oZWxwZXItaGlkZGVuJzogKGl0ZW0udmlzaWJsZSA9PT0gZmFsc2UgfHzCoHN1Ym1lbnUudmlzaWJsZSA9PT0gZmFsc2UpfVwiPjwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInVpLW1lbnVpdGVtIHVpLXdpZGdldCB1aS1jb3JuZXItYWxsXCIgKm5nSWY9XCIhaXRlbS5zZXBhcmF0b3JcIiBbcE1lbnVJdGVtQ29udGVudF09XCJpdGVtXCIgW25nQ2xhc3NdPVwieyd1aS1oZWxwZXItaGlkZGVuJzogKGl0ZW0udmlzaWJsZSA9PT0gZmFsc2UgfHwgc3VibWVudS52aXNpYmxlID09PSBmYWxzZSl9XCIgW25nU3R5bGVdPVwiaXRlbS5zdHlsZVwiIFtjbGFzc109XCJpdGVtLnN0eWxlQ2xhc3NcIj48L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1pdGVtIFtuZ0Zvck9mXT1cIm1vZGVsXCIgKm5nSWY9XCIhaGFzU3ViTWVudSgpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwidWktbWVudS1zZXBhcmF0b3IgdWktd2lkZ2V0LWNvbnRlbnRcIiAqbmdJZj1cIml0ZW0uc2VwYXJhdG9yXCIgW25nQ2xhc3NdPVwieyd1aS1oZWxwZXItaGlkZGVuJzogaXRlbS52aXNpYmxlID09PSBmYWxzZX1cIj48L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInVpLW1lbnVpdGVtIHVpLXdpZGdldCB1aS1jb3JuZXItYWxsXCIgKm5nSWY9XCIhaXRlbS5zZXBhcmF0b3JcIiBbcE1lbnVJdGVtQ29udGVudF09XCJpdGVtXCIgW25nQ2xhc3NdPVwieyd1aS1oZWxwZXItaGlkZGVuJzogaXRlbS52aXNpYmxlID09PSBmYWxzZX1cIiBbbmdTdHlsZV09XCJpdGVtLnN0eWxlXCIgW2NsYXNzXT1cIml0ZW0uc3R5bGVDbGFzc1wiPjwvbGk+XHJcbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgICB0cmlnZ2VyKCdvdmVybGF5QW5pbWF0aW9uJywgW1xyXG4gICAgICAgICAgICBzdGF0ZSgndm9pZCcsIHN0eWxlKHtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoNSUpJyxcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgICAgICAgfSkpLFxyXG4gICAgICAgICAgICBzdGF0ZSgndmlzaWJsZScsIHN0eWxlKHtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMCknLFxyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICAgICAgICB9KSksXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gdmlzaWJsZScsIGFuaW1hdGUoJ3t7c2hvd1RyYW5zaXRpb25QYXJhbXN9fScpKSxcclxuICAgICAgICAgICAgdHJhbnNpdGlvbigndmlzaWJsZSA9PiB2b2lkJywgYW5pbWF0ZSgne3toaWRlVHJhbnNpdGlvblBhcmFtc319JykpXHJcbiAgICAgICAgXSlcclxuICAgIF0sXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcclxufSlcclxuZXhwb3J0IGNsYXNzIE1lbnUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG5cclxuICAgIEBJbnB1dCgpIG1vZGVsOiBNZW51SXRlbVtdO1xyXG5cclxuICAgIEBJbnB1dCgpIHBvcHVwOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBhcHBlbmRUbzogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIGF1dG9aSW5kZXg6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBiYXNlWkluZGV4OiBudW1iZXIgPSAwO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBzaG93VHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICcyMjVtcyBlYXNlLW91dCc7XHJcblxyXG4gICAgQElucHV0KCkgaGlkZVRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnMTk1bXMgZWFzZS1pbic7XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnY29udGFpbmVyJykgY29udGFpbmVyVmlld0NoaWxkOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvblNob3c6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgXHJcbiAgICBAT3V0cHV0KCkgb25IaWRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIFxyXG4gICAgY29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIFxyXG4gICAgZG9jdW1lbnRDbGlja0xpc3RlbmVyOiBhbnk7XHJcblxyXG4gICAgZG9jdW1lbnRSZXNpemVMaXN0ZW5lcjogYW55O1xyXG4gICAgXHJcbiAgICBwcmV2ZW50RG9jdW1lbnREZWZhdWx0OiBib29sZWFuO1xyXG5cclxuICAgIHRhcmdldDogYW55O1xyXG5cclxuICAgIHZpc2libGU6IGJvb2xlYW47XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIscHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XHJcblxyXG4gICAgdG9nZ2xlKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMudmlzaWJsZSlcclxuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLnNob3coZXZlbnQpO1xyXG5cclxuICAgICAgICB0aGlzLnByZXZlbnREb2N1bWVudERlZmF1bHQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3coZXZlbnQpIHtcclxuICAgICAgICB0aGlzLnRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnByZXZlbnREb2N1bWVudERlZmF1bHQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uT3ZlcmxheUFuaW1hdGlvblN0YXJ0KGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xyXG4gICAgICAgIHN3aXRjaChldmVudC50b1N0YXRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Zpc2libGUnOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucG9wdXApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGV2ZW50LmVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlT25Ub3AoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uU2hvdy5lbWl0KHt9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZE92ZXJsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFic29sdXRlUG9zaXRpb24odGhpcy5jb250YWluZXIsIHRoaXMudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAndm9pZCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uT3ZlcmxheUhpZGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25IaWRlLmVtaXQoe30pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXBwZW5kT3ZlcmxheSgpIHtcclxuICAgICAgICBpZiAodGhpcy5hcHBlbmRUbykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hcHBlbmRUbyA9PT0gJ2JvZHknKVxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIsIHRoaXMuYXBwZW5kVG8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXN0b3JlT3ZlcmxheUFwcGVuZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5jb250YWluZXIgJiYgdGhpcy5hcHBlbmRUbykge1xyXG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgbW92ZU9uVG9wKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmF1dG9aSW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUuekluZGV4ID0gU3RyaW5nKHRoaXMuYmFzZVpJbmRleCArICgrK0RvbUhhbmRsZXIuemluZGV4KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uV2luZG93UmVzaXplKCkge1xyXG4gICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpdGVtQ2xpY2soZXZlbnQsIGl0ZW06IE1lbnVJdGVtKcKge1xyXG4gICAgICAgIGlmIChpdGVtLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCFpdGVtLnVybCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAoaXRlbS5jb21tYW5kKSB7XHJcbiAgICAgICAgICAgIGl0ZW0uY29tbWFuZCh7XHJcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgICAgIGl0ZW06IGl0ZW1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLnBvcHVwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBiaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAnY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMucHJldmVudERvY3VtZW50RGVmYXVsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucHJldmVudERvY3VtZW50RGVmYXVsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdW5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCkge1xyXG4gICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciA9IHRoaXMub25XaW5kb3dSZXNpemUuYmluZCh0aGlzKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdW5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpIHtcclxuICAgICAgICBpZiAodGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbk92ZXJsYXlIaWRlKCkge1xyXG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XHJcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCk7XHJcbiAgICAgICAgdGhpcy5wcmV2ZW50RG9jdW1lbnREZWZhdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50YXJnZXQgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICBpZiAodGhpcy5wb3B1cCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlc3RvcmVPdmVybGF5QXBwZW5kKCk7XHJcbiAgICAgICAgICAgIHRoaXMub25PdmVybGF5SGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgaGFzU3ViTWVudSgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5tb2RlbCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpdGVtIG9mIHRoaXMubW9kZWwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLml0ZW1zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSxSb3V0ZXJNb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW01lbnUsUm91dGVyTW9kdWxlXSxcclxuICAgIGRlY2xhcmF0aW9uczogW01lbnUsTWVudUl0ZW1Db250ZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWVudU1vZHVsZSB7IH1cclxuIl19