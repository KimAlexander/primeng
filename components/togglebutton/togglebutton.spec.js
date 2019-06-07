import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ToggleButton } from './togglebutton';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('ToggleButton', function () {
    var toggleButton;
    var fixture;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                ToggleButton
            ]
        });
        fixture = TestBed.createComponent(ToggleButton);
        toggleButton = fixture.componentInstance;
    });
    it('should display the OFF label when value is undefined', function () {
        toggleButton.offLabel = 'NO';
        fixture.detectChanges();
        var labelEl = fixture.debugElement.query(By.css('.ui-button-text'));
        expect(labelEl.nativeElement.textContent).toBe('NO');
    });
    it('should display the ON label when clicked', function () {
        toggleButton.onLabel = 'YES';
        fixture.detectChanges();
        var clickEl = fixture.nativeElement.querySelector('.ui-togglebutton');
        clickEl.click();
        fixture.detectChanges();
        var labelEl = fixture.debugElement.query(By.css('.ui-button-text'));
        expect(labelEl.nativeElement.textContent).toBe('YES');
    });
    it('Should display as checked when value is true by default', function () {
        toggleButton.checked = true;
        fixture.detectChanges();
        expect(toggleButton.checked).toBe(true);
    });
});
//# sourceMappingURL=togglebutton.spec.js.map