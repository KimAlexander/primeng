var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
import { NgModule, Component, HostListener, OnInit, OnDestroy, AfterViewInit, AfterViewChecked, Directive, Optional, AfterContentInit, Input, Output, EventEmitter, ElementRef, ContentChildren, TemplateRef, QueryList, ViewChild, NgZone, ChangeDetectorRef, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { DomHandler } from 'primeng/dom';
import { ObjectUtils } from 'primeng/utils';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FilterUtils } from 'primeng/utils';
var TableService = /** @class */ (function () {
    function TableService() {
        this.sortSource = new Subject();
        this.selectionSource = new Subject();
        this.contextMenuSource = new Subject();
        this.valueSource = new Subject();
        this.totalRecordsSource = new Subject();
        this.columnsSource = new Subject();
        this.sortSource$ = this.sortSource.asObservable();
        this.selectionSource$ = this.selectionSource.asObservable();
        this.contextMenuSource$ = this.contextMenuSource.asObservable();
        this.valueSource$ = this.valueSource.asObservable();
        this.totalRecordsSource$ = this.totalRecordsSource.asObservable();
        this.columnsSource$ = this.columnsSource.asObservable();
    }
    TableService.prototype.onSort = function (sortMeta) {
        this.sortSource.next(sortMeta);
    };
    TableService.prototype.onSelectionChange = function () {
        this.selectionSource.next();
    };
    TableService.prototype.onContextMenu = function (data) {
        this.contextMenuSource.next(data);
    };
    TableService.prototype.onValueChange = function (value) {
        this.valueSource.next(value);
    };
    TableService.prototype.onTotalRecordsChange = function (value) {
        this.totalRecordsSource.next(value);
    };
    TableService.prototype.onColumnsChange = function (columns) {
        this.columnsSource.next(columns);
    };
    TableService = __decorate([
        Injectable()
    ], TableService);
    return TableService;
}());
export { TableService };
var Table = /** @class */ (function () {
    function Table(el, zone, tableService, cd) {
        this.el = el;
        this.zone = zone;
        this.tableService = tableService;
        this.cd = cd;
        this.pageLinks = 5;
        this.alwaysShowPaginator = true;
        this.paginatorPosition = 'bottom';
        this.paginatorDropdownScrollHeight = '200px';
        this.currentPageReportTemplate = '{currentPage} of {totalPages}';
        this.defaultSortOrder = 1;
        this.sortMode = 'single';
        this.resetPageOnSort = true;
        this.selectionChange = new EventEmitter();
        this.contextMenuSelectionChange = new EventEmitter();
        this.contextMenuSelectionMode = "separate";
        this.rowTrackBy = function (index, item) { return item; };
        this.lazy = false;
        this.lazyLoadOnInit = true;
        this.compareSelectionBy = 'deepEquals';
        this.csvSeparator = ',';
        this.exportFilename = 'download';
        this.filters = {};
        this.filterDelay = 300;
        this.expandedRowKeys = {};
        this.editingRowKeys = {};
        this.rowExpandMode = 'multiple';
        this.virtualScrollDelay = 150;
        this.virtualRowHeight = 28;
        this.columnResizeMode = 'fit';
        this.loadingIcon = 'pi pi-spinner';
        this.showLoader = true;
        this.stateStorage = 'session';
        this.editMode = 'cell';
        this.onRowSelect = new EventEmitter();
        this.onRowUnselect = new EventEmitter();
        this.onPage = new EventEmitter();
        this.onSort = new EventEmitter();
        this.onFilter = new EventEmitter();
        this.onLazyLoad = new EventEmitter();
        this.onRowExpand = new EventEmitter();
        this.onRowCollapse = new EventEmitter();
        this.onContextMenuSelect = new EventEmitter();
        this.onColResize = new EventEmitter();
        this.onColReorder = new EventEmitter();
        this.onRowReorder = new EventEmitter();
        this.onEditInit = new EventEmitter();
        this.onEditComplete = new EventEmitter();
        this.onEditCancel = new EventEmitter();
        this.onHeaderCheckboxToggle = new EventEmitter();
        this.sortFunction = new EventEmitter();
        this.firstChange = new EventEmitter();
        this.rowsChange = new EventEmitter();
        this.onStateSave = new EventEmitter();
        this.onStateRestore = new EventEmitter();
        this._value = [];
        this._totalRecords = 0;
        this._first = 0;
        this.selectionKeys = {};
        this._sortOrder = 1;
    }
    Table.prototype.ngOnInit = function () {
        if (this.lazy && this.lazyLoadOnInit) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
            if (this.restoringFilter) {
                this.restoringFilter = false;
            }
        }
        this.initialized = true;
    };
    Table.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'caption':
                    _this.captionTemplate = item.template;
                    break;
                case 'header':
                    _this.headerTemplate = item.template;
                    break;
                case 'body':
                    _this.bodyTemplate = item.template;
                    break;
                case 'loadingbody':
                    _this.loadingBodyTemplate = item.template;
                    break;
                case 'footer':
                    _this.footerTemplate = item.template;
                    break;
                case 'summary':
                    _this.summaryTemplate = item.template;
                    break;
                case 'colgroup':
                    _this.colGroupTemplate = item.template;
                    break;
                case 'rowexpansion':
                    _this.expandedRowTemplate = item.template;
                    break;
                case 'frozenrows':
                    _this.frozenRowsTemplate = item.template;
                    break;
                case 'frozenheader':
                    _this.frozenHeaderTemplate = item.template;
                    break;
                case 'frozenbody':
                    _this.frozenBodyTemplate = item.template;
                    break;
                case 'frozenfooter':
                    _this.frozenFooterTemplate = item.template;
                    break;
                case 'frozencolgroup':
                    _this.frozenColGroupTemplate = item.template;
                    break;
                case 'emptymessage':
                    _this.emptyMessageTemplate = item.template;
                    break;
                case 'paginatorleft':
                    _this.paginatorLeftTemplate = item.template;
                    break;
                case 'paginatorright':
                    _this.paginatorRightTemplate = item.template;
                    break;
            }
        });
    };
    Table.prototype.ngAfterViewInit = function () {
        if (this.isStateful() && this.resizableColumns) {
            this.restoreColumnWidths();
        }
    };
    Table.prototype.ngOnChanges = function (simpleChange) {
        if (simpleChange.value) {
            if (this.isStateful() && !this.stateRestored) {
                this.restoreState();
            }
            this._value = simpleChange.value.currentValue;
            if (!this.lazy) {
                this.totalRecords = (this._value ? this._value.length : 0);
                if (this.sortMode == 'single' && this.sortField)
                    this.sortSingle();
                else if (this.sortMode == 'multiple' && this.multiSortMeta)
                    this.sortMultiple();
                else if (this.hasFilter()) //sort already filters
                    this._filter();
            }
            if (this.virtualScroll && this.virtualScrollCallback) {
                this.virtualScrollCallback();
            }
            this.tableService.onValueChange(simpleChange.value.currentValue);
        }
        if (simpleChange.columns) {
            this._columns = simpleChange.columns.currentValue;
            this.tableService.onColumnsChange(simpleChange.columns.currentValue);
            if (this._columns && this.isStateful() && this.reorderableColumns && !this.columnOrderStateRestored) {
                this.restoreColumnOrder();
            }
        }
        if (simpleChange.sortField) {
            this._sortField = simpleChange.sortField.currentValue;
            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                if (this.sortMode === 'single') {
                    this.sortSingle();
                }
            }
        }
        if (simpleChange.sortOrder) {
            this._sortOrder = simpleChange.sortOrder.currentValue;
            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                if (this.sortMode === 'single') {
                    this.sortSingle();
                }
            }
        }
        if (simpleChange.multiSortMeta) {
            this._multiSortMeta = simpleChange.multiSortMeta.currentValue;
            if (this.sortMode === 'multiple') {
                this.sortMultiple();
            }
        }
        if (simpleChange.selection) {
            this._selection = simpleChange.selection.currentValue;
            if (!this.preventSelectionSetterPropagation) {
                this.updateSelectionKeys();
                this.tableService.onSelectionChange();
            }
            this.preventSelectionSetterPropagation = false;
        }
    };
    Object.defineProperty(Table.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            this._value = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        set: function (cols) {
            this._columns = cols;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "first", {
        get: function () {
            return this._first;
        },
        set: function (val) {
            this._first = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "rows", {
        get: function () {
            return this._rows;
        },
        set: function (val) {
            this._rows = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "totalRecords", {
        get: function () {
            return this._totalRecords;
        },
        set: function (val) {
            this._totalRecords = val;
            this.tableService.onTotalRecordsChange(this._totalRecords);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "sortField", {
        get: function () {
            return this._sortField;
        },
        set: function (val) {
            this._sortField = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "sortOrder", {
        get: function () {
            return this._sortOrder;
        },
        set: function (val) {
            this._sortOrder = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "multiSortMeta", {
        get: function () {
            return this._multiSortMeta;
        },
        set: function (val) {
            this._multiSortMeta = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "selection", {
        get: function () {
            return this._selection;
        },
        set: function (val) {
            this._selection = val;
        },
        enumerable: true,
        configurable: true
    });
    Table.prototype.updateSelectionKeys = function () {
        var e_1, _a;
        if (this.dataKey && this._selection) {
            this.selectionKeys = {};
            if (Array.isArray(this._selection)) {
                try {
                    for (var _b = __values(this._selection), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var data = _c.value;
                        this.selectionKeys[String(ObjectUtils.resolveFieldData(data, this.dataKey))] = 1;
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
            else {
                this.selectionKeys[String(ObjectUtils.resolveFieldData(this._selection, this.dataKey))] = 1;
            }
        }
    };
    Table.prototype.onPageChange = function (event) {
        this.first = event.first;
        this.rows = event.rows;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        this.onPage.emit({
            first: this.first,
            rows: this.rows
        });
        this.firstChange.emit(this.first);
        this.rowsChange.emit(this.rows);
        this.tableService.onValueChange(this.value);
        if (this.isStateful()) {
            this.saveState();
        }
        this.anchorRowIndex = null;
    };
    Table.prototype.sort = function (event) {
        var originalEvent = event.originalEvent;
        if (this.sortMode === 'single') {
            this._sortOrder = (this.sortField === event.field) ? this.sortOrder * -1 : this.defaultSortOrder;
            this._sortField = event.field;
            this.sortSingle();
            if (this.resetPageOnSort) {
                this._first = 0;
                this.firstChange.emit(this._first);
            }
        }
        if (this.sortMode === 'multiple') {
            var metaKey = originalEvent.metaKey || originalEvent.ctrlKey;
            var sortMeta = this.getSortMeta(event.field);
            if (sortMeta) {
                if (!metaKey) {
                    this._multiSortMeta = [{ field: event.field, order: sortMeta.order * -1 }];
                    if (this.resetPageOnSort) {
                        this._first = 0;
                        this.firstChange.emit(this._first);
                    }
                }
                else {
                    sortMeta.order = sortMeta.order * -1;
                }
            }
            else {
                if (!metaKey || !this.multiSortMeta) {
                    this._multiSortMeta = [];
                    if (this.resetPageOnSort) {
                        this._first = 0;
                        this.firstChange.emit(this._first);
                    }
                }
                this._multiSortMeta.push({ field: event.field, order: this.defaultSortOrder });
            }
            this.sortMultiple();
        }
        if (this.isStateful()) {
            this.saveState();
        }
        this.anchorRowIndex = null;
    };
    Table.prototype.sortSingle = function () {
        var _this = this;
        if (this.sortField && this.sortOrder) {
            if (this.restoringSort) {
                this.restoringSort = false;
            }
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else if (this.value) {
                if (this.customSort) {
                    this.sortFunction.emit({
                        data: this.value,
                        mode: this.sortMode,
                        field: this.sortField,
                        order: this.sortOrder
                    });
                }
                else {
                    this.value.sort(function (data1, data2) {
                        var value1 = ObjectUtils.resolveFieldData(data1, _this.sortField);
                        var value2 = ObjectUtils.resolveFieldData(data2, _this.sortField);
                        var result = null;
                        if (value1 == null && value2 != null)
                            result = -1;
                        else if (value1 != null && value2 == null)
                            result = 1;
                        else if (value1 == null && value2 == null)
                            result = 0;
                        else if (typeof value1 === 'string' && typeof value2 === 'string')
                            result = value1.localeCompare(value2);
                        else
                            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
                        return (_this.sortOrder * result);
                    });
                }
                if (this.hasFilter()) {
                    this._filter();
                }
            }
            var sortMeta = {
                field: this.sortField,
                order: this.sortOrder
            };
            this.onSort.emit(sortMeta);
            this.tableService.onSort(sortMeta);
        }
    };
    Table.prototype.sortMultiple = function () {
        var _this = this;
        if (this.multiSortMeta) {
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else if (this.value) {
                if (this.customSort) {
                    this.sortFunction.emit({
                        data: this.value,
                        mode: this.sortMode,
                        multiSortMeta: this.multiSortMeta
                    });
                }
                else {
                    this.value.sort(function (data1, data2) {
                        return _this.multisortField(data1, data2, _this.multiSortMeta, 0);
                    });
                }
                if (this.hasFilter()) {
                    this._filter();
                }
            }
            this.onSort.emit({
                multisortmeta: this.multiSortMeta
            });
            this.tableService.onSort(this.multiSortMeta);
        }
    };
    Table.prototype.multisortField = function (data1, data2, multiSortMeta, index) {
        var value1 = ObjectUtils.resolveFieldData(data1, multiSortMeta[index].field);
        var value2 = ObjectUtils.resolveFieldData(data2, multiSortMeta[index].field);
        var result = null;
        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        else if (typeof value1 == 'string' || value1 instanceof String) {
            if (value1.localeCompare && (value1 != value2)) {
                return (multiSortMeta[index].order * value1.localeCompare(value2));
            }
        }
        else {
            result = (value1 < value2) ? -1 : 1;
        }
        if (value1 == value2) {
            return (multiSortMeta.length - 1) > (index) ? (this.multisortField(data1, data2, multiSortMeta, index + 1)) : 0;
        }
        return (multiSortMeta[index].order * result);
    };
    Table.prototype.getSortMeta = function (field) {
        if (this.multiSortMeta && this.multiSortMeta.length) {
            for (var i = 0; i < this.multiSortMeta.length; i++) {
                if (this.multiSortMeta[i].field === field) {
                    return this.multiSortMeta[i];
                }
            }
        }
        return null;
    };
    Table.prototype.isSorted = function (field) {
        if (this.sortMode === 'single') {
            return (this.sortField && this.sortField === field);
        }
        else if (this.sortMode === 'multiple') {
            var sorted = false;
            if (this.multiSortMeta) {
                for (var i = 0; i < this.multiSortMeta.length; i++) {
                    if (this.multiSortMeta[i].field == field) {
                        sorted = true;
                        break;
                    }
                }
            }
            return sorted;
        }
    };
    Table.prototype.handleRowClick = function (event) {
        var target = event.originalEvent.target;
        var targetNode = target.nodeName;
        var parentNode = target.parentElement && target.parentElement.nodeName;
        if (targetNode == 'INPUT' || targetNode == 'BUTTON' || targetNode == 'A' ||
            parentNode == 'INPUT' || parentNode == 'BUTTON' || parentNode == 'A' ||
            (DomHandler.hasClass(event.originalEvent.target, 'ui-clickable'))) {
            return;
        }
        if (this.selectionMode) {
            this.preventSelectionSetterPropagation = true;
            if (this.isMultipleSelectionMode() && event.originalEvent.shiftKey && this.anchorRowIndex != null) {
                DomHandler.clearSelection();
                if (this.rangeRowIndex != null) {
                    this.clearSelectionRange(event.originalEvent);
                }
                this.rangeRowIndex = event.rowIndex;
                this.selectRange(event.originalEvent, event.rowIndex);
            }
            else {
                var rowData = event.rowData;
                var selected = this.isSelected(rowData);
                var metaSelection = this.rowTouched ? false : this.metaKeySelection;
                var dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rowData, this.dataKey)) : null;
                this.anchorRowIndex = event.rowIndex;
                this.rangeRowIndex = event.rowIndex;
                if (metaSelection) {
                    var metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;
                    if (selected && metaKey) {
                        if (this.isSingleSelectionMode()) {
                            this._selection = null;
                            this.selectionKeys = {};
                            this.selectionChange.emit(null);
                        }
                        else {
                            var selectionIndex_1 = this.findIndexInSelection(rowData);
                            this._selection = this.selection.filter(function (val, i) { return i != selectionIndex_1; });
                            this.selectionChange.emit(this.selection);
                            if (dataKeyValue) {
                                delete this.selectionKeys[dataKeyValue];
                            }
                        }
                        this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                    }
                    else {
                        if (this.isSingleSelectionMode()) {
                            this._selection = rowData;
                            this.selectionChange.emit(rowData);
                            if (dataKeyValue) {
                                this.selectionKeys = {};
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                        else if (this.isMultipleSelectionMode()) {
                            if (metaKey) {
                                this._selection = this.selection || [];
                            }
                            else {
                                this._selection = [];
                                this.selectionKeys = {};
                            }
                            this._selection = __spread(this.selection, [rowData]);
                            this.selectionChange.emit(this.selection);
                            if (dataKeyValue) {
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                        this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex });
                    }
                }
                else {
                    if (this.selectionMode === 'single') {
                        if (selected) {
                            this._selection = null;
                            this.selectionKeys = {};
                            this.selectionChange.emit(this.selection);
                            this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                        }
                        else {
                            this._selection = rowData;
                            this.selectionChange.emit(this.selection);
                            this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex });
                            if (dataKeyValue) {
                                this.selectionKeys = {};
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                    }
                    else if (this.selectionMode === 'multiple') {
                        if (selected) {
                            var selectionIndex_2 = this.findIndexInSelection(rowData);
                            this._selection = this.selection.filter(function (val, i) { return i != selectionIndex_2; });
                            this.selectionChange.emit(this.selection);
                            this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                            if (dataKeyValue) {
                                delete this.selectionKeys[dataKeyValue];
                            }
                        }
                        else {
                            this._selection = this.selection ? __spread(this.selection, [rowData]) : [rowData];
                            this.selectionChange.emit(this.selection);
                            this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex });
                            if (dataKeyValue) {
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                    }
                }
            }
            this.tableService.onSelectionChange();
            if (this.isStateful()) {
                this.saveState();
            }
        }
        this.rowTouched = false;
    };
    Table.prototype.handleRowTouchEnd = function (event) {
        this.rowTouched = true;
    };
    Table.prototype.handleRowRightClick = function (event) {
        if (this.contextMenu) {
            var rowData = event.rowData;
            if (this.contextMenuSelectionMode === 'separate') {
                this.contextMenuSelection = rowData;
                this.contextMenuSelectionChange.emit(rowData);
                this.onContextMenuSelect.emit({ originalEvent: event.originalEvent, data: rowData, index: event.rowIndex });
                this.contextMenu.show(event.originalEvent);
                this.tableService.onContextMenu(rowData);
            }
            else if (this.contextMenuSelectionMode === 'joint') {
                this.preventSelectionSetterPropagation = true;
                var selected = this.isSelected(rowData);
                var dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rowData, this.dataKey)) : null;
                if (!selected) {
                    if (this.isSingleSelectionMode()) {
                        this.selection = rowData;
                        this.selectionChange.emit(rowData);
                    }
                    else if (this.isMultipleSelectionMode()) {
                        this.selection = [rowData];
                        this.selectionChange.emit(this.selection);
                    }
                    if (dataKeyValue) {
                        this.selectionKeys[dataKeyValue] = 1;
                    }
                }
                this.contextMenu.show(event.originalEvent);
                this.onContextMenuSelect.emit({ originalEvent: event, data: rowData, index: event.rowIndex });
            }
        }
    };
    Table.prototype.selectRange = function (event, rowIndex) {
        var rangeStart, rangeEnd;
        if (this.anchorRowIndex > rowIndex) {
            rangeStart = rowIndex;
            rangeEnd = this.anchorRowIndex;
        }
        else if (this.anchorRowIndex < rowIndex) {
            rangeStart = this.anchorRowIndex;
            rangeEnd = rowIndex;
        }
        else {
            rangeStart = rowIndex;
            rangeEnd = rowIndex;
        }
        if (this.lazy && this.paginator) {
            rangeStart -= this.first;
            rangeEnd -= this.first;
        }
        for (var i = rangeStart; i <= rangeEnd; i++) {
            var rangeRowData = this.filteredValue ? this.filteredValue[i] : this.value[i];
            if (!this.isSelected(rangeRowData)) {
                this._selection = __spread(this.selection, [rangeRowData]);
                var dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rangeRowData, this.dataKey)) : null;
                if (dataKeyValue) {
                    this.selectionKeys[dataKeyValue] = 1;
                }
                this.onRowSelect.emit({ originalEvent: event, data: rangeRowData, type: 'row' });
            }
        }
        this.selectionChange.emit(this.selection);
    };
    Table.prototype.clearSelectionRange = function (event) {
        var rangeStart, rangeEnd;
        if (this.rangeRowIndex > this.anchorRowIndex) {
            rangeStart = this.anchorRowIndex;
            rangeEnd = this.rangeRowIndex;
        }
        else if (this.rangeRowIndex < this.anchorRowIndex) {
            rangeStart = this.rangeRowIndex;
            rangeEnd = this.anchorRowIndex;
        }
        else {
            rangeStart = this.rangeRowIndex;
            rangeEnd = this.rangeRowIndex;
        }
        var _loop_1 = function (i) {
            var rangeRowData = this_1.value[i];
            var selectionIndex = this_1.findIndexInSelection(rangeRowData);
            this_1._selection = this_1.selection.filter(function (val, i) { return i != selectionIndex; });
            var dataKeyValue = this_1.dataKey ? String(ObjectUtils.resolveFieldData(rangeRowData, this_1.dataKey)) : null;
            if (dataKeyValue) {
                delete this_1.selectionKeys[dataKeyValue];
            }
            this_1.onRowUnselect.emit({ originalEvent: event, data: rangeRowData, type: 'row' });
        };
        var this_1 = this;
        for (var i = rangeStart; i <= rangeEnd; i++) {
            _loop_1(i);
        }
    };
    Table.prototype.isSelected = function (rowData) {
        if (rowData && this.selection) {
            if (this.dataKey) {
                return this.selectionKeys[ObjectUtils.resolveFieldData(rowData, this.dataKey)] !== undefined;
            }
            else {
                if (this.selection instanceof Array)
                    return this.findIndexInSelection(rowData) > -1;
                else
                    return this.equals(rowData, this.selection);
            }
        }
        return false;
    };
    Table.prototype.findIndexInSelection = function (rowData) {
        var index = -1;
        if (this.selection && this.selection.length) {
            for (var i = 0; i < this.selection.length; i++) {
                if (this.equals(rowData, this.selection[i])) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    Table.prototype.toggleRowWithRadio = function (event, rowData) {
        this.preventSelectionSetterPropagation = true;
        if (this.selection != rowData) {
            this._selection = rowData;
            this.selectionChange.emit(this.selection);
            this.onRowSelect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'radiobutton' });
            if (this.dataKey) {
                this.selectionKeys = {};
                this.selectionKeys[String(ObjectUtils.resolveFieldData(rowData, this.dataKey))] = 1;
            }
        }
        else {
            this._selection = null;
            this.selectionChange.emit(this.selection);
            this.onRowUnselect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'radiobutton' });
        }
        this.tableService.onSelectionChange();
        if (this.isStateful()) {
            this.saveState();
        }
    };
    Table.prototype.toggleRowWithCheckbox = function (event, rowData) {
        this.selection = this.selection || [];
        var selected = this.isSelected(rowData);
        var dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rowData, this.dataKey)) : null;
        this.preventSelectionSetterPropagation = true;
        if (selected) {
            var selectionIndex_3 = this.findIndexInSelection(rowData);
            this._selection = this.selection.filter(function (val, i) { return i != selectionIndex_3; });
            this.selectionChange.emit(this.selection);
            this.onRowUnselect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'checkbox' });
            if (dataKeyValue) {
                delete this.selectionKeys[dataKeyValue];
            }
        }
        else {
            this._selection = this.selection ? __spread(this.selection, [rowData]) : [rowData];
            this.selectionChange.emit(this.selection);
            this.onRowSelect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'checkbox' });
            if (dataKeyValue) {
                this.selectionKeys[dataKeyValue] = 1;
            }
        }
        this.tableService.onSelectionChange();
        if (this.isStateful()) {
            this.saveState();
        }
    };
    Table.prototype.toggleRowsWithCheckbox = function (event, check) {
        this._selection = check ? this.filteredValue ? this.filteredValue.slice() : this.value.slice() : [];
        this.preventSelectionSetterPropagation = true;
        this.updateSelectionKeys();
        this.selectionChange.emit(this._selection);
        this.tableService.onSelectionChange();
        this.onHeaderCheckboxToggle.emit({ originalEvent: event, checked: check });
        if (this.isStateful()) {
            this.saveState();
        }
    };
    Table.prototype.equals = function (data1, data2) {
        return this.compareSelectionBy === 'equals' ? (data1 === data2) : ObjectUtils.equals(data1, data2, this.dataKey);
    };
    Table.prototype.filter = function (value, field, matchMode) {
        var _this = this;
        if (this.filterTimeout) {
            clearTimeout(this.filterTimeout);
        }
        if (!this.isFilterBlank(value)) {
            this.filters[field] = { value: value, matchMode: matchMode };
        }
        else if (this.filters[field]) {
            delete this.filters[field];
        }
        this.filterTimeout = setTimeout(function () {
            _this._filter();
            _this.filterTimeout = null;
        }, this.filterDelay);
        this.anchorRowIndex = null;
    };
    Table.prototype.filterGlobal = function (value, matchMode) {
        this.filter(value, 'global', matchMode);
    };
    Table.prototype.isFilterBlank = function (filter) {
        if (filter !== null && filter !== undefined) {
            if ((typeof filter === 'string' && filter.trim().length == 0) || (filter instanceof Array && filter.length == 0))
                return true;
            else
                return false;
        }
        return true;
    };
    Table.prototype._filter = function () {
        if (!this.restoringFilter) {
            this.first = 0;
            this.firstChange.emit(this.first);
        }
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            if (!this.value) {
                return;
            }
            if (!this.hasFilter()) {
                this.filteredValue = null;
                if (this.paginator) {
                    this.totalRecords = this.value ? this.value.length : 0;
                }
            }
            else {
                var globalFilterFieldsArray = void 0;
                if (this.filters['global']) {
                    if (!this.columns && !this.globalFilterFields)
                        throw new Error('Global filtering requires dynamic columns or globalFilterFields to be defined.');
                    else
                        globalFilterFieldsArray = this.globalFilterFields || this.columns;
                }
                this.filteredValue = [];
                for (var i = 0; i < this.value.length; i++) {
                    var localMatch = true;
                    var globalMatch = false;
                    var localFiltered = false;
                    for (var prop in this.filters) {
                        if (this.filters.hasOwnProperty(prop) && prop !== 'global') {
                            localFiltered = true;
                            var filterMeta = this.filters[prop];
                            var filterField = prop;
                            var filterValue = filterMeta.value;
                            var filterMatchMode = filterMeta.matchMode || 'startsWith';
                            var dataFieldValue = ObjectUtils.resolveFieldData(this.value[i], filterField);
                            var filterConstraint = FilterUtils[filterMatchMode];
                            if (!filterConstraint(dataFieldValue, filterValue, this.filterLocale)) {
                                localMatch = false;
                            }
                            if (!localMatch) {
                                break;
                            }
                        }
                    }
                    if (this.filters['global'] && !globalMatch && globalFilterFieldsArray) {
                        for (var j = 0; j < globalFilterFieldsArray.length; j++) {
                            var globalFilterField = globalFilterFieldsArray[j].field || globalFilterFieldsArray[j];
                            globalMatch = FilterUtils[this.filters['global'].matchMode](ObjectUtils.resolveFieldData(this.value[i], globalFilterField), this.filters['global'].value, this.filterLocale);
                            if (globalMatch) {
                                break;
                            }
                        }
                    }
                    var matches = void 0;
                    if (this.filters['global']) {
                        matches = localFiltered ? (localFiltered && localMatch && globalMatch) : globalMatch;
                    }
                    else {
                        matches = localFiltered && localMatch;
                    }
                    if (matches) {
                        this.filteredValue.push(this.value[i]);
                    }
                }
                if (this.filteredValue.length === this.value.length) {
                    this.filteredValue = null;
                }
                if (this.paginator) {
                    this.totalRecords = this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0;
                }
            }
        }
        this.onFilter.emit({
            filters: this.filters,
            filteredValue: this.filteredValue || this.value
        });
        this.tableService.onValueChange(this.value);
        if (this.isStateful() && !this.restoringFilter) {
            this.saveState();
        }
        if (this.restoringFilter) {
            this.restoringFilter = false;
        }
        this.cd.markForCheck();
    };
    Table.prototype.hasFilter = function () {
        var empty = true;
        for (var prop in this.filters) {
            if (this.filters.hasOwnProperty(prop)) {
                empty = false;
                break;
            }
        }
        return !empty;
    };
    Table.prototype.createLazyLoadMetadata = function () {
        return {
            first: this.first,
            rows: this.virtualScroll ? this.rows * 2 : this.rows,
            sortField: this.sortField,
            sortOrder: this.sortOrder,
            filters: this.filters,
            globalFilter: this.filters && this.filters['global'] ? this.filters['global'].value : null,
            multiSortMeta: this.multiSortMeta
        };
    };
    Table.prototype.reset = function () {
        this._sortField = null;
        this._sortOrder = this.defaultSortOrder;
        this._multiSortMeta = null;
        this.tableService.onSort(null);
        this.filteredValue = null;
        this.filters = {};
        this.first = 0;
        this.firstChange.emit(this.first);
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            this.totalRecords = (this._value ? this._value.length : 0);
        }
    };
    Table.prototype.exportCSV = function (options) {
        var _this = this;
        var data = this.filteredValue || this.value;
        var csv = '';
        if (options && options.selectionOnly) {
            data = this.selection || [];
        }
        //headers
        for (var i = 0; i < this.columns.length; i++) {
            var column = this.columns[i];
            if (column.exportable !== false && column.field) {
                csv += '"' + (column.header || column.field) + '"';
                if (i < (this.columns.length - 1)) {
                    csv += this.csvSeparator;
                }
            }
        }
        //body
        data.forEach(function (record, i) {
            csv += '\n';
            for (var i_1 = 0; i_1 < _this.columns.length; i_1++) {
                var column = _this.columns[i_1];
                if (column.exportable !== false && column.field) {
                    var cellData = ObjectUtils.resolveFieldData(record, column.field);
                    if (cellData != null) {
                        if (_this.exportFunction) {
                            cellData = _this.exportFunction({
                                data: cellData,
                                field: column.field
                            });
                        }
                        else
                            cellData = String(cellData).replace(/"/g, '""');
                    }
                    else
                        cellData = '';
                    csv += '"' + cellData + '"';
                    if (i_1 < (_this.columns.length - 1)) {
                        csv += _this.csvSeparator;
                    }
                }
            }
        });
        var blob = new Blob([csv], {
            type: 'text/csv;charset=utf-8;'
        });
        if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, this.exportFilename + '.csv');
        }
        else {
            var link = document.createElement("a");
            link.style.display = 'none';
            document.body.appendChild(link);
            if (link.download !== undefined) {
                link.setAttribute('href', URL.createObjectURL(blob));
                link.setAttribute('download', this.exportFilename + '.csv');
                link.click();
            }
            else {
                csv = 'data:text/csv;charset=utf-8,' + csv;
                window.open(encodeURI(csv));
            }
            document.body.removeChild(link);
        }
    };
    Table.prototype.updateEditingCell = function (cell, data, field, index) {
        this.editingCell = cell;
        this.editingCellData = data;
        this.editingCellField = field;
        this.editingCellRowIndex = index;
        this.bindDocumentEditListener();
    };
    Table.prototype.isEditingCellValid = function () {
        return (this.editingCell && DomHandler.find(this.editingCell, '.ng-invalid.ng-dirty').length === 0);
    };
    Table.prototype.bindDocumentEditListener = function () {
        var _this = this;
        if (!this.documentEditListener) {
            this.documentEditListener = function (event) {
                if (_this.editingCell && !_this.editingCellClick && _this.isEditingCellValid()) {
                    DomHandler.removeClass(_this.editingCell, 'ui-editing-cell');
                    _this.editingCell = null;
                    _this.onEditComplete.emit({ field: _this.editingCellField, data: _this.editingCellData, originalEvent: event, index: _this.editingCellRowIndex });
                    _this.editingCellField = null;
                    _this.editingCellData = null;
                    _this.editingCellRowIndex = null;
                    _this.unbindDocumentEditListener();
                }
                _this.editingCellClick = false;
            };
            document.addEventListener('click', this.documentEditListener);
        }
    };
    Table.prototype.unbindDocumentEditListener = function () {
        if (this.documentEditListener) {
            document.removeEventListener('click', this.documentEditListener);
            this.documentEditListener = null;
        }
    };
    Table.prototype.initRowEdit = function (rowData) {
        var dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey));
        this.editingRowKeys[dataKeyValue] = true;
    };
    Table.prototype.saveRowEdit = function (rowData, rowElement) {
        if (DomHandler.find(rowElement, '.ng-invalid.ng-dirty').length === 0) {
            var dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey));
            delete this.editingRowKeys[dataKeyValue];
        }
    };
    Table.prototype.cancelRowEdit = function (rowData) {
        var dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey));
        delete this.editingRowKeys[dataKeyValue];
    };
    Table.prototype.toggleRow = function (rowData, event) {
        if (!this.dataKey) {
            throw new Error('dataKey must be defined to use row expansion');
        }
        var dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey));
        if (this.expandedRowKeys[dataKeyValue] != null) {
            delete this.expandedRowKeys[dataKeyValue];
            this.onRowCollapse.emit({
                originalEvent: event,
                data: rowData
            });
        }
        else {
            if (this.rowExpandMode === 'single') {
                this.expandedRowKeys = {};
            }
            this.expandedRowKeys[dataKeyValue] = true;
            this.onRowExpand.emit({
                originalEvent: event,
                data: rowData
            });
        }
        if (event) {
            event.preventDefault();
        }
        if (this.isStateful()) {
            this.saveState();
        }
    };
    Table.prototype.isRowExpanded = function (rowData) {
        return this.expandedRowKeys[String(ObjectUtils.resolveFieldData(rowData, this.dataKey))] === true;
    };
    Table.prototype.isRowEditing = function (rowData) {
        return this.editingRowKeys[String(ObjectUtils.resolveFieldData(rowData, this.dataKey))] === true;
    };
    Table.prototype.isSingleSelectionMode = function () {
        return this.selectionMode === 'single';
    };
    Table.prototype.isMultipleSelectionMode = function () {
        return this.selectionMode === 'multiple';
    };
    Table.prototype.onColumnResizeBegin = function (event) {
        var containerLeft = DomHandler.getOffset(this.containerViewChild.nativeElement).left;
        this.lastResizerHelperX = (event.pageX - containerLeft + this.containerViewChild.nativeElement.scrollLeft);
        this.onColumnResize(event);
        event.preventDefault();
    };
    Table.prototype.onColumnResize = function (event) {
        var containerLeft = DomHandler.getOffset(this.containerViewChild.nativeElement).left;
        DomHandler.addClass(this.containerViewChild.nativeElement, 'ui-unselectable-text');
        this.resizeHelperViewChild.nativeElement.style.height = this.containerViewChild.nativeElement.offsetHeight + 'px';
        this.resizeHelperViewChild.nativeElement.style.top = 0 + 'px';
        this.resizeHelperViewChild.nativeElement.style.left = (event.pageX - containerLeft + this.containerViewChild.nativeElement.scrollLeft) + 'px';
        this.resizeHelperViewChild.nativeElement.style.display = 'block';
    };
    Table.prototype.onColumnResizeEnd = function (event, column) {
        var delta = this.resizeHelperViewChild.nativeElement.offsetLeft - this.lastResizerHelperX;
        var columnWidth = column.offsetWidth;
        var minWidth = parseInt(column.style.minWidth || 15);
        if (columnWidth + delta < minWidth) {
            delta = minWidth - columnWidth;
        }
        var newColumnWidth = columnWidth + delta;
        if (newColumnWidth >= minWidth) {
            if (this.columnResizeMode === 'fit') {
                var nextColumn = column.nextElementSibling;
                while (!nextColumn.offsetParent) {
                    nextColumn = nextColumn.nextElementSibling;
                }
                if (nextColumn) {
                    var nextColumnWidth = nextColumn.offsetWidth - delta;
                    var nextColumnMinWidth = nextColumn.style.minWidth || 15;
                    if (newColumnWidth > 15 && nextColumnWidth > parseInt(nextColumnMinWidth)) {
                        if (this.scrollable) {
                            var scrollableView = this.findParentScrollableView(column);
                            var scrollableBodyTable = DomHandler.findSingle(scrollableView, 'table.ui-table-scrollable-body-table');
                            var scrollableHeaderTable = DomHandler.findSingle(scrollableView, 'table.ui-table-scrollable-header-table');
                            var scrollableFooterTable = DomHandler.findSingle(scrollableView, 'table.ui-table-scrollable-footer-table');
                            var resizeColumnIndex = DomHandler.index(column);
                            this.resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                            this.resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                            this.resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                        }
                        else {
                            column.style.width = newColumnWidth + 'px';
                            if (nextColumn) {
                                nextColumn.style.width = nextColumnWidth + 'px';
                            }
                        }
                    }
                }
            }
            else if (this.columnResizeMode === 'expand') {
                if (newColumnWidth > minWidth) {
                    if (this.scrollable) {
                        this.setScrollableItemsWidthOnExpandResize(column, newColumnWidth, delta);
                    }
                    else {
                        this.tableViewChild.nativeElement.style.width = this.tableViewChild.nativeElement.offsetWidth + delta + 'px';
                        column.style.width = newColumnWidth + 'px';
                        var containerWidth = this.tableViewChild.nativeElement.style.width;
                        this.containerViewChild.nativeElement.style.width = containerWidth + 'px';
                    }
                }
            }
            this.onColResize.emit({
                element: column,
                delta: delta
            });
            if (this.isStateful()) {
                this.saveState();
            }
        }
        this.resizeHelperViewChild.nativeElement.style.display = 'none';
        DomHandler.removeClass(this.containerViewChild.nativeElement, 'ui-unselectable-text');
    };
    Table.prototype.setScrollableItemsWidthOnExpandResize = function (column, newColumnWidth, delta) {
        var scrollableView = column ? this.findParentScrollableView(column) : this.containerViewChild.nativeElement;
        var scrollableBody = DomHandler.findSingle(scrollableView, '.ui-table-scrollable-body');
        var scrollableHeader = DomHandler.findSingle(scrollableView, '.ui-table-scrollable-header');
        var scrollableFooter = DomHandler.findSingle(scrollableView, '.ui-table-scrollable-footer');
        var scrollableBodyTable = DomHandler.findSingle(scrollableBody, 'table.ui-table-scrollable-body-table');
        var scrollableHeaderTable = DomHandler.findSingle(scrollableHeader, 'table.ui-table-scrollable-header-table');
        var scrollableFooterTable = DomHandler.findSingle(scrollableFooter, 'table.ui-table-scrollable-footer-table');
        var scrollableBodyTableWidth = column ? scrollableBodyTable.offsetWidth + delta : newColumnWidth;
        var scrollableHeaderTableWidth = column ? scrollableHeaderTable.offsetWidth + delta : newColumnWidth;
        var isContainerInViewport = this.containerViewChild.nativeElement.offsetWidth >= scrollableBodyTableWidth;
        var setWidth = function (container, table, width, isContainerInViewport) {
            if (container && table) {
                container.style.width = isContainerInViewport ? width + DomHandler.calculateScrollbarWidth(scrollableBody) + 'px' : 'auto';
                table.style.width = width + 'px';
            }
        };
        setWidth(scrollableBody, scrollableBodyTable, scrollableBodyTableWidth, isContainerInViewport);
        setWidth(scrollableHeader, scrollableHeaderTable, scrollableHeaderTableWidth, isContainerInViewport);
        setWidth(scrollableFooter, scrollableFooterTable, scrollableHeaderTableWidth, isContainerInViewport);
        if (column) {
            var resizeColumnIndex = DomHandler.index(column);
            this.resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, null);
            this.resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, null);
            this.resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, null);
        }
    };
    Table.prototype.findParentScrollableView = function (column) {
        if (column) {
            var parent_1 = column.parentElement;
            while (parent_1 && !DomHandler.hasClass(parent_1, 'ui-table-scrollable-view')) {
                parent_1 = parent_1.parentElement;
            }
            return parent_1;
        }
        else {
            return null;
        }
    };
    Table.prototype.resizeColGroup = function (table, resizeColumnIndex, newColumnWidth, nextColumnWidth) {
        if (table) {
            var colGroup = table.children[0].nodeName === 'COLGROUP' ? table.children[0] : null;
            if (colGroup) {
                var col = colGroup.children[resizeColumnIndex];
                var nextCol = col.nextElementSibling;
                col.style.width = newColumnWidth + 'px';
                if (nextCol && nextColumnWidth) {
                    nextCol.style.width = nextColumnWidth + 'px';
                }
            }
            else {
                throw "Scrollable tables require a colgroup to support resizable columns";
            }
        }
    };
    Table.prototype.onColumnDragStart = function (event, columnElement) {
        this.reorderIconWidth = DomHandler.getHiddenElementOuterWidth(this.reorderIndicatorUpViewChild.nativeElement);
        this.reorderIconHeight = DomHandler.getHiddenElementOuterHeight(this.reorderIndicatorDownViewChild.nativeElement);
        this.draggedColumn = columnElement;
        event.dataTransfer.setData('text', 'b'); // For firefox
    };
    Table.prototype.onColumnDragEnter = function (event, dropHeader) {
        if (this.reorderableColumns && this.draggedColumn && dropHeader) {
            event.preventDefault();
            var containerOffset = DomHandler.getOffset(this.containerViewChild.nativeElement);
            var dropHeaderOffset = DomHandler.getOffset(dropHeader);
            if (this.draggedColumn != dropHeader) {
                var dragIndex = DomHandler.indexWithinGroup(this.draggedColumn, 'preorderablecolumn');
                var dropIndex = DomHandler.indexWithinGroup(dropHeader, 'preorderablecolumn');
                var targetLeft = dropHeaderOffset.left - containerOffset.left;
                var targetTop = containerOffset.top - dropHeaderOffset.top;
                var columnCenter = dropHeaderOffset.left + dropHeader.offsetWidth / 2;
                this.reorderIndicatorUpViewChild.nativeElement.style.top = dropHeaderOffset.top - containerOffset.top - (this.reorderIconHeight - 1) + 'px';
                this.reorderIndicatorDownViewChild.nativeElement.style.top = dropHeaderOffset.top - containerOffset.top + dropHeader.offsetHeight + 'px';
                if (event.pageX > columnCenter) {
                    this.reorderIndicatorUpViewChild.nativeElement.style.left = (targetLeft + dropHeader.offsetWidth - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.reorderIndicatorDownViewChild.nativeElement.style.left = (targetLeft + dropHeader.offsetWidth - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.dropPosition = 1;
                }
                else {
                    this.reorderIndicatorUpViewChild.nativeElement.style.left = (targetLeft - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.reorderIndicatorDownViewChild.nativeElement.style.left = (targetLeft - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.dropPosition = -1;
                }
                if ((dropIndex - dragIndex === 1 && this.dropPosition === -1) || (dropIndex - dragIndex === -1 && this.dropPosition === 1)) {
                    this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
                    this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
                }
                else {
                    this.reorderIndicatorUpViewChild.nativeElement.style.display = 'block';
                    this.reorderIndicatorDownViewChild.nativeElement.style.display = 'block';
                }
            }
            else {
                event.dataTransfer.dropEffect = 'none';
            }
        }
    };
    Table.prototype.onColumnDragLeave = function (event) {
        if (this.reorderableColumns && this.draggedColumn) {
            event.preventDefault();
            this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
            this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
        }
    };
    Table.prototype.onColumnDrop = function (event, dropColumn) {
        var _this = this;
        event.preventDefault();
        if (this.draggedColumn) {
            var dragIndex = DomHandler.indexWithinGroup(this.draggedColumn, 'preorderablecolumn');
            var dropIndex = DomHandler.indexWithinGroup(dropColumn, 'preorderablecolumn');
            var allowDrop = (dragIndex != dropIndex);
            if (allowDrop && ((dropIndex - dragIndex == 1 && this.dropPosition === -1) || (dragIndex - dropIndex == 1 && this.dropPosition === 1))) {
                allowDrop = false;
            }
            if (allowDrop && ((dropIndex < dragIndex && this.dropPosition === 1))) {
                dropIndex = dropIndex + 1;
            }
            if (allowDrop && ((dropIndex > dragIndex && this.dropPosition === -1))) {
                dropIndex = dropIndex - 1;
            }
            if (allowDrop) {
                ObjectUtils.reorderArray(this.columns, dragIndex, dropIndex);
                this.onColReorder.emit({
                    dragIndex: dragIndex,
                    dropIndex: dropIndex,
                    columns: this.columns
                });
                if (this.isStateful()) {
                    this.zone.runOutsideAngular(function () {
                        setTimeout(function () {
                            _this.saveState();
                        });
                    });
                }
            }
            this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
            this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
            this.draggedColumn.draggable = false;
            this.draggedColumn = null;
            this.dropPosition = null;
        }
    };
    Table.prototype.onRowDragStart = function (event, index) {
        this.rowDragging = true;
        this.draggedRowIndex = index;
        event.dataTransfer.setData('text', 'b'); // For firefox
    };
    Table.prototype.onRowDragOver = function (event, index, rowElement) {
        if (this.rowDragging && this.draggedRowIndex !== index) {
            var rowY = DomHandler.getOffset(rowElement).top + DomHandler.getWindowScrollTop();
            var pageY = event.pageY;
            var rowMidY = rowY + DomHandler.getOuterHeight(rowElement) / 2;
            var prevRowElement = rowElement.previousElementSibling;
            if (pageY < rowMidY) {
                DomHandler.removeClass(rowElement, 'ui-table-dragpoint-bottom');
                this.droppedRowIndex = index;
                if (prevRowElement)
                    DomHandler.addClass(prevRowElement, 'ui-table-dragpoint-bottom');
                else
                    DomHandler.addClass(rowElement, 'ui-table-dragpoint-top');
            }
            else {
                if (prevRowElement)
                    DomHandler.removeClass(prevRowElement, 'ui-table-dragpoint-bottom');
                else
                    DomHandler.addClass(rowElement, 'ui-table-dragpoint-top');
                this.droppedRowIndex = index + 1;
                DomHandler.addClass(rowElement, 'ui-table-dragpoint-bottom');
            }
        }
    };
    Table.prototype.onRowDragLeave = function (event, rowElement) {
        var prevRowElement = rowElement.previousElementSibling;
        if (prevRowElement) {
            DomHandler.removeClass(prevRowElement, 'ui-table-dragpoint-bottom');
        }
        DomHandler.removeClass(rowElement, 'ui-table-dragpoint-bottom');
        DomHandler.removeClass(rowElement, 'ui-table-dragpoint-top');
    };
    Table.prototype.onRowDragEnd = function (event) {
        this.rowDragging = false;
        this.draggedRowIndex = null;
        this.droppedRowIndex = null;
    };
    Table.prototype.onRowDrop = function (event, rowElement) {
        if (this.droppedRowIndex != null) {
            var dropIndex = (this.draggedRowIndex > this.droppedRowIndex) ? this.droppedRowIndex : (this.droppedRowIndex === 0) ? 0 : this.droppedRowIndex - 1;
            ObjectUtils.reorderArray(this.value, this.draggedRowIndex, dropIndex);
            this.onRowReorder.emit({
                dragIndex: this.draggedRowIndex,
                dropIndex: dropIndex
            });
        }
        //cleanup
        this.onRowDragLeave(event, rowElement);
        this.onRowDragEnd(event);
    };
    Table.prototype.handleVirtualScroll = function (event) {
        var _this = this;
        this.first = (event.page - 1) * this.rows;
        this.firstChange.emit(this.first);
        this.virtualScrollCallback = event.callback;
        this.zone.run(function () {
            if (_this.virtualScrollTimer) {
                clearTimeout(_this.virtualScrollTimer);
            }
            _this.virtualScrollTimer = setTimeout(function () {
                _this.onLazyLoad.emit(_this.createLazyLoadMetadata());
            }, _this.virtualScrollDelay);
        });
    };
    Table.prototype.isEmpty = function () {
        var data = this.filteredValue || this.value;
        return data == null || data.length == 0;
    };
    Table.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    Table.prototype.getStorage = function () {
        switch (this.stateStorage) {
            case 'local':
                return window.localStorage;
            case 'session':
                return window.sessionStorage;
            default:
                throw new Error(this.stateStorage + ' is not a valid value for the state storage, supported values are "local" and "session".');
        }
    };
    Table.prototype.isStateful = function () {
        return this.stateKey != null;
    };
    Table.prototype.saveState = function () {
        var storage = this.getStorage();
        var state = {};
        if (this.paginator) {
            state.first = this.first;
            state.rows = this.rows;
        }
        if (this.sortField) {
            state.sortField = this.sortField;
            state.sortOrder = this.sortOrder;
        }
        if (this.multiSortMeta) {
            state.multiSortMeta = this.multiSortMeta;
        }
        if (this.hasFilter()) {
            state.filters = this.filters;
        }
        if (this.resizableColumns) {
            this.saveColumnWidths(state);
        }
        if (this.reorderableColumns) {
            this.saveColumnOrder(state);
        }
        if (this.selection) {
            state.selection = this.selection;
        }
        if (Object.keys(this.expandedRowKeys).length) {
            state.expandedRowKeys = this.expandedRowKeys;
        }
        if (Object.keys(state).length) {
            storage.setItem(this.stateKey, JSON.stringify(state));
        }
        this.onStateSave.emit(state);
    };
    Table.prototype.clearState = function () {
        var storage = this.getStorage();
        if (this.stateKey) {
            storage.removeItem(this.stateKey);
        }
    };
    Table.prototype.restoreState = function () {
        var _this = this;
        var storage = this.getStorage();
        var stateString = storage.getItem(this.stateKey);
        if (stateString) {
            var state_1 = JSON.parse(stateString);
            if (this.paginator) {
                this.first = state_1.first;
                this.rows = state_1.rows;
                this.firstChange.emit(this.first);
                this.rowsChange.emit(this.rows);
            }
            if (state_1.sortField) {
                this.restoringSort = true;
                this._sortField = state_1.sortField;
                this._sortOrder = state_1.sortOrder;
            }
            if (state_1.multiSortMeta) {
                this.restoringSort = true;
                this._multiSortMeta = state_1.multiSortMeta;
            }
            if (state_1.filters) {
                this.restoringFilter = true;
                this.filters = state_1.filters;
            }
            if (this.resizableColumns) {
                this.columnWidthsState = state_1.columnWidths;
                this.tableWidthState = state_1.tableWidth;
            }
            if (state_1.expandedRowKeys) {
                this.expandedRowKeys = state_1.expandedRowKeys;
            }
            if (state_1.selection) {
                Promise.resolve(null).then(function () { return _this.selectionChange.emit(state_1.selection); });
            }
            this.stateRestored = true;
            this.onStateRestore.emit(state_1);
        }
    };
    Table.prototype.saveColumnWidths = function (state) {
        var widths = [];
        var headers = DomHandler.find(this.containerViewChild.nativeElement, '.ui-table-thead > tr:first-child > th');
        headers.map(function (header) { return widths.push(DomHandler.getOuterWidth(header)); });
        state.columnWidths = widths.join(',');
        if (this.columnResizeMode === 'expand') {
            state.tableWidth = this.scrollable ? DomHandler.findSingle(this.containerViewChild.nativeElement, '.ui-table-scrollable-header-table').style.width :
                DomHandler.getOuterWidth(this.tableViewChild.nativeElement) + 'px';
        }
    };
    Table.prototype.restoreColumnWidths = function () {
        if (this.columnWidthsState) {
            var widths_1 = this.columnWidthsState.split(',');
            if (this.columnResizeMode === 'expand' && this.tableWidthState) {
                if (this.scrollable) {
                    this.setScrollableItemsWidthOnExpandResize(null, this.tableWidthState, 0);
                }
                else {
                    this.tableViewChild.nativeElement.style.width = this.tableWidthState;
                    this.containerViewChild.nativeElement.style.width = this.tableWidthState;
                }
            }
            if (this.scrollable) {
                var headerCols = DomHandler.find(this.containerViewChild.nativeElement, '.ui-table-scrollable-header-table > colgroup > col');
                var bodyCols = DomHandler.find(this.containerViewChild.nativeElement, '.ui-table-scrollable-body-table > colgroup > col');
                headerCols.map(function (col, index) { return col.style.width = widths_1[index] + 'px'; });
                bodyCols.map(function (col, index) { return col.style.width = widths_1[index] + 'px'; });
            }
            else {
                var headers = DomHandler.find(this.tableViewChild.nativeElement, '.ui-table-thead > tr:first-child > th');
                headers.map(function (header, index) { return header.style.width = widths_1[index] + 'px'; });
            }
        }
    };
    Table.prototype.saveColumnOrder = function (state) {
        if (this.columns) {
            var columnOrder_1 = [];
            this.columns.map(function (column) {
                columnOrder_1.push(column.field || column.key);
            });
            state.columnOrder = columnOrder_1;
        }
    };
    Table.prototype.restoreColumnOrder = function () {
        var _this = this;
        var storage = this.getStorage();
        var stateString = storage.getItem(this.stateKey);
        if (stateString) {
            var state = JSON.parse(stateString);
            var columnOrder = state.columnOrder;
            if (columnOrder) {
                var reorderedColumns_1 = [];
                columnOrder.map(function (key) { return reorderedColumns_1.push(_this.findColumnByKey(key)); });
                this.columnOrderStateRestored = true;
                this.columns = reorderedColumns_1;
            }
        }
    };
    Table.prototype.findColumnByKey = function (key) {
        var e_2, _a;
        if (this.columns) {
            try {
                for (var _b = __values(this.columns), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var col = _c.value;
                    if (col.key === key || col.field === key)
                        return col;
                    else
                        continue;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        else {
            return null;
        }
    };
    Table.prototype.ngOnDestroy = function () {
        this.unbindDocumentEditListener();
        this.editingCell = null;
        this.initialized = null;
    };
    Table.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone },
        { type: TableService },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], Table.prototype, "frozenColumns", void 0);
    __decorate([
        Input()
    ], Table.prototype, "frozenValue", void 0);
    __decorate([
        Input()
    ], Table.prototype, "style", void 0);
    __decorate([
        Input()
    ], Table.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], Table.prototype, "tableStyle", void 0);
    __decorate([
        Input()
    ], Table.prototype, "tableStyleClass", void 0);
    __decorate([
        Input()
    ], Table.prototype, "paginator", void 0);
    __decorate([
        Input()
    ], Table.prototype, "pageLinks", void 0);
    __decorate([
        Input()
    ], Table.prototype, "rowsPerPageOptions", void 0);
    __decorate([
        Input()
    ], Table.prototype, "alwaysShowPaginator", void 0);
    __decorate([
        Input()
    ], Table.prototype, "paginatorPosition", void 0);
    __decorate([
        Input()
    ], Table.prototype, "paginatorDropdownAppendTo", void 0);
    __decorate([
        Input()
    ], Table.prototype, "paginatorDropdownScrollHeight", void 0);
    __decorate([
        Input()
    ], Table.prototype, "currentPageReportTemplate", void 0);
    __decorate([
        Input()
    ], Table.prototype, "showCurrentPageReport", void 0);
    __decorate([
        Input()
    ], Table.prototype, "defaultSortOrder", void 0);
    __decorate([
        Input()
    ], Table.prototype, "sortMode", void 0);
    __decorate([
        Input()
    ], Table.prototype, "resetPageOnSort", void 0);
    __decorate([
        Input()
    ], Table.prototype, "selectionMode", void 0);
    __decorate([
        Output()
    ], Table.prototype, "selectionChange", void 0);
    __decorate([
        Input()
    ], Table.prototype, "contextMenuSelection", void 0);
    __decorate([
        Output()
    ], Table.prototype, "contextMenuSelectionChange", void 0);
    __decorate([
        Input()
    ], Table.prototype, "contextMenuSelectionMode", void 0);
    __decorate([
        Input()
    ], Table.prototype, "dataKey", void 0);
    __decorate([
        Input()
    ], Table.prototype, "metaKeySelection", void 0);
    __decorate([
        Input()
    ], Table.prototype, "rowTrackBy", void 0);
    __decorate([
        Input()
    ], Table.prototype, "lazy", void 0);
    __decorate([
        Input()
    ], Table.prototype, "lazyLoadOnInit", void 0);
    __decorate([
        Input()
    ], Table.prototype, "compareSelectionBy", void 0);
    __decorate([
        Input()
    ], Table.prototype, "csvSeparator", void 0);
    __decorate([
        Input()
    ], Table.prototype, "exportFilename", void 0);
    __decorate([
        Input()
    ], Table.prototype, "filters", void 0);
    __decorate([
        Input()
    ], Table.prototype, "globalFilterFields", void 0);
    __decorate([
        Input()
    ], Table.prototype, "filterDelay", void 0);
    __decorate([
        Input()
    ], Table.prototype, "filterLocale", void 0);
    __decorate([
        Input()
    ], Table.prototype, "expandedRowKeys", void 0);
    __decorate([
        Input()
    ], Table.prototype, "editingRowKeys", void 0);
    __decorate([
        Input()
    ], Table.prototype, "rowExpandMode", void 0);
    __decorate([
        Input()
    ], Table.prototype, "scrollable", void 0);
    __decorate([
        Input()
    ], Table.prototype, "scrollHeight", void 0);
    __decorate([
        Input()
    ], Table.prototype, "virtualScroll", void 0);
    __decorate([
        Input()
    ], Table.prototype, "virtualScrollDelay", void 0);
    __decorate([
        Input()
    ], Table.prototype, "virtualRowHeight", void 0);
    __decorate([
        Input()
    ], Table.prototype, "frozenWidth", void 0);
    __decorate([
        Input()
    ], Table.prototype, "responsive", void 0);
    __decorate([
        Input()
    ], Table.prototype, "contextMenu", void 0);
    __decorate([
        Input()
    ], Table.prototype, "resizableColumns", void 0);
    __decorate([
        Input()
    ], Table.prototype, "columnResizeMode", void 0);
    __decorate([
        Input()
    ], Table.prototype, "reorderableColumns", void 0);
    __decorate([
        Input()
    ], Table.prototype, "loading", void 0);
    __decorate([
        Input()
    ], Table.prototype, "loadingIcon", void 0);
    __decorate([
        Input()
    ], Table.prototype, "showLoader", void 0);
    __decorate([
        Input()
    ], Table.prototype, "rowHover", void 0);
    __decorate([
        Input()
    ], Table.prototype, "customSort", void 0);
    __decorate([
        Input()
    ], Table.prototype, "autoLayout", void 0);
    __decorate([
        Input()
    ], Table.prototype, "exportFunction", void 0);
    __decorate([
        Input()
    ], Table.prototype, "stateKey", void 0);
    __decorate([
        Input()
    ], Table.prototype, "stateStorage", void 0);
    __decorate([
        Input()
    ], Table.prototype, "editMode", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onRowSelect", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onRowUnselect", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onPage", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onSort", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onFilter", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onLazyLoad", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onRowExpand", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onRowCollapse", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onContextMenuSelect", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onColResize", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onColReorder", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onRowReorder", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onEditInit", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onEditComplete", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onEditCancel", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onHeaderCheckboxToggle", void 0);
    __decorate([
        Output()
    ], Table.prototype, "sortFunction", void 0);
    __decorate([
        Output()
    ], Table.prototype, "firstChange", void 0);
    __decorate([
        Output()
    ], Table.prototype, "rowsChange", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onStateSave", void 0);
    __decorate([
        Output()
    ], Table.prototype, "onStateRestore", void 0);
    __decorate([
        ViewChild('container')
    ], Table.prototype, "containerViewChild", void 0);
    __decorate([
        ViewChild('resizeHelper')
    ], Table.prototype, "resizeHelperViewChild", void 0);
    __decorate([
        ViewChild('reorderIndicatorUp')
    ], Table.prototype, "reorderIndicatorUpViewChild", void 0);
    __decorate([
        ViewChild('reorderIndicatorDown')
    ], Table.prototype, "reorderIndicatorDownViewChild", void 0);
    __decorate([
        ViewChild('table')
    ], Table.prototype, "tableViewChild", void 0);
    __decorate([
        ContentChildren(PrimeTemplate)
    ], Table.prototype, "templates", void 0);
    __decorate([
        Input()
    ], Table.prototype, "value", null);
    __decorate([
        Input()
    ], Table.prototype, "columns", null);
    __decorate([
        Input()
    ], Table.prototype, "first", null);
    __decorate([
        Input()
    ], Table.prototype, "rows", null);
    __decorate([
        Input()
    ], Table.prototype, "totalRecords", null);
    __decorate([
        Input()
    ], Table.prototype, "sortField", null);
    __decorate([
        Input()
    ], Table.prototype, "sortOrder", null);
    __decorate([
        Input()
    ], Table.prototype, "multiSortMeta", null);
    __decorate([
        Input()
    ], Table.prototype, "selection", null);
    Table = __decorate([
        Component({
            selector: 'p-table',
            template: "\n        <div #container [ngStyle]=\"style\" [class]=\"styleClass\"\n            [ngClass]=\"{'ui-table ui-widget': true, 'ui-table-responsive': responsive, 'ui-table-resizable': resizableColumns,\n                'ui-table-resizable-fit': (resizableColumns && columnResizeMode === 'fit'),\n                'ui-table-hoverable-rows': (rowHover||selectionMode), 'ui-table-auto-layout': autoLayout}\">\n            <div class=\"ui-table-loading ui-widget-overlay\" *ngIf=\"loading && showLoader\"></div>\n            <div class=\"ui-table-loading-content\" *ngIf=\"loading && showLoader\">\n                <i [class]=\"'ui-table-loading-icon pi-spin ' + loadingIcon\"></i>\n            </div>\n            <div *ngIf=\"captionTemplate\" class=\"ui-table-caption ui-widget-header\">\n                <ng-container *ngTemplateOutlet=\"captionTemplate\"></ng-container>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" styleClass=\"ui-paginator-top\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"onPageChange($event)\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'top' || paginatorPosition =='both')\"\n                [templateLeft]=\"paginatorLeftTemplate\" [templateRight]=\"paginatorRightTemplate\" [dropdownAppendTo]=\"paginatorDropdownAppendTo\" [dropdownScrollHeight]=\"paginatorDropdownScrollHeight\"\n                [currentPageReportTemplate]=\"currentPageReportTemplate\" [showCurrentPageReport]=\"showCurrentPageReport\"></p-paginator>\n\n            <div class=\"ui-table-wrapper\" *ngIf=\"!scrollable\">\n                <table role=\"grid\" #table [ngClass]=\"tableStyleClass\" [ngStyle]=\"tableStyle\">\n                    <ng-container *ngTemplateOutlet=\"colGroupTemplate; context {$implicit: columns}\"></ng-container>\n                    <thead class=\"ui-table-thead\">\n                        <ng-container *ngTemplateOutlet=\"headerTemplate; context: {$implicit: columns}\"></ng-container>\n                    </thead>\n                    <tbody class=\"ui-table-tbody\" [pTableBody]=\"columns\" [pTableBodyTemplate]=\"bodyTemplate\"></tbody>\n                    <tfoot *ngIf=\"footerTemplate\" class=\"ui-table-tfoot\">\n                        <ng-container *ngTemplateOutlet=\"footerTemplate; context {$implicit: columns}\"></ng-container>\n                    </tfoot>\n                </table>\n            </div>\n\n            <div class=\"ui-table-scrollable-wrapper\" *ngIf=\"scrollable\">\n               <div class=\"ui-table-scrollable-view ui-table-frozen-view\" *ngIf=\"frozenColumns||frozenBodyTemplate\" [pScrollableView]=\"frozenColumns\" [frozen]=\"true\" [ngStyle]=\"{width: frozenWidth}\" [scrollHeight]=\"scrollHeight\"></div>\n               <div class=\"ui-table-scrollable-view\" [pScrollableView]=\"columns\" [frozen]=\"false\" [scrollHeight]=\"scrollHeight\" [ngStyle]=\"{left: frozenWidth, width: 'calc(100% - '+frozenWidth+')'}\"></div>\n            </div>\n\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" styleClass=\"ui-paginator-bottom\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"onPageChange($event)\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')\"\n                [templateLeft]=\"paginatorLeftTemplate\" [templateRight]=\"paginatorRightTemplate\" [dropdownAppendTo]=\"paginatorDropdownAppendTo\" [dropdownScrollHeight]=\"paginatorDropdownScrollHeight\"\n                [currentPageReportTemplate]=\"currentPageReportTemplate\" [showCurrentPageReport]=\"showCurrentPageReport\"></p-paginator>\n\n                <div *ngIf=\"summaryTemplate\" class=\"ui-table-summary ui-widget-header\">\n                <ng-container *ngTemplateOutlet=\"summaryTemplate\"></ng-container>\n            </div>\n\n            <div #resizeHelper class=\"ui-column-resizer-helper ui-state-highlight\" style=\"display:none\" *ngIf=\"resizableColumns\"></div>\n\n            <span #reorderIndicatorUp class=\"pi pi-arrow-down ui-table-reorder-indicator-up\" style=\"display:none\" *ngIf=\"reorderableColumns\"></span>\n            <span #reorderIndicatorDown class=\"pi pi-arrow-up ui-table-reorder-indicator-down\" style=\"display:none\" *ngIf=\"reorderableColumns\"></span>\n        </div>\n    ",
            providers: [TableService],
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], Table);
    return Table;
}());
export { Table };
var TableBody = /** @class */ (function () {
    function TableBody(dt) {
        this.dt = dt;
    }
    TableBody.ctorParameters = function () { return [
        { type: Table }
    ]; };
    __decorate([
        Input("pTableBody")
    ], TableBody.prototype, "columns", void 0);
    __decorate([
        Input("pTableBodyTemplate")
    ], TableBody.prototype, "template", void 0);
    __decorate([
        Input()
    ], TableBody.prototype, "frozen", void 0);
    TableBody = __decorate([
        Component({
            selector: '[pTableBody]',
            template: "\n        <ng-container *ngIf=\"!dt.expandedRowTemplate\">\n            <ng-template ngFor let-rowData let-rowIndex=\"index\" [ngForOf]=\"(dt.paginator && !dt.lazy) ? ((dt.filteredValue||dt.value) | slice:dt.first:(dt.first + dt.rows)) : (dt.filteredValue||dt.value)\" [ngForTrackBy]=\"dt.rowTrackBy\">\n                <ng-container *ngTemplateOutlet=\"template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, editing: (dt.editMode === 'row' && dt.isRowEditing(rowData))}\"></ng-container>\n            </ng-template>\n        </ng-container>\n        <ng-container *ngIf=\"dt.expandedRowTemplate\">\n            <ng-template ngFor let-rowData let-rowIndex=\"index\" [ngForOf]=\"(dt.paginator && !dt.lazy) ? ((dt.filteredValue||dt.value) | slice:dt.first:(dt.first + dt.rows)) : (dt.filteredValue||dt.value)\" [ngForTrackBy]=\"dt.rowTrackBy\">\n                <ng-container *ngTemplateOutlet=\"template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, expanded: dt.isRowExpanded(rowData), editing: (dt.editMode === 'row' && dt.isRowEditing(rowData))}\"></ng-container>\n                <ng-container *ngIf=\"dt.isRowExpanded(rowData)\">\n                    <ng-container *ngTemplateOutlet=\"dt.expandedRowTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns}\"></ng-container>\n                </ng-container>\n            </ng-template>\n        </ng-container>\n        <ng-container *ngIf=\"dt.loading\">\n            <ng-container *ngTemplateOutlet=\"dt.loadingBodyTemplate; context: {$implicit: columns, frozen: frozen}\"></ng-container>\n        </ng-container>\n        <ng-container *ngIf=\"dt.isEmpty() && !dt.loading\">\n            <ng-container *ngTemplateOutlet=\"dt.emptyMessageTemplate; context: {$implicit: columns, frozen: frozen}\"></ng-container>\n        </ng-container>\n    "
        })
    ], TableBody);
    return TableBody;
}());
export { TableBody };
var ScrollableView = /** @class */ (function () {
    function ScrollableView(dt, el, zone) {
        var _this = this;
        this.dt = dt;
        this.el = el;
        this.zone = zone;
        this.loadingArray = [];
        this.lastBodyScrollTop = 0;
        this.subscription = this.dt.tableService.valueSource$.subscribe(function () {
            _this.zone.runOutsideAngular(function () {
                setTimeout(function () {
                    _this.alignScrollBar();
                    if (_this.scrollLoadingTableViewChild && _this.scrollLoadingTableViewChild.nativeElement) {
                        _this.scrollLoadingTableViewChild.nativeElement.style.display = 'none';
                    }
                }, 50);
            });
        });
        if (this.dt.virtualScroll) {
            this.totalRecordsSubscription = this.dt.tableService.totalRecordsSource$.subscribe(function () {
                _this.zone.runOutsideAngular(function () {
                    setTimeout(function () {
                        _this.setVirtualScrollerHeight();
                    }, 50);
                });
            });
        }
        this.loadingArray = Array(this.dt.rows).fill(1);
        this.initialized = false;
    }
    Object.defineProperty(ScrollableView.prototype, "scrollHeight", {
        get: function () {
            return this._scrollHeight;
        },
        set: function (val) {
            this._scrollHeight = val;
            this.setScrollHeight();
        },
        enumerable: true,
        configurable: true
    });
    ScrollableView.prototype.ngAfterViewChecked = function () {
        if (!this.initialized && this.el.nativeElement.offsetParent) {
            this.alignScrollBar();
            this.setScrollHeight();
            this.initialized = true;
        }
    };
    ScrollableView.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (!this.frozen) {
            if (this.dt.frozenColumns || this.dt.frozenBodyTemplate) {
                DomHandler.addClass(this.el.nativeElement, 'ui-table-unfrozen-view');
            }
            var frozenView = this.el.nativeElement.previousElementSibling;
            if (frozenView) {
                this.frozenSiblingBody = DomHandler.findSingle(frozenView, '.ui-table-scrollable-body');
            }
        }
        else {
            if (this.scrollableAlignerViewChild && this.scrollableAlignerViewChild.nativeElement) {
                this.scrollableAlignerViewChild.nativeElement.style.height = DomHandler.calculateScrollbarHeight() + 'px';
            }
            var scrollableView = this.el.nativeElement.nextElementSibling;
            if (scrollableView) {
                this.scrollableSiblingBody = DomHandler.findSingle(scrollableView, '.ui-table-scrollable-body');
            }
        }
        this.bindEvents();
        this.setScrollHeight();
        this.alignScrollBar();
        if (this.frozen) {
            this.columnsSubscription = this.dt.tableService.columnsSource$.subscribe(function () {
                _this.zone.runOutsideAngular(function () {
                    setTimeout(function () {
                        _this.setScrollHeight();
                    }, 50);
                });
            });
        }
        if (this.dt.virtualScroll) {
            this.setVirtualScrollerHeight();
            if (this.scrollLoadingTableViewChild && this.scrollLoadingTableViewChild.nativeElement) {
                this.scrollLoadingTableViewChild.nativeElement.style.display = 'table';
            }
        }
    };
    ScrollableView.prototype.bindEvents = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            if (_this.scrollHeaderViewChild && _this.scrollHeaderViewChild.nativeElement) {
                _this.headerScrollListener = _this.onHeaderScroll.bind(_this);
                _this.scrollHeaderViewChild.nativeElement.addEventListener('scroll', _this.headerScrollListener);
            }
            if (_this.scrollFooterViewChild && _this.scrollFooterViewChild.nativeElement) {
                _this.footerScrollListener = _this.onFooterScroll.bind(_this);
                _this.scrollFooterViewChild.nativeElement.addEventListener('scroll', _this.footerScrollListener);
            }
            if (!_this.frozen) {
                _this.bodyScrollListener = _this.onBodyScroll.bind(_this);
                _this.scrollBodyViewChild.nativeElement.addEventListener('scroll', _this.bodyScrollListener);
            }
        });
    };
    ScrollableView.prototype.unbindEvents = function () {
        if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
            this.scrollHeaderViewChild.nativeElement.removeEventListener('scroll', this.headerScrollListener);
        }
        if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
            this.scrollFooterViewChild.nativeElement.removeEventListener('scroll', this.footerScrollListener);
        }
        this.scrollBodyViewChild.nativeElement.removeEventListener('scroll', this.bodyScrollListener);
    };
    ScrollableView.prototype.onHeaderScroll = function (event) {
        var scrollLeft = this.scrollHeaderViewChild.nativeElement.scrollLeft;
        this.scrollBodyViewChild.nativeElement.scrollLeft = scrollLeft;
        if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
            this.scrollFooterViewChild.nativeElement.scrollLeft = scrollLeft;
        }
        this.preventBodyScrollPropagation = true;
    };
    ScrollableView.prototype.onFooterScroll = function (event) {
        var scrollLeft = this.scrollFooterViewChild.nativeElement.scrollLeft;
        this.scrollBodyViewChild.nativeElement.scrollLeft = scrollLeft;
        if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
            this.scrollHeaderViewChild.nativeElement.scrollLeft = scrollLeft;
        }
        this.preventBodyScrollPropagation = true;
    };
    ScrollableView.prototype.onBodyScroll = function (event) {
        var _this = this;
        if (this.preventBodyScrollPropagation) {
            this.preventBodyScrollPropagation = false;
            return;
        }
        if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
            this.scrollHeaderBoxViewChild.nativeElement.style.marginLeft = -1 * this.scrollBodyViewChild.nativeElement.scrollLeft + 'px';
        }
        if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
            this.scrollFooterBoxViewChild.nativeElement.style.marginLeft = -1 * this.scrollBodyViewChild.nativeElement.scrollLeft + 'px';
        }
        if (this.frozenSiblingBody) {
            this.frozenSiblingBody.scrollTop = this.scrollBodyViewChild.nativeElement.scrollTop;
        }
        if (this.dt.virtualScroll) {
            requestAnimationFrame(function () {
                if (_this.lastBodyScrollTop !== _this.scrollBodyViewChild.nativeElement.scrollTop) {
                    _this.lastBodyScrollTop = _this.scrollBodyViewChild.nativeElement.scrollTop;
                    var viewport = DomHandler.getOuterHeight(_this.scrollBodyViewChild.nativeElement);
                    var tableHeight = DomHandler.getOuterHeight(_this.scrollTableViewChild.nativeElement);
                    var pageHeight_1 = _this.dt.virtualRowHeight * _this.dt.rows;
                    var virtualTableHeight = DomHandler.getOuterHeight(_this.virtualScrollerViewChild.nativeElement);
                    var pageCount = (virtualTableHeight / pageHeight_1) || 1;
                    var scrollBodyTop = _this.scrollTableViewChild.nativeElement.style.top || '0';
                    if ((_this.scrollBodyViewChild.nativeElement.scrollTop + viewport > parseFloat(scrollBodyTop) + tableHeight) || (_this.scrollBodyViewChild.nativeElement.scrollTop < parseFloat(scrollBodyTop))) {
                        if (_this.scrollLoadingTableViewChild && _this.scrollLoadingTableViewChild.nativeElement) {
                            _this.scrollLoadingTableViewChild.nativeElement.style.display = 'table';
                            _this.scrollLoadingTableViewChild.nativeElement.style.top = _this.scrollBodyViewChild.nativeElement.scrollTop + 'px';
                        }
                        var page_1 = Math.floor((_this.scrollBodyViewChild.nativeElement.scrollTop * pageCount) / (_this.scrollBodyViewChild.nativeElement.scrollHeight)) + 1;
                        _this.dt.handleVirtualScroll({
                            page: page_1,
                            callback: function () {
                                if (_this.scrollLoadingTableViewChild && _this.scrollLoadingTableViewChild.nativeElement) {
                                    _this.scrollLoadingTableViewChild.nativeElement.style.display = 'none';
                                }
                                _this.scrollTableViewChild.nativeElement.style.top = ((page_1 - 1) * pageHeight_1) + 'px';
                                if (_this.frozenSiblingBody) {
                                    _this.frozenSiblingBody.children[0].style.top = _this.scrollTableViewChild.nativeElement.style.top;
                                }
                                _this.dt.anchorRowIndex = null;
                            }
                        });
                    }
                }
            });
        }
    };
    ScrollableView.prototype.setScrollHeight = function () {
        if (this.scrollHeight && this.scrollBodyViewChild && this.scrollBodyViewChild.nativeElement) {
            if (this.frozenSiblingBody) {
                this.scrollBodyViewChild.nativeElement.style.maxHeight = this.frozenSiblingBody.style.maxHeight;
            }
            else {
                if (this.scrollHeight.indexOf('%') !== -1) {
                    var relativeHeight = void 0;
                    this.scrollBodyViewChild.nativeElement.style.visibility = 'hidden';
                    this.scrollBodyViewChild.nativeElement.style.height = '100px'; //temporary height to calculate static height
                    var containerHeight = DomHandler.getOuterHeight(this.dt.el.nativeElement.children[0]);
                    if (this.scrollHeight.includes("calc")) {
                        var percentHeight = parseInt(this.scrollHeight.slice(this.scrollHeight.indexOf("(") + 1, this.scrollHeight.indexOf("%")));
                        var diffValue = parseInt(this.scrollHeight.slice(this.scrollHeight.indexOf("-") + 1, this.scrollHeight.indexOf(")")));
                        relativeHeight = (DomHandler.getOuterHeight(this.dt.el.nativeElement.parentElement) * percentHeight / 100) - diffValue;
                    }
                    else {
                        relativeHeight = DomHandler.getOuterHeight(this.dt.el.nativeElement.parentElement) * parseInt(this.scrollHeight) / 100;
                    }
                    var staticHeight = containerHeight - 100; //total height of headers, footers, paginators
                    var scrollBodyHeight = (relativeHeight - staticHeight);
                    if (this.frozen) {
                        scrollBodyHeight -= DomHandler.calculateScrollbarWidth();
                    }
                    this.scrollBodyViewChild.nativeElement.style.height = 'auto';
                    this.scrollBodyViewChild.nativeElement.style.maxHeight = scrollBodyHeight + 'px';
                    this.scrollBodyViewChild.nativeElement.style.visibility = 'visible';
                }
                else {
                    this.scrollBodyViewChild.nativeElement.style.maxHeight = this.scrollHeight;
                }
            }
        }
    };
    ScrollableView.prototype.setVirtualScrollerHeight = function () {
        if (this.virtualScrollerViewChild.nativeElement) {
            this.virtualScrollerViewChild.nativeElement.style.height = this.dt.totalRecords * this.dt.virtualRowHeight + 'px';
        }
    };
    ScrollableView.prototype.hasVerticalOverflow = function () {
        return DomHandler.getOuterHeight(this.scrollTableViewChild.nativeElement) > DomHandler.getOuterHeight(this.scrollBodyViewChild.nativeElement);
    };
    ScrollableView.prototype.alignScrollBar = function () {
        if (!this.frozen) {
            var scrollBarWidth = this.hasVerticalOverflow() ? DomHandler.calculateScrollbarWidth() : 0;
            this.scrollHeaderBoxViewChild.nativeElement.style.marginRight = scrollBarWidth + 'px';
            if (this.scrollFooterBoxViewChild && this.scrollFooterBoxViewChild.nativeElement) {
                this.scrollFooterBoxViewChild.nativeElement.style.marginRight = scrollBarWidth + 'px';
            }
        }
        this.initialized = false;
    };
    ScrollableView.prototype.ngOnDestroy = function () {
        this.unbindEvents();
        this.frozenSiblingBody = null;
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.totalRecordsSubscription) {
            this.totalRecordsSubscription.unsubscribe();
        }
        if (this.columnsSubscription) {
            this.columnsSubscription.unsubscribe();
        }
        this.initialized = false;
    };
    ScrollableView.ctorParameters = function () { return [
        { type: Table },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    __decorate([
        Input("pScrollableView")
    ], ScrollableView.prototype, "columns", void 0);
    __decorate([
        Input()
    ], ScrollableView.prototype, "frozen", void 0);
    __decorate([
        ViewChild('scrollHeader')
    ], ScrollableView.prototype, "scrollHeaderViewChild", void 0);
    __decorate([
        ViewChild('scrollHeaderBox')
    ], ScrollableView.prototype, "scrollHeaderBoxViewChild", void 0);
    __decorate([
        ViewChild('scrollBody')
    ], ScrollableView.prototype, "scrollBodyViewChild", void 0);
    __decorate([
        ViewChild('scrollTable')
    ], ScrollableView.prototype, "scrollTableViewChild", void 0);
    __decorate([
        ViewChild('loadingTable')
    ], ScrollableView.prototype, "scrollLoadingTableViewChild", void 0);
    __decorate([
        ViewChild('scrollFooter')
    ], ScrollableView.prototype, "scrollFooterViewChild", void 0);
    __decorate([
        ViewChild('scrollFooterBox')
    ], ScrollableView.prototype, "scrollFooterBoxViewChild", void 0);
    __decorate([
        ViewChild('virtualScroller')
    ], ScrollableView.prototype, "virtualScrollerViewChild", void 0);
    __decorate([
        ViewChild('scrollableAligner')
    ], ScrollableView.prototype, "scrollableAlignerViewChild", void 0);
    __decorate([
        Input()
    ], ScrollableView.prototype, "scrollHeight", null);
    ScrollableView = __decorate([
        Component({
            selector: '[pScrollableView]',
            template: "\n        <div #scrollHeader class=\"ui-table-scrollable-header ui-widget-header\">\n            <div #scrollHeaderBox class=\"ui-table-scrollable-header-box\">\n                <table class=\"ui-table-scrollable-header-table\" [ngClass]=\"dt.tableStyleClass\" [ngStyle]=\"dt.tableStyle\">\n                    <ng-container *ngTemplateOutlet=\"frozen ? dt.frozenColGroupTemplate||dt.colGroupTemplate : dt.colGroupTemplate; context {$implicit: columns}\"></ng-container>\n                    <thead class=\"ui-table-thead\">\n                        <ng-container *ngTemplateOutlet=\"frozen ? dt.frozenHeaderTemplate||dt.headerTemplate : dt.headerTemplate; context {$implicit: columns}\"></ng-container>\n                    </thead>\n                    <tbody class=\"ui-table-tbody\">\n                        <ng-template ngFor let-rowData let-rowIndex=\"index\" [ngForOf]=\"dt.frozenValue\" [ngForTrackBy]=\"dt.rowTrackBy\">\n                            <ng-container *ngTemplateOutlet=\"dt.frozenRowsTemplate; context: {$implicit: rowData, rowIndex: rowIndex, columns: columns}\"></ng-container>\n                        </ng-template>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n        <div #scrollBody class=\"ui-table-scrollable-body\">\n            <table #scrollTable [ngClass]=\"{'ui-table-scrollable-body-table': true, 'ui-table-virtual-table': dt.virtualScroll}\" [class]=\"dt.tableStyleClass\" [ngStyle]=\"dt.tableStyle\">\n                <ng-container *ngTemplateOutlet=\"frozen ? dt.frozenColGroupTemplate||dt.colGroupTemplate : dt.colGroupTemplate; context {$implicit: columns}\"></ng-container>\n                <tbody class=\"ui-table-tbody\" [pTableBody]=\"columns\" [pTableBodyTemplate]=\"frozen ? dt.frozenBodyTemplate||dt.bodyTemplate : dt.bodyTemplate\" [frozen]=\"frozen\"></tbody>\n            </table>\n            <table #loadingTable *ngIf=\"dt.virtualScroll && dt.loadingBodyTemplate != null\" [ngClass]=\"{'ui-table-scrollable-body-table ui-table-loading-virtual-table': true, 'ui-table-virtual-table': dt.virtualScroll}\">\n                <tbody class=\"ui-table-tbody\">\n                    <ng-template ngFor [ngForOf]=\"loadingArray\">\n                        <ng-container *ngTemplateOutlet=\"dt.loadingBodyTemplate; context: {columns: columns}\"></ng-container>\n                    </ng-template>\n                </tbody>\n            </table>\n            <div #scrollableAligner style=\"background-color:transparent\" *ngIf=\"frozen\"></div>\n            <div #virtualScroller class=\"ui-table-virtual-scroller\" *ngIf=\"dt.virtualScroll\"></div>\n        </div>\n        <div #scrollFooter class=\"ui-table-scrollable-footer ui-widget-header\">\n            <div #scrollFooterBox class=\"ui-table-scrollable-footer-box\">\n                <table class=\"ui-table-scrollable-footer-table\" [ngClass]=\"dt.tableStyleClass\" [ngStyle]=\"dt.tableStyle\">\n                    <ng-container *ngTemplateOutlet=\"frozen ? dt.frozenColGroupTemplate||dt.colGroupTemplate : dt.colGroupTemplate; context {$implicit: columns}\"></ng-container>\n                    <tfoot class=\"ui-table-tfoot\">\n                        <ng-container *ngTemplateOutlet=\"frozen ? dt.frozenFooterTemplate||dt.footerTemplate : dt.footerTemplate; context {$implicit: columns}\"></ng-container>\n                    </tfoot>\n                </table>\n            </div>\n        </div>\n    "
        })
    ], ScrollableView);
    return ScrollableView;
}());
export { ScrollableView };
var SortableColumn = /** @class */ (function () {
    function SortableColumn(dt) {
        var _this = this;
        this.dt = dt;
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.sortSource$.subscribe(function (sortMeta) {
                _this.updateSortState();
            });
        }
    }
    SortableColumn.prototype.ngOnInit = function () {
        if (this.isEnabled()) {
            this.updateSortState();
        }
    };
    SortableColumn.prototype.updateSortState = function () {
        this.sorted = this.dt.isSorted(this.field);
        this.sortOrder = this.sorted ? (this.dt.sortOrder === 1 ? 'ascending' : 'descending') : 'none';
    };
    SortableColumn.prototype.onClick = function (event) {
        if (this.isEnabled()) {
            this.updateSortState();
            this.dt.sort({
                originalEvent: event,
                field: this.field
            });
            DomHandler.clearSelection();
        }
    };
    SortableColumn.prototype.onEnterKey = function (event) {
        this.onClick(event);
    };
    SortableColumn.prototype.isEnabled = function () {
        return this.pSortableColumnDisabled !== true;
    };
    SortableColumn.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    SortableColumn.ctorParameters = function () { return [
        { type: Table }
    ]; };
    __decorate([
        Input("pSortableColumn")
    ], SortableColumn.prototype, "field", void 0);
    __decorate([
        Input()
    ], SortableColumn.prototype, "pSortableColumnDisabled", void 0);
    __decorate([
        HostListener('click', ['$event'])
    ], SortableColumn.prototype, "onClick", null);
    __decorate([
        HostListener('keydown.enter', ['$event'])
    ], SortableColumn.prototype, "onEnterKey", null);
    SortableColumn = __decorate([
        Directive({
            selector: '[pSortableColumn]',
            host: {
                '[class.ui-sortable-column]': 'isEnabled()',
                '[class.ui-state-highlight]': 'sorted',
                '[attr.tabindex]': 'isEnabled() ? "0" : null',
                '[attr.role]': '"columnheader"',
                '[attr.aria-sort]': 'sortOrder'
            }
        })
    ], SortableColumn);
    return SortableColumn;
}());
export { SortableColumn };
var SortIcon = /** @class */ (function () {
    function SortIcon(dt) {
        var _this = this;
        this.dt = dt;
        this.subscription = this.dt.tableService.sortSource$.subscribe(function (sortMeta) {
            _this.updateSortState();
        });
    }
    SortIcon.prototype.ngOnInit = function () {
        this.updateSortState();
    };
    SortIcon.prototype.onClick = function (event) {
        event.preventDefault();
    };
    SortIcon.prototype.updateSortState = function () {
        if (this.dt.sortMode === 'single') {
            this.sortOrder = this.dt.isSorted(this.field) ? this.dt.sortOrder : 0;
        }
        else if (this.dt.sortMode === 'multiple') {
            var sortMeta = this.dt.getSortMeta(this.field);
            this.sortOrder = sortMeta ? sortMeta.order : 0;
        }
    };
    SortIcon.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    SortIcon.ctorParameters = function () { return [
        { type: Table }
    ]; };
    __decorate([
        Input()
    ], SortIcon.prototype, "field", void 0);
    SortIcon = __decorate([
        Component({
            selector: 'p-sortIcon',
            template: "\n        <i class=\"ui-sortable-column-icon pi pi-fw\" [ngClass]=\"{'pi-sort-up': sortOrder === 1, 'pi-sort-down': sortOrder === -1, 'pi-sort': sortOrder === 0}\"></i>\n    "
        })
    ], SortIcon);
    return SortIcon;
}());
export { SortIcon };
var SelectableRow = /** @class */ (function () {
    function SelectableRow(dt, tableService) {
        var _this = this;
        this.dt = dt;
        this.tableService = tableService;
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.selectionSource$.subscribe(function () {
                _this.selected = _this.dt.isSelected(_this.data);
            });
        }
    }
    SelectableRow.prototype.ngOnInit = function () {
        if (this.isEnabled()) {
            this.selected = this.dt.isSelected(this.data);
        }
    };
    SelectableRow.prototype.onClick = function (event) {
        if (this.isEnabled()) {
            this.dt.handleRowClick({
                originalEvent: event,
                rowData: this.data,
                rowIndex: this.index
            });
        }
    };
    SelectableRow.prototype.onTouchEnd = function (event) {
        if (this.isEnabled()) {
            this.dt.handleRowTouchEnd(event);
        }
    };
    SelectableRow.prototype.onArrowDownKeyDown = function (event) {
        if (!this.isEnabled()) {
            return;
        }
        var row = event.currentTarget;
        var nextRow = this.findNextSelectableRow(row);
        if (nextRow) {
            nextRow.focus();
        }
        event.preventDefault();
    };
    SelectableRow.prototype.onArrowUpKeyDown = function (event) {
        if (!this.isEnabled()) {
            return;
        }
        var row = event.currentTarget;
        var prevRow = this.findPrevSelectableRow(row);
        if (prevRow) {
            prevRow.focus();
        }
        event.preventDefault();
    };
    SelectableRow.prototype.onEnterKeyDown = function (event) {
        if (!this.isEnabled()) {
            return;
        }
        this.dt.handleRowClick({
            originalEvent: event,
            rowData: this.data,
            rowIndex: this.index
        });
    };
    SelectableRow.prototype.findNextSelectableRow = function (row) {
        var nextRow = row.nextElementSibling;
        if (nextRow) {
            if (DomHandler.hasClass(nextRow, 'ui-selectable-row'))
                return nextRow;
            else
                return this.findNextSelectableRow(nextRow);
        }
        else {
            return null;
        }
    };
    SelectableRow.prototype.findPrevSelectableRow = function (row) {
        var prevRow = row.previousElementSibling;
        if (prevRow) {
            if (DomHandler.hasClass(prevRow, 'ui-selectable-row'))
                return prevRow;
            else
                return this.findPrevSelectableRow(prevRow);
        }
        else {
            return null;
        }
    };
    SelectableRow.prototype.isEnabled = function () {
        return this.pSelectableRowDisabled !== true;
    };
    SelectableRow.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    SelectableRow.ctorParameters = function () { return [
        { type: Table },
        { type: TableService }
    ]; };
    __decorate([
        Input("pSelectableRow")
    ], SelectableRow.prototype, "data", void 0);
    __decorate([
        Input("pSelectableRowIndex")
    ], SelectableRow.prototype, "index", void 0);
    __decorate([
        Input()
    ], SelectableRow.prototype, "pSelectableRowDisabled", void 0);
    __decorate([
        HostListener('click', ['$event'])
    ], SelectableRow.prototype, "onClick", null);
    __decorate([
        HostListener('touchend', ['$event'])
    ], SelectableRow.prototype, "onTouchEnd", null);
    __decorate([
        HostListener('keydown.arrowdown', ['$event'])
    ], SelectableRow.prototype, "onArrowDownKeyDown", null);
    __decorate([
        HostListener('keydown.arrowup', ['$event'])
    ], SelectableRow.prototype, "onArrowUpKeyDown", null);
    __decorate([
        HostListener('keydown.enter', ['$event'])
    ], SelectableRow.prototype, "onEnterKeyDown", null);
    SelectableRow = __decorate([
        Directive({
            selector: '[pSelectableRow]',
            host: {
                '[class.ui-selectable-row]': 'isEnabled()',
                '[class.ui-state-highlight]': 'selected',
                '[attr.tabindex]': 'isEnabled() ? 0 : undefined'
            }
        })
    ], SelectableRow);
    return SelectableRow;
}());
export { SelectableRow };
var SelectableRowDblClick = /** @class */ (function () {
    function SelectableRowDblClick(dt, tableService) {
        var _this = this;
        this.dt = dt;
        this.tableService = tableService;
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.selectionSource$.subscribe(function () {
                _this.selected = _this.dt.isSelected(_this.data);
            });
        }
    }
    SelectableRowDblClick.prototype.ngOnInit = function () {
        if (this.isEnabled()) {
            this.selected = this.dt.isSelected(this.data);
        }
    };
    SelectableRowDblClick.prototype.onClick = function (event) {
        if (this.isEnabled()) {
            this.dt.handleRowClick({
                originalEvent: event,
                rowData: this.data,
                rowIndex: this.index
            });
        }
    };
    SelectableRowDblClick.prototype.isEnabled = function () {
        return this.pSelectableRowDisabled !== true;
    };
    SelectableRowDblClick.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    SelectableRowDblClick.ctorParameters = function () { return [
        { type: Table },
        { type: TableService }
    ]; };
    __decorate([
        Input("pSelectableRowDblClick")
    ], SelectableRowDblClick.prototype, "data", void 0);
    __decorate([
        Input("pSelectableRowIndex")
    ], SelectableRowDblClick.prototype, "index", void 0);
    __decorate([
        Input()
    ], SelectableRowDblClick.prototype, "pSelectableRowDisabled", void 0);
    __decorate([
        HostListener('dblclick', ['$event'])
    ], SelectableRowDblClick.prototype, "onClick", null);
    SelectableRowDblClick = __decorate([
        Directive({
            selector: '[pSelectableRowDblClick]',
            host: {
                '[class.ui-selectable-row]': 'isEnabled()',
                '[class.ui-state-highlight]': 'selected'
            }
        })
    ], SelectableRowDblClick);
    return SelectableRowDblClick;
}());
export { SelectableRowDblClick };
var ContextMenuRow = /** @class */ (function () {
    function ContextMenuRow(dt, tableService, el) {
        var _this = this;
        this.dt = dt;
        this.tableService = tableService;
        this.el = el;
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.contextMenuSource$.subscribe(function (data) {
                _this.selected = _this.dt.equals(_this.data, data);
            });
        }
    }
    ContextMenuRow.prototype.onContextMenu = function (event) {
        if (this.isEnabled()) {
            this.dt.handleRowRightClick({
                originalEvent: event,
                rowData: this.data,
                rowIndex: this.index
            });
            this.el.nativeElement.focus();
            event.preventDefault();
        }
    };
    ContextMenuRow.prototype.isEnabled = function () {
        return this.pContextMenuRowDisabled !== true;
    };
    ContextMenuRow.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    ContextMenuRow.ctorParameters = function () { return [
        { type: Table },
        { type: TableService },
        { type: ElementRef }
    ]; };
    __decorate([
        Input("pContextMenuRow")
    ], ContextMenuRow.prototype, "data", void 0);
    __decorate([
        Input("pContextMenuRowIndex")
    ], ContextMenuRow.prototype, "index", void 0);
    __decorate([
        Input()
    ], ContextMenuRow.prototype, "pContextMenuRowDisabled", void 0);
    __decorate([
        HostListener('contextmenu', ['$event'])
    ], ContextMenuRow.prototype, "onContextMenu", null);
    ContextMenuRow = __decorate([
        Directive({
            selector: '[pContextMenuRow]',
            host: {
                '[class.ui-contextmenu-selected]': 'selected',
                '[attr.tabindex]': 'isEnabled() ? 0 : undefined'
            }
        })
    ], ContextMenuRow);
    return ContextMenuRow;
}());
export { ContextMenuRow };
var RowToggler = /** @class */ (function () {
    function RowToggler(dt) {
        this.dt = dt;
    }
    RowToggler.prototype.onClick = function (event) {
        if (this.isEnabled()) {
            this.dt.toggleRow(this.data, event);
            event.preventDefault();
        }
    };
    RowToggler.prototype.isEnabled = function () {
        return this.pRowTogglerDisabled !== true;
    };
    RowToggler.ctorParameters = function () { return [
        { type: Table }
    ]; };
    __decorate([
        Input('pRowToggler')
    ], RowToggler.prototype, "data", void 0);
    __decorate([
        Input()
    ], RowToggler.prototype, "pRowTogglerDisabled", void 0);
    __decorate([
        HostListener('click', ['$event'])
    ], RowToggler.prototype, "onClick", null);
    RowToggler = __decorate([
        Directive({
            selector: '[pRowToggler]'
        })
    ], RowToggler);
    return RowToggler;
}());
export { RowToggler };
var ResizableColumn = /** @class */ (function () {
    function ResizableColumn(dt, el, zone) {
        this.dt = dt;
        this.el = el;
        this.zone = zone;
    }
    ResizableColumn.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.isEnabled()) {
            DomHandler.addClass(this.el.nativeElement, 'ui-resizable-column');
            this.resizer = document.createElement('span');
            this.resizer.className = 'ui-column-resizer ui-clickable';
            this.el.nativeElement.appendChild(this.resizer);
            this.zone.runOutsideAngular(function () {
                _this.resizerMouseDownListener = _this.onMouseDown.bind(_this);
                _this.resizer.addEventListener('mousedown', _this.resizerMouseDownListener);
            });
        }
    };
    ResizableColumn.prototype.bindDocumentEvents = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.documentMouseMoveListener = _this.onDocumentMouseMove.bind(_this);
            document.addEventListener('mousemove', _this.documentMouseMoveListener);
            _this.documentMouseUpListener = _this.onDocumentMouseUp.bind(_this);
            document.addEventListener('mouseup', _this.documentMouseUpListener);
        });
    };
    ResizableColumn.prototype.unbindDocumentEvents = function () {
        if (this.documentMouseMoveListener) {
            document.removeEventListener('mousemove', this.documentMouseMoveListener);
            this.documentMouseMoveListener = null;
        }
        if (this.documentMouseUpListener) {
            document.removeEventListener('mouseup', this.documentMouseUpListener);
            this.documentMouseUpListener = null;
        }
    };
    ResizableColumn.prototype.onMouseDown = function (event) {
        if (event.which === 1) {
            this.dt.onColumnResizeBegin(event);
            this.bindDocumentEvents();
        }
    };
    ResizableColumn.prototype.onDocumentMouseMove = function (event) {
        this.dt.onColumnResize(event);
    };
    ResizableColumn.prototype.onDocumentMouseUp = function (event) {
        this.dt.onColumnResizeEnd(event, this.el.nativeElement);
        this.unbindDocumentEvents();
    };
    ResizableColumn.prototype.isEnabled = function () {
        return this.pResizableColumnDisabled !== true;
    };
    ResizableColumn.prototype.ngOnDestroy = function () {
        if (this.resizerMouseDownListener) {
            this.resizer.removeEventListener('mousedown', this.resizerMouseDownListener);
        }
        this.unbindDocumentEvents();
    };
    ResizableColumn.ctorParameters = function () { return [
        { type: Table },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    __decorate([
        Input()
    ], ResizableColumn.prototype, "pResizableColumnDisabled", void 0);
    ResizableColumn = __decorate([
        Directive({
            selector: '[pResizableColumn]'
        })
    ], ResizableColumn);
    return ResizableColumn;
}());
export { ResizableColumn };
var ReorderableColumn = /** @class */ (function () {
    function ReorderableColumn(dt, el, zone) {
        this.dt = dt;
        this.el = el;
        this.zone = zone;
    }
    ReorderableColumn.prototype.ngAfterViewInit = function () {
        if (this.isEnabled()) {
            this.bindEvents();
        }
    };
    ReorderableColumn.prototype.bindEvents = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.mouseDownListener = _this.onMouseDown.bind(_this);
            _this.el.nativeElement.addEventListener('mousedown', _this.mouseDownListener);
            _this.dragStartListener = _this.onDragStart.bind(_this);
            _this.el.nativeElement.addEventListener('dragstart', _this.dragStartListener);
            _this.dragOverListener = _this.onDragEnter.bind(_this);
            _this.el.nativeElement.addEventListener('dragover', _this.dragOverListener);
            _this.dragEnterListener = _this.onDragEnter.bind(_this);
            _this.el.nativeElement.addEventListener('dragenter', _this.dragEnterListener);
            _this.dragLeaveListener = _this.onDragLeave.bind(_this);
            _this.el.nativeElement.addEventListener('dragleave', _this.dragLeaveListener);
        });
    };
    ReorderableColumn.prototype.unbindEvents = function () {
        if (this.mouseDownListener) {
            document.removeEventListener('mousedown', this.mouseDownListener);
            this.mouseDownListener = null;
        }
        if (this.dragOverListener) {
            document.removeEventListener('dragover', this.dragOverListener);
            this.dragOverListener = null;
        }
        if (this.dragEnterListener) {
            document.removeEventListener('dragenter', this.dragEnterListener);
            this.dragEnterListener = null;
        }
        if (this.dragEnterListener) {
            document.removeEventListener('dragenter', this.dragEnterListener);
            this.dragEnterListener = null;
        }
        if (this.dragLeaveListener) {
            document.removeEventListener('dragleave', this.dragLeaveListener);
            this.dragLeaveListener = null;
        }
    };
    ReorderableColumn.prototype.onMouseDown = function (event) {
        if (event.target.nodeName === 'INPUT' || event.target.nodeName === 'TEXTAREA' || DomHandler.hasClass(event.target, 'ui-column-resizer'))
            this.el.nativeElement.draggable = false;
        else
            this.el.nativeElement.draggable = true;
    };
    ReorderableColumn.prototype.onDragStart = function (event) {
        this.dt.onColumnDragStart(event, this.el.nativeElement);
    };
    ReorderableColumn.prototype.onDragOver = function (event) {
        event.preventDefault();
    };
    ReorderableColumn.prototype.onDragEnter = function (event) {
        this.dt.onColumnDragEnter(event, this.el.nativeElement);
    };
    ReorderableColumn.prototype.onDragLeave = function (event) {
        this.dt.onColumnDragLeave(event);
    };
    ReorderableColumn.prototype.onDrop = function (event) {
        if (this.isEnabled()) {
            this.dt.onColumnDrop(event, this.el.nativeElement);
        }
    };
    ReorderableColumn.prototype.isEnabled = function () {
        return this.pReorderableColumnDisabled !== true;
    };
    ReorderableColumn.prototype.ngOnDestroy = function () {
        this.unbindEvents();
    };
    ReorderableColumn.ctorParameters = function () { return [
        { type: Table },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    __decorate([
        Input()
    ], ReorderableColumn.prototype, "pReorderableColumnDisabled", void 0);
    __decorate([
        HostListener('drop', ['$event'])
    ], ReorderableColumn.prototype, "onDrop", null);
    ReorderableColumn = __decorate([
        Directive({
            selector: '[pReorderableColumn]'
        })
    ], ReorderableColumn);
    return ReorderableColumn;
}());
export { ReorderableColumn };
var EditableColumn = /** @class */ (function () {
    function EditableColumn(dt, el, zone) {
        this.dt = dt;
        this.el = el;
        this.zone = zone;
    }
    EditableColumn.prototype.ngAfterViewInit = function () {
        if (this.isEnabled()) {
            DomHandler.addClass(this.el.nativeElement, 'ui-editable-column');
        }
    };
    EditableColumn.prototype.onClick = function (event) {
        if (this.isEnabled()) {
            this.dt.editingCellClick = true;
            if (this.dt.editingCell) {
                if (this.dt.editingCell !== this.el.nativeElement) {
                    if (!this.dt.isEditingCellValid()) {
                        return;
                    }
                    this.closeEditingCell(true, event);
                    this.openCell();
                }
            }
            else {
                this.openCell();
            }
        }
    };
    EditableColumn.prototype.openCell = function () {
        var _this = this;
        this.dt.updateEditingCell(this.el.nativeElement, this.data, this.field, this.rowIndex);
        DomHandler.addClass(this.el.nativeElement, 'ui-editing-cell');
        this.dt.onEditInit.emit({ field: this.field, data: this.data, index: this.rowIndex });
        this.zone.runOutsideAngular(function () {
            setTimeout(function () {
                var focusCellSelector = _this.pFocusCellSelector || 'input, textarea, select';
                var focusableElement = DomHandler.findSingle(_this.el.nativeElement, focusCellSelector);
                if (focusableElement) {
                    focusableElement.focus();
                }
            }, 50);
        });
    };
    EditableColumn.prototype.closeEditingCell = function (completed, event) {
        if (completed)
            this.dt.onEditComplete.emit({ field: this.dt.editingCellField, data: this.dt.editingCellData, originalEvent: event, index: this.rowIndex });
        else
            this.dt.onEditCancel.emit({ field: this.dt.editingCellField, data: this.dt.editingCellData, originalEvent: event, index: this.rowIndex });
        DomHandler.removeClass(this.dt.editingCell, 'ui-editing-cell');
        this.dt.editingCell = null;
        this.dt.editingCellData = null;
        this.dt.editingCellField = null;
        this.dt.unbindDocumentEditListener();
    };
    EditableColumn.prototype.onEnterKeyDown = function (event) {
        if (this.isEnabled()) {
            if (this.dt.isEditingCellValid()) {
                this.closeEditingCell(true, event);
            }
            event.preventDefault();
        }
    };
    EditableColumn.prototype.onEscapeKeyDown = function (event) {
        if (this.isEnabled()) {
            if (this.dt.isEditingCellValid()) {
                this.closeEditingCell(false, event);
            }
            event.preventDefault();
        }
    };
    EditableColumn.prototype.onShiftKeyDown = function (event) {
        if (this.isEnabled()) {
            if (event.shiftKey)
                this.moveToPreviousCell(event);
            else {
                this.moveToNextCell(event);
            }
        }
    };
    EditableColumn.prototype.findCell = function (element) {
        if (element) {
            var cell = element;
            while (cell && !DomHandler.hasClass(cell, 'ui-editing-cell')) {
                cell = cell.parentElement;
            }
            return cell;
        }
        else {
            return null;
        }
    };
    EditableColumn.prototype.moveToPreviousCell = function (event) {
        var currentCell = this.findCell(event.target);
        if (currentCell) {
            var targetCell = this.findPreviousEditableColumn(currentCell);
            if (targetCell) {
                if (this.dt.isEditingCellValid()) {
                    this.closeEditingCell(true, event);
                }
                DomHandler.invokeElementMethod(event.target, 'blur');
                DomHandler.invokeElementMethod(targetCell, 'click');
                event.preventDefault();
            }
        }
    };
    EditableColumn.prototype.moveToNextCell = function (event) {
        var currentCell = this.findCell(event.target);
        if (currentCell) {
            var targetCell = this.findNextEditableColumn(currentCell);
            if (targetCell) {
                if (this.dt.isEditingCellValid()) {
                    this.closeEditingCell(true, event);
                }
                DomHandler.invokeElementMethod(event.target, 'blur');
                DomHandler.invokeElementMethod(targetCell, 'click');
                event.preventDefault();
            }
        }
    };
    EditableColumn.prototype.findPreviousEditableColumn = function (cell) {
        var prevCell = cell.previousElementSibling;
        if (!prevCell) {
            var previousRow = cell.parentElement.previousElementSibling;
            if (previousRow) {
                prevCell = previousRow.lastElementChild;
            }
        }
        if (prevCell) {
            if (DomHandler.hasClass(prevCell, 'ui-editable-column'))
                return prevCell;
            else
                return this.findPreviousEditableColumn(prevCell);
        }
        else {
            return null;
        }
    };
    EditableColumn.prototype.findNextEditableColumn = function (cell) {
        var nextCell = cell.nextElementSibling;
        if (!nextCell) {
            var nextRow = cell.parentElement.nextElementSibling;
            if (nextRow) {
                nextCell = nextRow.firstElementChild;
            }
        }
        if (nextCell) {
            if (DomHandler.hasClass(nextCell, 'ui-editable-column'))
                return nextCell;
            else
                return this.findNextEditableColumn(nextCell);
        }
        else {
            return null;
        }
    };
    EditableColumn.prototype.isEnabled = function () {
        return this.pEditableColumnDisabled !== true;
    };
    EditableColumn.ctorParameters = function () { return [
        { type: Table },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    __decorate([
        Input("pEditableColumn")
    ], EditableColumn.prototype, "data", void 0);
    __decorate([
        Input("pEditableColumnField")
    ], EditableColumn.prototype, "field", void 0);
    __decorate([
        Input("pEditableColumnRowIndex")
    ], EditableColumn.prototype, "rowIndex", void 0);
    __decorate([
        Input()
    ], EditableColumn.prototype, "pEditableColumnDisabled", void 0);
    __decorate([
        Input()
    ], EditableColumn.prototype, "pFocusCellSelector", void 0);
    __decorate([
        HostListener('click', ['$event'])
    ], EditableColumn.prototype, "onClick", null);
    __decorate([
        HostListener('keydown.enter', ['$event'])
    ], EditableColumn.prototype, "onEnterKeyDown", null);
    __decorate([
        HostListener('keydown.escape', ['$event'])
    ], EditableColumn.prototype, "onEscapeKeyDown", null);
    __decorate([
        HostListener('keydown.tab', ['$event']),
        HostListener('keydown.shift.tab', ['$event']),
        HostListener('keydown.meta.tab', ['$event'])
    ], EditableColumn.prototype, "onShiftKeyDown", null);
    EditableColumn = __decorate([
        Directive({
            selector: '[pEditableColumn]'
        })
    ], EditableColumn);
    return EditableColumn;
}());
export { EditableColumn };
var EditableRow = /** @class */ (function () {
    function EditableRow(el) {
        this.el = el;
    }
    EditableRow.prototype.isEnabled = function () {
        return this.pEditableRowDisabled !== true;
    };
    EditableRow.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input("pEditableRow")
    ], EditableRow.prototype, "data", void 0);
    __decorate([
        Input()
    ], EditableRow.prototype, "pEditableRowDisabled", void 0);
    EditableRow = __decorate([
        Directive({
            selector: '[pEditableRow]'
        })
    ], EditableRow);
    return EditableRow;
}());
export { EditableRow };
var InitEditableRow = /** @class */ (function () {
    function InitEditableRow(dt, editableRow) {
        this.dt = dt;
        this.editableRow = editableRow;
    }
    InitEditableRow.prototype.onClick = function (event) {
        this.dt.initRowEdit(this.editableRow.data);
        event.preventDefault();
    };
    InitEditableRow.ctorParameters = function () { return [
        { type: Table },
        { type: EditableRow }
    ]; };
    __decorate([
        HostListener('click', ['$event'])
    ], InitEditableRow.prototype, "onClick", null);
    InitEditableRow = __decorate([
        Directive({
            selector: '[pInitEditableRow]'
        })
    ], InitEditableRow);
    return InitEditableRow;
}());
export { InitEditableRow };
var SaveEditableRow = /** @class */ (function () {
    function SaveEditableRow(dt, editableRow) {
        this.dt = dt;
        this.editableRow = editableRow;
    }
    SaveEditableRow.prototype.onClick = function (event) {
        this.dt.saveRowEdit(this.editableRow.data, this.editableRow.el.nativeElement);
        event.preventDefault();
    };
    SaveEditableRow.ctorParameters = function () { return [
        { type: Table },
        { type: EditableRow }
    ]; };
    __decorate([
        HostListener('click', ['$event'])
    ], SaveEditableRow.prototype, "onClick", null);
    SaveEditableRow = __decorate([
        Directive({
            selector: '[pSaveEditableRow]'
        })
    ], SaveEditableRow);
    return SaveEditableRow;
}());
export { SaveEditableRow };
var CancelEditableRow = /** @class */ (function () {
    function CancelEditableRow(dt, editableRow) {
        this.dt = dt;
        this.editableRow = editableRow;
    }
    CancelEditableRow.prototype.onClick = function (event) {
        this.dt.cancelRowEdit(this.editableRow.data);
        event.preventDefault();
    };
    CancelEditableRow.ctorParameters = function () { return [
        { type: Table },
        { type: EditableRow }
    ]; };
    __decorate([
        HostListener('click', ['$event'])
    ], CancelEditableRow.prototype, "onClick", null);
    CancelEditableRow = __decorate([
        Directive({
            selector: '[pCancelEditableRow]'
        })
    ], CancelEditableRow);
    return CancelEditableRow;
}());
export { CancelEditableRow };
var CellEditor = /** @class */ (function () {
    function CellEditor(dt, editableColumn, editableRow) {
        this.dt = dt;
        this.editableColumn = editableColumn;
        this.editableRow = editableRow;
    }
    CellEditor.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'input':
                    _this.inputTemplate = item.template;
                    break;
                case 'output':
                    _this.outputTemplate = item.template;
                    break;
            }
        });
    };
    Object.defineProperty(CellEditor.prototype, "editing", {
        get: function () {
            return (this.dt.editingCell && this.editableColumn && this.dt.editingCell === this.editableColumn.el.nativeElement) ||
                (this.editableRow && this.dt.editMode === 'row' && this.dt.isRowEditing(this.editableRow.data));
        },
        enumerable: true,
        configurable: true
    });
    CellEditor.ctorParameters = function () { return [
        { type: Table },
        { type: EditableColumn, decorators: [{ type: Optional }] },
        { type: EditableRow, decorators: [{ type: Optional }] }
    ]; };
    __decorate([
        ContentChildren(PrimeTemplate)
    ], CellEditor.prototype, "templates", void 0);
    CellEditor = __decorate([
        Component({
            selector: 'p-cellEditor',
            template: "\n        <ng-container *ngIf=\"editing\">\n            <ng-container *ngTemplateOutlet=\"inputTemplate\"></ng-container>\n        </ng-container>\n        <ng-container *ngIf=\"!editing\">\n            <ng-container *ngTemplateOutlet=\"outputTemplate\"></ng-container>\n        </ng-container>\n    "
        }),
        __param(1, Optional()), __param(2, Optional())
    ], CellEditor);
    return CellEditor;
}());
export { CellEditor };
var TableRadioButton = /** @class */ (function () {
    function TableRadioButton(dt, tableService) {
        var _this = this;
        this.dt = dt;
        this.tableService = tableService;
        this.subscription = this.dt.tableService.selectionSource$.subscribe(function () {
            _this.checked = _this.dt.isSelected(_this.value);
        });
    }
    TableRadioButton.prototype.ngOnInit = function () {
        this.checked = this.dt.isSelected(this.value);
    };
    TableRadioButton.prototype.onClick = function (event) {
        if (!this.disabled) {
            this.dt.toggleRowWithRadio({
                originalEvent: event,
                rowIndex: this.index
            }, this.value);
        }
        DomHandler.clearSelection();
    };
    TableRadioButton.prototype.onFocus = function () {
        DomHandler.addClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    };
    TableRadioButton.prototype.onBlur = function () {
        DomHandler.removeClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    };
    TableRadioButton.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    TableRadioButton.ctorParameters = function () { return [
        { type: Table },
        { type: TableService }
    ]; };
    __decorate([
        Input()
    ], TableRadioButton.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], TableRadioButton.prototype, "value", void 0);
    __decorate([
        Input()
    ], TableRadioButton.prototype, "index", void 0);
    __decorate([
        Input()
    ], TableRadioButton.prototype, "inputId", void 0);
    __decorate([
        Input()
    ], TableRadioButton.prototype, "name", void 0);
    __decorate([
        Input()
    ], TableRadioButton.prototype, "ariaLabel", void 0);
    __decorate([
        ViewChild('box')
    ], TableRadioButton.prototype, "boxViewChild", void 0);
    TableRadioButton = __decorate([
        Component({
            selector: 'p-tableRadioButton',
            template: "\n        <div class=\"ui-radiobutton ui-widget\" (click)=\"onClick($event)\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input type=\"radio\" [attr.id]=\"inputId\" [attr.name]=\"name\" [checked]=\"checked\" (focus)=\"onFocus()\" (blur)=\"onBlur()\"\n                [disabled]=\"disabled\" [attr.aria-label]=\"ariaLabel\">\n            </div>\n            <div #box [ngClass]=\"{'ui-radiobutton-box ui-widget ui-state-default':true,\n                'ui-state-active':checked, 'ui-state-disabled':disabled}\" role=\"radio\" [attr.aria-checked]=\"checked\">\n                <span class=\"ui-radiobutton-icon ui-clickable\" [ngClass]=\"{'pi pi-circle-on':checked}\"></span>\n            </div>\n        </div>\n    "
        })
    ], TableRadioButton);
    return TableRadioButton;
}());
export { TableRadioButton };
var TableCheckbox = /** @class */ (function () {
    function TableCheckbox(dt, tableService) {
        var _this = this;
        this.dt = dt;
        this.tableService = tableService;
        this.subscription = this.dt.tableService.selectionSource$.subscribe(function () {
            _this.checked = _this.dt.isSelected(_this.value);
        });
    }
    TableCheckbox.prototype.ngOnInit = function () {
        this.checked = this.dt.isSelected(this.value);
    };
    TableCheckbox.prototype.onClick = function (event) {
        if (!this.disabled) {
            this.dt.toggleRowWithCheckbox({
                originalEvent: event,
                rowIndex: this.index
            }, this.value);
        }
        DomHandler.clearSelection();
    };
    TableCheckbox.prototype.onFocus = function () {
        DomHandler.addClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    };
    TableCheckbox.prototype.onBlur = function () {
        DomHandler.removeClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    };
    TableCheckbox.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    TableCheckbox.ctorParameters = function () { return [
        { type: Table },
        { type: TableService }
    ]; };
    __decorate([
        Input()
    ], TableCheckbox.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], TableCheckbox.prototype, "value", void 0);
    __decorate([
        Input()
    ], TableCheckbox.prototype, "index", void 0);
    __decorate([
        Input()
    ], TableCheckbox.prototype, "inputId", void 0);
    __decorate([
        Input()
    ], TableCheckbox.prototype, "name", void 0);
    __decorate([
        Input()
    ], TableCheckbox.prototype, "required", void 0);
    __decorate([
        Input()
    ], TableCheckbox.prototype, "ariaLabel", void 0);
    __decorate([
        ViewChild('box')
    ], TableCheckbox.prototype, "boxViewChild", void 0);
    TableCheckbox = __decorate([
        Component({
            selector: 'p-tableCheckbox',
            template: "\n        <div class=\"ui-chkbox ui-widget\" (click)=\"onClick($event)\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input type=\"checkbox\" [attr.id]=\"inputId\" [attr.name]=\"name\" [checked]=\"checked\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" [disabled]=\"disabled\"\n                [attr.required]=\"required\" [attr.aria-label]=\"ariaLabel\">\n            </div>\n            <div #box [ngClass]=\"{'ui-chkbox-box ui-widget ui-state-default':true,\n                'ui-state-active':checked, 'ui-state-disabled':disabled}\" role=\"checkbox\" [attr.aria-checked]=\"checked\">\n                <span class=\"ui-chkbox-icon ui-clickable\" [ngClass]=\"{'pi pi-check':checked}\"></span>\n            </div>\n        </div>\n    "
        })
    ], TableCheckbox);
    return TableCheckbox;
}());
export { TableCheckbox };
var TableHeaderCheckbox = /** @class */ (function () {
    function TableHeaderCheckbox(dt, tableService) {
        var _this = this;
        this.dt = dt;
        this.tableService = tableService;
        this.valueChangeSubscription = this.dt.tableService.valueSource$.subscribe(function () {
            _this.checked = _this.updateCheckedState();
        });
        this.selectionChangeSubscription = this.dt.tableService.selectionSource$.subscribe(function () {
            _this.checked = _this.updateCheckedState();
        });
    }
    TableHeaderCheckbox.prototype.ngOnInit = function () {
        this.checked = this.updateCheckedState();
    };
    TableHeaderCheckbox.prototype.onClick = function (event) {
        if (!this.disabled) {
            if (this.dt.value && this.dt.value.length > 0) {
                this.dt.toggleRowsWithCheckbox(event, !this.checked);
            }
        }
        DomHandler.clearSelection();
    };
    TableHeaderCheckbox.prototype.onFocus = function () {
        DomHandler.addClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    };
    TableHeaderCheckbox.prototype.onBlur = function () {
        DomHandler.removeClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    };
    TableHeaderCheckbox.prototype.isDisabled = function () {
        return this.disabled || !this.dt.value || !this.dt.value.length;
    };
    TableHeaderCheckbox.prototype.ngOnDestroy = function () {
        if (this.selectionChangeSubscription) {
            this.selectionChangeSubscription.unsubscribe();
        }
        if (this.valueChangeSubscription) {
            this.valueChangeSubscription.unsubscribe();
        }
    };
    TableHeaderCheckbox.prototype.updateCheckedState = function () {
        if (this.dt.filteredValue) {
            var val = this.dt.filteredValue;
            return (val && val.length > 0 && this.dt.selection && this.dt.selection.length > 0 && this.isAllFilteredValuesChecked());
        }
        else {
            var val = this.dt.value;
            return (val && val.length > 0 && this.dt.selection && this.dt.selection.length > 0 && this.dt.selection.length === val.length);
        }
    };
    TableHeaderCheckbox.prototype.isAllFilteredValuesChecked = function () {
        var e_3, _a;
        if (!this.dt.filteredValue) {
            return false;
        }
        else {
            try {
                for (var _b = __values(this.dt.filteredValue), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var rowData = _c.value;
                    if (!this.dt.isSelected(rowData)) {
                        return false;
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
            return true;
        }
    };
    TableHeaderCheckbox.ctorParameters = function () { return [
        { type: Table },
        { type: TableService }
    ]; };
    __decorate([
        ViewChild('box')
    ], TableHeaderCheckbox.prototype, "boxViewChild", void 0);
    __decorate([
        Input()
    ], TableHeaderCheckbox.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], TableHeaderCheckbox.prototype, "inputId", void 0);
    __decorate([
        Input()
    ], TableHeaderCheckbox.prototype, "name", void 0);
    __decorate([
        Input()
    ], TableHeaderCheckbox.prototype, "ariaLabel", void 0);
    TableHeaderCheckbox = __decorate([
        Component({
            selector: 'p-tableHeaderCheckbox',
            template: "\n        <div class=\"ui-chkbox ui-widget\" (click)=\"onClick($event)\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #cb type=\"checkbox\" [attr.id]=\"inputId\" [attr.name]=\"name\" [checked]=\"checked\" (focus)=\"onFocus()\" (blur)=\"onBlur()\"\n                [disabled]=\"isDisabled()\" [attr.aria-label]=\"ariaLabel\">\n            </div>\n            <div #box [ngClass]=\"{'ui-chkbox-box ui-widget ui-state-default':true,\n                'ui-state-active':checked, 'ui-state-disabled': isDisabled()}\" role=\"checkbox\" [attr.aria-checked]=\"checked\">\n                <span class=\"ui-chkbox-icon ui-clickable\" [ngClass]=\"{'pi pi-check':checked}\"></span>\n            </div>\n        </div>\n    "
        })
    ], TableHeaderCheckbox);
    return TableHeaderCheckbox;
}());
export { TableHeaderCheckbox };
var ReorderableRowHandle = /** @class */ (function () {
    function ReorderableRowHandle(el) {
        this.el = el;
    }
    ReorderableRowHandle.prototype.ngAfterViewInit = function () {
        DomHandler.addClass(this.el.nativeElement, 'ui-table-reorderablerow-handle');
    };
    ReorderableRowHandle.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input("pReorderableRowHandle")
    ], ReorderableRowHandle.prototype, "index", void 0);
    ReorderableRowHandle = __decorate([
        Directive({
            selector: '[pReorderableRowHandle]'
        })
    ], ReorderableRowHandle);
    return ReorderableRowHandle;
}());
export { ReorderableRowHandle };
var ReorderableRow = /** @class */ (function () {
    function ReorderableRow(dt, el, zone) {
        this.dt = dt;
        this.el = el;
        this.zone = zone;
    }
    ReorderableRow.prototype.ngAfterViewInit = function () {
        if (this.isEnabled()) {
            this.el.nativeElement.droppable = true;
            this.bindEvents();
        }
    };
    ReorderableRow.prototype.bindEvents = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.mouseDownListener = _this.onMouseDown.bind(_this);
            _this.el.nativeElement.addEventListener('mousedown', _this.mouseDownListener);
            _this.dragStartListener = _this.onDragStart.bind(_this);
            _this.el.nativeElement.addEventListener('dragstart', _this.dragStartListener);
            _this.dragEndListener = _this.onDragEnd.bind(_this);
            _this.el.nativeElement.addEventListener('dragend', _this.dragEndListener);
            _this.dragOverListener = _this.onDragOver.bind(_this);
            _this.el.nativeElement.addEventListener('dragover', _this.dragOverListener);
            _this.dragLeaveListener = _this.onDragLeave.bind(_this);
            _this.el.nativeElement.addEventListener('dragleave', _this.dragLeaveListener);
        });
    };
    ReorderableRow.prototype.unbindEvents = function () {
        if (this.mouseDownListener) {
            document.removeEventListener('mousedown', this.mouseDownListener);
            this.mouseDownListener = null;
        }
        if (this.dragStartListener) {
            document.removeEventListener('dragstart', this.dragStartListener);
            this.dragStartListener = null;
        }
        if (this.dragEndListener) {
            document.removeEventListener('dragend', this.dragEndListener);
            this.dragEndListener = null;
        }
        if (this.dragOverListener) {
            document.removeEventListener('dragover', this.dragOverListener);
            this.dragOverListener = null;
        }
        if (this.dragLeaveListener) {
            document.removeEventListener('dragleave', this.dragLeaveListener);
            this.dragLeaveListener = null;
        }
    };
    ReorderableRow.prototype.onMouseDown = function (event) {
        if (DomHandler.hasClass(event.target, 'ui-table-reorderablerow-handle'))
            this.el.nativeElement.draggable = true;
        else
            this.el.nativeElement.draggable = false;
    };
    ReorderableRow.prototype.onDragStart = function (event) {
        this.dt.onRowDragStart(event, this.index);
    };
    ReorderableRow.prototype.onDragEnd = function (event) {
        this.dt.onRowDragEnd(event);
        this.el.nativeElement.draggable = false;
    };
    ReorderableRow.prototype.onDragOver = function (event) {
        this.dt.onRowDragOver(event, this.index, this.el.nativeElement);
        event.preventDefault();
    };
    ReorderableRow.prototype.onDragLeave = function (event) {
        this.dt.onRowDragLeave(event, this.el.nativeElement);
    };
    ReorderableRow.prototype.isEnabled = function () {
        return this.pReorderableRowDisabled !== true;
    };
    ReorderableRow.prototype.onDrop = function (event) {
        if (this.isEnabled() && this.dt.rowDragging) {
            this.dt.onRowDrop(event, this.el.nativeElement);
        }
        event.preventDefault();
    };
    ReorderableRow.ctorParameters = function () { return [
        { type: Table },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    __decorate([
        Input("pReorderableRow")
    ], ReorderableRow.prototype, "index", void 0);
    __decorate([
        Input()
    ], ReorderableRow.prototype, "pReorderableRowDisabled", void 0);
    __decorate([
        HostListener('drop', ['$event'])
    ], ReorderableRow.prototype, "onDrop", null);
    ReorderableRow = __decorate([
        Directive({
            selector: '[pReorderableRow]'
        })
    ], ReorderableRow);
    return ReorderableRow;
}());
export { ReorderableRow };
var TableModule = /** @class */ (function () {
    function TableModule() {
    }
    TableModule = __decorate([
        NgModule({
            imports: [CommonModule, PaginatorModule],
            exports: [Table, SharedModule, SortableColumn, SelectableRow, RowToggler, ContextMenuRow, ResizableColumn, ReorderableColumn, EditableColumn, CellEditor, SortIcon, TableRadioButton, TableCheckbox, TableHeaderCheckbox, ReorderableRowHandle, ReorderableRow, SelectableRowDblClick, EditableRow, InitEditableRow, SaveEditableRow, CancelEditableRow],
            declarations: [Table, SortableColumn, SelectableRow, RowToggler, ContextMenuRow, ResizableColumn, ReorderableColumn, EditableColumn, CellEditor, TableBody, ScrollableView, SortIcon, TableRadioButton, TableCheckbox, TableHeaderCheckbox, ReorderableRowHandle, ReorderableRow, SelectableRowDblClick, EditableRow, InitEditableRow, SaveEditableRow, CancelEditableRow]
        })
    ], TableModule);
    return TableModule;
}());
export { TableModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL3RhYmxlLyIsInNvdXJjZXMiOlsidGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUNqSSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BNLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTVDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUc1QztJQUFBO1FBRVksZUFBVSxHQUFHLElBQUksT0FBTyxFQUF1QixDQUFDO1FBQ2hELG9CQUFlLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNoQyxzQkFBaUIsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO1FBQ3ZDLGdCQUFXLEdB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QWUsRUFBQyxlQUFlLEVBQUMsaUJBQWlCLENBQUM7U0FDeFYsQ0FBQztPQUNXLFdBQVcsQ0FBSTtJQUFELGtCQUFDO0NBQUEsQUFBNUIsSUFBNEI7U0FBZixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIENvbXBvbmVudCwgSG9zdExpc3RlbmVyLCBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCwgRGlyZWN0aXZlLCBPcHRpb25hbCwgQWZ0ZXJDb250ZW50SW5pdCxcclxuICAgIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgQ29udGVudENoaWxkcmVuLCBUZW1wbGF0ZVJlZiwgUXVlcnlMaXN0LCBWaWV3Q2hpbGQsIE5nWm9uZSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBQcmltZVRlbXBsYXRlLCBTaGFyZWRNb2R1bGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XHJcbmltcG9ydCB7IFBhZ2luYXRvck1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcGFnaW5hdG9yJztcclxuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcclxuaW1wb3J0IHsgT2JqZWN0VXRpbHMgfSBmcm9tICdwcmltZW5nL3V0aWxzJztcclxuaW1wb3J0IHsgU29ydE1ldGEgfSBmcm9tICdwcmltZW5nL2FwaSc7XHJcbmltcG9ydCB7IFRhYmxlU3RhdGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XHJcbmltcG9ydCB7IEZpbHRlck1ldGFkYXRhIH0gZnJvbSAncHJpbWVuZy9hcGknO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJsb2NrYWJsZVVJIH0gZnJvbSAncHJpbWVuZy9hcGknO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgRmlsdGVyVXRpbHMgfSBmcm9tICdwcmltZW5nL3V0aWxzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFRhYmxlU2VydmljZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBzb3J0U291cmNlID0gbmV3IFN1YmplY3Q8U29ydE1ldGF8U29ydE1ldGFbXT4oKTtcclxuICAgIHByaXZhdGUgc2VsZWN0aW9uU291cmNlID0gbmV3IFN1YmplY3QoKTtcclxuICAgIHByaXZhdGUgY29udGV4dE1lbnVTb3VyY2UgPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcbiAgICBwcml2YXRlIHZhbHVlU291cmNlID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gICAgcHJpdmF0ZSB0b3RhbFJlY29yZHNTb3VyY2UgPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcbiAgICBwcml2YXRlIGNvbHVtbnNTb3VyY2UgPSBuZXcgU3ViamVjdCgpO1xyXG5cclxuICAgIHNvcnRTb3VyY2UkID0gdGhpcy5zb3J0U291cmNlLmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgc2VsZWN0aW9uU291cmNlJCA9IHRoaXMuc2VsZWN0aW9uU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgY29udGV4dE1lbnVTb3VyY2UkID0gdGhpcy5jb250ZXh0TWVudVNvdXJjZS5hc09ic2VydmFibGUoKTtcclxuICAgIHZhbHVlU291cmNlJCA9IHRoaXMudmFsdWVTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICB0b3RhbFJlY29yZHNTb3VyY2UkID0gdGhpcy50b3RhbFJlY29yZHNTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICBjb2x1bW5zU291cmNlJCA9IHRoaXMuY29sdW1uc1NvdXJjZS5hc09ic2VydmFibGUoKTtcclxuXHJcbiAgICBvblNvcnQoc29ydE1ldGE6IFNvcnRNZXRhfFNvcnRNZXRhW10pIHtcclxuICAgICAgICB0aGlzLnNvcnRTb3VyY2UubmV4dChzb3J0TWV0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25TZWxlY3Rpb25DaGFuZ2UoKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25Tb3VyY2UubmV4dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ29udGV4dE1lbnUoZGF0YTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0TWVudVNvdXJjZS5uZXh0KGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVmFsdWVDaGFuZ2UodmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMudmFsdWVTb3VyY2UubmV4dCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Ub3RhbFJlY29yZHNDaGFuZ2UodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMudG90YWxSZWNvcmRzU291cmNlLm5leHQodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ29sdW1uc0NoYW5nZShjb2x1bW5zOiBhbnlbXSkge1xyXG4gICAgICAgIHRoaXMuY29sdW1uc1NvdXJjZS5uZXh0KGNvbHVtbnMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC10YWJsZScsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgI2NvbnRhaW5lciBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCJcclxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS10YWJsZSB1aS13aWRnZXQnOiB0cnVlLCAndWktdGFibGUtcmVzcG9uc2l2ZSc6IHJlc3BvbnNpdmUsICd1aS10YWJsZS1yZXNpemFibGUnOiByZXNpemFibGVDb2x1bW5zLFxyXG4gICAgICAgICAgICAgICAgJ3VpLXRhYmxlLXJlc2l6YWJsZS1maXQnOiAocmVzaXphYmxlQ29sdW1ucyAmJiBjb2x1bW5SZXNpemVNb2RlID09PSAnZml0JyksXHJcbiAgICAgICAgICAgICAgICAndWktdGFibGUtaG92ZXJhYmxlLXJvd3MnOiAocm93SG92ZXJ8fHNlbGVjdGlvbk1vZGUpLCAndWktdGFibGUtYXV0by1sYXlvdXQnOiBhdXRvTGF5b3V0fVwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktdGFibGUtbG9hZGluZyB1aS13aWRnZXQtb3ZlcmxheVwiICpuZ0lmPVwibG9hZGluZyAmJiBzaG93TG9hZGVyXCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS10YWJsZS1sb2FkaW5nLWNvbnRlbnRcIiAqbmdJZj1cImxvYWRpbmcgJiYgc2hvd0xvYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgPGkgW2NsYXNzXT1cIid1aS10YWJsZS1sb2FkaW5nLWljb24gcGktc3BpbiAnICsgbG9hZGluZ0ljb25cIj48L2k+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiY2FwdGlvblRlbXBsYXRlXCIgY2xhc3M9XCJ1aS10YWJsZS1jYXB0aW9uIHVpLXdpZGdldC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjYXB0aW9uVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxwLXBhZ2luYXRvciBbcm93c109XCJyb3dzXCIgW2ZpcnN0XT1cImZpcnN0XCIgW3RvdGFsUmVjb3Jkc109XCJ0b3RhbFJlY29yZHNcIiBbcGFnZUxpbmtTaXplXT1cInBhZ2VMaW5rc1wiIHN0eWxlQ2xhc3M9XCJ1aS1wYWdpbmF0b3ItdG9wXCIgW2Fsd2F5c1Nob3ddPVwiYWx3YXlzU2hvd1BhZ2luYXRvclwiXHJcbiAgICAgICAgICAgICAgICAob25QYWdlQ2hhbmdlKT1cIm9uUGFnZUNoYW5nZSgkZXZlbnQpXCIgW3Jvd3NQZXJQYWdlT3B0aW9uc109XCJyb3dzUGVyUGFnZU9wdGlvbnNcIiAqbmdJZj1cInBhZ2luYXRvciAmJiAocGFnaW5hdG9yUG9zaXRpb24gPT09ICd0b3AnIHx8IHBhZ2luYXRvclBvc2l0aW9uID09J2JvdGgnKVwiXHJcbiAgICAgICAgICAgICAgICBbdGVtcGxhdGVMZWZ0XT1cInBhZ2luYXRvckxlZnRUZW1wbGF0ZVwiIFt0ZW1wbGF0ZVJpZ2h0XT1cInBhZ2luYXRvclJpZ2h0VGVtcGxhdGVcIiBbZHJvcGRvd25BcHBlbmRUb109XCJwYWdpbmF0b3JEcm9wZG93bkFwcGVuZFRvXCIgW2Ryb3Bkb3duU2Nyb2xsSGVpZ2h0XT1cInBhZ2luYXRvckRyb3Bkb3duU2Nyb2xsSGVpZ2h0XCJcclxuICAgICAgICAgICAgICAgIFtjdXJyZW50UGFnZVJlcG9ydFRlbXBsYXRlXT1cImN1cnJlbnRQYWdlUmVwb3J0VGVtcGxhdGVcIiBbc2hvd0N1cnJlbnRQYWdlUmVwb3J0XT1cInNob3dDdXJyZW50UGFnZVJlcG9ydFwiPjwvcC1wYWdpbmF0b3I+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktdGFibGUtd3JhcHBlclwiICpuZ0lmPVwiIXNjcm9sbGFibGVcIj5cclxuICAgICAgICAgICAgICAgIDx0YWJsZSByb2xlPVwiZ3JpZFwiICN0YWJsZSBbbmdDbGFzc109XCJ0YWJsZVN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJ0YWJsZVN0eWxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbEdyb3VwVGVtcGxhdGU7IGNvbnRleHQgeyRpbXBsaWNpdDogY29sdW1uc31cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgICAgICA8dGhlYWQgY2xhc3M9XCJ1aS10YWJsZS10aGVhZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaGVhZGVyVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IGNvbHVtbnN9XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICA8dGJvZHkgY2xhc3M9XCJ1aS10YWJsZS10Ym9keVwiIFtwVGFibGVCb2R5XT1cImNvbHVtbnNcIiBbcFRhYmxlQm9keVRlbXBsYXRlXT1cImJvZHlUZW1wbGF0ZVwiPjwvdGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRmb290ICpuZ0lmPVwiZm9vdGVyVGVtcGxhdGVcIiBjbGFzcz1cInVpLXRhYmxlLXRmb290XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJmb290ZXJUZW1wbGF0ZTsgY29udGV4dCB7JGltcGxpY2l0OiBjb2x1bW5zfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGZvb3Q+XHJcbiAgICAgICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS10YWJsZS1zY3JvbGxhYmxlLXdyYXBwZXJcIiAqbmdJZj1cInNjcm9sbGFibGVcIj5cclxuICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXRhYmxlLXNjcm9sbGFibGUtdmlldyB1aS10YWJsZS1mcm96ZW4tdmlld1wiICpuZ0lmPVwiZnJvemVuQ29sdW1uc3x8ZnJvemVuQm9keVRlbXBsYXRlXCIgW3BTY3JvbGxhYmxlVmlld109XCJmcm96ZW5Db2x1bW5zXCIgW2Zyb3plbl09XCJ0cnVlXCIgW25nU3R5bGVdPVwie3dpZHRoOiBmcm96ZW5XaWR0aH1cIiBbc2Nyb2xsSGVpZ2h0XT1cInNjcm9sbEhlaWdodFwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktdGFibGUtc2Nyb2xsYWJsZS12aWV3XCIgW3BTY3JvbGxhYmxlVmlld109XCJjb2x1bW5zXCIgW2Zyb3plbl09XCJmYWxzZVwiIFtzY3JvbGxIZWlnaHRdPVwic2Nyb2xsSGVpZ2h0XCIgW25nU3R5bGVdPVwie2xlZnQ6IGZyb3plbldpZHRoLCB3aWR0aDogJ2NhbGMoMTAwJSAtICcrZnJvemVuV2lkdGgrJyknfVwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxwLXBhZ2luYXRvciBbcm93c109XCJyb3dzXCIgW2ZpcnN0XT1cImZpcnN0XCIgW3RvdGFsUmVjb3Jkc109XCJ0b3RhbFJlY29yZHNcIiBbcGFnZUxpbmtTaXplXT1cInBhZ2VMaW5rc1wiIHN0eWxlQ2xhc3M9XCJ1aS1wYWdpbmF0b3ItYm90dG9tXCIgW2Fsd2F5c1Nob3ddPVwiYWx3YXlzU2hvd1BhZ2luYXRvclwiXHJcbiAgICAgICAgICAgICAgICAob25QYWdlQ2hhbmdlKT1cIm9uUGFnZUNoYW5nZSgkZXZlbnQpXCIgW3Jvd3NQZXJQYWdlT3B0aW9uc109XCJyb3dzUGVyUGFnZU9wdGlvbnNcIiAqbmdJZj1cInBhZ2luYXRvciAmJiAocGFnaW5hdG9yUG9zaXRpb24gPT09ICdib3R0b20nIHx8IHBhZ2luYXRvclBvc2l0aW9uID09J2JvdGgnKVwiXHJcbiAgICAgICAgICAgICAgICBbdGVtcGxhdGVMZWZ0XT1cInBhZ2luYXRvckxlZnRUZW1wbGF0ZVwiIFt0ZW1wbGF0ZVJpZ2h0XT1cInBhZ2luYXRvclJpZ2h0VGVtcGxhdGVcIiBbZHJvcGRvd25BcHBlbmRUb109XCJwYWdpbmF0b3JEcm9wZG93bkFwcGVuZFRvXCIgW2Ryb3Bkb3duU2Nyb2xsSGVpZ2h0XT1cInBhZ2luYXRvckRyb3Bkb3duU2Nyb2xsSGVpZ2h0XCJcclxuICAgICAgICAgICAgICAgIFtjdXJyZW50UGFnZVJlcG9ydFRlbXBsYXRlXT1cImN1cnJlbnRQYWdlUmVwb3J0VGVtcGxhdGVcIiBbc2hvd0N1cnJlbnRQYWdlUmVwb3J0XT1cInNob3dDdXJyZW50UGFnZVJlcG9ydFwiPjwvcC1wYWdpbmF0b3I+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cInN1bW1hcnlUZW1wbGF0ZVwiIGNsYXNzPVwidWktdGFibGUtc3VtbWFyeSB1aS13aWRnZXQtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwic3VtbWFyeVRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiAjcmVzaXplSGVscGVyIGNsYXNzPVwidWktY29sdW1uLXJlc2l6ZXItaGVscGVyIHVpLXN0YXRlLWhpZ2hsaWdodFwiIHN0eWxlPVwiZGlzcGxheTpub25lXCIgKm5nSWY9XCJyZXNpemFibGVDb2x1bW5zXCI+PC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8c3BhbiAjcmVvcmRlckluZGljYXRvclVwIGNsYXNzPVwicGkgcGktYXJyb3ctZG93biB1aS10YWJsZS1yZW9yZGVyLWluZGljYXRvci11cFwiIHN0eWxlPVwiZGlzcGxheTpub25lXCIgKm5nSWY9XCJyZW9yZGVyYWJsZUNvbHVtbnNcIj48L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuICNyZW9yZGVySW5kaWNhdG9yRG93biBjbGFzcz1cInBpIHBpLWFycm93LXVwIHVpLXRhYmxlLXJlb3JkZXItaW5kaWNhdG9yLWRvd25cIiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiICpuZ0lmPVwicmVvcmRlcmFibGVDb2x1bW5zXCI+PC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCxcclxuICAgIHByb3ZpZGVyczogW1RhYmxlU2VydmljZV0sXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcclxufSlcclxuZXhwb3J0IGNsYXNzIFRhYmxlIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBBZnRlckNvbnRlbnRJbml0LCBCbG9ja2FibGVVSSwgT25DaGFuZ2VzIHtcclxuXHJcbiAgICBASW5wdXQoKSBmcm96ZW5Db2x1bW5zOiBhbnlbXTtcclxuXHJcbiAgICBASW5wdXQoKSBmcm96ZW5WYWx1ZTogYW55W107XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgdGFibGVTdHlsZTogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIHRhYmxlU3R5bGVDbGFzczogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIHBhZ2luYXRvcjogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSBwYWdlTGlua3M6IG51bWJlciA9IDU7XHJcblxyXG4gICAgQElucHV0KCkgcm93c1BlclBhZ2VPcHRpb25zOiBhbnlbXTtcclxuXHJcbiAgICBASW5wdXQoKSBhbHdheXNTaG93UGFnaW5hdG9yOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBASW5wdXQoKSBwYWdpbmF0b3JQb3NpdGlvbjogc3RyaW5nID0gJ2JvdHRvbSc7XHJcblxyXG4gICAgQElucHV0KCkgcGFnaW5hdG9yRHJvcGRvd25BcHBlbmRUbzogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIHBhZ2luYXRvckRyb3Bkb3duU2Nyb2xsSGVpZ2h0OiBzdHJpbmcgPSAnMjAwcHgnO1xyXG5cclxuICAgIEBJbnB1dCgpIGN1cnJlbnRQYWdlUmVwb3J0VGVtcGxhdGU6IHN0cmluZyA9ICd7Y3VycmVudFBhZ2V9IG9mIHt0b3RhbFBhZ2VzfSc7XHJcblxyXG4gICAgQElucHV0KCkgc2hvd0N1cnJlbnRQYWdlUmVwb3J0OiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIGRlZmF1bHRTb3J0T3JkZXI6IG51bWJlciA9IDE7XHJcblxyXG4gICAgQElucHV0KCkgc29ydE1vZGU6IHN0cmluZyA9ICdzaW5nbGUnO1xyXG5cclxuICAgIEBJbnB1dCgpIHJlc2V0UGFnZU9uU29ydDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgQElucHV0KCkgc2VsZWN0aW9uTW9kZTogc3RyaW5nO1xyXG5cclxuICAgIEBPdXRwdXQoKSBzZWxlY3Rpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBJbnB1dCgpIGNvbnRleHRNZW51U2VsZWN0aW9uOiBhbnk7XHJcblxyXG4gICAgQE91dHB1dCgpIGNvbnRleHRNZW51U2VsZWN0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBASW5wdXQoKSBjb250ZXh0TWVudVNlbGVjdGlvbk1vZGU6IHN0cmluZyA9IFwic2VwYXJhdGVcIjtcclxuXHJcbiAgICBASW5wdXQoKSBkYXRhS2V5OiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgbWV0YUtleVNlbGVjdGlvbjogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSByb3dUcmFja0J5OiBGdW5jdGlvbiA9IChpbmRleDogbnVtYmVyLCBpdGVtOiBhbnkpID0+IGl0ZW07XHJcblxyXG4gICAgQElucHV0KCkgbGF6eTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIEBJbnB1dCgpIGxhenlMb2FkT25Jbml0OiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBASW5wdXQoKSBjb21wYXJlU2VsZWN0aW9uQnk6IHN0cmluZyA9ICdkZWVwRXF1YWxzJztcclxuXHJcbiAgICBASW5wdXQoKSBjc3ZTZXBhcmF0b3I6IHN0cmluZyA9ICcsJztcclxuXHJcbiAgICBASW5wdXQoKSBleHBvcnRGaWxlbmFtZTogc3RyaW5nID0gJ2Rvd25sb2FkJztcclxuXHJcbiAgICBASW5wdXQoKSBmaWx0ZXJzOiB7IFtzOiBzdHJpbmddOiBGaWx0ZXJNZXRhZGF0YTsgfSA9IHt9O1xyXG5cclxuICAgIEBJbnB1dCgpIGdsb2JhbEZpbHRlckZpZWxkczogc3RyaW5nW107XHJcblxyXG4gICAgQElucHV0KCkgZmlsdGVyRGVsYXk6IG51bWJlciA9IDMwMDtcclxuXHJcbiAgICBASW5wdXQoKSBmaWx0ZXJMb2NhbGU6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBleHBhbmRlZFJvd0tleXM6IHsgW3M6IHN0cmluZ106IGJvb2xlYW47IH0gPSB7fTtcclxuXHJcbiAgICBASW5wdXQoKSBlZGl0aW5nUm93S2V5czogeyBbczogc3RyaW5nXTogYm9vbGVhbjsgfSA9IHt9O1xyXG5cclxuICAgIEBJbnB1dCgpIHJvd0V4cGFuZE1vZGU6IHN0cmluZyA9ICdtdWx0aXBsZSc7XHJcblxyXG4gICAgQElucHV0KCkgc2Nyb2xsYWJsZTogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSBzY3JvbGxIZWlnaHQ6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSB2aXJ0dWFsU2Nyb2xsOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIHZpcnR1YWxTY3JvbGxEZWxheTogbnVtYmVyID0gMTUwO1xyXG5cclxuICAgIEBJbnB1dCgpIHZpcnR1YWxSb3dIZWlnaHQ6IG51bWJlciA9IDI4O1xyXG5cclxuICAgIEBJbnB1dCgpIGZyb3plbldpZHRoOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgcmVzcG9uc2l2ZTogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSBjb250ZXh0TWVudTogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIHJlc2l6YWJsZUNvbHVtbnM6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgY29sdW1uUmVzaXplTW9kZTogc3RyaW5nID0gJ2ZpdCc7XHJcblxyXG4gICAgQElucHV0KCkgcmVvcmRlcmFibGVDb2x1bW5zOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIGxvYWRpbmc6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgbG9hZGluZ0ljb246IHN0cmluZyA9ICdwaSBwaS1zcGlubmVyJztcclxuXHJcbiAgICBASW5wdXQoKSBzaG93TG9hZGVyOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBASW5wdXQoKSByb3dIb3ZlcjogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSBjdXN0b21Tb3J0OiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIGF1dG9MYXlvdXQ6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgZXhwb3J0RnVuY3Rpb247XHJcblxyXG4gICAgQElucHV0KCkgc3RhdGVLZXk6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBzdGF0ZVN0b3JhZ2U6IHN0cmluZyA9ICdzZXNzaW9uJztcclxuXHJcbiAgICBASW5wdXQoKSBlZGl0TW9kZTogc3RyaW5nID0gJ2NlbGwnO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvblJvd1NlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uUm93VW5zZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvblBhZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvblNvcnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkZpbHRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uTGF6eUxvYWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvblJvd0V4cGFuZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uUm93Q29sbGFwc2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkNvbnRleHRNZW51U2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25Db2xSZXNpemU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkNvbFJlb3JkZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvblJvd1Jlb3JkZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkVkaXRJbml0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25FZGl0Q29tcGxldGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkVkaXRDYW5jZWw6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkhlYWRlckNoZWNrYm94VG9nZ2xlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgc29ydEZ1bmN0aW9uOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgZmlyc3RDaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSByb3dzQ2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25TdGF0ZVNhdmU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvblN0YXRlUmVzdG9yZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnY29udGFpbmVyJykgY29udGFpbmVyVmlld0NoaWxkOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ3Jlc2l6ZUhlbHBlcicpIHJlc2l6ZUhlbHBlclZpZXdDaGlsZDogRWxlbWVudFJlZjtcclxuXHJcbiAgICBAVmlld0NoaWxkKCdyZW9yZGVySW5kaWNhdG9yVXAnKSByZW9yZGVySW5kaWNhdG9yVXBWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgQFZpZXdDaGlsZCgncmVvcmRlckluZGljYXRvckRvd24nKSByZW9yZGVySW5kaWNhdG9yRG93blZpZXdDaGlsZDogRWxlbWVudFJlZjtcclxuXHJcbiAgICBAVmlld0NoaWxkKCd0YWJsZScpIHRhYmxlVmlld0NoaWxkOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT47XHJcblxyXG4gICAgX3ZhbHVlOiBhbnlbXSA9IFtdO1xyXG5cclxuICAgIF9jb2x1bW5zOiBhbnlbXTtcclxuXHJcbiAgICBfdG90YWxSZWNvcmRzOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIF9maXJzdDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBfcm93czogbnVtYmVyO1xyXG5cclxuICAgIGZpbHRlcmVkVmFsdWU6IGFueVtdO1xyXG5cclxuICAgIGhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAgIGJvZHlUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgICBsb2FkaW5nQm9keVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAgIGNhcHRpb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgICBmcm96ZW5Sb3dzVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgZm9vdGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgc3VtbWFyeVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAgIGNvbEdyb3VwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgZXhwYW5kZWRSb3dUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgICBmcm96ZW5IZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgICBmcm96ZW5Cb2R5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgZnJvemVuRm9vdGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgZnJvemVuQ29sR3JvdXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgICBlbXB0eU1lc3NhZ2VUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgICBwYWdpbmF0b3JMZWZ0VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgcGFnaW5hdG9yUmlnaHRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgICBzZWxlY3Rpb25LZXlzOiBhbnkgPSB7fTtcclxuXHJcbiAgICBsYXN0UmVzaXplckhlbHBlclg6IG51bWJlcjtcclxuXHJcbiAgICByZW9yZGVySWNvbldpZHRoOiBudW1iZXI7XHJcblxyXG4gICAgcmVvcmRlckljb25IZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgICBkcmFnZ2VkQ29sdW1uOiBhbnk7XHJcblxyXG4gICAgZHJhZ2dlZFJvd0luZGV4OiBudW1iZXI7XHJcblxyXG4gICAgZHJvcHBlZFJvd0luZGV4OiBudW1iZXI7XHJcblxyXG4gICAgcm93RHJhZ2dpbmc6IGJvb2xlYW47XHJcblxyXG4gICAgZHJvcFBvc2l0aW9uOiBudW1iZXI7XHJcblxyXG4gICAgZWRpdGluZ0NlbGw6IEVsZW1lbnQ7XHJcblxyXG4gICAgZWRpdGluZ0NlbGxEYXRhOiBhbnk7XHJcblxyXG4gICAgZWRpdGluZ0NlbGxGaWVsZDogYW55O1xyXG5cclxuICAgIGVkaXRpbmdDZWxsUm93SW5kZXg6IG51bWJlcjtcclxuXHJcbiAgICBlZGl0aW5nQ2VsbENsaWNrOiBib29sZWFuO1xyXG5cclxuICAgIGRvY3VtZW50RWRpdExpc3RlbmVyOiBhbnk7XHJcblxyXG4gICAgX211bHRpU29ydE1ldGE6IFNvcnRNZXRhW107XHJcblxyXG4gICAgX3NvcnRGaWVsZDogc3RyaW5nO1xyXG5cclxuICAgIF9zb3J0T3JkZXI6IG51bWJlciA9IDE7XHJcblxyXG4gICAgdmlydHVhbFNjcm9sbFRpbWVyOiBhbnk7XHJcblxyXG4gICAgdmlydHVhbFNjcm9sbENhbGxiYWNrOiBGdW5jdGlvbjtcclxuXHJcbiAgICBwcmV2ZW50U2VsZWN0aW9uU2V0dGVyUHJvcGFnYXRpb246IGJvb2xlYW47XHJcblxyXG4gICAgX3NlbGVjdGlvbjogYW55O1xyXG5cclxuICAgIGFuY2hvclJvd0luZGV4OiBudW1iZXI7XHJcblxyXG4gICAgcmFuZ2VSb3dJbmRleDogbnVtYmVyO1xyXG5cclxuICAgIGZpbHRlclRpbWVvdXQ6IGFueTtcclxuXHJcbiAgICBpbml0aWFsaXplZDogYm9vbGVhbjtcclxuXHJcbiAgICByb3dUb3VjaGVkOiBib29sZWFuO1xyXG5cclxuICAgIHJlc3RvcmluZ1NvcnQ6IGJvb2xlYW47XHJcblxyXG4gICAgcmVzdG9yaW5nRmlsdGVyOiBib29sZWFuO1xyXG5cclxuICAgIHN0YXRlUmVzdG9yZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgY29sdW1uT3JkZXJTdGF0ZVJlc3RvcmVkOiBib29sZWFuO1xyXG5cclxuICAgIGNvbHVtbldpZHRoc1N0YXRlOiBzdHJpbmc7XHJcblxyXG4gICAgdGFibGVXaWR0aFN0YXRlOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgem9uZTogTmdab25lLCBwdWJsaWMgdGFibGVTZXJ2aWNlOiBUYWJsZVNlcnZpY2UsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubGF6eSAmJiB0aGlzLmxhenlMb2FkT25Jbml0KSB7XHJcbiAgICAgICAgICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHRoaXMuY3JlYXRlTGF6eUxvYWRNZXRhZGF0YSgpKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucmVzdG9yaW5nRmlsdGVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RvcmluZ0ZpbHRlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdjYXB0aW9uJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcHRpb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdoZWFkZXInOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnYm9keSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2R5VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnbG9hZGluZ2JvZHknOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZ0JvZHlUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdmb290ZXInOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9vdGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnc3VtbWFyeSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdW1tYXJ5VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnY29sZ3JvdXAnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sR3JvdXBUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdyb3dleHBhbnNpb24nOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kZWRSb3dUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdmcm96ZW5yb3dzJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyb3plblJvd3NUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdmcm96ZW5oZWFkZXInOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJvemVuSGVhZGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnZnJvemVuYm9keSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcm96ZW5Cb2R5VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnZnJvemVuZm9vdGVyJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyb3plbkZvb3RlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ2Zyb3plbmNvbGdyb3VwJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyb3plbkNvbEdyb3VwVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnZW1wdHltZXNzYWdlJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtcHR5TWVzc2FnZVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ3BhZ2luYXRvcmxlZnQnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFnaW5hdG9yTGVmdFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ3BhZ2luYXRvcnJpZ2h0JzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2luYXRvclJpZ2h0VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNTdGF0ZWZ1bCgpICYmIHRoaXMucmVzaXphYmxlQ29sdW1ucykge1xyXG4gICAgICAgICAgICB0aGlzLnJlc3RvcmVDb2x1bW5XaWR0aHMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoc2ltcGxlQ2hhbmdlOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS52YWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1N0YXRlZnVsKCkgJiYgIXRoaXMuc3RhdGVSZXN0b3JlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXN0b3JlU3RhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBzaW1wbGVDaGFuZ2UudmFsdWUuY3VycmVudFZhbHVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmxhenkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG90YWxSZWNvcmRzID0gKHRoaXMuX3ZhbHVlID8gdGhpcy5fdmFsdWUubGVuZ3RoIDogMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc29ydE1vZGUgPT0gJ3NpbmdsZScgJiYgdGhpcy5zb3J0RmllbGQpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3J0U2luZ2xlKCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnNvcnRNb2RlID09ICdtdWx0aXBsZScgJiYgdGhpcy5tdWx0aVNvcnRNZXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc29ydE11bHRpcGxlKCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmhhc0ZpbHRlcigpKSAgICAgICAvL3NvcnQgYWxyZWFkeSBmaWx0ZXJzXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmlsdGVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZpcnR1YWxTY3JvbGwgJiYgdGhpcy52aXJ0dWFsU2Nyb2xsQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlydHVhbFNjcm9sbENhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMudGFibGVTZXJ2aWNlLm9uVmFsdWVDaGFuZ2Uoc2ltcGxlQ2hhbmdlLnZhbHVlLmN1cnJlbnRWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLmNvbHVtbnMpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29sdW1ucyA9IHNpbXBsZUNoYW5nZS5jb2x1bW5zLmN1cnJlbnRWYWx1ZTtcclxuICAgICAgICAgICAgdGhpcy50YWJsZVNlcnZpY2Uub25Db2x1bW5zQ2hhbmdlKHNpbXBsZUNoYW5nZS5jb2x1bW5zLmN1cnJlbnRWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fY29sdW1ucyAmJiB0aGlzLmlzU3RhdGVmdWwoKSAmJiB0aGlzLnJlb3JkZXJhYmxlQ29sdW1ucyAmJiAhdGhpcy5jb2x1bW5PcmRlclN0YXRlUmVzdG9yZWQgKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RvcmVDb2x1bW5PcmRlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLnNvcnRGaWVsZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zb3J0RmllbGQgPSBzaW1wbGVDaGFuZ2Uuc29ydEZpZWxkLmN1cnJlbnRWYWx1ZTtcclxuXHJcbiAgICAgICAgICAgIC8vYXZvaWQgdHJpZ2dlcmluZyBsYXp5IGxvYWQgcHJpb3IgdG8gbGF6eSBpbml0aWFsaXphdGlvbiBhdCBvbkluaXRcclxuICAgICAgICAgICAgaWYgKCAhdGhpcy5sYXp5IHx8IHRoaXMuaW5pdGlhbGl6ZWQgKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zb3J0TW9kZSA9PT0gJ3NpbmdsZScpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnRTaW5nbGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS5zb3J0T3JkZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fc29ydE9yZGVyID0gc2ltcGxlQ2hhbmdlLnNvcnRPcmRlci5jdXJyZW50VmFsdWU7XHJcblxyXG4gICAgICAgICAgICAvL2F2b2lkIHRyaWdnZXJpbmcgbGF6eSBsb2FkIHByaW9yIHRvIGxhenkgaW5pdGlhbGl6YXRpb24gYXQgb25Jbml0XHJcbiAgICAgICAgICAgIGlmICggIXRoaXMubGF6eSB8fCB0aGlzLmluaXRpYWxpemVkICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc29ydE1vZGUgPT09ICdzaW5nbGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3J0U2luZ2xlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2UubXVsdGlTb3J0TWV0YSkge1xyXG4gICAgICAgICAgICB0aGlzLl9tdWx0aVNvcnRNZXRhID0gc2ltcGxlQ2hhbmdlLm11bHRpU29ydE1ldGEuY3VycmVudFZhbHVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zb3J0TW9kZSA9PT0gJ211bHRpcGxlJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0TXVsdGlwbGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS5zZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gc2ltcGxlQ2hhbmdlLnNlbGVjdGlvbi5jdXJyZW50VmFsdWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMucHJldmVudFNlbGVjdGlvblNldHRlclByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGlvbktleXMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFibGVTZXJ2aWNlLm9uU2VsZWN0aW9uQ2hhbmdlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5wcmV2ZW50U2VsZWN0aW9uU2V0dGVyUHJvcGFnYXRpb24gPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgZ2V0IHZhbHVlKCk6IGFueVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgICB9XHJcbiAgICBzZXQgdmFsdWUodmFsOiBhbnlbXSkge1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIGdldCBjb2x1bW5zKCk6IGFueVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29sdW1ucztcclxuICAgIH1cclxuICAgIHNldCBjb2x1bW5zKGNvbHM6IGFueVtdKSB7XHJcbiAgICAgICAgdGhpcy5fY29sdW1ucyA9IGNvbHM7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgZ2V0IGZpcnN0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpcnN0O1xyXG4gICAgfVxyXG4gICAgc2V0IGZpcnN0KHZhbDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fZmlyc3QgPSB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCkgZ2V0IHJvd3MoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcm93cztcclxuICAgIH1cclxuICAgIHNldCByb3dzKHZhbDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fcm93cyA9IHZhbDtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBnZXQgdG90YWxSZWNvcmRzKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RvdGFsUmVjb3JkcztcclxuICAgIH1cclxuICAgIHNldCB0b3RhbFJlY29yZHModmFsOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl90b3RhbFJlY29yZHMgPSB2YWw7XHJcbiAgICAgICAgdGhpcy50YWJsZVNlcnZpY2Uub25Ub3RhbFJlY29yZHNDaGFuZ2UodGhpcy5fdG90YWxSZWNvcmRzKTtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBnZXQgc29ydEZpZWxkKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NvcnRGaWVsZDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgc29ydEZpZWxkKHZhbDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fc29ydEZpZWxkID0gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIGdldCBzb3J0T3JkZXIoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc29ydE9yZGVyO1xyXG4gICAgfVxyXG4gICAgc2V0IHNvcnRPcmRlcih2YWw6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX3NvcnRPcmRlciA9IHZhbDtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBnZXQgbXVsdGlTb3J0TWV0YSgpOiBTb3J0TWV0YVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbXVsdGlTb3J0TWV0YTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbXVsdGlTb3J0TWV0YSh2YWw6IFNvcnRNZXRhW10pIHtcclxuICAgICAgICB0aGlzLl9tdWx0aVNvcnRNZXRhID0gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIGdldCBzZWxlY3Rpb24oKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBzZWxlY3Rpb24odmFsOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlU2VsZWN0aW9uS2V5cygpIHtcclxuICAgICAgICBpZiAodGhpcy5kYXRhS2V5ICYmIHRoaXMuX3NlbGVjdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXMgPSB7fTtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5fc2VsZWN0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBkYXRhIG9mIHRoaXMuX3NlbGVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5c1tTdHJpbmcoT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShkYXRhLCB0aGlzLmRhdGFLZXkpKV0gPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25LZXlzW1N0cmluZyhPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHRoaXMuX3NlbGVjdGlvbiwgdGhpcy5kYXRhS2V5KSldID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblBhZ2VDaGFuZ2UoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmZpcnN0ID0gZXZlbnQuZmlyc3Q7XHJcbiAgICAgICAgdGhpcy5yb3dzID0gZXZlbnQucm93cztcclxuXHJcbiAgICAgICAgaWYgKHRoaXMubGF6eSkge1xyXG4gICAgICAgICAgICB0aGlzLm9uTGF6eUxvYWQuZW1pdCh0aGlzLmNyZWF0ZUxhenlMb2FkTWV0YWRhdGEoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm9uUGFnZS5lbWl0KHtcclxuICAgICAgICAgICAgZmlyc3Q6IHRoaXMuZmlyc3QsXHJcbiAgICAgICAgICAgIHJvd3M6IHRoaXMucm93c1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmZpcnN0Q2hhbmdlLmVtaXQodGhpcy5maXJzdCk7XHJcbiAgICAgICAgdGhpcy5yb3dzQ2hhbmdlLmVtaXQodGhpcy5yb3dzKTtcclxuICAgICAgICB0aGlzLnRhYmxlU2VydmljZS5vblZhbHVlQ2hhbmdlKHRoaXMudmFsdWUpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc1N0YXRlZnVsKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYW5jaG9yUm93SW5kZXggPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHNvcnQoZXZlbnQpIHtcclxuICAgICAgICBsZXQgb3JpZ2luYWxFdmVudCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQ7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNvcnRNb2RlID09PSAnc2luZ2xlJykge1xyXG4gICAgICAgICAgICB0aGlzLl9zb3J0T3JkZXIgPSAodGhpcy5zb3J0RmllbGQgPT09IGV2ZW50LmZpZWxkKSA/IHRoaXMuc29ydE9yZGVyICogLTEgOiB0aGlzLmRlZmF1bHRTb3J0T3JkZXI7XHJcbiAgICAgICAgICAgIHRoaXMuX3NvcnRGaWVsZCA9IGV2ZW50LmZpZWxkO1xyXG4gICAgICAgICAgICB0aGlzLnNvcnRTaW5nbGUoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJlc2V0UGFnZU9uU29ydCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZmlyc3QgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdENoYW5nZS5lbWl0KHRoaXMuX2ZpcnN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zb3J0TW9kZSA9PT0gJ211bHRpcGxlJykge1xyXG4gICAgICAgICAgICBsZXQgbWV0YUtleSA9IG9yaWdpbmFsRXZlbnQubWV0YUtleSB8fCBvcmlnaW5hbEV2ZW50LmN0cmxLZXk7XHJcbiAgICAgICAgICAgIGxldCBzb3J0TWV0YSA9IHRoaXMuZ2V0U29ydE1ldGEoZXZlbnQuZmllbGQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNvcnRNZXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW1ldGFLZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tdWx0aVNvcnRNZXRhID0gW3sgZmllbGQ6IGV2ZW50LmZpZWxkLCBvcmRlcjogc29ydE1ldGEub3JkZXIgKiAtMSB9XTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucmVzZXRQYWdlT25Tb3J0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpcnN0ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdENoYW5nZS5lbWl0KHRoaXMuX2ZpcnN0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3J0TWV0YS5vcmRlciA9IHNvcnRNZXRhLm9yZGVyICogLTE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW1ldGFLZXkgfHwgIXRoaXMubXVsdGlTb3J0TWV0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX211bHRpU29ydE1ldGEgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucmVzZXRQYWdlT25Tb3J0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpcnN0ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdENoYW5nZS5lbWl0KHRoaXMuX2ZpcnN0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tdWx0aVNvcnRNZXRhLnB1c2goeyBmaWVsZDogZXZlbnQuZmllbGQsIG9yZGVyOiB0aGlzLmRlZmF1bHRTb3J0T3JkZXIgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc29ydE11bHRpcGxlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5pc1N0YXRlZnVsKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYW5jaG9yUm93SW5kZXggPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHNvcnRTaW5nbGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc29ydEZpZWxkICYmIHRoaXMuc29ydE9yZGVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJlc3RvcmluZ1NvcnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdG9yaW5nU29ydCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5sYXp5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTGF6eUxvYWQuZW1pdCh0aGlzLmNyZWF0ZUxhenlMb2FkTWV0YWRhdGEoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VzdG9tU29ydCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc29ydEZ1bmN0aW9uLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlOiB0aGlzLnNvcnRNb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZDogdGhpcy5zb3J0RmllbGQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyOiB0aGlzLnNvcnRPcmRlclxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZS5zb3J0KChkYXRhMSwgZGF0YTIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlMSA9IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEoZGF0YTEsIHRoaXMuc29ydEZpZWxkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlMiA9IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEoZGF0YTIsIHRoaXMuc29ydEZpZWxkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUxID09IG51bGwgJiYgdmFsdWUyICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUxICE9IG51bGwgJiYgdmFsdWUyID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh2YWx1ZTEgPT0gbnVsbCAmJiB2YWx1ZTIgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZTEgPT09ICdzdHJpbmcnICYmIHR5cGVvZiB2YWx1ZTIgPT09ICdzdHJpbmcnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdmFsdWUxLmxvY2FsZUNvbXBhcmUodmFsdWUyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gKHZhbHVlMSA8IHZhbHVlMikgPyAtMSA6ICh2YWx1ZTEgPiB2YWx1ZTIpID8gMSA6IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuc29ydE9yZGVyICogcmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNGaWx0ZXIoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpbHRlcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgc29ydE1ldGE6IFNvcnRNZXRhID0ge1xyXG4gICAgICAgICAgICAgICAgZmllbGQ6IHRoaXMuc29ydEZpZWxkLFxyXG4gICAgICAgICAgICAgICAgb3JkZXI6IHRoaXMuc29ydE9yZGVyXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLm9uU29ydC5lbWl0KHNvcnRNZXRhKTtcclxuICAgICAgICAgICAgdGhpcy50YWJsZVNlcnZpY2Uub25Tb3J0KHNvcnRNZXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc29ydE11bHRpcGxlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm11bHRpU29ydE1ldGEpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubGF6eSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkxhenlMb2FkLmVtaXQodGhpcy5jcmVhdGVMYXp5TG9hZE1ldGFkYXRhKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1c3RvbVNvcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnRGdW5jdGlvbi5lbWl0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy52YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZTogdGhpcy5zb3J0TW9kZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGlTb3J0TWV0YTogdGhpcy5tdWx0aVNvcnRNZXRhXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlLnNvcnQoKGRhdGExLCBkYXRhMikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tdWx0aXNvcnRGaWVsZChkYXRhMSwgZGF0YTIsIHRoaXMubXVsdGlTb3J0TWV0YSwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzRmlsdGVyKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9maWx0ZXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5vblNvcnQuZW1pdCh7XHJcbiAgICAgICAgICAgICAgICBtdWx0aXNvcnRtZXRhOiB0aGlzLm11bHRpU29ydE1ldGFcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMudGFibGVTZXJ2aWNlLm9uU29ydCh0aGlzLm11bHRpU29ydE1ldGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtdWx0aXNvcnRGaWVsZChkYXRhMSwgZGF0YTIsIG11bHRpU29ydE1ldGEsIGluZGV4KSB7XHJcbiAgICAgICAgbGV0IHZhbHVlMSA9IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEoZGF0YTEsIG11bHRpU29ydE1ldGFbaW5kZXhdLmZpZWxkKTtcclxuICAgICAgICBsZXQgdmFsdWUyID0gT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShkYXRhMiwgbXVsdGlTb3J0TWV0YVtpbmRleF0uZmllbGQpO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAodmFsdWUxID09IG51bGwgJiYgdmFsdWUyICE9IG51bGwpXHJcbiAgICAgICAgICAgIHJlc3VsdCA9IC0xO1xyXG4gICAgICAgIGVsc2UgaWYgKHZhbHVlMSAhPSBudWxsICYmIHZhbHVlMiA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXN1bHQgPSAxO1xyXG4gICAgICAgIGVsc2UgaWYgKHZhbHVlMSA9PSBudWxsICYmIHZhbHVlMiA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXN1bHQgPSAwO1xyXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZTEgPT0gJ3N0cmluZycgfHwgdmFsdWUxIGluc3RhbmNlb2YgU3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZTEubG9jYWxlQ29tcGFyZSAmJiAodmFsdWUxICE9IHZhbHVlMikpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAobXVsdGlTb3J0TWV0YVtpbmRleF0ub3JkZXIgKiB2YWx1ZTEubG9jYWxlQ29tcGFyZSh2YWx1ZTIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gKHZhbHVlMSA8IHZhbHVlMikgPyAtMSA6IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodmFsdWUxID09IHZhbHVlMikge1xyXG4gICAgICAgICAgICByZXR1cm4gKG11bHRpU29ydE1ldGEubGVuZ3RoIC0gMSkgPiAoaW5kZXgpID8gKHRoaXMubXVsdGlzb3J0RmllbGQoZGF0YTEsIGRhdGEyLCBtdWx0aVNvcnRNZXRhLCBpbmRleCArIDEpKSA6IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gKG11bHRpU29ydE1ldGFbaW5kZXhdLm9yZGVyICogcmVzdWx0KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTb3J0TWV0YShmaWVsZDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubXVsdGlTb3J0TWV0YSAmJiB0aGlzLm11bHRpU29ydE1ldGEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tdWx0aVNvcnRNZXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tdWx0aVNvcnRNZXRhW2ldLmZpZWxkID09PSBmaWVsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm11bHRpU29ydE1ldGFbaV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlzU29ydGVkKGZpZWxkOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5zb3J0TW9kZSA9PT0gJ3NpbmdsZScpIHtcclxuICAgICAgICAgICAgcmV0dXJuICh0aGlzLnNvcnRGaWVsZCAmJiB0aGlzLnNvcnRGaWVsZCA9PT0gZmllbGQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnNvcnRNb2RlID09PSAnbXVsdGlwbGUnKSB7XHJcbiAgICAgICAgICAgIGxldCBzb3J0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubXVsdGlTb3J0TWV0YSnCoHtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLm11bHRpU29ydE1ldGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tdWx0aVNvcnRNZXRhW2ldLmZpZWxkID09IGZpZWxkKcKge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHNvcnRlZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlUm93Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBsZXQgdGFyZ2V0ID0gKDxIVE1MRWxlbWVudD4gZXZlbnQub3JpZ2luYWxFdmVudC50YXJnZXQpO1xyXG4gICAgICAgIGxldCB0YXJnZXROb2RlID0gdGFyZ2V0Lm5vZGVOYW1lO1xyXG4gICAgICAgIGxldCBwYXJlbnROb2RlID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQgJiYgdGFyZ2V0LnBhcmVudEVsZW1lbnQubm9kZU5hbWU7XHJcbiAgICAgICAgaWYgKHRhcmdldE5vZGUgPT0gJ0lOUFVUJyB8fCB0YXJnZXROb2RlID09ICdCVVRUT04nIHx8IHRhcmdldE5vZGUgPT0gJ0EnIHx8XHJcbiAgICAgICAgICAgIHBhcmVudE5vZGUgPT0gJ0lOUFVUJyB8fCBwYXJlbnROb2RlID09ICdCVVRUT04nIHx8IHBhcmVudE5vZGUgPT0gJ0EnIHx8XHJcbiAgICAgICAgICAgIChEb21IYW5kbGVyLmhhc0NsYXNzKGV2ZW50Lm9yaWdpbmFsRXZlbnQudGFyZ2V0LCAndWktY2xpY2thYmxlJykpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbk1vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wcmV2ZW50U2VsZWN0aW9uU2V0dGVyUHJvcGFnYXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc011bHRpcGxlU2VsZWN0aW9uTW9kZSgpICYmIGV2ZW50Lm9yaWdpbmFsRXZlbnQuc2hpZnRLZXkgJiYgdGhpcy5hbmNob3JSb3dJbmRleCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmNsZWFyU2VsZWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yYW5nZVJvd0luZGV4ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uUmFuZ2UoZXZlbnQub3JpZ2luYWxFdmVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5yYW5nZVJvd0luZGV4ID0gZXZlbnQucm93SW5kZXg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFJhbmdlKGV2ZW50Lm9yaWdpbmFsRXZlbnQsIGV2ZW50LnJvd0luZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCByb3dEYXRhID0gZXZlbnQucm93RGF0YTtcclxuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMuaXNTZWxlY3RlZChyb3dEYXRhKTtcclxuICAgICAgICAgICAgICAgIGxldCBtZXRhU2VsZWN0aW9uID0gdGhpcy5yb3dUb3VjaGVkID8gZmFsc2UgOiB0aGlzLm1ldGFLZXlTZWxlY3Rpb247XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YUtleVZhbHVlID0gdGhpcy5kYXRhS2V5ID8gU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocm93RGF0YSwgdGhpcy5kYXRhS2V5KSkgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmNob3JSb3dJbmRleCA9IGV2ZW50LnJvd0luZGV4O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yYW5nZVJvd0luZGV4ID0gZXZlbnQucm93SW5kZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1ldGFTZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWV0YUtleSA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQubWV0YUtleXx8ZXZlbnQub3JpZ2luYWxFdmVudC5jdHJsS2V5O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQgJiYgbWV0YUtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZVNlbGVjdGlvbk1vZGUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5cyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdChudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3Rpb25JbmRleCA9IHRoaXMuZmluZEluZGV4SW5TZWxlY3Rpb24ocm93RGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbi5maWx0ZXIoKHZhbCxpKSA9PiBpIT1zZWxlY3Rpb25JbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhS2V5VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5zZWxlY3Rpb25LZXlzW2RhdGFLZXlWYWx1ZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25Sb3dVbnNlbGVjdC5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudC5vcmlnaW5hbEV2ZW50LCBkYXRhOiByb3dEYXRhLCB0eXBlOiAncm93J30pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb25Nb2RlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IHJvd0RhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHJvd0RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFLZXlWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5cyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5c1tkYXRhS2V5VmFsdWVdID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb25Nb2RlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZXRhS2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb258fFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25LZXlzID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gWy4uLnRoaXMuc2VsZWN0aW9uLHJvd0RhdGFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YUtleVZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25LZXlzW2RhdGFLZXlWYWx1ZV0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uUm93U2VsZWN0LmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50Lm9yaWdpbmFsRXZlbnQsIGRhdGE6IHJvd0RhdGEsIHR5cGU6ICdyb3cnLCBpbmRleDogZXZlbnQucm93SW5kZXh9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnc2luZ2xlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXMgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblJvd1Vuc2VsZWN0LmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudC5vcmlnaW5hbEV2ZW50LCBkYXRhOiByb3dEYXRhLCB0eXBlOiAncm93JyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IHJvd0RhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25Sb3dTZWxlY3QuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50Lm9yaWdpbmFsRXZlbnQsIGRhdGE6IHJvd0RhdGEsIHR5cGU6ICdyb3cnLCBpbmRleDogZXZlbnQucm93SW5kZXggfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YUtleVZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25LZXlzID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25LZXlzW2RhdGFLZXlWYWx1ZV0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ211bHRpcGxlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3Rpb25JbmRleCA9IHRoaXMuZmluZEluZGV4SW5TZWxlY3Rpb24ocm93RGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbi5maWx0ZXIoKHZhbCwgaSkgPT4gaSAhPSBzZWxlY3Rpb25JbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25Sb3dVbnNlbGVjdC5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQub3JpZ2luYWxFdmVudCwgZGF0YTogcm93RGF0YSwgdHlwZTogJ3JvdycgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YUtleVZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuc2VsZWN0aW9uS2V5c1tkYXRhS2V5VmFsdWVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24gPyBbLi4udGhpcy5zZWxlY3Rpb24sIHJvd0RhdGFdIDogW3Jvd0RhdGFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uUm93U2VsZWN0LmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudC5vcmlnaW5hbEV2ZW50LCBkYXRhOiByb3dEYXRhLCB0eXBlOiAncm93JywgaW5kZXg6IGV2ZW50LnJvd0luZGV4IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFLZXlWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5c1tkYXRhS2V5VmFsdWVdID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy50YWJsZVNlcnZpY2Uub25TZWxlY3Rpb25DaGFuZ2UoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU3RhdGVmdWwoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yb3dUb3VjaGVkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlUm93VG91Y2hFbmQoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLnJvd1RvdWNoZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVJvd1JpZ2h0Q2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5jb250ZXh0TWVudSkge1xyXG4gICAgICAgICAgICBjb25zdCByb3dEYXRhID0gZXZlbnQucm93RGF0YTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRleHRNZW51U2VsZWN0aW9uTW9kZSA9PT0gJ3NlcGFyYXRlJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0TWVudVNlbGVjdGlvbiA9IHJvd0RhdGE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHRNZW51U2VsZWN0aW9uQ2hhbmdlLmVtaXQocm93RGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29udGV4dE1lbnVTZWxlY3QuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQub3JpZ2luYWxFdmVudCwgZGF0YTogcm93RGF0YSwgaW5kZXg6IGV2ZW50LnJvd0luZGV4fSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHRNZW51LnNob3coZXZlbnQub3JpZ2luYWxFdmVudCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhYmxlU2VydmljZS5vbkNvbnRleHRNZW51KHJvd0RhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuY29udGV4dE1lbnVTZWxlY3Rpb25Nb2RlID09PSAnam9pbnQnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByZXZlbnRTZWxlY3Rpb25TZXR0ZXJQcm9wYWdhdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSB0aGlzLmlzU2VsZWN0ZWQocm93RGF0YSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YUtleVZhbHVlID0gdGhpcy5kYXRhS2V5ID8gU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocm93RGF0YSwgdGhpcy5kYXRhS2V5KSkgOiBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZVNlbGVjdGlvbk1vZGUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IHJvd0RhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQocm93RGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaXNNdWx0aXBsZVNlbGVjdGlvbk1vZGUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IFtyb3dEYXRhXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YUtleVZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5c1tkYXRhS2V5VmFsdWVdID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0TWVudS5zaG93KGV2ZW50Lm9yaWdpbmFsRXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNvbnRleHRNZW51U2VsZWN0LmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBkYXRhOiByb3dEYXRhLCBpbmRleDogZXZlbnQucm93SW5kZXh9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RSYW5nZShldmVudDogTW91c2VFdmVudCwgcm93SW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGxldCByYW5nZVN0YXJ0LCByYW5nZUVuZDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYW5jaG9yUm93SW5kZXggPiByb3dJbmRleCkge1xyXG4gICAgICAgICAgICByYW5nZVN0YXJ0ID0gcm93SW5kZXg7XHJcbiAgICAgICAgICAgIHJhbmdlRW5kID0gdGhpcy5hbmNob3JSb3dJbmRleDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5hbmNob3JSb3dJbmRleCA8IHJvd0luZGV4KSB7XHJcbiAgICAgICAgICAgIHJhbmdlU3RhcnQgPSB0aGlzLmFuY2hvclJvd0luZGV4O1xyXG4gICAgICAgICAgICByYW5nZUVuZCA9IHJvd0luZGV4O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmFuZ2VTdGFydCA9IHJvd0luZGV4O1xyXG4gICAgICAgICAgICByYW5nZUVuZCA9IHJvd0luZGV4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMubGF6eSAmJiB0aGlzLnBhZ2luYXRvcikge1xyXG4gICAgICAgICAgICByYW5nZVN0YXJ0IC09IHRoaXMuZmlyc3Q7XHJcbiAgICAgICAgICAgIHJhbmdlRW5kIC09IHRoaXMuZmlyc3Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSByYW5nZVN0YXJ0OyBpIDw9IHJhbmdlRW5kOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHJhbmdlUm93RGF0YSA9IHRoaXMuZmlsdGVyZWRWYWx1ZSA/IHRoaXMuZmlsdGVyZWRWYWx1ZVtpXSA6IHRoaXMudmFsdWVbaV07XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1NlbGVjdGVkKHJhbmdlUm93RGF0YSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IFsuLi50aGlzLnNlbGVjdGlvbiwgcmFuZ2VSb3dEYXRhXTtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhS2V5VmFsdWU6IHN0cmluZyA9IHRoaXMuZGF0YUtleSA/IFN0cmluZyhPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHJhbmdlUm93RGF0YSwgdGhpcy5kYXRhS2V5KSkgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFLZXlWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5c1tkYXRhS2V5VmFsdWVdID0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMub25Sb3dTZWxlY3QuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIGRhdGE6IHJhbmdlUm93RGF0YSwgdHlwZTogJ3Jvdyd9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJTZWxlY3Rpb25SYW5nZShldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgICAgIGxldCByYW5nZVN0YXJ0LCByYW5nZUVuZDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucmFuZ2VSb3dJbmRleCA+IHRoaXMuYW5jaG9yUm93SW5kZXgpIHtcclxuICAgICAgICAgICAgcmFuZ2VTdGFydCA9IHRoaXMuYW5jaG9yUm93SW5kZXg7XHJcbiAgICAgICAgICAgIHJhbmdlRW5kID0gdGhpcy5yYW5nZVJvd0luZGV4O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnJhbmdlUm93SW5kZXggPCB0aGlzLmFuY2hvclJvd0luZGV4KSB7XHJcbiAgICAgICAgICAgIHJhbmdlU3RhcnQgPSB0aGlzLnJhbmdlUm93SW5kZXg7XHJcbiAgICAgICAgICAgIHJhbmdlRW5kID0gdGhpcy5hbmNob3JSb3dJbmRleDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJhbmdlU3RhcnQgPSB0aGlzLnJhbmdlUm93SW5kZXg7XHJcbiAgICAgICAgICAgIHJhbmdlRW5kID0gdGhpcy5yYW5nZVJvd0luZGV4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gcmFuZ2VTdGFydDsgaSA8PSByYW5nZUVuZDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCByYW5nZVJvd0RhdGEgPSB0aGlzLnZhbHVlW2ldO1xyXG4gICAgICAgICAgICBsZXQgc2VsZWN0aW9uSW5kZXggPSB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKHJhbmdlUm93RGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uLmZpbHRlcigodmFsLGkpID0+IGkhPXNlbGVjdGlvbkluZGV4KTtcclxuICAgICAgICAgICAgbGV0IGRhdGFLZXlWYWx1ZTogc3RyaW5nID0gdGhpcy5kYXRhS2V5ID8gU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocmFuZ2VSb3dEYXRhLCB0aGlzLmRhdGFLZXkpKSA6IG51bGw7XHJcbiAgICAgICAgICAgIGlmIChkYXRhS2V5VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnNlbGVjdGlvbktleXNbZGF0YUtleVZhbHVlXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm9uUm93VW5zZWxlY3QuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIGRhdGE6IHJhbmdlUm93RGF0YSwgdHlwZTogJ3Jvdyd9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaXNTZWxlY3RlZChyb3dEYXRhKSB7XHJcbiAgICAgICAgaWYgKHJvd0RhdGEgJiYgdGhpcy5zZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YUtleSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uS2V5c1tPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHJvd0RhdGEsIHRoaXMuZGF0YUtleSldICE9PSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb24gaW5zdGFuY2VvZiBBcnJheSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maW5kSW5kZXhJblNlbGVjdGlvbihyb3dEYXRhKSA+IC0xO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVxdWFscyhyb3dEYXRhLCB0aGlzLnNlbGVjdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBmaW5kSW5kZXhJblNlbGVjdGlvbihyb3dEYXRhOiBhbnkpIHtcclxuICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IC0xO1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbiAmJiB0aGlzLnNlbGVjdGlvbi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNlbGVjdGlvbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXF1YWxzKHJvd0RhdGEsIHRoaXMuc2VsZWN0aW9uW2ldKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZVJvd1dpdGhSYWRpbyhldmVudDogYW55LCByb3dEYXRhOmFueSkge1xyXG4gICAgICAgIHRoaXMucHJldmVudFNlbGVjdGlvblNldHRlclByb3BhZ2F0aW9uID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uICE9IHJvd0RhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gcm93RGF0YTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMub25Sb3dTZWxlY3QuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQub3JpZ2luYWxFdmVudCwgaW5kZXg6IGV2ZW50LnJvd0luZGV4LCBkYXRhOiByb3dEYXRhLCB0eXBlOiAncmFkaW9idXR0b24nfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhS2V5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXMgPSB7fTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5c1tTdHJpbmcoT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShyb3dEYXRhLCB0aGlzLmRhdGFLZXkpKV0gPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5vblJvd1Vuc2VsZWN0LmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50Lm9yaWdpbmFsRXZlbnQsIGluZGV4OiBldmVudC5yb3dJbmRleCwgZGF0YTogcm93RGF0YSwgdHlwZTogJ3JhZGlvYnV0dG9uJ30pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy50YWJsZVNlcnZpY2Uub25TZWxlY3Rpb25DaGFuZ2UoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNTdGF0ZWZ1bCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZVJvd1dpdGhDaGVja2JveChldmVudCwgcm93RGF0YTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbnx8W107XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5pc1NlbGVjdGVkKHJvd0RhdGEpO1xyXG4gICAgICAgIGxldCBkYXRhS2V5VmFsdWUgPSB0aGlzLmRhdGFLZXkgPyBTdHJpbmcoT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShyb3dEYXRhLCB0aGlzLmRhdGFLZXkpKSA6IG51bGw7XHJcbiAgICAgICAgdGhpcy5wcmV2ZW50U2VsZWN0aW9uU2V0dGVyUHJvcGFnYXRpb24gPSB0cnVlO1xyXG5cclxuICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGVjdGlvbkluZGV4ID0gdGhpcy5maW5kSW5kZXhJblNlbGVjdGlvbihyb3dEYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24uZmlsdGVyKCh2YWwsIGkpID0+IGkgIT0gc2VsZWN0aW9uSW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5vblJvd1Vuc2VsZWN0LmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudC5vcmlnaW5hbEV2ZW50LCBpbmRleDogZXZlbnQucm93SW5kZXgsIGRhdGE6IHJvd0RhdGEsIHR5cGU6ICdjaGVja2JveCcgfSk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhS2V5VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnNlbGVjdGlvbktleXNbZGF0YUtleVZhbHVlXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24gPyBbLi4udGhpcy5zZWxlY3Rpb24sIHJvd0RhdGFdIDogW3Jvd0RhdGFdO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5vblJvd1NlbGVjdC5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQub3JpZ2luYWxFdmVudCwgaW5kZXg6IGV2ZW50LnJvd0luZGV4LCBkYXRhOiByb3dEYXRhLCB0eXBlOiAnY2hlY2tib3gnIH0pO1xyXG4gICAgICAgICAgICBpZiAoZGF0YUtleVZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXNbZGF0YUtleVZhbHVlXSA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudGFibGVTZXJ2aWNlLm9uU2VsZWN0aW9uQ2hhbmdlKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzU3RhdGVmdWwoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVSb3dzV2l0aENoZWNrYm94KGV2ZW50OiBFdmVudCwgY2hlY2s6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSBjaGVjayA/IHRoaXMuZmlsdGVyZWRWYWx1ZSA/IHRoaXMuZmlsdGVyZWRWYWx1ZS5zbGljZSgpOiB0aGlzLnZhbHVlLnNsaWNlKCkgOiBbXTtcclxuICAgICAgICB0aGlzLnByZXZlbnRTZWxlY3Rpb25TZXR0ZXJQcm9wYWdhdGlvbiA9IHRydWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3Rpb25LZXlzKCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLl9zZWxlY3Rpb24pO1xyXG4gICAgICAgIHRoaXMudGFibGVTZXJ2aWNlLm9uU2VsZWN0aW9uQ2hhbmdlKCk7XHJcbiAgICAgICAgdGhpcy5vbkhlYWRlckNoZWNrYm94VG9nZ2xlLmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBjaGVja2VkOiBjaGVja30pO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc1N0YXRlZnVsKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXF1YWxzKGRhdGExLCBkYXRhMikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBhcmVTZWxlY3Rpb25CeSA9PT0gJ2VxdWFscycgPyAoZGF0YTEgPT09IGRhdGEyKSA6IE9iamVjdFV0aWxzLmVxdWFscyhkYXRhMSwgZGF0YTIsIHRoaXMuZGF0YUtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgZmlsdGVyKHZhbHVlLCBmaWVsZCwgbWF0Y2hNb2RlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyVGltZW91dCkge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5maWx0ZXJUaW1lb3V0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5pc0ZpbHRlckJsYW5rKHZhbHVlKSkge1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlcnNbZmllbGRdID0geyB2YWx1ZTogdmFsdWUsIG1hdGNoTW9kZTogbWF0Y2hNb2RlIH07XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmZpbHRlcnNbZmllbGRdKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmZpbHRlcnNbZmllbGRdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5maWx0ZXJUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZpbHRlcigpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlclRpbWVvdXQgPSBudWxsO1xyXG4gICAgICAgIH0sIHRoaXMuZmlsdGVyRGVsYXkpO1xyXG5cclxuICAgICAgICB0aGlzLmFuY2hvclJvd0luZGV4ID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBmaWx0ZXJHbG9iYWwodmFsdWUsIG1hdGNoTW9kZSkge1xyXG4gICAgICAgIHRoaXMuZmlsdGVyKHZhbHVlLCAnZ2xvYmFsJywgbWF0Y2hNb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0ZpbHRlckJsYW5rKGZpbHRlcjogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGZpbHRlciAhPT0gbnVsbCAmJiBmaWx0ZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAoKHR5cGVvZiBmaWx0ZXIgPT09ICdzdHJpbmcnICYmIGZpbHRlci50cmltKCkubGVuZ3RoID09IDApIHx8IChmaWx0ZXIgaW5zdGFuY2VvZiBBcnJheSAmJiBmaWx0ZXIubGVuZ3RoID09IDApKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgX2ZpbHRlcigpIHtcclxuICAgICAgICBpZiAoIXRoaXMucmVzdG9yaW5nRmlsdGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyc3QgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLmZpcnN0Q2hhbmdlLmVtaXQodGhpcy5maXJzdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5sYXp5KSB7XHJcbiAgICAgICAgICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHRoaXMuY3JlYXRlTGF6eUxvYWRNZXRhZGF0YSgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaGFzRmlsdGVyKCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyZWRWYWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYWdpbmF0b3IpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsUmVjb3JkcyA9IHRoaXMudmFsdWUgPyB0aGlzLnZhbHVlLmxlbmd0aCA6IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZ2xvYmFsRmlsdGVyRmllbGRzQXJyYXk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJzWydnbG9iYWwnXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jb2x1bW5zICYmICF0aGlzLmdsb2JhbEZpbHRlckZpZWxkcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdHbG9iYWwgZmlsdGVyaW5nIHJlcXVpcmVzIGR5bmFtaWMgY29sdW1ucyBvciBnbG9iYWxGaWx0ZXJGaWVsZHMgdG8gYmUgZGVmaW5lZC4nKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdsb2JhbEZpbHRlckZpZWxkc0FycmF5ID0gdGhpcy5nbG9iYWxGaWx0ZXJGaWVsZHN8fHRoaXMuY29sdW1ucztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcmVkVmFsdWUgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudmFsdWUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbG9jYWxNYXRjaCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdsb2JhbE1hdGNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxvY2FsRmlsdGVyZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgcHJvcCBpbiB0aGlzLmZpbHRlcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVycy5oYXNPd25Qcm9wZXJ0eShwcm9wKSAmJiBwcm9wICE9PSAnZ2xvYmFsJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxGaWx0ZXJlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVyTWV0YSA9IHRoaXMuZmlsdGVyc1twcm9wXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJGaWVsZCA9IHByb3A7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVyVmFsdWUgPSBmaWx0ZXJNZXRhLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlck1hdGNoTW9kZSA9IGZpbHRlck1ldGEubWF0Y2hNb2RlIHx8ICdzdGFydHNXaXRoJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhRmllbGRWYWx1ZSA9IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEodGhpcy52YWx1ZVtpXSwgZmlsdGVyRmllbGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlckNvbnN0cmFpbnQgPSBGaWx0ZXJVdGlsc1tmaWx0ZXJNYXRjaE1vZGVdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZmlsdGVyQ29uc3RyYWludChkYXRhRmllbGRWYWx1ZSwgZmlsdGVyVmFsdWUsIHRoaXMuZmlsdGVyTG9jYWxlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsTWF0Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxvY2FsTWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVyc1snZ2xvYmFsJ10gJiYgIWdsb2JhbE1hdGNoICYmIGdsb2JhbEZpbHRlckZpZWxkc0FycmF5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBnbG9iYWxGaWx0ZXJGaWVsZHNBcnJheS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdsb2JhbEZpbHRlckZpZWxkID0gZ2xvYmFsRmlsdGVyRmllbGRzQXJyYXlbal0uZmllbGR8fGdsb2JhbEZpbHRlckZpZWxkc0FycmF5W2pdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsTWF0Y2ggPSBGaWx0ZXJVdGlsc1t0aGlzLmZpbHRlcnNbJ2dsb2JhbCddLm1hdGNoTW9kZV0oT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YSh0aGlzLnZhbHVlW2ldLCBnbG9iYWxGaWx0ZXJGaWVsZCksIHRoaXMuZmlsdGVyc1snZ2xvYmFsJ10udmFsdWUsIHRoaXMuZmlsdGVyTG9jYWxlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2xvYmFsTWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1hdGNoZXM6IGJvb2xlYW47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVyc1snZ2xvYmFsJ10pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcyA9IGxvY2FsRmlsdGVyZWQgPyAobG9jYWxGaWx0ZXJlZCAmJiBsb2NhbE1hdGNoICYmIGdsb2JhbE1hdGNoKSA6IGdsb2JhbE1hdGNoO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcyA9IGxvY2FsRmlsdGVyZWQgJiYgbG9jYWxNYXRjaDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyZWRWYWx1ZS5wdXNoKHRoaXMudmFsdWVbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJlZFZhbHVlLmxlbmd0aCA9PT0gdGhpcy52YWx1ZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcmVkVmFsdWUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhZ2luYXRvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxSZWNvcmRzID0gdGhpcy5maWx0ZXJlZFZhbHVlID8gdGhpcy5maWx0ZXJlZFZhbHVlLmxlbmd0aCA6IHRoaXMudmFsdWUgPyB0aGlzLnZhbHVlLmxlbmd0aCA6IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMub25GaWx0ZXIuZW1pdCh7XHJcbiAgICAgICAgICAgIGZpbHRlcnM6IHRoaXMuZmlsdGVycyxcclxuICAgICAgICAgICAgZmlsdGVyZWRWYWx1ZTogdGhpcy5maWx0ZXJlZFZhbHVlIHx8IHRoaXMudmFsdWVcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy50YWJsZVNlcnZpY2Uub25WYWx1ZUNoYW5nZSh0aGlzLnZhbHVlKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNTdGF0ZWZ1bCgpICYmICF0aGlzLnJlc3RvcmluZ0ZpbHRlcikge1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucmVzdG9yaW5nRmlsdGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdG9yaW5nRmlsdGVyID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhc0ZpbHRlcigpIHtcclxuICAgICAgICBsZXQgZW1wdHkgPSB0cnVlO1xyXG4gICAgICAgIGZvciAobGV0IHByb3AgaW4gdGhpcy5maWx0ZXJzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlcnMuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcclxuICAgICAgICAgICAgICAgIGVtcHR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuICFlbXB0eTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVMYXp5TG9hZE1ldGFkYXRhKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZmlyc3Q6IHRoaXMuZmlyc3QsXHJcbiAgICAgICAgICAgIHJvd3M6IHRoaXMudmlydHVhbFNjcm9sbCA/IHRoaXMucm93cyAqIDI6IHRoaXMucm93cyxcclxuICAgICAgICAgICAgc29ydEZpZWxkOiB0aGlzLnNvcnRGaWVsZCxcclxuICAgICAgICAgICAgc29ydE9yZGVyOiB0aGlzLnNvcnRPcmRlcixcclxuICAgICAgICAgICAgZmlsdGVyczogdGhpcy5maWx0ZXJzLFxyXG4gICAgICAgICAgICBnbG9iYWxGaWx0ZXI6IHRoaXMuZmlsdGVycyAmJiB0aGlzLmZpbHRlcnNbJ2dsb2JhbCddID8gdGhpcy5maWx0ZXJzWydnbG9iYWwnXS52YWx1ZSA6IG51bGwsXHJcbiAgICAgICAgICAgIG11bHRpU29ydE1ldGE6IHRoaXMubXVsdGlTb3J0TWV0YVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCkge1xyXG4gICAgICAgIHRoaXMuX3NvcnRGaWVsZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fc29ydE9yZGVyID0gdGhpcy5kZWZhdWx0U29ydE9yZGVyO1xyXG4gICAgICAgIHRoaXMuX211bHRpU29ydE1ldGEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudGFibGVTZXJ2aWNlLm9uU29ydChudWxsKTtcclxuXHJcbiAgICAgICAgdGhpcy5maWx0ZXJlZFZhbHVlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmZpbHRlcnMgPSB7fTtcclxuXHJcbiAgICAgICAgdGhpcy5maXJzdCA9IDA7XHJcbiAgICAgICAgdGhpcy5maXJzdENoYW5nZS5lbWl0KHRoaXMuZmlyc3QpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5sYXp5KSB7XHJcbiAgICAgICAgICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHRoaXMuY3JlYXRlTGF6eUxvYWRNZXRhZGF0YSgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudG90YWxSZWNvcmRzID0gKHRoaXMuX3ZhbHVlID8gdGhpcy5fdmFsdWUubGVuZ3RoIDogMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBleHBvcnRDU1Yob3B0aW9ucz86IGFueSkge1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5maWx0ZXJlZFZhbHVlIHx8IHRoaXMudmFsdWU7XHJcbiAgICAgICAgbGV0IGNzdiA9ICcnO1xyXG5cclxuICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnNlbGVjdGlvbk9ubHkpIHtcclxuICAgICAgICAgICAgZGF0YSA9IHRoaXMuc2VsZWN0aW9uIHx8IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9oZWFkZXJzXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbHVtbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNvbHVtbiA9IHRoaXMuY29sdW1uc1tpXTtcclxuICAgICAgICAgICAgaWYgKGNvbHVtbi5leHBvcnRhYmxlICE9PSBmYWxzZSAmJiBjb2x1bW4uZmllbGQpIHtcclxuICAgICAgICAgICAgICAgIGNzdiArPSAnXCInICsgKGNvbHVtbi5oZWFkZXIgfHwgY29sdW1uLmZpZWxkKSArICdcIic7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGkgPCAodGhpcy5jb2x1bW5zLmxlbmd0aCAtIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3N2ICs9IHRoaXMuY3N2U2VwYXJhdG9yO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2JvZHlcclxuICAgICAgICBkYXRhLmZvckVhY2goKHJlY29yZCwgaSkgPT4ge1xyXG4gICAgICAgICAgICBjc3YgKz0gJ1xcbic7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb2x1bW5zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29sdW1uID0gdGhpcy5jb2x1bW5zW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbi5leHBvcnRhYmxlICE9PSBmYWxzZSAmJiBjb2x1bW4uZmllbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2VsbERhdGEgPSBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHJlY29yZCwgY29sdW1uLmZpZWxkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGxEYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZXhwb3J0RnVuY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxEYXRhID0gdGhpcy5leHBvcnRGdW5jdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogY2VsbERhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQ6IGNvbHVtbi5maWVsZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbERhdGEgPSBTdHJpbmcoY2VsbERhdGEpLnJlcGxhY2UoL1wiL2csICdcIlwiJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbERhdGEgPSAnJztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNzdiArPSAnXCInICsgY2VsbERhdGEgKyAnXCInO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA8ICh0aGlzLmNvbHVtbnMubGVuZ3RoIC0gMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3N2ICs9IHRoaXMuY3N2U2VwYXJhdG9yO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgYmxvYiA9IG5ldyBCbG9iKFtjc3ZdLCB7XHJcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04OydcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHdpbmRvdy5uYXZpZ2F0b3IubXNTYXZlT3JPcGVuQmxvYikge1xyXG4gICAgICAgICAgICBuYXZpZ2F0b3IubXNTYXZlT3JPcGVuQmxvYihibG9iLCB0aGlzLmV4cG9ydEZpbGVuYW1lICsgJy5jc3YnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XHJcbiAgICAgICAgICAgIGxpbmsuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTtcclxuICAgICAgICAgICAgaWYgKGxpbmsuZG93bmxvYWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpKTtcclxuICAgICAgICAgICAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsIHRoaXMuZXhwb3J0RmlsZW5hbWUgKyAnLmNzdicpO1xyXG4gICAgICAgICAgICAgICAgbGluay5jbGljaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY3N2ID0gJ2RhdGE6dGV4dC9jc3Y7Y2hhcnNldD11dGYtOCwnICsgY3N2O1xyXG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oZW5jb2RlVVJJKGNzdikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUVkaXRpbmdDZWxsKGNlbGwsIGRhdGEsIGZpZWxkLCBpbmRleCkge1xyXG4gICAgICAgIHRoaXMuZWRpdGluZ0NlbGwgPSBjZWxsO1xyXG4gICAgICAgIHRoaXMuZWRpdGluZ0NlbGxEYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLmVkaXRpbmdDZWxsRmllbGQgPSBmaWVsZDtcclxuICAgICAgICB0aGlzLmVkaXRpbmdDZWxsUm93SW5kZXggPSBpbmRleDtcclxuICAgICAgICB0aGlzLmJpbmREb2N1bWVudEVkaXRMaXN0ZW5lcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRWRpdGluZ0NlbGxWYWxpZCgpIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuZWRpdGluZ0NlbGwgJiYgRG9tSGFuZGxlci5maW5kKHRoaXMuZWRpdGluZ0NlbGwsICcubmctaW52YWxpZC5uZy1kaXJ0eScpLmxlbmd0aCA9PT0gMCk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZERvY3VtZW50RWRpdExpc3RlbmVyKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5kb2N1bWVudEVkaXRMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50RWRpdExpc3RlbmVyID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lZGl0aW5nQ2VsbCAmJiAhdGhpcy5lZGl0aW5nQ2VsbENsaWNrICYmIHRoaXMuaXNFZGl0aW5nQ2VsbFZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHRoaXMuZWRpdGluZ0NlbGwsICd1aS1lZGl0aW5nLWNlbGwnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRpbmdDZWxsID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRWRpdENvbXBsZXRlLmVtaXQoeyBmaWVsZDogdGhpcy5lZGl0aW5nQ2VsbEZpZWxkLCBkYXRhOiB0aGlzLmVkaXRpbmdDZWxsRGF0YSwgb3JpZ2luYWxFdmVudDogZXZlbnQsIGluZGV4OiB0aGlzLmVkaXRpbmdDZWxsUm93SW5kZXggfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0aW5nQ2VsbEZpZWxkID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRpbmdDZWxsRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0aW5nQ2VsbFJvd0luZGV4ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50RWRpdExpc3RlbmVyKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0aW5nQ2VsbENsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZG9jdW1lbnRFZGl0TGlzdGVuZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1bmJpbmREb2N1bWVudEVkaXRMaXN0ZW5lcigpIHtcclxuICAgICAgICBpZiAodGhpcy5kb2N1bWVudEVkaXRMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZG9jdW1lbnRFZGl0TGlzdGVuZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50RWRpdExpc3RlbmVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFJvd0VkaXQocm93RGF0YTogYW55KSB7XHJcbiAgICAgICAgbGV0IGRhdGFLZXlWYWx1ZSA9IFN0cmluZyhPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHJvd0RhdGEsIHRoaXMuZGF0YUtleSkpO1xyXG4gICAgICAgIHRoaXMuZWRpdGluZ1Jvd0tleXNbZGF0YUtleVZhbHVlXSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZVJvd0VkaXQocm93RGF0YTogYW55LCByb3dFbGVtZW50OiBIVE1MVGFibGVSb3dFbGVtZW50KSB7XHJcbiAgICAgICAgaWYgKERvbUhhbmRsZXIuZmluZChyb3dFbGVtZW50LCAnLm5nLWludmFsaWQubmctZGlydHknKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgbGV0IGRhdGFLZXlWYWx1ZSA9IFN0cmluZyhPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHJvd0RhdGEsIHRoaXMuZGF0YUtleSkpO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5lZGl0aW5nUm93S2V5c1tkYXRhS2V5VmFsdWVdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjYW5jZWxSb3dFZGl0KHJvd0RhdGE6IGFueSkge1xyXG4gICAgICAgIGxldCBkYXRhS2V5VmFsdWUgPSBTdHJpbmcoT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShyb3dEYXRhLCB0aGlzLmRhdGFLZXkpKTtcclxuICAgICAgICBkZWxldGUgdGhpcy5lZGl0aW5nUm93S2V5c1tkYXRhS2V5VmFsdWVdO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZVJvdyhyb3dEYXRhOiBhbnksIGV2ZW50PzogRXZlbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZGF0YUtleSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2RhdGFLZXkgbXVzdCBiZSBkZWZpbmVkIHRvIHVzZSByb3cgZXhwYW5zaW9uJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZGF0YUtleVZhbHVlID0gU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocm93RGF0YSwgdGhpcy5kYXRhS2V5KSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmV4cGFuZGVkUm93S2V5c1tkYXRhS2V5VmFsdWVdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuZXhwYW5kZWRSb3dLZXlzW2RhdGFLZXlWYWx1ZV07XHJcbiAgICAgICAgICAgIHRoaXMub25Sb3dDb2xsYXBzZS5lbWl0KHtcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogcm93RGF0YVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJvd0V4cGFuZE1vZGUgPT09ICdzaW5nbGUnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZGVkUm93S2V5cyA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmV4cGFuZGVkUm93S2V5c1tkYXRhS2V5VmFsdWVdID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5vblJvd0V4cGFuZC5lbWl0KHtcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogcm93RGF0YVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNTdGF0ZWZ1bCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlzUm93RXhwYW5kZWQocm93RGF0YTogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXhwYW5kZWRSb3dLZXlzW1N0cmluZyhPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHJvd0RhdGEsIHRoaXMuZGF0YUtleSkpXSA9PT0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpc1Jvd0VkaXRpbmcocm93RGF0YTogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdGluZ1Jvd0tleXNbU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocm93RGF0YSwgdGhpcy5kYXRhS2V5KSldID09PSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlzU2luZ2xlU2VsZWN0aW9uTW9kZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnc2luZ2xlJztcclxuICAgIH1cclxuXHJcbiAgICBpc011bHRpcGxlU2VsZWN0aW9uTW9kZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnbXVsdGlwbGUnO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ29sdW1uUmVzaXplQmVnaW4oZXZlbnQpIHtcclxuICAgICAgICBsZXQgY29udGFpbmVyTGVmdCA9IERvbUhhbmRsZXIuZ2V0T2Zmc2V0KHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpLmxlZnQ7XHJcbiAgICAgICAgdGhpcy5sYXN0UmVzaXplckhlbHBlclggPSAoZXZlbnQucGFnZVggLSBjb250YWluZXJMZWZ0ICsgdGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zY3JvbGxMZWZ0KTtcclxuICAgICAgICB0aGlzLm9uQ29sdW1uUmVzaXplKGV2ZW50KTtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ29sdW1uUmVzaXplKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lckxlZnQgPSBEb21IYW5kbGVyLmdldE9mZnNldCh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KS5sZWZ0O1xyXG4gICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJ3VpLXVuc2VsZWN0YWJsZS10ZXh0Jyk7XHJcbiAgICAgICAgdGhpcy5yZXNpemVIZWxwZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSB0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCArICdweCc7XHJcbiAgICAgICAgdGhpcy5yZXNpemVIZWxwZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS50b3AgPSAwICsgJ3B4JztcclxuICAgICAgICB0aGlzLnJlc2l6ZUhlbHBlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSAoZXZlbnQucGFnZVggLSBjb250YWluZXJMZWZ0ICsgdGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zY3JvbGxMZWZ0KSArICdweCc7XHJcblxyXG4gICAgICAgIHRoaXMucmVzaXplSGVscGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICB9XHJcblxyXG4gICAgb25Db2x1bW5SZXNpemVFbmQoZXZlbnQsIGNvbHVtbikge1xyXG4gICAgICAgIGxldCBkZWx0YSA9IHRoaXMucmVzaXplSGVscGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQub2Zmc2V0TGVmdCAtIHRoaXMubGFzdFJlc2l6ZXJIZWxwZXJYO1xyXG4gICAgICAgIGxldCBjb2x1bW5XaWR0aCA9IGNvbHVtbi5vZmZzZXRXaWR0aDtcclxuICAgICAgICBsZXQgbWluV2lkdGggPSBwYXJzZUludChjb2x1bW4uc3R5bGUubWluV2lkdGggfHwgMTUpO1xyXG5cclxuICAgICAgICBpZiAoY29sdW1uV2lkdGggKyBkZWx0YSA8IG1pbldpZHRoKSB7XHJcbiAgICAgICAgICAgIGRlbHRhID0gbWluV2lkdGggLSBjb2x1bW5XaWR0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG5ld0NvbHVtbldpZHRoID0gY29sdW1uV2lkdGggKyBkZWx0YTtcclxuXHJcbiAgICAgICAgaWYgKG5ld0NvbHVtbldpZHRoID49IG1pbldpZHRoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbHVtblJlc2l6ZU1vZGUgPT09ICdmaXQnKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV4dENvbHVtbiA9IGNvbHVtbi5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoIW5leHRDb2x1bW4ub2Zmc2V0UGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dENvbHVtbiA9IG5leHRDb2x1bW4ubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChuZXh0Q29sdW1uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5leHRDb2x1bW5XaWR0aCA9IG5leHRDb2x1bW4ub2Zmc2V0V2lkdGggLSBkZWx0YTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dENvbHVtbk1pbldpZHRoID0gbmV4dENvbHVtbi5zdHlsZS5taW5XaWR0aCB8fCAxNTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0NvbHVtbldpZHRoID4gMTUgJiYgbmV4dENvbHVtbldpZHRoID4gcGFyc2VJbnQobmV4dENvbHVtbk1pbldpZHRoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2Nyb2xsYWJsZVZpZXcgPSB0aGlzLmZpbmRQYXJlbnRTY3JvbGxhYmxlVmlldyhjb2x1bW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNjcm9sbGFibGVCb2R5VGFibGUgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUoc2Nyb2xsYWJsZVZpZXcsICd0YWJsZS51aS10YWJsZS1zY3JvbGxhYmxlLWJvZHktdGFibGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzY3JvbGxhYmxlSGVhZGVyVGFibGUgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUoc2Nyb2xsYWJsZVZpZXcsICd0YWJsZS51aS10YWJsZS1zY3JvbGxhYmxlLWhlYWRlci10YWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNjcm9sbGFibGVGb290ZXJUYWJsZSA9IERvbUhhbmRsZXIuZmluZFNpbmdsZShzY3JvbGxhYmxlVmlldywgJ3RhYmxlLnVpLXRhYmxlLXNjcm9sbGFibGUtZm9vdGVyLXRhYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzaXplQ29sdW1uSW5kZXggPSBEb21IYW5kbGVyLmluZGV4KGNvbHVtbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNpemVDb2xHcm91cChzY3JvbGxhYmxlSGVhZGVyVGFibGUsIHJlc2l6ZUNvbHVtbkluZGV4LCBuZXdDb2x1bW5XaWR0aCwgbmV4dENvbHVtbldpZHRoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzaXplQ29sR3JvdXAoc2Nyb2xsYWJsZUJvZHlUYWJsZSwgcmVzaXplQ29sdW1uSW5kZXgsIG5ld0NvbHVtbldpZHRoLCBuZXh0Q29sdW1uV2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNpemVDb2xHcm91cChzY3JvbGxhYmxlRm9vdGVyVGFibGUsIHJlc2l6ZUNvbHVtbkluZGV4LCBuZXdDb2x1bW5XaWR0aCwgbmV4dENvbHVtbldpZHRoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbi5zdHlsZS53aWR0aCA9IG5ld0NvbHVtbldpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0Q29sdW1uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dENvbHVtbi5zdHlsZS53aWR0aCA9IG5leHRDb2x1bW5XaWR0aCArICdweCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5jb2x1bW5SZXNpemVNb2RlID09PSAnZXhwYW5kJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld0NvbHVtbldpZHRoID4gbWluV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U2Nyb2xsYWJsZUl0ZW1zV2lkdGhPbkV4cGFuZFJlc2l6ZShjb2x1bW4sIG5ld0NvbHVtbldpZHRoLCBkZWx0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRhYmxlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUud2lkdGggPSB0aGlzLnRhYmxlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggKyBkZWx0YSArICdweCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbi5zdHlsZS53aWR0aCA9IG5ld0NvbHVtbldpZHRoICsgJ3B4JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcldpZHRoID0gdGhpcy50YWJsZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoID0gY29udGFpbmVyV2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5vbkNvbFJlc2l6ZS5lbWl0KHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGNvbHVtbixcclxuICAgICAgICAgICAgICAgIGRlbHRhOiBkZWx0YVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU3RhdGVmdWwoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZXNpemVIZWxwZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJ3VpLXVuc2VsZWN0YWJsZS10ZXh0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2Nyb2xsYWJsZUl0ZW1zV2lkdGhPbkV4cGFuZFJlc2l6ZShjb2x1bW4sIG5ld0NvbHVtbldpZHRoLCBkZWx0YSkge1xyXG4gICAgICAgIGxldCBzY3JvbGxhYmxlVmlldyA9IGNvbHVtbiA/IHRoaXMuZmluZFBhcmVudFNjcm9sbGFibGVWaWV3KGNvbHVtbikgOiB0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50O1xyXG4gICAgICAgIGxldCBzY3JvbGxhYmxlQm9keSA9IERvbUhhbmRsZXIuZmluZFNpbmdsZShzY3JvbGxhYmxlVmlldywgJy51aS10YWJsZS1zY3JvbGxhYmxlLWJvZHknKTtcclxuICAgICAgICBsZXQgc2Nyb2xsYWJsZUhlYWRlciA9IERvbUhhbmRsZXIuZmluZFNpbmdsZShzY3JvbGxhYmxlVmlldywgJy51aS10YWJsZS1zY3JvbGxhYmxlLWhlYWRlcicpO1xyXG4gICAgICAgIGxldCBzY3JvbGxhYmxlRm9vdGVyID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHNjcm9sbGFibGVWaWV3LCAnLnVpLXRhYmxlLXNjcm9sbGFibGUtZm9vdGVyJyk7XHJcbiAgICAgICAgbGV0IHNjcm9sbGFibGVCb2R5VGFibGUgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUoc2Nyb2xsYWJsZUJvZHksICd0YWJsZS51aS10YWJsZS1zY3JvbGxhYmxlLWJvZHktdGFibGUnKTtcclxuICAgICAgICBsZXQgc2Nyb2xsYWJsZUhlYWRlclRhYmxlID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHNjcm9sbGFibGVIZWFkZXIsICd0YWJsZS51aS10YWJsZS1zY3JvbGxhYmxlLWhlYWRlci10YWJsZScpO1xyXG4gICAgICAgIGxldCBzY3JvbGxhYmxlRm9vdGVyVGFibGUgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUoc2Nyb2xsYWJsZUZvb3RlciwgJ3RhYmxlLnVpLXRhYmxlLXNjcm9sbGFibGUtZm9vdGVyLXRhYmxlJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHNjcm9sbGFibGVCb2R5VGFibGVXaWR0aCA9IGNvbHVtbiA/IHNjcm9sbGFibGVCb2R5VGFibGUub2Zmc2V0V2lkdGggKyBkZWx0YSA6IG5ld0NvbHVtbldpZHRoO1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbGFibGVIZWFkZXJUYWJsZVdpZHRoID0gY29sdW1uID8gc2Nyb2xsYWJsZUhlYWRlclRhYmxlLm9mZnNldFdpZHRoICsgZGVsdGEgOiBuZXdDb2x1bW5XaWR0aDtcclxuICAgICAgICBjb25zdCBpc0NvbnRhaW5lckluVmlld3BvcnQgPSB0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoID49IHNjcm9sbGFibGVCb2R5VGFibGVXaWR0aDtcclxuXHJcbiAgICAgICAgbGV0IHNldFdpZHRoID0gKGNvbnRhaW5lciwgdGFibGUsIHdpZHRoLCBpc0NvbnRhaW5lckluVmlld3BvcnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGNvbnRhaW5lciAmJiB0YWJsZSkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnN0eWxlLndpZHRoID0gaXNDb250YWluZXJJblZpZXdwb3J0ID8gd2lkdGggKyBEb21IYW5kbGVyLmNhbGN1bGF0ZVNjcm9sbGJhcldpZHRoKHNjcm9sbGFibGVCb2R5KSArICdweCcgOiAnYXV0bydcclxuICAgICAgICAgICAgICAgIHRhYmxlLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgc2V0V2lkdGgoc2Nyb2xsYWJsZUJvZHksIHNjcm9sbGFibGVCb2R5VGFibGUsIHNjcm9sbGFibGVCb2R5VGFibGVXaWR0aCwgaXNDb250YWluZXJJblZpZXdwb3J0KTtcclxuICAgICAgICBzZXRXaWR0aChzY3JvbGxhYmxlSGVhZGVyLCBzY3JvbGxhYmxlSGVhZGVyVGFibGUsIHNjcm9sbGFibGVIZWFkZXJUYWJsZVdpZHRoLCBpc0NvbnRhaW5lckluVmlld3BvcnQpO1xyXG4gICAgICAgIHNldFdpZHRoKHNjcm9sbGFibGVGb290ZXIsIHNjcm9sbGFibGVGb290ZXJUYWJsZSwgc2Nyb2xsYWJsZUhlYWRlclRhYmxlV2lkdGgsIGlzQ29udGFpbmVySW5WaWV3cG9ydCk7XHJcblxyXG4gICAgICAgIGlmIChjb2x1bW4pIHtcclxuICAgICAgICAgICAgbGV0IHJlc2l6ZUNvbHVtbkluZGV4ID0gRG9tSGFuZGxlci5pbmRleChjb2x1bW4pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5yZXNpemVDb2xHcm91cChzY3JvbGxhYmxlSGVhZGVyVGFibGUsIHJlc2l6ZUNvbHVtbkluZGV4LCBuZXdDb2x1bW5XaWR0aCwgbnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVzaXplQ29sR3JvdXAoc2Nyb2xsYWJsZUJvZHlUYWJsZSwgcmVzaXplQ29sdW1uSW5kZXgsIG5ld0NvbHVtbldpZHRoLCBudWxsKTtcclxuICAgICAgICAgICAgdGhpcy5yZXNpemVDb2xHcm91cChzY3JvbGxhYmxlRm9vdGVyVGFibGUsIHJlc2l6ZUNvbHVtbkluZGV4LCBuZXdDb2x1bW5XaWR0aCwgbnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZpbmRQYXJlbnRTY3JvbGxhYmxlVmlldyhjb2x1bW4pIHtcclxuICAgICAgICBpZiAoY29sdW1uKSB7XHJcbiAgICAgICAgICAgIGxldCBwYXJlbnQgPSBjb2x1bW4ucGFyZW50RWxlbWVudDtcclxuICAgICAgICAgICAgd2hpbGUgKHBhcmVudCAmJiAhRG9tSGFuZGxlci5oYXNDbGFzcyhwYXJlbnQsICd1aS10YWJsZS1zY3JvbGxhYmxlLXZpZXcnKSkge1xyXG4gICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVzaXplQ29sR3JvdXAodGFibGUsIHJlc2l6ZUNvbHVtbkluZGV4LCBuZXdDb2x1bW5XaWR0aCwgbmV4dENvbHVtbldpZHRoKSB7XHJcbiAgICAgICAgaWYgKHRhYmxlKSB7XHJcbiAgICAgICAgICAgIGxldCBjb2xHcm91cCA9IHRhYmxlLmNoaWxkcmVuWzBdLm5vZGVOYW1lID09PSAnQ09MR1JPVVAnID8gdGFibGUuY2hpbGRyZW5bMF0gOiBudWxsO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbEdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29sID0gY29sR3JvdXAuY2hpbGRyZW5bcmVzaXplQ29sdW1uSW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5leHRDb2wgPSBjb2wubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgY29sLnN0eWxlLndpZHRoID0gbmV3Q29sdW1uV2lkdGggKyAncHgnO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChuZXh0Q29sICYmIG5leHRDb2x1bW5XaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRDb2wuc3R5bGUud2lkdGggPSBuZXh0Q29sdW1uV2lkdGggKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgXCJTY3JvbGxhYmxlIHRhYmxlcyByZXF1aXJlIGEgY29sZ3JvdXAgdG8gc3VwcG9ydCByZXNpemFibGUgY29sdW1uc1wiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uQ29sdW1uRHJhZ1N0YXJ0KGV2ZW50LCBjb2x1bW5FbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5yZW9yZGVySWNvbldpZHRoID0gRG9tSGFuZGxlci5nZXRIaWRkZW5FbGVtZW50T3V0ZXJXaWR0aCh0aGlzLnJlb3JkZXJJbmRpY2F0b3JVcFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcclxuICAgICAgICB0aGlzLnJlb3JkZXJJY29uSGVpZ2h0ID0gRG9tSGFuZGxlci5nZXRIaWRkZW5FbGVtZW50T3V0ZXJIZWlnaHQodGhpcy5yZW9yZGVySW5kaWNhdG9yRG93blZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcclxuICAgICAgICB0aGlzLmRyYWdnZWRDb2x1bW4gPSBjb2x1bW5FbGVtZW50O1xyXG4gICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0JywgJ2InKTsgICAgLy8gRm9yIGZpcmVmb3hcclxuICAgIH1cclxuXHJcbiAgICBvbkNvbHVtbkRyYWdFbnRlcihldmVudCwgZHJvcEhlYWRlcikge1xyXG4gICAgICAgIGlmICh0aGlzLnJlb3JkZXJhYmxlQ29sdW1ucyAmJiB0aGlzLmRyYWdnZWRDb2x1bW4gJiYgZHJvcEhlYWRlcikge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBsZXQgY29udGFpbmVyT2Zmc2V0ID0gRG9tSGFuZGxlci5nZXRPZmZzZXQodGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgICAgICAgIGxldCBkcm9wSGVhZGVyT2Zmc2V0ID0gRG9tSGFuZGxlci5nZXRPZmZzZXQoZHJvcEhlYWRlcik7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5kcmFnZ2VkQ29sdW1uICE9IGRyb3BIZWFkZXIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkcmFnSW5kZXggPSBEb21IYW5kbGVyLmluZGV4V2l0aGluR3JvdXAodGhpcy5kcmFnZ2VkQ29sdW1uLCAncHJlb3JkZXJhYmxlY29sdW1uJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZHJvcEluZGV4ID0gRG9tSGFuZGxlci5pbmRleFdpdGhpbkdyb3VwKGRyb3BIZWFkZXIsICdwcmVvcmRlcmFibGVjb2x1bW4nKTtcclxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRMZWZ0ID0gZHJvcEhlYWRlck9mZnNldC5sZWZ0IC0gY29udGFpbmVyT2Zmc2V0LmxlZnQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0VG9wID0gY29udGFpbmVyT2Zmc2V0LnRvcCAtIGRyb3BIZWFkZXJPZmZzZXQudG9wO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbHVtbkNlbnRlciA9IGRyb3BIZWFkZXJPZmZzZXQubGVmdCArIGRyb3BIZWFkZXIub2Zmc2V0V2lkdGggLyAyO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucmVvcmRlckluZGljYXRvclVwVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gZHJvcEhlYWRlck9mZnNldC50b3AgLSBjb250YWluZXJPZmZzZXQudG9wIC0gKHRoaXMucmVvcmRlckljb25IZWlnaHQgLSAxKSArICdweCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlb3JkZXJJbmRpY2F0b3JEb3duVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gZHJvcEhlYWRlck9mZnNldC50b3AgLSBjb250YWluZXJPZmZzZXQudG9wICsgZHJvcEhlYWRlci5vZmZzZXRIZWlnaHQgKyAncHgnO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChldmVudC5wYWdlWCA+IGNvbHVtbkNlbnRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVvcmRlckluZGljYXRvclVwVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9ICh0YXJnZXRMZWZ0ICsgZHJvcEhlYWRlci5vZmZzZXRXaWR0aCAtIE1hdGguY2VpbCh0aGlzLnJlb3JkZXJJY29uV2lkdGggLyAyKSkgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVvcmRlckluZGljYXRvckRvd25WaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gKHRhcmdldExlZnQgKyBkcm9wSGVhZGVyLm9mZnNldFdpZHRoIC0gTWF0aC5jZWlsKHRoaXMucmVvcmRlckljb25XaWR0aCAvIDIpKSArICdweCc7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wUG9zaXRpb24gPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW9yZGVySW5kaWNhdG9yVXBWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gKHRhcmdldExlZnQgLSBNYXRoLmNlaWwodGhpcy5yZW9yZGVySWNvbldpZHRoIC8gMikpICsgJ3B4JztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlb3JkZXJJbmRpY2F0b3JEb3duVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9ICh0YXJnZXRMZWZ0IC0gTWF0aC5jZWlsKHRoaXMucmVvcmRlckljb25XaWR0aCAvIDIpKSArICdweCc7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wUG9zaXRpb24gPSAtMTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoKGRyb3BJbmRleCAtIGRyYWdJbmRleCA9PT0gMSAmJiB0aGlzLmRyb3BQb3NpdGlvbiA9PT0gLTEpIHx8IChkcm9wSW5kZXggLSBkcmFnSW5kZXggPT09IC0xICYmIHRoaXMuZHJvcFBvc2l0aW9uID09PSAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVvcmRlckluZGljYXRvclVwVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlb3JkZXJJbmRpY2F0b3JEb3duVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVvcmRlckluZGljYXRvclVwVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW9yZGVySW5kaWNhdG9yRG93blZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Db2x1bW5EcmFnTGVhdmUoZXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5yZW9yZGVyYWJsZUNvbHVtbnMgJiYgdGhpcy5kcmFnZ2VkQ29sdW1uKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVvcmRlckluZGljYXRvclVwVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgdGhpcy5yZW9yZGVySW5kaWNhdG9yRG93blZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uQ29sdW1uRHJvcChldmVudCwgZHJvcENvbHVtbikge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuZHJhZ2dlZENvbHVtbikge1xyXG4gICAgICAgICAgICBsZXQgZHJhZ0luZGV4ID0gRG9tSGFuZGxlci5pbmRleFdpdGhpbkdyb3VwKHRoaXMuZHJhZ2dlZENvbHVtbiwgJ3ByZW9yZGVyYWJsZWNvbHVtbicpO1xyXG4gICAgICAgICAgICBsZXQgZHJvcEluZGV4ID0gRG9tSGFuZGxlci5pbmRleFdpdGhpbkdyb3VwKGRyb3BDb2x1bW4sICdwcmVvcmRlcmFibGVjb2x1bW4nKTtcclxuICAgICAgICAgICAgbGV0IGFsbG93RHJvcCA9IChkcmFnSW5kZXggIT0gZHJvcEluZGV4KTtcclxuICAgICAgICAgICAgaWYgKGFsbG93RHJvcCAmJiAoKGRyb3BJbmRleCAtIGRyYWdJbmRleCA9PSAxICYmIHRoaXMuZHJvcFBvc2l0aW9uID09PSAtMSkgfHwgKGRyYWdJbmRleCAtIGRyb3BJbmRleCA9PSAxICYmIHRoaXMuZHJvcFBvc2l0aW9uID09PSAxKSkpIHtcclxuICAgICAgICAgICAgICAgIGFsbG93RHJvcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoYWxsb3dEcm9wICYmICgoZHJvcEluZGV4IDwgZHJhZ0luZGV4ICYmIHRoaXMuZHJvcFBvc2l0aW9uID09PSAxKSkpIHtcclxuICAgICAgICAgICAgICAgIGRyb3BJbmRleCA9IGRyb3BJbmRleCArIDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChhbGxvd0Ryb3AgJiYgKChkcm9wSW5kZXggPiBkcmFnSW5kZXggJiYgdGhpcy5kcm9wUG9zaXRpb24gPT09IC0xKSkpIHtcclxuICAgICAgICAgICAgICAgIGRyb3BJbmRleCA9IGRyb3BJbmRleCAtIDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChhbGxvd0Ryb3ApIHtcclxuICAgICAgICAgICAgICAgIE9iamVjdFV0aWxzLnJlb3JkZXJBcnJheSh0aGlzLmNvbHVtbnMsIGRyYWdJbmRleCwgZHJvcEluZGV4KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29sUmVvcmRlci5lbWl0KHtcclxuICAgICAgICAgICAgICAgICAgICBkcmFnSW5kZXg6IGRyYWdJbmRleCxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wSW5kZXg6IGRyb3BJbmRleCxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNvbHVtbnNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU3RhdGVmdWwoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVvcmRlckluZGljYXRvclVwVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgdGhpcy5yZW9yZGVySW5kaWNhdG9yRG93blZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhZ2dlZENvbHVtbi5kcmFnZ2FibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5kcmFnZ2VkQ29sdW1uID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5kcm9wUG9zaXRpb24gPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblJvd0RyYWdTdGFydChldmVudCwgaW5kZXgpIHtcclxuICAgICAgICB0aGlzLnJvd0RyYWdnaW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmRyYWdnZWRSb3dJbmRleCA9IGluZGV4O1xyXG4gICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0JywgJ2InKTsgICAgLy8gRm9yIGZpcmVmb3hcclxuICAgIH1cclxuXHJcbiAgICBvblJvd0RyYWdPdmVyKGV2ZW50LCBpbmRleCwgcm93RWxlbWVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLnJvd0RyYWdnaW5nICYmIHRoaXMuZHJhZ2dlZFJvd0luZGV4ICE9PSBpbmRleCkge1xyXG4gICAgICAgICAgICBsZXQgcm93WSA9IERvbUhhbmRsZXIuZ2V0T2Zmc2V0KHJvd0VsZW1lbnQpLnRvcCArIERvbUhhbmRsZXIuZ2V0V2luZG93U2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgICAgIGxldCBwYWdlWSA9IGV2ZW50LnBhZ2VZO1xyXG4gICAgICAgICAgICBsZXQgcm93TWlkWSA9IHJvd1kgKyBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHJvd0VsZW1lbnQpIC8gMjtcclxuICAgICAgICAgICAgbGV0IHByZXZSb3dFbGVtZW50ID0gcm93RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBhZ2VZIDwgcm93TWlkWSkge1xyXG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyhyb3dFbGVtZW50LCAndWktdGFibGUtZHJhZ3BvaW50LWJvdHRvbScpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZHJvcHBlZFJvd0luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJldlJvd0VsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyhwcmV2Um93RWxlbWVudCwgJ3VpLXRhYmxlLWRyYWdwb2ludC1ib3R0b20nKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHJvd0VsZW1lbnQsICd1aS10YWJsZS1kcmFncG9pbnQtdG9wJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJldlJvd0VsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyhwcmV2Um93RWxlbWVudCwgJ3VpLXRhYmxlLWRyYWdwb2ludC1ib3R0b20nKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHJvd0VsZW1lbnQsICd1aS10YWJsZS1kcmFncG9pbnQtdG9wJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wcGVkUm93SW5kZXggPSBpbmRleCArIDE7XHJcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHJvd0VsZW1lbnQsICd1aS10YWJsZS1kcmFncG9pbnQtYm90dG9tJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Sb3dEcmFnTGVhdmUoZXZlbnQsIHJvd0VsZW1lbnQpIHtcclxuICAgICAgICBsZXQgcHJldlJvd0VsZW1lbnQgPSByb3dFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgaWYgKHByZXZSb3dFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3MocHJldlJvd0VsZW1lbnQsICd1aS10YWJsZS1kcmFncG9pbnQtYm90dG9tJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHJvd0VsZW1lbnQsICd1aS10YWJsZS1kcmFncG9pbnQtYm90dG9tJyk7XHJcbiAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyhyb3dFbGVtZW50LCAndWktdGFibGUtZHJhZ3BvaW50LXRvcCcpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUm93RHJhZ0VuZChldmVudCkge1xyXG4gICAgICAgIHRoaXMucm93RHJhZ2dpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmRyYWdnZWRSb3dJbmRleCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5kcm9wcGVkUm93SW5kZXggPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUm93RHJvcChldmVudCwgcm93RWxlbWVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRyb3BwZWRSb3dJbmRleCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxldCBkcm9wSW5kZXggPSAodGhpcy5kcmFnZ2VkUm93SW5kZXggPiB0aGlzLmRyb3BwZWRSb3dJbmRleCkgPyB0aGlzLmRyb3BwZWRSb3dJbmRleCA6ICh0aGlzLmRyb3BwZWRSb3dJbmRleCA9PT0gMCkgPyAwIDogdGhpcy5kcm9wcGVkUm93SW5kZXggLSAxO1xyXG4gICAgICAgICAgICBPYmplY3RVdGlscy5yZW9yZGVyQXJyYXkodGhpcy52YWx1ZSwgdGhpcy5kcmFnZ2VkUm93SW5kZXgsIGRyb3BJbmRleCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm9uUm93UmVvcmRlci5lbWl0KHtcclxuICAgICAgICAgICAgICAgIGRyYWdJbmRleDogdGhpcy5kcmFnZ2VkUm93SW5kZXgsXHJcbiAgICAgICAgICAgICAgICBkcm9wSW5kZXg6IGRyb3BJbmRleFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jbGVhbnVwXHJcbiAgICAgICAgdGhpcy5vblJvd0RyYWdMZWF2ZShldmVudCwgcm93RWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy5vblJvd0RyYWdFbmQoZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVZpcnR1YWxTY3JvbGwoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmZpcnN0ID0gKGV2ZW50LnBhZ2UgLSAxKSAqIHRoaXMucm93cztcclxuICAgICAgICB0aGlzLmZpcnN0Q2hhbmdlLmVtaXQodGhpcy5maXJzdCk7XHJcbiAgICAgICAgdGhpcy52aXJ0dWFsU2Nyb2xsQ2FsbGJhY2sgPSBldmVudC5jYWxsYmFjaztcclxuXHJcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZpcnR1YWxTY3JvbGxUaW1lcikge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudmlydHVhbFNjcm9sbFRpbWVyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy52aXJ0dWFsU2Nyb2xsVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHRoaXMuY3JlYXRlTGF6eUxvYWRNZXRhZGF0YSgpKTtcclxuICAgICAgICAgICAgfSwgdGhpcy52aXJ0dWFsU2Nyb2xsRGVsYXkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRW1wdHkoKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmZpbHRlcmVkVmFsdWV8fHRoaXMudmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIGRhdGEgPT0gbnVsbCB8fCBkYXRhLmxlbmd0aCA9PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEJsb2NrYWJsZUVsZW1lbnQoKTogSFRNTEVsZW1lbnTCoHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFN0b3JhZ2UoKSB7XHJcbiAgICAgICAgc3dpdGNoKHRoaXMuc3RhdGVTdG9yYWdlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2xvY2FsJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnc2Vzc2lvbic6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LnNlc3Npb25TdG9yYWdlO1xyXG5cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLnN0YXRlU3RvcmFnZSArICcgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIHRoZSBzdGF0ZSBzdG9yYWdlLCBzdXBwb3J0ZWQgdmFsdWVzIGFyZSBcImxvY2FsXCIgYW5kIFwic2Vzc2lvblwiLicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpc1N0YXRlZnVsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlS2V5ICE9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZVN0YXRlKCkge1xyXG4gICAgICAgIGNvbnN0IHN0b3JhZ2UgPSB0aGlzLmdldFN0b3JhZ2UoKTtcclxuICAgICAgICBsZXQgc3RhdGU6IFRhYmxlU3RhdGUgPSB7fTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucGFnaW5hdG9yKSB7XHJcbiAgICAgICAgICAgIHN0YXRlLmZpcnN0ID0gdGhpcy5maXJzdDtcclxuICAgICAgICAgICAgc3RhdGUucm93cyA9IHRoaXMucm93cztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNvcnRGaWVsZCkge1xyXG4gICAgICAgICAgICBzdGF0ZS5zb3J0RmllbGQgPSB0aGlzLnNvcnRGaWVsZDtcclxuICAgICAgICAgICAgc3RhdGUuc29ydE9yZGVyID0gdGhpcy5zb3J0T3JkZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5tdWx0aVNvcnRNZXRhKSB7XHJcbiAgICAgICAgICAgIHN0YXRlLm11bHRpU29ydE1ldGEgPSB0aGlzLm11bHRpU29ydE1ldGE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5oYXNGaWx0ZXIoKSkge1xyXG4gICAgICAgICAgICBzdGF0ZS5maWx0ZXJzID0gdGhpcy5maWx0ZXJzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucmVzaXphYmxlQ29sdW1ucykge1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVDb2x1bW5XaWR0aHMoc3RhdGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucmVvcmRlcmFibGVDb2x1bW5zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZUNvbHVtbk9yZGVyKHN0YXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICBzdGF0ZS5zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLmV4cGFuZGVkUm93S2V5cykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHN0YXRlLmV4cGFuZGVkUm93S2V5cyA9IHRoaXMuZXhwYW5kZWRSb3dLZXlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHN0YXRlKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKHRoaXMuc3RhdGVLZXksIEpTT04uc3RyaW5naWZ5KHN0YXRlKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm9uU3RhdGVTYXZlLmVtaXQoc3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyU3RhdGUoKSB7XHJcbiAgICAgICAgY29uc3Qgc3RvcmFnZSA9IHRoaXMuZ2V0U3RvcmFnZSgpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zdGF0ZUtleSkge1xyXG4gICAgICAgICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5zdGF0ZUtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlc3RvcmVTdGF0ZSgpIHtcclxuICAgICAgICBjb25zdCBzdG9yYWdlID0gdGhpcy5nZXRTdG9yYWdlKCk7XHJcbiAgICAgICAgY29uc3Qgc3RhdGVTdHJpbmcgPSBzdG9yYWdlLmdldEl0ZW0odGhpcy5zdGF0ZUtleSk7XHJcblxyXG4gICAgICAgIGlmIChzdGF0ZVN0cmluZykge1xyXG4gICAgICAgICAgICBsZXQgc3RhdGU6IFRhYmxlU3RhdGUgPSBKU09OLnBhcnNlKHN0YXRlU3RyaW5nKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2luYXRvcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdCA9IHN0YXRlLmZpcnN0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3dzID0gc3RhdGUucm93cztcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RDaGFuZ2UuZW1pdCh0aGlzLmZpcnN0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMucm93c0NoYW5nZS5lbWl0KHRoaXMucm93cyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0ZS5zb3J0RmllbGQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdG9yaW5nU29ydCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zb3J0RmllbGQgPSBzdGF0ZS5zb3J0RmllbGQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zb3J0T3JkZXIgPSBzdGF0ZS5zb3J0T3JkZXI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0ZS5tdWx0aVNvcnRNZXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RvcmluZ1NvcnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbXVsdGlTb3J0TWV0YSA9IHN0YXRlLm11bHRpU29ydE1ldGE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0ZS5maWx0ZXJzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RvcmluZ0ZpbHRlciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcnMgPSBzdGF0ZS5maWx0ZXJzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5yZXNpemFibGVDb2x1bW5zKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbHVtbldpZHRoc1N0YXRlID0gc3RhdGUuY29sdW1uV2lkdGhzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWJsZVdpZHRoU3RhdGUgPSBzdGF0ZS50YWJsZVdpZHRoO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdGUuZXhwYW5kZWRSb3dLZXlzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZGVkUm93S2V5cyA9IHN0YXRlLmV4cGFuZGVkUm93S2V5cztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXRlLnNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKG51bGwpLnRoZW4oKCkgPT4gdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdChzdGF0ZS5zZWxlY3Rpb24pKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zdGF0ZVJlc3RvcmVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMub25TdGF0ZVJlc3RvcmUuZW1pdChzdGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNhdmVDb2x1bW5XaWR0aHMoc3RhdGUpIHtcclxuICAgICAgICBsZXQgd2lkdGhzID0gW107XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBEb21IYW5kbGVyLmZpbmQodGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJy51aS10YWJsZS10aGVhZCA+IHRyOmZpcnN0LWNoaWxkID4gdGgnKTtcclxuICAgICAgICBoZWFkZXJzLm1hcChoZWFkZXIgPT4gd2lkdGhzLnB1c2goRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKGhlYWRlcikpKTtcclxuICAgICAgICBzdGF0ZS5jb2x1bW5XaWR0aHMgPSB3aWR0aHMuam9pbignLCcpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jb2x1bW5SZXNpemVNb2RlID09PSAnZXhwYW5kJykge1xyXG4gICAgICAgICAgICBzdGF0ZS50YWJsZVdpZHRoID0gdGhpcy5zY3JvbGxhYmxlID8gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICcudWktdGFibGUtc2Nyb2xsYWJsZS1oZWFkZXItdGFibGUnKS5zdHlsZS53aWR0aCA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aCh0aGlzLnRhYmxlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpICsgJ3B4JztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVzdG9yZUNvbHVtbldpZHRocygpIHtcclxuICAgICAgICBpZiAodGhpcy5jb2x1bW5XaWR0aHNTdGF0ZSkge1xyXG4gICAgICAgICAgICBsZXQgd2lkdGhzID0gdGhpcy5jb2x1bW5XaWR0aHNTdGF0ZS5zcGxpdCgnLCcpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuY29sdW1uUmVzaXplTW9kZSA9PT0gJ2V4cGFuZCcgJiYgdGhpcy50YWJsZVdpZHRoU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjcm9sbGFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFNjcm9sbGFibGVJdGVtc1dpZHRoT25FeHBhbmRSZXNpemUobnVsbCwgdGhpcy50YWJsZVdpZHRoU3RhdGUsIDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWJsZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoID0gdGhpcy50YWJsZVdpZHRoU3RhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS53aWR0aCA9IHRoaXMudGFibGVXaWR0aFN0YXRlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaGVhZGVyQ29scyA9IERvbUhhbmRsZXIuZmluZCh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnLnVpLXRhYmxlLXNjcm9sbGFibGUtaGVhZGVyLXRhYmxlID4gY29sZ3JvdXAgPiBjb2wnKTtcclxuICAgICAgICAgICAgICAgIGxldCBib2R5Q29scyA9IERvbUhhbmRsZXIuZmluZCh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnLnVpLXRhYmxlLXNjcm9sbGFibGUtYm9keS10YWJsZSA+IGNvbGdyb3VwID4gY29sJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaGVhZGVyQ29scy5tYXAoKGNvbCwgaW5kZXgpID0+IGNvbC5zdHlsZS53aWR0aCA9IHdpZHRoc1tpbmRleF0gKyAncHgnKTtcclxuICAgICAgICAgICAgICAgIGJvZHlDb2xzLm1hcCgoY29sLCBpbmRleCkgPT4gY29sLnN0eWxlLndpZHRoID0gd2lkdGhzW2luZGV4XSArICdweCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IGhlYWRlcnMgPSBEb21IYW5kbGVyLmZpbmQodGhpcy50YWJsZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAnLnVpLXRhYmxlLXRoZWFkID4gdHI6Zmlyc3QtY2hpbGQgPiB0aCcpO1xyXG4gICAgICAgICAgICAgICAgaGVhZGVycy5tYXAoKGhlYWRlciwgaW5kZXgpID0+IGhlYWRlci5zdHlsZS53aWR0aCA9IHdpZHRoc1tpbmRleF0gKyAncHgnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzYXZlQ29sdW1uT3JkZXIoc3RhdGUpIHtcclxuICAgICAgICBpZiAodGhpcy5jb2x1bW5zKSB7XHJcbiAgICAgICAgICAgIGxldCBjb2x1bW5PcmRlcjogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5jb2x1bW5zLm1hcChjb2x1bW4gPT4ge1xyXG4gICAgICAgICAgICAgICAgY29sdW1uT3JkZXIucHVzaChjb2x1bW4uZmllbGR8fGNvbHVtbi5rZXkpXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc3RhdGUuY29sdW1uT3JkZXIgPSBjb2x1bW5PcmRlcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVzdG9yZUNvbHVtbk9yZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHN0b3JhZ2UgPSB0aGlzLmdldFN0b3JhZ2UoKTtcclxuICAgICAgICBjb25zdCBzdGF0ZVN0cmluZyA9IHN0b3JhZ2UuZ2V0SXRlbSh0aGlzLnN0YXRlS2V5KTtcclxuICAgICAgICBpZiAoc3RhdGVTdHJpbmcpIHtcclxuICAgICAgICAgICAgbGV0IHN0YXRlOiBUYWJsZVN0YXRlID0gSlNPTi5wYXJzZShzdGF0ZVN0cmluZyk7XHJcbiAgICAgICAgICAgIGxldCBjb2x1bW5PcmRlciA9IHN0YXRlLmNvbHVtbk9yZGVyO1xyXG4gICAgICAgICAgICBpZiAoY29sdW1uT3JkZXIpIHtcclxuICAgICAgICAgICAgICAgIGxldCByZW9yZGVyZWRDb2x1bW5zID0gW107XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5PcmRlci5tYXAoa2V5ID0+IHJlb3JkZXJlZENvbHVtbnMucHVzaCh0aGlzLmZpbmRDb2x1bW5CeUtleShrZXkpKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbHVtbk9yZGVyU3RhdGVSZXN0b3JlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbHVtbnMgPSByZW9yZGVyZWRDb2x1bW5zO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZpbmRDb2x1bW5CeUtleShrZXkpIHtcclxuICAgICAgICBpZiAodGhpcy5jb2x1bW5zKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGNvbCBvZiB0aGlzLmNvbHVtbnMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb2wua2V5ID09PSBrZXkgfHwgY29sLmZpZWxkID09PSBrZXkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbDtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRFZGl0TGlzdGVuZXIoKTtcclxuICAgICAgICB0aGlzLmVkaXRpbmdDZWxsID0gbnVsbDtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gbnVsbDtcclxuICAgIH1cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ1twVGFibGVCb2R5XScsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhZHQuZXhwYW5kZWRSb3dUZW1wbGF0ZVwiPlxyXG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LXJvd0RhdGEgbGV0LXJvd0luZGV4PVwiaW5kZXhcIiBbbmdGb3JPZl09XCIoZHQucGFnaW5hdG9yICYmICFkdC5sYXp5KSA/ICgoZHQuZmlsdGVyZWRWYWx1ZXx8ZHQudmFsdWUpIHwgc2xpY2U6ZHQuZmlyc3Q6KGR0LmZpcnN0ICsgZHQucm93cykpIDogKGR0LmZpbHRlcmVkVmFsdWV8fGR0LnZhbHVlKVwiIFtuZ0ZvclRyYWNrQnldPVwiZHQucm93VHJhY2tCeVwiPlxyXG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiByb3dEYXRhLCByb3dJbmRleDogZHQucGFnaW5hdG9yID8gKGR0LmZpcnN0ICsgcm93SW5kZXgpIDogcm93SW5kZXgsIGNvbHVtbnM6IGNvbHVtbnMsIGVkaXRpbmc6IChkdC5lZGl0TW9kZSA9PT0gJ3JvdycgJiYgZHQuaXNSb3dFZGl0aW5nKHJvd0RhdGEpKX1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZHQuZXhwYW5kZWRSb3dUZW1wbGF0ZVwiPlxyXG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LXJvd0RhdGEgbGV0LXJvd0luZGV4PVwiaW5kZXhcIiBbbmdGb3JPZl09XCIoZHQucGFnaW5hdG9yICYmICFkdC5sYXp5KSA/ICgoZHQuZmlsdGVyZWRWYWx1ZXx8ZHQudmFsdWUpIHwgc2xpY2U6ZHQuZmlyc3Q6KGR0LmZpcnN0ICsgZHQucm93cykpIDogKGR0LmZpbHRlcmVkVmFsdWV8fGR0LnZhbHVlKVwiIFtuZ0ZvclRyYWNrQnldPVwiZHQucm93VHJhY2tCeVwiPlxyXG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiByb3dEYXRhLCByb3dJbmRleDogZHQucGFnaW5hdG9yID8gKGR0LmZpcnN0ICsgcm93SW5kZXgpIDogcm93SW5kZXgsIGNvbHVtbnM6IGNvbHVtbnMsIGV4cGFuZGVkOiBkdC5pc1Jvd0V4cGFuZGVkKHJvd0RhdGEpLCBlZGl0aW5nOiAoZHQuZWRpdE1vZGUgPT09ICdyb3cnICYmIGR0LmlzUm93RWRpdGluZyhyb3dEYXRhKSl9XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZHQuaXNSb3dFeHBhbmRlZChyb3dEYXRhKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkdC5leHBhbmRlZFJvd1RlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiByb3dEYXRhLCByb3dJbmRleDogZHQucGFnaW5hdG9yID8gKGR0LmZpcnN0ICsgcm93SW5kZXgpIDogcm93SW5kZXgsIGNvbHVtbnM6IGNvbHVtbnN9XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZHQubG9hZGluZ1wiPlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZHQubG9hZGluZ0JvZHlUZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogY29sdW1ucywgZnJvemVuOiBmcm96ZW59XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImR0LmlzRW1wdHkoKSAmJiAhZHQubG9hZGluZ1wiPlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZHQuZW1wdHlNZXNzYWdlVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IGNvbHVtbnMsIGZyb3plbjogZnJvemVufVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFibGVCb2R5IHtcclxuXHJcbiAgICBASW5wdXQoXCJwVGFibGVCb2R5XCIpIGNvbHVtbnM6IGFueVtdO1xyXG5cclxuICAgIEBJbnB1dChcInBUYWJsZUJvZHlUZW1wbGF0ZVwiKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgICBASW5wdXQoKSBmcm96ZW46IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSkge31cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ1twU2Nyb2xsYWJsZVZpZXddJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiAjc2Nyb2xsSGVhZGVyIGNsYXNzPVwidWktdGFibGUtc2Nyb2xsYWJsZS1oZWFkZXIgdWktd2lkZ2V0LWhlYWRlclwiPlxyXG4gICAgICAgICAgICA8ZGl2ICNzY3JvbGxIZWFkZXJCb3ggY2xhc3M9XCJ1aS10YWJsZS1zY3JvbGxhYmxlLWhlYWRlci1ib3hcIj5cclxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cInVpLXRhYmxlLXNjcm9sbGFibGUtaGVhZGVyLXRhYmxlXCIgW25nQ2xhc3NdPVwiZHQudGFibGVTdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwiZHQudGFibGVTdHlsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJmcm96ZW4gPyBkdC5mcm96ZW5Db2xHcm91cFRlbXBsYXRlfHxkdC5jb2xHcm91cFRlbXBsYXRlIDogZHQuY29sR3JvdXBUZW1wbGF0ZTsgY29udGV4dCB7JGltcGxpY2l0OiBjb2x1bW5zfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0aGVhZCBjbGFzcz1cInVpLXRhYmxlLXRoZWFkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJmcm96ZW4gPyBkdC5mcm96ZW5IZWFkZXJUZW1wbGF0ZXx8ZHQuaGVhZGVyVGVtcGxhdGUgOiBkdC5oZWFkZXJUZW1wbGF0ZTsgY29udGV4dCB7JGltcGxpY2l0OiBjb2x1bW5zfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRib2R5IGNsYXNzPVwidWktdGFibGUtdGJvZHlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1yb3dEYXRhIGxldC1yb3dJbmRleD1cImluZGV4XCIgW25nRm9yT2ZdPVwiZHQuZnJvemVuVmFsdWVcIiBbbmdGb3JUcmFja0J5XT1cImR0LnJvd1RyYWNrQnlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkdC5mcm96ZW5Sb3dzVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IHJvd0RhdGEsIHJvd0luZGV4OiByb3dJbmRleCwgY29sdW1uczogY29sdW1uc31cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiAjc2Nyb2xsQm9keSBjbGFzcz1cInVpLXRhYmxlLXNjcm9sbGFibGUtYm9keVwiPlxyXG4gICAgICAgICAgICA8dGFibGUgI3Njcm9sbFRhYmxlIFtuZ0NsYXNzXT1cInsndWktdGFibGUtc2Nyb2xsYWJsZS1ib2R5LXRhYmxlJzogdHJ1ZSwgJ3VpLXRhYmxlLXZpcnR1YWwtdGFibGUnOiBkdC52aXJ0dWFsU2Nyb2xsfVwiIFtjbGFzc109XCJkdC50YWJsZVN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJkdC50YWJsZVN0eWxlXCI+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZnJvemVuID8gZHQuZnJvemVuQ29sR3JvdXBUZW1wbGF0ZXx8ZHQuY29sR3JvdXBUZW1wbGF0ZSA6IGR0LmNvbEdyb3VwVGVtcGxhdGU7IGNvbnRleHQgeyRpbXBsaWNpdDogY29sdW1uc31cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgIDx0Ym9keSBjbGFzcz1cInVpLXRhYmxlLXRib2R5XCIgW3BUYWJsZUJvZHldPVwiY29sdW1uc1wiIFtwVGFibGVCb2R5VGVtcGxhdGVdPVwiZnJvemVuID8gZHQuZnJvemVuQm9keVRlbXBsYXRlfHxkdC5ib2R5VGVtcGxhdGUgOiBkdC5ib2R5VGVtcGxhdGVcIiBbZnJvemVuXT1cImZyb3plblwiPjwvdGJvZHk+XHJcbiAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgIDx0YWJsZSAjbG9hZGluZ1RhYmxlICpuZ0lmPVwiZHQudmlydHVhbFNjcm9sbCAmJiBkdC5sb2FkaW5nQm9keVRlbXBsYXRlICE9IG51bGxcIiBbbmdDbGFzc109XCJ7J3VpLXRhYmxlLXNjcm9sbGFibGUtYm9keS10YWJsZSB1aS10YWJsZS1sb2FkaW5nLXZpcnR1YWwtdGFibGUnOiB0cnVlLCAndWktdGFibGUtdmlydHVhbC10YWJsZSc6IGR0LnZpcnR1YWxTY3JvbGx9XCI+XHJcbiAgICAgICAgICAgICAgICA8dGJvZHkgY2xhc3M9XCJ1aS10YWJsZS10Ym9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBbbmdGb3JPZl09XCJsb2FkaW5nQXJyYXlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImR0LmxvYWRpbmdCb2R5VGVtcGxhdGU7IGNvbnRleHQ6IHtjb2x1bW5zOiBjb2x1bW5zfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgICA8ZGl2ICNzY3JvbGxhYmxlQWxpZ25lciBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnRcIiAqbmdJZj1cImZyb3plblwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2ICN2aXJ0dWFsU2Nyb2xsZXIgY2xhc3M9XCJ1aS10YWJsZS12aXJ0dWFsLXNjcm9sbGVyXCIgKm5nSWY9XCJkdC52aXJ0dWFsU2Nyb2xsXCI+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiAjc2Nyb2xsRm9vdGVyIGNsYXNzPVwidWktdGFibGUtc2Nyb2xsYWJsZS1mb290ZXIgdWktd2lkZ2V0LWhlYWRlclwiPlxyXG4gICAgICAgICAgICA8ZGl2ICNzY3JvbGxGb290ZXJCb3ggY2xhc3M9XCJ1aS10YWJsZS1zY3JvbGxhYmxlLWZvb3Rlci1ib3hcIj5cclxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cInVpLXRhYmxlLXNjcm9sbGFibGUtZm9vdGVyLXRhYmxlXCIgW25nQ2xhc3NdPVwiZHQudGFibGVTdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwiZHQudGFibGVTdHlsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJmcm96ZW4gPyBkdC5mcm96ZW5Db2xHcm91cFRlbXBsYXRlfHxkdC5jb2xHcm91cFRlbXBsYXRlIDogZHQuY29sR3JvdXBUZW1wbGF0ZTsgY29udGV4dCB7JGltcGxpY2l0OiBjb2x1bW5zfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0Zm9vdCBjbGFzcz1cInVpLXRhYmxlLXRmb290XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJmcm96ZW4gPyBkdC5mcm96ZW5Gb290ZXJUZW1wbGF0ZXx8ZHQuZm9vdGVyVGVtcGxhdGUgOiBkdC5mb290ZXJUZW1wbGF0ZTsgY29udGV4dCB7JGltcGxpY2l0OiBjb2x1bW5zfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGZvb3Q+XHJcbiAgICAgICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIFNjcm9sbGFibGVWaWV3IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCxPbkRlc3Ryb3ksQWZ0ZXJWaWV3Q2hlY2tlZCB7XHJcblxyXG4gICAgQElucHV0KFwicFNjcm9sbGFibGVWaWV3XCIpIGNvbHVtbnM6IGFueVtdO1xyXG5cclxuICAgIEBJbnB1dCgpIGZyb3plbjogYm9vbGVhbjtcclxuXHJcbiAgICBAVmlld0NoaWxkKCdzY3JvbGxIZWFkZXInKSBzY3JvbGxIZWFkZXJWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnc2Nyb2xsSGVhZGVyQm94Jykgc2Nyb2xsSGVhZGVyQm94Vmlld0NoaWxkOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ3Njcm9sbEJvZHknKSBzY3JvbGxCb2R5Vmlld0NoaWxkOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ3Njcm9sbFRhYmxlJykgc2Nyb2xsVGFibGVWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnbG9hZGluZ1RhYmxlJykgc2Nyb2xsTG9hZGluZ1RhYmxlVmlld0NoaWxkOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ3Njcm9sbEZvb3RlcicpIHNjcm9sbEZvb3RlclZpZXdDaGlsZDogRWxlbWVudFJlZjtcclxuXHJcbiAgICBAVmlld0NoaWxkKCdzY3JvbGxGb290ZXJCb3gnKSBzY3JvbGxGb290ZXJCb3hWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgQFZpZXdDaGlsZCgndmlydHVhbFNjcm9sbGVyJykgdmlydHVhbFNjcm9sbGVyVmlld0NoaWxkOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ3Njcm9sbGFibGVBbGlnbmVyJykgc2Nyb2xsYWJsZUFsaWduZXJWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgaGVhZGVyU2Nyb2xsTGlzdGVuZXI6IEZ1bmN0aW9uO1xyXG5cclxuICAgIGJvZHlTY3JvbGxMaXN0ZW5lcjogRnVuY3Rpb247XHJcblxyXG4gICAgZm9vdGVyU2Nyb2xsTGlzdGVuZXI6IEZ1bmN0aW9uO1xyXG5cclxuICAgIGZyb3plblNpYmxpbmdCb2R5OiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgICBzY3JvbGxhYmxlU2libGluZ0JvZHk6IEVsZW1lbnQ7XHJcblxyXG4gICAgX3Njcm9sbEhlaWdodDogc3RyaW5nO1xyXG5cclxuICAgIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAgIHRvdGFsUmVjb3Jkc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAgIGNvbHVtbnNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgICBpbml0aWFsaXplZDogYm9vbGVhbjtcclxuXHJcbiAgICBwcmV2ZW50Qm9keVNjcm9sbFByb3BhZ2F0aW9uOiBib29sZWFuO1xyXG5cclxuICAgIGxvYWRpbmdBcnJheTogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgICBsYXN0Qm9keVNjcm9sbFRvcDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHQ6IFRhYmxlLCBwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyB6b25lOiBOZ1pvbmUpIHtcclxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuZHQudGFibGVTZXJ2aWNlLnZhbHVlU291cmNlJC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGlnblNjcm9sbEJhcigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxMb2FkaW5nVGFibGVWaWV3Q2hpbGQgJiYgdGhpcy5zY3JvbGxMb2FkaW5nVGFibGVWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbExvYWRpbmdUYWJsZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgNTApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZHQudmlydHVhbFNjcm9sbCkge1xyXG4gICAgICAgICAgICB0aGlzLnRvdGFsUmVjb3Jkc1N1YnNjcmlwdGlvbiA9IHRoaXMuZHQudGFibGVTZXJ2aWNlLnRvdGFsUmVjb3Jkc1NvdXJjZSQuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmlydHVhbFNjcm9sbGVySGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgNTApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5sb2FkaW5nQXJyYXkgPSBBcnJheSh0aGlzLmR0LnJvd3MpLmZpbGwoMSk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuICAgICB9XHJcblxyXG4gICAgQElucHV0KCkgZ2V0IHNjcm9sbEhlaWdodCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zY3JvbGxIZWlnaHQ7XHJcbiAgICB9XHJcbiAgICBzZXQgc2Nyb2xsSGVpZ2h0KHZhbDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fc2Nyb2xsSGVpZ2h0ID0gdmFsO1xyXG4gICAgICAgIHRoaXMuc2V0U2Nyb2xsSGVpZ2h0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pbml0aWFsaXplZCAmJiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0UGFyZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWxpZ25TY3JvbGxCYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTY3JvbGxIZWlnaHQoKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZnJvemVuKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmR0LmZyb3plbkNvbHVtbnMgfHwgdGhpcy5kdC5mcm96ZW5Cb2R5VGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndWktdGFibGUtdW5mcm96ZW4tdmlldycpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgZnJvemVuVmlldyA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICBpZiAoZnJvemVuVmlldykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcm96ZW5TaWJsaW5nQm9keSA9IERvbUhhbmRsZXIuZmluZFNpbmdsZShmcm96ZW5WaWV3LCAnLnVpLXRhYmxlLXNjcm9sbGFibGUtYm9keScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxhYmxlQWxpZ25lclZpZXdDaGlsZCAmJiB0aGlzLnNjcm9sbGFibGVBbGlnbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsYWJsZUFsaWduZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBEb21IYW5kbGVyLmNhbGN1bGF0ZVNjcm9sbGJhckhlaWdodCgpICsgJ3B4JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgc2Nyb2xsYWJsZVZpZXcgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICBpZiAoc2Nyb2xsYWJsZVZpZXcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsYWJsZVNpYmxpbmdCb2R5ID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHNjcm9sbGFibGVWaWV3LCAnLnVpLXRhYmxlLXNjcm9sbGFibGUtYm9keScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICAgICAgICB0aGlzLnNldFNjcm9sbEhlaWdodCgpO1xyXG4gICAgICAgIHRoaXMuYWxpZ25TY3JvbGxCYXIoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZnJvemVuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29sdW1uc1N1YnNjcmlwdGlvbiA9IHRoaXMuZHQudGFibGVTZXJ2aWNlLmNvbHVtbnNTb3VyY2UkLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFNjcm9sbEhlaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDUwKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmR0LnZpcnR1YWxTY3JvbGwpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRWaXJ0dWFsU2Nyb2xsZXJIZWlnaHQoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNjcm9sbExvYWRpbmdUYWJsZVZpZXdDaGlsZCAmJiB0aGlzLnNjcm9sbExvYWRpbmdUYWJsZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbExvYWRpbmdUYWJsZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAndGFibGUnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJpbmRFdmVudHMoKSB7XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsSGVhZGVyVmlld0NoaWxkICYmIHRoaXMuc2Nyb2xsSGVhZGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyU2Nyb2xsTGlzdGVuZXIgPSB0aGlzLm9uSGVhZGVyU2Nyb2xsLmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbEhlYWRlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGVhZGVyU2Nyb2xsTGlzdGVuZXIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxGb290ZXJWaWV3Q2hpbGQgJiYgdGhpcy5zY3JvbGxGb290ZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb290ZXJTY3JvbGxMaXN0ZW5lciA9IHRoaXMub25Gb290ZXJTY3JvbGwuYmluZCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsRm9vdGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5mb290ZXJTY3JvbGxMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5mcm96ZW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYm9keVNjcm9sbExpc3RlbmVyID0gdGhpcy5vbkJvZHlTY3JvbGwuYmluZCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsQm9keVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuYm9keVNjcm9sbExpc3RlbmVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVuYmluZEV2ZW50cygpIHtcclxuICAgICAgICBpZiAodGhpcy5zY3JvbGxIZWFkZXJWaWV3Q2hpbGQgJiYgdGhpcy5zY3JvbGxIZWFkZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhlYWRlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGVhZGVyU2Nyb2xsTGlzdGVuZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsRm9vdGVyVmlld0NoaWxkICYmIHRoaXMuc2Nyb2xsRm9vdGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxGb290ZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmZvb3RlclNjcm9sbExpc3RlbmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2Nyb2xsQm9keVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuYm9keVNjcm9sbExpc3RlbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkhlYWRlclNjcm9sbChldmVudCkge1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbExlZnQgPSB0aGlzLnNjcm9sbEhlYWRlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQ7XHJcblxyXG4gICAgICAgIHRoaXMuc2Nyb2xsQm9keVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQgPSBzY3JvbGxMZWZ0O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zY3JvbGxGb290ZXJWaWV3Q2hpbGQgJiYgdGhpcy5zY3JvbGxGb290ZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbEZvb3RlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQgPSBzY3JvbGxMZWZ0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wcmV2ZW50Qm9keVNjcm9sbFByb3BhZ2F0aW9uID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkZvb3RlclNjcm9sbChldmVudCkge1xyXG4gICAgICAgIGNvbnN0IHNjcm9sbExlZnQgPSB0aGlzLnNjcm9sbEZvb3RlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQ7XHJcblxyXG4gICAgICAgIHRoaXMuc2Nyb2xsQm9keVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQgPSBzY3JvbGxMZWZ0O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zY3JvbGxIZWFkZXJWaWV3Q2hpbGQgJiYgdGhpcy5zY3JvbGxIZWFkZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhlYWRlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQgPSBzY3JvbGxMZWZ0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wcmV2ZW50Qm9keVNjcm9sbFByb3BhZ2F0aW9uID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkJvZHlTY3JvbGwoZXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5wcmV2ZW50Qm9keVNjcm9sbFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJldmVudEJvZHlTY3JvbGxQcm9wYWdhdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zY3JvbGxIZWFkZXJWaWV3Q2hpbGQgJiYgdGhpcy5zY3JvbGxIZWFkZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhlYWRlckJveFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLm1hcmdpbkxlZnQgPSAtMSAqIHRoaXMuc2Nyb2xsQm9keVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQgKyAncHgnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsRm9vdGVyVmlld0NoaWxkICYmIHRoaXMuc2Nyb2xsRm9vdGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxGb290ZXJCb3hWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5tYXJnaW5MZWZ0ID0gLTEgKiB0aGlzLnNjcm9sbEJvZHlWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zY3JvbGxMZWZ0ICsgJ3B4JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmZyb3plblNpYmxpbmdCb2R5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZnJvemVuU2libGluZ0JvZHkuc2Nyb2xsVG9wID0gdGhpcy5zY3JvbGxCb2R5Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZHQudmlydHVhbFNjcm9sbCkge1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGFzdEJvZHlTY3JvbGxUb3AgIT09IHRoaXMuc2Nyb2xsQm9keVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdEJvZHlTY3JvbGxUb3AgPSB0aGlzLnNjcm9sbEJvZHlWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zY3JvbGxUb3A7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZpZXdwb3J0ID0gRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodCh0aGlzLnNjcm9sbEJvZHlWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRhYmxlSGVpZ2h0ID0gRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodCh0aGlzLnNjcm9sbFRhYmxlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwYWdlSGVpZ2h0ID0gdGhpcy5kdC52aXJ0dWFsUm93SGVpZ2h0ICogdGhpcy5kdC5yb3dzO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2aXJ0dWFsVGFibGVIZWlnaHQgPSBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHRoaXMudmlydHVhbFNjcm9sbGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwYWdlQ291bnQgPSAodmlydHVhbFRhYmxlSGVpZ2h0IC8gcGFnZUhlaWdodCl8fDE7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjcm9sbEJvZHlUb3AgPSB0aGlzLnNjcm9sbFRhYmxlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wfHwnMCc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICgodGhpcy5zY3JvbGxCb2R5Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wICsgdmlld3BvcnQgPiBwYXJzZUZsb2F0KHNjcm9sbEJvZHlUb3ApICsgdGFibGVIZWlnaHQpIHx8wqAodGhpcy5zY3JvbGxCb2R5Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wIDwgcGFyc2VGbG9hdChzY3JvbGxCb2R5VG9wKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsTG9hZGluZ1RhYmxlVmlld0NoaWxkICYmIHRoaXMuc2Nyb2xsTG9hZGluZ1RhYmxlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsTG9hZGluZ1RhYmxlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICd0YWJsZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbExvYWRpbmdUYWJsZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcCA9IHRoaXMuc2Nyb2xsQm9keVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCArICdweCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYWdlID0gTWF0aC5mbG9vcigodGhpcy5zY3JvbGxCb2R5Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wICogcGFnZUNvdW50KSAvICh0aGlzLnNjcm9sbEJvZHlWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zY3JvbGxIZWlnaHQpKSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHQuaGFuZGxlVmlydHVhbFNjcm9sbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlOiBwYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxMb2FkaW5nVGFibGVWaWV3Q2hpbGQgJiYgdGhpcy5zY3JvbGxMb2FkaW5nVGFibGVWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbExvYWRpbmdUYWJsZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFRhYmxlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gKChwYWdlIC0gMSkgKiBwYWdlSGVpZ2h0KSArICdweCc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyb3plblNpYmxpbmdCb2R5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICg8SFRNTEVsZW1lbnQ+IHRoaXMuZnJvemVuU2libGluZ0JvZHkuY2hpbGRyZW5bMF0pLnN0eWxlLnRvcCA9IHRoaXMuc2Nyb2xsVGFibGVWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS50b3A7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmR0LmFuY2hvclJvd0luZGV4ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2Nyb2xsSGVpZ2h0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNjcm9sbEhlaWdodCAmJiB0aGlzLnNjcm9sbEJvZHlWaWV3Q2hpbGQgJiYgdGhpcy5zY3JvbGxCb2R5Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZnJvemVuU2libGluZ0JvZHkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsQm9keVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLm1heEhlaWdodCA9IHRoaXMuZnJvemVuU2libGluZ0JvZHkuc3R5bGUubWF4SGVpZ2h0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsSGVpZ2h0LmluZGV4T2YoJyUnKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVsYXRpdmVIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxCb2R5Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsQm9keVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLmhlaWdodCA9ICcxMDBweCc7ICAgICAvL3RlbXBvcmFyeSBoZWlnaHQgdG8gY2FsY3VsYXRlIHN0YXRpYyBoZWlnaHRcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVySGVpZ2h0ID0gRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodCh0aGlzLmR0LmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxIZWlnaHQuaW5jbHVkZXMoXCJjYWxjXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwZXJjZW50SGVpZ2h0ID0gcGFyc2VJbnQodGhpcy5zY3JvbGxIZWlnaHQuc2xpY2UodGhpcy5zY3JvbGxIZWlnaHQuaW5kZXhPZihcIihcIikgKyAxLCB0aGlzLnNjcm9sbEhlaWdodC5pbmRleE9mKFwiJVwiKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlmZlZhbHVlID0gcGFyc2VJbnQodGhpcy5zY3JvbGxIZWlnaHQuc2xpY2UodGhpcy5zY3JvbGxIZWlnaHQuaW5kZXhPZihcIi1cIikgKyAxLCB0aGlzLnNjcm9sbEhlaWdodC5pbmRleE9mKFwiKVwiKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZUhlaWdodCA9IChEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHRoaXMuZHQuZWwubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50KSAqIHBlcmNlbnRIZWlnaHQgLyAxMDApIC0gZGlmZlZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmVIZWlnaHQgPSBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHRoaXMuZHQuZWwubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50KSAqIHBhcnNlSW50KHRoaXMuc2Nyb2xsSGVpZ2h0KSAvIDEwMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGF0aWNIZWlnaHQgPSBjb250YWluZXJIZWlnaHQgLSAxMDA7ICAgLy90b3RhbCBoZWlnaHQgb2YgaGVhZGVycywgZm9vdGVycywgcGFnaW5hdG9yc1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzY3JvbGxCb2R5SGVpZ2h0ID0gKHJlbGF0aXZlSGVpZ2h0IC0gc3RhdGljSGVpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJvemVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbEJvZHlIZWlnaHQgLT0gRG9tSGFuZGxlci5jYWxjdWxhdGVTY3JvbGxiYXJXaWR0aCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxCb2R5Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsQm9keVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLm1heEhlaWdodCA9IHNjcm9sbEJvZHlIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsQm9keVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbEJvZHlWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5tYXhIZWlnaHQgPSB0aGlzLnNjcm9sbEhlaWdodDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRWaXJ0dWFsU2Nyb2xsZXJIZWlnaHQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudmlydHVhbFNjcm9sbGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy52aXJ0dWFsU2Nyb2xsZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSB0aGlzLmR0LnRvdGFsUmVjb3JkcyAqIHRoaXMuZHQudmlydHVhbFJvd0hlaWdodCArICdweCc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhc1ZlcnRpY2FsT3ZlcmZsb3coKSB7XHJcbiAgICAgICAgcmV0dXJuIERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5zY3JvbGxUYWJsZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSA+IERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5zY3JvbGxCb2R5Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGFsaWduU2Nyb2xsQmFyKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5mcm96ZW4pIHtcclxuICAgICAgICAgICAgbGV0IHNjcm9sbEJhcldpZHRoID0gdGhpcy5oYXNWZXJ0aWNhbE92ZXJmbG93KCkgPyBEb21IYW5kbGVyLmNhbGN1bGF0ZVNjcm9sbGJhcldpZHRoKCkgOiAwO1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbEhlYWRlckJveFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLm1hcmdpblJpZ2h0ID0gc2Nyb2xsQmFyV2lkdGggKyAncHgnO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsRm9vdGVyQm94Vmlld0NoaWxkICYmIHRoaXMuc2Nyb2xsRm9vdGVyQm94Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsRm9vdGVyQm94Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUubWFyZ2luUmlnaHQgPSBzY3JvbGxCYXJXaWR0aCArICdweCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMudW5iaW5kRXZlbnRzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZnJvemVuU2libGluZ0JvZHkgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRvdGFsUmVjb3Jkc1N1YnNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLnRvdGFsUmVjb3Jkc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY29sdW1uc1N1YnNjcmlwdGlvbinCoHtcclxuICAgICAgICAgICAgdGhpcy5jb2x1bW5zU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbcFNvcnRhYmxlQ29sdW1uXScsXHJcbiAgICBob3N0OiB7XHJcbiAgICAgICAgJ1tjbGFzcy51aS1zb3J0YWJsZS1jb2x1bW5dJzogJ2lzRW5hYmxlZCgpJyxcclxuICAgICAgICAnW2NsYXNzLnVpLXN0YXRlLWhpZ2hsaWdodF0nOiAnc29ydGVkJyxcclxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ2lzRW5hYmxlZCgpID8gXCIwXCIgOiBudWxsJyxcclxuICAgICAgICAnW2F0dHIucm9sZV0nOiAnXCJjb2x1bW5oZWFkZXJcIicsXHJcbiAgICAgICAgJ1thdHRyLmFyaWEtc29ydF0nOiAnc29ydE9yZGVyJ1xyXG4gICAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU29ydGFibGVDb2x1bW4gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gICAgQElucHV0KFwicFNvcnRhYmxlQ29sdW1uXCIpIGZpZWxkOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgcFNvcnRhYmxlQ29sdW1uRGlzYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgc29ydGVkOiBib29sZWFuO1xyXG5cclxuICAgIHNvcnRPcmRlcjogc3RyaW5nO1xyXG5cclxuICAgIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkdDogVGFibGUpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuZHQudGFibGVTZXJ2aWNlLnNvcnRTb3VyY2UkLnN1YnNjcmliZShzb3J0TWV0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNvcnRTdGF0ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVTb3J0U3RhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlU29ydFN0YXRlKCkge1xyXG4gICAgICAgIHRoaXMuc29ydGVkID0gdGhpcy5kdC5pc1NvcnRlZCh0aGlzLmZpZWxkKTtcclxuICAgICAgICB0aGlzLnNvcnRPcmRlciA9IHRoaXMuc29ydGVkID8gKHRoaXMuZHQuc29ydE9yZGVyID09PSAxID8gJ2FzY2VuZGluZycgOiAnZGVzY2VuZGluZycpIDogJ25vbmUnO1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcclxuICAgIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNvcnRTdGF0ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmR0LnNvcnQoe1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXHJcbiAgICAgICAgICAgICAgICBmaWVsZDogdGhpcy5maWVsZFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIERvbUhhbmRsZXIuY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5lbnRlcicsIFsnJGV2ZW50J10pXHJcbiAgICBvbkVudGVyS2V5KGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5vbkNsaWNrKGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBpc0VuYWJsZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucFNvcnRhYmxlQ29sdW1uRGlzYWJsZWQgIT09IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLXNvcnRJY29uJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGkgY2xhc3M9XCJ1aS1zb3J0YWJsZS1jb2x1bW4taWNvbiBwaSBwaS1md1wiIFtuZ0NsYXNzXT1cInsncGktc29ydC11cCc6IHNvcnRPcmRlciA9PT0gMSwgJ3BpLXNvcnQtZG93bic6IHNvcnRPcmRlciA9PT0gLTEsICdwaS1zb3J0Jzogc29ydE9yZGVyID09PSAwfVwiPjwvaT5cclxuICAgIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIFNvcnRJY29uIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICAgIEBJbnB1dCgpIGZpZWxkOiBzdHJpbmc7XHJcblxyXG4gICAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gICAgc29ydE9yZGVyOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSkge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5kdC50YWJsZVNlcnZpY2Uuc29ydFNvdXJjZSQuc3Vic2NyaWJlKHNvcnRNZXRhID0+IHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVTb3J0U3RhdGUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNvcnRTdGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2soZXZlbnQpe1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlU29ydFN0YXRlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmR0LnNvcnRNb2RlID09PSAnc2luZ2xlJykge1xyXG4gICAgICAgICAgICB0aGlzLnNvcnRPcmRlciA9IHRoaXMuZHQuaXNTb3J0ZWQodGhpcy5maWVsZCkgPyB0aGlzLmR0LnNvcnRPcmRlciA6IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZHQuc29ydE1vZGUgPT09ICdtdWx0aXBsZScpIHtcclxuICAgICAgICAgICAgbGV0IHNvcnRNZXRhID0gdGhpcy5kdC5nZXRTb3J0TWV0YSh0aGlzLmZpZWxkKTtcclxuICAgICAgICAgICAgdGhpcy5zb3J0T3JkZXIgPSBzb3J0TWV0YSA/IHNvcnRNZXRhLm9yZGVyOiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbcFNlbGVjdGFibGVSb3ddJyxcclxuICAgIGhvc3Q6IHtcclxuICAgICAgICAnW2NsYXNzLnVpLXNlbGVjdGFibGUtcm93XSc6ICdpc0VuYWJsZWQoKScsXHJcbiAgICAgICAgJ1tjbGFzcy51aS1zdGF0ZS1oaWdobGlnaHRdJzogJ3NlbGVjdGVkJyxcclxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ2lzRW5hYmxlZCgpID8gMCA6IHVuZGVmaW5lZCdcclxuICAgIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNlbGVjdGFibGVSb3cgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gICAgQElucHV0KFwicFNlbGVjdGFibGVSb3dcIikgZGF0YTogYW55O1xyXG5cclxuICAgIEBJbnB1dChcInBTZWxlY3RhYmxlUm93SW5kZXhcIikgaW5kZXg6IG51bWJlcjtcclxuXHJcbiAgICBASW5wdXQoKSBwU2VsZWN0YWJsZVJvd0Rpc2FibGVkOiBib29sZWFuO1xyXG5cclxuICAgIHNlbGVjdGVkOiBib29sZWFuO1xyXG5cclxuICAgIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkdDogVGFibGUsIHB1YmxpYyB0YWJsZVNlcnZpY2U6IFRhYmxlU2VydmljZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5kdC50YWJsZVNlcnZpY2Uuc2VsZWN0aW9uU291cmNlJC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuZHQuaXNTZWxlY3RlZCh0aGlzLmRhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuZHQuaXNTZWxlY3RlZCh0aGlzLmRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXHJcbiAgICBvbkNsaWNrKGV2ZW50OiBFdmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHQuaGFuZGxlUm93Q2xpY2soe1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXHJcbiAgICAgICAgICAgICAgICByb3dEYXRhOiB0aGlzLmRhdGEsXHJcbiAgICAgICAgICAgICAgICByb3dJbmRleDogdGhpcy5pbmRleFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcigndG91Y2hlbmQnLCBbJyRldmVudCddKVxyXG4gICAgb25Ub3VjaEVuZChldmVudDogRXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmR0LmhhbmRsZVJvd1RvdWNoRW5kKGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5hcnJvd2Rvd24nLCBbJyRldmVudCddKVxyXG4gICAgb25BcnJvd0Rvd25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzRW5hYmxlZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHJvdyA9IDxIVE1MVGFibGVSb3dFbGVtZW50PmV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgICAgY29uc3QgbmV4dFJvdyA9IHRoaXMuZmluZE5leHRTZWxlY3RhYmxlUm93KHJvdyk7XHJcblxyXG4gICAgICAgIGlmIChuZXh0Um93KSB7XHJcbiAgICAgICAgICAgIG5leHRSb3cuZm9jdXMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5hcnJvd3VwJywgWyckZXZlbnQnXSlcclxuICAgIG9uQXJyb3dVcEtleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNFbmFibGVkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgcm93ID0gPEhUTUxUYWJsZVJvd0VsZW1lbnQ+ZXZlbnQuY3VycmVudFRhcmdldDtcclxuICAgICAgICBjb25zdCBwcmV2Um93ID0gdGhpcy5maW5kUHJldlNlbGVjdGFibGVSb3cocm93KTtcclxuXHJcbiAgICAgICAgaWYgKHByZXZSb3cpIHtcclxuICAgICAgICAgICAgcHJldlJvdy5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLmVudGVyJywgWyckZXZlbnQnXSlcclxuICAgIG9uRW50ZXJLZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzRW5hYmxlZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZHQuaGFuZGxlUm93Q2xpY2soe1xyXG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgcm93RGF0YTogdGhpcy5kYXRhLFxyXG4gICAgICAgICAgICByb3dJbmRleDogdGhpcy5pbmRleFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmROZXh0U2VsZWN0YWJsZVJvdyhyb3c6IEhUTUxUYWJsZVJvd0VsZW1lbnQpOiBIVE1MVGFibGVSb3dFbGVtZW50IHtcclxuICAgICAgICBsZXQgbmV4dFJvdyA9IDxIVE1MVGFibGVSb3dFbGVtZW50PiByb3cubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgIGlmIChuZXh0Um93KSB7XHJcbiAgICAgICAgICAgIGlmIChEb21IYW5kbGVyLmhhc0NsYXNzKG5leHRSb3csICd1aS1zZWxlY3RhYmxlLXJvdycpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5leHRSb3c7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbmROZXh0U2VsZWN0YWJsZVJvdyhuZXh0Um93KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmaW5kUHJldlNlbGVjdGFibGVSb3cocm93OiBIVE1MVGFibGVSb3dFbGVtZW50KTogSFRNTFRhYmxlUm93RWxlbWVudCB7XHJcbiAgICAgICAgbGV0IHByZXZSb3cgPSA8SFRNTFRhYmxlUm93RWxlbWVudD4gcm93LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcbiAgICAgICAgaWYgKHByZXZSb3cpIHtcclxuICAgICAgICAgICAgaWYgKERvbUhhbmRsZXIuaGFzQ2xhc3MocHJldlJvdywgJ3VpLXNlbGVjdGFibGUtcm93JykpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJldlJvdztcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZFByZXZTZWxlY3RhYmxlUm93KHByZXZSb3cpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlzRW5hYmxlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wU2VsZWN0YWJsZVJvd0Rpc2FibGVkICE9PSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbcFNlbGVjdGFibGVSb3dEYmxDbGlja10nLFxyXG4gICAgaG9zdDoge1xyXG4gICAgICAgICdbY2xhc3MudWktc2VsZWN0YWJsZS1yb3ddJzogJ2lzRW5hYmxlZCgpJyxcclxuICAgICAgICAnW2NsYXNzLnVpLXN0YXRlLWhpZ2hsaWdodF0nOiAnc2VsZWN0ZWQnXHJcbiAgICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3RhYmxlUm93RGJsQ2xpY2sgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gICAgQElucHV0KFwicFNlbGVjdGFibGVSb3dEYmxDbGlja1wiKSBkYXRhOiBhbnk7XHJcblxyXG4gICAgQElucHV0KFwicFNlbGVjdGFibGVSb3dJbmRleFwiKSBpbmRleDogbnVtYmVyO1xyXG5cclxuICAgIEBJbnB1dCgpIHBTZWxlY3RhYmxlUm93RGlzYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgc2VsZWN0ZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSwgcHVibGljIHRhYmxlU2VydmljZTogVGFibGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmR0LnRhYmxlU2VydmljZS5zZWxlY3Rpb25Tb3VyY2UkLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5kdC5pc1NlbGVjdGVkKHRoaXMuZGF0YSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5kdC5pc1NlbGVjdGVkKHRoaXMuZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2RibGNsaWNrJywgWyckZXZlbnQnXSlcclxuICAgIG9uQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5kdC5oYW5kbGVSb3dDbGljayh7XHJcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgICAgIHJvd0RhdGE6IHRoaXMuZGF0YSxcclxuICAgICAgICAgICAgICAgIHJvd0luZGV4OiB0aGlzLmluZGV4XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpc0VuYWJsZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucFNlbGVjdGFibGVSb3dEaXNhYmxlZCAhPT0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW3BDb250ZXh0TWVudVJvd10nLFxyXG4gICAgaG9zdDoge1xyXG4gICAgICAgICdbY2xhc3MudWktY29udGV4dG1lbnUtc2VsZWN0ZWRdJzogJ3NlbGVjdGVkJyxcclxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ2lzRW5hYmxlZCgpID8gMCA6IHVuZGVmaW5lZCdcclxuICAgIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIENvbnRleHRNZW51Um93IHtcclxuXHJcbiAgICBASW5wdXQoXCJwQ29udGV4dE1lbnVSb3dcIikgZGF0YTogYW55O1xyXG5cclxuICAgIEBJbnB1dChcInBDb250ZXh0TWVudVJvd0luZGV4XCIpIGluZGV4OiBudW1iZXI7XHJcblxyXG4gICAgQElucHV0KCkgcENvbnRleHRNZW51Um93RGlzYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgc2VsZWN0ZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSwgcHVibGljIHRhYmxlU2VydmljZTogVGFibGVTZXJ2aWNlLCBwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmR0LnRhYmxlU2VydmljZS5jb250ZXh0TWVudVNvdXJjZSQuc3Vic2NyaWJlKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5kdC5lcXVhbHModGhpcy5kYXRhLCBkYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgWyckZXZlbnQnXSlcclxuICAgIG9uQ29udGV4dE1lbnUoZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5kdC5oYW5kbGVSb3dSaWdodENsaWNrKHtcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgcm93RGF0YTogdGhpcy5kYXRhLFxyXG4gICAgICAgICAgICAgICAgcm93SW5kZXg6IHRoaXMuaW5kZXhcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaXNFbmFibGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBDb250ZXh0TWVudVJvd0Rpc2FibGVkICE9PSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbcFJvd1RvZ2dsZXJdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUm93VG9nZ2xlciB7XHJcblxyXG4gICAgQElucHV0KCdwUm93VG9nZ2xlcicpIGRhdGE6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBwUm93VG9nZ2xlckRpc2FibGVkOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkdDogVGFibGUpIHsgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcclxuICAgIG9uQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5kdC50b2dnbGVSb3codGhpcy5kYXRhLCBldmVudCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlzRW5hYmxlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wUm93VG9nZ2xlckRpc2FibGVkICE9PSB0cnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW3BSZXNpemFibGVDb2x1bW5dJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUmVzaXphYmxlQ29sdW1uIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgICBASW5wdXQoKSBwUmVzaXphYmxlQ29sdW1uRGlzYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgcmVzaXplcjogSFRNTFNwYW5FbGVtZW50O1xyXG5cclxuICAgIHJlc2l6ZXJNb3VzZURvd25MaXN0ZW5lcjogYW55O1xyXG5cclxuICAgIGRvY3VtZW50TW91c2VNb3ZlTGlzdGVuZXI6IGFueTtcclxuXHJcbiAgICBkb2N1bWVudE1vdXNlVXBMaXN0ZW5lcjogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkdDogVGFibGUsIHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHpvbmU6IE5nWm9uZSkgeyB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XHJcbiAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndWktcmVzaXphYmxlLWNvbHVtbicpO1xyXG4gICAgICAgICAgICB0aGlzLnJlc2l6ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICAgIHRoaXMucmVzaXplci5jbGFzc05hbWUgPSAndWktY29sdW1uLXJlc2l6ZXIgdWktY2xpY2thYmxlJztcclxuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucmVzaXplcik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemVyTW91c2VEb3duTGlzdGVuZXIgPSB0aGlzLm9uTW91c2VEb3duLmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5yZXNpemVyTW91c2VEb3duTGlzdGVuZXIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYmluZERvY3VtZW50RXZlbnRzKCkge1xyXG4gICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRNb3VzZU1vdmVMaXN0ZW5lciA9IHRoaXMub25Eb2N1bWVudE1vdXNlTW92ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmRvY3VtZW50TW91c2VNb3ZlTGlzdGVuZXIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudE1vdXNlVXBMaXN0ZW5lciA9IHRoaXMub25Eb2N1bWVudE1vdXNlVXAuYmluZCh0aGlzKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuZG9jdW1lbnRNb3VzZVVwTGlzdGVuZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVuYmluZERvY3VtZW50RXZlbnRzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50TW91c2VNb3ZlTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5kb2N1bWVudE1vdXNlTW92ZUxpc3RlbmVyKTtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudE1vdXNlTW92ZUxpc3RlbmVyID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50TW91c2VVcExpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmRvY3VtZW50TW91c2VVcExpc3RlbmVyKTtcclxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudE1vdXNlVXBMaXN0ZW5lciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTW91c2VEb3duKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHQub25Db2x1bW5SZXNpemVCZWdpbihldmVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50RXZlbnRzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRG9jdW1lbnRNb3VzZU1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICB0aGlzLmR0Lm9uQ29sdW1uUmVzaXplKGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRvY3VtZW50TW91c2VVcChldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgICAgIHRoaXMuZHQub25Db2x1bW5SZXNpemVFbmQoZXZlbnQsIHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudEV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRW5hYmxlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wUmVzaXphYmxlQ29sdW1uRGlzYWJsZWQgIT09IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVzaXplck1vdXNlRG93bkxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzaXplci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLnJlc2l6ZXJNb3VzZURvd25MaXN0ZW5lcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50RXZlbnRzKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbcFJlb3JkZXJhYmxlQ29sdW1uXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFJlb3JkZXJhYmxlQ29sdW1uIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgICBASW5wdXQoKSBwUmVvcmRlcmFibGVDb2x1bW5EaXNhYmxlZDogYm9vbGVhbjtcclxuXHJcbiAgICBkcmFnU3RhcnRMaXN0ZW5lcjogYW55O1xyXG5cclxuICAgIGRyYWdPdmVyTGlzdGVuZXI6IGFueTtcclxuXHJcbiAgICBkcmFnRW50ZXJMaXN0ZW5lcjogYW55O1xyXG5cclxuICAgIGRyYWdMZWF2ZUxpc3RlbmVyOiBhbnk7XHJcblxyXG4gICAgbW91c2VEb3duTGlzdGVuZXI6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHQ6IFRhYmxlLCBwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyB6b25lOiBOZ1pvbmUpIHsgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYmluZEV2ZW50cygpIHtcclxuICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlRG93bkxpc3RlbmVyID0gdGhpcy5vbk1vdXNlRG93bi5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd25MaXN0ZW5lcik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRyYWdTdGFydExpc3RlbmVyID0gdGhpcy5vbkRyYWdTdGFydC5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgdGhpcy5kcmFnU3RhcnRMaXN0ZW5lcik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRyYWdPdmVyTGlzdGVuZXIgPSB0aGlzLm9uRHJhZ0VudGVyLmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIHRoaXMuZHJhZ092ZXJMaXN0ZW5lcik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRyYWdFbnRlckxpc3RlbmVyID0gdGhpcy5vbkRyYWdFbnRlci5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgdGhpcy5kcmFnRW50ZXJMaXN0ZW5lcik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRyYWdMZWF2ZUxpc3RlbmVyID0gdGhpcy5vbkRyYWdMZWF2ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgdGhpcy5kcmFnTGVhdmVMaXN0ZW5lcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdW5iaW5kRXZlbnRzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1vdXNlRG93bkxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duTGlzdGVuZXIpO1xyXG4gICAgICAgICAgICB0aGlzLm1vdXNlRG93bkxpc3RlbmVyID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRyYWdPdmVyTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLmRyYWdPdmVyTGlzdGVuZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmRyYWdPdmVyTGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZHJhZ0VudGVyTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgdGhpcy5kcmFnRW50ZXJMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhZ0VudGVyTGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZHJhZ0VudGVyTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgdGhpcy5kcmFnRW50ZXJMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhZ0VudGVyTGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZHJhZ0xlYXZlTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgdGhpcy5kcmFnTGVhdmVMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhZ0xlYXZlTGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbk1vdXNlRG93bihldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQubm9kZU5hbWUgPT09ICdJTlBVVCcgfHwgZXZlbnQudGFyZ2V0Lm5vZGVOYW1lID09PSAnVEVYVEFSRUEnIHx8IERvbUhhbmRsZXIuaGFzQ2xhc3MoZXZlbnQudGFyZ2V0LCAndWktY29sdW1uLXJlc2l6ZXInKSlcclxuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmRyYWdnYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmRyYWdnYWJsZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgb25EcmFnU3RhcnQoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmR0Lm9uQ29sdW1uRHJhZ1N0YXJ0KGV2ZW50LCB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRHJhZ092ZXIoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRHJhZ0VudGVyKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5kdC5vbkNvbHVtbkRyYWdFbnRlcihldmVudCwgdGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRyYWdMZWF2ZShldmVudCkge1xyXG4gICAgICAgIHRoaXMuZHQub25Db2x1bW5EcmFnTGVhdmUoZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbJyRldmVudCddKVxyXG4gICAgb25Ecm9wKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5kdC5vbkNvbHVtbkRyb3AoZXZlbnQsIHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlzRW5hYmxlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wUmVvcmRlcmFibGVDb2x1bW5EaXNhYmxlZCAhPT0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnVuYmluZEV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1twRWRpdGFibGVDb2x1bW5dJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRWRpdGFibGVDb2x1bW4gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcclxuXHJcbiAgICBASW5wdXQoXCJwRWRpdGFibGVDb2x1bW5cIikgZGF0YTogYW55O1xyXG5cclxuICAgIEBJbnB1dChcInBFZGl0YWJsZUNvbHVtbkZpZWxkXCIpIGZpZWxkOiBhbnk7XHJcblxyXG4gICAgQElucHV0KFwicEVkaXRhYmxlQ29sdW1uUm93SW5kZXhcIikgcm93SW5kZXg6IG51bWJlcjtcclxuXHJcbiAgICBASW5wdXQoKSBwRWRpdGFibGVDb2x1bW5EaXNhYmxlZDogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSBwRm9jdXNDZWxsU2VsZWN0b3I6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHQ6IFRhYmxlLCBwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyB6b25lOiBOZ1pvbmUpIHt9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XHJcbiAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndWktZWRpdGFibGUtY29sdW1uJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcclxuICAgIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmR0LmVkaXRpbmdDZWxsQ2xpY2sgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuZHQuZWRpdGluZ0NlbGwpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmR0LmVkaXRpbmdDZWxsICE9PSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZHQuaXNFZGl0aW5nQ2VsbFZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZUVkaXRpbmdDZWxsKHRydWUsIGV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5DZWxsKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5DZWxsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb3BlbkNlbGwoKSB7XHJcbiAgICAgICAgdGhpcy5kdC51cGRhdGVFZGl0aW5nQ2VsbCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIHRoaXMuZGF0YSwgdGhpcy5maWVsZCwgdGhpcy5yb3dJbmRleCk7XHJcbiAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd1aS1lZGl0aW5nLWNlbGwnKTtcclxuICAgICAgICB0aGlzLmR0Lm9uRWRpdEluaXQuZW1pdCh7ZmllbGQ6IHRoaXMuZmllbGQsIGRhdGE6IHRoaXMuZGF0YSwgaW5kZXg6IHRoaXMucm93SW5kZXh9KTtcclxuICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBmb2N1c0NlbGxTZWxlY3RvciA9IHRoaXMucEZvY3VzQ2VsbFNlbGVjdG9yIHx8ICdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCc7XHJcbiAgICAgICAgICAgICAgICBsZXQgZm9jdXNhYmxlRWxlbWVudCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIGZvY3VzQ2VsbFNlbGVjdG9yKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZm9jdXNhYmxlRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgNTApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlRWRpdGluZ0NlbGwoY29tcGxldGVkLCBldmVudCkge1xyXG4gICAgICAgIGlmIChjb21wbGV0ZWQpXHJcbiAgICAgICAgICAgIHRoaXMuZHQub25FZGl0Q29tcGxldGUuZW1pdCh7ZmllbGQ6IHRoaXMuZHQuZWRpdGluZ0NlbGxGaWVsZCwgZGF0YTogdGhpcy5kdC5lZGl0aW5nQ2VsbERhdGEsIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBpbmRleDogdGhpcy5yb3dJbmRleH0pO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5kdC5vbkVkaXRDYW5jZWwuZW1pdCh7ZmllbGQ6IHRoaXMuZHQuZWRpdGluZ0NlbGxGaWVsZCwgZGF0YTogdGhpcy5kdC5lZGl0aW5nQ2VsbERhdGEsIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBpbmRleDogdGhpcy5yb3dJbmRleH0pO1xyXG5cclxuICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHRoaXMuZHQuZWRpdGluZ0NlbGwsICd1aS1lZGl0aW5nLWNlbGwnKTtcclxuICAgICAgICB0aGlzLmR0LmVkaXRpbmdDZWxsID0gbnVsbDtcclxuICAgICAgICB0aGlzLmR0LmVkaXRpbmdDZWxsRGF0YSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5kdC5lZGl0aW5nQ2VsbEZpZWxkID0gbnVsbDtcclxuICAgICAgICB0aGlzLmR0LnVuYmluZERvY3VtZW50RWRpdExpc3RlbmVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5lbnRlcicsIFsnJGV2ZW50J10pXHJcbiAgICBvbkVudGVyS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmR0LmlzRWRpdGluZ0NlbGxWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRWRpdGluZ0NlbGwodHJ1ZSwgZXZlbnQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLmVzY2FwZScsIFsnJGV2ZW50J10pXHJcbiAgICBvbkVzY2FwZUtleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kdC5pc0VkaXRpbmdDZWxsVmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZUVkaXRpbmdDZWxsKGZhbHNlLCBldmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24udGFiJywgWyckZXZlbnQnXSlcclxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uc2hpZnQudGFiJywgWyckZXZlbnQnXSlcclxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24ubWV0YS50YWInLCBbJyRldmVudCddKVxyXG4gICAgb25TaGlmdEtleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVUb1ByZXZpb3VzQ2VsbChldmVudCk7XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVUb05leHRDZWxsKGV2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmaW5kQ2VsbChlbGVtZW50KSB7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgbGV0IGNlbGwgPSBlbGVtZW50O1xyXG4gICAgICAgICAgICB3aGlsZSAoY2VsbCAmJiAhRG9tSGFuZGxlci5oYXNDbGFzcyhjZWxsLCAndWktZWRpdGluZy1jZWxsJykpIHtcclxuICAgICAgICAgICAgICAgIGNlbGwgPSBjZWxsLnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjZWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vdmVUb1ByZXZpb3VzQ2VsbChldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50Q2VsbCA9IHRoaXMuZmluZENlbGwoZXZlbnQudGFyZ2V0KTtcclxuICAgICAgICBpZiAoY3VycmVudENlbGwpIHtcclxuICAgICAgICAgICAgbGV0IHRhcmdldENlbGwgPSB0aGlzLmZpbmRQcmV2aW91c0VkaXRhYmxlQ29sdW1uKGN1cnJlbnRDZWxsKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0YXJnZXRDZWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kdC5pc0VkaXRpbmdDZWxsVmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VFZGl0aW5nQ2VsbCh0cnVlLCBldmVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5pbnZva2VFbGVtZW50TWV0aG9kKGV2ZW50LnRhcmdldCwgJ2JsdXInKTtcclxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuaW52b2tlRWxlbWVudE1ldGhvZCh0YXJnZXRDZWxsLCAnY2xpY2snKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZVRvTmV4dENlbGwoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgICAgICBsZXQgY3VycmVudENlbGwgPSB0aGlzLmZpbmRDZWxsKGV2ZW50LnRhcmdldCk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRDZWxsKSB7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRDZWxsID0gdGhpcy5maW5kTmV4dEVkaXRhYmxlQ29sdW1uKGN1cnJlbnRDZWxsKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0YXJnZXRDZWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kdC5pc0VkaXRpbmdDZWxsVmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VFZGl0aW5nQ2VsbCh0cnVlLCBldmVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5pbnZva2VFbGVtZW50TWV0aG9kKGV2ZW50LnRhcmdldCwgJ2JsdXInKTtcclxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuaW52b2tlRWxlbWVudE1ldGhvZCh0YXJnZXRDZWxsLCAnY2xpY2snKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZmluZFByZXZpb3VzRWRpdGFibGVDb2x1bW4oY2VsbDogRWxlbWVudCkge1xyXG4gICAgICAgIGxldCBwcmV2Q2VsbCA9IGNlbGwucHJldmlvdXNFbGVtZW50U2libGluZztcclxuXHJcbiAgICAgICAgaWYgKCFwcmV2Q2VsbCkge1xyXG4gICAgICAgICAgICBsZXQgcHJldmlvdXNSb3cgPSBjZWxsLnBhcmVudEVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZztcclxuICAgICAgICAgICAgaWYgKHByZXZpb3VzUm93KSB7XHJcbiAgICAgICAgICAgICAgICBwcmV2Q2VsbCA9IHByZXZpb3VzUm93Lmxhc3RFbGVtZW50Q2hpbGQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwcmV2Q2VsbCkge1xyXG4gICAgICAgICAgICBpZiAoRG9tSGFuZGxlci5oYXNDbGFzcyhwcmV2Q2VsbCwgJ3VpLWVkaXRhYmxlLWNvbHVtbicpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXZDZWxsO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maW5kUHJldmlvdXNFZGl0YWJsZUNvbHVtbihwcmV2Q2VsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZmluZE5leHRFZGl0YWJsZUNvbHVtbihjZWxsOiBFbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IG5leHRDZWxsID0gY2VsbC5uZXh0RWxlbWVudFNpYmxpbmc7XHJcblxyXG4gICAgICAgIGlmICghbmV4dENlbGwpIHtcclxuICAgICAgICAgICAgbGV0IG5leHRSb3cgPSBjZWxsLnBhcmVudEVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICBpZiAobmV4dFJvdykge1xyXG4gICAgICAgICAgICAgICAgbmV4dENlbGwgPSBuZXh0Um93LmZpcnN0RWxlbWVudENoaWxkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobmV4dENlbGwpIHtcclxuICAgICAgICAgICAgaWYgKERvbUhhbmRsZXIuaGFzQ2xhc3MobmV4dENlbGwsICd1aS1lZGl0YWJsZS1jb2x1bW4nKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXh0Q2VsbDtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZE5leHRFZGl0YWJsZUNvbHVtbihuZXh0Q2VsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaXNFbmFibGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBFZGl0YWJsZUNvbHVtbkRpc2FibGVkICE9PSB0cnVlO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1twRWRpdGFibGVSb3ddJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRWRpdGFibGVSb3cge1xyXG5cclxuICAgIEBJbnB1dChcInBFZGl0YWJsZVJvd1wiKSBkYXRhOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgcEVkaXRhYmxlUm93RGlzYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmKSB7fVxyXG5cclxuICAgIGlzRW5hYmxlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wRWRpdGFibGVSb3dEaXNhYmxlZCAhPT0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbcEluaXRFZGl0YWJsZVJvd10nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJbml0RWRpdGFibGVSb3cge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkdDogVGFibGUsIHB1YmxpYyBlZGl0YWJsZVJvdzogRWRpdGFibGVSb3cpIHt9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxyXG4gICAgb25DbGljayhldmVudDogRXZlbnQpIHtcclxuICAgICAgICB0aGlzLmR0LmluaXRSb3dFZGl0KHRoaXMuZWRpdGFibGVSb3cuZGF0YSk7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbcFNhdmVFZGl0YWJsZVJvd10nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTYXZlRWRpdGFibGVSb3cge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkdDogVGFibGUsIHB1YmxpYyBlZGl0YWJsZVJvdzogRWRpdGFibGVSb3cpIHt9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxyXG4gICAgb25DbGljayhldmVudDogRXZlbnQpIHtcclxuICAgICAgICB0aGlzLmR0LnNhdmVSb3dFZGl0KHRoaXMuZWRpdGFibGVSb3cuZGF0YSwgdGhpcy5lZGl0YWJsZVJvdy5lbC5uYXRpdmVFbGVtZW50KTtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW3BDYW5jZWxFZGl0YWJsZVJvd10nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDYW5jZWxFZGl0YWJsZVJvdyB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSwgcHVibGljIGVkaXRhYmxlUm93OiBFZGl0YWJsZVJvdykge31cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXHJcbiAgICBvbkNsaWNrKGV2ZW50OiBFdmVudCkge1xyXG4gICAgICAgIHRoaXMuZHQuY2FuY2VsUm93RWRpdCh0aGlzLmVkaXRhYmxlUm93LmRhdGEpO1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLWNlbGxFZGl0b3InLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZWRpdGluZ1wiPlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaW5wdXRUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhZWRpdGluZ1wiPlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwib3V0cHV0VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIENlbGxFZGl0b3IgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcclxuXHJcbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PFByaW1lVGVtcGxhdGU+O1xyXG5cclxuICAgIGlucHV0VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgb3V0cHV0VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSwgQE9wdGlvbmFsKCkgcHVibGljIGVkaXRhYmxlQ29sdW1uOiBFZGl0YWJsZUNvbHVtbiwgQE9wdGlvbmFsKCkgcHVibGljIGVkaXRhYmxlUm93OiBFZGl0YWJsZVJvdykgeyB9XHJcblxyXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoIChpdGVtLmdldFR5cGUoKSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnaW5wdXQnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnb3V0cHV0JzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm91dHB1dFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBlZGl0aW5nKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5kdC5lZGl0aW5nQ2VsbCAmJiB0aGlzLmVkaXRhYmxlQ29sdW1uICYmIHRoaXMuZHQuZWRpdGluZ0NlbGwgPT09IHRoaXMuZWRpdGFibGVDb2x1bW4uZWwubmF0aXZlRWxlbWVudCkgfHxcclxuICAgICAgICAgICAgICAgICh0aGlzLmVkaXRhYmxlUm93ICYmIHRoaXMuZHQuZWRpdE1vZGUgPT09ICdyb3cnICYmIHRoaXMuZHQuaXNSb3dFZGl0aW5nKHRoaXMuZWRpdGFibGVSb3cuZGF0YSkpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3AtdGFibGVSYWRpb0J1dHRvbicsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1yYWRpb2J1dHRvbiB1aS13aWRnZXRcIiAoY2xpY2spPVwib25DbGljaygkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1oZWxwZXItaGlkZGVuLWFjY2Vzc2libGVcIj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBbYXR0ci5pZF09XCJpbnB1dElkXCIgW2F0dHIubmFtZV09XCJuYW1lXCIgW2NoZWNrZWRdPVwiY2hlY2tlZFwiIChmb2N1cyk9XCJvbkZvY3VzKClcIiAoYmx1cik9XCJvbkJsdXIoKVwiXHJcbiAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbFwiPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiAjYm94IFtuZ0NsYXNzXT1cInsndWktcmFkaW9idXR0b24tYm94IHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0Jzp0cnVlLFxyXG4gICAgICAgICAgICAgICAgJ3VpLXN0YXRlLWFjdGl2ZSc6Y2hlY2tlZCwgJ3VpLXN0YXRlLWRpc2FibGVkJzpkaXNhYmxlZH1cIiByb2xlPVwicmFkaW9cIiBbYXR0ci5hcmlhLWNoZWNrZWRdPVwiY2hlY2tlZFwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1yYWRpb2J1dHRvbi1pY29uIHVpLWNsaWNrYWJsZVwiIFtuZ0NsYXNzXT1cInsncGkgcGktY2lyY2xlLW9uJzpjaGVja2VkfVwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWJsZVJhZGlvQnV0dG9uICB7XHJcblxyXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgdmFsdWU6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBpbmRleDogbnVtYmVyO1xyXG5cclxuICAgIEBJbnB1dCgpIGlucHV0SWQ6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgYXJpYUxhYmVsOiBzdHJpbmc7XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnYm94JykgYm94Vmlld0NoaWxkOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIGNoZWNrZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSwgcHVibGljIHRhYmxlU2VydmljZTogVGFibGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmR0LnRhYmxlU2VydmljZS5zZWxlY3Rpb25Tb3VyY2UkLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tlZCA9IHRoaXMuZHQuaXNTZWxlY3RlZCh0aGlzLnZhbHVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmNoZWNrZWQgPSB0aGlzLmR0LmlzU2VsZWN0ZWQodGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGljayhldmVudDogRXZlbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5kdC50b2dnbGVSb3dXaXRoUmFkaW8oe1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXHJcbiAgICAgICAgICAgICAgICByb3dJbmRleDogdGhpcy5pbmRleFxyXG4gICAgICAgICAgICB9LCB0aGlzLnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgRG9tSGFuZGxlci5jbGVhclNlbGVjdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRm9jdXMoKSB7XHJcbiAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmJveFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAndWktc3RhdGUtZm9jdXMnKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkJsdXIoKSB7XHJcbiAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLmJveFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAndWktc3RhdGUtZm9jdXMnKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC10YWJsZUNoZWNrYm94JyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInVpLWNoa2JveCB1aS13aWRnZXRcIiAoY2xpY2spPVwib25DbGljaygkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1oZWxwZXItaGlkZGVuLWFjY2Vzc2libGVcIj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBbYXR0ci5pZF09XCJpbnB1dElkXCIgW2F0dHIubmFtZV09XCJuYW1lXCIgW2NoZWNrZWRdPVwiY2hlY2tlZFwiIChmb2N1cyk9XCJvbkZvY3VzKClcIiAoYmx1cik9XCJvbkJsdXIoKVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXHJcbiAgICAgICAgICAgICAgICBbYXR0ci5yZXF1aXJlZF09XCJyZXF1aXJlZFwiIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUxhYmVsXCI+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2ICNib3ggW25nQ2xhc3NdPVwieyd1aS1jaGtib3gtYm94IHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0Jzp0cnVlLFxyXG4gICAgICAgICAgICAgICAgJ3VpLXN0YXRlLWFjdGl2ZSc6Y2hlY2tlZCwgJ3VpLXN0YXRlLWRpc2FibGVkJzpkaXNhYmxlZH1cIiByb2xlPVwiY2hlY2tib3hcIiBbYXR0ci5hcmlhLWNoZWNrZWRdPVwiY2hlY2tlZFwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1jaGtib3gtaWNvbiB1aS1jbGlja2FibGVcIiBbbmdDbGFzc109XCJ7J3BpIHBpLWNoZWNrJzpjaGVja2VkfVwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWJsZUNoZWNrYm94ICB7XHJcblxyXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgdmFsdWU6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBpbmRleDogbnVtYmVyO1xyXG5cclxuICAgIEBJbnB1dCgpIGlucHV0SWQ6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgYXJpYUxhYmVsOiBzdHJpbmc7XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnYm94JykgYm94Vmlld0NoaWxkOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIGNoZWNrZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSwgcHVibGljIHRhYmxlU2VydmljZTogVGFibGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmR0LnRhYmxlU2VydmljZS5zZWxlY3Rpb25Tb3VyY2UkLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tlZCA9IHRoaXMuZHQuaXNTZWxlY3RlZCh0aGlzLnZhbHVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmNoZWNrZWQgPSB0aGlzLmR0LmlzU2VsZWN0ZWQodGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGljayhldmVudDogRXZlbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5kdC50b2dnbGVSb3dXaXRoQ2hlY2tib3goe1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXHJcbiAgICAgICAgICAgICAgICByb3dJbmRleDogdGhpcy5pbmRleFxyXG4gICAgICAgICAgICB9LCB0aGlzLnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgRG9tSGFuZGxlci5jbGVhclNlbGVjdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRm9jdXMoKSB7XHJcbiAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmJveFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAndWktc3RhdGUtZm9jdXMnKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkJsdXIoKSB7XHJcbiAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLmJveFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAndWktc3RhdGUtZm9jdXMnKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC10YWJsZUhlYWRlckNoZWNrYm94JyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInVpLWNoa2JveCB1aS13aWRnZXRcIiAoY2xpY2spPVwib25DbGljaygkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1oZWxwZXItaGlkZGVuLWFjY2Vzc2libGVcIj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCAjY2IgdHlwZT1cImNoZWNrYm94XCIgW2F0dHIuaWRdPVwiaW5wdXRJZFwiIFthdHRyLm5hbWVdPVwibmFtZVwiIFtjaGVja2VkXT1cImNoZWNrZWRcIiAoZm9jdXMpPVwib25Gb2N1cygpXCIgKGJsdXIpPVwib25CbHVyKClcIlxyXG4gICAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cImlzRGlzYWJsZWQoKVwiIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUxhYmVsXCI+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2ICNib3ggW25nQ2xhc3NdPVwieyd1aS1jaGtib3gtYm94IHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0Jzp0cnVlLFxyXG4gICAgICAgICAgICAgICAgJ3VpLXN0YXRlLWFjdGl2ZSc6Y2hlY2tlZCwgJ3VpLXN0YXRlLWRpc2FibGVkJzogaXNEaXNhYmxlZCgpfVwiIHJvbGU9XCJjaGVja2JveFwiIFthdHRyLmFyaWEtY2hlY2tlZF09XCJjaGVja2VkXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWNoa2JveC1pY29uIHVpLWNsaWNrYWJsZVwiIFtuZ0NsYXNzXT1cInsncGkgcGktY2hlY2snOmNoZWNrZWR9XCI+PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIFRhYmxlSGVhZGVyQ2hlY2tib3ggIHtcclxuXHJcbiAgICBAVmlld0NoaWxkKCdib3gnKSBib3hWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgaW5wdXRJZDogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBhcmlhTGFiZWw6IHN0cmluZztcclxuXHJcbiAgICBjaGVja2VkOiBib29sZWFuO1xyXG5cclxuICAgIHNlbGVjdGlvbkNoYW5nZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAgIHZhbHVlQ2hhbmdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSwgcHVibGljIHRhYmxlU2VydmljZTogVGFibGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZVN1YnNjcmlwdGlvbiA9IHRoaXMuZHQudGFibGVTZXJ2aWNlLnZhbHVlU291cmNlJC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrZWQgPSB0aGlzLnVwZGF0ZUNoZWNrZWRTdGF0ZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZVN1YnNjcmlwdGlvbiA9IHRoaXMuZHQudGFibGVTZXJ2aWNlLnNlbGVjdGlvblNvdXJjZSQuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja2VkID0gdGhpcy51cGRhdGVDaGVja2VkU3RhdGUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmNoZWNrZWQgPSB0aGlzLnVwZGF0ZUNoZWNrZWRTdGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmR0LnZhbHVlICYmIHRoaXMuZHQudmFsdWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kdC50b2dnbGVSb3dzV2l0aENoZWNrYm94KGV2ZW50LCAhdGhpcy5jaGVja2VkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgRG9tSGFuZGxlci5jbGVhclNlbGVjdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRm9jdXMoKSB7XHJcbiAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmJveFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAndWktc3RhdGUtZm9jdXMnKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkJsdXIoKSB7XHJcbiAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLmJveFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAndWktc3RhdGUtZm9jdXMnKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0Rpc2FibGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRpc2FibGVkIHx8ICF0aGlzLmR0LnZhbHVlIHx8ICF0aGlzLmR0LnZhbHVlLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25DaGFuZ2VTdWJzY3JpcHRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnZhbHVlQ2hhbmdlU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQ2hlY2tlZFN0YXRlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmR0LmZpbHRlcmVkVmFsdWUpIHtcclxuICAgICAgICAgICAgY29uc3QgdmFsID0gdGhpcy5kdC5maWx0ZXJlZFZhbHVlO1xyXG4gICAgICAgICAgICByZXR1cm4gKHZhbCAmJiB2YWwubGVuZ3RoID4gMCAmJiB0aGlzLmR0LnNlbGVjdGlvbiAmJiB0aGlzLmR0LnNlbGVjdGlvbi5sZW5ndGggPiAwICYmIHRoaXMuaXNBbGxGaWx0ZXJlZFZhbHVlc0NoZWNrZWQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCB2YWwgPSB0aGlzLmR0LnZhbHVlO1xyXG4gICAgICAgICAgICByZXR1cm4gKHZhbCAmJiB2YWwubGVuZ3RoID4gMCAmJiB0aGlzLmR0LnNlbGVjdGlvbiAmJiB0aGlzLmR0LnNlbGVjdGlvbi5sZW5ndGggPiAwICYmIHRoaXMuZHQuc2VsZWN0aW9uLmxlbmd0aCA9PT0gdmFsLmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlzQWxsRmlsdGVyZWRWYWx1ZXNDaGVja2VkKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5kdC5maWx0ZXJlZFZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHJvd0RhdGEgb2YgdGhpcy5kdC5maWx0ZXJlZFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZHQuaXNTZWxlY3RlZChyb3dEYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW3BSZW9yZGVyYWJsZVJvd0hhbmRsZV0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSZW9yZGVyYWJsZVJvd0hhbmRsZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xyXG5cclxuICAgIEBJbnB1dChcInBSZW9yZGVyYWJsZVJvd0hhbmRsZVwiKSBpbmRleDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZikge31cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd1aS10YWJsZS1yZW9yZGVyYWJsZXJvdy1oYW5kbGUnKTtcclxuICAgIH1cclxufVxyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1twUmVvcmRlcmFibGVSb3ddJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUmVvcmRlcmFibGVSb3cgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcclxuXHJcbiAgICBASW5wdXQoXCJwUmVvcmRlcmFibGVSb3dcIikgaW5kZXg6IG51bWJlcjtcclxuXHJcbiAgICBASW5wdXQoKSBwUmVvcmRlcmFibGVSb3dEaXNhYmxlZDogYm9vbGVhbjtcclxuXHJcbiAgICBtb3VzZURvd25MaXN0ZW5lcjogYW55O1xyXG5cclxuICAgIGRyYWdTdGFydExpc3RlbmVyOiBhbnk7XHJcblxyXG4gICAgZHJhZ0VuZExpc3RlbmVyOiBhbnk7XHJcblxyXG4gICAgZHJhZ092ZXJMaXN0ZW5lcjogYW55O1xyXG5cclxuICAgIGRyYWdMZWF2ZUxpc3RlbmVyOiBhbnk7XHJcblxyXG4gICAgZHJvcExpc3RlbmVyOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSwgcHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgem9uZTogTmdab25lKSB7fVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZHJvcHBhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJpbmRFdmVudHMoKSB7XHJcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tb3VzZURvd25MaXN0ZW5lciA9IHRoaXMub25Nb3VzZURvd24uYmluZCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duTGlzdGVuZXIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kcmFnU3RhcnRMaXN0ZW5lciA9IHRoaXMub25EcmFnU3RhcnQuYmluZCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIHRoaXMuZHJhZ1N0YXJ0TGlzdGVuZXIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kcmFnRW5kTGlzdGVuZXIgPSB0aGlzLm9uRHJhZ0VuZC5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIHRoaXMuZHJhZ0VuZExpc3RlbmVyKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZHJhZ092ZXJMaXN0ZW5lciA9IHRoaXMub25EcmFnT3Zlci5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLmRyYWdPdmVyTGlzdGVuZXIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kcmFnTGVhdmVMaXN0ZW5lciA9IHRoaXMub25EcmFnTGVhdmUuYmluZCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIHRoaXMuZHJhZ0xlYXZlTGlzdGVuZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHVuYmluZEV2ZW50cygpIHtcclxuICAgICAgICBpZiAodGhpcy5tb3VzZURvd25MaXN0ZW5lcikge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bkxpc3RlbmVyKTtcclxuICAgICAgICAgICAgdGhpcy5tb3VzZURvd25MaXN0ZW5lciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5kcmFnU3RhcnRMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCB0aGlzLmRyYWdTdGFydExpc3RlbmVyKTtcclxuICAgICAgICAgICAgdGhpcy5kcmFnU3RhcnRMaXN0ZW5lciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5kcmFnRW5kTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIHRoaXMuZHJhZ0VuZExpc3RlbmVyKTtcclxuICAgICAgICAgICAgdGhpcy5kcmFnRW5kTGlzdGVuZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZHJhZ092ZXJMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIHRoaXMuZHJhZ092ZXJMaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhZ092ZXJMaXN0ZW5lciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5kcmFnTGVhdmVMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCB0aGlzLmRyYWdMZWF2ZUxpc3RlbmVyKTtcclxuICAgICAgICAgICAgdGhpcy5kcmFnTGVhdmVMaXN0ZW5lciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTW91c2VEb3duKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKERvbUhhbmRsZXIuaGFzQ2xhc3MoZXZlbnQudGFyZ2V0LCAndWktdGFibGUtcmVvcmRlcmFibGVyb3ctaGFuZGxlJykpXHJcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5kcmFnZ2FibGUgPSB0cnVlO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmRyYWdnYWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRHJhZ1N0YXJ0KGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5kdC5vblJvd0RyYWdTdGFydChldmVudCwgdGhpcy5pbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EcmFnRW5kKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5kdC5vblJvd0RyYWdFbmQoZXZlbnQpO1xyXG4gICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5kcmFnZ2FibGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRyYWdPdmVyKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5kdC5vblJvd0RyYWdPdmVyKGV2ZW50LCB0aGlzLmluZGV4LCB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EcmFnTGVhdmUoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLmR0Lm9uUm93RHJhZ0xlYXZlKGV2ZW50LCB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzRW5hYmxlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wUmVvcmRlcmFibGVSb3dEaXNhYmxlZCAhPT0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdkcm9wJywgWyckZXZlbnQnXSlcclxuICAgIG9uRHJvcChldmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpICYmIHRoaXMuZHQucm93RHJhZ2dpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5kdC5vblJvd0Ryb3AoZXZlbnQsIHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICB9XHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLFBhZ2luYXRvck1vZHVsZV0sXHJcbiAgICBleHBvcnRzOiBbVGFibGUsU2hhcmVkTW9kdWxlLFNvcnRhYmxlQ29sdW1uLFNlbGVjdGFibGVSb3csUm93VG9nZ2xlcixDb250ZXh0TWVudVJvdyxSZXNpemFibGVDb2x1bW4sUmVvcmRlcmFibGVDb2x1bW4sRWRpdGFibGVDb2x1bW4sQ2VsbEVkaXRvcixTb3J0SWNvbixUYWJsZVJhZGlvQnV0dG9uLFRhYmxlQ2hlY2tib3gsVGFibGVIZWFkZXJDaGVja2JveCxSZW9yZGVyYWJsZVJvd0hhbmRsZSxSZW9yZGVyYWJsZVJvdyxTZWxlY3RhYmxlUm93RGJsQ2xpY2ssRWRpdGFibGVSb3csSW5pdEVkaXRhYmxlUm93LFNhdmVFZGl0YWJsZVJvdyxDYW5jZWxFZGl0YWJsZVJvd10sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtUYWJsZSxTb3J0YWJsZUNvbHVtbixTZWxlY3RhYmxlUm93LFJvd1RvZ2dsZXIsQ29udGV4dE1lbnVSb3csUmVzaXphYmxlQ29sdW1uLFJlb3JkZXJhYmxlQ29sdW1uLEVkaXRhYmxlQ29sdW1uLENlbGxFZGl0b3IsVGFibGVCb2R5LFNjcm9sbGFibGVWaWV3LFNvcnRJY29uLFRhYmxlUmFkaW9CdXR0b24sVGFibGVDaGVja2JveCxUYWJsZUhlYWRlckNoZWNrYm94LFJlb3JkZXJhYmxlUm93SGFuZGxlLFJlb3JkZXJhYmxlUm93LFNlbGVjdGFibGVSb3dEYmxDbGljayxFZGl0YWJsZVJvdyxJbml0RWRpdGFibGVSb3csU2F2ZUVkaXRhYmxlUm93LENhbmNlbEVkaXRhYmxlUm93XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFibGVNb2R1bGUgeyB9XHJcbiJdfQ==