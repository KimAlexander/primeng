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
let MenubarSub = class MenubarSub {
    constructor(renderer, cd) {
        this.renderer = renderer;
        this.cd = cd;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.menuHoverActive = false;
    }
    get parentActive() {
        return this._parentActive;
    }
    set parentActive(value) {
        if (!this.root) {
            this._parentActive = value;
            if (!value)
                this.activeItem = null;
        }
    }
    onItemMenuClick(event, item, menuitem) {
        if (!this.autoDisplay) {
            if (menuitem.disabled) {
                return;
            }
            this.activeItem = this.activeMenu ? (this.activeMenu.isEqualNode(item) ? null : item) : item;
            let nextElement = item.children[0].nextElementSibling;
            if (nextElement) {
                let sublist = nextElement.children[0];
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
    }
    bindEventListener() {
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', (event) => {
                if (!this.menuClick) {
                    this.activeItem = null;
                    this.menuHoverActive = false;
                    this.activeMenu = false;
                }
                this.menuClick = false;
            });
        }
    }
    onItemMouseEnter(event, item, menuitem) {
        if (this.autoDisplay || (!this.autoDisplay && this.root && this.menuHoverActive)) {
            if (menuitem.disabled) {
                return;
            }
            if ((this.activeItem && !this.activeItem.isEqualNode(item) || !this.activeItem)) {
                this.activeItem = item;
                let nextElement = item.children[0].nextElementSibling;
                if (nextElement) {
                    let sublist = nextElement.children[0];
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
        this.activeItem = null;
    }
    listClick(event) {
        if (this.autoDisplay) {
            this.activeItem = null;
        }
    }
    ngOnDestroy() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
};
MenubarSub.ctorParameters = () => [
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
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
        template: `
        <ul [ngClass]="{'ui-menubar-root-list':root, 'ui-widget-content ui-corner-all ui-submenu-list ui-shadow':!root}"
            (click)="listClick($event)">
            <ng-template ngFor let-child [ngForOf]="(root ? item : item.items)">
                <li *ngIf="child.separator" class="ui-menu-separator ui-widget-content" [ngClass]="{'ui-helper-hidden': child.visible === false}">
                <li *ngIf="!child.separator" #listItem [ngClass]="{'ui-menuitem ui-corner-all':true,
                        'ui-menu-parent':child.items,'ui-menuitem-active':listItem==activeItem,'ui-helper-hidden': child.visible === false}"
                        (mouseenter)="onItemMouseEnter($event,listItem,child)" (click)="onItemMenuClick($event, listItem, child)">
                    <a *ngIf="!child.routerLink" [href]="child.url||'#'" [attr.data-automationid]="child.automationId" [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id" (click)="itemClick($event, child)"
                         [ngClass]="{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':child.disabled}" [ngStyle]="child.style" [class]="child.styleClass" 
                         [attr.tabindex]="child.tabindex ? child.tabindex : '0'" [attr.aria-haspopup]="item.items != null" [attr.aria-expanded]="item === activeItem">
                        <span class="ui-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                        <span class="ui-submenu-icon pi pi-fw" *ngIf="child.items" [ngClass]="{'pi-caret-down':root,'pi-caret-right':!root}"></span>
                    </a>
                    <a *ngIf="child.routerLink" [routerLink]="child.routerLink" [attr.data-automationid]="child.automationId" [queryParams]="child.queryParams" [routerLinkActive]="'ui-menuitem-link-active'" [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}"
                        [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id" [attr.tabindex]="child.tabindex ? child.tabindex : '0'" role="menuitem"
                        (click)="itemClick($event, child)" [ngClass]="{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':child.disabled}" [ngStyle]="child.style" [class]="child.styleClass"
                        [fragment]="child.fragment" [queryParamsHandling]="child.queryParamsHandling" [preserveFragment]="child.preserveFragment" [skipLocationChange]="child.skipLocationChange" [replaceUrl]="child.replaceUrl" [state]="child.state">
                        <span class="ui-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                        <span class="ui-submenu-icon pi pi-fw" *ngIf="child.items" [ngClass]="{'pi-caret-down':root,'pi-caret-right':!root}"></span>
                    </a>
                    <p-menubarSub class="ui-submenu" [parentActive]="listItem==activeItem" [item]="child" *ngIf="child.items" [autoDisplay]="true"></p-menubarSub>
                </li>
            </ng-template>
        </ul>
    `
    })
], MenubarSub);
export { MenubarSub };
let Menubar = class Menubar {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.autoZIndex = true;
        this.baseZIndex = 0;
    }
    get autoDisplay() {
        return this._autoDisplay;
    }
    set utc(_utc) {
        console.log("AutoDisplay property is deprecated and functionality is not available.");
    }
};
Menubar.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
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
        template: `
        <div [ngClass]="{'ui-menubar ui-widget ui-widget-content ui-corner-all':true}" [class]="styleClass" [ngStyle]="style">
            <p-menubarSub [item]="model" root="root" [baseZIndex]="baseZIndex" [autoZIndex]="autoZIndex">
                <ng-content></ng-content>
            </p-menubarSub>
            <div class="ui-menubar-custom">
                <ng-content></ng-content>
            </div>
        </div>
    `,
        changeDetection: ChangeDetectionStrategy.Default
    })
], Menubar);
export { Menubar };
let MenubarModule = class MenubarModule {
};
MenubarModule = __decorate([
    NgModule({
        imports: [CommonModule, RouterModule],
        exports: [Menubar, RouterModule],
        declarations: [Menubar, MenubarSub]
    })
], MenubarModule);
export { MenubarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudWJhci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvbWVudWJhci8iLCJzb3VyY2VzIjpbIm1lbnViYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLGlCQUFpQixFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hJLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQWlDL0MsSUFBYSxVQUFVLEdBQXZCLE1BQWEsVUFBVTtJQXFDbkIsWUFBbUIsUUFBbUIsRUFBVSxFQUFxQjtRQUFsRCxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUE3QjVELGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFM0IsZUFBVSxHQUFXLENBQUMsQ0FBQztRQXFCaEMsb0JBQWUsR0FBWSxLQUFLLENBQUM7SUFNd0MsQ0FBQztJQXpCakUsSUFBSSxZQUFZO1FBRXJCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM5QixDQUFDO0lBQ0QsSUFBSSxZQUFZLENBQUMsS0FBSztRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNaLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBRTNCLElBQUksQ0FBQyxLQUFLO2dCQUNOLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQzlCO0lBQ0wsQ0FBQztJQWdCRCxlQUFlLENBQUMsS0FBWSxFQUFFLElBQW1CLEVBQUUsUUFBa0I7UUFDakUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbkIsSUFBSSxRQUFRLENBQUMs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QUFFLENBQVk7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBYnBELGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFM0IsZUFBVSxHQUFXLENBQUMsQ0FBQztJQVdpQyxDQUFDO0lBUHpELElBQUksV0FBVztRQUNwQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUNELElBQUksR0FBRyxDQUFDLElBQWE7UUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3RUFBd0UsQ0FBQyxDQUFDO0lBQzFGLENBQUM7Q0FHSixDQUFBOztZQUQwQixVQUFVO1lBQW1CLFNBQVM7O0FBbkJwRDtJQUFSLEtBQUssRUFBRTtzQ0FBbUI7QUFFbEI7SUFBUixLQUFLLEVBQUU7c0NBQVk7QUFFWDtJQUFSLEtBQUssRUFBRTsyQ0FBb0I7QUFFbkI7SUFBUixLQUFLLEVBQUU7MkNBQTRCO0FBRTNCO0lBQVIsS0FBSyxFQUFFOzJDQUF3QjtBQUl2QjtJQUFSLEtBQUssRUFBRTswQ0FFUDtBQWhCUSxPQUFPO0lBZG5CLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFFBQVEsRUFBRTs7Ozs7Ozs7O0tBU1Q7UUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztLQUNuRCxDQUFDO0dBQ1csT0FBTyxDQXNCbkI7U0F0QlksT0FBTztBQTZCcEIsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtDQUFJLENBQUE7QUFBakIsYUFBYTtJQUx6QixRQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDO1FBQ3JDLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUM7UUFDaEMsWUFBWSxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQztLQUN0QyxDQUFDO0dBQ1csYUFBYSxDQUFJO1NBQWpCLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgUmVuZGVyZXIyLCBPbkRlc3Ryb3ksQ2hhbmdlRGV0ZWN0b3JSZWYsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XHJcbmltcG9ydCB7IE1lbnVJdGVtIH0gZnJvbSAncHJpbWVuZy9hcGknO1xyXG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3AtbWVudWJhclN1YicsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDx1bCBbbmdDbGFzc109XCJ7J3VpLW1lbnViYXItcm9vdC1saXN0Jzpyb290LCAndWktd2lkZ2V0LWNvbnRlbnQgdWktY29ybmVyLWFsbCB1aS1zdWJtZW51LWxpc3QgdWktc2hhZG93Jzohcm9vdH1cIlxyXG4gICAgICAgICAgICAoY2xpY2spPVwibGlzdENsaWNrKCRldmVudClcIj5cclxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1jaGlsZCBbbmdGb3JPZl09XCIocm9vdCA/IGl0ZW0gOiBpdGVtLml0ZW1zKVwiPlxyXG4gICAgICAgICAgICAgICAgPGxpICpuZ0lmPVwiY2hpbGQuc2VwYXJhdG9yXCIgY2xhc3M9XCJ1aS1tZW51LXNlcGFyYXRvciB1aS13aWRnZXQtY29udGVudFwiIFtuZ0NsYXNzXT1cInsndWktaGVscGVyLWhpZGRlbic6IGNoaWxkLnZpc2libGUgPT09IGZhbHNlfVwiPlxyXG4gICAgICAgICAgICAgICAgPGxpICpuZ0lmPVwiIWNoaWxkLnNlcGFyYXRvclwiICNsaXN0SXRlbSBbbmdDbGFzc109XCJ7J3VpLW1lbnVpdGVtIHVpLWNvcm5lci1hbGwnOnRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1tZW51LXBhcmVudCc6Y2hpbGQuaXRlbXMsJ3VpLW1lbnVpdGVtLWFjdGl2ZSc6bGlzdEl0ZW09PWFjdGl2ZUl0ZW0sJ3VpLWhlbHBlci1oaWRkZW4nOiBjaGlsZC52aXNpYmxlID09PSBmYWxzZX1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAobW91c2VlbnRlcik9XCJvbkl0ZW1Nb3VzZUVudGVyKCRldmVudCxsaXN0SXRlbSxjaGlsZClcIiAoY2xpY2spPVwib25JdGVtTWVudUNsaWNrKCRldmVudCwgbGlzdEl0ZW0sIGNoaWxkKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwiIWNoaWxkLnJvdXRlckxpbmtcIiBbaHJlZl09XCJjaGlsZC51cmx8fCcjJ1wiIFthdHRyLmRhdGEtYXV0b21hdGlvbmlkXT1cImNoaWxkLmF1dG9tYXRpb25JZFwiIFthdHRyLnRhcmdldF09XCJjaGlsZC50YXJnZXRcIiBbYXR0ci50aXRsZV09XCJjaGlsZC50aXRsZVwiIFthdHRyLmlkXT1cImNoaWxkLmlkXCIgKGNsaWNrKT1cIml0ZW1DbGljaygkZXZlbnQsIGNoaWxkKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLW1lbnVpdGVtLWxpbmsgdWktY29ybmVyLWFsbCc6dHJ1ZSwndWktc3RhdGUtZGlzYWJsZWQnOmNoaWxkLmRpc2FibGVkfVwiIFtuZ1N0eWxlXT1cImNoaWxkLnN0eWxlXCIgW2NsYXNzXT1cImNoaWxkLnN0eWxlQ2xhc3NcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cImNoaWxkLnRhYmluZGV4ID8gY2hpbGQudGFiaW5kZXggOiAnMCdcIiBbYXR0ci5hcmlhLWhhc3BvcHVwXT1cIml0ZW0uaXRlbXMgIT0gbnVsbFwiIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwiaXRlbSA9PT0gYWN0aXZlSXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLWljb25cIiAqbmdJZj1cImNoaWxkLmljb25cIiBbbmdDbGFzc109XCJjaGlsZC5pY29uXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLXRleHRcIj57e2NoaWxkLmxhYmVsfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktc3VibWVudS1pY29uIHBpIHBpLWZ3XCIgKm5nSWY9XCJjaGlsZC5pdGVtc1wiIFtuZ0NsYXNzXT1cInsncGktY2FyZXQtZG93bic6cm9vdCwncGktY2FyZXQtcmlnaHQnOiFyb290fVwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPGEgKm5nSWY9XCJjaGlsZC5yb3V0ZXJMaW5rXCIgW3JvdXRlckxpbmtdPVwiY2hpbGQucm91dGVyTGlua1wiIFthdHRyLmRhdGEtYXV0b21hdGlvbmlkXT1cImNoaWxkLmF1dG9tYXRpb25JZFwiIFtxdWVyeVBhcmFtc109XCJjaGlsZC5xdWVyeVBhcmFtc1wiIFtyb3V0ZXJMaW5rQWN0aXZlXT1cIid1aS1tZW51aXRlbS1saW5rLWFjdGl2ZSdcIiBbcm91dGVyTGlua0FjdGl2ZU9wdGlvbnNdPVwiY2hpbGQucm91dGVyTGlua0FjdGl2ZU9wdGlvbnN8fHtleGFjdDpmYWxzZX1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YXJnZXRdPVwiY2hpbGQudGFyZ2V0XCIgW2F0dHIudGl0bGVdPVwiY2hpbGQudGl0bGVcIiBbYXR0ci5pZF09XCJjaGlsZC5pZFwiIFthdHRyLnRhYmluZGV4XT1cImNoaWxkLnRhYmluZGV4ID8gY2hpbGQudGFiaW5kZXggOiAnMCdcIiByb2xlPVwibWVudWl0ZW1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiaXRlbUNsaWNrKCRldmVudCwgY2hpbGQpXCIgW25nQ2xhc3NdPVwieyd1aS1tZW51aXRlbS1saW5rIHVpLWNvcm5lci1hbGwnOnRydWUsJ3VpLXN0YXRlLWRpc2FibGVkJzpjaGlsZC5kaXNhYmxlZH1cIiBbbmdTdHlsZV09XCJjaGlsZC5zdHlsZVwiIFtjbGFzc109XCJjaGlsZC5zdHlsZUNsYXNzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW2ZyYWdtZW50XT1cImNoaWxkLmZyYWdtZW50XCIgW3F1ZXJ5UGFyYW1zSGFuZGxpbmddPVwiY2hpbGQucXVlcnlQYXJhbXNIYW5kbGluZ1wiIFtwcmVzZXJ2ZUZyYWdtZW50XT1cImNoaWxkLnByZXNlcnZlRnJhZ21lbnRcIiBbc2tpcExvY2F0aW9uQ2hhbmdlXT1cImNoaWxkLnNraXBMb2NhdGlvbkNoYW5nZVwiIFtyZXBsYWNlVXJsXT1cImNoaWxkLnJlcGxhY2VVcmxcIiBbc3RhdGVdPVwiY2hpbGQuc3RhdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS1pY29uXCIgKm5nSWY9XCJjaGlsZC5pY29uXCIgW25nQ2xhc3NdPVwiY2hpbGQuaWNvblwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS10ZXh0XCI+e3tjaGlsZC5sYWJlbH19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXN1Ym1lbnUtaWNvbiBwaSBwaS1md1wiICpuZ0lmPVwiY2hpbGQuaXRlbXNcIiBbbmdDbGFzc109XCJ7J3BpLWNhcmV0LWRvd24nOnJvb3QsJ3BpLWNhcmV0LXJpZ2h0Jzohcm9vdH1cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwLW1lbnViYXJTdWIgY2xhc3M9XCJ1aS1zdWJtZW51XCIgW3BhcmVudEFjdGl2ZV09XCJsaXN0SXRlbT09YWN0aXZlSXRlbVwiIFtpdGVtXT1cImNoaWxkXCIgKm5nSWY9XCJjaGlsZC5pdGVtc1wiIFthdXRvRGlzcGxheV09XCJ0cnVlXCI+PC9wLW1lbnViYXJTdWI+XHJcbiAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICAgIDwvdWw+XHJcbiAgICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNZW51YmFyU3ViIGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuXHJcbiAgICBASW5wdXQoKSBpdGVtOiBNZW51SXRlbTtcclxuXHJcbiAgICBASW5wdXQoKSByb290OiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIGF1dG9EaXNwbGF5OiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIGF1dG9aSW5kZXg6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIGJhc2VaSW5kZXg6IG51bWJlciA9IDA7XHJcblxyXG4gICAgQElucHV0KCkgZ2V0IHBhcmVudEFjdGl2ZSgpOmJvb2xlYW4gXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudEFjdGl2ZTtcclxuICAgIH1cclxuICAgIHNldCBwYXJlbnRBY3RpdmUodmFsdWUpIHtcclxuICAgICAgICBpZiAoIXRoaXMucm9vdCkge1xyXG4gICAgICAgICAgICB0aGlzLl9wYXJlbnRBY3RpdmUgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdmFsdWUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfcGFyZW50QWN0aXZlOmJvb2xlYW47XHJcblxyXG4gICAgZG9jdW1lbnRDbGlja0xpc3RlbmVyOiBhbnk7XHJcblxyXG4gICAgbWVudUNsaWNrOiBib29sZWFuO1xyXG4gIFxyXG4gICAgbWVudUhvdmVyQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgYWN0aXZlSXRlbTogYW55O1xyXG5cclxuICAgIGFjdGl2ZU1lbnU6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHsgfVxyXG5cclxuICAgIG9uSXRlbU1lbnVDbGljayhldmVudDogRXZlbnQsIGl0ZW06IEhUTUxMSUVsZW1lbnQsIG1lbnVpdGVtOiBNZW51SXRlbSkge1xyXG4gICAgICAgIGlmICghdGhpcy5hdXRvRGlzcGxheSkge1xyXG4gICAgICAgICAgICBpZiAobWVudWl0ZW0uZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtID0gdGhpcy5hY3RpdmVNZW51ID8gKHRoaXMuYWN0aXZlTWVudS5pc0VxdWFsTm9kZShpdGVtKSA/IG51bGwgOiBpdGVtKSA6IGl0ZW07XHJcbiAgICAgICAgICAgIGxldCBuZXh0RWxlbWVudCA9IDxIVE1MTElFbGVtZW50Pml0ZW0uY2hpbGRyZW5bMF0ubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICBpZiAobmV4dEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzdWJsaXN0ID0gPEhUTUxVTGlzdEVsZW1lbnQ+bmV4dEVsZW1lbnQuY2hpbGRyZW5bMF07XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hdXRvWkluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VibGlzdC5zdHlsZS56SW5kZXggPSBTdHJpbmcodGhpcy5iYXNlWkluZGV4ICsgKCsrRG9tSGFuZGxlci56aW5kZXgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yb290KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VibGlzdC5zdHlsZS50b3AgPSBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KGl0ZW0uY2hpbGRyZW5bMF0pICsgJ3B4JztcclxuICAgICAgICAgICAgICAgICAgICBzdWJsaXN0LnN0eWxlLmxlZnQgPSAnMHB4J1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VibGlzdC5zdHlsZS50b3AgPSAnMHB4JztcclxuICAgICAgICAgICAgICAgICAgICBzdWJsaXN0LnN0eWxlLmxlZnQgPSBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgoaXRlbS5jaGlsZHJlblswXSkgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnVDbGljayA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubWVudUhvdmVyQWN0aXZlID0gdGhpcy5hY3RpdmVNZW51ID8gKCF0aGlzLmFjdGl2ZU1lbnUuaXNFcXVhbE5vZGUoaXRlbSkpIDogdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVNZW51ID0gdGhpcy5hY3RpdmVNZW51ID8gKHRoaXMuYWN0aXZlTWVudS5pc0VxdWFsTm9kZShpdGVtKSA/IG51bGw6IGl0ZW0pIDogaXRlbTtcclxuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRMaXN0ZW5lcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBiaW5kRXZlbnRMaXN0ZW5lcigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ2NsaWNrJywoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tZW51Q2xpY2spIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVudUhvdmVyQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVNZW51ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnVDbGljayA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25JdGVtTW91c2VFbnRlcihldmVudDogRXZlbnQsIGl0ZW06IEhUTUxMSUVsZW1lbnQsIG1lbnVpdGVtOiBNZW51SXRlbSkge1xyXG4gICAgICAgIGlmICh0aGlzLmF1dG9EaXNwbGF5IHx8ICghdGhpcy5hdXRvRGlzcGxheSAmJiB0aGlzLnJvb3QgJiYgdGhpcy5tZW51SG92ZXJBY3RpdmUpKSB7XHJcbiAgICAgICAgICAgIGlmIChtZW51aXRlbS5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoKHRoaXMuYWN0aXZlSXRlbSAmJiAhdGhpcy5hY3RpdmVJdGVtLmlzRXF1YWxOb2RlKGl0ZW0pIHx8ICF0aGlzLmFjdGl2ZUl0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5leHRFbGVtZW50ID0gPEhUTUxMSUVsZW1lbnQ+aXRlbS5jaGlsZHJlblswXS5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV4dEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3VibGlzdCA9IDxIVE1MVUxpc3RFbGVtZW50Pm5leHRFbGVtZW50LmNoaWxkcmVuWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1Ymxpc3Quc3R5bGUuekluZGV4ID0gU3RyaW5nKCsrRG9tSGFuZGxlci56aW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yb290KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Ymxpc3Quc3R5bGUudG9wID0gRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodChpdGVtLmNoaWxkcmVuWzBdKSArICdweCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Ymxpc3Quc3R5bGUubGVmdCA9ICcwcHgnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJsaXN0LnN0eWxlLnRvcCA9ICcwcHgnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJsaXN0LnN0eWxlLmxlZnQgPSBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgoaXRlbS5jaGlsZHJlblswXSkgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlTWVudSA9IGl0ZW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGl0ZW1DbGljayhldmVudCwgaXRlbTogTWVudUl0ZW0pIMKge1xyXG4gICAgICAgIGlmIChpdGVtLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghaXRlbS51cmwpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpdGVtLmNvbW1hbmQpIHtcclxuICAgICAgICAgICAgaXRlbS5jb21tYW5kKHtcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgaXRlbTogaXRlbVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgbGlzdENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYXV0b0Rpc3BsYXkpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgIGlmICh0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcikge1xyXG4gICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XHJcbiAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC1tZW51YmFyJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J3VpLW1lbnViYXIgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwnOnRydWV9XCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJzdHlsZVwiPlxyXG4gICAgICAgICAgICA8cC1tZW51YmFyU3ViIFtpdGVtXT1cIm1vZGVsXCIgcm9vdD1cInJvb3RcIiBbYmFzZVpJbmRleF09XCJiYXNlWkluZGV4XCIgW2F1dG9aSW5kZXhdPVwiYXV0b1pJbmRleFwiPlxyXG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgICAgICAgICA8L3AtbWVudWJhclN1Yj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLW1lbnViYXItY3VzdG9tXCI+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWVudWJhciB7XHJcblxyXG4gICAgQElucHV0KCkgbW9kZWw6IE1lbnVJdGVtW107XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgYXV0b1pJbmRleDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgQElucHV0KCkgYmFzZVpJbmRleDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwcml2YXRlIF9hdXRvRGlzcGxheTogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSBnZXQgYXV0b0Rpc3BsYXkoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2F1dG9EaXNwbGF5O1xyXG4gICAgfVxyXG4gICAgc2V0IHV0YyhfdXRjOiBib29sZWFuKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBdXRvRGlzcGxheSBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkIGFuZCBmdW5jdGlvbmFsaXR5IGlzIG5vdCBhdmFpbGFibGUuXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHsgfVxyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUm91dGVyTW9kdWxlXSxcclxuICAgIGV4cG9ydHM6IFtNZW51YmFyLCBSb3V0ZXJNb2R1bGVdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbTWVudWJhciwgTWVudWJhclN1Yl1cclxufSlcclxuZXhwb3J0IGNsYXNzIE1lbnViYXJNb2R1bGUgeyB9XHJcbiJdfQ==