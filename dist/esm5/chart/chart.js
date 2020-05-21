var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, AfterViewInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Chart from 'chart.js';
var UIChart = /** @class */ (function () {
    function UIChart(el) {
        this.el = el;
        this.options = {};
        this.plugins = [];
        this.responsive = true;
        this.onDataSelect = new EventEmitter();
    }
    Object.defineProperty(UIChart.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (val) {
            this._data = val;
            this.reinit();
        },
        enumerable: true,
        configurable: true
    });
    UIChart.prototype.ngAfterViewInit = function () {
        this.initChart();
        this.initialized = true;
    };
    UIChart.prototype.onCanvasClick = function (event) {
        if (this.chart) {
            var element = this.chart.getElementAtEvent(event);
            var dataset = this.chart.getDatasetAtEvent(event);
            if (element && element[0] && dataset) {
                this.onDataSelect.emit({ originalEvent: event, element: element[0], dataset: dataset });
            }
        }
    };
    UIChart.prototype.initChart = function () {
        var opts = this.options || {};
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
    };
    UIChart.prototype.getCanvas = function () {
        return this.el.nativeElement.children[0].children[0];
    };
    UIChart.prototype.getBase64Image = function () {
        return this.chart.toBase64Image();
    };
    UIChart.prototype.generateLegend = function () {
        if (this.chart) {
            return this.chart.generateLegend();
        }
    };
    UIChart.prototype.refresh = function () {
        if (this.chart) {
            this.chart.update();
        }
    };
    UIChart.prototype.reinit = function () {
        if (this.chart) {
            this.chart.destroy();
            this.initChart();
        }
    };
    UIChart.prototype.ngOnDestroy = function () {
        if (this.chart) {
            this.chart.destroy();
            this.initialized = false;
            this.chart = null;
        }
    };
    UIChart.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
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
            template: "\n        <div style=\"position:relative\" [style.width]=\"responsive && !width ? null : width\" [style.height]=\"responsive && !height ? null : height\">\n            <canvas [attr.width]=\"responsive && !width ? null : width\" [attr.height]=\"responsive && !height ? null : height\" (click)=\"onCanvasClick($event)\"></canvas>\n        </div>\n    ",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], UIChart);
    return UIChart;
}());
export { UIChart };
var ChartModule = /** @class */ (function () {
    function ChartModule() {
    }
    ChartModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [UIChart],
            declarations: [UIChart]
        })
    ], ChartModule);
    return ChartModule;
}());
export { ChartModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2NoYXJ0LyIsInNvdXJjZXMiOlsiY2hhcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLGFBQWEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEksT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sS0FBSyxLQUFLLE1BQU0sVUFBVSxDQUFDO0FBV2xDO0lBc0JJLGlCQUFtQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQWxCeEIsWUFBTyxHQUFRLEVBQUUsQ0FBQztRQUVsQixZQUFPLEdBQVUsRUFBRSxDQUFDO1FBTXBCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFMUIsaUJBQVksR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQVEzQixDQUFDO0lBRTVCLHNCQUFJLHlCQUFJO2FBQVI7WUFDTCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQzthQUVELFVBQVMsR0FBTztZQUNaLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDOzs7T0FMQTtJQU9ELGlDQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQztJQUVELCtCQUFhLEdBQWIsVUFBYyxLQUFLO1FBQ2YsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1osSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsRCxJQUFJLE9BQU8sR0FBRyxJQUFJ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T0FBTztTQUNuRCxDQUFDO09BQ1csT0FBTyxDQW1HbkI7SUFBRCxjQUFDO0NBQUEsQUFuR0QsSUFtR0M7U0FuR1ksT0FBTztBQTBHcEI7SUFBQTtJQUEyQixDQUFDO0lBQWYsV0FBVztRQUx2QixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdkIsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO1lBQ2xCLFlBQVksRUFBRSxDQUFDLE9BQU8sQ0FBQztTQUMxQixDQUFDO09BQ1csV0FBVyxDQUFJO0lBQUQsa0JBQUM7Q0FBQSxBQUE1QixJQUE0QjtTQUFmLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxFbGVtZW50UmVmLEFmdGVyVmlld0luaXQsT25EZXN0cm95LElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXIsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0ICogYXMgQ2hhcnQgZnJvbSAnY2hhcnQuanMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3AtY2hhcnQnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IHN0eWxlPVwicG9zaXRpb246cmVsYXRpdmVcIiBbc3R5bGUud2lkdGhdPVwicmVzcG9uc2l2ZSAmJiAhd2lkdGggPyBudWxsIDogd2lkdGhcIiBbc3R5bGUuaGVpZ2h0XT1cInJlc3BvbnNpdmUgJiYgIWhlaWdodCA/IG51bGwgOiBoZWlnaHRcIj5cclxuICAgICAgICAgICAgPGNhbnZhcyBbYXR0ci53aWR0aF09XCJyZXNwb25zaXZlICYmICF3aWR0aCA/IG51bGwgOiB3aWR0aFwiIFthdHRyLmhlaWdodF09XCJyZXNwb25zaXZlICYmICFoZWlnaHQgPyBudWxsIDogaGVpZ2h0XCIgKGNsaWNrKT1cIm9uQ2FudmFzQ2xpY2soJGV2ZW50KVwiPjwvY2FudmFzPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVUlDaGFydCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gICAgQElucHV0KCkgdHlwZTogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIG9wdGlvbnM6IGFueSA9IHt9O1xyXG5cclxuICAgIEBJbnB1dCgpIHBsdWdpbnM6IGFueVtdID0gW107XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHdpZHRoOiBzdHJpbmc7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGhlaWdodDogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIHJlc3BvbnNpdmU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgXHJcbiAgICBAT3V0cHV0KCkgb25EYXRhU2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBpbml0aWFsaXplZDogYm9vbGVhbjtcclxuICAgIFxyXG4gICAgX2RhdGE6IGFueTtcclxuXHJcbiAgICBjaGFydDogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZikge31cclxuICAgIFxyXG4gICAgQElucHV0KCkgZ2V0IGRhdGEoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgZGF0YSh2YWw6YW55KSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IHZhbDtcclxuICAgICAgICB0aGlzLnJlaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICB0aGlzLmluaXRDaGFydCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2FudmFzQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5jaGFydCkge1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXMuY2hhcnQuZ2V0RWxlbWVudEF0RXZlbnQoZXZlbnQpO1xyXG4gICAgICAgICAgICBsZXQgZGF0YXNldCA9IHRoaXMuY2hhcnQuZ2V0RGF0YXNldEF0RXZlbnQoZXZlbnQpO1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCYmZWxlbWVudFswXSYmZGF0YXNldCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkRhdGFTZWxlY3QuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIGVsZW1lbnQ6IGVsZW1lbnRbMF0sIGRhdGFzZXQ6IGRhdGFzZXR9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbml0Q2hhcnQoKSB7XHJcbiAgICAgICAgbGV0IG9wdHMgPSB0aGlzLm9wdGlvbnN8fHt9O1xyXG4gICAgICAgIG9wdHMucmVzcG9uc2l2ZSA9IHRoaXMucmVzcG9uc2l2ZTtcclxuXHJcbiAgICAgICAgLy8gYWxsb3dzIGNoYXJ0IHRvIHJlc2l6ZSBpbiByZXNwb25zaXZlIG1vZGVcclxuICAgICAgICBpZiAob3B0cy5yZXNwb25zaXZlJiYodGhpcy5oZWlnaHR8fHRoaXMud2lkdGgpKSB7XHJcbiAgICAgICAgICAgIG9wdHMubWFpbnRhaW5Bc3BlY3RSYXRpbyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jaGFydCA9IG5ldyBDaGFydCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0sIHtcclxuICAgICAgICAgICAgdHlwZTogdGhpcy50eXBlLFxyXG4gICAgICAgICAgICBkYXRhOiB0aGlzLmRhdGEsXHJcbiAgICAgICAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9ucyxcclxuICAgICAgICAgICAgcGx1Z2luczogdGhpcy5wbHVnaW5zXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldENhbnZhcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXRCYXNlNjRJbWFnZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jaGFydC50b0Jhc2U2NEltYWdlKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdlbmVyYXRlTGVnZW5kKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNoYXJ0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoYXJ0LmdlbmVyYXRlTGVnZW5kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZWZyZXNoKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNoYXJ0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcnQudXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZWluaXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hhcnQpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFydC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdENoYXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICBpZiAodGhpcy5jaGFydCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0LmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0ID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICAgIGV4cG9ydHM6IFtVSUNoYXJ0XSxcclxuICAgIGRlY2xhcmF0aW9uczogW1VJQ2hhcnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDaGFydE1vZHVsZSB7IH1cclxuIl19