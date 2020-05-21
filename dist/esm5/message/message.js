var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
var UIMessage = /** @class */ (function () {
    function UIMessage() {
        this.escape = true;
    }
    Object.defineProperty(UIMessage.prototype, "icon", {
        get: function () {
            var icon = null;
            if (this.severity) {
                switch (this.severity) {
                    case 'success':
                        icon = 'pi pi-check';
                        break;
                    case 'info':
                        icon = 'pi pi-info-circle';
                        break;
                    case 'error':
                        icon = 'pi pi-times';
                        break;
                    case 'warn':
                        icon = 'pi pi-exclamation-triangle';
                        break;
                    default:
                        icon = 'pi pi-info-circle';
                        break;
                }
            }
            return icon;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input()
    ], UIMessage.prototype, "severity", void 0);
    __decorate([
        Input()
    ], UIMessage.prototype, "text", void 0);
    __decorate([
        Input()
    ], UIMessage.prototype, "escape", void 0);
    UIMessage = __decorate([
        Component({
            selector: 'p-message',
            template: "\n        <div aria-live=\"polite\" class=\"ui-message ui-widget ui-corner-all\" *ngIf=\"severity\"\n        [ngClass]=\"{'ui-message-info': (severity === 'info'),\n                'ui-message-warn': (severity === 'warn'),\n                'ui-message-error': (severity === 'error'),\n                'ui-message-success': (severity === 'success')}\">\n            <span class=\"ui-message-icon\" [ngClass]=\"icon\"></span>\n            <div *ngIf=\"!escape; else escapeOut\">\n                <span *ngIf=\"!escape\" class=\"ui-message-text\" [innerHTML]=\"text\"></span>\n            </div>\n            <ng-template #escapeOut>\n                <span *ngIf=\"escape\" class=\"ui-message-text\">{{text}}</span>\n            </ng-template>\n        </div>\n    ",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], UIMessage);
    return UIMessage;
}());
export { UIMessage };
var MessageModule = /** @class */ (function () {
    function MessageModule() {
    }
    MessageModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [UIMessage],
            declarations: [UIMessage]
        })
    ], MessageModule);
    return MessageModule;
}());
export { MessageModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvbWVzc2FnZS8iLCJzb3VyY2VzIjpbIm1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQXFCN0M7SUFBQTtRQU1hLFdBQU0sR0FBWSxJQUFJLENBQUM7SUErQnBDLENBQUM7SUE3Qkcsc0JBQUksMkJBQUk7YUFBUjtZQUNJLElBQUksSUFBSSxHQUFXLElBQUksQ0FBQztZQUV4QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2YsUUFBTyxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNsQixLQUFLLFNBQVM7d0JBQ1YsSUFBSSxHQUFHLGFBQWEsQ0FBQzt3QkFDekIsTUFBTTtvQkFFTixLQUFLLE1BQU07d0JBQ1AsSUFBSSxHQUFHLG1CQUFtQixDQUFDO3dCQUMvQixNQUFNO29CQUVOLEtBQUssT0FBTzt3QkFDUixJQUFJLEdBQUcsYUFBYSxDQUFDO3dCQUN6QixNQUFNO29CQUVOLEtBQUssTUFBTTt3QkFDUCxJQUFJLEdBQUcsNEJBQTRCLENBQUM7d0JBQ3hDLE1BQU07b0JBRU47d0JBQ0ksSUFBSSxHQUFHLG1CQUFtQixDQUFDO3dCQUMvQixNQUFNO2lCQUNUO2FBQ0o7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDOzs7T0FBQTtJQWxDUTtRQUFSLEtBQUssRUFBRTsrQ0FBa0I7SUFFakI7UUFBUixLQUFLLEVBQUU7MkNBQWM7SUFFYjtRQUFSLEtBQUssRUFBRTs2Q0FBd0I7SUFOdkIsU0FBUztRQW5CckIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFdBQVc7WUFDckIsUUFBUSxFQUFFLDR2QkFjVDtZQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO1NBQ25ELENBQUM7T0FDVyxTQUFTLENBcUNyQjtJQUFELGdCQUFDO0NBQUEsQUFyQ0QsSUFxQ0M7U0FyQ1ksU0FBUztBQTRDdEI7SUFBQTtJQUE2QixDQUFDO0lBQWpCLGFBQWE7UUFMekIsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUNwQixZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUM7U0FDNUIsQ0FBQztPQUNXLGFBQWEsQ0FBSTtJQUFELG9CQUFDO0NBQUEsQUFBOUIsSUFBOEI7U0FBakIsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LElucHV0LENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC1tZXNzYWdlJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBhcmlhLWxpdmU9XCJwb2xpdGVcIiBjbGFzcz1cInVpLW1lc3NhZ2UgdWktd2lkZ2V0IHVpLWNvcm5lci1hbGxcIiAqbmdJZj1cInNldmVyaXR5XCJcclxuICAgICAgICBbbmdDbGFzc109XCJ7J3VpLW1lc3NhZ2UtaW5mbyc6IChzZXZlcml0eSA9PT0gJ2luZm8nKSxcclxuICAgICAgICAgICAgICAgICd1aS1tZXNzYWdlLXdhcm4nOiAoc2V2ZXJpdHkgPT09ICd3YXJuJyksXHJcbiAgICAgICAgICAgICAgICAndWktbWVzc2FnZS1lcnJvcic6IChzZXZlcml0eSA9PT0gJ2Vycm9yJyksXHJcbiAgICAgICAgICAgICAgICAndWktbWVzc2FnZS1zdWNjZXNzJzogKHNldmVyaXR5ID09PSAnc3VjY2VzcycpfVwiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lc3NhZ2UtaWNvblwiIFtuZ0NsYXNzXT1cImljb25cIj48L3NwYW4+XHJcbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhZXNjYXBlOyBlbHNlIGVzY2FwZU91dFwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhZXNjYXBlXCIgY2xhc3M9XCJ1aS1tZXNzYWdlLXRleHRcIiBbaW5uZXJIVE1MXT1cInRleHRcIj48L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI2VzY2FwZU91dD5cclxuICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiZXNjYXBlXCIgY2xhc3M9XCJ1aS1tZXNzYWdlLXRleHRcIj57e3RleHR9fTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcclxufSlcclxuZXhwb3J0IGNsYXNzIFVJTWVzc2FnZSB7XHJcblxyXG4gICAgQElucHV0KCkgc2V2ZXJpdHk6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSB0ZXh0OiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgZXNjYXBlOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBnZXQgaWNvbigpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBpY29uOiBzdHJpbmcgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zZXZlcml0eSkge1xyXG4gICAgICAgICAgICBzd2l0Y2godGhpcy5zZXZlcml0eSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnc3VjY2Vzcyc6XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbiA9ICdwaSBwaS1jaGVjayc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdpbmZvJzpcclxuICAgICAgICAgICAgICAgICAgICBpY29uID0gJ3BpIHBpLWluZm8tY2lyY2xlJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ2Vycm9yJzpcclxuICAgICAgICAgICAgICAgICAgICBpY29uID0gJ3BpIHBpLXRpbWVzJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ3dhcm4nOlxyXG4gICAgICAgICAgICAgICAgICAgIGljb24gPSAncGkgcGktZXhjbGFtYXRpb24tdHJpYW5nbGUnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpY29uID0gJ3BpIHBpLWluZm8tY2lyY2xlJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaWNvbjtcclxuICAgIH1cclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW1VJTWVzc2FnZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtVSU1lc3NhZ2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNZXNzYWdlTW9kdWxlIHsgfVxyXG4iXX0=