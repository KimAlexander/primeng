var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
let TreeDragDropService = class TreeDragDropService {
    constructor() {
        this.dragStartSource = new Subject();
        this.dragStopSource = new Subject();
        this.dragStart$ = this.dragStartSource.asObservable();
        this.dragStop$ = this.dragStopSource.asObservable();
    }
    startDrag(event) {
        this.dragStartSource.next(event);
    }
    stopDrag(event) {
        this.dragStopSource.next(event);
    }
};
TreeDragDropService = __decorate([
    Injectable()
], TreeDragDropService);
export { TreeDragDropService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZWRyYWdkcm9wc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvYXBpLyIsInNvdXJjZXMiOlsidHJlZWRyYWdkcm9wc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFJL0IsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUFBaEM7UUFFWSxvQkFBZSxHQUFHLElBQUksT0FBTyxFQUFxQixDQUFDO1FBQ25ELG1CQUFjLEdBQUcsSUFBSSxPQUFPLEVBQXFCLENBQUM7UUFFMUQsZUFBVSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDakQsY0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUM7SUFTbkQsQ0FBQztJQVBHLFNBQVMsQ0FBQyxLQUF3QjtRQUM5QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQXdCO1FBQzdCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Q0FDSixDQUFBO0FBZlksbUJBQW1CO0lBRC9CLFVBQVUsRUFBRTtHQUNBLG1CQUFtQixDQWUvQjtTQWZZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBUcmVlTm9kZURyYWdFdmVudCB9IGZyb20gJy4vdHJlZW5vZGVkcmFnZXZlbnQnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVHJlZURyYWdEcm9wU2VydmljZSB7XHJcbiAgICBcclxuICAgIHByaXZhdGUgZHJhZ1N0YXJ0U291cmNlID0gbmV3IFN1YmplY3Q8VHJlZU5vZGVEcmFnRXZlbnQ+KCk7XHJcbiAgICBwcml2YXRlIGRyYWdTdG9wU291cmNlID0gbmV3IFN1YmplY3Q8VHJlZU5vZGVEcmFnRXZlbnQ+KCk7XHJcbiAgICBcclxuICAgIGRyYWdTdGFydCQgPSB0aGlzLmRyYWdTdGFydFNvdXJjZS5hc09ic2VydmFibGUoKTtcclxuICAgIGRyYWdTdG9wJCA9IHRoaXMuZHJhZ1N0b3BTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICBcclxuICAgIHN0YXJ0RHJhZyhldmVudDogVHJlZU5vZGVEcmFnRXZlbnQpIHtcclxuICAgICAgICB0aGlzLmRyYWdTdGFydFNvdXJjZS5uZXh0KGV2ZW50KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc3RvcERyYWcoZXZlbnQ6IFRyZWVOb2RlRHJhZ0V2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5kcmFnU3RvcFNvdXJjZS5uZXh0KGV2ZW50KTtcclxuICAgIH1cclxufSJdfQ==