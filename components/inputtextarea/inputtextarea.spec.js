var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InputTextarea } from './inputtextarea';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
var TestInputTextArea = /** @class */ (function () {
    function TestInputTextArea() {
    }
    TestInputTextArea.prototype.onResize = function (event) {
    };
    TestInputTextArea = __decorate([
        Component({
            template: "<textarea rows=\"1\" cols=\"1\" (onResize)=\"onResize($event)\" [autoResize]=\"autoResize\" pInputTextarea></textarea>\n  "
        })
    ], TestInputTextArea);
    return TestInputTextArea;
}());
describe('InputTextarea', function () {
    var fixture;
    var component;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                InputTextarea,
                TestInputTextArea
            ]
        });
        fixture = TestBed.createComponent(TestInputTextArea);
        component = fixture.debugElement.componentInstance;
    });
    it('should display by default', function () {
        fixture.detectChanges();
        var inputTextEl = fixture.debugElement.query(By.css('textarea'));
        expect(inputTextEl).toBeTruthy();
    });
    it('should change autoResize', function () {
        component.autoResize = true;
        fixture.detectChanges();
        var onResizeSpy = spyOn(component, 'onResize').and.callThrough();
        var inputTextEl = fixture.debugElement.query(By.css('textarea'));
        inputTextEl.nativeElement.dispatchEvent(new Event('focus'));
        fixture.detectChanges();
        inputTextEl.nativeElement.dispatchEvent(new Event('blur'));
        fixture.detectChanges();
        expect(onResizeSpy).toHaveBeenCalledTimes(4);
    });
    it('should increment height', function () {
        component.autoResize = true;
        fixture.detectChanges();
        var inputTextEl = fixture.debugElement.query(By.css('textarea'));
        var cachedHeight = inputTextEl.nativeElement.style.height;
        inputTextEl.nativeElement.value = "primeng";
        inputTextEl.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(inputTextEl.nativeElement.style.height).toBeGreaterThan(cachedHeight);
        expect(inputTextEl.nativeElement.style.overflow).toEqual("hidden");
    });
    it('should use resize with maxHeight', function () {
        component.autoResize = true;
        fixture.detectChanges();
        var inputTextEl = fixture.debugElement.query(By.css('textarea'));
        inputTextEl.nativeElement.style.maxHeight = 70 + 'px';
        fixture.detectChanges();
        inputTextEl.nativeElement.value = "primeng rocks!";
        inputTextEl.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(inputTextEl.nativeElement.style.height).toEqual(inputTextEl.nativeElement.style.maxHeight);
        expect(inputTextEl.nativeElement.style.overflowY).toEqual("scroll");
    });
});
//# sourceMappingURL=inputtextarea.spec.js.map