var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ColorPicker } from './colorpicker';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
var TestColorPickerComponent = /** @class */ (function () {
    function TestColorPickerComponent() {
        this.color1 = '#1976D2';
    }
    TestColorPickerComponent = __decorate([
        Component({
            template: "\n            <p-colorPicker [(ngModel)]=\"color1\"></p-colorPicker>\n        "
        })
    ], TestColorPickerComponent);
    return TestColorPickerComponent;
}());
describe('ColorPicker', function () {
    var colorpicker;
    var testComponent;
    var fixture;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                FormsModule
            ],
            declarations: [
                ColorPicker,
                TestColorPickerComponent
            ]
        });
        fixture = TestBed.createComponent(TestColorPickerComponent);
        colorpicker = fixture.debugElement.children[0].componentInstance;
        testComponent = fixture.componentInstance;
    });
    it('should created by default', function () {
        fixture.detectChanges();
        var colorPickerEl = fixture.debugElement.query(By.css('.ui-colorpicker'));
        expect(colorPickerEl.nativeElement).toBeTruthy();
    });
    it('should inline', function () {
        colorpicker.inline = true;
        fixture.detectChanges();
        var overlayEl = fixture.debugElement.query(By.css('.ui-colorpicker-overlay'));
        expect(overlayEl).toBeFalsy();
    });
    it('should select color', function () {
        colorpicker.inline = true;
        fixture.detectChanges();
        var pickColorSpy = spyOn(colorpicker, "pickColor").and.callThrough();
        var colorSelectorEl = fixture.debugElement.query(By.css('.ui-colorpicker-color-selector'));
        colorSelectorEl.triggerEventHandler("mousedown", { pageX: 100, pageY: 120 });
        fixture.detectChanges();
        document.dispatchEvent(new Event("mouseup"));
        fixture.detectChanges();
        expect(testComponent.color1).not.toEqual("#1976D2");
        expect(pickColorSpy).toHaveBeenCalled();
    });
    it('should select hue', function () {
        colorpicker.inline = true;
        fixture.detectChanges();
        var pickHueSpy = spyOn(colorpicker, "pickHue").and.callThrough();
        var hueSelectorEl = fixture.debugElement.query(By.css('.ui-colorpicker-hue'));
        hueSelectorEl.triggerEventHandler("mousedown", { pageX: 20, pageY: 25 });
        fixture.detectChanges();
        expect(testComponent.color1).not.toEqual("#1976D2");
        expect(pickHueSpy).toHaveBeenCalled();
    });
    it('should call togglePanel when click on input', function () {
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(By.css('.ui-inputtext'));
        var toggleSpy = spyOn(colorpicker, "togglePanel").and.callThrough();
        inputEl.nativeElement.dispatchEvent(new Event("focus"));
        inputEl.nativeElement.click();
        fixture.detectChanges();
        var selectorEl = fixture.debugElement.query(By.css(".ui-colorpicker-panel"));
        expect(toggleSpy).toHaveBeenCalled();
        expect(selectorEl).toBeTruthy();
    });
    it('should select color (overlay)', function () {
        colorpicker.appendTo = "body";
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(By.css('.ui-inputtext'));
        inputEl.nativeElement.dispatchEvent(new Event("focus"));
        inputEl.nativeElement.click();
        fixture.detectChanges();
        var pickColorSpy = spyOn(colorpicker, "pickColor").and.callThrough();
        var colorSelectorEl = fixture.debugElement.query(By.css('.ui-colorpicker-color-selector'));
        colorSelectorEl.nativeElement.click();
        colorSelectorEl.triggerEventHandler("mousedown", { pageX: 100, pageY: 120 });
        var mouseMoveEvent = document.createEvent('CustomEvent');
        mouseMoveEvent.pageX = 101;
        mouseMoveEvent.pageY = 121;
        mouseMoveEvent.initEvent('mousemove', true, true);
        document.dispatchEvent(mouseMoveEvent);
        document.dispatchEvent(mouseMoveEvent);
        fixture.detectChanges();
        document.dispatchEvent(new Event("mouseup"));
        fixture.detectChanges();
        expect(testComponent.color1).not.toEqual("#1976D2");
        expect(pickColorSpy).toHaveBeenCalled();
    });
    it('should close when inputclick', function () {
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(By.css('.ui-inputtext'));
        inputEl.nativeElement.dispatchEvent(new Event("focus"));
        inputEl.nativeElement.click();
        fixture.detectChanges();
        var selectorEl = fixture.debugElement.query(By.css(".ui-colorpicker-panel"));
        expect(selectorEl).toBeTruthy();
        inputEl.nativeElement.click();
        fixture.detectChanges();
        selectorEl = fixture.debugElement.query(By.css(".ui-colorpicker-panel"));
        expect(selectorEl).toBeFalsy();
    });
    it('should open space keydown and close esc keydown', function () {
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(By.css('.ui-inputtext'));
        var openEvent = document.createEvent('CustomEvent');
        openEvent.which = 32;
        openEvent.initEvent('keydown', true, true);
        inputEl.nativeElement.dispatchEvent(openEvent);
        fixture.detectChanges();
        var selectorEl = fixture.debugElement.query(By.css(".ui-colorpicker-panel"));
        expect(selectorEl).toBeTruthy();
        var escapeEvent = document.createEvent('CustomEvent');
        escapeEvent.which = 27;
        escapeEvent.initEvent('keydown', true, true);
        inputEl.nativeElement.dispatchEvent(escapeEvent);
        fixture.detectChanges();
        selectorEl = fixture.debugElement.query(By.css(".ui-colorpicker-panel"));
        expect(selectorEl).toBeFalsy();
    });
});
//# sourceMappingURL=colorpicker.spec.js.map