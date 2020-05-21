var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, OnDestroy, Input, Output, EventEmitter, Renderer2, ChangeDetectorRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { UniqueComponentId } from 'primeng/utils';
let SplitButton = class SplitButton {
    constructor(el, renderer, router, cd) {
        this.el = el;
        this.renderer = renderer;
        this.router = router;
        this.cd = cd;
        this.iconPos = 'left';
        this.onClick = new EventEmitter();
        this.onDropdownClick = new EventEmitter();
        this.showTransitionOptions = '225ms ease-out';
        this.hideTransitionOptions = '195ms ease-in';
        this.overlayVisible = false;
        this.ariaId = UniqueComponentId() + '_list';
    }
    onDefaultButtonClick(event) {
        this.onClick.emit(event);
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
        this.overlayVisible = false;
    }
    show() {
        this.overlayVisible = !this.overlayVisible;
    }
    onOverlayAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                this.overlay = event.element;
                this.appendOverlay();
                this.overlay.style.zIndex = String(++DomHandler.zindex);
                this.alignOverlay();
                this.bindDocumentClickListener();
                this.bindDocumentResizeListener();
                break;
            case 'void':
                this.onOverlayHide();
                break;
        }
    }
    onDropdownButtonClick(event) {
        this.onDropdownClick.emit(event);
        this.dropdownClick = true;
        this.show();
    }
    alignOverlay() {
        if (this.appendTo)
            DomHandler.absolutePosition(this.overlay, this.containerViewChild.nativeElement);
        else
            DomHandler.relativePosition(this.overlay, this.containerViewChild.nativeElement);
    }
    appendOverlay() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.overlay);
            else
                DomHandler.appendChild(this.overlay, this.appendTo);
            if (!this.overlay.style.minWidth) {
                this.overlay.style.minWidth = DomHandler.getWidth(this.el.nativeElement.children[0]) + 'px';
            }
        }
    }
    restoreOverlayAppend() {
        if (this.overlay && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', () => {
                if (this.dropdownClick) {
                    this.dropdownClick = false;
                }
                else {
                    this.overlayVisible = false;
                    this.unbindDocumentClickListener();
                    this.cd.markForCheck();
                }
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
    onWindowResize() {
        this.overlayVisible = false;
    }
    onOverlayHide() {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.overlay = null;
    }
    ngOnDestroy() {
        this.restoreOverlayAppend();
        this.onOverlayHide();
    }
};
SplitButton.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: Router },
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], SplitButton.prototype, "model", void 0);
__decorate([
    Input()
], SplitButton.prototype, "icon", void 0);
__decorate([
    Input()
], SplitButton.prototype, "iconPos", void 0);
__decorate([
    Input()
], SplitButton.prototype, "label", void 0);
__decorate([
    Output()
], SplitButton.prototype, "onClick", void 0);
__decorate([
    Output()
], SplitButton.prototype, "onDropdownClick", void 0);
__decorate([
    Input()
], SplitButton.prototype, "style", void 0);
__decorate([
    Input()
], SplitButton.prototype, "styleClass", void 0);
__decorate([
    Input()
], SplitButton.prototype, "menuStyle", void 0);
__decorate([
    Input()
], SplitButton.prototype, "menuStyleClass", void 0);
__decorate([
    Input()
], SplitButton.prototype, "disabled", void 0);
__decorate([
    Input()
], SplitButton.prototype, "tabindex", void 0);
__decorate([
    Input()
], SplitButton.prototype, "appendTo", void 0);
__decorate([
    Input()
], SplitButton.prototype, "dir", void 0);
__decorate([
    Input()
], SplitButton.prototype, "showTransitionOptions", void 0);
__decorate([
    Input()
], SplitButton.prototype, "hideTransitionOptions", void 0);
__decorate([
    ViewChild('container')
], SplitButton.prototype, "containerViewChild", void 0);
__decorate([
    ViewChild('defaultbtn')
], SplitButton.prototype, "buttonViewChild", void 0);
SplitButton = __decorate([
    Component({
        selector: 'p-splitButton',
        template: `
        <div #container [ngClass]="{'ui-splitbutton ui-buttonset ui-widget':true,'ui-state-disabled':disabled}" [ngStyle]="style" [class]="styleClass">
            <button #defaultbtn type="button" pButton [icon]="icon" [iconPos]="iconPos" [label]="label" [cornerStyleClass]="dir === 'rtl' ? 'ui-corner-right': 'ui-corner-left'" (click)="onDefaultButtonClick($event)" [disabled]="disabled" [attr.tabindex]="tabindex">
            </button><button type="button" pButton class="ui-splitbutton-menubutton" icon="pi pi-chevron-down" [cornerStyleClass]="dir === 'rtl' ? 'ui-corner-left': 'ui-corner-right'" (click)="onDropdownButtonClick($event)" [disabled]="disabled"></button>
            <div [attr.id]="ariaId + '_overlay'" #overlay [ngClass]="'ui-menu ui-menu-dynamic ui-widget ui-widget-content ui-corner-all ui-helper-clearfix ui-shadow'" *ngIf="overlayVisible"
                    [ngStyle]="menuStyle" [class]="menuStyleClass"
                    [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" (@overlayAnimation.start)="onOverlayAnimationStart($event)">
                <ul class="ui-menu-list ui-helper-reset" role="menu">
                    <ng-template ngFor let-item [ngForOf]="model">
                        <li *ngIf="item.separator" class="ui-menu-separator ui-widget-content" [ngClass]="{'ui-helper-hidden': item.visible === false}" role="separator">
                        <li class="ui-menuitem ui-widget ui-corner-all" role="menuitem" *ngIf="item.visible !== false && !item.separator" role="none">
                            <a *ngIf="!item.routerLink" [attr.href]="item.url" class="ui-menuitem-link ui-corner-all" [attr.target]="item.target" role="menuitem"
                                [ngClass]="{'ui-state-disabled':item.disabled}" (click)="itemClick($event, item)">
                                <span [ngClass]="'ui-menuitem-icon'" [class]="item.icon" *ngIf="item.icon"></span>
                                <span class="ui-menuitem-text">{{item.label}}</span>
                            </a>
                            <a *ngIf="item.routerLink" [routerLink]="item.routerLink" [queryParams]="item.queryParams"
                                class="ui-menuitem-link ui-corner-all" [attr.target]="item.target" [ngClass]="{'ui-state-disabled':item.disabled}" (click)="itemClick($event, item)">
                                <span [ngClass]="'ui-menuitem-icon'" [class]="item.icon" *ngIf="item.icon"></span>
                                <span class="ui-menuitem-text">{{item.label}}</span>
                            </a>
                        </li>
                    </ng-template>
                </ul>
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
], SplitButton);
export { SplitButton };
let SplitButtonModule = class SplitButtonModule {
};
SplitButtonModule = __decorate([
    NgModule({
        imports: [CommonModule, ButtonModule, RouterModule],
        exports: [SplitButton, ButtonModule, RouterModule],
        declarations: [SplitButton]
    })
], SplitButtonModule);
export { SplitButtonModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXRidXR0b24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL3NwbGl0YnV0dG9uLyIsInNvdXJjZXMiOlsic3BsaXRidXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxTQUFTLEVBQUMsaUJBQWlCLEVBQUMsU0FBUyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlKLE9BQU8sRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFnQixNQUFNLHFCQUFxQixDQUFDO0FBQzFGLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBRXZDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQStDbEQsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBVztJQW9EcEIsWUFBbUIsRUFBYyxFQUFTLFFBQW1CLEVBQVMsTUFBYyxFQUFTLEVBQXFCO1FBQS9GLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFTLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBOUN6RyxZQUFPLEdBQVcsTUFBTSxDQUFDO1FBSXhCLFlBQU8sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVoRCxvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFB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b21wb25lbnQsRWxlbWVudFJlZixPbkRlc3Ryb3ksSW5wdXQsT3V0cHV0LEV2ZW50RW1pdHRlcixSZW5kZXJlcjIsQ2hhbmdlRGV0ZWN0b3JSZWYsVmlld0NoaWxkLENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHt0cmlnZ2VyLHN0YXRlLHN0eWxlLHRyYW5zaXRpb24sYW5pbWF0ZSxBbmltYXRpb25FdmVudH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcclxuaW1wb3J0IHtNZW51SXRlbX0gZnJvbSAncHJpbWVuZy9hcGknO1xyXG5pbXBvcnQge0J1dHRvbk1vZHVsZX0gZnJvbSAncHJpbWVuZy9idXR0b24nO1xyXG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHtSb3V0ZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFVuaXF1ZUNvbXBvbmVudElkIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC1zcGxpdEJ1dHRvbicsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgI2NvbnRhaW5lciBbbmdDbGFzc109XCJ7J3VpLXNwbGl0YnV0dG9uIHVpLWJ1dHRvbnNldCB1aS13aWRnZXQnOnRydWUsJ3VpLXN0YXRlLWRpc2FibGVkJzpkaXNhYmxlZH1cIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gI2RlZmF1bHRidG4gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gW2ljb25dPVwiaWNvblwiIFtpY29uUG9zXT1cImljb25Qb3NcIiBbbGFiZWxdPVwibGFiZWxcIiBbY29ybmVyU3R5bGVDbGFzc109XCJkaXIgPT09ICdydGwnID8gJ3VpLWNvcm5lci1yaWdodCc6ICd1aS1jb3JuZXItbGVmdCdcIiAoY2xpY2spPVwib25EZWZhdWx0QnV0dG9uQ2xpY2soJGV2ZW50KVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIFthdHRyLnRhYmluZGV4XT1cInRhYmluZGV4XCI+XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gY2xhc3M9XCJ1aS1zcGxpdGJ1dHRvbi1tZW51YnV0dG9uXCIgaWNvbj1cInBpIHBpLWNoZXZyb24tZG93blwiIFtjb3JuZXJTdHlsZUNsYXNzXT1cImRpciA9PT0gJ3J0bCcgPyAndWktY29ybmVyLWxlZnQnOiAndWktY29ybmVyLXJpZ2h0J1wiIChjbGljayk9XCJvbkRyb3Bkb3duQnV0dG9uQ2xpY2soJGV2ZW50KVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8ZGl2IFthdHRyLmlkXT1cImFyaWFJZCArICdfb3ZlcmxheSdcIiAjb3ZlcmxheSBbbmdDbGFzc109XCIndWktbWVudSB1aS1tZW51LWR5bmFtaWMgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwgdWktaGVscGVyLWNsZWFyZml4IHVpLXNoYWRvdydcIiAqbmdJZj1cIm92ZXJsYXlWaXNpYmxlXCJcclxuICAgICAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJtZW51U3R5bGVcIiBbY2xhc3NdPVwibWVudVN0eWxlQ2xhc3NcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtAb3ZlcmxheUFuaW1hdGlvbl09XCJ7dmFsdWU6ICd2aXNpYmxlJywgcGFyYW1zOiB7c2hvd1RyYW5zaXRpb25QYXJhbXM6IHNob3dUcmFuc2l0aW9uT3B0aW9ucywgaGlkZVRyYW5zaXRpb25QYXJhbXM6IGhpZGVUcmFuc2l0aW9uT3B0aW9uc319XCIgKEBvdmVybGF5QW5pbWF0aW9uLnN0YXJ0KT1cIm9uT3ZlcmxheUFuaW1hdGlvblN0YXJ0KCRldmVudClcIj5cclxuICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cInVpLW1lbnUtbGlzdCB1aS1oZWxwZXItcmVzZXRcIiByb2xlPVwibWVudVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtaXRlbSBbbmdGb3JPZl09XCJtb2RlbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgKm5nSWY9XCJpdGVtLnNlcGFyYXRvclwiIGNsYXNzPVwidWktbWVudS1zZXBhcmF0b3IgdWktd2lkZ2V0LWNvbnRlbnRcIiBbbmdDbGFzc109XCJ7J3VpLWhlbHBlci1oaWRkZW4nOiBpdGVtLnZpc2libGUgPT09IGZhbHNlfVwiIHJvbGU9XCJzZXBhcmF0b3JcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwidWktbWVudWl0ZW0gdWktd2lkZ2V0IHVpLWNvcm5lci1hbGxcIiByb2xlPVwibWVudWl0ZW1cIiAqbmdJZj1cIml0ZW0udmlzaWJsZSAhPT0gZmFsc2UgJiYgIWl0ZW0uc2VwYXJhdG9yXCIgcm9sZT1cIm5vbmVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwiIWl0ZW0ucm91dGVyTGlua1wiIFthdHRyLmhyZWZdPVwiaXRlbS51cmxcIiBjbGFzcz1cInVpLW1lbnVpdGVtLWxpbmsgdWktY29ybmVyLWFsbFwiIFthdHRyLnRhcmdldF09XCJpdGVtLnRhcmdldFwiIHJvbGU9XCJtZW51aXRlbVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1kaXNhYmxlZCc6aXRlbS5kaXNhYmxlZH1cIiAoY2xpY2spPVwiaXRlbUNsaWNrKCRldmVudCwgaXRlbSlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBbbmdDbGFzc109XCIndWktbWVudWl0ZW0taWNvbidcIiBbY2xhc3NdPVwiaXRlbS5pY29uXCIgKm5nSWY9XCJpdGVtLmljb25cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS10ZXh0XCI+e3tpdGVtLmxhYmVsfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cIml0ZW0ucm91dGVyTGlua1wiIFtyb3V0ZXJMaW5rXT1cIml0ZW0ucm91dGVyTGlua1wiIFtxdWVyeVBhcmFtc109XCJpdGVtLnF1ZXJ5UGFyYW1zXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInVpLW1lbnVpdGVtLWxpbmsgdWktY29ybmVyLWFsbFwiIFthdHRyLnRhcmdldF09XCJpdGVtLnRhcmdldFwiIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtZGlzYWJsZWQnOml0ZW0uZGlzYWJsZWR9XCIgKGNsaWNrKT1cIml0ZW1DbGljaygkZXZlbnQsIGl0ZW0pXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gW25nQ2xhc3NdPVwiJ3VpLW1lbnVpdGVtLWljb24nXCIgW2NsYXNzXT1cIml0ZW0uaWNvblwiICpuZ0lmPVwiaXRlbS5pY29uXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktbWVudWl0ZW0tdGV4dFwiPnt7aXRlbS5sYWJlbH19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgICAgdHJpZ2dlcignb3ZlcmxheUFuaW1hdGlvbicsIFtcclxuICAgICAgICAgICAgc3RhdGUoJ3ZvaWQnLCBzdHlsZSh7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDUlKScsXHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXHJcbiAgICAgICAgICAgIH0pKSxcclxuICAgICAgICAgICAgc3RhdGUoJ3Zpc2libGUnLCBzdHlsZSh7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJyxcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDFcclxuICAgICAgICAgICAgfSkpLFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHZpc2libGUnLCBhbmltYXRlKCd7e3Nob3dUcmFuc2l0aW9uUGFyYW1zfX0nKSksXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3Zpc2libGUgPT4gdm9pZCcsIGFuaW1hdGUoJ3t7aGlkZVRyYW5zaXRpb25QYXJhbXN9fScpKVxyXG4gICAgICAgIF0pXHJcbiAgICBdLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTcGxpdEJ1dHRvbiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcblxyXG4gICAgQElucHV0KCkgbW9kZWw6IE1lbnVJdGVtW107XHJcblxyXG4gICAgQElucHV0KCkgaWNvbjogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGljb25Qb3M6IHN0cmluZyA9ICdsZWZ0JztcclxuICAgICAgICBcclxuICAgIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XHJcbiAgICBcclxuICAgIEBPdXRwdXQoKSBvbkNsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIFxyXG4gICAgQE91dHB1dCgpIG9uRHJvcGRvd25DbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcclxuICAgIFxyXG4gICAgQElucHV0KCkgbWVudVN0eWxlOiBhbnk7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIG1lbnVTdHlsZUNsYXNzOiBzdHJpbmc7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIHRhYmluZGV4OiBudW1iZXI7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGFwcGVuZFRvOiBhbnk7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGRpcjogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIHNob3dUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJzIyNW1zIGVhc2Utb3V0JztcclxuXHJcbiAgICBASW5wdXQoKSBoaWRlVHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICcxOTVtcyBlYXNlLWluJztcclxuXHJcbiAgICBAVmlld0NoaWxkKCdjb250YWluZXInKSBjb250YWluZXJWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XHJcbiAgICBcclxuICAgIEBWaWV3Q2hpbGQoJ2RlZmF1bHRidG4nKSBidXR0b25WaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgb3ZlcmxheTogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICBwdWJsaWMgb3ZlcmxheVZpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIFxyXG4gICAgcHVibGljIGRvY3VtZW50Q2xpY2tMaXN0ZW5lcjogYW55O1xyXG4gICAgXHJcbiAgICBwdWJsaWMgZHJvcGRvd25DbGljazogYm9vbGVhbjtcclxuICAgIFxyXG4gICAgcHVibGljIHNob3duOiBib29sZWFuO1xyXG5cclxuICAgIGFyaWFJZDogc3RyaW5nO1xyXG5cclxuICAgIGRvY3VtZW50UmVzaXplTGlzdGVuZXI6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyLCBwdWJsaWMgcm91dGVyOiBSb3V0ZXIsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcclxuICAgICAgICB0aGlzLmFyaWFJZCA9IFVuaXF1ZUNvbXBvbmVudElkKCkgKyAnX2xpc3QnO1xyXG4gICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICBvbkRlZmF1bHRCdXR0b25DbGljayhldmVudDogRXZlbnQpIHtcclxuICAgICAgICB0aGlzLm9uQ2xpY2suZW1pdChldmVudCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGl0ZW1DbGljayhldmVudDogRXZlbnQsIGl0ZW06IE1lbnVJdGVtKcKge1xyXG4gICAgICAgIGlmIChpdGVtLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCFpdGVtLnVybCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAoaXRlbS5jb21tYW5kKSB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGl0ZW0uY29tbWFuZCh7XHJcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgICAgIGl0ZW06IGl0ZW1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2hvdygpIHtcclxuICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gIXRoaXMub3ZlcmxheVZpc2libGU7XHJcbiAgICB9XHJcblxyXG4gICAgb25PdmVybGF5QW5pbWF0aW9uU3RhcnQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XHJcbiAgICAgICAgc3dpdGNoIChldmVudC50b1N0YXRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Zpc2libGUnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5ID0gZXZlbnQuZWxlbWVudDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kT3ZlcmxheSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5LnN0eWxlLnpJbmRleCA9IFN0cmluZygrK0RvbUhhbmRsZXIuemluZGV4KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25PdmVybGF5KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlICd2b2lkJzpcclxuICAgICAgICAgICAgICAgIHRoaXMub25PdmVybGF5SGlkZSgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAgICAgXHJcbiAgICBvbkRyb3Bkb3duQnV0dG9uQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5vbkRyb3Bkb3duQ2xpY2suZW1pdChldmVudCk7XHJcbiAgICAgICAgdGhpcy5kcm9wZG93bkNsaWNrID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNob3coKTtcclxuICAgIH1cclxuXHJcbiAgICBhbGlnbk92ZXJsYXkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8pXHJcbiAgICAgICAgICAgIERvbUhhbmRsZXIuYWJzb2x1dGVQb3NpdGlvbih0aGlzLm92ZXJsYXksIHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgRG9tSGFuZGxlci5yZWxhdGl2ZVBvc2l0aW9uKHRoaXMub3ZlcmxheSwgdGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXBwZW5kT3ZlcmxheSgpIHtcclxuICAgICAgICBpZiAodGhpcy5hcHBlbmRUbykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hcHBlbmRUbyA9PT0gJ2JvZHknKVxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm92ZXJsYXkpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheSwgdGhpcy5hcHBlbmRUbyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMub3ZlcmxheS5zdHlsZS5taW5XaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5LnN0eWxlLm1pbldpZHRoID0gRG9tSGFuZGxlci5nZXRXaWR0aCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0pICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXN0b3JlT3ZlcmxheUFwcGVuZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5vdmVybGF5ICYmIHRoaXMuYXBwZW5kVG8pIHtcclxuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBiaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAnY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kcm9wZG93bkNsaWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wZG93bkNsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpIHtcclxuICAgICAgICBpZiAodGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKSB7XHJcbiAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gdGhpcy5vbldpbmRvd1Jlc2l6ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1bmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uV2luZG93UmVzaXplKCkge1xyXG4gICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvbk92ZXJsYXlIaWRlKCkge1xyXG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XHJcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCk7XHJcbiAgICAgICAgdGhpcy5vdmVybGF5ID0gbnVsbDtcclxuICAgIH1cclxuICAgICAgICAgXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnJlc3RvcmVPdmVybGF5QXBwZW5kKCk7XHJcbiAgICAgICAgdGhpcy5vbk92ZXJsYXlIaWRlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLEJ1dHRvbk1vZHVsZSxSb3V0ZXJNb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW1NwbGl0QnV0dG9uLEJ1dHRvbk1vZHVsZSxSb3V0ZXJNb2R1bGVdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbU3BsaXRCdXR0b25dXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTcGxpdEJ1dHRvbk1vZHVsZSB7IH1cclxuIl19