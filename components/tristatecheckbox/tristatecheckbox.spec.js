"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var tristatecheckbox_1 = require("./tristatecheckbox");
var animations_1 = require("@angular/platform-browser/animations");
describe('TriStateCheckbox', function () {
    var tristate;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                tristatecheckbox_1.TriStateCheckbox
            ]
        });
        fixture = testing_1.TestBed.createComponent(tristatecheckbox_1.TriStateCheckbox);
        tristate = fixture.componentInstance;
    });
    it('should created by default', function () {
        fixture.detectChanges();
        var tristatecheckboxEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        expect(tristatecheckboxEl).toBeTruthy();
    });
    it('should disabled', function () {
        tristate.disabled = true;
        tristate.label = "Primeng!";
        fixture.detectChanges();
        var toggleSpy = spyOn(tristate, 'toggle').and.callThrough();
        var helperInputEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-helper-hidden-accessible')).children[0].nativeElement;
        var checkBoxEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-chkbox-box')).nativeElement;
        var labelEl = fixture.debugElement.query(platform_browser_1.By.css('label')).nativeElement;
        checkBoxEl.click();
        fixture.detectChanges();
        expect(helperInputEl.disabled).toEqual(true);
        expect(checkBoxEl.className).toContain("ui-state-disabled");
        expect(labelEl.className).toContain("ui-label-disabled");
        expect(toggleSpy).not.toHaveBeenCalled();
    });
    it('should get a label', function () {
        tristate.label = "Primeng!";
        fixture.detectChanges();
        var labelEl = fixture.debugElement.query(platform_browser_1.By.css('label')).nativeElement;
        expect(labelEl.textContent).toContain("Primeng!");
    });
    it('should change stlye and styleClass', function () {
        tristate.styleClass = "Primeng ROCKS!";
        tristate.style = { 'primeng': 'rocks!' };
        fixture.detectChanges();
        var tristatecheckboxEl = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
        expect(tristatecheckboxEl.className).toContain("Primeng ROCKS!");
        expect(tristatecheckboxEl.style.primeng).toContain("rocks!");
    });
    it('should get a name inputId and tabIndex', function () {
        tristate.label = "Primeng!";
        tristate.tabindex = 5;
        tristate.inputId = "Primeng";
        tristate.name = "Primeng ROCKS!";
        fixture.detectChanges();
        var helperInputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        var labelEl = fixture.debugElement.query(platform_browser_1.By.css('label')).nativeElement;
        expect(helperInputEl.tabIndex).toEqual(5);
        expect(helperInputEl.id).toEqual("Primeng");
        expect(helperInputEl.name).toEqual("Primeng ROCKS!");
        expect(labelEl.htmlFor).toEqual("Primeng");
    });
    it('should value is true when click and listen onChange', function () {
        tristate.label = "Primeng";
        fixture.detectChanges();
        var value;
        tristate.onChange.subscribe(function (data) { return value = data; });
        var onClickSpy = spyOn(tristate, 'onClick').and.callThrough();
        var checkBoxEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-chkbox-box')).nativeElement;
        var checkBoxIconEl = fixture.debugElement.query(platform_browser_1.By.css('span')).nativeElement;
        var labeEl = fixture.debugElement.query(platform_browser_1.By.css('label')).nativeElement;
        checkBoxEl.click();
        fixture.detectChanges();
        expect(tristate.value).toEqual(true);
        expect(value.value).toEqual(tristate.value);
        expect(checkBoxEl.className).toContain("ui-state-active");
        expect(checkBoxIconEl.className).toContain("pi-check");
        expect(labeEl.className).toContain("ui-label-active");
        expect(onClickSpy).toHaveBeenCalled();
    });
    it('should value is true when click to label', function () {
        tristate.label = "Primeng";
        fixture.detectChanges();
        var value;
        tristate.onChange.subscribe(function (data) { return value = data; });
        var onClickSpy = spyOn(tristate, 'onClick').and.callThrough();
        var checkBoxEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-chkbox-box')).nativeElement;
        var checkBoxIconEl = fixture.debugElement.query(platform_browser_1.By.css('span')).nativeElement;
        var labeEl = fixture.debugElement.query(platform_browser_1.By.css('label')).nativeElement;
        labeEl.click();
        fixture.detectChanges();
        expect(tristate.value).toEqual(true);
        expect(value.value).toEqual(tristate.value);
        expect(checkBoxEl.className).toContain("ui-state-active");
        expect(checkBoxIconEl.className).toContain("pi-check");
        expect(labeEl.className).toContain("ui-label-active");
        expect(onClickSpy).toHaveBeenCalled();
    });
    it('should value is false when click twice', function () {
        tristate.label = "Primeng";
        fixture.detectChanges();
        var value;
        tristate.onChange.subscribe(function (data) { return value = data; });
        var onClickSpy = spyOn(tristate, 'onClick').and.callThrough();
        var checkBoxEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-chkbox-box')).nativeElement;
        var checkBoxIconEl = fixture.debugElement.query(platform_browser_1.By.css('span')).nativeElement;
        var labeEl = fixture.debugElement.query(platform_browser_1.By.css('label')).nativeElement;
        checkBoxEl.click();
        checkBoxEl.click();
        fixture.detectChanges();
        expect(tristate.value).toEqual(false);
        expect(value.value).toEqual(tristate.value);
        expect(checkBoxEl.className).toContain("ui-state-active");
        expect(checkBoxIconEl.className).toContain("pi-times");
        expect(labeEl.className).toContain("ui-label-active");
        expect(onClickSpy).toHaveBeenCalledTimes(2);
    });
    it('should value is null when click three time', function () {
        tristate.label = "Primeng";
        fixture.detectChanges();
        var value;
        tristate.onChange.subscribe(function (data) { return value = data; });
        var onClickSpy = spyOn(tristate, 'onClick').and.callThrough();
        var checkBoxEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-chkbox-box')).nativeElement;
        var checkBoxIconEl = fixture.debugElement.query(platform_browser_1.By.css('span')).nativeElement;
        var labeEl = fixture.debugElement.query(platform_browser_1.By.css('label')).nativeElement;
        checkBoxEl.click();
        checkBoxEl.click();
        checkBoxEl.click();
        fixture.detectChanges();
        expect(tristate.value).toEqual(null);
        expect(value.value).toEqual(tristate.value);
        expect(checkBoxEl.className).not.toContain("ui-state-active");
        expect(checkBoxIconEl.className).toEqual("ui-chkbox-icon pi ui-clickable");
        expect(labeEl.className).not.toContain("ui-label-active");
        expect(onClickSpy).toHaveBeenCalledTimes(3);
    });
    it('should call onFocus', function () {
        tristate.label = "Primeng";
        fixture.detectChanges();
        var value;
        tristate.onChange.subscribe(function (data) { return value = data; });
        var onFocusSpy = spyOn(tristate, 'onFocus').and.callThrough();
        var onBlurSpy = spyOn(tristate, 'onBlur').and.callThrough();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        var checkBoxEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-chkbox-box'));
        inputEl.nativeElement.dispatchEvent(new Event('focus'));
        fixture.detectChanges();
        expect(onFocusSpy).toHaveBeenCalled();
        expect(checkBoxEl.nativeElement.className).toContain("ui-state-focus");
        inputEl.nativeElement.dispatchEvent(new Event('blur'));
        fixture.detectChanges();
        expect(onBlurSpy).toHaveBeenCalled();
        expect(checkBoxEl.nativeElement.className).not.toContain("ui-state-focus");
    });
    it('should call onKeydown', function () {
        tristate.label = "Primeng";
        fixture.detectChanges();
        var value;
        tristate.onChange.subscribe(function (data) { return value = data; });
        var onKeydownSpy = spyOn(tristate, 'onKeydown').and.callThrough();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event('keydown'));
        fixture.detectChanges();
        expect(onKeydownSpy).toHaveBeenCalled();
        expect(tristate.value).toBeUndefined();
    });
});
//# sourceMappingURL=tristatecheckbox.spec.js.map