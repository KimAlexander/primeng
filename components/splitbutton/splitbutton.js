var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, ElementRef, Input, Output, EventEmitter, Renderer2, ChangeDetectorRef, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';
import { ButtonModule } from '../button/button';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
var SplitButton = /** @class */ (function () {
    function SplitButton(el, renderer, router, cd) {
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
    }
    SplitButton.prototype.onDefaultButtonClick = function (event) {
        this.onClick.emit(event);
    };
    SplitButton.prototype.itemClick = function (event, item) {
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
    };
    SplitButton.prototype.show = function () {
        this.overlayVisible = !this.overlayVisible;
    };
    SplitButton.prototype.onOverlayAnimationStart = function (event) {
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
    };
    SplitButton.prototype.onDropdownButtonClick = function (event) {
        this.onDropdownClick.emit(event);
        this.dropdownClick = true;
        this.show();
    };
    SplitButton.prototype.alignOverlay = function () {
        if (this.appendTo)
            DomHandler.absolutePosition(this.overlay, this.containerViewChild.nativeElement);
        else
            DomHandler.relativePosition(this.overlay, this.containerViewChild.nativeElement);
    };
    SplitButton.prototype.appendOverlay = function () {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.overlay);
            else
                DomHandler.appendChild(this.overlay, this.appendTo);
            this.overlay.style.minWidth = DomHandler.getWidth(this.el.nativeElement.children[0]) + 'px';
        }
    };
    SplitButton.prototype.restoreOverlayAppend = function () {
        if (this.overlay && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    };
    SplitButton.prototype.bindDocumentClickListener = function () {
        var _this = this;
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', function () {
                if (_this.dropdownClick) {
                    _this.dropdownClick = false;
                }
                else {
                    _this.overlayVisible = false;
                    _this.unbindDocumentClickListener();
                    _this.cd.markForCheck();
                }
            });
        }
    };
    SplitButton.prototype.unbindDocumentClickListener = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    };
    SplitButton.prototype.bindDocumentResizeListener = function () {
        this.documentResizeListener = this.onWindowResize.bind(this);
        window.addEventListener('resize', this.documentResizeListener);
    };
    SplitButton.prototype.unbindDocumentResizeListener = function () {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    };
    SplitButton.prototype.onWindowResize = function () {
        this.overlayVisible = false;
    };
    SplitButton.prototype.onOverlayHide = function () {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.overlay = null;
    };
    SplitButton.prototype.ngOnDestroy = function () {
        this.restoreOverlayAppend();
        this.onOverlayHide();
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], SplitButton.prototype, "model", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SplitButton.prototype, "icon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SplitButton.prototype, "iconPos", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SplitButton.prototype, "label", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SplitButton.prototype, "onClick", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SplitButton.prototype, "onDropdownClick", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SplitButton.prototype, "style", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SplitButton.prototype, "styleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SplitButton.prototype, "menuStyle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SplitButton.prototype, "menuStyleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SplitButton.prototype, "disabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], SplitButton.prototype, "tabindex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SplitButton.prototype, "appendTo", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SplitButton.prototype, "dir", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SplitButton.prototype, "showTransitionOptions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SplitButton.prototype, "hideTransitionOptions", void 0);
    __decorate([
        ViewChild('container'),
        __metadata("design:type", ElementRef)
    ], SplitButton.prototype, "containerViewChild", void 0);
    __decorate([
        ViewChild('defaultbtn'),
        __metadata("design:type", ElementRef)
    ], SplitButton.prototype, "buttonViewChild", void 0);
    SplitButton = __decorate([
        Component({
            selector: 'p-splitButton',
            template: "\n        <div #container [ngClass]=\"{'ui-splitbutton ui-buttonset ui-widget':true,'ui-state-disabled':disabled}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <button #defaultbtn type=\"button\" pButton [icon]=\"icon\" [iconPos]=\"iconPos\" [label]=\"label\" [cornerStyleClass]=\"dir === 'rtl' ? 'ui-corner-right': 'ui-corner-left'\" (click)=\"onDefaultButtonClick($event)\" [disabled]=\"disabled\" [attr.tabindex]=\"tabindex\">\n            </button><button type=\"button\" pButton class=\"ui-splitbutton-menubutton\" icon=\"pi pi-chevron-down\" [cornerStyleClass]=\"dir === 'rtl' ? 'ui-corner-left': 'ui-corner-right'\" (click)=\"onDropdownButtonClick($event)\" [disabled]=\"disabled\"></button>\n            <div #overlay [ngClass]=\"'ui-menu ui-menu-dynamic ui-widget ui-widget-content ui-corner-all ui-helper-clearfix ui-shadow'\" *ngIf=\"overlayVisible\"\n                    [ngStyle]=\"menuStyle\" [class]=\"menuStyleClass\"\n                    [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\">\n                <ul class=\"ui-menu-list ui-helper-reset\">\n                    <ng-template ngFor let-item [ngForOf]=\"model\">\n                        <li class=\"ui-menuitem ui-widget ui-corner-all\" role=\"menuitem\" *ngIf=\"item.visible !== false\">\n                            <a *ngIf=\"!item.routerLink\" [attr.href]=\"item.url\" class=\"ui-menuitem-link ui-corner-all\" [attr.target]=\"item.target\"\n                                [ngClass]=\"{'ui-state-disabled':item.disabled}\" (click)=\"itemClick($event, item)\">\n                                <span [ngClass]=\"'ui-menuitem-icon'\" [class]=\"item.icon\" *ngIf=\"item.icon\"></span>\n                                <span class=\"ui-menuitem-text\">{{item.label}}</span>\n                            </a>\n                            <a *ngIf=\"item.routerLink\" [routerLink]=\"item.routerLink\" [queryParams]=\"item.queryParams\"\n                                class=\"ui-menuitem-link ui-corner-all\" [attr.target]=\"item.target\" [ngClass]=\"{'ui-state-disabled':item.disabled}\" (click)=\"itemClick($event, item)\">\n                                <span [ngClass]=\"'ui-menuitem-icon'\" [class]=\"item.icon\" *ngIf=\"item.icon\"></span>\n                                <span class=\"ui-menuitem-text\">{{item.label}}</span>\n                            </a>\n                        </li>\n                    </ng-template>\n                </ul>\n            </div>\n        </div>\n    ",
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
            ]
        }),
        __metadata("design:paramtypes", [ElementRef, Renderer2, Router, ChangeDetectorRef])
    ], SplitButton);
    return SplitButton;
}());
export { SplitButton };
var SplitButtonModule = /** @class */ (function () {
    function SplitButtonModule() {
    }
    SplitButtonModule = __decorate([
        NgModule({
            imports: [CommonModule, ButtonModule, RouterModule],
            exports: [SplitButton, ButtonModule, RouterModule],
            declarations: [SplitButton]
        })
    ], SplitButtonModule);
    return SplitButtonModule;
}());
export { SplitButtonModule };
//# sourceMappingURL=splitbutton.js.map