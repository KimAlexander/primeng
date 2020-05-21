var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, OnDestroy, Input, Output, EventEmitter, forwardRef, Renderer2, NgZone, ChangeDetectorRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var SLIDER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Slider; }),
    multi: true
};
var Slider = /** @class */ (function () {
    function Slider(el, renderer, ngZone, cd) {
        this.el = el;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.cd = cd;
        this.min = 0;
        this.max = 100;
        this.orientation = 'horizontal';
        this.tabindex = 0;
        this.onChange = new EventEmitter();
        this.onSlideEnd = new EventEmitter();
        this.handleValues = [];
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.handleIndex = 0;
    }
    Slider.prototype.onMouseDown = function (event, index) {
        if (this.disabled) {
            return;
        }
        this.dragging = true;
        this.updateDomData();
        this.sliderHandleClick = true;
        this.handleIndex = index;
        this.bindDragListeners();
        event.target.focus();
        event.preventDefault();
    };
    Slider.prototype.onTouchStart = function (event, index) {
        if (this.disabled) {
            return;
        }
        var touchobj = event.changedTouches[0];
        this.startHandleValue = (this.range) ? this.handleValues[index] : this.handleValue;
        this.dragging = true;
        this.handleIndex = index;
        if (this.orientation === 'horizontal') {
            this.startx = parseInt(touchobj.clientX, 10);
            this.barWidth = this.el.nativeElement.children[0].offsetWidth;
        }
        else {
            this.starty = parseInt(touchobj.clientY, 10);
            this.barHeight = this.el.nativeElement.children[0].offsetHeight;
        }
        event.preventDefault();
    };
    Slider.prototype.onTouchMove = function (event, index) {
        if (this.disabled) {
            return;
        }
        var touchobj = event.changedTouches[0], handleValue = 0;
        if (this.orientation === 'horizontal') {
            handleValue = Math.floor(((parseInt(touchobj.clientX, 10) - this.startx) * 100) / (this.barWidth)) + this.startHandleValue;
        }
        else {
            handleValue = Math.floor(((this.starty - parseInt(touchobj.clientY, 10)) * 100) / (this.barHeight)) + this.startHandleValue;
        }
        this.setValueFromHandle(event, handleValue);
        event.preventDefault();
    };
    Slider.prototype.onTouchEnd = function (event, index) {
        if (this.disabled) {
            return;
        }
        this.dragging = false;
        if (this.range)
            this.onSlideEnd.emit({ originalEvent: event, values: this.values });
        else
            this.onSlideEnd.emit({ originalEvent: event, value: this.value });
        event.preventDefault();
    };
    Slider.prototype.onBarClick = function (event) {
        if (this.disabled) {
            return;
        }
        if (!this.sliderHandleClick) {
            this.updateDomData();
            this.handleChange(event);
        }
        this.sliderHandleClick = false;
    };
    Slider.prototype.onHandleKeydown = function (event, handleIndex) {
        if (event.which == 38 || event.which == 39) {
            this.spin(event, 1, handleIndex);
        }
        else if (event.which == 37 || event.which == 40) {
            this.spin(event, -1, handleIndex);
        }
    };
    Slider.prototype.spin = function (event, dir, handleIndex) {
        var step = (this.step || 1) * dir;
        if (this.range) {
            this.handleIndex = handleIndex;
            this.updateValue(this.values[this.handleIndex] + step);
            this.updateHandleValue();
        }
        else {
            this.updateValue(this.value + step);
            this.updateHandleValue();
        }
        event.preventDefault();
    };
    Slider.prototype.handleChange = function (event) {
        var handleValue = this.calculateHandleValue(event);
        this.setValueFromHandle(event, handleValue);
    };
    Slider.prototype.bindDragListeners = function () {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            if (!_this.dragListener) {
                _this.dragListener = _this.renderer.listen('document', 'mousemove', function (event) {
                    if (_this.dragging) {
                        _this.ngZone.run(function () {
                            _this.handleChange(event);
                        });
                    }
                });
            }
            if (!_this.mouseupListener) {
                _this.mouseupListener = _this.renderer.listen('document', 'mouseup', function (event) {
                    if (_this.dragging) {
                        _this.dragging = false;
                        _this.ngZone.run(function () {
                            if (_this.range) {
                                _this.onSlideEnd.emit({ originalEvent: event, values: _this.values });
                            }
                            else {
                                _this.onSlideEnd.emit({ originalEvent: event, value: _this.value });
                            }
                        });
                    }
                });
            }
        });
    };
    Slider.prototype.unbindDragListeners = function () {
        if (this.dragListener) {
            this.dragListener();
        }
        if (this.mouseupListener) {
            this.mouseupListener();
        }
    };
    Slider.prototype.setValueFromHandle = function (event, handleValue) {
        var newValue = this.getValueFromHandle(handleValue);
        if (this.range) {
            if (this.step) {
                this.handleStepChange(newValue, this.values[this.handleIndex]);
            }
            else {
                this.handleValues[this.handleIndex] = handleValue;
                this.updateValue(newValue, event);
            }
        }
        else {
            if (this.step) {
                this.handleStepChange(newValue, this.value);
            }
            else {
                this.handleValue = handleValue;
                this.updateValue(newValue, event);
            }
        }
    };
    Slider.prototype.handleStepChange = function (newValue, oldValue) {
        var diff = (newValue - oldValue);
        var val = oldValue;
        if (diff < 0) {
            val = oldValue + Math.ceil(newValue / this.step - oldValue / this.step) * this.step;
        }
        else if (diff > 0) {
            val = oldValue + Math.floor(newValue / this.step - oldValue / this.step) * this.step;
        }
        this.updateValue(val);
        this.updateHandleValue();
    };
    Slider.prototype.writeValue = function (value) {
        if (this.range)
            this.values = value || [0, 0];
        else
            this.value = value || 0;
        this.updateHandleValue();
        this.cd.markForCheck();
    };
    Slider.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Slider.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Slider.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    Object.defineProperty(Slider.prototype, "rangeStartLeft", {
        get: function () {
            return this.isVertical() ? 'auto' : this.handleValues[0] + '%';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slider.prototype, "rangeStartBottom", {
        get: function () {
            return this.isVertical() ? this.handleValues[0] + '%' : 'auto';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slider.prototype, "rangeEndLeft", {
        get: function () {
            return this.isVertical() ? 'auto' : this.handleValues[1] + '%';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slider.prototype, "rangeEndBottom", {
        get: function () {
            return this.isVertical() ? this.handleValues[1] + '%' : 'auto';
        },
        enumerable: true,
        configurable: true
    });
    Slider.prototype.isVertical = function () {
        return this.orientation === 'vertical';
    };
    Slider.prototype.updateDomData = function () {
        var rect = this.el.nativeElement.children[0].getBoundingClientRect();
        this.initX = rect.left + DomHandler.getWindowScrollLeft();
        this.initY = rect.top + DomHandler.getWindowScrollTop();
        this.barWidth = this.el.nativeElement.children[0].offsetWidth;
        this.barHeight = this.el.nativeElement.children[0].offsetHeight;
    };
    Slider.prototype.calculateHandleValue = function (event) {
        if (this.orientation === 'horizontal')
            return ((event.pageX - this.initX) * 100) / (this.barWidth);
        else
            return (((this.initY + this.barHeight) - event.pageY) * 100) / (this.barHeight);
    };
    Slider.prototype.updateHandleValue = function () {
        if (this.range) {
            this.handleValues[0] = (this.values[0] < this.min ? 0 : this.values[0] - this.min) * 100 / (this.max - this.min);
            this.handleValues[1] = (this.values[1] > this.max ? 100 : this.values[1] - this.min) * 100 / (this.max - this.min);
        }
        else {
            if (this.value < this.min)
                this.handleValue = 0;
            else if (this.value > this.max)
                this.handleValue = 100;
            else
                this.handleValue = (this.value - this.min) * 100 / (this.max - this.min);
        }
    };
    Slider.prototype.updateValue = function (val, event) {
        if (this.range) {
            var value = val;
            if (this.handleIndex == 0) {
                if (value < this.min) {
                    value = this.min;
                    this.handleValues[0] = 0;
                }
                else if (value > this.values[1]) {
                    value = this.values[1];
                    this.handleValues[0] = this.handleValues[1];
                }
                this.sliderHandleStart.nativeElement.focus();
            }
            else {
                if (value > this.max) {
                    value = this.max;
                    this.handleValues[1] = 100;
                }
                else if (value < this.values[0]) {
                    value = this.values[0];
                    this.handleValues[1] = this.handleValues[0];
                }
                this.sliderHandleEnd.nativeElement.focus();
            }
            this.values[this.handleIndex] = this.getNormalizedValue(value);
            this.values = this.values.slice();
            this.onModelChange(this.values);
            this.onChange.emit({ event: event, values: this.values });
        }
        else {
            if (val < this.min) {
                val = this.min;
                this.handleValue = 0;
            }
            else if (val > this.max) {
                val = this.max;
                this.handleValue = 100;
            }
            this.value = this.getNormalizedValue(val);
            this.onModelChange(this.value);
            this.onChange.emit({ event: event, value: this.value });
            this.sliderHandle.nativeElement.focus();
        }
    };
    Slider.prototype.getValueFromHandle = function (handleValue) {
        return (this.max - this.min) * (handleValue / 100) + this.min;
    };
    Slider.prototype.getDecimalsCount = function (value) {
        if (value && Math.floor(value) !== value)
            return value.toString().split(".")[1].length || 0;
        return 0;
    };
    Slider.prototype.getNormalizedValue = function (val) {
        var decimalsCount = this.getDecimalsCount(this.step);
        if (decimalsCount > 0) {
            return +val.toFixed(decimalsCount);
        }
        else {
            return Math.floor(val);
        }
    };
    Slider.prototype.ngOnDestroy = function () {
        this.unbindDragListeners();
    };
    Slider.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: NgZone },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], Slider.prototype, "animate", void 0);
    __decorate([
        Input()
    ], Slider.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], Slider.prototype, "min", void 0);
    __decorate([
        Input()
    ], Slider.prototype, "max", void 0);
    __decorate([
        Input()
    ], Slider.prototype, "orientation", void 0);
    __decorate([
        Input()
    ], Slider.prototype, "step", void 0);
    __decorate([
        Input()
    ], Slider.prototype, "range", void 0);
    __decorate([
        Input()
    ], Slider.prototype, "style", void 0);
    __decorate([
        Input()
    ], Slider.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], Slider.prototype, "ariaLabelledBy", void 0);
    __decorate([
        Input()
    ], Slider.prototype, "tabindex", void 0);
    __decorate([
        Output()
    ], Slider.prototype, "onChange", void 0);
    __decorate([
        Output()
    ], Slider.prototype, "onSlideEnd", void 0);
    __decorate([
        ViewChild("sliderHandle")
    ], Slider.prototype, "sliderHandle", void 0);
    __decorate([
        ViewChild("sliderHandleStart")
    ], Slider.prototype, "sliderHandleStart", void 0);
    __decorate([
        ViewChild("sliderHandleEnd")
    ], Slider.prototype, "sliderHandleEnd", void 0);
    Slider = __decorate([
        Component({
            selector: 'p-slider',
            template: "\n        <div [ngStyle]=\"style\" [class]=\"styleClass\" [ngClass]=\"{'ui-slider ui-widget ui-widget-content ui-corner-all':true,'ui-state-disabled':disabled,\n            'ui-slider-horizontal':orientation == 'horizontal','ui-slider-vertical':orientation == 'vertical','ui-slider-animate':animate}\"\n            (click)=\"onBarClick($event)\">\n            <span *ngIf=\"range && orientation == 'horizontal'\" class=\"ui-slider-range ui-widget-header ui-corner-all\" [ngStyle]=\"{'left':handleValues[0] + '%',width: (handleValues[1] - handleValues[0] + '%')}\"></span>\n            <span *ngIf=\"range && orientation == 'vertical'\" class=\"ui-slider-range ui-widget-header ui-corner-all\" [ngStyle]=\"{'bottom':handleValues[0] + '%',height: (handleValues[1] - handleValues[0] + '%')}\"></span>\n            <span *ngIf=\"!range && orientation=='vertical'\" class=\"ui-slider-range ui-slider-range-min ui-widget-header ui-corner-all\" [ngStyle]=\"{'height': handleValue + '%'}\"></span>\n            <span *ngIf=\"!range && orientation=='horizontal'\" class=\"ui-slider-range ui-slider-range-min ui-widget-header ui-corner-all\" [ngStyle]=\"{'width': handleValue + '%'}\"></span>\n            <span #sliderHandle *ngIf=\"!range\" [attr.tabindex]=\"tabindex\" (keydown)=\"onHandleKeydown($event)\" class=\"ui-slider-handle ui-state-default ui-corner-all ui-clickable\" (mousedown)=\"onMouseDown($event)\" (touchstart)=\"onTouchStart($event)\" (touchmove)=\"onTouchMove($event)\" (touchend)=\"onTouchEnd($event)\"\n                [style.transition]=\"dragging ? 'none': null\" [ngStyle]=\"{'left': orientation == 'horizontal' ? handleValue + '%' : null,'bottom': orientation == 'vertical' ? handleValue + '%' : null}\"\n                [attr.aria-valuemin]=\"min\" [attr.aria-valuenow]=\"value\" [attr.aria-valuemax]=\"max\" [attr.aria-labelledby]=\"ariaLabelledBy\"></span>\n            <span #sliderHandleStart *ngIf=\"range\" [attr.tabindex]=\"tabindex\" (keydown)=\"onHandleKeydown($event,0)\" (mousedown)=\"onMouseDown($event,0)\" (touchstart)=\"onTouchStart($event,0)\" (touchmove)=\"onTouchMove($event,0)\" (touchend)=\"onTouchEnd($event)\" [style.transition]=\"dragging ? 'none': null\" class=\"ui-slider-handle ui-state-default ui-corner-all ui-clickable\" \n                [ngStyle]=\"{'left': rangeStartLeft, 'bottom': rangeStartBottom}\" [ngClass]=\"{'ui-slider-handle-active':handleIndex==0}\"\n                [attr.aria-valuemin]=\"min\" [attr.aria-valuenow]=\"value ? value[0] : null\" [attr.aria-valuemax]=\"max\" [attr.aria-labelledby]=\"ariaLabelledBy\"></span>\n            <span #sliderHandleEnd *ngIf=\"range\" [attr.tabindex]=\"tabindex\" (keydown)=\"onHandleKeydown($event,1)\" (mousedown)=\"onMouseDown($event,1)\" (touchstart)=\"onTouchStart($event,1)\" (touchmove)=\"onTouchMove($event,1)\" (touchend)=\"onTouchEnd($event)\" [style.transition]=\"dragging ? 'none': null\" class=\"ui-slider-handle ui-state-default ui-corner-all ui-clickable\" \n                [ngStyle]=\"{'left': rangeEndLeft, 'bottom': rangeEndBottom}\" [ngClass]=\"{'ui-slider-handle-active':handleIndex==1}\"\n                [attr.aria-valuemin]=\"min\" [attr.aria-valuenow]=\"value ? value[1] : null\" [attr.aria-valuemax]=\"max\" [attr.aria-labelledby]=\"ariaLabelledBy\"></span>\n        </div>\n    ",
            providers: [SLIDER_VALUE_ACCESSOR],
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], Slider);
    return Slider;
}());
export { Slider };
var SliderModule = /** @class */ (function () {
    function SliderModule() {
    }
    SliderModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Slider],
            declarations: [Slider]
        })
    ], SliderModule);
    return SliderModule;
}());
export { SliderModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9zbGlkZXIvIiwic291cmNlcyI6WyJzbGlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFDLE1BQU0sRUFBQyxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDMUwsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTyxFQUFDLGlCQUFpQixFQUF1QixNQUFNLGdCQUFnQixDQUFDO0FBRXZFLE1BQU0sQ0FBQyxJQUFNLHFCQUFxQixHQUFRO0lBQ3hDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsTUFBTSxFQUFOLENBQU0sQ0FBQztJQUNyQyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUEwQkY7SUFzRUksZ0JBQW1CLEVBQWMsRUFBUyxRQUFtQixFQUFVLE1BQWMsRUFBUyxFQUFxQjtRQUFoRyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQWhFMUcsUUFBRyxHQUFXLENBQUMsQ0FBQztRQUVoQixRQUFHLEdBQVcsR0FBRyxDQUFDO1FBRWxCLGdCQUFXLEdBQVcsWUFBWSxDQUFDO1FBWW5DLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFFcEIsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWpELGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQWN0RCxpQkFBWSxHQUFhLEVBQUUsQ0FBQztRQUU1QixrQkFBYSxHQUFhLGNBQU8sQ0FBQyxDQUFDO1FBRW5DLG1CQUFjLEdBQWEsY0FBTyxDQUFDLENBQUM7UUFrQnBDLGdCQUFXLEdBQVcsQ0FBQyxDQUFDO0lBUXVGLENBQUM7SUFFdkgsNEJBQVcsR0FBWCxVQUFZLEtBQUssRUFBRSxLQUFhO1FBQzVCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDckIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCw2QkFBWSxHQUFaLFVBQWEsS0FBSyxFQUFFLEtBQWE7UUFDN0IsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsT0FBTztTQUNWO1FBRUQsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDbkYsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFFekIsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFlBQVksRUFBRTtZQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztTQUNqRTthQUNJO1lBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUM7U0FDbkU7UUFFRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELDRCQUFXLEdBQVgsVUFBWSxLQUFLLEVBQUUsS0FBYTtRQUM1QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixPQUFPO1NBQ1Y7UUFFRCxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUN0QyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBRWhCLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxZQUFZLEVBQUU7WUFDbkMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztTQUM5SDthQUNJO1lBQ0QsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztTQUNoSTtRQUVELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFNUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCwyQkFBVSxHQUFWLFVBQVcsS0FBSyxFQUFFLEtBQWE7UUFDM0IsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFFdEIsSUFBSSxJQUFJLENBQUMsS0FBSztZQUNWLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUM7O1lBRWxFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7UUFFcEUsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCwyQkFBVSxHQUFWLFVBQVcsS0FBSztRQUNaLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDekIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDNUI7UUFFRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO0lBQ25DLENBQUM7SUFFRCxnQ0FBZSxHQUFmLFVBQWdCLEtBQUssRUFBRSxXQUFtQjtRQUN0QyxJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRSxJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRSxFQUFFO1lBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztTQUNwQzthQUNJLElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLEVBQUU7WUFDN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7U0FDckM7SUFDTCxDQUFDO0lBRUQscUJBQUksR0FBSixVQUFLLEtBQUssRUFBRSxHQUFXLEVBQUUsV0FBbUI7UUFDeEMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUVsQyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztZQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzVCO2FBQ0k7WUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDNUI7UUFFRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELDZCQUFZLEdBQVosVUFBYSxLQUFZO1FBQ3JCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxrQ0FBaUIsR0FBakI7UUFBQSxpQkEyQkM7UUExQkcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztZQUMxQixJQUFJLENBQUMsS0FBSSxDQUFDLFlBQVksRUFBRTtnQkFDcEIsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsV0FBVyxFQUFFLFVBQUMsS0FBSztvQkFDcEUsSUFBSSxLQUFJLENBQUMsUUFBUSxFQUFFO3dCQUNmLEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDOzRCQUNaLEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQzdCLENBQUMsQ0FBQyxDQUFDO3FCQUNOO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2FBQ047WUFFRCxJQUFJLENBQUMsS0FBSSxDQUFDLGVBQWUsRUFBRTtnQkFDdkIsS0FBSSxDQUFDLGVBQWUsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLFVBQUMsS0FBSztvQkFDckUsSUFBSSxLQUFJLENBQUMsUUFBUSxFQUFFO3dCQUNmLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO3dCQUN0QixLQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQzs0QkFDWixJQUFJLEtBQUksQ0FBQyxLQUFLLEVBQUU7Z0NBQ1osS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFJLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQzs2QkFDckU7aUNBQU07Z0NBQ0gsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFJLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQzs2QkFDbkU7d0JBQ0wsQ0FBQyxDQUFDLENBQUM7cUJBQ047Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7YUFDTjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELG9DQUFtQixHQUFuQjtRQUNJLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNuQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7UUFFRCxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztJQUVELG1DQUFrQixHQUFsQixVQUFtQixLQUFZLEVBQUUsV0FBZ0I7UUFDN0MsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXBELElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDWCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7YUFDbEU7aUJBQ0k7Z0JBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsV0FBVyxDQUFDO2dCQUNsRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUNyQztTQUNKO2FBQ0k7WUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDL0M7aUJBQ0k7Z0JBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ3JDO1NBQ0o7SUFDTCxDQUFDO0lBRUQsaUNBQWdCLEdBQWhCLFVBQWlCLFFBQWdCLEVBQUUsUUFBZ0I7UUFDL0MsSUFBSSxJQUFJLEdBQUcsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUM7UUFDakMsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDO1FBRW5CLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRTtZQUNWLEdBQUcsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDdkY7YUFDSSxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7WUFDZixHQUFHLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ3hGO1FBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsMkJBQVUsR0FBVixVQUFXLEtBQVU7UUFDakIsSUFBSSxJQUFJLENBQUMsS0FBSztZQUNWLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxJQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDOztZQUUzQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssSUFBRSxDQUFDLENBQUM7UUFFMUIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsaUNBQWdCLEdBQWhCLFVBQWlCLEVBQVk7UUFDekIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELGtDQUFpQixHQUFqQixVQUFrQixFQUFZO1FBQzFCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxpQ0FBZ0IsR0FBaEIsVUFBaUIsR0FBWTtRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztJQUN4QixDQUFDO0lBRUQsc0JBQUksa0NBQWM7YUFBbEI7WUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNuRSxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLG9DQUFnQjthQUFwQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ25FLENBQUM7OztPQUFBO0lBRUQsc0JBQUksZ0NBQVk7YUFBaEI7WUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNuRSxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLGtDQUFjO2FBQWxCO1lBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDbkUsQ0FBQzs7O09BQUE7SUFFRCwyQkFBVSxHQUFWO1FBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxLQUFLLFVBQVUsQ0FBQztJQUMzQyxDQUFDO0lBRUQsOEJBQWEsR0FBYjtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ3JFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMxRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDeEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO1FBQzlELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztJQUNwRSxDQUFDO0lBRUQscUNBQW9CLEdBQXBCLFVBQXFCLEtBQUs7UUFDdEIsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFlBQVk7WUFDakMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7O1lBRTVELE9BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFFRCxrQ0FBaUIsR0FBakI7UUFDSSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pILElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdEg7YUFDSTtZQUNELElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRztnQkFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7aUJBQ3BCLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRztnQkFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7O2dCQUV2QixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDaEY7SUFDTCxDQUFDO0lBRUQsNEJBQVcsR0FBWCxVQUFZLEdBQVcsRUFBRSxLQUFhO1FBQ2xDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQztZQUVoQixJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxFQUFFO2dCQUN2QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFO29CQUNsQixLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFDakIsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQzVCO3FCQUNJLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQzdCLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQy9DO2dCQUVELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDaEQ7aUJBQ0k7Z0JBQ0QsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRTtvQkFDbEIsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO2lCQUM5QjtxQkFDSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUM3QixLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUMvQztnQkFFRCxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUM5QztZQUVELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQztTQUMzRDthQUNJO1lBQ0QsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDaEIsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7YUFDeEI7aUJBQ0ksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDckIsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7YUFDMUI7WUFFVixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVqQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQzNDO0lBQ0wsQ0FBQztJQUVELG1DQUFrQixHQUFsQixVQUFtQixXQUFtQjtRQUNsQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsRSxDQUFDO0lBRUosaUNBQWdCLEdBQWhCLFVBQWlCLEtBQWE7UUFDN0IsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLO1lBQ3ZDLE9BQU8sS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO1FBQ25ELE9BQU8sQ0FBQyxDQUFDO0lBQ1YsQ0FBQztJQUVELG1DQUFrQixHQUFsQixVQUFtQixHQUFXO1FBQzdCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckQsSUFBSSxhQUFhLEdBQUcsQ0FBQyxFQUFFO1lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ25DO2FBQ0k7WUFDSixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdkI7SUFDRixDQUFDO0lBRUUsNEJBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQy9CLENBQUM7O2dCQW5Wc0IsVUFBVTtnQkFBbUIsU0FBUztnQkFBa0IsTUFBTTtnQkFBYSxpQkFBaUI7O0lBcEUxRztRQUFSLEtBQUssRUFBRTsyQ0FBa0I7SUFFakI7UUFBUixLQUFLLEVBQUU7NENBQW1CO0lBRWxCO1FBQVIsS0FBSyxFQUFFO3VDQUFpQjtJQUVoQjtRQUFSLEtBQUssRUFBRTt1Q0FBbUI7SUFFbEI7UUFBUixLQUFLLEVBQUU7K0NBQW9DO0lBRW5DO1FBQVIsS0FBSyxFQUFFO3dDQUFjO0lBRWI7UUFBUixLQUFLLEVBQUU7eUNBQWdCO0lBRWY7UUFBUixLQUFLLEVBQUU7eUNBQVk7SUFFWDtRQUFSLEtBQUssRUFBRTs4Q0FBb0I7SUFFbkI7UUFBUixLQUFLLEVBQUU7a0RBQXdCO0lBRXZCO1FBQVIsS0FBSyxFQUFFOzRDQUFzQjtJQUVwQjtRQUFULE1BQU0sRUFBRTs0Q0FBa0Q7SUFFakQ7UUFBVCxNQUFNLEVBQUU7OENBQW9EO0lBRWxDO1FBQTFCLFNBQVMsQ0FBQyxjQUFjLENBQUM7Z0RBQTBCO0lBRXBCO1FBQS9CLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQztxREFBK0I7SUFFaEM7UUFBN0IsU0FBUyxDQUFDLGlCQUFpQixDQUFDO21EQUE2QjtJQWhDakQsTUFBTTtRQXhCbEIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLDR1R0FrQlQ7WUFDRCxTQUFTLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztZQUNsQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztTQUNuRCxDQUFDO09BQ1csTUFBTSxDQTBabEI7SUFBRCxhQUFDO0NBQUEsQUExWkQsSUEwWkM7U0ExWlksTUFBTTtBQWlhbkI7SUFBQTtJQUE0QixDQUFDO0lBQWhCLFlBQVk7UUFMeEIsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUNqQixZQUFZLEVBQUUsQ0FBQyxNQUFNLENBQUM7U0FDekIsQ0FBQztPQUNXLFlBQVksQ0FBSTtJQUFELG1CQUFDO0NBQUEsQUFBN0IsSUFBNkI7U0FBaEIsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25EZXN0cm95LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIFJlbmRlcmVyMixOZ1pvbmUsQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdDaGlsZCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICdwcmltZW5nL2RvbSc7XHJcbmltcG9ydCB7TkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5leHBvcnQgY29uc3QgU0xJREVSX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XHJcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU2xpZGVyKSxcclxuICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3Atc2xpZGVyJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nQ2xhc3NdPVwieyd1aS1zbGlkZXIgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwnOnRydWUsJ3VpLXN0YXRlLWRpc2FibGVkJzpkaXNhYmxlZCxcclxuICAgICAgICAgICAgJ3VpLXNsaWRlci1ob3Jpem9udGFsJzpvcmllbnRhdGlvbiA9PSAnaG9yaXpvbnRhbCcsJ3VpLXNsaWRlci12ZXJ0aWNhbCc6b3JpZW50YXRpb24gPT0gJ3ZlcnRpY2FsJywndWktc2xpZGVyLWFuaW1hdGUnOmFuaW1hdGV9XCJcclxuICAgICAgICAgICAgKGNsaWNrKT1cIm9uQmFyQ2xpY2soJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cInJhbmdlICYmIG9yaWVudGF0aW9uID09ICdob3Jpem9udGFsJ1wiIGNsYXNzPVwidWktc2xpZGVyLXJhbmdlIHVpLXdpZGdldC1oZWFkZXIgdWktY29ybmVyLWFsbFwiIFtuZ1N0eWxlXT1cInsnbGVmdCc6aGFuZGxlVmFsdWVzWzBdICsgJyUnLHdpZHRoOiAoaGFuZGxlVmFsdWVzWzFdIC0gaGFuZGxlVmFsdWVzWzBdICsgJyUnKX1cIj48L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwicmFuZ2UgJiYgb3JpZW50YXRpb24gPT0gJ3ZlcnRpY2FsJ1wiIGNsYXNzPVwidWktc2xpZGVyLXJhbmdlIHVpLXdpZGdldC1oZWFkZXIgdWktY29ybmVyLWFsbFwiIFtuZ1N0eWxlXT1cInsnYm90dG9tJzpoYW5kbGVWYWx1ZXNbMF0gKyAnJScsaGVpZ2h0OiAoaGFuZGxlVmFsdWVzWzFdIC0gaGFuZGxlVmFsdWVzWzBdICsgJyUnKX1cIj48L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIXJhbmdlICYmIG9yaWVudGF0aW9uPT0ndmVydGljYWwnXCIgY2xhc3M9XCJ1aS1zbGlkZXItcmFuZ2UgdWktc2xpZGVyLXJhbmdlLW1pbiB1aS13aWRnZXQtaGVhZGVyIHVpLWNvcm5lci1hbGxcIiBbbmdTdHlsZV09XCJ7J2hlaWdodCc6IGhhbmRsZVZhbHVlICsgJyUnfVwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhcmFuZ2UgJiYgb3JpZW50YXRpb249PSdob3Jpem9udGFsJ1wiIGNsYXNzPVwidWktc2xpZGVyLXJhbmdlIHVpLXNsaWRlci1yYW5nZS1taW4gdWktd2lkZ2V0LWhlYWRlciB1aS1jb3JuZXItYWxsXCIgW25nU3R5bGVdPVwieyd3aWR0aCc6IGhhbmRsZVZhbHVlICsgJyUnfVwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gI3NsaWRlckhhbmRsZSAqbmdJZj1cIiFyYW5nZVwiIFthdHRyLnRhYmluZGV4XT1cInRhYmluZGV4XCIgKGtleWRvd24pPVwib25IYW5kbGVLZXlkb3duKCRldmVudClcIiBjbGFzcz1cInVpLXNsaWRlci1oYW5kbGUgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsIHVpLWNsaWNrYWJsZVwiIChtb3VzZWRvd24pPVwib25Nb3VzZURvd24oJGV2ZW50KVwiICh0b3VjaHN0YXJ0KT1cIm9uVG91Y2hTdGFydCgkZXZlbnQpXCIgKHRvdWNobW92ZSk9XCJvblRvdWNoTW92ZSgkZXZlbnQpXCIgKHRvdWNoZW5kKT1cIm9uVG91Y2hFbmQoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgICBbc3R5bGUudHJhbnNpdGlvbl09XCJkcmFnZ2luZyA/ICdub25lJzogbnVsbFwiIFtuZ1N0eWxlXT1cInsnbGVmdCc6IG9yaWVudGF0aW9uID09ICdob3Jpem9udGFsJyA/IGhhbmRsZVZhbHVlICsgJyUnIDogbnVsbCwnYm90dG9tJzogb3JpZW50YXRpb24gPT0gJ3ZlcnRpY2FsJyA/IGhhbmRsZVZhbHVlICsgJyUnIDogbnVsbH1cIlxyXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS12YWx1ZW1pbl09XCJtaW5cIiBbYXR0ci5hcmlhLXZhbHVlbm93XT1cInZhbHVlXCIgW2F0dHIuYXJpYS12YWx1ZW1heF09XCJtYXhcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkQnlcIj48L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuICNzbGlkZXJIYW5kbGVTdGFydCAqbmdJZj1cInJhbmdlXCIgW2F0dHIudGFiaW5kZXhdPVwidGFiaW5kZXhcIiAoa2V5ZG93bik9XCJvbkhhbmRsZUtleWRvd24oJGV2ZW50LDApXCIgKG1vdXNlZG93bik9XCJvbk1vdXNlRG93bigkZXZlbnQsMClcIiAodG91Y2hzdGFydCk9XCJvblRvdWNoU3RhcnQoJGV2ZW50LDApXCIgKHRvdWNobW92ZSk9XCJvblRvdWNoTW92ZSgkZXZlbnQsMClcIiAodG91Y2hlbmQpPVwib25Ub3VjaEVuZCgkZXZlbnQpXCIgW3N0eWxlLnRyYW5zaXRpb25dPVwiZHJhZ2dpbmcgPyAnbm9uZSc6IG51bGxcIiBjbGFzcz1cInVpLXNsaWRlci1oYW5kbGUgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsIHVpLWNsaWNrYWJsZVwiIFxyXG4gICAgICAgICAgICAgICAgW25nU3R5bGVdPVwieydsZWZ0JzogcmFuZ2VTdGFydExlZnQsICdib3R0b20nOiByYW5nZVN0YXJ0Qm90dG9tfVwiIFtuZ0NsYXNzXT1cInsndWktc2xpZGVyLWhhbmRsZS1hY3RpdmUnOmhhbmRsZUluZGV4PT0wfVwiXHJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXZhbHVlbWluXT1cIm1pblwiIFthdHRyLmFyaWEtdmFsdWVub3ddPVwidmFsdWUgPyB2YWx1ZVswXSA6IG51bGxcIiBbYXR0ci5hcmlhLXZhbHVlbWF4XT1cIm1heFwiIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRCeVwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gI3NsaWRlckhhbmRsZUVuZCAqbmdJZj1cInJhbmdlXCIgW2F0dHIudGFiaW5kZXhdPVwidGFiaW5kZXhcIiAoa2V5ZG93bik9XCJvbkhhbmRsZUtleWRvd24oJGV2ZW50LDEpXCIgKG1vdXNlZG93bik9XCJvbk1vdXNlRG93bigkZXZlbnQsMSlcIiAodG91Y2hzdGFydCk9XCJvblRvdWNoU3RhcnQoJGV2ZW50LDEpXCIgKHRvdWNobW92ZSk9XCJvblRvdWNoTW92ZSgkZXZlbnQsMSlcIiAodG91Y2hlbmQpPVwib25Ub3VjaEVuZCgkZXZlbnQpXCIgW3N0eWxlLnRyYW5zaXRpb25dPVwiZHJhZ2dpbmcgPyAnbm9uZSc6IG51bGxcIiBjbGFzcz1cInVpLXNsaWRlci1oYW5kbGUgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsIHVpLWNsaWNrYWJsZVwiIFxyXG4gICAgICAgICAgICAgICAgW25nU3R5bGVdPVwieydsZWZ0JzogcmFuZ2VFbmRMZWZ0LCAnYm90dG9tJzogcmFuZ2VFbmRCb3R0b219XCIgW25nQ2xhc3NdPVwieyd1aS1zbGlkZXItaGFuZGxlLWFjdGl2ZSc6aGFuZGxlSW5kZXg9PTF9XCJcclxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtdmFsdWVtaW5dPVwibWluXCIgW2F0dHIuYXJpYS12YWx1ZW5vd109XCJ2YWx1ZSA/IHZhbHVlWzFdIDogbnVsbFwiIFthdHRyLmFyaWEtdmFsdWVtYXhdPVwibWF4XCIgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cImFyaWFMYWJlbGxlZEJ5XCI+PC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIHByb3ZpZGVyczogW1NMSURFUl9WQUxVRV9BQ0NFU1NPUl0sXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcclxufSlcclxuZXhwb3J0IGNsYXNzIFNsaWRlciBpbXBsZW1lbnRzIE9uRGVzdHJveSxDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcblxyXG4gICAgQElucHV0KCkgYW5pbWF0ZTogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSBtaW46IG51bWJlciA9IDA7XHJcblxyXG4gICAgQElucHV0KCkgbWF4OiBudW1iZXIgPSAxMDA7XHJcblxyXG4gICAgQElucHV0KCkgb3JpZW50YXRpb246IHN0cmluZyA9ICdob3Jpem9udGFsJztcclxuXHJcbiAgICBASW5wdXQoKSBzdGVwOiBudW1iZXI7XHJcblxyXG4gICAgQElucHV0KCkgcmFuZ2U6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgYXJpYUxhYmVsbGVkQnk6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSB0YWJpbmRleDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgXHJcbiAgICBAT3V0cHV0KCkgb25TbGlkZUVuZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBcclxuICAgIEBWaWV3Q2hpbGQoXCJzbGlkZXJIYW5kbGVcIikgc2xpZGVySGFuZGxlOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoXCJzbGlkZXJIYW5kbGVTdGFydFwiKSBzbGlkZXJIYW5kbGVTdGFydDogRWxlbWVudFJlZjtcclxuXHJcbiAgICBAVmlld0NoaWxkKFwic2xpZGVySGFuZGxlRW5kXCIpIHNsaWRlckhhbmRsZUVuZDogRWxlbWVudFJlZjtcclxuXHJcbiAgICBwdWJsaWMgdmFsdWU6IG51bWJlcjtcclxuICAgIFxyXG4gICAgcHVibGljIHZhbHVlczogbnVtYmVyW107XHJcbiAgICBcclxuICAgIHB1YmxpYyBoYW5kbGVWYWx1ZTogbnVtYmVyO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgaGFuZGxlVmFsdWVzOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgIFxyXG4gICAgcHVibGljIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XHJcbiAgICBcclxuICAgIHB1YmxpYyBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcclxuICAgIFxyXG4gICAgcHVibGljIGRyYWdnaW5nOiBib29sZWFuO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgZHJhZ0xpc3RlbmVyOiBhbnk7XHJcbiAgICBcclxuICAgIHB1YmxpYyBtb3VzZXVwTGlzdGVuZXI6IGFueTtcclxuICAgICAgICBcclxuICAgIHB1YmxpYyBpbml0WDogbnVtYmVyO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgaW5pdFk6IG51bWJlcjtcclxuICAgIFxyXG4gICAgcHVibGljIGJhcldpZHRoOiBudW1iZXI7XHJcbiAgICBcclxuICAgIHB1YmxpYyBiYXJIZWlnaHQ6IG51bWJlcjtcclxuICAgIFxyXG4gICAgcHVibGljIHNsaWRlckhhbmRsZUNsaWNrOiBib29sZWFuO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgaGFuZGxlSW5kZXg6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHVibGljIHN0YXJ0SGFuZGxlVmFsdWU6IGFueTtcclxuXHJcbiAgICBwdWJsaWMgc3RhcnR4OiBudW1iZXI7XHJcblxyXG4gICAgcHVibGljIHN0YXJ0eTogbnVtYmVyO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIG5nWm9uZTogTmdab25lLCBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7fVxyXG4gICAgXHJcbiAgICBvbk1vdXNlRG93bihldmVudCwgaW5kZXg/Om51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVEb21EYXRhKCk7XHJcbiAgICAgICAgdGhpcy5zbGlkZXJIYW5kbGVDbGljayA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVJbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHRoaXMuYmluZERyYWdMaXN0ZW5lcnMoKTtcclxuICAgICAgICBldmVudC50YXJnZXQuZm9jdXMoKTtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVG91Y2hTdGFydChldmVudCwgaW5kZXg/Om51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciB0b3VjaG9iaiA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xyXG4gICAgICAgIHRoaXMuc3RhcnRIYW5kbGVWYWx1ZSA9ICh0aGlzLnJhbmdlKSA/IHRoaXMuaGFuZGxlVmFsdWVzW2luZGV4XSA6IHRoaXMuaGFuZGxlVmFsdWU7XHJcbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVJbmRleCA9IGluZGV4O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnR4ID0gcGFyc2VJbnQodG91Y2hvYmouY2xpZW50WCwgMTApO1xyXG4gICAgICAgICAgICB0aGlzLmJhcldpZHRoID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLm9mZnNldFdpZHRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydHkgPSBwYXJzZUludCh0b3VjaG9iai5jbGllbnRZLCAxMCk7XHJcbiAgICAgICAgICAgIHRoaXMuYmFySGVpZ2h0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLm9mZnNldEhlaWdodDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Ub3VjaE1vdmUoZXZlbnQsIGluZGV4PzpudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciB0b3VjaG9iaiA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLFxyXG4gICAgICAgIGhhbmRsZVZhbHVlID0gMDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xyXG4gICAgICAgICAgICBoYW5kbGVWYWx1ZSA9IE1hdGguZmxvb3IoKChwYXJzZUludCh0b3VjaG9iai5jbGllbnRYLCAxMCkgLSB0aGlzLnN0YXJ0eCkgKiAxMDApIC8gKHRoaXMuYmFyV2lkdGgpKSArIHRoaXMuc3RhcnRIYW5kbGVWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGhhbmRsZVZhbHVlID0gTWF0aC5mbG9vcigoKHRoaXMuc3RhcnR5IC0gcGFyc2VJbnQodG91Y2hvYmouY2xpZW50WSwgMTApKSAqIDEwMCkgLyAodGhpcy5iYXJIZWlnaHQpKSAgKyB0aGlzLnN0YXJ0SGFuZGxlVmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldFZhbHVlRnJvbUhhbmRsZShldmVudCwgaGFuZGxlVmFsdWUpO1xyXG5cclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVG91Y2hFbmQoZXZlbnQsIGluZGV4PzpudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMucmFuZ2UpXHJcbiAgICAgICAgICAgIHRoaXMub25TbGlkZUVuZC5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgdmFsdWVzOiB0aGlzLnZhbHVlc30pO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5vblNsaWRlRW5kLmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCB2YWx1ZTogdGhpcy52YWx1ZX0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG9uQmFyQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICghdGhpcy5zbGlkZXJIYW5kbGVDbGljaykge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZURvbURhdGEoKTtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2UoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnNsaWRlckhhbmRsZUNsaWNrID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25IYW5kbGVLZXlkb3duKGV2ZW50LCBoYW5kbGVJbmRleD86bnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGV2ZW50LndoaWNoID09IDM4IHx8IGV2ZW50LndoaWNoID09IDM5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3BpbihldmVudCwgMSwgaGFuZGxlSW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChldmVudC53aGljaCA9PSAzNyB8fCBldmVudC53aGljaCA9PSA0MCkge1xyXG4gICAgICAgICAgICB0aGlzLnNwaW4oZXZlbnQsIC0xLCBoYW5kbGVJbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzcGluKGV2ZW50LCBkaXI6IG51bWJlciwgaGFuZGxlSW5kZXg/Om51bWJlcikge1xyXG4gICAgICAgIGxldCBzdGVwID0gKHRoaXMuc3RlcCB8fCAxKSAqIGRpcjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucmFuZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVJbmRleCA9IGhhbmRsZUluZGV4O1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKHRoaXMudmFsdWVzW3RoaXMuaGFuZGxlSW5kZXhdICsgc3RlcCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGFuZGxlVmFsdWUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUodGhpcy52YWx1ZSArIHN0ZXApO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhhbmRsZVZhbHVlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUNoYW5nZShldmVudDogRXZlbnQpIHtcclxuICAgICAgICBsZXQgaGFuZGxlVmFsdWUgPSB0aGlzLmNhbGN1bGF0ZUhhbmRsZVZhbHVlKGV2ZW50KTtcclxuICAgICAgICB0aGlzLnNldFZhbHVlRnJvbUhhbmRsZShldmVudCwgaGFuZGxlVmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBiaW5kRHJhZ0xpc3RlbmVycygpIHtcclxuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5kcmFnTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ0xpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ21vdXNlbW92ZScsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZShldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMubW91c2V1cExpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdXNldXBMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdtb3VzZXVwJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucmFuZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uU2xpZGVFbmQuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIHZhbHVlczogdGhpcy52YWx1ZXN9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblNsaWRlRW5kLmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCB2YWx1ZTogdGhpcy52YWx1ZX0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1bmJpbmREcmFnTGlzdGVuZXJzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRyYWdMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmRyYWdMaXN0ZW5lcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5tb3VzZXVwTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5tb3VzZXVwTGlzdGVuZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VmFsdWVGcm9tSGFuZGxlKGV2ZW50OiBFdmVudCwgaGFuZGxlVmFsdWU6IGFueSkge1xyXG4gICAgICAgIGxldCBuZXdWYWx1ZSA9IHRoaXMuZ2V0VmFsdWVGcm9tSGFuZGxlKGhhbmRsZVZhbHVlKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucmFuZ2UpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RlcCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVTdGVwQ2hhbmdlKG5ld1ZhbHVlLCB0aGlzLnZhbHVlc1t0aGlzLmhhbmRsZUluZGV4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVZhbHVlc1t0aGlzLmhhbmRsZUluZGV4XSA9IGhhbmRsZVZhbHVlOyAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUobmV3VmFsdWUsIGV2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHsgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RlcCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVTdGVwQ2hhbmdlKG5ld1ZhbHVlLCB0aGlzLnZhbHVlKTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVZhbHVlID0gaGFuZGxlVmFsdWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKG5ld1ZhbHVlLCBldmVudCk7XHJcbiAgICAgICAgICAgIH0gICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGhhbmRsZVN0ZXBDaGFuZ2UobmV3VmFsdWU6IG51bWJlciwgb2xkVmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBkaWZmID0gKG5ld1ZhbHVlIC0gb2xkVmFsdWUpO1xyXG4gICAgICAgIGxldCB2YWwgPSBvbGRWYWx1ZTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoZGlmZiA8IDApIHtcclxuICAgICAgICAgICAgdmFsID0gb2xkVmFsdWUgKyBNYXRoLmNlaWwobmV3VmFsdWUgLyB0aGlzLnN0ZXAgLSBvbGRWYWx1ZSAvIHRoaXMuc3RlcCkgKiB0aGlzLnN0ZXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGRpZmYgPiAwKSB7XHJcbiAgICAgICAgICAgIHZhbCA9IG9sZFZhbHVlICsgTWF0aC5mbG9vcihuZXdWYWx1ZSAvIHRoaXMuc3RlcCAtIG9sZFZhbHVlIC8gdGhpcy5zdGVwKSAqIHRoaXMuc3RlcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZSh2YWwpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlSGFuZGxlVmFsdWUoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSA6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnJhbmdlKVxyXG4gICAgICAgICAgICB0aGlzLnZhbHVlcyA9IHZhbHVlfHxbMCwwXTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZXx8MDtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnVwZGF0ZUhhbmRsZVZhbHVlKCk7XHJcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNldERpc2FibGVkU3RhdGUodmFsOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHZhbDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHJhbmdlU3RhcnRMZWZ0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzVmVydGljYWwoKSA/ICdhdXRvJyA6IHRoaXMuaGFuZGxlVmFsdWVzWzBdICsgJyUnO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgcmFuZ2VTdGFydEJvdHRvbSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1ZlcnRpY2FsKCkgPyB0aGlzLmhhbmRsZVZhbHVlc1swXSArICclJyA6ICdhdXRvJztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHJhbmdlRW5kTGVmdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1ZlcnRpY2FsKCkgPyAnYXV0bycgOiB0aGlzLmhhbmRsZVZhbHVlc1sxXSArICclJztcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IHJhbmdlRW5kQm90dG9tKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzVmVydGljYWwoKSA/IHRoaXMuaGFuZGxlVmFsdWVzWzFdICsgJyUnIDogJ2F1dG8nO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpc1ZlcnRpY2FsKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1cGRhdGVEb21EYXRhKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCByZWN0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdFggPSByZWN0LmxlZnQgKyBEb21IYW5kbGVyLmdldFdpbmRvd1Njcm9sbExlZnQoKTtcclxuICAgICAgICB0aGlzLmluaXRZID0gcmVjdC50b3AgKyBEb21IYW5kbGVyLmdldFdpbmRvd1Njcm9sbFRvcCgpO1xyXG4gICAgICAgIHRoaXMuYmFyV2lkdGggPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0ub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgdGhpcy5iYXJIZWlnaHQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0ub2Zmc2V0SGVpZ2h0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjYWxjdWxhdGVIYW5kbGVWYWx1ZShldmVudCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJylcclxuICAgICAgICAgICAgcmV0dXJuICgoZXZlbnQucGFnZVggLSB0aGlzLmluaXRYKSAqIDEwMCkgLyAodGhpcy5iYXJXaWR0aCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4oKCh0aGlzLmluaXRZICsgdGhpcy5iYXJIZWlnaHQpIC0gZXZlbnQucGFnZVkpICogMTAwKSAvICh0aGlzLmJhckhlaWdodCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVwZGF0ZUhhbmRsZVZhbHVlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnJhbmdlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlVmFsdWVzWzBdID0gKHRoaXMudmFsdWVzWzBdIDwgdGhpcy5taW4gPyAwIDogdGhpcy52YWx1ZXNbMF0gLSB0aGlzLm1pbikgKiAxMDAgLyAodGhpcy5tYXggLSB0aGlzLm1pbik7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlVmFsdWVzWzFdID0gKHRoaXMudmFsdWVzWzFdID4gdGhpcy5tYXggPyAxMDAgOiB0aGlzLnZhbHVlc1sxXSAtIHRoaXMubWluKSAqIDEwMCAvICh0aGlzLm1heCAtIHRoaXMubWluKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlIDwgdGhpcy5taW4pXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVZhbHVlID0gMDtcclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy52YWx1ZSA+IHRoaXMubWF4KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVWYWx1ZSA9IDEwMDtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVWYWx1ZSA9ICh0aGlzLnZhbHVlIC0gdGhpcy5taW4pICogMTAwIC8gKHRoaXMubWF4IC0gdGhpcy5taW4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgdXBkYXRlVmFsdWUodmFsOiBudW1iZXIsIGV2ZW50PzogRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5yYW5nZSkge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB2YWw7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAodGhpcy5oYW5kbGVJbmRleCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPCB0aGlzLm1pbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5taW47XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVWYWx1ZXNbMF0gPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUgPiB0aGlzLnZhbHVlc1sxXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy52YWx1ZXNbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVWYWx1ZXNbMF0gPSB0aGlzLmhhbmRsZVZhbHVlc1sxXTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlckhhbmRsZVN0YXJ0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA+IHRoaXMubWF4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLm1heDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVZhbHVlc1sxXSA9IDEwMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlIDwgdGhpcy52YWx1ZXNbMF0pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMudmFsdWVzWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlVmFsdWVzWzFdID0gdGhpcy5oYW5kbGVWYWx1ZXNbMF07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZXJIYW5kbGVFbmQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnZhbHVlc1t0aGlzLmhhbmRsZUluZGV4XSA9IHRoaXMuZ2V0Tm9ybWFsaXplZFZhbHVlKHZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZXMgPSB0aGlzLnZhbHVlcy5zbGljZSgpO1xyXG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZXMpO1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoe2V2ZW50OiBldmVudCwgdmFsdWVzOiB0aGlzLnZhbHVlc30pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHZhbCA8IHRoaXMubWluKSB7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLm1pbjtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlVmFsdWUgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHZhbCA+IHRoaXMubWF4KSB7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLm1heDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlVmFsdWUgPSAxMDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcblx0XHRcdHRoaXMudmFsdWUgPSB0aGlzLmdldE5vcm1hbGl6ZWRWYWx1ZSh2YWwpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMudmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoe2V2ZW50OiBldmVudCwgdmFsdWU6IHRoaXMudmFsdWV9KTtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXJIYW5kbGUubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICBnZXRWYWx1ZUZyb21IYW5kbGUoaGFuZGxlVmFsdWU6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLm1heCAtIHRoaXMubWluKSAqIChoYW5kbGVWYWx1ZSAvIDEwMCkgKyB0aGlzLm1pbjtcclxuICAgIH1cclxuXHRcclxuXHRnZXREZWNpbWFsc0NvdW50KHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0aWYgKHZhbHVlICYmIE1hdGguZmxvb3IodmFsdWUpICE9PSB2YWx1ZSlcclxuXHRcdFx0cmV0dXJuIHZhbHVlLnRvU3RyaW5nKCkuc3BsaXQoXCIuXCIpWzFdLmxlbmd0aCB8fCAwO1xyXG5cdFx0cmV0dXJuIDA7XHJcblx0fVxyXG5cdFxyXG5cdGdldE5vcm1hbGl6ZWRWYWx1ZSh2YWw6IG51bWJlcik6IG51bWJlciB7XHJcblx0XHRsZXQgZGVjaW1hbHNDb3VudCA9IHRoaXMuZ2V0RGVjaW1hbHNDb3VudCh0aGlzLnN0ZXApO1xyXG5cdFx0aWYgKGRlY2ltYWxzQ291bnQgPiAwKSB7XHJcblx0XHRcdHJldHVybiArdmFsLnRvRml4ZWQoZGVjaW1hbHNDb3VudCk7XHJcblx0XHR9IFxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHJldHVybiBNYXRoLmZsb29yKHZhbCk7XHJcblx0XHR9XHJcblx0fVxyXG4gICAgXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnVuYmluZERyYWdMaXN0ZW5lcnMoKTtcclxuICAgIH1cclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW1NsaWRlcl0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtTbGlkZXJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTbGlkZXJNb2R1bGUgeyB9XHJcbiJdfQ==