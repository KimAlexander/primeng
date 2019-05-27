"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var multiselect_1 = require("./multiselect");
var animations_1 = require("@angular/platform-browser/animations");
var scrolling_1 = require("@angular/cdk/scrolling");
describe('MultiSelect', function () {
    var multiselect;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule,
                scrolling_1.ScrollingModule
            ],
            declarations: [
                multiselect_1.MultiSelect,
                multiselect_1.MultiSelectItem
            ]
        });
        fixture = testing_1.TestBed.createComponent(multiselect_1.MultiSelect);
        multiselect = fixture.componentInstance;
    });
    it('should disabled', function () {
        multiselect.disabled = true;
        var showSpy = spyOn(multiselect, 'onMouseclick').and.callThrough();
        fixture.detectChanges();
        var containerEl = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
        var inputReadOnlyEl = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
        containerEl.click();
        fixture.detectChanges();
        expect(showSpy).toHaveBeenCalled();
        expect(containerEl.className).toContain('ui-state-disabled');
        expect(inputReadOnlyEl.className).toContain('ui-state-disabled');
        expect(multiselect.overlayVisible).toEqual(undefined);
    });
    it('should get a name', function () {
        multiselect.name = "PrimeNG";
        fixture.detectChanges();
        var inputReadOnlyEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-helper-hidden-accessible')).children[0].nativeElement;
        expect(inputReadOnlyEl.name).toContain("PrimeNG");
    });
    it('should set dropdown icon by default and able to change', function () {
        fixture.detectChanges();
        var dropdownIcon = fixture.debugElement.query(platform_browser_1.By.css('.ui-multiselect-trigger-icon')).nativeElement;
        expect(dropdownIcon.className).toContain('pi pi-chevron-down');
        fixture.detectChanges();
        multiselect.dropdownIcon = "Primeng Rocks!";
        fixture.detectChanges();
        expect(dropdownIcon.className).toContain("Primeng Rocks!");
    });
    it('should change style and styleClass', function () {
        fixture.detectChanges();
        multiselect.style = { 'primeng': 'rocks' };
        multiselect.styleClass = "Primeng ROCKS!";
        fixture.detectChanges();
        var multiselectEl = fixture.debugElement.children[0].nativeElement;
        expect(multiselectEl.className).toContain('Primeng ROCKS!');
        expect(multiselectEl.style.primeng).toContain('rocks');
    });
    it('should change panelstyle and panelStyleClass', function () {
        fixture.detectChanges();
        multiselect.panelStyle = { 'primeng': 'rocks' };
        multiselect.panelStyleClass = "Primeng ROCKS!";
        multiselect.overlayVisible = true;
        fixture.detectChanges();
        var multiselectPanelEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-multiselect-panel ')).nativeElement;
        expect(multiselectPanelEl.className).toContain('Primeng ROCKS!');
        expect(multiselectPanelEl.style.primeng).toContain('rocks');
    });
    it('should open when click', function () {
        var multiselectEl = fixture.debugElement.children[0].nativeElement;
        var clickSpy = spyOn(multiselect, 'onMouseclick').and.callThrough();
        multiselectEl.click();
        fixture.detectChanges();
        var multiselectPanelEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-multiselect-panel'));
        expect(multiselectEl.className).toContain('ui-multiselect-open');
        expect(multiselect.overlayVisible).toEqual(true);
        expect(multiselectPanelEl).toBeTruthy();
        expect(clickSpy).toHaveBeenCalled();
    });
    it('should close when double click', function () {
        var multiselectEl = fixture.debugElement.children[0].nativeElement;
        var clickSpy = spyOn(multiselect, 'onMouseclick').and.callThrough();
        var hideSpy = spyOn(multiselect, 'hide').and.callThrough();
        multiselectEl.click();
        multiselectEl.click();
        fixture.detectChanges();
        var multiselectPanelEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-multiselect-panel'));
        expect(multiselectEl.className).not.toContain('ui-multiselect-open');
        expect(multiselect.overlayVisible).toEqual(false);
        expect(multiselectPanelEl).toBeFalsy();
        expect(clickSpy).toHaveBeenCalled();
        expect(hideSpy).toHaveBeenCalled();
    });
    it('should select item', function () {
        multiselect.options = [
            { label: 'Audi', value: 'Audi' },
            { label: 'BMW', value: 'BMW' },
            { label: 'Fiat', value: 'Fiat' },
            { label: 'Ford', value: 'Ford' },
            { label: 'Honda', value: 'Honda' },
            { label: 'Jaguar', value: 'Jaguar' },
            { label: 'Mercedes', value: 'Mercedes' },
            { label: 'Renault', value: 'Renault' },
            { label: 'VW', value: 'VW' },
            { label: 'Volvo', value: 'Volvo' }
        ];
        var multiselectEl = fixture.debugElement.children[0].nativeElement;
        multiselectEl.click();
        fixture.detectChanges();
        var multiselectItemEl = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-multiselect-item'));
        expect(multiselectItemEl.length).toEqual(10);
        var bmwEl = multiselectItemEl[1];
        var onOptionClickSpy = spyOn(multiselect, 'onOptionClick').and.callThrough();
        bmwEl.nativeElement.click();
        fixture.detectChanges();
        expect(multiselect.value[0]).toEqual('BMW');
        expect(bmwEl.nativeElement.className).toContain('ui-state-highlight');
        expect(onOptionClickSpy).toBeTruthy();
    });
    it('should unselect item', function () {
        multiselect.options = [
            { label: 'Audi', value: 'Audi' },
            { label: 'BMW', value: 'BMW' },
            { label: 'Fiat', value: 'Fiat' },
            { label: 'Ford', value: 'Ford' },
            { label: 'Honda', value: 'Honda' },
            { label: 'Jaguar', value: 'Jaguar' },
            { label: 'Mercedes', value: 'Mercedes' },
            { label: 'Renault', value: 'Renault' },
            { label: 'VW', value: 'VW' },
            { label: 'Volvo', value: 'Volvo' }
        ];
        multiselect.selectionLimit = 3;
        multiselect.value = [];
        fixture.detectChanges();
        var multiselectEl = fixture.debugElement.children[0].nativeElement;
        multiselectEl.click();
        fixture.detectChanges();
        var multiselectItemEl = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-multiselect-item'));
        expect(multiselectItemEl.length).toEqual(10);
        var audiEl = multiselectItemEl[0];
        var bmwEl = multiselectItemEl[1];
        var onOptionClickSpy = spyOn(multiselect, 'onOptionClick').and.callThrough();
        bmwEl.nativeElement.click();
        audiEl.nativeElement.click();
        fixture.detectChanges();
        expect(multiselect.value[0]).toEqual('BMW');
        expect(multiselect.value[1]).toEqual('Audi');
        expect(multiselect.value.length).toEqual(2);
        expect(bmwEl.nativeElement.className).toContain('ui-state-highlight');
        expect(onOptionClickSpy).toBeTruthy();
        audiEl.nativeElement.click();
        fixture.detectChanges();
        expect(multiselect.value.length).toEqual(1);
    });
    it('should not select disabled item', function () {
        multiselect.options = [
            { label: 'Audi', value: 'Audi' },
            { label: 'BMW', value: 'BMW', disabled: true },
            { label: 'Fiat', value: 'Fiat' },
            { label: 'Ford', value: 'Ford' },
            { label: 'Honda', value: 'Honda' },
            { label: 'Jaguar', value: 'Jaguar' },
            { label: 'Mercedes', value: 'Mercedes' },
            { label: 'Renault', value: 'Renault' },
            { label: 'VW', value: 'VW' },
            { label: 'Volvo', value: 'Volvo' }
        ];
        var multiselectEl = fixture.debugElement.children[0].nativeElement;
        multiselectEl.click();
        fixture.detectChanges();
        var multiselectItemEl = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-multiselect-item'));
        expect(multiselectItemEl.length).toEqual(10);
        var bmwEl = multiselectItemEl[1];
        var audiEl = multiselectItemEl[0];
        var onOptionClickSpy = spyOn(multiselect, 'onOptionClick').and.callThrough();
        bmwEl.nativeElement.click();
        fixture.detectChanges();
        audiEl.nativeElement.click();
        fixture.detectChanges();
        expect(multiselect.value[0]).not.toEqual('BMW');
        expect(bmwEl.nativeElement.className).not.toContain('ui-state-highlight');
        expect(onOptionClickSpy).toBeTruthy();
    });
    it('should select multiple', function () {
        multiselect.options = [
            { label: 'Audi', value: 'Audi' },
            { label: 'BMW', value: 'BMW' },
            { label: 'Fiat', value: 'Fiat' },
            { label: 'Ford', value: 'Ford' },
            { label: 'Honda', value: 'Honda' },
            { label: 'Jaguar', value: 'Jaguar' },
            { label: 'Mercedes', value: 'Mercedes' },
            { label: 'Renault', value: 'Renault' },
            { label: 'VW', value: 'VW' },
            { label: 'Volvo', value: 'Volvo' }
        ];
        var multiselectEl = fixture.debugElement.children[0].nativeElement;
        multiselectEl.click();
        fixture.detectChanges();
        var multiselectItemEl = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-multiselect-item'));
        expect(multiselectItemEl.length).toEqual(10);
        var bmwEl = multiselectItemEl[1];
        var fordEl = multiselectItemEl[3];
        var onOptionClickSpy = spyOn(multiselect, 'onOptionClick').and.callThrough();
        bmwEl.nativeElement.click();
        fordEl.nativeElement.click();
        fixture.detectChanges();
        expect(multiselect.value[0]).toEqual('BMW');
        expect(multiselect.value[1]).toEqual('Ford');
        expect(fordEl.nativeElement.className).toContain('ui-state-highlight');
        expect(bmwEl.nativeElement.className).toContain('ui-state-highlight');
        expect(onOptionClickSpy).toHaveBeenCalledTimes(2);
    });
    it('should select multiple with selection limit', function () {
        multiselect.options = [
            { label: 'Audi', value: 'Audi' },
            { label: 'BMW', value: 'BMW' },
            { label: 'Fiat', value: 'Fiat' },
            { label: 'Ford', value: 'Ford' },
            { label: 'Honda', value: 'Honda' },
            { label: 'Jaguar', value: 'Jaguar' },
            { label: 'Mercedes', value: 'Mercedes' },
            { label: 'Renault', value: 'Renault' },
            { label: 'VW', value: 'VW' },
            { label: 'Volvo', value: 'Volvo' }
        ];
        multiselect.value = [];
        multiselect.selectionLimit = 2;
        var multiselectEl = fixture.debugElement.children[0].nativeElement;
        var onOptionClickSpy = spyOn(multiselect, 'onOptionClick').and.callThrough();
        fixture.detectChanges();
        multiselectEl.click();
        fixture.detectChanges();
        var multiselectItemEl = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-multiselect-item'));
        expect(multiselectItemEl.length).toEqual(10);
        var bmwEl = multiselectItemEl[1];
        var fordEl = multiselectItemEl[3];
        var fiatEl = multiselectItemEl[2];
        bmwEl.nativeElement.click();
        fordEl.nativeElement.click();
        fiatEl.nativeElement.click();
        fixture.detectChanges();
        expect(multiselect.value[0]).toEqual('BMW');
        expect(multiselect.value[1]).toEqual('Ford');
        expect(fordEl.nativeElement.className).toContain('ui-state-highlight');
        expect(bmwEl.nativeElement.className).toContain('ui-state-highlight');
        expect(fiatEl.nativeElement.className).not.toContain('ui-state-highlight');
        expect(onOptionClickSpy).toHaveBeenCalledTimes(3);
    });
    it('should select all', function () {
        multiselect.options = [
            { label: 'Audi', value: 'Audi' },
            { label: 'BMW', value: 'BMW' },
            { label: 'Fiat', value: 'Fiat' },
            { label: 'Ford', value: 'Ford' },
            { label: 'Honda', value: 'Honda' },
            { label: 'Jaguar', value: 'Jaguar' },
            { label: 'Mercedes', value: 'Mercedes' },
            { label: 'Renault', value: 'Renault' },
            { label: 'VW', value: 'VW' },
            { label: 'Volvo', value: 'Volvo' }
        ];
        var multiselectEl = fixture.debugElement.children[0].nativeElement;
        var itemClickSpy = spyOn(multiselect, 'isAllChecked').and.callThrough();
        var onHeaderCheckboxFocusSpy = spyOn(multiselect, 'onHeaderCheckboxFocus').and.callThrough();
        var onHeaderCheckboxBlurSpy = spyOn(multiselect, 'onHeaderCheckboxBlur').and.callThrough();
        multiselectEl.click();
        fixture.detectChanges();
        var allCheckedEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-chkbox-box')).nativeElement;
        var readOnlyEl = fixture.debugElement.query(platform_browser_1.By.css(".ui-chkbox")).children[0].children[0].nativeElement;
        readOnlyEl.dispatchEvent(new Event('focus'));
        allCheckedEl.click();
        fixture.detectChanges();
        expect(multiselect.value.length).toEqual(10);
        expect(itemClickSpy).toHaveBeenCalled();
        readOnlyEl.dispatchEvent(new Event('blur'));
        fixture.detectChanges();
        expect(onHeaderCheckboxFocusSpy).toHaveBeenCalled();
        expect(onHeaderCheckboxBlurSpy).toHaveBeenCalled();
    });
    it('should select all when filtered', function () {
        multiselect.options = [
            { label: 'Audi', value: 'Audi' },
            { label: 'BMW', value: 'BMW' },
            { label: 'Fiat', value: 'Fiat' },
            { label: 'Ford', value: 'Ford' },
            { label: 'Honda', value: 'Honda' },
            { label: 'Jaguar', value: 'Jaguar' },
            { label: 'Mercedes', value: 'Mercedes' },
            { label: 'Renault', value: 'Renault' },
            { label: 'VW', value: 'VW' },
            { label: 'Volvo', value: 'Volvo' }
        ];
        var onInputFocusSpy = spyOn(multiselect, "onInputFocus").and.callThrough();
        var onInputBlur = spyOn(multiselect, "onInputBlur").and.callThrough();
        var multiselectEl = fixture.debugElement.children[0].nativeElement;
        var readOnlyEl = fixture.debugElement.query(platform_browser_1.By.css("input")).nativeElement;
        readOnlyEl.dispatchEvent(new Event('focus'));
        multiselectEl.click();
        fixture.detectChanges();
        readOnlyEl.dispatchEvent(new Event('blur'));
        var filterInputEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-inputtext')).nativeElement;
        filterInputEl.value = "v";
        filterInputEl.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        var allCheckedEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-chkbox-box')).nativeElement;
        allCheckedEl.click();
        fixture.detectChanges();
        expect(multiselect.value.length).toEqual(2);
        expect(onInputFocusSpy).toHaveBeenCalled();
        expect(onInputBlur).toHaveBeenCalled();
    });
    it('should unselect all', function () {
        multiselect.options = [
            { label: 'Audi', value: 'Audi' },
            { label: 'BMW', value: 'BMW' },
            { label: 'Fiat', value: 'Fiat' },
            { label: 'Ford', value: 'Ford' },
            { label: 'Honda', value: 'Honda' },
            { label: 'Jaguar', value: 'Jaguar' },
            { label: 'Mercedes', value: 'Mercedes' },
            { label: 'Renault', value: 'Renault' },
            { label: 'VW', value: 'VW' },
            { label: 'Volvo', value: 'Volvo' }
        ];
        var multiselectEl = fixture.debugElement.children[0].nativeElement;
        var toggleSpy = spyOn(multiselect, 'isAllChecked').and.callThrough();
        multiselectEl.click();
        fixture.detectChanges();
        var allCheckedEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-chkbox-box')).nativeElement;
        allCheckedEl.click();
        fixture.detectChanges();
        expect(multiselect.value.length).toEqual(10);
        expect(toggleSpy).toHaveBeenCalled();
        allCheckedEl.click();
        fixture.detectChanges();
        expect(multiselect.value.length).toEqual(0);
    });
    it('should filtered', function () {
        multiselect.options = [
            { label: 'Audi', value: 'Audi' },
            { label: 'BMW', value: 'BMW' },
            { label: 'Fiat', value: 'Fiat' },
            { label: 'Ford', value: 'Ford' },
            { label: 'Honda', value: 'Honda' },
            { label: 'Jaguar', value: 'Jaguar' },
            { label: 'Mercedes', value: 'Mercedes' },
            { label: 'Renault', value: 'Renault' },
            { label: 'VW', value: 'VW' },
            { label: 'Volvo', value: 'Volvo' }
        ];
        var multiselectEl = fixture.debugElement.children[0].nativeElement;
        multiselectEl.click();
        fixture.detectChanges();
        var filterInputEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-inputtext')).nativeElement;
        filterInputEl.value = "f";
        filterInputEl.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(multiselect.visibleOptions.length).toEqual(2);
    });
    it('should close with close icon and reset filter input', function () {
        multiselect.options = [
            { label: 'Audi', value: 'Audi' },
            { label: 'BMW', value: 'BMW' },
            { label: 'Fiat', value: 'Fiat' },
            { label: 'Ford', value: 'Ford' },
            { label: 'Honda', value: 'Honda' },
            { label: 'Jaguar', value: 'Jaguar' },
            { label: 'Mercedes', value: 'Mercedes' },
            { label: 'Renault', value: 'Renault' },
            { label: 'VW', value: 'VW' },
            { label: 'Volvo', value: 'Volvo' }
        ];
        multiselect.resetFilterOnHide = true;
        var multiselectEl = fixture.debugElement.children[0].nativeElement;
        multiselectEl.click();
        fixture.detectChanges();
        var filterInputEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-inputtext')).nativeElement;
        filterInputEl.value = "f";
        filterInputEl.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(multiselect.visibleOptions.length).toEqual(2);
        var closeEl = fixture.debugElement.query(platform_browser_1.By.css(".ui-multiselect-close"));
        closeEl.nativeElement.click();
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css("div")).nativeElement.className).not.toContain("ui-multiselect-open");
    });
});
//# sourceMappingURL=multiselect.spec.js.map