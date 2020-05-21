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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { NgModule, Component, ElementRef, Input, Output, EventEmitter, AfterContentInit, ContentChildren, ContentChild, QueryList, TemplateRef, forwardRef, ChangeDetectorRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, PrimeTemplate, Footer, Header } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { ObjectUtils } from 'primeng/utils';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FilterUtils } from 'primeng/utils';
export var LISTBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Listbox; }),
    multi: true
};
var Listbox = /** @class */ (function () {
    function Listbox(el, cd) {
        this.el = el;
        this.cd = cd;
        this.checkbox = false;
        this.filter = false;
        this.filterMode = 'contains';
        this.metaKeySelection = true;
        this.showToggleAll = true;
        this.onChange = new EventEmitter();
        this.onClick = new EventEmitter();
        this.onDblClick = new EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.disabledSelectedOptions = [];
    }
    Object.defineProperty(Listbox.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (val) {
            var opts = this.optionLabel ? ObjectUtils.generateSelectItems(val, this.optionLabel) : val;
            this._options = opts;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Listbox.prototype, "filterValue", {
        get: function () {
            return this._filterValue;
        },
        set: function (val) {
            this._filterValue = val;
        },
        enumerable: true,
        configurable: true
    });
    Listbox.prototype.ngAfterContentInit = function () {
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
    Listbox.prototype.writeValue = function (value) {
        this.value = value;
        this.setDisabledSelectedOptions();
        this.cd.markForCheck();
    };
    Listbox.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Listbox.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Listbox.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    Listbox.prototype.onOptionClick = function (event, option) {
        if (this.disabled || option.disabled || this.readonly) {
            return;
        }
        if (this.multiple) {
            if (this.checkbox)
                this.onOptionClickCheckbox(event, option);
            else
                this.onOptionClickMultiple(event, option);
        }
        else {
            this.onOptionClickSingle(event, option);
        }
        this.onClick.emit({
            originalEvent: event,
            option: option,
            value: this.value
        });
        this.optionTouched = false;
    };
    Listbox.prototype.onOptionTouchEnd = function (event, option) {
        if (this.disabled || option.disabled || this.readonly) {
            return;
        }
        this.optionTouched = true;
    };
    Listbox.prototype.onOptionDoubleClick = function (event, option) {
        if (this.disabled || option.disabled || this.readonly) {
            return;
        }
        this.onDblClick.emit({
            originalEvent: event,
            option: option,
            value: this.value
        });
    };
    Listbox.prototype.onOptionClickSingle = function (event, option) {
        var selected = this.isSelected(option);
        var valueChanged = false;
        var metaSelection = this.optionTouched ? false : this.metaKeySelection;
        if (metaSelection) {
            var metaKey = (event.metaKey || event.ctrlKey);
            if (selected) {
                if (metaKey) {
                    this.value = null;
                    valueChanged = true;
                }
            }
            else {
                this.value = option.value;
                valueChanged = true;
            }
        }
        else {
            this.value = selected ? null : option.value;
            valueChanged = true;
        }
        if (valueChanged) {
            this.onModelChange(this.value);
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    };
    Listbox.prototype.onOptionClickMultiple = function (event, option) {
        var selected = this.isSelected(option);
        var valueChanged = false;
        var metaSelection = this.optionTouched ? false : this.metaKeySelection;
        if (metaSelection) {
            var metaKey = (event.metaKey || event.ctrlKey);
            if (selected) {
                if (metaKey) {
                    this.removeOption(option);
                }
                else {
                    this.value = [option.value];
                }
                valueChanged = true;
            }
            else {
                this.value = (metaKey) ? this.value || [] : [];
                this.value = __spread(this.value, [option.value]);
                valueChanged = true;
            }
        }
        else {
            if (selected) {
                this.removeOption(option);
            }
            else {
                this.value = __spread(this.value || [], [option.value]);
            }
            valueChanged = true;
        }
        if (valueChanged) {
            this.onModelChange(this.value);
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    };
    Listbox.prototype.onOptionClickCheckbox = function (event, option) {
        if (this.disabled || this.readonly) {
            return;
        }
        var selected = this.isSelected(option);
        if (selected) {
            this.removeOption(option);
        }
        else {
            this.value = this.value ? this.value : [];
            this.value = __spread(this.value, [option.value]);
        }
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    };
    Listbox.prototype.removeOption = function (option) {
        var _this = this;
        this.value = this.value.filter(function (val) { return !ObjectUtils.equals(val, option.value, _this.dataKey); });
    };
    Listbox.prototype.isSelected = function (option) {
        var e_1, _a;
        var selected = false;
        if (this.multiple) {
            if (this.value) {
                try {
                    for (var _b = __values(this.value), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var val = _c.value;
                        if (ObjectUtils.equals(val, option.value, this.dataKey)) {
                            selected = true;
                            break;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        }
        else {
            selected = ObjectUtils.equals(this.value, option.value, this.dataKey);
        }
        return selected;
    };
    Object.defineProperty(Listbox.prototype, "allChecked", {
        get: function () {
            if (this.filterValue) {
                return this.allFilteredSelected();
            }
            else {
                var optionCount = this.getEnabledOptionCount();
                var disabledSelectedOptionCount = this.disabledSelectedOptions.length;
                return this.value && this.options && (this.value.length > 0 && this.value.length == optionCount + disabledSelectedOptionCount);
            }
        },
        enumerable: true,
        configurable: true
    });
    Listbox.prototype.getEnabledOptionCount = function () {
        var e_2, _a;
        if (this.options) {
            var count = 0;
            try {
                for (var _b = __values(this.options), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var opt = _c.value;
                    if (!opt.disabled) {
                        count++;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return count;
        }
        else {
            return 0;
        }
    };
    Listbox.prototype.allFilteredSelected = function () {
        var e_3, _a;
        var allSelected;
        var options = this.filterValue ? this.getFilteredOptions() : this.options;
        if (this.value && options && options.length) {
            allSelected = true;
            try {
                for (var _b = __values(this.options), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var opt = _c.value;
                    if (this.isItemVisible(opt)) {
                        if (!this.isSelected(opt)) {
                            allSelected = false;
                            break;
                        }
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        return allSelected;
    };
    Listbox.prototype.onFilter = function (event) {
        this._filterValue = event.target.value;
    };
    Listbox.prototype.toggleAll = function (event) {
        if (this.disabled || this.readonly || !this.options || this.options.length === 0) {
            return;
        }
        if (this.allChecked) {
            if (this.disabledSelectedOptions && this.disabledSelectedOptions.length > 0) {
                var value = [];
                value = __spread(this.disabledSelectedOptions);
                this.value = value;
            }
            else {
                this.value = [];
            }
        }
        else {
            if (this.options) {
                this.value = [];
                if (this.disabledSelectedOptions && this.disabledSelectedOptions.length > 0) {
                    this.value = __spread(this.disabledSelectedOptions);
                }
                for (var i = 0; i < this.options.length; i++) {
                    var opt = this.options[i];
                    if (this.isItemVisible(opt) && !opt.disabled) {
                        this.value.push(opt.value);
                    }
                }
            }
        }
        this.onModelChange(this.value);
        this.onChange.emit({ originalEvent: event, value: this.value });
        event.preventDefault();
    };
    Listbox.prototype.isItemVisible = function (option) {
        if (this.filterValue) {
            var visible = void 0;
            if (this.filterMode) {
                visible = FilterUtils[this.filterMode](option.label, this.filterValue, this.filterLocale);
            }
            else {
                visible = true;
            }
            return visible;
        }
        else {
            return true;
        }
    };
    Listbox.prototype.onInputFocus = function (event) {
        this.focus = true;
    };
    Listbox.prototype.onInputBlur = function (event) {
        this.focus = false;
    };
    Listbox.prototype.onOptionKeyDown = function (event, option) {
        if (this.readonly) {
            return;
        }
        var item = event.currentTarget;
        switch (event.which) {
            //down
            case 40:
                var nextItem = this.findNextItem(item);
                if (nextItem) {
                    nextItem.focus();
                }
                event.preventDefault();
                break;
            //up
            case 38:
                var prevItem = this.findPrevItem(item);
                if (prevItem) {
                    prevItem.focus();
                }
                event.preventDefault();
                break;
            //enter
            case 13:
                this.onOptionClick(event, option);
                event.preventDefault();
                break;
        }
    };
    Listbox.prototype.findNextItem = function (item) {
        var nextItem = item.nextElementSibling;
        if (nextItem)
            return DomHandler.hasClass(nextItem, 'ui-state-disabled') || DomHandler.isHidden(nextItem) ? this.findNextItem(nextItem) : nextItem;
        else
            return null;
    };
    Listbox.prototype.findPrevItem = function (item) {
        var prevItem = item.previousElementSibling;
        if (prevItem)
            return DomHandler.hasClass(prevItem, 'ui-state-disabled') || DomHandler.isHidden(prevItem) ? this.findPrevItem(prevItem) : prevItem;
        else
            return null;
    };
    Listbox.prototype.getFilteredOptions = function () {
        var filteredOptions = [];
        if (this.filterValue) {
            for (var i = 0; i < this.options.length; i++) {
                var opt = this.options[i];
                if (this.isItemVisible(opt) && !opt.disabled) {
                    filteredOptions.push(opt);
                }
            }
            return filteredOptions;
        }
        else {
            return this.options;
        }
    };
    Listbox.prototype.onHeaderCheckboxFocus = function () {
        this.headerCheckboxFocus = true;
    };
    Listbox.prototype.onHeaderCheckboxBlur = function () {
        this.headerCheckboxFocus = false;
    };
    Listbox.prototype.setDisabledSelectedOptions = function () {
        var e_4, _a;
        if (this.options) {
            this.disabledSelectedOptions = [];
            if (this.value) {
                try {
                    for (var _b = __values(this.options), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var opt = _c.value;
                        if (opt.disabled && this.isSelected(opt)) {
                            this.disabledSelectedOptions.push(opt.value);
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
    };
    Listbox.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], Listbox.prototype, "multiple", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "style", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "listStyle", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "readonly", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "checkbox", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "filter", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "filterMode", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "filterLocale", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "metaKeySelection", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "dataKey", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "showToggleAll", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "optionLabel", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "ariaFilterLabel", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "filterPlaceHolder", void 0);
    __decorate([
        Output()
    ], Listbox.prototype, "onChange", void 0);
    __decorate([
        Output()
    ], Listbox.prototype, "onClick", void 0);
    __decorate([
        Output()
    ], Listbox.prototype, "onDblClick", void 0);
    __decorate([
        ViewChild('headerchkbox')
    ], Listbox.prototype, "headerCheckboxViewChild", void 0);
    __decorate([
        ContentChild(Header)
    ], Listbox.prototype, "headerFacet", void 0);
    __decorate([
        ContentChild(Footer)
    ], Listbox.prototype, "footerFacet", void 0);
    __decorate([
        ContentChildren(PrimeTemplate)
    ], Listbox.prototype, "templates", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "options", null);
    __decorate([
        Input()
    ], Listbox.prototype, "filterValue", null);
    Listbox = __decorate([
        Component({
            selector: 'p-listbox',
            template: "\n    <div [ngClass]=\"{'ui-listbox ui-inputtext ui-widget ui-widget-content ui-corner-all':true,'ui-state-disabled':disabled,'ui-state-focus':focus}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n      <div class=\"ui-helper-hidden-accessible\">\n        <input type=\"text\" readonly=\"readonly\" (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\">\n      </div>\n      <div class=\"ui-widget-header ui-corner-all ui-listbox-header ui-helper-clearfix\" *ngIf=\"headerFacet\">\n        <ng-content select=\"p-header\"></ng-content>\n      </div>\n      <div class=\"ui-widget-header ui-corner-all ui-listbox-header ui-helper-clearfix\" *ngIf=\"(checkbox && multiple && showToggleAll) || filter\" [ngClass]=\"{'ui-listbox-header-w-checkbox': checkbox}\">\n        <div class=\"ui-chkbox ui-widget\" *ngIf=\"checkbox && multiple && showToggleAll\">\n          <div class=\"ui-helper-hidden-accessible\">\n            <input type=\"checkbox\" readonly=\"readonly\" [checked]=\"allChecked\" (focus)=\"onHeaderCheckboxFocus()\" (blur)=\"onHeaderCheckboxBlur()\" (keydown.space)=\"toggleAll($event)\">\n          </div>\n          <div #headerchkbox class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" [ngClass]=\"{'ui-state-active': allChecked, 'ui-state-focus': headerCheckboxFocus}\" (click)=\"toggleAll($event)\">\n            <span class=\"ui-chkbox-icon ui-clickable\" [ngClass]=\"{'pi pi-check':allChecked}\"></span>\n          </div>\n        </div>\n        <div class=\"ui-listbox-filter-container\" *ngIf=\"filter\">\n          <input type=\"text\" [value]=\"filterValue||''\" (input)=\"onFilter($event)\" class=\"ui-inputtext ui-widget ui-state-default ui-corner-all\" [disabled]=\"disabled\" [attr.placeholder]=\"filterPlaceHolder\" [attr.aria-label]=\"ariaFilterLabel\">\n          <span class=\"ui-listbox-filter-icon pi pi-search\"></span>\n        </div>\n      </div>\n      <div class=\"ui-listbox-list-wrapper\" [ngStyle]=\"listStyle\">\n        <ul class=\"ui-listbox-list\" role=\"listbox\" aria-multiselectable=\"multiple\">\n          <li *ngFor=\"let option of options; let i = index;\" [style.display]=\"isItemVisible(option) ? 'block' : 'none'\" [attr.tabindex]=\"option.disabled ? null : '0'\"\n              [ngClass]=\"{'ui-listbox-item ui-corner-all':true,'ui-state-highlight':isSelected(option), 'ui-state-disabled': option.disabled}\" role=\"option\" [attr.aria-label]=\"option.label\"\n              [attr.aria-selected]=\"isSelected(option)\" (click)=\"onOptionClick($event,option)\" (dblclick)=\"onOptionDoubleClick($event,option)\" (touchend)=\"onOptionTouchEnd($event,option)\" (keydown)=\"onOptionKeyDown($event,option)\">\n            <div class=\"ui-chkbox ui-widget\" *ngIf=\"checkbox && multiple\">\n              <div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" [ngClass]=\"{'ui-state-active':isSelected(option)}\">\n                <span class=\"ui-chkbox-icon ui-clickable\" [ngClass]=\"{'pi pi-check':isSelected(option)}\"></span>\n              </div>\n            </div>\n            <span *ngIf=\"!itemTemplate\">{{option.label}}</span>\n            <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: option, index: i}\"></ng-container>\n          </li>\n        </ul>\n      </div>\n      <div class=\"ui-listbox-footer ui-widget-header ui-corner-all\" *ngIf=\"footerFacet\">\n        <ng-content select=\"p-footer\"></ng-content>\n      </div>\n    </div>\n  ",
            providers: [LISTBOX_VALUE_ACCESSOR],
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], Listbox);
    return Listbox;
}());
export { Listbox };
var ListboxModule = /** @class */ (function () {
    function ListboxModule() {
    }
    ListboxModule = __decorate([
        NgModule({
            imports: [CommonModule, SharedModule],
            exports: [Listbox, SharedModule],
            declarations: [Listbox]
        })
    ], ListboxModule);
    return ListboxModule;
}());
export { ListboxModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdGJveC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvbGlzdGJveC8iLCJzb3VyY2VzIjpbImxpc3Rib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUMsVUFBVSxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4TyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFFLGlCQUFpQixFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFNUMsTUFBTSxDQUFDLElBQU0sc0JBQXNCLEdBQVE7SUFDdkMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxPQUFPLEVBQVAsQ0FBTyxDQUFDO0lBQ3RDLEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQWlERjtJQXNFSSxpQkFBbUIsRUFBYyxFQUFTLEVBQXFCO1FBQTVDLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBUyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQXhEdEQsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUUxQixXQUFNLEdBQVksS0FBSyxDQUFDO1FBRXhCLGVBQVUsR0FBVyxVQUFVLENBQUM7UUFJaEMscUJBQWdCLEdBQVksSUFBSSxDQUFDO1FBSWpDLGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBUTdCLGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVqRCxZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFaEQsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBa0J0RCxrQkFBYSxHQUFhLGNBQVEsQ0FBQyxDQUFDO1FBRXBDLG1CQUFjLEdBQWEsY0FBUSxDQUFDLENBQUM7UUFVckMsNEJBQXVCLEdBQWlCLEVBQUUsQ0FBQztJQUVpQixDQUFDO0lBRTNELHNCQUFJLDRCQUFPO2FBQVg7WUFDTCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzthQUVELFVBQVksR0FBVTtZQUNsQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQzNGLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLENBQUM7OztPQUxBO0lBT1Esc0JBQUksZ0NBQVc7YUFBZjtZQUNMLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztRQUM3QixDQUFDO2FBRUQsVUFBZ0IsR0FBVztZQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztRQUM1QixDQUFDOzs7T0FKQTtJQU1ELG9DQUFrQixHQUFsQjtRQUFBLGlCQVlDO1FBWEcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO1lBQ3hCLFFBQVEsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNwQixLQUFLLE1BQU07b0JBQ1AsS0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUNsQyxNQUFNO2dCQUVWO29CQUNJLEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDbEMsTUFBTTthQUNiO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsNEJBQVUsR0FBVixVQUFXLEtBQVU7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsa0NBQWdCLEdBQWhCLFVBQWlCLEVBQVk7UUFDekIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELG1DQUFpQixHQUFqQixVQUFrQixFQUFZO1FBQzFCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxrQ0FBZ0IsR0FBaEIsVUFBaUIsR0FBWTtRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztJQUN4QixDQUFDO0lBRUQsK0JBQWEsR0FBYixVQUFjLEtBQUssRUFBRSxNQUFNO1FBQ3ZCLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbkQsT0FBTztTQUNWO1FBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxJQUFJLENBQUMsUUFBUTtnQkFDYixJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDOztnQkFFMUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNqRDthQUNJO1lBQ0QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztTQUMzQztRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ2QsYUFBYSxFQUFFLEtBQUs7WUFDcEIsTUFBTSxFQUFFLE1BQU07WUFDZCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDcEIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7SUFDL0IsQ0FBQztJQUVELGtDQUFnQixHQUFoQixVQUFpQixLQUFLLEVBQUUsTUFBTTtRQUMxQixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ25ELE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0lBQzlCLENBQUM7SUFFRCxxQ0FBbUIsR0FBbkIsVUFBb0IsS0FBWSxFQUFFLE1BQWtCO1FBQ2hELElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbkQsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDakIsYUFBYSxFQUFFLEtBQUs7WUFDcEIsTUFBTSxFQUFFLE1BQU07WUFDZCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDcEIsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELHFDQUFtQixHQUFuQixVQUFvQixLQUFLLEVBQUUsTUFBTTtRQUM3QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZDLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUV2RSxJQUFJLGFBQWEsRUFBRTtZQUNmLElBQUksT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFL0MsSUFBSSxRQUFRLEVBQUU7Z0JBQ1YsSUFBSSxPQUFPLEVBQUU7b0JBQ1QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7b0JBQ2xCLFlBQVksR0FBRyxJQUFJLENBQUM7aUJBQ3ZCO2FBQ0o7aUJBQ0k7Z0JBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUMxQixZQUFZLEdBQUcsSUFBSSxDQUFDO2FBQ3ZCO1NBQ0o7YUFDSTtZQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDNUMsWUFBWSxHQUFHLElBQUksQ0FBQztTQUN2QjtRQUVELElBQUksWUFBWSxFQUFFO1lBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7Z0JBQ2YsYUFBYSxFQUFFLEtBQUs7Z0JBQ3BCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSzthQUNwQixDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFFRCx1Q0FBcUIsR0FBckIsVUFBc0IsS0FBSyxFQUFFLE1BQU07UUFDL0IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QyxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFFdkUsSUFBSSxhQUFhLEVBQUU7WUFDZixJQUFJLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRS9DLElBQUksUUFBUSxFQUFFO2dCQUNWLElBQUksT0FBTyxFQUFFO29CQUNULElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQzdCO3FCQUNJO29CQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQy9CO2dCQUNELFlBQVksR0FBRyxJQUFJLENBQUM7YUFDdkI7aUJBQ0k7Z0JBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUMvQyxJQUFJLENBQUMsS0FBSyxZQUFPLElBQUksQ0FBQyxLQUFLLEdBQUUsTUFBTSxDQUFDLEtBQUssRUFBQyxDQUFDO2dCQUMzQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2FBQ3ZCO1NBQ0o7YUFDSTtZQUNELElBQUksUUFBUSxFQUFFO2dCQUNWLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDN0I7aUJBQ0k7Z0JBQ0QsSUFBSSxDQUFDLEtBQUssWUFBTyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsR0FBRSxNQUFNLENBQUMsS0FBSyxFQUFDLENBQUM7YUFDcEQ7WUFFRCxZQUFZLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCO1FBRUQsSUFBSSxZQUFZLEVBQUU7WUFDZCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztnQkFDZixhQUFhLEVBQUUsS0FBSztnQkFDcEIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO2FBQ3BCLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVELHVDQUFxQixHQUFyQixVQUFzQixLQUFLLEVBQUUsTUFBTTtRQUMvQixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQyxPQUFPO1NBQ1Y7UUFFRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXZDLElBQUksUUFBUSxFQUFFO1lBQ1YsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM3QjthQUNJO1lBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDMUMsSUFBSSxDQUFDLEtBQUssWUFBTyxJQUFJLENBQUMsS0FBSyxHQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUMsQ0FBQztTQUM5QztRQUVELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ2YsYUFBYSxFQUFFLEtBQUs7WUFDcEIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1NBQ3BCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCw4QkFBWSxHQUFaLFVBQWEsTUFBVztRQUF4QixpQkFFQztRQURHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUFwRCxDQUFvRCxDQUFDLENBQUM7SUFDaEcsQ0FBQztJQUVELDRCQUFVLEdBQVYsVUFBVyxNQUFrQjs7UUFDekIsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBRXJCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTs7b0JBQ1osS0FBZ0IsSUFBQSxLQUFBLFNBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQSxnQkFBQSw0QkFBRTt3QkFBdkIsSUFBSSxHQUFHLFdBQUE7d0JBQ1IsSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTs0QkFDckQsUUFBUSxHQUFHLElBQUksQ0FBQzs0QkFDaEIsTUFBTTt5QkFDVDtxQkFDSjs7Ozs7Ozs7O2FBQ0o7U0FDSjthQUNJO1lBQ0QsUUFBUSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN6RTtRQUVELE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxzQkFBSSwrQkFBVTthQUFkO1lBQ0ksSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNsQixPQUFPLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQ3JDO2lCQUNJO2dCQUNELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2dCQUMvQyxJQUFJLDJCQUEyQixHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUM7Z0JBRXRFLE9BQU8sSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLFdBQVcsR0FBRywyQkFBMkIsQ0FBQyxDQUFDO2FBQ2xJO1FBQ0wsQ0FBQzs7O09BQUE7SUFFRCx1Q0FBcUIsR0FBckI7O1FBQ0ksSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDOztnQkFDZCxLQUFnQixJQUFBLEtBQUEsU0FBQSxJQUFJLENBQUMsT0FBTyxDQUFBLGdCQUFBLDRCQUFFO29CQUF6QixJQUFJLEdBQUcsV0FBQTtvQkFDUixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRTt3QkFDZixLQUFLLEVBQUUsQ0FBQztxQkFDWDtpQkFDSjs7Ozs7Ozs7O1lBRUQsT0FBTyxLQUFLLENBQUM7U0FDaEI7YUFDSTtZQUNELE9BQU8sQ0FBQyxDQUFDO1NBQ1o7SUFDTCxDQUFDO0lBRUQscUNBQW1CLEdBQW5COztRQUNJLElBQUksV0FBb0IsQ0FBQztRQUN6QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUUxRSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUc7WUFDMUMsV0FBVyxHQUFHLElBQUksQ0FBQzs7Z0JBQ25CLEtBQWdCLElBQUEsS0FBQSxTQUFBLElBQUksQ0FBQyxPQUFPLENBQUEsZ0JBQUEsNEJBQUU7b0JBQXpCLElBQUksR0FBRyxXQUFBO29CQUNSLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7NEJBQ3ZCLFdBQVcsR0FBRyxLQUFLLENBQUM7NEJBQ3BCLE1BQU07eUJBQ1Q7cUJBQ0o7aUJBQ0o7Ozs7Ozs7OztTQUNKO1FBRUQsT0FBTyxXQUFXLENBQUM7SUFDdkIsQ0FBQztJQUVELDBCQUFRLEdBQVIsVUFBUyxLQUFLO1FBQ1YsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUMzQyxDQUFDO0lBRUQsMkJBQVMsR0FBVCxVQUFVLEtBQUs7UUFDWCxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzlFLE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixJQUFJLElBQUksQ0FBQyx1QkFBdUIsSUFBSSxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDekUsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUNmLEtBQUssWUFBTyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztnQkFDMUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7YUFDdEI7aUJBQ0k7Z0JBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7YUFDbkI7U0FDSjthQUNJO1lBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNkLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUNoQixJQUFJLElBQUksQ0FBQyx1QkFBdUIsSUFBSSxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDekUsSUFBSSxDQUFDLEtBQUssWUFBTyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztpQkFDbEQ7Z0JBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUMxQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxQixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO3dCQUMxQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQzlCO2lCQUNKO2FBQ0o7U0FDSjtRQUVELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDaEUsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCwrQkFBYSxHQUFiLFVBQWMsTUFBa0I7UUFDNUIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLElBQUksT0FBTyxTQUFBLENBQUM7WUFFWixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ2pCLE9BQU8sR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDN0Y7aUJBQ0k7Z0JBQ0QsT0FBTyxHQUFHLElBQUksQ0FBQzthQUNsQjtZQUVELE9BQU8sT0FBTyxDQUFDO1NBQ2xCO2FBQ0k7WUFDRCxPQUFPLElBQUksQ0FBQztTQUNmO0lBQ0wsQ0FBQztJQUVELDhCQUFZLEdBQVosVUFBYSxLQUFLO1FBQ2QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVELDZCQUFXLEdBQVgsVUFBWSxLQUFLO1FBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUVELGlDQUFlLEdBQWYsVUFBZ0IsS0FBbUIsRUFBRSxNQUFNO1FBQ3ZDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxHQUFtQixLQUFLLENBQUMsYUFBYSxDQUFDO1FBRS9DLFFBQU8sS0FBSyxDQUFDLEtBQUssRUFBRTtZQUNoQixNQUFNO1lBQ04sS0FBSyxFQUFFO2dCQUNILElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksUUFBUSxFQUFFO29CQUNWLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFDcEI7Z0JBRUQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUMzQixNQUFNO1lBRU4sSUFBSTtZQUNKLEtBQUssRUFBRTtnQkFDSCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLFFBQVEsRUFBRTtvQkFDVixRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ3BCO2dCQUVELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDM0IsTUFBTTtZQUVOLE9BQU87WUFDUCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ2xDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDM0IsTUFBTTtTQUNUO0lBQ0wsQ0FBQztJQUVELDhCQUFZLEdBQVosVUFBYSxJQUFJO1FBQ2IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBRXZDLElBQUksUUFBUTtZQUNSLE9BQU8sVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsbUJBQW1CLENBQUMsSUFBSSxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7O1lBRXBJLE9BQU8sSUFBSSxDQUFDO0lBQ3BCLENBQUM7SUFFRCw4QkFBWSxHQUFaLFVBQWEsSUFBSTtRQUNiLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztRQUUzQyxJQUFJLFFBQVE7WUFDUixPQUFPLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLG1CQUFtQixDQUFDLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDOztZQUVwSSxPQUFPLElBQUksQ0FBQztJQUNwQixDQUFDO0lBRUQsb0NBQWtCLEdBQWxCO1FBQ0ksSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNsQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzFDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUU7b0JBQzFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQzdCO2FBQ0o7WUFDRCxPQUFPLGVBQWUsQ0FBQztTQUMxQjthQUNJO1lBQ0QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQztJQUVELHVDQUFxQixHQUFyQjtRQUNJLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7SUFDcEMsQ0FBQztJQUVELHNDQUFvQixHQUFwQjtRQUNJLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7SUFDckMsQ0FBQztJQUVELDRDQUEwQixHQUExQjs7UUFDSSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxJQUFJLENBQUMsdUJBQXVCLEdBQUcsRUFBRSxDQUFDO1lBQ2xDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTs7b0JBQ1osS0FBZ0IsSUFBQSxLQUFBLFNBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQSxnQkFBQSw0QkFBRTt3QkFBekIsSUFBSSxHQUFHLFdBQUE7d0JBQ1IsSUFBSSxHQUFHLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7NEJBQ3RDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO3lCQUNoRDtxQkFDSjs7Ozs7Ozs7O2FBQ0o7U0FDSjtJQUNMLENBQUM7O2dCQWphc0IsVUFBVTtnQkFBYSxpQkFBaUI7O0lBcEV0RDtRQUFSLEtBQUssRUFBRTs2Q0FBbUI7SUFFbEI7UUFBUixLQUFLLEVBQUU7MENBQVk7SUFFWDtRQUFSLEtBQUssRUFBRTsrQ0FBb0I7SUFFbkI7UUFBUixLQUFLLEVBQUU7OENBQWdCO0lBRWY7UUFBUixLQUFLLEVBQUU7NkNBQW1CO0lBRWxCO1FBQVIsS0FBSyxFQUFFOzZDQUFtQjtJQUVsQjtRQUFSLEtBQUssRUFBRTs2Q0FBMkI7SUFFMUI7UUFBUixLQUFLLEVBQUU7MkNBQXlCO0lBRXhCO1FBQVIsS0FBSyxFQUFFOytDQUFpQztJQUVoQztRQUFSLEtBQUssRUFBRTtpREFBc0I7SUFFckI7UUFBUixLQUFLLEVBQUU7cURBQWtDO0lBRWpDO1FBQVIsS0FBSyxFQUFFOzRDQUFpQjtJQUVoQjtRQUFSLEtBQUssRUFBRTtrREFBK0I7SUFFOUI7UUFBUixLQUFLLEVBQUU7Z0RBQXFCO0lBRXBCO1FBQVIsS0FBSyxFQUFFO29EQUF5QjtJQUV4QjtRQUFSLEtBQUssRUFBRTtzREFBMkI7SUFFekI7UUFBVCxNQUFNLEVBQUU7NkNBQWtEO0lBRWpEO1FBQVQsTUFBTSxFQUFFOzRDQUFpRDtJQUVoRDtRQUFULE1BQU0sRUFBRTsrQ0FBb0Q7SUFFbEM7UUFBMUIsU0FBUyxDQUFDLGNBQWMsQ0FBQzs0REFBcUM7SUFFekM7UUFBckIsWUFBWSxDQUFDLE1BQU0sQ0FBQztnREFBYTtJQUVaO1FBQXJCLFlBQVksQ0FBQyxNQUFNLENBQUM7Z0RBQWE7SUFFRjtRQUEvQixlQUFlLENBQUMsYUFBYSxDQUFDOzhDQUEyQjtJQTBCakQ7UUFBUixLQUFLLEVBQUU7MENBRVA7SUFPUTtRQUFSLEtBQUssRUFBRTs4Q0FFUDtJQW5GUSxPQUFPO1FBL0NuQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsV0FBVztZQUNyQixRQUFRLEVBQUUsaTVHQXlDWDtZQUNDLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1lBQ25DLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO1NBQ25ELENBQUM7T0FDVyxPQUFPLENBd2VuQjtJQUFELGNBQUM7Q0FBQSxBQXhlRCxJQXdlQztTQXhlWSxPQUFPO0FBK2VwQjtJQUFBO0lBQTZCLENBQUM7SUFBakIsYUFBYTtRQUx6QixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDO1lBQ3JDLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUM7WUFDaEMsWUFBWSxFQUFFLENBQUMsT0FBTyxDQUFDO1NBQzFCLENBQUM7T0FDVyxhQUFhLENBQUk7SUFBRCxvQkFBQztDQUFBLEFBQTlCLElBQThCO1NBQWpCLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEFmdGVyQ29udGVudEluaXQsIENvbnRlbnRDaGlsZHJlbiwgQ29udGVudENoaWxkLCBRdWVyeUxpc3QsIFRlbXBsYXRlUmVmLGZvcndhcmRSZWYsIENoYW5nZURldGVjdG9yUmVmLCBWaWV3Q2hpbGQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFNlbGVjdEl0ZW0gfSBmcm9tICdwcmltZW5nL2FwaSc7XHJcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSwgUHJpbWVUZW1wbGF0ZSwgRm9vdGVyLCBIZWFkZXIgfSBmcm9tICdwcmltZW5nL2FwaSc7XHJcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XHJcbmltcG9ydCB7IE9iamVjdFV0aWxzIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XHJcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRmlsdGVyVXRpbHMgfSBmcm9tICdwcmltZW5nL3V0aWxzJztcclxuXHJcbmV4cG9ydCBjb25zdCBMSVNUQk9YX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IExpc3Rib3gpLFxyXG4gICAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLWxpc3Rib3gnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgIDxkaXYgW25nQ2xhc3NdPVwieyd1aS1saXN0Ym94IHVpLWlucHV0dGV4dCB1aS13aWRnZXQgdWktd2lkZ2V0LWNvbnRlbnQgdWktY29ybmVyLWFsbCc6dHJ1ZSwndWktc3RhdGUtZGlzYWJsZWQnOmRpc2FibGVkLCd1aS1zdGF0ZS1mb2N1cyc6Zm9jdXN9XCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwidWktaGVscGVyLWhpZGRlbi1hY2Nlc3NpYmxlXCI+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcmVhZG9ubHk9XCJyZWFkb25seVwiIChmb2N1cyk9XCJvbklucHV0Rm9jdXMoJGV2ZW50KVwiIChibHVyKT1cIm9uSW5wdXRCbHVyKCRldmVudClcIj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJ1aS13aWRnZXQtaGVhZGVyIHVpLWNvcm5lci1hbGwgdWktbGlzdGJveC1oZWFkZXIgdWktaGVscGVyLWNsZWFyZml4XCIgKm5nSWY9XCJoZWFkZXJGYWNldFwiPlxyXG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtaGVhZGVyXCI+PC9uZy1jb250ZW50PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cInVpLXdpZGdldC1oZWFkZXIgdWktY29ybmVyLWFsbCB1aS1saXN0Ym94LWhlYWRlciB1aS1oZWxwZXItY2xlYXJmaXhcIiAqbmdJZj1cIihjaGVja2JveCAmJiBtdWx0aXBsZSAmJiBzaG93VG9nZ2xlQWxsKSB8fCBmaWx0ZXJcIiBbbmdDbGFzc109XCJ7J3VpLWxpc3Rib3gtaGVhZGVyLXctY2hlY2tib3gnOiBjaGVja2JveH1cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwidWktY2hrYm94IHVpLXdpZGdldFwiICpuZ0lmPVwiY2hlY2tib3ggJiYgbXVsdGlwbGUgJiYgc2hvd1RvZ2dsZUFsbFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWhlbHBlci1oaWRkZW4tYWNjZXNzaWJsZVwiPlxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgcmVhZG9ubHk9XCJyZWFkb25seVwiIFtjaGVja2VkXT1cImFsbENoZWNrZWRcIiAoZm9jdXMpPVwib25IZWFkZXJDaGVja2JveEZvY3VzKClcIiAoYmx1cik9XCJvbkhlYWRlckNoZWNrYm94Qmx1cigpXCIgKGtleWRvd24uc3BhY2UpPVwidG9nZ2xlQWxsKCRldmVudClcIj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiAjaGVhZGVyY2hrYm94IGNsYXNzPVwidWktY2hrYm94LWJveCB1aS13aWRnZXQgdWktY29ybmVyLWFsbCB1aS1zdGF0ZS1kZWZhdWx0XCIgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1hY3RpdmUnOiBhbGxDaGVja2VkLCAndWktc3RhdGUtZm9jdXMnOiBoZWFkZXJDaGVja2JveEZvY3VzfVwiIChjbGljayk9XCJ0b2dnbGVBbGwoJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWNoa2JveC1pY29uIHVpLWNsaWNrYWJsZVwiIFtuZ0NsYXNzXT1cInsncGkgcGktY2hlY2snOmFsbENoZWNrZWR9XCI+PC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInVpLWxpc3Rib3gtZmlsdGVyLWNvbnRhaW5lclwiICpuZ0lmPVwiZmlsdGVyXCI+XHJcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBbdmFsdWVdPVwiZmlsdGVyVmFsdWV8fCcnXCIgKGlucHV0KT1cIm9uRmlsdGVyKCRldmVudClcIiBjbGFzcz1cInVpLWlucHV0dGV4dCB1aS13aWRnZXQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgW2F0dHIucGxhY2Vob2xkZXJdPVwiZmlsdGVyUGxhY2VIb2xkZXJcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFGaWx0ZXJMYWJlbFwiPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1saXN0Ym94LWZpbHRlci1pY29uIHBpIHBpLXNlYXJjaFwiPjwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJ1aS1saXN0Ym94LWxpc3Qtd3JhcHBlclwiIFtuZ1N0eWxlXT1cImxpc3RTdHlsZVwiPlxyXG4gICAgICAgIDx1bCBjbGFzcz1cInVpLWxpc3Rib3gtbGlzdFwiIHJvbGU9XCJsaXN0Ym94XCIgYXJpYS1tdWx0aXNlbGVjdGFibGU9XCJtdWx0aXBsZVwiPlxyXG4gICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBvcHRpb24gb2Ygb3B0aW9uczsgbGV0IGkgPSBpbmRleDtcIiBbc3R5bGUuZGlzcGxheV09XCJpc0l0ZW1WaXNpYmxlKG9wdGlvbikgPyAnYmxvY2snIDogJ25vbmUnXCIgW2F0dHIudGFiaW5kZXhdPVwib3B0aW9uLmRpc2FibGVkID8gbnVsbCA6ICcwJ1wiXHJcbiAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1saXN0Ym94LWl0ZW0gdWktY29ybmVyLWFsbCc6dHJ1ZSwndWktc3RhdGUtaGlnaGxpZ2h0Jzppc1NlbGVjdGVkKG9wdGlvbiksICd1aS1zdGF0ZS1kaXNhYmxlZCc6IG9wdGlvbi5kaXNhYmxlZH1cIiByb2xlPVwib3B0aW9uXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJvcHRpb24ubGFiZWxcIlxyXG4gICAgICAgICAgICAgIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwiaXNTZWxlY3RlZChvcHRpb24pXCIgKGNsaWNrKT1cIm9uT3B0aW9uQ2xpY2soJGV2ZW50LG9wdGlvbilcIiAoZGJsY2xpY2spPVwib25PcHRpb25Eb3VibGVDbGljaygkZXZlbnQsb3B0aW9uKVwiICh0b3VjaGVuZCk9XCJvbk9wdGlvblRvdWNoRW5kKCRldmVudCxvcHRpb24pXCIgKGtleWRvd24pPVwib25PcHRpb25LZXlEb3duKCRldmVudCxvcHRpb24pXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1jaGtib3ggdWktd2lkZ2V0XCIgKm5nSWY9XCJjaGVja2JveCAmJiBtdWx0aXBsZVwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1jaGtib3gtYm94IHVpLXdpZGdldCB1aS1jb3JuZXItYWxsIHVpLXN0YXRlLWRlZmF1bHRcIiBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWFjdGl2ZSc6aXNTZWxlY3RlZChvcHRpb24pfVwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1jaGtib3gtaWNvbiB1aS1jbGlja2FibGVcIiBbbmdDbGFzc109XCJ7J3BpIHBpLWNoZWNrJzppc1NlbGVjdGVkKG9wdGlvbil9XCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhaXRlbVRlbXBsYXRlXCI+e3tvcHRpb24ubGFiZWx9fTwvc3Bhbj5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogb3B0aW9uLCBpbmRleDogaX1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgPC91bD5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJ1aS1saXN0Ym94LWZvb3RlciB1aS13aWRnZXQtaGVhZGVyIHVpLWNvcm5lci1hbGxcIiAqbmdJZj1cImZvb3RlckZhY2V0XCI+XHJcbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwicC1mb290ZXJcIj48L25nLWNvbnRlbnQ+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgYCxcclxuICAgIHByb3ZpZGVyczogW0xJU1RCT1hfVkFMVUVfQUNDRVNTT1JdLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMaXN0Ym94IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG5cclxuICAgIEBJbnB1dCgpIG11bHRpcGxlOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGxpc3RTdHlsZTogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIHJlYWRvbmx5OiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIGNoZWNrYm94OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgQElucHV0KCkgZmlsdGVyOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgQElucHV0KCkgZmlsdGVyTW9kZTogc3RyaW5nID0gJ2NvbnRhaW5zJztcclxuXHJcbiAgICBASW5wdXQoKSBmaWx0ZXJMb2NhbGU6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBtZXRhS2V5U2VsZWN0aW9uOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBASW5wdXQoKSBkYXRhS2V5OiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgc2hvd1RvZ2dsZUFsbDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgQElucHV0KCkgb3B0aW9uTGFiZWw6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBhcmlhRmlsdGVyTGFiZWw6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBmaWx0ZXJQbGFjZUhvbGRlcjogc3RyaW5nO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkRibENsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAVmlld0NoaWxkKCdoZWFkZXJjaGtib3gnKSBoZWFkZXJDaGVja2JveFZpZXdDaGlsZDogRWxlbWVudFJlZjtcclxuXHJcbiAgICBAQ29udGVudENoaWxkKEhlYWRlcikgaGVhZGVyRmFjZXQ7XHJcblxyXG4gICAgQENvbnRlbnRDaGlsZChGb290ZXIpIGZvb3RlckZhY2V0O1xyXG5cclxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8YW55PjtcclxuXHJcbiAgICBwdWJsaWMgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAgIHB1YmxpYyBfZmlsdGVyVmFsdWU6IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgZmlsdGVyZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgcHVibGljIHZhbHVlOiBhbnk7XHJcblxyXG4gICAgcHVibGljIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4geyB9O1xyXG5cclxuICAgIHB1YmxpYyBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7IH07XHJcblxyXG4gICAgcHVibGljIG9wdGlvblRvdWNoZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgcHVibGljIGZvY3VzOiBib29sZWFuO1xyXG5cclxuICAgIHB1YmxpYyBfb3B0aW9uczogYW55W107XHJcblxyXG4gICAgcHVibGljIGhlYWRlckNoZWNrYm94Rm9jdXM6IGJvb2xlYW47XHJcblxyXG4gICAgcHVibGljIGRpc2FibGVkU2VsZWN0ZWRPcHRpb25zOiBTZWxlY3RJdGVtW10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHsgfVxyXG5cclxuICAgIEBJbnB1dCgpIGdldCBvcHRpb25zKCk6IGFueVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgb3B0aW9ucyh2YWw6IGFueVtdKSB7XHJcbiAgICAgICAgbGV0IG9wdHMgPSB0aGlzLm9wdGlvbkxhYmVsID8gT2JqZWN0VXRpbHMuZ2VuZXJhdGVTZWxlY3RJdGVtcyh2YWwsIHRoaXMub3B0aW9uTGFiZWwpIDogdmFsO1xyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBvcHRzO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIGdldCBmaWx0ZXJWYWx1ZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXJWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgZmlsdGVyVmFsdWUodmFsOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9maWx0ZXJWYWx1ZSA9IHZhbDtcclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdpdGVtJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZXREaXNhYmxlZFNlbGVjdGVkT3B0aW9ucygpO1xyXG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGlzYWJsZWRTdGF0ZSh2YWw6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVkID0gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIG9uT3B0aW9uQ2xpY2soZXZlbnQsIG9wdGlvbikge1xyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IG9wdGlvbi5kaXNhYmxlZCB8fCB0aGlzLnJlYWRvbmx5KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrYm94KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk9wdGlvbkNsaWNrQ2hlY2tib3goZXZlbnQsIG9wdGlvbik7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMub25PcHRpb25DbGlja011bHRpcGxlKGV2ZW50LCBvcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5vbk9wdGlvbkNsaWNrU2luZ2xlKGV2ZW50LCBvcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm9uQ2xpY2suZW1pdCh7XHJcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgICAgICBvcHRpb246IG9wdGlvbixcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWVcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm9wdGlvblRvdWNoZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvbk9wdGlvblRvdWNoRW5kKGV2ZW50LCBvcHRpb24pIHtcclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCBvcHRpb24uZGlzYWJsZWQgfHwgdGhpcy5yZWFkb25seSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm9wdGlvblRvdWNoZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uT3B0aW9uRG91YmxlQ2xpY2soZXZlbnQ6IEV2ZW50LCBvcHRpb246IFNlbGVjdEl0ZW0pOiBhbnkge1xyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IG9wdGlvbi5kaXNhYmxlZCB8fCB0aGlzLnJlYWRvbmx5KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMub25EYmxDbGljay5lbWl0KHtcclxuICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXHJcbiAgICAgICAgICAgIG9wdGlvbjogb3B0aW9uLFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25PcHRpb25DbGlja1NpbmdsZShldmVudCwgb3B0aW9uKSB7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5pc1NlbGVjdGVkKG9wdGlvbik7XHJcbiAgICAgICAgbGV0IHZhbHVlQ2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBtZXRhU2VsZWN0aW9uID0gdGhpcy5vcHRpb25Ub3VjaGVkID8gZmFsc2UgOiB0aGlzLm1ldGFLZXlTZWxlY3Rpb247XHJcblxyXG4gICAgICAgIGlmIChtZXRhU2VsZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRhS2V5ID0gKGV2ZW50Lm1ldGFLZXkgfHwgZXZlbnQuY3RybEtleSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChtZXRhS2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBvcHRpb24udmFsdWU7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZUNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gc2VsZWN0ZWQgPyBudWxsIDogb3B0aW9uLnZhbHVlO1xyXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHZhbHVlQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7XHJcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbk9wdGlvbkNsaWNrTXVsdGlwbGUoZXZlbnQsIG9wdGlvbikge1xyXG4gICAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMuaXNTZWxlY3RlZChvcHRpb24pO1xyXG4gICAgICAgIGxldCB2YWx1ZUNoYW5nZWQgPSBmYWxzZTtcclxuICAgICAgICBsZXQgbWV0YVNlbGVjdGlvbiA9IHRoaXMub3B0aW9uVG91Y2hlZCA/IGZhbHNlIDogdGhpcy5tZXRhS2V5U2VsZWN0aW9uO1xyXG5cclxuICAgICAgICBpZiAobWV0YVNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICBsZXQgbWV0YUtleSA9IChldmVudC5tZXRhS2V5IHx8IGV2ZW50LmN0cmxLZXkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobWV0YUtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlT3B0aW9uKG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gW29wdGlvbi52YWx1ZV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YWx1ZUNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IChtZXRhS2V5KSA/IHRoaXMudmFsdWUgfHwgW10gOiBbXTtcclxuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBbLi4udGhpcy52YWx1ZSwgb3B0aW9uLnZhbHVlXTtcclxuICAgICAgICAgICAgICAgIHZhbHVlQ2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVPcHRpb24ob3B0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBbLi4udGhpcy52YWx1ZSB8fCBbXSwgb3B0aW9uLnZhbHVlXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZUNoYW5nZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMudmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25PcHRpb25DbGlja0NoZWNrYm94KGV2ZW50LCBvcHRpb24pIHtcclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLnJlYWRvbmx5KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMuaXNTZWxlY3RlZChvcHRpb24pO1xyXG5cclxuICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVPcHRpb24ob3B0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnZhbHVlID8gdGhpcy52YWx1ZSA6IFtdO1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gWy4uLnRoaXMudmFsdWUsIG9wdGlvbi52YWx1ZV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHtcclxuICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlT3B0aW9uKG9wdGlvbjogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWUuZmlsdGVyKHZhbCA9PiAhT2JqZWN0VXRpbHMuZXF1YWxzKHZhbCwgb3B0aW9uLnZhbHVlLCB0aGlzLmRhdGFLZXkpKTtcclxuICAgIH1cclxuXHJcbiAgICBpc1NlbGVjdGVkKG9wdGlvbjogU2VsZWN0SXRlbSkge1xyXG4gICAgICAgIGxldCBzZWxlY3RlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgdmFsIG9mIHRoaXMudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0VXRpbHMuZXF1YWxzKHZhbCwgb3B0aW9uLnZhbHVlLCB0aGlzLmRhdGFLZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzZWxlY3RlZCA9IE9iamVjdFV0aWxzLmVxdWFscyh0aGlzLnZhbHVlLCBvcHRpb24udmFsdWUsIHRoaXMuZGF0YUtleSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2VsZWN0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGFsbENoZWNrZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyVmFsdWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWxsRmlsdGVyZWRTZWxlY3RlZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IG9wdGlvbkNvdW50ID0gdGhpcy5nZXRFbmFibGVkT3B0aW9uQ291bnQoKTtcclxuICAgICAgICAgICAgbGV0IGRpc2FibGVkU2VsZWN0ZWRPcHRpb25Db3VudCA9IHRoaXMuZGlzYWJsZWRTZWxlY3RlZE9wdGlvbnMubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUgJiYgdGhpcy5vcHRpb25zICYmICh0aGlzLnZhbHVlLmxlbmd0aCA+IDAgJiYgdGhpcy52YWx1ZS5sZW5ndGggPT0gb3B0aW9uQ291bnQgKyBkaXNhYmxlZFNlbGVjdGVkT3B0aW9uQ291bnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRFbmFibGVkT3B0aW9uQ291bnQoKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG9wdCBvZiB0aGlzLm9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIGlmICghb3B0LmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGNvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFsbEZpbHRlcmVkU2VsZWN0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGFsbFNlbGVjdGVkOiBib29sZWFuO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gdGhpcy5maWx0ZXJWYWx1ZSA/IHRoaXMuZ2V0RmlsdGVyZWRPcHRpb25zKCkgOiB0aGlzLm9wdGlvbnM7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnZhbHVlICYmIG9wdGlvbnMgJiYgb3B0aW9ucy5sZW5ndGgpIMKge1xyXG4gICAgICAgICAgICBhbGxTZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG9wdCBvZiB0aGlzLm9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzSXRlbVZpc2libGUob3B0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1NlbGVjdGVkKG9wdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxsU2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYWxsU2VsZWN0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgb25GaWx0ZXIoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLl9maWx0ZXJWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVBbGwoZXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLnJlYWRvbmx5IHx8ICF0aGlzLm9wdGlvbnMgfHwgdGhpcy5vcHRpb25zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5hbGxDaGVja2VkKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRpc2FibGVkU2VsZWN0ZWRPcHRpb25zICYmIHRoaXMuZGlzYWJsZWRTZWxlY3RlZE9wdGlvbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gW107XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IFsuLi50aGlzLmRpc2FibGVkU2VsZWN0ZWRPcHRpb25zXTtcclxuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWRTZWxlY3RlZE9wdGlvbnMgJiYgdGhpcy5kaXNhYmxlZFNlbGVjdGVkT3B0aW9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IFsuLi50aGlzLmRpc2FibGVkU2VsZWN0ZWRPcHRpb25zXTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMub3B0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvcHQgPSB0aGlzLm9wdGlvbnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNJdGVtVmlzaWJsZShvcHQpICYmICFvcHQuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZS5wdXNoKG9wdC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIHZhbHVlOiB0aGlzLnZhbHVlIH0pO1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNJdGVtVmlzaWJsZShvcHRpb246IFNlbGVjdEl0ZW0pOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5maWx0ZXJWYWx1ZSkge1xyXG4gICAgICAgICAgICBsZXQgdmlzaWJsZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlck1vZGUpIHtcclxuICAgICAgICAgICAgICAgIHZpc2libGUgPSBGaWx0ZXJVdGlsc1t0aGlzLmZpbHRlck1vZGVdKG9wdGlvbi5sYWJlbCwgdGhpcy5maWx0ZXJWYWx1ZSwgdGhpcy5maWx0ZXJMb2NhbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB2aXNpYmxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uSW5wdXRGb2N1cyhldmVudCkge1xyXG4gICAgICAgIHRoaXMuZm9jdXMgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uSW5wdXRCbHVyKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5mb2N1cyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uT3B0aW9uS2V5RG93bihldmVudDpLZXlib2FyZEV2ZW50LCBvcHRpb24pIHtcclxuICAgICAgICBpZiAodGhpcy5yZWFkb25seSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaXRlbSA9IDxIVE1MTElFbGVtZW50PiBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG5cclxuICAgICAgICBzd2l0Y2goZXZlbnQud2hpY2gpIHtcclxuICAgICAgICAgICAgLy9kb3duXHJcbiAgICAgICAgICAgIGNhc2UgNDA6XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV4dEl0ZW0gPSB0aGlzLmZpbmROZXh0SXRlbShpdGVtKTtcclxuICAgICAgICAgICAgICAgIGlmIChuZXh0SXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRJdGVtLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAvL3VwXHJcbiAgICAgICAgICAgIGNhc2UgMzg6XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJldkl0ZW0gPSB0aGlzLmZpbmRQcmV2SXRlbShpdGVtKTtcclxuICAgICAgICAgICAgICAgIGlmIChwcmV2SXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXZJdGVtLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAvL2VudGVyXHJcbiAgICAgICAgICAgIGNhc2UgMTM6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uT3B0aW9uQ2xpY2soZXZlbnQsIG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZmluZE5leHRJdGVtKGl0ZW0pIHtcclxuICAgICAgICBsZXQgbmV4dEl0ZW0gPSBpdGVtLm5leHRFbGVtZW50U2libGluZztcclxuXHJcbiAgICAgICAgaWYgKG5leHRJdGVtKVxyXG4gICAgICAgICAgICByZXR1cm4gRG9tSGFuZGxlci5oYXNDbGFzcyhuZXh0SXRlbSwgJ3VpLXN0YXRlLWRpc2FibGVkJykgfHwgRG9tSGFuZGxlci5pc0hpZGRlbihuZXh0SXRlbSkgPyB0aGlzLmZpbmROZXh0SXRlbShuZXh0SXRlbSkgOiBuZXh0SXRlbTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmRQcmV2SXRlbShpdGVtKSB7XHJcbiAgICAgICAgbGV0IHByZXZJdGVtID0gaXRlbS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG5cclxuICAgICAgICBpZiAocHJldkl0ZW0pXHJcbiAgICAgICAgICAgIHJldHVybiBEb21IYW5kbGVyLmhhc0NsYXNzKHByZXZJdGVtLCAndWktc3RhdGUtZGlzYWJsZWQnKSB8fCBEb21IYW5kbGVyLmlzSGlkZGVuKHByZXZJdGVtKSA/IHRoaXMuZmluZFByZXZJdGVtKHByZXZJdGVtKSA6IHByZXZJdGVtO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RmlsdGVyZWRPcHRpb25zKCkge1xyXG4gICAgICAgIGxldCBmaWx0ZXJlZE9wdGlvbnMgPSBbXTtcclxuICAgICAgICBpZiAodGhpcy5maWx0ZXJWYWx1ZSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMub3B0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9wdCA9IHRoaXMub3B0aW9uc1tpXTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzSXRlbVZpc2libGUob3B0KSAmJiAhb3B0LmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRPcHRpb25zLnB1c2gob3B0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyZWRPcHRpb25zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25IZWFkZXJDaGVja2JveEZvY3VzKCkge1xyXG4gICAgICAgIHRoaXMuaGVhZGVyQ2hlY2tib3hGb2N1cyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgb25IZWFkZXJDaGVja2JveEJsdXIoKSB7XHJcbiAgICAgICAgdGhpcy5oZWFkZXJDaGVja2JveEZvY3VzID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGlzYWJsZWRTZWxlY3RlZE9wdGlvbnMoKXtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZWRTZWxlY3RlZE9wdGlvbnMgPSBbXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IG9wdCBvZiB0aGlzLm9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0LmRpc2FibGVkICYmIHRoaXMuaXNTZWxlY3RlZChvcHQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZWRTZWxlY3RlZE9wdGlvbnMucHVzaChvcHQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFNoYXJlZE1vZHVsZV0sXHJcbiAgICBleHBvcnRzOiBbTGlzdGJveCwgU2hhcmVkTW9kdWxlXSxcclxuICAgIGRlY2xhcmF0aW9uczogW0xpc3Rib3hdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMaXN0Ym94TW9kdWxlIHsgfVxyXG5cclxuIl19