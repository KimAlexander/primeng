var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { NgModule, Component, ElementRef, AfterViewChecked, OnDestroy, Input, Renderer2, Inject, forwardRef, ViewChild, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { RouterModule } from '@angular/router';
let SlideMenuSub = class SlideMenuSub {
    constructor(slideMenu) {
        this.backLabel = 'Back';
        this.easing = 'ease-out';
        this.slideMenu = slideMenu;
    }
    itemClick(event, item, listitem) {
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
        if (item.items && !this.slideMenu.animating) {
            this.slideMenu.left -= this.slideMenu.menuWidth;
            this.activeItem = listitem;
            this.slideMenu.animating = true;
            setTimeout(() => this.slideMenu.animating = false, this.effectDuration);
        }
        if (!item.items && this.slideMenu.popup) {
            this.slideMenu.hide();
        }
    }
    ngOnDestroy() {
        this.activeItem = null;
    }
};
SlideMenuSub.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => SlideMenu),] }] }
];
__decorate([
    Input()
], SlideMenuSub.prototype, "item", void 0);
__decorate([
    Input()
], SlideMenuSub.prototype, "root", void 0);
__decorate([
    Input()
], SlideMenuSub.prototype, "backLabel", void 0);
__decorate([
    Input()
], SlideMenuSub.prototype, "menuWidth", void 0);
__decorate([
    Input()
], SlideMenuSub.prototype, "effectDuration", void 0);
__decorate([
    Input()
], SlideMenuSub.prototype, "easing", void 0);
__decorate([
    Input()
], SlideMenuSub.prototype, "index", void 0);
SlideMenuSub = __decorate([
    Component({
        selector: 'p-slideMenuSub',
        template: `
        <ul [ngClass]="{'ui-slidemenu-rootlist':root, 'ui-submenu-list':!root, 'ui-active-submenu': (-slideMenu.left == (index * menuWidth))}"
            [style.width.px]="menuWidth" [style.left.px]="root ? slideMenu.left : slideMenu.menuWidth"
            [style.transitionProperty]="root ? 'left' : 'none'" [style.transitionDuration]="effectDuration + 'ms'" [style.transitionTimingFunction]="easing">
            <ng-template ngFor let-child [ngForOf]="(root ? item : item.items)">
                <li *ngIf="child.separator" class="ui-menu-separator ui-widget-content" [ngClass]="{'ui-helper-hidden': child.visible === false}">
                <li *ngIf="!child.separator" #listitem [ngClass]="{'ui-menuitem ui-widget ui-corner-all':true,'ui-menuitem-active':listitem==activeItem,'ui-helper-hidden': child.visible === false}"
                    [class]="child.styleClass" [ngStyle]="child.style">
                    <a *ngIf="!child.routerLink" [href]="child.url||'#'" class="ui-menuitem-link ui-corner-all" [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id"
                        [ngClass]="{'ui-state-disabled':child.disabled}" [attr.tabindex]="child.tabindex ? child.tabindex : '0'" 
                        (click)="itemClick($event, child, listitem)">
                        <span class="ui-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                        <span class="ui-submenu-icon pi pi-fw pi-caret-right" *ngIf="child.items"></span>
                    </a>
                    <a *ngIf="child.routerLink" [routerLink]="child.routerLink" [queryParams]="child.queryParams" [routerLinkActive]="'ui-menuitem-link-active'" 
                        [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}" [href]="child.url||'#'" class="ui-menuitem-link ui-corner-all" 
                        [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id" [attr.tabindex]="child.tabindex ? child.tabindex : '0'" 
                        [ngClass]="{'ui-state-disabled':child.disabled}" 
                        (click)="itemClick($event, child, listitem)"
                        [fragment]="child.fragment" [queryParamsHandling]="child.queryParamsHandling" [preserveFragment]="child.preserveFragment" [skipLocationChange]="child.skipLocationChange" [replaceUrl]="child.replaceUrl" [state]="child.state">
                        <span class="ui-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                        <span class="ui-submenu-icon pi pi-fw pi-caret-right" *ngIf="child.items"></span>
                    </a>
                    <p-slideMenuSub class="ui-submenu" [item]="child" [index]="index + 1" [menuWidth]="menuWidth" *ngIf="child.items"></p-slideMenuSub>
                </li>
            </ng-template>
        </ul>
    `
    }),
    __param(0, Inject(forwardRef(() => SlideMenu)))
], SlideMenuSub);
export { SlideMenuSub };
let SlideMenu = class SlideMenu {
    constructor(el, renderer, cd) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.menuWidth = 190;
        this.viewportHeight = 180;
        this.effectDuration = 250;
        this.easing = 'ease-out';
        this.backLabel = 'Back';
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.showTransitionOptions = '225ms ease-out';
        this.hideTransitionOptions = '195ms ease-in';
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
        this.left = 0;
        this.animating = false;
    }
    ngAfterViewChecked() {
        if (!this.viewportUpdated && !this.popup && this.containerViewChild) {
            this.updateViewPort();
            this.viewportUpdated = true;
        }
    }
    set container(element) {
        this.containerViewChild = element;
    }
    set backward(element) {
        this.backwardViewChild = element;
    }
    set slideMenuContent(element) {
        this.slideMenuContentViewChild = element;
    }
    updateViewPort() {
        this.slideMenuContentViewChild.nativeElement.style.height = this.viewportHeight - DomHandler.getHiddenElementOuterHeight(this.backwardViewChild.nativeElement) + 'px';
    }
    toggle(event) {
        if (this.visible)
            this.hide();
        else
            this.show(event);
        this.preventDocumentDefault = true;
        this.cd.detectChanges();
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
                    this.updateViewPort();
                    this.moveOnTop();
                    this.onShow.emit({});
                    this.appendOverlay();
                    DomHandler.absolutePosition(this.containerViewChild.nativeElement, this.target);
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
                document.body.appendChild(this.containerViewChild.nativeElement);
            else
                DomHandler.appendChild(this.containerViewChild.nativeElement, this.appendTo);
        }
    }
    restoreOverlayAppend() {
        if (this.container && this.appendTo) {
            this.el.nativeElement.appendChild(this.containerViewChild.nativeElement);
        }
    }
    moveOnTop() {
        if (this.autoZIndex) {
            this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
    }
    hide() {
        this.visible = false;
    }
    onWindowResize() {
        this.hide();
    }
    onClick(event) {
        this.preventDocumentDefault = true;
    }
    goBack() {
        this.left += this.menuWidth;
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', () => {
                if (!this.preventDocumentDefault) {
                    this.hide();
                    this.cd.detectChanges();
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
        this.left = 0;
    }
    ngOnDestroy() {
        if (this.popup) {
            this.restoreOverlayAppend();
            this.onOverlayHide();
        }
    }
};
SlideMenu.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], SlideMenu.prototype, "model", void 0);
__decorate([
    Input()
], SlideMenu.prototype, "popup", void 0);
__decorate([
    Input()
], SlideMenu.prototype, "style", void 0);
__decorate([
    Input()
], SlideMenu.prototype, "styleClass", void 0);
__decorate([
    Input()
], SlideMenu.prototype, "menuWidth", void 0);
__decorate([
    Input()
], SlideMenu.prototype, "viewportHeight", void 0);
__decorate([
    Input()
], SlideMenu.prototype, "effectDuration", void 0);
__decorate([
    Input()
], SlideMenu.prototype, "easing", void 0);
__decorate([
    Input()
], SlideMenu.prototype, "backLabel", void 0);
__decorate([
    Input()
], SlideMenu.prototype, "appendTo", void 0);
__decorate([
    Input()
], SlideMenu.prototype, "autoZIndex", void 0);
__decorate([
    Input()
], SlideMenu.prototype, "baseZIndex", void 0);
__decorate([
    Input()
], SlideMenu.prototype, "showTransitionOptions", void 0);
__decorate([
    Input()
], SlideMenu.prototype, "hideTransitionOptions", void 0);
__decorate([
    Output()
], SlideMenu.prototype, "onShow", void 0);
__decorate([
    Output()
], SlideMenu.prototype, "onHide", void 0);
__decorate([
    ViewChild('container')
], SlideMenu.prototype, "container", null);
__decorate([
    ViewChild('backward')
], SlideMenu.prototype, "backward", null);
__decorate([
    ViewChild('slideMenuContent')
], SlideMenu.prototype, "slideMenuContent", null);
SlideMenu = __decorate([
    Component({
        selector: 'p-slideMenu',
        template: `
        <div #container [ngClass]="{'ui-slidemenu ui-widget ui-widget-content ui-corner-all':true, 'ui-slidemenu-dynamic ui-shadow':popup}" 
            [class]="styleClass" [ngStyle]="style" (click)="onClick($event)"
            [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" [@.disabled]="popup !== true" (@overlayAnimation.start)="onOverlayAnimationStart($event)" *ngIf="!popup || visible">
            <div class="ui-slidemenu-wrapper" [style.height]="left ? viewportHeight + 'px' : 'auto'">
                <div #slideMenuContent class="ui-slidemenu-content">
                    <p-slideMenuSub [item]="model" root="root" [index]="0" [menuWidth]="menuWidth" [effectDuration]="effectDuration" [easing]="easing"></p-slideMenuSub>
                </div>
                <div #backward class="ui-slidemenu-backward ui-widget-header ui-corner-all" [style.display]="left ? 'block' : 'none'" (click)="goBack()">
                    <span class="ui-slidemenu-backward-icon pi pi-fw pi-caret-left"></span><span>{{backLabel}}</span>
                </div>
            </div>
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
], SlideMenu);
export { SlideMenu };
let SlideMenuModule = class SlideMenuModule {
};
SlideMenuModule = __decorate([
    NgModule({
        imports: [CommonModule, RouterModule],
        exports: [SlideMenu, RouterModule],
        declarations: [SlideMenu, SlideMenuSub]
    })
], SlideMenuModule);
export { SlideMenuModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVtZW51LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9zbGlkZW1lbnUvIiwic291cmNlcyI6WyJzbGlkZW1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLGdCQUFnQixFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsaUJBQWlCLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDak0sT0FBTyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQWdCLE1BQU0scUJBQXFCLENBQUM7QUFDMUYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFFdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBbUM3QyxJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFZO0lBa0JyQixZQUFpRCxTQUFTO1FBWmpELGNBQVMsR0FBVyxNQUFNLENBQUM7UUFNM0IsV0FBTSxHQUFXLFVBQVUsQ0FBQztRQU9qQyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQXNCLENBQUM7SUFDNUMsQ0FBQztJQUlELFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBYyxFQUFFLFFBQWE7UUFDMUMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1gsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQzFCO1FBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsSUFBSSxD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Q3pDLENBQUM7R0FDVyxlQUFlLENBQUk7U0FBbkIsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LEVsZW1lbnRSZWYsQWZ0ZXJWaWV3Q2hlY2tlZCxPbkRlc3Ryb3ksSW5wdXQsUmVuZGVyZXIyLEluamVjdCxmb3J3YXJkUmVmLFZpZXdDaGlsZCxPdXRwdXQsRXZlbnRFbWl0dGVyLENoYW5nZURldGVjdG9yUmVmLENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHt0cmlnZ2VyLHN0YXRlLHN0eWxlLHRyYW5zaXRpb24sYW5pbWF0ZSxBbmltYXRpb25FdmVudH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcclxuaW1wb3J0IHtNZW51SXRlbX0gZnJvbSAncHJpbWVuZy9hcGknO1xyXG5pbXBvcnQge1JvdXRlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLXNsaWRlTWVudVN1YicsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDx1bCBbbmdDbGFzc109XCJ7J3VpLXNsaWRlbWVudS1yb290bGlzdCc6cm9vdCwgJ3VpLXN1Ym1lbnUtbGlzdCc6IXJvb3QsICd1aS1hY3RpdmUtc3VibWVudSc6ICgtc2xpZGVNZW51LmxlZnQgPT0gKGluZGV4ICogbWVudVdpZHRoKSl9XCJcclxuICAgICAgICAgICAgW3N0eWxlLndpZHRoLnB4XT1cIm1lbnVXaWR0aFwiIFtzdHlsZS5sZWZ0LnB4XT1cInJvb3QgPyBzbGlkZU1lbnUubGVmdCA6IHNsaWRlTWVudS5tZW51V2lkdGhcIlxyXG4gICAgICAgICAgICBbc3R5bGUudHJhbnNpdGlvblByb3BlcnR5XT1cInJvb3QgPyAnbGVmdCcgOiAnbm9uZSdcIiBbc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uXT1cImVmZmVjdER1cmF0aW9uICsgJ21zJ1wiIFtzdHlsZS50cmFuc2l0aW9uVGltaW5nRnVuY3Rpb25dPVwiZWFzaW5nXCI+XHJcbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtY2hpbGQgW25nRm9yT2ZdPVwiKHJvb3QgPyBpdGVtIDogaXRlbS5pdGVtcylcIj5cclxuICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cImNoaWxkLnNlcGFyYXRvclwiIGNsYXNzPVwidWktbWVudS1zZXBhcmF0b3IgdWktd2lkZ2V0LWNvbnRlbnRcIiBbbmdDbGFzc109XCJ7J3VpLWhlbHBlci1oaWRkZW4nOiBjaGlsZC52aXNpYmxlID09PSBmYWxzZX1cIj5cclxuICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cIiFjaGlsZC5zZXBhcmF0b3JcIiAjbGlzdGl0ZW0gW25nQ2xhc3NdPVwieyd1aS1tZW51aXRlbSB1aS13aWRnZXQgdWktY29ybmVyLWFsbCc6dHJ1ZSwndWktbWVudWl0ZW0tYWN0aXZlJzpsaXN0aXRlbT09YWN0aXZlSXRlbSwndWktaGVscGVyLWhpZGRlbic6IGNoaWxkLnZpc2libGUgPT09IGZhbHNlfVwiXHJcbiAgICAgICAgICAgICAgICAgICAgW2NsYXNzXT1cImNoaWxkLnN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJjaGlsZC5zdHlsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwiIWNoaWxkLnJvdXRlckxpbmtcIiBbaHJlZl09XCJjaGlsZC51cmx8fCcjJ1wiIGNsYXNzPVwidWktbWVudWl0ZW0tbGluayB1aS1jb3JuZXItYWxsXCIgW2F0dHIudGFyZ2V0XT1cImNoaWxkLnRhcmdldFwiIFthdHRyLnRpdGxlXT1cImNoaWxkLnRpdGxlXCIgW2F0dHIuaWRdPVwiY2hpbGQuaWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWRpc2FibGVkJzpjaGlsZC5kaXNhYmxlZH1cIiBbYXR0ci50YWJpbmRleF09XCJjaGlsZC50YWJpbmRleCA/IGNoaWxkLnRhYmluZGV4IDogJzAnXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJpdGVtQ2xpY2soJGV2ZW50LCBjaGlsZCwgbGlzdGl0ZW0pXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktbWVudWl0ZW0taWNvblwiICpuZ0lmPVwiY2hpbGQuaWNvblwiIFtuZ0NsYXNzXT1cImNoaWxkLmljb25cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktbWVudWl0ZW0tdGV4dFwiPnt7Y2hpbGQubGFiZWx9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1zdWJtZW51LWljb24gcGkgcGktZncgcGktY2FyZXQtcmlnaHRcIiAqbmdJZj1cImNoaWxkLml0ZW1zXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cImNoaWxkLnJvdXRlckxpbmtcIiBbcm91dGVyTGlua109XCJjaGlsZC5yb3V0ZXJMaW5rXCIgW3F1ZXJ5UGFyYW1zXT1cImNoaWxkLnF1ZXJ5UGFyYW1zXCIgW3JvdXRlckxpbmtBY3RpdmVdPVwiJ3VpLW1lbnVpdGVtLWxpbmstYWN0aXZlJ1wiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbcm91dGVyTGlua0FjdGl2ZU9wdGlvbnNdPVwiY2hpbGQucm91dGVyTGlua0FjdGl2ZU9wdGlvbnN8fHtleGFjdDpmYWxzZX1cIiBbaHJlZl09XCJjaGlsZC51cmx8fCcjJ1wiIGNsYXNzPVwidWktbWVudWl0ZW0tbGluayB1aS1jb3JuZXItYWxsXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhcmdldF09XCJjaGlsZC50YXJnZXRcIiBbYXR0ci50aXRsZV09XCJjaGlsZC50aXRsZVwiIFthdHRyLmlkXT1cImNoaWxkLmlkXCIgW2F0dHIudGFiaW5kZXhdPVwiY2hpbGQudGFiaW5kZXggPyBjaGlsZC50YWJpbmRleCA6ICcwJ1wiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWRpc2FibGVkJzpjaGlsZC5kaXNhYmxlZH1cIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIml0ZW1DbGljaygkZXZlbnQsIGNoaWxkLCBsaXN0aXRlbSlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbZnJhZ21lbnRdPVwiY2hpbGQuZnJhZ21lbnRcIiBbcXVlcnlQYXJhbXNIYW5kbGluZ109XCJjaGlsZC5xdWVyeVBhcmFtc0hhbmRsaW5nXCIgW3ByZXNlcnZlRnJhZ21lbnRdPVwiY2hpbGQucHJlc2VydmVGcmFnbWVudFwiIFtza2lwTG9jYXRpb25DaGFuZ2VdPVwiY2hpbGQuc2tpcExvY2F0aW9uQ2hhbmdlXCIgW3JlcGxhY2VVcmxdPVwiY2hpbGQucmVwbGFjZVVybFwiIFtzdGF0ZV09XCJjaGlsZC5zdGF0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLWljb25cIiAqbmdJZj1cImNoaWxkLmljb25cIiBbbmdDbGFzc109XCJjaGlsZC5pY29uXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLXRleHRcIj57e2NoaWxkLmxhYmVsfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktc3VibWVudS1pY29uIHBpIHBpLWZ3IHBpLWNhcmV0LXJpZ2h0XCIgKm5nSWY9XCJjaGlsZC5pdGVtc1wiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAtc2xpZGVNZW51U3ViIGNsYXNzPVwidWktc3VibWVudVwiIFtpdGVtXT1cImNoaWxkXCIgW2luZGV4XT1cImluZGV4ICsgMVwiIFttZW51V2lkdGhdPVwibWVudVdpZHRoXCIgKm5nSWY9XCJjaGlsZC5pdGVtc1wiPjwvcC1zbGlkZU1lbnVTdWI+XHJcbiAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICAgIDwvdWw+XHJcbiAgICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTbGlkZU1lbnVTdWIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG5cclxuICAgIEBJbnB1dCgpIGl0ZW06IE1lbnVJdGVtO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSByb290OiBib29sZWFuO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBiYWNrTGFiZWw6IHN0cmluZyA9ICdCYWNrJztcclxuICAgIFxyXG4gICAgQElucHV0KCkgbWVudVdpZHRoOiBudW1iZXI7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGVmZmVjdER1cmF0aW9uOiBhbnk7XHJcbiAgICAgICAgXHJcbiAgICBASW5wdXQoKSBlYXNpbmc6IHN0cmluZyA9ICdlYXNlLW91dCc7XHJcblxyXG4gICAgQElucHV0KCkgaW5kZXg6IG51bWJlcjtcclxuXHJcbiAgICBzbGlkZU1lbnU6IFNsaWRlTWVudTtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoQEluamVjdChmb3J3YXJkUmVmKCgpID0+IFNsaWRlTWVudSkpIHNsaWRlTWVudSkge1xyXG4gICAgICAgIHRoaXMuc2xpZGVNZW51ID0gc2xpZGVNZW51IGFzIFNsaWRlTWVudTtcclxuICAgIH1cclxuICAgICAgICAgICAgIFxyXG4gICAgYWN0aXZlSXRlbTogYW55O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICBpdGVtQ2xpY2soZXZlbnQsIGl0ZW06IE1lbnVJdGVtLCBsaXN0aXRlbTogYW55KcKge1xyXG4gICAgICAgIGlmIChpdGVtLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCFpdGVtLnVybCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIGlmIChpdGVtLmNvbW1hbmQpIHsgICAgICAgICAgICBcclxuICAgICAgICAgICAgaXRlbS5jb21tYW5kKHtcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgaXRlbTogaXRlbVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGl0ZW0uaXRlbXMgJiYgIXRoaXMuc2xpZGVNZW51LmFuaW1hdGluZykge1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlTWVudS5sZWZ0IC09IHRoaXMuc2xpZGVNZW51Lm1lbnVXaWR0aDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IGxpc3RpdGVtO1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlTWVudS5hbmltYXRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2xpZGVNZW51LmFuaW1hdGluZyA9IGZhbHNlLCB0aGlzLmVmZmVjdER1cmF0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghaXRlbS5pdGVtcyAmJiB0aGlzLnNsaWRlTWVudS5wb3B1cCkge1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlTWVudS5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgICAgIFxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVJdGVtID0gbnVsbDtcclxuICAgIH1cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3Atc2xpZGVNZW51JyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiAjY29udGFpbmVyIFtuZ0NsYXNzXT1cInsndWktc2xpZGVtZW51IHVpLXdpZGdldCB1aS13aWRnZXQtY29udGVudCB1aS1jb3JuZXItYWxsJzp0cnVlLCAndWktc2xpZGVtZW51LWR5bmFtaWMgdWktc2hhZG93Jzpwb3B1cH1cIiBcclxuICAgICAgICAgICAgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJzdHlsZVwiIChjbGljayk9XCJvbkNsaWNrKCRldmVudClcIlxyXG4gICAgICAgICAgICBbQG92ZXJsYXlBbmltYXRpb25dPVwie3ZhbHVlOiAndmlzaWJsZScsIHBhcmFtczoge3Nob3dUcmFuc2l0aW9uUGFyYW1zOiBzaG93VHJhbnNpdGlvbk9wdGlvbnMsIGhpZGVUcmFuc2l0aW9uUGFyYW1zOiBoaWRlVHJhbnNpdGlvbk9wdGlvbnN9fVwiIFtALmRpc2FibGVkXT1cInBvcHVwICE9PSB0cnVlXCIgKEBvdmVybGF5QW5pbWF0aW9uLnN0YXJ0KT1cIm9uT3ZlcmxheUFuaW1hdGlvblN0YXJ0KCRldmVudClcIiAqbmdJZj1cIiFwb3B1cCB8fCB2aXNpYmxlXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1zbGlkZW1lbnUtd3JhcHBlclwiIFtzdHlsZS5oZWlnaHRdPVwibGVmdCA/IHZpZXdwb3J0SGVpZ2h0ICsgJ3B4JyA6ICdhdXRvJ1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiAjc2xpZGVNZW51Q29udGVudCBjbGFzcz1cInVpLXNsaWRlbWVudS1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAtc2xpZGVNZW51U3ViIFtpdGVtXT1cIm1vZGVsXCIgcm9vdD1cInJvb3RcIiBbaW5kZXhdPVwiMFwiIFttZW51V2lkdGhdPVwibWVudVdpZHRoXCIgW2VmZmVjdER1cmF0aW9uXT1cImVmZmVjdER1cmF0aW9uXCIgW2Vhc2luZ109XCJlYXNpbmdcIj48L3Atc2xpZGVNZW51U3ViPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2ICNiYWNrd2FyZCBjbGFzcz1cInVpLXNsaWRlbWVudS1iYWNrd2FyZCB1aS13aWRnZXQtaGVhZGVyIHVpLWNvcm5lci1hbGxcIiBbc3R5bGUuZGlzcGxheV09XCJsZWZ0ID8gJ2Jsb2NrJyA6ICdub25lJ1wiIChjbGljayk9XCJnb0JhY2soKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktc2xpZGVtZW51LWJhY2t3YXJkLWljb24gcGkgcGktZncgcGktY2FyZXQtbGVmdFwiPjwvc3Bhbj48c3Bhbj57e2JhY2tMYWJlbH19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgICB0cmlnZ2VyKCdvdmVybGF5QW5pbWF0aW9uJywgW1xyXG4gICAgICAgICAgICBzdGF0ZSgndm9pZCcsIHN0eWxlKHtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoNSUpJyxcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgICAgICAgfSkpLFxyXG4gICAgICAgICAgICBzdGF0ZSgndmlzaWJsZScsIHN0eWxlKHtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMCknLFxyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICAgICAgICB9KSksXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gdmlzaWJsZScsIGFuaW1hdGUoJ3t7c2hvd1RyYW5zaXRpb25QYXJhbXN9fScpKSxcclxuICAgICAgICAgICAgdHJhbnNpdGlvbigndmlzaWJsZSA9PiB2b2lkJywgYW5pbWF0ZSgne3toaWRlVHJhbnNpdGlvblBhcmFtc319JykpXHJcbiAgICAgICAgXSlcclxuICAgIF0sXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcclxufSlcclxuZXhwb3J0IGNsYXNzIFNsaWRlTWVudSBpbXBsZW1lbnRzIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSB7XHJcblxyXG4gICAgQElucHV0KCkgbW9kZWw6IE1lbnVJdGVtW107XHJcblxyXG4gICAgQElucHV0KCkgcG9wdXA6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIG1lbnVXaWR0aDogbnVtYmVyID0gMTkwO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSB2aWV3cG9ydEhlaWdodDogbnVtYmVyID0gMTgwO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBlZmZlY3REdXJhdGlvbjogYW55ID0gMjUwO1xyXG4gICAgICAgIFxyXG4gICAgQElucHV0KCkgZWFzaW5nOiBzdHJpbmcgPSAnZWFzZS1vdXQnO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBiYWNrTGFiZWw6IHN0cmluZyA9ICdCYWNrJztcclxuICAgIFxyXG4gICAgQElucHV0KCkgYXBwZW5kVG86IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBhdXRvWkluZGV4OiBib29sZWFuID0gdHJ1ZTtcclxuICAgIFxyXG4gICAgQElucHV0KCkgYmFzZVpJbmRleDogbnVtYmVyID0gMDtcclxuICAgIFxyXG4gICAgQElucHV0KCkgc2hvd1RyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnMjI1bXMgZWFzZS1vdXQnO1xyXG5cclxuICAgIEBJbnB1dCgpIGhpZGVUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJzE5NW1zIGVhc2UtaW4nO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvblNob3c6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkhpZGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIGNvbnRhaW5lclZpZXdDaGlsZDogRWxlbWVudFJlZjtcclxuICAgIFxyXG4gICAgYmFja3dhcmRWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XHJcbiAgICBcclxuICAgIHNsaWRlTWVudUNvbnRlbnRWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XHJcbiAgICAgXHJcbiAgICBkb2N1bWVudENsaWNrTGlzdGVuZXI6IGFueTtcclxuXHJcbiAgICBkb2N1bWVudFJlc2l6ZUxpc3RlbmVyOiBhbnk7XHJcbiAgICBcclxuICAgIHByZXZlbnREb2N1bWVudERlZmF1bHQ6IGJvb2xlYW47XHJcbiAgICAgICAgXHJcbiAgICBsZWZ0OiBudW1iZXIgPSAwO1xyXG4gICAgXHJcbiAgICBhbmltYXRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIFxyXG4gICAgdGFyZ2V0OiBhbnk7XHJcblxyXG4gICAgdmlzaWJsZTogYm9vbGVhbjtcclxuXHJcbiAgICB2aWV3cG9ydFVwZGF0ZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XHJcblxyXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xyXG4gICAgICAgIGlmICghdGhpcy52aWV3cG9ydFVwZGF0ZWQgJiYgIXRoaXMucG9wdXAgJiYgdGhpcy5jb250YWluZXJWaWV3Q2hpbGQpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVWaWV3UG9ydCgpO1xyXG4gICAgICAgICAgICB0aGlzLnZpZXdwb3J0VXBkYXRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicpIHNldCBjb250YWluZXIoZWxlbWVudDogRWxlbWVudFJlZikge1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyVmlld0NoaWxkID0gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBAVmlld0NoaWxkKCdiYWNrd2FyZCcpIHNldCBiYWNrd2FyZChlbGVtZW50OiBFbGVtZW50UmVmKSB7XHJcbiAgICAgICAgdGhpcy5iYWNrd2FyZFZpZXdDaGlsZCA9IGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnc2xpZGVNZW51Q29udGVudCcpIHNldCBzbGlkZU1lbnVDb250ZW50KGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcclxuICAgICAgICB0aGlzLnNsaWRlTWVudUNvbnRlbnRWaWV3Q2hpbGQgPSBlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVZpZXdQb3J0KCkge1xyXG4gICAgICAgIHRoaXMuc2xpZGVNZW51Q29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLmhlaWdodCA9IHRoaXMudmlld3BvcnRIZWlnaHQgLSBEb21IYW5kbGVyLmdldEhpZGRlbkVsZW1lbnRPdXRlckhlaWdodCh0aGlzLmJhY2t3YXJkVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpICsgJ3B4JztcclxuICAgIH1cclxuICAgIFxyXG4gICAgdG9nZ2xlKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMudmlzaWJsZSlcclxuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLnNob3coZXZlbnQpO1xyXG5cclxuICAgICAgICB0aGlzLnByZXZlbnREb2N1bWVudERlZmF1bHQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzaG93KGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy50YXJnZXQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5wcmV2ZW50RG9jdW1lbnREZWZhdWx0ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBvbk92ZXJsYXlBbmltYXRpb25TdGFydChldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcclxuICAgICAgICBzd2l0Y2goZXZlbnQudG9TdGF0ZSkge1xyXG4gICAgICAgICAgICBjYXNlICd2aXNpYmxlJzpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBvcHVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWaWV3UG9ydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZU9uVG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblNob3cuZW1pdCh7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRPdmVybGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hYnNvbHV0ZVBvc2l0aW9uKHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsIHRoaXMudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAndm9pZCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uT3ZlcmxheUhpZGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25IaWRlLmVtaXQoe30pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGFwcGVuZE92ZXJsYXkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8gPT09ICdib2R5JylcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgdGhpcy5hcHBlbmRUbyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlc3RvcmVPdmVybGF5QXBwZW5kKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciAmJiB0aGlzLmFwcGVuZFRvKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG1vdmVPblRvcCgpIHtcclxuICAgICAgICBpZiAodGhpcy5hdXRvWkluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuekluZGV4ID0gU3RyaW5nKHRoaXMuYmFzZVpJbmRleCArICgrK0RvbUhhbmRsZXIuemluZGV4KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhpZGUoKSB7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25XaW5kb3dSZXNpemUoKSB7XHJcbiAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG9uQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICB0aGlzLnByZXZlbnREb2N1bWVudERlZmF1bHQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnb0JhY2soKSB7XHJcbiAgICAgICAgdGhpcy5sZWZ0ICs9IHRoaXMubWVudVdpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5wcmV2ZW50RG9jdW1lbnREZWZhdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2ZW50RG9jdW1lbnREZWZhdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1bmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKSB7XHJcbiAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gdGhpcy5vbldpbmRvd1Jlc2l6ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1bmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uT3ZlcmxheUhpZGUoKcKge1xyXG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XHJcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCk7XHJcbiAgICAgICAgdGhpcy5wcmV2ZW50RG9jdW1lbnREZWZhdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50YXJnZXQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubGVmdCA9IDA7XHJcbiAgICB9XHJcbiAgICAgICAgXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICBpZiAodGhpcy5wb3B1cCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlc3RvcmVPdmVybGF5QXBwZW5kKCk7XHJcbiAgICAgICAgICAgIHRoaXMub25PdmVybGF5SGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLFJvdXRlck1vZHVsZV0sXHJcbiAgICBleHBvcnRzOiBbU2xpZGVNZW51LFJvdXRlck1vZHVsZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtTbGlkZU1lbnUsU2xpZGVNZW51U3ViXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2xpZGVNZW51TW9kdWxlIHsgfVxyXG4iXX0=