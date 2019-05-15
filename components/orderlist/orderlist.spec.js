"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var orderlist_1 = require("./orderlist");
var animations_1 = require("@angular/platform-browser/animations");
var button_1 = require("../button/button");
var core_1 = require("@angular/core");
var TestOrderListComponent = /** @class */ (function () {
    function TestOrderListComponent() {
    }
    TestOrderListComponent.prototype.ngOnInit = function () {
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
    };
    TestOrderListComponent = __decorate([
        core_1.Component({
            template: "<p-orderList [value]=\"cars\">\n  <ng-template let-car pTemplate=\"item\">\n      <div class=\"ui-helper-clearfix\">\n          <img src=\"assets/showcase/images/demo/car/{{car.brand}}.png\" style=\"display:inline-block;margin:2px 0 2px 2px\" width=\"48\">\n          <div style=\"font-size:14px;float:right;margin:15px 5px 0 0\">{{car.brand}} - {{car.year}} - {{car.color}}</div>\n      </div>\n  </ng-template>\n</p-orderList>"
        })
    ], TestOrderListComponent);
    return TestOrderListComponent;
}());
describe('OrderList', function () {
    var orderlist;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule,
            ],
            declarations: [
                orderlist_1.OrderList,
                button_1.Button,
                TestOrderListComponent
            ],
        });
        fixture = testing_1.TestBed.createComponent(TestOrderListComponent);
        orderlist = fixture.debugElement.children[0].componentInstance;
    });
    it('should created by default', function () {
        fixture.detectChanges();
        var orderListEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        var controlEls = fixture.debugElement.query(platform_browser_1.By.css('.ui-orderlist-controls'));
        var containerEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-orderlist-list-container'));
        var contentEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-widget-content'));
        expect(controlEls).toBeTruthy();
        expect(orderListEl).toBeTruthy();
        expect(containerEl).toBeTruthy();
        expect(contentEl).toBeTruthy();
    });
    it('should change listStyle', function () {
        orderlist.listStyle = { 'primeng': 'rocks!' };
        fixture.detectChanges();
        var contentEl = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        expect(contentEl.nativeElement.style.primeng).toEqual("rocks!");
    });
    it('should change header', function () {
        orderlist.header = "Primeng ROCKS!";
        fixture.detectChanges();
        var headerEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-orderlist-caption'));
        expect(headerEl).toBeTruthy();
        expect(headerEl.nativeElement.textContent).toEqual("Primeng ROCKS!");
    });
    it('should show filter input', function () {
        orderlist.filterBy = "brand";
        orderlist.filterPlaceholder = "Primeng ROCKS!";
        fixture.detectChanges();
        var filterInputEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-inputtext'));
        expect(filterInputEl).toBeTruthy();
        expect(filterInputEl.nativeElement.placeholder).toEqual("Primeng ROCKS!");
    });
    it('should add droppoints when dragdrop is enabled', function () {
        orderlist.dragdrop = true;
        fixture.detectChanges();
        var dragdropEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-orderlist-droppoint'));
        expect(dragdropEl).toBeTruthy();
    });
    it('should show items', function () {
        fixture.detectChanges();
        var itemListEl = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        expect(itemListEl).toBeTruthy();
        expect(orderlist.itemTouched).toEqual(undefined);
        expect(itemListEl.children.length).toEqual(10);
    });
    it('should have selections by default', function () {
        orderlist.selection = [{ "brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh" }];
        fixture.detectChanges();
        var itemListEl = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        var bmwEl = itemListEl.queryAll(platform_browser_1.By.css('.ui-orderlist-item'))[3];
        fixture.detectChanges();
        expect(orderlist.selection.length).toEqual(1);
        expect(orderlist.selection[0].brand).toEqual("BMW");
    });
    it('should call onItem click and select a item', function () {
        var onItemClickSpy = spyOn(orderlist, 'onItemClick').and.callThrough();
        var onItemTouchEndSpy = spyOn(orderlist, 'onItemTouchEnd').and.callThrough();
        fixture.detectChanges();
        var itemListEl = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        var bmwEl = itemListEl.queryAll(platform_browser_1.By.css('.ui-orderlist-item'))[3];
        bmwEl.nativeElement.dispatchEvent(new Event('touchend'));
        fixture.detectChanges();
        expect(orderlist.itemTouched).toEqual(true);
        bmwEl.nativeElement.click();
        fixture.detectChanges();
        expect(onItemClickSpy).toHaveBeenCalled();
        expect(onItemTouchEndSpy).toHaveBeenCalled();
        expect(orderlist.itemTouched).toEqual(false);
        expect(orderlist.selection.length).toEqual(1);
        expect(orderlist.selection[0].brand).toEqual("BMW");
        expect(bmwEl.nativeElement.className).toContain('ui-state-highlight');
    });
    it('should call onItem click and unselect a item', function () {
        var onItemClickSpy = spyOn(orderlist, 'onItemClick').and.callThrough();
        fixture.detectChanges();
        var itemListEl = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        var bmwEl = itemListEl.queryAll(platform_browser_1.By.css('.ui-orderlist-item'))[3];
        bmwEl.nativeElement.click();
        fixture.detectChanges();
        var ctrlClickEvent = { 'ctrlKey': true };
        orderlist.onItemClick(ctrlClickEvent, orderlist.selection[0], 3);
        fixture.detectChanges();
        expect(onItemClickSpy).toHaveBeenCalledTimes(2);
        expect(orderlist.selection.length).toEqual(0);
        expect(bmwEl.nativeElement.className).not.toContain('ui-state-highlight');
    });
    it('should call onItem click and select a item with metaKeySelection false', function () {
        orderlist.metaKeySelection = false;
        var onItemClickSpy = spyOn(orderlist, 'onItemClick').and.callThrough();
        fixture.detectChanges();
        var itemListEl = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        var bmwEl = itemListEl.queryAll(platform_browser_1.By.css('.ui-orderlist-item'))[3];
        bmwEl.nativeElement.click();
        fixture.detectChanges();
        expect(onItemClickSpy).toHaveBeenCalled();
        expect(orderlist.selection.length).toEqual(1);
        expect(orderlist.selection[0].brand).toEqual("BMW");
        expect(bmwEl.nativeElement.className).toContain('ui-state-highlight');
    });
    it('should call onItem click and unselect a item with metaKeySelection', function () {
        orderlist.metaKeySelection = false;
        var onItemClickSpy = spyOn(orderlist, 'onItemClick').and.callThrough();
        fixture.detectChanges();
        var itemListEl = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        var bmwEl = itemListEl.queryAll(platform_browser_1.By.css('.ui-orderlist-item'))[3];
        bmwEl.nativeElement.click();
        fixture.detectChanges();
        var ctrlClickEvent = { 'ctrlKey': true };
        orderlist.onItemClick(ctrlClickEvent, orderlist.selection[0], 3);
        fixture.detectChanges();
        expect(onItemClickSpy).toHaveBeenCalledTimes(2);
        expect(orderlist.selection.length).toEqual(0);
        expect(bmwEl.nativeElement.className).not.toContain('ui-state-highlight');
    });
    it('should call moveUp', function () {
        var moveUpSpy = spyOn(orderlist, 'moveUp').and.callThrough();
        fixture.detectChanges();
        var itemListEl = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        var bmwEl = itemListEl.queryAll(platform_browser_1.By.css('.ui-orderlist-item'))[3];
        var buttonsEl = fixture.debugElement.queryAll(platform_browser_1.By.css('button'));
        var moveUpButtonEl = buttonsEl[0];
        bmwEl.nativeElement.click();
        moveUpButtonEl.nativeElement.click();
        fixture.detectChanges();
        expect(moveUpSpy).toHaveBeenCalled();
        expect(orderlist.selection.length).toEqual(1);
        expect(orderlist.selection[0].brand).toEqual("BMW");
        expect(bmwEl.nativeElement.className).toContain('ui-state-highlight');
        expect(itemListEl.queryAll(platform_browser_1.By.css('.ui-orderlist-item'))[3].context.$implicit.brand).toEqual("Renault");
        expect(itemListEl.queryAll(platform_browser_1.By.css('.ui-orderlist-item'))[2].context.$implicit.brand).toEqual("BMW");
    });
    it('should call moveDown', function () {
        var moveUpSpy = spyOn(orderlist, 'moveDown').and.callThrough();
        fixture.detectChanges();
        var itemListEl = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        var bmwEl = itemListEl.queryAll(platform_browser_1.By.css('.ui-orderlist-item'))[3];
        var buttonsEl = fixture.debugElement.queryAll(platform_browser_1.By.css('button'));
        var moveDownButtonEl = buttonsEl[2];
        bmwEl.nativeElement.click();
        moveDownButtonEl.nativeElement.click();
        fixture.detectChanges();
        expect(moveUpSpy).toHaveBeenCalled();
        expect(orderlist.selection.length).toEqual(1);
        expect(orderlist.selection[0].brand).toEqual("BMW");
        expect(bmwEl.nativeElement.className).toContain('ui-state-highlight');
        expect(itemListEl.queryAll(platform_browser_1.By.css('.ui-orderlist-item'))[3].context.$implicit.brand).toEqual("Mercedes");
        expect(itemListEl.queryAll(platform_browser_1.By.css('.ui-orderlist-item'))[4].context.$implicit.brand).toEqual("BMW");
    });
    it('should call MoveTop', function () {
        var moveTopSpy = spyOn(orderlist, 'moveTop').and.callThrough();
        fixture.detectChanges();
        var itemListEl = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        var bmwEl = itemListEl.queryAll(platform_browser_1.By.css('.ui-orderlist-item'))[3];
        var buttonsEl = fixture.debugElement.queryAll(platform_browser_1.By.css('button'));
        var moveTopButtonEl = buttonsEl[1];
        bmwEl.nativeElement.click();
        moveTopButtonEl.nativeElement.click();
        fixture.detectChanges();
        expect(moveTopSpy).toHaveBeenCalled();
        expect(orderlist.selection.length).toEqual(1);
        expect(orderlist.selection[0].brand).toEqual("BMW");
        expect(bmwEl.nativeElement.className).toContain('ui-state-highlight');
        expect(itemListEl.queryAll(platform_browser_1.By.css('.ui-orderlist-item'))[3].context.$implicit.brand).toEqual("Renault");
        expect(itemListEl.queryAll(platform_browser_1.By.css('.ui-orderlist-item'))[0].context.$implicit.brand).toEqual("BMW");
    });
    it('should call moveBottom', function () {
        var moveBottomSpy = spyOn(orderlist, 'moveBottom').and.callThrough();
        fixture.detectChanges();
        var itemListEl = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        var bmwEl = itemListEl.queryAll(platform_browser_1.By.css('.ui-orderlist-item'))[3];
        var buttonsEl = fixture.debugElement.queryAll(platform_browser_1.By.css('button'));
        var moveBottomButtonEl = buttonsEl[3];
        bmwEl.nativeElement.click();
        moveBottomButtonEl.nativeElement.click();
        fixture.detectChanges();
        expect(moveBottomSpy).toHaveBeenCalled();
        expect(orderlist.selection.length).toEqual(1);
        expect(orderlist.selection[0].brand).toEqual("BMW");
        expect(bmwEl.nativeElement.className).toContain('ui-state-highlight');
        expect(itemListEl.queryAll(platform_browser_1.By.css('.ui-orderlist-item'))[3].context.$implicit.brand).toEqual("Mercedes");
        expect(itemListEl.queryAll(platform_browser_1.By.css('.ui-orderlist-item'))[9].context.$implicit.brand).toEqual("BMW");
    });
    it('should show filter items by default', function () {
        orderlist.filterBy = "brand";
        orderlist.filterValue = "v";
        fixture.detectChanges();
        var filterEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        fixture.detectChanges();
        var itemsEl = fixture.debugElement.queryAll(platform_browser_1.By.css(".ui-orderlist-item"));
        expect(orderlist.visibleOptions.length).toEqual(2);
        expect(orderlist.visibleOptions[0].brand).toEqual("VW");
        expect(orderlist.visibleOptions[1].brand).toEqual("Volvo");
        for (var i = 0; i < itemsEl.length; i++) {
            if (i == 0 || i == 5)
                expect(itemsEl[i].nativeElement.style.display).toEqual("block");
            else
                expect(itemsEl[i].nativeElement.style.display).not.toEqual("block");
        }
    });
    it('should show filter items', function () {
        orderlist.filterBy = "brand";
        fixture.detectChanges();
        var filterEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        expect(filterEl).toBeTruthy();
        filterEl.nativeElement.value = "v";
        filterEl.nativeElement.dispatchEvent(new Event('keyup'));
        fixture.detectChanges();
        var itemsEl = fixture.debugElement.queryAll(platform_browser_1.By.css(".ui-orderlist-item"));
        expect(orderlist.visibleOptions.length).toEqual(2);
        expect(orderlist.visibleOptions[0].brand).toEqual("VW");
        expect(orderlist.visibleOptions[1].brand).toEqual("Volvo");
        for (var i = 0; i < itemsEl.length; i++) {
            if (i == 0 || i == 5)
                expect(itemsEl[i].nativeElement.style.display).toEqual("block");
            else
                expect(itemsEl[i].nativeElement.style.display).not.toEqual("block");
        }
    });
    it('should listen onReorder in moveUp', function () {
        var moveUpSpy = spyOn(orderlist, 'moveUp').and.callThrough();
        fixture.detectChanges();
        var data;
        orderlist.onReorder.subscribe(function (value) { return data = value; });
        var itemListEl = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        var bmwEl = itemListEl.queryAll(platform_browser_1.By.css('.ui-orderlist-item'))[3];
        var buttonsEl = fixture.debugElement.queryAll(platform_browser_1.By.css('button'));
        var moveUpButtonEl = buttonsEl[0];
        bmwEl.nativeElement.click();
        moveUpButtonEl.nativeElement.click();
        fixture.detectChanges();
        expect(data).toBeTruthy();
    });
    it('should listen onReorder in moveDown', function () {
        var moveUpSpy = spyOn(orderlist, 'moveDown').and.callThrough();
        fixture.detectChanges();
        var data;
        orderlist.onReorder.subscribe(function (value) { return data = value; });
        var itemListEl = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        var bmwEl = itemListEl.queryAll(platform_browser_1.By.css('.ui-orderlist-item'))[3];
        var buttonsEl = fixture.debugElement.queryAll(platform_browser_1.By.css('button'));
        var moveDownButtonEl = buttonsEl[2];
        bmwEl.nativeElement.click();
        moveDownButtonEl.nativeElement.click();
        fixture.detectChanges();
        expect(data).toBeTruthy();
    });
    it('should listen onReorder in MoveTop', function () {
        var moveTopSpy = spyOn(orderlist, 'moveTop').and.callThrough();
        fixture.detectChanges();
        var data;
        orderlist.onReorder.subscribe(function (value) { return data = value; });
        var itemListEl = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        var bmwEl = itemListEl.queryAll(platform_browser_1.By.css('.ui-orderlist-item'))[3];
        var buttonsEl = fixture.debugElement.queryAll(platform_browser_1.By.css('button'));
        var moveTopButtonEl = buttonsEl[1];
        bmwEl.nativeElement.click();
        moveTopButtonEl.nativeElement.click();
        fixture.detectChanges();
        expect(data).toBeTruthy();
    });
    it('should not onReorder first item to top', function () {
        fixture.detectChanges();
        var data;
        orderlist.onReorder.subscribe(function (value) { return data = value; });
        var itemListEl = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        var vwEl = itemListEl.queryAll(platform_browser_1.By.css('.ui-orderlist-item'))[0];
        var buttonsEl = fixture.debugElement.queryAll(platform_browser_1.By.css('button'));
        var moveTopButtonEl = buttonsEl[1];
        vwEl.nativeElement.click();
        moveTopButtonEl.nativeElement.click();
        fixture.detectChanges();
        expect(data).toBeTruthy();
        expect(orderlist.value).toBeTruthy();
    });
    it('should not onReorder first item to up', function () {
        fixture.detectChanges();
        var data;
        orderlist.onReorder.subscribe(function (value) { return data = value; });
        var itemListEl = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        var vwEl = itemListEl.queryAll(platform_browser_1.By.css('.ui-orderlist-item'))[0];
        var buttonsEl = fixture.debugElement.queryAll(platform_browser_1.By.css('button'));
        var moveTopButtonEl = buttonsEl[0];
        vwEl.nativeElement.click();
        moveTopButtonEl.nativeElement.click();
        fixture.detectChanges();
        expect(data).toBeTruthy();
        expect(orderlist.value).toBeTruthy();
    });
    it('should listen onReorder in moveBottom', function () {
        var moveBottomSpy = spyOn(orderlist, 'moveBottom').and.callThrough();
        fixture.detectChanges();
        var data;
        orderlist.onReorder.subscribe(function (value) { return data = value; });
        var itemListEl = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        var bmwEl = itemListEl.queryAll(platform_browser_1.By.css('.ui-orderlist-item'))[3];
        var buttonsEl = fixture.debugElement.queryAll(platform_browser_1.By.css('button'));
        var moveBottomButtonEl = buttonsEl[3];
        bmwEl.nativeElement.click();
        moveBottomButtonEl.nativeElement.click();
        fixture.detectChanges();
        expect(data).toBeTruthy();
    });
    it('should not onReorder first item to bottom', function () {
        fixture.detectChanges();
        var data;
        orderlist.onReorder.subscribe(function (value) { return data = value; });
        var itemListEl = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        var bmwEl = itemListEl.queryAll(platform_browser_1.By.css('.ui-orderlist-item'))[9];
        var buttonsEl = fixture.debugElement.queryAll(platform_browser_1.By.css('button'));
        var moveBottomButtonEl = buttonsEl[3];
        bmwEl.nativeElement.click();
        moveBottomButtonEl.nativeElement.click();
        fixture.detectChanges();
        expect(data).toBeTruthy();
        expect(orderlist.value).toBeTruthy();
    });
    it('should not onReorder first item to down', function () {
        fixture.detectChanges();
        var data;
        orderlist.onReorder.subscribe(function (value) { return data = value; });
        var itemListEl = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        var bmwEl = itemListEl.queryAll(platform_browser_1.By.css('.ui-orderlist-item'))[9];
        var buttonsEl = fixture.debugElement.queryAll(platform_browser_1.By.css('button'));
        var moveBottomButtonEl = buttonsEl[2];
        bmwEl.nativeElement.click();
        moveBottomButtonEl.nativeElement.click();
        fixture.detectChanges();
        expect(data).toBeTruthy();
        expect(orderlist.value).toBeTruthy();
    });
    it('should listen onSelectionChange in onItem', function () {
        fixture.detectChanges();
        var data;
        orderlist.onSelectionChange.subscribe(function (value) { return data = value; });
        var itemListEl = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        var bmwEl = itemListEl.queryAll(platform_browser_1.By.css('.ui-orderlist-item'))[3];
        bmwEl.nativeElement.click();
        fixture.detectChanges();
        expect(data).toBeTruthy();
        expect(data.value[0].brand).toEqual("BMW");
    });
    it('should listen onFilterEvent', function () {
        orderlist.filterBy = "brand";
        fixture.detectChanges();
        var data;
        orderlist.onFilterEvent.subscribe(function (value) { return data = value; });
        var filterEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        expect(filterEl).toBeTruthy();
        filterEl.nativeElement.value = "v";
        filterEl.nativeElement.dispatchEvent(new Event('keyup'));
        fixture.detectChanges();
        expect(data).toBeTruthy();
        expect(data.value.length).toEqual(2);
        expect(data.value[0].brand).toEqual("VW");
        expect(data.value[1].brand).toEqual("Volvo");
    });
    it('should select item with keyboard navigation', function () {
        var findNextItemSpy = spyOn(orderlist, "findNextItem").and.callThrough();
        var findPrevItemSpy = spyOn(orderlist, "findPrevItem").and.callThrough();
        fixture.detectChanges();
        var itemListEl = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        var bmwEl = itemListEl.queryAll(platform_browser_1.By.css('.ui-orderlist-item'))[3].nativeElement;
        var event = document.createEvent('CustomEvent');
        event.which = 40;
        event.initEvent('keydown');
        bmwEl.dispatchEvent(event);
        fixture.detectChanges();
        event.which = 38;
        bmwEl.dispatchEvent(event);
        fixture.detectChanges();
        event.which = 13;
        bmwEl.dispatchEvent(event);
        fixture.detectChanges();
        expect(orderlist.selection.length).toEqual(1);
        expect(orderlist.selection[0].brand).toEqual("BMW");
        expect(findNextItemSpy).toHaveBeenCalled();
        expect(findPrevItemSpy).toHaveBeenCalled();
        expect(bmwEl.className).toContain('ui-state-highlight');
    });
});
//# sourceMappingURL=orderlist.spec.js.map