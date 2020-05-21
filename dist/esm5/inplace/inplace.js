var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
var InplaceDisplay = /** @class */ (function () {
    function InplaceDisplay() {
    }
    InplaceDisplay = __decorate([
        Component({
            selector: 'p-inplaceDisplay',
            template: '<ng-content></ng-content>'
        })
    ], InplaceDisplay);
    return InplaceDisplay;
}());
export { InplaceDisplay };
var InplaceContent = /** @class */ (function () {
    function InplaceContent() {
    }
    InplaceContent = __decorate([
        Component({
            selector: 'p-inplaceContent',
            template: '<ng-content></ng-content>'
        })
    ], InplaceContent);
    return InplaceContent;
}());
export { InplaceContent };
var Inplace = /** @class */ (function () {
    function Inplace() {
        this.closeIcon = 'pi pi-times';
        this.onActivate = new EventEmitter();
        this.onDeactivate = new EventEmitter();
    }
    Inplace.prototype.activate = function (event) {
        if (!this.disabled) {
            this.active = true;
            this.onActivate.emit(event);
        }
    };
    Inplace.prototype.deactivate = function (event) {
        if (!this.disabled) {
            this.active = false;
            this.hover = false;
            this.onDeactivate.emit(event);
        }
    };
    Inplace.prototype.onKeydown = function (event) {
        if (event.which === 13) {
            this.activate(event);
            event.preventDefault();
        }
    };
    __decorate([
        Input()
    ], Inplace.prototype, "active", void 0);
    __decorate([
        Input()
    ], Inplace.prototype, "closable", void 0);
    __decorate([
        Input()
    ], Inplace.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], Inplace.prototype, "style", void 0);
    __decorate([
        Input()
    ], Inplace.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], Inplace.prototype, "closeIcon", void 0);
    __decorate([
        Output()
    ], Inplace.prototype, "onActivate", void 0);
    __decorate([
        Output()
    ], Inplace.prototype, "onDeactivate", void 0);
    Inplace = __decorate([
        Component({
            selector: 'p-inplace',
            template: "\n        <div [ngClass]=\"{'ui-inplace ui-widget': true, 'ui-inplace-closable': closable}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-inplace-display\" (click)=\"activate($event)\" tabindex=\"0\" (keydown)=\"onKeydown($event)\"   \n                [ngClass]=\"{'ui-state-disabled':disabled}\" *ngIf=\"!active\">\n                <ng-content select=\"[pInplaceDisplay]\"></ng-content>\n            </div>\n            <div class=\"ui-inplace-content\" *ngIf=\"active\">\n                <ng-content select=\"[pInplaceContent]\"></ng-content>\n                <button type=\"button\" [icon]=\"closeIcon\" pButton (click)=\"deactivate($event)\" *ngIf=\"closable\"></button>\n            </div>\n        </div>\n    ",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], Inplace);
    return Inplace;
}());
export { Inplace };
var InplaceModule = /** @class */ (function () {
    function InplaceModule() {
    }
    InplaceModule = __decorate([
        NgModule({
            imports: [CommonModule, ButtonModule],
            exports: [Inplace, InplaceDisplay, InplaceContent, ButtonModule],
            declarations: [Inplace, InplaceDisplay, InplaceContent]
        })
    ], InplaceModule);
    return InplaceModule;
}());
export { InplaceModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wbGFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvaW5wbGFjZS8iLCJzb3VyY2VzIjpbImlucGxhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbkcsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQU01QztJQUFBO0lBQTZCLENBQUM7SUFBakIsY0FBYztRQUoxQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFFBQVEsRUFBRSwyQkFBMkI7U0FDeEMsQ0FBQztPQUNXLGNBQWMsQ0FBRztJQUFELHFCQUFDO0NBQUEsQUFBOUIsSUFBOEI7U0FBakIsY0FBYztBQU0zQjtJQUFBO0lBQTZCLENBQUM7SUFBakIsY0FBYztRQUoxQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFFBQVEsRUFBRSwyQkFBMkI7U0FDeEMsQ0FBQztPQUNXLGNBQWMsQ0FBRztJQUFELHFCQUFDO0NBQUEsQUFBOUIsSUFBOEI7U0FBakIsY0FBYztBQWtCM0I7SUFBQTtRQVlhLGNBQVMsR0FBVyxhQUFhLENBQUM7UUFFakMsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRW5ELGlCQUFZLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUF5Qm5FLENBQUM7SUFyQkcsMEJBQVEsR0FBUixVQUFTLEtBQWE7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0I7SUFDTCxDQUFDO0lBRUQsNEJBQVUsR0FBVixVQUFXLEtBQWE7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDakM7SUFDTCxDQUFDO0lBRUQsMkJBQVMsR0FBVCxVQUFVLEtBQW9CO1FBQzFCLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxFQUFFLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDMUI7SUFDTCxDQUFDO0lBdENRO1FBQVIsS0FBSyxFQUFFOzJDQUFpQjtJQUVoQjtRQUFSLEtBQUssRUFBRTs2Q0FBbUI7SUFFbEI7UUFBUixLQUFLLEVBQUU7NkNBQW1CO0lBRWxCO1FBQVIsS0FBSyxFQUFFOzBDQUFZO0lBRVg7UUFBUixLQUFLLEVBQUU7K0NBQW9CO0lBRW5CO1FBQVIsS0FBSyxFQUFFOzhDQUFtQztJQUVqQztRQUFULE1BQU0sRUFBRTsrQ0FBb0Q7SUFFbkQ7UUFBVCxNQUFNLEVBQUU7aURBQXNEO0lBaEJ0RCxPQUFPO1FBaEJuQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsV0FBVztZQUNyQixRQUFRLEVBQUUsMHVCQVdUO1lBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87U0FDbkQsQ0FBQztPQUNXLE9BQU8sQ0F5Q25CO0lBQUQsY0FBQztDQUFBLEFBekNELElBeUNDO1NBekNZLE9BQU87QUFnRHBCO0lBQUE7SUFBNkIsQ0FBQztJQUFqQixhQUFhO1FBTHpCLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBQyxZQUFZLENBQUM7WUFDcEMsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFDLGNBQWMsRUFBQyxjQUFjLEVBQUMsWUFBWSxDQUFDO1lBQzdELFlBQVksRUFBRSxDQUFDLE9BQU8sRUFBQyxjQUFjLEVBQUMsY0FBYyxDQUFDO1NBQ3hELENBQUM7T0FDVyxhQUFhLENBQUk7SUFBRCxvQkFBQztDQUFBLEFBQTlCLElBQThCO1NBQWpCLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyLENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7QnV0dG9uTW9kdWxlfSBmcm9tICdwcmltZW5nL2J1dHRvbic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC1pbnBsYWNlRGlzcGxheScsXHJcbiAgICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJbnBsYWNlRGlzcGxheSB7fVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3AtaW5wbGFjZUNvbnRlbnQnLFxyXG4gICAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgSW5wbGFjZUNvbnRlbnQge31cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLWlucGxhY2UnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cInsndWktaW5wbGFjZSB1aS13aWRnZXQnOiB0cnVlLCAndWktaW5wbGFjZS1jbG9zYWJsZSc6IGNsb3NhYmxlfVwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWlucGxhY2UtZGlzcGxheVwiIChjbGljayk9XCJhY3RpdmF0ZSgkZXZlbnQpXCIgdGFiaW5kZXg9XCIwXCIgKGtleWRvd24pPVwib25LZXlkb3duKCRldmVudClcIiAgIFxyXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1kaXNhYmxlZCc6ZGlzYWJsZWR9XCIgKm5nSWY9XCIhYWN0aXZlXCI+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbcElucGxhY2VEaXNwbGF5XVwiPjwvbmctY29udGVudD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1pbnBsYWNlLWNvbnRlbnRcIiAqbmdJZj1cImFjdGl2ZVwiPlxyXG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3BJbnBsYWNlQ29udGVudF1cIj48L25nLWNvbnRlbnQ+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBbaWNvbl09XCJjbG9zZUljb25cIiBwQnV0dG9uIChjbGljayk9XCJkZWFjdGl2YXRlKCRldmVudClcIiAqbmdJZj1cImNsb3NhYmxlXCI+PC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxyXG59KVxyXG5leHBvcnQgY2xhc3MgSW5wbGFjZSB7XHJcblxyXG4gICAgQElucHV0KCkgYWN0aXZlOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIGNsb3NhYmxlOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGNsb3NlSWNvbjogc3RyaW5nID0gJ3BpIHBpLXRpbWVzJztcclxuXHJcbiAgICBAT3V0cHV0KCkgb25BY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uRGVhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgaG92ZXI6IGJvb2xlYW47XHJcblxyXG4gICAgYWN0aXZhdGUoZXZlbnQ/OiBFdmVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMub25BY3RpdmF0ZS5lbWl0KGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGVhY3RpdmF0ZShldmVudD86IEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaG92ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5vbkRlYWN0aXZhdGUuZW1pdChldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgICAgIGlmIChldmVudC53aGljaCA9PT0gMTMpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZShldmVudCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSxCdXR0b25Nb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW0lucGxhY2UsSW5wbGFjZURpc3BsYXksSW5wbGFjZUNvbnRlbnQsQnV0dG9uTW9kdWxlXSxcclxuICAgIGRlY2xhcmF0aW9uczogW0lucGxhY2UsSW5wbGFjZURpc3BsYXksSW5wbGFjZUNvbnRlbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJbnBsYWNlTW9kdWxlIHsgfVxyXG4iXX0=