var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
let ProgressBar = class ProgressBar {
    constructor() {
        this.showValue = true;
        this.unit = '%';
        this.mode = 'determinate';
    }
};
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
        template: `
        <div [class]="styleClass" [ngStyle]="style" role="progressbar" aria-valuemin="0" [attr.aria-valuenow]="value" aria-valuemax="100"
            [ngClass]="{'ui-progressbar ui-widget ui-widget-content ui-corner-all': true, 'ui-progressbar-determinate': (mode === 'determinate'), 'ui-progressbar-indeterminate': (mode === 'indeterminate')}">
            <div class="ui-progressbar-value ui-progressbar-value-animate ui-widget-header ui-corner-all" [style.width]="value + '%'" style="display:block"></div>
            <div class="ui-progressbar-label" [style.display]="value != null ? 'block' : 'none'" *ngIf="showValue">{{value}}{{unit}}</div>
        </div>
    `,
        changeDetection: ChangeDetectionStrategy.Default
    })
], ProgressBar);
export { ProgressBar };
let ProgressBarModule = class ProgressBarModule {
};
ProgressBarModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [ProgressBar],
        declarations: [ProgressBar]
    })
], ProgressBarModule);
export { ProgressBarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NiYXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL3Byb2dyZXNzYmFyLyIsInNvdXJjZXMiOlsicHJvZ3Jlc3NiYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQWE3QyxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0lBQXhCO1FBSWEsY0FBUyxHQUFZLElBQUksQ0FBQztRQU0xQixTQUFJLEdBQVcsR0FBRyxDQUFDO1FBRW5CLFNBQUksR0FBVyxhQUFhLENBQUM7SUFFMUMsQ0FBQztDQUFBLENBQUE7QUFaWTtJQUFSLEtBQUssRUFBRTswQ0FBWTtBQUVYO0lBQVIsS0FBSyxFQUFFOzhDQUEyQjtBQUUxQjtJQUFSLEtBQUssRUFBRTswQ0FBWTtBQUVYO0lBQVIsS0FBSyxFQUFFOytDQUFvQjtBQUVuQjtJQUFSLEtBQUssRUFBRTt5Q0FBb0I7QUFFbkI7SUFBUixLQUFLLEVBQUU7eUNBQThCO0FBWjdCLFdBQVc7SUFYdkIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGVBQWU7UUFDekIsUUFBUSxFQUFFOzs7Ozs7S0FNVDtRQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO0tBQ25ELENBQUM7R0FDVyxXQUFXLENBY3ZCO1NBZFksV0FBVztBQXFCeEIsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7Q0FBSSxDQUFBO0FBQXJCLGlCQUFpQjtJQUw3QixRQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7UUFDdkIsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDO1FBQ3RCLFlBQVksRUFBRSxDQUFDLFdBQVcsQ0FBQztLQUM5QixDQUFDO0dBQ1csaUJBQWlCLENBQUk7U0FBckIsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsSW5wdXQsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLXByb2dyZXNzQmFyJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgcm9sZT1cInByb2dyZXNzYmFyXCIgYXJpYS12YWx1ZW1pbj1cIjBcIiBbYXR0ci5hcmlhLXZhbHVlbm93XT1cInZhbHVlXCIgYXJpYS12YWx1ZW1heD1cIjEwMFwiXHJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktcHJvZ3Jlc3NiYXIgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwnOiB0cnVlLCAndWktcHJvZ3Jlc3NiYXItZGV0ZXJtaW5hdGUnOiAobW9kZSA9PT0gJ2RldGVybWluYXRlJyksICd1aS1wcm9ncmVzc2Jhci1pbmRldGVybWluYXRlJzogKG1vZGUgPT09ICdpbmRldGVybWluYXRlJyl9XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1wcm9ncmVzc2Jhci12YWx1ZSB1aS1wcm9ncmVzc2Jhci12YWx1ZS1hbmltYXRlIHVpLXdpZGdldC1oZWFkZXIgdWktY29ybmVyLWFsbFwiIFtzdHlsZS53aWR0aF09XCJ2YWx1ZSArICclJ1wiIHN0eWxlPVwiZGlzcGxheTpibG9ja1wiPjwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktcHJvZ3Jlc3NiYXItbGFiZWxcIiBbc3R5bGUuZGlzcGxheV09XCJ2YWx1ZSAhPSBudWxsID8gJ2Jsb2NrJyA6ICdub25lJ1wiICpuZ0lmPVwic2hvd1ZhbHVlXCI+e3t2YWx1ZX19e3t1bml0fX08L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcclxufSlcclxuZXhwb3J0IGNsYXNzIFByb2dyZXNzQmFyIHtcclxuXHJcbiAgICBASW5wdXQoKSB2YWx1ZTogYW55O1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBzaG93VmFsdWU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgdW5pdDogc3RyaW5nID0gJyUnO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBtb2RlOiBzdHJpbmcgPSAnZGV0ZXJtaW5hdGUnO1xyXG4gICAgXHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICAgIGV4cG9ydHM6IFtQcm9ncmVzc0Jhcl0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtQcm9ncmVzc0Jhcl1cclxufSlcclxuZXhwb3J0IGNsYXNzIFByb2dyZXNzQmFyTW9kdWxlIHsgfSJdfQ==