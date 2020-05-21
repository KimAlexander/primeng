var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { NgModule, Component, OnInit, OnDestroy, Input, Output, EventEmitter, Optional, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MessageService } from 'primeng/api';
var Messages = /** @class */ (function () {
    function Messages(messageService, el) {
        this.messageService = messageService;
        this.el = el;
        this.closable = true;
        this.enableService = true;
        this.escape = true;
        this.showTransitionOptions = '300ms ease-out';
        this.hideTransitionOptions = '250ms ease-in';
        this.valueChange = new EventEmitter();
    }
    Messages.prototype.ngOnInit = function () {
        var _this = this;
        if (this.messageService && this.enableService) {
            this.messageSubscription = this.messageService.messageObserver.subscribe(function (messages) {
                if (messages) {
                    if (messages instanceof Array) {
                        var filteredMessages = messages.filter(function (m) { return _this.key === m.key; });
                        _this.value = _this.value ? __spread(_this.value, filteredMessages) : __spread(filteredMessages);
                    }
                    else if (_this.key === messages.key) {
                        _this.value = _this.value ? __spread(_this.value, [messages]) : [messages];
                    }
                }
            });
            this.clearSubscription = this.messageService.clearObserver.subscribe(function (key) {
                if (key) {
                    if (_this.key === key) {
                        _this.value = null;
                    }
                }
                else {
                    _this.value = null;
                }
            });
        }
    };
    Messages.prototype.hasMessages = function () {
        var parentEl = this.el.nativeElement.parentElement;
        if (parentEl && parentEl.offsetParent) {
            return this.value && this.value.length > 0;
        }
        return false;
    };
    Messages.prototype.getSeverityClass = function () {
        var msg = this.value[0];
        if (msg) {
            var severities = ['info', 'warn', 'error', 'success'];
            var severity = severities.find(function (item) { return item === msg.severity; });
            return severity && "ui-messages-" + severity;
        }
        return null;
    };
    Messages.prototype.clear = function (event) {
        this.value = [];
        this.valueChange.emit(this.value);
        event.preventDefault();
    };
    Object.defineProperty(Messages.prototype, "icon", {
        get: function () {
            var icon = null;
            if (this.hasMessages()) {
                var msg = this.value[0];
                switch (msg.severity) {
                    case 'success':
                        icon = 'pi-check';
                        break;
                    case 'info':
                        icon = 'pi-info-circle';
                        break;
                    case 'error':
                        icon = 'pi-times';
                        break;
                    case 'warn':
                        icon = 'pi-exclamation-triangle';
                        break;
                    default:
                        icon = 'pi-info-circle';
                        break;
                }
            }
            return icon;
        },
        enumerable: true,
        configurable: true
    });
    Messages.prototype.ngOnDestroy = function () {
        if (this.messageSubscription) {
            this.messageSubscription.unsubscribe();
        }
        if (this.clearSubscription) {
            this.clearSubscription.unsubscribe();
        }
    };
    Messages.ctorParameters = function () { return [
        { type: MessageService, decorators: [{ type: Optional }] },
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], Messages.prototype, "value", void 0);
    __decorate([
        Input()
    ], Messages.prototype, "closable", void 0);
    __decorate([
        Input()
    ], Messages.prototype, "style", void 0);
    __decorate([
        Input()
    ], Messages.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], Messages.prototype, "enableService", void 0);
    __decorate([
        Input()
    ], Messages.prototype, "key", void 0);
    __decorate([
        Input()
    ], Messages.prototype, "escape", void 0);
    __decorate([
        Input()
    ], Messages.prototype, "showTransitionOptions", void 0);
    __decorate([
        Input()
    ], Messages.prototype, "hideTransitionOptions", void 0);
    __decorate([
        Output()
    ], Messages.prototype, "valueChange", void 0);
    Messages = __decorate([
        Component({
            selector: 'p-messages',
            template: "\n        <div *ngIf=\"hasMessages()\" class=\"ui-messages ui-widget ui-corner-all\"\n                    [ngClass]=\"getSeverityClass()\" role=\"alert\" [ngStyle]=\"style\" [class]=\"styleClass\"\n                    [@messageAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\">\n            <a tabindex=\"0\" class=\"ui-messages-close\" (click)=\"clear($event)\" (keydown.enter)=\"clear($event)\" *ngIf=\"closable\">\n                <i class=\"pi pi-times\"></i>\n            </a>\n            <span class=\"ui-messages-icon pi\" [ngClass]=\"icon\"></span>\n            <ul>\n                <li *ngFor=\"let msg of value\">\n                    <div *ngIf=\"!escape; else escapeOut\">\n                        <span *ngIf=\"msg.summary\" class=\"ui-messages-summary\" [innerHTML]=\"msg.summary\"></span>\n                        <span *ngIf=\"msg.detail\" class=\"ui-messages-detail\" [innerHTML]=\"msg.detail\"></span>\n                    </div>\n                    <ng-template #escapeOut>\n                        <span *ngIf=\"msg.summary\" class=\"ui-messages-summary\">{{msg.summary}}</span>\n                        <span *ngIf=\"msg.detail\" class=\"ui-messages-detail\">{{msg.detail}}</span>\n                    </ng-template>\n                </li>\n            </ul>\n        </div>\n    ",
            animations: [
                trigger('messageAnimation', [
                    state('visible', style({
                        transform: 'translateY(0)',
                        opacity: 1
                    })),
                    transition('void => *', [
                        style({ transform: 'translateY(-25%)', opacity: 0 }),
                        animate('{{showTransitionParams}}')
                    ]),
                    transition('* => void', [
                        animate(('{{hideTransitionParams}}'), style({
                            opacity: 0,
                            transform: 'translateY(-25%)'
                        }))
                    ])
                ])
            ],
            changeDetection: ChangeDetectionStrategy.Default
        }),
        __param(0, Optional())
    ], Messages);
    return Messages;
}());
export { Messages };
var MessagesModule = /** @class */ (function () {
    function MessagesModule() {
    }
    MessagesModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Messages],
            declarations: [Messages]
        })
    ], MessagesModule);
    return MessagesModule;
}());
export { MessagesModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL21lc3NhZ2VzLyIsInNvdXJjZXMiOlsibWVzc2FnZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLFFBQVEsRUFBQyxVQUFVLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEksT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFFM0UsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQStDM0M7SUEwQkksa0JBQStCLGNBQThCLEVBQVMsRUFBYztRQUFyRCxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBUyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBdEIzRSxhQUFRLEdBQVksSUFBSSxDQUFDO1FBTXpCLGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBSTlCLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFFdkIsMEJBQXFCLEdBQVcsZ0JBQWdCLENBQUM7UUFFakQsMEJBQXFCLEdBQVcsZUFBZSxDQUFDO1FBRS9DLGdCQUFXLEdBQTRCLElBQUksWUFBWSxFQUFhLENBQUM7SUFNUSxDQUFDO0lBRXhGLDJCQUFRLEdBQVI7UUFBQSxpQkF5QkM7UUF4QkcsSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDM0MsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxVQUFDLFFBQWE7Z0JBQ25GLElBQUksUUFBUSxF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QUFDLENBQUM7b0JBQ0gsVUFBVSxDQUFDLFdBQVcsRUFBRTt3QkFDcEIsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQzt3QkFDbEQsT0FBTyxDQUFDLDBCQUEwQixDQUFDO3FCQUN0QyxDQUFDO29CQUNGLFVBQVUsQ0FBQyxXQUFXLEVBQUU7d0JBQ3BCLE9BQU8sQ0FBQyxDQUFDLDBCQUEwQixDQUFDLEVBQUUsS0FBSyxDQUFDOzRCQUN4QyxPQUFPLEVBQUUsQ0FBQzs0QkFDVixTQUFTLEVBQUUsa0JBQWtCO3lCQUNoQyxDQUFDLENBQUM7cUJBQ04sQ0FBQztpQkFDTCxDQUFDO2FBQ0w7WUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztTQUNuRCxDQUFDO1FBMkJlLFdBQUEsUUFBUSxFQUFFLENBQUE7T0ExQmQsUUFBUSxDQTBIcEI7SUFBRCxlQUFDO0NBQUEsQUExSEQsSUEwSEM7U0ExSFksUUFBUTtBQWlJckI7SUFBQTtJQUE4QixDQUFDO0lBQWxCLGNBQWM7UUFMMUIsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUNuQixZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7U0FDM0IsQ0FBQztPQUNXLGNBQWMsQ0FBSTtJQUFELHFCQUFDO0NBQUEsQUFBL0IsSUFBK0I7U0FBbEIsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LE9uSW5pdCxPbkRlc3Ryb3ksSW5wdXQsT3V0cHV0LEV2ZW50RW1pdHRlcixPcHRpb25hbCxFbGVtZW50UmVmLENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7dHJpZ2dlcixzdGF0ZSxzdHlsZSx0cmFuc2l0aW9uLGFuaW1hdGV9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQge01lc3NhZ2V9IGZyb20gJ3ByaW1lbmcvYXBpJztcclxuaW1wb3J0IHtNZXNzYWdlU2VydmljZX0gZnJvbSAncHJpbWVuZy9hcGknO1xyXG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC1tZXNzYWdlcycsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgKm5nSWY9XCJoYXNNZXNzYWdlcygpXCIgY2xhc3M9XCJ1aS1tZXNzYWdlcyB1aS13aWRnZXQgdWktY29ybmVyLWFsbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiZ2V0U2V2ZXJpdHlDbGFzcygpXCIgcm9sZT1cImFsZXJ0XCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgW0BtZXNzYWdlQW5pbWF0aW9uXT1cInt2YWx1ZTogJ3Zpc2libGUnLCBwYXJhbXM6IHtzaG93VHJhbnNpdGlvblBhcmFtczogc2hvd1RyYW5zaXRpb25PcHRpb25zLCBoaWRlVHJhbnNpdGlvblBhcmFtczogaGlkZVRyYW5zaXRpb25PcHRpb25zfX1cIj5cclxuICAgICAgICAgICAgPGEgdGFiaW5kZXg9XCIwXCIgY2xhc3M9XCJ1aS1tZXNzYWdlcy1jbG9zZVwiIChjbGljayk9XCJjbGVhcigkZXZlbnQpXCIgKGtleWRvd24uZW50ZXIpPVwiY2xlYXIoJGV2ZW50KVwiICpuZ0lmPVwiY2xvc2FibGVcIj5cclxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwicGkgcGktdGltZXNcIj48L2k+XHJcbiAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tZXNzYWdlcy1pY29uIHBpXCIgW25nQ2xhc3NdPVwiaWNvblwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgPHVsPlxyXG4gICAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBtc2cgb2YgdmFsdWVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiIWVzY2FwZTsgZWxzZSBlc2NhcGVPdXRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJtc2cuc3VtbWFyeVwiIGNsYXNzPVwidWktbWVzc2FnZXMtc3VtbWFyeVwiIFtpbm5lckhUTUxdPVwibXNnLnN1bW1hcnlcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwibXNnLmRldGFpbFwiIGNsYXNzPVwidWktbWVzc2FnZXMtZGV0YWlsXCIgW2lubmVySFRNTF09XCJtc2cuZGV0YWlsXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZXNjYXBlT3V0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIm1zZy5zdW1tYXJ5XCIgY2xhc3M9XCJ1aS1tZXNzYWdlcy1zdW1tYXJ5XCI+e3ttc2cuc3VtbWFyeX19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIm1zZy5kZXRhaWxcIiBjbGFzcz1cInVpLW1lc3NhZ2VzLWRldGFpbFwiPnt7bXNnLmRldGFpbH19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgICB0cmlnZ2VyKCdtZXNzYWdlQW5pbWF0aW9uJywgW1xyXG4gICAgICAgICAgICBzdGF0ZSgndmlzaWJsZScsIHN0eWxlKHtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMCknLFxyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICAgICAgICB9KSksXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gKicsIFtcclxuICAgICAgICAgICAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC0yNSUpJywgb3BhY2l0eTogMH0pLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgne3tzaG93VHJhbnNpdGlvblBhcmFtc319JylcclxuICAgICAgICAgICAgXSksXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJyogPT4gdm9pZCcsIFtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGUoKCd7e2hpZGVUcmFuc2l0aW9uUGFyYW1zfX0nKSwgc3R5bGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtMjUlKSdcclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgIF0pXHJcbiAgICBdLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNZXNzYWdlcyBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgICBASW5wdXQoKSB2YWx1ZTogTWVzc2FnZVtdO1xyXG5cclxuICAgIEBJbnB1dCgpIGNsb3NhYmxlOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBlbmFibGVTZXJ2aWNlOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBASW5wdXQoKSBrZXk6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBlc2NhcGU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIHNob3dUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJzMwMG1zIGVhc2Utb3V0JztcclxuXHJcbiAgICBASW5wdXQoKSBoaWRlVHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICcyNTBtcyBlYXNlLWluJztcclxuXHJcbiAgICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxNZXNzYWdlW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxNZXNzYWdlW10+KCk7XHJcblxyXG4gICAgbWVzc2FnZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAgIGNsZWFyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gICAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgcHVibGljIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSwgcHVibGljIGVsOiBFbGVtZW50UmVmKSB7fVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1lc3NhZ2VTZXJ2aWNlICYmIHRoaXMuZW5hYmxlU2VydmljZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VTdWJzY3JpcHRpb24gPSB0aGlzLm1lc3NhZ2VTZXJ2aWNlLm1lc3NhZ2VPYnNlcnZlci5zdWJzY3JpYmUoKG1lc3NhZ2VzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlcyBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJlZE1lc3NhZ2VzID0gbWVzc2FnZXMuZmlsdGVyKG0gPT4gdGhpcy5rZXkgPT09IG0ua2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWUgPyBbLi4udGhpcy52YWx1ZSwgLi4uZmlsdGVyZWRNZXNzYWdlc10gOiBbLi4uZmlsdGVyZWRNZXNzYWdlc107XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMua2V5ID09PSBtZXNzYWdlcy5rZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWUgPyBbLi4udGhpcy52YWx1ZSwgLi4uW21lc3NhZ2VzXV0gOiBbbWVzc2FnZXNdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNsZWFyU3Vic2NyaXB0aW9uID0gdGhpcy5tZXNzYWdlU2VydmljZS5jbGVhck9ic2VydmVyLnN1YnNjcmliZShrZXkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmtleSA9PT0ga2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFzTWVzc2FnZXMoKSB7XHJcbiAgICAgICAgbGV0IHBhcmVudEVsID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgaWYgKHBhcmVudEVsICYmIHBhcmVudEVsLm9mZnNldFBhcmVudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZSAmJiB0aGlzLnZhbHVlLmxlbmd0aCA+IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2V2ZXJpdHlDbGFzcygpIHtcclxuICAgICAgICBjb25zdCBtc2cgPSB0aGlzLnZhbHVlWzBdO1xyXG4gICAgICAgIGlmIChtc2cpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2V2ZXJpdGllcyA9IFsnaW5mbycsICd3YXJuJywgJ2Vycm9yJywgJ3N1Y2Nlc3MnXTtcclxuICAgICAgICAgICAgY29uc3Qgc2V2ZXJpdHkgPSBzZXZlcml0aWVzLmZpbmQoaXRlbSA9PiBpdGVtID09PSBtc2cuc2V2ZXJpdHkpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHNldmVyaXR5ICYmIGB1aS1tZXNzYWdlcy0ke3NldmVyaXR5fWA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhcihldmVudCkge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSBbXTtcclxuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy52YWx1ZSk7XHJcblxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGljb24oKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgaWNvbjogc3RyaW5nID0gbnVsbDtcclxuICAgICAgICBpZiAodGhpcy5oYXNNZXNzYWdlcygpKSB7XHJcbiAgICAgICAgICAgIGxldCBtc2cgPSB0aGlzLnZhbHVlWzBdO1xyXG4gICAgICAgICAgICBzd2l0Y2gobXNnLnNldmVyaXR5KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdzdWNjZXNzJzpcclxuICAgICAgICAgICAgICAgICAgICBpY29uID0gJ3BpLWNoZWNrJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ2luZm8nOlxyXG4gICAgICAgICAgICAgICAgICAgIGljb24gPSAncGktaW5mby1jaXJjbGUnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnZXJyb3InOlxyXG4gICAgICAgICAgICAgICAgICAgIGljb24gPSAncGktdGltZXMnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnd2Fybic6XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbiA9ICdwaS1leGNsYW1hdGlvbi10cmlhbmdsZSc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGljb24gPSAncGktaW5mby1jaXJjbGUnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpY29uO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1lc3NhZ2VTdWJzY3JpcHRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5jbGVhclN1YnNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgICBleHBvcnRzOiBbTWVzc2FnZXNdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbTWVzc2FnZXNdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNZXNzYWdlc01vZHVsZSB7IH1cclxuIl19