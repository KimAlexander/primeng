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
var dropdown_1 = require("./dropdown");
var animations_1 = require("@angular/platform-browser/animations");
var forms_1 = require("../../../../node_modules/@angular/forms");
var core_1 = require("@angular/core");
var TestDropdownComponent = /** @class */ (function () {
    function TestDropdownComponent() {
        this.groupedCars = [
            {
                label: 'Germany', value: 'germany.png',
                items: [
                    { label: 'Audi', value: 'Audi' },
                    { label: 'BMW', value: 'BMW' },
                    { label: 'Mercedes', value: 'Mercedes' }
                ]
            },
            {
                label: 'USA', value: 'usa.png',
                items: [
                    { label: 'Cadillac', value: 'Cadillac' },
                    { label: 'Ford', value: 'Ford' },
                    { label: 'GMC', value: 'GMC' }
                ]
            },
            {
                label: 'Japan', value: 'japan.png',
                items: [
                    { label: 'Honda', value: 'Honda' },
                    { label: 'Mazda', value: 'Mazda' },
                    { label: 'Toyota', value: 'Toyota' }
                ]
            }
        ];
    }
    TestDropdownComponent = __decorate([
        core_1.Component({
            template: "\n\t\t<p-dropdown [options]=\"groupedCars\" placeholder=\"Select a Car\" [group]=\"true\">\n\t\t\t<ng-template let-group pTemplate=\"group\">\n\t\t\t\t<span>{{group.label}}</span>\n\t\t\t</ng-template>\n\t\t</p-dropdown>\n\t"
        })
    ], TestDropdownComponent);
    return TestDropdownComponent;
}());
describe('Dropdown', function () {
    var dropdown;
    var groupDropdown;
    var fixture;
    var groupFixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule,
                forms_1.FormsModule,
                scrolling_1.ScrollingModule
            ],
            declarations: [
                dropdown_1.Dropdown,
                dropdown_1.DropdownItem,
                TestDropdownComponent
            ]
        }).compileComponents();
        fixture = testing_1.TestBed.createComponent(dropdown_1.Dropdown);
        groupFixture = testing_1.TestBed.createComponent(TestDropdownComponent);
        groupDropdown = groupFixture.debugElement.children[0].componentInstance;
        dropdown = fixture.componentInstance;
    });
    it('should disabled', function () {
        dropdown.disabled = true;
        dropdown.editable = true;
        fixture.detectChanges();
        var containerEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-dropdown')).nativeElement;
        var hiddenEl = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-helper-hidden-accessible'))[0].children[0].nativeElement;
        var editableInputEl = fixture.debugElement.queryAll(platform_browser_1.By.css('input'))[1].nativeElement;
        expect(containerEl.className).toContain('ui-state-disabled');
        expect(hiddenEl.disabled).toEqual(true);
        expect(editableInputEl.disabled).toEqual(true);
    });
    it('should change dropdown icon', function () {
        dropdown.dropdownIcon = "Primeng";
        fixture.detectChanges();
        var dropdownSpanEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-dropdown-trigger-icon.ui-clickable')).nativeElement;
        expect(dropdownSpanEl.className).toContain("Primeng");
    });
    it('should change style and styleClass', function () {
        dropdown.styleClass = "Primeng";
        dropdown.style = { 'primeng': 'rocks' };
        fixture.detectChanges();
        var containerEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-dropdown'));
        expect(containerEl.nativeElement.className).toContain("Primeng");
        expect(containerEl.nativeElement.style.primeng).toEqual("rocks");
    });
    it('should change panelStyleClass', function () {
        dropdown.panelStyleClass = "Primeng";
        dropdown.options = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
        var container = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
        container.click();
        fixture.detectChanges();
        var dropdownPanel = fixture.debugElement.query(platform_browser_1.By.css('.ui-dropdown-panel'));
        expect(dropdownPanel).toBeTruthy();
        expect(dropdownPanel.nativeElement.className).toContain("Primeng");
    });
    it('should open when clicked', function () {
        dropdown.options = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
        fixture.detectChanges();
        var container = fixture.debugElement.query(platform_browser_1.By.css('.ui-dropdown')).nativeElement;
        container.click();
        fixture.detectChanges();
        var dropdownPanel = fixture.debugElement.query(platform_browser_1.By.css('.ui-dropdown-panel'));
        expect(container.className).toContain('ui-dropdown-open');
        expect(dropdownPanel).toBeTruthy();
    });
    it('should close', function () {
        dropdown.options = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
        fixture.detectChanges();
        var container = fixture.debugElement.query(platform_browser_1.By.css('.ui-dropdown')).nativeElement;
        container.click();
        fixture.detectChanges();
        container.click();
        fixture.detectChanges();
        var dropdownPanel = fixture.debugElement.query(platform_browser_1.By.css('.ui-dropdown-panel'));
        expect(container.className).not.toContain('ui-dropdown-open');
        expect(dropdownPanel).toBeFalsy();
    });
    it('should item selected', function () {
        dropdown.options = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
        fixture.detectChanges();
        var container = fixture.debugElement.query(platform_browser_1.By.css('.ui-dropdown')).nativeElement;
        container.click();
        fixture.detectChanges();
        var items = fixture.debugElement.query(platform_browser_1.By.css('.ui-dropdown-items'));
        items.children[2].children[0].nativeElement.click();
        fixture.detectChanges();
        expect(dropdown.selectedOption.name).toEqual('London');
        expect(items.children[2].children[0].nativeElement.className).toContain('ui-state-highlight');
    });
    it('should item clear', function () {
        dropdown.options = [
            { label: 'Select City', value: null },
            { label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } },
            { label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } },
            { label: 'London', value: { id: 3, name: 'London', code: 'LDN' } },
            { label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } },
            { label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } }
        ];
        dropdown.showClear = true;
        fixture.detectChanges();
        var container = fixture.debugElement.query(platform_browser_1.By.css('.ui-dropdown')).nativeElement;
        container.click();
        fixture.detectChanges();
        var items = fixture.debugElement.query(platform_browser_1.By.css('.ui-dropdown-items'));
        items.children[2].children[0].nativeElement.click();
        fixture.detectChanges();
        var itemCloseIcon = fixture.debugElement.query(platform_browser_1.By.css('.ui-dropdown-clear-icon'));
        itemCloseIcon.nativeElement.click();
        fixture.detectChanges();
        expect(dropdown.selectedOption).toEqual({ label: 'Select City', value: null });
        expect(items.children[2].nativeElement.className).not.toContain('ui-state-highlight');
    });
    it('should filtered', testing_1.async(function () {
        dropdown.options = [
            { label: 'New York', code: 'NY' },
            { label: 'Rome', code: 'RM' },
            { label: 'London', code: 'LDN' },
            { label: 'Istanbul', code: 'IST' },
            { label: 'Paris', code: 'PRS' }
        ];
        dropdown.filter = true;
        fixture.detectChanges();
        var container = fixture.debugElement.query(platform_browser_1.By.css('.ui-dropdown')).nativeElement;
        container.click();
        fixture.detectChanges();
        var filterDiv = fixture.debugElement.query(platform_browser_1.By.css('.ui-dropdown-filter-container'));
        expect(filterDiv).toBeTruthy();
        var filterInputEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-dropdown-filter'));
        filterInputEl.nativeElement.value = "n";
        filterInputEl.nativeElement.dispatchEvent(new Event('keydown'));
        var event = { 'target': { 'value': 'n' } };
        dropdown.onFilter(event);
        fixture.detectChanges();
        var items = fixture.debugElement.query(platform_browser_1.By.css('.ui-dropdown-items'));
        expect(items.nativeElement.children.length).toEqual(3);
    }));
    it('should filtered and display not found warning', testing_1.async(function () {
        dropdown.options = [
            { label: 'New York', code: 'NY' },
            { label: 'Rome', code: 'RM' },
            { label: 'London', code: 'LDN' },
            { label: 'Istanbul', code: 'IST' },
            { label: 'Paris', code: 'PRS' }
        ];
        dropdown.filter = true;
        fixture.detectChanges();
        var container = fixture.debugElement.query(platform_browser_1.By.css('.ui-dropdown')).nativeElement;
        container.click();
        fixture.detectChanges();
        var filterDiv = fixture.debugElement.query(platform_browser_1.By.css('.ui-dropdown-filter-container'));
        expect(filterDiv).toBeTruthy();
        var filterInputEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-dropdown-filter'));
        filterInputEl.nativeElement.value = "primeng";
        filterInputEl.nativeElement.dispatchEvent(new Event('keydown'));
        var event = { 'target': { 'value': 'primeng' } };
        dropdown.onFilter(event);
        fixture.detectChanges();
        var items = fixture.debugElement.query(platform_browser_1.By.css('.ui-dropdown-items'));
        var emptyMesage = items.children[0];
        expect(items.nativeElement.children.length).toEqual(1);
        expect(emptyMesage).toBeTruthy();
        expect(emptyMesage.nativeElement.textContent).toEqual("No results found");
    }));
    it('should open with down and altkey', function () {
        dropdown.options = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
        dropdown.appendTo = 'body';
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        var keydownEvent = document.createEvent('CustomEvent');
        keydownEvent.which = 40;
        keydownEvent.initEvent('keydown', true, true);
        keydownEvent.altKey = true;
        inputEl.dispatchEvent(new Event("focus"));
        inputEl.dispatchEvent(keydownEvent);
        inputEl.dispatchEvent(new Event("blur"));
        fixture.detectChanges();
        var dropdownPanel = fixture.debugElement.query(platform_browser_1.By.css('.ui-dropdown-panel'));
        expect(dropdownPanel).toBeTruthy();
        expect(dropdown.overlayVisible).toBeTruthy();
    });
    it('should open with space key and close with esc key', function () {
        dropdown.options = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
        dropdown.appendTo = 'body';
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        var keydownEvent = document.createEvent('CustomEvent');
        keydownEvent.which = 32;
        keydownEvent.initEvent('keydown', true, true);
        keydownEvent.altKey = true;
        inputEl.dispatchEvent(keydownEvent);
        fixture.detectChanges();
        var dropdownPanel = fixture.debugElement.query(platform_browser_1.By.css('.ui-dropdown-panel'));
        expect(dropdownPanel).toBeTruthy();
        expect(dropdown.overlayVisible).toBeTruthy();
        keydownEvent.which = 27;
        inputEl.dispatchEvent(keydownEvent);
        fixture.detectChanges();
        expect(dropdown.overlayVisible).toBeFalsy();
    });
    it('should select with down key', function () {
        dropdown.options = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
        dropdown.appendTo = document.body;
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        var keydownEvent = document.createEvent('CustomEvent');
        keydownEvent.which = 40;
        keydownEvent.initEvent('keydown', true, true);
        keydownEvent.altKey = true;
        inputEl.dispatchEvent(keydownEvent);
        fixture.detectChanges();
        keydownEvent.altKey = false;
        inputEl.dispatchEvent(keydownEvent);
        fixture.detectChanges();
        expect(dropdown.selectedOption.name).toEqual("Rome");
    });
    it('should select with enter key and close the overlay', function () {
        dropdown.options = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
        dropdown.appendTo = document.body;
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        var keydownEvent = document.createEvent('CustomEvent');
        keydownEvent.which = 40;
        keydownEvent.initEvent('keydown', true, true);
        keydownEvent.altKey = true;
        inputEl.dispatchEvent(keydownEvent);
        fixture.detectChanges();
        keydownEvent.which = 13;
        inputEl.dispatchEvent(keydownEvent);
        fixture.detectChanges();
        expect(dropdown.overlayVisible).toBeFalsy();
    });
    it('should select with up key', function () {
        dropdown.options = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        var keydownEvent = document.createEvent('CustomEvent');
        keydownEvent.which = 38;
        keydownEvent.initEvent('keydown', true, true);
        inputEl.dispatchEvent(keydownEvent);
        fixture.detectChanges();
        expect(dropdown.selectedOption.name).toEqual("Paris");
    });
    it('should select with filter', function () {
        dropdown.options = [
            { label: 'New York', value: 'NY' },
            { label: 'Rome', value: 'RM' },
            { label: 'London', value: 'LDN' },
            { label: 'Istanbul', value: 'IST' },
            { label: 'Paris', value: 'PRS' }
        ];
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        var keydownEvent = document.createEvent('CustomEvent');
        keydownEvent.which = 40;
        keydownEvent.altKey = true;
        keydownEvent.initEvent('keydown', true, true);
        inputEl.dispatchEvent(keydownEvent);
        fixture.detectChanges();
        keydownEvent.which = 76;
        keydownEvent.keyCode = 76;
        inputEl.dispatchEvent(keydownEvent);
        fixture.detectChanges();
        expect(dropdown.selectedOption.label).toEqual("London");
    });
    it('should groupSelect with down key', function () {
        groupFixture.detectChanges();
        var inputEl = groupFixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        var keydownEvent = document.createEvent('CustomEvent');
        keydownEvent.which = 40;
        keydownEvent.initEvent('keydown', true, true);
        inputEl.dispatchEvent(keydownEvent);
        groupFixture.detectChanges();
        expect(groupDropdown.selectedOption.label).toEqual("Audi");
        inputEl.dispatchEvent(keydownEvent);
        groupFixture.detectChanges();
        expect(groupDropdown.selectedOption.label).toEqual("BMW");
        inputEl.dispatchEvent(keydownEvent);
        inputEl.dispatchEvent(keydownEvent);
        groupFixture.detectChanges();
        expect(groupDropdown.selectedOption.label).toEqual("Cadillac");
    });
    it('should groupSelect with up key', function () {
        groupFixture.detectChanges();
        var inputEl = groupFixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        var keydownEvent = document.createEvent('CustomEvent');
        keydownEvent.which = 40;
        keydownEvent.initEvent('keydown', true, true);
        inputEl.dispatchEvent(keydownEvent);
        inputEl.dispatchEvent(keydownEvent);
        inputEl.dispatchEvent(keydownEvent);
        inputEl.dispatchEvent(keydownEvent);
        groupFixture.detectChanges();
        expect(groupDropdown.selectedOption.label).toEqual("Cadillac");
        keydownEvent.which = 38;
        inputEl.dispatchEvent(keydownEvent);
        groupFixture.detectChanges();
        expect(groupDropdown.selectedOption.label).toEqual("Mercedes");
        inputEl.dispatchEvent(keydownEvent);
        groupFixture.detectChanges();
        expect(groupDropdown.selectedOption.label).toEqual("BMW");
    });
    it('should groupSelect with filter', function () {
        groupFixture.detectChanges();
        var inputEl = groupFixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        var keydownEvent = document.createEvent('CustomEvent');
        keydownEvent.which = 40;
        keydownEvent.altKey = true;
        keydownEvent.initEvent('keydown', true, true);
        inputEl.dispatchEvent(keydownEvent);
        groupFixture.detectChanges();
        keydownEvent.which = 77;
        keydownEvent.keyCode = 77;
        keydownEvent.altKey = false;
        inputEl.dispatchEvent(keydownEvent);
        expect(groupDropdown.selectedOption.label).toEqual("Mercedes");
    });
});
//# sourceMappingURL=dropdown.spec.js.map