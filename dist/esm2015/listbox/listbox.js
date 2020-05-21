var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, Input, Output, EventEmitter, AfterContentInit, ContentChildren, ContentChild, QueryList, TemplateRef, forwardRef, ChangeDetectorRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, PrimeTemplate, Footer, Header } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { ObjectUtils } from 'primeng/utils';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FilterUtils } from 'primeng/utils';
export const LISTBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Listbox),
    multi: true
};
let Listbox = class Listbox {
    constructor(el, cd) {
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
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
        this.disabledSelectedOptions = [];
    }
    get options() {
        return this._options;
    }
    set options(val) {
        let opts = this.optionLabel ? ObjectUtils.generateSelectItems(val, this.optionLabel) : val;
        this._options = opts;
    }
    get filterValue() {
        return this._filterValue;
    }
    set filterValue(val) {
        this._filterValue = val;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    writeValue(value) {
        this.value = value;
        this.setDisabledSelectedOptions();
        this.cd.markForCheck();
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(val) {
        this.disabled = val;
    }
    onOptionClick(event, option) {
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
    }
    onOptionTouchEnd(event, option) {
        if (this.disabled || option.disabled || this.readonly) {
            return;
        }
        this.optionTouched = true;
    }
    onOptionDoubleClick(event, option) {
        if (this.disabled || option.disabled || this.readonly) {
            return;
        }
        this.onDblClick.emit({
            originalEvent: event,
            option: option,
            value: this.value
        });
    }
    onOptionClickSingle(event, option) {
        let selected = this.isSelected(option);
        let valueChanged = false;
        let metaSelection = this.optionTouched ? false : this.metaKeySelection;
        if (metaSelection) {
            let metaKey = (event.metaKey || event.ctrlKey);
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
    }
    onOptionClickMultiple(event, option) {
        let selected = this.isSelected(option);
        let valueChanged = false;
        let metaSelection = this.optionTouched ? false : this.metaKeySelection;
        if (metaSelection) {
            let metaKey = (event.metaKey || event.ctrlKey);
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
                this.value = [...this.value, option.value];
                valueChanged = true;
            }
        }
        else {
            if (selected) {
                this.removeOption(option);
            }
            else {
                this.value = [...this.value || [], option.value];
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
    }
    onOptionClickCheckbox(event, option) {
        if (this.disabled || this.readonly) {
            return;
        }
        let selected = this.isSelected(option);
        if (selected) {
            this.removeOption(option);
        }
        else {
            this.value = this.value ? this.value : [];
            this.value = [...this.value, option.value];
        }
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    }
    removeOption(option) {
        this.value = this.value.filter(val => !ObjectUtils.equals(val, option.value, this.dataKey));
    }
    isSelected(option) {
        let selected = false;
        if (this.multiple) {
            if (this.value) {
                for (let val of this.value) {
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
    }
    get allChecked() {
        if (this.filterValue) {
            return this.allFilteredSelected();
        }
        else {
            let optionCount = this.getEnabledOptionCount();
            let disabledSelectedOptionCount = this.disabledSelectedOptions.length;
            return this.value && this.options && (this.value.length > 0 && this.value.length == optionCount + disabledSelectedOptionCount);
        }
    }
    getEnabledOptionCount() {
        if (this.options) {
            let count = 0;
            for (let opt of this.options) {
                if (!opt.disabled) {
                    count++;
                }
            }
            return count;
        }
        else {
            return 0;
        }
    }
    allFilteredSelected() {
        let allSelected;
        let options = this.filterValue ? this.getFilteredOptions() : this.options;
        if (this.value && options && options.length) {
            allSelected = true;
            for (let opt of this.options) {
                if (this.isItemVisible(opt)) {
                    if (!this.isSelected(opt)) {
                        allSelected = false;
                        break;
                    }
                }
            }
        }
        return allSelected;
    }
    onFilter(event) {
        this._filterValue = event.target.value;
    }
    toggleAll(event) {
        if (this.disabled || this.readonly || !this.options || this.options.length === 0) {
            return;
        }
        if (this.allChecked) {
            if (this.disabledSelectedOptions && this.disabledSelectedOptions.length > 0) {
                let value = [];
                value = [...this.disabledSelectedOptions];
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
                    this.value = [...this.disabledSelectedOptions];
                }
                for (let i = 0; i < this.options.length; i++) {
                    let opt = this.options[i];
                    if (this.isItemVisible(opt) && !opt.disabled) {
                        this.value.push(opt.value);
                    }
                }
            }
        }
        this.onModelChange(this.value);
        this.onChange.emit({ originalEvent: event, value: this.value });
        event.preventDefault();
    }
    isItemVisible(option) {
        if (this.filterValue) {
            let visible;
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
    }
    onInputFocus(event) {
        this.focus = true;
    }
    onInputBlur(event) {
        this.focus = false;
    }
    onOptionKeyDown(event, option) {
        if (this.readonly) {
            return;
        }
        let item = event.currentTarget;
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
    }
    findNextItem(item) {
        let nextItem = item.nextElementSibling;
        if (nextItem)
            return DomHandler.hasClass(nextItem, 'ui-state-disabled') || DomHandler.isHidden(nextItem) ? this.findNextItem(nextItem) : nextItem;
        else
            return null;
    }
    findPrevItem(item) {
        let prevItem = item.previousElementSibling;
        if (prevItem)
            return DomHandler.hasClass(prevItem, 'ui-state-disabled') || DomHandler.isHidden(prevItem) ? this.findPrevItem(prevItem) : prevItem;
        else
            return null;
    }
    getFilteredOptions() {
        let filteredOptions = [];
        if (this.filterValue) {
            for (let i = 0; i < this.options.length; i++) {
                let opt = this.options[i];
                if (this.isItemVisible(opt) && !opt.disabled) {
                    filteredOptions.push(opt);
                }
            }
            return filteredOptions;
        }
        else {
            return this.options;
        }
    }
    onHeaderCheckboxFocus() {
        this.headerCheckboxFocus = true;
    }
    onHeaderCheckboxBlur() {
        this.headerCheckboxFocus = false;
    }
    setDisabledSelectedOptions() {
        if (this.options) {
            this.disabledSelectedOptions = [];
            if (this.value) {
                for (let opt of this.options) {
                    if (opt.disabled && this.isSelected(opt)) {
                        this.disabledSelectedOptions.push(opt.value);
                    }
                }
            }
        }
    }
};
Listbox.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
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
        template: `
    <div [ngClass]="{'ui-listbox ui-inputtext ui-widget ui-widget-content ui-corner-all':true,'ui-state-disabled':disabled,'ui-state-focus':focus}" [ngStyle]="style" [class]="styleClass">
      <div class="ui-helper-hidden-accessible">
        <input type="text" readonly="readonly" (focus)="onInputFocus($event)" (blur)="onInputBlur($event)">
      </div>
      <div class="ui-widget-header ui-corner-all ui-listbox-header ui-helper-clearfix" *ngIf="headerFacet">
        <ng-content select="p-header"></ng-content>
      </div>
      <div class="ui-widget-header ui-corner-all ui-listbox-header ui-helper-clearfix" *ngIf="(checkbox && multiple && showToggleAll) || filter" [ngClass]="{'ui-listbox-header-w-checkbox': checkbox}">
        <div class="ui-chkbox ui-widget" *ngIf="checkbox && multiple && showToggleAll">
          <div class="ui-helper-hidden-accessible">
            <input type="checkbox" readonly="readonly" [checked]="allChecked" (focus)="onHeaderCheckboxFocus()" (blur)="onHeaderCheckboxBlur()" (keydown.space)="toggleAll($event)">
          </div>
          <div #headerchkbox class="ui-chkbox-box ui-widget ui-corner-all ui-state-default" [ngClass]="{'ui-state-active': allChecked, 'ui-state-focus': headerCheckboxFocus}" (click)="toggleAll($event)">
            <span class="ui-chkbox-icon ui-clickable" [ngClass]="{'pi pi-check':allChecked}"></span>
          </div>
        </div>
        <div class="ui-listbox-filter-container" *ngIf="filter">
          <input type="text" [value]="filterValue||''" (input)="onFilter($event)" class="ui-inputtext ui-widget ui-state-default ui-corner-all" [disabled]="disabled" [attr.placeholder]="filterPlaceHolder" [attr.aria-label]="ariaFilterLabel">
          <span class="ui-listbox-filter-icon pi pi-search"></span>
        </div>
      </div>
      <div class="ui-listbox-list-wrapper" [ngStyle]="listStyle">
        <ul class="ui-listbox-list" role="listbox" aria-multiselectable="multiple">
          <li *ngFor="let option of options; let i = index;" [style.display]="isItemVisible(option) ? 'block' : 'none'" [attr.tabindex]="option.disabled ? null : '0'"
              [ngClass]="{'ui-listbox-item ui-corner-all':true,'ui-state-highlight':isSelected(option), 'ui-state-disabled': option.disabled}" role="option" [attr.aria-label]="option.label"
              [attr.aria-selected]="isSelected(option)" (click)="onOptionClick($event,option)" (dblclick)="onOptionDoubleClick($event,option)" (touchend)="onOptionTouchEnd($event,option)" (keydown)="onOptionKeyDown($event,option)">
            <div class="ui-chkbox ui-widget" *ngIf="checkbox && multiple">
              <div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default" [ngClass]="{'ui-state-active':isSelected(option)}">
                <span class="ui-chkbox-icon ui-clickable" [ngClass]="{'pi pi-check':isSelected(option)}"></span>
              </div>
            </div>
            <span *ngIf="!itemTemplate">{{option.label}}</span>
            <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: option, index: i}"></ng-container>
          </li>
        </ul>
      </div>
      <div class="ui-listbox-footer ui-widget-header ui-corner-all" *ngIf="footerFacet">
        <ng-content select="p-footer"></ng-content>
      </div>
    </div>
  `,
        providers: [LISTBOX_VALUE_ACCESSOR],
        changeDetection: ChangeDetectionStrategy.Default
    })
], Listbox);
export { Listbox };
let ListboxModule = class ListboxModule {
};
ListboxModule = __decorate([
    NgModule({
        imports: [CommonModule, SharedModule],
        exports: [Listbox, SharedModule],
        declarations: [Listbox]
    })
], ListboxModule);
export { ListboxModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdGJveC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvbGlzdGJveC8iLCJzb3VyY2VzIjpbImxpc3Rib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBQyxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hPLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUUsaUJBQWlCLEVBQXdCLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1QyxNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBUTtJQUN2QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO0lBQ3RDLEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQWlERixJQUFhLE9BQU8sR0FBcEIsTUFBYSxPQUFPO0lBc0VoQixZQUFtQixFQUFjLEVBQVMsRUFBcUI7UUFBNUMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBeER0RCxhQUFRLEdBQVksS0FBSyxDQUFDO1FBRTFCLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFF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O0lBQVQsTUFBTSxFQUFFOzJDQUFvRDtBQUVsQztJQUExQixTQUFTLENBQUMsY0FBYyxDQUFDO3dEQUFxQztBQUV6QztJQUFyQixZQUFZLENBQUMsTUFBTSxDQUFDOzRDQUFhO0FBRVo7SUFBckIsWUFBWSxDQUFDLE1BQU0sQ0FBQzs0Q0FBYTtBQUVGO0lBQS9CLGVBQWUsQ0FBQyxhQUFhLENBQUM7MENBQTJCO0FBMEJqRDtJQUFSLEtBQUssRUFBRTtzQ0FFUDtBQU9RO0lBQVIsS0FBSyxFQUFFOzBDQUVQO0FBbkZRLE9BQU87SUEvQ25CLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Q1g7UUFDQyxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztRQUNuQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztLQUNuRCxDQUFDO0dBQ1csT0FBTyxDQXdlbkI7U0F4ZVksT0FBTztBQStlcEIsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtDQUFJLENBQUE7QUFBakIsYUFBYTtJQUx6QixRQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDO1FBQ3JDLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUM7UUFDaEMsWUFBWSxFQUFFLENBQUMsT0FBTyxDQUFDO0tBQzFCLENBQUM7R0FDVyxhQUFhLENBQUk7U0FBakIsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQWZ0ZXJDb250ZW50SW5pdCwgQ29udGVudENoaWxkcmVuLCBDb250ZW50Q2hpbGQsIFF1ZXJ5TGlzdCwgVGVtcGxhdGVSZWYsZm9yd2FyZFJlZiwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdDaGlsZCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgU2VsZWN0SXRlbSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcclxuaW1wb3J0IHsgU2hhcmVkTW9kdWxlLCBQcmltZVRlbXBsYXRlLCBGb290ZXIsIEhlYWRlciB9IGZyb20gJ3ByaW1lbmcvYXBpJztcclxuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcclxuaW1wb3J0IHsgT2JqZWN0VXRpbHMgfSBmcm9tICdwcmltZW5nL3V0aWxzJztcclxuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBGaWx0ZXJVdGlscyB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IExJU1RCT1hfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcclxuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTGlzdGJveCksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3AtbGlzdGJveCcsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBbbmdDbGFzc109XCJ7J3VpLWxpc3Rib3ggdWktaW5wdXR0ZXh0IHVpLXdpZGdldCB1aS13aWRnZXQtY29udGVudCB1aS1jb3JuZXItYWxsJzp0cnVlLCd1aS1zdGF0ZS1kaXNhYmxlZCc6ZGlzYWJsZWQsJ3VpLXN0YXRlLWZvY3VzJzpmb2N1c31cIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJ1aS1oZWxwZXItaGlkZGVuLWFjY2Vzc2libGVcIj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiByZWFkb25seT1cInJlYWRvbmx5XCIgKGZvY3VzKT1cIm9uSW5wdXRGb2N1cygkZXZlbnQpXCIgKGJsdXIpPVwib25JbnB1dEJsdXIoJGV2ZW50KVwiPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cInVpLXdpZGdldC1oZWFkZXIgdWktY29ybmVyLWFsbCB1aS1saXN0Ym94LWhlYWRlciB1aS1oZWxwZXItY2xlYXJmaXhcIiAqbmdJZj1cImhlYWRlckZhY2V0XCI+XHJcbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwicC1oZWFkZXJcIj48L25nLWNvbnRlbnQ+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwidWktd2lkZ2V0LWhlYWRlciB1aS1jb3JuZXItYWxsIHVpLWxpc3Rib3gtaGVhZGVyIHVpLWhlbHBlci1jbGVhcmZpeFwiICpuZ0lmPVwiKGNoZWNrYm94ICYmIG11bHRpcGxlICYmIHNob3dUb2dnbGVBbGwpIHx8IGZpbHRlclwiIFtuZ0NsYXNzXT1cInsndWktbGlzdGJveC1oZWFkZXItdy1jaGVja2JveCc6IGNoZWNrYm94fVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1jaGtib3ggdWktd2lkZ2V0XCIgKm5nSWY9XCJjaGVja2JveCAmJiBtdWx0aXBsZSAmJiBzaG93VG9nZ2xlQWxsXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktaGVscGVyLWhpZGRlbi1hY2Nlc3NpYmxlXCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiByZWFkb25seT1cInJlYWRvbmx5XCIgW2NoZWNrZWRdPVwiYWxsQ2hlY2tlZFwiIChmb2N1cyk9XCJvbkhlYWRlckNoZWNrYm94Rm9jdXMoKVwiIChibHVyKT1cIm9uSGVhZGVyQ2hlY2tib3hCbHVyKClcIiAoa2V5ZG93bi5zcGFjZSk9XCJ0b2dnbGVBbGwoJGV2ZW50KVwiPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2ICNoZWFkZXJjaGtib3ggY2xhc3M9XCJ1aS1jaGtib3gtYm94IHVpLXdpZGdldCB1aS1jb3JuZXItYWxsIHVpLXN0YXRlLWRlZmF1bHRcIiBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWFjdGl2ZSc6IGFsbENoZWNrZWQsICd1aS1zdGF0ZS1mb2N1cyc6IGhlYWRlckNoZWNrYm94Rm9jdXN9XCIgKGNsaWNrKT1cInRvZ2dsZUFsbCgkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktY2hrYm94LWljb24gdWktY2xpY2thYmxlXCIgW25nQ2xhc3NdPVwieydwaSBwaS1jaGVjayc6YWxsQ2hlY2tlZH1cIj48L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwidWktbGlzdGJveC1maWx0ZXItY29udGFpbmVyXCIgKm5nSWY9XCJmaWx0ZXJcIj5cclxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIFt2YWx1ZV09XCJmaWx0ZXJWYWx1ZXx8JydcIiAoaW5wdXQpPVwib25GaWx0ZXIoJGV2ZW50KVwiIGNsYXNzPVwidWktaW5wdXR0ZXh0IHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGxcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbYXR0ci5wbGFjZWhvbGRlcl09XCJmaWx0ZXJQbGFjZUhvbGRlclwiIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUZpbHRlckxhYmVsXCI+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWxpc3Rib3gtZmlsdGVyLWljb24gcGkgcGktc2VhcmNoXCI+PC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cInVpLWxpc3Rib3gtbGlzdC13cmFwcGVyXCIgW25nU3R5bGVdPVwibGlzdFN0eWxlXCI+XHJcbiAgICAgICAgPHVsIGNsYXNzPVwidWktbGlzdGJveC1saXN0XCIgcm9sZT1cImxpc3Rib3hcIiBhcmlhLW11bHRpc2VsZWN0YWJsZT1cIm11bHRpcGxlXCI+XHJcbiAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBvcHRpb25zOyBsZXQgaSA9IGluZGV4O1wiIFtzdHlsZS5kaXNwbGF5XT1cImlzSXRlbVZpc2libGUob3B0aW9uKSA/ICdibG9jaycgOiAnbm9uZSdcIiBbYXR0ci50YWJpbmRleF09XCJvcHRpb24uZGlzYWJsZWQgPyBudWxsIDogJzAnXCJcclxuICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLWxpc3Rib3gtaXRlbSB1aS1jb3JuZXItYWxsJzp0cnVlLCd1aS1zdGF0ZS1oaWdobGlnaHQnOmlzU2VsZWN0ZWQob3B0aW9uKSwgJ3VpLXN0YXRlLWRpc2FibGVkJzogb3B0aW9uLmRpc2FibGVkfVwiIHJvbGU9XCJvcHRpb25cIiBbYXR0ci5hcmlhLWxhYmVsXT1cIm9wdGlvbi5sYWJlbFwiXHJcbiAgICAgICAgICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJpc1NlbGVjdGVkKG9wdGlvbilcIiAoY2xpY2spPVwib25PcHRpb25DbGljaygkZXZlbnQsb3B0aW9uKVwiIChkYmxjbGljayk9XCJvbk9wdGlvbkRvdWJsZUNsaWNrKCRldmVudCxvcHRpb24pXCIgKHRvdWNoZW5kKT1cIm9uT3B0aW9uVG91Y2hFbmQoJGV2ZW50LG9wdGlvbilcIiAoa2V5ZG93bik9XCJvbk9wdGlvbktleURvd24oJGV2ZW50LG9wdGlvbilcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWNoa2JveCB1aS13aWRnZXRcIiAqbmdJZj1cImNoZWNrYm94ICYmIG11bHRpcGxlXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWNoa2JveC1ib3ggdWktd2lkZ2V0IHVpLWNvcm5lci1hbGwgdWktc3RhdGUtZGVmYXVsdFwiIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtYWN0aXZlJzppc1NlbGVjdGVkKG9wdGlvbil9XCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWNoa2JveC1pY29uIHVpLWNsaWNrYWJsZVwiIFtuZ0NsYXNzXT1cInsncGkgcGktY2hlY2snOmlzU2VsZWN0ZWQob3B0aW9uKX1cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cIiFpdGVtVGVtcGxhdGVcIj57e29wdGlvbi5sYWJlbH19PC9zcGFuPlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiBvcHRpb24sIGluZGV4OiBpfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgPC9saT5cclxuICAgICAgICA8L3VsPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cInVpLWxpc3Rib3gtZm9vdGVyIHVpLXdpZGdldC1oZWFkZXIgdWktY29ybmVyLWFsbFwiICpuZ0lmPVwiZm9vdGVyRmFjZXRcIj5cclxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWZvb3RlclwiPjwvbmctY29udGVudD5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICBgLFxyXG4gICAgcHJvdmlkZXJzOiBbTElTVEJPWF9WQUxVRV9BQ0NFU1NPUl0sXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcclxufSlcclxuZXhwb3J0IGNsYXNzIExpc3Rib3ggaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcblxyXG4gICAgQElucHV0KCkgbXVsdGlwbGU6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgbGlzdFN0eWxlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgcmVhZG9ubHk6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgY2hlY2tib3g6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBASW5wdXQoKSBmaWx0ZXI6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBASW5wdXQoKSBmaWx0ZXJNb2RlOiBzdHJpbmcgPSAnY29udGFpbnMnO1xyXG5cclxuICAgIEBJbnB1dCgpIGZpbHRlckxvY2FsZTogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIG1ldGFLZXlTZWxlY3Rpb246IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIGRhdGFLZXk6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBzaG93VG9nZ2xlQWxsOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBASW5wdXQoKSBvcHRpb25MYWJlbDogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGFyaWFGaWx0ZXJMYWJlbDogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGZpbHRlclBsYWNlSG9sZGVyOiBzdHJpbmc7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25DbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uRGJsQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ2hlYWRlcmNoa2JveCcpIGhlYWRlckNoZWNrYm94Vmlld0NoaWxkOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIEBDb250ZW50Q2hpbGQoSGVhZGVyKSBoZWFkZXJGYWNldDtcclxuXHJcbiAgICBAQ29udGVudENoaWxkKEZvb3RlcikgZm9vdGVyRmFjZXQ7XHJcblxyXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xyXG5cclxuICAgIHB1YmxpYyBpdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgcHVibGljIF9maWx0ZXJWYWx1ZTogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBmaWx0ZXJlZDogYm9vbGVhbjtcclxuXHJcbiAgICBwdWJsaWMgdmFsdWU6IGFueTtcclxuXHJcbiAgICBwdWJsaWMgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7IH07XHJcblxyXG4gICAgcHVibGljIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHsgfTtcclxuXHJcbiAgICBwdWJsaWMgb3B0aW9uVG91Y2hlZDogYm9vbGVhbjtcclxuXHJcbiAgICBwdWJsaWMgZm9jdXM6IGJvb2xlYW47XHJcblxyXG4gICAgcHVibGljIF9vcHRpb25zOiBhbnlbXTtcclxuXHJcbiAgICBwdWJsaWMgaGVhZGVyQ2hlY2tib3hGb2N1czogYm9vbGVhbjtcclxuXHJcbiAgICBwdWJsaWMgZGlzYWJsZWRTZWxlY3RlZE9wdGlvbnM6IFNlbGVjdEl0ZW1bXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikgeyB9XHJcblxyXG4gICAgQElucHV0KCkgZ2V0IG9wdGlvbnMoKTogYW55W10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBvcHRpb25zKHZhbDogYW55W10pIHtcclxuICAgICAgICBsZXQgb3B0cyA9IHRoaXMub3B0aW9uTGFiZWwgPyBPYmplY3RVdGlscy5nZW5lcmF0ZVNlbGVjdEl0ZW1zKHZhbCwgdGhpcy5vcHRpb25MYWJlbCkgOiB2YWw7XHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IG9wdHM7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgZ2V0IGZpbHRlclZhbHVlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlclZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBmaWx0ZXJWYWx1ZSh2YWw6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2ZpbHRlclZhbHVlID0gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgICAgICB0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2l0ZW0nOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNldERpc2FibGVkU2VsZWN0ZWRPcHRpb25zKCk7XHJcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICBzZXREaXNhYmxlZFN0YXRlKHZhbDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgb25PcHRpb25DbGljayhldmVudCwgb3B0aW9uKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgb3B0aW9uLmRpc2FibGVkIHx8IHRoaXMucmVhZG9ubHkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tib3gpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uT3B0aW9uQ2xpY2tDaGVja2JveChldmVudCwgb3B0aW9uKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk9wdGlvbkNsaWNrTXVsdGlwbGUoZXZlbnQsIG9wdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm9uT3B0aW9uQ2xpY2tTaW5nbGUoZXZlbnQsIG9wdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub25DbGljay5lbWl0KHtcclxuICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXHJcbiAgICAgICAgICAgIG9wdGlvbjogb3B0aW9uLFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy52YWx1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMub3B0aW9uVG91Y2hlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uT3B0aW9uVG91Y2hFbmQoZXZlbnQsIG9wdGlvbikge1xyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IG9wdGlvbi5kaXNhYmxlZCB8fCB0aGlzLnJlYWRvbmx5KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMub3B0aW9uVG91Y2hlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgb25PcHRpb25Eb3VibGVDbGljayhldmVudDogRXZlbnQsIG9wdGlvbjogU2VsZWN0SXRlbSk6IGFueSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgb3B0aW9uLmRpc2FibGVkIHx8IHRoaXMucmVhZG9ubHkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5vbkRibENsaWNrLmVtaXQoe1xyXG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgb3B0aW9uOiBvcHRpb24sXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvbk9wdGlvbkNsaWNrU2luZ2xlKGV2ZW50LCBvcHRpb24pIHtcclxuICAgICAgICBsZXQgc2VsZWN0ZWQgPSB0aGlzLmlzU2VsZWN0ZWQob3B0aW9uKTtcclxuICAgICAgICBsZXQgdmFsdWVDaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IG1ldGFTZWxlY3Rpb24gPSB0aGlzLm9wdGlvblRvdWNoZWQgPyBmYWxzZSA6IHRoaXMubWV0YUtleVNlbGVjdGlvbjtcclxuXHJcbiAgICAgICAgaWYgKG1ldGFTZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgbGV0IG1ldGFLZXkgPSAoZXZlbnQubWV0YUtleSB8fCBldmVudC5jdHJsS2V5KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1ldGFLZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZUNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG9wdGlvbi52YWx1ZTtcclxuICAgICAgICAgICAgICAgIHZhbHVlQ2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBzZWxlY3RlZCA/IG51bGwgOiBvcHRpb24udmFsdWU7XHJcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodmFsdWVDaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHtcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uT3B0aW9uQ2xpY2tNdWx0aXBsZShldmVudCwgb3B0aW9uKSB7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5pc1NlbGVjdGVkKG9wdGlvbik7XHJcbiAgICAgICAgbGV0IHZhbHVlQ2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBtZXRhU2VsZWN0aW9uID0gdGhpcy5vcHRpb25Ub3VjaGVkID8gZmFsc2UgOiB0aGlzLm1ldGFLZXlTZWxlY3Rpb247XHJcblxyXG4gICAgICAgIGlmIChtZXRhU2VsZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGxldCBtZXRhS2V5ID0gKGV2ZW50Lm1ldGFLZXkgfHwgZXZlbnQuY3RybEtleSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChtZXRhS2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVPcHRpb24ob3B0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBbb3B0aW9uLnZhbHVlXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhbHVlQ2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gKG1ldGFLZXkpID8gdGhpcy52YWx1ZSB8fCBbXSA6IFtdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IFsuLi50aGlzLnZhbHVlLCBvcHRpb24udmFsdWVdO1xyXG4gICAgICAgICAgICAgICAgdmFsdWVDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZU9wdGlvbihvcHRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IFsuLi50aGlzLnZhbHVlIHx8IFtdLCBvcHRpb24udmFsdWVdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHZhbHVlQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7XHJcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbk9wdGlvbkNsaWNrQ2hlY2tib3goZXZlbnQsIG9wdGlvbikge1xyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMucmVhZG9ubHkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5pc1NlbGVjdGVkKG9wdGlvbik7XHJcblxyXG4gICAgICAgIGlmIChzZWxlY3RlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZU9wdGlvbihvcHRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWUgPyB0aGlzLnZhbHVlIDogW107XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBbLi4udGhpcy52YWx1ZSwgb3B0aW9uLnZhbHVlXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoe1xyXG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVPcHRpb24ob3B0aW9uOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZS5maWx0ZXIodmFsID0+ICFPYmplY3RVdGlscy5lcXVhbHModmFsLCBvcHRpb24udmFsdWUsIHRoaXMuZGF0YUtleSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzU2VsZWN0ZWQob3B0aW9uOiBTZWxlY3RJdGVtKSB7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB2YWwgb2YgdGhpcy52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChPYmplY3RVdGlscy5lcXVhbHModmFsLCBvcHRpb24udmFsdWUsIHRoaXMuZGF0YUtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkID0gT2JqZWN0VXRpbHMuZXF1YWxzKHRoaXMudmFsdWUsIG9wdGlvbi52YWx1ZSwgdGhpcy5kYXRhS2V5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzZWxlY3RlZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYWxsQ2hlY2tlZCgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5maWx0ZXJWYWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hbGxGaWx0ZXJlZFNlbGVjdGVkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgb3B0aW9uQ291bnQgPSB0aGlzLmdldEVuYWJsZWRPcHRpb25Db3VudCgpO1xyXG4gICAgICAgICAgICBsZXQgZGlzYWJsZWRTZWxlY3RlZE9wdGlvbkNvdW50ID0gdGhpcy5kaXNhYmxlZFNlbGVjdGVkT3B0aW9ucy5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZSAmJiB0aGlzLm9wdGlvbnMgJiYgKHRoaXMudmFsdWUubGVuZ3RoID4gMCAmJiB0aGlzLnZhbHVlLmxlbmd0aCA9PSBvcHRpb25Db3VudCArIGRpc2FibGVkU2VsZWN0ZWRPcHRpb25Db3VudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEVuYWJsZWRPcHRpb25Db3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgb3B0IG9mIHRoaXMub3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFvcHQuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWxsRmlsdGVyZWRTZWxlY3RlZCgpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgYWxsU2VsZWN0ZWQ6IGJvb2xlYW47XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB0aGlzLmZpbHRlclZhbHVlID8gdGhpcy5nZXRGaWx0ZXJlZE9wdGlvbnMoKSA6IHRoaXMub3B0aW9ucztcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudmFsdWUgJiYgb3B0aW9ucyAmJiBvcHRpb25zLmxlbmd0aCkgwqB7XHJcbiAgICAgICAgICAgIGFsbFNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgb3B0IG9mIHRoaXMub3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNJdGVtVmlzaWJsZShvcHQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzU2VsZWN0ZWQob3B0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGxTZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhbGxTZWxlY3RlZDtcclxuICAgIH1cclxuXHJcbiAgICBvbkZpbHRlcihldmVudCkge1xyXG4gICAgICAgIHRoaXMuX2ZpbHRlclZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZUFsbChldmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMucmVhZG9ubHkgfHwgIXRoaXMub3B0aW9ucyB8fCB0aGlzLm9wdGlvbnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmFsbENoZWNrZWQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWRTZWxlY3RlZE9wdGlvbnMgJiYgdGhpcy5kaXNhYmxlZFNlbGVjdGVkT3B0aW9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBbXTtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gWy4uLnRoaXMuZGlzYWJsZWRTZWxlY3RlZE9wdGlvbnNdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gW107XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXNhYmxlZFNlbGVjdGVkT3B0aW9ucyAmJiB0aGlzLmRpc2FibGVkU2VsZWN0ZWRPcHRpb25zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gWy4uLnRoaXMuZGlzYWJsZWRTZWxlY3RlZE9wdGlvbnNdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5vcHRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9wdCA9IHRoaXMub3B0aW9uc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0l0ZW1WaXNpYmxlKG9wdCkgJiYgIW9wdC5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlLnB1c2gob3B0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgdmFsdWU6IHRoaXMudmFsdWUgfSk7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0l0ZW1WaXNpYmxlKG9wdGlvbjogU2VsZWN0SXRlbSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLmZpbHRlclZhbHVlKSB7XHJcbiAgICAgICAgICAgIGxldCB2aXNpYmxlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVyTW9kZSkge1xyXG4gICAgICAgICAgICAgICAgdmlzaWJsZSA9IEZpbHRlclV0aWxzW3RoaXMuZmlsdGVyTW9kZV0ob3B0aW9uLmxhYmVsLCB0aGlzLmZpbHRlclZhbHVlLCB0aGlzLmZpbHRlckxvY2FsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHZpc2libGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25JbnB1dEZvY3VzKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5mb2N1cyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgb25JbnB1dEJsdXIoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmZvY3VzID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25PcHRpb25LZXlEb3duKGV2ZW50OktleWJvYXJkRXZlbnQsIG9wdGlvbikge1xyXG4gICAgICAgIGlmICh0aGlzLnJlYWRvbmx5KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpdGVtID0gPEhUTUxMSUVsZW1lbnQ+IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcblxyXG4gICAgICAgIHN3aXRjaChldmVudC53aGljaCkge1xyXG4gICAgICAgICAgICAvL2Rvd25cclxuICAgICAgICAgICAgY2FzZSA0MDpcclxuICAgICAgICAgICAgICAgIHZhciBuZXh0SXRlbSA9IHRoaXMuZmluZE5leHRJdGVtKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5leHRJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEl0ZW0uZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIC8vdXBcclxuICAgICAgICAgICAgY2FzZSAzODpcclxuICAgICAgICAgICAgICAgIHZhciBwcmV2SXRlbSA9IHRoaXMuZmluZFByZXZJdGVtKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByZXZJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldkl0ZW0uZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIC8vZW50ZXJcclxuICAgICAgICAgICAgY2FzZSAxMzpcclxuICAgICAgICAgICAgICAgIHRoaXMub25PcHRpb25DbGljayhldmVudCwgb3B0aW9uKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmaW5kTmV4dEl0ZW0oaXRlbSkge1xyXG4gICAgICAgIGxldCBuZXh0SXRlbSA9IGl0ZW0ubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG5cclxuICAgICAgICBpZiAobmV4dEl0ZW0pXHJcbiAgICAgICAgICAgIHJldHVybiBEb21IYW5kbGVyLmhhc0NsYXNzKG5leHRJdGVtLCAndWktc3RhdGUtZGlzYWJsZWQnKSB8fCBEb21IYW5kbGVyLmlzSGlkZGVuKG5leHRJdGVtKSA/IHRoaXMuZmluZE5leHRJdGVtKG5leHRJdGVtKSA6IG5leHRJdGVtO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZmluZFByZXZJdGVtKGl0ZW0pIHtcclxuICAgICAgICBsZXQgcHJldkl0ZW0gPSBpdGVtLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcblxyXG4gICAgICAgIGlmIChwcmV2SXRlbSlcclxuICAgICAgICAgICAgcmV0dXJuIERvbUhhbmRsZXIuaGFzQ2xhc3MocHJldkl0ZW0sICd1aS1zdGF0ZS1kaXNhYmxlZCcpIHx8IERvbUhhbmRsZXIuaXNIaWRkZW4ocHJldkl0ZW0pID8gdGhpcy5maW5kUHJldkl0ZW0ocHJldkl0ZW0pIDogcHJldkl0ZW07XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRGaWx0ZXJlZE9wdGlvbnMoKSB7XHJcbiAgICAgICAgbGV0IGZpbHRlcmVkT3B0aW9ucyA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLmZpbHRlclZhbHVlKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5vcHRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3B0ID0gdGhpcy5vcHRpb25zW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNJdGVtVmlzaWJsZShvcHQpICYmICFvcHQuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZE9wdGlvbnMucHVzaChvcHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJlZE9wdGlvbnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkhlYWRlckNoZWNrYm94Rm9jdXMoKSB7XHJcbiAgICAgICAgdGhpcy5oZWFkZXJDaGVja2JveEZvY3VzID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkhlYWRlckNoZWNrYm94Qmx1cigpIHtcclxuICAgICAgICB0aGlzLmhlYWRlckNoZWNrYm94Rm9jdXMgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREaXNhYmxlZFNlbGVjdGVkT3B0aW9ucygpe1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXNhYmxlZFNlbGVjdGVkT3B0aW9ucyA9IFtdO1xyXG4gICAgICAgICAgICBpZiAodGhpcy52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgb3B0IG9mIHRoaXMub3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHQuZGlzYWJsZWQgJiYgdGhpcy5pc1NlbGVjdGVkKG9wdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlZFNlbGVjdGVkT3B0aW9ucy5wdXNoKG9wdC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgU2hhcmVkTW9kdWxlXSxcclxuICAgIGV4cG9ydHM6IFtMaXN0Ym94LCBTaGFyZWRNb2R1bGVdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbTGlzdGJveF1cclxufSlcclxuZXhwb3J0IGNsYXNzIExpc3Rib3hNb2R1bGUgeyB9XHJcblxyXG4iXX0=