var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
var TerminalService = /** @class */ (function () {
    function TerminalService() {
        this.commandSource = new Subject();
        this.responseSource = new Subject();
        this.commandHandler = this.commandSource.asObservable();
        this.responseHandler = this.responseSource.asObservable();
    }
    TerminalService.prototype.sendCommand = function (command) {
        if (command) {
            this.commandSource.next(command);
        }
    };
    TerminalService.prototype.sendResponse = function (response) {
        if (response) {
            this.responseSource.next(response);
        }
    };
    TerminalService = __decorate([
        Injectable()
    ], TerminalService);
    return TerminalService;
}());
export { TerminalService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVybWluYWxzZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy90ZXJtaW5hbC8iLCJzb3VyY2VzIjpbInRlcm1pbmFsc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHL0I7SUFBQTtRQUVZLGtCQUFhLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUN0QyxtQkFBYyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7UUFFL0MsbUJBQWMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ25ELG9CQUFlLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQWF6RCxDQUFDO0lBWEcscUNBQVcsR0FBWCxVQUFZLE9BQWU7UUFDdkIsSUFBSSxPQUFPLEVBQUU7WUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNwQztJQUNMLENBQUM7SUFFRCxzQ0FBWSxHQUFaLFVBQWEsUUFBZ0I7UUFDekIsSUFBSSxRQUFRLEVBQUU7WUFDVixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN0QztJQUNMLENBQUM7SUFsQlEsZUFBZTtRQUQzQixVQUFVLEVBQUU7T0FDQSxlQUFlLENBbUIzQjtJQUFELHNCQUFDO0NBQUEsQUFuQkQsSUFtQkM7U0FuQlksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVGVybWluYWxTZXJ2aWNlIHtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBjb21tYW5kU291cmNlID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xyXG4gICAgcHJpdmF0ZSByZXNwb25zZVNvdXJjZSA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuICAgIFxyXG4gICAgY29tbWFuZEhhbmRsZXIgPSB0aGlzLmNvbW1hbmRTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICByZXNwb25zZUhhbmRsZXIgPSB0aGlzLnJlc3BvbnNlU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgXHJcbiAgICBzZW5kQ29tbWFuZChjb21tYW5kOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoY29tbWFuZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRTb3VyY2UubmV4dChjb21tYW5kKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNlbmRSZXNwb25zZShyZXNwb25zZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzcG9uc2VTb3VyY2UubmV4dChyZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19