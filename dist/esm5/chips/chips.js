var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { NgModule, Component, ElementRef, Input, Output, EventEmitter, AfterContentInit, ContentChildren, QueryList, TemplateRef, forwardRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, PrimeTemplate } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var CHIPS_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Chips; }),
    multi: true
};
var Chips = /** @class */ (function () {
    function Chips(el) {
        this.el = el;
        this.allowDuplicate = true;
        this.onAdd = new EventEmitter();
        this.onRemove = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.onChipClick = new EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    Chips.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'item':
                    _this.itemTemplate = item.template;
                    break;
                default:
                    _this.itemTemplate = item.template;
                    break;
            }
        });
    };
    Chips.prototype.onClick = function () {
        this.inputViewChild.nativeElement.focus();
    };
    Chips.prototype.onInput = function () {
        this.updateFilledState();
    };
    Chips.prototype.onPaste = function (event) {
        var _this = this;
        if (this.separator) {
            var pastedData = (event.clipboardData || window['clipboardData']).getData('Text');
            pastedData.split(this.separator).forEach(function (val) {
                _this.addItem(event, val, true);
            });
            this.inputViewChild.nativeElement.value = '';
        }
        this.updateFilledState();
    };
    Chips.prototype.updateFilledState = function () {
        if (!this.value || this.value.length === 0) {
            this.filled = (this.inputViewChild.nativeElement && this.inputViewChild.nativeElement.value != '');
        }
        else {
            this.filled = true;
        }
    };
    Chips.prototype.onItemClick = function (event, item) {
        this.onChipClick.emit({
            originalEvent: event,
            value: item
        });
    };
    Chips.prototype.writeValue = function (value) {
        this.value = value;
        this.updateMaxedOut();
    };
    Chips.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Chips.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Chips.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    Chips.prototype.resolveFieldData = function (data, field) {
        if (data && field) {
            if (field.indexOf('.') == -1) {
                return data[field];
            }
            else {
                var fields = field.split('.');
                var value = data;
                for (var i = 0, len = fields.length; i < len; ++i) {
                    value = value[fields[i]];
                }
                return value;
            }
        }
        else {
            return null;
        }
    };
    Chips.prototype.onInputFocus = function (event) {
        this.focus = true;
        this.onFocus.emit(event);
    };
    Chips.prototype.onInputBlur = function (event) {
        this.focus = false;
        if (this.addOnBlur && this.inputViewChild.nativeElement.value) {
            this.addItem(event, this.inputViewChild.nativeElement.value, false);
        }
        this.onModelTouched();
        this.onBlur.emit(event);
    };
    Chips.prototype.removeItem = function (event, index) {
        if (this.disabled) {
            return;
        }
        var removedItem = this.value[index];
        this.value = this.value.filter(function (val, i) { return i != index; });
        this.onModelChange(this.value);
        this.onRemove.emit({
            originalEvent: event,
            value: removedItem
        });
        this.updateFilledState();
        this.updateMaxedOut();
    };
    Chips.prototype.addItem = function (event, item, preventDefault) {
        this.value = this.value || [];
        if (item && item.trim().length) {
            if (this.allowDuplicate || this.value.indexOf(item) === -1) {
                this.value = __spread(this.value, [item]);
                this.onModelChange(this.value);
                this.onAdd.emit({
                    originalEvent: event,
                    value: item
                });
            }
        }
        this.updateFilledState();
        this.updateMaxedOut();
        this.inputViewChild.nativeElement.value = '';
        if (preventDefault) {
            event.preventDefault();
        }
    };
    Chips.prototype.onKeydown = function (event) {
        switch (event.which) {
            //backspace
            case 8:
                if (this.inputViewChild.nativeElement.value.length === 0 && this.value && this.value.length > 0) {
                    this.value = __spread(this.value);
                    var removedItem = this.value.pop();
                    this.onModelChange(this.value);
                    this.onRemove.emit({
                        originalEvent: event,
                        value: removedItem
                    });
                    this.updateFilledState();
                }
                break;
            //enter
            case 13:
                this.addItem(event, this.inputViewChild.nativeElement.value, true);
                break;
            case 9:
                if (this.addOnTab && this.inputViewChild.nativeElement.value !== '') {
                    this.addItem(event, this.inputViewChild.nativeElement.value, true);
                }
                break;
            default:
                if (this.max && this.value && this.max === this.value.length) {
                    event.preventDefault();
                }
                else if (this.separator) {
                    if (this.separator === ',' && event.which === 188) {
                        this.addItem(event, this.inputViewChild.nativeElement.value, true);
                    }
                }
                break;
        }
    };
    Chips.prototype.updateMaxedOut = function () {
        if (this.inputViewChild && this.inputViewChild.nativeElement) {
            if (this.max && this.value && this.max === this.value.length)
                this.inputViewChild.nativeElement.disabled = true;
            else
                this.inputViewChild.nativeElement.disabled = this.disabled || false;
        }
    };
    Chips.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], Chips.prototype, "style", void 0);
    __decorate([
        Input()
    ], Chips.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], Chips.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], Chips.prototype, "field", void 0);
    __decorate([
        Input()
    ], Chips.prototype, "placeholder", void 0);
    __decorate([
        Input()
    ], Chips.prototype, "max", void 0);
    __decorate([
        Input()
    ], Chips.prototype, "ariaLabelledBy", void 0);
    __decorate([
        Input()
    ], Chips.prototype, "tabindex", void 0);
    __decorate([
        Input()
    ], Chips.prototype, "inputId", void 0);
    __decorate([
        Input()
    ], Chips.prototype, "allowDuplicate", void 0);
    __decorate([
        Input()
    ], Chips.prototype, "inputStyle", void 0);
    __decorate([
        Input()
    ], Chips.prototype, "inputStyleClass", void 0);
    __decorate([
        Input()
    ], Chips.prototype, "addOnTab", void 0);
    __decorate([
        Input()
    ], Chips.prototype, "addOnBlur", void 0);
    __decorate([
        Input()
    ], Chips.prototype, "separator", void 0);
    __decorate([
        Output()
    ], Chips.prototype, "onAdd", void 0);
    __decorate([
        Output()
    ], Chips.prototype, "onRemove", void 0);
    __decorate([
        Output()
    ], Chips.prototype, "onFocus", void 0);
    __decorate([
        Output()
    ], Chips.prototype, "onBlur", void 0);
    __decorate([
        Output()
    ], Chips.prototype, "onChipClick", void 0);
    __decorate([
        ViewChild('inputtext')
    ], Chips.prototype, "inputViewChild", void 0);
    __decorate([
        ContentChildren(PrimeTemplate)
    ], Chips.prototype, "templates", void 0);
    Chips = __decorate([
        Component({
            selector: 'p-chips',
            template: "\n        <div [ngClass]=\"'ui-chips ui-widget'\" [ngStyle]=\"style\" [class]=\"styleClass\" (click)=\"onClick()\">\n            <ul [ngClass]=\"{'ui-inputtext ui-state-default ui-corner-all':true,'ui-state-focus':focus,'ui-state-disabled':disabled}\">\n                <li #token *ngFor=\"let item of value; let i = index;\" class=\"ui-chips-token ui-state-highlight ui-corner-all\" (click)=\"onItemClick($event, item)\">\n                    <span *ngIf=\"!disabled\" class=\"ui-chips-token-icon pi pi-fw pi-times\" (click)=\"removeItem($event,i)\"></span>\n                    <span *ngIf=\"!itemTemplate\" class=\"ui-chips-token-label\">{{field ? resolveFieldData(item,field) : item}}</span>\n                    <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item}\"></ng-container>\n                </li>\n                <li class=\"ui-chips-input-token\">\n                    <input #inputtext type=\"text\" [attr.id]=\"inputId\" [attr.placeholder]=\"(value && value.length ? null : placeholder)\" [attr.tabindex]=\"tabindex\" (keydown)=\"onKeydown($event)\"\n                    (input)=\"onInput()\" (paste)=\"onPaste($event)\" [attr.aria-labelledby]=\"ariaLabelledBy\" (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\" [disabled]=\"disabled\" [ngStyle]=\"inputStyle\" [class]=\"inputStyleClass\">\n                </li>\n            </ul>\n        </div>\n    ",
            host: {
                '[class.ui-inputwrapper-filled]': 'filled',
                '[class.ui-inputwrapper-focus]': 'focus'
            },
            providers: [CHIPS_VALUE_ACCESSOR],
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], Chips);
    return Chips;
}());
export { Chips };
var ChipsModule = /** @class */ (function () {
    function ChipsModule() {
    }
    ChipsModule = __decorate([
        NgModule({
            imports: [CommonModule, InputTextModule, SharedModule],
            exports: [Chips, InputTextModule, SharedModule],
            declarations: [Chips]
        })
    ], ChipsModule);
    return ChipsModule;
}());
export { ChipsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2NoaXBzLyIsInNvdXJjZXMiOlsiY2hpcHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsZ0JBQWdCLEVBQUMsZUFBZSxFQUFDLFNBQVMsRUFBQyxXQUFXLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMxTCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFlBQVksRUFBQyxhQUFhLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDdkQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxpQkFBaUIsRUFBdUIsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2RSxNQUFNLENBQUMsSUFBTSxvQkFBb0IsR0FBUTtJQUN2QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLEtBQUssRUFBTCxDQUFLLENBQUM7SUFDcEMsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBMEJGO0lBNERJLGVBQW1CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBeEN4QixtQkFBYyxHQUFZLElBQUksQ0FBQztRQVk5QixVQUFLLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFOUMsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWpELFlBQU8sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVoRCxXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFL0MsZ0JBQVcsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVU5RCxrQkFB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ZSxFQUFDLFlBQVksQ0FBQztZQUNwRCxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUMsZUFBZSxFQUFDLFlBQVksQ0FBQztZQUM3QyxZQUFZLEVBQUUsQ0FBQyxLQUFLLENBQUM7U0FDeEIsQ0FBQztPQUNXLFdBQVcsQ0FBSTtJQUFELGtCQUFDO0NBQUEsQUFBNUIsSUFBNEI7U0FBZixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsRWxlbWVudFJlZixJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyLEFmdGVyQ29udGVudEluaXQsQ29udGVudENoaWxkcmVuLFF1ZXJ5TGlzdCxUZW1wbGF0ZVJlZixmb3J3YXJkUmVmLFZpZXdDaGlsZCxDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge1NoYXJlZE1vZHVsZSxQcmltZVRlbXBsYXRlfSBmcm9tICdwcmltZW5nL2FwaSc7XHJcbmltcG9ydCB7SW5wdXRUZXh0TW9kdWxlfSBmcm9tICdwcmltZW5nL2lucHV0dGV4dCc7XHJcbmltcG9ydCB7TkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5leHBvcnQgY29uc3QgQ0hJUFNfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcclxuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBDaGlwcyksXHJcbiAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLWNoaXBzJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCIndWktY2hpcHMgdWktd2lkZ2V0J1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiAoY2xpY2spPVwib25DbGljaygpXCI+XHJcbiAgICAgICAgICAgIDx1bCBbbmdDbGFzc109XCJ7J3VpLWlucHV0dGV4dCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGwnOnRydWUsJ3VpLXN0YXRlLWZvY3VzJzpmb2N1cywndWktc3RhdGUtZGlzYWJsZWQnOmRpc2FibGVkfVwiPlxyXG4gICAgICAgICAgICAgICAgPGxpICN0b2tlbiAqbmdGb3I9XCJsZXQgaXRlbSBvZiB2YWx1ZTsgbGV0IGkgPSBpbmRleDtcIiBjbGFzcz1cInVpLWNoaXBzLXRva2VuIHVpLXN0YXRlLWhpZ2hsaWdodCB1aS1jb3JuZXItYWxsXCIgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKCRldmVudCwgaXRlbSlcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIiFkaXNhYmxlZFwiIGNsYXNzPVwidWktY2hpcHMtdG9rZW4taWNvbiBwaSBwaS1mdyBwaS10aW1lc1wiIChjbGljayk9XCJyZW1vdmVJdGVtKCRldmVudCxpKVwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIiFpdGVtVGVtcGxhdGVcIiBjbGFzcz1cInVpLWNoaXBzLXRva2VuLWxhYmVsXCI+e3tmaWVsZCA/IHJlc29sdmVGaWVsZERhdGEoaXRlbSxmaWVsZCkgOiBpdGVtfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogaXRlbX1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJ1aS1jaGlwcy1pbnB1dC10b2tlblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCAjaW5wdXR0ZXh0IHR5cGU9XCJ0ZXh0XCIgW2F0dHIuaWRdPVwiaW5wdXRJZFwiIFthdHRyLnBsYWNlaG9sZGVyXT1cIih2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggPyBudWxsIDogcGxhY2Vob2xkZXIpXCIgW2F0dHIudGFiaW5kZXhdPVwidGFiaW5kZXhcIiAoa2V5ZG93bik9XCJvbktleWRvd24oJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgICAgICAgKGlucHV0KT1cIm9uSW5wdXQoKVwiIChwYXN0ZSk9XCJvblBhc3RlKCRldmVudClcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkQnlcIiAoZm9jdXMpPVwib25JbnB1dEZvY3VzKCRldmVudClcIiAoYmx1cik9XCJvbklucHV0Qmx1cigkZXZlbnQpXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgW25nU3R5bGVdPVwiaW5wdXRTdHlsZVwiIFtjbGFzc109XCJpbnB1dFN0eWxlQ2xhc3NcIj5cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgaG9zdDoge1xyXG4gICAgICAgICdbY2xhc3MudWktaW5wdXR3cmFwcGVyLWZpbGxlZF0nOiAnZmlsbGVkJyxcclxuICAgICAgICAnW2NsYXNzLnVpLWlucHV0d3JhcHBlci1mb2N1c10nOiAnZm9jdXMnXHJcbiAgICB9LFxyXG4gICAgcHJvdmlkZXJzOiBbQ0hJUFNfVkFMVUVfQUNDRVNTT1JdLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDaGlwcyBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG5cclxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIGZpZWxkOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBtYXg6IG51bWJlcjtcclxuXHJcbiAgICBASW5wdXQoKSBhcmlhTGFiZWxsZWRCeTogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIHRhYmluZGV4OiBudW1iZXI7XHJcblxyXG4gICAgQElucHV0KCkgaW5wdXRJZDogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGFsbG93RHVwbGljYXRlOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBASW5wdXQoKSBpbnB1dFN0eWxlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgaW5wdXRTdHlsZUNsYXNzOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgYWRkT25UYWI6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgYWRkT25CbHVyOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIHNlcGFyYXRvcjogc3RyaW5nO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkFkZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uUmVtb3ZlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25Gb2N1czogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uQmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uQ2hpcENsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAVmlld0NoaWxkKCdpbnB1dHRleHQnKSBpbnB1dFZpZXdDaGlsZDogRWxlbWVudFJlZjtcclxuXHJcbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PGFueT47XHJcblxyXG4gICAgcHVibGljIGl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgICB2YWx1ZTogYW55O1xyXG5cclxuICAgIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XHJcblxyXG4gICAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XHJcblxyXG4gICAgdmFsdWVDaGFuZ2VkOiBib29sZWFuO1xyXG5cclxuICAgIGZvY3VzOiBib29sZWFuO1xyXG5cclxuICAgIGZpbGxlZDogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYpIHt9XHJcblxyXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoKGl0ZW0uZ2V0VHlwZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdpdGVtJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGljaygpIHtcclxuICAgICAgICB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbklucHV0KCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlRmlsbGVkU3RhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblBhc3RlKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VwYXJhdG9yKSB7XHJcbiAgICAgICAgICAgIGxldCBwYXN0ZWREYXRhID0gKGV2ZW50LmNsaXBib2FyZERhdGEgfHwgd2luZG93WydjbGlwYm9hcmREYXRhJ10pLmdldERhdGEoJ1RleHQnKTtcclxuICAgICAgICAgICAgcGFzdGVkRGF0YS5zcGxpdCh0aGlzLnNlcGFyYXRvcikuZm9yRWFjaCh2YWwgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtKGV2ZW50LCB2YWwsIHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlRmlsbGVkU3RhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVGaWxsZWRTdGF0ZSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMudmFsdWUgfHwgdGhpcy52YWx1ZS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5maWxsZWQgPSAodGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50ICYmIHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZSAhPSAnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmZpbGxlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uSXRlbUNsaWNrKGV2ZW50OiBFdmVudCwgaXRlbTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5vbkNoaXBDbGljay5lbWl0KHtcclxuICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXHJcbiAgICAgICAgICAgIHZhbHVlOiBpdGVtXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSA6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1heGVkT3V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGlzYWJsZWRTdGF0ZSh2YWw6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVkID0gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc29sdmVGaWVsZERhdGEoZGF0YTogYW55LCBmaWVsZDogc3RyaW5nKTogYW55IHtcclxuICAgICAgICBpZiAoZGF0YSAmJiBmaWVsZCkge1xyXG4gICAgICAgICAgICBpZiAoZmllbGQuaW5kZXhPZignLicpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YVtmaWVsZF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmllbGRzOiBzdHJpbmdbXSA9IGZpZWxkLnNwbGl0KCcuJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMCwgbGVuID0gZmllbGRzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZVtmaWVsZHNbaV1dO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25JbnB1dEZvY3VzKGV2ZW50OiBGb2N1c0V2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5mb2N1cyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5vbkZvY3VzLmVtaXQoZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uSW5wdXRCbHVyKGV2ZW50OiBGb2N1c0V2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5mb2N1cyA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLmFkZE9uQmx1ciAmJiB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRJdGVtKGV2ZW50LCB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xyXG4gICAgICAgIHRoaXMub25CbHVyLmVtaXQoZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUl0ZW0oZXZlbnQ6IEV2ZW50LCBpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJlbW92ZWRJdGVtID0gdGhpcy52YWx1ZVtpbmRleF07XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWUuZmlsdGVyKCh2YWwsIGkpID0+IGkhPWluZGV4KTtcclxuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5vblJlbW92ZS5lbWl0KHtcclxuICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXHJcbiAgICAgICAgICAgIHZhbHVlOiByZW1vdmVkSXRlbVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudXBkYXRlRmlsbGVkU3RhdGUoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1heGVkT3V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkSXRlbShldmVudDogRXZlbnQsIGl0ZW06IHN0cmluZywgcHJldmVudERlZmF1bHQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZXx8W107XHJcbiAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS50cmltKCkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFsbG93RHVwbGljYXRlIHx8IHRoaXMudmFsdWUuaW5kZXhPZihpdGVtKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBbLi4udGhpcy52YWx1ZSwgaXRlbV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQWRkLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBpdGVtXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZUZpbGxlZFN0YXRlKCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNYXhlZE91dCgpO1xyXG4gICAgICAgIHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xyXG5cclxuICAgICAgICBpZiAocHJldmVudERlZmF1bHQpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgc3dpdGNoKGV2ZW50LndoaWNoKSB7XHJcbiAgICAgICAgICAgIC8vYmFja3NwYWNlXHJcbiAgICAgICAgICAgIGNhc2UgODpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUubGVuZ3RoID09PSAwICYmIHRoaXMudmFsdWUgJiYgdGhpcy52YWx1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IFsuLi50aGlzLnZhbHVlXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVtb3ZlZEl0ZW0gPSB0aGlzLnZhbHVlLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uUmVtb3ZlLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJlbW92ZWRJdGVtXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIC8vZW50ZXJcclxuICAgICAgICAgICAgY2FzZSAxMzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkSXRlbShldmVudCwgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlLCB0cnVlKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIDk6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZGRPblRhYiAmJiB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUgIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtKGV2ZW50LCB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXggJiYgdGhpcy52YWx1ZSAmJiB0aGlzLm1heCA9PT0gdGhpcy52YWx1ZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zZXBhcmF0b3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXBhcmF0b3IgPT09ICcsJyAmJiBldmVudC53aGljaCA9PT0gMTg4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkSXRlbShldmVudCwgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVNYXhlZE91dCgpIHtcclxuICAgICAgICBpZiAodGhpcy5pbnB1dFZpZXdDaGlsZCAmJiB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWF4ICYmIHRoaXMudmFsdWUgJiYgdGhpcy5tYXggPT09IHRoaXMudmFsdWUubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmRpc2FibGVkID0gdGhpcy5kaXNhYmxlZCB8fCBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLElucHV0VGV4dE1vZHVsZSxTaGFyZWRNb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW0NoaXBzLElucHV0VGV4dE1vZHVsZSxTaGFyZWRNb2R1bGVdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbQ2hpcHNdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDaGlwc01vZHVsZSB7IH1cclxuIl19