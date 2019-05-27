"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var progressspinner_1 = require("./progressspinner");
var animations_1 = require("@angular/platform-browser/animations");
describe('ProgressSpinner', function () {
    var progressspinner;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                progressspinner_1.ProgressSpinner
            ]
        });
        fixture = testing_1.TestBed.createComponent(progressspinner_1.ProgressSpinner);
        progressspinner = fixture.componentInstance;
    });
    it('should created by default', function () {
        fixture.detectChanges();
        var progressSpinnerEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-progress-spinner'));
        expect(progressSpinnerEl.nativeElement).toBeTruthy();
    });
    it('should get style and styleClass', function () {
        progressspinner.style = { 'primeng': 'rocks' };
        progressspinner.styleClass = "PrimeNG ROCKS!";
        fixture.detectChanges();
        var progressSpinnerEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-progress-spinner'));
        expect(progressSpinnerEl.nativeElement.className).toContain("PrimeNG ROCKS!");
        expect(progressSpinnerEl.nativeElement.style.primeng).toEqual("rocks");
    });
});
//# sourceMappingURL=progressspinner.spec.js.map