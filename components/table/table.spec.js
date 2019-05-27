"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var scrolling_1 = require("@angular/cdk/scrolling");
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var table_1 = require("./table");
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("@angular/core");
var paginator_1 = require("../paginator/paginator");
var dropdown_1 = require("../dropdown/dropdown");
var forms_1 = require("@angular/forms");
var shared_1 = require("../common/shared");
var contextmenu_1 = require("../contextmenu/contextmenu");
var testing_2 = require("@angular/router/testing");
var TestBasicTableComponent = /** @class */ (function () {
    function TestBasicTableComponent() {
        this.items = [
            { label: 'View', icon: 'pi pi-search', command: function (event) { } },
            { label: 'Delete', icon: 'pi pi-times', command: function (event) { } }
        ];
        this.cols = [
            { field: 'brand', header: 'Brand' },
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'color', header: 'Color' }
        ];
        this.cols2 = [
            { field: 'brand', header: 'Brand' },
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'color', header: 'Color' }
        ];
        this.cars = [
            { "brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff" },
            { "brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345" },
            { "brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr" },
            { "brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh" },
            { "brand": "Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy34" },
            { "brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj" },
            { "brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr" },
            { "brand": "Jaguar", "year": 2013, "color": "Orange", "vin": "greg34" },
            { "brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw5" },
            { "brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s" }
        ];
        this.cars2 = [
            { "brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff" },
            { "brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345" },
            { "brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr" },
            { "brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh" },
            { "brand": "Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy34" },
            { "brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj" },
            { "brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr" },
            { "brand": "Jaguar", "year": 2013, "color": "Orange", "vin": "greg34" },
            { "brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw5" },
            { "brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s" }
        ];
    }
    TestBasicTableComponent.prototype.customSort = function (event) {
        event.data.sort(function (data1, data2) {
            var value1 = data1[event.field];
            var value2 = data2[event.field];
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
            return (event.order * result);
        });
    };
    TestBasicTableComponent = __decorate([
        core_1.Component({
            template: "\n    <p-table class=\"basicTable\" [value]=\"cars\">\n        <ng-template pTemplate=\"caption\">\n            List of Cars\n        </ng-template>\n        <ng-template pTemplate=\"header\">\n        <tr>\n            <th>Vin</th>\n            <th>Year</th>\n            <th>Brand</th>\n            <th>Color</th>\n        </tr>\n        </ng-template>\n        <ng-template pTemplate=\"body\" let-car>\n            <tr>\n                <td>{{car.vin}}</td>\n                <td>{{car.year}}</td>\n                <td>{{car.brand}}</td>\n                <td>{{car.color}}</td>\n            </tr>\n        </ng-template>\n        <ng-template pTemplate=\"footer\" let-columns>\n            <tr>\n                <td>Vin</td>\n                <td>Year</td>\n                <td>Brand</td>\n                <td>Color</td>\n            </tr>\n        </ng-template>\n        <ng-template pTemplate=\"summary\">\n            <div style=\"text-align: left\">\n                Always Bet On Prime!\n            </div>\n        </ng-template>\n    </p-table>\n\n    <p-table class=\"filterTable\" #dt [columns]=\"cols\" [value]=\"cars\">\n        <ng-template pTemplate=\"caption\">\n            <div style=\"text-align: right\">        \n                <i class=\"fa fa-search\" style=\"margin:4px 4px 0 0\"></i>\n                <input type=\"text\" class=\"globalFilter\" pInputText size=\"50\" placeholder=\"Global Filter\" (input)=\"dt.filterGlobal($event.target.value, 'contains')\" style=\"width:auto\">\n            </div>\n        </ng-template>\n        <ng-template pTemplate=\"header\" let-columns>\n            <tr>\n                <th *ngFor=\"let col of columns\">\n                    {{col.header}}\n                </th>\n            </tr>\n            <tr>\n                <th *ngFor=\"let col of columns\" [ngSwitch]=\"col.field\">\n                    <input *ngSwitchCase=\"'brand'\" class=\"brandFilter\" pInputText type=\"text\" (input)=\"dt.filter($event.target.value, col.field, col.filterMatchMode)\">\n                </th>\n            </tr>\n        </ng-template>\n        <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n            <tr>\n                <td *ngFor=\"let col of columns\">\n                    {{rowData[col.field]}}\n                </td>\n            </tr>\n        </ng-template>\n    </p-table>\n\n    <p-table class=\"sortTable\" [columns]=\"cols\" [value]=\"cars\">\n        <ng-template pTemplate=\"header\" let-columns>\n            <tr>\n                <th *ngFor=\"let col of columns\" class=\"sortableColumn\" [pSortableColumn]=\"col.field\">\n                    {{col.header}}\n                    <p-sortIcon [field]=\"col.field\" ariaLabel=\"Activate to sort\" ariaLabelDesc=\"Activate to sort in descending order\" ariaLabelAsc=\"Activate to sort in ascending order\"></p-sortIcon>\n                </th>\n            </tr>\n        </ng-template>\n        <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n            <tr class=\"sort\">\n                <td *ngFor=\"let col of columns\">\n                    {{rowData[col.field]}}\n                </td>\n            </tr>\n        </ng-template>\n    </p-table>\n\n    <p-table class=\"basicSelectionTable\" [columns]=\"cols\" [value]=\"cars\" selectionMode=\"single\"  dataKey=\"vin\">\n        <ng-template pTemplate=\"header\" let-columns>\n            <tr>\n                <th *ngFor=\"let col of columns\">\n                    {{col.header}}\n                </th>\n            </tr>\n        </ng-template>\n        <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\" let-rowIndex=\"rowIndex\">\n            <tr class=\"selectableRow\" [pSelectableRow]=\"rowData\" [pSelectableRowIndex]=\"rowIndex\">\n                <td *ngFor=\"let col of columns\">\n                    {{rowData[col.field]}}\n                </td>\n            </tr>\n        </ng-template>\n    </p-table>\n\n    <p-table class=\"radioSelectionTable\" [columns]=\"cols\" [value]=\"cars\" dataKey=\"vin\">\n        <ng-template pTemplate=\"header\" let-columns>\n            <tr>\n                <th style=\"width: 3em\"></th>\n                <th *ngFor=\"let col of columns\">\n                    {{col.header}}\n                </th>\n            </tr>\n        </ng-template>\n        <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n            <tr [pSelectableRow]=\"rowData\">\n                <td>\n                    <p-tableRadioButton class=\"radioRow\" [value]=\"rowData\"></p-tableRadioButton>\n                </td>\n                <td *ngFor=\"let col of columns\">\n                    {{rowData[col.field]}}\n                </td>\n            </tr>\n        </ng-template>\n    </p-table>\n\n    <p-table class=\"checkboxSelectionTable\" [columns]=\"cols\" [value]=\"cars\" dataKey=\"vin\">\n        <ng-template pTemplate=\"header\" let-columns>\n            <tr>\n                <th>\n                    <p-tableHeaderCheckbox class=\"headerCheckbox\"></p-tableHeaderCheckbox>\n                </th>\n                <th *ngFor=\"let col of columns\">\n                    {{col.header}}\n                </th>\n            </tr>\n        </ng-template>\n        <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n            <tr [pSelectableRow]=\"rowData\">\n                <td>\n                    <p-tableCheckbox class=\"rowCheckbox\" [value]=\"rowData\"></p-tableCheckbox>\n                </td>\n                <td *ngFor=\"let col of columns\">\n                    {{rowData[col.field]}}\n                </td>\n            </tr>\n        </ng-template>\n    </p-table>\n\n    <p-table class=\"editableTable\" [value]=\"cars\">\n        <ng-template pTemplate=\"header\">\n            <tr>\n                <th>Vin</th>\n                <th>Year</th>\n                <th>Brand</th>\n                <th>Color</th>\n            </tr>\n        </ng-template>\n        <ng-template pTemplate=\"body\" let-rowData>\n            <tr>\n                <td pEditableColumn>\n                    <p-cellEditor>\n                        <ng-template pTemplate=\"input\">\n                            <input pInputText type=\"text\" [(ngModel)]=\"rowData.vin\">\n                        </ng-template>\n                        <ng-template pTemplate=\"output\">\n                            {{rowData.vin}}\n                        </ng-template>\n                    </p-cellEditor>\n                </td>\n                <td pEditableColumn>\n                    <p-cellEditor>\n                        <ng-template pTemplate=\"input\">\n                            <input pInputText type=\"text\" [(ngModel)]=\"rowData.year\" required>\n                        </ng-template>\n                        <ng-template pTemplate=\"output\">\n                            {{rowData.year}}\n                        </ng-template>\n                    </p-cellEditor>\n                </td>\n                <td pEditableColumn>\n                    <p-cellEditor>\n                        <ng-template pTemplate=\"input\">\n                            <p-dropdown [options]=\"brands\" [(ngModel)]=\"rowData.brand\" [style]=\"{'width':'100%'}\"></p-dropdown>\n                        </ng-template>\n                        <ng-template pTemplate=\"output\">\n                            {{rowData.brand}}\n                        </ng-template>\n                    </p-cellEditor>\n                </td>\n                <td pEditableColumn>\n                    <p-cellEditor>\n                        <ng-template pTemplate=\"input\">\n                            <input pInputText type=\"text\" [(ngModel)]=\"rowData.color\">\n                        </ng-template>\n                        <ng-template pTemplate=\"output\">\n                            {{rowData.color}}\n                        </ng-template>\n                    </p-cellEditor>\n                </td>\n            </tr>\n        </ng-template>\n    </p-table>\n    <p-table class=\"rowExpansionTable\" [columns]=\"cols\" [value]=\"cars\" dataKey=\"vin\">\n        <ng-template pTemplate=\"header\" let-columns>\n            <tr>\n                <th style=\"width: 3em\"></th>\n                <th *ngFor=\"let col of columns\">\n                    {{col.header}}\n                </th>\n            </tr>\n        </ng-template>\n        <ng-template pTemplate=\"body\" let-rowData let-expanded=\"expanded\" let-columns=\"columns\">\n            <tr>\n                <td>\n                    <a href=\"#\" class=\"rowExpansionToggler\" [pRowToggler]=\"rowData\">\n                        <i [ngClass]=\"expanded ? 'pi pi-chevron-down' : 'pi pi-chevron-right'\"></i>\n                    </a>\n                </td>\n                <td *ngFor=\"let col of columns\">\n                    {{rowData[col.field]}}\n                </td>\n            </tr>\n        </ng-template>\n        <ng-template pTemplate=\"rowexpansion\" let-rowData let-columns=\"columns\">\n            <tr>\n                <td [attr.colspan]=\"columns.length + 1\">\n                    <div class=\"ui-g ui-fluid expandedRow\" style=\"font-size:16px;padding:20px\">\n                        <div class=\"ui-g-12 ui-md-3\" style=\"text-align:center\">\n                        </div>\n                        <div class=\"ui-g-12 ui-md-9\">\n                            <div class=\"ui-g\">\n                                <div class=\"ui-g-12\">\n                                    <b>Vin:</b> {{rowData.vin}}\n                                </div>\n                                <div class=\"ui-g-12\">\n                                    <b>Year:</b> {{rowData.year}}\n                                </div>\n                                <div class=\"ui-g-12\">\n                                    <b>Brand:</b> {{rowData.brand}}\n                                </div>\n                                <div class=\"ui-g-12\">\n                                    <b>Color:</b> {{rowData.color}}\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </td>\n            </tr>\n        </ng-template>\n    </p-table>\n    <p-table class=\"colResizeTable\" [columns]=\"cols\" [value]=\"cars\" [resizableColumns]=\"true\">\n        <ng-template pTemplate=\"colgroup\" let-columns>\n            <colgroup>\n                <col *ngFor=\"let col of columns\" >\n            </colgroup>\n        </ng-template>\n        <ng-template pTemplate=\"header\" let-columns>\n            <tr>\n                <th *ngFor=\"let col of columns\" pResizableColumn>\n                    {{col.header}}\n                </th>\n            </tr>\n        </ng-template>\n        <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n            <tr>\n                <td *ngFor=\"let col of columns\" class=\"ui-resizable-column\">\n                    {{rowData[col.field]}}\n                </td>\n            </tr>\n        </ng-template>\n    </p-table>\n    <p-table class=\"reorderableTable\" [columns]=\"cols\" [value]=\"cars\" [reorderableColumns]=\"true\">\n        <ng-template pTemplate=\"header\" let-columns>\n            <tr>\n                <th style=\"width:2.5em\"></th>\n                <th *ngFor=\"let col of columns\" pReorderableColumn>\n                    {{col.header}}\n                </th>\n            </tr>\n        </ng-template>\n        <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\" let-index=\"rowIndex\">\n            <tr [pReorderableRow]=\"index\">\n                <td>\n                    <i class=\"fa fa-bars\" pReorderableRowHandle></i>\n                </td>\n                <td *ngFor=\"let col of columns\">\n                    {{rowData[col.field]}}\n                </td>\n            </tr>\n        </ng-template>\n    </p-table>\n    <p-table class=\"contextMenuTable\" [columns]=\"cols\" [value]=\"cars\" [contextMenu]=\"cm\">\n        <ng-template pTemplate=\"header\" let-columns>\n            <tr>\n                <th *ngFor=\"let col of columns\">\n                    {{col.header}}\n                </th>\n            </tr>\n        </ng-template>\n        <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n            <tr [pSelectableRow]=\"rowData\" [pContextMenuRow]=\"rowData\">\n                <td *ngFor=\"let col of columns\">\n                    {{rowData[col.field]}}\n                </td>\n            </tr>\n        </ng-template>\n    </p-table>\n\n    <p-contextMenu #cm [model]=\"items\"></p-contextMenu>\n    <p-table class=\"stateTable\" #dt1 [columns]=\"cols2\" [value]=\"cars2\" [paginator]=\"true\" [rows]=\"3\" dataKey=\"vin\" [resizableColumns]=\"true\" [reorderableColumns]=\"true\"\n        selectionMode=\"single\" stateKey=\"statedemo\">\n        <ng-template pTemplate=\"header\" let-columns>\n            <tr>\n                <th *ngFor=\"let col of columns\" [pSortableColumn]=\"col.field\" pResizableColumn pReorderableColumn>\n                    {{col.header}}\n                    <p-sortIcon [field]=\"col.field\"></p-sortIcon>\n                </th>\n            </tr>\n            <tr>\n                <th *ngFor=\"let col of columns\" [ngSwitch]=\"col.field\" class=\"ui-fluid\">\n                    <input pInputText type=\"text\" (input)=\"dt1.filter($event.target.value, col.field, col.filterMatchMode)\" [value]=\"dt1.filters[col.field]?.value\">\n                </th>\n            </tr>\n        </ng-template>\n        <ng-template pTemplate=\"body\" let-rowData let-columns=\"columns\">\n            <tr [pSelectableRow]=\"rowData\">\n                <td *ngFor=\"let col of columns\">\n                    {{rowData[col.field]}}\n                </td>\n            </tr>\n        </ng-template>\n    </p-table>\n    "
        })
    ], TestBasicTableComponent);
    return TestBasicTableComponent;
}());
describe('Table', function () {
    var table;
    var filterTable;
    var sortTable;
    var basicSelectionTable;
    var radioSelectionTable;
    var checkboxSelectionTable;
    var editableTable;
    var rowExpansionTable;
    var colResizeTable;
    var reorderableTable;
    var contextMenuTable;
    var stateTable;
    var testComponent;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule,
                forms_1.FormsModule,
                shared_1.SharedModule,
                scrolling_1.ScrollingModule,
                testing_2.RouterTestingModule.withRoutes([
                    { path: 'test', component: contextmenu_1.ContextMenu }
                ]),
            ],
            declarations: [
                table_1.Table,
                table_1.SortableColumn,
                table_1.SelectableRow,
                table_1.RowToggler,
                table_1.ContextMenuRow,
                table_1.ResizableColumn,
                table_1.ReorderableColumn,
                table_1.EditableColumn,
                table_1.CellEditor,
                table_1.TableBody,
                table_1.ScrollableView,
                table_1.SortIcon,
                table_1.TableRadioButton,
                table_1.TableCheckbox,
                table_1.TableHeaderCheckbox,
                table_1.ReorderableRowHandle,
                table_1.ReorderableRow,
                table_1.SelectableRowDblClick,
                paginator_1.Paginator,
                dropdown_1.Dropdown,
                dropdown_1.DropdownItem,
                contextmenu_1.ContextMenu,
                contextmenu_1.ContextMenuSub,
                TestBasicTableComponent,
            ]
        });
        fixture = testing_1.TestBed.createComponent(TestBasicTableComponent);
        testComponent = fixture.componentInstance;
        table = fixture.debugElement.children[0].componentInstance;
        filterTable = fixture.debugElement.children[1].componentInstance;
        sortTable = fixture.debugElement.children[2].componentInstance;
        basicSelectionTable = fixture.debugElement.children[3].componentInstance;
        radioSelectionTable = fixture.debugElement.children[4].componentInstance;
        checkboxSelectionTable = fixture.debugElement.children[5].componentInstance;
        editableTable = fixture.debugElement.children[6].componentInstance;
        rowExpansionTable = fixture.debugElement.children[7].componentInstance;
        colResizeTable = fixture.debugElement.children[8].componentInstance;
        reorderableTable = fixture.debugElement.children[9].componentInstance;
        contextMenuTable = fixture.debugElement.children[10].componentInstance;
        stateTable = fixture.debugElement.children[12].componentInstance;
    });
    it('should display by default', function () {
        fixture.detectChanges();
        var tableEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        expect(tableEl.nativeElement).toBeTruthy();
    });
    it('should display 10 rows', function () {
        fixture.detectChanges();
        var tableEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        var bodyRows = tableEl.query(platform_browser_1.By.css('.ui-table-tbody')).queryAll(platform_browser_1.By.css('tr'));
        expect(bodyRows.length).toEqual(10);
    });
    it('should use sections', function () {
        fixture.detectChanges();
        expect(table.captionTemplate).toBeTruthy();
        expect(table.footerTemplate).toBeTruthy();
        expect(table.summaryTemplate).toBeTruthy();
    });
    it('should use 2 paginator', function () {
        fixture.detectChanges();
        table.paginator = true;
        table.rows = 5;
        table.paginatorPosition = "both";
        var basicTableEl = fixture.debugElement.query(platform_browser_1.By.css('.basicTable'));
        fixture.detectChanges();
        var paginatorCount = basicTableEl.queryAll(platform_browser_1.By.css("p-paginator"));
        expect(paginatorCount.length).toEqual(2);
    });
    it('should use paginator and list 5 elements', function () {
        fixture.detectChanges();
        table.paginator = true;
        table.rows = 5;
        fixture.detectChanges();
        var tableEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        var bodyRows = tableEl.query(platform_browser_1.By.css('.ui-table-tbody')).queryAll(platform_browser_1.By.css('tr'));
        expect(bodyRows.length).toEqual(5);
        var pageTwoEl = fixture.debugElement.query(platform_browser_1.By.css("p-paginator")).query(platform_browser_1.By.css(".ui-paginator-pages")).children[1];
        pageTwoEl.nativeElement.click();
        fixture.detectChanges();
        expect(table.first).toEqual(5);
        expect(bodyRows.length).toEqual(5);
    });
    it('should use custom filter and show 2 items', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        var brandFilter = fixture.debugElement.query(platform_browser_1.By.css(".brandFilter"));
        brandFilter.nativeElement.value = "v";
        brandFilter.nativeElement.dispatchEvent(new Event("input"));
        testing_1.tick(300);
        fixture.detectChanges();
        var tableEl = fixture.debugElement.query(platform_browser_1.By.css(".filterTable"));
        var bodyRows = tableEl.query(platform_browser_1.By.css('.ui-table-tbody')).queryAll(platform_browser_1.By.css('tr'));
        expect(bodyRows.length).toEqual(2);
    }));
    it('should use custom filter and show 2 items and after call reset', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        var brandFilter = fixture.debugElement.query(platform_browser_1.By.css(".brandFilter"));
        brandFilter.nativeElement.value = "v";
        brandFilter.nativeElement.dispatchEvent(new Event("input"));
        testing_1.tick(300);
        fixture.detectChanges();
        var tableEl = fixture.debugElement.query(platform_browser_1.By.css(".filterTable"));
        var bodyRows = tableEl.query(platform_browser_1.By.css('.ui-table-tbody')).queryAll(platform_browser_1.By.css('tr'));
        expect(bodyRows.length).toEqual(2);
        filterTable.reset();
        fixture.detectChanges();
        expect(filterTable.filteredValue).toBeNull();
    }));
    it('should use global filter and show 1 items', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        var globalFilter = fixture.debugElement.query(platform_browser_1.By.css(".globalFilter"));
        globalFilter.nativeElement.value = "dsad231ff";
        globalFilter.nativeElement.dispatchEvent(new Event("input"));
        testing_1.tick(300);
        fixture.detectChanges();
        var tableEl = fixture.debugElement.query(platform_browser_1.By.css(".filterTable"));
        var bodyRows = tableEl.query(platform_browser_1.By.css('.ui-table-tbody')).queryAll(platform_browser_1.By.css('tr'));
        expect(bodyRows.length).toEqual(1);
    }));
    it('should use globalFilterFields and show 0 items', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        filterTable.globalFilterFields = ['year', 'color', 'brand'];
        fixture.detectChanges();
        var globalFilter = fixture.debugElement.query(platform_browser_1.By.css(".globalFilter"));
        globalFilter.nativeElement.value = "dsad231";
        globalFilter.nativeElement.dispatchEvent(new Event("input"));
        testing_1.tick(300);
        fixture.detectChanges();
        var tableEl = fixture.debugElement.query(platform_browser_1.By.css(".filterTable"));
        var bodyRows = tableEl.query(platform_browser_1.By.css('.ui-table-tbody')).queryAll(platform_browser_1.By.css('tr'));
        expect(bodyRows.length).toEqual(0);
    }));
    it('should use endsWith filter and show 1 item. It should clear the filter and show 10 item.', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        filterTable.filter("231ff", "vin", "endsWith");
        testing_1.tick(300);
        fixture.detectChanges();
        var tableEl = fixture.debugElement.query(platform_browser_1.By.css(".filterTable"));
        var bodyRows = tableEl.query(platform_browser_1.By.css('.ui-table-tbody')).queryAll(platform_browser_1.By.css('tr'));
        expect(bodyRows.length).toEqual(1);
        filterTable.filter(null, "vin", "endsWith");
        testing_1.tick(300);
        fixture.detectChanges();
        bodyRows = tableEl.query(platform_browser_1.By.css('.ui-table-tbody')).queryAll(platform_browser_1.By.css('tr'));
        expect(bodyRows.length).toEqual(10);
    }));
    it('should use equals filter and show 1 item', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        filterTable.filter("dsad231ff", "vin", "equals");
        testing_1.tick(300);
        fixture.detectChanges();
        var tableEl = fixture.debugElement.query(platform_browser_1.By.css(".filterTable"));
        var bodyRows = tableEl.query(platform_browser_1.By.css('.ui-table-tbody')).queryAll(platform_browser_1.By.css('tr'));
        expect(bodyRows.length).toEqual(1);
    }));
    it('should use not equals filter and show 9 item', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        filterTable.filter("dsad231ff", "vin", "notEquals");
        testing_1.tick(300);
        fixture.detectChanges();
        var tableEl = fixture.debugElement.query(platform_browser_1.By.css(".filterTable"));
        var bodyRows = tableEl.query(platform_browser_1.By.css('.ui-table-tbody')).queryAll(platform_browser_1.By.css('tr'));
        expect(bodyRows.length).toEqual(9);
    }));
    it('should use in filter and show 1 item', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        filterTable.filter(["BMW", null], "brand", "in");
        testing_1.tick(300);
        fixture.detectChanges();
        var tableEl = fixture.debugElement.query(platform_browser_1.By.css(".filterTable"));
        var bodyRows = tableEl.query(platform_browser_1.By.css('.ui-table-tbody')).queryAll(platform_browser_1.By.css('tr'));
        expect(bodyRows.length).toEqual(1);
        filterTable.filter([], "brand", "in");
        testing_1.tick(300);
        fixture.detectChanges();
        expect(bodyRows.length).toEqual(1);
    }));
    it('should use lt filter and show 5 item', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        filterTable.filter("2005", "year", "lt");
        testing_1.tick(300);
        fixture.detectChanges();
        var tableEl = fixture.debugElement.query(platform_browser_1.By.css(".filterTable"));
        var bodyRows = tableEl.query(platform_browser_1.By.css('.ui-table-tbody')).queryAll(platform_browser_1.By.css('tr'));
        expect(bodyRows.length).toEqual(3);
    }));
    it('should use lte filter and show 5 item', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        filterTable.filter("2005", "year", "lte");
        testing_1.tick(300);
        fixture.detectChanges();
        var tableEl = fixture.debugElement.query(platform_browser_1.By.css(".filterTable"));
        var bodyRows = tableEl.query(platform_browser_1.By.css('.ui-table-tbody')).queryAll(platform_browser_1.By.css('tr'));
        expect(bodyRows.length).toEqual(5);
    }));
    it('should use gt filter and show 5 item', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        filterTable.filter("2005", "year", "gt");
        testing_1.tick(300);
        fixture.detectChanges();
        var tableEl = fixture.debugElement.query(platform_browser_1.By.css(".filterTable"));
        var bodyRows = tableEl.query(platform_browser_1.By.css('.ui-table-tbody')).queryAll(platform_browser_1.By.css('tr'));
        expect(bodyRows.length).toEqual(5);
    }));
    it('should use gte filter and show 5 item', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        filterTable.filter("2005", "year", "gte");
        testing_1.tick(300);
        fixture.detectChanges();
        var tableEl = fixture.debugElement.query(platform_browser_1.By.css(".filterTable"));
        var bodyRows = tableEl.query(platform_browser_1.By.css('.ui-table-tbody')).queryAll(platform_browser_1.By.css('tr'));
        expect(bodyRows.length).toEqual(7);
    }));
    it('should use basic sort', function () {
        fixture.detectChanges();
        var brandSortEl = fixture.debugElement.query(platform_browser_1.By.css(".sortableColumn"));
        brandSortEl.nativeElement.click();
        fixture.detectChanges();
        var firstEl = fixture.debugElement.query(platform_browser_1.By.css(".sortTable")).query(platform_browser_1.By.css('.ui-table-tbody')).query(platform_browser_1.By.css('td'));
        expect(firstEl.nativeElement.outerText).toEqual("Audi");
    });
    it('should use multiple sort', testing_1.fakeAsync(function () {
        sortTable.sortMode = "multiple";
        fixture.detectChanges();
        var yearSortEl = fixture.debugElement.queryAll(platform_browser_1.By.css(".sortableColumn"))[1];
        var colorSortEl = fixture.debugElement.queryAll(platform_browser_1.By.css(".sortableColumn"))[3];
        colorSortEl.nativeElement.click();
        fixture.detectChanges();
        var firstEl = fixture.debugElement.query(platform_browser_1.By.css(".sortTable")).query(platform_browser_1.By.css('.ui-table-tbody')).query(platform_browser_1.By.css('tr'));
        expect(firstEl.children[3].nativeElement.outerText).toEqual("Black");
        expect(firstEl.children[2].nativeElement.outerText).toEqual("2011");
        sortTable.multiSortMeta.push({ field: "year", order: 1 });
        sortTable.sortMultiple();
        testing_1.tick(300);
        fixture.detectChanges();
        var firstRow = fixture.debugElement.query(platform_browser_1.By.css(".sortTable")).query(platform_browser_1.By.css('.ui-table-tbody')).query(platform_browser_1.By.css('tr'));
        expect(firstRow.children[2].nativeElement.outerText).toEqual("2000");
    }));
    it('should use custom sort', function () {
        sortTable.customSort = true;
        sortTable.sortFunction.subscribe(function (event) { return testComponent.customSort(event); });
        fixture.detectChanges();
        var brandSortEl = fixture.debugElement.query(platform_browser_1.By.css(".sortableColumn"));
        brandSortEl.nativeElement.click();
        fixture.detectChanges();
        var firstEl = fixture.debugElement.query(platform_browser_1.By.css(".sortTable")).query(platform_browser_1.By.css('.ui-table-tbody')).query(platform_browser_1.By.css('td'));
        expect(firstEl.nativeElement.outerText).toEqual("Audi");
    });
    it('should select single item and unselect when another item select and self click', function () {
        fixture.detectChanges();
        var selectableRows = fixture.debugElement.queryAll(platform_browser_1.By.css(".selectableRow"));
        var vwEl = selectableRows[0];
        vwEl.nativeElement.click();
        fixture.detectChanges();
        expect(basicSelectionTable.selection.brand).toEqual("VW");
        expect(vwEl.nativeElement.className).toContain('ui-state-highlight');
        var audiEl = selectableRows[1];
        audiEl.nativeElement.click();
        fixture.detectChanges();
        expect(basicSelectionTable.selection.brand).toEqual("Audi");
        expect(audiEl.nativeElement.className).toContain('ui-state-highlight');
        audiEl.nativeElement.click();
        fixture.detectChanges();
        expect(basicSelectionTable.selection).toBeFalsy();
        expect(audiEl.nativeElement.className).not.toContain('ui-state-highlight');
    });
    it('should select single item and unselect when another item select and self click without dataKey', function () {
        fixture.detectChanges();
        basicSelectionTable.dataKey = null;
        fixture.detectChanges();
        var selectableRows = fixture.debugElement.queryAll(platform_browser_1.By.css(".selectableRow"));
        var vwEl = selectableRows[0];
        vwEl.nativeElement.click();
        fixture.detectChanges();
        expect(basicSelectionTable.selection.brand).toEqual("VW");
        expect(vwEl.nativeElement.className).toContain('ui-state-highlight');
        var audiEl = selectableRows[1];
        audiEl.nativeElement.click();
        fixture.detectChanges();
        expect(basicSelectionTable.selection.brand).toEqual("Audi");
        expect(audiEl.nativeElement.className).toContain('ui-state-highlight');
        audiEl.nativeElement.click();
        fixture.detectChanges();
        expect(basicSelectionTable.selection).toBeFalsy();
        expect(audiEl.nativeElement.className).not.toContain('ui-state-highlight');
    });
    it('should select multiple items and unselect with self click', function () {
        fixture.detectChanges();
        basicSelectionTable.selectionMode = "multiple";
        fixture.detectChanges();
        var selectableRows = fixture.debugElement.queryAll(platform_browser_1.By.css(".selectableRow"));
        var vwEl = selectableRows[0];
        vwEl.nativeElement.click();
        fixture.detectChanges();
        expect(basicSelectionTable.selection[0].brand).toEqual("VW");
        expect(vwEl.nativeElement.className).toContain('ui-state-highlight');
        var audiEl = selectableRows[1];
        audiEl.nativeElement.click();
        fixture.detectChanges();
        expect(basicSelectionTable.selection[1].brand).toEqual("Audi");
        expect(basicSelectionTable.selection.length).toEqual(2);
        expect(audiEl.nativeElement.className).toContain('ui-state-highlight');
        audiEl.nativeElement.click();
        fixture.detectChanges();
        expect(basicSelectionTable.selection.length).toEqual(1);
        expect(audiEl.nativeElement.className).not.toContain('ui-state-highlight');
    });
    it('should select single item with metaKey selection', function () {
        fixture.detectChanges();
        basicSelectionTable.metaKeySelection = true;
        fixture.detectChanges();
        var selectableRows = fixture.debugElement.queryAll(platform_browser_1.By.css(".selectableRow"));
        var vwEl = selectableRows[0];
        vwEl.nativeElement.click();
        fixture.detectChanges();
        expect(basicSelectionTable.selection.brand).toEqual("VW");
        expect(vwEl.nativeElement.className).toContain('ui-state-highlight');
        var event = document.createEvent('CustomEvent');
        event.metaKey = true;
        event.ctrlKey = true;
        event.initEvent('click');
        var audiEl = selectableRows[1];
        audiEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();
        expect(basicSelectionTable.selection.brand).toEqual("Audi");
        expect(audiEl.nativeElement.className).toContain('ui-state-highlight');
        audiEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();
        expect(basicSelectionTable.selection).toBeFalsy();
        expect(audiEl.nativeElement.className).not.toContain('ui-state-highlight');
    });
    it('should select multiple items with metaKey selection', function () {
        fixture.detectChanges();
        basicSelectionTable.stateKey = "vin";
        basicSelectionTable.selectionMode = "multiple";
        basicSelectionTable.metaKeySelection = true;
        fixture.detectChanges();
        var selectableRows = fixture.debugElement.queryAll(platform_browser_1.By.css(".selectableRow"));
        var vwEl = selectableRows[0];
        vwEl.nativeElement.click();
        fixture.detectChanges();
        expect(basicSelectionTable.selection[0].brand).toEqual("VW");
        expect(vwEl.nativeElement.className).toContain('ui-state-highlight');
        var event = document.createEvent('CustomEvent');
        event.metaKey = true;
        event.ctrlKey = true;
        event.initEvent('click');
        var audiEl = selectableRows[1];
        audiEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();
        expect(basicSelectionTable.selection[1].brand).toEqual("Audi");
        expect(basicSelectionTable.selection.length).toEqual(2);
        expect(audiEl.nativeElement.className).toContain('ui-state-highlight');
        audiEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();
        expect(basicSelectionTable.selection.length).toEqual(1);
        expect(audiEl.nativeElement.className).not.toContain('ui-state-highlight');
    });
    it('should select range  with shiftKey selection', function () {
        fixture.detectChanges();
        basicSelectionTable.selectionMode = "multiple";
        basicSelectionTable.metaKeySelection = true;
        fixture.detectChanges();
        var event = document.createEvent('CustomEvent');
        event.shiftKey = true;
        event.initEvent('click');
        var selectableRows = fixture.debugElement.queryAll(platform_browser_1.By.css(".selectableRow"));
        var audiEl = selectableRows[1];
        audiEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();
        audiEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();
        expect(basicSelectionTable.rangeRowIndex).toEqual(basicSelectionTable.anchorRowIndex);
        expect(basicSelectionTable.selection[0].brand).toEqual("Audi");
        expect(audiEl.nativeElement.className).toContain('ui-state-highlight');
        var mercedesEl = selectableRows[4];
        mercedesEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();
        expect(basicSelectionTable.selection.length).toEqual(4);
        var fordEl = selectableRows[8];
        fordEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();
        expect(basicSelectionTable.selection.length).toEqual(8);
        var vwEl = selectableRows[0];
        vwEl.nativeElement.dispatchEvent(event);
        vwEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();
        expect(basicSelectionTable.selection.length).toEqual(2);
    });
    it('should select range  with shiftKey selection without dataKey', function () {
        fixture.detectChanges();
        basicSelectionTable.dataKey = null;
        basicSelectionTable.selectionMode = "multiple";
        basicSelectionTable.metaKeySelection = true;
        fixture.detectChanges();
        var event = document.createEvent('CustomEvent');
        event.shiftKey = true;
        event.initEvent('click');
        var selectableRows = fixture.debugElement.queryAll(platform_browser_1.By.css(".selectableRow"));
        var audiEl = selectableRows[1];
        audiEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();
        audiEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();
        expect(basicSelectionTable.rangeRowIndex).toEqual(basicSelectionTable.anchorRowIndex);
        expect(basicSelectionTable.selection[0].brand).toEqual("Audi");
        expect(audiEl.nativeElement.className).toContain('ui-state-highlight');
        var mercedesEl = selectableRows[4];
        mercedesEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();
        expect(basicSelectionTable.selection.length).toEqual(4);
        var fordEl = selectableRows[8];
        fordEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();
        expect(basicSelectionTable.selection.length).toEqual(8);
        var vwEl = selectableRows[0];
        vwEl.nativeElement.dispatchEvent(event);
        vwEl.nativeElement.dispatchEvent(event);
        fixture.detectChanges();
        expect(basicSelectionTable.selection.length).toEqual(2);
    });
    it('should select with radioButton', function () {
        fixture.detectChanges();
        radioSelectionTable.stateKey = "vin";
        fixture.detectChanges();
        var radioRows = fixture.debugElement.queryAll(platform_browser_1.By.css(".radioRow"));
        expect(radioRows.length).toEqual(10);
        var vwRadioEl = radioRows[0].query(platform_browser_1.By.css("div"));
        var bmwRadioEl = radioRows[3].query(platform_browser_1.By.css("div"));
        vwRadioEl.query(platform_browser_1.By.css("input")).nativeElement.dispatchEvent(new Event("focus"));
        vwRadioEl.nativeElement.click();
        fixture.detectChanges();
        expect(vwRadioEl.query(platform_browser_1.By.css(".ui-radiobutton-box")).nativeElement.className).toContain("ui-state-focus");
        vwRadioEl.query(platform_browser_1.By.css("input")).nativeElement.dispatchEvent(new Event("blur"));
        fixture.detectChanges();
        expect(vwRadioEl.query(platform_browser_1.By.css(".ui-radiobutton-box")).nativeElement.className).not.toContain("ui-state-focus");
        expect(radioSelectionTable.selection.brand).toEqual("VW");
        bmwRadioEl.nativeElement.click();
        fixture.detectChanges();
        expect(radioSelectionTable.selection.brand).toEqual("BMW");
        bmwRadioEl.nativeElement.click();
        fixture.detectChanges();
        expect(radioSelectionTable.selection).toBeFalsy();
    });
    it('should select with checkbox and unselect when self click', function () {
        fixture.detectChanges();
        checkboxSelectionTable.stateKey = "vin";
        fixture.detectChanges();
        var checkboxRows = fixture.debugElement.queryAll(platform_browser_1.By.css(".rowCheckbox"));
        expect(checkboxRows.length).toEqual(10);
        var vwCheckboxEl = checkboxRows[0].query(platform_browser_1.By.css("div"));
        vwCheckboxEl.query(platform_browser_1.By.css("input")).nativeElement.dispatchEvent(new Event("focus"));
        vwCheckboxEl.nativeElement.click();
        fixture.detectChanges();
        expect(vwCheckboxEl.query(platform_browser_1.By.css(".ui-chkbox-box")).nativeElement.className).toContain("ui-state-focus");
        vwCheckboxEl.query(platform_browser_1.By.css("input")).nativeElement.dispatchEvent(new Event("blur"));
        fixture.detectChanges();
        expect(vwCheckboxEl.query(platform_browser_1.By.css(".ui-chkbox-box")).nativeElement.className).not.toContain("ui-state-focus");
        expect(checkboxSelectionTable.selection[0].brand).toEqual("VW");
        var audiCheckboxEl = checkboxRows[1].query(platform_browser_1.By.css("div"));
        audiCheckboxEl.nativeElement.click();
        fixture.detectChanges();
        expect(checkboxSelectionTable.selection.length).toEqual(2);
        audiCheckboxEl.nativeElement.click();
        vwCheckboxEl.nativeElement.click();
        fixture.detectChanges();
        expect(checkboxSelectionTable.selection.length).toEqual(0);
    });
    it('should select all items and unselect all item with header checkbox', function () {
        fixture.detectChanges();
        checkboxSelectionTable.stateKey = "vin";
        fixture.detectChanges();
        var checkboxRows = fixture.debugElement.queryAll(platform_browser_1.By.css(".rowCheckbox"));
        var vwCheckboxEl = checkboxRows[0].query(platform_browser_1.By.css("div"));
        var headerCheckbox = fixture.debugElement.query(platform_browser_1.By.css(".headerCheckbox")).query(platform_browser_1.By.css("div"));
        headerCheckbox.query(platform_browser_1.By.css("input")).nativeElement.dispatchEvent(new Event("focus"));
        fixture.detectChanges();
        expect(headerCheckbox.query(platform_browser_1.By.css(".ui-chkbox-box")).nativeElement.className).toContain("ui-state-focus");
        headerCheckbox.nativeElement.click();
        headerCheckbox.query(platform_browser_1.By.css("input")).nativeElement.dispatchEvent(new Event("blur"));
        fixture.detectChanges();
        expect(headerCheckbox.query(platform_browser_1.By.css(".ui-chkbox-box")).nativeElement.className).not.toContain("ui-state-focus");
        expect(checkboxSelectionTable.selection.length).toEqual(10);
        vwCheckboxEl.nativeElement.click();
        fixture.detectChanges();
        expect(checkboxSelectionTable.selection.length).toEqual(9);
        headerCheckbox.nativeElement.click();
        fixture.detectChanges();
        headerCheckbox.nativeElement.click();
        fixture.detectChanges();
        expect(checkboxSelectionTable.selection).toEqual([]);
    });
    it('should headerCheckbox changing by filtering', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        checkboxSelectionTable.stateKey = "vin";
        fixture.detectChanges();
        var headerCheckbox = fixture.debugElement.query(platform_browser_1.By.css(".headerCheckbox")).query(platform_browser_1.By.css("div"));
        headerCheckbox.nativeElement.click();
        fixture.detectChanges();
        checkboxSelectionTable.filter("v", "brand", "contains");
        testing_1.tick(300);
        fixture.detectChanges();
        var rowCheckboxs = fixture.debugElement.queryAll(platform_browser_1.By.css(".rowCheckbox"));
        expect(rowCheckboxs.length).toEqual(2);
        expect(fixture.debugElement.query(platform_browser_1.By.css(".headerCheckbox")).componentInstance.isAllFilteredValuesChecked()).toEqual(true);
        rowCheckboxs[0].query(platform_browser_1.By.css("div")).nativeElement.click();
        fixture.detectChanges();
        checkboxSelectionTable.filter("v", "brand", "contains");
        testing_1.tick(300);
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css(".headerCheckbox")).componentInstance.isAllFilteredValuesChecked()).toEqual(false);
    }));
    it('should headerCheckbox changing by filtering', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        checkboxSelectionTable.stateKey = "vin";
        fixture.detectChanges();
        var headerCheckbox = fixture.debugElement.query(platform_browser_1.By.css(".headerCheckbox")).query(platform_browser_1.By.css("div"));
        headerCheckbox.nativeElement.click();
        fixture.detectChanges();
        checkboxSelectionTable.filter("v", "brand", "contains");
        testing_1.tick(300);
        fixture.detectChanges();
        var rowCheckboxs = fixture.debugElement.queryAll(platform_browser_1.By.css(".rowCheckbox"));
        expect(rowCheckboxs.length).toEqual(2);
        expect(fixture.debugElement.query(platform_browser_1.By.css(".headerCheckbox")).componentInstance.isAllFilteredValuesChecked()).toEqual(true);
        rowCheckboxs[0].query(platform_browser_1.By.css("div")).nativeElement.click();
        fixture.detectChanges();
        checkboxSelectionTable.filter("v", "brand", "contains");
        testing_1.tick(300);
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css(".headerCheckbox")).componentInstance.isAllFilteredValuesChecked()).toEqual(false);
    }));
    it('should open cell', function () {
        fixture.detectChanges();
        var cell = fixture.debugElement.query(platform_browser_1.By.css(".ui-editable-column"));
        cell.nativeElement.click();
        fixture.detectChanges();
        expect(editableTable.editingCell).toBeTruthy();
    });
    it('should close cell', function () {
        fixture.detectChanges();
        var cell = fixture.debugElement.query(platform_browser_1.By.css(".ui-editable-column"));
        cell.nativeElement.click();
        fixture.detectChanges();
        expect(editableTable.editingCell).toBeTruthy();
        var keydownEvent = document.createEvent('CustomEvent');
        keydownEvent.keyCode = 13;
        keydownEvent.initEvent('keydown', true, true);
        cell.nativeElement.dispatchEvent(keydownEvent);
        fixture.detectChanges();
        expect(editableTable.editingCell).toBeFalsy();
        cell.nativeElement.click();
        fixture.detectChanges();
        expect(editableTable.editingCell).toBeTruthy();
        keydownEvent.keyCode = 27;
        cell.nativeElement.dispatchEvent(keydownEvent);
        fixture.detectChanges();
        expect(editableTable.editingCell).toBeFalsy();
    });
    it('should open next cell', function () {
        fixture.detectChanges();
        var cellEls = fixture.debugElement.queryAll(platform_browser_1.By.css(".ui-editable-column"));
        var cell = cellEls[0];
        cell.nativeElement.click();
        fixture.detectChanges();
        expect(editableTable.editingCell).toBeTruthy();
        cell.triggerEventHandler("keydown", { target: cell.children[0].children[0].nativeElement, keyCode: 9, preventDefault: function () { } });
        fixture.detectChanges();
        expect(editableTable.editingCell).not.toEqual(cell.nativeElement);
        expect(editableTable.editingCell).toEqual(cellEls[1].nativeElement);
    });
    it('should open prev cell', function () {
        fixture.detectChanges();
        var cellEls = fixture.debugElement.queryAll(platform_browser_1.By.css(".ui-editable-column"));
        var cell = cellEls[1];
        cell.nativeElement.click();
        fixture.detectChanges();
        expect(editableTable.editingCell).toBeTruthy();
        cell.triggerEventHandler("keydown", { target: cell.children[0].children[0].nativeElement, keyCode: 9, shiftKey: true, preventDefault: function () { } });
        fixture.detectChanges();
        expect(editableTable.editingCell).not.toEqual(cell.nativeElement);
        expect(editableTable.editingCell).toEqual(cellEls[0].nativeElement);
    });
    it('should open expansion', function () {
        fixture.detectChanges();
        var rowExpansionTableEl = fixture.debugElement.query(platform_browser_1.By.css(".rowExpansionTable"));
        var togglerEls = fixture.debugElement.queryAll(platform_browser_1.By.css(".rowExpansionToggler"));
        var rowEls = rowExpansionTableEl.queryAll(platform_browser_1.By.css("tr"));
        expect(togglerEls.length).toEqual(10);
        expect(rowEls.length).toEqual(11);
        togglerEls[0].nativeElement.click();
        fixture.detectChanges();
        rowEls = rowExpansionTableEl.queryAll(platform_browser_1.By.css("tr"));
        var expandedRow = fixture.debugElement.query(platform_browser_1.By.css(".expandedRow"));
        expect(rowEls.length).toEqual(12);
        expect(expandedRow.nativeElement).toBeTruthy();
    });
    it('should call resize (fit)', function () {
        fixture.detectChanges();
        var resizerEls = document.getElementsByClassName("ui-column-resizer");
        var defaultWidth = resizerEls[0].parentElement.parentElement.clientWidth;
        var onColumnResizeBeginSpy = spyOn(colResizeTable, "onColumnResizeBegin").and.callThrough();
        var event = document.createEvent('CustomEvent');
        event.pageX = 450;
        event.initEvent('mousedown');
        var firstWidth = resizerEls[0].parentElement.clientWidth;
        resizerEls[0].dispatchEvent(event);
        fixture.detectChanges();
        expect(onColumnResizeBeginSpy).toHaveBeenCalled();
        var onColumnResizeSpy = spyOn(colResizeTable, "onColumnResize").and.callThrough();
        event.initEvent("mousemove");
        event.pageX = 420;
        document.dispatchEvent(event);
        fixture.detectChanges();
        expect(onColumnResizeSpy).toHaveBeenCalled();
        var onColumnResizeEndSpy = spyOn(colResizeTable, "onColumnResizeEnd").and.callThrough();
        event.initEvent("mouseup");
        document.dispatchEvent(event);
        fixture.detectChanges();
        expect(onColumnResizeEndSpy).toHaveBeenCalled();
        expect(resizerEls[0].parentElement.clientWidth).toEqual(firstWidth - 30);
        expect(resizerEls[0].parentElement.clientWidth).not.toEqual(firstWidth);
        expect(defaultWidth).toEqual(resizerEls[0].parentElement.parentElement.clientWidth);
    });
    it('should call resize (expand)', function () {
        colResizeTable.columnResizeMode = "expand";
        fixture.detectChanges();
        var resizerEls = document.getElementsByClassName("ui-column-resizer");
        var defaultWidth = resizerEls[0].parentElement.parentElement.clientWidth;
        var onColumnResizeBeginSpy = spyOn(colResizeTable, "onColumnResizeBegin").and.callThrough();
        var event = document.createEvent('CustomEvent');
        event.pageX = 450;
        event.initEvent('mousedown');
        var firstWidth = resizerEls[0].parentElement.clientWidth;
        resizerEls[0].dispatchEvent(event);
        fixture.detectChanges();
        expect(onColumnResizeBeginSpy).toHaveBeenCalled();
        var onColumnResizeSpy = spyOn(colResizeTable, "onColumnResize").and.callThrough();
        event.initEvent("mousemove");
        event.pageX = 420;
        document.dispatchEvent(event);
        fixture.detectChanges();
        expect(onColumnResizeSpy).toHaveBeenCalled();
        var onColumnResizeEndSpy = spyOn(colResizeTable, "onColumnResizeEnd").and.callThrough();
        event.initEvent("mouseup");
        document.dispatchEvent(event);
        fixture.detectChanges();
        expect(onColumnResizeEndSpy).toHaveBeenCalled();
        expect(resizerEls[0].parentElement.clientWidth).toEqual(firstWidth - 30);
        expect(resizerEls[0].parentElement.clientWidth).not.toEqual(firstWidth);
        expect(defaultWidth).not.toEqual(resizerEls[0].parentElement.parentElement.clientWidth);
        expect(defaultWidth).toEqual(resizerEls[0].parentElement.parentElement.clientWidth + 30);
    });
    it('should call resize and resizeColGroup with scrollableTable (fit)', function () {
        colResizeTable.scrollable = true;
        colResizeTable.scrollHeight = "50px";
        fixture.detectChanges();
        var resizerEls = document.getElementsByClassName("ui-column-resizer");
        var defaultWidth = resizerEls[0].parentElement.parentElement.clientWidth;
        var onColumnResizeBeginSpy = spyOn(colResizeTable, "onColumnResizeBegin").and.callThrough();
        var event = document.createEvent('CustomEvent');
        event.pageX = 450;
        event.initEvent('mousedown');
        var firstWidth = resizerEls[0].parentElement.clientWidth;
        resizerEls[0].dispatchEvent(event);
        fixture.detectChanges();
        expect(onColumnResizeBeginSpy).toHaveBeenCalled();
        var onColumnResizeSpy = spyOn(colResizeTable, "onColumnResize").and.callThrough();
        event.initEvent("mousemove");
        event.pageX = 420;
        document.dispatchEvent(event);
        fixture.detectChanges();
        expect(onColumnResizeSpy).toHaveBeenCalled();
        var onColumnResizeEndSpy = spyOn(colResizeTable, "onColumnResizeEnd").and.callThrough();
        var resizeColGroupSpy = spyOn(colResizeTable, "resizeColGroup").and.callThrough();
        event.initEvent("mouseup");
        document.dispatchEvent(event);
        fixture.detectChanges();
        expect(onColumnResizeEndSpy).toHaveBeenCalled();
        expect(resizeColGroupSpy).toHaveBeenCalled();
        expect(resizerEls[0].parentElement.clientWidth).toEqual(firstWidth - 30);
        expect(resizerEls[0].parentElement.clientWidth).not.toEqual(firstWidth);
        expect(defaultWidth).toEqual(resizerEls[0].parentElement.parentElement.clientWidth);
    });
    it('should call resize and resizeColGroup with scrollableTable (expand)', function () {
        colResizeTable.columnResizeMode = "expand";
        colResizeTable.scrollable = true;
        colResizeTable.scrollHeight = "50px";
        fixture.detectChanges();
        var resizerEls = document.getElementsByClassName("ui-column-resizer");
        var defaultWidth = resizerEls[0].parentElement.parentElement.clientWidth;
        var onColumnResizeBeginSpy = spyOn(colResizeTable, "onColumnResizeBegin").and.callThrough();
        var event = document.createEvent('CustomEvent');
        event.pageX = 450;
        event.initEvent('mousedown');
        var firstWidth = resizerEls[0].parentElement.clientWidth;
        resizerEls[0].dispatchEvent(event);
        fixture.detectChanges();
        expect(onColumnResizeBeginSpy).toHaveBeenCalled();
        var onColumnResizeSpy = spyOn(colResizeTable, "onColumnResize").and.callThrough();
        event.initEvent("mousemove");
        event.pageX = 420;
        document.dispatchEvent(event);
        fixture.detectChanges();
        expect(onColumnResizeSpy).toHaveBeenCalled();
        var onColumnResizeEndSpy = spyOn(colResizeTable, "onColumnResizeEnd").and.callThrough();
        var resizeColGroupSpy = spyOn(colResizeTable, "resizeColGroup").and.callThrough();
        event.initEvent("mouseup");
        document.dispatchEvent(event);
        fixture.detectChanges();
        expect(onColumnResizeEndSpy).toHaveBeenCalled();
        expect(resizeColGroupSpy).toHaveBeenCalled();
        expect(resizerEls[0].parentElement.clientWidth).toEqual(firstWidth - 30);
        expect(resizerEls[0].parentElement.clientWidth).not.toEqual(firstWidth);
        expect(defaultWidth).not.toEqual(resizerEls[0].parentElement.parentElement.clientWidth);
        expect(defaultWidth).toEqual(resizerEls[0].parentElement.parentElement.clientWidth + 30);
    });
    it('should reorder column (dropPosition -1)', function () {
        fixture.detectChanges();
        var reorderableTableEl = fixture.debugElement.query(platform_browser_1.By.css(".reorderableTable"));
        var reorableHeaderEls = reorderableTableEl.queryAll(platform_browser_1.By.css("th"));
        expect(reorableHeaderEls[1].nativeElement.draggable).toBeFalsy();
        reorableHeaderEls[1].nativeElement.dispatchEvent(new Event("mousedown"));
        fixture.detectChanges();
        expect(reorableHeaderEls[1].nativeElement.draggable).toBeTruthy();
        var onColumnDragStartSpy = spyOn(reorderableTable, "onColumnDragStart").and.callThrough();
        var dragEvent = document.createEvent('CustomEvent');
        dragEvent.initEvent('dragstart', true, true);
        dragEvent.dataTransfer = { setData: function (val1, val2) { } };
        reorableHeaderEls[1].nativeElement.dispatchEvent(dragEvent);
        fixture.detectChanges();
        dragEvent.initEvent('dragenter', true, true);
        dragEvent.pageX = reorableHeaderEls[3].nativeElement.clientWidth + 1;
        reorableHeaderEls[2].nativeElement.dispatchEvent(dragEvent);
        fixture.detectChanges();
        dragEvent.initEvent('dragleave', true, true);
        reorableHeaderEls[2].nativeElement.dispatchEvent(dragEvent);
        fixture.detectChanges();
        expect(onColumnDragStartSpy).toHaveBeenCalled();
        expect(reorderableTable.draggedColumn.textContent).toEqual(" Brand ");
        dragEvent.initEvent('dragenter', true, true);
        dragEvent.pageX = reorableHeaderEls[3].nativeElement.clientWidth * 2 + 1;
        reorableHeaderEls[3].nativeElement.dispatchEvent(dragEvent);
        fixture.detectChanges();
        expect(reorderableTable.dropPosition).toEqual(-1);
        dragEvent.initEvent('drop');
        reorableHeaderEls[3].nativeElement.dispatchEvent(dragEvent);
        fixture.detectChanges();
        reorableHeaderEls = reorderableTableEl.queryAll(platform_browser_1.By.css("th"));
        expect(reorableHeaderEls[1].nativeElement.textContent).toEqual(" Vin ");
        expect(reorableHeaderEls[2].nativeElement.textContent).toEqual(" Brand ");
    });
    it('should reorder column (dropPosition +1)', function () {
        fixture.detectChanges();
        var reorderableTableEl = fixture.debugElement.query(platform_browser_1.By.css(".reorderableTable"));
        var reorableHeaderEls = reorderableTableEl.queryAll(platform_browser_1.By.css("th"));
        expect(reorableHeaderEls[1].nativeElement.draggable).toBeFalsy();
        reorableHeaderEls[1].nativeElement.dispatchEvent(new Event("mousedown"));
        fixture.detectChanges();
        expect(reorableHeaderEls[1].nativeElement.draggable).toBeTruthy();
        var onColumnDragStartSpy = spyOn(reorderableTable, "onColumnDragStart").and.callThrough();
        var dragEvent = document.createEvent('CustomEvent');
        dragEvent.initEvent('dragstart', true, true);
        dragEvent.dataTransfer = { setData: function (val1, val2) { } };
        reorableHeaderEls[1].nativeElement.dispatchEvent(dragEvent);
        fixture.detectChanges();
        expect(onColumnDragStartSpy).toHaveBeenCalled();
        expect(reorderableTable.draggedColumn.textContent).toEqual(" Brand ");
        dragEvent.initEvent('dragenter', true, true);
        dragEvent.pageX = reorableHeaderEls[3].nativeElement.clientWidth * 3 + 1;
        reorableHeaderEls[3].nativeElement.dispatchEvent(dragEvent);
        fixture.detectChanges();
        expect(reorderableTable.dropPosition).toEqual(1);
        dragEvent.initEvent('drop');
        reorableHeaderEls[3].nativeElement.dispatchEvent(dragEvent);
        fixture.detectChanges();
        reorableHeaderEls = reorderableTableEl.queryAll(platform_browser_1.By.css("th"));
        expect(reorableHeaderEls[1].nativeElement.textContent).toEqual(" Vin ");
        expect(reorableHeaderEls[2].nativeElement.textContent).toEqual(" Year ");
        expect(reorableHeaderEls[3].nativeElement.textContent).toEqual(" Brand ");
    });
    it('should reorder row (top of the dropped row)', function () {
        fixture.detectChanges();
        var reorderableTableEl = fixture.debugElement.query(platform_browser_1.By.css(".reorderableTable"));
        var reorderableRowEls = reorderableTableEl.queryAll(platform_browser_1.By.css("tr"));
        var handleEls = reorderableTableEl.queryAll(platform_browser_1.By.css(".ui-table-reorderablerow-handle"));
        expect(reorderableRowEls[1].nativeElement.draggable).toBeFalsy();
        expect(reorderableRowEls[1].children[1].nativeElement.textContent).toEqual(" VW ");
        reorderableRowEls[1].nativeElement.classList.add("ui-table-reorderablerow-handle");
        reorderableRowEls[1].nativeElement.dispatchEvent(new Event("mousedown"));
        fixture.detectChanges();
        expect(reorderableRowEls[1].nativeElement.draggable).toBeTruthy();
        reorderableRowEls[1].nativeElement.classList.remove("ui-table-reorderablerow-handle");
        var onRowDragStartSpy = spyOn(reorderableTable, "onRowDragStart").and.callThrough();
        var dragEvent = document.createEvent('CustomEvent');
        dragEvent.initEvent('dragstart', true, true);
        dragEvent.dataTransfer = { setData: function (val1, val2) { } };
        reorderableRowEls[1].nativeElement.dispatchEvent(dragEvent);
        fixture.detectChanges();
        expect(onRowDragStartSpy).toHaveBeenCalled();
        expect(reorderableTable.rowDragging).toBeTruthy();
        expect(reorderableTable.draggedRowIndex).toEqual(0);
        dragEvent.initEvent('dragover', true, true);
        dragEvent.pageY = reorderableRowEls[3].nativeElement.clientWidth * 3 + 1;
        var onRowDragOverSpy = spyOn(reorderableTable, "onRowDragOver").and.callThrough();
        reorderableRowEls[3].nativeElement.dispatchEvent(dragEvent);
        fixture.detectChanges();
        expect(onRowDragOverSpy).toHaveBeenCalled();
        expect(reorderableRowEls[3].nativeElement.classList).toContain("ui-table-dragpoint-bottom");
        expect(reorderableTable.droppedRowIndex).toEqual(3);
        var onRowDropSpy = spyOn(reorderableTable, "onRowDrop").and.callThrough();
        var onRowDragEndSpy = spyOn(reorderableTable, "onRowDragEnd").and.callThrough();
        var onRowDragLeaveSpy = spyOn(reorderableTable, "onRowDragLeave").and.callThrough();
        dragEvent.initEvent('drop', true, true);
        reorderableRowEls[3].nativeElement.dispatchEvent(dragEvent);
        fixture.detectChanges();
        reorderableRowEls = reorderableTableEl.queryAll(platform_browser_1.By.css("tr"));
        expect(reorderableRowEls[1].children[1].nativeElement.textContent).toEqual(" Audi ");
        expect(reorderableRowEls[2].children[1].nativeElement.textContent).toEqual(" Renault ");
        expect(reorderableRowEls[3].children[1].nativeElement.textContent).toEqual(" VW ");
        expect(onRowDropSpy).toHaveBeenCalled();
        expect(onRowDragEndSpy).toHaveBeenCalled();
        expect(onRowDragLeaveSpy).toHaveBeenCalled();
    });
    it('should reorder row (bottom of the dropped row)', function () {
        fixture.detectChanges();
        var reorderableTableEl = fixture.debugElement.query(platform_browser_1.By.css(".reorderableTable"));
        var reorderableRowEls = reorderableTableEl.queryAll(platform_browser_1.By.css("tr"));
        var handleEls = reorderableTableEl.queryAll(platform_browser_1.By.css(".ui-table-reorderablerow-handle"));
        expect(reorderableRowEls[1].nativeElement.draggable).toBeFalsy();
        expect(reorderableRowEls[1].children[1].nativeElement.textContent).toEqual(" VW ");
        reorderableRowEls[1].nativeElement.classList.add("ui-table-reorderablerow-handle");
        reorderableRowEls[1].nativeElement.dispatchEvent(new Event("mousedown"));
        fixture.detectChanges();
        expect(reorderableRowEls[1].nativeElement.draggable).toBeTruthy();
        reorderableRowEls[1].nativeElement.classList.remove("ui-table-reorderablerow-handle");
        var onRowDragStartSpy = spyOn(reorderableTable, "onRowDragStart").and.callThrough();
        var dragEvent = document.createEvent('CustomEvent');
        dragEvent.initEvent('dragstart', true, true);
        dragEvent.dataTransfer = { setData: function (val1, val2) { } };
        reorderableRowEls[1].nativeElement.dispatchEvent(dragEvent);
        fixture.detectChanges();
        expect(onRowDragStartSpy).toHaveBeenCalled();
        expect(reorderableTable.rowDragging).toBeTruthy();
        expect(reorderableTable.draggedRowIndex).toEqual(0);
        dragEvent.initEvent('dragover', true, true);
        dragEvent.pageY = reorderableRowEls[3].nativeElement.clientWidth + 1;
        var onRowDragOverSpy = spyOn(reorderableTable, "onRowDragOver").and.callThrough();
        reorderableRowEls[3].nativeElement.dispatchEvent(dragEvent);
        fixture.detectChanges();
        expect(onRowDragOverSpy).toHaveBeenCalled();
        expect(reorderableTable.droppedRowIndex).toEqual(2);
        var onRowDropSpy = spyOn(reorderableTable, "onRowDrop").and.callThrough();
        var onRowDragEndSpy = spyOn(reorderableTable, "onRowDragEnd").and.callThrough();
        var onRowDragLeaveSpy = spyOn(reorderableTable, "onRowDragLeave").and.callThrough();
        dragEvent.initEvent('drop', true, true);
        reorderableRowEls[3].nativeElement.dispatchEvent(dragEvent);
        fixture.detectChanges();
        reorderableRowEls = reorderableTableEl.queryAll(platform_browser_1.By.css("tr"));
        expect(reorderableRowEls[1].children[1].nativeElement.textContent).toEqual(" Audi ");
        expect(reorderableRowEls[2].children[1].nativeElement.textContent).toEqual(" VW ");
        expect(reorderableRowEls[3].children[1].nativeElement.textContent).toEqual(" Renault ");
        expect(onRowDropSpy).toHaveBeenCalled();
        expect(onRowDragEndSpy).toHaveBeenCalled();
        expect(onRowDragLeaveSpy).toHaveBeenCalled();
    });
    it('should export csv selection only', function () {
        fixture.detectChanges();
        basicSelectionTable.selectionMode = "multiple";
        fixture.detectChanges();
        var selectableRows = fixture.debugElement.queryAll(platform_browser_1.By.css(".selectableRow"));
        var vwEl = selectableRows[0];
        vwEl.nativeElement.click();
        fixture.detectChanges();
        var value;
        var spyObj = {
            style: {
                display: 'block'
            }
        };
        spyOn(document, 'createElement').and.returnValue(spyObj);
        spyOn(document.body, 'appendChild').and.returnValue("");
        spyOn(document.body, 'removeChild').and.returnValue("");
        window.open = function (csv) {
            value = decodeURI(csv);
            return null;
        };
        basicSelectionTable.exportCSV({ selectionOnly: true });
        expect(document.createElement).toHaveBeenCalledTimes(1);
        expect(document.createElement).toHaveBeenCalledWith('a');
        expect(value).toBeTruthy();
        expect(value).toContain("text/csv;charset=utf-8");
        expect(value).toContain("VW");
        expect(value).toContain("dsad231ff");
        expect(value).not.toContain("Audi");
        expect(value).not.toContain("gwregre345");
        expect(spyObj.style.display).toEqual("none");
    });
    it('should set href and download when using exportCSV function', function () {
        fixture.detectChanges();
        var spyObj = {
            click: function () {
            },
            style: {
                display: 'block'
            },
            download: '',
            href: '',
            setAttribute: function (type, value) {
                spyObj[type] = value;
            }
        };
        spyOn(spyObj, 'click').and.callThrough();
        spyOn(document, 'createElement').and.returnValue(spyObj);
        spyOn(document.body, 'appendChild').and.returnValue("");
        spyOn(document.body, 'removeChild').and.returnValue("");
        basicSelectionTable.exportCSV();
        expect(document.createElement).toHaveBeenCalledTimes(1);
        expect(document.createElement).toHaveBeenCalledWith('a');
        expect(spyObj.href).toContain('localhost');
        expect(spyObj.download).toBe('download.csv');
        expect(spyObj.click).toHaveBeenCalledTimes(1);
    });
    it('should open contextMenu and select row', function () {
        fixture.detectChanges();
        var contextMenu = fixture.debugElement.query(platform_browser_1.By.css(".ui-contextmenu")).componentInstance;
        var showSpy = spyOn(contextMenu, "show").and.callThrough();
        var contextMenuTableEl = fixture.debugElement.query(platform_browser_1.By.css(".contextMenuTable"));
        var rowEls = contextMenuTableEl.queryAll(platform_browser_1.By.css("tr"));
        var event = document.createEvent('CustomEvent');
        var handleRowRightClickSpy = spyOn(contextMenuTable, "handleRowRightClick").and.callThrough();
        event.initEvent('contextmenu');
        rowEls[1].nativeElement.dispatchEvent(event);
        fixture.detectChanges();
        expect(handleRowRightClickSpy).toHaveBeenCalled();
        expect(showSpy).toHaveBeenCalled();
        expect(contextMenuTable.contextMenuSelection.brand).toEqual("VW");
    });
    it('should open contextMenu and select row (contextMenuSelectionMode is joint and selection mode single)', function () {
        fixture.detectChanges();
        contextMenuTable.selectionMode = "single";
        contextMenuTable.contextMenuSelectionMode = "joint";
        fixture.detectChanges();
        var contextMenu = fixture.debugElement.query(platform_browser_1.By.css(".ui-contextmenu")).componentInstance;
        var showSpy = spyOn(contextMenu, "show").and.callThrough();
        var contextMenuTableEl = fixture.debugElement.query(platform_browser_1.By.css(".contextMenuTable"));
        var rowEls = contextMenuTableEl.queryAll(platform_browser_1.By.css("tr"));
        var event = document.createEvent('CustomEvent');
        var handleRowRightClickSpy = spyOn(contextMenuTable, "handleRowRightClick").and.callThrough();
        event.initEvent('contextmenu');
        rowEls[1].nativeElement.dispatchEvent(event);
        fixture.detectChanges();
        expect(handleRowRightClickSpy).toHaveBeenCalled();
        expect(showSpy).toHaveBeenCalled();
        expect(contextMenuTable.selection.brand).toEqual("VW");
    });
    it('should open contextMenu and select row (contextMenuSelectionMode is joint and selection mode multiple)', function () {
        fixture.detectChanges();
        contextMenuTable.selectionMode = "multiple";
        contextMenuTable.contextMenuSelectionMode = "joint";
        fixture.detectChanges();
        var contextMenu = fixture.debugElement.query(platform_browser_1.By.css(".ui-contextmenu")).componentInstance;
        var showSpy = spyOn(contextMenu, "show").and.callThrough();
        var contextMenuTableEl = fixture.debugElement.query(platform_browser_1.By.css(".contextMenuTable"));
        var rowEls = contextMenuTableEl.queryAll(platform_browser_1.By.css("tr"));
        var event = document.createEvent('CustomEvent');
        var handleRowRightClickSpy = spyOn(contextMenuTable, "handleRowRightClick").and.callThrough();
        event.initEvent('contextmenu');
        rowEls[1].nativeElement.dispatchEvent(event);
        rowEls[2].nativeElement.click();
        fixture.detectChanges();
        expect(handleRowRightClickSpy).toHaveBeenCalled();
        expect(showSpy).toHaveBeenCalled();
        expect(contextMenuTable.selection[0].brand).toEqual("VW");
        expect(contextMenuTable.selection[1].brand).toEqual("Audi");
        expect(contextMenuTable.selection.length).toEqual(2);
    });
    it('should call saveState and clearState (session)', function () {
        stateTable.columnResizeMode = "expand";
        fixture.detectChanges();
        stateTable.selection = null;
        stateTable.clearState();
        stateTable.stateStorage = "session";
        fixture.detectChanges();
        var stateTableEl = fixture.debugElement.query(platform_browser_1.By.css(".stateTable"));
        var headerEls = stateTableEl.queryAll(platform_browser_1.By.css("th"));
        var brandFilter = stateTableEl.query(platform_browser_1.By.css("input"));
        brandFilter.nativeElement.value = "vo";
        brandFilter.nativeElement.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        var rowEls = stateTableEl.queryAll(platform_browser_1.By.css(".ui-selectable-row"));
        rowEls[0].nativeElement.click();
        fixture.detectChanges();
        var resizerEls = document.getElementsByClassName("ui-column-resizer");
        var event = document.createEvent('CustomEvent');
        event.pageX = 450;
        event.initEvent('mousedown');
        resizerEls[4].dispatchEvent(event);
        fixture.detectChanges();
        event.initEvent("mousemove");
        event.pageX = 420;
        document.dispatchEvent(event);
        fixture.detectChanges();
        event.initEvent("mouseup");
        document.dispatchEvent(event);
        fixture.detectChanges();
        headerEls[0].nativeElement.click();
        fixture.detectChanges();
        var state = JSON.parse((stateTable.getStorage().getItem(stateTable.stateKey)));
        expect(state.columnOrder[0]).toEqual("brand");
        expect(state.columnOrder[1]).toEqual("vin");
        expect(state.columnOrder[2]).toEqual("year");
        expect(state.columnOrder[3]).toEqual("color");
        expect(state.filters.brand.value).toEqual("vo");
        expect(state.first).toEqual(0);
        expect(state.rows).toEqual(3);
        expect(state.selection).toBeTruthy();
        expect(state.sortField).toEqual("brand");
        expect(state.sortOrder).toBeTruthy();
        stateTable.clearState();
        fixture.detectChanges();
        state = JSON.parse((stateTable.getStorage().getItem(stateTable.stateKey)));
        expect(state).toBeNull();
    });
    it('should call saveState and clearState (local)', function () {
        stateTable.columnResizeMode = "expand";
        fixture.detectChanges();
        stateTable.selection = null;
        stateTable.clearState();
        stateTable.stateStorage = "local";
        fixture.detectChanges();
        var stateTableEl = fixture.debugElement.query(platform_browser_1.By.css(".stateTable"));
        var headerEls = stateTableEl.queryAll(platform_browser_1.By.css("th"));
        var brandFilter = stateTableEl.query(platform_browser_1.By.css("input"));
        brandFilter.nativeElement.value = "vo";
        brandFilter.nativeElement.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        var rowEls = stateTableEl.queryAll(platform_browser_1.By.css(".ui-selectable-row"));
        rowEls[0].nativeElement.click();
        fixture.detectChanges();
        var resizerEls = document.getElementsByClassName("ui-column-resizer");
        var event = document.createEvent('CustomEvent');
        event.pageX = 450;
        event.initEvent('mousedown');
        resizerEls[4].dispatchEvent(event);
        fixture.detectChanges();
        event.initEvent("mousemove");
        event.pageX = 420;
        document.dispatchEvent(event);
        fixture.detectChanges();
        event.initEvent("mouseup");
        document.dispatchEvent(event);
        fixture.detectChanges();
        headerEls[0].nativeElement.click();
        fixture.detectChanges();
        var state = JSON.parse((stateTable.getStorage().getItem(stateTable.stateKey)));
        expect(state.columnOrder[0]).toEqual("brand");
        expect(state.columnOrder[1]).toEqual("vin");
        expect(state.columnOrder[2]).toEqual("year");
        expect(state.columnOrder[3]).toEqual("color");
        expect(state.filters.brand.value).toEqual("vo");
        expect(state.first).toEqual(0);
        expect(state.rows).toEqual(3);
        expect(state.selection).toBeTruthy();
        expect(state.sortField).toEqual("brand");
        expect(state.sortOrder).toBeTruthy();
        stateTable.clearState();
        fixture.detectChanges();
        state = JSON.parse((stateTable.getStorage().getItem(stateTable.stateKey)));
        expect(state).toBeNull();
    });
});
//# sourceMappingURL=table.spec.js.map