var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, Component, ElementRef, Input, Output, EventEmitter, ContentChildren, ContentChild, QueryList, forwardRef, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, PrimeTemplate, Footer, Header } from '../common/shared';
import { DomHandler } from '../dom/domhandler';
import { ObjectUtils } from '../utils/objectutils';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
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
                this.value = this.value.concat([option.value]);
                valueChanged = true;
            }
        }
        else {
            if (selected) {
                this.removeOption(option);
            }
            else {
                this.value = (this.value || []).concat([option.value]);
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
            this.value = this.value.concat([option.value]);
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
        var selected = false;
        if (this.multiple) {
            if (this.value) {
                for (var _i = 0, _a = this.value; _i < _a.length; _i++) {
                    var val = _a[_i];
                    if (ObjectUtils.equals(val, option.value, this.dataKey)) {
                        selected = true;
                        break;
                    }
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
            if (this.filterValue)
                return this.allFilteredSelected();
            else
                return this.value && this.options && (this.value.length > 0 && this.value.length === this.getEnabledOptionCount());
        },
        enumerable: true,
        configurable: true
    });
    Listbox.prototype.getEnabledOptionCount = function () {
        if (this.options) {
            var count = 0;
            for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
                var opt = _a[_i];
                if (!opt.disabled) {
                    count++;
                }
            }
            return count;
        }
        else {
            return 0;
        }
    };
    Listbox.prototype.allFilteredSelected = function () {
        var allSelected;
        var options = this.filterValue ? this.getFilteredOptions() : this.options;
        if (this.value && options && options.length) {
            allSelected = true;
            for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
                var opt = _a[_i];
                if (this.isItemVisible(opt)) {
                    if (!this.isSelected(opt)) {
                        allSelected = false;
                        break;
                    }
                }
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
            this.value = [];
        }
        else {
            if (this.options) {
                this.value = [];
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
            var filterText = ObjectUtils.removeAccents(this.filterValue).toLowerCase();
            switch (this.filterMode) {
                case 'startsWith':
                    visible = ObjectUtils.removeAccents(option.label).toLowerCase().indexOf(filterText) === 0;
                    break;
                case 'contains':
                    visible = ObjectUtils.removeAccents(option.label).toLowerCase().indexOf(filterText) > -1;
                    break;
                default:
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
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Listbox.prototype, "multiple", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Listbox.prototype, "style", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Listbox.prototype, "styleClass", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Listbox.prototype, "listStyle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Listbox.prototype, "readonly", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Listbox.prototype, "disabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Listbox.prototype, "checkbox", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Listbox.prototype, "filter", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Listbox.prototype, "filterMode", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Listbox.prototype, "metaKeySelection", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Listbox.prototype, "dataKey", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Listbox.prototype, "showToggleAll", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Listbox.prototype, "optionLabel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], Listbox.prototype, "ariaFilterLabel", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], Listbox.prototype, "onChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], Listbox.prototype, "onClick", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], Listbox.prototype, "onDblClick", void 0);
    __decorate([
        ViewChild('headerchkbox'),
        __metadata("design:type", ElementRef)
    ], Listbox.prototype, "headerCheckboxViewChild", void 0);
    __decorate([
        ContentChild(Header),
        __metadata("design:type", Object)
    ], Listbox.prototype, "headerFacet", void 0);
    __decorate([
        ContentChild(Footer),
        __metadata("design:type", Object)
    ], Listbox.prototype, "footerFacet", void 0);
    __decorate([
        ContentChildren(PrimeTemplate),
        __metadata("design:type", QueryList)
    ], Listbox.prototype, "templates", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], Listbox.prototype, "options", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], Listbox.prototype, "filterValue", null);
    Listbox = __decorate([
        Component({
            selector: 'p-listbox',
            template: "\n    <div [ngClass]=\"{'ui-listbox ui-inputtext ui-widget ui-widget-content ui-corner-all':true,'ui-state-disabled':disabled,'ui-state-focus':focus}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n      <div class=\"ui-helper-hidden-accessible\">\n        <input type=\"text\" readonly=\"readonly\" (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\">\n      </div>\n      <div class=\"ui-widget-header ui-corner-all ui-listbox-header ui-helper-clearfix\" *ngIf=\"headerFacet\">\n        <ng-content select=\"p-header\"></ng-content>\n      </div>\n      <div class=\"ui-widget-header ui-corner-all ui-listbox-header ui-helper-clearfix\" *ngIf=\"(checkbox && multiple && showToggleAll) || filter\" [ngClass]=\"{'ui-listbox-header-w-checkbox': checkbox}\">\n        <div class=\"ui-chkbox ui-widget\" *ngIf=\"checkbox && multiple && showToggleAll\">\n          <div class=\"ui-helper-hidden-accessible\">\n            <input type=\"checkbox\" readonly=\"readonly\" [checked]=\"allChecked\" (focus)=\"onHeaderCheckboxFocus()\" (blur)=\"onHeaderCheckboxBlur()\" (keydown.space)=\"toggleAll($event)\">\n          </div>\n          <div #headerchkbox class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" [ngClass]=\"{'ui-state-active': allChecked, 'ui-state-focus': headerCheckboxFocus}\" (click)=\"toggleAll($event)\">\n            <span class=\"ui-chkbox-icon ui-clickable\" [ngClass]=\"{'pi pi-check':allChecked}\"></span>\n          </div>\n        </div>\n        <div class=\"ui-listbox-filter-container\" *ngIf=\"filter\">\n          <input type=\"text\" role=\"textbox\" [value]=\"filterValue||''\" (input)=\"onFilter($event)\" class=\"ui-inputtext ui-widget ui-state-default ui-corner-all\" [disabled]=\"disabled\" [attr.aria-label]=\"ariaFilterLabel\">\n          <span class=\"ui-listbox-filter-icon pi pi-search\"></span>\n        </div>\n      </div>\n      <div class=\"ui-listbox-list-wrapper\" [ngStyle]=\"listStyle\">\n        <ul class=\"ui-listbox-list\">\n          <li *ngFor=\"let option of options; let i = index;\" [style.display]=\"isItemVisible(option) ? 'block' : 'none'\" [attr.tabindex]=\"option.disabled ? null : '0'\"\n              [ngClass]=\"{'ui-listbox-item ui-corner-all':true,'ui-state-highlight':isSelected(option), 'ui-state-disabled': option.disabled}\" [attr.aria-label]=\"option.label\"\n              (click)=\"onOptionClick($event,option)\" (dblclick)=\"onOptionDoubleClick($event,option)\" (touchend)=\"onOptionTouchEnd($event,option)\" (keydown)=\"onOptionKeyDown($event,option)\">\n            <div class=\"ui-chkbox ui-widget\" *ngIf=\"checkbox && multiple\">\n              <div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" [ngClass]=\"{'ui-state-active':isSelected(option)}\">\n                <span class=\"ui-chkbox-icon ui-clickable\" [ngClass]=\"{'pi pi-check':isSelected(option)}\"></span>\n              </div>\n            </div>\n            <span *ngIf=\"!itemTemplate\">{{option.label}}</span>\n            <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: option, index: i}\"></ng-container>\n          </li>\n        </ul>\n      </div>\n      <div class=\"ui-listbox-footer ui-widget-header ui-corner-all\" *ngIf=\"footerFacet\">\n        <ng-content select=\"p-footer\"></ng-content>\n      </div>\n    </div>\n  ",
            providers: [LISTBOX_VALUE_ACCESSOR]
        }),
        __metadata("design:paramtypes", [ElementRef, ChangeDetectorRef])
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
//# sourceMappingURL=listbox.js.map