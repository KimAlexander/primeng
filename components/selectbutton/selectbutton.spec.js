"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var selectbutton_1 = require("./selectbutton");
var animations_1 = require("@angular/platform-browser/animations");
describe('SelectButton', function () {
    var selectButton;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                selectbutton_1.SelectButton
            ]
        });
        fixture = testing_1.TestBed.createComponent(selectbutton_1.SelectButton);
        selectButton = fixture.componentInstance;
    });
    it('should display the label', function () {
        selectButton.options = [{ label: 'Apartment', value: 'Apartment' }, { label: 'House', value: 'House' }, { label: 'Studio', value: 'Studio' }];
        fixture.detectChanges();
        var labelEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-selectbutton')).children[0];
        expect(labelEl.nativeElement.querySelector('.ui-button-text').textContent).toContain('Apartment');
    });
    it('should display the preselected button', function () {
        selectButton.options = [{ label: 'Apartment', value: { name: 'Apartment' } }, { label: 'House', value: { name: 'House' } }, { label: 'Studio', value: { name: 'Studio' } }];
        selectButton.dataKey = 'name';
        selectButton.writeValue({ name: 'Studio' });
        fixture.detectChanges();
        var active = fixture.nativeElement.querySelector('.ui-state-active').children[0];
        expect(active.textContent).toContain('Studio');
    });
    it('should display the active when click', testing_1.fakeAsync(function () {
        selectButton.options = [{ label: 'Apartment', value: 'Apartment' }, { label: 'House', value: 'House' }, { label: 'Studio', value: 'Studio' }];
        fixture.detectChanges();
        var activeEl = fixture.nativeElement.querySelector('.ui-selectbutton').children[0];
        activeEl.click();
        fixture.detectChanges();
        var active = fixture.nativeElement.querySelector('.ui-state-active').children[0];
        expect(active.textContent).toContain('Apartment');
    }));
    it('should disabled', function () {
        selectButton.disabled = true;
        selectButton.options = [{ label: 'Apartment', value: { name: 'Apartment' } }, { label: 'House', value: { name: 'House' } }, { label: 'Studio', value: { name: 'Studio' } }];
        fixture.detectChanges();
        var onItemClickSpy = spyOn(selectButton, 'onItemClick').and.callThrough();
        var buttonEls = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-button'));
        expect(buttonEls.length).toEqual(3);
        buttonEls[1].nativeElement.click();
        fixture.detectChanges();
        expect(onItemClickSpy).toHaveBeenCalled();
        expect(selectButton.value).toEqual(undefined);
    });
    it('should select multiple', function () {
        selectButton.multiple = true;
        selectButton.options = [{ label: 'Apartment', value: { name: 'Apartment' } }, { label: 'House', value: { name: 'House' } }, { label: 'Studio', value: { name: 'Studio' } }];
        fixture.detectChanges();
        var valueOptionClick;
        var valueChange;
        selectButton.onOptionClick.subscribe(function (data) { return valueOptionClick = data; });
        selectButton.onChange.subscribe(function (data) { return valueChange = data; });
        var onItemClickSpy = spyOn(selectButton, 'onItemClick').and.callThrough();
        var buttonEls = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-button'));
        expect(buttonEls.length).toEqual(3);
        buttonEls[0].nativeElement.click();
        buttonEls[1].nativeElement.click();
        buttonEls[2].nativeElement.click();
        fixture.detectChanges();
        buttonEls[2].nativeElement.click();
        fixture.detectChanges();
        expect(onItemClickSpy).toHaveBeenCalled();
        expect(selectButton.value.length).toEqual(2);
        expect(valueOptionClick.option).toBeTruthy();
        expect(valueChange.value).toBeTruthy();
    });
});
//# sourceMappingURL=selectbutton.spec.js.map