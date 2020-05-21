var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
var ProgressSpinner = /** @class */ (function () {
    function ProgressSpinner() {
        this.strokeWidth = "2";
        this.fill = "none";
        this.animationDuration = "2s";
    }
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
            template: "\n        <div class=\"ui-progress-spinner\" [ngStyle]=\"style\" [ngClass]=\"styleClass\"  role=\"alert\" aria-busy=\"true\">\n            <svg class=\"ui-progress-spinner-svg\" viewBox=\"25 25 50 50\" [style.animation-duration]=\"animationDuration\">\n                <circle class=\"ui-progress-spinner-circle\" cx=\"50\" cy=\"50\" r=\"20\" [attr.fill]=\"fill\" [attr.stroke-width]=\"strokeWidth\" stroke-miterlimit=\"10\"/>\n            </svg>\n        </div>\n    ",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], ProgressSpinner);
    return ProgressSpinner;
}());
export { ProgressSpinner };
var ProgressSpinnerModule = /** @class */ (function () {
    function ProgressSpinnerModule() {
    }
    ProgressSpinnerModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [ProgressSpinner],
            declarations: [ProgressSpinner]
        })
    ], ProgressSpinnerModule);
    return ProgressSpinnerModule;
}());
export { ProgressSpinnerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NzcGlubmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9wcm9ncmVzc3NwaW5uZXIvIiwic291cmNlcyI6WyJwcm9ncmVzc3NwaW5uZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQWE3QztJQUFBO1FBTWEsZ0JBQVcsR0FBVyxHQUFHLENBQUM7UUFFMUIsU0FBSSxHQUFXLE1BQU0sQ0FBQztRQUV0QixzQkFBaUIsR0FBVyxJQUFJLENBQUM7SUFFOUMsQ0FBQztJQVZZO1FBQVIsS0FBSyxFQUFFO2tEQUFZO0lBRVg7UUFBUixLQUFLLEVBQUU7dURBQW9CO0lBRW5CO1FBQVIsS0FBSyxFQUFFO3dEQUEyQjtJQUUxQjtRQUFSLEtBQUssRUFBRTtpREFBdUI7SUFFdEI7UUFBUixLQUFLLEVBQUU7OERBQWtDO0lBVmpDLGVBQWU7UUFYM0IsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixRQUFRLEVBQUUsc2RBTVQ7WUFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztTQUNuRCxDQUFDO09BQ1csZUFBZSxDQVkzQjtJQUFELHNCQUFDO0NBQUEsQUFaRCxJQVlDO1NBWlksZUFBZTtBQW1CNUI7SUFBQTtJQUFxQyxDQUFDO0lBQXpCLHFCQUFxQjtRQUxqQyxRQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdkIsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDO1lBQzFCLFlBQVksRUFBRSxDQUFDLGVBQWUsQ0FBQztTQUNsQyxDQUFDO09BQ1cscUJBQXFCLENBQUk7SUFBRCw0QkFBQztDQUFBLEFBQXRDLElBQXNDO1NBQXpCLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LElucHV0LENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC1wcm9ncmVzc1NwaW5uZXInLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwidWktcHJvZ3Jlc3Mtc3Bpbm5lclwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW25nQ2xhc3NdPVwic3R5bGVDbGFzc1wiICByb2xlPVwiYWxlcnRcIiBhcmlhLWJ1c3k9XCJ0cnVlXCI+XHJcbiAgICAgICAgICAgIDxzdmcgY2xhc3M9XCJ1aS1wcm9ncmVzcy1zcGlubmVyLXN2Z1wiIHZpZXdCb3g9XCIyNSAyNSA1MCA1MFwiIFtzdHlsZS5hbmltYXRpb24tZHVyYXRpb25dPVwiYW5pbWF0aW9uRHVyYXRpb25cIj5cclxuICAgICAgICAgICAgICAgIDxjaXJjbGUgY2xhc3M9XCJ1aS1wcm9ncmVzcy1zcGlubmVyLWNpcmNsZVwiIGN4PVwiNTBcIiBjeT1cIjUwXCIgcj1cIjIwXCIgW2F0dHIuZmlsbF09XCJmaWxsXCIgW2F0dHIuc3Ryb2tlLXdpZHRoXT1cInN0cm9rZVdpZHRoXCIgc3Ryb2tlLW1pdGVybGltaXQ9XCIxMFwiLz5cclxuICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQcm9ncmVzc1NwaW5uZXIge1xyXG5cclxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcclxuICAgIFxyXG4gICAgQElucHV0KCkgc3Ryb2tlV2lkdGg6IHN0cmluZyA9IFwiMlwiO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBmaWxsOiBzdHJpbmcgPSBcIm5vbmVcIjtcclxuICAgIFxyXG4gICAgQElucHV0KCkgYW5pbWF0aW9uRHVyYXRpb246IHN0cmluZyA9IFwiMnNcIjtcclxuICAgIFxyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgICBleHBvcnRzOiBbUHJvZ3Jlc3NTcGlubmVyXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1Byb2dyZXNzU3Bpbm5lcl1cclxufSlcclxuZXhwb3J0IGNsYXNzIFByb2dyZXNzU3Bpbm5lck1vZHVsZSB7IH0iXX0=