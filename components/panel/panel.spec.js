import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Panel } from './panel';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('Panel', function () {
    var panel;
    var fixture;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                Panel
            ]
        });
        fixture = TestBed.createComponent(Panel);
        panel = fixture.componentInstance;
    });
    it('should display the header', function () {
        panel.header = 'PrimeNG Panel Header';
        fixture.detectChanges();
        var headerEl = fixture.debugElement.query(By.css('.ui-panel-title'));
        expect(headerEl.nativeElement.textContent).toContain('PrimeNG Panel Header');
    });
    it('should not render toggle icon when not toggleable', function () {
        fixture.detectChanges();
        var togglerEl = fixture.debugElement.query(By.css('.ui-panel-titlebar-toggler'));
        expect(togglerEl).toBeNull();
    });
    it('should render toggle icon when toggleable', function () {
        panel.toggleable = true;
        fixture.detectChanges();
        var togglerEl = fixture.debugElement.query(By.css('.ui-panel-titlebar-toggler'));
        expect(togglerEl).not.toBeNull();
    });
    it('should toggle the panel when toggler is clicked', fakeAsync(function () {
        panel.toggleable = true;
        fixture.detectChanges();
        var togglerEl = fixture.nativeElement.querySelector('.ui-panel-titlebar-toggler');
        togglerEl.click();
        expect(panel.collapsed).toEqual(true);
        tick(500);
        togglerEl.click();
        expect(panel.collapsed).toEqual(false);
    }));
});
//# sourceMappingURL=panel.spec.js.map