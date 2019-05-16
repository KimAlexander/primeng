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
var password_1 = require("./password");
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("@angular/core");
var TestPasswordComponent = /** @class */ (function () {
    function TestPasswordComponent() {
    }
    TestPasswordComponent = __decorate([
        core_1.Component({
            template: "<input pPassword type=\"password\"/>"
        })
    ], TestPasswordComponent);
    return TestPasswordComponent;
}());
describe('Password', function () {
    var password;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                password_1.Password,
                TestPasswordComponent
            ]
        });
        fixture = testing_1.TestBed.createComponent(TestPasswordComponent);
        password = fixture.componentInstance;
    });
    it('should created', function () {
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css("input"))).toBeTruthy();
    });
    it('should create panel', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        inputEl.triggerEventHandler('focus', null);
        testing_1.tick(300);
        fixture.detectChanges();
        var panelEl = document.getElementsByClassName('ui-password-panel')[0];
        expect(panelEl).toBeTruthy();
    }));
    it('should close panel', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        inputEl.triggerEventHandler('focus', null);
        testing_1.tick(300);
        fixture.detectChanges();
        var panelEl = document.getElementsByClassName('ui-password-panel')[0];
        expect(panelEl).toBeTruthy();
        inputEl.triggerEventHandler('blur', null);
        testing_1.tick(300);
        fixture.detectChanges();
        panelEl = document.getElementsByClassName('ui-password-panel')[0];
        expect(panelEl).toEqual(undefined);
    }));
    it('should show warning', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        inputEl.triggerEventHandler('focus', null);
        testing_1.tick(300);
        fixture.detectChanges();
        inputEl.triggerEventHandler('keyup', { 'target': { 'value': '' } });
        var panelEl = document.getElementsByClassName('ui-password-panel')[0];
        expect(panelEl.children[1].textContent).toEqual("Enter a password");
    }));
    it('should be weak', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        inputEl.triggerEventHandler('focus', null);
        testing_1.tick(300);
        fixture.detectChanges();
        inputEl.triggerEventHandler('keyup', { 'target': { 'value': 't' } });
        var panelEl = document.getElementsByClassName('ui-password-panel')[0];
        expect(panelEl.children[1].textContent).toEqual("Weak");
    }));
    it('should be medium', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        inputEl.triggerEventHandler('focus', null);
        testing_1.tick(300);
        fixture.detectChanges();
        inputEl.triggerEventHandler('keyup', { 'target': { 'value': 't23et23' } });
        var panelEl = document.getElementsByClassName('ui-password-panel')[0];
        expect(panelEl.children[1].textContent).toEqual("Medium");
    }));
    it('should be strong', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        inputEl.triggerEventHandler('focus', null);
        testing_1.tick(300);
        fixture.detectChanges();
        inputEl.triggerEventHandler('keyup', { 'target': { 'value': 't23eaviciit2with3out4you' } });
        var panelEl = document.getElementsByClassName('ui-password-panel')[0];
        expect(panelEl.children[1].textContent).toEqual("Strong");
    }));
});
//# sourceMappingURL=password.spec.js.map