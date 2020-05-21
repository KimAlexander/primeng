var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, EventEmitter, Directive, Input, Output, ContentChildren, ContentChild, TemplateRef, AfterContentInit, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
var Header = /** @class */ (function () {
    function Header() {
    }
    Header = __decorate([
        Component({
            selector: 'p-header',
            template: '<ng-content></ng-content>'
        })
    ], Header);
    return Header;
}());
export { Header };
var Footer = /** @class */ (function () {
    function Footer() {
    }
    Footer = __decorate([
        Component({
            selector: 'p-footer',
            template: '<ng-content></ng-content>'
        })
    ], Footer);
    return Footer;
}());
export { Footer };
var PrimeTemplate = /** @class */ (function () {
    function PrimeTemplate(template) {
        this.template = template;
    }
    PrimeTemplate.prototype.getType = function () {
        return this.name;
    };
    PrimeTemplate.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    __decorate([
        Input()
    ], PrimeTemplate.prototype, "type", void 0);
    __decorate([
        Input('pTemplate')
    ], PrimeTemplate.prototype, "name", void 0);
    PrimeTemplate = __decorate([
        Directive({
            selector: '[pTemplate]',
            host: {}
        })
    ], PrimeTemplate);
    return PrimeTemplate;
}());
export { PrimeTemplate };
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Header, Footer, PrimeTemplate],
            declarations: [Header, Footer, PrimeTemplate]
        })
    ], SharedModule);
    return SharedModule;
}());
export { SharedModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9hcGkvIiwic291cmNlcyI6WyJzaGFyZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsU0FBUyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsZUFBZSxFQUFDLFlBQVksRUFBQyxXQUFXLEVBQUMsZ0JBQWdCLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9JLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBTXhDO0lBQUE7SUFBcUIsQ0FBQztJQUFULE1BQU07UUFKbEIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLDJCQUEyQjtTQUN4QyxDQUFDO09BQ1csTUFBTSxDQUFHO0lBQUQsYUFBQztDQUFBLEFBQXRCLElBQXNCO1NBQVQsTUFBTTtBQU1uQjtJQUFBO0lBQXFCLENBQUM7SUFBVCxNQUFNO1FBSmxCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSwyQkFBMkI7U0FDeEMsQ0FBQztPQUNXLE1BQU0sQ0FBRztJQUFELGFBQUM7Q0FBQSxBQUF0QixJQUFzQjtTQUFULE1BQU07QUFPbkI7SUFNSSx1QkFBbUIsUUFBMEI7UUFBMUIsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7SUFBRyxDQUFDO0lBRWpELCtCQUFPLEdBQVA7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQzs7Z0JBSjRCLFdBQVc7O0lBSi9CO1FBQVIsS0FBSyxFQUFFOytDQUFjO0lBRUY7UUFBbkIsS0FBSyxDQUFDLFdBQVcsQ0FBQzsrQ0FBYztJQUp4QixhQUFhO1FBTHpCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLElBQUksRUFBRSxFQUNMO1NBQ0osQ0FBQztPQUNXLGFBQWEsQ0FXekI7SUFBRCxvQkFBQztDQUFBLEFBWEQsSUFXQztTQVhZLGFBQWE7QUFrQjFCO0lBQUE7SUFBNEIsQ0FBQztJQUFoQixZQUFZO1FBTHhCLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztZQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLGFBQWEsQ0FBQztZQUN0QyxZQUFZLEVBQUUsQ0FBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLGFBQWEsQ0FBQztTQUM5QyxDQUFDO09BQ1csWUFBWSxDQUFJO0lBQUQsbUJBQUM7Q0FBQSxBQUE3QixJQUE2QjtTQUFoQixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxFdmVudEVtaXR0ZXIsRGlyZWN0aXZlLElucHV0LE91dHB1dCxDb250ZW50Q2hpbGRyZW4sQ29udGVudENoaWxkLFRlbXBsYXRlUmVmLEFmdGVyQ29udGVudEluaXQsUXVlcnlMaXN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLWhlYWRlcicsXHJcbiAgICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBIZWFkZXIge31cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLWZvb3RlcicsXHJcbiAgICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGb290ZXIge31cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbcFRlbXBsYXRlXScsXHJcbiAgICBob3N0OiB7XHJcbiAgICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQcmltZVRlbXBsYXRlIHtcclxuICAgIFxyXG4gICAgQElucHV0KCkgdHlwZTogc3RyaW5nO1xyXG4gICAgXHJcbiAgICBASW5wdXQoJ3BUZW1wbGF0ZScpIG5hbWU6IHN0cmluZztcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxyXG4gICAgXHJcbiAgICBnZXRUeXBlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcclxuICAgIH1cclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW0hlYWRlcixGb290ZXIsUHJpbWVUZW1wbGF0ZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtIZWFkZXIsRm9vdGVyLFByaW1lVGVtcGxhdGVdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaGFyZWRNb2R1bGUgeyB9XHJcbiJdfQ==