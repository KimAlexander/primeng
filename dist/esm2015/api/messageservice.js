var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
let MessageService = class MessageService {
    constructor() {
        this.messageSource = new Subject();
        this.clearSource = new Subject();
        this.messageObserver = this.messageSource.asObservable();
        this.clearObserver = this.clearSource.asObservable();
    }
    add(message) {
        if (message) {
            this.messageSource.next(message);
        }
    }
    addAll(messages) {
        if (messages && messages.length) {
            this.messageSource.next(messages);
        }
    }
    clear(key) {
        this.clearSource.next(key || null);
    }
};
MessageService = __decorate([
    Injectable()
], MessageService);
export { MessageService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2FwaS8iLCJzb3VyY2VzIjpbIm1lc3NhZ2VzZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUkvQixJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBQTNCO1FBRVksa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBcUIsQ0FBQztRQUNqRCxnQkFBVyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7UUFFNUMsb0JBQWUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BELGtCQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQWtCcEQsQ0FBQztJQWhCRyxHQUFHLENBQUMsT0FBZ0I7UUFDaEIsSUFBSSxPQUFPLEVBQUU7WUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNwQztJQUNMLENBQUM7SUFFRCxNQUFNLENBQUMsUUFBbUI7UUFDdEIsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUM3QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNyQztJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsR0FBWTtRQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0NBRUosQ0FBQTtBQXhCWSxjQUFjO0lBRDFCLFVBQVUsRUFBRTtHQUNBLGNBQWMsQ0F3QjFCO1NBeEJZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJy4vbWVzc2FnZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBNZXNzYWdlU2VydmljZSB7XHJcbiAgICBcclxuICAgIHByaXZhdGUgbWVzc2FnZVNvdXJjZSA9IG5ldyBTdWJqZWN0PE1lc3NhZ2V8TWVzc2FnZVtdPigpO1xyXG4gICAgcHJpdmF0ZSBjbGVhclNvdXJjZSA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuICAgIFxyXG4gICAgbWVzc2FnZU9ic2VydmVyID0gdGhpcy5tZXNzYWdlU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgY2xlYXJPYnNlcnZlciA9IHRoaXMuY2xlYXJTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICBcclxuICAgIGFkZChtZXNzYWdlOiBNZXNzYWdlKSB7XHJcbiAgICAgICAgaWYgKG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlU291cmNlLm5leHQobWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBhZGRBbGwobWVzc2FnZXM6IE1lc3NhZ2VbXSkge1xyXG4gICAgICAgIGlmIChtZXNzYWdlcyAmJiBtZXNzYWdlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlU291cmNlLm5leHQobWVzc2FnZXMpO1xyXG4gICAgICAgIH0gXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNsZWFyKGtleT86IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuY2xlYXJTb3VyY2UubmV4dChrZXl8fG51bGwpO1xyXG4gICAgfVxyXG4gICAgXHJcbn0iXX0=