var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, OnInit, Input, Output, EventEmitter, forwardRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var SPINNER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Spinner; }),
    multi: true
};
var Spinner = /** @class */ (function () {
    function Spinner(el, cd) {
        this.el = el;
        this.cd = cd;
        this.onChange = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this._step = 1;
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.keyPattern = /[0-9\+\-]/;
        this.negativeSeparator = '-';
    }
    Object.defineProperty(Spinner.prototype, "step", {
        get: function () {
            return this._step;
        },
        set: function (val) {
            this._step = val;
            if (this._step != null) {
                var tokens = this.step.toString().split(/[,]|[.]/);
                this.calculatedPrecision = tokens[1] ? tokens[1].length : undefined;
            }
        },
        enumerable: true,
        configurable: true
    });
    Spinner.prototype.ngOnInit = function () {
        if (this.formatInput) {
            this.localeDecimalSeparator = (1.1).toLocaleString().substring(1, 2);
            this.localeThousandSeparator = (1000).toLocaleString().substring(1, 2);
            this.thousandRegExp = new RegExp("[" + (this.thousandSeparator || this.localeThousandSeparator) + "]", 'gim');
            if (this.decimalSeparator && this.thousandSeparator && this.decimalSeparator === this.thousandSeparator) {
                console.warn("thousandSeparator and decimalSeparator cannot have the same value.");
            }
        }
    };
    Spinner.prototype.repeat = function (event, interval, dir) {
        var _this = this;
        var i = interval || 500;
        this.clearTimer();
        this.timer = setTimeout(function () {
            _this.repeat(event, 40, dir);
        }, i);
        this.spin(event, dir);
    };
    Spinner.prototype.spin = function (event, dir) {
        var step = this.step * dir;
        var currentValue;
        var precision = this.getPrecision();
        if (this.value)
            currentValue = (typeof this.value === 'string') ? this.parseValue(this.value) : this.value;
        else
            currentValue = 0;
        if (precision)
            this.value = parseFloat(this.toFixed(currentValue + step, precision));
        else
            this.value = currentValue + step;
        if (this.maxlength !== undefined && this.value.toString().length > this.maxlength) {
            this.value = currentValue;
        }
        if (this.min !== undefined && this.value < this.min) {
            this.value = this.min;
        }
        if (this.max !== undefined && this.value > this.max) {
            this.value = this.max;
        }
        this.formatValue();
        this.onModelChange(this.value);
        this.onChange.emit(event);
    };
    Spinner.prototype.getPrecision = function () {
        return this.precision === undefined ? this.calculatedPrecision : this.precision;
    };
    Spinner.prototype.toFixed = function (value, precision) {
        var power = Math.pow(10, precision || 0);
        return String(Math.round(value * power) / power);
    };
    Spinner.prototype.onUpButtonMousedown = function (event) {
        if (!this.disabled) {
            this.inputfieldViewChild.nativeElement.focus();
            this.repeat(event, null, 1);
            this.updateFilledState();
            event.preventDefault();
        }
    };
    Spinner.prototype.onUpButtonMouseup = function (event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    };
    Spinner.prototype.onUpButtonMouseleave = function (event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    };
    Spinner.prototype.onDownButtonMousedown = function (event) {
        if (!this.disabled) {
            this.inputfieldViewChild.nativeElement.focus();
            this.repeat(event, null, -1);
            this.updateFilledState();
            event.preventDefault();
        }
    };
    Spinner.prototype.onDownButtonMouseup = function (event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    };
    Spinner.prototype.onDownButtonMouseleave = function (event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    };
    Spinner.prototype.onInputKeydown = function (event) {
        if (event.which == 38) {
            this.spin(event, 1);
            event.preventDefault();
        }
        else if (event.which == 40) {
            this.spin(event, -1);
            event.preventDefault();
        }
    };
    Spinner.prototype.onInputChange = function (event) {
        this.onChange.emit(event);
    };
    Spinner.prototype.onInput = function (event) {
        this.value = this.parseValue(event.target.value);
        this.onModelChange(this.value);
        this.updateFilledState();
    };
    Spinner.prototype.onInputBlur = function (event) {
        this.focus = false;
        this.formatValue();
        this.onModelTouched();
        this.onBlur.emit(event);
    };
    Spinner.prototype.onInputFocus = function (event) {
        this.focus = true;
        this.onFocus.emit(event);
    };
    Spinner.prototype.parseValue = function (val) {
        var value;
        var precision = this.getPrecision();
        if (val.trim() === '') {
            value = null;
        }
        else {
            if (this.formatInput) {
                val = val.replace(this.thousandRegExp, '');
            }
            if (precision) {
                val = this.formatInput ? val.replace(this.decimalSeparator || this.localeDecimalSeparator, '.') : val.replace(',', '.');
                value = parseFloat(val);
            }
            else {
                value = parseInt(val, 10);
            }
            if (!isNaN(value)) {
                if (this.max !== null && value > this.max) {
                    value = this.max;
                }
                if (this.min !== null && value < this.min) {
                    value = this.min;
                }
            }
            else {
                value = null;
            }
        }
        return value;
    };
    Spinner.prototype.formatValue = function () {
        var value = this.value;
        var precision = this.getPrecision();
        if (value != null) {
            if (this.formatInput) {
                value = value.toLocaleString(undefined, { maximumFractionDigits: 20 });
                if (this.decimalSeparator && this.thousandSeparator) {
                    value = value.split(this.localeDecimalSeparator);
                    if (precision && value[1]) {
                        value[1] = (this.decimalSeparator || this.localeDecimalSeparator) + value[1];
                    }
                    if (this.thousandSeparator && value[0].length > 3) {
                        value[0] = value[0].replace(new RegExp("[" + this.localeThousandSeparator + "]", 'gim'), this.thousandSeparator);
                    }
                    value = value.join('');
                }
            }
            this.formattedValue = value.toString();
        }
        else {
            this.formattedValue = null;
        }
        if (this.inputfieldViewChild && this.inputfieldViewChild.nativeElement) {
            this.inputfieldViewChild.nativeElement.value = this.formattedValue;
        }
    };
    Spinner.prototype.clearTimer = function () {
        if (this.timer) {
            clearInterval(this.timer);
        }
    };
    Spinner.prototype.writeValue = function (value) {
        this.value = value;
        this.formatValue();
        this.updateFilledState();
        this.cd.markForCheck();
    };
    Spinner.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Spinner.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Spinner.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    Spinner.prototype.updateFilledState = function () {
        this.filled = (this.value !== undefined && this.value != null);
    };
    Spinner.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Output()
    ], Spinner.prototype, "onChange", void 0);
    __decorate([
        Output()
    ], Spinner.prototype, "onFocus", void 0);
    __decorate([
        Output()
    ], Spinner.prototype, "onBlur", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "min", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "max", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "maxlength", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "size", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "placeholder", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "inputId", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "readonly", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "tabindex", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "required", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "name", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "ariaLabelledBy", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "inputStyle", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "inputStyleClass", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "formatInput", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "decimalSeparator", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "thousandSeparator", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "precision", void 0);
    __decorate([
        ViewChild('inputfield')
    ], Spinner.prototype, "inputfieldViewChild", void 0);
    __decorate([
        Input()
    ], Spinner.prototype, "step", null);
    Spinner = __decorate([
        Component({
            selector: 'p-spinner',
            template: "\n        <span class=\"ui-spinner ui-widget ui-corner-all\">\n            <input #inputfield type=\"text\" [attr.id]=\"inputId\" [value]=\"formattedValue||null\" [attr.name]=\"name\" [attr.aria-valumin]=\"min\" [attr.aria-valuemax]=\"max\" [attr.aria-valuenow]=\"value\" [attr.aria-labelledby]=\"ariaLabelledBy\"\n            [attr.size]=\"size\" [attr.maxlength]=\"maxlength\" [attr.tabindex]=\"tabindex\" [attr.placeholder]=\"placeholder\" [disabled]=\"disabled\" [readonly]=\"readonly\" [attr.required]=\"required\"\n            (keydown)=\"onInputKeydown($event)\" (blur)=\"onInputBlur($event)\" (input)=\"onInput($event)\" (change)=\"onInputChange($event)\" (focus)=\"onInputFocus($event)\"\n            [ngStyle]=\"inputStyle\" [class]=\"inputStyleClass\" [ngClass]=\"'ui-spinner-input ui-inputtext ui-widget ui-state-default ui-corner-all'\">\n            <button type=\"button\" [ngClass]=\"{'ui-spinner-button ui-spinner-up ui-corner-tr ui-button ui-widget ui-state-default':true,'ui-state-disabled':disabled}\" [disabled]=\"disabled||readonly\" tabindex=\"-1\" [attr.readonly]=\"readonly\"\n                (mouseleave)=\"onUpButtonMouseleave($event)\" (mousedown)=\"onUpButtonMousedown($event)\" (mouseup)=\"onUpButtonMouseup($event)\">\n                <span class=\"ui-spinner-button-icon pi pi-caret-up ui-clickable\"></span>\n            </button>\n            <button type=\"button\" [ngClass]=\"{'ui-spinner-button ui-spinner-down ui-corner-br ui-button ui-widget ui-state-default':true,'ui-state-disabled':disabled}\" [disabled]=\"disabled||readonly\" tabindex=\"-1\" [attr.readonly]=\"readonly\"\n                (mouseleave)=\"onDownButtonMouseleave($event)\" (mousedown)=\"onDownButtonMousedown($event)\" (mouseup)=\"onDownButtonMouseup($event)\">\n                <span class=\"ui-spinner-button-icon pi pi-caret-down ui-clickable\"></span>\n            </button>\n        </span>\n    ",
            host: {
                '[class.ui-inputwrapper-filled]': 'filled',
                '[class.ui-inputwrapper-focus]': 'focus'
            },
            providers: [SPINNER_VALUE_ACCESSOR],
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], Spinner);
    return Spinner;
}());
export { Spinner };
var SpinnerModule = /** @class */ (function () {
    function SpinnerModule() {
    }
    SpinnerModule = __decorate([
        NgModule({
            imports: [CommonModule, InputTextModule],
            exports: [Spinner],
            declarations: [Spinner]
        })
    ], SpinnerModule);
    return SpinnerModule;
}());
export { SpinnerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvc3Bpbm5lci8iLCJzb3VyY2VzIjpbInNwaW5uZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLGlCQUFpQixFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVKLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFDLGlCQUFpQixFQUF1QixNQUFNLGdCQUFnQixDQUFDO0FBRXZFLE1BQU0sQ0FBQyxJQUFNLHNCQUFzQixHQUFRO0lBQ3ZDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsT0FBTyxFQUFQLENBQU8sQ0FBQztJQUN0QyxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUEyQkY7SUFzRkksaUJBQW1CLEVBQWMsRUFBUyxFQUFxQjtRQUE1QyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVMsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFwRnJELGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVqRCxZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFaEQsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBd0N6RCxVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBSWxCLGtCQUFhLEdBQWEsY0FBTyxDQUFDLENBQUM7UUFFbkMsbUJBQWMsR0FBYSxjQUFPLENBQUMsQ0FBQztRQUVwQyxlQUFVLEdBQVcsV0FBVyxDQUFDO1FBUTFCLHNCQUFpQixHQUFHLEdBQUcsQ0FBQztJQXdCbUMsQ0FBQztJQVoxRCxzQkFBSSx5QkFBSTthQUFSO1lBQ0wsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7YUFDRCxVQUFTLEdBQVU7WUFDZixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztZQUVqQixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFFO2dCQUNwQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO2FBQ3ZFO1FBQ0wsQ0FBQzs7O09BUkE7SUFZRCwwQkFBUSxHQUFSO1FBQ0ksSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckUsSUFBSSxDQUFDLHVCQUF1QixHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN2RSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksTUFBTSxDQUFDLE9BQUksSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyx1QkFBdUIsT0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRXZHLElBQUksSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEtBQUssSUFBSSxDQUFDLGlCQUFpQixFQUFFO2dCQUNyRyxPQUFPLENBQUMsSUFBSSxDQUFDLG9FQUFvRSxDQUFDLENBQUM7YUFDdEY7U0FDSjtJQUNMLENBQUM7SUFFRCx3QkFBTSxHQUFOLFVBQU8sS0FBWSxFQUFFLFFBQWdCLEVBQUUsR0FBVztRQUFsRCxpQkFTQztRQVJHLElBQUksQ0FBQyxHQUFHLFFBQVEsSUFBRSxHQUFHLENBQUM7UUFFdEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO1lBQ3BCLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNoQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFTixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsc0JBQUksR0FBSixVQUFLLEtBQVksRUFBRSxHQUFXO1FBQzFCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQzNCLElBQUksWUFBb0IsQ0FBQztRQUN6QixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFcEMsSUFBSSxJQUFJLENBQUMsS0FBSztZQUNWLFlBQVksR0FBRyxDQUFDLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7O1lBRTNGLFlBQVksR0FBRyxDQUFDLENBQUM7UUFFckIsSUFBSSxTQUFTO1lBQ1QsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7O1lBRXRFLElBQUksQ0FBQyxLQUFLLEdBQUcsWUFBWSxHQUFHLElBQUksQ0FBQztRQUVyQyxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDL0UsSUFBSSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7U0FDN0I7UUFFRCxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNqRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7U0FDekI7UUFFRCxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNqRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7U0FDekI7UUFFRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELDhCQUFZLEdBQVo7UUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDcEYsQ0FBQztJQUVELHlCQUFPLEdBQVAsVUFBUSxLQUFhLEVBQUUsU0FBaUI7UUFDcEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsU0FBUyxJQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCxxQ0FBbUIsR0FBbkIsVUFBb0IsS0FBWTtRQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQy9DLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUN6QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDMUI7SUFDTCxDQUFDO0lBRUQsbUNBQWlCLEdBQWpCLFVBQWtCLEtBQVk7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQztJQUVELHNDQUFvQixHQUFwQixVQUFxQixLQUFZO1FBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNyQjtJQUNMLENBQUM7SUFFRCx1Q0FBcUIsR0FBckIsVUFBc0IsS0FBWTtRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQy9DLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3pCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUMxQjtJQUNMLENBQUM7SUFFRCxxQ0FBbUIsR0FBbkIsVUFBb0IsS0FBWTtRQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckI7SUFDTCxDQUFDO0lBRUQsd0NBQXNCLEdBQXRCLFVBQXVCLEtBQVk7UUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQztJQUVELGdDQUFjLEdBQWQsVUFBZSxLQUFvQjtRQUMvQixJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRSxFQUFFO1lBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUMxQjthQUNJLElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLEVBQUU7WUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDMUI7SUFDTCxDQUFDO0lBRUQsK0JBQWEsR0FBYixVQUFjLEtBQVk7UUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELHlCQUFPLEdBQVAsVUFBUSxLQUFvQjtRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQXFCLEtBQUssQ0FBQyxNQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELDZCQUFXLEdBQVgsVUFBWSxLQUFLO1FBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsOEJBQVksR0FBWixVQUFhLEtBQUs7UUFDZCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsNEJBQVUsR0FBVixVQUFXLEdBQVc7UUFDbEIsSUFBSSxLQUFhLENBQUM7UUFDbEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXBDLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNuQixLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQ2hCO2FBQ0k7WUFDRCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ2xCLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDOUM7WUFFRCxJQUFJLFNBQVMsRUFBRTtnQkFDWCxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLHNCQUFzQixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDeEgsS0FBSyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMzQjtpQkFDSTtnQkFDRCxLQUFLLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUM3QjtZQUVELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2YsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRTtvQkFDdkMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7aUJBQ3BCO2dCQUVELElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxJQUFJLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUU7b0JBQ3ZDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO2lCQUNwQjthQUNKO2lCQUNJO2dCQUNELEtBQUssR0FBRyxJQUFJLENBQUM7YUFDaEI7U0FDSjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCw2QkFBVyxHQUFYO1FBQ0ksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN2QixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFcEMsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO1lBQ2YsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNsQixLQUFLLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsRUFBQyxxQkFBcUIsRUFBRSxFQUFFLEVBQUMsQ0FBQyxDQUFDO2dCQUVyRSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7b0JBQ2pELEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO29CQUVqRCxJQUFJLFNBQVMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7d0JBQ3ZCLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ2hGO29CQUVELElBQUksSUFBSSxDQUFDLGlCQUFpQixJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO3dCQUMvQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFJLElBQUksQ0FBQyx1QkFBdUIsTUFBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO3FCQUMvRztvQkFFRCxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDMUI7YUFDSjtZQUVELElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQzFDO2FBQ0k7WUFDRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztTQUM5QjtRQUVELElBQUksSUFBSSxDQUFDLG1CQUFtQixJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLEVBQUU7WUFDcEUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztTQUN0RTtJQUNMLENBQUM7SUFFRCw0QkFBVSxHQUFWO1FBQ0ksSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1osYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QjtJQUNMLENBQUM7SUFFRCw0QkFBVSxHQUFWLFVBQVcsS0FBVTtRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsa0NBQWdCLEdBQWhCLFVBQWlCLEVBQVk7UUFDekIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELG1DQUFpQixHQUFqQixVQUFrQixFQUFZO1FBQzFCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxrQ0FBZ0IsR0FBaEIsVUFBaUIsR0FBWTtRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztJQUN4QixDQUFDO0lBRUQsbUNBQWlCLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUM7SUFDbkUsQ0FBQzs7Z0JBL09zQixVQUFVO2dCQUFhLGlCQUFpQjs7SUFwRnJEO1FBQVQsTUFBTSxFQUFFOzZDQUFrRDtJQUVqRDtRQUFULE1BQU0sRUFBRTs0Q0FBaUQ7SUFFaEQ7UUFBVCxNQUFNLEVBQUU7MkNBQWdEO0lBRWhEO1FBQVIsS0FBSyxFQUFFO3dDQUFhO0lBRVo7UUFBUixLQUFLLEVBQUU7d0NBQWE7SUFFWjtRQUFSLEtBQUssRUFBRTs4Q0FBbUI7SUFFbEI7UUFBUixLQUFLLEVBQUU7eUNBQWM7SUFFYjtRQUFSLEtBQUssRUFBRTtnREFBcUI7SUFFcEI7UUFBUixLQUFLLEVBQUU7NENBQWlCO0lBRWhCO1FBQVIsS0FBSyxFQUFFOzZDQUFtQjtJQUVsQjtRQUFSLEtBQUssRUFBRTs2Q0FBbUI7SUFFbEI7UUFBUixLQUFLLEVBQUU7NkNBQWtCO0lBRWpCO1FBQVIsS0FBSyxFQUFFOzZDQUFtQjtJQUVsQjtRQUFSLEtBQUssRUFBRTt5Q0FBYztJQUViO1FBQVIsS0FBSyxFQUFFO21EQUF3QjtJQUV2QjtRQUFSLEtBQUssRUFBRTsrQ0FBaUI7SUFFaEI7UUFBUixLQUFLLEVBQUU7b0RBQXlCO0lBRXhCO1FBQVIsS0FBSyxFQUFFO2dEQUFzQjtJQUVyQjtRQUFSLEtBQUssRUFBRTtxREFBMEI7SUFFekI7UUFBUixLQUFLLEVBQUU7c0RBQTJCO0lBRTFCO1FBQVIsS0FBSyxFQUFFOzhDQUFtQjtJQThCRjtRQUF4QixTQUFTLENBQUMsWUFBWSxDQUFDO3dEQUFpQztJQUVoRDtRQUFSLEtBQUssRUFBRTt1Q0FFUDtJQTVFUSxPQUFPO1FBekJuQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsV0FBVztZQUNyQixRQUFRLEVBQUUsdTNEQWVUO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLGdDQUFnQyxFQUFFLFFBQVE7Z0JBQzFDLCtCQUErQixFQUFFLE9BQU87YUFDM0M7WUFDRCxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztZQUNuQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztTQUNuRCxDQUFDO09BQ1csT0FBTyxDQXNVbkI7SUFBRCxjQUFDO0NBQUEsQUF0VUQsSUFzVUM7U0F0VVksT0FBTztBQThVcEI7SUFBQTtJQUE2QixDQUFDO0lBQWpCLGFBQWE7UUFMekIsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFDLGVBQWUsQ0FBQztZQUN2QyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFDbEIsWUFBWSxFQUFFLENBQUMsT0FBTyxDQUFDO1NBQzFCLENBQUM7T0FDVyxhQUFhLENBQUk7SUFBRCxvQkFBQztDQUFBLEFBQTlCLElBQThCO1NBQWpCLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxFbGVtZW50UmVmLE9uSW5pdCxJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyLGZvcndhcmRSZWYsVmlld0NoaWxkLENoYW5nZURldGVjdG9yUmVmLENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7SW5wdXRUZXh0TW9kdWxlfSBmcm9tICdwcmltZW5nL2lucHV0dGV4dCc7XHJcbmltcG9ydCB7TkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5leHBvcnQgY29uc3QgU1BJTk5FUl9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xyXG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBTcGlubmVyKSxcclxuICAgIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC1zcGlubmVyJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1zcGlubmVyIHVpLXdpZGdldCB1aS1jb3JuZXItYWxsXCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCAjaW5wdXRmaWVsZCB0eXBlPVwidGV4dFwiIFthdHRyLmlkXT1cImlucHV0SWRcIiBbdmFsdWVdPVwiZm9ybWF0dGVkVmFsdWV8fG51bGxcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIiBbYXR0ci5hcmlhLXZhbHVtaW5dPVwibWluXCIgW2F0dHIuYXJpYS12YWx1ZW1heF09XCJtYXhcIiBbYXR0ci5hcmlhLXZhbHVlbm93XT1cInZhbHVlXCIgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cImFyaWFMYWJlbGxlZEJ5XCJcclxuICAgICAgICAgICAgW2F0dHIuc2l6ZV09XCJzaXplXCIgW2F0dHIubWF4bGVuZ3RoXT1cIm1heGxlbmd0aFwiIFthdHRyLnRhYmluZGV4XT1cInRhYmluZGV4XCIgW2F0dHIucGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbcmVhZG9ubHldPVwicmVhZG9ubHlcIiBbYXR0ci5yZXF1aXJlZF09XCJyZXF1aXJlZFwiXHJcbiAgICAgICAgICAgIChrZXlkb3duKT1cIm9uSW5wdXRLZXlkb3duKCRldmVudClcIiAoYmx1cik9XCJvbklucHV0Qmx1cigkZXZlbnQpXCIgKGlucHV0KT1cIm9uSW5wdXQoJGV2ZW50KVwiIChjaGFuZ2UpPVwib25JbnB1dENoYW5nZSgkZXZlbnQpXCIgKGZvY3VzKT1cIm9uSW5wdXRGb2N1cygkZXZlbnQpXCJcclxuICAgICAgICAgICAgW25nU3R5bGVdPVwiaW5wdXRTdHlsZVwiIFtjbGFzc109XCJpbnB1dFN0eWxlQ2xhc3NcIiBbbmdDbGFzc109XCIndWktc3Bpbm5lci1pbnB1dCB1aS1pbnB1dHRleHQgdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbCdcIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgW25nQ2xhc3NdPVwieyd1aS1zcGlubmVyLWJ1dHRvbiB1aS1zcGlubmVyLXVwIHVpLWNvcm5lci10ciB1aS1idXR0b24gdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQnOnRydWUsJ3VpLXN0YXRlLWRpc2FibGVkJzpkaXNhYmxlZH1cIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWR8fHJlYWRvbmx5XCIgdGFiaW5kZXg9XCItMVwiIFthdHRyLnJlYWRvbmx5XT1cInJlYWRvbmx5XCJcclxuICAgICAgICAgICAgICAgIChtb3VzZWxlYXZlKT1cIm9uVXBCdXR0b25Nb3VzZWxlYXZlKCRldmVudClcIiAobW91c2Vkb3duKT1cIm9uVXBCdXR0b25Nb3VzZWRvd24oJGV2ZW50KVwiIChtb3VzZXVwKT1cIm9uVXBCdXR0b25Nb3VzZXVwKCRldmVudClcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktc3Bpbm5lci1idXR0b24taWNvbiBwaSBwaS1jYXJldC11cCB1aS1jbGlja2FibGVcIj48L3NwYW4+XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBbbmdDbGFzc109XCJ7J3VpLXNwaW5uZXItYnV0dG9uIHVpLXNwaW5uZXItZG93biB1aS1jb3JuZXItYnIgdWktYnV0dG9uIHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0Jzp0cnVlLCd1aS1zdGF0ZS1kaXNhYmxlZCc6ZGlzYWJsZWR9XCIgW2Rpc2FibGVkXT1cImRpc2FibGVkfHxyZWFkb25seVwiIHRhYmluZGV4PVwiLTFcIiBbYXR0ci5yZWFkb25seV09XCJyZWFkb25seVwiXHJcbiAgICAgICAgICAgICAgICAobW91c2VsZWF2ZSk9XCJvbkRvd25CdXR0b25Nb3VzZWxlYXZlKCRldmVudClcIiAobW91c2Vkb3duKT1cIm9uRG93bkJ1dHRvbk1vdXNlZG93bigkZXZlbnQpXCIgKG1vdXNldXApPVwib25Eb3duQnV0dG9uTW91c2V1cCgkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXNwaW5uZXItYnV0dG9uLWljb24gcGkgcGktY2FyZXQtZG93biB1aS1jbGlja2FibGVcIj48L3NwYW4+XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgIGAsXHJcbiAgICBob3N0OiB7XHJcbiAgICAgICAgJ1tjbGFzcy51aS1pbnB1dHdyYXBwZXItZmlsbGVkXSc6ICdmaWxsZWQnLFxyXG4gICAgICAgICdbY2xhc3MudWktaW5wdXR3cmFwcGVyLWZvY3VzXSc6ICdmb2N1cydcclxuICAgIH0sXHJcbiAgICBwcm92aWRlcnM6IFtTUElOTkVSX1ZBTFVFX0FDQ0VTU09SXSxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3Bpbm5lciBpbXBsZW1lbnRzIE9uSW5pdCxDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcbiAgICBcclxuICAgIEBPdXRwdXQoKSBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBcclxuICAgIEBPdXRwdXQoKSBvbkZvY3VzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25CbHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBASW5wdXQoKSBtaW46IG51bWJlcjtcclxuXHJcbiAgICBASW5wdXQoKSBtYXg6IG51bWJlcjtcclxuICAgIFxyXG4gICAgQElucHV0KCkgbWF4bGVuZ3RoOiBudW1iZXI7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIHNpemU6IG51bWJlcjtcclxuXHJcbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGlucHV0SWQ6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcclxuICAgIFxyXG4gICAgQElucHV0KCkgcmVhZG9ubHk6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlcjtcclxuICAgICAgICAgICAgXHJcbiAgICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgYXJpYUxhYmVsbGVkQnk6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBpbnB1dFN0eWxlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgaW5wdXRTdHlsZUNsYXNzOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgZm9ybWF0SW5wdXQ6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgZGVjaW1hbFNlcGFyYXRvcjogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIHRob3VzYW5kU2VwYXJhdG9yOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgcHJlY2lzaW9uOiBudW1iZXI7XHJcbiAgICBcclxuICAgIHZhbHVlOiBhbnk7XHJcblxyXG4gICAgX3N0ZXA6IG51bWJlciA9IDE7XHJcblxyXG4gICAgZm9ybWF0dGVkVmFsdWU6IHN0cmluZztcclxuICAgICAgICBcclxuICAgIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XHJcbiAgICBcclxuICAgIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xyXG4gICAgXHJcbiAgICBrZXlQYXR0ZXJuOiBSZWdFeHAgPSAvWzAtOVxcK1xcLV0vO1xyXG4gICAgICAgIFxyXG4gICAgcHVibGljIHRpbWVyOiBhbnk7XHJcbiAgICBcclxuICAgIHB1YmxpYyBmb2N1czogYm9vbGVhbjtcclxuICAgIFxyXG4gICAgcHVibGljIGZpbGxlZDogYm9vbGVhbjtcclxuICAgIFxyXG4gICAgcHVibGljIG5lZ2F0aXZlU2VwYXJhdG9yID0gJy0nO1xyXG5cclxuICAgIGxvY2FsZURlY2ltYWxTZXBhcmF0b3I6IHN0cmluZztcclxuXHJcbiAgICBsb2NhbGVUaG91c2FuZFNlcGFyYXRvcjogc3RyaW5nO1xyXG5cclxuICAgIHRob3VzYW5kUmVnRXhwOiBSZWdFeHA7XHJcblxyXG4gICAgY2FsY3VsYXRlZFByZWNpc2lvbjogbnVtYmVyO1xyXG4gICAgXHJcbiAgICBAVmlld0NoaWxkKCdpbnB1dGZpZWxkJykgaW5wdXRmaWVsZFZpZXdDaGlsZDogRWxlbWVudFJlZjtcclxuXHJcbiAgICBASW5wdXQoKSBnZXQgc3RlcCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGVwO1xyXG4gICAgfVxyXG4gICAgc2V0IHN0ZXAodmFsOm51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX3N0ZXAgPSB2YWw7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9zdGVwICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IHRva2VucyA9IHRoaXMuc3RlcC50b1N0cmluZygpLnNwbGl0KC9bLF18Wy5dLyk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZFByZWNpc2lvbiA9IHRva2Vuc1sxXSA/IHRva2Vuc1sxXS5sZW5ndGggOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZm9ybWF0SW5wdXQpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2NhbGVEZWNpbWFsU2VwYXJhdG9yID0gKDEuMSkudG9Mb2NhbGVTdHJpbmcoKS5zdWJzdHJpbmcoMSwgMik7XHJcbiAgICAgICAgICAgIHRoaXMubG9jYWxlVGhvdXNhbmRTZXBhcmF0b3IgPSAoMTAwMCkudG9Mb2NhbGVTdHJpbmcoKS5zdWJzdHJpbmcoMSwgMik7XHJcbiAgICAgICAgICAgIHRoaXMudGhvdXNhbmRSZWdFeHAgPSBuZXcgUmVnRXhwKGBbJHt0aGlzLnRob3VzYW5kU2VwYXJhdG9yIHx8IHRoaXMubG9jYWxlVGhvdXNhbmRTZXBhcmF0b3J9XWAsICdnaW0nKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRlY2ltYWxTZXBhcmF0b3IgJiYgdGhpcy50aG91c2FuZFNlcGFyYXRvciAmJiB0aGlzLmRlY2ltYWxTZXBhcmF0b3IgPT09IHRoaXMudGhvdXNhbmRTZXBhcmF0b3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcInRob3VzYW5kU2VwYXJhdG9yIGFuZCBkZWNpbWFsU2VwYXJhdG9yIGNhbm5vdCBoYXZlIHRoZSBzYW1lIHZhbHVlLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXBlYXQoZXZlbnQ6IEV2ZW50LCBpbnRlcnZhbDogbnVtYmVyLCBkaXI6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBpID0gaW50ZXJ2YWx8fDUwMDtcclxuXHJcbiAgICAgICAgdGhpcy5jbGVhclRpbWVyKCk7XHJcbiAgICAgICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlcGVhdChldmVudCwgNDAsIGRpcik7XHJcbiAgICAgICAgfSwgaSk7XHJcblxyXG4gICAgICAgIHRoaXMuc3BpbihldmVudCwgZGlyKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc3BpbihldmVudDogRXZlbnQsIGRpcjogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHN0ZXAgPSB0aGlzLnN0ZXAgKiBkaXI7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRWYWx1ZTogbnVtYmVyO1xyXG4gICAgICAgIGxldCBwcmVjaXNpb24gPSB0aGlzLmdldFByZWNpc2lvbigpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy52YWx1ZSlcclxuICAgICAgICAgICAgY3VycmVudFZhbHVlID0gKHR5cGVvZiB0aGlzLnZhbHVlID09PSAnc3RyaW5nJykgPyB0aGlzLnBhcnNlVmFsdWUodGhpcy52YWx1ZSkgOiB0aGlzLnZhbHVlO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgY3VycmVudFZhbHVlID0gMDtcclxuICAgICAgICBcclxuICAgICAgICBpZiAocHJlY2lzaW9uKVxyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gcGFyc2VGbG9hdCh0aGlzLnRvRml4ZWQoY3VycmVudFZhbHVlICsgc3RlcCwgcHJlY2lzaW9uKSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gY3VycmVudFZhbHVlICsgc3RlcDtcclxuICAgIFxyXG4gICAgICAgIGlmICh0aGlzLm1heGxlbmd0aCAhPT0gdW5kZWZpbmVkICYmIHRoaXMudmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPiB0aGlzLm1heGxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gY3VycmVudFZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGlmICh0aGlzLm1pbiAhPT0gdW5kZWZpbmVkICYmIHRoaXMudmFsdWUgPCB0aGlzLm1pbikge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5taW47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5tYXggIT09IHVuZGVmaW5lZCAmJiB0aGlzLnZhbHVlID4gdGhpcy5tYXgpIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubWF4O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmZvcm1hdFZhbHVlKCk7XHJcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMudmFsdWUpO1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdChldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UHJlY2lzaW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByZWNpc2lvbiA9PT0gdW5kZWZpbmVkID8gdGhpcy5jYWxjdWxhdGVkUHJlY2lzaW9uIDogdGhpcy5wcmVjaXNpb247XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRvRml4ZWQodmFsdWU6IG51bWJlciwgcHJlY2lzaW9uOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcG93ZXIgPSBNYXRoLnBvdygxMCwgcHJlY2lzaW9ufHwwKTtcclxuICAgICAgICByZXR1cm4gU3RyaW5nKE1hdGgucm91bmQodmFsdWUgKiBwb3dlcikgLyBwb3dlcik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG9uVXBCdXR0b25Nb3VzZWRvd24oZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRmaWVsZFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVwZWF0KGV2ZW50LCBudWxsLCAxKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgb25VcEJ1dHRvbk1vdXNldXAoZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgb25VcEJ1dHRvbk1vdXNlbGVhdmUoZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgb25Eb3duQnV0dG9uTW91c2Vkb3duKGV2ZW50OiBFdmVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgICAgICB0aGlzLnJlcGVhdChldmVudCwgbnVsbCwgLTEpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZpbGxlZFN0YXRlKCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvbkRvd25CdXR0b25Nb3VzZXVwKGV2ZW50OiBFdmVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG9uRG93bkJ1dHRvbk1vdXNlbGVhdmUoZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgb25JbnB1dEtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT0gMzgpIHtcclxuICAgICAgICAgICAgdGhpcy5zcGluKGV2ZW50LCAxKTtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZXZlbnQud2hpY2ggPT0gNDApIHtcclxuICAgICAgICAgICAgdGhpcy5zcGluKGV2ZW50LCAtMSk7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uSW5wdXRDaGFuZ2UoZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBvbklucHV0KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMucGFyc2VWYWx1ZSgoPEhUTUxJbnB1dEVsZW1lbnQ+IGV2ZW50LnRhcmdldCkudmFsdWUpO1xyXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUZpbGxlZFN0YXRlKCk7XHJcbiAgICB9XHJcbiAgICAgICAgXHJcbiAgICBvbklucHV0Qmx1cihldmVudCkge1xyXG4gICAgICAgIHRoaXMuZm9jdXMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZvcm1hdFZhbHVlKCk7XHJcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xyXG4gICAgICAgIHRoaXMub25CbHVyLmVtaXQoZXZlbnQpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvbklucHV0Rm9jdXMoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmZvY3VzID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm9uRm9jdXMuZW1pdChldmVudCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHBhcnNlVmFsdWUodmFsOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCB2YWx1ZTogbnVtYmVyO1xyXG4gICAgICAgIGxldCBwcmVjaXNpb24gPSB0aGlzLmdldFByZWNpc2lvbigpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgaWYgKHZhbC50cmltKCkgPT09ICcnKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZvcm1hdElucHV0KSB7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSB2YWwucmVwbGFjZSh0aGlzLnRob3VzYW5kUmVnRXhwLCAnJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChwcmVjaXNpb24pIHtcclxuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuZm9ybWF0SW5wdXQgPyB2YWwucmVwbGFjZSh0aGlzLmRlY2ltYWxTZXBhcmF0b3IgfHwgdGhpcy5sb2NhbGVEZWNpbWFsU2VwYXJhdG9yLCAnLicpIDogdmFsLnJlcGxhY2UoJywnLCAnLicpO1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBwYXJzZUZsb2F0KHZhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHBhcnNlSW50KHZhbCwgMTApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoIWlzTmFOKHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWF4ICE9PSBudWxsICYmIHZhbHVlID4gdGhpcy5tYXgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMubWF4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1pbiAhPT0gbnVsbCAmJiB2YWx1ZSA8IHRoaXMubWluKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLm1pbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZm9ybWF0VmFsdWUoKSB7XHJcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICBsZXQgcHJlY2lzaW9uID0gdGhpcy5nZXRQcmVjaXNpb24oKTtcclxuXHJcbiAgICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZm9ybWF0SW5wdXQpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUudG9Mb2NhbGVTdHJpbmcodW5kZWZpbmVkLCB7bWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyMH0pO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kZWNpbWFsU2VwYXJhdG9yICYmIHRoaXMudGhvdXNhbmRTZXBhcmF0b3IpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnNwbGl0KHRoaXMubG9jYWxlRGVjaW1hbFNlcGFyYXRvcik7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJlY2lzaW9uICYmIHZhbHVlWzFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlWzFdID0gKHRoaXMuZGVjaW1hbFNlcGFyYXRvciB8fCB0aGlzLmxvY2FsZURlY2ltYWxTZXBhcmF0b3IpICsgdmFsdWVbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudGhvdXNhbmRTZXBhcmF0b3IgJiYgdmFsdWVbMF0ubGVuZ3RoID4gMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVswXSA9IHZhbHVlWzBdLnJlcGxhY2UobmV3IFJlZ0V4cChgWyR7dGhpcy5sb2NhbGVUaG91c2FuZFNlcGFyYXRvcn1dYCwgJ2dpbScpLCB0aGlzLnRob3VzYW5kU2VwYXJhdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmpvaW4oJycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgdGhpcy5mb3JtYXR0ZWRWYWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1hdHRlZFZhbHVlID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQgJiYgdGhpcy5pbnB1dGZpZWxkVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dGZpZWxkVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLmZvcm1hdHRlZFZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICBjbGVhclRpbWVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRpbWVyKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIDogdm9pZCB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuZm9ybWF0VmFsdWUoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUZpbGxlZFN0YXRlKCk7XHJcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNldERpc2FibGVkU3RhdGUodmFsOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHZhbDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdXBkYXRlRmlsbGVkU3RhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5maWxsZWQgPSAodGhpcy52YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMudmFsdWUgIT0gbnVsbCk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSxJbnB1dFRleHRNb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW1NwaW5uZXJdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbU3Bpbm5lcl1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNwaW5uZXJNb2R1bGUgeyB9XHJcbiJdfQ==