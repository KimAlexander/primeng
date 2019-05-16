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
var tooltip_1 = require("./tooltip");
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("@angular/core");
var inputtext_1 = require("../inputtext/inputtext");
var TestTooltipComponent = /** @class */ (function () {
    function TestTooltipComponent() {
        this.position = "right";
        this.event = "hover";
        this.positionStyle = "absolute";
        this.disabled = false;
        this.appendTo = 'body';
    }
    TestTooltipComponent = __decorate([
        core_1.Component({
            template: "<input type=\"text\" pInputText pTooltip=\"Enter your username\" [positionStyle]=\"positionStyle\" [appendTo]=\"appendTo\" [tooltipDisabled]=\"disabled\" [tooltipEvent]=\"event\" [tooltipPosition]=\"position\"> "
        })
    ], TestTooltipComponent);
    return TestTooltipComponent;
}());
describe('Tooltip', function () {
    var tooltip;
    var component;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                tooltip_1.Tooltip,
                inputtext_1.InputText,
                TestTooltipComponent
            ]
        });
        fixture = testing_1.TestBed.createComponent(TestTooltipComponent);
        tooltip = fixture.debugElement.children[0].componentInstance;
        component = fixture.componentInstance;
    });
    it('should created', function () {
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css("input"))).toBeTruthy();
    });
    it('should create tooltip on right', function () {
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event("mouseenter"));
        fixture.detectChanges();
        var panelEl = document.getElementsByClassName('ui-tooltip-right')[0];
        expect(panelEl).toBeTruthy();
    });
    it('should create tooltip on left (out of bounds and its gonna be on the right)', function () {
        fixture.detectChanges();
        component.position = 'left';
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event("mouseenter"));
        fixture.detectChanges();
        var panelEl = document.getElementsByClassName('ui-tooltip-right')[0];
        expect(panelEl).toBeTruthy();
    });
    it('should create tooltip on top', function () {
        fixture.detectChanges();
        component.position = 'top';
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event("mouseenter"));
        fixture.detectChanges();
        var panelEl = document.getElementsByClassName('ui-tooltip-top')[0];
        expect(panelEl).toBeTruthy();
    });
    it('should create tooltip on bottom', function () {
        fixture.detectChanges();
        component.position = 'bottom';
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event("mouseenter"));
        fixture.detectChanges();
        var panelEl = document.getElementsByClassName('ui-tooltip-bottom')[0];
        expect(panelEl).toBeTruthy();
    });
    it('should hide tooltip when mouseleave', function () {
        fixture.detectChanges();
        component.appendTo = 'target';
        component.position = 'bottom';
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event("mouseenter"));
        fixture.detectChanges();
        var panelEl = document.getElementsByClassName('ui-tooltip-bottom')[0];
        expect(panelEl).toBeTruthy();
        inputEl.nativeElement.dispatchEvent(new Event("mouseleave"));
        fixture.detectChanges();
        panelEl = document.getElementsByClassName('ui-tooltip-bottom')[0];
        expect(panelEl).toBeFalsy();
    });
    it('should hide tooltip when click', function () {
        fixture.detectChanges();
        component.position = 'bottom';
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event("mouseenter"));
        fixture.detectChanges();
        var panelEl = document.getElementsByClassName('ui-tooltip-bottom')[0];
        expect(panelEl).toBeTruthy();
        inputEl.nativeElement.dispatchEvent(new Event("click"));
        fixture.detectChanges();
        panelEl = document.getElementsByClassName('ui-tooltip-bottom')[0];
        expect(panelEl).toBeFalsy();
    });
    it('should create panel when focus', function () {
        component.event = "focus";
        fixture.detectChanges();
        component.position = 'bottom';
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event("focus"));
        fixture.detectChanges();
        var panelEl = document.getElementsByClassName('ui-tooltip-bottom')[0];
        expect(panelEl).toBeTruthy();
    });
    it('should hide panel when blur', function () {
        component.event = "focus";
        fixture.detectChanges();
        component.position = 'bottom';
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event("focus"));
        fixture.detectChanges();
        var panelEl = document.getElementsByClassName('ui-tooltip-bottom')[0];
        expect(panelEl).toBeTruthy();
        inputEl.nativeElement.dispatchEvent(new Event("blur"));
        fixture.detectChanges();
        panelEl = document.getElementsByClassName('ui-tooltip-bottom')[0];
        expect(panelEl).toBeFalsy();
    });
    it('shouldn\'t show panel when disabled', function () {
        component.event = "focus";
        component.disabled = true;
        fixture.detectChanges();
        component.position = 'bottom';
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event("focus"));
        fixture.detectChanges();
        var panelEl = document.getElementsByClassName('ui-tooltip-bottom')[0];
        expect(panelEl).toBeFalsy();
    });
    it('should hide panel when resize', function () {
        component.event = "focus";
        fixture.detectChanges();
        component.position = 'bottom';
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        inputEl.nativeElement.dispatchEvent(new Event("focus"));
        fixture.detectChanges();
        var panelEl = document.getElementsByClassName('ui-tooltip-bottom')[0];
        expect(panelEl).toBeTruthy();
        window.dispatchEvent(new Event("resize"));
        fixture.detectChanges();
        panelEl = document.getElementsByClassName('ui-tooltip-bottom')[0];
        expect(panelEl).toBeFalsy();
    });
});
//# sourceMappingURL=tooltip.spec.js.map