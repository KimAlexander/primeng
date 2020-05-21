var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, AfterViewInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Chart from 'chart.js';
let UIChart = class UIChart {
    constructor(el) {
        this.el = el;
        this.options = {};
        this.plugins = [];
        this.responsive = true;
        this.onDataSelect = new EventEmitter();
    }
    get data() {
        return this._data;
    }
    set data(val) {
        this._data = val;
        this.reinit();
    }
    ngAfterViewInit() {
        this.initChart();
        this.initialized = true;
    }
    onCanvasClick(event) {
        if (this.chart) {
            let element = this.chart.getElementAtEvent(event);
            let dataset = this.chart.getDatasetAtEvent(event);
            if (element && element[0] && dataset) {
                this.onDataSelect.emit({ originalEvent: event, element: element[0], dataset: dataset });
            }
        }
    }
    initChart() {
        let opts = this.options || {};
        opts.responsive = this.responsive;
        // allows chart to resize in responsive mode
        if (opts.responsive && (this.height || this.width)) {
            opts.maintainAspectRatio = false;
        }
        this.chart = new Chart(this.el.nativeElement.children[0].children[0], {
            type: this.type,
            data: this.data,
            options: this.options,
            plugins: this.plugins
        });
    }
    getCanvas() {
        return this.el.nativeElement.children[0].children[0];
    }
    getBase64Image() {
        return this.chart.toBase64Image();
    }
    generateLegend() {
        if (this.chart) {
            return this.chart.generateLegend();
        }
    }
    refresh() {
        if (this.chart) {
            this.chart.update();
        }
    }
    reinit() {
        if (this.chart) {
            this.chart.destroy();
            this.initChart();
        }
    }
    ngOnDestroy() {
        if (this.chart) {
            this.chart.destroy();
            this.initialized = false;
            this.chart = null;
        }
    }
};
UIChart.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], UIChart.prototype, "type", void 0);
__decorate([
    Input()
], UIChart.prototype, "options", void 0);
__decorate([
    Input()
], UIChart.prototype, "plugins", void 0);
__decorate([
    Input()
], UIChart.prototype, "width", void 0);
__decorate([
    Input()
], UIChart.prototype, "height", void 0);
__decorate([
    Input()
], UIChart.prototype, "responsive", void 0);
__decorate([
    Output()
], UIChart.prototype, "onDataSelect", void 0);
__decorate([
    Input()
], UIChart.prototype, "data", null);
UIChart = __decorate([
    Component({
        selector: 'p-chart',
        template: `
        <div style="position:relative" [style.width]="responsive && !width ? null : width" [style.height]="responsive && !height ? null : height">
            <canvas [attr.width]="responsive && !width ? null : width" [attr.height]="responsive && !height ? null : height" (click)="onCanvasClick($event)"></canvas>
        </div>
    `,
        changeDetection: ChangeDetectionStrategy.Default
    })
], UIChart);
export { UIChart };
let ChartModule = class ChartModule {
};
ChartModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [UIChart],
        declarations: [UIChart]
    })
], ChartModule);
export { ChartModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2NoYXJ0LyIsInNvdXJjZXMiOlsiY2hhcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLGFBQWEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEksT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sS0FBSyxLQUFLLE1BQU0sVUFBVSxDQUFDO0FBV2xDLElBQWEsT0FBTyxHQUFwQixNQUFhLE9BQU87SUFzQmhCLFlBQW1CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBbEJ4QixZQUFPLEdBQVEsRUFBRSxDQUFDO1FBRWxCLFlBQU8sR0FBVSxFQUFFLENBQUM7UUFNcEIsZUFBVSxHQUFZLElBQUksQ0FBQztRQUUxQixpQkFBWSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBUTNCLENBQUM7SUFFNUIsSUFBSSxJQUFJO1FBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLElBQUksQ0FBQyxHQUFPO1FBQ1osSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFFRCxhQUFhLENBQUMsS0FBSztRQUNmLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEQsSUFBSSxPQUFP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T0FBTyxDQW1HbkI7U0FuR1ksT0FBTztBQTBHcEIsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBVztDQUFJLENBQUE7QUFBZixXQUFXO0lBTHZCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztRQUN2QixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDbEIsWUFBWSxFQUFFLENBQUMsT0FBTyxDQUFDO0tBQzFCLENBQUM7R0FDVyxXQUFXLENBQUk7U0FBZixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsRWxlbWVudFJlZixBZnRlclZpZXdJbml0LE9uRGVzdHJveSxJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyLENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCAqIGFzIENoYXJ0IGZyb20gJ2NoYXJ0LmpzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLWNoYXJ0JyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBzdHlsZT1cInBvc2l0aW9uOnJlbGF0aXZlXCIgW3N0eWxlLndpZHRoXT1cInJlc3BvbnNpdmUgJiYgIXdpZHRoID8gbnVsbCA6IHdpZHRoXCIgW3N0eWxlLmhlaWdodF09XCJyZXNwb25zaXZlICYmICFoZWlnaHQgPyBudWxsIDogaGVpZ2h0XCI+XHJcbiAgICAgICAgICAgIDxjYW52YXMgW2F0dHIud2lkdGhdPVwicmVzcG9uc2l2ZSAmJiAhd2lkdGggPyBudWxsIDogd2lkdGhcIiBbYXR0ci5oZWlnaHRdPVwicmVzcG9uc2l2ZSAmJiAhaGVpZ2h0ID8gbnVsbCA6IGhlaWdodFwiIChjbGljayk9XCJvbkNhbnZhc0NsaWNrKCRldmVudClcIj48L2NhbnZhcz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcclxufSlcclxuZXhwb3J0IGNsYXNzIFVJQ2hhcnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICAgIEBJbnB1dCgpIHR5cGU6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBvcHRpb25zOiBhbnkgPSB7fTtcclxuXHJcbiAgICBASW5wdXQoKSBwbHVnaW5zOiBhbnlbXSA9IFtdO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSB3aWR0aDogc3RyaW5nO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBoZWlnaHQ6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSByZXNwb25zaXZlOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIFxyXG4gICAgQE91dHB1dCgpIG9uRGF0YVNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XHJcbiAgICBcclxuICAgIF9kYXRhOiBhbnk7XHJcblxyXG4gICAgY2hhcnQ6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYpIHt9XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGdldCBkYXRhKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGRhdGEodmFsOmFueSkge1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSB2YWw7XHJcbiAgICAgICAgdGhpcy5yZWluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0Q2hhcnQoKTtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNhbnZhc0NsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hhcnQpIHtcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLmNoYXJ0LmdldEVsZW1lbnRBdEV2ZW50KGV2ZW50KTtcclxuICAgICAgICAgICAgbGV0IGRhdGFzZXQgPSB0aGlzLmNoYXJ0LmdldERhdGFzZXRBdEV2ZW50KGV2ZW50KTtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQmJmVsZW1lbnRbMF0mJmRhdGFzZXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25EYXRhU2VsZWN0LmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBlbGVtZW50OiBlbGVtZW50WzBdLCBkYXRhc2V0OiBkYXRhc2V0fSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdENoYXJ0KCkge1xyXG4gICAgICAgIGxldCBvcHRzID0gdGhpcy5vcHRpb25zfHx7fTtcclxuICAgICAgICBvcHRzLnJlc3BvbnNpdmUgPSB0aGlzLnJlc3BvbnNpdmU7XHJcblxyXG4gICAgICAgIC8vIGFsbG93cyBjaGFydCB0byByZXNpemUgaW4gcmVzcG9uc2l2ZSBtb2RlXHJcbiAgICAgICAgaWYgKG9wdHMucmVzcG9uc2l2ZSYmKHRoaXMuaGVpZ2h0fHx0aGlzLndpZHRoKSkge1xyXG4gICAgICAgICAgICBvcHRzLm1haW50YWluQXNwZWN0UmF0aW8gPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY2hhcnQgPSBuZXcgQ2hhcnQodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLCB7XHJcbiAgICAgICAgICAgIHR5cGU6IHRoaXMudHlwZSxcclxuICAgICAgICAgICAgZGF0YTogdGhpcy5kYXRhLFxyXG4gICAgICAgICAgICBvcHRpb25zOiB0aGlzLm9wdGlvbnMsXHJcbiAgICAgICAgICAgIHBsdWdpbnM6IHRoaXMucGx1Z2luc1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXRDYW52YXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXS5jaGlsZHJlblswXTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0QmFzZTY0SW1hZ2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhcnQudG9CYXNlNjRJbWFnZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZW5lcmF0ZUxlZ2VuZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5jaGFydCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jaGFydC5nZW5lcmF0ZUxlZ2VuZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcmVmcmVzaCgpIHtcclxuICAgICAgICBpZiAodGhpcy5jaGFydCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0LnVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcmVpbml0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNoYXJ0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRDaGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hhcnQpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFydC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jaGFydCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgICBleHBvcnRzOiBbVUlDaGFydF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtVSUNoYXJ0XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2hhcnRNb2R1bGUgeyB9XHJcbiJdfQ==