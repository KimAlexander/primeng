var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, OnDestroy, Input, Output, Renderer2, EventEmitter, forwardRef, ViewChild, ChangeDetectorRef, TemplateRef, ContentChildren, QueryList, ContentChild, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { ObjectUtils } from 'primeng/utils';
import { SharedModule, PrimeTemplate, Footer, Header } from 'primeng/api';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FilterUtils } from 'primeng/utils';
import { TooltipModule } from 'primeng/tooltip';
export const MULTISELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiSelect),
    multi: true
};
let MultiSelectItem = class MultiSelectItem {
    constructor() {
        this.onClick = new EventEmitter();
        this.onKeydown = new EventEmitter();
    }
    onOptionClick(event) {
        this.onClick.emit({
            originalEvent: event,
            option: this.option
        });
    }
    onOptionKeydown(event) {
        this.onKeydown.emit({
            originalEvent: event,
            option: this.option
        });
    }
};
__decorate([
    Input()
], MultiSelectItem.prototype, "option", void 0);
__decorate([
    Input()
], MultiSelectItem.prototype, "selected", void 0);
__decorate([
    Input()
], MultiSelectItem.prototype, "disabled", void 0);
__decorate([
    Input()
], MultiSelectItem.prototype, "visible", void 0);
__decorate([
    Input()
], MultiSelectItem.prototype, "itemSize", void 0);
__decorate([
    Input()
], MultiSelectItem.prototype, "template", void 0);
__decorate([
    Input()
], MultiSelectItem.prototype, "maxSelectionLimitReached", void 0);
__decorate([
    Output()
], MultiSelectItem.prototype, "onClick", void 0);
__decorate([
    Output()
], MultiSelectItem.prototype, "onKeydown", void 0);
MultiSelectItem = __decorate([
    Component({
        selector: 'p-multiSelectItem',
        template: `
        <li class="ui-multiselect-item ui-corner-all" (click)="onOptionClick($event)" (keydown)="onOptionKeydown($event)" [attr.aria-label]="option.label"
            [style.display]="visible ? 'block' : 'none'" [attr.tabindex]="option.disabled ? null : '0'" [ngStyle]="{'height': itemSize + 'px'}"
            [ngClass]="{'ui-state-highlight': selected, 'ui-state-disabled': (option.disabled || (maxSelectionLimitReached && !selected))}">
            <div class="ui-chkbox ui-widget">
                <div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default"
                    [ngClass]="{'ui-state-active': selected}">
                    <span class="ui-chkbox-icon ui-clickable" [ngClass]="{'pi pi-check': selected}"></span>
                </div>
            </div>
            <span *ngIf="!template">{{option.label}}</span>
            <ng-container *ngTemplateOutlet="template; context: {$implicit: option}"></ng-container>
        </li>
    `
    })
], MultiSelectItem);
export { MultiSelectItem };
let MultiSelect = class MultiSelect {
    constructor(el, renderer, cd) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.scrollHeight = '200px';
        this._defaultLabel = 'Choose';
        this.filter = true;
        this.displaySelectedLabel = true;
        this.maxSelectedLabels = 3;
        this.selectedItemsLabel = '{0} items selected';
        this.showToggleAll = true;
        this.emptyFilterMessage = 'No results found';
        this.resetFilterOnHide = false;
        this.dropdownIcon = 'pi pi-chevron-down';
        this.showHeader = true;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.filterBy = 'label';
        this.showTransitionOptions = '225ms ease-out';
        this.hideTransitionOptions = '195ms ease-in';
        this.filterMatchMode = "contains";
        this.tooltip = '';
        this.tooltipPosition = 'right';
        this.tooltipPositionStyle = 'absolute';
        this.autofocusFilter = true;
        this.onChange = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.onClick = new EventEmitter();
        this.onPanelShow = new EventEmitter();
        this.onPanelHide = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
        this.disabledSelectedOptions = [];
    }
    set defaultLabel(val) {
        this._defaultLabel = val;
        this.updateLabel();
    }
    get defaultLabel() {
        return this._defaultLabel;
    }
    get options() {
        return this._options;
    }
    set options(val) {
        let opts = this.optionLabel ? ObjectUtils.generateSelectItems(val, this.optionLabel) : val;
        this.visibleOptions = opts;
        this._options = opts;
        this.updateLabel();
        if (this.filterValue && this.filterValue.length) {
            this.activateFilter();
        }
    }
    ngOnInit() {
        this.updateLabel();
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                case 'selectedItems':
                    this.selectedItemsTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    ngAfterViewInit() {
        if (this.overlayVisible) {
            this.show();
        }
    }
    ngAfterViewChecked() {
        if (this.filtered) {
            this.alignOverlay();
            this.filtered = false;
        }
    }
    writeValue(value) {
        this.value = value;
        this.updateLabel();
        this.updateFilledState();
        this.setDisabledSelectedOptions();
        this.checkSelectionLimit();
        this.cd.markForCheck();
    }
    checkSelectionLimit() {
        if (this.selectionLimit && (this.value && this.value.length === this.selectionLimit)) {
            this.maxSelectionLimitReached = true;
        }
        else {
            this.maxSelectionLimitReached = false;
        }
    }
    updateFilledState() {
        this.filled = (this.value && this.value.length > 0);
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
    onOptionClick(event) {
        let option = event.option;
        if (option.disabled) {
            return;
        }
        const optionValue = option.value;
        let selectionIndex = this.findSelectionIndex(optionValue);
        if (selectionIndex != -1) {
            this.value = this.value.filter((val, i) => i != selectionIndex);
            if (this.selectionLimit) {
                this.maxSelectionLimitReached = false;
            }
        }
        else {
            if (!this.selectionLimit || (!this.value || this.value.length < this.selectionLimit)) {
                this.value = [...this.value || [], optionValue];
            }
            this.checkSelectionLimit();
        }
        this.onModelChange(this.value);
        this.onChange.emit({ originalEvent: event.originalEvent, value: this.value, itemValue: optionValue });
        this.updateLabel();
        this.updateFilledState();
    }
    isSelected(value) {
        return this.findSelectionIndex(value) != -1;
    }
    findSelectionIndex(val) {
        let index = -1;
        if (this.value) {
            for (let i = 0; i < this.value.length; i++) {
                if (ObjectUtils.equals(this.value[i], val, this.dataKey)) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }
    toggleAll(event) {
        if (this.isAllChecked()) {
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
            let opts = this.getVisibleOptions();
            if (opts) {
                let value = [];
                if (this.disabledSelectedOptions && this.disabledSelectedOptions.length > 0) {
                    value = [...this.disabledSelectedOptions];
                }
                for (let i = 0; i < opts.length; i++) {
                    let option = opts[i];
                    if (!option.disabled) {
                        value.push(opts[i].value);
                    }
                }
                this.value = value;
            }
        }
        this.onModelChange(this.value);
        this.onChange.emit({ originalEvent: event, value: this.value });
        this.updateFilledState();
        this.updateLabel();
    }
    isAllChecked() {
        if (this.filterValue && this.filterValue.trim().length) {
            return this.value && this.visibleOptions && this.visibleOptions.length && this.isAllVisibleOptionsChecked();
        }
        else {
            let optionCount = this.getEnabledOptionCount();
            let disabledSelectedOptionCount = this.disabledSelectedOptions.length;
            return this.value && this.options && (this.value.length > 0 && this.value.length == optionCount + disabledSelectedOptionCount);
        }
    }
    isAllVisibleOptionsChecked() {
        if (!this.visibleOptions || this.visibleOptions.length === 0) {
            return false;
        }
        else {
            for (let option of this.visibleOptions) {
                if (!this.isSelected(option.value)) {
                    return false;
                }
            }
            return true;
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
    setDisabledSelectedOptions() {
        if (this.options) {
            this.disabledSelectedOptions = [];
            if (this.value) {
                for (let opt of this.options) {
                    if (opt.disabled && this.isSelected(opt.value)) {
                        this.disabledSelectedOptions.push(opt.value);
                    }
                }
            }
        }
    }
    show() {
        if (!this.overlayVisible) {
            this.overlayVisible = true;
        }
    }
    onOverlayAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                this.overlay = event.element;
                this.appendOverlay();
                if (this.autoZIndex) {
                    this.overlay.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
                }
                this.alignOverlay();
                this.bindDocumentClickListener();
                this.bindDocumentResizeListener();
                if (this.filterInputChild && this.filterInputChild.nativeElement) {
                    this.preventModelTouched = true;
                    if (this.autofocusFilter) {
                        this.filterInputChild.nativeElement.focus();
                    }
                }
                this.onPanelShow.emit();
                break;
            case 'void':
                this.onOverlayHide();
                break;
        }
    }
    appendOverlay() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.overlay);
            else
                DomHandler.appendChild(this.overlay, this.appendTo);
            if (!this.overlay.style.minWidth) {
                this.overlay.style.minWidth = DomHandler.getWidth(this.containerViewChild.nativeElement) + 'px';
            }
        }
    }
    restoreOverlayAppend() {
        if (this.overlay && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    }
    alignOverlay() {
        if (this.overlay) {
            if (this.appendTo)
                DomHandler.absolutePosition(this.overlay, this.containerViewChild.nativeElement);
            else
                DomHandler.relativePosition(this.overlay, this.containerViewChild.nativeElement);
        }
    }
    hide() {
        this.overlayVisible = false;
        this.unbindDocumentClickListener();
        if (this.resetFilterOnHide) {
            this.filterInputChild.nativeElement.value = '';
            this.onFilter();
        }
        this.onPanelHide.emit();
    }
    close(event) {
        this.hide();
        event.preventDefault();
        event.stopPropagation();
    }
    onMouseclick(event, input) {
        if (this.disabled || this.readonly) {
            return;
        }
        this.onClick.emit(event);
        if (!this.panelClick) {
            if (this.overlayVisible) {
                this.hide();
            }
            else {
                input.focus();
                this.show();
            }
        }
        this.selfClick = true;
    }
    onInputFocus(event) {
        this.focus = true;
        this.onFocus.emit({ originalEvent: event });
    }
    onInputBlur(event) {
        this.focus = false;
        this.onBlur.emit({ originalEvent: event });
        if (!this.preventModelTouched) {
            this.onModelTouched();
        }
        this.preventModelTouched = false;
    }
    onOptionKeydown(event) {
        if (this.readonly) {
            return;
        }
        switch (event.originalEvent.which) {
            //down
            case 40:
                var nextItem = this.findNextItem(event.originalEvent.target.parentElement);
                if (nextItem) {
                    nextItem.focus();
                }
                event.originalEvent.preventDefault();
                break;
            //up
            case 38:
                var prevItem = this.findPrevItem(event.originalEvent.target.parentElement);
                if (prevItem) {
                    prevItem.focus();
                }
                event.originalEvent.preventDefault();
                break;
            //enter
            case 13:
                this.onOptionClick(event);
                event.originalEvent.preventDefault();
                break;
        }
    }
    findNextItem(item) {
        let nextItem = item.nextElementSibling;
        if (nextItem)
            return DomHandler.hasClass(nextItem.children[0], 'ui-state-disabled') || DomHandler.isHidden(nextItem.children[0]) ? this.findNextItem(nextItem) : nextItem.children[0];
        else
            return null;
    }
    findPrevItem(item) {
        let prevItem = item.previousElementSibling;
        if (prevItem)
            return DomHandler.hasClass(prevItem.children[0], 'ui-state-disabled') || DomHandler.isHidden(prevItem.children[0]) ? this.findPrevItem(prevItem) : prevItem.children[0];
        else
            return null;
    }
    onKeydown(event) {
        switch (event.which) {
            //down
            case 40:
                if (!this.overlayVisible && event.altKey) {
                    this.show();
                    event.preventDefault();
                }
                break;
            //space
            case 32:
                if (!this.overlayVisible) {
                    this.show();
                    event.preventDefault();
                }
                break;
            //escape
            case 27:
                this.hide();
                break;
        }
    }
    updateLabel() {
        if (this.value && this.options && this.value.length && this.displaySelectedLabel) {
            let label = '';
            for (let i = 0; i < this.value.length; i++) {
                let itemLabel = this.findLabelByValue(this.value[i]);
                if (itemLabel) {
                    if (label.length > 0) {
                        label = label + ', ';
                    }
                    label = label + itemLabel;
                }
            }
            if (this.value.length <= this.maxSelectedLabels) {
                this.valuesAsString = label;
            }
            else {
                let pattern = /{(.*?)}/;
                if (pattern.test(this.selectedItemsLabel)) {
                    this.valuesAsString = this.selectedItemsLabel.replace(this.selectedItemsLabel.match(pattern)[0], this.value.length + '');
                }
                else {
                    this.valuesAsString = this.selectedItemsLabel;
                }
            }
        }
        else {
            this.valuesAsString = this.defaultLabel;
        }
    }
    findLabelByValue(val) {
        let label = null;
        for (let i = 0; i < this.options.length; i++) {
            let option = this.options[i];
            if (val == null && option.value == null || ObjectUtils.equals(val, option.value, this.dataKey)) {
                label = option.label;
                break;
            }
        }
        return label;
    }
    onFilter() {
        let inputValue = this.filterInputChild.nativeElement.value;
        if (inputValue && inputValue.length) {
            this.filterValue = inputValue;
            this.activateFilter();
        }
        else {
            this.filterValue = null;
            this.visibleOptions = this.options;
            this.filtered = false;
        }
    }
    activateFilter() {
        if (this.options && this.options.length) {
            let searchFields = this.filterBy.split(',');
            this.visibleOptions = FilterUtils.filter(this.options, searchFields, this.filterValue, this.filterMatchMode, this.filterLocale);
            this.filtered = true;
        }
    }
    isItemVisible(option) {
        if (this.filterValue && this.filterValue.trim().length) {
            for (let i = 0; i < this.visibleOptions.length; i++) {
                if (this.visibleOptions[i].value == option.value) {
                    return true;
                }
            }
        }
        else {
            return true;
        }
    }
    getVisibleOptions() {
        return this.visibleOptions || this.options;
    }
    onHeaderCheckboxFocus() {
        this.headerCheckboxFocus = true;
    }
    onHeaderCheckboxBlur() {
        this.headerCheckboxFocus = false;
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', () => {
                if (!this.selfClick && !this.panelClick && this.overlayVisible) {
                    this.hide();
                }
                this.selfClick = false;
                this.panelClick = false;
                this.cd.markForCheck();
            });
        }
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
    bindDocumentResizeListener() {
        this.documentResizeListener = this.onWindowResize.bind(this);
        window.addEventListener('resize', this.documentResizeListener);
    }
    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    }
    onWindowResize() {
        if (!DomHandler.isAndroid()) {
            this.hide();
        }
    }
    onOverlayHide() {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.overlay = null;
        this.onModelTouched();
    }
    ngOnDestroy() {
        this.restoreOverlayAppend();
        this.onOverlayHide();
    }
};
MultiSelect.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], MultiSelect.prototype, "scrollHeight", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "defaultLabel", null);
__decorate([
    Input()
], MultiSelect.prototype, "style", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "styleClass", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "panelStyle", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "panelStyleClass", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "inputId", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "disabled", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "readonly", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "filter", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "filterPlaceHolder", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "filterLocale", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "overlayVisible", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "tabindex", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "appendTo", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "dataKey", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "name", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "ariaLabelledBy", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "displaySelectedLabel", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "maxSelectedLabels", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "selectionLimit", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "selectedItemsLabel", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "showToggleAll", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "emptyFilterMessage", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "resetFilterOnHide", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "dropdownIcon", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "optionLabel", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "showHeader", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "autoZIndex", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "baseZIndex", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "filterBy", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "virtualScroll", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "itemSize", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "showTransitionOptions", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "hideTransitionOptions", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "ariaFilterLabel", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "filterMatchMode", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "tooltip", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "tooltipPosition", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "tooltipPositionStyle", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "tooltipStyleClass", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "autofocusFilter", void 0);
__decorate([
    ViewChild('container')
], MultiSelect.prototype, "containerViewChild", void 0);
__decorate([
    ViewChild('filterInput')
], MultiSelect.prototype, "filterInputChild", void 0);
__decorate([
    ContentChild(Footer)
], MultiSelect.prototype, "footerFacet", void 0);
__decorate([
    ContentChild(Header)
], MultiSelect.prototype, "headerFacet", void 0);
__decorate([
    ContentChildren(PrimeTemplate)
], MultiSelect.prototype, "templates", void 0);
__decorate([
    Output()
], MultiSelect.prototype, "onChange", void 0);
__decorate([
    Output()
], MultiSelect.prototype, "onFocus", void 0);
__decorate([
    Output()
], MultiSelect.prototype, "onBlur", void 0);
__decorate([
    Output()
], MultiSelect.prototype, "onClick", void 0);
__decorate([
    Output()
], MultiSelect.prototype, "onPanelShow", void 0);
__decorate([
    Output()
], MultiSelect.prototype, "onPanelHide", void 0);
__decorate([
    Input()
], MultiSelect.prototype, "options", null);
MultiSelect = __decorate([
    Component({
        selector: 'p-multiSelect',
        template: `
        <div #container [ngClass]="{'ui-multiselect ui-widget ui-state-default ui-corner-all':true,'ui-multiselect-open':overlayVisible,'ui-state-focus':focus,'ui-state-disabled': disabled}" [ngStyle]="style" [class]="styleClass"
            (click)="onMouseclick($event,in)">
            <div class="ui-helper-hidden-accessible">
                <input #in type="text" readonly="readonly" [attr.id]="inputId" [attr.name]="name" (focus)="onInputFocus($event)" (blur)="onInputBlur($event)"
                       [disabled]="disabled" [attr.tabindex]="tabindex" (keydown)="onKeydown($event)" aria-haspopup="listbox" [attr.aria-expanded]="overlayVisible"
                       [attr.aria-labelledby]="ariaLabelledBy" role="listbox">
            </div>
            <div class="ui-multiselect-label-container" [pTooltip]="tooltip" [tooltipPosition]="tooltipPosition" [positionStyle]="tooltipPositionStyle" [tooltipStyleClass]="tooltipStyleClass">
                <span class="ui-multiselect-label ui-corner-all">
                    <ng-container *ngIf="!selectedItemsTemplate">{{valuesAsString}}</ng-container>
                    <ng-container *ngTemplateOutlet="selectedItemsTemplate; context: {$implicit: value}"></ng-container>
                </span>
            </div>
            <div [ngClass]="{'ui-multiselect-trigger ui-state-default ui-corner-right':true}">
                <span class="ui-multiselect-trigger-icon ui-clickable" [ngClass]="dropdownIcon"></span>
            </div>
            <div *ngIf="overlayVisible" [ngClass]="['ui-multiselect-panel ui-widget ui-widget-content ui-corner-all ui-shadow']" [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" (@overlayAnimation.start)="onOverlayAnimationStart($event)"
                [ngStyle]="panelStyle" [class]="panelStyleClass" (click)="panelClick=true" (keydown)="onKeydown($event)">
                <div class="ui-widget-header ui-corner-all ui-multiselect-header ui-helper-clearfix" [ngClass]="{'ui-multiselect-header-no-toggleall': !showToggleAll}" *ngIf="showHeader">
                <ng-content select="p-header"></ng-content>
                <div class="ui-chkbox ui-widget" *ngIf="showToggleAll && !selectionLimit">
                        <div class="ui-helper-hidden-accessible">
                            <input type="checkbox" readonly="readonly" [checked]="isAllChecked()" (focus)="onHeaderCheckboxFocus()" (blur)="onHeaderCheckboxBlur()" (keydown.space)="toggleAll($event)">
                        </div>
                        <div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default" role="checkbox" [attr.aria-checked]="isAllChecked()" [ngClass]="{'ui-state-active':isAllChecked(), 'ui-state-focus': headerCheckboxFocus}" (click)="toggleAll($event)">
                            <span class="ui-chkbox-icon ui-clickable" [ngClass]="{'pi pi-check':isAllChecked()}"></span>
                        </div>
                    </div>
                    <div class="ui-multiselect-filter-container" *ngIf="filter">
                        <input #filterInput type="text" role="textbox" [value]="filterValue||''" (input)="onFilter()" class="ui-inputtext ui-widget ui-state-default ui-corner-all" [attr.placeholder]="filterPlaceHolder" [attr.aria-label]="ariaFilterLabel">
                        <span class="ui-multiselect-filter-icon pi pi-search"></span>
                    </div>
                    <a class="ui-multiselect-close ui-corner-all" tabindex="0" (click)="close($event)" (keydown.enter)="close($event)">
                        <span class="pi pi-times"></span>
                    </a>
                </div>
                <div class="ui-multiselect-items-wrapper" [style.max-height]="virtualScroll ? 'auto' : (scrollHeight||'auto')">
                    <ul class="ui-multiselect-items ui-multiselect-list ui-widget-content ui-widget ui-corner-all ui-helper-reset" role="listbox" aria-multiselectable="true">
                        <ng-container *ngIf="!virtualScroll; else virtualScrollList">
                            <ng-template ngFor let-option let-i="index" [ngForOf]="options">
                                <p-multiSelectItem [option]="option" [selected]="isSelected(option.value)" (onClick)="onOptionClick($event)" (onKeydown)="onOptionKeydown($event)"
                                        [maxSelectionLimitReached]="maxSelectionLimitReached" [visible]="isItemVisible(option)" [template]="itemTemplate"></p-multiSelectItem>
                            </ng-template>
                        </ng-container>
                        <ng-template #virtualScrollList>
                            <cdk-virtual-scroll-viewport #viewport [ngStyle]="{'height': scrollHeight}" [itemSize]="itemSize" *ngIf="virtualScroll && visibleOptions && visibleOptions.length">
                                <ng-container *cdkVirtualFor="let option of visibleOptions; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd">
                                    <p-multiSelectItem [option]="option" [selected]="isSelected(option.value)" (onClick)="onOptionClick($event)" (onKeydown)="onOptionKeydown($event)"
                                        [maxSelectionLimitReached]="maxSelectionLimitReached" [visible]="isItemVisible(option)" [template]="itemTemplate" [itemSize]="itemSize"></p-multiSelectItem>
                                </ng-container>
                            </cdk-virtual-scroll-viewport>
                        </ng-template>
                        <li *ngIf="filter && visibleOptions && visibleOptions.length === 0" class="ui-multiselect-empty-message">{{emptyFilterMessage}}</li>
                    </ul>
                </div>
                <div class="ui-multiselect-footer ui-widget-content" *ngIf="footerFacet">
                    <ng-content select="p-footer"></ng-content>
                </div>
            </div>
        </div>
    `,
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
        host: {
            '[class.ui-inputwrapper-filled]': 'filled',
            '[class.ui-inputwrapper-focus]': 'focus'
        },
        providers: [MULTISELECT_VALUE_ACCESSOR],
        changeDetection: ChangeDetectionStrategy.Default
    })
], MultiSelect);
export { MultiSelect };
let MultiSelectModule = class MultiSelectModule {
};
MultiSelectModule = __decorate([
    NgModule({
        imports: [CommonModule, SharedModule, ScrollingModule, TooltipModule],
        exports: [MultiSelect, SharedModule, ScrollingModule],
        declarations: [MultiSelect, MultiSelectItem]
    })
], MultiSelectModule);
export { MultiSelectModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlzZWxlY3QuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL211bHRpc2VsZWN0LyIsInNvdXJjZXMiOlsibXVsdGlzZWxlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFDbEosVUFBVSxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEosT0FBTyxFQUFFLE9BQU8sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQWdCLE1BQU0scUJBQXFCLENBQUM7QUFDM0YsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFOUMsTUFBTSxDQUFDLE1BQU0sMEJBQTBCLEdBQVE7SUFDN0MsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUs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LEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDO29CQUNuQixTQUFTLEVBQUUsZUFBZTtvQkFDMUIsT0FBTyxFQUFFLENBQUM7aUJBQ2IsQ0FBQyxDQUFDO2dCQUNILFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztnQkFDbEUsVUFBVSxDQUFDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO2FBQ3JFLENBQUM7U0FDTDtRQUNELElBQUksRUFBRTtZQUNGLGdDQUFnQyxFQUFFLFFBQVE7WUFDMUMsK0JBQStCLEVBQUUsT0FBTztTQUMzQztRQUNELFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDO1FBQ3ZDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO0tBQ25ELENBQUM7R0FDVyxXQUFXLENBNHNCdkI7U0E1c0JZLFdBQVc7QUFtdEJ4QixJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtDQUFJLENBQUE7QUFBckIsaUJBQWlCO0lBTDdCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBQyxZQUFZLEVBQUMsZUFBZSxFQUFFLGFBQWEsQ0FBQztRQUNuRSxPQUFPLEVBQUUsQ0FBQyxXQUFXLEVBQUMsWUFBWSxFQUFDLGVBQWUsQ0FBQztRQUNuRCxZQUFZLEVBQUUsQ0FBQyxXQUFXLEVBQUMsZUFBZSxDQUFDO0tBQzlDLENBQUM7R0FDVyxpQkFBaUIsQ0FBSTtTQUFyQixpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIEFmdGVyVmlld0luaXQsIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSwgSW5wdXQsIE91dHB1dCwgUmVuZGVyZXIyLCBFdmVudEVtaXR0ZXIsXHJcbiAgICBmb3J3YXJkUmVmLCBWaWV3Q2hpbGQsIENoYW5nZURldGVjdG9yUmVmLCBUZW1wbGF0ZVJlZiwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIENvbnRlbnRDaGlsZCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgdHJpZ2dlcixzdGF0ZSxzdHlsZSx0cmFuc2l0aW9uLGFuaW1hdGUsQW5pbWF0aW9uRXZlbnR9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBTZWxlY3RJdGVtIH0gZnJvbSAncHJpbWVuZy9hcGknO1xyXG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xyXG5pbXBvcnQgeyBPYmplY3RVdGlscyB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xyXG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUsIFByaW1lVGVtcGxhdGUsIEZvb3RlciwgSGVhZGVyIH0gZnJvbSAncHJpbWVuZy9hcGknO1xyXG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFNjcm9sbGluZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xyXG5pbXBvcnQgeyBGaWx0ZXJVdGlscyB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xyXG5pbXBvcnQge1Rvb2x0aXBNb2R1bGV9IGZyb20gJ3ByaW1lbmcvdG9vbHRpcCc7XHJcblxyXG5leHBvcnQgY29uc3QgTVVMVElTRUxFQ1RfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcclxuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNdWx0aVNlbGVjdCksXHJcbiAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLW11bHRpU2VsZWN0SXRlbScsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxsaSBjbGFzcz1cInVpLW11bHRpc2VsZWN0LWl0ZW0gdWktY29ybmVyLWFsbFwiIChjbGljayk9XCJvbk9wdGlvbkNsaWNrKCRldmVudClcIiAoa2V5ZG93bik9XCJvbk9wdGlvbktleWRvd24oJGV2ZW50KVwiIFthdHRyLmFyaWEtbGFiZWxdPVwib3B0aW9uLmxhYmVsXCJcclxuICAgICAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwidmlzaWJsZSA/ICdibG9jaycgOiAnbm9uZSdcIiBbYXR0ci50YWJpbmRleF09XCJvcHRpb24uZGlzYWJsZWQgPyBudWxsIDogJzAnXCIgW25nU3R5bGVdPVwieydoZWlnaHQnOiBpdGVtU2l6ZSArICdweCd9XCJcclxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1oaWdobGlnaHQnOiBzZWxlY3RlZCwgJ3VpLXN0YXRlLWRpc2FibGVkJzogKG9wdGlvbi5kaXNhYmxlZCB8fCAobWF4U2VsZWN0aW9uTGltaXRSZWFjaGVkICYmICFzZWxlY3RlZCkpfVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktY2hrYm94IHVpLXdpZGdldFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWNoa2JveC1ib3ggdWktd2lkZ2V0IHVpLWNvcm5lci1hbGwgdWktc3RhdGUtZGVmYXVsdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1hY3RpdmUnOiBzZWxlY3RlZH1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWNoa2JveC1pY29uIHVpLWNsaWNrYWJsZVwiIFtuZ0NsYXNzXT1cInsncGkgcGktY2hlY2snOiBzZWxlY3RlZH1cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIXRlbXBsYXRlXCI+e3tvcHRpb24ubGFiZWx9fTwvc3Bhbj5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiBvcHRpb259XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgPC9saT5cclxuICAgIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIE11bHRpU2VsZWN0SXRlbSB7XHJcblxyXG4gICAgQElucHV0KCkgb3B0aW9uOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgc2VsZWN0ZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgdmlzaWJsZTogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSBpdGVtU2l6ZTogbnVtYmVyO1xyXG5cclxuICAgIEBJbnB1dCgpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAgIEBJbnB1dCgpIG1heFNlbGVjdGlvbkxpbWl0UmVhY2hlZDogYm9vbGVhbjtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25DbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uS2V5ZG93bjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgb25PcHRpb25DbGljayhldmVudDogRXZlbnQpIHtcclxuICAgICAgICB0aGlzLm9uQ2xpY2suZW1pdCh7XHJcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgICAgICBvcHRpb246IHRoaXMub3B0aW9uXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25PcHRpb25LZXlkb3duKGV2ZW50OiBFdmVudCkge1xyXG4gICAgICAgIHRoaXMub25LZXlkb3duLmVtaXQoe1xyXG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgb3B0aW9uOiB0aGlzLm9wdGlvblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC1tdWx0aVNlbGVjdCcsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgI2NvbnRhaW5lciBbbmdDbGFzc109XCJ7J3VpLW11bHRpc2VsZWN0IHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGwnOnRydWUsJ3VpLW11bHRpc2VsZWN0LW9wZW4nOm92ZXJsYXlWaXNpYmxlLCd1aS1zdGF0ZS1mb2N1cyc6Zm9jdXMsJ3VpLXN0YXRlLWRpc2FibGVkJzogZGlzYWJsZWR9XCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiXHJcbiAgICAgICAgICAgIChjbGljayk9XCJvbk1vdXNlY2xpY2soJGV2ZW50LGluKVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktaGVscGVyLWhpZGRlbi1hY2Nlc3NpYmxlXCI+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgI2luIHR5cGU9XCJ0ZXh0XCIgcmVhZG9ubHk9XCJyZWFkb25seVwiIFthdHRyLmlkXT1cImlucHV0SWRcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIiAoZm9jdXMpPVwib25JbnB1dEZvY3VzKCRldmVudClcIiAoYmx1cik9XCJvbklucHV0Qmx1cigkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiIChrZXlkb3duKT1cIm9uS2V5ZG93bigkZXZlbnQpXCIgYXJpYS1oYXNwb3B1cD1cImxpc3Rib3hcIiBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cIm92ZXJsYXlWaXNpYmxlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkQnlcIiByb2xlPVwibGlzdGJveFwiPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLW11bHRpc2VsZWN0LWxhYmVsLWNvbnRhaW5lclwiIFtwVG9vbHRpcF09XCJ0b29sdGlwXCIgW3Rvb2x0aXBQb3NpdGlvbl09XCJ0b29sdGlwUG9zaXRpb25cIiBbcG9zaXRpb25TdHlsZV09XCJ0b29sdGlwUG9zaXRpb25TdHlsZVwiIFt0b29sdGlwU3R5bGVDbGFzc109XCJ0b29sdGlwU3R5bGVDbGFzc1wiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tdWx0aXNlbGVjdC1sYWJlbCB1aS1jb3JuZXItYWxsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFzZWxlY3RlZEl0ZW1zVGVtcGxhdGVcIj57e3ZhbHVlc0FzU3RyaW5nfX08L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwic2VsZWN0ZWRJdGVtc1RlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiB2YWx1ZX1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyd1aS1tdWx0aXNlbGVjdC10cmlnZ2VyIHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLXJpZ2h0Jzp0cnVlfVwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tdWx0aXNlbGVjdC10cmlnZ2VyLWljb24gdWktY2xpY2thYmxlXCIgW25nQ2xhc3NdPVwiZHJvcGRvd25JY29uXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cIm92ZXJsYXlWaXNpYmxlXCIgW25nQ2xhc3NdPVwiWyd1aS1tdWx0aXNlbGVjdC1wYW5lbCB1aS13aWRnZXQgdWktd2lkZ2V0LWNvbnRlbnQgdWktY29ybmVyLWFsbCB1aS1zaGFkb3cnXVwiIFtAb3ZlcmxheUFuaW1hdGlvbl09XCJ7dmFsdWU6ICd2aXNpYmxlJywgcGFyYW1zOiB7c2hvd1RyYW5zaXRpb25QYXJhbXM6IHNob3dUcmFuc2l0aW9uT3B0aW9ucywgaGlkZVRyYW5zaXRpb25QYXJhbXM6IGhpZGVUcmFuc2l0aW9uT3B0aW9uc319XCIgKEBvdmVybGF5QW5pbWF0aW9uLnN0YXJ0KT1cIm9uT3ZlcmxheUFuaW1hdGlvblN0YXJ0KCRldmVudClcIlxyXG4gICAgICAgICAgICAgICAgW25nU3R5bGVdPVwicGFuZWxTdHlsZVwiIFtjbGFzc109XCJwYW5lbFN0eWxlQ2xhc3NcIiAoY2xpY2spPVwicGFuZWxDbGljaz10cnVlXCIgKGtleWRvd24pPVwib25LZXlkb3duKCRldmVudClcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS13aWRnZXQtaGVhZGVyIHVpLWNvcm5lci1hbGwgdWktbXVsdGlzZWxlY3QtaGVhZGVyIHVpLWhlbHBlci1jbGVhcmZpeFwiIFtuZ0NsYXNzXT1cInsndWktbXVsdGlzZWxlY3QtaGVhZGVyLW5vLXRvZ2dsZWFsbCc6ICFzaG93VG9nZ2xlQWxsfVwiICpuZ0lmPVwic2hvd0hlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwicC1oZWFkZXJcIj48L25nLWNvbnRlbnQ+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktY2hrYm94IHVpLXdpZGdldFwiICpuZ0lmPVwic2hvd1RvZ2dsZUFsbCAmJiAhc2VsZWN0aW9uTGltaXRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWhlbHBlci1oaWRkZW4tYWNjZXNzaWJsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIHJlYWRvbmx5PVwicmVhZG9ubHlcIiBbY2hlY2tlZF09XCJpc0FsbENoZWNrZWQoKVwiIChmb2N1cyk9XCJvbkhlYWRlckNoZWNrYm94Rm9jdXMoKVwiIChibHVyKT1cIm9uSGVhZGVyQ2hlY2tib3hCbHVyKClcIiAoa2V5ZG93bi5zcGFjZSk9XCJ0b2dnbGVBbGwoJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWNoa2JveC1ib3ggdWktd2lkZ2V0IHVpLWNvcm5lci1hbGwgdWktc3RhdGUtZGVmYXVsdFwiIHJvbGU9XCJjaGVja2JveFwiIFthdHRyLmFyaWEtY2hlY2tlZF09XCJpc0FsbENoZWNrZWQoKVwiIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtYWN0aXZlJzppc0FsbENoZWNrZWQoKSwgJ3VpLXN0YXRlLWZvY3VzJzogaGVhZGVyQ2hlY2tib3hGb2N1c31cIiAoY2xpY2spPVwidG9nZ2xlQWxsKCRldmVudClcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktY2hrYm94LWljb24gdWktY2xpY2thYmxlXCIgW25nQ2xhc3NdPVwieydwaSBwaS1jaGVjayc6aXNBbGxDaGVja2VkKCl9XCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktbXVsdGlzZWxlY3QtZmlsdGVyLWNvbnRhaW5lclwiICpuZ0lmPVwiZmlsdGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCAjZmlsdGVySW5wdXQgdHlwZT1cInRleHRcIiByb2xlPVwidGV4dGJveFwiIFt2YWx1ZV09XCJmaWx0ZXJWYWx1ZXx8JydcIiAoaW5wdXQpPVwib25GaWx0ZXIoKVwiIGNsYXNzPVwidWktaW5wdXR0ZXh0IHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGxcIiBbYXR0ci5wbGFjZWhvbGRlcl09XCJmaWx0ZXJQbGFjZUhvbGRlclwiIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUZpbHRlckxhYmVsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktbXVsdGlzZWxlY3QtZmlsdGVyLWljb24gcGkgcGktc2VhcmNoXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwidWktbXVsdGlzZWxlY3QtY2xvc2UgdWktY29ybmVyLWFsbFwiIHRhYmluZGV4PVwiMFwiIChjbGljayk9XCJjbG9zZSgkZXZlbnQpXCIgKGtleWRvd24uZW50ZXIpPVwiY2xvc2UoJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBpIHBpLXRpbWVzXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLW11bHRpc2VsZWN0LWl0ZW1zLXdyYXBwZXJcIiBbc3R5bGUubWF4LWhlaWdodF09XCJ2aXJ0dWFsU2Nyb2xsID8gJ2F1dG8nIDogKHNjcm9sbEhlaWdodHx8J2F1dG8nKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cInVpLW11bHRpc2VsZWN0LWl0ZW1zIHVpLW11bHRpc2VsZWN0LWxpc3QgdWktd2lkZ2V0LWNvbnRlbnQgdWktd2lkZ2V0IHVpLWNvcm5lci1hbGwgdWktaGVscGVyLXJlc2V0XCIgcm9sZT1cImxpc3Rib3hcIiBhcmlhLW11bHRpc2VsZWN0YWJsZT1cInRydWVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiF2aXJ0dWFsU2Nyb2xsOyBlbHNlIHZpcnR1YWxTY3JvbGxMaXN0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LW9wdGlvbiBsZXQtaT1cImluZGV4XCIgW25nRm9yT2ZdPVwib3B0aW9uc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwLW11bHRpU2VsZWN0SXRlbSBbb3B0aW9uXT1cIm9wdGlvblwiIFtzZWxlY3RlZF09XCJpc1NlbGVjdGVkKG9wdGlvbi52YWx1ZSlcIiAob25DbGljayk9XCJvbk9wdGlvbkNsaWNrKCRldmVudClcIiAob25LZXlkb3duKT1cIm9uT3B0aW9uS2V5ZG93bigkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFttYXhTZWxlY3Rpb25MaW1pdFJlYWNoZWRdPVwibWF4U2VsZWN0aW9uTGltaXRSZWFjaGVkXCIgW3Zpc2libGVdPVwiaXNJdGVtVmlzaWJsZShvcHRpb24pXCIgW3RlbXBsYXRlXT1cIml0ZW1UZW1wbGF0ZVwiPjwvcC1tdWx0aVNlbGVjdEl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICN2aXJ0dWFsU2Nyb2xsTGlzdD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnQgI3ZpZXdwb3J0IFtuZ1N0eWxlXT1cInsnaGVpZ2h0Jzogc2Nyb2xsSGVpZ2h0fVwiIFtpdGVtU2l6ZV09XCJpdGVtU2l6ZVwiICpuZ0lmPVwidmlydHVhbFNjcm9sbCAmJiB2aXNpYmxlT3B0aW9ucyAmJiB2aXNpYmxlT3B0aW9ucy5sZW5ndGhcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpjZGtWaXJ0dWFsRm9yPVwibGV0IG9wdGlvbiBvZiB2aXNpYmxlT3B0aW9uczsgbGV0IGkgPSBpbmRleDsgbGV0IGMgPSBjb3VudDsgbGV0IGYgPSBmaXJzdDsgbGV0IGwgPSBsYXN0OyBsZXQgZSA9IGV2ZW47IGxldCBvID0gb2RkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwLW11bHRpU2VsZWN0SXRlbSBbb3B0aW9uXT1cIm9wdGlvblwiIFtzZWxlY3RlZF09XCJpc1NlbGVjdGVkKG9wdGlvbi52YWx1ZSlcIiAob25DbGljayk9XCJvbk9wdGlvbkNsaWNrKCRldmVudClcIiAob25LZXlkb3duKT1cIm9uT3B0aW9uS2V5ZG93bigkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFttYXhTZWxlY3Rpb25MaW1pdFJlYWNoZWRdPVwibWF4U2VsZWN0aW9uTGltaXRSZWFjaGVkXCIgW3Zpc2libGVdPVwiaXNJdGVtVmlzaWJsZShvcHRpb24pXCIgW3RlbXBsYXRlXT1cIml0ZW1UZW1wbGF0ZVwiIFtpdGVtU2l6ZV09XCJpdGVtU2l6ZVwiPjwvcC1tdWx0aVNlbGVjdEl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Nkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpICpuZ0lmPVwiZmlsdGVyICYmIHZpc2libGVPcHRpb25zICYmIHZpc2libGVPcHRpb25zLmxlbmd0aCA9PT0gMFwiIGNsYXNzPVwidWktbXVsdGlzZWxlY3QtZW1wdHktbWVzc2FnZVwiPnt7ZW1wdHlGaWx0ZXJNZXNzYWdlfX08L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1tdWx0aXNlbGVjdC1mb290ZXIgdWktd2lkZ2V0LWNvbnRlbnRcIiAqbmdJZj1cImZvb3RlckZhY2V0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwicC1mb290ZXJcIj48L25nLWNvbnRlbnQ+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICAgIHRyaWdnZXIoJ292ZXJsYXlBbmltYXRpb24nLCBbXHJcbiAgICAgICAgICAgIHN0YXRlKCd2b2lkJywgc3R5bGUoe1xyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSg1JSknLFxyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMFxyXG4gICAgICAgICAgICB9KSksXHJcbiAgICAgICAgICAgIHN0YXRlKCd2aXNpYmxlJywgc3R5bGUoe1xyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKScsXHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgICAgICAgIH0pKSxcclxuICAgICAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiB2aXNpYmxlJywgYW5pbWF0ZSgne3tzaG93VHJhbnNpdGlvblBhcmFtc319JykpLFxyXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlID0+IHZvaWQnLCBhbmltYXRlKCd7e2hpZGVUcmFuc2l0aW9uUGFyYW1zfX0nKSlcclxuICAgICAgICBdKVxyXG4gICAgXSxcclxuICAgIGhvc3Q6IHtcclxuICAgICAgICAnW2NsYXNzLnVpLWlucHV0d3JhcHBlci1maWxsZWRdJzogJ2ZpbGxlZCcsXHJcbiAgICAgICAgJ1tjbGFzcy51aS1pbnB1dHdyYXBwZXItZm9jdXNdJzogJ2ZvY3VzJ1xyXG4gICAgfSxcclxuICAgIHByb3ZpZGVyczogW01VTFRJU0VMRUNUX1ZBTFVFX0FDQ0VTU09SXSxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTXVsdGlTZWxlY3QgaW1wbGVtZW50cyBPbkluaXQsQWZ0ZXJWaWV3SW5pdCxBZnRlckNvbnRlbnRJbml0LEFmdGVyVmlld0NoZWNrZWQsT25EZXN0cm95LENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuXHJcbiAgICBASW5wdXQoKSBzY3JvbGxIZWlnaHQ6IHN0cmluZyA9ICcyMDBweCc7XHJcblxyXG4gICAgX2RlZmF1bHRMYWJlbDogc3RyaW5nID0gJ0Nob29zZSc7XHJcblxyXG4gICAgQElucHV0KCkgc2V0IGRlZmF1bHRMYWJlbCh2YWw6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2RlZmF1bHRMYWJlbCA9IHZhbDtcclxuICAgICAgICB0aGlzLnVwZGF0ZUxhYmVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRlZmF1bHRMYWJlbCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZWZhdWx0TGFiZWw7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgcGFuZWxTdHlsZTogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIHBhbmVsU3R5bGVDbGFzczogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGlucHV0SWQ6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSByZWFkb25seTogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSBmaWx0ZXI6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIGZpbHRlclBsYWNlSG9sZGVyOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgZmlsdGVyTG9jYWxlOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgb3ZlcmxheVZpc2libGU6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlcjtcclxuXHJcbiAgICBASW5wdXQoKSBhcHBlbmRUbzogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIGRhdGFLZXk6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgYXJpYUxhYmVsbGVkQnk6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBkaXNwbGF5U2VsZWN0ZWRMYWJlbDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgQElucHV0KCkgbWF4U2VsZWN0ZWRMYWJlbHM6IG51bWJlciA9IDM7XHJcblxyXG4gICAgQElucHV0KCkgc2VsZWN0aW9uTGltaXQ6IG51bWJlcjtcclxuXHJcbiAgICBASW5wdXQoKSBzZWxlY3RlZEl0ZW1zTGFiZWw6IHN0cmluZyA9ICd7MH0gaXRlbXMgc2VsZWN0ZWQnO1xyXG5cclxuICAgIEBJbnB1dCgpIHNob3dUb2dnbGVBbGw6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIGVtcHR5RmlsdGVyTWVzc2FnZTogc3RyaW5nID0gJ05vIHJlc3VsdHMgZm91bmQnO1xyXG5cclxuICAgIEBJbnB1dCgpIHJlc2V0RmlsdGVyT25IaWRlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgQElucHV0KCkgZHJvcGRvd25JY29uOiBzdHJpbmcgPSAncGkgcGktY2hldnJvbi1kb3duJztcclxuXHJcbiAgICBASW5wdXQoKSBvcHRpb25MYWJlbDogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIHNob3dIZWFkZXI6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIGF1dG9aSW5kZXg6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIGJhc2VaSW5kZXg6IG51bWJlciA9IDA7XHJcblxyXG4gICAgQElucHV0KCkgZmlsdGVyQnk6IHN0cmluZyA9ICdsYWJlbCc7XHJcblxyXG4gICAgQElucHV0KCkgdmlydHVhbFNjcm9sbDogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSBpdGVtU2l6ZTogbnVtYmVyO1xyXG5cclxuICAgIEBJbnB1dCgpIHNob3dUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJzIyNW1zIGVhc2Utb3V0JztcclxuXHJcbiAgICBASW5wdXQoKSBoaWRlVHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICcxOTVtcyBlYXNlLWluJztcclxuXHJcbiAgICBASW5wdXQoKSBhcmlhRmlsdGVyTGFiZWw6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBmaWx0ZXJNYXRjaE1vZGU6IHN0cmluZyA9IFwiY29udGFpbnNcIjtcclxuXHJcbiAgICBASW5wdXQoKSB0b29sdGlwOiBzdHJpbmcgPSAnJztcclxuXHJcbiAgICBASW5wdXQoKSB0b29sdGlwUG9zaXRpb246IHN0cmluZyA9ICdyaWdodCc7XHJcblxyXG4gICAgQElucHV0KCkgdG9vbHRpcFBvc2l0aW9uU3R5bGU6IHN0cmluZyA9ICdhYnNvbHV0ZSc7XHJcblxyXG4gICAgQElucHV0KCkgdG9vbHRpcFN0eWxlQ2xhc3M6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBhdXRvZm9jdXNGaWx0ZXI6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicpIGNvbnRhaW5lclZpZXdDaGlsZDogRWxlbWVudFJlZjtcclxuXHJcbiAgICBAVmlld0NoaWxkKCdmaWx0ZXJJbnB1dCcpIGZpbHRlcklucHV0Q2hpbGQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgQENvbnRlbnRDaGlsZChGb290ZXIpIGZvb3RlckZhY2V0O1xyXG5cclxuICAgIEBDb250ZW50Q2hpbGQoSGVhZGVyKSBoZWFkZXJGYWNldDtcclxuXHJcbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PGFueT47XHJcblxyXG4gICAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25Gb2N1czogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uQmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvblBhbmVsU2hvdzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uUGFuZWxIaWRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBwdWJsaWMgdmFsdWU6IGFueVtdO1xyXG5cclxuICAgIHB1YmxpYyBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xyXG5cclxuICAgIHB1YmxpYyBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcclxuXHJcbiAgICBvdmVybGF5OiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgICBwdWJsaWMgdmFsdWVzQXNTdHJpbmc6IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgZm9jdXM6IGJvb2xlYW47XHJcblxyXG4gICAgZmlsbGVkOiBib29sZWFuO1xyXG5cclxuICAgIHB1YmxpYyBkb2N1bWVudENsaWNrTGlzdGVuZXI6IGFueTtcclxuXHJcbiAgICBwdWJsaWMgc2VsZkNsaWNrOiBib29sZWFuO1xyXG5cclxuICAgIHB1YmxpYyBwYW5lbENsaWNrOiBib29sZWFuO1xyXG5cclxuICAgIHB1YmxpYyBmaWx0ZXJWYWx1ZTogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyB2aXNpYmxlT3B0aW9uczogU2VsZWN0SXRlbVtdO1xyXG5cclxuICAgIHB1YmxpYyBkaXNhYmxlZFNlbGVjdGVkT3B0aW9uczogU2VsZWN0SXRlbVtdID0gW107XHJcblxyXG4gICAgcHVibGljIGZpbHRlcmVkOiBib29sZWFuO1xyXG5cclxuICAgIHB1YmxpYyBpdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgcHVibGljIHNlbGVjdGVkSXRlbXNUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgICBwdWJsaWMgaGVhZGVyQ2hlY2tib3hGb2N1czogYm9vbGVhbjtcclxuXHJcbiAgICBfb3B0aW9uczogYW55W107XHJcblxyXG4gICAgbWF4U2VsZWN0aW9uTGltaXRSZWFjaGVkOiBib29sZWFuO1xyXG5cclxuICAgIGRvY3VtZW50UmVzaXplTGlzdGVuZXI6IGFueTtcclxuXHJcbiAgICBwcmV2ZW50TW9kZWxUb3VjaGVkOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7fVxyXG5cclxuICAgIEBJbnB1dCgpIGdldCBvcHRpb25zKCk6IGFueVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgb3B0aW9ucyh2YWw6IGFueVtdKSB7XHJcbiAgICAgICAgbGV0IG9wdHMgPSB0aGlzLm9wdGlvbkxhYmVsID8gT2JqZWN0VXRpbHMuZ2VuZXJhdGVTZWxlY3RJdGVtcyh2YWwsIHRoaXMub3B0aW9uTGFiZWwpIDogdmFsO1xyXG4gICAgICAgIHRoaXMudmlzaWJsZU9wdGlvbnMgPSBvcHRzO1xyXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBvcHRzO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTGFiZWwoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyVmFsdWUgJiYgdGhpcy5maWx0ZXJWYWx1ZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZUZpbHRlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUxhYmVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoKGl0ZW0uZ2V0VHlwZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdpdGVtJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdzZWxlY3RlZEl0ZW1zJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXNUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5hbGlnbk92ZXJsYXkoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSA6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUxhYmVsKCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuc2V0RGlzYWJsZWRTZWxlY3RlZE9wdGlvbnMoKTtcclxuICAgICAgICB0aGlzLmNoZWNrU2VsZWN0aW9uTGltaXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja1NlbGVjdGlvbkxpbWl0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbkxpbWl0ICYmICh0aGlzLnZhbHVlICYmIHRoaXMudmFsdWUubGVuZ3RoID09PSB0aGlzLnNlbGVjdGlvbkxpbWl0KSkge1xyXG4gICAgICAgICAgICB0aGlzLm1heFNlbGVjdGlvbkxpbWl0UmVhY2hlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm1heFNlbGVjdGlvbkxpbWl0UmVhY2hlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVGaWxsZWRTdGF0ZSgpIHtcclxuICAgICAgICB0aGlzLmZpbGxlZCA9ICh0aGlzLnZhbHVlICYmIHRoaXMudmFsdWUubGVuZ3RoID4gMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGlzYWJsZWRTdGF0ZSh2YWw6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVkID0gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIG9uT3B0aW9uQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICBsZXQgb3B0aW9uID0gZXZlbnQub3B0aW9uO1xyXG4gICAgICAgIGlmIChvcHRpb24uZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgb3B0aW9uVmFsdWUgPSBvcHRpb24udmFsdWU7XHJcbiAgICAgICAgbGV0IHNlbGVjdGlvbkluZGV4ID0gdGhpcy5maW5kU2VsZWN0aW9uSW5kZXgob3B0aW9uVmFsdWUpO1xyXG4gICAgICAgIGlmIChzZWxlY3Rpb25JbmRleCAhPSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZS5maWx0ZXIoKHZhbCxpKSA9PiBpICE9IHNlbGVjdGlvbkluZGV4KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbkxpbWl0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1heFNlbGVjdGlvbkxpbWl0UmVhY2hlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2VsZWN0aW9uTGltaXQgfHwgKCF0aGlzLnZhbHVlIHx8IHRoaXMudmFsdWUubGVuZ3RoIDwgdGhpcy5zZWxlY3Rpb25MaW1pdCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBbLi4udGhpcy52YWx1ZSB8fCBbXSwgb3B0aW9uVmFsdWVdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNoZWNrU2VsZWN0aW9uTGltaXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcclxuICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50Lm9yaWdpbmFsRXZlbnQsIHZhbHVlOiB0aGlzLnZhbHVlLCBpdGVtVmFsdWU6IG9wdGlvblZhbHVlfSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVMYWJlbCgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlRmlsbGVkU3RhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBpc1NlbGVjdGVkKHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZFNlbGVjdGlvbkluZGV4KHZhbHVlKSAhPSAtMTtcclxuICAgIH1cclxuXHJcbiAgICBmaW5kU2VsZWN0aW9uSW5kZXgodmFsOiBhbnkpOiBudW1iZXLCoHtcclxuICAgICAgICBsZXQgaW5kZXggPSAtMTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudmFsdWUpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZhbHVlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0VXRpbHMuZXF1YWxzKHRoaXMudmFsdWVbaV0sIHZhbCwgdGhpcy5kYXRhS2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZUFsbChldmVudDogRXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0FsbENoZWNrZWQoKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kaXNhYmxlZFNlbGVjdGVkT3B0aW9ucyAmJiB0aGlzLmRpc2FibGVkU2VsZWN0ZWRPcHRpb25zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBbLi4udGhpcy5kaXNhYmxlZFNlbGVjdGVkT3B0aW9uc107XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5nZXRWaXNpYmxlT3B0aW9ucygpO1xyXG4gICAgICAgICAgICBpZiAob3B0cykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gW107XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXNhYmxlZFNlbGVjdGVkT3B0aW9ucyAmJiB0aGlzLmRpc2FibGVkU2VsZWN0ZWRPcHRpb25zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IFsuLi50aGlzLmRpc2FibGVkU2VsZWN0ZWRPcHRpb25zXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSBvcHRzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbi5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5wdXNoKG9wdHNbaV0udmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMudmFsdWUpO1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIHZhbHVlOiB0aGlzLnZhbHVlfSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTGFiZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0FsbENoZWNrZWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyVmFsdWUgJiYgdGhpcy5maWx0ZXJWYWx1ZS50cmltKCkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlICYmIHRoaXMudmlzaWJsZU9wdGlvbnMgJiYgdGhpcy52aXNpYmxlT3B0aW9ucy5sZW5ndGggJiYgdGhpcy5pc0FsbFZpc2libGVPcHRpb25zQ2hlY2tlZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IG9wdGlvbkNvdW50ID0gdGhpcy5nZXRFbmFibGVkT3B0aW9uQ291bnQoKTtcclxuICAgICAgICAgICAgbGV0IGRpc2FibGVkU2VsZWN0ZWRPcHRpb25Db3VudCA9IHRoaXMuZGlzYWJsZWRTZWxlY3RlZE9wdGlvbnMubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUgJiYgdGhpcy5vcHRpb25zICYmICh0aGlzLnZhbHVlLmxlbmd0aCA+IDAgJiYgdGhpcy52YWx1ZS5sZW5ndGggPT0gb3B0aW9uQ291bnQgKyBkaXNhYmxlZFNlbGVjdGVkT3B0aW9uQ291bnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpc0FsbFZpc2libGVPcHRpb25zQ2hlY2tlZCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMudmlzaWJsZU9wdGlvbnMgfHwgdGhpcy52aXNpYmxlT3B0aW9ucy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgb3B0aW9uIG9mIHRoaXMudmlzaWJsZU9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1NlbGVjdGVkKG9wdGlvbi52YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEVuYWJsZWRPcHRpb25Db3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICAgICAgZm9yIChsZXQgb3B0IG9mIHRoaXMub3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFvcHQuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGlzYWJsZWRTZWxlY3RlZE9wdGlvbnMoKXtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZWRTZWxlY3RlZE9wdGlvbnMgPSBbXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IG9wdCBvZiB0aGlzLm9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0LmRpc2FibGVkICYmIHRoaXMuaXNTZWxlY3RlZChvcHQudmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZWRTZWxlY3RlZE9wdGlvbnMucHVzaChvcHQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5vdmVybGF5VmlzaWJsZSl7XHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbk92ZXJsYXlBbmltYXRpb25TdGFydChldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LnRvU3RhdGUpIHtcclxuICAgICAgICAgICAgY2FzZSAndmlzaWJsZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXkgPSBldmVudC5lbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRPdmVybGF5KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hdXRvWkluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5LnN0eWxlLnpJbmRleCA9IFN0cmluZyh0aGlzLmJhc2VaSW5kZXggKyAoKytEb21IYW5kbGVyLnppbmRleCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbGlnbk92ZXJsYXkoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlcklucHV0Q2hpbGQgJiYgdGhpcy5maWx0ZXJJbnB1dENoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZlbnRNb2RlbFRvdWNoZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hdXRvZm9jdXNGaWx0ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJJbnB1dENoaWxkLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5vblBhbmVsU2hvdy5lbWl0KCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAndm9pZCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uT3ZlcmxheUhpZGUoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFwcGVuZE92ZXJsYXkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8gPT09ICdib2R5JylcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5vdmVybGF5KTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hcHBlbmRDaGlsZCh0aGlzLm92ZXJsYXksIHRoaXMuYXBwZW5kVG8pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXkuc3R5bGUubWluV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS5taW5XaWR0aCA9IERvbUhhbmRsZXIuZ2V0V2lkdGgodGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkgKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlc3RvcmVPdmVybGF5QXBwZW5kKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXkgJiYgdGhpcy5hcHBlbmRUbykge1xyXG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5vdmVybGF5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWxpZ25PdmVybGF5KCkge1xyXG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8pXHJcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFic29sdXRlUG9zaXRpb24odGhpcy5vdmVybGF5LCB0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZWxhdGl2ZVBvc2l0aW9uKHRoaXMub3ZlcmxheSwgdGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XHJcbiAgICAgICAgaWYgKHRoaXMucmVzZXRGaWx0ZXJPbkhpZGUpe1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlcklucHV0Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICB0aGlzLm9uRmlsdGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub25QYW5lbEhpZGUuZW1pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBvbk1vdXNlY2xpY2soZXZlbnQsaW5wdXQpIHtcclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLnJlYWRvbmx5KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMub25DbGljay5lbWl0KGV2ZW50KTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLnBhbmVsQ2xpY2spIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheVZpc2libGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNlbGZDbGljayA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgb25JbnB1dEZvY3VzKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5mb2N1cyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5vbkZvY3VzLmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50fSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25JbnB1dEJsdXIoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmZvY3VzID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5vbkJsdXIuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnR9KTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLnByZXZlbnRNb2RlbFRvdWNoZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnByZXZlbnRNb2RlbFRvdWNoZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvbk9wdGlvbktleWRvd24oZXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5yZWFkb25seSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzd2l0Y2goZXZlbnQub3JpZ2luYWxFdmVudC53aGljaCkge1xyXG5cclxuICAgICAgICAgICAgLy9kb3duXHJcbiAgICAgICAgICAgIGNhc2UgNDA6XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV4dEl0ZW0gPSB0aGlzLmZpbmROZXh0SXRlbShldmVudC5vcmlnaW5hbEV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIGlmIChuZXh0SXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRJdGVtLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZXZlbnQub3JpZ2luYWxFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIC8vdXBcclxuICAgICAgICAgICAgY2FzZSAzODpcclxuICAgICAgICAgICAgICAgIHZhciBwcmV2SXRlbSA9IHRoaXMuZmluZFByZXZJdGVtKGV2ZW50Lm9yaWdpbmFsRXZlbnQudGFyZ2V0LnBhcmVudEVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByZXZJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldkl0ZW0uZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBldmVudC5vcmlnaW5hbEV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgLy9lbnRlclxyXG4gICAgICAgICAgICBjYXNlIDEzOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk9wdGlvbkNsaWNrKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgIGV2ZW50Lm9yaWdpbmFsRXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZpbmROZXh0SXRlbShpdGVtKSB7XHJcbiAgICAgICAgbGV0IG5leHRJdGVtID0gaXRlbS5uZXh0RWxlbWVudFNpYmxpbmc7XHJcblxyXG4gICAgICAgIGlmIChuZXh0SXRlbSlcclxuICAgICAgICAgICAgcmV0dXJuIERvbUhhbmRsZXIuaGFzQ2xhc3MobmV4dEl0ZW0uY2hpbGRyZW5bMF0sICd1aS1zdGF0ZS1kaXNhYmxlZCcpIHx8IERvbUhhbmRsZXIuaXNIaWRkZW4obmV4dEl0ZW0uY2hpbGRyZW5bMF0pID8gdGhpcy5maW5kTmV4dEl0ZW0obmV4dEl0ZW0pIDogbmV4dEl0ZW0uY2hpbGRyZW5bMF07XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBmaW5kUHJldkl0ZW0oaXRlbSkge1xyXG4gICAgICAgIGxldCBwcmV2SXRlbSA9IGl0ZW0ucHJldmlvdXNFbGVtZW50U2libGluZztcclxuXHJcbiAgICAgICAgaWYgKHByZXZJdGVtKVxyXG4gICAgICAgICAgICByZXR1cm4gRG9tSGFuZGxlci5oYXNDbGFzcyhwcmV2SXRlbS5jaGlsZHJlblswXSwgJ3VpLXN0YXRlLWRpc2FibGVkJykgfHwgRG9tSGFuZGxlci5pc0hpZGRlbihwcmV2SXRlbS5jaGlsZHJlblswXSkgPyB0aGlzLmZpbmRQcmV2SXRlbShwcmV2SXRlbSkgOiBwcmV2SXRlbS5jaGlsZHJlblswXTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCl7XHJcbiAgICAgICAgc3dpdGNoKGV2ZW50LndoaWNoKSB7XHJcbiAgICAgICAgICAgIC8vZG93blxyXG4gICAgICAgICAgICBjYXNlIDQwOlxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlWaXNpYmxlICYmIGV2ZW50LmFsdEtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgLy9zcGFjZVxyXG4gICAgICAgICAgICBjYXNlIDMyOlxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlWaXNpYmxlKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAvL2VzY2FwZVxyXG4gICAgICAgICAgICBjYXNlIDI3OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVMYWJlbCgpIHtcclxuICAgICAgICBpZiAodGhpcy52YWx1ZSAmJiB0aGlzLm9wdGlvbnMgJiYgdGhpcy52YWx1ZS5sZW5ndGggJiYgdGhpcy5kaXNwbGF5U2VsZWN0ZWRMYWJlbCkge1xyXG4gICAgICAgICAgICBsZXQgbGFiZWwgPSAnJztcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZhbHVlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbUxhYmVsID0gdGhpcy5maW5kTGFiZWxCeVZhbHVlKHRoaXMudmFsdWVbaV0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1MYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYWJlbC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsID0gbGFiZWwgKyAnLCAnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsYWJlbCA9IGxhYmVsICsgaXRlbUxhYmVsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy52YWx1ZS5sZW5ndGggPD0gdGhpcy5tYXhTZWxlY3RlZExhYmVscykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZXNBc1N0cmluZyA9IGxhYmVsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhdHRlcm4gPSAveyguKj8pfS87XHJcbiAgICAgICAgICAgICAgICBpZiAocGF0dGVybi50ZXN0KHRoaXMuc2VsZWN0ZWRJdGVtc0xhYmVsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWVzQXNTdHJpbmcgPSB0aGlzLnNlbGVjdGVkSXRlbXNMYWJlbC5yZXBsYWNlKHRoaXMuc2VsZWN0ZWRJdGVtc0xhYmVsLm1hdGNoKHBhdHRlcm4pWzBdLCB0aGlzLnZhbHVlLmxlbmd0aCArICcnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZXNBc1N0cmluZyA9IHRoaXMuc2VsZWN0ZWRJdGVtc0xhYmVsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlc0FzU3RyaW5nID0gdGhpcy5kZWZhdWx0TGFiZWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZpbmRMYWJlbEJ5VmFsdWUodmFsOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBsYWJlbCA9IG51bGw7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9wdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG9wdGlvbiA9IHRoaXMub3B0aW9uc1tpXTtcclxuICAgICAgICAgICAgaWYgKHZhbCA9PSBudWxsICYmIG9wdGlvbi52YWx1ZSA9PSBudWxsIHx8IE9iamVjdFV0aWxzLmVxdWFscyh2YWwsIG9wdGlvbi52YWx1ZSwgdGhpcy5kYXRhS2V5KSkge1xyXG4gICAgICAgICAgICAgICAgbGFiZWwgPSBvcHRpb24ubGFiZWw7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGFiZWw7XHJcbiAgICB9XHJcblxyXG4gICAgb25GaWx0ZXIoKSB7XHJcbiAgICAgICAgbGV0IGlucHV0VmFsdWUgPSB0aGlzLmZpbHRlcklucHV0Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZTtcclxuICAgICAgICBpZiAoaW5wdXRWYWx1ZSAmJiBpbnB1dFZhbHVlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlclZhbHVlID0gaW5wdXRWYWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZUZpbHRlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZU9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWN0aXZhdGVGaWx0ZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGxldCBzZWFyY2hGaWVsZHM6IHN0cmluZ1tdID0gdGhpcy5maWx0ZXJCeS5zcGxpdCgnLCcpO1xyXG4gICAgICAgICAgICB0aGlzLnZpc2libGVPcHRpb25zID0gRmlsdGVyVXRpbHMuZmlsdGVyKHRoaXMub3B0aW9ucywgc2VhcmNoRmllbGRzLCB0aGlzLmZpbHRlclZhbHVlLCB0aGlzLmZpbHRlck1hdGNoTW9kZSwgdGhpcy5maWx0ZXJMb2NhbGUpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlcmVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaXNJdGVtVmlzaWJsZShvcHRpb246IFNlbGVjdEl0ZW0pOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5maWx0ZXJWYWx1ZSAmJiB0aGlzLmZpbHRlclZhbHVlLnRyaW0oKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZpc2libGVPcHRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52aXNpYmxlT3B0aW9uc1tpXS52YWx1ZSA9PSBvcHRpb24udmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFZpc2libGVPcHRpb25zKCk6IFNlbGVjdEl0ZW1bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaWJsZU9wdGlvbnMgfHwgdGhpcy5vcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIG9uSGVhZGVyQ2hlY2tib3hGb2N1cygpIHtcclxuICAgICAgICB0aGlzLmhlYWRlckNoZWNrYm94Rm9jdXMgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uSGVhZGVyQ2hlY2tib3hCbHVyKCkge1xyXG4gICAgICAgIHRoaXMuaGVhZGVyQ2hlY2tib3hGb2N1cyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5zZWxmQ2xpY2sgJiYgIXRoaXMucGFuZWxDbGljayAmJiB0aGlzLm92ZXJsYXlWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxmQ2xpY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFuZWxDbGljayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpIHtcclxuICAgICAgICBpZiAodGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBiaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpIHtcclxuICAgICAgICB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIgPSB0aGlzLm9uV2luZG93UmVzaXplLmJpbmQodGhpcyk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgdW5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpIHtcclxuICAgICAgICBpZiAodGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbldpbmRvd1Jlc2l6ZSgpIHtcclxuICAgICAgICBpZiAoIURvbUhhbmRsZXIuaXNBbmRyb2lkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uT3ZlcmxheUhpZGUoKSB7XHJcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcclxuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKTtcclxuICAgICAgICB0aGlzLm92ZXJsYXkgPSBudWxsO1xyXG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnJlc3RvcmVPdmVybGF5QXBwZW5kKCk7XHJcbiAgICAgICAgdGhpcy5vbk92ZXJsYXlIaWRlKCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSxTaGFyZWRNb2R1bGUsU2Nyb2xsaW5nTW9kdWxlLCBUb29sdGlwTW9kdWxlXSxcclxuICAgIGV4cG9ydHM6IFtNdWx0aVNlbGVjdCxTaGFyZWRNb2R1bGUsU2Nyb2xsaW5nTW9kdWxlXSxcclxuICAgIGRlY2xhcmF0aW9uczogW011bHRpU2VsZWN0LE11bHRpU2VsZWN0SXRlbV1cclxufSlcclxuZXhwb3J0IGNsYXNzIE11bHRpU2VsZWN0TW9kdWxlIHsgfVxyXG4iXX0=