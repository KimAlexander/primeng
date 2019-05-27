"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var checkbox_1 = require("./checkbox");
var animations_1 = require("@angular/platform-browser/animations");
describe('Checkbox', function () {
    var checkbox;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                checkbox_1.Checkbox
            ]
        });
        fixture = testing_1.TestBed.createComponent(checkbox_1.Checkbox);
        checkbox = fixture.componentInstance;
    });
    it('should check the input on click', function () {
        var boxEl = fixture.nativeElement.querySelector('.ui-chkbox-box');
        boxEl.click();
        fixture.detectChanges();
        var input = fixture.nativeElement.querySelector('input');
        expect(input.checked).toBe(true);
    });
    it('should disabled', function () {
        checkbox.disabled = true;
        checkbox.label = "primeng";
        fixture.detectChanges();
        var onClickSpy = spyOn(checkbox, 'onClick').and.callThrough();
        var boxEl = fixture.nativeElement.querySelector('.ui-chkbox-box');
        var labelEl = fixture.nativeElement.querySelector('.ui-chkbox-label');
        boxEl.click();
        fixture.detectChanges();
        var input = fixture.nativeElement.querySelector('input');
        expect(input.checked).toBe(false);
        expect(input.disabled).toEqual(true);
        expect(boxEl.className).toContain('ui-state-disabled');
        expect(labelEl.className).toContain('ui-label-disabled');
        expect(onClickSpy).toHaveBeenCalled();
        expect(checkbox.value).toEqual(undefined);
    });
    it('should get a label name inputId tabindex style styleClass and labelStyleClass', function () {
        checkbox.label = "Primeng ROCKS!";
        checkbox.name = "primeng";
        checkbox.inputId = "primeng";
        checkbox.tabindex = 13;
        checkbox.style = { 'primeng': 'rocks' };
        checkbox.styleClass = "Primeng Rocks!";
        checkbox.labelStyleClass = "Primeng ROCKS";
        fixture.detectChanges();
        var boxEl = fixture.nativeElement.querySelector('.ui-chkbox-box');
        var labelEl = fixture.nativeElement.querySelector('.ui-chkbox-label');
        var containerEl = fixture.nativeElement.querySelector('div');
        boxEl.click();
        fixture.detectChanges();
        var input = fixture.nativeElement.querySelector('input');
        expect(labelEl).toBeTruthy();
        expect(labelEl.className).toContain("Primeng ROCKS");
        expect(labelEl.className).toContain("ui-label-active");
        expect(input.name).toEqual("primeng");
        expect(input.id).toEqual("primeng");
        expect(input.tabIndex).toEqual(13);
        expect(containerEl.className).toContain('Primeng Rocks!');
        expect(containerEl.style.primeng).toContain('rocks');
    });
    it('should uncheck when twice click', function () {
        var boxEl = fixture.nativeElement.querySelector('.ui-chkbox-box');
        var onClickSpy = spyOn(checkbox, 'onClick').and.callThrough();
        boxEl.click();
        fixture.detectChanges();
        boxEl.click();
        fixture.detectChanges();
        var input = fixture.nativeElement.querySelector('input');
        expect(input.checked).toBe(false);
        expect(onClickSpy).toHaveBeenCalledTimes(2);
    });
    it('should check with binary', function () {
        checkbox.binary = "true";
        fixture.detectChanges();
        var boxEl = fixture.nativeElement.querySelector('.ui-chkbox-box');
        boxEl.click();
        fixture.detectChanges();
        var input = fixture.nativeElement.querySelector('input');
        expect(input.checked).toBe(true);
    });
    it('should call onBlur and onFocus', function () {
        checkbox.label = "primeng";
        fixture.detectChanges();
        var input = fixture.nativeElement.querySelector('input');
        var boxEl = fixture.nativeElement.querySelector('.ui-chkbox-box');
        var labelEl = fixture.nativeElement.querySelector('.ui-chkbox-label');
        var onBlurSpy = spyOn(checkbox, 'onBlur').and.callThrough();
        var onFocusSpy = spyOn(checkbox, 'onFocus').and.callThrough();
        input.dispatchEvent(new Event('focus'));
        fixture.detectChanges();
        expect(onFocusSpy).toHaveBeenCalled();
        expect(checkbox.focused).toEqual(true);
        expect(input.className).toContain('ui-state-focus');
        expect(boxEl.className).toContain('ui-state-focus');
        expect(labelEl.className).toContain('ui-label-focus');
        input.dispatchEvent(new Event('blur'));
        fixture.detectChanges();
        expect(onBlurSpy).toHaveBeenCalled();
        expect(checkbox.focused).toEqual(false);
        expect(input.className).not.toContain('ui-state-focus');
        expect(boxEl.className).not.toContain('ui-state-focus');
        expect(labelEl.className).not.toContain('ui-label-focus');
    });
    it('should have default checkbox icon', function () {
        var boxEl = fixture.nativeElement.querySelector('.ui-chkbox-box');
        boxEl.click();
        fixture.detectChanges();
        var iconEl = fixture.nativeElement.querySelector('.ui-chkbox-box .ui-chkbox-icon');
        expect(iconEl.className).toContain('pi pi-check');
    });
    it('should have custom checkbox icon', function () {
        var boxEl = fixture.nativeElement.querySelector('.ui-chkbox-box');
        boxEl.click();
        checkbox.checkboxIcon = 'pi pi-new-check';
        fixture.detectChanges();
        var iconEl = fixture.nativeElement.querySelector('.ui-chkbox-box .ui-chkbox-icon');
        expect(iconEl.className).toContain('pi pi-new-check');
    });
});
//# sourceMappingURL=checkbox.spec.js.map