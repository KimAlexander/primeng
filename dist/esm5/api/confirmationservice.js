var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
var ConfirmationService = /** @class */ (function () {
    function ConfirmationService() {
        this.requireConfirmationSource = new Subject();
        this.acceptConfirmationSource = new Subject();
        this.requireConfirmation$ = this.requireConfirmationSource.asObservable();
        this.accept = this.acceptConfirmationSource.asObservable();
    }
    ConfirmationService.prototype.confirm = function (confirmation) {
        this.requireConfirmationSource.next(confirmation);
        return this;
    };
    ConfirmationService.prototype.close = function () {
        this.requireConfirmationSource.next(null);
        return this;
    };
    ConfirmationService.prototype.onAccept = function () {
        this.acceptConfirmationSource.next();
    };
    ConfirmationService = __decorate([
        Injectable()
    ], ConfirmationService);
    return ConfirmationService;
}());
export { ConfirmationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybWF0aW9uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvYXBpLyIsInNvdXJjZXMiOlsiY29uZmlybWF0aW9uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFJL0I7SUFBQTtRQUVZLDhCQUF5QixHQUFHLElBQUksT0FBTyxFQUFnQixDQUFDO1FBQ3hELDZCQUF3QixHQUFHLElBQUksT0FBTyxFQUFnQixDQUFDO1FBRS9ELHlCQUFvQixHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNyRSxXQUFNLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFlBQVksRUFBRSxDQUFDO0lBZTFELENBQUM7SUFiRyxxQ0FBTyxHQUFQLFVBQVEsWUFBMEI7UUFDOUIsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNsRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsbUNBQUssR0FBTDtRQUNJLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELHNDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekMsQ0FBQztJQXBCUSxtQkFBbUI7UUFEL0IsVUFBVSxFQUFFO09BQ0EsbUJBQW1CLENBcUIvQjtJQUFELDBCQUFDO0NBQUEsQUFyQkQsSUFxQkM7U0FyQlksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IENvbmZpcm1hdGlvbiB9IGZyb20gJy4vY29uZmlybWF0aW9uJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENvbmZpcm1hdGlvblNlcnZpY2Uge1xyXG5cclxuICAgIHByaXZhdGUgcmVxdWlyZUNvbmZpcm1hdGlvblNvdXJjZSA9IG5ldyBTdWJqZWN0PENvbmZpcm1hdGlvbj4oKTtcclxuICAgIHByaXZhdGUgYWNjZXB0Q29uZmlybWF0aW9uU291cmNlID0gbmV3IFN1YmplY3Q8Q29uZmlybWF0aW9uPigpO1xyXG5cclxuICAgIHJlcXVpcmVDb25maXJtYXRpb24kID0gdGhpcy5yZXF1aXJlQ29uZmlybWF0aW9uU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgYWNjZXB0ID0gdGhpcy5hY2NlcHRDb25maXJtYXRpb25Tb3VyY2UuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gICAgY29uZmlybShjb25maXJtYXRpb246IENvbmZpcm1hdGlvbikge1xyXG4gICAgICAgIHRoaXMucmVxdWlyZUNvbmZpcm1hdGlvblNvdXJjZS5uZXh0KGNvbmZpcm1hdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5yZXF1aXJlQ29uZmlybWF0aW9uU291cmNlLm5leHQobnVsbCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgb25BY2NlcHQoKSB7XHJcbiAgICAgICAgdGhpcy5hY2NlcHRDb25maXJtYXRpb25Tb3VyY2UubmV4dCgpO1xyXG4gICAgfVxyXG59Il19