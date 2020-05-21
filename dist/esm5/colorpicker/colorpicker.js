var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, Input, Output, OnDestroy, EventEmitter, forwardRef, Renderer2, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var COLORPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return ColorPicker; }),
    multi: true
};
var ColorPicker = /** @class */ (function () {
    function ColorPicker(el, renderer, cd) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.format = 'hex';
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.showTransitionOptions = '225ms ease-out';
        this.hideTransitionOptions = '195ms ease-in';
        this.onChange = new EventEmitter();
        this.defaultColor = 'ff0000';
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    Object.defineProperty(ColorPicker.prototype, "colorSelector", {
        set: function (element) {
            this.colorSelectorViewChild = element;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPicker.prototype, "colorHandle", {
        set: function (element) {
            this.colorHandleViewChild = element;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPicker.prototype, "hue", {
        set: function (element) {
            this.hueViewChild = element;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColorPicker.prototype, "hueHandle", {
        set: function (element) {
            this.hueHandleViewChild = element;
        },
        enumerable: true,
        configurable: true
    });
    ColorPicker.prototype.onHueMousedown = function (event) {
        if (this.disabled) {
            return;
        }
        this.bindDocumentMousemoveListener();
        this.bindDocumentMouseupListener();
        this.hueDragging = true;
        this.pickHue(event);
    };
    ColorPicker.prototype.pickHue = function (event) {
        var top = this.hueViewChild.nativeElement.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
        this.value = this.validateHSB({
            h: Math.floor(360 * (150 - Math.max(0, Math.min(150, (event.pageY - top)))) / 150),
            s: this.value.s,
            b: this.value.b
        });
        this.updateColorSelector();
        this.updateUI();
        this.updateModel();
        this.onChange.emit({ originalEvent: event, value: this.getValueToUpdate() });
    };
    ColorPicker.prototype.onColorMousedown = function (event) {
        if (this.disabled) {
            return;
        }
        this.bindDocumentMousemoveListener();
        this.bindDocumentMouseupListener();
        this.colorDragging = true;
        this.pickColor(event);
    };
    ColorPicker.prototype.pickColor = function (event) {
        var rect = this.colorSelectorViewChild.nativeElement.getBoundingClientRect();
        var top = rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
        var left = rect.left + document.body.scrollLeft;
        var saturation = Math.floor(100 * (Math.max(0, Math.min(150, (event.pageX - left)))) / 150);
        var brightness = Math.floor(100 * (150 - Math.max(0, Math.min(150, (event.pageY - top)))) / 150);
        this.value = this.validateHSB({
            h: this.value.h,
            s: saturation,
            b: brightness
        });
        this.updateUI();
        this.updateModel();
        this.onChange.emit({ originalEvent: event, value: this.getValueToUpdate() });
    };
    ColorPicker.prototype.getValueToUpdate = function () {
        var val;
        switch (this.format) {
            case 'hex':
                val = '#' + this.HSBtoHEX(this.value);
                break;
            case 'rgb':
                val = this.HSBtoRGB(this.value);
                break;
            case 'hsb':
                val = this.value;
                break;
        }
        return val;
    };
    ColorPicker.prototype.updateModel = function () {
        this.onModelChange(this.getValueToUpdate());
    };
    ColorPicker.prototype.writeValue = function (value) {
        if (value) {
            switch (this.format) {
                case 'hex':
                    this.value = this.HEXtoHSB(value);
                    break;
                case 'rgb':
                    this.value = this.RGBtoHSB(value);
                    break;
                case 'hsb':
                    this.value = value;
                    break;
            }
        }
        else {
            this.value = this.HEXtoHSB(this.defaultColor);
        }
        this.updateColorSelector();
        this.updateUI();
    };
    ColorPicker.prototype.updateColorSelector = function () {
        if (this.colorSelectorViewChild) {
            var hsb = {};
            hsb.s = 100;
            hsb.b = 100;
            hsb.h = this.value.h;
            this.colorSelectorViewChild.nativeElement.style.backgroundColor = '#' + this.HSBtoHEX(hsb);
        }
    };
    ColorPicker.prototype.updateUI = function () {
        if (this.colorHandleViewChild && this.hueHandleViewChild.nativeElement) {
            this.colorHandleViewChild.nativeElement.style.left = Math.floor(150 * this.value.s / 100) + 'px';
            this.colorHandleViewChild.nativeElement.style.top = Math.floor(150 * (100 - this.value.b) / 100) + 'px';
            this.hueHandleViewChild.nativeElement.style.top = Math.floor(150 - (150 * this.value.h / 360)) + 'px';
        }
        this.inputBgColor = '#' + this.HSBtoHEX(this.value);
    };
    ColorPicker.prototype.onInputFocus = function () {
        this.onModelTouched();
    };
    ColorPicker.prototype.show = function () {
        this.overlayVisible = true;
    };
    ColorPicker.prototype.onOverlayAnimationStart = function (event) {
        switch (event.toState) {
            case 'visible':
                if (!this.inline) {
                    this.overlay = event.element;
                    this.appendOverlay();
                    if (this.autoZIndex) {
                        this.overlay.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
                    }
                    this.alignOverlay();
                    this.bindDocumentClickListener();
                    this.updateColorSelector();
                    this.updateUI();
                }
                break;
            case 'void':
                this.onOverlayHide();
                break;
        }
    };
    ColorPicker.prototype.appendOverlay = function () {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.overlay);
            else
                DomHandler.appendChild(this.overlay, this.appendTo);
        }
    };
    ColorPicker.prototype.restoreOverlayAppend = function () {
        if (this.overlay && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    };
    ColorPicker.prototype.alignOverlay = function () {
        if (this.appendTo)
            DomHandler.absolutePosition(this.overlay, this.inputViewChild.nativeElement);
        else
            DomHandler.relativePosition(this.overlay, this.inputViewChild.nativeElement);
    };
    ColorPicker.prototype.hide = function () {
        this.overlayVisible = false;
    };
    ColorPicker.prototype.onInputClick = function () {
        this.selfClick = true;
        this.togglePanel();
    };
    ColorPicker.prototype.togglePanel = function () {
        if (!this.overlayVisible)
            this.show();
        else
            this.hide();
    };
    ColorPicker.prototype.onInputKeydown = function (event) {
        switch (event.which) {
            //space
            case 32:
                this.togglePanel();
                event.preventDefault();
                break;
            //escape and tab
            case 27:
            case 9:
                this.hide();
                break;
        }
    };
    ColorPicker.prototype.onPanelClick = function () {
        this.selfClick = true;
    };
    ColorPicker.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    ColorPicker.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    ColorPicker.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    ColorPicker.prototype.bindDocumentClickListener = function () {
        var _this = this;
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', function () {
                if (!_this.selfClick) {
                    _this.overlayVisible = false;
                    _this.unbindDocumentClickListener();
                }
                _this.selfClick = false;
                _this.cd.markForCheck();
            });
        }
    };
    ColorPicker.prototype.unbindDocumentClickListener = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    };
    ColorPicker.prototype.bindDocumentMousemoveListener = function () {
        var _this = this;
        if (!this.documentMousemoveListener) {
            this.documentMousemoveListener = this.renderer.listen('document', 'mousemove', function (event) {
                if (_this.colorDragging) {
                    _this.pickColor(event);
                }
                if (_this.hueDragging) {
                    _this.pickHue(event);
                }
            });
        }
    };
    ColorPicker.prototype.unbindDocumentMousemoveListener = function () {
        if (this.documentMousemoveListener) {
            this.documentMousemoveListener();
            this.documentMousemoveListener = null;
        }
    };
    ColorPicker.prototype.bindDocumentMouseupListener = function () {
        var _this = this;
        if (!this.documentMouseupListener) {
            this.documentMouseupListener = this.renderer.listen('document', 'mouseup', function () {
                _this.colorDragging = false;
                _this.hueDragging = false;
                _this.unbindDocumentMousemoveListener();
                _this.unbindDocumentMouseupListener();
            });
        }
    };
    ColorPicker.prototype.unbindDocumentMouseupListener = function () {
        if (this.documentMouseupListener) {
            this.documentMouseupListener();
            this.documentMouseupListener = null;
        }
    };
    ColorPicker.prototype.validateHSB = function (hsb) {
        return {
            h: Math.min(360, Math.max(0, hsb.h)),
            s: Math.min(100, Math.max(0, hsb.s)),
            b: Math.min(100, Math.max(0, hsb.b))
        };
    };
    ColorPicker.prototype.validateRGB = function (rgb) {
        return {
            r: Math.min(255, Math.max(0, rgb.r)),
            g: Math.min(255, Math.max(0, rgb.g)),
            b: Math.min(255, Math.max(0, rgb.b))
        };
    };
    ColorPicker.prototype.validateHEX = function (hex) {
        var len = 6 - hex.length;
        if (len > 0) {
            var o = [];
            for (var i = 0; i < len; i++) {
                o.push('0');
            }
            o.push(hex);
            hex = o.join('');
        }
        return hex;
    };
    ColorPicker.prototype.HEXtoRGB = function (hex) {
        var hexValue = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
        return { r: hexValue >> 16, g: (hexValue & 0x00FF00) >> 8, b: (hexValue & 0x0000FF) };
    };
    ColorPicker.prototype.HEXtoHSB = function (hex) {
        return this.RGBtoHSB(this.HEXtoRGB(hex));
    };
    ColorPicker.prototype.RGBtoHSB = function (rgb) {
        var hsb = {
            h: 0,
            s: 0,
            b: 0
        };
        var min = Math.min(rgb.r, rgb.g, rgb.b);
        var max = Math.max(rgb.r, rgb.g, rgb.b);
        var delta = max - min;
        hsb.b = max;
        hsb.s = max != 0 ? 255 * delta / max : 0;
        if (hsb.s != 0) {
            if (rgb.r == max) {
                hsb.h = (rgb.g - rgb.b) / delta;
            }
            else if (rgb.g == max) {
                hsb.h = 2 + (rgb.b - rgb.r) / delta;
            }
            else {
                hsb.h = 4 + (rgb.r - rgb.g) / delta;
            }
        }
        else {
            hsb.h = -1;
        }
        hsb.h *= 60;
        if (hsb.h < 0) {
            hsb.h += 360;
        }
        hsb.s *= 100 / 255;
        hsb.b *= 100 / 255;
        return hsb;
    };
    ColorPicker.prototype.HSBtoRGB = function (hsb) {
        var rgb = {
            r: null, g: null, b: null
        };
        var h = hsb.h;
        var s = hsb.s * 255 / 100;
        var v = hsb.b * 255 / 100;
        if (s == 0) {
            rgb = {
                r: v,
                g: v,
                b: v
            };
        }
        else {
            var t1 = v;
            var t2 = (255 - s) * v / 255;
            var t3 = (t1 - t2) * (h % 60) / 60;
            if (h == 360)
                h = 0;
            if (h < 60) {
                rgb.r = t1;
                rgb.b = t2;
                rgb.g = t2 + t3;
            }
            else if (h < 120) {
                rgb.g = t1;
                rgb.b = t2;
                rgb.r = t1 - t3;
            }
            else if (h < 180) {
                rgb.g = t1;
                rgb.r = t2;
                rgb.b = t2 + t3;
            }
            else if (h < 240) {
                rgb.b = t1;
                rgb.r = t2;
                rgb.g = t1 - t3;
            }
            else if (h < 300) {
                rgb.b = t1;
                rgb.g = t2;
                rgb.r = t2 + t3;
            }
            else if (h < 360) {
                rgb.r = t1;
                rgb.g = t2;
                rgb.b = t1 - t3;
            }
            else {
                rgb.r = 0;
                rgb.g = 0;
                rgb.b = 0;
            }
        }
        return { r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b) };
    };
    ColorPicker.prototype.RGBtoHEX = function (rgb) {
        var hex = [
            rgb.r.toString(16),
            rgb.g.toString(16),
            rgb.b.toString(16)
        ];
        for (var key in hex) {
            if (hex[key].length == 1) {
                hex[key] = '0' + hex[key];
            }
        }
        return hex.join('');
    };
    ColorPicker.prototype.HSBtoHEX = function (hsb) {
        return this.RGBtoHEX(this.HSBtoRGB(hsb));
    };
    ColorPicker.prototype.onOverlayHide = function () {
        this.unbindDocumentClickListener();
        this.overlay = null;
    };
    ColorPicker.prototype.ngOnDestroy = function () {
        this.restoreOverlayAppend();
        this.onOverlayHide();
    };
    ColorPicker.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], ColorPicker.prototype, "style", void 0);
    __decorate([
        Input()
    ], ColorPicker.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], ColorPicker.prototype, "inline", void 0);
    __decorate([
        Input()
    ], ColorPicker.prototype, "format", void 0);
    __decorate([
        Input()
    ], ColorPicker.prototype, "appendTo", void 0);
    __decorate([
        Input()
    ], ColorPicker.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], ColorPicker.prototype, "tabindex", void 0);
    __decorate([
        Input()
    ], ColorPicker.prototype, "inputId", void 0);
    __decorate([
        Input()
    ], ColorPicker.prototype, "autoZIndex", void 0);
    __decorate([
        Input()
    ], ColorPicker.prototype, "baseZIndex", void 0);
    __decorate([
        Input()
    ], ColorPicker.prototype, "showTransitionOptions", void 0);
    __decorate([
        Input()
    ], ColorPicker.prototype, "hideTransitionOptions", void 0);
    __decorate([
        Output()
    ], ColorPicker.prototype, "onChange", void 0);
    __decorate([
        ViewChild('input')
    ], ColorPicker.prototype, "inputViewChild", void 0);
    __decorate([
        ViewChild('colorSelector')
    ], ColorPicker.prototype, "colorSelector", null);
    __decorate([
        ViewChild('colorHandle')
    ], ColorPicker.prototype, "colorHandle", null);
    __decorate([
        ViewChild('hue')
    ], ColorPicker.prototype, "hue", null);
    __decorate([
        ViewChild('hueHandle')
    ], ColorPicker.prototype, "hueHandle", null);
    ColorPicker = __decorate([
        Component({
            selector: 'p-colorPicker',
            template: "\n        <div [ngStyle]=\"style\" [class]=\"styleClass\" [ngClass]=\"{'ui-colorpicker ui-widget':true,'ui-colorpicker-overlay':!inline,'ui-colorpicker-dragging':colorDragging||hueDragging}\">\n            <input #input type=\"text\" *ngIf=\"!inline\" class=\"ui-colorpicker-preview ui-inputtext ui-state-default ui-corner-all\" readonly=\"readonly\" [ngClass]=\"{'ui-state-disabled': disabled}\"\n                (focus)=\"onInputFocus()\" (click)=\"onInputClick()\" (keydown)=\"onInputKeydown($event)\" [attr.id]=\"inputId\" [attr.tabindex]=\"tabindex\" [disabled]=\"disabled\"\n                [style.backgroundColor]=\"inputBgColor\">\n            <div *ngIf=\"inline || overlayVisible\" [ngClass]=\"{'ui-colorpicker-panel ui-corner-all': true, 'ui-colorpicker-overlay-panel ui-shadow':!inline, 'ui-state-disabled': disabled}\" (click)=\"onPanelClick()\"\n                [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" [@.disabled]=\"inline === true\" (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\">\n                <div class=\"ui-colorpicker-content\">\n                    <div #colorSelector class=\"ui-colorpicker-color-selector\" (mousedown)=\"onColorMousedown($event)\">\n                        <div class=\"ui-colorpicker-color\">\n                            <div #colorHandle class=\"ui-colorpicker-color-handle\"></div>\n                        </div>\n                    </div>\n                    <div #hue class=\"ui-colorpicker-hue\" (mousedown)=\"onHueMousedown($event)\">\n                        <div #hueHandle class=\"ui-colorpicker-hue-handle\"></div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ",
            animations: [
                trigger('overlayAnimation', [
                    state('void', style({
                        transform: 'translateY(5%)',
                        opacity: 0
                    })),
                    state('visible', style({
                        transform: 'translateY(0)',
                        opacity: 1
                    })),
                    transition('void => visible', animate('{{showTransitionParams}}')),
                    transition('visible => void', animate('{{hideTransitionParams}}'))
                ])
            ],
            providers: [COLORPICKER_VALUE_ACCESSOR],
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], ColorPicker);
    return ColorPicker;
}());
export { ColorPicker };
var ColorPickerModule = /** @class */ (function () {
    function ColorPickerModule() {
    }
    ColorPickerModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [ColorPicker],
            declarations: [ColorPicker]
        })
    ], ColorPickerModule);
    return ColorPickerModule;
}());
export { ColorPickerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3JwaWNrZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2NvbG9ycGlja2VyLyIsInNvdXJjZXMiOlsiY29sb3JwaWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0TCxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBa0IsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUUsaUJBQWlCLEVBQXdCLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsTUFBTSxDQUFDLElBQU0sMEJBQTBCLEdBQVE7SUFDM0MsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxXQUFXLEVBQVgsQ0FBVyxDQUFDO0lBQzFDLEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQXlDRjtJQW9FSSxxQkFBbUIsRUFBYyxFQUFTLFFBQW1CLEVBQVMsRUFBcUI7UUFBeEUsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBUyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQTVEbEYsV0FBTSxHQUFXLEtBQUssQ0FBQztRQVV2QixlQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFFdkIsMEJBQXFCLEdBQVcsZ0JBQWdCLENBQUM7UUFFakQsMEJBQXFCLEdBQVcsZUFBZSxDQUFDO1FBRS9DLGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVkzRCxpQkFBWSxHQUFXLFFBQVEsQ0FBQztRQUVoQyxrQkFBYSxHQUFhLGNBQU8sQ0FBQyxDQUFDO1FBRW5DLG1CQUFjLEdBQWEsY0FBTyxDQUFDLENBQUM7SUEwQjBELENBQUM7SUFFbkUsc0JBQUksc0NBQWE7YUFBakIsVUFBa0IsT0FBbUI7WUFDN0QsSUFBSSxDQUFDLHNCQUFzQixHQUFHLE9BQU8sQ0FBQztRQUMxQyxDQUFDOzs7T0FBQTtJQUV5QixzQkFBSSxvQ0FBVzthQUFmLFVBQWdCLE9BQW1CO1lBQ3pELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxPQUFPLENBQUM7UUFDeEMsQ0FBQzs7O09BQUE7SUFFaUIsc0JBQUksNEJBQUc7YUFBUCxVQUFRLE9BQW1CO1lBQ3pDLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO1FBQ2hDLENBQUM7OztPQUFBO0lBRXVCLHNCQUFJLGtDQUFTO2FBQWIsVUFBYyxPQUFtQjtZQUNyRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsT0FBTyxDQUFDO1FBQ3RDLENBQUM7OztPQUFBO0lBRUQsb0NBQWMsR0FBZCxVQUFlLEtBQWlCO1FBQzVCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyw2QkFBNkIsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1FBRW5DLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELDZCQUFPLEdBQVAsVUFBUSxLQUFpQjtRQUNyQixJQUFJLEdBQUcsR0FBVyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksUUFBUSxDQUFDLGVBQWUsQ0FBQyxTQUFTLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDM0ssSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQzFCLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ2xGLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDZixDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBQyxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVELHNDQUFnQixHQUFoQixVQUFpQixLQUFpQjtRQUM5QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztRQUVuQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCwrQkFBUyxHQUFULFVBQVUsS0FBaUI7UUFDdkIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzdFLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxJQUFJLFFBQVEsQ0FBQyxlQUFlLENBQUMsU0FBUyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2hILElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDaEQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDNUYsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2pHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUMxQixDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2YsQ0FBQyxFQUFFLFVBQVU7WUFDYixDQUFDLEVBQUUsVUFBVTtTQUNoQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUMsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFRCxzQ0FBZ0IsR0FBaEI7UUFDSSxJQUFJLEdBQVEsQ0FBQztRQUNiLFFBQU8sSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixLQUFLLEtBQUs7Z0JBQ04sR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDMUMsTUFBTTtZQUVOLEtBQUssS0FBSztnQkFDTixHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3BDLE1BQU07WUFFTixLQUFLLEtBQUs7Z0JBQ04sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ3JCLE1BQU07U0FDVDtRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVELGlDQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELGdDQUFVLEdBQVYsVUFBVyxLQUFVO1FBQ2pCLElBQUksS0FBSyxFQUFFO1lBQ1AsUUFBTyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNoQixLQUFLLEtBQUs7b0JBQ04sSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN0QyxNQUFNO2dCQUVOLEtBQUssS0FBSztvQkFDTixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3RDLE1BQU07Z0JBRU4sS0FBSyxLQUFLO29CQUNOLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUN2QixNQUFNO2FBQ1Q7U0FDSjthQUNJO1lBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNqRDtRQUVELElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQseUNBQW1CLEdBQW5CO1FBQ0ksSUFBSSxJQUFJLENBQUMsc0JBQXNCLEVBQUU7WUFDN0IsSUFBTSxHQUFHLEdBQVEsRUFBRSxDQUFDO1lBQ3BCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ1osR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDWixHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRXJCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM5RjtJQUNMLENBQUM7SUFFRCw4QkFBUSxHQUFSO1FBQ0ksSUFBSSxJQUFJLENBQUMsb0JBQW9CLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsRUFBRTtZQUNwRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ2xHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUN6RyxJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7U0FFekc7UUFFRCxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsa0NBQVksR0FBWjtRQUNJLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsMEJBQUksR0FBSjtRQUNJLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0lBQy9CLENBQUM7SUFFRCw2Q0FBdUIsR0FBdkIsVUFBd0IsS0FBcUI7UUFDekMsUUFBTyxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ2xCLEtBQUssU0FBUztnQkFDVixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDZCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7b0JBQzdCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO3dCQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3FCQUMvRTtvQkFDRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ3BCLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO29CQUVqQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztvQkFDM0IsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2lCQUNuQjtnQkFDTCxNQUFNO1lBRU4sS0FBSyxNQUFNO2dCQUNQLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDekIsTUFBTTtTQUNUO0lBQ0wsQ0FBQztJQUVELG1DQUFhLEdBQWI7UUFDSSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssTUFBTTtnQkFDeEIsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztnQkFFeEMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMzRDtJQUNMLENBQUM7SUFFRCwwQ0FBb0IsR0FBcEI7UUFDSSxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUMvQixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ25EO0lBQ0wsQ0FBQztJQUVELGtDQUFZLEdBQVo7UUFDSSxJQUFJLElBQUksQ0FBQyxRQUFRO1lBQ2IsVUFBVSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7WUFFN0UsVUFBVSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBRUQsMEJBQUksR0FBSjtRQUNJLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxrQ0FBWSxHQUFaO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxpQ0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjO1lBQ3BCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7WUFFWixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELG9DQUFjLEdBQWQsVUFBZSxLQUFvQjtRQUMvQixRQUFPLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDaEIsT0FBTztZQUNQLEtBQUssRUFBRTtnQkFDSCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ25CLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDM0IsTUFBTTtZQUVOLGdCQUFnQjtZQUNoQixLQUFLLEVBQUUsQ0FBQztZQUNSLEtBQUssQ0FBQztnQkFDRixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2hCLE1BQU07U0FDVDtJQUNMLENBQUM7SUFFRCxrQ0FBWSxHQUFaO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUVELHNDQUFnQixHQUFoQixVQUFpQixFQUFZO1FBQ3pCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCx1Q0FBaUIsR0FBakIsVUFBa0IsRUFBWTtRQUMxQixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsc0NBQWdCLEdBQWhCLFVBQWlCLEdBQVk7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7SUFDeEIsQ0FBQztJQUVELCtDQUF5QixHQUF6QjtRQUFBLGlCQVlDO1FBWEcsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUM3QixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRTtnQkFDbkUsSUFBSSxDQUFDLEtBQUksQ0FBQyxTQUFTLEVBQUU7b0JBQ2pCLEtBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO29CQUM1QixLQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztpQkFDdEM7Z0JBRUQsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQ3ZCLEtBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFFRCxpREFBMkIsR0FBM0I7UUFDSSxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUM1QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUM3QixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO1NBQ3JDO0lBQ0wsQ0FBQztJQUVELG1EQUE2QixHQUE3QjtRQUFBLGlCQVlDO1FBWEcsSUFBSSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsRUFBRTtZQUNqQyxJQUFJLENBQUMseUJBQXlCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxVQUFDLEtBQWlCO2dCQUM3RixJQUFJLEtBQUksQ0FBQyxhQUFhLEVBQUU7b0JBQ3BCLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3pCO2dCQUVELElBQUksS0FBSSxDQUFDLFdBQVcsRUFBRTtvQkFDbEIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDdkI7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVELHFEQUErQixHQUEvQjtRQUNJLElBQUksSUFBSSxDQUFDLHlCQUF5QixFQUFFO1lBQ2hDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1lBQ2pDLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLENBQUM7U0FDekM7SUFDTCxDQUFDO0lBRUQsaURBQTJCLEdBQTNCO1FBQUEsaUJBU0M7UUFSRyxJQUFJLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFO1lBQy9CLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFO2dCQUN2RSxLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztnQkFDM0IsS0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7Z0JBQ3pCLEtBQUksQ0FBQywrQkFBK0IsRUFBRSxDQUFDO2dCQUN2QyxLQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztZQUN6QyxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVELG1EQUE2QixHQUE3QjtRQUNJLElBQUksSUFBSSxDQUFDLHVCQUF1QixFQUFFO1lBQzlCLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1lBQy9CLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUM7U0FDdkM7SUFDTCxDQUFDO0lBRUQsaUNBQVcsR0FBWCxVQUFZLEdBQUc7UUFDWCxPQUFPO1lBQ0gsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdkMsQ0FBQztJQUNOLENBQUM7SUFFRCxpQ0FBVyxHQUFYLFVBQVksR0FBRztRQUNYLE9BQU87WUFDSCxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN2QyxDQUFDO0lBQ04sQ0FBQztJQUVELGlDQUFXLEdBQVgsVUFBWSxHQUFHO1FBQ1gsSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDekIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFO1lBQ1QsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ1gsS0FBSyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDdEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNmO1lBQ0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNaLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3BCO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQsOEJBQVEsR0FBUixVQUFTLEdBQUc7UUFDUixJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDaEYsT0FBTyxFQUFDLENBQUMsRUFBRSxRQUFRLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxFQUFDLENBQUM7SUFDeEYsQ0FBQztJQUVELDhCQUFRLEdBQVIsVUFBUyxHQUFHO1FBQ1IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsOEJBQVEsR0FBUixVQUFTLEdBQUc7UUFDUixJQUFJLEdBQUcsR0FBRztZQUNOLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7WUFDSixDQUFDLEVBQUUsQ0FBQztTQUNQLENBQUM7UUFDRixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLElBQUksS0FBSyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDdEIsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDWixHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNaLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUU7Z0JBQ2QsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQzthQUNuQztpQkFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFO2dCQUNyQixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQzthQUN2QztpQkFBTTtnQkFDSCxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQzthQUN2QztTQUNKO2FBQU07WUFDSCxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ2Q7UUFDRCxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDWCxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQztTQUNoQjtRQUNELEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFDLEdBQUcsQ0FBQztRQUNqQixHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBQyxHQUFHLENBQUM7UUFDakIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQsOEJBQVEsR0FBUixVQUFTLEdBQUc7UUFDUixJQUFJLEdBQUcsR0FBRztZQUNOLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSTtTQUM1QixDQUFDO1FBQ0YsSUFBSSxDQUFDLEdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsR0FBVyxHQUFHLENBQUMsQ0FBQyxHQUFDLEdBQUcsR0FBQyxHQUFHLENBQUM7UUFDOUIsSUFBSSxDQUFDLEdBQVcsR0FBRyxDQUFDLENBQUMsR0FBQyxHQUFHLEdBQUMsR0FBRyxDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNSLEdBQUcsR0FBRztnQkFDRixDQUFDLEVBQUUsQ0FBQztnQkFDSixDQUFDLEVBQUUsQ0FBQztnQkFDSixDQUFDLEVBQUUsQ0FBQzthQUNQLENBQUE7U0FDSjthQUNJO1lBQ0QsSUFBSSxFQUFFLEdBQVcsQ0FBQyxDQUFDO1lBQ25CLElBQUksRUFBRSxHQUFXLENBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxHQUFHLENBQUM7WUFDL0IsSUFBSSxFQUFFLEdBQVcsQ0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLEdBQUMsRUFBRSxDQUFDO1lBQ25DLElBQUksQ0FBQyxJQUFFLEdBQUc7Z0JBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsR0FBQyxFQUFFLEVBQUU7Z0JBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUM7Z0JBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUM7Z0JBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFBO2FBQUM7aUJBQ3RDLElBQUksQ0FBQyxHQUFDLEdBQUcsRUFBRTtnQkFBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQztnQkFBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQztnQkFBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsR0FBQyxFQUFFLENBQUE7YUFBQztpQkFDNUMsSUFBSSxDQUFDLEdBQUMsR0FBRyxFQUFFO2dCQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDO2dCQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDO2dCQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQTthQUFDO2lCQUM1QyxJQUFJLENBQUMsR0FBQyxHQUFHLEVBQUU7Z0JBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUM7Z0JBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUM7Z0JBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFBO2FBQUM7aUJBQzVDLElBQUksQ0FBQyxHQUFDLEdBQUcsRUFBRTtnQkFBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQztnQkFBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQztnQkFBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsR0FBQyxFQUFFLENBQUE7YUFBQztpQkFDNUMsSUFBSSxDQUFDLEdBQUMsR0FBRyxFQUFFO2dCQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDO2dCQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDO2dCQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQTthQUFDO2lCQUM1QztnQkFBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztnQkFBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztnQkFBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQTthQUFDO1NBQ25DO1FBQ0QsT0FBTyxFQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVELDhCQUFRLEdBQVIsVUFBUyxHQUFHO1FBQ1IsSUFBSSxHQUFHLEdBQUc7WUFDTixHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7WUFDbEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO1lBQ2xCLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztTQUNyQixDQUFDO1FBRUYsS0FBSSxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUU7WUFDaEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtnQkFDdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDN0I7U0FDSjtRQUVELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRUQsOEJBQVEsR0FBUixVQUFTLEdBQUc7UUFDUixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxtQ0FBYSxHQUFiO1FBQ0ksSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDeEIsQ0FBQztJQUVELGlDQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQzs7Z0JBOWFzQixVQUFVO2dCQUFtQixTQUFTO2dCQUFhLGlCQUFpQjs7SUFsRWxGO1FBQVIsS0FBSyxFQUFFOzhDQUFZO0lBRVg7UUFBUixLQUFLLEVBQUU7bURBQW9CO0lBRW5CO1FBQVIsS0FBSyxFQUFFOytDQUFpQjtJQUVoQjtRQUFSLEtBQUssRUFBRTsrQ0FBd0I7SUFFdkI7UUFBUixLQUFLLEVBQUU7aURBQWtCO0lBRWpCO1FBQVIsS0FBSyxFQUFFO2lEQUFtQjtJQUVsQjtRQUFSLEtBQUssRUFBRTtpREFBa0I7SUFFakI7UUFBUixLQUFLLEVBQUU7Z0RBQWlCO0lBRWhCO1FBQVIsS0FBSyxFQUFFO21EQUE0QjtJQUUzQjtRQUFSLEtBQUssRUFBRTttREFBd0I7SUFFdkI7UUFBUixLQUFLLEVBQUU7OERBQWtEO0lBRWpEO1FBQVIsS0FBSyxFQUFFOzhEQUFpRDtJQUUvQztRQUFULE1BQU0sRUFBRTtpREFBa0Q7SUFFdkM7UUFBbkIsU0FBUyxDQUFDLE9BQU8sQ0FBQzt1REFBNEI7SUEwQ25CO1FBQTNCLFNBQVMsQ0FBQyxlQUFlLENBQUM7b0RBRTFCO0lBRXlCO1FBQXpCLFNBQVMsQ0FBQyxhQUFhLENBQUM7a0RBRXhCO0lBRWlCO1FBQWpCLFNBQVMsQ0FBQyxLQUFLLENBQUM7MENBRWhCO0lBRXVCO1FBQXZCLFNBQVMsQ0FBQyxXQUFXLENBQUM7Z0RBRXRCO0lBcEZRLFdBQVc7UUF2Q3ZCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFFBQVEsRUFBRSwydkRBbUJUO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRTtvQkFDeEIsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7d0JBQ2hCLFNBQVMsRUFBRSxnQkFBZ0I7d0JBQzNCLE9BQU8sRUFBRSxDQUFDO3FCQUNiLENBQUMsQ0FBQztvQkFDSCxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQzt3QkFDbkIsU0FBUyxFQUFFLGVBQWU7d0JBQzFCLE9BQU8sRUFBRSxDQUFDO3FCQUNiLENBQUMsQ0FBQztvQkFDSCxVQUFVLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7b0JBQ2xFLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztpQkFDckUsQ0FBQzthQUNMO1lBQ0QsU0FBUyxFQUFFLENBQUMsMEJBQTBCLENBQUM7WUFDdkMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87U0FDbkQsQ0FBQztPQUNXLFdBQVcsQ0FtZnZCO0lBQUQsa0JBQUM7Q0FBQSxBQW5mRCxJQW1mQztTQW5mWSxXQUFXO0FBMGZ4QjtJQUFBO0lBQWlDLENBQUM7SUFBckIsaUJBQWlCO1FBTDdCLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztZQUN2QixPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUM7WUFDdEIsWUFBWSxFQUFFLENBQUMsV0FBVyxDQUFDO1NBQzlCLENBQUM7T0FDVyxpQkFBaUIsQ0FBSTtJQUFELHdCQUFDO0NBQUEsQUFBbEMsSUFBa0M7U0FBckIsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIE91dHB1dCwgT25EZXN0cm95LCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIFJlbmRlcmVyMiwgVmlld0NoaWxkLCBDaGFuZ2VEZXRlY3RvclJlZiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgdHJpZ2dlciwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCBhbmltYXRlLCBBbmltYXRpb25FdmVudCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xyXG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5leHBvcnQgY29uc3QgQ09MT1JQSUNLRVJfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcclxuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ29sb3JQaWNrZXIpLFxyXG4gICAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLWNvbG9yUGlja2VyJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nQ2xhc3NdPVwieyd1aS1jb2xvcnBpY2tlciB1aS13aWRnZXQnOnRydWUsJ3VpLWNvbG9ycGlja2VyLW92ZXJsYXknOiFpbmxpbmUsJ3VpLWNvbG9ycGlja2VyLWRyYWdnaW5nJzpjb2xvckRyYWdnaW5nfHxodWVEcmFnZ2luZ31cIj5cclxuICAgICAgICAgICAgPGlucHV0ICNpbnB1dCB0eXBlPVwidGV4dFwiICpuZ0lmPVwiIWlubGluZVwiIGNsYXNzPVwidWktY29sb3JwaWNrZXItcHJldmlldyB1aS1pbnB1dHRleHQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsXCIgcmVhZG9ubHk9XCJyZWFkb25seVwiIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtZGlzYWJsZWQnOiBkaXNhYmxlZH1cIlxyXG4gICAgICAgICAgICAgICAgKGZvY3VzKT1cIm9uSW5wdXRGb2N1cygpXCIgKGNsaWNrKT1cIm9uSW5wdXRDbGljaygpXCIgKGtleWRvd24pPVwib25JbnB1dEtleWRvd24oJGV2ZW50KVwiIFthdHRyLmlkXT1cImlucHV0SWRcIiBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXHJcbiAgICAgICAgICAgICAgICBbc3R5bGUuYmFja2dyb3VuZENvbG9yXT1cImlucHV0QmdDb2xvclwiPlxyXG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiaW5saW5lIHx8IG92ZXJsYXlWaXNpYmxlXCIgW25nQ2xhc3NdPVwieyd1aS1jb2xvcnBpY2tlci1wYW5lbCB1aS1jb3JuZXItYWxsJzogdHJ1ZSwgJ3VpLWNvbG9ycGlja2VyLW92ZXJsYXktcGFuZWwgdWktc2hhZG93JzohaW5saW5lLCAndWktc3RhdGUtZGlzYWJsZWQnOiBkaXNhYmxlZH1cIiAoY2xpY2spPVwib25QYW5lbENsaWNrKClcIlxyXG4gICAgICAgICAgICAgICAgW0BvdmVybGF5QW5pbWF0aW9uXT1cInt2YWx1ZTogJ3Zpc2libGUnLCBwYXJhbXM6IHtzaG93VHJhbnNpdGlvblBhcmFtczogc2hvd1RyYW5zaXRpb25PcHRpb25zLCBoaWRlVHJhbnNpdGlvblBhcmFtczogaGlkZVRyYW5zaXRpb25PcHRpb25zfX1cIiBbQC5kaXNhYmxlZF09XCJpbmxpbmUgPT09IHRydWVcIiAoQG92ZXJsYXlBbmltYXRpb24uc3RhcnQpPVwib25PdmVybGF5QW5pbWF0aW9uU3RhcnQoJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWNvbG9ycGlja2VyLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICNjb2xvclNlbGVjdG9yIGNsYXNzPVwidWktY29sb3JwaWNrZXItY29sb3Itc2VsZWN0b3JcIiAobW91c2Vkb3duKT1cIm9uQ29sb3JNb3VzZWRvd24oJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktY29sb3JwaWNrZXItY29sb3JcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgI2NvbG9ySGFuZGxlIGNsYXNzPVwidWktY29sb3JwaWNrZXItY29sb3ItaGFuZGxlXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgI2h1ZSBjbGFzcz1cInVpLWNvbG9ycGlja2VyLWh1ZVwiIChtb3VzZWRvd24pPVwib25IdWVNb3VzZWRvd24oJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2ICNodWVIYW5kbGUgY2xhc3M9XCJ1aS1jb2xvcnBpY2tlci1odWUtaGFuZGxlXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICAgIHRyaWdnZXIoJ292ZXJsYXlBbmltYXRpb24nLCBbXHJcbiAgICAgICAgICAgIHN0YXRlKCd2b2lkJywgc3R5bGUoe1xyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSg1JSknLFxyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMFxyXG4gICAgICAgICAgICB9KSksXHJcbiAgICAgICAgICAgIHN0YXRlKCd2aXNpYmxlJywgc3R5bGUoe1xyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKScsXHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgICAgICAgIH0pKSxcclxuICAgICAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiB2aXNpYmxlJywgYW5pbWF0ZSgne3tzaG93VHJhbnNpdGlvblBhcmFtc319JykpLFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlID0+IHZvaWQnLCBhbmltYXRlKCd7e2hpZGVUcmFuc2l0aW9uUGFyYW1zfX0nKSlcclxuICAgICAgICBdKVxyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczogW0NPTE9SUElDS0VSX1ZBTFVFX0FDQ0VTU09SXSxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29sb3JQaWNrZXIgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25EZXN0cm95IHtcclxuXHJcbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcclxuICAgIFxyXG4gICAgQElucHV0KCkgaW5saW5lOiBib29sZWFuO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBmb3JtYXQ6IHN0cmluZyA9ICdoZXgnO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBhcHBlbmRUbzogc3RyaW5nO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcclxuICAgIFxyXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IHN0cmluZztcclxuICAgIFxyXG4gICAgQElucHV0KCkgaW5wdXRJZDogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGF1dG9aSW5kZXg6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBiYXNlWkluZGV4OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIEBJbnB1dCgpIHNob3dUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJzIyNW1zIGVhc2Utb3V0JztcclxuXHJcbiAgICBASW5wdXQoKSBoaWRlVHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICcxOTVtcyBlYXNlLWluJztcclxuICAgIFxyXG4gICAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIFxyXG4gICAgQFZpZXdDaGlsZCgnaW5wdXQnKSBpbnB1dFZpZXdDaGlsZDogRWxlbWVudFJlZjtcclxuICAgIFxyXG4gICAgdmFsdWU6IGFueTtcclxuICAgIFxyXG4gICAgaW5wdXRCZ0NvbG9yOiBzdHJpbmc7XHJcbiAgICBcclxuICAgIHNob3duOiBib29sZWFuO1xyXG4gICAgXHJcbiAgICBvdmVybGF5VmlzaWJsZTogYm9vbGVhbjtcclxuICAgIFxyXG4gICAgZGVmYXVsdENvbG9yOiBzdHJpbmcgPSAnZmYwMDAwJztcclxuICAgIFxyXG4gICAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcclxuICAgIFxyXG4gICAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XHJcbiAgICBcclxuICAgIGRvY3VtZW50Q2xpY2tMaXN0ZW5lcjogRnVuY3Rpb247XHJcbiAgICBcclxuICAgIGRvY3VtZW50TW91c2Vtb3ZlTGlzdGVuZXI6IEZ1bmN0aW9uO1xyXG4gICAgXHJcbiAgICBkb2N1bWVudE1vdXNldXBMaXN0ZW5lcjogRnVuY3Rpb247XHJcbiAgICBcclxuICAgIGRvY3VtZW50SHVlTW92ZUxpc3RlbmVyOiBGdW5jdGlvbjtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgc2VsZkNsaWNrOiBib29sZWFuO1xyXG4gICAgXHJcbiAgICBjb2xvckRyYWdnaW5nOiBib29sZWFuO1xyXG4gICAgXHJcbiAgICBodWVEcmFnZ2luZzogYm9vbGVhbjtcclxuXHJcbiAgICBvdmVybGF5OiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgICBjb2xvclNlbGVjdG9yVmlld0NoaWxkOiBFbGVtZW50UmVmO1xyXG4gICAgXHJcbiAgICBjb2xvckhhbmRsZVZpZXdDaGlsZDogRWxlbWVudFJlZjtcclxuICAgIFxyXG4gICAgaHVlVmlld0NoaWxkOiBFbGVtZW50UmVmO1xyXG4gICAgXHJcbiAgICBodWVIYW5kbGVWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XHJcbiAgICAgICAgXHJcbiAgICBAVmlld0NoaWxkKCdjb2xvclNlbGVjdG9yJykgc2V0IGNvbG9yU2VsZWN0b3IoZWxlbWVudDogRWxlbWVudFJlZikge1xyXG4gICAgICAgIHRoaXMuY29sb3JTZWxlY3RvclZpZXdDaGlsZCA9IGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnY29sb3JIYW5kbGUnKSBzZXQgY29sb3JIYW5kbGUoZWxlbWVudDogRWxlbWVudFJlZikge1xyXG4gICAgICAgIHRoaXMuY29sb3JIYW5kbGVWaWV3Q2hpbGQgPSBlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ2h1ZScpIHNldCBodWUoZWxlbWVudDogRWxlbWVudFJlZikge1xyXG4gICAgICAgIHRoaXMuaHVlVmlld0NoaWxkID0gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBAVmlld0NoaWxkKCdodWVIYW5kbGUnKSBzZXQgaHVlSGFuZGxlKGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcclxuICAgICAgICB0aGlzLmh1ZUhhbmRsZVZpZXdDaGlsZCA9IGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgb25IdWVNb3VzZWRvd24oZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuYmluZERvY3VtZW50TW91c2Vtb3ZlTGlzdGVuZXIoKTtcclxuICAgICAgICB0aGlzLmJpbmREb2N1bWVudE1vdXNldXBMaXN0ZW5lcigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuaHVlRHJhZ2dpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucGlja0h1ZShldmVudCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHBpY2tIdWUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICBsZXQgdG9wOiBudW1iZXIgPSB0aGlzLmh1ZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCAwKTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWxpZGF0ZUhTQih7XHJcbiAgICAgICAgICAgIGg6IE1hdGguZmxvb3IoMzYwICogKDE1MCAtIE1hdGgubWF4KDAsIE1hdGgubWluKDE1MCwgKGV2ZW50LnBhZ2VZIC0gdG9wKSkpKSAvIDE1MCksXHJcbiAgICAgICAgICAgIHM6IHRoaXMudmFsdWUucyxcclxuICAgICAgICAgICAgYjogdGhpcy52YWx1ZS5iXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy51cGRhdGVDb2xvclNlbGVjdG9yKCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVVSSgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTW9kZWwoKTtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCB2YWx1ZTogdGhpcy5nZXRWYWx1ZVRvVXBkYXRlKCl9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgb25Db2xvck1vdXNlZG93bihldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRNb3VzZW1vdmVMaXN0ZW5lcigpO1xyXG4gICAgICAgIHRoaXMuYmluZERvY3VtZW50TW91c2V1cExpc3RlbmVyKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jb2xvckRyYWdnaW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnBpY2tDb2xvcihldmVudCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHBpY2tDb2xvcihldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgICAgIGxldCByZWN0ID0gdGhpcy5jb2xvclNlbGVjdG9yVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgbGV0IHRvcCA9IHJlY3QudG9wICsgKHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IDApO1xyXG4gICAgICAgIGxldCBsZWZ0ID0gcmVjdC5sZWZ0ICsgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0O1xyXG4gICAgICAgIGxldCBzYXR1cmF0aW9uID0gTWF0aC5mbG9vcigxMDAgKiAoTWF0aC5tYXgoMCwgTWF0aC5taW4oMTUwLCAoZXZlbnQucGFnZVggLSBsZWZ0KSkpKSAvIDE1MCk7XHJcbiAgICAgICAgbGV0IGJyaWdodG5lc3MgPSBNYXRoLmZsb29yKDEwMCAqICgxNTAgLSBNYXRoLm1heCgwLCBNYXRoLm1pbigxNTAsIChldmVudC5wYWdlWSAtIHRvcCkpKSkgLyAxNTApO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnZhbGlkYXRlSFNCKHtcclxuICAgICAgICAgICAgaDogdGhpcy52YWx1ZS5oLFxyXG4gICAgICAgICAgICBzOiBzYXR1cmF0aW9uLFxyXG4gICAgICAgICAgICBiOiBicmlnaHRuZXNzXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy51cGRhdGVVSSgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTW9kZWwoKTtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCB2YWx1ZTogdGhpcy5nZXRWYWx1ZVRvVXBkYXRlKCl9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0VmFsdWVUb1VwZGF0ZSgpIHtcclxuICAgICAgICBsZXQgdmFsOiBhbnk7XHJcbiAgICAgICAgc3dpdGNoKHRoaXMuZm9ybWF0KSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2hleCc6XHJcbiAgICAgICAgICAgICAgICB2YWwgPSAnIycgKyB0aGlzLkhTQnRvSEVYKHRoaXMudmFsdWUpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNhc2UgJ3JnYic6XHJcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLkhTQnRvUkdCKHRoaXMudmFsdWUpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNhc2UgJ2hzYic6XHJcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdXBkYXRlTW9kZWwoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMuZ2V0VmFsdWVUb1VwZGF0ZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgc3dpdGNoKHRoaXMuZm9ybWF0KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdoZXgnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLkhFWHRvSFNCKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjYXNlICdyZ2InOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLlJHQnRvSFNCKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjYXNlICdoc2InOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5IRVh0b0hTQih0aGlzLmRlZmF1bHRDb2xvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudXBkYXRlQ29sb3JTZWxlY3RvcigpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVUkoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdXBkYXRlQ29sb3JTZWxlY3RvcigpIHtcclxuICAgICAgICBpZiAodGhpcy5jb2xvclNlbGVjdG9yVmlld0NoaWxkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhzYjogYW55ID0ge307XHJcbiAgICAgICAgICAgIGhzYi5zID0gMTAwO1xyXG4gICAgICAgICAgICBoc2IuYiA9IDEwMDtcclxuICAgICAgICAgICAgaHNiLmggPSB0aGlzLnZhbHVlLmg7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbG9yU2VsZWN0b3JWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIycgKyB0aGlzLkhTQnRvSEVYKGhzYik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgICAgIFxyXG4gICAgdXBkYXRlVUkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29sb3JIYW5kbGVWaWV3Q2hpbGQgJiYgdGhpcy5odWVIYW5kbGVWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbG9ySGFuZGxlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9ICBNYXRoLmZsb29yKDE1MCAqIHRoaXMudmFsdWUucyAvIDEwMCkgKyAncHgnO1xyXG4gICAgICAgICAgICB0aGlzLmNvbG9ySGFuZGxlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gIE1hdGguZmxvb3IoMTUwICogKDEwMCAtIHRoaXMudmFsdWUuYikgLyAxMDApICsgJ3B4JztcclxuICAgICAgICAgICAgdGhpcy5odWVIYW5kbGVWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS50b3AgPSBNYXRoLmZsb29yKDE1MCAtICgxNTAgKiB0aGlzLnZhbHVlLmggLyAzNjApKSArICdweCc7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pbnB1dEJnQ29sb3IgPSAnIycgKyB0aGlzLkhTQnRvSEVYKHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvbklucHV0Rm9jdXMoKSB7XHJcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzaG93KCkge1xyXG4gICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uT3ZlcmxheUFuaW1hdGlvblN0YXJ0KGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xyXG4gICAgICAgIHN3aXRjaChldmVudC50b1N0YXRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Zpc2libGUnOlxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlubGluZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheSA9IGV2ZW50LmVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRPdmVybGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYXV0b1pJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUuekluZGV4ID0gU3RyaW5nKHRoaXMuYmFzZVpJbmRleCArICgrK0RvbUhhbmRsZXIuemluZGV4KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25PdmVybGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ29sb3JTZWxlY3RvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVUkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlICd2b2lkJzpcclxuICAgICAgICAgICAgICAgIHRoaXMub25PdmVybGF5SGlkZSgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXBwZW5kT3ZlcmxheSgpIHtcclxuICAgICAgICBpZiAodGhpcy5hcHBlbmRUbykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hcHBlbmRUbyA9PT0gJ2JvZHknKVxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm92ZXJsYXkpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheSwgdGhpcy5hcHBlbmRUbyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlc3RvcmVPdmVybGF5QXBwZW5kKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXkgJiYgdGhpcy5hcHBlbmRUbykge1xyXG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5vdmVybGF5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGFsaWduT3ZlcmxheSgpIHtcclxuICAgICAgICBpZiAodGhpcy5hcHBlbmRUbylcclxuICAgICAgICAgICAgRG9tSGFuZGxlci5hYnNvbHV0ZVBvc2l0aW9uKHRoaXMub3ZlcmxheSwgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIERvbUhhbmRsZXIucmVsYXRpdmVQb3NpdGlvbih0aGlzLm92ZXJsYXksIHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGhpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgICAgICBcclxuICAgIG9uSW5wdXRDbGljaygpIHtcclxuICAgICAgICB0aGlzLnNlbGZDbGljayA9IHRydWU7XHJcbiAgICAgICAgdGhpcy50b2dnbGVQYW5lbCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB0b2dnbGVQYW5lbCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVZpc2libGUpXHJcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG9uSW5wdXRLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICAgICAgc3dpdGNoKGV2ZW50LndoaWNoKSB7XHJcbiAgICAgICAgICAgIC8vc3BhY2VcclxuICAgICAgICAgICAgY2FzZSAzMjpcclxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlUGFuZWwoKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9lc2NhcGUgYW5kIHRhYlxyXG4gICAgICAgICAgICBjYXNlIDI3OlxyXG4gICAgICAgICAgICBjYXNlIDk6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgICAgIFxyXG4gICAgb25QYW5lbENsaWNrKCkge1xyXG4gICAgICAgIHRoaXMuc2VsZkNsaWNrID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNldERpc2FibGVkU3RhdGUodmFsOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHZhbDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNlbGZDbGljaykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGZDbGljayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgdW5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBiaW5kRG9jdW1lbnRNb3VzZW1vdmVMaXN0ZW5lcigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnRNb3VzZW1vdmVMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50TW91c2Vtb3ZlTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAnbW91c2Vtb3ZlJywgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb2xvckRyYWdnaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrQ29sb3IoZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5odWVEcmFnZ2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGlja0h1ZShldmVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgdW5iaW5kRG9jdW1lbnRNb3VzZW1vdmVMaXN0ZW5lcigpIHtcclxuICAgICAgICBpZiAodGhpcy5kb2N1bWVudE1vdXNlbW92ZUxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRNb3VzZW1vdmVMaXN0ZW5lcigpO1xyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50TW91c2Vtb3ZlTGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgYmluZERvY3VtZW50TW91c2V1cExpc3RlbmVyKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5kb2N1bWVudE1vdXNldXBMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50TW91c2V1cExpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ21vdXNldXAnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbG9yRHJhZ2dpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaHVlRHJhZ2dpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRNb3VzZW1vdmVMaXN0ZW5lcigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudE1vdXNldXBMaXN0ZW5lcigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVuYmluZERvY3VtZW50TW91c2V1cExpc3RlbmVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50TW91c2V1cExpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRNb3VzZXVwTGlzdGVuZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudE1vdXNldXBMaXN0ZW5lciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhbGlkYXRlSFNCKGhzYikge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGg6IE1hdGgubWluKDM2MCwgTWF0aC5tYXgoMCwgaHNiLmgpKSxcclxuICAgICAgICAgICAgczogTWF0aC5taW4oMTAwLCBNYXRoLm1heCgwLCBoc2IucykpLFxyXG4gICAgICAgICAgICBiOiBNYXRoLm1pbigxMDAsIE1hdGgubWF4KDAsIGhzYi5iKSlcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB2YWxpZGF0ZVJHQihyZ2IpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByOiBNYXRoLm1pbigyNTUsIE1hdGgubWF4KDAsIHJnYi5yKSksXHJcbiAgICAgICAgICAgIGc6IE1hdGgubWluKDI1NSwgTWF0aC5tYXgoMCwgcmdiLmcpKSxcclxuICAgICAgICAgICAgYjogTWF0aC5taW4oMjU1LCBNYXRoLm1heCgwLCByZ2IuYikpXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdmFsaWRhdGVIRVgoaGV4KSB7XHJcbiAgICAgICAgdmFyIGxlbiA9IDYgLSBoZXgubGVuZ3RoO1xyXG4gICAgICAgIGlmIChsZW4gPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciBvID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIGk9MDsgaTxsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgby5wdXNoKCcwJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgby5wdXNoKGhleCk7XHJcbiAgICAgICAgICAgIGhleCA9IG8uam9pbignJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBoZXg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEhFWHRvUkdCKGhleCkge1xyXG4gICAgICAgIGxldCBoZXhWYWx1ZSA9IHBhcnNlSW50KCgoaGV4LmluZGV4T2YoJyMnKSA+IC0xKSA/IGhleC5zdWJzdHJpbmcoMSkgOiBoZXgpLCAxNik7XHJcbiAgICAgICAgcmV0dXJuIHtyOiBoZXhWYWx1ZSA+PiAxNiwgZzogKGhleFZhbHVlICYgMHgwMEZGMDApID4+IDgsIGI6IChoZXhWYWx1ZSAmIDB4MDAwMEZGKX07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEhFWHRvSFNCKGhleCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlJHQnRvSFNCKHRoaXMuSEVYdG9SR0IoaGV4KSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFJHQnRvSFNCKHJnYikge1xyXG4gICAgICAgIHZhciBoc2IgPSB7XHJcbiAgICAgICAgICAgIGg6IDAsXHJcbiAgICAgICAgICAgIHM6IDAsXHJcbiAgICAgICAgICAgIGI6IDBcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBtaW4gPSBNYXRoLm1pbihyZ2IuciwgcmdiLmcsIHJnYi5iKTtcclxuICAgICAgICB2YXIgbWF4ID0gTWF0aC5tYXgocmdiLnIsIHJnYi5nLCByZ2IuYik7XHJcbiAgICAgICAgdmFyIGRlbHRhID0gbWF4IC0gbWluO1xyXG4gICAgICAgIGhzYi5iID0gbWF4O1xyXG4gICAgICAgIGhzYi5zID0gbWF4ICE9IDAgPyAyNTUgKiBkZWx0YSAvIG1heCA6IDA7XHJcbiAgICAgICAgaWYgKGhzYi5zICE9IDApIHtcclxuICAgICAgICAgICAgaWYgKHJnYi5yID09IG1heCkge1xyXG4gICAgICAgICAgICAgICAgaHNiLmggPSAocmdiLmcgLSByZ2IuYikgLyBkZWx0YTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZ2IuZyA9PSBtYXgpIHtcclxuICAgICAgICAgICAgICAgIGhzYi5oID0gMiArIChyZ2IuYiAtIHJnYi5yKSAvIGRlbHRhO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaHNiLmggPSA0ICsgKHJnYi5yIC0gcmdiLmcpIC8gZGVsdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBoc2IuaCA9IC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBoc2IuaCAqPSA2MDtcclxuICAgICAgICBpZiAoaHNiLmggPCAwKSB7XHJcbiAgICAgICAgICAgIGhzYi5oICs9IDM2MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaHNiLnMgKj0gMTAwLzI1NTtcclxuICAgICAgICBoc2IuYiAqPSAxMDAvMjU1O1xyXG4gICAgICAgIHJldHVybiBoc2I7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEhTQnRvUkdCKGhzYikge1xyXG4gICAgICAgIHZhciByZ2IgPSB7XHJcbiAgICAgICAgICAgIHI6IG51bGwsIGc6IG51bGwsIGI6IG51bGxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBoOiBudW1iZXIgPSBoc2IuaDtcclxuICAgICAgICBsZXQgczogbnVtYmVyID0gaHNiLnMqMjU1LzEwMDtcclxuICAgICAgICBsZXQgdjogbnVtYmVyID0gaHNiLmIqMjU1LzEwMDtcclxuICAgICAgICBpZiAocyA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJnYiA9IHtcclxuICAgICAgICAgICAgICAgIHI6IHYsXHJcbiAgICAgICAgICAgICAgICBnOiB2LFxyXG4gICAgICAgICAgICAgICAgYjogdlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHQxOiBudW1iZXIgPSB2O1xyXG4gICAgICAgICAgICBsZXQgdDI6IG51bWJlciA9ICgyNTUtcykqdi8yNTU7XHJcbiAgICAgICAgICAgIGxldCB0MzogbnVtYmVyID0gKHQxLXQyKSooaCU2MCkvNjA7XHJcbiAgICAgICAgICAgIGlmIChoPT0zNjApIGggPSAwO1xyXG4gICAgICAgICAgICBpZiAoaDw2MCkge3JnYi5yPXQxO1x0cmdiLmI9dDI7IHJnYi5nPXQyK3QzfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChoPDEyMCkge3JnYi5nPXQxOyByZ2IuYj10MjtcdHJnYi5yPXQxLXQzfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChoPDE4MCkge3JnYi5nPXQxOyByZ2Iucj10MjtcdHJnYi5iPXQyK3QzfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChoPDI0MCkge3JnYi5iPXQxOyByZ2Iucj10MjtcdHJnYi5nPXQxLXQzfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChoPDMwMCkge3JnYi5iPXQxOyByZ2IuZz10MjtcdHJnYi5yPXQyK3QzfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChoPDM2MCkge3JnYi5yPXQxOyByZ2IuZz10MjtcdHJnYi5iPXQxLXQzfVxyXG4gICAgICAgICAgICBlbHNlIHtyZ2Iucj0wOyByZ2IuZz0wO1x0cmdiLmI9MH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtyOk1hdGgucm91bmQocmdiLnIpLCBnOk1hdGgucm91bmQocmdiLmcpLCBiOk1hdGgucm91bmQocmdiLmIpfTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgUkdCdG9IRVgocmdiKSB7XHJcbiAgICAgICAgdmFyIGhleCA9IFtcclxuICAgICAgICAgICAgcmdiLnIudG9TdHJpbmcoMTYpLFxyXG4gICAgICAgICAgICByZ2IuZy50b1N0cmluZygxNiksXHJcbiAgICAgICAgICAgIHJnYi5iLnRvU3RyaW5nKDE2KVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gaGV4KSB7XHJcbiAgICAgICAgICAgIGlmIChoZXhba2V5XS5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgaGV4W2tleV0gPSAnMCcgKyBoZXhba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgICAgIFxyXG5cclxuICAgICAgICByZXR1cm4gaGV4LmpvaW4oJycpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBIU0J0b0hFWChoc2IpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5SR0J0b0hFWCh0aGlzLkhTQnRvUkdCKGhzYikpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uT3ZlcmxheUhpZGUoKSB7XHJcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcclxuICAgICAgICB0aGlzLm92ZXJsYXkgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnJlc3RvcmVPdmVybGF5QXBwZW5kKCk7XHJcbiAgICAgICAgdGhpcy5vbk92ZXJsYXlIaWRlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICAgIGV4cG9ydHM6IFtDb2xvclBpY2tlcl0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtDb2xvclBpY2tlcl1cclxufSlcclxuZXhwb3J0IGNsYXNzIENvbG9yUGlja2VyTW9kdWxlIHsgfVxyXG4iXX0=