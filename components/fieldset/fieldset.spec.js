import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Fieldset } from './fieldset';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('Fieldset', function () {
    var fieldset;
    var fixture;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                Fieldset
            ]
        });
        fixture = TestBed.createComponent(Fieldset);
        fieldset = fixture.componentInstance;
    });
    it('should display the legend', function () {
        fieldset.legend = 'PrimeNG Fieldset Legend';
        fixture.detectChanges();
        var headerEl = fixture.debugElement.query(By.css('.ui-fieldset-legend-text'));
        expect(headerEl.nativeElement.textContent).toContain('PrimeNG Fieldset Legend');
    });
    it('should not render toggle icon when not toggleable', function () {
        fixture.detectChanges();
        var toggleIcon = fixture.debugElement.query(By.css('.ui-fieldset-toggler'));
        expect(toggleIcon).toBeNull();
    });
    it('should render toggle icon when toggleable', function () {
        fieldset.toggleable = true;
        fixture.detectChanges();
        var toggleIcon = fixture.debugElement.query(By.css('.ui-fieldset-toggler'));
        expect(toggleIcon).not.toBeNull();
    });
    it('should toggle the fieldset when toggler is clicked', fakeAsync(function () {
        fieldset.toggleable = true;
        fixture.detectChanges();
        var togglerEl = fixture.nativeElement.querySelector('.ui-fieldset-legend').children[0];
        togglerEl.click();
        expect(fieldset.collapsed).toEqual(true);
        tick(500);
        togglerEl.click();
        expect(fieldset.collapsed).toEqual(false);
    }));
});
//# sourceMappingURL=fieldset.spec.js.map