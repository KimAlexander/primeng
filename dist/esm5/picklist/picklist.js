var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, AfterContentInit, AfterViewChecked, Input, Output, ContentChildren, QueryList, TemplateRef, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SharedModule, PrimeTemplate } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { ObjectUtils } from 'primeng/utils';
import { FilterUtils } from 'primeng/utils';
var PickList = /** @class */ (function () {
    function PickList(el) {
        this.el = el;
        this.trackBy = function (index, item) { return item; };
        this.showSourceFilter = true;
        this.showTargetFilter = true;
        this.metaKeySelection = true;
        this.showSourceControls = true;
        this.showTargetControls = true;
        this.disabled = false;
        this.filterMatchMode = "contains";
        this.onMoveToSource = new EventEmitter();
        this.onMoveAllToSource = new EventEmitter();
        this.onMoveAllToTarget = new EventEmitter();
        this.onMoveToTarget = new EventEmitter();
        this.onSourceReorder = new EventEmitter();
        this.onTargetReorder = new EventEmitter();
        this.onSourceSelect = new EventEmitter();
        this.onTargetSelect = new EventEmitter();
        this.onSourceFilter = new EventEmitter();
        this.onTargetFilter = new EventEmitter();
        this.selectedItemsSource = [];
        this.selectedItemsTarget = [];
        this.SOURCE_LIST = -1;
        this.TARGET_LIST = 1;
    }
    PickList.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'item':
                    _this.itemTemplate = item.template;
                    break;
                case 'emptymessagesource':
                    _this.emptyMessageSourceTemplate = item.template;
                    break;
                case 'emptymessagetarget':
                    _this.emptyMessageTargetTemplate = item.template;
                    break;
                default:
                    _this.itemTemplate = item.template;
                    break;
            }
        });
    };
    PickList.prototype.ngAfterViewChecked = function () {
        if (this.movedUp || this.movedDown) {
            var listItems = DomHandler.find(this.reorderedListElement, 'li.ui-state-highlight');
            var listItem = void 0;
            if (this.movedUp)
                listItem = listItems[0];
            else
                listItem = listItems[listItems.length - 1];
            DomHandler.scrollInView(this.reorderedListElement, listItem);
            this.movedUp = false;
            this.movedDown = false;
            this.reorderedListElement = null;
        }
    };
    PickList.prototype.onItemClick = function (event, item, selectedItems, callback) {
        if (this.disabled) {
            return;
        }
        var index = this.findIndexInSelection(item, selectedItems);
        var selected = (index != -1);
        var metaSelection = this.itemTouched ? false : this.metaKeySelection;
        if (metaSelection) {
            var metaKey = (event.metaKey || event.ctrlKey || event.shiftKey);
            if (selected && metaKey) {
                selectedItems.splice(index, 1);
            }
            else {
                if (!metaKey) {
                    selectedItems.length = 0;
                }
                selectedItems.push(item);
            }
        }
        else {
            if (selected)
                selectedItems.splice(index, 1);
            else
                selectedItems.push(item);
        }
        callback.emit({ originalEvent: event, items: selectedItems });
        this.itemTouched = false;
    };
    PickList.prototype.onSourceItemDblClick = function () {
        if (this.disabled) {
            return;
        }
        this.moveRight();
    };
    PickList.prototype.onTargetItemDblClick = function () {
        if (this.disabled) {
            return;
        }
        this.moveLeft();
    };
    PickList.prototype.onFilter = function (event, data, listType) {
        var query = event.target.value.trim().toLocaleLowerCase(this.filterLocale);
        this.filter(query, data, listType);
    };
    PickList.prototype.filter = function (query, data, listType) {
        var searchFields = this.filterBy.split(',');
        if (listType === this.SOURCE_LIST) {
            this.filterValueSource = query;
            this.visibleOptionsSource = FilterUtils.filter(data, searchFields, this.filterValueSource, this.filterMatchMode, this.filterLocale);
            this.onSourceFilter.emit({ query: this.filterValueSource, value: this.visibleOptionsSource });
        }
        else if (listType === this.TARGET_LIST) {
            this.filterValueTarget = query;
            this.visibleOptionsTarget = FilterUtils.filter(data, searchFields, this.filterValueTarget, this.filterMatchMode, this.filterLocale);
            this.onTargetFilter.emit({ query: this.filterValueTarget, value: this.visibleOptionsTarget });
        }
    };
    PickList.prototype.isItemVisible = function (item, listType) {
        if (listType == this.SOURCE_LIST)
            return this.isVisibleInList(this.visibleOptionsSource, item, this.filterValueSource);
        else
            return this.isVisibleInList(this.visibleOptionsTarget, item, this.filterValueTarget);
    };
    PickList.prototype.isVisibleInList = function (data, item, filterValue) {
        if (filterValue && filterValue.trim().length) {
            for (var i = 0; i < data.length; i++) {
                if (item == data[i]) {
                    return true;
                }
            }
        }
        else {
            return true;
        }
    };
    PickList.prototype.onItemTouchEnd = function (event) {
        if (this.disabled) {
            return;
        }
        this.itemTouched = true;
    };
    PickList.prototype.sortByIndexInList = function (items, list) {
        var _this = this;
        return items.sort(function (item1, item2) {
            return _this.findIndexInList(item1, list) - _this.findIndexInList(item2, list);
        });
    };
    PickList.prototype.moveUp = function (listElement, list, selectedItems, callback) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (var i = 0; i < selectedItems.length; i++) {
                var selectedItem = selectedItems[i];
                var selectedItemIndex = this.findIndexInList(selectedItem, list);
                if (selectedItemIndex != 0) {
                    var movedItem = list[selectedItemIndex];
                    var temp = list[selectedItemIndex - 1];
                    list[selectedItemIndex - 1] = movedItem;
                    list[selectedItemIndex] = temp;
                }
                else {
                    break;
                }
            }
            this.movedUp = true;
            this.reorderedListElement = listElement;
            callback.emit({ items: selectedItems });
        }
    };
    PickList.prototype.moveTop = function (listElement, list, selectedItems, callback) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (var i = 0; i < selectedItems.length; i++) {
                var selectedItem = selectedItems[i];
                var selectedItemIndex = this.findIndexInList(selectedItem, list);
                if (selectedItemIndex != 0) {
                    var movedItem = list.splice(selectedItemIndex, 1)[0];
                    list.unshift(movedItem);
                }
                else {
                    break;
                }
            }
            listElement.scrollTop = 0;
            callback.emit({ items: selectedItems });
        }
    };
    PickList.prototype.moveDown = function (listElement, list, selectedItems, callback) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (var i = selectedItems.length - 1; i >= 0; i--) {
                var selectedItem = selectedItems[i];
                var selectedItemIndex = this.findIndexInList(selectedItem, list);
                if (selectedItemIndex != (list.length - 1)) {
                    var movedItem = list[selectedItemIndex];
                    var temp = list[selectedItemIndex + 1];
                    list[selectedItemIndex + 1] = movedItem;
                    list[selectedItemIndex] = temp;
                }
                else {
                    break;
                }
            }
            this.movedDown = true;
            this.reorderedListElement = listElement;
            callback.emit({ items: selectedItems });
        }
    };
    PickList.prototype.moveBottom = function (listElement, list, selectedItems, callback) {
        if (selectedItems && selectedItems.length) {
            selectedItems = this.sortByIndexInList(selectedItems, list);
            for (var i = selectedItems.length - 1; i >= 0; i--) {
                var selectedItem = selectedItems[i];
                var selectedItemIndex = this.findIndexInList(selectedItem, list);
                if (selectedItemIndex != (list.length - 1)) {
                    var movedItem = list.splice(selectedItemIndex, 1)[0];
                    list.push(movedItem);
                }
                else {
                    break;
                }
            }
            listElement.scrollTop = listElement.scrollHeight;
            callback.emit({ items: selectedItems });
        }
    };
    PickList.prototype.moveRight = function () {
        if (this.selectedItemsSource && this.selectedItemsSource.length) {
            for (var i = 0; i < this.selectedItemsSource.length; i++) {
                var selectedItem = this.selectedItemsSource[i];
                if (this.findIndexInList(selectedItem, this.target) == -1) {
                    this.target.push(this.source.splice(this.findIndexInList(selectedItem, this.source), 1)[0]);
                }
            }
            this.onMoveToTarget.emit({
                items: this.selectedItemsSource
            });
            this.selectedItemsSource = [];
            if (this.filterValueTarget) {
                this.filter(this.filterValueTarget, this.target, this.TARGET_LIST);
            }
        }
    };
    PickList.prototype.moveAllRight = function () {
        if (this.source) {
            var movedItems = [];
            for (var i = 0; i < this.source.length; i++) {
                if (this.isItemVisible(this.source[i], this.SOURCE_LIST)) {
                    var removedItem = this.source.splice(i, 1)[0];
                    this.target.push(removedItem);
                    movedItems.push(removedItem);
                    i--;
                }
            }
            this.onMoveToTarget.emit({
                items: movedItems
            });
            this.onMoveAllToTarget.emit({
                items: movedItems
            });
            this.selectedItemsSource = [];
            if (this.filterValueTarget) {
                this.filter(this.filterValueTarget, this.target, this.TARGET_LIST);
            }
        }
    };
    PickList.prototype.moveLeft = function () {
        if (this.selectedItemsTarget && this.selectedItemsTarget.length) {
            for (var i = 0; i < this.selectedItemsTarget.length; i++) {
                var selectedItem = this.selectedItemsTarget[i];
                if (this.findIndexInList(selectedItem, this.source) == -1) {
                    this.source.push(this.target.splice(this.findIndexInList(selectedItem, this.target), 1)[0]);
                }
            }
            this.onMoveToSource.emit({
                items: this.selectedItemsTarget
            });
            this.selectedItemsTarget = [];
            if (this.filterValueSource) {
                this.filter(this.filterValueSource, this.source, this.SOURCE_LIST);
            }
        }
    };
    PickList.prototype.moveAllLeft = function () {
        if (this.target) {
            var movedItems = [];
            for (var i = 0; i < this.target.length; i++) {
                if (this.isItemVisible(this.target[i], this.TARGET_LIST)) {
                    var removedItem = this.target.splice(i, 1)[0];
                    this.source.push(removedItem);
                    movedItems.push(removedItem);
                    i--;
                }
            }
            this.onMoveToSource.emit({
                items: movedItems
            });
            this.onMoveAllToSource.emit({
                items: movedItems
            });
            this.selectedItemsTarget = [];
            if (this.filterValueSource) {
                this.filter(this.filterValueSource, this.source, this.SOURCE_LIST);
            }
        }
    };
    PickList.prototype.isSelected = function (item, selectedItems) {
        return this.findIndexInSelection(item, selectedItems) != -1;
    };
    PickList.prototype.findIndexInSelection = function (item, selectedItems) {
        return this.findIndexInList(item, selectedItems);
    };
    PickList.prototype.findIndexInList = function (item, list) {
        var index = -1;
        if (list) {
            for (var i = 0; i < list.length; i++) {
                if (list[i] == item) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    PickList.prototype.onDragStart = function (event, index, listType) {
        event.dataTransfer.setData('text', 'b'); // For firefox
        event.target.blur();
        this.dragging = true;
        this.fromListType = listType;
        if (listType === this.SOURCE_LIST)
            this.draggedItemIndexSource = index;
        else
            this.draggedItemIndexTarget = index;
    };
    PickList.prototype.onDragOver = function (event, index, listType) {
        if (this.dragging) {
            if (listType == this.SOURCE_LIST) {
                if (this.draggedItemIndexSource !== index && this.draggedItemIndexSource + 1 !== index || (this.fromListType === this.TARGET_LIST)) {
                    this.dragOverItemIndexSource = index;
                    event.preventDefault();
                }
            }
            else {
                if (this.draggedItemIndexTarget !== index && this.draggedItemIndexTarget + 1 !== index || (this.fromListType === this.SOURCE_LIST)) {
                    this.dragOverItemIndexTarget = index;
                    event.preventDefault();
                }
            }
            this.onListItemDroppoint = true;
        }
    };
    PickList.prototype.onDragLeave = function (event, listType) {
        this.dragOverItemIndexSource = null;
        this.dragOverItemIndexTarget = null;
        this.onListItemDroppoint = false;
    };
    PickList.prototype.onDrop = function (event, index, listType) {
        if (this.onListItemDroppoint) {
            if (listType === this.SOURCE_LIST) {
                if (this.fromListType === this.TARGET_LIST) {
                    this.insert(this.draggedItemIndexTarget, this.target, index, this.source, this.onMoveToSource);
                }
                else {
                    ObjectUtils.reorderArray(this.source, this.draggedItemIndexSource, (this.draggedItemIndexSource > index) ? index : (index === 0) ? 0 : index - 1);
                    this.onSourceReorder.emit({ items: this.source[this.draggedItemIndexSource] });
                }
                this.dragOverItemIndexSource = null;
            }
            else {
                if (this.fromListType === this.SOURCE_LIST) {
                    this.insert(this.draggedItemIndexSource, this.source, index, this.target, this.onMoveToTarget);
                }
                else {
                    ObjectUtils.reorderArray(this.target, this.draggedItemIndexTarget, (this.draggedItemIndexTarget > index) ? index : (index === 0) ? 0 : index - 1);
                    this.onTargetReorder.emit({ items: this.target[this.draggedItemIndexTarget] });
                }
                this.dragOverItemIndexTarget = null;
            }
            this.listHighlightTarget = false;
            this.listHighlightSource = false;
            event.preventDefault();
        }
    };
    PickList.prototype.onDragEnd = function (event) {
        this.dragging = false;
    };
    PickList.prototype.onListDrop = function (event, listType) {
        if (!this.onListItemDroppoint) {
            if (listType === this.SOURCE_LIST) {
                if (this.fromListType === this.TARGET_LIST) {
                    this.insert(this.draggedItemIndexTarget, this.target, null, this.source, this.onMoveToSource);
                }
            }
            else {
                if (this.fromListType === this.SOURCE_LIST) {
                    this.insert(this.draggedItemIndexSource, this.source, null, this.target, this.onMoveToTarget);
                }
            }
            this.listHighlightTarget = false;
            this.listHighlightSource = false;
            event.preventDefault();
        }
    };
    PickList.prototype.insert = function (fromIndex, fromList, toIndex, toList, callback) {
        var elementtomove = fromList[fromIndex];
        if (toIndex === null)
            toList.push(fromList.splice(fromIndex, 1)[0]);
        else
            toList.splice(toIndex, 0, fromList.splice(fromIndex, 1)[0]);
        callback.emit({
            items: [elementtomove]
        });
    };
    PickList.prototype.onListMouseMove = function (event, listType) {
        if (this.dragging) {
            var moveListType = (listType == 0 ? this.listViewSourceChild : this.listViewTargetChild);
            var offsetY = moveListType.nativeElement.getBoundingClientRect().top + document.body.scrollTop;
            var bottomDiff = (offsetY + moveListType.nativeElement.clientHeight) - event.pageY;
            var topDiff = (event.pageY - offsetY);
            if (bottomDiff < 25 && bottomDiff > 0)
                moveListType.nativeElement.scrollTop += 15;
            else if (topDiff < 25 && topDiff > 0)
                moveListType.nativeElement.scrollTop -= 15;
            if (listType === this.SOURCE_LIST) {
                if (this.fromListType === this.TARGET_LIST)
                    this.listHighlightSource = true;
            }
            else {
                if (this.fromListType === this.SOURCE_LIST)
                    this.listHighlightTarget = true;
            }
            event.preventDefault();
        }
    };
    PickList.prototype.onListDragLeave = function () {
        this.listHighlightTarget = false;
        this.listHighlightSource = false;
    };
    PickList.prototype.resetFilter = function () {
        this.visibleOptionsSource = null;
        this.filterValueSource = null;
        this.visibleOptionsTarget = null;
        this.filterValueTarget = null;
        this.sourceFilterViewChild.nativeElement.value = '';
        this.targetFilterViewChild.nativeElement.value = '';
    };
    PickList.prototype.onItemKeydown = function (event, item, selectedItems, callback) {
        var listItem = event.currentTarget;
        switch (event.which) {
            //down
            case 40:
                var nextItem = this.findNextItem(listItem);
                if (nextItem) {
                    nextItem.focus();
                }
                event.preventDefault();
                break;
            //up
            case 38:
                var prevItem = this.findPrevItem(listItem);
                if (prevItem) {
                    prevItem.focus();
                }
                event.preventDefault();
                break;
            //enter
            case 13:
                this.onItemClick(event, item, selectedItems, callback);
                event.preventDefault();
                break;
        }
    };
    PickList.prototype.findNextItem = function (item) {
        var nextItem = item.nextElementSibling;
        if (nextItem)
            return !DomHandler.hasClass(nextItem, 'ui-picklist-item') || DomHandler.isHidden(nextItem) ? this.findNextItem(nextItem) : nextItem;
        else
            return null;
    };
    PickList.prototype.findPrevItem = function (item) {
        var prevItem = item.previousElementSibling;
        if (prevItem)
            return !DomHandler.hasClass(prevItem, 'ui-picklist-item') || DomHandler.isHidden(prevItem) ? this.findPrevItem(prevItem) : prevItem;
        else
            return null;
    };
    PickList.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], PickList.prototype, "source", void 0);
    __decorate([
        Input()
    ], PickList.prototype, "target", void 0);
    __decorate([
        Input()
    ], PickList.prototype, "sourceHeader", void 0);
    __decorate([
        Input()
    ], PickList.prototype, "targetHeader", void 0);
    __decorate([
        Input()
    ], PickList.prototype, "responsive", void 0);
    __decorate([
        Input()
    ], PickList.prototype, "filterBy", void 0);
    __decorate([
        Input()
    ], PickList.prototype, "filterLocale", void 0);
    __decorate([
        Input()
    ], PickList.prototype, "trackBy", void 0);
    __decorate([
        Input()
    ], PickList.prototype, "sourceTrackBy", void 0);
    __decorate([
        Input()
    ], PickList.prototype, "targetTrackBy", void 0);
    __decorate([
        Input()
    ], PickList.prototype, "showSourceFilter", void 0);
    __decorate([
        Input()
    ], PickList.prototype, "showTargetFilter", void 0);
    __decorate([
        Input()
    ], PickList.prototype, "metaKeySelection", void 0);
    __decorate([
        Input()
    ], PickList.prototype, "dragdrop", void 0);
    __decorate([
        Input()
    ], PickList.prototype, "style", void 0);
    __decorate([
        Input()
    ], PickList.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], PickList.prototype, "sourceStyle", void 0);
    __decorate([
        Input()
    ], PickList.prototype, "targetStyle", void 0);
    __decorate([
        Input()
    ], PickList.prototype, "showSourceControls", void 0);
    __decorate([
        Input()
    ], PickList.prototype, "showTargetControls", void 0);
    __decorate([
        Input()
    ], PickList.prototype, "sourceFilterPlaceholder", void 0);
    __decorate([
        Input()
    ], PickList.prototype, "targetFilterPlaceholder", void 0);
    __decorate([
        Input()
    ], PickList.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], PickList.prototype, "ariaSourceFilterLabel", void 0);
    __decorate([
        Input()
    ], PickList.prototype, "ariaTargetFilterLabel", void 0);
    __decorate([
        Input()
    ], PickList.prototype, "filterMatchMode", void 0);
    __decorate([
        Output()
    ], PickList.prototype, "onMoveToSource", void 0);
    __decorate([
        Output()
    ], PickList.prototype, "onMoveAllToSource", void 0);
    __decorate([
        Output()
    ], PickList.prototype, "onMoveAllToTarget", void 0);
    __decorate([
        Output()
    ], PickList.prototype, "onMoveToTarget", void 0);
    __decorate([
        Output()
    ], PickList.prototype, "onSourceReorder", void 0);
    __decorate([
        Output()
    ], PickList.prototype, "onTargetReorder", void 0);
    __decorate([
        Output()
    ], PickList.prototype, "onSourceSelect", void 0);
    __decorate([
        Output()
    ], PickList.prototype, "onTargetSelect", void 0);
    __decorate([
        Output()
    ], PickList.prototype, "onSourceFilter", void 0);
    __decorate([
        Output()
    ], PickList.prototype, "onTargetFilter", void 0);
    __decorate([
        ViewChild('sourcelist')
    ], PickList.prototype, "listViewSourceChild", void 0);
    __decorate([
        ViewChild('targetlist')
    ], PickList.prototype, "listViewTargetChild", void 0);
    __decorate([
        ViewChild('sourceFilter')
    ], PickList.prototype, "sourceFilterViewChild", void 0);
    __decorate([
        ViewChild('targetFilter')
    ], PickList.prototype, "targetFilterViewChild", void 0);
    __decorate([
        ContentChildren(PrimeTemplate)
    ], PickList.prototype, "templates", void 0);
    PickList = __decorate([
        Component({
            selector: 'p-pickList',
            template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" [ngClass]=\"{'ui-picklist ui-widget ui-helper-clearfix': true,'ui-picklist-responsive': responsive}\">\n            <div class=\"ui-picklist-source-controls ui-picklist-buttons\" *ngIf=\"showSourceControls\">\n                <div class=\"ui-picklist-buttons-cell\">\n                    <button type=\"button\" pButton icon=\"pi pi-angle-up\" [disabled]=\"disabled\" (click)=\"moveUp(sourcelist,source,selectedItemsSource,onSourceReorder)\"></button>\n                    <button type=\"button\" pButton icon=\"pi pi-angle-double-up\" [disabled]=\"disabled\" (click)=\"moveTop(sourcelist,source,selectedItemsSource,onSourceReorder)\"></button>\n                    <button type=\"button\" pButton icon=\"pi pi-angle-down\" [disabled]=\"disabled\" (click)=\"moveDown(sourcelist,source,selectedItemsSource,onSourceReorder)\"></button>\n                    <button type=\"button\" pButton icon=\"pi pi-angle-double-down\" [disabled]=\"disabled\" (click)=\"moveBottom(sourcelist,source,selectedItemsSource,onSourceReorder)\"></button>\n                </div>\n            </div>\n            <div class=\"ui-picklist-listwrapper ui-picklist-source-wrapper\" [ngClass]=\"{'ui-picklist-listwrapper-nocontrols':!showSourceControls}\">\n                <div class=\"ui-picklist-caption ui-widget-header ui-corner-tl ui-corner-tr\" *ngIf=\"sourceHeader\">{{sourceHeader}}</div>\n                <div class=\"ui-picklist-filter-container ui-widget-content\" *ngIf=\"filterBy && showSourceFilter !== false\">\n                    <input #sourceFilter type=\"text\" role=\"textbox\" (keyup)=\"onFilter($event,source,SOURCE_LIST)\" class=\"ui-picklist-filter ui-inputtext ui-widget ui-state-default ui-corner-all\" [disabled]=\"disabled\" [attr.placeholder]=\"sourceFilterPlaceholder\" [attr.aria-label]=\"ariaSourceFilterLabel\">\n                    <span class=\"ui-picklist-filter-icon pi pi-search\"></span>\n                </div>\n                <ul #sourcelist class=\"ui-widget-content ui-picklist-list ui-picklist-source ui-corner-bottom\" [ngClass]=\"{'ui-picklist-highlight': listHighlightSource}\"\n                    [ngStyle]=\"sourceStyle\" (dragover)=\"onListMouseMove($event,SOURCE_LIST)\" (dragleave)=\"onListDragLeave()\" (drop)=\"onListDrop($event, SOURCE_LIST)\" role=\"listbox\" aria-multiselectable=\"multiple\">\n                    <ng-template ngFor let-item [ngForOf]=\"source\" [ngForTrackBy]=\"sourceTrackBy || trackBy\" let-i=\"index\" let-l=\"last\">\n                        <li class=\"ui-picklist-droppoint\" *ngIf=\"dragdrop\" (dragover)=\"onDragOver($event, i, SOURCE_LIST)\" (drop)=\"onDrop($event, i, SOURCE_LIST)\" (dragleave)=\"onDragLeave($event, SOURCE_LIST)\"\n                        [ngClass]=\"{'ui-picklist-droppoint-highlight': (i === dragOverItemIndexSource)}\" [style.display]=\"isItemVisible(item, SOURCE_LIST) ? 'block' : 'none'\"></li>\n                        <li [ngClass]=\"{'ui-picklist-item':true,'ui-state-highlight':isSelected(item,selectedItemsSource), 'ui-state-disabled': disabled}\"\n                            (click)=\"onItemClick($event,item,selectedItemsSource,onSourceSelect)\" (dblclick)=\"onSourceItemDblClick()\" (touchend)=\"onItemTouchEnd($event)\" (keydown)=\"onItemKeydown($event,item,selectedItemsSource,onSourceSelect)\"\n                            [style.display]=\"isItemVisible(item, SOURCE_LIST) ? 'block' : 'none'\" tabindex=\"0\" role=\"option\" [attr.aria-selected]=\"isSelected(item, selectedItemsSource)\"\n                            [draggable]=\"dragdrop\" (dragstart)=\"onDragStart($event, i, SOURCE_LIST)\" (dragend)=\"onDragEnd($event)\">\n                            <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item, index: i}\"></ng-container>\n                        </li>\n                        <li class=\"ui-picklist-droppoint\" *ngIf=\"dragdrop&&l\" (dragover)=\"onDragOver($event, i + 1, SOURCE_LIST)\" (drop)=\"onDrop($event, i + 1, SOURCE_LIST)\" (dragleave)=\"onDragLeave($event, SOURCE_LIST)\"\n                        [ngClass]=\"{'ui-picklist-droppoint-highlight': (i + 1 === dragOverItemIndexSource)}\"></li>\n                    </ng-template>\n                    <ng-container *ngIf=\"(source == null || source.length === 0) && emptyMessageSourceTemplate\">\n                        <li class=\"ui-picklist-empty-message\">\n                            <ng-container *ngTemplateOutlet=\"emptyMessageSourceTemplate\"></ng-container>\n                        </li>\n                    </ng-container>\n                </ul>\n            </div>\n            <div class=\"ui-picklist-buttons\">\n                <div class=\"ui-picklist-buttons-cell\">\n                    <button type=\"button\" pButton icon=\"pi pi-angle-right\" [disabled]=\"disabled\" (click)=\"moveRight()\"></button>\n                    <button type=\"button\" pButton icon=\"pi pi-angle-double-right\" [disabled]=\"disabled\" (click)=\"moveAllRight()\"></button>\n                    <button type=\"button\" pButton icon=\"pi pi-angle-left\" [disabled]=\"disabled\" (click)=\"moveLeft()\"></button>\n                    <button type=\"button\" pButton icon=\"pi pi-angle-double-left\" [disabled]=\"disabled\" (click)=\"moveAllLeft()\"></button>\n                </div>\n            </div>\n            <div class=\"ui-picklist-listwrapper ui-picklist-target-wrapper\" [ngClass]=\"{'ui-picklist-listwrapper-nocontrols':!showTargetControls}\">\n                <div class=\"ui-picklist-caption ui-widget-header ui-corner-tl ui-corner-tr\" *ngIf=\"targetHeader\">{{targetHeader}}</div>\n                <div class=\"ui-picklist-filter-container ui-widget-content\" *ngIf=\"filterBy && showTargetFilter !== false\">\n                    <input #targetFilter type=\"text\" role=\"textbox\" (keyup)=\"onFilter($event,target,TARGET_LIST)\" class=\"ui-picklist-filter ui-inputtext ui-widget ui-state-default ui-corner-all\" [disabled]=\"disabled\" [attr.placeholder]=\"targetFilterPlaceholder\" [attr.aria-label]=\"ariaTargetFilterLabel\">\n                    <span class=\"ui-picklist-filter-icon pi pi-search\"></span>\n                </div>\n                <ul #targetlist class=\"ui-widget-content ui-picklist-list ui-picklist-target ui-corner-bottom\" [ngClass]=\"{'ui-picklist-highlight': listHighlightTarget}\"\n                    [ngStyle]=\"targetStyle\" (dragover)=\"onListMouseMove($event,TARGET_LIST)\" (dragleave)=\"onListDragLeave()\" (drop)=\"onListDrop($event,TARGET_LIST)\" role=\"listbox\" aria-multiselectable=\"multiple\">\n                    <ng-template ngFor let-item [ngForOf]=\"target\" [ngForTrackBy]=\"targetTrackBy || trackBy\" let-i=\"index\" let-l=\"last\">\n                        <li class=\"ui-picklist-droppoint\" *ngIf=\"dragdrop\" (dragover)=\"onDragOver($event, i, TARGET_LIST)\" (drop)=\"onDrop($event, i, TARGET_LIST)\" (dragleave)=\"onDragLeave($event, TARGET_LIST)\"\n                        [ngClass]=\"{'ui-picklist-droppoint-highlight': (i === dragOverItemIndexTarget)}\" [style.display]=\"isItemVisible(item, TARGET_LIST) ? 'block' : 'none'\"></li>\n                        <li [ngClass]=\"{'ui-picklist-item':true,'ui-state-highlight':isSelected(item,selectedItemsTarget), 'ui-state-disabled': disabled}\"\n                            (click)=\"onItemClick($event,item,selectedItemsTarget,onTargetSelect)\" (dblclick)=\"onTargetItemDblClick()\" (touchend)=\"onItemTouchEnd($event)\" (keydown)=\"onItemKeydown($event,item,selectedItemsTarget,onTargetSelect)\"\n                            [style.display]=\"isItemVisible(item, TARGET_LIST) ? 'block' : 'none'\" tabindex=\"0\" role=\"option\" [attr.aria-selected]=\"isSelected(item, selectedItemsTarget)\"\n                            [draggable]=\"dragdrop\" (dragstart)=\"onDragStart($event, i, TARGET_LIST)\" (dragend)=\"onDragEnd($event)\">\n                            <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item, index: i}\"></ng-container>\n                        </li>\n                        <li class=\"ui-picklist-droppoint\" *ngIf=\"dragdrop&&l\" (dragover)=\"onDragOver($event, i + 1, TARGET_LIST)\" (drop)=\"onDrop($event, i + 1, TARGET_LIST)\" (dragleave)=\"onDragLeave($event, TARGET_LIST)\"\n                        [ngClass]=\"{'ui-picklist-droppoint-highlight': (i + 1 === dragOverItemIndexTarget)}\"></li>\n                    </ng-template>\n                    <ng-container *ngIf=\"(target == null || target.length === 0) && emptyMessageTargetTemplate\">\n                        <li class=\"ui-picklist-empty-message\">\n                            <ng-container *ngTemplateOutlet=\"emptyMessageTargetTemplate\"></ng-container>\n                        </li>\n                    </ng-container>\n                </ul>\n            </div>\n            <div class=\"ui-picklist-target-controls ui-picklist-buttons\" *ngIf=\"showTargetControls\">\n                <div class=\"ui-picklist-buttons-cell\">\n                    <button type=\"button\" pButton icon=\"pi pi-angle-up\" [disabled]=\"disabled\" (click)=\"moveUp(targetlist,target,selectedItemsTarget,onTargetReorder)\"></button>\n                    <button type=\"button\" pButton icon=\"pi pi-angle-double-up\" [disabled]=\"disabled\" (click)=\"moveTop(targetlist,target,selectedItemsTarget,onTargetReorder)\"></button>\n                    <button type=\"button\" pButton icon=\"pi pi-angle-down\" [disabled]=\"disabled\" (click)=\"moveDown(targetlist,target,selectedItemsTarget,onTargetReorder)\"></button>\n                    <button type=\"button\" pButton icon=\"pi pi-angle-double-down\" [disabled]=\"disabled\" (click)=\"moveBottom(targetlist,target,selectedItemsTarget,onTargetReorder)\"></button>\n                </div>\n            </div>\n        </div>\n    ",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], PickList);
    return PickList;
}());
export { PickList };
var PickListModule = /** @class */ (function () {
    function PickListModule() {
    }
    PickListModule = __decorate([
        NgModule({
            imports: [CommonModule, ButtonModule, SharedModule],
            exports: [PickList, SharedModule],
            declarations: [PickList]
        })
    ], PickListModule);
    return PickListModule;
}());
export { PickListModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2xpc3QuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL3BpY2tsaXN0LyIsInNvdXJjZXMiOlsicGlja2xpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3TSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxZQUFZLEVBQUMsYUFBYSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBd0Y1QztJQXNJSSxrQkFBbUIsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7UUF0SHhCLFlBQU8sR0FBYSxVQUFDLEtBQWEsRUFBRSxJQUFTLElBQUssT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFDO1FBTXZELHFCQUFnQixHQUFZLElBQUksQ0FBQztRQUVqQyxxQkFBZ0IsR0FBWSxJQUFJLENBQUM7UUFFakMscUJBQWdCLEdBQVksSUFBSSxDQUFDO1FBWWpDLHVCQUFrQixHQUFZLElBQUksQ0FBQztRQUVuQyx1QkFBa0IsR0FBWSxJQUFJLENBQUM7UUFNbkMsYUFBUSxHQUFZLEtBQUssQ0FBQztRQU0xQixvQkFBZSxHQUFXLFVBQVUsQ0FBQztRQUVwQyxtQkFBYyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFD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dCB7IE5nTW9kdWxlLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0NoZWNrZWQsIElucHV0LCBPdXRwdXQsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBUZW1wbGF0ZVJlZiwgRXZlbnRFbWl0dGVyLCBWaWV3Q2hpbGQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7QnV0dG9uTW9kdWxlfSBmcm9tICdwcmltZW5nL2J1dHRvbic7XHJcbmltcG9ydCB7U2hhcmVkTW9kdWxlLFByaW1lVGVtcGxhdGV9IGZyb20gJ3ByaW1lbmcvYXBpJztcclxuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICdwcmltZW5nL2RvbSc7XHJcbmltcG9ydCB7T2JqZWN0VXRpbHN9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xyXG5pbXBvcnQgeyBGaWx0ZXJVdGlscyB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3AtcGlja0xpc3QnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbbmdDbGFzc109XCJ7J3VpLXBpY2tsaXN0IHVpLXdpZGdldCB1aS1oZWxwZXItY2xlYXJmaXgnOiB0cnVlLCd1aS1waWNrbGlzdC1yZXNwb25zaXZlJzogcmVzcG9uc2l2ZX1cIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXBpY2tsaXN0LXNvdXJjZS1jb250cm9scyB1aS1waWNrbGlzdC1idXR0b25zXCIgKm5nSWY9XCJzaG93U291cmNlQ29udHJvbHNcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1waWNrbGlzdC1idXR0b25zLWNlbGxcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBwQnV0dG9uIGljb249XCJwaSBwaS1hbmdsZS11cFwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIChjbGljayk9XCJtb3ZlVXAoc291cmNlbGlzdCxzb3VyY2Usc2VsZWN0ZWRJdGVtc1NvdXJjZSxvblNvdXJjZVJlb3JkZXIpXCI+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgcEJ1dHRvbiBpY29uPVwicGkgcGktYW5nbGUtZG91YmxlLXVwXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgKGNsaWNrKT1cIm1vdmVUb3Aoc291cmNlbGlzdCxzb3VyY2Usc2VsZWN0ZWRJdGVtc1NvdXJjZSxvblNvdXJjZVJlb3JkZXIpXCI+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgcEJ1dHRvbiBpY29uPVwicGkgcGktYW5nbGUtZG93blwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIChjbGljayk9XCJtb3ZlRG93bihzb3VyY2VsaXN0LHNvdXJjZSxzZWxlY3RlZEl0ZW1zU291cmNlLG9uU291cmNlUmVvcmRlcilcIj48L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBwQnV0dG9uIGljb249XCJwaSBwaS1hbmdsZS1kb3VibGUtZG93blwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIChjbGljayk9XCJtb3ZlQm90dG9tKHNvdXJjZWxpc3Qsc291cmNlLHNlbGVjdGVkSXRlbXNTb3VyY2Usb25Tb3VyY2VSZW9yZGVyKVwiPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktcGlja2xpc3QtbGlzdHdyYXBwZXIgdWktcGlja2xpc3Qtc291cmNlLXdyYXBwZXJcIiBbbmdDbGFzc109XCJ7J3VpLXBpY2tsaXN0LWxpc3R3cmFwcGVyLW5vY29udHJvbHMnOiFzaG93U291cmNlQ29udHJvbHN9XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktcGlja2xpc3QtY2FwdGlvbiB1aS13aWRnZXQtaGVhZGVyIHVpLWNvcm5lci10bCB1aS1jb3JuZXItdHJcIiAqbmdJZj1cInNvdXJjZUhlYWRlclwiPnt7c291cmNlSGVhZGVyfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1waWNrbGlzdC1maWx0ZXItY29udGFpbmVyIHVpLXdpZGdldC1jb250ZW50XCIgKm5nSWY9XCJmaWx0ZXJCeSAmJiBzaG93U291cmNlRmlsdGVyICE9PSBmYWxzZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCAjc291cmNlRmlsdGVyIHR5cGU9XCJ0ZXh0XCIgcm9sZT1cInRleHRib3hcIiAoa2V5dXApPVwib25GaWx0ZXIoJGV2ZW50LHNvdXJjZSxTT1VSQ0VfTElTVClcIiBjbGFzcz1cInVpLXBpY2tsaXN0LWZpbHRlciB1aS1pbnB1dHRleHQgdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbFwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIFthdHRyLnBsYWNlaG9sZGVyXT1cInNvdXJjZUZpbHRlclBsYWNlaG9sZGVyXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhU291cmNlRmlsdGVyTGFiZWxcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXBpY2tsaXN0LWZpbHRlci1pY29uIHBpIHBpLXNlYXJjaFwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPHVsICNzb3VyY2VsaXN0IGNsYXNzPVwidWktd2lkZ2V0LWNvbnRlbnQgdWktcGlja2xpc3QtbGlzdCB1aS1waWNrbGlzdC1zb3VyY2UgdWktY29ybmVyLWJvdHRvbVwiIFtuZ0NsYXNzXT1cInsndWktcGlja2xpc3QtaGlnaGxpZ2h0JzogbGlzdEhpZ2hsaWdodFNvdXJjZX1cIlxyXG4gICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInNvdXJjZVN0eWxlXCIgKGRyYWdvdmVyKT1cIm9uTGlzdE1vdXNlTW92ZSgkZXZlbnQsU09VUkNFX0xJU1QpXCIgKGRyYWdsZWF2ZSk9XCJvbkxpc3REcmFnTGVhdmUoKVwiIChkcm9wKT1cIm9uTGlzdERyb3AoJGV2ZW50LCBTT1VSQ0VfTElTVClcIiByb2xlPVwibGlzdGJveFwiIGFyaWEtbXVsdGlzZWxlY3RhYmxlPVwibXVsdGlwbGVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWl0ZW0gW25nRm9yT2ZdPVwic291cmNlXCIgW25nRm9yVHJhY2tCeV09XCJzb3VyY2VUcmFja0J5IHx8IHRyYWNrQnlcIiBsZXQtaT1cImluZGV4XCIgbGV0LWw9XCJsYXN0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInVpLXBpY2tsaXN0LWRyb3Bwb2ludFwiICpuZ0lmPVwiZHJhZ2Ryb3BcIiAoZHJhZ292ZXIpPVwib25EcmFnT3ZlcigkZXZlbnQsIGksIFNPVVJDRV9MSVNUKVwiIChkcm9wKT1cIm9uRHJvcCgkZXZlbnQsIGksIFNPVVJDRV9MSVNUKVwiIChkcmFnbGVhdmUpPVwib25EcmFnTGVhdmUoJGV2ZW50LCBTT1VSQ0VfTElTVClcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXBpY2tsaXN0LWRyb3Bwb2ludC1oaWdobGlnaHQnOiAoaSA9PT0gZHJhZ092ZXJJdGVtSW5kZXhTb3VyY2UpfVwiIFtzdHlsZS5kaXNwbGF5XT1cImlzSXRlbVZpc2libGUoaXRlbSwgU09VUkNFX0xJU1QpID8gJ2Jsb2NrJyA6ICdub25lJ1wiPjwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBbbmdDbGFzc109XCJ7J3VpLXBpY2tsaXN0LWl0ZW0nOnRydWUsJ3VpLXN0YXRlLWhpZ2hsaWdodCc6aXNTZWxlY3RlZChpdGVtLHNlbGVjdGVkSXRlbXNTb3VyY2UpLCAndWktc3RhdGUtZGlzYWJsZWQnOiBkaXNhYmxlZH1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKCRldmVudCxpdGVtLHNlbGVjdGVkSXRlbXNTb3VyY2Usb25Tb3VyY2VTZWxlY3QpXCIgKGRibGNsaWNrKT1cIm9uU291cmNlSXRlbURibENsaWNrKClcIiAodG91Y2hlbmQpPVwib25JdGVtVG91Y2hFbmQoJGV2ZW50KVwiIChrZXlkb3duKT1cIm9uSXRlbUtleWRvd24oJGV2ZW50LGl0ZW0sc2VsZWN0ZWRJdGVtc1NvdXJjZSxvblNvdXJjZVNlbGVjdClcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwiaXNJdGVtVmlzaWJsZShpdGVtLCBTT1VSQ0VfTElTVCkgPyAnYmxvY2snIDogJ25vbmUnXCIgdGFiaW5kZXg9XCIwXCIgcm9sZT1cIm9wdGlvblwiIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwiaXNTZWxlY3RlZChpdGVtLCBzZWxlY3RlZEl0ZW1zU291cmNlKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZHJhZ2dhYmxlXT1cImRyYWdkcm9wXCIgKGRyYWdzdGFydCk9XCJvbkRyYWdTdGFydCgkZXZlbnQsIGksIFNPVVJDRV9MSVNUKVwiIChkcmFnZW5kKT1cIm9uRHJhZ0VuZCgkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiBpdGVtLCBpbmRleDogaX1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwidWktcGlja2xpc3QtZHJvcHBvaW50XCIgKm5nSWY9XCJkcmFnZHJvcCYmbFwiIChkcmFnb3Zlcik9XCJvbkRyYWdPdmVyKCRldmVudCwgaSArIDEsIFNPVVJDRV9MSVNUKVwiIChkcm9wKT1cIm9uRHJvcCgkZXZlbnQsIGkgKyAxLCBTT1VSQ0VfTElTVClcIiAoZHJhZ2xlYXZlKT1cIm9uRHJhZ0xlYXZlKCRldmVudCwgU09VUkNFX0xJU1QpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1waWNrbGlzdC1kcm9wcG9pbnQtaGlnaGxpZ2h0JzogKGkgKyAxID09PSBkcmFnT3Zlckl0ZW1JbmRleFNvdXJjZSl9XCI+PC9saT5cclxuICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIoc291cmNlID09IG51bGwgfHwgc291cmNlLmxlbmd0aCA9PT0gMCkgJiYgZW1wdHlNZXNzYWdlU291cmNlVGVtcGxhdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwidWktcGlja2xpc3QtZW1wdHktbWVzc2FnZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImVtcHR5TWVzc2FnZVNvdXJjZVRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXBpY2tsaXN0LWJ1dHRvbnNcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1waWNrbGlzdC1idXR0b25zLWNlbGxcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBwQnV0dG9uIGljb249XCJwaSBwaS1hbmdsZS1yaWdodFwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIChjbGljayk9XCJtb3ZlUmlnaHQoKVwiPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gaWNvbj1cInBpIHBpLWFuZ2xlLWRvdWJsZS1yaWdodFwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIChjbGljayk9XCJtb3ZlQWxsUmlnaHQoKVwiPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gaWNvbj1cInBpIHBpLWFuZ2xlLWxlZnRcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiAoY2xpY2spPVwibW92ZUxlZnQoKVwiPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gaWNvbj1cInBpIHBpLWFuZ2xlLWRvdWJsZS1sZWZ0XCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgKGNsaWNrKT1cIm1vdmVBbGxMZWZ0KClcIj48L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXBpY2tsaXN0LWxpc3R3cmFwcGVyIHVpLXBpY2tsaXN0LXRhcmdldC13cmFwcGVyXCIgW25nQ2xhc3NdPVwieyd1aS1waWNrbGlzdC1saXN0d3JhcHBlci1ub2NvbnRyb2xzJzohc2hvd1RhcmdldENvbnRyb2xzfVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXBpY2tsaXN0LWNhcHRpb24gdWktd2lkZ2V0LWhlYWRlciB1aS1jb3JuZXItdGwgdWktY29ybmVyLXRyXCIgKm5nSWY9XCJ0YXJnZXRIZWFkZXJcIj57e3RhcmdldEhlYWRlcn19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktcGlja2xpc3QtZmlsdGVyLWNvbnRhaW5lciB1aS13aWRnZXQtY29udGVudFwiICpuZ0lmPVwiZmlsdGVyQnkgJiYgc2hvd1RhcmdldEZpbHRlciAhPT0gZmFsc2VcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgI3RhcmdldEZpbHRlciB0eXBlPVwidGV4dFwiIHJvbGU9XCJ0ZXh0Ym94XCIgKGtleXVwKT1cIm9uRmlsdGVyKCRldmVudCx0YXJnZXQsVEFSR0VUX0xJU1QpXCIgY2xhc3M9XCJ1aS1waWNrbGlzdC1maWx0ZXIgdWktaW5wdXR0ZXh0IHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGxcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbYXR0ci5wbGFjZWhvbGRlcl09XCJ0YXJnZXRGaWx0ZXJQbGFjZWhvbGRlclwiIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYVRhcmdldEZpbHRlckxhYmVsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1waWNrbGlzdC1maWx0ZXItaWNvbiBwaSBwaS1zZWFyY2hcIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDx1bCAjdGFyZ2V0bGlzdCBjbGFzcz1cInVpLXdpZGdldC1jb250ZW50IHVpLXBpY2tsaXN0LWxpc3QgdWktcGlja2xpc3QtdGFyZ2V0IHVpLWNvcm5lci1ib3R0b21cIiBbbmdDbGFzc109XCJ7J3VpLXBpY2tsaXN0LWhpZ2hsaWdodCc6IGxpc3RIaWdobGlnaHRUYXJnZXR9XCJcclxuICAgICAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ0YXJnZXRTdHlsZVwiIChkcmFnb3Zlcik9XCJvbkxpc3RNb3VzZU1vdmUoJGV2ZW50LFRBUkdFVF9MSVNUKVwiIChkcmFnbGVhdmUpPVwib25MaXN0RHJhZ0xlYXZlKClcIiAoZHJvcCk9XCJvbkxpc3REcm9wKCRldmVudCxUQVJHRVRfTElTVClcIiByb2xlPVwibGlzdGJveFwiIGFyaWEtbXVsdGlzZWxlY3RhYmxlPVwibXVsdGlwbGVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWl0ZW0gW25nRm9yT2ZdPVwidGFyZ2V0XCIgW25nRm9yVHJhY2tCeV09XCJ0YXJnZXRUcmFja0J5IHx8IHRyYWNrQnlcIiBsZXQtaT1cImluZGV4XCIgbGV0LWw9XCJsYXN0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInVpLXBpY2tsaXN0LWRyb3Bwb2ludFwiICpuZ0lmPVwiZHJhZ2Ryb3BcIiAoZHJhZ292ZXIpPVwib25EcmFnT3ZlcigkZXZlbnQsIGksIFRBUkdFVF9MSVNUKVwiIChkcm9wKT1cIm9uRHJvcCgkZXZlbnQsIGksIFRBUkdFVF9MSVNUKVwiIChkcmFnbGVhdmUpPVwib25EcmFnTGVhdmUoJGV2ZW50LCBUQVJHRVRfTElTVClcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXBpY2tsaXN0LWRyb3Bwb2ludC1oaWdobGlnaHQnOiAoaSA9PT0gZHJhZ092ZXJJdGVtSW5kZXhUYXJnZXQpfVwiIFtzdHlsZS5kaXNwbGF5XT1cImlzSXRlbVZpc2libGUoaXRlbSwgVEFSR0VUX0xJU1QpID8gJ2Jsb2NrJyA6ICdub25lJ1wiPjwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBbbmdDbGFzc109XCJ7J3VpLXBpY2tsaXN0LWl0ZW0nOnRydWUsJ3VpLXN0YXRlLWhpZ2hsaWdodCc6aXNTZWxlY3RlZChpdGVtLHNlbGVjdGVkSXRlbXNUYXJnZXQpLCAndWktc3RhdGUtZGlzYWJsZWQnOiBkaXNhYmxlZH1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKCRldmVudCxpdGVtLHNlbGVjdGVkSXRlbXNUYXJnZXQsb25UYXJnZXRTZWxlY3QpXCIgKGRibGNsaWNrKT1cIm9uVGFyZ2V0SXRlbURibENsaWNrKClcIiAodG91Y2hlbmQpPVwib25JdGVtVG91Y2hFbmQoJGV2ZW50KVwiIChrZXlkb3duKT1cIm9uSXRlbUtleWRvd24oJGV2ZW50LGl0ZW0sc2VsZWN0ZWRJdGVtc1RhcmdldCxvblRhcmdldFNlbGVjdClcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLmRpc3BsYXldPVwiaXNJdGVtVmlzaWJsZShpdGVtLCBUQVJHRVRfTElTVCkgPyAnYmxvY2snIDogJ25vbmUnXCIgdGFiaW5kZXg9XCIwXCIgcm9sZT1cIm9wdGlvblwiIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwiaXNTZWxlY3RlZChpdGVtLCBzZWxlY3RlZEl0ZW1zVGFyZ2V0KVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZHJhZ2dhYmxlXT1cImRyYWdkcm9wXCIgKGRyYWdzdGFydCk9XCJvbkRyYWdTdGFydCgkZXZlbnQsIGksIFRBUkdFVF9MSVNUKVwiIChkcmFnZW5kKT1cIm9uRHJhZ0VuZCgkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiBpdGVtLCBpbmRleDogaX1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwidWktcGlja2xpc3QtZHJvcHBvaW50XCIgKm5nSWY9XCJkcmFnZHJvcCYmbFwiIChkcmFnb3Zlcik9XCJvbkRyYWdPdmVyKCRldmVudCwgaSArIDEsIFRBUkdFVF9MSVNUKVwiIChkcm9wKT1cIm9uRHJvcCgkZXZlbnQsIGkgKyAxLCBUQVJHRVRfTElTVClcIiAoZHJhZ2xlYXZlKT1cIm9uRHJhZ0xlYXZlKCRldmVudCwgVEFSR0VUX0xJU1QpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1waWNrbGlzdC1kcm9wcG9pbnQtaGlnaGxpZ2h0JzogKGkgKyAxID09PSBkcmFnT3Zlckl0ZW1JbmRleFRhcmdldCl9XCI+PC9saT5cclxuICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIodGFyZ2V0ID09IG51bGwgfHwgdGFyZ2V0Lmxlbmd0aCA9PT0gMCkgJiYgZW1wdHlNZXNzYWdlVGFyZ2V0VGVtcGxhdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwidWktcGlja2xpc3QtZW1wdHktbWVzc2FnZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImVtcHR5TWVzc2FnZVRhcmdldFRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXBpY2tsaXN0LXRhcmdldC1jb250cm9scyB1aS1waWNrbGlzdC1idXR0b25zXCIgKm5nSWY9XCJzaG93VGFyZ2V0Q29udHJvbHNcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1waWNrbGlzdC1idXR0b25zLWNlbGxcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBwQnV0dG9uIGljb249XCJwaSBwaS1hbmdsZS11cFwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIChjbGljayk9XCJtb3ZlVXAodGFyZ2V0bGlzdCx0YXJnZXQsc2VsZWN0ZWRJdGVtc1RhcmdldCxvblRhcmdldFJlb3JkZXIpXCI+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgcEJ1dHRvbiBpY29uPVwicGkgcGktYW5nbGUtZG91YmxlLXVwXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgKGNsaWNrKT1cIm1vdmVUb3AodGFyZ2V0bGlzdCx0YXJnZXQsc2VsZWN0ZWRJdGVtc1RhcmdldCxvblRhcmdldFJlb3JkZXIpXCI+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgcEJ1dHRvbiBpY29uPVwicGkgcGktYW5nbGUtZG93blwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIChjbGljayk9XCJtb3ZlRG93bih0YXJnZXRsaXN0LHRhcmdldCxzZWxlY3RlZEl0ZW1zVGFyZ2V0LG9uVGFyZ2V0UmVvcmRlcilcIj48L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBwQnV0dG9uIGljb249XCJwaSBwaS1hbmdsZS1kb3VibGUtZG93blwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIChjbGljayk9XCJtb3ZlQm90dG9tKHRhcmdldGxpc3QsdGFyZ2V0LHNlbGVjdGVkSXRlbXNUYXJnZXQsb25UYXJnZXRSZW9yZGVyKVwiPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGlja0xpc3QgaW1wbGVtZW50cyBBZnRlclZpZXdDaGVja2VkLEFmdGVyQ29udGVudEluaXQge1xyXG5cclxuICAgIEBJbnB1dCgpIHNvdXJjZTogYW55W107XHJcblxyXG4gICAgQElucHV0KCkgdGFyZ2V0OiBhbnlbXTtcclxuXHJcbiAgICBASW5wdXQoKSBzb3VyY2VIZWFkZXI6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSB0YXJnZXRIZWFkZXI6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSByZXNwb25zaXZlOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIGZpbHRlckJ5OiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgZmlsdGVyTG9jYWxlOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgdHJhY2tCeTogRnVuY3Rpb24gPSAoaW5kZXg6IG51bWJlciwgaXRlbTogYW55KSA9PiBpdGVtO1xyXG5cclxuICAgIEBJbnB1dCgpIHNvdXJjZVRyYWNrQnk6IEZ1bmN0aW9uO1xyXG5cclxuICAgIEBJbnB1dCgpIHRhcmdldFRyYWNrQnk6IEZ1bmN0aW9uO1xyXG5cclxuICAgIEBJbnB1dCgpIHNob3dTb3VyY2VGaWx0ZXI6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIHNob3dUYXJnZXRGaWx0ZXI6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIG1ldGFLZXlTZWxlY3Rpb246IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIGRyYWdkcm9wOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIHNvdXJjZVN0eWxlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgdGFyZ2V0U3R5bGU6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBzaG93U291cmNlQ29udHJvbHM6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIHNob3dUYXJnZXRDb250cm9sczogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgQElucHV0KCkgc291cmNlRmlsdGVyUGxhY2Vob2xkZXI6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSB0YXJnZXRGaWx0ZXJQbGFjZWhvbGRlcjogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgQElucHV0KCkgYXJpYVNvdXJjZUZpbHRlckxhYmVsOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgYXJpYVRhcmdldEZpbHRlckxhYmVsOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgZmlsdGVyTWF0Y2hNb2RlOiBzdHJpbmcgPSBcImNvbnRhaW5zXCI7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uTW92ZVRvU291cmNlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25Nb3ZlQWxsVG9Tb3VyY2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbk1vdmVBbGxUb1RhcmdldDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uTW92ZVRvVGFyZ2V0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25Tb3VyY2VSZW9yZGVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25UYXJnZXRSZW9yZGVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25Tb3VyY2VTZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvblRhcmdldFNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uU291cmNlRmlsdGVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25UYXJnZXRGaWx0ZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ3NvdXJjZWxpc3QnKSBsaXN0Vmlld1NvdXJjZUNoaWxkOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ3RhcmdldGxpc3QnKSBsaXN0Vmlld1RhcmdldENoaWxkOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ3NvdXJjZUZpbHRlcicpIHNvdXJjZUZpbHRlclZpZXdDaGlsZDogRWxlbWVudFJlZjtcclxuXHJcbiAgICBAVmlld0NoaWxkKCd0YXJnZXRGaWx0ZXInKSB0YXJnZXRGaWx0ZXJWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xyXG5cclxuICAgIHB1YmxpYyBpdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgcHVibGljIHZpc2libGVPcHRpb25zU291cmNlOiBhbnlbXTtcclxuXHJcbiAgICBwdWJsaWMgdmlzaWJsZU9wdGlvbnNUYXJnZXQ6IGFueVtdO1xyXG5cclxuICAgIHNlbGVjdGVkSXRlbXNTb3VyY2U6IGFueVtdID0gW107XHJcblxyXG4gICAgc2VsZWN0ZWRJdGVtc1RhcmdldDogYW55W10gPSBbXTtcclxuXHJcbiAgICByZW9yZGVyZWRMaXN0RWxlbWVudDogYW55O1xyXG5cclxuICAgIGRyYWdnZWRJdGVtSW5kZXhTb3VyY2U6IG51bWJlcjtcclxuXHJcbiAgICBkcmFnZ2VkSXRlbUluZGV4VGFyZ2V0OiBudW1iZXI7XHJcblxyXG4gICAgZHJhZ092ZXJJdGVtSW5kZXhTb3VyY2U6IG51bWJlcjtcclxuXHJcbiAgICBkcmFnT3Zlckl0ZW1JbmRleFRhcmdldDogbnVtYmVyO1xyXG5cclxuICAgIGRyYWdnaW5nOiBib29sZWFuO1xyXG5cclxuICAgIG1vdmVkVXA6IGJvb2xlYW47XHJcblxyXG4gICAgbW92ZWREb3duOiBib29sZWFuO1xyXG5cclxuICAgIGl0ZW1Ub3VjaGVkOiBib29sZWFuO1xyXG5cclxuICAgIGZpbHRlclZhbHVlU291cmNlOiBzdHJpbmc7XHJcblxyXG4gICAgZmlsdGVyVmFsdWVUYXJnZXQ6IHN0cmluZztcclxuXHJcbiAgICBmcm9tTGlzdFR5cGU6IG51bWJlcjtcclxuXHJcbiAgICB0b0xpc3RUeXBlOiBudW1iZXI7XHJcblxyXG4gICAgb25MaXN0SXRlbURyb3Bwb2ludDogYm9vbGVhbjtcclxuXHJcbiAgICBsaXN0SGlnaGxpZ2h0VGFyZ2V0OiBib29sZWFuO1xyXG5cclxuICAgIGxpc3RIaWdobGlnaHRTb3VyY2U6IGJvb2xlYW47XHJcblxyXG4gICAgZW1wdHlNZXNzYWdlU291cmNlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgZW1wdHlNZXNzYWdlVGFyZ2V0VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgcmVhZG9ubHkgU09VUkNFX0xJU1QgPSAtMTtcclxuXHJcbiAgICByZWFkb25seSBUQVJHRVRfTElTVCA9IDE7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmKSB7fVxyXG5cclxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgICAgICB0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIHN3aXRjaChpdGVtLmdldFR5cGUoKSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnaXRlbSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnZW1wdHltZXNzYWdlc291cmNlJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtcHR5TWVzc2FnZVNvdXJjZVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ2VtcHR5bWVzc2FnZXRhcmdldCc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbXB0eU1lc3NhZ2VUYXJnZXRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5tb3ZlZFVwfHx0aGlzLm1vdmVkRG93bikge1xyXG4gICAgICAgICAgICBsZXQgbGlzdEl0ZW1zID0gRG9tSGFuZGxlci5maW5kKHRoaXMucmVvcmRlcmVkTGlzdEVsZW1lbnQsICdsaS51aS1zdGF0ZS1oaWdobGlnaHQnKTtcclxuICAgICAgICAgICAgbGV0IGxpc3RJdGVtO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMubW92ZWRVcClcclxuICAgICAgICAgICAgICAgIGxpc3RJdGVtID0gbGlzdEl0ZW1zWzBdO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBsaXN0SXRlbSA9IGxpc3RJdGVtc1tsaXN0SXRlbXMubGVuZ3RoIC0gMV07XHJcblxyXG4gICAgICAgICAgICBEb21IYW5kbGVyLnNjcm9sbEluVmlldyh0aGlzLnJlb3JkZXJlZExpc3RFbGVtZW50LCBsaXN0SXRlbSk7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZWRVcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVkRG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnJlb3JkZXJlZExpc3RFbGVtZW50ID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25JdGVtQ2xpY2soZXZlbnQsIGl0ZW06IGFueSwgc2VsZWN0ZWRJdGVtczogYW55W10sIGNhbGxiYWNrOiBFdmVudEVtaXR0ZXI8YW55Pikge1xyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuZmluZEluZGV4SW5TZWxlY3Rpb24oaXRlbSxzZWxlY3RlZEl0ZW1zKTtcclxuICAgICAgICBsZXQgc2VsZWN0ZWQgPSAoaW5kZXggIT0gLTEpO1xyXG4gICAgICAgIGxldCBtZXRhU2VsZWN0aW9uID0gdGhpcy5pdGVtVG91Y2hlZCA/IGZhbHNlIDogdGhpcy5tZXRhS2V5U2VsZWN0aW9uO1xyXG5cclxuICAgICAgICBpZiAobWV0YVNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICBsZXQgbWV0YUtleSA9IChldmVudC5tZXRhS2V5fHxldmVudC5jdHJsS2V5fHxldmVudC5zaGlmdEtleSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWQgJiYgbWV0YUtleSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFtZXRhS2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcy5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWQpXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhbGxiYWNrLmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBpdGVtczogc2VsZWN0ZWRJdGVtc30pO1xyXG5cclxuICAgICAgICB0aGlzLml0ZW1Ub3VjaGVkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25Tb3VyY2VJdGVtRGJsQ2xpY2soKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5tb3ZlUmlnaHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblRhcmdldEl0ZW1EYmxDbGljaygpIHtcclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm1vdmVMZWZ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25GaWx0ZXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGRhdGE6IGFueVtdLCBsaXN0VHlwZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHF1ZXJ5ID0gKCg8SFRNTElucHV0RWxlbWVudD4gZXZlbnQudGFyZ2V0KS52YWx1ZS50cmltKCkgYXMgYW55KS50b0xvY2FsZUxvd2VyQ2FzZSh0aGlzLmZpbHRlckxvY2FsZSk7XHJcbiAgICAgICAgdGhpcy5maWx0ZXIocXVlcnksIGRhdGEsIGxpc3RUeXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBmaWx0ZXIocXVlcnk6IHN0cmluZywgZGF0YTogYW55W10sIGxpc3RUeXBlOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgc2VhcmNoRmllbGRzID0gdGhpcy5maWx0ZXJCeS5zcGxpdCgnLCcpO1xyXG5cclxuICAgICAgICBpZiAobGlzdFR5cGUgPT09IHRoaXMuU09VUkNFX0xJU1QpIHtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZVNvdXJjZSA9IHF1ZXJ5O1xyXG4gICAgICAgICAgICB0aGlzLnZpc2libGVPcHRpb25zU291cmNlID0gRmlsdGVyVXRpbHMuZmlsdGVyKGRhdGEsIHNlYXJjaEZpZWxkcywgdGhpcy5maWx0ZXJWYWx1ZVNvdXJjZSwgdGhpcy5maWx0ZXJNYXRjaE1vZGUsIHRoaXMuZmlsdGVyTG9jYWxlKTtcclxuICAgICAgICAgICAgdGhpcy5vblNvdXJjZUZpbHRlci5lbWl0KHtxdWVyeTogdGhpcy5maWx0ZXJWYWx1ZVNvdXJjZSwgdmFsdWU6IHRoaXMudmlzaWJsZU9wdGlvbnNTb3VyY2V9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobGlzdFR5cGUgPT09IHRoaXMuVEFSR0VUX0xJU1QpIHtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZVRhcmdldCA9IHF1ZXJ5O1xyXG4gICAgICAgICAgICB0aGlzLnZpc2libGVPcHRpb25zVGFyZ2V0ID0gRmlsdGVyVXRpbHMuZmlsdGVyKGRhdGEsIHNlYXJjaEZpZWxkcywgdGhpcy5maWx0ZXJWYWx1ZVRhcmdldCwgdGhpcy5maWx0ZXJNYXRjaE1vZGUsIHRoaXMuZmlsdGVyTG9jYWxlKTtcclxuICAgICAgICAgICAgdGhpcy5vblRhcmdldEZpbHRlci5lbWl0KHtxdWVyeTogdGhpcy5maWx0ZXJWYWx1ZVRhcmdldCwgdmFsdWU6IHRoaXMudmlzaWJsZU9wdGlvbnNUYXJnZXR9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaXNJdGVtVmlzaWJsZShpdGVtOiBhbnksIGxpc3RUeXBlOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAobGlzdFR5cGUgPT0gdGhpcy5TT1VSQ0VfTElTVClcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNWaXNpYmxlSW5MaXN0KHRoaXMudmlzaWJsZU9wdGlvbnNTb3VyY2UsIGl0ZW0sIHRoaXMuZmlsdGVyVmFsdWVTb3VyY2UpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNWaXNpYmxlSW5MaXN0KHRoaXMudmlzaWJsZU9wdGlvbnNUYXJnZXQsIGl0ZW0sIHRoaXMuZmlsdGVyVmFsdWVUYXJnZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzVmlzaWJsZUluTGlzdChkYXRhOiBhbnlbXSwgaXRlbTogYW55LCBmaWx0ZXJWYWx1ZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGZpbHRlclZhbHVlICYmIGZpbHRlclZhbHVlLnRyaW0oKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtID09IGRhdGFbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uSXRlbVRvdWNoRW5kKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pdGVtVG91Y2hlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzb3J0QnlJbmRleEluTGlzdChpdGVtczogYW55W10sIGxpc3Q6IGFueSkge1xyXG4gICAgICAgIHJldHVybiBpdGVtcy5zb3J0KChpdGVtMSwgaXRlbTIpID0+XHJcbiAgICAgICAgICAgIHRoaXMuZmluZEluZGV4SW5MaXN0KGl0ZW0xLCBsaXN0KSAtIHRoaXMuZmluZEluZGV4SW5MaXN0KGl0ZW0yLCBsaXN0KSk7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZVVwKGxpc3RFbGVtZW50LCBsaXN0LCBzZWxlY3RlZEl0ZW1zLCBjYWxsYmFjaykge1xyXG4gICAgICAgIGlmIChzZWxlY3RlZEl0ZW1zICYmIHNlbGVjdGVkSXRlbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMgPSB0aGlzLnNvcnRCeUluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbXMsIGxpc3QpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2VsZWN0ZWRJdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbSA9IHNlbGVjdGVkSXRlbXNbaV07XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtSW5kZXg6IG51bWJlciA9IHRoaXMuZmluZEluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbSwgbGlzdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkSXRlbUluZGV4ICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZWRJdGVtID0gbGlzdFtzZWxlY3RlZEl0ZW1JbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXAgPSBsaXN0W3NlbGVjdGVkSXRlbUluZGV4LTFdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3Rbc2VsZWN0ZWRJdGVtSW5kZXgtMV0gPSBtb3ZlZEl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdFtzZWxlY3RlZEl0ZW1JbmRleF0gPSB0ZW1wO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMubW92ZWRVcCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucmVvcmRlcmVkTGlzdEVsZW1lbnQgPSBsaXN0RWxlbWVudDtcclxuICAgICAgICAgICAgY2FsbGJhY2suZW1pdCh7aXRlbXM6IHNlbGVjdGVkSXRlbXN9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZVRvcChsaXN0RWxlbWVudCwgbGlzdCwgc2VsZWN0ZWRJdGVtcywgY2FsbGJhY2spIHtcclxuICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtcyAmJiBzZWxlY3RlZEl0ZW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBzZWxlY3RlZEl0ZW1zID0gdGhpcy5zb3J0QnlJbmRleEluTGlzdChzZWxlY3RlZEl0ZW1zLCBsaXN0KTtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNlbGVjdGVkSXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW0gPSBzZWxlY3RlZEl0ZW1zW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbUluZGV4OiBudW1iZXIgPSB0aGlzLmZpbmRJbmRleEluTGlzdChzZWxlY3RlZEl0ZW0sIGxpc3QpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEl0ZW1JbmRleCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmVkSXRlbSA9IGxpc3Quc3BsaWNlKHNlbGVjdGVkSXRlbUluZGV4LDEpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3QudW5zaGlmdChtb3ZlZEl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxpc3RFbGVtZW50LnNjcm9sbFRvcCA9IDA7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrLmVtaXQoe2l0ZW1zOiBzZWxlY3RlZEl0ZW1zfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vdmVEb3duKGxpc3RFbGVtZW50LCBsaXN0LCBzZWxlY3RlZEl0ZW1zLCBjYWxsYmFjaykge1xyXG4gICAgICAgIGlmIChzZWxlY3RlZEl0ZW1zICYmIHNlbGVjdGVkSXRlbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMgPSB0aGlzLnNvcnRCeUluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbXMsIGxpc3QpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSBzZWxlY3RlZEl0ZW1zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtID0gc2VsZWN0ZWRJdGVtc1tpXTtcclxuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW1JbmRleDogbnVtYmVyID0gdGhpcy5maW5kSW5kZXhJbkxpc3Qoc2VsZWN0ZWRJdGVtLCBsaXN0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtSW5kZXggIT0gKGxpc3QubGVuZ3RoIC0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZWRJdGVtID0gbGlzdFtzZWxlY3RlZEl0ZW1JbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXAgPSBsaXN0W3NlbGVjdGVkSXRlbUluZGV4KzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3Rbc2VsZWN0ZWRJdGVtSW5kZXgrMV0gPSBtb3ZlZEl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdFtzZWxlY3RlZEl0ZW1JbmRleF0gPSB0ZW1wO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMubW92ZWREb3duID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5yZW9yZGVyZWRMaXN0RWxlbWVudCA9IGxpc3RFbGVtZW50O1xyXG4gICAgICAgICAgICBjYWxsYmFjay5lbWl0KHtpdGVtczogc2VsZWN0ZWRJdGVtc30pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb3ZlQm90dG9tKGxpc3RFbGVtZW50LCBsaXN0LCBzZWxlY3RlZEl0ZW1zLCBjYWxsYmFjaykge1xyXG4gICAgICAgIGlmIChzZWxlY3RlZEl0ZW1zICYmIHNlbGVjdGVkSXRlbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMgPSB0aGlzLnNvcnRCeUluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbXMsIGxpc3QpO1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSBzZWxlY3RlZEl0ZW1zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtID0gc2VsZWN0ZWRJdGVtc1tpXTtcclxuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW1JbmRleDogbnVtYmVyID0gdGhpcy5maW5kSW5kZXhJbkxpc3Qoc2VsZWN0ZWRJdGVtLCBsaXN0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtSW5kZXggIT0gKGxpc3QubGVuZ3RoIC0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZWRJdGVtID0gbGlzdC5zcGxpY2Uoc2VsZWN0ZWRJdGVtSW5kZXgsMSlbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdC5wdXNoKG1vdmVkSXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGlzdEVsZW1lbnQuc2Nyb2xsVG9wID0gbGlzdEVsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgICAgICAgICBjYWxsYmFjay5lbWl0KHtpdGVtczogc2VsZWN0ZWRJdGVtc30pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb3ZlUmlnaHQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJdGVtc1NvdXJjZSAmJiB0aGlzLnNlbGVjdGVkSXRlbXNTb3VyY2UubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnNlbGVjdGVkSXRlbXNTb3VyY2UubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW0gPSB0aGlzLnNlbGVjdGVkSXRlbXNTb3VyY2VbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maW5kSW5kZXhJbkxpc3Qoc2VsZWN0ZWRJdGVtLCB0aGlzLnRhcmdldCkgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhcmdldC5wdXNoKHRoaXMuc291cmNlLnNwbGljZSh0aGlzLmZpbmRJbmRleEluTGlzdChzZWxlY3RlZEl0ZW0sIHRoaXMuc291cmNlKSwxKVswXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5vbk1vdmVUb1RhcmdldC5lbWl0KHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zOiB0aGlzLnNlbGVjdGVkSXRlbXNTb3VyY2VcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc1NvdXJjZSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVyVmFsdWVUYXJnZXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyKHRoaXMuZmlsdGVyVmFsdWVUYXJnZXQsIHRoaXMudGFyZ2V0LCB0aGlzLlRBUkdFVF9MSVNUKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb3ZlQWxsUmlnaHQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc291cmNlKSB7XHJcbiAgICAgICAgICAgIGxldCBtb3ZlZEl0ZW1zID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zb3VyY2UubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzSXRlbVZpc2libGUodGhpcy5zb3VyY2VbaV0sIHRoaXMuU09VUkNFX0xJU1QpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlbW92ZWRJdGVtID0gdGhpcy5zb3VyY2Uuc3BsaWNlKGksIDEpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0LnB1c2gocmVtb3ZlZEl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVkSXRlbXMucHVzaChyZW1vdmVkSXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLm9uTW92ZVRvVGFyZ2V0LmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgaXRlbXM6IG1vdmVkSXRlbXNcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm9uTW92ZUFsbFRvVGFyZ2V0LmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgaXRlbXM6IG1vdmVkSXRlbXNcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXNTb3VyY2UgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlclZhbHVlVGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcih0aGlzLmZpbHRlclZhbHVlVGFyZ2V0LCB0aGlzLnRhcmdldCwgdGhpcy5UQVJHRVRfTElTVCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZUxlZnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJdGVtc1RhcmdldCAmJiB0aGlzLnNlbGVjdGVkSXRlbXNUYXJnZXQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnNlbGVjdGVkSXRlbXNUYXJnZXQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW0gPSB0aGlzLnNlbGVjdGVkSXRlbXNUYXJnZXRbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maW5kSW5kZXhJbkxpc3Qoc2VsZWN0ZWRJdGVtLCB0aGlzLnNvdXJjZSkgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvdXJjZS5wdXNoKHRoaXMudGFyZ2V0LnNwbGljZSh0aGlzLmZpbmRJbmRleEluTGlzdChzZWxlY3RlZEl0ZW0sIHRoaXMudGFyZ2V0KSwxKVswXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5vbk1vdmVUb1NvdXJjZS5lbWl0KHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zOiB0aGlzLnNlbGVjdGVkSXRlbXNUYXJnZXRcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXNUYXJnZXQgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlclZhbHVlU291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcih0aGlzLmZpbHRlclZhbHVlU291cmNlLCB0aGlzLnNvdXJjZSwgdGhpcy5TT1VSQ0VfTElTVCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZUFsbExlZnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGxldCBtb3ZlZEl0ZW1zID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy50YXJnZXQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzSXRlbVZpc2libGUodGhpcy50YXJnZXRbaV0sIHRoaXMuVEFSR0VUX0xJU1QpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlbW92ZWRJdGVtID0gdGhpcy50YXJnZXQuc3BsaWNlKGksIDEpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc291cmNlLnB1c2gocmVtb3ZlZEl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVkSXRlbXMucHVzaChyZW1vdmVkSXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLm9uTW92ZVRvU291cmNlLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgaXRlbXM6IG1vdmVkSXRlbXNcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm9uTW92ZUFsbFRvU291cmNlLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgaXRlbXM6IG1vdmVkSXRlbXNcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXNUYXJnZXQgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlclZhbHVlU291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcih0aGlzLmZpbHRlclZhbHVlU291cmNlLCB0aGlzLnNvdXJjZSwgdGhpcy5TT1VSQ0VfTElTVCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaXNTZWxlY3RlZChpdGVtOiBhbnksIHNlbGVjdGVkSXRlbXM6IGFueVtdKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZEluZGV4SW5TZWxlY3Rpb24oaXRlbSwgc2VsZWN0ZWRJdGVtcykgIT0gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgZmluZEluZGV4SW5TZWxlY3Rpb24oaXRlbTogYW55LCBzZWxlY3RlZEl0ZW1zOiBhbnlbXSk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluZEluZGV4SW5MaXN0KGl0ZW0sIHNlbGVjdGVkSXRlbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmRJbmRleEluTGlzdChpdGVtOiBhbnksIGxpc3Q6IGFueSk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSAtMTtcclxuXHJcbiAgICAgICAgaWYgKGxpc3QpIHtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0W2ldID09IGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBpbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBvbkRyYWdTdGFydChldmVudDogRHJhZ0V2ZW50LCBpbmRleDogbnVtYmVyLCBsaXN0VHlwZTogbnVtYmVyKSB7XHJcbiAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQnLCAnYicpOyAgICAvLyBGb3IgZmlyZWZveFxyXG4gICAgICAgICg8SFRNTExJRWxlbWVudD4gZXZlbnQudGFyZ2V0KS5ibHVyKCk7XHJcbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5mcm9tTGlzdFR5cGUgPSBsaXN0VHlwZTtcclxuXHJcbiAgICAgICAgaWYgKGxpc3RUeXBlID09PSB0aGlzLlNPVVJDRV9MSVNUKVxyXG4gICAgICAgICAgICB0aGlzLmRyYWdnZWRJdGVtSW5kZXhTb3VyY2UgPSBpbmRleDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuZHJhZ2dlZEl0ZW1JbmRleFRhcmdldCA9IGluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIG9uRHJhZ092ZXIoZXZlbnQ6IERyYWdFdmVudCwgaW5kZXg6IG51bWJlciwgbGlzdFR5cGU6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XHJcbiAgICAgICAgICAgIGlmIChsaXN0VHlwZSA9PSB0aGlzLlNPVVJDRV9MSVNUKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmFnZ2VkSXRlbUluZGV4U291cmNlICE9PSBpbmRleCAmJiB0aGlzLmRyYWdnZWRJdGVtSW5kZXhTb3VyY2UgKyAxICE9PSBpbmRleCB8fMKgKHRoaXMuZnJvbUxpc3RUeXBlID09PSB0aGlzLlRBUkdFVF9MSVNUKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhZ092ZXJJdGVtSW5kZXhTb3VyY2UgPSBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJhZ2dlZEl0ZW1JbmRleFRhcmdldCAhPT0gaW5kZXggJiYgdGhpcy5kcmFnZ2VkSXRlbUluZGV4VGFyZ2V0ICsgMSAhPT0gaW5kZXggfHzCoCh0aGlzLmZyb21MaXN0VHlwZSA9PT0gdGhpcy5TT1VSQ0VfTElTVCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYWdPdmVySXRlbUluZGV4VGFyZ2V0ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm9uTGlzdEl0ZW1Ecm9wcG9pbnQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkRyYWdMZWF2ZShldmVudDogRHJhZ0V2ZW50LCBsaXN0VHlwZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5kcmFnT3Zlckl0ZW1JbmRleFNvdXJjZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5kcmFnT3Zlckl0ZW1JbmRleFRhcmdldCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5vbkxpc3RJdGVtRHJvcHBvaW50ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25Ecm9wKGV2ZW50OiBEcmFnRXZlbnQsIGluZGV4OiBudW1iZXIsIGxpc3RUeXBlOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5vbkxpc3RJdGVtRHJvcHBvaW50KSB7XHJcbiAgICAgICAgICAgIGlmIChsaXN0VHlwZSA9PT0gdGhpcy5TT1VSQ0VfTElTVCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJvbUxpc3RUeXBlID09PSB0aGlzLlRBUkdFVF9MSVNUKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnNlcnQodGhpcy5kcmFnZ2VkSXRlbUluZGV4VGFyZ2V0LCB0aGlzLnRhcmdldCwgaW5kZXgsIHRoaXMuc291cmNlLCB0aGlzLm9uTW92ZVRvU291cmNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdFV0aWxzLnJlb3JkZXJBcnJheSh0aGlzLnNvdXJjZSwgdGhpcy5kcmFnZ2VkSXRlbUluZGV4U291cmNlLCAodGhpcy5kcmFnZ2VkSXRlbUluZGV4U291cmNlID4gaW5kZXgpID8gaW5kZXggOiAoaW5kZXggPT09IDApID8gMCA6IGluZGV4IC0gMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblNvdXJjZVJlb3JkZXIuZW1pdCh7aXRlbXM6IHRoaXMuc291cmNlW3RoaXMuZHJhZ2dlZEl0ZW1JbmRleFNvdXJjZV19KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdPdmVySXRlbUluZGV4U291cmNlID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyb21MaXN0VHlwZSA9PT0gdGhpcy5TT1VSQ0VfTElTVCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0KHRoaXMuZHJhZ2dlZEl0ZW1JbmRleFNvdXJjZSwgdGhpcy5zb3VyY2UsIGluZGV4LCB0aGlzLnRhcmdldCwgdGhpcy5vbk1vdmVUb1RhcmdldCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBPYmplY3RVdGlscy5yZW9yZGVyQXJyYXkodGhpcy50YXJnZXQsIHRoaXMuZHJhZ2dlZEl0ZW1JbmRleFRhcmdldCwgKHRoaXMuZHJhZ2dlZEl0ZW1JbmRleFRhcmdldCA+IGluZGV4KSA/IGluZGV4IDogKGluZGV4ID09PSAwKSA/IDAgOiBpbmRleCAtIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25UYXJnZXRSZW9yZGVyLmVtaXQoe2l0ZW1zOiB0aGlzLnRhcmdldFt0aGlzLmRyYWdnZWRJdGVtSW5kZXhUYXJnZXRdfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnT3Zlckl0ZW1JbmRleFRhcmdldCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMubGlzdEhpZ2hsaWdodFRhcmdldCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RIaWdobGlnaHRTb3VyY2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25EcmFnRW5kKGV2ZW50OiBEcmFnRXZlbnQpIHtcclxuICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25MaXN0RHJvcChldmVudDogRHJhZ0V2ZW50LCBsaXN0VHlwZTogIG51bWJlcikge1xyXG4gICAgICAgIGlmICghdGhpcy5vbkxpc3RJdGVtRHJvcHBvaW50KSB7XHJcbiAgICAgICAgICAgIGlmIChsaXN0VHlwZSA9PT0gdGhpcy5TT1VSQ0VfTElTVCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJvbUxpc3RUeXBlID09PSB0aGlzLlRBUkdFVF9MSVNUKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnNlcnQodGhpcy5kcmFnZ2VkSXRlbUluZGV4VGFyZ2V0LCB0aGlzLnRhcmdldCwgbnVsbCwgdGhpcy5zb3VyY2UsIHRoaXMub25Nb3ZlVG9Tb3VyY2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJvbUxpc3RUeXBlID09PSB0aGlzLlNPVVJDRV9MSVNUKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnNlcnQodGhpcy5kcmFnZ2VkSXRlbUluZGV4U291cmNlLCB0aGlzLnNvdXJjZSwgbnVsbCwgdGhpcy50YXJnZXQsIHRoaXMub25Nb3ZlVG9UYXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxpc3RIaWdobGlnaHRUYXJnZXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5saXN0SGlnaGxpZ2h0U291cmNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluc2VydChmcm9tSW5kZXgsIGZyb21MaXN0LCB0b0luZGV4LCB0b0xpc3QsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudHRvbW92ZSA9IGZyb21MaXN0W2Zyb21JbmRleF07XHJcblxyXG4gICAgICAgIGlmICh0b0luZGV4ID09PSBudWxsKVxyXG4gICAgICAgICAgICB0b0xpc3QucHVzaChmcm9tTGlzdC5zcGxpY2UoZnJvbUluZGV4LCAxKVswXSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0b0xpc3Quc3BsaWNlKHRvSW5kZXgsIDAsIGZyb21MaXN0LnNwbGljZShmcm9tSW5kZXgsIDEpWzBdKTtcclxuXHJcbiAgICAgICAgY2FsbGJhY2suZW1pdCh7XHJcbiAgICAgICAgICAgIGl0ZW1zOiBbZWxlbWVudHRvbW92ZV1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkxpc3RNb3VzZU1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQsIGxpc3RUeXBlOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5kcmFnZ2luZykge1xyXG4gICAgICAgICAgICBsZXQgbW92ZUxpc3RUeXBlID0gKGxpc3RUeXBlID09IDAgPyB0aGlzLmxpc3RWaWV3U291cmNlQ2hpbGQgOiB0aGlzLmxpc3RWaWV3VGFyZ2V0Q2hpbGQpO1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0WSA9IG1vdmVMaXN0VHlwZS5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xyXG4gICAgICAgICAgICBsZXQgYm90dG9tRGlmZiA9IChvZmZzZXRZICsgbW92ZUxpc3RUeXBlLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0KSAtIGV2ZW50LnBhZ2VZO1xyXG4gICAgICAgICAgICBsZXQgdG9wRGlmZiA9IChldmVudC5wYWdlWSAtIG9mZnNldFkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGJvdHRvbURpZmYgPCAyNSAmJiBib3R0b21EaWZmID4gMClcclxuICAgICAgICAgICAgICAgIG1vdmVMaXN0VHlwZS5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCArPSAxNTtcclxuICAgICAgICAgICAgZWxzZSBpZiAodG9wRGlmZiA8IDI1ICYmIHRvcERpZmYgPiAwKVxyXG4gICAgICAgICAgICAgICAgbW92ZUxpc3RUeXBlLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wIC09IDE1O1xyXG5cclxuICAgICAgICAgICAgaWYgKGxpc3RUeXBlID09PSB0aGlzLlNPVVJDRV9MSVNUKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcm9tTGlzdFR5cGUgPT09IHRoaXMuVEFSR0VUX0xJU1QpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0SGlnaGxpZ2h0U291cmNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyb21MaXN0VHlwZSA9PT0gdGhpcy5TT1VSQ0VfTElTVClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RIaWdobGlnaHRUYXJnZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkxpc3REcmFnTGVhdmUoKSB7XHJcbiAgICAgICAgdGhpcy5saXN0SGlnaGxpZ2h0VGFyZ2V0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5saXN0SGlnaGxpZ2h0U291cmNlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRGaWx0ZXIoKSB7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlT3B0aW9uc1NvdXJjZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZVNvdXJjZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlT3B0aW9uc1RhcmdldCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZVRhcmdldCA9IG51bGw7XHJcblxyXG4gICAgICAgICg8SFRNTElucHV0RWxlbWVudD4gdGhpcy5zb3VyY2VGaWx0ZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkudmFsdWUgPSAnJztcclxuICAgICAgICAoPEhUTUxJbnB1dEVsZW1lbnQ+IHRoaXMudGFyZ2V0RmlsdGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpLnZhbHVlID0gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgb25JdGVtS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCwgaXRlbTogYW55LCBzZWxlY3RlZEl0ZW1zOiBhbnlbXSwgY2FsbGJhY2s6IEV2ZW50RW1pdHRlcjxhbnk+KSB7XHJcbiAgICAgICAgbGV0IGxpc3RJdGVtID0gPEhUTUxMSUVsZW1lbnQ+IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcblxyXG4gICAgICAgIHN3aXRjaChldmVudC53aGljaCkge1xyXG4gICAgICAgICAgICAvL2Rvd25cclxuICAgICAgICAgICAgY2FzZSA0MDpcclxuICAgICAgICAgICAgICAgIHZhciBuZXh0SXRlbSA9IHRoaXMuZmluZE5leHRJdGVtKGxpc3RJdGVtKTtcclxuICAgICAgICAgICAgICAgIGlmIChuZXh0SXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRJdGVtLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAvL3VwXHJcbiAgICAgICAgICAgIGNhc2UgMzg6XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJldkl0ZW0gPSB0aGlzLmZpbmRQcmV2SXRlbShsaXN0SXRlbSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJldkl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBwcmV2SXRlbS5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgLy9lbnRlclxyXG4gICAgICAgICAgICBjYXNlIDEzOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkl0ZW1DbGljayhldmVudCwgaXRlbSwgc2VsZWN0ZWRJdGVtcywgY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZpbmROZXh0SXRlbShpdGVtKSB7XHJcbiAgICAgICAgbGV0IG5leHRJdGVtID0gaXRlbS5uZXh0RWxlbWVudFNpYmxpbmc7XHJcblxyXG4gICAgICAgIGlmIChuZXh0SXRlbSlcclxuICAgICAgICAgICAgcmV0dXJuICFEb21IYW5kbGVyLmhhc0NsYXNzKG5leHRJdGVtLCAndWktcGlja2xpc3QtaXRlbScpIHx8IERvbUhhbmRsZXIuaXNIaWRkZW4obmV4dEl0ZW0pID8gdGhpcy5maW5kTmV4dEl0ZW0obmV4dEl0ZW0pIDogbmV4dEl0ZW07XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBmaW5kUHJldkl0ZW0oaXRlbSkge1xyXG4gICAgICAgIGxldCBwcmV2SXRlbSA9IGl0ZW0ucHJldmlvdXNFbGVtZW50U2libGluZztcclxuXHJcbiAgICAgICAgaWYgKHByZXZJdGVtKVxyXG4gICAgICAgICAgICByZXR1cm4gIURvbUhhbmRsZXIuaGFzQ2xhc3MocHJldkl0ZW0sICd1aS1waWNrbGlzdC1pdGVtJykgfHwgRG9tSGFuZGxlci5pc0hpZGRlbihwcmV2SXRlbSkgPyB0aGlzLmZpbmRQcmV2SXRlbShwcmV2SXRlbSkgOiBwcmV2SXRlbTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSxCdXR0b25Nb2R1bGUsU2hhcmVkTW9kdWxlXSxcclxuICAgIGV4cG9ydHM6IFtQaWNrTGlzdCxTaGFyZWRNb2R1bGVdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbUGlja0xpc3RdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQaWNrTGlzdE1vZHVsZSB7IH1cclxuIl19