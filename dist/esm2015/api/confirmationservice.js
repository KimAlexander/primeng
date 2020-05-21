var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
let ConfirmationService = class ConfirmationService {
    constructor() {
        this.requireConfirmationSource = new Subject();
        this.acceptConfirmationSource = new Subject();
        this.requireConfirmation$ = this.requireConfirmationSource.asObservable();
        this.accept = this.acceptConfirmationSource.asObservable();
    }
    confirm(confirmation) {
        this.requireConfirmationSource.next(confirmation);
        return this;
    }
    close() {
        this.requireConfirmationSource.next(null);
        return this;
    }
    onAccept() {
        this.acceptConfirmationSource.next();
    }
};
ConfirmationService = __decorate([
    Injectable()
], ConfirmationService);
export { ConfirmationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybWF0aW9uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvYXBpLyIsInNvdXJjZXMiOlsiY29uZmlybWF0aW9uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFJL0IsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUFBaEM7UUFFWSw4QkFBeUIsR0FBRyxJQUFJLE9BQU8sRUFBZ0IsQ0FBQztRQUN4RCw2QkFBd0IsR0FBRyxJQUFJLE9BQU8sRUFBZ0IsQ0FBQztRQUUvRCx5QkFBb0IsR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDckUsV0FBTSxHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQWUxRCxDQUFDO0lBYkcsT0FBTyxDQUFDLFlBQTBCO1FBQzlCLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbEQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELEtBQUs7UUFDRCxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pDLENBQUM7Q0FDSixDQUFBO0FBckJZLG1CQUFtQjtJQUQvQixVQUFVLEVBQUU7R0FDQSxtQkFBbUIsQ0FxQi9CO1NBckJZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBDb25maXJtYXRpb24gfSBmcm9tICcuL2NvbmZpcm1hdGlvbic7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDb25maXJtYXRpb25TZXJ2aWNlIHtcclxuXHJcbiAgICBwcml2YXRlIHJlcXVpcmVDb25maXJtYXRpb25Tb3VyY2UgPSBuZXcgU3ViamVjdDxDb25maXJtYXRpb24+KCk7XHJcbiAgICBwcml2YXRlIGFjY2VwdENvbmZpcm1hdGlvblNvdXJjZSA9IG5ldyBTdWJqZWN0PENvbmZpcm1hdGlvbj4oKTtcclxuXHJcbiAgICByZXF1aXJlQ29uZmlybWF0aW9uJCA9IHRoaXMucmVxdWlyZUNvbmZpcm1hdGlvblNvdXJjZS5hc09ic2VydmFibGUoKTtcclxuICAgIGFjY2VwdCA9IHRoaXMuYWNjZXB0Q29uZmlybWF0aW9uU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xyXG5cclxuICAgIGNvbmZpcm0oY29uZmlybWF0aW9uOiBDb25maXJtYXRpb24pIHtcclxuICAgICAgICB0aGlzLnJlcXVpcmVDb25maXJtYXRpb25Tb3VyY2UubmV4dChjb25maXJtYXRpb24pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMucmVxdWlyZUNvbmZpcm1hdGlvblNvdXJjZS5uZXh0KG51bGwpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQWNjZXB0KCkge1xyXG4gICAgICAgIHRoaXMuYWNjZXB0Q29uZmlybWF0aW9uU291cmNlLm5leHQoKTtcclxuICAgIH1cclxufSJdfQ==