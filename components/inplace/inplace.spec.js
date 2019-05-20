"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var inplace_1 = require("./inplace");
var animations_1 = require("@angular/platform-browser/animations");
describe('Inplace', function () {
    var inplace;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                inplace_1.Inplace
            ]
        });
        fixture = testing_1.TestBed.createComponent(inplace_1.Inplace);
        inplace = fixture.componentInstance;
    });
    it('should display by default', function () {
        fixture.detectChanges();
        var inplaceEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        expect(inplaceEl.nativeElement).toBeTruthy();
    });
    it('should change style styleClass and closable', function () {
        inplace.style = { 'primeng': 'rocks!' };
        inplace.styleClass = "Primeng ROCKS!";
        inplace.closable = true;
        inplace.active = true;
        fixture.detectChanges();
        var inplaceEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        var closableButton = fixture.debugElement.query(platform_browser_1.By.css('button'));
        expect(inplaceEl.nativeElement.className).toContain("Primeng ROCKS!");
        expect(inplaceEl.nativeElement.className).toContain("ui-inplace-closable");
        expect(inplaceEl.nativeElement.style.primeng).toContain("rocks!");
        expect(closableButton).toBeTruthy();
    });
    it('should call activate and deactivate', function () {
        inplace.closable = true;
        fixture.detectChanges();
        var activateSpy = spyOn(inplace, 'activate').and.callThrough();
        var deactivateSpy = spyOn(inplace, 'deactivate').and.callThrough();
        var displayEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-inplace-display'));
        displayEl.nativeElement.click();
        fixture.detectChanges();
        expect(inplace.active).toEqual(true);
        expect(activateSpy).toHaveBeenCalled();
        var closableButtonEl = fixture.debugElement.query(platform_browser_1.By.css('button'));
        closableButtonEl.nativeElement.click();
        fixture.detectChanges();
        expect(inplace.active).toEqual(false);
        expect(deactivateSpy).toHaveBeenCalled();
    });
    it('should disabled', function () {
        inplace.closable = true;
        inplace.disabled = true;
        fixture.detectChanges();
        var activateSpy = spyOn(inplace, 'activate').and.callThrough();
        var deactivateSpy = spyOn(inplace, 'deactivate').and.callThrough();
        var displayEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-inplace-display'));
        displayEl.nativeElement.click();
        fixture.detectChanges();
        expect(inplace.active).toEqual(undefined);
        expect(activateSpy).toHaveBeenCalled();
        inplace.active = true;
        fixture.detectChanges();
        var closableButtonEl = fixture.debugElement.query(platform_browser_1.By.css('button'));
        closableButtonEl.nativeElement.click();
        fixture.detectChanges();
        expect(inplace.active).toEqual(true);
        expect(deactivateSpy).toHaveBeenCalled();
    });
});
//# sourceMappingURL=inplace.spec.js.map