var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, AfterViewInit, AfterViewChecked, OnDestroy, Input, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { TerminalService } from './terminalservice';
var Terminal = /** @class */ (function () {
    function Terminal(el, terminalService) {
        var _this = this;
        this.el = el;
        this.terminalService = terminalService;
        this.commands = [];
        this.subscription = terminalService.responseHandler.subscribe(function (response) {
            _this.commands[_this.commands.length - 1].response = response;
            _this.commandProcessed = true;
        });
    }
    Terminal.prototype.ngAfterViewInit = function () {
        this.container = DomHandler.find(this.el.nativeElement, '.ui-terminal')[0];
    };
    Terminal.prototype.ngAfterViewChecked = function () {
        if (this.commandProcessed) {
            this.container.scrollTop = this.container.scrollHeight;
            this.commandProcessed = false;
        }
    };
    Object.defineProperty(Terminal.prototype, "response", {
        set: function (value) {
            if (value) {
                this.commands[this.commands.length - 1].response = value;
                this.commandProcessed = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Terminal.prototype.handleCommand = function (event) {
        if (event.keyCode == 13) {
            this.commands.push({ text: this.command });
            this.terminalService.sendCommand(this.command);
            this.command = '';
        }
    };
    Terminal.prototype.focus = function (element) {
        element.focus();
    };
    Terminal.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    Terminal.ctorParameters = function () { return [
        { type: ElementRef },
        { type: TerminalService }
    ]; };
    __decorate([
        Input()
    ], Terminal.prototype, "welcomeMessage", void 0);
    __decorate([
        Input()
    ], Terminal.prototype, "prompt", void 0);
    __decorate([
        Input()
    ], Terminal.prototype, "style", void 0);
    __decorate([
        Input()
    ], Terminal.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], Terminal.prototype, "response", null);
    Terminal = __decorate([
        Component({
            selector: 'p-terminal',
            template: "\n        <div [ngClass]=\"'ui-terminal ui-widget ui-widget-content ui-corner-all'\" [ngStyle]=\"style\" [class]=\"styleClass\" (click)=\"focus(in)\">\n            <div *ngIf=\"welcomeMessage\">{{welcomeMessage}}</div>\n            <div class=\"ui-terminal-content\">\n                <div *ngFor=\"let command of commands\">\n                    <span>{{prompt}}</span>\n                    <span class=\"ui-terminal-command\">{{command.text}}</span>\n                    <div>{{command.response}}</div>\n                </div>\n            </div>\n            <div>\n                <span class=\"ui-terminal-content-prompt\">{{prompt}}</span>\n                <input #in type=\"text\" [(ngModel)]=\"command\" class=\"ui-terminal-input\" autocomplete=\"off\" (keydown)=\"handleCommand($event)\" autofocus>\n            </div>\n        </div>\n    ",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], Terminal);
    return Terminal;
}());
export { Terminal };
var TerminalModule = /** @class */ (function () {
    function TerminalModule() {
    }
    TerminalModule = __decorate([
        NgModule({
            imports: [CommonModule, FormsModule],
            exports: [Terminal],
            declarations: [Terminal]
        })
    ], TerminalModule);
    return TerminalModule;
}());
export { TerminalModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVybWluYWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL3Rlcm1pbmFsLyIsInNvdXJjZXMiOlsidGVybWluYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsYUFBYSxFQUFDLGdCQUFnQixFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ25JLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUF1QmxEO0lBb0JJLGtCQUFtQixFQUFjLEVBQVMsZUFBZ0M7UUFBMUUsaUJBS0M7UUFMa0IsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQVYxRSxhQUFRLEdBQVUsRUFBRSxDQUFDO1FBV2pCLElBQUksQ0FBQyxZQUFZLEdBQUcsZUFBZSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsVUFBQSxRQUFRO1lBQ2xFLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUM1RCxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGtDQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVELHFDQUFrQixHQUFsQjtRQUNJLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDO1lBQ3ZELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7U0FDakM7SUFDTCxDQUFDO0lBR0Qsc0JBQUksOEJBQVE7YUFBWixVQUFhLEtBQWE7WUFDdEIsSUFBSSxLQUFLLEVBQUU7Z0JBQ1AsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2dCQUN6RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO2FBQ2hDO1FBQ0wsQ0FBQzs7O09BQUE7SUFFRCxnQ0FBYSxHQUFiLFVBQWMsS0FBb0I7UUFDOUIsSUFBSSxLQUFLLENBQUMsT0FBTyxJQUFJLEVBQUUsRUFBRTtZQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7U0FDckI7SUFDTCxDQUFDO0lBRUQsd0JBQUssR0FBTCxVQUFNLE9BQW9CO1FBQ3RCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsOEJBQVcsR0FBWDtRQUNJLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ25DO0lBQ0wsQ0FBQzs7Z0JBMUNzQixVQUFVO2dCQUEwQixlQUFlOztJQWxCakU7UUFBUixLQUFLLEVBQUU7b0RBQXdCO0lBRXZCO1FBQVIsS0FBSyxFQUFFOzRDQUFnQjtJQUVmO1FBQVIsS0FBSyxFQUFFOzJDQUFZO0lBRVg7UUFBUixLQUFLLEVBQUU7Z0RBQW9CO0lBK0I1QjtRQURDLEtBQUssRUFBRTs0Q0FNUDtJQTVDUSxRQUFRO1FBcEJwQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsbTFCQWVUO1lBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87U0FDbkQsQ0FBQztPQUNXLFFBQVEsQ0FnRXBCO0lBQUQsZUFBQztDQUFBLEFBaEVELElBZ0VDO1NBaEVZLFFBQVE7QUF1RXJCO0lBQUE7SUFBOEIsQ0FBQztJQUFsQixjQUFjO1FBTDFCLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBQyxXQUFXLENBQUM7WUFDbkMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ25CLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQztTQUMzQixDQUFDO09BQ1csY0FBYyxDQUFJO0lBQUQscUJBQUM7Q0FBQSxBQUEvQixJQUErQjtTQUFsQixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsQWZ0ZXJWaWV3SW5pdCxBZnRlclZpZXdDaGVja2VkLE9uRGVzdHJveSxJbnB1dCxFbGVtZW50UmVmLENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICdwcmltZW5nL2RvbSc7XHJcbmltcG9ydCB7VGVybWluYWxTZXJ2aWNlfSBmcm9tICcuL3Rlcm1pbmFsc2VydmljZSc7XHJcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSAgIGZyb20gJ3J4anMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3AtdGVybWluYWwnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cIid1aS10ZXJtaW5hbCB1aS13aWRnZXQgdWktd2lkZ2V0LWNvbnRlbnQgdWktY29ybmVyLWFsbCdcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgKGNsaWNrKT1cImZvY3VzKGluKVwiPlxyXG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwid2VsY29tZU1lc3NhZ2VcIj57e3dlbGNvbWVNZXNzYWdlfX08L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXRlcm1pbmFsLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGNvbW1hbmQgb2YgY29tbWFuZHNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57e3Byb21wdH19PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktdGVybWluYWwtY29tbWFuZFwiPnt7Y29tbWFuZC50ZXh0fX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdj57e2NvbW1hbmQucmVzcG9uc2V9fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS10ZXJtaW5hbC1jb250ZW50LXByb21wdFwiPnt7cHJvbXB0fX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgI2luIHR5cGU9XCJ0ZXh0XCIgWyhuZ01vZGVsKV09XCJjb21tYW5kXCIgY2xhc3M9XCJ1aS10ZXJtaW5hbC1pbnB1dFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIChrZXlkb3duKT1cImhhbmRsZUNvbW1hbmQoJGV2ZW50KVwiIGF1dG9mb2N1cz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUZXJtaW5hbCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsQWZ0ZXJWaWV3Q2hlY2tlZCxPbkRlc3Ryb3kge1xyXG5cclxuICAgIEBJbnB1dCgpIHdlbGNvbWVNZXNzYWdlOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgcHJvbXB0OiBzdHJpbmc7XHJcbiAgICAgICAgXHJcbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xyXG4gICAgICAgIFxyXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xyXG4gICAgICAgICAgICBcclxuICAgIGNvbW1hbmRzOiBhbnlbXSA9IFtdO1xyXG4gICAgXHJcbiAgICBjb21tYW5kOiBzdHJpbmc7XHJcbiAgICBcclxuICAgIGNvbnRhaW5lcjogRWxlbWVudDtcclxuICAgIFxyXG4gICAgY29tbWFuZFByb2Nlc3NlZDogYm9vbGVhbjtcclxuICAgIFxyXG4gICAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHRlcm1pbmFsU2VydmljZTogVGVybWluYWxTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0ZXJtaW5hbFNlcnZpY2UucmVzcG9uc2VIYW5kbGVyLnN1YnNjcmliZShyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZHNbdGhpcy5jb21tYW5kcy5sZW5ndGggLSAxXS5yZXNwb25zZSA9IHJlc3BvbnNlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRQcm9jZXNzZWQgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBEb21IYW5kbGVyLmZpbmQodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnLnVpLXRlcm1pbmFsJylbMF07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5jb21tYW5kUHJvY2Vzc2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnNjcm9sbFRvcCA9IHRoaXMuY29udGFpbmVyLnNjcm9sbEhlaWdodDtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kUHJvY2Vzc2VkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IHJlc3BvbnNlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kc1t0aGlzLmNvbW1hbmRzLmxlbmd0aCAtIDFdLnJlc3BvbnNlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZFByb2Nlc3NlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBoYW5kbGVDb21tYW5kKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT0gMTMpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kcy5wdXNoKHt0ZXh0OiB0aGlzLmNvbW1hbmR9KTtcclxuICAgICAgICAgICAgdGhpcy50ZXJtaW5hbFNlcnZpY2Uuc2VuZENvbW1hbmQodGhpcy5jb21tYW5kKTtcclxuICAgICAgICAgICAgdGhpcy5jb21tYW5kID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmb2N1cyhlbGVtZW50OiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIGVsZW1lbnQuZm9jdXMoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLEZvcm1zTW9kdWxlXSxcclxuICAgIGV4cG9ydHM6IFtUZXJtaW5hbF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtUZXJtaW5hbF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFRlcm1pbmFsTW9kdWxlIHsgfSJdfQ==