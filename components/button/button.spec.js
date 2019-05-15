"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var button_1 = require("./button");
var animations_1 = require("@angular/platform-browser/animations");
describe('Button', function () {
    var button;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                button_1.Button
            ]
        });
        fixture = testing_1.TestBed.createComponent(button_1.Button);
        button = fixture.componentInstance;
    });
    it('should disabled when disabled is true', function () {
        button.disabled = true;
        fixture.detectChanges();
        var buttonEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-button'));
        expect(buttonEl.nativeElement.className).toContain('ui-state-disabled');
    });
    it('should display the label and have a text only class', function () {
        button.label = 'PrimeNG';
        fixture.detectChanges();
        var buttonEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-button'));
        expect(buttonEl.nativeElement.className).toContain('ui-button-text-only');
        expect(buttonEl.nativeElement.textContent).toContain('PrimeNG');
        expect(buttonEl.nativeElement.children.length).toEqual(1);
    });
    it('should display the icon and icon to be on the left by default ', function () {
        button.label = 'PrimeNG';
        button.icon = 'pi pi-times';
        fixture.detectChanges();
        var buttonEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-button'));
        expect(buttonEl.nativeElement.className).toContain('ui-button-text-icon-left');
        expect(buttonEl.nativeElement.children[0].className).toContain('ui-button-icon-left');
    });
    it('should display the icon', function () {
        button.icon = 'pi pi-times';
        fixture.detectChanges();
        var buttonEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-button'));
        expect(buttonEl.nativeElement.className).toContain('ui-button-icon-only');
    });
    it('should display the icon on the right and have a label', function () {
        button.label = 'PrimeNG';
        button.icon = 'pi pi-times';
        button.iconPos = 'right';
        fixture.detectChanges();
        var buttonEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-button'));
        expect(buttonEl.nativeElement.className).toContain('ui-button-text-icon-right');
        expect(buttonEl.nativeElement.children[0].className).toContain('ui-button-icon-right');
        expect(buttonEl.nativeElement.children[1].textContent).toContain('PrimeNG');
    });
    it('should display the icon on the right', function () {
        button.icon = 'pi pi-times';
        button.iconPos = 'right';
        fixture.detectChanges();
        var buttonEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-button'));
        expect(buttonEl.nativeElement.className).toContain('ui-button-icon-only');
        expect(buttonEl.nativeElement.children[0].className).toContain('ui-button-icon-right');
    });
    it('should enabled by default', function () {
        fixture.detectChanges();
        var buttonEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-button'));
        expect(buttonEl.nativeElement.className).not.toContain('ui-state-disabled');
    });
    it('should have a empty label and icon', function () {
        fixture.detectChanges();
        var buttonEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-button'));
        expect(buttonEl.nativeElement.className).toContain('ui-button-text-empty');
    });
});
//# sourceMappingURL=button.spec.js.map