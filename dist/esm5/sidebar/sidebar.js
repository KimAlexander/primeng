var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, AfterViewInit, AfterViewChecked, OnDestroy, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
var Sidebar = /** @class */ (function () {
    function Sidebar(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.position = 'left';
        this.blockScroll = false;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.modal = true;
        this.dismissible = true;
        this.showCloseIcon = true;
        this.closeOnEscape = true;
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
        this.visibleChange = new EventEmitter();
    }
    Sidebar.prototype.ngAfterViewInit = function () {
        this.initialized = true;
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.containerViewChild.nativeElement);
            else
                DomHandler.appendChild(this.containerViewChild.nativeElement, this.appendTo);
        }
        if (this.visible) {
            this.show();
        }
    };
    Object.defineProperty(Sidebar.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (val) {
            this._visible = val;
            if (this.initialized && this.containerViewChild && this.containerViewChild.nativeElement) {
                if (this._visible)
                    this.show();
                else {
                    if (this.preventVisibleChangePropagation)
                        this.preventVisibleChangePropagation = false;
                    else
                        this.hide();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Sidebar.prototype.ngAfterViewChecked = function () {
        if (this.executePostDisplayActions) {
            this.onShow.emit({});
            this.executePostDisplayActions = false;
        }
    };
    Sidebar.prototype.show = function () {
        this.executePostDisplayActions = true;
        if (this.autoZIndex) {
            this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
        if (this.modal) {
            this.enableModality();
        }
    };
    Sidebar.prototype.hide = function () {
        this.onHide.emit({});
        if (this.modal) {
            this.disableModality();
        }
    };
    Sidebar.prototype.close = function (event) {
        this.preventVisibleChangePropagation = true;
        this.hide();
        this.visibleChange.emit(false);
        event.preventDefault();
    };
    Sidebar.prototype.enableModality = function () {
        var _this = this;
        if (!this.mask) {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = String(parseInt(this.containerViewChild.nativeElement.style.zIndex) - 1);
            DomHandler.addMultipleClasses(this.mask, 'ui-widget-overlay ui-sidebar-mask');
            if (this.dismissible) {
                this.maskClickListener = this.renderer.listen(this.mask, 'click', function (event) {
                    if (_this.dismissible) {
                        _this.close(event);
                    }
                });
            }
            document.body.appendChild(this.mask);
            if (this.blockScroll) {
                DomHandler.addClass(document.body, 'ui-overflow-hidden');
            }
        }
    };
    Sidebar.prototype.disableModality = function () {
        if (this.mask) {
            this.unbindMaskClickListener();
            document.body.removeChild(this.mask);
            if (this.blockScroll) {
                DomHandler.removeClass(document.body, 'ui-overflow-hidden');
            }
            this.mask = null;
        }
    };
    Sidebar.prototype.onAnimationStart = function (event) {
        switch (event.toState) {
            case 'visible':
                if (this.closeOnEscape) {
                    this.bindDocumentEscapeListener();
                }
                break;
            case 'hidden':
                this.unbindGlobalListeners();
                break;
        }
    };
    Sidebar.prototype.bindDocumentEscapeListener = function () {
        var _this = this;
        this.documentEscapeListener = this.renderer.listen('document', 'keydown', function (event) {
            if (event.which == 27) {
                if (parseInt(_this.containerViewChild.nativeElement.style.zIndex) === (DomHandler.zindex + _this.baseZIndex)) {
                    _this.close(event);
                }
            }
        });
    };
    Sidebar.prototype.unbindDocumentEscapeListener = function () {
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
    };
    Sidebar.prototype.unbindMaskClickListener = function () {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    };
    Sidebar.prototype.unbindGlobalListeners = function () {
        this.unbindMaskClickListener();
        this.unbindDocumentEscapeListener();
    };
    Sidebar.prototype.ngOnDestroy = function () {
        this.initialized = false;
        if (this.visible) {
            this.hide();
        }
        if (this.appendTo) {
            this.el.nativeElement.appendChild(this.containerViewChild.nativeElement);
        }
        this.unbindGlobalListeners();
    };
    Sidebar.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    __decorate([
        Input()
    ], Sidebar.prototype, "position", void 0);
    __decorate([
        Input()
    ], Sidebar.prototype, "fullScreen", void 0);
    __decorate([
        Input()
    ], Sidebar.prototype, "appendTo", void 0);
    __decorate([
        Input()
    ], Sidebar.prototype, "blockScroll", void 0);
    __decorate([
        Input()
    ], Sidebar.prototype, "style", void 0);
    __decorate([
        Input()
    ], Sidebar.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], Sidebar.prototype, "ariaCloseLabel", void 0);
    __decorate([
        Input()
    ], Sidebar.prototype, "autoZIndex", void 0);
    __decorate([
        Input()
    ], Sidebar.prototype, "baseZIndex", void 0);
    __decorate([
        Input()
    ], Sidebar.prototype, "modal", void 0);
    __decorate([
        Input()
    ], Sidebar.prototype, "dismissible", void 0);
    __decorate([
        Input()
    ], Sidebar.prototype, "showCloseIcon", void 0);
    __decorate([
        Input()
    ], Sidebar.prototype, "closeOnEscape", void 0);
    __decorate([
        ViewChild('container')
    ], Sidebar.prototype, "containerViewChild", void 0);
    __decorate([
        Output()
    ], Sidebar.prototype, "onShow", void 0);
    __decorate([
        Output()
    ], Sidebar.prototype, "onHide", void 0);
    __decorate([
        Output()
    ], Sidebar.prototype, "visibleChange", void 0);
    __decorate([
        Input()
    ], Sidebar.prototype, "visible", null);
    Sidebar = __decorate([
        Component({
            selector: 'p-sidebar',
            template: "\n        <div #container [ngClass]=\"{'ui-sidebar ui-widget ui-widget-content ui-shadow':true, 'ui-sidebar-active': visible, \n            'ui-sidebar-left': (position === 'left'), 'ui-sidebar-right': (position === 'right'),\n            'ui-sidebar-top': (position === 'top'), 'ui-sidebar-bottom': (position === 'bottom'), \n            'ui-sidebar-full': fullScreen}\"\n            [@panelState]=\"visible ? 'visible' : 'hidden'\" (@panelState.start)=\"onAnimationStart($event)\" [ngStyle]=\"style\" [class]=\"styleClass\"  role=\"complementary\" [attr.aria-modal]=\"modal\">\n            <a [ngClass]=\"{'ui-sidebar-close ui-corner-all':true}\" *ngIf=\"showCloseIcon\" tabindex=\"0\" role=\"button\" (click)=\"close($event)\" (keydown.enter)=\"close($event)\" [attr.aria-label]=\"ariaCloseLabel\">\n                <span class=\"pi pi-times\"></span>\n            </a>\n            <ng-content></ng-content>\n        </div>\n    ",
            animations: [
                trigger('panelState', [
                    state('hidden', style({
                        opacity: 0
                    })),
                    state('visible', style({
                        opacity: 1
                    })),
                    transition('visible => hidden', animate('300ms ease-in')),
                    transition('hidden => visible', animate('300ms ease-out'))
                ])
            ],
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], Sidebar);
    return Sidebar;
}());
export { Sidebar };
var SidebarModule = /** @class */ (function () {
    function SidebarModule() {
    }
    SidebarModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Sidebar],
            declarations: [Sidebar]
        })
    ], SidebarModule);
    return SidebarModule;
}());
export { SidebarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvc2lkZWJhci8iLCJzb3VyY2VzIjpbInNpZGViYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsYUFBYSxFQUFDLGdCQUFnQixFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzSyxPQUFPLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQy9FLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBOEJ2QztJQWtESSxpQkFBbUIsRUFBYyxFQUFTLFFBQW1CO1FBQTFDLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBaERwRCxhQUFRLEdBQVcsTUFBTSxDQUFDO1FBTTFCLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBUTdCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFM0IsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUV2QixVQUFLLEdBQVksSUFBSSxDQUFDO1FBRXRCLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBRTVCLGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBRTlCLGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBSTdCLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUUvQyxXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFL0Msa0JBQWEsR0FBcUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQWdCQyxDQUFDO0lBRWpFLGlDQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMs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Q0FBQztvQkFDSCxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQzt3QkFDbkIsT0FBTyxFQUFFLENBQUM7cUJBQ2IsQ0FBQyxDQUFDO29CQUNILFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7b0JBQ3pELFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztpQkFDN0QsQ0FBQzthQUNMO1lBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87U0FDbkQsQ0FBQztPQUNXLE9BQU8sQ0ErTW5CO0lBQUQsY0FBQztDQUFBLEFBL01ELElBK01DO1NBL01ZLE9BQU87QUFzTnBCO0lBQUE7SUFBNkIsQ0FBQztJQUFqQixhQUFhO1FBTHpCLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztZQUN2QixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFDbEIsWUFBWSxFQUFFLENBQUMsT0FBTyxDQUFDO1NBQzFCLENBQUM7T0FDVyxhQUFhLENBQUk7SUFBRCxvQkFBQztDQUFBLEFBQTlCLElBQThCO1NBQWpCLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxBZnRlclZpZXdJbml0LEFmdGVyVmlld0NoZWNrZWQsT25EZXN0cm95LElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXIsVmlld0NoaWxkLEVsZW1lbnRSZWYsUmVuZGVyZXIyLENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHt0cmlnZ2VyLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIGFuaW1hdGV9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICdwcmltZW5nL2RvbSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC1zaWRlYmFyJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiAjY29udGFpbmVyIFtuZ0NsYXNzXT1cInsndWktc2lkZWJhciB1aS13aWRnZXQgdWktd2lkZ2V0LWNvbnRlbnQgdWktc2hhZG93Jzp0cnVlLCAndWktc2lkZWJhci1hY3RpdmUnOiB2aXNpYmxlLCBcclxuICAgICAgICAgICAgJ3VpLXNpZGViYXItbGVmdCc6IChwb3NpdGlvbiA9PT0gJ2xlZnQnKSwgJ3VpLXNpZGViYXItcmlnaHQnOiAocG9zaXRpb24gPT09ICdyaWdodCcpLFxyXG4gICAgICAgICAgICAndWktc2lkZWJhci10b3AnOiAocG9zaXRpb24gPT09ICd0b3AnKSwgJ3VpLXNpZGViYXItYm90dG9tJzogKHBvc2l0aW9uID09PSAnYm90dG9tJyksIFxyXG4gICAgICAgICAgICAndWktc2lkZWJhci1mdWxsJzogZnVsbFNjcmVlbn1cIlxyXG4gICAgICAgICAgICBbQHBhbmVsU3RhdGVdPVwidmlzaWJsZSA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nXCIgKEBwYW5lbFN0YXRlLnN0YXJ0KT1cIm9uQW5pbWF0aW9uU3RhcnQoJGV2ZW50KVwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiAgcm9sZT1cImNvbXBsZW1lbnRhcnlcIiBbYXR0ci5hcmlhLW1vZGFsXT1cIm1vZGFsXCI+XHJcbiAgICAgICAgICAgIDxhIFtuZ0NsYXNzXT1cInsndWktc2lkZWJhci1jbG9zZSB1aS1jb3JuZXItYWxsJzp0cnVlfVwiICpuZ0lmPVwic2hvd0Nsb3NlSWNvblwiIHRhYmluZGV4PVwiMFwiIHJvbGU9XCJidXR0b25cIiAoY2xpY2spPVwiY2xvc2UoJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cImNsb3NlKCRldmVudClcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFDbG9zZUxhYmVsXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBpIHBpLXRpbWVzXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgICAgdHJpZ2dlcigncGFuZWxTdGF0ZScsIFtcclxuICAgICAgICAgICAgc3RhdGUoJ2hpZGRlbicsIHN0eWxlKHtcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgICAgICAgfSkpLFxyXG4gICAgICAgICAgICBzdGF0ZSgndmlzaWJsZScsIHN0eWxlKHtcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDFcclxuICAgICAgICAgICAgfSkpLFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlID0+IGhpZGRlbicsIGFuaW1hdGUoJzMwMG1zIGVhc2UtaW4nKSksXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ2hpZGRlbiA9PiB2aXNpYmxlJywgYW5pbWF0ZSgnMzAwbXMgZWFzZS1vdXQnKSlcclxuICAgICAgICBdKVxyXG4gICAgXSxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2lkZWJhciBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSB7XHJcblxyXG4gICAgQElucHV0KCkgcG9zaXRpb246IHN0cmluZyA9ICdsZWZ0JztcclxuXHJcbiAgICBASW5wdXQoKSBmdWxsU2NyZWVuOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIGFwcGVuZFRvOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgYmxvY2tTY3JvbGw6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBhcmlhQ2xvc2VMYWJlbDogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGF1dG9aSW5kZXg6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIGJhc2VaSW5kZXg6IG51bWJlciA9IDA7XHJcblxyXG4gICAgQElucHV0KCkgbW9kYWw6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIGRpc21pc3NpYmxlOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBASW5wdXQoKSBzaG93Q2xvc2VJY29uOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBASW5wdXQoKSBjbG9zZU9uRXNjYXBlOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBAVmlld0NoaWxkKCdjb250YWluZXInKSBjb250YWluZXJWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uU2hvdzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uSGlkZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIHZpc2libGVDaGFuZ2U6RXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgX3Zpc2libGU6IGJvb2xlYW47XHJcblxyXG4gICAgcHJldmVudFZpc2libGVDaGFuZ2VQcm9wYWdhdGlvbjogYm9vbGVhbjtcclxuXHJcbiAgICBtYXNrOiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgICBtYXNrQ2xpY2tMaXN0ZW5lcjogRnVuY3Rpb247XHJcblxyXG4gICAgZG9jdW1lbnRFc2NhcGVMaXN0ZW5lcjogRnVuY3Rpb247XHJcblxyXG4gICAgZXhlY3V0ZVBvc3REaXNwbGF5QWN0aW9uczogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8gPT09ICdib2R5JylcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgdGhpcy5hcHBlbmRUbyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy52aXNpYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBnZXQgdmlzaWJsZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmlzaWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgdmlzaWJsZSh2YWw6Ym9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSB2YWw7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkICYmIHRoaXMuY29udGFpbmVyVmlld0NoaWxkICYmIHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3Zpc2libGUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcmV2ZW50VmlzaWJsZUNoYW5nZVByb3BhZ2F0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmVudFZpc2libGVDaGFuZ2VQcm9wYWdhdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5leGVjdXRlUG9zdERpc3BsYXlBY3Rpb25zKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25TaG93LmVtaXQoe30pO1xyXG4gICAgICAgICAgICB0aGlzLmV4ZWN1dGVQb3N0RGlzcGxheUFjdGlvbnMgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvdygpIHtcclxuICAgICAgICB0aGlzLmV4ZWN1dGVQb3N0RGlzcGxheUFjdGlvbnMgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLmF1dG9aSW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS56SW5kZXggPSBTdHJpbmcodGhpcy5iYXNlWkluZGV4ICsgKCsrRG9tSGFuZGxlci56aW5kZXgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm1vZGFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlTW9kYWxpdHkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZSgpIHtcclxuICAgICAgICB0aGlzLm9uSGlkZS5lbWl0KHt9KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMubW9kYWwpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXNhYmxlTW9kYWxpdHkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2UoZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5wcmV2ZW50VmlzaWJsZUNoYW5nZVByb3BhZ2F0aW9uID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgICB0aGlzLnZpc2libGVDaGFuZ2UuZW1pdChmYWxzZSk7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBlbmFibGVNb2RhbGl0eSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMubWFzaykge1xyXG4gICAgICAgICAgICB0aGlzLm1hc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgdGhpcy5tYXNrLnN0eWxlLnpJbmRleCA9IFN0cmluZyhwYXJzZUludCh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLnpJbmRleCkgLSAxKTtcclxuICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRNdWx0aXBsZUNsYXNzZXModGhpcy5tYXNrLCAndWktd2lkZ2V0LW92ZXJsYXkgdWktc2lkZWJhci1tYXNrJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAodGhpcy5kaXNtaXNzaWJsZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hc2tDbGlja0xpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5tYXNrLCAnY2xpY2snLCAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpc21pc3NpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMubWFzayk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJsb2NrU2Nyb2xsKSB7XHJcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKGRvY3VtZW50LmJvZHksICd1aS1vdmVyZmxvdy1oaWRkZW4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkaXNhYmxlTW9kYWxpdHkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubWFzaykge1xyXG4gICAgICAgICAgICB0aGlzLnVuYmluZE1hc2tDbGlja0xpc3RlbmVyKCk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5tYXNrKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYmxvY2tTY3JvbGwpIHtcclxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ3VpLW92ZXJmbG93LWhpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubWFzayA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uQW5pbWF0aW9uU3RhcnQoZXZlbnQpe1xyXG4gICAgICAgIHN3aXRjaChldmVudC50b1N0YXRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Zpc2libGUnOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2xvc2VPbkVzY2FwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50RXNjYXBlTGlzdGVuZXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjYXNlICdoaWRkZW4nOlxyXG4gICAgICAgICAgICAgICAgdGhpcy51bmJpbmRHbG9iYWxMaXN0ZW5lcnMoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJpbmREb2N1bWVudEVzY2FwZUxpc3RlbmVyKCkge1xyXG4gICAgICAgIHRoaXMuZG9jdW1lbnRFc2NhcGVMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdrZXlkb3duJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC53aGljaCA9PSAyNykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuekluZGV4KSA9PT0gKERvbUhhbmRsZXIuemluZGV4ICsgdGhpcy5iYXNlWkluZGV4KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdW5iaW5kRG9jdW1lbnRFc2NhcGVMaXN0ZW5lcigpIHtcclxuICAgICAgICBpZiAodGhpcy5kb2N1bWVudEVzY2FwZUxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRFc2NhcGVMaXN0ZW5lcigpO1xyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50RXNjYXBlTGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1bmJpbmRNYXNrQ2xpY2tMaXN0ZW5lcigpIHtcclxuICAgICAgICBpZiAodGhpcy5tYXNrQ2xpY2tMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLm1hc2tDbGlja0xpc3RlbmVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMubWFza0NsaWNrTGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1bmJpbmRHbG9iYWxMaXN0ZW5lcnMoKSB7XHJcbiAgICAgICAgdGhpcy51bmJpbmRNYXNrQ2xpY2tMaXN0ZW5lcigpO1xyXG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRFc2NhcGVMaXN0ZW5lcigpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudmlzaWJsZSkge1xyXG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmFwcGVuZFRvKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcclxuICAgICAgICB9XHJcblxyXG5cdFx0dGhpcy51bmJpbmRHbG9iYWxMaXN0ZW5lcnMoKTtcclxuICAgIH1cclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW1NpZGViYXJdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbU2lkZWJhcl1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNpZGViYXJNb2R1bGUgeyB9XHJcbiJdfQ==