"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var spinner_1 = require("./spinner");
var animations_1 = require("@angular/platform-browser/animations");
describe('Spinner', function () {
    var spinner;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                spinner_1.Spinner
            ]
        });
        fixture = testing_1.TestBed.createComponent(spinner_1.Spinner);
        spinner = fixture.componentInstance;
    });
    var triggerEvent = function (el, type) {
        var e = document.createEvent('HTMLEvents');
        e.initEvent(type, false, true);
        el.dispatchEvent(e);
    };
    it('should have value as 3 when up clicked 3 times', function () {
        fixture.detectChanges();
        var spinnerUp = fixture.nativeElement.querySelector('.ui-spinner-up');
        var clearTimerSpy = spyOn(spinner, 'clearTimer').and.callThrough();
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mouseup');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mouseup');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mouseup');
        triggerEvent(spinnerUp, 'mouseleave');
        fixture.detectChanges();
        expect(spinner.value).toBe(3);
        expect(clearTimerSpy).toHaveBeenCalledTimes(7);
    });
    it('should have value as -3 when down clicked 3 times', function () {
        fixture.detectChanges();
        var spinnerDown = fixture.nativeElement.querySelector('.ui-spinner-down');
        var clearTimerSpy = spyOn(spinner, 'clearTimer').and.callThrough();
        triggerEvent(spinnerDown, 'mousedown');
        triggerEvent(spinnerDown, 'mouseup');
        triggerEvent(spinnerDown, 'mousedown');
        triggerEvent(spinnerDown, 'mouseup');
        triggerEvent(spinnerDown, 'mousedown');
        triggerEvent(spinnerDown, 'mouseup');
        triggerEvent(spinnerDown, 'mouseleave');
        fixture.detectChanges();
        expect(spinner.value).toBe(-3);
        expect(clearTimerSpy).toHaveBeenCalledTimes(7);
    });
    it('Should display the spinner value 0.75  ', function () {
        spinner.step = 0.25;
        fixture.detectChanges();
        var spinnerUp = fixture.nativeElement.querySelector('.ui-spinner-up');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        expect(spinner.value).toEqual(0.75);
    });
    it('Should display the formated value with thousand and decimal separator when input is filled by value 1234.1234', function () {
        spinner.precision = 4;
        var spinnerInput = spinner.inputfieldViewChild.nativeElement;
        spinnerInput.value = '1234.1234';
        triggerEvent(spinnerInput, 'input');
        fixture.detectChanges();
        expect(spinner.value).toEqual(1234.1234);
    });
    it('Should disabled', function () {
        spinner.disabled = true;
        fixture.detectChanges();
        var spinnerInputField = fixture.nativeElement.querySelector('.ui-spinner-input');
        var spinnerUp = fixture.nativeElement.querySelector('.ui-spinner-up');
        var spinnerDown = fixture.nativeElement.querySelector('.ui-spinner-down');
        expect(spinnerInputField.disabled).toEqual(true);
        expect(spinnerUp.disabled).toEqual(true);
        expect(spinnerDown.disabled).toEqual(true);
    });
    it('should value should not change.', function () {
        spinner.disabled = true;
        var spinnerInput = spinner.inputfieldViewChild.nativeElement;
        spinnerInput.value = '1';
        triggerEvent(spinnerInput, 'keyup');
        fixture.detectChanges();
        var spinnerUp = fixture.nativeElement.querySelector('.ui-spinner-up');
        triggerEvent(spinnerUp, 'mousedown');
        expect(spinner.value).toBeUndefined();
    });
    it('should have a maxlength', function () {
        spinner.maxlength = 1;
        fixture.detectChanges();
        var spinnerUp = fixture.nativeElement.querySelector('.ui-spinner-up');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        fixture.detectChanges();
        expect(spinner.value).toBe(9);
    });
    it('should have a max', function () {
        spinner.max = 1;
        fixture.detectChanges();
        var spinnerUp = fixture.nativeElement.querySelector('.ui-spinner-up');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        fixture.detectChanges();
        expect(spinner.value).toBe(1);
    });
    it('should have a min', function () {
        spinner.min = -1;
        fixture.detectChanges();
        var spinnerUp = fixture.nativeElement.querySelector('.ui-spinner-down');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        triggerEvent(spinnerUp, 'mousedown');
        fixture.detectChanges();
        expect(spinner.value).toBe(-1);
    });
    it('should select with up and down arrows', function () {
        var upArrowEvent = { 'which': 38, preventDefault: function () { } };
        var downArrowEvent = { 'which': 40, preventDefault: function () { } };
        spinner.onInputKeydown(upArrowEvent);
        fixture.detectChanges();
        expect(spinner.value).toEqual(1);
        spinner.onInputKeydown(downArrowEvent);
        fixture.detectChanges();
        expect(spinner.value).toEqual(0);
    });
    it('should change inputStyle and inputStyleClass', function () {
        spinner.inputStyle = { 'primeng': 'rocks!' };
        spinner.inputStyleClass = "Primeng ROCKS!";
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        expect(inputEl.nativeElement.className).toContain("Primeng ROCKS!");
        expect(inputEl.nativeElement.style.primeng).toEqual("rocks!");
    });
    it('should change inputId placeholder tabindex and required', function () {
        spinner.inputId = "primeng";
        spinner.placeholder = "Primeng ROCKS!";
        spinner.tabindex = 13;
        spinner.required = true;
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        expect(inputEl.nativeElement.id).toEqual("primeng");
        expect(inputEl.nativeElement.placeholder).toEqual("Primeng ROCKS!");
        expect(inputEl.nativeElement.tabIndex).toEqual(13);
        expect(inputEl.nativeElement.required).toEqual(true);
    });
    it('should change readonly and disable buttons', function () {
        spinner.readonly = true;
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        var upButtonEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-spinner-up'));
        var downButtonEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-spinner-down'));
        expect(inputEl.nativeElement.readOnly).toEqual(true);
        expect(upButtonEl.nativeElement.disabled).toEqual(true);
        expect(downButtonEl.nativeElement.disabled).toEqual(true);
        spinner.readonly = false;
        fixture.detectChanges();
        expect(inputEl.nativeElement.readOnly).toEqual(false);
        expect(upButtonEl.nativeElement.disabled).toEqual(false);
        expect(downButtonEl.nativeElement.disabled).toEqual(false);
    });
    it('should listen onChange onFocus and onBlur', function () {
        fixture.detectChanges();
        var onChangeData;
        spinner.onChange.subscribe(function (value) { return onChangeData = value; });
        var onFocusData;
        spinner.onFocus.subscribe(function (value) { return onFocusData = value; });
        var onBlurData;
        spinner.onChange.subscribe(function (value) { return onBlurData = value; });
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        inputEl.dispatchEvent(new Event('focus'));
        fixture.detectChanges();
        inputEl.dispatchEvent(new Event('blur'));
        fixture.detectChanges();
        var spinnerUp = fixture.nativeElement.querySelector('.ui-spinner-up');
        triggerEvent(spinnerUp, 'mousedown');
        fixture.detectChanges();
        expect(onChangeData).toBeTruthy();
        expect(onFocusData).toBeTruthy();
        expect(onBlurData).toBeTruthy();
    });
});
//# sourceMappingURL=spinner.spec.js.map