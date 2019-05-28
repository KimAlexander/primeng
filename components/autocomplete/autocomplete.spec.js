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
var autocomplete_1 = require("./autocomplete");
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var button_1 = require("../button/button");
var testing_2 = require("@angular/platform-browser-dynamic/testing");
var TestAutocompleteComponent = /** @class */ (function () {
    function TestAutocompleteComponent() {
        this.brands = ['Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Jaguar', 'Mercedes', 'Renault', 'Volvo', 'VW'];
        this.cars = [{ 'brand': 'Volvo' }, { 'brand': 'VW' }];
    }
    TestAutocompleteComponent.prototype.filterBrands = function (event) {
        this.filteredBrands = [];
        for (var i = 0; i < this.brands.length; i++) {
            var brand = this.brands[i];
            if (brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredBrands.push(brand);
            }
        }
    };
    TestAutocompleteComponent.prototype.filterBrandsWithField = function (event) {
        this.filteredCars = [];
        for (var i = 0; i < this.cars.length; i++) {
            var car = this.cars[i];
            if (car.brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredCars.push(car);
            }
        }
    };
    TestAutocompleteComponent.prototype.deleteLastEl = function () {
        this.brands.pop();
    };
    TestAutocompleteComponent = __decorate([
        core_1.Component({
            template: "<p-autoComplete [(ngModel)]=\"brand\" [suggestions]=\"filteredBrands\" (completeMethod)=\"filterBrands($event)\"></p-autoComplete>\n  <a (click)=\"deleteLastEl()\"></a>\n  <p-autoComplete [(ngModel)]=\"car\" [suggestions]=\"filteredCars\" (completeMethod)=\"filterBrandsWithField($event)\"></p-autoComplete>\n  "
        })
    ], TestAutocompleteComponent);
    return TestAutocompleteComponent;
}());
describe('AutoComplete', function () {
    var autocomplete;
    var autocomplete2;
    var testComponent;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule,
                forms_1.FormsModule,
                testing_2.BrowserDynamicTestingModule,
                button_1.ButtonModule,
            ],
            declarations: [
                autocomplete_1.AutoComplete,
                TestAutocompleteComponent
            ]
        });
        fixture = testing_1.TestBed.createComponent(TestAutocompleteComponent);
        autocomplete = fixture.debugElement.children[0].componentInstance;
        autocomplete2 = fixture.debugElement.children[2].componentInstance;
        testComponent = fixture.debugElement.componentInstance;
    });
    it('should disabled', function () {
        fixture.detectChanges();
        autocomplete.disabled = true;
        fixture.detectChanges();
        var inputDefaultEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        expect(inputDefaultEl.disabled).toEqual(true);
        fixture.detectChanges();
        autocomplete.multiple = true;
        autocomplete.disabled = true;
        fixture.detectChanges();
        var inputMultipleEl = fixture.debugElement.query(platform_browser_1.By.css('ul')).query(platform_browser_1.By.css('input'));
        var multiContainer = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        expect(inputMultipleEl.properties.disabled).toEqual(true);
        expect(multiContainer.nativeElement.className).toContain('ui-state-disabled');
    });
    it('should display dropdown icon', function () {
        autocomplete.dropdown = true;
        fixture.detectChanges();
        var autocompleteEl = fixture.debugElement.query(platform_browser_1.By.css('span')).nativeElement;
        var dropdownIconEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-autocomplete-dropdown')).nativeElement;
        expect(autocompleteEl.className).toContain('ui-autocomplete-dd');
        expect(dropdownIconEl).toBeTruthy();
    });
    it('should change style and styleClass', function () {
        autocomplete.style = { 'primeng': 'rocks!' };
        autocomplete.styleClass = "Primeng Rocks!";
        autocomplete.inputStyle = { 'primeng': 'rocks!' };
        autocomplete.inputStyleClass = "Primeng Rocks!";
        fixture.detectChanges();
        var autocompleteEl = fixture.debugElement.query(platform_browser_1.By.css('span')).nativeElement;
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        expect(autocompleteEl.className).toContain('Primeng Rocks!');
        expect(inputEl.className).toContain('Primeng Rocks!');
        expect(autocompleteEl.style.primeng).toContain('rocks!');
        expect(inputEl.style.primeng).toContain('rocks!');
        autocomplete.multiple = true;
        fixture.detectChanges();
        var inputMultipleEl = fixture.debugElement.query(platform_browser_1.By.css('ul')).query(platform_browser_1.By.css('input')).nativeElement;
        expect(inputMultipleEl.className).toContain('Primeng Rocks!');
        expect(inputMultipleEl.style.primeng).toContain('rocks!');
    });
    it('should change inputId size readonly tabindex maxlength type and placeholder', function () {
        autocomplete.inputId = "Primeng";
        autocomplete.placeholder = "Primeng ROCKS!";
        autocomplete.size = 12;
        autocomplete.required = true;
        autocomplete.readonly = true;
        autocomplete.tabindex = 13;
        autocomplete.type = "password";
        autocomplete.maxlength = 5;
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        expect(inputEl.id).toEqual("Primeng");
        expect(inputEl.placeholder).toEqual("Primeng ROCKS!");
        expect(inputEl.size).toEqual(12);
        expect(inputEl.required).toEqual(true);
        expect(inputEl.tabIndex).toEqual(13);
        expect(inputEl.maxLength).toEqual(5);
        expect(inputEl.readOnly).toEqual(true);
        expect(inputEl.type).toEqual("password");
        autocomplete.multiple = true;
        fixture.detectChanges();
        var inputMultipleEl = fixture.debugElement.query(platform_browser_1.By.css('ul')).query(platform_browser_1.By.css('input')).nativeElement;
        expect(inputMultipleEl.id).toEqual("Primeng");
        expect(inputMultipleEl.placeholder).toEqual("Primeng ROCKS!");
    });
    it('should show filtered brands and change autoZIndex', testing_1.fakeAsync(function () {
        autocomplete.autoZIndex = false;
        fixture.detectChanges();
        var focusValue;
        autocomplete.onFocus.subscribe(function (value) { return focusValue = value; });
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-inputtext.ui-widget'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.focus();
        inputEl.nativeElement.click();
        fixture.detectChanges();
        var onKeydownSpy = spyOn(autocomplete, 'onKeydown').and.callThrough();
        var onKeyupSpy = spyOn(autocomplete, 'onKeyup').and.callThrough();
        var onInputSpy = spyOn(autocomplete, 'onInput').and.callThrough();
        var handleSuggestionsChangeSpy = spyOn(autocomplete, 'handleSuggestionsChange').and.callThrough();
        var filterBrandsSpy = spyOn(testComponent, 'filterBrands').and.callThrough();
        inputEl.nativeElement.value = "v";
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        testing_1.tick(300);
        fixture.detectChanges();
        var suggestionsEls = fixture.debugElement.queryAll(platform_browser_1.By.css('li'));
        expect(autocomplete.suggestions.length).toEqual(2);
        expect(suggestionsEls.length).toEqual(2);
        expect(testComponent.filteredBrands.length).toEqual(2);
        expect(autocomplete.suggestions).toEqual(testComponent.filteredBrands);
        expect(onKeyupSpy).toHaveBeenCalled();
        expect(onInputSpy).toHaveBeenCalled();
        expect(onKeydownSpy).toHaveBeenCalled();
        expect(handleSuggestionsChangeSpy).toHaveBeenCalled();
        expect(filterBrandsSpy).toHaveBeenCalled();
        expect(focusValue).toBeTruthy();
    }));
    it('should change immutable and scrollHeight', testing_1.fakeAsync(function () {
        autocomplete.immutable = false;
        autocomplete.scrollHeight = "450px";
        fixture.detectChanges();
        var deleteLastEl = fixture.debugElement.query(platform_browser_1.By.css('a'));
        deleteLastEl.nativeElement.click();
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-inputtext.ui-widget'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.focus();
        inputEl.nativeElement.click();
        fixture.detectChanges();
        inputEl.nativeElement.value = "v";
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        testing_1.tick(300);
        fixture.detectChanges();
        var suggestionsEls = fixture.debugElement.queryAll(platform_browser_1.By.css('li'));
        var panelEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        expect(panelEl.nativeElement.style.maxHeight).toEqual("450px");
        expect(autocomplete.suggestions.length).toEqual(1);
        expect(suggestionsEls.length).toEqual(1);
        expect(testComponent.filteredBrands.length).toEqual(1);
        expect(autocomplete.suggestions).toEqual(testComponent.filteredBrands);
    }));
    it('should change appendTo', testing_1.fakeAsync(function () {
        autocomplete.appendTo = "body";
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-inputtext.ui-widget'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.focus();
        inputEl.nativeElement.click();
        fixture.detectChanges();
        inputEl.nativeElement.value = "v";
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        testing_1.tick(300);
        fixture.detectChanges();
        var suggestionsEls = fixture.debugElement.queryAll(platform_browser_1.By.css('li'));
        expect(autocomplete.suggestions.length).toEqual(2);
        expect(suggestionsEls.length).toEqual(2);
        expect(testComponent.filteredBrands.length).toEqual(2);
        expect(autocomplete.suggestions).toEqual(testComponent.filteredBrands);
    }));
    it('should change appendTo(2)', testing_1.fakeAsync(function () {
        autocomplete.appendTo = fixture.debugElement.query(platform_browser_1.By.css('a')).nativeElement;
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-inputtext.ui-widget'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.focus();
        inputEl.nativeElement.click();
        fixture.detectChanges();
        inputEl.nativeElement.value = "v";
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        testing_1.tick(300);
        fixture.detectChanges();
        var suggestionsEls = fixture.debugElement.queryAll(platform_browser_1.By.css('li'));
        expect(autocomplete.suggestions.length).toEqual(2);
        expect(suggestionsEls.length).toEqual(2);
        expect(testComponent.filteredBrands.length).toEqual(2);
        expect(autocomplete.suggestions).toEqual(testComponent.filteredBrands);
    }));
    it('should not show panel', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-inputtext.ui-widget'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.focus();
        inputEl.nativeElement.click();
        fixture.detectChanges();
        inputEl.nativeElement.value = "vxc";
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        testing_1.tick(300);
        fixture.detectChanges();
        var suggestionsEls = fixture.debugElement.queryAll(platform_browser_1.By.css('li'));
        expect(autocomplete.suggestions.length).toEqual(0);
        expect(suggestionsEls.length).toEqual(0);
        expect(testComponent.filteredBrands.length).toEqual(0);
    }));
    it('should show emptyMessage', testing_1.fakeAsync(function () {
        autocomplete.emptyMessage = "Primeng ROCKS!";
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-inputtext.ui-widget'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.focus();
        inputEl.nativeElement.click();
        fixture.detectChanges();
        inputEl.nativeElement.value = "v";
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        inputEl.nativeElement.value = "x";
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        inputEl.nativeElement.value = "c";
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        testing_1.tick(300);
        fixture.detectChanges();
        var suggestionsEls = fixture.debugElement.queryAll(platform_browser_1.By.css('li'));
        expect(autocomplete.suggestions.length).toEqual(0);
        expect(suggestionsEls.length).toEqual(1);
        expect(testComponent.filteredBrands.length).toEqual(0);
        expect(suggestionsEls[0].nativeElement.textContent).toEqual(autocomplete.emptyMessage);
    }));
    it('should use autoHighlight', testing_1.fakeAsync(function () {
        autocomplete.autoHighlight = true;
        autocomplete.baseZIndex = 20;
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-inputtext.ui-widget'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.focus();
        inputEl.nativeElement.click();
        fixture.detectChanges();
        inputEl.nativeElement.value = "v";
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        testing_1.tick(300);
        fixture.detectChanges();
        var firstItemEl = fixture.debugElement.query(platform_browser_1.By.css('li')).nativeElement;
        expect(firstItemEl.className).toContain('ui-state-highlight');
    }));
    it('should use forceSelection', testing_1.fakeAsync(function () {
        autocomplete.forceSelection = true;
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-inputtext.ui-widget'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.focus();
        inputEl.nativeElement.click();
        fixture.detectChanges();
        var selectItemSpy = spyOn(autocomplete, 'selectItem').and.callThrough();
        inputEl.nativeElement.value = "vsa";
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        autocomplete.suggestions = [];
        inputEl.nativeElement.dispatchEvent(new Event('change'));
        testing_1.tick(300);
        fixture.detectChanges();
        expect(inputEl.nativeElement.value).toEqual('');
    }));
    it('should select item', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-inputtext.ui-widget'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.focus();
        inputEl.nativeElement.click();
        fixture.detectChanges();
        var selectItemSpy = spyOn(autocomplete, 'selectItem').and.callThrough();
        inputEl.nativeElement.value = "v";
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        testing_1.tick(300);
        fixture.detectChanges();
        var firstItemEl = fixture.debugElement.query(platform_browser_1.By.css('li')).nativeElement;
        firstItemEl.click();
        fixture.detectChanges();
        expect(autocomplete.value).toEqual("Volvo");
        expect(selectItemSpy).toHaveBeenCalled();
        expect(inputEl.nativeElement.value).toEqual(autocomplete.value);
        expect(testComponent.brand).toEqual(autocomplete.value);
    }));
    it('should show panel with dropdown', function () {
        autocomplete.dropdown = true;
        fixture.detectChanges();
        var dropdownValue;
        autocomplete.onDropdownClick.subscribe(function (value) { return dropdownValue = value; });
        var dropdownOpenEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-autocomplete-dropdown'));
        dropdownOpenEl.nativeElement.click();
        fixture.detectChanges();
        var panelEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        expect(panelEl).toBeTruthy();
        expect(autocomplete.overlayVisible).toEqual(true);
        expect(dropdownValue).toBeTruthy();
    });
    it('should change dropdownMode', function () {
        autocomplete.dropdown = true;
        autocomplete.dropdownMode = "current";
        fixture.detectChanges();
        var dropdownOpenEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-autocomplete-dropdown'));
        dropdownOpenEl.nativeElement.click();
        fixture.detectChanges();
        var panelEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        expect(panelEl).toBeTruthy();
        expect(autocomplete.overlayVisible).toEqual(true);
    });
    it('should use field', testing_1.fakeAsync(function () {
        autocomplete2.field = "brand";
        autocomplete2.forceSelection = true;
        fixture.detectChanges();
        var inputEl = fixture.debugElement.queryAll(platform_browser_1.By.css('p-autoComplete'))[1].query(platform_browser_1.By.css('.ui-inputtext.ui-widget'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.focus();
        inputEl.nativeElement.click();
        fixture.detectChanges();
        var selectItemSpy = spyOn(autocomplete2, 'selectItem').and.callThrough();
        inputEl.nativeElement.value = "v";
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        testing_1.tick(300);
        fixture.detectChanges();
        var firstItemEl = fixture.debugElement.queryAll(platform_browser_1.By.css('p-autoComplete'))[1].query(platform_browser_1.By.css('li')).nativeElement;
        firstItemEl.click();
        fixture.detectChanges();
        expect(autocomplete2.value.brand).toEqual("Volvo");
        expect(selectItemSpy).toHaveBeenCalled();
        expect(inputEl.nativeElement.value).toEqual(autocomplete2.value.brand);
        expect(testComponent.car).toEqual(autocomplete2.value);
    }));
    it('should change minLength', testing_1.fakeAsync(function () {
        autocomplete.minLength = 2;
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-inputtext.ui-widget'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.focus();
        inputEl.nativeElement.click();
        fixture.detectChanges();
        inputEl.nativeElement.value = "v";
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        testing_1.tick(300);
        fixture.detectChanges();
        var panelEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        expect(panelEl).toBeFalsy();
    }));
    it('should multiple', function () {
        autocomplete.multiple = true;
        fixture.detectChanges();
        var spanEl = fixture.debugElement.query(platform_browser_1.By.css('span'));
        var listEl = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        expect(spanEl.nativeElement.className).toContain('ui-autocomplete-multiple');
        expect(listEl.nativeElement.className).toContain('ui-autocomplete-multiple-container');
    });
    it('should select item with multiSelect', testing_1.fakeAsync(function () {
        autocomplete.multiple = true;
        autocomplete.forceSelection = true;
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.click();
        fixture.detectChanges();
        var selectItemSpy = spyOn(autocomplete, 'selectItem').and.callThrough();
        inputEl.nativeElement.value = "v";
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        testing_1.tick(300);
        fixture.detectChanges();
        inputEl.nativeElement.dispatchEvent(new Event('change'));
        var firstItemEl = fixture.debugElement.queryAll(platform_browser_1.By.css('li'))[1].nativeElement;
        firstItemEl.click();
        fixture.detectChanges();
        expect(autocomplete.value[0]).toEqual("Volvo");
        expect(autocomplete.value.length).toEqual(1);
        expect(selectItemSpy).toHaveBeenCalled();
        expect(testComponent.brand).toEqual(autocomplete.value);
    }));
    it('should select selected item', testing_1.fakeAsync(function () {
        autocomplete.multiple = true;
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.click();
        fixture.detectChanges();
        var selectItemSpy = spyOn(autocomplete, 'selectItem').and.callThrough();
        inputEl.nativeElement.value = "v";
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        testing_1.tick(300);
        fixture.detectChanges();
        var firstItemEl = fixture.debugElement.queryAll(platform_browser_1.By.css('li'))[1].nativeElement;
        firstItemEl.click();
        fixture.detectChanges();
        expect(autocomplete.value[0]).toEqual("Volvo");
        expect(autocomplete.value.length).toEqual(1);
        expect(selectItemSpy).toHaveBeenCalled();
        expect(testComponent.brand).toEqual(autocomplete.value);
    }));
    it('should delete item with backspace', testing_1.fakeAsync(function () {
        autocomplete.multiple = true;
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.click();
        fixture.detectChanges();
        var selectItemSpy = spyOn(autocomplete, 'selectItem').and.callThrough();
        inputEl.nativeElement.value = "v";
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        testing_1.tick(300);
        fixture.detectChanges();
        var firstItemEl = fixture.debugElement.queryAll(platform_browser_1.By.css('li'))[1].nativeElement;
        firstItemEl.click();
        fixture.detectChanges();
        expect(autocomplete.value[0]).toEqual("Volvo");
        expect(autocomplete.value.length).toEqual(1);
        expect(selectItemSpy).toHaveBeenCalled();
        expect(testComponent.brand).toEqual(autocomplete.value);
        var backspaceEvent = { 'which': 8, preventDefault: function () { } };
        autocomplete.onKeydown(backspaceEvent);
        fixture.detectChanges();
        expect(autocomplete.value[0]).toEqual(undefined);
        expect(autocomplete.value.length).toEqual(0);
    }));
    it('should delete item with icon', testing_1.fakeAsync(function () {
        autocomplete.multiple = true;
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.click();
        fixture.detectChanges();
        var selectItemSpy = spyOn(autocomplete, 'selectItem').and.callThrough();
        inputEl.nativeElement.value = "v";
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keyup'));
        testing_1.tick(300);
        fixture.detectChanges();
        var firstItemEl = fixture.debugElement.queryAll(platform_browser_1.By.css('li'))[1].nativeElement;
        firstItemEl.click();
        fixture.detectChanges();
        expect(autocomplete.value[0]).toEqual("Volvo");
        expect(autocomplete.value.length).toEqual(1);
        expect(selectItemSpy).toHaveBeenCalled();
        expect(testComponent.brand).toEqual(autocomplete.value);
        var iconEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-autocomplete-token-icon'));
        iconEl.nativeElement.click();
        fixture.detectChanges();
        expect(autocomplete.value[0]).toEqual(undefined);
        expect(autocomplete.value.length).toEqual(0);
    }));
    it('should navigate with arrow keys and select with enter', (function () {
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.click();
        fixture.detectChanges();
        var selectItemSpy = spyOn(autocomplete, 'selectItem').and.callThrough();
        autocomplete.suggestions = ["Volvo", "VW"];
        autocomplete.overlayVisible = true;
        var event = { 'which': 40, preventDefault: function () { } };
        autocomplete.onKeydown(event);
        fixture.detectChanges();
        event.which = 38;
        autocomplete.onKeydown(event);
        event.which = 13;
        autocomplete.onKeydown(event);
        fixture.detectChanges();
        expect(autocomplete.value).toEqual("Volvo");
        expect(selectItemSpy).toHaveBeenCalled();
        expect(testComponent.brand).toEqual(autocomplete.value);
    }));
    it('should navigate with arrow keys and select with tab', (function () {
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.click();
        fixture.detectChanges();
        var selectItemSpy = spyOn(autocomplete, 'selectItem').and.callThrough();
        autocomplete.suggestions = ["Volvo", "VW"];
        autocomplete.overlayVisible = true;
        var event = { 'which': 40, preventDefault: function () { } };
        autocomplete.onKeydown(event);
        event.which = 9;
        autocomplete.onKeydown(event);
        fixture.detectChanges();
        expect(autocomplete.value).toEqual("Volvo");
        expect(selectItemSpy).toHaveBeenCalled();
        expect(testComponent.brand).toEqual(autocomplete.value);
    }));
    it('should escape with esc key', (function () {
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        inputEl.nativeElement.click();
        fixture.detectChanges();
        var selectItemSpy = spyOn(autocomplete, 'selectItem').and.callThrough();
        var hideSpy = spyOn(autocomplete, 'hide').and.callThrough();
        autocomplete.suggestions = ["Volvo", "VW"];
        autocomplete.overlayVisible = true;
        var event = { 'which': 27, preventDefault: function () { } };
        autocomplete.onKeydown(event);
        fixture.detectChanges();
        expect(autocomplete.value).toEqual(null);
        expect(selectItemSpy).not.toHaveBeenCalled();
        expect(hideSpy).toHaveBeenCalled();
        expect(autocomplete.overlayVisible).toEqual(false);
    }));
});
//# sourceMappingURL=autocomplete.spec.js.map