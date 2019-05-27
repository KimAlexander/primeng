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
var picklist_1 = require("./picklist");
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("@angular/core");
var button_1 = require("../button/button");
var TestPickListComponent = /** @class */ (function () {
    function TestPickListComponent() {
    }
    TestPickListComponent.prototype.ngOnInit = function () {
        this.sourceCars = [
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
        this.targetCars = [];
    };
    TestPickListComponent = __decorate([
        core_1.Component({
            template: "<p-pickList [source]=\"sourceCars\" [target]=\"targetCars\">\n    <ng-template let-car pTemplate=\"item\">\n        <div class=\"ui-helper-clearfix\">\n            <img src=\"assets/showcase/images/demo/car/{{car.brand}}.png\" style=\"display:inline-block;margin:2px 0 2px 2px\" width=\"48\">\n            <div style=\"font-size:14px;float:right;margin:15px 5px 0 0\">{{car.brand}} - {{car.year}} - {{car.color}}</div>\n        </div>\n    </ng-template>\n</p-pickList>"
        })
    ], TestPickListComponent);
    return TestPickListComponent;
}());
describe('PickList', function () {
    var picklist;
    var fixture;
    var testComponent;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                picklist_1.PickList,
                button_1.Button,
                TestPickListComponent
            ]
        });
        fixture = testing_1.TestBed.createComponent(TestPickListComponent);
        testComponent = fixture.componentInstance;
        picklist = fixture.debugElement.children[0].componentInstance;
    });
    it('should created by default', function () {
        fixture.detectChanges();
        var picklistEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        var controlEls = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-picklist-buttons'));
        var wraperEl = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-picklist-listwrapper'));
        var contentEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-widget-content'));
        expect(controlEls.length).toEqual(3);
        expect(picklistEl).toBeTruthy();
        expect(wraperEl.length).toEqual(2);
        expect(contentEl).toBeTruthy();
    });
    it('should change style and styleClass', function () {
        picklist.style = { 'primeng': 'rocks!' };
        picklist.styleClass = "Primeng ROCKS!";
        fixture.detectChanges();
        var picklistEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        expect(picklistEl.nativeElement.className).toContain("Primeng ROCKS!");
        expect(picklistEl.nativeElement.style.primeng).toEqual("rocks!");
    });
    it('should show sourceHeader and targetHeader', function () {
        fixture.detectChanges();
        picklist.sourceHeader = "Primeng";
        picklist.targetHeader = "ROCKS!";
        fixture.detectChanges();
        var headerEls = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-picklist-caption'));
        expect(headerEls).toBeTruthy();
        expect(headerEls.length).toEqual(2);
        expect(headerEls[0].nativeElement.textContent).toEqual("Primeng");
        expect(headerEls[1].nativeElement.textContent).toEqual("ROCKS!");
    });
    it('should responsive', function () {
        picklist.responsive = true;
        fixture.detectChanges();
        var headerEls = fixture.debugElement.query(platform_browser_1.By.css('div'));
        expect(headerEls.nativeElement.className).toContain("ui-picklist-responsive");
    });
    it('should show filter input', function () {
        picklist.filterBy = "brand";
        fixture.detectChanges();
        var filterContainers = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-picklist-filter-container'));
        expect(filterContainers.length).toEqual(2);
        expect(filterContainers[0]).toBeTruthy();
        expect(filterContainers[1]).toBeTruthy();
    });
    it('should filtered source', function () {
        picklist.filterBy = "brand";
        fixture.detectChanges();
        var sourceFilterEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        sourceFilterEl.nativeElement.value = "v";
        sourceFilterEl.nativeElement.dispatchEvent(new Event('keyup'));
        fixture.detectChanges();
        var sourceListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        expect(picklist.visibleOptionsSource.length).toEqual(2);
        expect(picklist.visibleOptionsSource[0].brand).toEqual("VW");
        expect(picklist.visibleOptionsSource[1].brand).toEqual("Volvo");
        for (var i = 0; i < sourceListItems.length; i++) {
            if (i == 0 || i == 5)
                expect(sourceListItems[i].nativeElement.style.display).toEqual("block");
            else
                expect(sourceListItems[i].nativeElement.style.display).not.toEqual("block");
        }
    });
    it('should filtered target', function () {
        picklist.filterBy = "brand";
        fixture.detectChanges();
        var controlAllRightButton = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-picklist-buttons-cell'))[1].queryAll(platform_browser_1.By.css('button'))[1];
        controlAllRightButton.nativeElement.click();
        fixture.detectChanges();
        var targetFilterEl = fixture.debugElement.queryAll(platform_browser_1.By.css('input'))[1];
        targetFilterEl.nativeElement.value = "v";
        targetFilterEl.nativeElement.dispatchEvent(new Event('keyup'));
        fixture.detectChanges();
        var targetListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-target-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        expect(picklist.visibleOptionsTarget.length).toEqual(2);
        expect(picklist.visibleOptionsTarget[0].brand).toEqual("VW");
        expect(picklist.visibleOptionsTarget[1].brand).toEqual("Volvo");
        for (var i = 0; i < targetListItems.length; i++) {
            if (i == 0 || i == 5)
                expect(targetListItems[i].nativeElement.style.display).toEqual("block");
            else
                expect(targetListItems[i].nativeElement.style.display).not.toEqual("block");
        }
    });
    it('should use input placeholders', function () {
        picklist.filterBy = "brand";
        picklist.sourceFilterPlaceholder = "Primeng";
        picklist.targetFilterPlaceholder = "ROCKS!";
        fixture.detectChanges();
        var headerEls = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-picklist-filter'));
        expect(headerEls.length).toEqual(2);
        expect(headerEls[0].nativeElement.placeholder).toEqual("Primeng");
        expect(headerEls[1].nativeElement.placeholder).toEqual("ROCKS!");
    });
    it('should not show filter input', function () {
        picklist.showSourceFilter = false;
        picklist.showTargetFilter = false;
        fixture.detectChanges();
        var headerEls = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-picklist-filter-container'));
        var inputEls = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-filter'));
        expect(headerEls.length).toEqual(0);
        expect(headerEls).toEqual([]);
        expect(inputEls).toBeFalsy();
    });
    it('should show items', function () {
        picklist.dragdrop = true;
        fixture.detectChanges();
        var sourceListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-droppoint'));
        var targetListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-target-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-droppoint'));
        expect(sourceListItems.length).toEqual(11);
        expect(targetListItems.length).toEqual(0);
    });
    it('should change sourceStyle and targetStyle', function () {
        picklist.sourceStyle = { 'primeng': 'rocks!' };
        picklist.targetStyle = { 'primeng': 'rocks!' };
        fixture.detectChanges();
        var headerEls = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-widget-content.ui-picklist-list'));
        expect(headerEls[0].nativeElement.style.primeng).toContain("rocks!");
        expect(headerEls[1].nativeElement.style.primeng).toContain("rocks!");
    });
    it('should not show controls', function () {
        picklist.showSourceControls = false;
        picklist.showTargetControls = false;
        fixture.detectChanges();
        var sourceControlsEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-controls'));
        var targetControlsEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-target-controls'));
        var listwrapperEls = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-picklist-listwrapper'));
        expect(sourceControlsEl).toBeFalsy();
        expect(targetControlsEl).toBeFalsy();
        expect(listwrapperEls[0].nativeElement.className).toContain("ui-picklist-listwrapper-nocontrols");
        expect(listwrapperEls[1].nativeElement.className).toContain("ui-picklist-listwrapper-nocontrols");
    });
    it('should disabled', function () {
        picklist.disabled = true;
        picklist.filterBy = "brand";
        fixture.detectChanges();
        var buttonsEls = fixture.debugElement.queryAll(platform_browser_1.By.css('button'));
        var inputEls = fixture.debugElement.queryAll(platform_browser_1.By.css('input'));
        var itemEls = fixture.debugElement.queryAll(platform_browser_1.By.css('li'));
        for (var _i = 0, buttonsEls_1 = buttonsEls; _i < buttonsEls_1.length; _i++) {
            var button = buttonsEls_1[_i];
            expect(button.nativeElement.disabled).toEqual(true);
        }
        for (var _a = 0, inputEls_1 = inputEls; _a < inputEls_1.length; _a++) {
            var input = inputEls_1[_a];
            expect(input.nativeElement.disabled).toEqual(true);
        }
        for (var _b = 0, itemEls_1 = itemEls; _b < itemEls_1.length; _b++) {
            var item = itemEls_1[_b];
            expect(item.nativeElement.className).toContain("ui-state-disabled");
        }
    });
    it('should select item', function () {
        fixture.detectChanges();
        var onItemClickSpy = spyOn(picklist, 'onItemClick').and.callThrough();
        var sourceListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        sourceListItems[0].nativeElement.click();
        fixture.detectChanges();
        expect(onItemClickSpy).toHaveBeenCalled();
        expect(sourceListItems[0].nativeElement.className).toContain("ui-state-highlight");
        expect(picklist.selectedItemsSource.length).toEqual(1);
        expect(picklist.selectedItemsSource[0].brand).toEqual("VW");
    });
    it('should not select item', function () {
        picklist.disabled = true;
        fixture.detectChanges();
        var onItemClickSpy = spyOn(picklist, 'onItemClick').and.callThrough();
        var sourceListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        sourceListItems[0].nativeElement.click();
        fixture.detectChanges();
        expect(onItemClickSpy).toHaveBeenCalled();
        expect(sourceListItems[0].nativeElement.className).not.toContain("ui-state-highlight");
        expect(picklist.selectedItemsSource.length).toEqual(0);
        expect(picklist.selectedItemsSource[0]).toBeUndefined();
    });
    it('should unselect item', function () {
        fixture.detectChanges();
        var onItemClickSpy = spyOn(picklist, 'onItemClick').and.callThrough();
        var sourceListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        sourceListItems[0].nativeElement.click();
        fixture.detectChanges();
        var event = { 'ctrlKey': true };
        var callback = new core_1.EventEmitter();
        picklist.onItemClick(event, picklist.source[0], picklist.selectedItemsSource, callback);
        fixture.detectChanges();
        expect(onItemClickSpy).toHaveBeenCalled();
        expect(sourceListItems[0].nativeElement.className).not.toContain("ui-state-highlight");
        expect(picklist.selectedItemsSource.length).toEqual(0);
    });
    it('should select item without metakey', function () {
        picklist.metaKeySelection = false;
        fixture.detectChanges();
        var onItemClickSpy = spyOn(picklist, 'onItemClick').and.callThrough();
        var sourceListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        sourceListItems[0].nativeElement.click();
        fixture.detectChanges();
        expect(onItemClickSpy).toHaveBeenCalled();
        expect(sourceListItems[0].nativeElement.className).toContain("ui-state-highlight");
        expect(picklist.selectedItemsSource.length).toEqual(1);
        expect(picklist.selectedItemsSource[0].brand).toEqual("VW");
    });
    it('should unselect item without metakey', function () {
        picklist.metaKeySelection = false;
        fixture.detectChanges();
        var onItemClickSpy = spyOn(picklist, 'onItemClick').and.callThrough();
        var sourceListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        sourceListItems[0].nativeElement.click();
        fixture.detectChanges();
        sourceListItems[0].nativeElement.click();
        fixture.detectChanges();
        expect(onItemClickSpy).toHaveBeenCalled();
        expect(sourceListItems[0].nativeElement.className).not.toContain("ui-state-highlight");
        expect(picklist.selectedItemsSource.length).toEqual(0);
    });
    it('should call moveUp', function () {
        fixture.detectChanges();
        var moveUpSpy = spyOn(picklist, 'moveUp').and.callThrough();
        var sourceListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        var sourceControlUpButton = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-controls')).queryAll(platform_browser_1.By.css('button'))[0];
        sourceListItems[3].nativeElement.click();
        fixture.detectChanges();
        sourceControlUpButton.nativeElement.click();
        fixture.detectChanges();
        var sourceListItemsAfterChange = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        expect(moveUpSpy).toHaveBeenCalled();
        expect(sourceListItemsAfterChange[2].nativeElement.className).toContain("ui-state-highlight");
        expect(sourceListItemsAfterChange[2].context.$implicit.brand).toEqual("BMW");
        expect(sourceListItemsAfterChange[3].context.$implicit.brand).toEqual("Renault");
    });
    it('should call moveUp and do nothing', function () {
        fixture.detectChanges();
        var moveUpSpy = spyOn(picklist, 'moveUp').and.callThrough();
        var sourceListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        var sourceControlUpButton = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-controls')).queryAll(platform_browser_1.By.css('button'))[0];
        sourceListItems[0].nativeElement.click();
        fixture.detectChanges();
        sourceControlUpButton.nativeElement.click();
        fixture.detectChanges();
        expect(moveUpSpy).toHaveBeenCalled();
        var callback = new core_1.EventEmitter();
        expect(picklist.moveBottom(picklist.source[0], picklist.source, picklist.selectedItemsSource, callback)).toBeUndefined();
    });
    it('should call moveDown', function () {
        fixture.detectChanges();
        var moveDownSpy = spyOn(picklist, 'moveDown').and.callThrough();
        var sourceListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        var sourceControlDownButton = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-controls')).queryAll(platform_browser_1.By.css('button'))[2];
        sourceListItems[3].nativeElement.click();
        fixture.detectChanges();
        sourceControlDownButton.nativeElement.click();
        fixture.detectChanges();
        var sourceListItemsAfterChange = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        expect(moveDownSpy).toHaveBeenCalled();
        expect(sourceListItemsAfterChange[4].nativeElement.className).toContain("ui-state-highlight");
        expect(sourceListItemsAfterChange[4].context.$implicit.brand).toEqual("BMW");
        expect(sourceListItemsAfterChange[3].context.$implicit.brand).toEqual("Mercedes");
    });
    it('should call moveDown and do nothing', function () {
        fixture.detectChanges();
        var moveDownSpy = spyOn(picklist, 'moveDown').and.callThrough();
        var sourceListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        var sourceControlDownButton = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-controls')).queryAll(platform_browser_1.By.css('button'))[2];
        sourceListItems[9].nativeElement.click();
        fixture.detectChanges();
        sourceControlDownButton.nativeElement.click();
        fixture.detectChanges();
        expect(moveDownSpy).toHaveBeenCalled();
        var callback = new core_1.EventEmitter();
        expect(picklist.moveDown(picklist.source[9], picklist.source, picklist.selectedItemsSource, callback)).toBeUndefined();
    });
    it('should call movetop', function () {
        fixture.detectChanges();
        var moveTopSpy = spyOn(picklist, 'moveTop').and.callThrough();
        var sourceListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        var sourceControlTopButton = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-controls')).queryAll(platform_browser_1.By.css('button'))[1];
        sourceListItems[3].nativeElement.click();
        fixture.detectChanges();
        sourceControlTopButton.nativeElement.click();
        fixture.detectChanges();
        var sourceListItemsAfterChange = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        expect(moveTopSpy).toHaveBeenCalled();
        expect(sourceListItemsAfterChange[0].nativeElement.className).toContain("ui-state-highlight");
        expect(sourceListItemsAfterChange[0].context.$implicit.brand).toEqual("BMW");
        expect(sourceListItemsAfterChange[3].context.$implicit.brand).toEqual("Renault");
    });
    it('should call movetop and do nothing', function () {
        fixture.detectChanges();
        var moveTopSpy = spyOn(picklist, 'moveTop').and.callThrough();
        var sourceListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        var sourceControlTopButton = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-controls')).queryAll(platform_browser_1.By.css('button'))[1];
        sourceListItems[0].nativeElement.click();
        fixture.detectChanges();
        sourceControlTopButton.nativeElement.click();
        fixture.detectChanges();
        expect(moveTopSpy).toHaveBeenCalled();
        var callback = new core_1.EventEmitter();
        expect(picklist.moveTop(picklist.source[0], picklist.source, picklist.selectedItemsSource, callback)).toBeUndefined();
    });
    it('should call moveBottom', function () {
        fixture.detectChanges();
        var moveBottomSpy = spyOn(picklist, 'moveBottom').and.callThrough();
        var sourceListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        var sourceControlBottomButton = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-controls')).queryAll(platform_browser_1.By.css('button'))[3];
        sourceListItems[3].nativeElement.click();
        fixture.detectChanges();
        sourceControlBottomButton.nativeElement.click();
        fixture.detectChanges();
        var sourceListItemsAfterChange = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        expect(moveBottomSpy).toHaveBeenCalled();
        expect(sourceListItemsAfterChange[9].nativeElement.className).toContain("ui-state-highlight");
        expect(sourceListItemsAfterChange[9].context.$implicit.brand).toEqual("BMW");
        expect(sourceListItemsAfterChange[3].context.$implicit.brand).toEqual("Mercedes");
    });
    it('should call moveBottom and do nothing', function () {
        fixture.detectChanges();
        var moveBottomSpy = spyOn(picklist, 'moveBottom').and.callThrough();
        var sourceListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        var sourceControlBottomButton = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-controls')).queryAll(platform_browser_1.By.css('button'))[3];
        sourceListItems[9].nativeElement.click();
        fixture.detectChanges();
        sourceControlBottomButton.nativeElement.click();
        fixture.detectChanges();
        expect(moveBottomSpy).toHaveBeenCalled();
        var callback = new core_1.EventEmitter();
        expect(picklist.moveBottom(picklist.source[9], picklist.source, picklist.selectedItemsSource, callback)).toBeUndefined();
    });
    it('should call moveRight', function () {
        fixture.detectChanges();
        var moveRightSpy = spyOn(picklist, 'moveRight').and.callThrough();
        var sourceListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        var controlRightButton = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-picklist-buttons-cell'))[1].queryAll(platform_browser_1.By.css('button'))[0];
        sourceListItems[3].nativeElement.click();
        fixture.detectChanges();
        controlRightButton.nativeElement.click();
        fixture.detectChanges();
        var sourceListItemsAfterChange = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        var targetListItemsAfterChange = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-target-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        expect(moveRightSpy).toHaveBeenCalled();
        expect(sourceListItemsAfterChange[3].context.$implicit.brand).toEqual("Mercedes");
        expect(targetListItemsAfterChange[0].context.$implicit.brand).toEqual("BMW");
        expect(targetListItemsAfterChange.length).toEqual(1);
        expect(picklist.target.length).toEqual(1);
        expect(picklist.target[0].brand).toEqual("BMW");
    });
    it('should call moveLeft', function () {
        fixture.detectChanges();
        var moveLeftSpy = spyOn(picklist, 'moveLeft').and.callThrough();
        var sourceListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        var controlRightButton = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-picklist-buttons-cell'))[1].queryAll(platform_browser_1.By.css('button'))[0];
        var controlLeftButton = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-picklist-buttons-cell'))[1].queryAll(platform_browser_1.By.css('button'))[2];
        sourceListItems[3].nativeElement.click();
        fixture.detectChanges();
        controlRightButton.nativeElement.click();
        fixture.detectChanges();
        var targetListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-target-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        targetListItems[0].nativeElement.click();
        fixture.detectChanges();
        controlLeftButton.nativeElement.click();
        fixture.detectChanges();
        var sourceListItemsAfterChange = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        var targetListItemsAfterChange = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-target-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        expect(moveLeftSpy).toHaveBeenCalled();
        expect(targetListItemsAfterChange.length).toEqual(0);
        expect(picklist.target.length).toEqual(0);
        expect(picklist.source.length).toEqual(10);
        expect(sourceListItemsAfterChange[9].context.$implicit.brand).toEqual("BMW");
    });
    it('should call moveAllRight', function () {
        fixture.detectChanges();
        var moveAllRightSpy = spyOn(picklist, 'moveAllRight').and.callThrough();
        var controlAllRightButton = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-picklist-buttons-cell'))[1].queryAll(platform_browser_1.By.css('button'))[1];
        fixture.detectChanges();
        controlAllRightButton.nativeElement.click();
        fixture.detectChanges();
        var sourceListItemsAfterChange = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        var targetListItemsAfterChange = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-target-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        expect(moveAllRightSpy).toHaveBeenCalled();
        expect(sourceListItemsAfterChange.length).toEqual(0);
        expect(targetListItemsAfterChange.length).toEqual(10);
        expect(picklist.target.length).toEqual(10);
        expect(picklist.source.length).toEqual(0);
    });
    it('should call moveAllLeft', function () {
        fixture.detectChanges();
        var moveAllLeftSpy = spyOn(picklist, 'moveAllLeft').and.callThrough();
        var controlAllRightButton = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-picklist-buttons-cell'))[1].queryAll(platform_browser_1.By.css('button'))[1];
        var controlAllLeftButton = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-picklist-buttons-cell'))[1].queryAll(platform_browser_1.By.css('button'))[3];
        fixture.detectChanges();
        controlAllRightButton.nativeElement.click();
        fixture.detectChanges();
        controlAllLeftButton.nativeElement.click();
        fixture.detectChanges();
        var sourceListItemsAfterChange = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        var targetListItemsAfterChange = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-target-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        expect(moveAllLeftSpy).toHaveBeenCalled();
        expect(targetListItemsAfterChange.length).toEqual(0);
        expect(sourceListItemsAfterChange.length).toEqual(10);
        expect(picklist.source.length).toEqual(10);
        expect(picklist.target.length).toEqual(0);
    });
    it('should listen onSourceSelect', function () {
        fixture.detectChanges();
        var data;
        picklist.onSourceSelect.subscribe(function (value) { return data = value; });
        var sourceListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        sourceListItems[0].nativeElement.click();
        fixture.detectChanges();
        expect(data).toBeTruthy();
        expect(data.items[0].brand).toEqual("VW");
    });
    it('should listen onTargetSelect', function () {
        fixture.detectChanges();
        var sourceListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        var controlRightButton = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-picklist-buttons-cell'))[1].queryAll(platform_browser_1.By.css('button'))[0];
        sourceListItems[0].nativeElement.click();
        fixture.detectChanges();
        controlRightButton.nativeElement.click();
        fixture.detectChanges();
        var data;
        picklist.onTargetSelect.subscribe(function (value) { return data = value; });
        var targetListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-target-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        targetListItems[0].nativeElement.click();
        fixture.detectChanges();
        expect(data).toBeTruthy();
        expect(data.items[0].brand).toEqual("VW");
    });
    it('should listen onSourceReorder', function () {
        fixture.detectChanges();
        var data;
        picklist.onSourceReorder.subscribe(function (value) { return data = value; });
        var sourceListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        var sourceControlUpButton = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-controls')).queryAll(platform_browser_1.By.css('button'))[0];
        sourceListItems[3].nativeElement.click();
        fixture.detectChanges();
        sourceControlUpButton.nativeElement.click();
        fixture.detectChanges();
        expect(data).toBeTruthy();
        expect(data.items[0].brand).toEqual("BMW");
    });
    it('should listen onTargetReorder', function () {
        fixture.detectChanges();
        var controlAllRightButton = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-picklist-buttons-cell'))[1].queryAll(platform_browser_1.By.css('button'))[1];
        controlAllRightButton.nativeElement.click();
        fixture.detectChanges();
        var data;
        picklist.onTargetReorder.subscribe(function (value) { return data = value; });
        var sourceListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-target-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        var sourceControlUpButton = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-target-controls')).queryAll(platform_browser_1.By.css('button'))[0];
        sourceListItems[3].nativeElement.click();
        fixture.detectChanges();
        sourceControlUpButton.nativeElement.click();
        fixture.detectChanges();
        expect(data).toBeTruthy();
        expect(data.items[0].brand).toEqual("BMW");
    });
    it('should listen onMoveToTarget', function () {
        fixture.detectChanges();
        var data;
        picklist.onMoveToTarget.subscribe(function (value) { return data = value; });
        var sourceListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        var controlRightButton = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-picklist-buttons-cell'))[1].queryAll(platform_browser_1.By.css('button'))[0];
        sourceListItems[3].nativeElement.click();
        fixture.detectChanges();
        controlRightButton.nativeElement.click();
        fixture.detectChanges();
        expect(data).toBeTruthy();
        expect(data.items[0].brand).toEqual("BMW");
    });
    it('should listen onMoveToSource', function () {
        fixture.detectChanges();
        var data;
        picklist.onMoveToTarget.subscribe(function (value) { return data = value; });
        var sourceListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        var controlRightButton = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-picklist-buttons-cell'))[1].queryAll(platform_browser_1.By.css('button'))[0];
        var controlLeftButton = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-picklist-buttons-cell'))[1].queryAll(platform_browser_1.By.css('button'))[2];
        sourceListItems[3].nativeElement.click();
        fixture.detectChanges();
        controlRightButton.nativeElement.click();
        fixture.detectChanges();
        var targetListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-target-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        targetListItems[0].nativeElement.click();
        fixture.detectChanges();
        controlLeftButton.nativeElement.click();
        fixture.detectChanges();
        expect(data).toBeTruthy();
        expect(data.items[0].brand).toEqual("BMW");
    });
    it('should listen onMoveAllToTarget', function () {
        fixture.detectChanges();
        var data;
        picklist.onMoveAllToTarget.subscribe(function (value) { return data = value; });
        var controlAllRightButton = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-picklist-buttons-cell'))[1].queryAll(platform_browser_1.By.css('button'))[1];
        fixture.detectChanges();
        controlAllRightButton.nativeElement.click();
        fixture.detectChanges();
        expect(data).toBeTruthy();
        expect(data.items.length).toEqual(10);
    });
    it('should listen onMoveAllToSource', function () {
        fixture.detectChanges();
        var data;
        picklist.onMoveAllToSource.subscribe(function (value) { return data = value; });
        var controlAllRightButton = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-picklist-buttons-cell'))[1].queryAll(platform_browser_1.By.css('button'))[1];
        var controlAllLeftButton = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-picklist-buttons-cell'))[1].queryAll(platform_browser_1.By.css('button'))[3];
        fixture.detectChanges();
        controlAllRightButton.nativeElement.click();
        fixture.detectChanges();
        controlAllLeftButton.nativeElement.click();
        fixture.detectChanges();
        expect(data).toBeTruthy();
        expect(data.items.length).toEqual(10);
    });
    it('should send item to right and after send item to left', function () {
        fixture.detectChanges();
        var onSourceItemDblClickSpy = spyOn(picklist, 'onSourceItemDblClick').and.callThrough();
        var onTargetItemDblClickSpy = spyOn(picklist, 'onTargetItemDblClick').and.callThrough();
        var sourceListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        sourceListItems[0].nativeElement.click();
        sourceListItems[0].nativeElement.dispatchEvent(new Event('dblclick'));
        fixture.detectChanges();
        var targetListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-target-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        expect(picklist.target.length).toEqual(1);
        expect(picklist.source.length).toEqual(9);
        targetListItems[0].nativeElement.click();
        targetListItems[0].nativeElement.dispatchEvent(new Event('dblclick'));
        fixture.detectChanges();
        expect(picklist.target.length).toEqual(0);
        expect(picklist.source.length).toEqual(10);
        expect(onSourceItemDblClickSpy).toHaveBeenCalled();
        expect(onTargetItemDblClickSpy).toHaveBeenCalled();
    });
    it('should not send item to right', function () {
        picklist.disabled = true;
        fixture.detectChanges();
        var sourceListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        sourceListItems[0].nativeElement.click();
        sourceListItems[0].nativeElement.dispatchEvent(new Event('dblclick'));
        fixture.detectChanges();
        expect(picklist.target.length).toEqual(0);
        expect(picklist.source.length).toEqual(10);
    });
    it('should not send item to left', function () {
        fixture.detectChanges();
        var onItemTouchEndSpy = spyOn(picklist, 'onItemTouchEnd').and.callThrough();
        var sourceListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        sourceListItems[0].nativeElement.click();
        sourceListItems[0].nativeElement.dispatchEvent(new Event('dblclick'));
        fixture.detectChanges();
        picklist.disabled = true;
        fixture.detectChanges();
        var targetListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-target-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        targetListItems[0].nativeElement.click();
        targetListItems[0].nativeElement.dispatchEvent(new Event('dblclick'));
        fixture.detectChanges();
        expect(picklist.target.length).toEqual(1);
        expect(picklist.source.length).toEqual(9);
    });
    it('should call onItemTouchEnd', function () {
        fixture.detectChanges();
        var onItemTouchEndSpy = spyOn(picklist, 'onItemTouchEnd').and.callThrough();
        var sourceListItems = fixture.debugElement.query(platform_browser_1.By.css('.ui-picklist-source-wrapper')).queryAll(platform_browser_1.By.css('.ui-picklist-item'));
        sourceListItems[0].nativeElement.dispatchEvent(new Event('touchend'));
        fixture.detectChanges();
        expect(picklist.itemTouched).toEqual(true);
        expect(onItemTouchEndSpy).toHaveBeenCalled();
        picklist.disabled = true;
        picklist.itemTouched = false;
        fixture.detectChanges();
        sourceListItems[0].nativeElement.dispatchEvent(new Event('touchend'));
        expect(picklist.itemTouched).toEqual(false);
        expect(onItemTouchEndSpy).toHaveBeenCalled();
    });
    it('should move items(source) with dragging with reorder', function () {
        fixture.detectChanges();
        var dragEvent = new DragEvent('drag');
        picklist.dragging = true;
        picklist.fromListType = -1;
        fixture.detectChanges();
        picklist.onDragOver(dragEvent, 0, -1);
        picklist.onDrop(dragEvent, 2, -1);
        picklist.onDragEnd(dragEvent);
        fixture.detectChanges();
        expect(picklist.source[0].brand).toEqual("Audi");
        expect(picklist.source[1].brand).toEqual("VW");
    });
    it('should move items(target) with dragging', function () {
        fixture.detectChanges();
        var controlAllRightButton = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-picklist-buttons-cell'))[1].queryAll(platform_browser_1.By.css('button'))[1];
        controlAllRightButton.nativeElement.click();
        fixture.detectChanges();
        var dragEvent = new DragEvent('drag');
        picklist.dragging = true;
        picklist.fromListType = 1;
        fixture.detectChanges();
        picklist.onDragOver(dragEvent, 0, 1);
        picklist.onDrop(dragEvent, 2, 1);
        picklist.onDragEnd(dragEvent);
        fixture.detectChanges();
        expect(picklist.target[0].brand).toEqual("Audi");
        expect(picklist.target[1].brand).toEqual("VW");
    });
    it('should move item to right with dragging', function () {
        fixture.detectChanges();
        var dragEvent = new DragEvent('drag');
        picklist.dragging = true;
        picklist.fromListType = -1;
        fixture.detectChanges();
        picklist.onDragOver(dragEvent, 0, -1);
        picklist.onDragLeave(dragEvent, 1);
        picklist.onListDrop(dragEvent, 1);
        picklist.onDragEnd(dragEvent);
        fixture.detectChanges();
        expect(picklist.source.length).toEqual(9);
        expect(picklist.target.length).toEqual(1);
        expect(picklist.target[0].brand).toEqual("VW");
    });
    it('should move item to left with dragging', function () {
        fixture.detectChanges();
        var controlAllRightButton = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-picklist-buttons-cell'))[1].queryAll(platform_browser_1.By.css('button'))[1];
        controlAllRightButton.nativeElement.click();
        fixture.detectChanges();
        var dragEvent = new DragEvent('drag');
        picklist.dragging = true;
        picklist.fromListType = 1;
        fixture.detectChanges();
        picklist.onDragOver(dragEvent, 0, 1);
        picklist.onDragLeave(dragEvent, -1);
        picklist.onListDrop(dragEvent, -1);
        picklist.onDragEnd(dragEvent);
        fixture.detectChanges();
        expect(picklist.target.length).toEqual(9);
        expect(picklist.source.length).toEqual(1);
        expect(picklist.source[0].brand).toEqual("VW");
    });
});
//# sourceMappingURL=picklist.spec.js.map