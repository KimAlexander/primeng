var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, EventEmitter, Directive, Input, Output, ContentChildren, ContentChild, TemplateRef, AfterContentInit, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
let Header = class Header {
};
Header = __decorate([
    Component({
        selector: 'p-header',
        template: '<ng-content></ng-content>'
    })
], Header);
export { Header };
let Footer = class Footer {
};
Footer = __decorate([
    Component({
        selector: 'p-footer',
        template: '<ng-content></ng-content>'
    })
], Footer);
export { Footer };
let PrimeTemplate = class PrimeTemplate {
    constructor(template) {
        this.template = template;
    }
    getType() {
        return this.name;
    }
};
PrimeTemplate.ctorParameters = () => [
    { type: TemplateRef }
];
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
export { PrimeTemplate };
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Header, Footer, PrimeTemplate],
        declarations: [Header, Footer, PrimeTemplate]
    })
], SharedModule);
export { SharedModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9hcGkvIiwic291cmNlcyI6WyJzaGFyZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsU0FBUyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsZUFBZSxFQUFDLFlBQVksRUFBQyxXQUFXLEVBQUMsZ0JBQWdCLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9JLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBTXhDLElBQWEsTUFBTSxHQUFuQixNQUFhLE1BQU07Q0FBRyxDQUFBO0FBQVQsTUFBTTtJQUpsQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsVUFBVTtRQUNwQixRQUFRLEVBQUUsMkJBQTJCO0tBQ3hDLENBQUM7R0FDVyxNQUFNLENBQUc7U0FBVCxNQUFNO0FBTW5CLElBQWEsTUFBTSxHQUFuQixNQUFhLE1BQU07Q0FBRyxDQUFBO0FBQVQsTUFBTTtJQUpsQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsVUFBVTtRQUNwQixRQUFRLEVBQUUsMkJBQTJCO0tBQ3hDLENBQUM7R0FDVyxNQUFNLENBQUc7U0FBVCxNQUFNO0FBT25CLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFNdEIsWUFBbUIsUUFBMEI7UUFBMUIsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7SUFBRyxDQUFDO0lBRWpELE9BQU87UUFDSCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztDQUNKLENBQUE7O1lBTGdDLFdBQVc7O0FBSi9CO0lBQVIsS0FBSyxFQUFFOzJDQUFjO0FBRUY7SUFBbkIsS0FBSyxDQUFDLFdBQVcsQ0FBQzsyQ0FBYztBQUp4QixhQUFhO0lBTHpCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxhQUFhO1FBQ3ZCLElBQUksRUFBRSxFQUNMO0tBQ0osQ0FBQztHQUNXLGFBQWEsQ0FXekI7U0FYWSxhQUFhO0FBa0IxQixJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFZO0NBQUksQ0FBQTtBQUFoQixZQUFZO0lBTHhCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztRQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLGFBQWEsQ0FBQztRQUN0QyxZQUFZLEVBQUUsQ0FBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLGFBQWEsQ0FBQztLQUM5QyxDQUFDO0dBQ1csWUFBWSxDQUFJO1NBQWhCLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLEV2ZW50RW1pdHRlcixEaXJlY3RpdmUsSW5wdXQsT3V0cHV0LENvbnRlbnRDaGlsZHJlbixDb250ZW50Q2hpbGQsVGVtcGxhdGVSZWYsQWZ0ZXJDb250ZW50SW5pdCxRdWVyeUxpc3R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3AtaGVhZGVyJyxcclxuICAgIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PidcclxufSlcclxuZXhwb3J0IGNsYXNzIEhlYWRlciB7fVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3AtZm9vdGVyJyxcclxuICAgIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PidcclxufSlcclxuZXhwb3J0IGNsYXNzIEZvb3RlciB7fVxyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1twVGVtcGxhdGVdJyxcclxuICAgIGhvc3Q6IHtcclxuICAgIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIFByaW1lVGVtcGxhdGUge1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSB0eXBlOiBzdHJpbmc7XHJcbiAgICBcclxuICAgIEBJbnB1dCgncFRlbXBsYXRlJykgbmFtZTogc3RyaW5nO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4pIHt9XHJcbiAgICBcclxuICAgIGdldFR5cGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xyXG4gICAgfVxyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgICBleHBvcnRzOiBbSGVhZGVyLEZvb3RlcixQcmltZVRlbXBsYXRlXSxcclxuICAgIGRlY2xhcmF0aW9uczogW0hlYWRlcixGb290ZXIsUHJpbWVUZW1wbGF0ZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNoYXJlZE1vZHVsZSB7IH1cclxuIl19