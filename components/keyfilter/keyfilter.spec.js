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
var keyfilter_1 = require("./keyfilter");
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var inputtext_1 = require("../inputtext/inputtext");
var TestKeyFilterComponent = /** @class */ (function () {
    function TestKeyFilterComponent() {
        this.type = "int";
        this.validateOnly = false;
    }
    TestKeyFilterComponent = __decorate([
        core_1.Component({
            template: "<input type=\"text\" [pValidateOnly]=\"validateOnly\" [(ngModel)]=\"cc\" pKeyFilter=\"int\" pInputText placeholder=\"Integers\">"
        })
    ], TestKeyFilterComponent);
    return TestKeyFilterComponent;
}());
describe('KeyFilter', function () {
    var keyfilter;
    var fixture;
    var component;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule,
                forms_1.FormsModule
            ],
            declarations: [
                keyfilter_1.KeyFilter,
                TestKeyFilterComponent,
                inputtext_1.InputText
            ]
        });
        fixture = testing_1.TestBed.createComponent(TestKeyFilterComponent);
        keyfilter = fixture.debugElement.query(platform_browser_1.By.directive(keyfilter_1.KeyFilter)).injector.get(keyfilter_1.KeyFilter);
        component = fixture.componentInstance;
    });
    it('should created', function () {
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css("input"))).toBeTruthy();
    });
    it('should use keypress (string) and return false', function () {
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        var keydownEvent = document.createEvent('CustomEvent');
        keydownEvent.keyCode = 100;
        keydownEvent.initEvent('keypress', true, true);
        var preventDefaultSpy = spyOn(keydownEvent, 'preventDefault').and.callThrough();
        inputEl.dispatchEvent(keydownEvent);
        fixture.detectChanges();
        expect(preventDefaultSpy).toHaveBeenCalled();
        expect(keydownEvent.returnValue).toBeFalsy();
    });
    it('should use keypress (int) and return true', function () {
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        var keydownEvent = document.createEvent('CustomEvent');
        keydownEvent.keyCode = 53;
        keydownEvent.initEvent('keypress', true, true);
        inputEl.dispatchEvent(keydownEvent);
        inputEl.dispatchEvent(new KeyboardEvent("input", { 'key': "s" }));
        fixture.detectChanges();
        expect(keydownEvent.returnValue).toBeTruthy();
    });
    it('should use keypress (enter) don\'n call prevenDefault', function () {
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        var keydownEvent = document.createEvent('CustomEvent');
        keydownEvent.keyCode = 13;
        keydownEvent.initEvent('keypress', true, true);
        var preventDefaultSpy = spyOn(keydownEvent, 'preventDefault').and.callThrough();
        inputEl.dispatchEvent(keydownEvent);
        fixture.detectChanges();
        expect(preventDefaultSpy).not.toHaveBeenCalled();
        expect(keydownEvent.returnValue).toBeTruthy();
    });
    it('should recognize special and nav keys', function () {
        fixture.detectChanges();
        var keydownEvent = document.createEvent('CustomEvent');
        keydownEvent.keyCode = 13;
        keydownEvent.initEvent('keypress', true, true);
        fixture.detectChanges();
        var value = keyfilter.isSpecialKey(keydownEvent);
        expect(value).toBeTruthy();
        keydownEvent.keyCode = 38;
        value = keyfilter.isNavKeyPress(keydownEvent);
        expect(value).toBeTruthy();
        keydownEvent.keyCode = 49;
        value = keyfilter.isNavKeyPress(keydownEvent);
        expect(value).toBeFalsy();
        value = keyfilter.isSpecialKey(keydownEvent);
        expect(value).toBeFalsy();
    });
    it('should use pValidateOnly', function () {
        component.validateOnly = true;
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        var keydownEvent = document.createEvent('CustomEvent');
        keydownEvent.keyCode = 13;
        keydownEvent.initEvent('keypress', true, true);
        var preventDefaultSpy = spyOn(keydownEvent, 'preventDefault').and.callThrough();
        inputEl.dispatchEvent(keydownEvent);
        fixture.detectChanges();
        expect(preventDefaultSpy).not.toHaveBeenCalled();
        expect(keydownEvent.returnValue).toBeTruthy();
    });
    it('should use metaKey and don\'n call preventDefault', function () {
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        var keydownEvent = document.createEvent('CustomEvent');
        keydownEvent.keyCode = 53;
        keydownEvent.ctrlKey = true;
        keydownEvent.initEvent('keypress', true, true);
        var preventDefaultSpy = spyOn(keydownEvent, 'preventDefault').and.callThrough();
        inputEl.dispatchEvent(keydownEvent);
        fixture.detectChanges();
        expect(preventDefaultSpy).not.toHaveBeenCalled();
        expect(keydownEvent.returnValue).toBeTruthy();
    });
    it('should use paste', function () {
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        var keydownEvent = document.createEvent('CustomEvent');
        keydownEvent.clipboardData = "53";
        keydownEvent.initEvent('paste', true, true);
        var preventDefaultSpy = spyOn(keydownEvent, 'preventDefault').and.callThrough();
        inputEl.dispatchEvent(keydownEvent);
        fixture.detectChanges();
        expect(preventDefaultSpy).not.toHaveBeenCalled();
        expect(keydownEvent.returnValue).toBeTruthy();
    });
    it('should use paste and keyfilter cancel the paste event', function () {
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input')).nativeElement;
        var keydownEvent = document.createEvent('CustomEvent');
        keydownEvent.clipboardData = "paste event";
        keydownEvent.initEvent('paste', true, true);
        var preventDefaultSpy = spyOn(keydownEvent, 'preventDefault').and.callThrough();
        inputEl.dispatchEvent(keydownEvent);
        fixture.detectChanges();
        expect(preventDefaultSpy).toHaveBeenCalled();
        expect(keydownEvent.returnValue).toBeFalsy();
    });
});
//# sourceMappingURL=keyfilter.spec.js.map