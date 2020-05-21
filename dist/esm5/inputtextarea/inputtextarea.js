var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { NgModule, Directive, ElementRef, HostListener, Input, Output, DoCheck, EventEmitter, Optional } from '@angular/core';
import { NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
var InputTextarea = /** @class */ (function () {
    function InputTextarea(el, ngModel) {
        this.el = el;
        this.ngModel = ngModel;
        this.onResize = new EventEmitter();
    }
    InputTextarea.prototype.ngDoCheck = function () {
        this.updateFilledState();
        if (this.autoResize) {
            this.resize();
        }
    };
    //To trigger change detection to manage ui-state-filled for material labels when there is no value binding
    InputTextarea.prototype.onInput = function (e) {
        this.updateFilledState();
        if (this.autoResize) {
            this.resize(e);
        }
    };
    InputTextarea.prototype.updateFilledState = function () {
        this.filled = (this.el.nativeElement.value && this.el.nativeElement.value.length) || (this.ngModel && this.ngModel.model);
    };
    InputTextarea.prototype.onFocus = function (e) {
        if (this.autoResize) {
            this.resize(e);
        }
    };
    InputTextarea.prototype.onBlur = function (e) {
        if (this.autoResize) {
            this.resize(e);
        }
    };
    InputTextarea.prototype.resize = function (event) {
        this.el.nativeElement.style.height = 'auto';
        this.el.nativeElement.style.height = this.el.nativeElement.scrollHeight + 'px';
        if (parseFloat(this.el.nativeElement.style.height) >= parseFloat(this.el.nativeElement.style.maxHeight)) {
            this.el.nativeElement.style.overflowY = "scroll";
            this.el.nativeElement.style.height = this.el.nativeElement.style.maxHeight;
        }
        else {
            this.el.nativeElement.style.overflow = "hidden";
        }
        this.onResize.emit(event || {});
    };
    InputTextarea.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgModel, decorators: [{ type: Optional }] }
    ]; };
    __decorate([
        Input()
    ], InputTextarea.prototype, "autoResize", void 0);
    __decorate([
        Output()
    ], InputTextarea.prototype, "onResize", void 0);
    __decorate([
        HostListener('input', ['$event'])
    ], InputTextarea.prototype, "onInput", null);
    __decorate([
        HostListener('focus', ['$event'])
    ], InputTextarea.prototype, "onFocus", null);
    __decorate([
        HostListener('blur', ['$event'])
    ], InputTextarea.prototype, "onBlur", null);
    InputTextarea = __decorate([
        Directive({
            selector: '[pInputTextarea]',
            host: {
                '[class.ui-inputtext]': 'true',
                '[class.ui-corner-all]': 'true',
                '[class.ui-inputtextarea-resizable]': 'autoResize',
                '[class.ui-state-default]': 'true',
                '[class.ui-widget]': 'true',
                '[class.ui-state-filled]': 'filled'
            }
        }),
        __param(1, Optional())
    ], InputTextarea);
    return InputTextarea;
}());
export { InputTextarea };
var InputTextareaModule = /** @class */ (function () {
    function InputTextareaModule() {
    }
    InputTextareaModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [InputTextarea],
            declarations: [InputTextarea]
        })
    ], InputTextareaModule);
    return InputTextareaModule;
}());
export { InputTextareaModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXR0ZXh0YXJlYS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvaW5wdXR0ZXh0YXJlYS8iLCJzb3VyY2VzIjpbImlucHV0dGV4dGFyZWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFlBQVksRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxZQUFZLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BILE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFhN0M7SUFVSSx1QkFBbUIsRUFBYyxFQUFxQixPQUFnQjtRQUFuRCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQXFCLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFONUQsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBTWMsQ0FBQztJQUUxRSxpQ0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFFekIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNqQjtJQUNMLENBQUM7SUFFRCwwR0FBMEc7SUFFMUcsK0JBQU8sR0FBUCxVQUFRLENBQUM7UUFDTCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsQjtJQUNMLENBQUM7SUFFRCx5Q0FBaUIsR0FBakI7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxN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RGlyZWN0aXZlLEVsZW1lbnRSZWYsSG9zdExpc3RlbmVyLElucHV0LE91dHB1dCxEb0NoZWNrLEV2ZW50RW1pdHRlcixPcHRpb25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TmdNb2RlbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbcElucHV0VGV4dGFyZWFdJyxcclxuICAgIGhvc3Q6IHtcclxuICAgICAgICAnW2NsYXNzLnVpLWlucHV0dGV4dF0nOiAndHJ1ZScsXHJcbiAgICAgICAgJ1tjbGFzcy51aS1jb3JuZXItYWxsXSc6ICd0cnVlJyxcclxuICAgICAgICAnW2NsYXNzLnVpLWlucHV0dGV4dGFyZWEtcmVzaXphYmxlXSc6ICdhdXRvUmVzaXplJyxcclxuICAgICAgICAnW2NsYXNzLnVpLXN0YXRlLWRlZmF1bHRdJzogJ3RydWUnLFxyXG4gICAgICAgICdbY2xhc3MudWktd2lkZ2V0XSc6ICd0cnVlJyxcclxuICAgICAgICAnW2NsYXNzLnVpLXN0YXRlLWZpbGxlZF0nOiAnZmlsbGVkJ1xyXG4gICAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSW5wdXRUZXh0YXJlYSBpbXBsZW1lbnRzIERvQ2hlY2sge1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBhdXRvUmVzaXplOiBib29sZWFuO1xyXG4gICAgXHJcbiAgICBAT3V0cHV0KCkgb25SZXNpemU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgICAgIFxyXG4gICAgZmlsbGVkOiBib29sZWFuO1xyXG5cclxuICAgIGNhY2hlZFNjcm9sbEhlaWdodDpudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBAT3B0aW9uYWwoKSBwdWJsaWMgbmdNb2RlbDogTmdNb2RlbCkge31cclxuICAgICAgICBcclxuICAgIG5nRG9DaGVjaygpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUZpbGxlZFN0YXRlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuYXV0b1Jlc2l6ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2l6ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy9UbyB0cmlnZ2VyIGNoYW5nZSBkZXRlY3Rpb24gdG8gbWFuYWdlIHVpLXN0YXRlLWZpbGxlZCBmb3IgbWF0ZXJpYWwgbGFiZWxzIHdoZW4gdGhlcmUgaXMgbm8gdmFsdWUgYmluZGluZ1xyXG4gICAgQEhvc3RMaXN0ZW5lcignaW5wdXQnLCBbJyRldmVudCddKVxyXG4gICAgb25JbnB1dChlKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLmF1dG9SZXNpemUpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNpemUoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1cGRhdGVGaWxsZWRTdGF0ZSgpIHtcclxuICAgICAgICB0aGlzLmZpbGxlZCA9ICh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudmFsdWUgJiYgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnZhbHVlLmxlbmd0aCkgfHwgKHRoaXMubmdNb2RlbCAmJiB0aGlzLm5nTW9kZWwubW9kZWwpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBASG9zdExpc3RlbmVyKCdmb2N1cycsIFsnJGV2ZW50J10pXHJcbiAgICBvbkZvY3VzKGUpIHtcclxuICAgICAgICBpZiAodGhpcy5hdXRvUmVzaXplKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzaXplKGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgQEhvc3RMaXN0ZW5lcignYmx1cicsIFsnJGV2ZW50J10pXHJcbiAgICBvbkJsdXIoZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmF1dG9SZXNpemUpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNpemUoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZXNpemUoZXZlbnQ/OiBFdmVudCkge1xyXG4gICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSAnYXV0byc7XHJcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLmhlaWdodCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5zY3JvbGxIZWlnaHQgKyAncHgnO1xyXG5cclxuICAgICAgICBpZiAocGFyc2VGbG9hdCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc3R5bGUuaGVpZ2h0KSA+PSBwYXJzZUZsb2F0KHRoaXMuZWwubmF0aXZlRWxlbWVudC5zdHlsZS5tYXhIZWlnaHQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zdHlsZS5vdmVyZmxvd1kgPSBcInNjcm9sbFwiO1xyXG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLm1heEhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm9uUmVzaXplLmVtaXQoZXZlbnR8fHt9KTtcclxuICAgIH1cclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW0lucHV0VGV4dGFyZWFdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbSW5wdXRUZXh0YXJlYV1cclxufSlcclxuZXhwb3J0IGNsYXNzIElucHV0VGV4dGFyZWFNb2R1bGUgeyB9XHJcbiJdfQ==