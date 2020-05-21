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
import { NgModule, Component, Input, Output, EventEmitter, forwardRef, ChangeDetectorRef, ContentChild, TemplateRef, SimpleChanges, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectUtils } from 'primeng/utils';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var SELECTBUTTON_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return SelectButton; }),
    multi: true
};
var SelectButton = /** @class */ (function () {
    function SelectButton(cd) {
        this.cd = cd;
        this.tabindex = 0;
        this.onOptionClick = new EventEmitter();
        this.onChange = new EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    Object.defineProperty(SelectButton.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (val) {
            //NoOp
        },
        enumerable: true,
        configurable: true
    });
    SelectButton.prototype.ngOnChanges = function (simpleChange) {
        if (simpleChange.options) {
            this._options = this.optionLabel ? ObjectUtils.generateSelectItems(simpleChange.options.currentValue, this.optionLabel) : simpleChange.options.currentValue;
        }
    };
    SelectButton.prototype.writeValue = function (value) {
        this.value = value;
        this.cd.markForCheck();
    };
    SelectButton.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    SelectButton.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    SelectButton.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    SelectButton.prototype.onItemClick = function (event, option, index) {
        if (this.disabled || option.disabled) {
            return;
        }
        if (this.multiple) {
            var itemIndex_1 = this.findItemIndex(option);
            if (itemIndex_1 != -1)
                this.value = this.value.filter(function (val, i) { return i != itemIndex_1; });
            else
                this.value = __spread(this.value || [], [option.value]);
        }
        else {
            this.value = option.value;
        }
        this.onOptionClick.emit({
            originalEvent: event,
            option: option,
            index: index
        });
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    };
    SelectButton.prototype.onFocus = function (event) {
        this.focusedItem = event.target;
    };
    SelectButton.prototype.onBlur = function (event) {
        this.focusedItem = null;
        this.onModelTouched();
    };
    SelectButton.prototype.isSelected = function (option) {
        if (this.multiple)
            return this.findItemIndex(option) != -1;
        else
            return ObjectUtils.equals(option.value, this.value, this.dataKey);
    };
    SelectButton.prototype.findItemIndex = function (option) {
        var index = -1;
        if (this.value) {
            for (var i = 0; i < this.value.length; i++) {
                if (this.value[i] == option.value) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    SelectButton.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], SelectButton.prototype, "tabindex", void 0);
    __decorate([
        Input()
    ], SelectButton.prototype, "multiple", void 0);
    __decorate([
        Input()
    ], SelectButton.prototype, "style", void 0);
    __decorate([
        Input()
    ], SelectButton.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], SelectButton.prototype, "ariaLabelledBy", void 0);
    __decorate([
        Input()
    ], SelectButton.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], SelectButton.prototype, "dataKey", void 0);
    __decorate([
        Input()
    ], SelectButton.prototype, "optionLabel", void 0);
    __decorate([
        Output()
    ], SelectButton.prototype, "onOptionClick", void 0);
    __decorate([
        Output()
    ], SelectButton.prototype, "onChange", void 0);
    __decorate([
        ContentChild(TemplateRef)
    ], SelectButton.prototype, "itemTemplate", void 0);
    __decorate([
        Input()
    ], SelectButton.prototype, "options", null);
    SelectButton = __decorate([
        Component({
            selector: 'p-selectButton',
            template: "\n        <div [ngClass]=\"'ui-selectbutton ui-buttonset ui-widget ui-corner-all ui-buttonset-' + (options ? options.length : 0)\" [ngStyle]=\"style\" [class]=\"styleClass\"  role=\"group\">\n            <div *ngFor=\"let option of options; let i = index\" #btn class=\"ui-button ui-widget ui-state-default ui-button-text-only {{option.styleClass}}\"  role=\"button\" [attr.aria-pressed]=\"isSelected(option)\"\n                [ngClass]=\"{'ui-state-active':isSelected(option), 'ui-state-disabled': disabled || option.disabled, 'ui-state-focus': btn == focusedItem, \n                'ui-button-text-icon-left': (option.icon != null), 'ui-button-icon-only': (option.icon && !option.label)}\" (click)=\"onItemClick($event,option,i)\" (keydown.enter)=\"onItemClick($event,option,i)\"\n                [attr.title]=\"option.title\" [attr.aria-label]=\"option.label\" (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\" [attr.tabindex]=\"tabindex\" [attr.aria-labelledby]=\"ariaLabelledBy\">\n                <ng-container *ngIf=\"!itemTemplate else customcontent\">\n                    <span [ngClass]=\"['ui-clickable', 'ui-button-icon-left']\" [class]=\"option.icon\" *ngIf=\"option.icon\"></span>\n                    <span class=\"ui-button-text ui-clickable\">{{option.label||'ui-btn'}}</span>\n                </ng-container>\n                <ng-template #customcontent>\n                    <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: option, index: i}\"></ng-container>\n                </ng-template>\n            </div>\n        </div>\n    ",
            providers: [SELECTBUTTON_VALUE_ACCESSOR],
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], SelectButton);
    return SelectButton;
}());
export { SelectButton };
var SelectButtonModule = /** @class */ (function () {
    function SelectButtonModule() {
    }
    SelectButtonModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [SelectButton],
            declarations: [SelectButton]
        })
    ], SelectButtonModule);
    return SelectButtonModule;
}());
export { SelectButtonModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0YnV0dG9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9zZWxlY3RidXR0b24vIiwic291cmNlcyI6WyJzZWxlY3RidXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsaUJBQWlCLEVBQUMsWUFBWSxFQUFDLFdBQVcsRUFBQyxhQUFhLEVBQUMsU0FBUyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pMLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUU3QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBQyxpQkFBaUIsRUFBdUIsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2RSxNQUFNLENBQUMsSUFBTSwyQkFBMkIsR0FBUTtJQUM5QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLFlBQVksRUFBWixDQUFZLENBQUM7SUFDM0MsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBdUJGO0lBa0NJLHNCQUFvQixFQUFxQjtRQUFyQixPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQWhDaEMsYUFBUSxHQUFXLENBQUMsQ0FBQztRQWdCcEIsa0JBQWEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV0RCxhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFVM0Qsa0JBQWEsR0FBYSxjQUFPLENBQUMsQ0FBQztRQUVuQyxtQkFBYyxHQUFhLGNBQU8sQ0FBQyxDQUFDO0lBRVEsQ0FBQztJQUVwQyxzQkFBSSxpQ0FBTzthQUFYO1lBQ0wsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7YUFFRCxVQUFZLEdBQVU7WUFDbEIs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QTtJQUFrQyxDQUFDO0lBQXRCLGtCQUFrQjtRQUw5QixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdkIsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3ZCLFlBQVksRUFBRSxDQUFDLFlBQVksQ0FBQztTQUMvQixDQUFDO09BQ1csa0JBQWtCLENBQUk7SUFBRCx5QkFBQztDQUFBLEFBQW5DLElBQW1DO1NBQXRCLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXIsZm9yd2FyZFJlZixDaGFuZ2VEZXRlY3RvclJlZixDb250ZW50Q2hpbGQsVGVtcGxhdGVSZWYsU2ltcGxlQ2hhbmdlcyxPbkNoYW5nZXMsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtTZWxlY3RJdGVtfSBmcm9tICdwcmltZW5nL2FwaSc7XHJcbmltcG9ydCB7T2JqZWN0VXRpbHN9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xyXG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IFNFTEVDVEJVVFRPTl9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xyXG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFNlbGVjdEJ1dHRvbiksXHJcbiAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLXNlbGVjdEJ1dHRvbicsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwiJ3VpLXNlbGVjdGJ1dHRvbiB1aS1idXR0b25zZXQgdWktd2lkZ2V0IHVpLWNvcm5lci1hbGwgdWktYnV0dG9uc2V0LScgKyAob3B0aW9ucyA/IG9wdGlvbnMubGVuZ3RoIDogMClcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgIHJvbGU9XCJncm91cFwiPlxyXG4gICAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBvcHRpb24gb2Ygb3B0aW9uczsgbGV0IGkgPSBpbmRleFwiICNidG4gY2xhc3M9XCJ1aS1idXR0b24gdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQgdWktYnV0dG9uLXRleHQtb25seSB7e29wdGlvbi5zdHlsZUNsYXNzfX1cIiAgcm9sZT1cImJ1dHRvblwiIFthdHRyLmFyaWEtcHJlc3NlZF09XCJpc1NlbGVjdGVkKG9wdGlvbilcIlxyXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1hY3RpdmUnOmlzU2VsZWN0ZWQob3B0aW9uKSwgJ3VpLXN0YXRlLWRpc2FibGVkJzogZGlzYWJsZWQgfHwgb3B0aW9uLmRpc2FibGVkLCAndWktc3RhdGUtZm9jdXMnOiBidG4gPT0gZm9jdXNlZEl0ZW0sIFxyXG4gICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi10ZXh0LWljb24tbGVmdCc6IChvcHRpb24uaWNvbiAhPSBudWxsKSwgJ3VpLWJ1dHRvbi1pY29uLW9ubHknOiAob3B0aW9uLmljb24gJiYgIW9wdGlvbi5sYWJlbCl9XCIgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKCRldmVudCxvcHRpb24saSlcIiAoa2V5ZG93bi5lbnRlcik9XCJvbkl0ZW1DbGljaygkZXZlbnQsb3B0aW9uLGkpXCJcclxuICAgICAgICAgICAgICAgIFthdHRyLnRpdGxlXT1cIm9wdGlvbi50aXRsZVwiIFthdHRyLmFyaWEtbGFiZWxdPVwib3B0aW9uLmxhYmVsXCIgKGZvY3VzKT1cIm9uRm9jdXMoJGV2ZW50KVwiIChibHVyKT1cIm9uQmx1cigkZXZlbnQpXCIgW2F0dHIudGFiaW5kZXhdPVwidGFiaW5kZXhcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkQnlcIj5cclxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaXRlbVRlbXBsYXRlIGVsc2UgY3VzdG9tY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIFtuZ0NsYXNzXT1cIlsndWktY2xpY2thYmxlJywgJ3VpLWJ1dHRvbi1pY29uLWxlZnQnXVwiIFtjbGFzc109XCJvcHRpb24uaWNvblwiICpuZ0lmPVwib3B0aW9uLmljb25cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1idXR0b24tdGV4dCB1aS1jbGlja2FibGVcIj57e29wdGlvbi5sYWJlbHx8J3VpLWJ0bid9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNjdXN0b21jb250ZW50PlxyXG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IG9wdGlvbiwgaW5kZXg6IGl9XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBwcm92aWRlcnM6IFtTRUxFQ1RCVVRUT05fVkFMVUVfQUNDRVNTT1JdLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3RCdXR0b24gaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25DaGFuZ2VzIHtcclxuXHJcbiAgICBASW5wdXQoKSB0YWJpbmRleDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBASW5wdXQoKSBtdWx0aXBsZTogYm9vbGVhbjtcclxuICAgIFxyXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcclxuICAgICAgICBcclxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBhcmlhTGFiZWxsZWRCeTogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIGRhdGFLZXk6IHN0cmluZ1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBvcHRpb25MYWJlbDogc3RyaW5nO1xyXG4gICAgXHJcbiAgICBAT3V0cHV0KCkgb25PcHRpb25DbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmKSBpdGVtVGVtcGxhdGU7XHJcbiAgICBcclxuICAgIHZhbHVlOiBhbnk7XHJcbiAgICBcclxuICAgIGZvY3VzZWRJdGVtOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIFxyXG4gICAgX29wdGlvbnM6IGFueVtdO1xyXG4gICAgXHJcbiAgICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xyXG4gICAgXHJcbiAgICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGdldCBvcHRpb25zKCk6IGFueVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgb3B0aW9ucyh2YWw6IGFueVtdKSB7XHJcbiAgICAgICAgLy9Ob09wXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoc2ltcGxlQ2hhbmdlOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS5vcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMgPSB0aGlzLm9wdGlvbkxhYmVsID8gT2JqZWN0VXRpbHMuZ2VuZXJhdGVTZWxlY3RJdGVtcyhzaW1wbGVDaGFuZ2Uub3B0aW9ucy5jdXJyZW50VmFsdWUsIHRoaXMub3B0aW9uTGFiZWwpIDogc2ltcGxlQ2hhbmdlLm9wdGlvbnMuY3VycmVudFZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSA6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0RGlzYWJsZWRTdGF0ZSh2YWw6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVkID0gdmFsO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvbkl0ZW1DbGljayhldmVudCwgb3B0aW9uOiBTZWxlY3RJdGVtLCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgb3B0aW9uLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xyXG4gICAgICAgICAgICBsZXQgaXRlbUluZGV4ID0gdGhpcy5maW5kSXRlbUluZGV4KG9wdGlvbik7XHJcbiAgICAgICAgICAgIGlmIChpdGVtSW5kZXggIT0gLTEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZS5maWx0ZXIoKHZhbCxpKSA9PiBpIT1pdGVtSW5kZXgpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gWy4uLnRoaXMudmFsdWV8fFtdLCBvcHRpb24udmFsdWVdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG9wdGlvbi52YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5vbk9wdGlvbkNsaWNrLmVtaXQoe1xyXG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgb3B0aW9uOiBvcHRpb24sXHJcbiAgICAgICAgICAgIGluZGV4OiBpbmRleFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoe1xyXG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgb25Gb2N1cyhldmVudDogRXZlbnQpIHtcclxuICAgICAgICB0aGlzLmZvY3VzZWRJdGVtID0gPEhUTUxEaXZFbGVtZW50PiBldmVudC50YXJnZXQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG9uQmx1cihldmVudCkge1xyXG4gICAgICAgIHRoaXMuZm9jdXNlZEl0ZW0gPSBudWxsO1xyXG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaXNTZWxlY3RlZChvcHRpb246IFNlbGVjdEl0ZW0pIHtcclxuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZEl0ZW1JbmRleChvcHRpb24pICE9IC0xO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdFV0aWxzLmVxdWFscyhvcHRpb24udmFsdWUsIHRoaXMudmFsdWUsIHRoaXMuZGF0YUtleSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGZpbmRJdGVtSW5kZXgob3B0aW9uOiBTZWxlY3RJdGVtKSB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gLTE7XHJcbiAgICAgICAgaWYgKHRoaXMudmFsdWUpIHtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMudmFsdWUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlW2ldID09IG9wdGlvbi52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICAgIGV4cG9ydHM6IFtTZWxlY3RCdXR0b25dLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbU2VsZWN0QnV0dG9uXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2VsZWN0QnV0dG9uTW9kdWxlIHsgfVxyXG4iXX0=