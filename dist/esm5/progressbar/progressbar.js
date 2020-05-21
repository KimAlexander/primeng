var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
var ProgressBar = /** @class */ (function () {
    function ProgressBar() {
        this.showValue = true;
        this.unit = '%';
        this.mode = 'determinate';
    }
    __decorate([
        Input()
    ], ProgressBar.prototype, "value", void 0);
    __decorate([
        Input()
    ], ProgressBar.prototype, "showValue", void 0);
    __decorate([
        Input()
    ], ProgressBar.prototype, "style", void 0);
    __decorate([
        Input()
    ], ProgressBar.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], ProgressBar.prototype, "unit", void 0);
    __decorate([
        Input()
    ], ProgressBar.prototype, "mode", void 0);
    ProgressBar = __decorate([
        Component({
            selector: 'p-progressBar',
            template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" role=\"progressbar\" aria-valuemin=\"0\" [attr.aria-valuenow]=\"value\" aria-valuemax=\"100\"\n            [ngClass]=\"{'ui-progressbar ui-widget ui-widget-content ui-corner-all': true, 'ui-progressbar-determinate': (mode === 'determinate'), 'ui-progressbar-indeterminate': (mode === 'indeterminate')}\">\n            <div class=\"ui-progressbar-value ui-progressbar-value-animate ui-widget-header ui-corner-all\" [style.width]=\"value + '%'\" style=\"display:block\"></div>\n            <div class=\"ui-progressbar-label\" [style.display]=\"value != null ? 'block' : 'none'\" *ngIf=\"showValue\">{{value}}{{unit}}</div>\n        </div>\n    ",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], ProgressBar);
    return ProgressBar;
}());
export { ProgressBar };
var ProgressBarModule = /** @class */ (function () {
    function ProgressBarModule() {
    }
    ProgressBarModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [ProgressBar],
            declarations: [ProgressBar]
        })
    ], ProgressBarModule);
    return ProgressBarModule;
}());
export { ProgressBarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NiYXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL3Byb2dyZXNzYmFyLyIsInNvdXJjZXMiOlsicHJvZ3Jlc3NiYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQWE3QztJQUFBO1FBSWEsY0FBUyxHQUFZLElBQUksQ0FBQztRQU0xQixTQUFJLEdBQVcsR0FBRyxDQUFDO1FBRW5CLFNBQUksR0FBVyxhQUFhLENBQUM7SUFFMUMsQ0FBQztJQVpZO1FBQVIsS0FBSyxFQUFFOzhDQUFZO0lBRVg7UUFBUixLQUFLLEVBQUU7a0RBQTJCO0lBRTFCO1FBQVIsS0FBSyxFQUFFOzhDQUFZO0lBRVg7UUFBUixLQUFLLEVBQUU7bURBQW9CO0lBRW5CO1FBQVIsS0FBSyxFQUFFOzZDQUFvQjtJQUVuQjtRQUFSLEtBQUssRUFBRTs2Q0FBOEI7SUFaN0IsV0FBVztRQVh2QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixRQUFRLEVBQUUsOHJCQU1UO1lBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87U0FDbkQsQ0FBQztPQUNXLFdBQVcsQ0FjdkI7SUFBRCxrQkFBQztDQUFBLEFBZEQsSUFjQztTQWRZLFdBQVc7QUFxQnhCO0lBQUE7SUFBaUMsQ0FBQztJQUFyQixpQkFBaUI7UUFMN0IsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUN0QixZQUFZLEVBQUUsQ0FBQyxXQUFXLENBQUM7U0FDOUIsQ0FBQztPQUNXLGlCQUFpQixDQUFJO0lBQUQsd0JBQUM7Q0FBQSxBQUFsQyxJQUFrQztTQUFyQixpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxJbnB1dCxDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3AtcHJvZ3Jlc3NCYXInLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwic3R5bGVcIiByb2xlPVwicHJvZ3Jlc3NiYXJcIiBhcmlhLXZhbHVlbWluPVwiMFwiIFthdHRyLmFyaWEtdmFsdWVub3ddPVwidmFsdWVcIiBhcmlhLXZhbHVlbWF4PVwiMTAwXCJcclxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1wcm9ncmVzc2JhciB1aS13aWRnZXQgdWktd2lkZ2V0LWNvbnRlbnQgdWktY29ybmVyLWFsbCc6IHRydWUsICd1aS1wcm9ncmVzc2Jhci1kZXRlcm1pbmF0ZSc6IChtb2RlID09PSAnZGV0ZXJtaW5hdGUnKSwgJ3VpLXByb2dyZXNzYmFyLWluZGV0ZXJtaW5hdGUnOiAobW9kZSA9PT0gJ2luZGV0ZXJtaW5hdGUnKX1cIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXByb2dyZXNzYmFyLXZhbHVlIHVpLXByb2dyZXNzYmFyLXZhbHVlLWFuaW1hdGUgdWktd2lkZ2V0LWhlYWRlciB1aS1jb3JuZXItYWxsXCIgW3N0eWxlLndpZHRoXT1cInZhbHVlICsgJyUnXCIgc3R5bGU9XCJkaXNwbGF5OmJsb2NrXCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1wcm9ncmVzc2Jhci1sYWJlbFwiIFtzdHlsZS5kaXNwbGF5XT1cInZhbHVlICE9IG51bGwgPyAnYmxvY2snIDogJ25vbmUnXCIgKm5nSWY9XCJzaG93VmFsdWVcIj57e3ZhbHVlfX17e3VuaXR9fTwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxyXG59KVxyXG5leHBvcnQgY2xhc3MgUHJvZ3Jlc3NCYXIge1xyXG5cclxuICAgIEBJbnB1dCgpIHZhbHVlOiBhbnk7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHNob3dWYWx1ZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSB1bml0OiBzdHJpbmcgPSAnJSc7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIG1vZGU6IHN0cmluZyA9ICdkZXRlcm1pbmF0ZSc7XHJcbiAgICBcclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW1Byb2dyZXNzQmFyXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1Byb2dyZXNzQmFyXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUHJvZ3Jlc3NCYXJNb2R1bGUgeyB9Il19