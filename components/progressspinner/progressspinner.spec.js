import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProgressSpinner } from './progressspinner';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('ProgressSpinner', function () {
    var progressspinner;
    var fixture;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                ProgressSpinner
            ]
        });
        fixture = TestBed.createComponent(ProgressSpinner);
        progressspinner = fixture.componentInstance;
    });
    it('should created by default', function () {
        fixture.detectChanges();
        var progressSpinnerEl = fixture.debugElement.query(By.css('.ui-progress-spinner'));
        expect(progressSpinnerEl.nativeElement).toBeTruthy();
    });
    it('should get style and styleClass', function () {
        progressspinner.style = { 'primeng': 'rocks' };
        progressspinner.styleClass = "PrimeNG ROCKS!";
        fixture.detectChanges();
        var progressSpinnerEl = fixture.debugElement.query(By.css('.ui-progress-spinner'));
        expect(progressSpinnerEl.nativeElement.className).toContain("PrimeNG ROCKS!");
        expect(progressSpinnerEl.nativeElement.style.primeng).toEqual("rocks");
    });
});
//# sourceMappingURL=progressspinner.spec.js.map