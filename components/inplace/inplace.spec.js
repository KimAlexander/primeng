import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Inplace } from './inplace';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('Inplace', function () {
    var inplace;
    var fixture;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                Inplace
            ]
        });
        fixture = TestBed.createComponent(Inplace);
        inplace = fixture.componentInstance;
    });
    it('should display by default', function () {
        fixture.detectChanges();
        var inplaceEl = fixture.debugElement.query(By.css('div'));
        expect(inplaceEl.nativeElement).toBeTruthy();
    });
    it('should change style styleClass and closable', function () {
        inplace.style = { 'primeng': 'rocks!' };
        inplace.styleClass = "Primeng ROCKS!";
        inplace.closable = true;
        inplace.active = true;
        fixture.detectChanges();
        var inplaceEl = fixture.debugElement.query(By.css('div'));
        var closableButton = fixture.debugElement.query(By.css('button'));
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
        var displayEl = fixture.debugElement.query(By.css('.ui-inplace-display'));
        displayEl.nativeElement.click();
        fixture.detectChanges();
        expect(inplace.active).toEqual(true);
        expect(activateSpy).toHaveBeenCalled();
        var closableButtonEl = fixture.debugElement.query(By.css('button'));
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
        var displayEl = fixture.debugElement.query(By.css('.ui-inplace-display'));
        displayEl.nativeElement.click();
        fixture.detectChanges();
        expect(inplace.active).toEqual(undefined);
        expect(activateSpy).toHaveBeenCalled();
        inplace.active = true;
        fixture.detectChanges();
        var closableButtonEl = fixture.debugElement.query(By.css('button'));
        closableButtonEl.nativeElement.click();
        fixture.detectChanges();
        expect(inplace.active).toEqual(true);
        expect(deactivateSpy).toHaveBeenCalled();
    });
});
//# sourceMappingURL=inplace.spec.js.map