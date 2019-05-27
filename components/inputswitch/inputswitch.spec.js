"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var inputswitch_1 = require("./inputswitch");
var animations_1 = require("@angular/platform-browser/animations");
describe('InputSwitch', function () {
    var inputswitch;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                inputswitch_1.InputSwitch
            ]
        });
        fixture = testing_1.TestBed.createComponent(inputswitch_1.InputSwitch);
        inputswitch = fixture.componentInstance;
    });
    it('should created by default', function () {
        fixture.detectChanges();
        var inputSwitchEl = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
        expect(inputSwitchEl).toBeTruthy();
    });
    it('should disabled', function () {
        inputswitch.disabled = true;
        fixture.detectChanges();
        var updateModelSpy = spyOn(inputswitch, 'updateModel').and.callThrough();
        var inputSwitchEl = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        inputSwitchEl.click();
        fixture.detectChanges();
        expect(inputSwitchEl.className).toContain('ui-state-disabled');
        expect(inputEl.disabled).toEqual(true);
        expect(updateModelSpy).not.toHaveBeenCalled();
    });
    it('should change style and styleClass', function () {
        inputswitch.style = { 'primeng': 'rocks!' };
        inputswitch.styleClass = "Primeng ROCKS!";
        fixture.detectChanges();
        var inputSwitchEl = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
        expect(inputSwitchEl.className).toContain("Primeng ROCKS!");
        expect(inputSwitchEl.style.primeng).toContain("rocks!");
    });
    it('should get a name inputId and tabindex', function () {
        inputswitch.tabindex = 5;
        inputswitch.inputId = "Primeng!";
        inputswitch.name = "Primeng ROCKS!";
        fixture.detectChanges();
        var inputSwitchEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        expect(inputSwitchEl.tabIndex).toEqual(5);
        expect(inputSwitchEl.name).toEqual("Primeng ROCKS!");
        expect(inputSwitchEl.id).toEqual("Primeng!");
    });
    it('should checked when click', function () {
        fixture.detectChanges();
        var toggleSpy = spyOn(inputswitch, 'toggle').and.callThrough();
        var inputSwitchEl = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
        var data;
        inputswitch.onChange.subscribe(function (value) { return data = value; });
        inputSwitchEl.click();
        fixture.detectChanges();
        expect(inputswitch.checked).toEqual(true);
        expect(data.checked).toEqual(true);
        expect(toggleSpy).toHaveBeenCalled();
    });
    it('should listen event emitter', function () {
        fixture.detectChanges();
        var data;
        inputswitch.onChange.subscribe(function (value) { return data = value; });
        var inputSwitchEl = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
        inputSwitchEl.click();
        fixture.detectChanges();
        expect(data.checked).toEqual(true);
        inputSwitchEl.click();
        expect(data.checked).toEqual(false);
    });
    it('should change focused', function () {
        fixture.detectChanges();
        var onFocusSpy = spyOn(inputswitch, "onFocus").and.callThrough();
        var onBlurSpy = spyOn(inputswitch, "onBlur").and.callThrough();
        var onModelTouchedSpy = spyOn(inputswitch, "onModelTouched").and.callThrough();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        var inputSwitchEl = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
        inputEl.dispatchEvent(new Event('focus'));
        fixture.detectChanges();
        expect(inputSwitchEl.className).toContain("ui-inputswitch-focus");
        expect(inputswitch.focused).toEqual(true);
        expect(onFocusSpy).toHaveBeenCalled();
        inputEl.dispatchEvent(new Event('blur'));
        fixture.detectChanges();
        expect(inputswitch.focused).toEqual(false);
        expect(inputSwitchEl.className).not.toContain("ui-inputswitch-focus");
        expect(onBlurSpy).toHaveBeenCalled();
        expect(onModelTouchedSpy).toHaveBeenCalled();
    });
    it('should call onInputChange', function () {
        fixture.detectChanges();
        var updateModelSpy = spyOn(inputswitch, "updateModel").and.callThrough();
        var onInputChangeSpy = spyOn(inputswitch, "onInputChange").and.callThrough();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        inputEl.checked = true;
        inputEl.dispatchEvent(new Event('change'));
        fixture.detectChanges();
        expect(updateModelSpy).toHaveBeenCalled();
        expect(onInputChangeSpy).toHaveBeenCalled();
        expect(inputswitch.checked).toEqual(true);
    });
    it('should change disabled', function () {
        fixture.detectChanges();
        inputswitch.setDisabledState(true);
        fixture.detectChanges();
        var updateModelSpy = spyOn(inputswitch, 'updateModel').and.callThrough();
        var inputSwitchEl = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        inputSwitchEl.click();
        fixture.detectChanges();
        expect(inputSwitchEl.className).toContain('ui-state-disabled');
        expect(inputEl.disabled).toEqual(true);
        expect(updateModelSpy).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=inputswitch.spec.js.map