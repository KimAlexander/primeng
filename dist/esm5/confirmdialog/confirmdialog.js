var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, OnDestroy, Input, EventEmitter, Renderer2, ContentChild, NgZone, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { trigger, style, transition, animate, useAnimation, animation } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { Footer, SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
var showAnimation = animation([
    style({ transform: '{{transform}}', opacity: 0 }),
    animate('{{transition}}', style({ transform: 'none', opacity: 1 }))
]);
var hideAnimation = animation([
    animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 }))
]);
var ConfirmDialog = /** @class */ (function () {
    function ConfirmDialog(el, renderer, confirmationService, zone, cd) {
        var _this = this;
        this.el = el;
        this.renderer = renderer;
        this.confirmationService = confirmationService;
        this.zone = zone;
        this.cd = cd;
        this.acceptIcon = 'pi pi-check';
        this.acceptLabel = 'Yes';
        this.acceptVisible = true;
        this.rejectIcon = 'pi pi-times';
        this.rejectLabel = 'No';
        this.rejectVisible = true;
        this.closeOnEscape = true;
        this.blockScroll = true;
        this.closable = true;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.transitionOptions = '150ms cubic-bezier(0, 0, 0.2, 1)';
        this.focusTrap = true;
        this.defaultFocus = 'accept';
        this._position = "center";
        this.transformOptions = "scale(0.7)";
        this.subscription = this.confirmationService.requireConfirmation$.subscribe(function (confirmation) {
            if (!confirmation) {
                _this.hide();
                return;
            }
            if (confirmation.key === _this.key) {
                _this.confirmation = confirmation;
                _this.confirmationOptions = {
                    message: _this.confirmation.message || _this.message,
                    icon: _this.confirmation.icon || _this.icon,
                    header: _this.confirmation.header || _this.header,
                    rejectVisible: _this.confirmation.rejectVisible == null ? _this.rejectVisible : _this.confirmation.rejectVisible,
                    acceptVisible: _this.confirmation.acceptVisible == null ? _this.acceptVisible : _this.confirmation.acceptVisible,
                    acceptLabel: _this.confirmation.acceptLabel || _this.acceptLabel,
                    rejectLabel: _this.confirmation.rejectLabel || _this.rejectLabel,
                    acceptIcon: _this.confirmation.acceptIcon || _this.acceptIcon,
                    rejectIcon: _this.confirmation.rejectIcon || _this.rejectIcon,
                    acceptButtonStyleClass: _this.confirmation.acceptButtonStyleClass || _this.acceptButtonStyleClass,
                    rejectButtonStyleClass: _this.confirmation.rejectButtonStyleClass || _this.rejectButtonStyleClass,
                    defaultFocus: _this.confirmation.defaultFocus || _this.defaultFocus,
                    blockScroll: (_this.confirmation.blockScroll === false || _this.confirmation.blockScroll === true) ? _this.confirmation.blockScroll : _this.blockScroll
                };
                if (_this.confirmation.accept) {
                    _this.confirmation.acceptEvent = new EventEmitter();
                    _this.confirmation.acceptEvent.subscribe(_this.confirmation.accept);
                }
                if (_this.confirmation.reject) {
                    _this.confirmation.rejectEvent = new EventEmitter();
                    _this.confirmation.rejectEvent.subscribe(_this.confirmation.reject);
                }
                _this.visible = true;
            }
        });
    }
    Object.defineProperty(ConfirmDialog.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (value) {
            this._visible = value;
            if (this._visible && !this.maskVisible) {
                this.maskVisible = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfirmDialog.prototype, "position", {
        get: function () {
            return this._position;
        },
        set: function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    ;
    ConfirmDialog.prototype.option = function (name) {
        var source = this.confirmationOptions || this;
        if (source.hasOwnProperty(name)) {
            return source[name];
        }
        return undefined;
    };
    ConfirmDialog.prototype.onAnimationStart = function (event) {
        switch (event.toState) {
            case 'visible':
                this.container = event.element;
                this.wrapper = this.container.parentElement;
                this.contentContainer = DomHandler.findSingle(this.container, '.ui-dialog-content');
                var element = this.getElementToFocus();
                if (element) {
                    element.focus();
                }
                this.appendContainer();
                this.moveOnTop();
                this.bindGlobalListeners();
                this.enableModality();
                break;
        }
    };
    ConfirmDialog.prototype.onAnimationEnd = function (event) {
        switch (event.toState) {
            case 'void':
                this.onOverlayHide();
                break;
        }
    };
    ConfirmDialog.prototype.getElementToFocus = function () {
        switch (this.option('defaultFocus')) {
            case 'accept':
                return DomHandler.findSingle(this.container, 'button.ui-confirmdialog-acceptbutton');
            case 'reject':
                return DomHandler.findSingle(this.container, 'button.ui-confirmdialog-rejectbutton');
            case 'close':
                return DomHandler.findSingle(this.container, 'a.ui-dialog-titlebar-close');
            case 'none':
                return null;
            //backward compatibility
            default:
                return DomHandler.findSingle(this.container, 'button.ui-confirmdialog-acceptbutton');
        }
    };
    ConfirmDialog.prototype.appendContainer = function () {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.wrapper);
            else
                DomHandler.appendChild(this.wrapper, this.appendTo);
        }
    };
    ConfirmDialog.prototype.restoreAppend = function () {
        if (this.wrapper && this.appendTo) {
            this.el.nativeElement.appendChild(this.wrapper);
        }
    };
    ConfirmDialog.prototype.enableModality = function () {
        if (this.option('blockScroll')) {
            DomHandler.addClass(document.body, 'ui-overflow-hidden');
        }
    };
    ConfirmDialog.prototype.disableModality = function () {
        this.maskVisible = false;
        if (this.option('blockScroll')) {
            DomHandler.removeClass(document.body, 'ui-overflow-hidden');
        }
        if (this.container) {
            this.cd.detectChanges();
        }
    };
    ConfirmDialog.prototype.close = function (event) {
        if (this.confirmation.rejectEvent) {
            this.confirmation.rejectEvent.emit();
        }
        this.hide();
        event.preventDefault();
    };
    ConfirmDialog.prototype.hide = function () {
        this.visible = false;
        this.confirmation = null;
        this.confirmationOptions = null;
    };
    ConfirmDialog.prototype.moveOnTop = function () {
        if (this.autoZIndex) {
            this.container.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
            this.wrapper.style.zIndex = String(this.baseZIndex + (DomHandler.zindex - 1));
        }
    };
    ConfirmDialog.prototype.getMaskClass = function () {
        var maskClass = { 'ui-widget-overlay ui-dialog-mask': true, 'ui-dialog-visible': this.maskVisible, 'ui-dialog-mask-scrollblocker': this.blockScroll };
        maskClass[this.getPositionClass().toString()] = true;
        return maskClass;
    };
    ConfirmDialog.prototype.getPositionClass = function () {
        var _this = this;
        var positions = ['left', 'right', 'top', 'topleft', 'topright', 'bottom', 'bottomleft', 'bottomright'];
        var pos = positions.find(function (item) { return item === _this.position; });
        return pos ? "ui-dialog-" + pos : '';
    };
    ConfirmDialog.prototype.bindGlobalListeners = function () {
        var _this = this;
        if ((this.closeOnEscape && this.closable) || this.focusTrap && !this.documentEscapeListener) {
            this.documentEscapeListener = this.renderer.listen('document', 'keydown', function (event) {
                if (event.which == 27 && (_this.closeOnEscape && _this.closable)) {
                    if (parseInt(_this.container.style.zIndex) === (DomHandler.zindex + _this.baseZIndex) && _this.visible) {
                        _this.close(event);
                    }
                }
                if (event.which === 9 && _this.focusTrap) {
                    event.preventDefault();
                    var focusableElements = DomHandler.getFocusableElements(_this.container);
                    if (focusableElements && focusableElements.length > 0) {
                        if (!document.activeElement) {
                            focusableElements[0].focus();
                        }
                        else {
                            var focusedIndex = focusableElements.indexOf(document.activeElement);
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
            });
        }
    };
    ConfirmDialog.prototype.unbindGlobalListeners = function () {
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
    };
    ConfirmDialog.prototype.onOverlayHide = function () {
        this.disableModality();
        this.unbindGlobalListeners();
        this.container = null;
    };
    ConfirmDialog.prototype.ngOnDestroy = function () {
        this.restoreAppend();
        this.onOverlayHide();
        this.subscription.unsubscribe();
    };
    ConfirmDialog.prototype.accept = function () {
        if (this.confirmation.acceptEvent) {
            this.confirmation.acceptEvent.emit();
        }
        this.hide();
    };
    ConfirmDialog.prototype.reject = function () {
        if (this.confirmation.rejectEvent) {
            this.confirmation.rejectEvent.emit();
        }
        this.hide();
    };
    ConfirmDialog.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ConfirmationService },
        { type: NgZone },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], ConfirmDialog.prototype, "header", void 0);
    __decorate([
        Input()
    ], ConfirmDialog.prototype, "icon", void 0);
    __decorate([
        Input()
    ], ConfirmDialog.prototype, "message", void 0);
    __decorate([
        Input()
    ], ConfirmDialog.prototype, "style", void 0);
    __decorate([
        Input()
    ], ConfirmDialog.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], ConfirmDialog.prototype, "maskStyleClass", void 0);
    __decorate([
        Input()
    ], ConfirmDialog.prototype, "acceptIcon", void 0);
    __decorate([
        Input()
    ], ConfirmDialog.prototype, "acceptLabel", void 0);
    __decorate([
        Input()
    ], ConfirmDialog.prototype, "acceptVisible", void 0);
    __decorate([
        Input()
    ], ConfirmDialog.prototype, "rejectIcon", void 0);
    __decorate([
        Input()
    ], ConfirmDialog.prototype, "rejectLabel", void 0);
    __decorate([
        Input()
    ], ConfirmDialog.prototype, "rejectVisible", void 0);
    __decorate([
        Input()
    ], ConfirmDialog.prototype, "acceptButtonStyleClass", void 0);
    __decorate([
        Input()
    ], ConfirmDialog.prototype, "rejectButtonStyleClass", void 0);
    __decorate([
        Input()
    ], ConfirmDialog.prototype, "closeOnEscape", void 0);
    __decorate([
        Input()
    ], ConfirmDialog.prototype, "blockScroll", void 0);
    __decorate([
        Input()
    ], ConfirmDialog.prototype, "rtl", void 0);
    __decorate([
        Input()
    ], ConfirmDialog.prototype, "closable", void 0);
    __decorate([
        Input()
    ], ConfirmDialog.prototype, "appendTo", void 0);
    __decorate([
        Input()
    ], ConfirmDialog.prototype, "key", void 0);
    __decorate([
        Input()
    ], ConfirmDialog.prototype, "autoZIndex", void 0);
    __decorate([
        Input()
    ], ConfirmDialog.prototype, "baseZIndex", void 0);
    __decorate([
        Input()
    ], ConfirmDialog.prototype, "transitionOptions", void 0);
    __decorate([
        Input()
    ], ConfirmDialog.prototype, "focusTrap", void 0);
    __decorate([
        Input()
    ], ConfirmDialog.prototype, "defaultFocus", void 0);
    __decorate([
        Input()
    ], ConfirmDialog.prototype, "visible", null);
    __decorate([
        Input()
    ], ConfirmDialog.prototype, "position", null);
    __decorate([
        ContentChild(Footer)
    ], ConfirmDialog.prototype, "footer", void 0);
    __decorate([
        ViewChild('content')
    ], ConfirmDialog.prototype, "contentViewChild", void 0);
    ConfirmDialog = __decorate([
        Component({
            selector: 'p-confirmDialog',
            template: "\n        <div [class]=\"maskStyleClass\" [ngClass]=\"getMaskClass()\" *ngIf=\"maskVisible\">\n            <div [ngClass]=\"{'ui-dialog ui-confirmdialog ui-widget ui-widget-content ui-corner-all ui-shadow':true,'ui-dialog-rtl':rtl}\" [ngStyle]=\"style\" [class]=\"styleClass\" (mousedown)=\"moveOnTop()\"\n                [@animation]=\"{value: 'visible', params: {transform: transformOptions, transition: transitionOptions}}\" (@animation.start)=\"onAnimationStart($event)\" (@animation.done)=\"onAnimationEnd($event)\" *ngIf=\"visible\">\n                <div class=\"ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top\">\n                    <span class=\"ui-dialog-title\" *ngIf=\"option('header')\">{{option('header')}}</span>\n                    <div class=\"ui-dialog-titlebar-icons\">\n                        <a *ngIf=\"closable\" [ngClass]=\"{'ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all':true}\" tabindex=\"0\" role=\"button\" (click)=\"close($event)\" (keydown.enter)=\"close($event)\">\n                            <span class=\"pi pi-times\"></span>\n                        </a>\n                    </div>\n                </div>\n                <div #content class=\"ui-dialog-content ui-widget-content\">\n                    <i [ngClass]=\"'ui-confirmdialog-icon'\" [class]=\"option('icon')\" *ngIf=\"option('icon')\"></i>\n                    <span class=\"ui-confirmdialog-message\" [innerHTML]=\"option('message')\"></span>\n                </div>\n                <div class=\"ui-dialog-footer ui-widget-content\" *ngIf=\"footer\">\n                    <ng-content select=\"p-footer\"></ng-content>\n                </div>\n                <div class=\"ui-dialog-footer ui-widget-content\" *ngIf=\"!footer\">\n                    <button type=\"button\" pButton [icon]=\"option('acceptIcon')\" [label]=\"option('acceptLabel')\" (click)=\"accept()\" [ngClass]=\"'ui-confirmdialog-acceptbutton'\" [class]=\"option('acceptButtonStyleClass')\" *ngIf=\"option('acceptVisible')\"></button>\n                    <button type=\"button\" pButton [icon]=\"option('rejectIcon')\" [label]=\"option('rejectLabel')\" (click)=\"reject()\" [ngClass]=\"'ui-confirmdialog-rejectbutton'\" [class]=\"option('rejectButtonStyleClass')\" *ngIf=\"option('rejectVisible')\"></button>\n                </div>\n            </div>\n        </div>\n    ",
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
    ], ConfirmDialog);
    return ConfirmDialog;
}());
export { ConfirmDialog };
var ConfirmDialogModule = /** @class */ (function () {
    function ConfirmDialogModule() {
    }
    ConfirmDialogModule = __decorate([
        NgModule({
            imports: [CommonModule, ButtonModule],
            exports: [ConfirmDialog, ButtonModule, SharedModule],
            declarations: [ConfirmDialog]
        })
    ], ConfirmDialogModule);
    return ConfirmDialogModule;
}());
export { ConfirmDialogModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybWRpYWxvZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvY29uZmlybWRpYWxvZy8iLCJzb3VyY2VzIjpbImNvbmZpcm1kaWFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsWUFBWSxFQUFDLFNBQVMsRUFBQyxZQUFZLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxpQkFBaUIsRUFBQyx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzSyxPQUFPLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFpQixZQUFZLEVBQUUsU0FBUyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDN0csT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDaEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTVDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUdoRCxJQUFNLGFBQWEsR0FBRyxTQUFTLENBQUM7SUFDNUIsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDakQsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDdEUsQ0FBQyxDQUFDO0FBRUgsSUFBTSxhQUFhLEdBQUcsU0FBUyxDQUFDO0lBQzVCLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUs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QWE7QUErVzFCO0lBQUE7SUFBbUMsQ0FBQztJQUF2QixtQkFBbUI7UUFML0IsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFDLFlBQVksQ0FBQztZQUNwQyxPQUFPLEVBQUUsQ0FBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLFlBQVksQ0FBQztZQUNsRCxZQUFZLEVBQUUsQ0FBQyxhQUFhLENBQUM7U0FDaEMsQ0FBQztPQUNXLG1CQUFtQixDQUFJO0lBQUQsMEJBQUM7Q0FBQSxBQUFwQyxJQUFvQztTQUF2QixtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxFbGVtZW50UmVmLE9uRGVzdHJveSxJbnB1dCxFdmVudEVtaXR0ZXIsUmVuZGVyZXIyLENvbnRlbnRDaGlsZCxOZ1pvbmUsVmlld0NoaWxkLENoYW5nZURldGVjdG9yUmVmLENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHt0cmlnZ2VyLHN0eWxlLHRyYW5zaXRpb24sYW5pbWF0ZSxBbmltYXRpb25FdmVudCwgdXNlQW5pbWF0aW9uLCBhbmltYXRpb259IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICdwcmltZW5nL2RvbSc7XHJcbmltcG9ydCB7Rm9vdGVyLFNoYXJlZE1vZHVsZX0gZnJvbSAncHJpbWVuZy9hcGknO1xyXG5pbXBvcnQge0J1dHRvbk1vZHVsZX0gZnJvbSAncHJpbWVuZy9idXR0b24nO1xyXG5pbXBvcnQge0NvbmZpcm1hdGlvbn0gZnJvbSAncHJpbWVuZy9hcGknO1xyXG5pbXBvcnQge0NvbmZpcm1hdGlvblNlcnZpY2V9IGZyb20gJ3ByaW1lbmcvYXBpJztcclxuaW1wb3J0IHtTdWJzY3JpcHRpb259ICAgZnJvbSAncnhqcyc7XHJcblxyXG5jb25zdCBzaG93QW5pbWF0aW9uID0gYW5pbWF0aW9uKFtcclxuICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAne3t0cmFuc2Zvcm19fScsIG9wYWNpdHk6IDAgfSksXHJcbiAgICBhbmltYXRlKCd7e3RyYW5zaXRpb259fScsIHN0eWxlKHsgdHJhbnNmb3JtOiAnbm9uZScsIG9wYWNpdHk6IDEgfSkpXHJcbl0pO1xyXG5cclxuY29uc3QgaGlkZUFuaW1hdGlvbiA9IGFuaW1hdGlvbihbXHJcbiAgICBhbmltYXRlKCd7e3RyYW5zaXRpb259fScsIHN0eWxlKHsgdHJhbnNmb3JtOiAne3t0cmFuc2Zvcm19fScsIG9wYWNpdHk6IDAgfSkpXHJcbl0pO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3AtY29uZmlybURpYWxvZycsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgW2NsYXNzXT1cIm1hc2tTdHlsZUNsYXNzXCIgW25nQ2xhc3NdPVwiZ2V0TWFza0NsYXNzKClcIiAqbmdJZj1cIm1hc2tWaXNpYmxlXCI+XHJcbiAgICAgICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyd1aS1kaWFsb2cgdWktY29uZmlybWRpYWxvZyB1aS13aWRnZXQgdWktd2lkZ2V0LWNvbnRlbnQgdWktY29ybmVyLWFsbCB1aS1zaGFkb3cnOnRydWUsJ3VpLWRpYWxvZy1ydGwnOnJ0bH1cIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgKG1vdXNlZG93bik9XCJtb3ZlT25Ub3AoKVwiXHJcbiAgICAgICAgICAgICAgICBbQGFuaW1hdGlvbl09XCJ7dmFsdWU6ICd2aXNpYmxlJywgcGFyYW1zOiB7dHJhbnNmb3JtOiB0cmFuc2Zvcm1PcHRpb25zLCB0cmFuc2l0aW9uOiB0cmFuc2l0aW9uT3B0aW9uc319XCIgKEBhbmltYXRpb24uc3RhcnQpPVwib25BbmltYXRpb25TdGFydCgkZXZlbnQpXCIgKEBhbmltYXRpb24uZG9uZSk9XCJvbkFuaW1hdGlvbkVuZCgkZXZlbnQpXCIgKm5nSWY9XCJ2aXNpYmxlXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZGlhbG9nLXRpdGxlYmFyIHVpLXdpZGdldC1oZWFkZXIgdWktaGVscGVyLWNsZWFyZml4IHVpLWNvcm5lci10b3BcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWRpYWxvZy10aXRsZVwiICpuZ0lmPVwib3B0aW9uKCdoZWFkZXInKVwiPnt7b3B0aW9uKCdoZWFkZXInKX19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1kaWFsb2ctdGl0bGViYXItaWNvbnNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgKm5nSWY9XCJjbG9zYWJsZVwiIFtuZ0NsYXNzXT1cInsndWktZGlhbG9nLXRpdGxlYmFyLWljb24gdWktZGlhbG9nLXRpdGxlYmFyLWNsb3NlIHVpLWNvcm5lci1hbGwnOnRydWV9XCIgdGFiaW5kZXg9XCIwXCIgcm9sZT1cImJ1dHRvblwiIChjbGljayk9XCJjbG9zZSgkZXZlbnQpXCIgKGtleWRvd24uZW50ZXIpPVwiY2xvc2UoJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaSBwaS10aW1lc1wiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2ICNjb250ZW50IGNsYXNzPVwidWktZGlhbG9nLWNvbnRlbnQgdWktd2lkZ2V0LWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aSBbbmdDbGFzc109XCIndWktY29uZmlybWRpYWxvZy1pY29uJ1wiIFtjbGFzc109XCJvcHRpb24oJ2ljb24nKVwiICpuZ0lmPVwib3B0aW9uKCdpY29uJylcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1jb25maXJtZGlhbG9nLW1lc3NhZ2VcIiBbaW5uZXJIVE1MXT1cIm9wdGlvbignbWVzc2FnZScpXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZGlhbG9nLWZvb3RlciB1aS13aWRnZXQtY29udGVudFwiICpuZ0lmPVwiZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwicC1mb290ZXJcIj48L25nLWNvbnRlbnQ+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1kaWFsb2ctZm9vdGVyIHVpLXdpZGdldC1jb250ZW50XCIgKm5nSWY9XCIhZm9vdGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgcEJ1dHRvbiBbaWNvbl09XCJvcHRpb24oJ2FjY2VwdEljb24nKVwiIFtsYWJlbF09XCJvcHRpb24oJ2FjY2VwdExhYmVsJylcIiAoY2xpY2spPVwiYWNjZXB0KClcIiBbbmdDbGFzc109XCIndWktY29uZmlybWRpYWxvZy1hY2NlcHRidXR0b24nXCIgW2NsYXNzXT1cIm9wdGlvbignYWNjZXB0QnV0dG9uU3R5bGVDbGFzcycpXCIgKm5nSWY9XCJvcHRpb24oJ2FjY2VwdFZpc2libGUnKVwiPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gW2ljb25dPVwib3B0aW9uKCdyZWplY3RJY29uJylcIiBbbGFiZWxdPVwib3B0aW9uKCdyZWplY3RMYWJlbCcpXCIgKGNsaWNrKT1cInJlamVjdCgpXCIgW25nQ2xhc3NdPVwiJ3VpLWNvbmZpcm1kaWFsb2ctcmVqZWN0YnV0dG9uJ1wiIFtjbGFzc109XCJvcHRpb24oJ3JlamVjdEJ1dHRvblN0eWxlQ2xhc3MnKVwiICpuZ0lmPVwib3B0aW9uKCdyZWplY3RWaXNpYmxlJylcIj48L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgICAgdHJpZ2dlcignYW5pbWF0aW9uJywgW1xyXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHZpc2libGUnLCBbXHJcbiAgICAgICAgICAgICAgICB1c2VBbmltYXRpb24oc2hvd0FuaW1hdGlvbilcclxuICAgICAgICAgICAgXSksXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3Zpc2libGUgPT4gdm9pZCcsIFtcclxuICAgICAgICAgICAgICAgIHVzZUFuaW1hdGlvbihoaWRlQW5pbWF0aW9uKVxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgIF0pXHJcbiAgICBdLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb25maXJtRGlhbG9nIGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuXHJcbiAgICBASW5wdXQoKSBoZWFkZXI6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBpY29uOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgbWVzc2FnZTogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIG1hc2tTdHlsZUNsYXNzOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgYWNjZXB0SWNvbjogc3RyaW5nID0gJ3BpIHBpLWNoZWNrJztcclxuXHJcbiAgICBASW5wdXQoKSBhY2NlcHRMYWJlbDogc3RyaW5nID0gJ1llcyc7XHJcblxyXG4gICAgQElucHV0KCkgYWNjZXB0VmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgQElucHV0KCkgcmVqZWN0SWNvbjogc3RyaW5nID0gJ3BpIHBpLXRpbWVzJztcclxuXHJcbiAgICBASW5wdXQoKSByZWplY3RMYWJlbDogc3RyaW5nID0gJ05vJztcclxuXHJcbiAgICBASW5wdXQoKSByZWplY3RWaXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBASW5wdXQoKSBhY2NlcHRCdXR0b25TdHlsZUNsYXNzOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgcmVqZWN0QnV0dG9uU3R5bGVDbGFzczogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGNsb3NlT25Fc2NhcGU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIGJsb2NrU2Nyb2xsOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBASW5wdXQoKSBydGw6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgY2xvc2FibGU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIGFwcGVuZFRvOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkga2V5OiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgYXV0b1pJbmRleDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgQElucHV0KCkgYmFzZVpJbmRleDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBASW5wdXQoKSB0cmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJzE1MG1zIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpJztcclxuXHJcbiAgICBASW5wdXQoKSBmb2N1c1RyYXA6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIGRlZmF1bHRGb2N1czogc3RyaW5nID0gJ2FjY2VwdCc7XHJcblxyXG4gICAgQElucHV0KCkgZ2V0IHZpc2libGUoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmlzaWJsZTtcclxuICAgIH1cclxuICAgIHNldCB2aXNpYmxlKHZhbHVlOmFueSkge1xyXG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3Zpc2libGUgJiYgIXRoaXMubWFza1Zpc2libGUpIHtcclxuICAgICAgICAgICAgdGhpcy5tYXNrVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBASW5wdXQoKSBnZXQgcG9zaXRpb24oKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcG9zaXRpb247XHJcbiAgICB9O1xyXG5cclxuICAgIHNldCBwb3NpdGlvbih2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgc3dpdGNoICh2YWx1ZSkge1xyXG4gICAgICAgICAgICBjYXNlICd0b3BsZWZ0JzpcclxuICAgICAgICAgICAgY2FzZSAnYm90dG9tbGVmdCc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm1PcHRpb25zID0gXCJ0cmFuc2xhdGUzZCgtMTAwJSwgMHB4LCAwcHgpXCI7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd0b3ByaWdodCc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2JvdHRvbXJpZ2h0JzpcclxuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm1PcHRpb25zID0gXCJ0cmFuc2xhdGUzZCgxMDAlLCAwcHgsIDBweClcIjtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JvdHRvbSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zZm9ybU9wdGlvbnMgPSBcInRyYW5zbGF0ZTNkKDBweCwgMTAwJSwgMHB4KVwiO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAndG9wJzpcclxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtT3B0aW9ucyA9IFwidHJhbnNsYXRlM2QoMHB4LCAtMTAwJSwgMHB4KVwiO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtT3B0aW9ucyA9IFwic2NhbGUoMC43KVwiO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQENvbnRlbnRDaGlsZChGb290ZXIpIGZvb3RlcjtcclxuXHJcbiAgICBAVmlld0NoaWxkKCdjb250ZW50JykgY29udGVudFZpZXdDaGlsZDogRWxlbWVudFJlZjtcclxuXHJcbiAgICBjb25maXJtYXRpb246IENvbmZpcm1hdGlvbjtcclxuXHJcbiAgICBfdmlzaWJsZTogYm9vbGVhbjtcclxuXHJcbiAgICBtYXNrVmlzaWJsZTogYm9vbGVhbjtcclxuXHJcbiAgICBkb2N1bWVudEVzY2FwZUxpc3RlbmVyOiBhbnk7XHJcblxyXG4gICAgY29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgICB3cmFwcGVyOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgICBjb250ZW50Q29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgICBwcmVXaWR0aDogbnVtYmVyO1xyXG5cclxuICAgIF9wb3NpdGlvbjogc3RyaW5nID0gXCJjZW50ZXJcIjtcclxuXHJcbiAgICB0cmFuc2Zvcm1PcHRpb25zOiBhbnkgPSBcInNjYWxlKDAuNylcIjtcclxuXHJcbiAgICBjb25maXJtYXRpb25PcHRpb25zOiBDb25maXJtYXRpb247XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBjb25maXJtYXRpb25TZXJ2aWNlOiBDb25maXJtYXRpb25TZXJ2aWNlLCBwdWJsaWMgem9uZTogTmdab25lLCBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5jb25maXJtYXRpb25TZXJ2aWNlLnJlcXVpcmVDb25maXJtYXRpb24kLnN1YnNjcmliZShjb25maXJtYXRpb24gPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWNvbmZpcm1hdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjb25maXJtYXRpb24ua2V5ID09PSB0aGlzLmtleSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maXJtYXRpb24gPSBjb25maXJtYXRpb247XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpcm1hdGlvbk9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogdGhpcy5jb25maXJtYXRpb24ubWVzc2FnZXx8dGhpcy5tZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IHRoaXMuY29uZmlybWF0aW9uLmljb258fHRoaXMuaWNvbixcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHRoaXMuY29uZmlybWF0aW9uLmhlYWRlcnx8dGhpcy5oZWFkZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0VmlzaWJsZTogdGhpcy5jb25maXJtYXRpb24ucmVqZWN0VmlzaWJsZSA9PSBudWxsID8gdGhpcy5yZWplY3RWaXNpYmxlIDogdGhpcy5jb25maXJtYXRpb24ucmVqZWN0VmlzaWJsZSxcclxuICAgICAgICAgICAgICAgICAgICBhY2NlcHRWaXNpYmxlOiB0aGlzLmNvbmZpcm1hdGlvbi5hY2NlcHRWaXNpYmxlID09IG51bGwgPyB0aGlzLmFjY2VwdFZpc2libGUgOiB0aGlzLmNvbmZpcm1hdGlvbi5hY2NlcHRWaXNpYmxlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjY2VwdExhYmVsOiB0aGlzLmNvbmZpcm1hdGlvbi5hY2NlcHRMYWJlbHx8dGhpcy5hY2NlcHRMYWJlbCxcclxuICAgICAgICAgICAgICAgICAgICByZWplY3RMYWJlbDogdGhpcy5jb25maXJtYXRpb24ucmVqZWN0TGFiZWx8fHRoaXMucmVqZWN0TGFiZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgYWNjZXB0SWNvbjogdGhpcy5jb25maXJtYXRpb24uYWNjZXB0SWNvbiB8fCB0aGlzLmFjY2VwdEljb24sXHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0SWNvbjogdGhpcy5jb25maXJtYXRpb24ucmVqZWN0SWNvbiB8fCB0aGlzLnJlamVjdEljb24sXHJcbiAgICAgICAgICAgICAgICAgICAgYWNjZXB0QnV0dG9uU3R5bGVDbGFzczogdGhpcy5jb25maXJtYXRpb24uYWNjZXB0QnV0dG9uU3R5bGVDbGFzcyB8fCB0aGlzLmFjY2VwdEJ1dHRvblN0eWxlQ2xhc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0QnV0dG9uU3R5bGVDbGFzczogdGhpcy5jb25maXJtYXRpb24ucmVqZWN0QnV0dG9uU3R5bGVDbGFzcyB8fCB0aGlzLnJlamVjdEJ1dHRvblN0eWxlQ2xhc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEZvY3VzOiB0aGlzLmNvbmZpcm1hdGlvbi5kZWZhdWx0Rm9jdXMgfHwgdGhpcy5kZWZhdWx0Rm9jdXMsXHJcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tTY3JvbGw6ICh0aGlzLmNvbmZpcm1hdGlvbi5ibG9ja1Njcm9sbCA9PT0gZmFsc2UgfHwgdGhpcy5jb25maXJtYXRpb24uYmxvY2tTY3JvbGwgPT09IHRydWUpID8gdGhpcy5jb25maXJtYXRpb24uYmxvY2tTY3JvbGwgOiB0aGlzLmJsb2NrU2Nyb2xsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpcm1hdGlvbi5hY2NlcHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpcm1hdGlvbi5hY2NlcHRFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpcm1hdGlvbi5hY2NlcHRFdmVudC5zdWJzY3JpYmUodGhpcy5jb25maXJtYXRpb24uYWNjZXB0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maXJtYXRpb24ucmVqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maXJtYXRpb24ucmVqZWN0RXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maXJtYXRpb24ucmVqZWN0RXZlbnQuc3Vic2NyaWJlKHRoaXMuY29uZmlybWF0aW9uLnJlamVjdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9wdGlvbihuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBzb3VyY2UgPSB0aGlzLmNvbmZpcm1hdGlvbk9wdGlvbnMgfHwgdGhpcztcclxuICAgICAgICBpZiAoc291cmNlLmhhc093blByb3BlcnR5KG5hbWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2VbbmFtZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgb25BbmltYXRpb25TdGFydChldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcclxuICAgICAgICBzd2l0Y2goZXZlbnQudG9TdGF0ZSkge1xyXG4gICAgICAgICAgICBjYXNlICd2aXNpYmxlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gZXZlbnQuZWxlbWVudDtcclxuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlciA9IHRoaXMuY29udGFpbmVyLnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRDb250YWluZXIgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5jb250YWluZXIsICcudWktZGlhbG9nLWNvbnRlbnQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5nZXRFbGVtZW50VG9Gb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRDb250YWluZXIoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZU9uVG9wKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRHbG9iYWxMaXN0ZW5lcnMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlTW9kYWxpdHkoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uQW5pbWF0aW9uRW5kKGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xyXG4gICAgICAgIHN3aXRjaChldmVudC50b1N0YXRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3ZvaWQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk92ZXJsYXlIaWRlKCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRFbGVtZW50VG9Gb2N1cygpIHtcclxuICAgICAgICBzd2l0Y2godGhpcy5vcHRpb24oJ2RlZmF1bHRGb2N1cycpKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FjY2VwdCc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuY29udGFpbmVyLCAnYnV0dG9uLnVpLWNvbmZpcm1kaWFsb2ctYWNjZXB0YnV0dG9uJyk7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdyZWplY3QnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmNvbnRhaW5lciwgJ2J1dHRvbi51aS1jb25maXJtZGlhbG9nLXJlamVjdGJ1dHRvbicpO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnY2xvc2UnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmNvbnRhaW5lciwgJ2EudWktZGlhbG9nLXRpdGxlYmFyLWNsb3NlJyk7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdub25lJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICAgICAgLy9iYWNrd2FyZCBjb21wYXRpYmlsaXR5XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuY29udGFpbmVyLCAnYnV0dG9uLnVpLWNvbmZpcm1kaWFsb2ctYWNjZXB0YnV0dG9uJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFwcGVuZENvbnRhaW5lcigpIHtcclxuICAgICAgICBpZiAodGhpcy5hcHBlbmRUbykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hcHBlbmRUbyA9PT0gJ2JvZHknKVxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLndyYXBwZXIpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFwcGVuZENoaWxkKHRoaXMud3JhcHBlciwgdGhpcy5hcHBlbmRUbyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlc3RvcmVBcHBlbmQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMud3JhcHBlciAmJiB0aGlzLmFwcGVuZFRvKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLndyYXBwZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBlbmFibGVNb2RhbGl0eSgpIHtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb24oJ2Jsb2NrU2Nyb2xsJykpIHtcclxuICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCAndWktb3ZlcmZsb3ctaGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRpc2FibGVNb2RhbGl0eSgpIHtcclxuICAgICAgICB0aGlzLm1hc2tWaXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbignYmxvY2tTY3JvbGwnKSkge1xyXG4gICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksICd1aS1vdmVyZmxvdy1oaWRkZW4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2UoZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlybWF0aW9uLnJlamVjdEV2ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlybWF0aW9uLnJlamVjdEV2ZW50LmVtaXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZSgpIHtcclxuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbmZpcm1hdGlvbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jb25maXJtYXRpb25PcHRpb25zID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlT25Ub3AoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYXV0b1pJbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS56SW5kZXggPSBTdHJpbmcodGhpcy5iYXNlWkluZGV4ICsgKCsrRG9tSGFuZGxlci56aW5kZXgpKTtcclxuICAgICAgICAgICAgdGhpcy53cmFwcGVyLnN0eWxlLnpJbmRleCA9IFN0cmluZyh0aGlzLmJhc2VaSW5kZXggKyAoRG9tSGFuZGxlci56aW5kZXggLSAxKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldE1hc2tDbGFzcygpIHtcclxuICAgICAgICBsZXQgbWFza0NsYXNzID0geyd1aS13aWRnZXQtb3ZlcmxheSB1aS1kaWFsb2ctbWFzayc6IHRydWUsICd1aS1kaWFsb2ctdmlzaWJsZSc6IHRoaXMubWFza1Zpc2libGUsICd1aS1kaWFsb2ctbWFzay1zY3JvbGxibG9ja2VyJzogdGhpcy5ibG9ja1Njcm9sbH07XHJcbiAgICAgICAgbWFza0NsYXNzW3RoaXMuZ2V0UG9zaXRpb25DbGFzcygpLnRvU3RyaW5nKCldID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gbWFza0NsYXNzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBvc2l0aW9uQ2xhc3MoKSB7XHJcbiAgICAgICAgY29uc3QgcG9zaXRpb25zID0gWydsZWZ0JywgJ3JpZ2h0JywgJ3RvcCcsICd0b3BsZWZ0JywgJ3RvcHJpZ2h0JywgJ2JvdHRvbScsICdib3R0b21sZWZ0JywgJ2JvdHRvbXJpZ2h0J107XHJcbiAgICAgICAgY29uc3QgcG9zID0gcG9zaXRpb25zLmZpbmQoaXRlbSA9PiBpdGVtID09PSB0aGlzLnBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBvcyA/IGB1aS1kaWFsb2ctJHtwb3N9YCA6ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRHbG9iYWxMaXN0ZW5lcnMoKSB7XHJcbiAgICAgICAgaWYgKCh0aGlzLmNsb3NlT25Fc2NhcGUgJiYgdGhpcy5jbG9zYWJsZSkgfHwgdGhpcy5mb2N1c1RyYXAgJiYgIXRoaXMuZG9jdW1lbnRFc2NhcGVMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50RXNjYXBlTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAna2V5ZG93bicsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LndoaWNoID09IDI3ICYmICh0aGlzLmNsb3NlT25Fc2NhcGUgJiYgdGhpcy5jbG9zYWJsZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQodGhpcy5jb250YWluZXIuc3R5bGUuekluZGV4KSA9PT0gKERvbUhhbmRsZXIuemluZGV4ICsgdGhpcy5iYXNlWkluZGV4KSAmJiB0aGlzLnZpc2libGUpwqB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT09IDkgJiYgdGhpcy5mb2N1c1RyYXApIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgZm9jdXNhYmxlRWxlbWVudHMgPSBEb21IYW5kbGVyLmdldEZvY3VzYWJsZUVsZW1lbnRzKHRoaXMuY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvY3VzYWJsZUVsZW1lbnRzICYmIGZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50c1swXS5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZvY3VzZWRJbmRleCA9IGZvY3VzYWJsZUVsZW1lbnRzLmluZGV4T2YoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvY3VzZWRJbmRleCA9PSAtMSB8fCBmb2N1c2VkSW5kZXggPT09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzW2ZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCAtIDFdLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50c1tmb2N1c2VkSW5kZXggLSAxXS5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZvY3VzZWRJbmRleCA9PSAtMSB8fCBmb2N1c2VkSW5kZXggPT09IChmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggLSAxKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNhYmxlRWxlbWVudHNbMF0uZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzW2ZvY3VzZWRJbmRleCArIDFdLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1bmJpbmRHbG9iYWxMaXN0ZW5lcnMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRFc2NhcGVMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50RXNjYXBlTGlzdGVuZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudEVzY2FwZUxpc3RlbmVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25PdmVybGF5SGlkZSgpIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVNb2RhbGl0eSgpO1xyXG4gICAgICAgIHRoaXMudW5iaW5kR2xvYmFsTGlzdGVuZXJzKCk7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMucmVzdG9yZUFwcGVuZCgpO1xyXG4gICAgICAgIHRoaXMub25PdmVybGF5SGlkZSgpO1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWNjZXB0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpcm1hdGlvbi5hY2NlcHRFdmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpcm1hdGlvbi5hY2NlcHRFdmVudC5lbWl0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZWplY3QoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlybWF0aW9uLnJlamVjdEV2ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlybWF0aW9uLnJlamVjdEV2ZW50LmVtaXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSxCdXR0b25Nb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW0NvbmZpcm1EaWFsb2csQnV0dG9uTW9kdWxlLFNoYXJlZE1vZHVsZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtDb25maXJtRGlhbG9nXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29uZmlybURpYWxvZ01vZHVsZSB7IH1cclxuIl19