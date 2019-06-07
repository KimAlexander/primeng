var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Password } from './password';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
var TestPasswordComponent = /** @class */ (function () {
    function TestPasswordComponent() {
    }
    TestPasswordComponent = __decorate([
        Component({
            template: "<input pPassword type=\"password\"/>"
        })
    ], TestPasswordComponent);
    return TestPasswordComponent;
}());
describe('Password', function () {
    var password;
    var fixture;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                Password,
                TestPasswordComponent
            ]
        });
        fixture = TestBed.createComponent(TestPasswordComponent);
        password = fixture.componentInstance;
    });
    it('should created', function () {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css("input"))).toBeTruthy();
    });
    it('should create panel', fakeAsync(function () {
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.triggerEventHandler('focus', null);
        tick(300);
        fixture.detectChanges();
        var panelEl = document.getElementsByClassName('ui-password-panel')[0];
        expect(panelEl).toBeTruthy();
    }));
    it('should close panel', fakeAsync(function () {
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.triggerEventHandler('focus', null);
        tick(300);
        fixture.detectChanges();
        var panelEl = document.getElementsByClassName('ui-password-panel')[0];
        expect(panelEl).toBeTruthy();
        inputEl.triggerEventHandler('blur', null);
        tick(300);
        fixture.detectChanges();
        panelEl = document.getElementsByClassName('ui-password-panel')[0];
        expect(panelEl).toEqual(undefined);
    }));
    it('should show warning', fakeAsync(function () {
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.triggerEventHandler('focus', null);
        tick(300);
        fixture.detectChanges();
        inputEl.triggerEventHandler('keyup', { 'target': { 'value': '' } });
        var panelEl = document.getElementsByClassName('ui-password-panel')[0];
        expect(panelEl.children[1].textContent).toEqual("Enter a password");
    }));
    it('should be weak', fakeAsync(function () {
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.triggerEventHandler('focus', null);
        tick(300);
        fixture.detectChanges();
        inputEl.triggerEventHandler('keyup', { 'target': { 'value': 't' } });
        var panelEl = document.getElementsByClassName('ui-password-panel')[0];
        expect(panelEl.children[1].textContent).toEqual("Weak");
    }));
    it('should be medium', fakeAsync(function () {
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.triggerEventHandler('focus', null);
        tick(300);
        fixture.detectChanges();
        inputEl.triggerEventHandler('keyup', { 'target': { 'value': 't23et23' } });
        var panelEl = document.getElementsByClassName('ui-password-panel')[0];
        expect(panelEl.children[1].textContent).toEqual("Medium");
    }));
    it('should be strong', fakeAsync(function () {
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(By.css('input'));
        inputEl.triggerEventHandler('focus', null);
        tick(300);
        fixture.detectChanges();
        inputEl.triggerEventHandler('keyup', { 'target': { 'value': 't23eaviciit2with3out4you' } });
        var panelEl = document.getElementsByClassName('ui-password-panel')[0];
        expect(panelEl.children[1].textContent).toEqual("Strong");
    }));
});
//# sourceMappingURL=password.spec.js.map