var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { NgModule, Component, ElementRef, OnDestroy, Input, Renderer2, Inject, forwardRef, ChangeDetectorRef, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { RouterModule } from '@angular/router';
let TieredMenuSub = class TieredMenuSub {
    constructor(tieredMenu, cf, renderer) {
        this.cf = cf;
        this.renderer = renderer;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.tieredMenu = tieredMenu;
    }
    get parentActive() {
        return this._parentActive;
    }
    set parentActive(value) {
        this._parentActive = value;
        if (!value) {
            this.activeItem = null;
        }
    }
    ngAfterViewInit() {
        if (this.root && !this.tieredMenu.popup) {
            this.bindDocumentClickListener();
        }
    }
    onItemMouseEnter(event, item, menuitem) {
        if (this.tieredMenu.popup || (!this.root || this.activeItem)) {
            if (menuitem.disabled) {
                return;
            }
            this.activeItem = item;
            let nextElement = item.children[0].nextElementSibling;
            if (nextElement) {
                let sublist = nextElement.children[0];
                if (this.autoZIndex) {
                    sublist.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
                }
                sublist.style.zIndex = String(++DomHandler.zindex);
                sublist.style.top = '0px';
                sublist.style.left = DomHandler.getOuterWidth(item.children[0]) + 'px';
            }
        }
    }
    itemClick(event, item, menuitem) {
        if (menuitem.disabled) {
            event.preventDefault();
            return true;
        }
        if (!menuitem.url) {
            event.preventDefault();
        }
        if (menuitem.command) {
            menuitem.command({
                originalEvent: event,
                item: menuitem
            });
        }
        if (this.root && !this.activeItem && !this.tieredMenu.popup) {
            this.activeItem = item;
            let nextElement = item.children[0].nextElementSibling;
            if (nextElement) {
                let sublist = nextElement.children[0];
                if (this.autoZIndex) {
                    sublist.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
                }
                sublist.style.zIndex = String(++DomHandler.zindex);
                sublist.style.top = '0px';
                sublist.style.left = DomHandler.getOuterWidth(item.children[0]) + 'px';
                this.rootItemClick = true;
            }
        }
        if (!menuitem.items && this.tieredMenu.popup) {
            this.tieredMenu.hide();
        }
    }
    listClick(event) {
        if (!this.rootItemClick) {
            this.activeItem = null;
        }
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', () => {
                if (!this.rootItemClick) {
                    this.parentActive = false;
                    this.activeItem = null;
                }
                this.rootItemClick = false;
            });
        }
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
    ngOnDestroy() {
        if (this.root && !this.tieredMenu.popup) {
            this.unbindDocumentClickListener();
        }
    }
};
TieredMenuSub.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => TieredMenu),] }] },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
__decorate([
    Input()
], TieredMenuSub.prototype, "item", void 0);
__decorate([
    Input()
], TieredMenuSub.prototype, "root", void 0);
__decorate([
    Input()
], TieredMenuSub.prototype, "autoZIndex", void 0);
__decorate([
    Input()
], TieredMenuSub.prototype, "baseZIndex", void 0);
__decorate([
    Input()
], TieredMenuSub.prototype, "parentActive", null);
TieredMenuSub = __decorate([
    Component({
        selector: 'p-tieredMenuSub',
        template: `
        <ul [ngClass]="{'ui-widget-content ui-corner-all ui-shadow ui-submenu-list': !root}" (click)="listClick($event)" role="menubar">
            <ng-template ngFor let-child [ngForOf]="(root ? item : item.items)">
                <li *ngIf="child.separator" class="ui-menu-separator ui-widget-content" [ngClass]="{'ui-helper-hidden': child.visible === false}" role="separator">
                <li *ngIf="!child.separator" #listItem [ngClass]="{'ui-menuitem ui-widget ui-corner-all':true,'ui-menuitem-active':listItem==activeItem,'ui-helper-hidden': child.visible === false}"
                    [class]="child.styleClass" [ngStyle]="child.style" role="none"
                    (mouseenter)="onItemMouseEnter($event, listItem, child)">
                    <a *ngIf="!child.routerLink" [attr.href]="child.url" class="ui-menuitem-link ui-corner-all" [attr.target]="child.target" [attr.tabindex]="child.tabindex ? child.tabindex : '0'" [attr.title]="child.title" [attr.id]="child.id" 
                        [ngClass]="{'ui-state-disabled':child.disabled}" (click)="itemClick($event, listItem, child)" role="menuitem" [attr.aria-haspopup]="item.items != null" [attr.aria-expanded]="item === activeItem">
                        <span class="ui-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                        <span class="ui-submenu-icon pi pi-fw pi-caret-right" *ngIf="child.items"></span>
                    </a>
                    <a *ngIf="child.routerLink" [routerLink]="child.routerLink" role="menuitem" [queryParams]="child.queryParams" [routerLinkActive]="'ui-menuitem-link-active'" role="menuitem" [attr.tabindex]="child.tabindex ? child.tabindex : '0'"
                        [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}"
                        class="ui-menuitem-link ui-corner-all" [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id"
                        [ngClass]="{'ui-state-disabled':child.disabled}" (click)="itemClick($event, listItem, child)"
                        [fragment]="child.fragment" [queryParamsHandling]="child.queryParamsHandling" [preserveFragment]="child.preserveFragment" [skipLocationChange]="child.skipLocationChange" [replaceUrl]="child.replaceUrl" [state]="child.state">
                        <span class="ui-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                        <span class="ui-submenu-icon pi pi-fw pi-caret-right" *ngIf="child.items"></span>
                    </a>
                    <p-tieredMenuSub class="ui-submenu" [item]="child" *ngIf="child.items" [baseZIndex]="baseZIndex" [parentActive]="listItem==activeItem" [autoZIndex]="autoZIndex"></p-tieredMenuSub>
                </li>
            </ng-template>
        </ul>
    `
    }),
    __param(0, Inject(forwardRef(() => TieredMenu)))
], TieredMenuSub);
export { TieredMenuSub };
let TieredMenu = class TieredMenu {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.showTransitionOptions = '225ms ease-out';
        this.hideTransitionOptions = '195ms ease-in';
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
        this.parentActive = true;
        this.preventDocumentDefault = true;
    }
    onOverlayAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                if (this.popup) {
                    this.container = event.element;
                    this.moveOnTop();
                    this.appendOverlay();
                    DomHandler.absolutePosition(this.container, this.target);
                    this.bindDocumentClickListener();
                    this.bindDocumentResizeListener();
                }
                break;
            case 'void':
                this.onOverlayHide();
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
        this.parentActive = false;
    }
    onWindowResize() {
        this.hide();
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', () => {
                if (!this.preventDocumentDefault && this.popup) {
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
};
TieredMenu.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
__decorate([
    Input()
], TieredMenu.prototype, "model", void 0);
__decorate([
    Input()
], TieredMenu.prototype, "popup", void 0);
__decorate([
    Input()
], TieredMenu.prototype, "style", void 0);
__decorate([
    Input()
], TieredMenu.prototype, "styleClass", void 0);
__decorate([
    Input()
], TieredMenu.prototype, "appendTo", void 0);
__decorate([
    Input()
], TieredMenu.prototype, "autoZIndex", void 0);
__decorate([
    Input()
], TieredMenu.prototype, "baseZIndex", void 0);
__decorate([
    Input()
], TieredMenu.prototype, "showTransitionOptions", void 0);
__decorate([
    Input()
], TieredMenu.prototype, "hideTransitionOptions", void 0);
TieredMenu = __decorate([
    Component({
        selector: 'p-tieredMenu',
        template: `
        <div [ngClass]="{'ui-tieredmenu ui-widget ui-widget-content ui-corner-all':true, 'ui-tieredmenu-dynamic ui-shadow':popup}" [class]="styleClass" [ngStyle]="style"
            [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" [@.disabled]="popup !== true" (@overlayAnimation.start)="onOverlayAnimationStart($event)" *ngIf="!popup || visible">
            <p-tieredMenuSub [item]="model" root="root" [parentActive]="parentActive" [baseZIndex]="baseZIndex" [autoZIndex]="autoZIndex"></p-tieredMenuSub>
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
], TieredMenu);
export { TieredMenu };
let TieredMenuModule = class TieredMenuModule {
};
TieredMenuModule = __decorate([
    NgModule({
        imports: [CommonModule, RouterModule],
        exports: [TieredMenu, RouterModule],
        declarations: [TieredMenu, TieredMenuSub]
    })
], TieredMenuModule);
export { TieredMenuModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGllcmVkbWVudS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvdGllcmVkbWVudS8iLCJzb3VyY2VzIjpbInRpZXJlZG1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsaUJBQWlCLEVBQUMsYUFBYSxFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2hLLE9BQU8sRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFnQixNQUFNLHFCQUFxQixDQUFDO0FBQzFGLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBRXZDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQWdDN0MsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQW1DdEIsWUFBa0QsVUFBVSxFQUFVLEVBQXFCLEVBQVMsUUFBbUI7UUFBakQsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBN0I5RyxlQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUE0QjVCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBd0IsQ0FBQztJQUMvQyxDQUFDO0lBM0JRLElBQUksWUFBWTtRQUNyQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDOUIsQ0FBQztJQUNELElBQUksWUFBWSxDQUFDLEtBQUs7UUFDbEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFFM0IsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1NB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QUFFO1lBQ1IsT0FBTyxDQUFDLGtCQUFrQixFQUFFO2dCQUN4QixLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztvQkFDaEIsU0FBUyxFQUFFLGdCQUFnQjtvQkFDM0IsT0FBTyxFQUFFLENBQUM7aUJBQ2IsQ0FBQyxDQUFDO2dCQUNILEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDO29CQUNuQixTQUFTLEVBQUUsZUFBZTtvQkFDMUIsT0FBTyxFQUFFLENBQUM7aUJBQ2IsQ0FBQyxDQUFDO2dCQUNILFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztnQkFDbEUsVUFBVSxDQUFDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO2FBQ3JFLENBQUM7U0FDTDtRQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO0tBQ25ELENBQUM7R0FDVyxVQUFVLENBa0p0QjtTQWxKWSxVQUFVO0FBeUp2QixJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtDQUFJLENBQUE7QUFBcEIsZ0JBQWdCO0lBTDVCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBQyxZQUFZLENBQUM7UUFDcEMsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFDLFlBQVksQ0FBQztRQUNsQyxZQUFZLEVBQUUsQ0FBQyxVQUFVLEVBQUMsYUFBYSxDQUFDO0tBQzNDLENBQUM7R0FDVyxnQkFBZ0IsQ0FBSTtTQUFwQixnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxFbGVtZW50UmVmLE9uRGVzdHJveSxJbnB1dCxSZW5kZXJlcjIsSW5qZWN0LGZvcndhcmRSZWYsQ2hhbmdlRGV0ZWN0b3JSZWYsQWZ0ZXJWaWV3SW5pdCxDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7dHJpZ2dlcixzdGF0ZSxzdHlsZSx0cmFuc2l0aW9uLGFuaW1hdGUsQW5pbWF0aW9uRXZlbnR9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICdwcmltZW5nL2RvbSc7XHJcbmltcG9ydCB7TWVudUl0ZW19IGZyb20gJ3ByaW1lbmcvYXBpJztcclxuaW1wb3J0IHtSb3V0ZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC10aWVyZWRNZW51U3ViJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPHVsIFtuZ0NsYXNzXT1cInsndWktd2lkZ2V0LWNvbnRlbnQgdWktY29ybmVyLWFsbCB1aS1zaGFkb3cgdWktc3VibWVudS1saXN0JzogIXJvb3R9XCIgKGNsaWNrKT1cImxpc3RDbGljaygkZXZlbnQpXCIgcm9sZT1cIm1lbnViYXJcIj5cclxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1jaGlsZCBbbmdGb3JPZl09XCIocm9vdCA/IGl0ZW0gOiBpdGVtLml0ZW1zKVwiPlxyXG4gICAgICAgICAgICAgICAgPGxpICpuZ0lmPVwiY2hpbGQuc2VwYXJhdG9yXCIgY2xhc3M9XCJ1aS1tZW51LXNlcGFyYXRvciB1aS13aWRnZXQtY29udGVudFwiIFtuZ0NsYXNzXT1cInsndWktaGVscGVyLWhpZGRlbic6IGNoaWxkLnZpc2libGUgPT09IGZhbHNlfVwiIHJvbGU9XCJzZXBhcmF0b3JcIj5cclxuICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cIiFjaGlsZC5zZXBhcmF0b3JcIiAjbGlzdEl0ZW0gW25nQ2xhc3NdPVwieyd1aS1tZW51aXRlbSB1aS13aWRnZXQgdWktY29ybmVyLWFsbCc6dHJ1ZSwndWktbWVudWl0ZW0tYWN0aXZlJzpsaXN0SXRlbT09YWN0aXZlSXRlbSwndWktaGVscGVyLWhpZGRlbic6IGNoaWxkLnZpc2libGUgPT09IGZhbHNlfVwiXHJcbiAgICAgICAgICAgICAgICAgICAgW2NsYXNzXT1cImNoaWxkLnN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJjaGlsZC5zdHlsZVwiIHJvbGU9XCJub25lXCJcclxuICAgICAgICAgICAgICAgICAgICAobW91c2VlbnRlcik9XCJvbkl0ZW1Nb3VzZUVudGVyKCRldmVudCwgbGlzdEl0ZW0sIGNoaWxkKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwiIWNoaWxkLnJvdXRlckxpbmtcIiBbYXR0ci5ocmVmXT1cImNoaWxkLnVybFwiIGNsYXNzPVwidWktbWVudWl0ZW0tbGluayB1aS1jb3JuZXItYWxsXCIgW2F0dHIudGFyZ2V0XT1cImNoaWxkLnRhcmdldFwiIFthdHRyLnRhYmluZGV4XT1cImNoaWxkLnRhYmluZGV4ID8gY2hpbGQudGFiaW5kZXggOiAnMCdcIiBbYXR0ci50aXRsZV09XCJjaGlsZC50aXRsZVwiIFthdHRyLmlkXT1cImNoaWxkLmlkXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtZGlzYWJsZWQnOmNoaWxkLmRpc2FibGVkfVwiIChjbGljayk9XCJpdGVtQ2xpY2soJGV2ZW50LCBsaXN0SXRlbSwgY2hpbGQpXCIgcm9sZT1cIm1lbnVpdGVtXCIgW2F0dHIuYXJpYS1oYXNwb3B1cF09XCJpdGVtLml0ZW1zICE9IG51bGxcIiBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cIml0ZW0gPT09IGFjdGl2ZUl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS1pY29uXCIgKm5nSWY9XCJjaGlsZC5pY29uXCIgW25nQ2xhc3NdPVwiY2hpbGQuaWNvblwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS10ZXh0XCI+e3tjaGlsZC5sYWJlbH19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXN1Ym1lbnUtaWNvbiBwaSBwaS1mdyBwaS1jYXJldC1yaWdodFwiICpuZ0lmPVwiY2hpbGQuaXRlbXNcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwiY2hpbGQucm91dGVyTGlua1wiIFtyb3V0ZXJMaW5rXT1cImNoaWxkLnJvdXRlckxpbmtcIiByb2xlPVwibWVudWl0ZW1cIiBbcXVlcnlQYXJhbXNdPVwiY2hpbGQucXVlcnlQYXJhbXNcIiBbcm91dGVyTGlua0FjdGl2ZV09XCIndWktbWVudWl0ZW0tbGluay1hY3RpdmUnXCIgcm9sZT1cIm1lbnVpdGVtXCIgW2F0dHIudGFiaW5kZXhdPVwiY2hpbGQudGFiaW5kZXggPyBjaGlsZC50YWJpbmRleCA6ICcwJ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtyb3V0ZXJMaW5rQWN0aXZlT3B0aW9uc109XCJjaGlsZC5yb3V0ZXJMaW5rQWN0aXZlT3B0aW9uc3x8e2V4YWN0OmZhbHNlfVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwidWktbWVudWl0ZW0tbGluayB1aS1jb3JuZXItYWxsXCIgW2F0dHIudGFyZ2V0XT1cImNoaWxkLnRhcmdldFwiIFthdHRyLnRpdGxlXT1cImNoaWxkLnRpdGxlXCIgW2F0dHIuaWRdPVwiY2hpbGQuaWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWRpc2FibGVkJzpjaGlsZC5kaXNhYmxlZH1cIiAoY2xpY2spPVwiaXRlbUNsaWNrKCRldmVudCwgbGlzdEl0ZW0sIGNoaWxkKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtmcmFnbWVudF09XCJjaGlsZC5mcmFnbWVudFwiIFtxdWVyeVBhcmFtc0hhbmRsaW5nXT1cImNoaWxkLnF1ZXJ5UGFyYW1zSGFuZGxpbmdcIiBbcHJlc2VydmVGcmFnbWVudF09XCJjaGlsZC5wcmVzZXJ2ZUZyYWdtZW50XCIgW3NraXBMb2NhdGlvbkNoYW5nZV09XCJjaGlsZC5za2lwTG9jYXRpb25DaGFuZ2VcIiBbcmVwbGFjZVVybF09XCJjaGlsZC5yZXBsYWNlVXJsXCIgW3N0YXRlXT1cImNoaWxkLnN0YXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktbWVudWl0ZW0taWNvblwiICpuZ0lmPVwiY2hpbGQuaWNvblwiIFtuZ0NsYXNzXT1cImNoaWxkLmljb25cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktbWVudWl0ZW0tdGV4dFwiPnt7Y2hpbGQubGFiZWx9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1zdWJtZW51LWljb24gcGkgcGktZncgcGktY2FyZXQtcmlnaHRcIiAqbmdJZj1cImNoaWxkLml0ZW1zXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8cC10aWVyZWRNZW51U3ViIGNsYXNzPVwidWktc3VibWVudVwiIFtpdGVtXT1cImNoaWxkXCIgKm5nSWY9XCJjaGlsZC5pdGVtc1wiIFtiYXNlWkluZGV4XT1cImJhc2VaSW5kZXhcIiBbcGFyZW50QWN0aXZlXT1cImxpc3RJdGVtPT1hY3RpdmVJdGVtXCIgW2F1dG9aSW5kZXhdPVwiYXV0b1pJbmRleFwiPjwvcC10aWVyZWRNZW51U3ViPlxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICA8L3VsPlxyXG4gICAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGllcmVkTWVudVN1YiBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gICAgQElucHV0KCkgaXRlbTogTWVudUl0ZW07XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHJvb3Q6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgYXV0b1pJbmRleDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGJhc2VaSW5kZXg6IG51bWJlciA9IDA7XHJcblxyXG4gICAgQElucHV0KCkgZ2V0IHBhcmVudEFjdGl2ZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50QWN0aXZlO1xyXG4gICAgfVxyXG4gICAgc2V0IHBhcmVudEFjdGl2ZSh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX3BhcmVudEFjdGl2ZSA9IHZhbHVlO1xyXG5cclxuICAgICAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRpZXJlZE1lbnU6IFRpZXJlZE1lbnU7XHJcblxyXG4gICAgX3BhcmVudEFjdGl2ZTogYm9vbGVhbjtcclxuXHJcbiAgICByb290SXRlbUNsaWNrOiBib29sZWFuO1xyXG5cclxuICAgIGRvY3VtZW50Q2xpY2tMaXN0ZW5lcjogYW55O1xyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5yb290ICYmICF0aGlzLnRpZXJlZE1lbnUucG9wdXApIHtcclxuICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gVGllcmVkTWVudSkpIHRpZXJlZE1lbnUsIHByaXZhdGUgY2Y6IENoYW5nZURldGVjdG9yUmVmLCBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xyXG4gICAgICAgIHRoaXMudGllcmVkTWVudSA9IHRpZXJlZE1lbnUgYXMgVGllcmVkTWVudTtcclxuICAgIH1cclxuXHJcbiAgICBhY3RpdmVJdGVtOiBIVE1MTElFbGVtZW50O1xyXG5cclxuICAgIG9uSXRlbU1vdXNlRW50ZXIoZXZlbnQ6IEV2ZW50LCBpdGVtOiBIVE1MTElFbGVtZW50LCBtZW51aXRlbTogTWVudUl0ZW0pIHtcclxuICAgICAgICBpZiAodGhpcy50aWVyZWRNZW51LnBvcHVwIHx8ICghdGhpcy5yb290IHx8IHRoaXMuYWN0aXZlSXRlbSkpIHtcclxuICAgICAgICAgICAgaWYgKG1lbnVpdGVtLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IGl0ZW07XHJcbiAgICAgICAgICAgIGxldCBuZXh0RWxlbWVudDogIEhUTUxFbGVtZW50ID0gIDxIVE1MRWxlbWVudD4gaXRlbS5jaGlsZHJlblswXS5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgIGlmIChuZXh0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN1Ymxpc3Q6ICBIVE1MRWxlbWVudCA9IDxIVE1MRWxlbWVudD4gbmV4dEVsZW1lbnQuY2hpbGRyZW5bMF07XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hdXRvWkluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VibGlzdC5zdHlsZS56SW5kZXggPSBTdHJpbmcodGhpcy5iYXNlWkluZGV4ICsgKCsrRG9tSGFuZGxlci56aW5kZXgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN1Ymxpc3Quc3R5bGUuekluZGV4ID0gU3RyaW5nKCsrRG9tSGFuZGxlci56aW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBzdWJsaXN0LnN0eWxlLnRvcCA9ICcwcHgnO1xyXG4gICAgICAgICAgICAgICAgc3VibGlzdC5zdHlsZS5sZWZ0ID0gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKGl0ZW0uY2hpbGRyZW5bMF0pICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgaXRlbUNsaWNrKGV2ZW50OiBFdmVudCwgaXRlbTogSFRNTExJRWxlbWVudCwgbWVudWl0ZW06IE1lbnVJdGVtKcKge1xyXG4gICAgICAgIGlmIChtZW51aXRlbS5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCFtZW51aXRlbS51cmwpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKG1lbnVpdGVtLmNvbW1hbmQpIHsgICAgICAgICAgICBcclxuICAgICAgICAgICAgbWVudWl0ZW0uY29tbWFuZCh7XHJcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgICAgIGl0ZW06IG1lbnVpdGVtXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucm9vdCAmJiAhdGhpcy5hY3RpdmVJdGVtICYmICF0aGlzLnRpZXJlZE1lbnUucG9wdXAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IGl0ZW07XHJcbiAgICAgICAgICAgIGxldCBuZXh0RWxlbWVudDogIEhUTUxFbGVtZW50ID0gIDxIVE1MRWxlbWVudD4gaXRlbS5jaGlsZHJlblswXS5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgIGlmIChuZXh0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN1Ymxpc3Q6ICBIVE1MRWxlbWVudCA9IDxIVE1MRWxlbWVudD4gbmV4dEVsZW1lbnQuY2hpbGRyZW5bMF07XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hdXRvWkluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VibGlzdC5zdHlsZS56SW5kZXggPSBTdHJpbmcodGhpcy5iYXNlWkluZGV4ICsgKCsrRG9tSGFuZGxlci56aW5kZXgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN1Ymxpc3Quc3R5bGUuekluZGV4ID0gU3RyaW5nKCsrRG9tSGFuZGxlci56aW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBzdWJsaXN0LnN0eWxlLnRvcCA9ICcwcHgnO1xyXG4gICAgICAgICAgICAgICAgc3VibGlzdC5zdHlsZS5sZWZ0ID0gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKGl0ZW0uY2hpbGRyZW5bMF0pICsgJ3B4JztcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3RJdGVtQ2xpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIW1lbnVpdGVtLml0ZW1zICYmIHRoaXMudGllcmVkTWVudS5wb3B1cCkge1xyXG4gICAgICAgICAgICB0aGlzLnRpZXJlZE1lbnUuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgbGlzdENsaWNrKGV2ZW50OiBFdmVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5yb290SXRlbUNsaWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5yb290SXRlbUNsaWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucm9vdEl0ZW1DbGljayA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdW5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnJvb3QgJiYgIXRoaXMudGllcmVkTWVudS5wb3B1cCkge1xyXG4gICAgICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3AtdGllcmVkTWVudScsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyd1aS10aWVyZWRtZW51IHVpLXdpZGdldCB1aS13aWRnZXQtY29udGVudCB1aS1jb3JuZXItYWxsJzp0cnVlLCAndWktdGllcmVkbWVudS1keW5hbWljIHVpLXNoYWRvdyc6cG9wdXB9XCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJzdHlsZVwiXHJcbiAgICAgICAgICAgIFtAb3ZlcmxheUFuaW1hdGlvbl09XCJ7dmFsdWU6ICd2aXNpYmxlJywgcGFyYW1zOiB7c2hvd1RyYW5zaXRpb25QYXJhbXM6IHNob3dUcmFuc2l0aW9uT3B0aW9ucywgaGlkZVRyYW5zaXRpb25QYXJhbXM6IGhpZGVUcmFuc2l0aW9uT3B0aW9uc319XCIgW0AuZGlzYWJsZWRdPVwicG9wdXAgIT09IHRydWVcIiAoQG92ZXJsYXlBbmltYXRpb24uc3RhcnQpPVwib25PdmVybGF5QW5pbWF0aW9uU3RhcnQoJGV2ZW50KVwiICpuZ0lmPVwiIXBvcHVwIHx8IHZpc2libGVcIj5cclxuICAgICAgICAgICAgPHAtdGllcmVkTWVudVN1YiBbaXRlbV09XCJtb2RlbFwiIHJvb3Q9XCJyb290XCIgW3BhcmVudEFjdGl2ZV09XCJwYXJlbnRBY3RpdmVcIiBbYmFzZVpJbmRleF09XCJiYXNlWkluZGV4XCIgW2F1dG9aSW5kZXhdPVwiYXV0b1pJbmRleFwiPjwvcC10aWVyZWRNZW51U3ViPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgICB0cmlnZ2VyKCdvdmVybGF5QW5pbWF0aW9uJywgW1xyXG4gICAgICAgICAgICBzdGF0ZSgndm9pZCcsIHN0eWxlKHtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoNSUpJyxcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgICAgICAgfSkpLFxyXG4gICAgICAgICAgICBzdGF0ZSgndmlzaWJsZScsIHN0eWxlKHtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMCknLFxyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICAgICAgICB9KSksXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gdmlzaWJsZScsIGFuaW1hdGUoJ3t7c2hvd1RyYW5zaXRpb25QYXJhbXN9fScpKSxcclxuICAgICAgICAgICAgdHJhbnNpdGlvbigndmlzaWJsZSA9PiB2b2lkJywgYW5pbWF0ZSgne3toaWRlVHJhbnNpdGlvblBhcmFtc319JykpXHJcbiAgICAgICAgXSlcclxuICAgIF0sXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcclxufSlcclxuZXhwb3J0IGNsYXNzIFRpZXJlZE1lbnUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG5cclxuICAgIEBJbnB1dCgpIG1vZGVsOiBNZW51SXRlbVtdO1xyXG5cclxuICAgIEBJbnB1dCgpIHBvcHVwOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBhcHBlbmRUbzogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIGF1dG9aSW5kZXg6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBiYXNlWkluZGV4OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIEBJbnB1dCgpIHNob3dUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJzIyNW1zIGVhc2Utb3V0JztcclxuXHJcbiAgICBASW5wdXQoKSBoaWRlVHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICcxOTVtcyBlYXNlLWluJztcclxuXHJcbiAgICBwYXJlbnRBY3RpdmU6IGJvb2xlYW47XHJcblxyXG4gICAgY29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIFxyXG4gICAgZG9jdW1lbnRDbGlja0xpc3RlbmVyOiBhbnk7XHJcblxyXG4gICAgZG9jdW1lbnRSZXNpemVMaXN0ZW5lcjogYW55O1xyXG4gICAgXHJcbiAgICBwcmV2ZW50RG9jdW1lbnREZWZhdWx0OiBib29sZWFuO1xyXG5cclxuICAgIHRhcmdldDogYW55O1xyXG5cclxuICAgIHZpc2libGU6IGJvb2xlYW47XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XHJcbiAgICBcclxuICAgIHRvZ2dsZShldmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLnZpc2libGUpXHJcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5zaG93KGV2ZW50KTtcclxuXHJcbiAgICAgICAgdGhpcy5wcmV2ZW50RG9jdW1lbnREZWZhdWx0ID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2hvdyhldmVudCkge1xyXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gZXZlbnQuY3VycmVudFRhcmdldDtcclxuICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucGFyZW50QWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnByZXZlbnREb2N1bWVudERlZmF1bHQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uT3ZlcmxheUFuaW1hdGlvblN0YXJ0KGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xyXG4gICAgICAgIHN3aXRjaChldmVudC50b1N0YXRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Zpc2libGUnOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucG9wdXApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGV2ZW50LmVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlT25Ub3AoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZE92ZXJsYXkoKTtcclxuICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFic29sdXRlUG9zaXRpb24odGhpcy5jb250YWluZXIsIHRoaXMudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAndm9pZCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uT3ZlcmxheUhpZGUoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBhcHBlbmRPdmVybGF5KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmFwcGVuZFRvKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFwcGVuZFRvID09PSAnYm9keScpXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lciwgdGhpcy5hcHBlbmRUbyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlc3RvcmVPdmVybGF5QXBwZW5kKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciAmJiB0aGlzLmFwcGVuZFRvKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBtb3ZlT25Ub3AoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYXV0b1pJbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS56SW5kZXggPSBTdHJpbmcodGhpcy5iYXNlWkluZGV4ICsgKCsrRG9tSGFuZGxlci56aW5kZXgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZSgpIHtcclxuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBhcmVudEFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uV2luZG93UmVzaXplKCkge1xyXG4gICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBiaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAnY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMucHJldmVudERvY3VtZW50RGVmYXVsdCAmJiB0aGlzLnBvcHVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2ZW50RG9jdW1lbnREZWZhdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1bmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKSB7XHJcbiAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gdGhpcy5vbldpbmRvd1Jlc2l6ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1bmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uT3ZlcmxheUhpZGUoKSB7XHJcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcclxuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKTtcclxuICAgICAgICB0aGlzLnByZXZlbnREb2N1bWVudERlZmF1bHQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRhcmdldCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBvcHVwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdG9yZU92ZXJsYXlBcHBlbmQoKTtcclxuICAgICAgICAgICAgdGhpcy5vbk92ZXJsYXlIaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsUm91dGVyTW9kdWxlXSxcclxuICAgIGV4cG9ydHM6IFtUaWVyZWRNZW51LFJvdXRlck1vZHVsZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtUaWVyZWRNZW51LFRpZXJlZE1lbnVTdWJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUaWVyZWRNZW51TW9kdWxlIHsgfVxyXG4iXX0=