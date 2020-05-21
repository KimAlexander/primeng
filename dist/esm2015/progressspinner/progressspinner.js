var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
let ProgressSpinner = class ProgressSpinner {
    constructor() {
        this.strokeWidth = "2";
        this.fill = "none";
        this.animationDuration = "2s";
    }
};
__decorate([
    Input()
], ProgressSpinner.prototype, "style", void 0);
__decorate([
    Input()
], ProgressSpinner.prototype, "styleClass", void 0);
__decorate([
    Input()
], ProgressSpinner.prototype, "strokeWidth", void 0);
__decorate([
    Input()
], ProgressSpinner.prototype, "fill", void 0);
__decorate([
    Input()
], ProgressSpinner.prototype, "animationDuration", void 0);
ProgressSpinner = __decorate([
    Component({
        selector: 'p-progressSpinner',
        template: `
        <div class="ui-progress-spinner" [ngStyle]="style" [ngClass]="styleClass"  role="alert" aria-busy="true">
            <svg class="ui-progress-spinner-svg" viewBox="25 25 50 50" [style.animation-duration]="animationDuration">
                <circle class="ui-progress-spinner-circle" cx="50" cy="50" r="20" [attr.fill]="fill" [attr.stroke-width]="strokeWidth" stroke-miterlimit="10"/>
            </svg>
        </div>
    `,
        changeDetection: ChangeDetectionStrategy.Default
    })
], ProgressSpinner);
export { ProgressSpinner };
let ProgressSpinnerModule = class ProgressSpinnerModule {
};
ProgressSpinnerModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [ProgressSpinner],
        declarations: [ProgressSpinner]
    })
], ProgressSpinnerModule);
export { ProgressSpinnerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NzcGlubmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9wcm9ncmVzc3NwaW5uZXIvIiwic291cmNlcyI6WyJwcm9ncmVzc3NwaW5uZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQWE3QyxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBQTVCO1FBTWEsZ0JBQVcsR0FBVyxHQUFHLENBQUM7UUFFMUIsU0FBSSxHQUFXLE1BQU0sQ0FBQztRQUV0QixzQkFBaUIsR0FBVyxJQUFJLENBQUM7SUFFOUMsQ0FBQztDQUFBLENBQUE7QUFWWTtJQUFSLEtBQUssRUFBRTs4Q0FBWTtBQUVYO0lBQVIsS0FBSyxFQUFFO21EQUFvQjtBQUVuQjtJQUFSLEtBQUssRUFBRTtvREFBMkI7QUFFMUI7SUFBUixLQUFLLEVBQUU7NkNBQXVCO0FBRXRCO0lBQVIsS0FBSyxFQUFFOzBEQUFrQztBQVZqQyxlQUFlO0lBWDNCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxtQkFBbUI7UUFDN0IsUUFBUSxFQUFFOzs7Ozs7S0FNVDtRQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO0tBQ25ELENBQUM7R0FDVyxlQUFlLENBWTNCO1NBWlksZUFBZTtBQW1CNUIsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7Q0FBSSxDQUFBO0FBQXpCLHFCQUFxQjtJQUxqQyxRQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7UUFDdkIsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDO1FBQzFCLFlBQVksRUFBRSxDQUFDLGVBQWUsQ0FBQztLQUNsQyxDQUFDO0dBQ1cscUJBQXFCLENBQUk7U0FBekIscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsSW5wdXQsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLXByb2dyZXNzU3Bpbm5lcicsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1wcm9ncmVzcy1zcGlubmVyXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbbmdDbGFzc109XCJzdHlsZUNsYXNzXCIgIHJvbGU9XCJhbGVydFwiIGFyaWEtYnVzeT1cInRydWVcIj5cclxuICAgICAgICAgICAgPHN2ZyBjbGFzcz1cInVpLXByb2dyZXNzLXNwaW5uZXItc3ZnXCIgdmlld0JveD1cIjI1IDI1IDUwIDUwXCIgW3N0eWxlLmFuaW1hdGlvbi1kdXJhdGlvbl09XCJhbmltYXRpb25EdXJhdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgPGNpcmNsZSBjbGFzcz1cInVpLXByb2dyZXNzLXNwaW5uZXItY2lyY2xlXCIgY3g9XCI1MFwiIGN5PVwiNTBcIiByPVwiMjBcIiBbYXR0ci5maWxsXT1cImZpbGxcIiBbYXR0ci5zdHJva2Utd2lkdGhdPVwic3Ryb2tlV2lkdGhcIiBzdHJva2UtbWl0ZXJsaW1pdD1cIjEwXCIvPlxyXG4gICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcclxufSlcclxuZXhwb3J0IGNsYXNzIFByb2dyZXNzU3Bpbm5lciB7XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcclxuICAgIFxyXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBzdHJva2VXaWR0aDogc3RyaW5nID0gXCIyXCI7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGZpbGw6IHN0cmluZyA9IFwibm9uZVwiO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBhbmltYXRpb25EdXJhdGlvbjogc3RyaW5nID0gXCIyc1wiO1xyXG4gICAgXHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICAgIGV4cG9ydHM6IFtQcm9ncmVzc1NwaW5uZXJdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbUHJvZ3Jlc3NTcGlubmVyXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUHJvZ3Jlc3NTcGlubmVyTW9kdWxlIHsgfSJdfQ==