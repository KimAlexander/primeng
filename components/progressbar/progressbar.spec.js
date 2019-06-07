import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProgressBar } from './progressbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('ProgressBar', function () {
    var progressbar;
    var fixture;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                ProgressBar
            ]
        });
        fixture = TestBed.createComponent(ProgressBar);
        progressbar = fixture.componentInstance;
    });
    it('should fill %50', function () {
        progressbar.value = 50;
        fixture.detectChanges();
        var progressbarValueEl = fixture.debugElement.query(By.css('.ui-progressbar-value')).nativeElement;
        var progressbarLabelEl = fixture.debugElement.query(By.css('.ui-progressbar-label')).nativeElement;
        expect(progressbarValueEl.style.width).toEqual('50%');
        expect(progressbarLabelEl.textContent).toEqual('50%');
    });
    it('should not show value', function () {
        progressbar.value = 50;
        progressbar.showValue = false;
        fixture.detectChanges();
        var progressbarValueEl = fixture.debugElement.query(By.css('.ui-progressbar-value')).nativeElement;
        var progressbarLabelEl = fixture.debugElement.query(By.css('.ui-progressbar-label'));
        expect(progressbarValueEl.style.width).toEqual('50%');
        expect(progressbarLabelEl).toBeFalsy();
    });
    it('should change style and styleClass', function () {
        progressbar.value = 50;
        progressbar.style = { 'primeng': 'rocks' };
        progressbar.styleClass = "Primeng";
        fixture.detectChanges();
        var progressbarEl = fixture.debugElement.query(By.css('div')).nativeElement;
        expect(progressbarEl.style.primeng).toEqual('rocks');
        expect(progressbarEl.className).toContain('Primeng');
    });
    it('should change unit', function () {
        progressbar.value = 50;
        progressbar.unit = '&';
        fixture.detectChanges();
        var progressbarLabelEl = fixture.debugElement.query(By.css('.ui-progressbar-label')).nativeElement;
        expect(progressbarLabelEl.textContent).toEqual('50&');
    });
    it('should change mode', function () {
        progressbar.value = 50;
        progressbar.mode = 'indeterminate';
        fixture.detectChanges();
        var progressbarLabelEl = fixture.debugElement.query(By.css('div')).nativeElement;
        expect(progressbarLabelEl.className).toContain('ui-progressbar-indeterminate');
    });
});
//# sourceMappingURL=progressbar.spec.js.map