var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, OnDestroy, Input, Output, EventEmitter, Renderer2, ContentChildren, QueryList, ViewChild, NgZone, ChangeDetectorRef, ViewRef, ChangeDetectionStrategy } from '@angular/core';
import { trigger, style, transition, animate, animation, useAnimation } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { Header, Footer, SharedModule } from 'primeng/api';
import { FocusTrapModule } from 'primeng/focustrap';
let idx = 0;
const showAnimation = animation([
    style({ transform: '{{transform}}', opacity: 0 }),
    animate('{{transition}}', style({ transform: 'none', opacity: 1 }))
]);
const hideAnimation = animation([
    animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 }))
]);
let Dialog = class Dialog {
    constructor(el, renderer, zone, cd) {
        this.el = el;
        this.renderer = renderer;
        this.zone = zone;
        this.cd = cd;
        this.draggable = true;
        this.resizable = true;
        this.closeOnEscape = true;
        this.closable = true;
        this.showHeader = true;
        this.blockScroll = false;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.minX = 0;
        this.minY = 0;
        this.focusOnShow = true;
        this.keepInViewport = true;
        this.focusTrap = true;
        this.transitionOptions = '150ms cubic-bezier(0, 0, 0.2, 1)';
        this.closeIcon = 'pi pi-times';
        this.minimizeIcon = 'pi pi-window-minimize';
        this.maximizeIcon = 'pi pi-window-maximize';
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
        this.visibleChange = new EventEmitter();
        this.onResizeInit = new EventEmitter();
        this.onResizeEnd = new EventEmitter();
        this.id = `ui-dialog-${idx++}`;
        this._style = {};
        this._position = "center";
        this.transformOptions = "scale(0.7)";
    }
    get positionLeft() {
        return 0;
    }
    ;
    set positionLeft(_positionLeft) {
        console.log("positionLeft property is deprecated.");
    }
    get positionTop() {
        return 0;
    }
    ;
    set positionTop(_positionTop) {
        console.log("positionTop property is deprecated.");
    }
    get responsive() {
        return false;
    }
    ;
    set responsive(_responsive) {
        console.log("Responsive property is deprecated.");
    }
    get breakpoint() {
        return 649;
    }
    ;
    set breakpoint(_breakpoint) {
        console.log("Breakpoint property is not utilized and deprecated, use CSS media queries instead.");
    }
    get visible() {
        return this._visible;
    }
    set visible(value) {
        this._visible = value;
        if (this._visible && !this.maskVisible) {
            this.maskVisible = true;
        }
    }
    get style() {
        return this._style;
    }
    set style(value) {
        if (value) {
            this._style = Object.assign({}, value);
            this.originalStyle = value;
        }
    }
    get position() {
        return this._position;
    }
    ;
    set position(value) {
        this._position = value;
        switch (value) {
            case 'topleft':
            case 'bottomleft':
            case 'left':
                this.transformOptions = "translate3d(-100%, 0px, 0px)";
                break;
            case 'topright':
            case 'bottomright':
            case 'right':
                this.transformOptions = "translate3d(100%, 0px, 0px)";
                break;
            case 'bottom':
                this.transformOptions = "translate3d(0px, 100%, 0px)";
                break;
            case 'top':
                this.transformOptions = "translate3d(0px, -100%, 0px)";
                break;
            default:
                this.transformOptions = "scale(0.7)";
                break;
        }
    }
    focus() {
        let focusable = DomHandler.findSingle(this.container, 'button');
        if (focusable) {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => focusable.focus(), 5);
            });
        }
    }
    close(event) {
        this.visibleChange.emit(false);
        event.preventDefault();
    }
    enableModality() {
        if (this.closable && this.dismissableMask) {
            this.maskClickListener = this.renderer.listen(this.wrapper, 'click', (event) => {
                if (!this.container.isSameNode(event.target) && !this.container.contains(event.target)) {
                    this.close(event);
                }
            });
        }
        if (this.modal) {
            DomHandler.addClass(document.body, 'ui-overflow-hidden');
        }
    }
    disableModality() {
        if (this.wrapper) {
            if (this.dismissableMask) {
                this.unbindMaskClickListener();
            }
            if (this.modal) {
                DomHandler.removeClass(document.body, 'ui-overflow-hidden');
            }
            if (!this.cd.destroyed) {
                this.cd.detectChanges();
            }
        }
    }
    maximize() {
        this.maximized = !this.maximized;
        if (!this.modal && !this.blockScroll) {
            if (this.maximized)
                DomHandler.addClass(document.body, 'ui-overflow-hidden');
            else
                DomHandler.removeClass(document.body, 'ui-overflow-hidden');
        }
    }
    unbindMaskClickListener() {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    }
    moveOnTop() {
        if (this.autoZIndex) {
            this.container.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
            this.wrapper.style.zIndex = String(this.baseZIndex + (DomHandler.zindex - 1));
        }
    }
    getMaskClass() {
        let maskClass = { 'ui-dialog-mask': true, 'ui-widget-overlay': this.modal, 'ui-dialog-visible': this.maskVisible, 'ui-dialog-mask-scrollblocker': this.modal || this.blockScroll };
        maskClass[this.getPositionClass().toString()] = true;
        return maskClass;
    }
    getPositionClass() {
        const positions = ['left', 'right', 'top', 'topleft', 'topright', 'bottom', 'bottomleft', 'bottomright'];
        const pos = positions.find(item => item === this.position);
        return pos ? `ui-dialog-${pos}` : '';
    }
    initDrag(event) {
        if (DomHandler.hasClass(event.target, 'ui-dialog-titlebar-icon') || DomHandler.hasClass(event.target.parentElement, 'ui-dialog-titlebar-icon')) {
            return;
        }
        if (this.draggable) {
            this.dragging = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
            if (!DomHandler.isIE()) {
                this.container.style.position = 'fixed';
            }
            this.container.style.margin = '0';
            DomHandler.addClass(document.body, 'ui-unselectable-text');
        }
    }
    onKeydown(event) {
        if (this.focusTrap) {
            if (event.which === 9) {
                event.preventDefault();
                let focusableElements = DomHandler.getFocusableElements(this.container);
                if (focusableElements && focusableElements.length > 0) {
                    if (!document.activeElement) {
                        focusableElements[0].focus();
                    }
                    else {
                        let focusedIndex = focusableElements.indexOf(document.activeElement);
                        if (event.shiftKey) {
                            if (focusedIndex == -1 || focusedIndex === 0)
                                focusableElements[focusableElements.length - 1].focus();
                            else
                                focusableElements[focusedIndex - 1].focus();
                        }
                        else {
                            if (focusedIndex == -1 || focusedIndex === (focusableElements.length - 1))
                                focusableElements[0].focus();
                            else
                                focusableElements[focusedIndex + 1].focus();
                        }
                    }
                }
            }
        }
    }
    onDrag(event) {
        if (this.dragging) {
            let containerWidth = DomHandler.getOuterWidth(this.container);
            let containerHeight = DomHandler.getOuterHeight(this.container);
            let deltaX = event.pageX - this.lastPageX;
            let deltaY = event.pageY - this.lastPageY;
            let offset = DomHandler.getOffset(this.container);
            let leftPos = offset.left + deltaX;
            let topPos = offset.top + deltaY;
            let viewport = DomHandler.getViewport();
            if (this.keepInViewport) {
                if (leftPos >= this.minX && (leftPos + containerWidth) < viewport.width) {
                    this._style.left = leftPos + 'px';
                    this.lastPageX = event.pageX;
                    this.container.style.left = leftPos + 'px';
                }
                if (topPos >= this.minY && (topPos + containerHeight) < viewport.height) {
                    this._style.top = topPos + 'px';
                    this.lastPageY = event.pageY;
                    this.container.style.top = topPos + 'px';
                }
            }
            else {
                this.lastPageX = event.pageX;
                this.container.style.left = leftPos + 'px';
                this.lastPageY = event.pageY;
                this.container.style.top = topPos + 'px';
            }
            if (DomHandler.isIE() && this.container.style.position != 'fixed' && this.container.style.top && this.container.style.left) {
                this.container.style.position = 'fixed';
            }
        }
    }
    endDrag(event) {
        if (this.draggable) {
            this.dragging = false;
            DomHandler.removeClass(document.body, 'ui-unselectable-text');
            this.cd.detectChanges();
        }
    }
    resetPosition() {
        this.container.style.left = '';
        this.container.style.top = '';
        this.container.style.margin = '';
    }
    initResize(event) {
        if (this.resizable) {
            this.resizing = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
            DomHandler.addClass(document.body, 'ui-unselectable-text');
            this.onResizeInit.emit(event);
        }
    }
    onResize(event) {
        if (this.resizing) {
            let deltaX = event.pageX - this.lastPageX;
            let deltaY = event.pageY - this.lastPageY;
            let containerWidth = DomHandler.getOuterWidth(this.container);
            let containerHeight = DomHandler.getOuterHeight(this.container);
            let contentHeight = DomHandler.getOuterHeight(this.contentViewChild.nativeElement);
            let newWidth = containerWidth + deltaX;
            let newHeight = containerHeight + deltaY;
            let minWidth = this.container.style.minWidth;
            let minHeight = this.container.style.minHeight;
            let offset = DomHandler.getOffset(this.container);
            let viewport = DomHandler.getViewport();
            if ((!minWidth || newWidth > parseInt(minWidth)) && (offset.left + newWidth) < viewport.width) {
                this._style.width = newWidth + 'px';
                this.container.style.width = this._style.width;
            }
            if ((!minHeight || newHeight > parseInt(minHeight)) && (offset.top + newHeight) < viewport.height) {
                this.contentViewChild.nativeElement.style.height = contentHeight + deltaY + 'px';
            }
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    }
    resizeEnd(event) {
        if (this.resizing) {
            this.resizing = false;
            DomHandler.removeClass(document.body, 'ui-unselectable-text');
            this.onResizeEnd.emit(event);
        }
    }
    bindGlobalListeners() {
        if (this.draggable) {
            this.bindDocumentDragListener();
            this.bindDocumentDragEndListener();
        }
        if (this.resizable) {
            this.bindDocumentResizeListeners();
        }
        if (this.closeOnEscape && this.closable) {
            this.bindDocumentEscapeListener();
        }
    }
    unbindGlobalListeners() {
        this.unbindDocumentDragListener();
        this.unbindDocumentDragEndListener();
        this.unbindDocumentResizeListeners();
        this.unbindDocumentEscapeListener();
    }
    bindDocumentDragListener() {
        this.zone.runOutsideAngular(() => {
            this.documentDragListener = this.onDrag.bind(this);
            window.document.addEventListener('mousemove', this.documentDragListener);
        });
    }
    unbindDocumentDragListener() {
        if (this.documentDragListener) {
            window.document.removeEventListener('mousemove', this.documentDragListener);
            this.documentDragListener = null;
        }
    }
    bindDocumentDragEndListener() {
        this.zone.runOutsideAngular(() => {
            this.documentDragEndListener = this.endDrag.bind(this);
            window.document.addEventListener('mouseup', this.documentDragEndListener);
        });
    }
    unbindDocumentDragEndListener() {
        if (this.documentDragEndListener) {
            window.document.removeEventListener('mouseup', this.documentDragEndListener);
            this.documentDragEndListener = null;
        }
    }
    bindDocumentResizeListeners() {
        this.zone.runOutsideAngular(() => {
            this.documentResizeListener = this.onResize.bind(this);
            this.documentResizeEndListener = this.resizeEnd.bind(this);
            window.document.addEventListener('mousemove', this.documentResizeListener);
            window.document.addEventListener('mouseup', this.documentResizeEndListener);
        });
    }
    unbindDocumentResizeListeners() {
        if (this.documentResizeListener && this.documentResizeEndListener) {
            window.document.removeEventListener('mousemove', this.documentResizeListener);
            window.document.removeEventListener('mouseup', this.documentResizeEndListener);
            this.documentResizeListener = null;
            this.documentResizeEndListener = null;
        }
    }
    bindDocumentEscapeListener() {
        this.documentEscapeListener = this.renderer.listen('document', 'keydown', (event) => {
            if (event.which == 27) {
                if (parseInt(this.container.style.zIndex) === (DomHandler.zindex + this.baseZIndex)) {
                    this.close(event);
                }
            }
        });
    }
    unbindDocumentEscapeListener() {
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
    }
    appendContainer() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.wrapper);
            else
                DomHandler.appendChild(this.wrapper, this.appendTo);
        }
    }
    restoreAppend() {
        if (this.container && this.appendTo) {
            this.el.nativeElement.appendChild(this.wrapper);
        }
    }
    onAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                this.container = event.element;
                this.wrapper = this.container.parentElement;
                this.onShow.emit({});
                this.appendContainer();
                this.moveOnTop();
                this.bindGlobalListeners();
                if (this.modal) {
                    this.enableModality();
                }
                if (!this.modal && this.blockScroll) {
                    DomHandler.addClass(document.body, 'ui-overflow-hidden');
                }
                if (this.focusOnShow) {
                    this.focus();
                }
                break;
        }
    }
    onAnimationEnd(event) {
        switch (event.toState) {
            case 'void':
                this.onContainerDestroy();
                this.onHide.emit({});
                break;
        }
    }
    onContainerDestroy() {
        this.unbindGlobalListeners();
        this.dragging = false;
        this.maskVisible = false;
        if (this.maximized) {
            DomHandler.removeClass(document.body, 'ui-overflow-hidden');
            this.maximized = false;
        }
        if (this.modal) {
            this.disableModality();
        }
        if (this.blockScroll) {
            DomHandler.removeClass(document.body, 'ui-overflow-hidden');
        }
        this.container = null;
        this.wrapper = null;
        this._style = this.originalStyle ? Object.assign({}, this.originalStyle) : {};
    }
    ngOnDestroy() {
        if (this.container) {
            this.restoreAppend();
            this.onContainerDestroy();
        }
    }
};
Dialog.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgZone },
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], Dialog.prototype, "header", void 0);
__decorate([
    Input()
], Dialog.prototype, "draggable", void 0);
__decorate([
    Input()
], Dialog.prototype, "resizable", void 0);
__decorate([
    Input()
], Dialog.prototype, "positionLeft", null);
__decorate([
    Input()
], Dialog.prototype, "positionTop", null);
__decorate([
    Input()
], Dialog.prototype, "contentStyle", void 0);
__decorate([
    Input()
], Dialog.prototype, "modal", void 0);
__decorate([
    Input()
], Dialog.prototype, "closeOnEscape", void 0);
__decorate([
    Input()
], Dialog.prototype, "dismissableMask", void 0);
__decorate([
    Input()
], Dialog.prototype, "rtl", void 0);
__decorate([
    Input()
], Dialog.prototype, "closable", void 0);
__decorate([
    Input()
], Dialog.prototype, "responsive", null);
__decorate([
    Input()
], Dialog.prototype, "appendTo", void 0);
__decorate([
    Input()
], Dialog.prototype, "styleClass", void 0);
__decorate([
    Input()
], Dialog.prototype, "maskStyleClass", void 0);
__decorate([
    Input()
], Dialog.prototype, "showHeader", void 0);
__decorate([
    Input()
], Dialog.prototype, "breakpoint", null);
__decorate([
    Input()
], Dialog.prototype, "blockScroll", void 0);
__decorate([
    Input()
], Dialog.prototype, "autoZIndex", void 0);
__decorate([
    Input()
], Dialog.prototype, "baseZIndex", void 0);
__decorate([
    Input()
], Dialog.prototype, "minX", void 0);
__decorate([
    Input()
], Dialog.prototype, "minY", void 0);
__decorate([
    Input()
], Dialog.prototype, "focusOnShow", void 0);
__decorate([
    Input()
], Dialog.prototype, "maximizable", void 0);
__decorate([
    Input()
], Dialog.prototype, "keepInViewport", void 0);
__decorate([
    Input()
], Dialog.prototype, "focusTrap", void 0);
__decorate([
    Input()
], Dialog.prototype, "transitionOptions", void 0);
__decorate([
    Input()
], Dialog.prototype, "closeIcon", void 0);
__decorate([
    Input()
], Dialog.prototype, "minimizeIcon", void 0);
__decorate([
    Input()
], Dialog.prototype, "maximizeIcon", void 0);
__decorate([
    ContentChildren(Header, { descendants: false })
], Dialog.prototype, "headerFacet", void 0);
__decorate([
    ContentChildren(Footer, { descendants: false })
], Dialog.prototype, "footerFacet", void 0);
__decorate([
    ViewChild('titlebar')
], Dialog.prototype, "headerViewChild", void 0);
__decorate([
    ViewChild('content')
], Dialog.prototype, "contentViewChild", void 0);
__decorate([
    ViewChild('footer')
], Dialog.prototype, "footerViewChild", void 0);
__decorate([
    Output()
], Dialog.prototype, "onShow", void 0);
__decorate([
    Output()
], Dialog.prototype, "onHide", void 0);
__decorate([
    Output()
], Dialog.prototype, "visibleChange", void 0);
__decorate([
    Output()
], Dialog.prototype, "onResizeInit", void 0);
__decorate([
    Output()
], Dialog.prototype, "onResizeEnd", void 0);
__decorate([
    Input()
], Dialog.prototype, "visible", null);
__decorate([
    Input()
], Dialog.prototype, "style", null);
__decorate([
    Input()
], Dialog.prototype, "position", null);
Dialog = __decorate([
    Component({
        selector: 'p-dialog',
        template: `
        <div [class]="maskStyleClass" [ngClass]="getMaskClass()" *ngIf="maskVisible">
            <div #container [ngClass]="{'ui-dialog ui-widget ui-widget-content ui-corner-all ui-shadow':true, 'ui-dialog-rtl':rtl,'ui-dialog-draggable':draggable,'ui-dialog-resizable':resizable, 'ui-dialog-maximized': maximized}"
                [ngStyle]="style" [class]="styleClass" *ngIf="visible" pFocusTrap [pFocusTrapDisabled]="focusTrap === false"
                [@animation]="{value: 'visible', params: {transform: transformOptions, transition: transitionOptions}}" (@animation.start)="onAnimationStart($event)" (@animation.done)="onAnimationEnd($event)" role="dialog" [attr.aria-labelledby]="id + '-label'">
                <div #titlebar class="ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top" (mousedown)="initDrag($event)" *ngIf="showHeader">
                    <span [attr.id]="id + '-label'" class="ui-dialog-title" *ngIf="header">{{header}}</span>
                    <span [attr.id]="id + '-label'" class="ui-dialog-title" *ngIf="headerFacet && headerFacet.first">
                        <ng-content select="p-header"></ng-content>
                    </span>
                    <div class="ui-dialog-titlebar-icons">
                        <a *ngIf="maximizable" [ngClass]="{'ui-dialog-titlebar-icon ui-dialog-titlebar-maximize ui-corner-all':true}" tabindex="0" role="button" (click)="maximize()" (keydown.enter)="maximize()">
                            <span [ngClass]="maximized ? minimizeIcon : maximizeIcon"></span>
                        </a>
                        <a *ngIf="closable" [ngClass]="{'ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all':true}" tabindex="0" role="button" (click)="close($event)" (keydown.enter)="close($event)">
                            <span [class]="closeIcon"></span>
                        </a>
                    </div>
                </div>
                <div #content class="ui-dialog-content ui-widget-content" [ngStyle]="contentStyle">
                    <ng-content></ng-content>
                </div>
                <div #footer class="ui-dialog-footer ui-widget-content" *ngIf="footerFacet && footerFacet.first">
                    <ng-content select="p-footer"></ng-content>
                </div>
                <div *ngIf="resizable" class="ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se" style="z-index: 90;" (mousedown)="initResize($event)"></div>
            </div>
        </div>
    `,
        animations: [
            trigger('animation', [
                transition('void => visible', [
                    useAnimation(showAnimation)
                ]),
                transition('visible => void', [
                    useAnimation(hideAnimation)
                ])
            ])
        ],
        changeDetection: ChangeDetectionStrategy.Default
    })
], Dialog);
export { Dialog };
let DialogModule = class DialogModule {
};
DialogModule = __decorate([
    NgModule({
        imports: [CommonModule, FocusTrapModule],
        exports: [Dialog, SharedModule],
        declarations: [Dialog]
    })
], DialogModule);
export { DialogModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9kaWFsb2cvIiwic291cmNlcyI6WyJkaWFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxTQUFTLEVBQy9FLGVBQWUsRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBRSxpQkFBaUIsRUFBQyxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEgsT0FBTyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBa0IsU0FBUyxFQUFFLFlBQVksRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzlHLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN2RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFbEQsSUFBSSxHQUFHLEdBQVcsQ0FBQyxDQUFDO0FBRXBCLE1BQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQztJQUM1QixLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNqRCxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztDQUN0RSxDQUFDLENBQUM7QUFFSCxNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUM7SUFDNUIsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxFQUFFLFNB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O29CQUMxQixZQUFZLENBQUMsYUFBYSxDQUFDO2lCQUM5QixDQUFDO2FBQ0wsQ0FBQztTQUNMO1FBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87S0FDbkQsQ0FBQztHQUNXLE1BQU0sQ0FnbUJsQjtTQWhtQlksTUFBTTtBQXVtQm5CLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7Q0FBSSxDQUFBO0FBQWhCLFlBQVk7SUFMeEIsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFDLGVBQWUsQ0FBQztRQUN2QyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUMsWUFBWSxDQUFDO1FBQzlCLFlBQVksRUFBRSxDQUFDLE1BQU0sQ0FBQztLQUN6QixDQUFDO0dBQ1csWUFBWSxDQUFJO1NBQWhCLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxFbGVtZW50UmVmLE9uRGVzdHJveSxJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyLFJlbmRlcmVyMixcclxuICAgIENvbnRlbnRDaGlsZHJlbixRdWVyeUxpc3QsVmlld0NoaWxkLE5nWm9uZSwgQ2hhbmdlRGV0ZWN0b3JSZWYsVmlld1JlZixDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7dHJpZ2dlcixzdHlsZSx0cmFuc2l0aW9uLGFuaW1hdGUsIEFuaW1hdGlvbkV2ZW50LCBhbmltYXRpb24sIHVzZUFuaW1hdGlvbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcclxuaW1wb3J0IHtIZWFkZXIsRm9vdGVyLFNoYXJlZE1vZHVsZX0gZnJvbSAncHJpbWVuZy9hcGknO1xyXG5pbXBvcnQge0ZvY3VzVHJhcE1vZHVsZX0gZnJvbSAncHJpbWVuZy9mb2N1c3RyYXAnO1xyXG5cclxubGV0IGlkeDogbnVtYmVyID0gMDtcclxuXHJcbmNvbnN0IHNob3dBbmltYXRpb24gPSBhbmltYXRpb24oW1xyXG4gICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd7e3RyYW5zZm9ybX19Jywgb3BhY2l0eTogMCB9KSxcclxuICAgIGFuaW1hdGUoJ3t7dHJhbnNpdGlvbn19Jywgc3R5bGUoeyB0cmFuc2Zvcm06ICdub25lJywgb3BhY2l0eTogMSB9KSlcclxuXSk7XHJcblxyXG5jb25zdCBoaWRlQW5pbWF0aW9uID0gYW5pbWF0aW9uKFtcclxuICAgIGFuaW1hdGUoJ3t7dHJhbnNpdGlvbn19Jywgc3R5bGUoeyB0cmFuc2Zvcm06ICd7e3RyYW5zZm9ybX19Jywgb3BhY2l0eTogMCB9KSlcclxuXSk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC1kaWFsb2cnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IFtjbGFzc109XCJtYXNrU3R5bGVDbGFzc1wiIFtuZ0NsYXNzXT1cImdldE1hc2tDbGFzcygpXCIgKm5nSWY9XCJtYXNrVmlzaWJsZVwiPlxyXG4gICAgICAgICAgICA8ZGl2ICNjb250YWluZXIgW25nQ2xhc3NdPVwieyd1aS1kaWFsb2cgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwgdWktc2hhZG93Jzp0cnVlLCAndWktZGlhbG9nLXJ0bCc6cnRsLCd1aS1kaWFsb2ctZHJhZ2dhYmxlJzpkcmFnZ2FibGUsJ3VpLWRpYWxvZy1yZXNpemFibGUnOnJlc2l6YWJsZSwgJ3VpLWRpYWxvZy1tYXhpbWl6ZWQnOiBtYXhpbWl6ZWR9XCJcclxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiAqbmdJZj1cInZpc2libGVcIiBwRm9jdXNUcmFwIFtwRm9jdXNUcmFwRGlzYWJsZWRdPVwiZm9jdXNUcmFwID09PSBmYWxzZVwiXHJcbiAgICAgICAgICAgICAgICBbQGFuaW1hdGlvbl09XCJ7dmFsdWU6ICd2aXNpYmxlJywgcGFyYW1zOiB7dHJhbnNmb3JtOiB0cmFuc2Zvcm1PcHRpb25zLCB0cmFuc2l0aW9uOiB0cmFuc2l0aW9uT3B0aW9uc319XCIgKEBhbmltYXRpb24uc3RhcnQpPVwib25BbmltYXRpb25TdGFydCgkZXZlbnQpXCIgKEBhbmltYXRpb24uZG9uZSk9XCJvbkFuaW1hdGlvbkVuZCgkZXZlbnQpXCIgcm9sZT1cImRpYWxvZ1wiIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJpZCArICctbGFiZWwnXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2ICN0aXRsZWJhciBjbGFzcz1cInVpLWRpYWxvZy10aXRsZWJhciB1aS13aWRnZXQtaGVhZGVyIHVpLWhlbHBlci1jbGVhcmZpeCB1aS1jb3JuZXItdG9wXCIgKG1vdXNlZG93bik9XCJpbml0RHJhZygkZXZlbnQpXCIgKm5nSWY9XCJzaG93SGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gW2F0dHIuaWRdPVwiaWQgKyAnLWxhYmVsJ1wiIGNsYXNzPVwidWktZGlhbG9nLXRpdGxlXCIgKm5nSWY9XCJoZWFkZXJcIj57e2hlYWRlcn19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIFthdHRyLmlkXT1cImlkICsgJy1sYWJlbCdcIiBjbGFzcz1cInVpLWRpYWxvZy10aXRsZVwiICpuZ0lmPVwiaGVhZGVyRmFjZXQgJiYgaGVhZGVyRmFjZXQuZmlyc3RcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwicC1oZWFkZXJcIj48L25nLWNvbnRlbnQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1kaWFsb2ctdGl0bGViYXItaWNvbnNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgKm5nSWY9XCJtYXhpbWl6YWJsZVwiIFtuZ0NsYXNzXT1cInsndWktZGlhbG9nLXRpdGxlYmFyLWljb24gdWktZGlhbG9nLXRpdGxlYmFyLW1heGltaXplIHVpLWNvcm5lci1hbGwnOnRydWV9XCIgdGFiaW5kZXg9XCIwXCIgcm9sZT1cImJ1dHRvblwiIChjbGljayk9XCJtYXhpbWl6ZSgpXCIgKGtleWRvd24uZW50ZXIpPVwibWF4aW1pemUoKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gW25nQ2xhc3NdPVwibWF4aW1pemVkID8gbWluaW1pemVJY29uIDogbWF4aW1pemVJY29uXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwiY2xvc2FibGVcIiBbbmdDbGFzc109XCJ7J3VpLWRpYWxvZy10aXRsZWJhci1pY29uIHVpLWRpYWxvZy10aXRsZWJhci1jbG9zZSB1aS1jb3JuZXItYWxsJzp0cnVlfVwiIHRhYmluZGV4PVwiMFwiIHJvbGU9XCJidXR0b25cIiAoY2xpY2spPVwiY2xvc2UoJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cImNsb3NlKCRldmVudClcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIFtjbGFzc109XCJjbG9zZUljb25cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiAjY29udGVudCBjbGFzcz1cInVpLWRpYWxvZy1jb250ZW50IHVpLXdpZGdldC1jb250ZW50XCIgW25nU3R5bGVdPVwiY29udGVudFN0eWxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2ICNmb290ZXIgY2xhc3M9XCJ1aS1kaWFsb2ctZm9vdGVyIHVpLXdpZGdldC1jb250ZW50XCIgKm5nSWY9XCJmb290ZXJGYWNldCAmJiBmb290ZXJGYWNldC5maXJzdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtZm9vdGVyXCI+PC9uZy1jb250ZW50PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwicmVzaXphYmxlXCIgY2xhc3M9XCJ1aS1yZXNpemFibGUtaGFuZGxlIHVpLXJlc2l6YWJsZS1zZSB1aS1pY29uIHVpLWljb24tZ3JpcHNtYWxsLWRpYWdvbmFsLXNlXCIgc3R5bGU9XCJ6LWluZGV4OiA5MDtcIiAobW91c2Vkb3duKT1cImluaXRSZXNpemUoJGV2ZW50KVwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgICAgdHJpZ2dlcignYW5pbWF0aW9uJywgW1xyXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHZpc2libGUnLCBbXHJcbiAgICAgICAgICAgICAgICB1c2VBbmltYXRpb24oc2hvd0FuaW1hdGlvbilcclxuICAgICAgICAgICAgXSksXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3Zpc2libGUgPT4gdm9pZCcsIFtcclxuICAgICAgICAgICAgICAgIHVzZUFuaW1hdGlvbihoaWRlQW5pbWF0aW9uKVxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgIF0pXHJcbiAgICBdLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEaWFsb2cgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG5cclxuICAgIEBJbnB1dCgpIGhlYWRlcjogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGRyYWdnYWJsZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgQElucHV0KCkgcmVzaXphYmxlOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcblxyXG4gICAgQElucHV0KCkgZ2V0IHBvc2l0aW9uTGVmdCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfTtcclxuXHJcbiAgICBzZXQgcG9zaXRpb25MZWZ0KF9wb3NpdGlvbkxlZnQ6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicG9zaXRpb25MZWZ0IHByb3BlcnR5IGlzIGRlcHJlY2F0ZWQuXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIGdldCBwb3NpdGlvblRvcCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfTtcclxuXHJcbiAgICBzZXQgcG9zaXRpb25Ub3AoX3Bvc2l0aW9uVG9wOiBudW1iZXIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInBvc2l0aW9uVG9wIHByb3BlcnR5IGlzIGRlcHJlY2F0ZWQuXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIGNvbnRlbnRTdHlsZTogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIG1vZGFsOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIGNsb3NlT25Fc2NhcGU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIGRpc21pc3NhYmxlTWFzazogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSBydGw6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgY2xvc2FibGU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIGdldCByZXNwb25zaXZlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgc2V0IHJlc3BvbnNpdmUoX3Jlc3BvbnNpdmU6IGJvb2xlYW4pIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlJlc3BvbnNpdmUgcHJvcGVydHkgaXMgZGVwcmVjYXRlZC5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgYXBwZW5kVG86IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgbWFza1N0eWxlQ2xhc3M6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBzaG93SGVhZGVyOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBASW5wdXQoKSBnZXQgYnJlYWtwb2ludCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiA2NDk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNldCBicmVha3BvaW50KF9icmVha3BvaW50OiBudW1iZXIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkJyZWFrcG9pbnQgcHJvcGVydHkgaXMgbm90IHV0aWxpemVkIGFuZCBkZXByZWNhdGVkLCB1c2UgQ1NTIG1lZGlhIHF1ZXJpZXMgaW5zdGVhZC5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgYmxvY2tTY3JvbGw6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBASW5wdXQoKSBhdXRvWkluZGV4OiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBASW5wdXQoKSBiYXNlWkluZGV4OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIEBJbnB1dCgpIG1pblg6IG51bWJlciA9IDA7XHJcblxyXG4gICAgQElucHV0KCkgbWluWTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBASW5wdXQoKSBmb2N1c09uU2hvdzogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgQElucHV0KCkgbWF4aW1pemFibGU6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkga2VlcEluVmlld3BvcnQ6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIGZvY3VzVHJhcDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgQElucHV0KCkgdHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICcxNTBtcyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKSc7XHJcblxyXG4gICAgQElucHV0KCkgY2xvc2VJY29uOiBzdHJpbmcgPSAncGkgcGktdGltZXMnO1xyXG5cclxuICAgIEBJbnB1dCgpIG1pbmltaXplSWNvbjogc3RyaW5nID0gJ3BpIHBpLXdpbmRvdy1taW5pbWl6ZSc7XHJcblxyXG4gICAgQElucHV0KCkgbWF4aW1pemVJY29uOiBzdHJpbmcgPSAncGkgcGktd2luZG93LW1heGltaXplJztcclxuXHJcbiAgICBAQ29udGVudENoaWxkcmVuKEhlYWRlciwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pIGhlYWRlckZhY2V0OiBRdWVyeUxpc3Q8SGVhZGVyPjtcclxuXHJcbiAgICBAQ29udGVudENoaWxkcmVuKEZvb3Rlciwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pIGZvb3RlckZhY2V0OiBRdWVyeUxpc3Q8SGVhZGVyPjtcclxuXHJcbiAgICBAVmlld0NoaWxkKCd0aXRsZWJhcicpIGhlYWRlclZpZXdDaGlsZDogRWxlbWVudFJlZjtcclxuXHJcbiAgICBAVmlld0NoaWxkKCdjb250ZW50JykgY29udGVudFZpZXdDaGlsZDogRWxlbWVudFJlZjtcclxuXHJcbiAgICBAVmlld0NoaWxkKCdmb290ZXInKSBmb290ZXJWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uU2hvdzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uSGlkZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIHZpc2libGVDaGFuZ2U6RXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uUmVzaXplSW5pdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uUmVzaXplRW5kOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBfdmlzaWJsZTogYm9vbGVhbjtcclxuXHJcbiAgICBtYXNrVmlzaWJsZTogYm9vbGVhbjtcclxuXHJcbiAgICBjb250YWluZXI6IEhUTUxEaXZFbGVtZW50O1xyXG5cclxuICAgIHdyYXBwZXI6IEhUTUxFbGVtZW50O1xyXG5cclxuICAgIGRyYWdnaW5nOiBib29sZWFuO1xyXG5cclxuICAgIGRvY3VtZW50RHJhZ0xpc3RlbmVyOiBhbnk7XHJcblxyXG4gICAgZG9jdW1lbnREcmFnRW5kTGlzdGVuZXI6IGFueTtcclxuXHJcbiAgICByZXNpemluZzogYm9vbGVhbjtcclxuXHJcbiAgICBkb2N1bWVudFJlc2l6ZUxpc3RlbmVyOiBhbnk7XHJcblxyXG4gICAgZG9jdW1lbnRSZXNpemVFbmRMaXN0ZW5lcjogYW55O1xyXG5cclxuICAgIGRvY3VtZW50RXNjYXBlTGlzdGVuZXI6IEZ1bmN0aW9uO1xyXG5cclxuICAgIG1hc2tDbGlja0xpc3RlbmVyOiBGdW5jdGlvbjtcclxuXHJcbiAgICBsYXN0UGFnZVg6IG51bWJlcjtcclxuXHJcbiAgICBsYXN0UGFnZVk6IG51bWJlcjtcclxuXHJcbiAgICBwcmV2ZW50VmlzaWJsZUNoYW5nZVByb3BhZ2F0aW9uOiBib29sZWFuO1xyXG5cclxuICAgIG1heGltaXplZDogYm9vbGVhbjtcclxuXHJcbiAgICBwcmVNYXhpbWl6ZUNvbnRlbnRIZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgICBwcmVNYXhpbWl6ZUNvbnRhaW5lcldpZHRoOiBudW1iZXI7XHJcblxyXG4gICAgcHJlTWF4aW1pemVDb250YWluZXJIZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgICBwcmVNYXhpbWl6ZVBhZ2VYOiBudW1iZXI7XHJcblxyXG4gICAgcHJlTWF4aW1pemVQYWdlWTogbnVtYmVyO1xyXG5cclxuICAgIGlkOiBzdHJpbmcgPSBgdWktZGlhbG9nLSR7aWR4Kyt9YDtcclxuXHJcbiAgICBfc3R5bGU6IGFueSA9IHt9O1xyXG5cclxuICAgIF9wb3NpdGlvbjogc3RyaW5nID0gXCJjZW50ZXJcIjtcclxuXHJcbiAgICBvcmlnaW5hbFN0eWxlOiBhbnk7XHJcblxyXG4gICAgdHJhbnNmb3JtT3B0aW9uczogYW55ID0gXCJzY2FsZSgwLjcpXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHVibGljIHpvbmU6IE5nWm9uZSwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHsgfVxyXG5cclxuICAgIEBJbnB1dCgpIGdldCB2aXNpYmxlKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Zpc2libGU7XHJcbiAgICB9XHJcbiAgICBzZXQgdmlzaWJsZSh2YWx1ZTphbnkpIHtcclxuICAgICAgICB0aGlzLl92aXNpYmxlID0gdmFsdWU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl92aXNpYmxlICYmICF0aGlzLm1hc2tWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFza1Zpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBnZXQgc3R5bGUoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3R5bGU7XHJcbiAgICB9XHJcbiAgICBzZXQgc3R5bGUodmFsdWU6YW55KSB7XHJcbiAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N0eWxlID0gey4uLnZhbHVlfTtcclxuICAgICAgICAgICAgdGhpcy5vcmlnaW5hbFN0eWxlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIGdldCBwb3NpdGlvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbjtcclxuICAgIH07XHJcblxyXG4gICAgc2V0IHBvc2l0aW9uKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IHZhbHVlO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RvcGxlZnQnOlxyXG4gICAgICAgICAgICBjYXNlICdib3R0b21sZWZ0JzpcclxuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zZm9ybU9wdGlvbnMgPSBcInRyYW5zbGF0ZTNkKC0xMDAlLCAwcHgsIDBweClcIjtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RvcHJpZ2h0JzpcclxuICAgICAgICAgICAgY2FzZSAnYm90dG9tcmlnaHQnOlxyXG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zZm9ybU9wdGlvbnMgPSBcInRyYW5zbGF0ZTNkKDEwMCUsIDBweCwgMHB4KVwiO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYm90dG9tJzpcclxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtT3B0aW9ucyA9IFwidHJhbnNsYXRlM2QoMHB4LCAxMDAlLCAwcHgpXCI7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd0b3AnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm1PcHRpb25zID0gXCJ0cmFuc2xhdGUzZCgwcHgsIC0xMDAlLCAwcHgpXCI7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm1PcHRpb25zID0gXCJzY2FsZSgwLjcpXCI7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb2N1cygpIHtcclxuICAgICAgICBsZXQgZm9jdXNhYmxlID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuY29udGFpbmVyLCAnYnV0dG9uJyk7XHJcbiAgICAgICAgaWYgKGZvY3VzYWJsZSkge1xyXG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBmb2N1c2FibGUuZm9jdXMoKSwgNSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbG9zZShldmVudDogRXZlbnQpIHtcclxuICAgICAgICB0aGlzLnZpc2libGVDaGFuZ2UuZW1pdChmYWxzZSk7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBlbmFibGVNb2RhbGl0eSgpIHtcclxuICAgICAgICBpZiAodGhpcy5jbG9zYWJsZSAmJiB0aGlzLmRpc21pc3NhYmxlTWFzaykge1xyXG4gICAgICAgICAgICB0aGlzLm1hc2tDbGlja0xpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy53cmFwcGVyLCAnY2xpY2snLCAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvbnRhaW5lci5pc1NhbWVOb2RlKGV2ZW50LnRhcmdldCkgJiYgIXRoaXMuY29udGFpbmVyLmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5tb2RhbCkge1xyXG4gICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKGRvY3VtZW50LmJvZHksICd1aS1vdmVyZmxvdy1oaWRkZW4nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZU1vZGFsaXR5KCkge1xyXG4gICAgICAgIGlmICh0aGlzLndyYXBwZXIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGlzbWlzc2FibGVNYXNrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuYmluZE1hc2tDbGlja0xpc3RlbmVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGFsKSB7XHJcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksICd1aS1vdmVyZmxvdy1oaWRkZW4nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCEodGhpcy5jZCBhcyBWaWV3UmVmKS5kZXN0cm95ZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1heGltaXplKCkge1xyXG4gICAgICAgIHRoaXMubWF4aW1pemVkID0gIXRoaXMubWF4aW1pemVkO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMubW9kYWwgJiYgIXRoaXMuYmxvY2tTY3JvbGwpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWF4aW1pemVkKVxyXG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCAndWktb3ZlcmZsb3ctaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ3VpLW92ZXJmbG93LWhpZGRlbicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1bmJpbmRNYXNrQ2xpY2tMaXN0ZW5lcigpIHtcclxuICAgICAgICBpZiAodGhpcy5tYXNrQ2xpY2tMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLm1hc2tDbGlja0xpc3RlbmVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMubWFza0NsaWNrTGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb3ZlT25Ub3AoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYXV0b1pJbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS56SW5kZXggPSBTdHJpbmcodGhpcy5iYXNlWkluZGV4ICsgKCsrRG9tSGFuZGxlci56aW5kZXgpKTtcclxuICAgICAgICAgICAgdGhpcy53cmFwcGVyLnN0eWxlLnpJbmRleCA9IFN0cmluZyh0aGlzLmJhc2VaSW5kZXggKyAoRG9tSGFuZGxlci56aW5kZXggLSAxKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldE1hc2tDbGFzcygpIHtcclxuICAgICAgICBsZXQgbWFza0NsYXNzID0geyd1aS1kaWFsb2ctbWFzayc6IHRydWUsICd1aS13aWRnZXQtb3ZlcmxheSc6IHRoaXMubW9kYWwsICd1aS1kaWFsb2ctdmlzaWJsZSc6IHRoaXMubWFza1Zpc2libGUsICd1aS1kaWFsb2ctbWFzay1zY3JvbGxibG9ja2VyJzogdGhpcy5tb2RhbCB8fCB0aGlzLmJsb2NrU2Nyb2xsfTtcclxuICAgICAgICBtYXNrQ2xhc3NbdGhpcy5nZXRQb3NpdGlvbkNsYXNzKCkudG9TdHJpbmcoKV0gPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBtYXNrQ2xhc3M7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UG9zaXRpb25DbGFzcygpIHtcclxuICAgICAgICBjb25zdCBwb3NpdGlvbnMgPSBbJ2xlZnQnLCAncmlnaHQnLCAndG9wJywgJ3RvcGxlZnQnLCAndG9wcmlnaHQnLCAnYm90dG9tJywgJ2JvdHRvbWxlZnQnLCAnYm90dG9tcmlnaHQnXTtcclxuICAgICAgICBjb25zdCBwb3MgPSBwb3NpdGlvbnMuZmluZChpdGVtID0+IGl0ZW0gPT09IHRoaXMucG9zaXRpb24pO1xyXG5cclxuICAgICAgICByZXR1cm4gcG9zID8gYHVpLWRpYWxvZy0ke3Bvc31gIDogJyc7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdERyYWcoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICBpZiAoRG9tSGFuZGxlci5oYXNDbGFzcyhldmVudC50YXJnZXQsICd1aS1kaWFsb2ctdGl0bGViYXItaWNvbicpIHx8wqBEb21IYW5kbGVyLmhhc0NsYXNzKCg8SFRNTEVsZW1lbnQ+IGV2ZW50LnRhcmdldCkucGFyZW50RWxlbWVudCwgJ3VpLWRpYWxvZy10aXRsZWJhci1pY29uJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZHJhZ2dhYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RQYWdlWCA9IGV2ZW50LnBhZ2VYO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RQYWdlWSA9IGV2ZW50LnBhZ2VZO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFEb21IYW5kbGVyLmlzSUUoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5tYXJnaW4gPSAnMCc7XHJcbiAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ3VpLXVuc2VsZWN0YWJsZS10ZXh0Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLmZvY3VzVHJhcCkge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT09IDkpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZvY3VzYWJsZUVsZW1lbnRzID0gRG9tSGFuZGxlci5nZXRGb2N1c2FibGVFbGVtZW50cyh0aGlzLmNvbnRhaW5lcik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGZvY3VzYWJsZUVsZW1lbnRzICYmIGZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNhYmxlRWxlbWVudHNbMF0uZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmb2N1c2VkSW5kZXggPSBmb2N1c2FibGVFbGVtZW50cy5pbmRleE9mKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9jdXNlZEluZGV4ID09IC0xIHx8IGZvY3VzZWRJbmRleCA9PT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50c1tmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggLSAxXS5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzW2ZvY3VzZWRJbmRleCAtIDFdLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9jdXNlZEluZGV4ID09IC0xIHx8IGZvY3VzZWRJbmRleCA9PT0gKGZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCAtIDEpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzWzBdLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNhYmxlRWxlbWVudHNbZm9jdXNlZEluZGV4ICsgMV0uZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkRyYWcoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5kcmFnZ2luZykge1xyXG4gICAgICAgICAgICBsZXQgY29udGFpbmVyV2lkdGggPSBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgodGhpcy5jb250YWluZXIpO1xyXG4gICAgICAgICAgICBsZXQgY29udGFpbmVySGVpZ2h0ID0gRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodCh0aGlzLmNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgIGxldCBkZWx0YVggPSBldmVudC5wYWdlWCAtIHRoaXMubGFzdFBhZ2VYO1xyXG4gICAgICAgICAgICBsZXQgZGVsdGFZID0gZXZlbnQucGFnZVkgLSB0aGlzLmxhc3RQYWdlWTtcclxuICAgICAgICAgICAgbGV0IG9mZnNldCA9IERvbUhhbmRsZXIuZ2V0T2Zmc2V0KHRoaXMuY29udGFpbmVyKTtcclxuICAgICAgICAgICAgbGV0IGxlZnRQb3MgPSBvZmZzZXQubGVmdCArIGRlbHRhWDtcclxuICAgICAgICAgICAgbGV0IHRvcFBvcyA9IG9mZnNldC50b3AgKyBkZWx0YVk7XHJcbiAgICAgICAgICAgIGxldCB2aWV3cG9ydCA9IERvbUhhbmRsZXIuZ2V0Vmlld3BvcnQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmtlZXBJblZpZXdwb3J0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGVmdFBvcyA+PSB0aGlzLm1pblggJiYgKGxlZnRQb3MgKyBjb250YWluZXJXaWR0aCkgPCB2aWV3cG9ydC53aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0eWxlLmxlZnQgPSBsZWZ0UG9zICsgJ3B4JztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RQYWdlWCA9IGV2ZW50LnBhZ2VYO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmxlZnQgPSBsZWZ0UG9zICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodG9wUG9zID49IHRoaXMubWluWSAmJiAodG9wUG9zICsgY29udGFpbmVySGVpZ2h0KSA8IHZpZXdwb3J0LmhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0eWxlLnRvcCA9IHRvcFBvcyArICdweCc7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0UGFnZVkgPSBldmVudC5wYWdlWTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS50b3AgPSB0b3BQb3MgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0UGFnZVggPSBldmVudC5wYWdlWDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmxlZnQgPSBsZWZ0UG9zICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIHRoaXMubGFzdFBhZ2VZID0gZXZlbnQucGFnZVk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS50b3AgPSB0b3BQb3MgKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoRG9tSGFuZGxlci5pc0lFKCkgJiYgdGhpcy5jb250YWluZXIuc3R5bGUucG9zaXRpb24gIT0gJ2ZpeGVkJyAmJiB0aGlzLmNvbnRhaW5lci5zdHlsZS50b3AgJiYgdGhpcy5jb250YWluZXIuc3R5bGUubGVmdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGVuZERyYWcoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5kcmFnZ2FibGUpIHtcclxuICAgICAgICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksICd1aS11bnNlbGVjdGFibGUtdGV4dCcpO1xyXG4gICAgICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRQb3NpdGlvbigpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gJyc7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUudG9wID0gJyc7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUubWFyZ2luID0gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFJlc2l6ZShldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLnJlc2l6YWJsZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2l6aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5sYXN0UGFnZVggPSBldmVudC5wYWdlWDtcclxuICAgICAgICAgICAgdGhpcy5sYXN0UGFnZVkgPSBldmVudC5wYWdlWTtcclxuICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCAndWktdW5zZWxlY3RhYmxlLXRleHQnKTtcclxuICAgICAgICAgICAgdGhpcy5vblJlc2l6ZUluaXQuZW1pdChldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uUmVzaXplKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVzaXppbmcpIHtcclxuICAgICAgICAgICAgbGV0IGRlbHRhWCA9IGV2ZW50LnBhZ2VYIC0gdGhpcy5sYXN0UGFnZVg7XHJcbiAgICAgICAgICAgIGxldCBkZWx0YVkgPSBldmVudC5wYWdlWSAtIHRoaXMubGFzdFBhZ2VZO1xyXG4gICAgICAgICAgICBsZXQgY29udGFpbmVyV2lkdGggPSBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgodGhpcy5jb250YWluZXIpO1xyXG4gICAgICAgICAgICBsZXQgY29udGFpbmVySGVpZ2h0ID0gRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodCh0aGlzLmNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgIGxldCBjb250ZW50SGVpZ2h0ID0gRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodCh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgICAgICAgIGxldCBuZXdXaWR0aCA9IGNvbnRhaW5lcldpZHRoICsgZGVsdGFYO1xyXG4gICAgICAgICAgICBsZXQgbmV3SGVpZ2h0ID0gY29udGFpbmVySGVpZ2h0ICsgZGVsdGFZO1xyXG4gICAgICAgICAgICBsZXQgbWluV2lkdGggPSB0aGlzLmNvbnRhaW5lci5zdHlsZS5taW5XaWR0aDtcclxuICAgICAgICAgICAgbGV0IG1pbkhlaWdodCA9IHRoaXMuY29udGFpbmVyLnN0eWxlLm1pbkhlaWdodDtcclxuICAgICAgICAgICAgbGV0IG9mZnNldCA9IERvbUhhbmRsZXIuZ2V0T2Zmc2V0KHRoaXMuY29udGFpbmVyKTtcclxuICAgICAgICAgICAgbGV0IHZpZXdwb3J0ID0gRG9tSGFuZGxlci5nZXRWaWV3cG9ydCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCghbWluV2lkdGggfHwgbmV3V2lkdGggPiBwYXJzZUludChtaW5XaWR0aCkpICYmIChvZmZzZXQubGVmdCArIG5ld1dpZHRoKSA8IHZpZXdwb3J0LndpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdHlsZS53aWR0aCA9IG5ld1dpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLndpZHRoID0gdGhpcy5fc3R5bGUud2lkdGg7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgoIW1pbkhlaWdodCB8fCBuZXdIZWlnaHQgPiBwYXJzZUludChtaW5IZWlnaHQpKSAmJiAob2Zmc2V0LnRvcCArIG5ld0hlaWdodCkgPCB2aWV3cG9ydC5oZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLmhlaWdodCA9IGNvbnRlbnRIZWlnaHQgKyBkZWx0YVkgKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxhc3RQYWdlWCA9IGV2ZW50LnBhZ2VYO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RQYWdlWSA9IGV2ZW50LnBhZ2VZO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXNpemVFbmQoZXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5yZXNpemluZykge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2l6aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ3VpLXVuc2VsZWN0YWJsZS10ZXh0Jyk7XHJcbiAgICAgICAgICAgIHRoaXMub25SZXNpemVFbmQuZW1pdChldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJpbmRHbG9iYWxMaXN0ZW5lcnMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZHJhZ2dhYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50RHJhZ0xpc3RlbmVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50RHJhZ0VuZExpc3RlbmVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5yZXNpemFibGUpIHtcclxuICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcnMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNsb3NlT25Fc2NhcGUgJiYgdGhpcy5jbG9zYWJsZSkge1xyXG4gICAgICAgICAgICB0aGlzLmJpbmREb2N1bWVudEVzY2FwZUxpc3RlbmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVuYmluZEdsb2JhbExpc3RlbmVycygpIHtcclxuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50RHJhZ0xpc3RlbmVyKCk7XHJcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudERyYWdFbmRMaXN0ZW5lcigpO1xyXG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcnMoKTtcclxuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50RXNjYXBlTGlzdGVuZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kRG9jdW1lbnREcmFnTGlzdGVuZXIoKSB7XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudERyYWdMaXN0ZW5lciA9IHRoaXMub25EcmFnLmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmRvY3VtZW50RHJhZ0xpc3RlbmVyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB1bmJpbmREb2N1bWVudERyYWdMaXN0ZW5lcigpIHtcclxuICAgICAgICBpZiAodGhpcy5kb2N1bWVudERyYWdMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5kb2N1bWVudERyYWdMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnREcmFnTGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBiaW5kRG9jdW1lbnREcmFnRW5kTGlzdGVuZXIoKSB7XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudERyYWdFbmRMaXN0ZW5lciA9IHRoaXMuZW5kRHJhZy5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuZG9jdW1lbnREcmFnRW5kTGlzdGVuZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVuYmluZERvY3VtZW50RHJhZ0VuZExpc3RlbmVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50RHJhZ0VuZExpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5kb2N1bWVudERyYWdFbmRMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnREcmFnRW5kTGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBiaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcnMoKSB7XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gdGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50UmVzaXplRW5kTGlzdGVuZXIgPSB0aGlzLnJlc2l6ZUVuZC5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKTtcclxuICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmRvY3VtZW50UmVzaXplRW5kTGlzdGVuZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXJzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIgJiYgdGhpcy5kb2N1bWVudFJlc2l6ZUVuZExpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpO1xyXG4gICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuZG9jdW1lbnRSZXNpemVFbmRMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVFbmRMaXN0ZW5lciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJpbmREb2N1bWVudEVzY2FwZUxpc3RlbmVyKCkge1xyXG4gICAgICAgIHRoaXMuZG9jdW1lbnRFc2NhcGVMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdrZXlkb3duJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC53aGljaCA9PSAyNykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KHRoaXMuY29udGFpbmVyLnN0eWxlLnpJbmRleCkgPT09IChEb21IYW5kbGVyLnppbmRleCArIHRoaXMuYmFzZVpJbmRleCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVuYmluZERvY3VtZW50RXNjYXBlTGlzdGVuZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRFc2NhcGVMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50RXNjYXBlTGlzdGVuZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudEVzY2FwZUxpc3RlbmVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXBwZW5kQ29udGFpbmVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmFwcGVuZFRvKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFwcGVuZFRvID09PSAnYm9keScpXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMud3JhcHBlcik7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYXBwZW5kQ2hpbGQodGhpcy53cmFwcGVyLCB0aGlzLmFwcGVuZFRvKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVzdG9yZUFwcGVuZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5jb250YWluZXIgJiYgdGhpcy5hcHBlbmRUbykge1xyXG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy53cmFwcGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25BbmltYXRpb25TdGFydChldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcclxuICAgICAgICBzd2l0Y2goZXZlbnQudG9TdGF0ZSkge1xyXG4gICAgICAgICAgICBjYXNlICd2aXNpYmxlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gZXZlbnQuZWxlbWVudDtcclxuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlciA9IHRoaXMuY29udGFpbmVyLnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2hvdy5lbWl0KHt9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kQ29udGFpbmVyKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVPblRvcCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kR2xvYmFsTGlzdGVuZXJzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubW9kYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZU1vZGFsaXR5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm1vZGFsICYmIHRoaXMuYmxvY2tTY3JvbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKGRvY3VtZW50LmJvZHksICd1aS1vdmVyZmxvdy1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mb2N1c09uU2hvdykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uQW5pbWF0aW9uRW5kKGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xyXG4gICAgICAgIHN3aXRjaChldmVudC50b1N0YXRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3ZvaWQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNvbnRhaW5lckRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25IaWRlLmVtaXQoe30pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Db250YWluZXJEZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMudW5iaW5kR2xvYmFsTGlzdGVuZXJzKCk7XHJcbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLm1hc2tWaXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm1heGltaXplZCkge1xyXG4gICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksICd1aS1vdmVyZmxvdy1oaWRkZW4nKTtcclxuICAgICAgICAgICAgdGhpcy5tYXhpbWl6ZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm1vZGFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZU1vZGFsaXR5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5ibG9ja1Njcm9sbCkge1xyXG4gICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksICd1aS1vdmVyZmxvdy1oaWRkZW4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcclxuICAgICAgICB0aGlzLndyYXBwZXIgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLl9zdHlsZSA9IHRoaXMub3JpZ2luYWxTdHlsZSA/IHsuLi50aGlzLm9yaWdpbmFsU3R5bGV9IDoge307XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdG9yZUFwcGVuZCgpO1xyXG4gICAgICAgICAgICB0aGlzLm9uQ29udGFpbmVyRGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLEZvY3VzVHJhcE1vZHVsZV0sXHJcbiAgICBleHBvcnRzOiBbRGlhbG9nLFNoYXJlZE1vZHVsZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtEaWFsb2ddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEaWFsb2dNb2R1bGUgeyB9XHJcbiJdfQ==