import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Rating } from './rating';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('Rating', function () {
    var rating;
    var fixture;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                Rating
            ]
        });
        fixture = TestBed.createComponent(Rating);
        rating = fixture.componentInstance;
    });
    it('should display 5 stars by default', function () {
        fixture.detectChanges();
        var starEl = fixture.debugElement.query(By.css('div')).nativeElement;
        expect(starEl.children.length).toEqual(6);
    });
    it('should display 10 stars ', function () {
        rating.stars = 10;
        fixture.detectChanges();
        var starEl = fixture.debugElement.query(By.css('div')).nativeElement;
        expect(starEl.children.length).toEqual(11);
    });
    it('should ignore cancel ', function () {
        rating.cancel = false;
        fixture.detectChanges();
        var starEl = fixture.debugElement.query(By.css('div')).nativeElement;
        expect(starEl.children.length).toEqual(5);
    });
    it('should disabled', function () {
        rating.disabled = true;
        fixture.detectChanges();
        var starEl = fixture.debugElement.query(By.css('div')).nativeElement;
        expect(starEl.className).toContain('ui-state-disabled');
    });
    it('should change styles and icons', function () {
        rating.value = 2;
        rating.iconOnClass = "icon on";
        rating.iconOffClass = "icon off";
        rating.iconCancelClass = "Primeng Rocks!";
        rating.iconOnStyle = { 'icon': 'on' };
        rating.iconOffStyle = { 'icon': 'off' };
        rating.iconCancelStyle = { 'primeng': 'rocks!' };
        fixture.detectChanges();
        var starElements = fixture.debugElement.queryAll(By.css('span'));
        expect(starElements[0].nativeElement.className).toContain('Primeng Rocks!');
        expect(starElements[1].nativeElement.className).toContain('icon on');
        expect(starElements[3].nativeElement.className).toContain('icon off');
        expect(starElements[0].nativeElement.style.primeng).toContain('rocks');
        expect(starElements[1].nativeElement.style.icon).toContain('on');
        expect(starElements[3].nativeElement.style.icon).toContain('off');
    });
    it('should value 3', function () {
        fixture.detectChanges();
        var thirdStarEl = fixture.debugElement.queryAll(By.css('a'))[3].nativeElement;
        thirdStarEl.click();
        fixture.detectChanges();
        expect(rating.value).toEqual(3);
    });
    it('should get value from event emitters', function () {
        fixture.detectChanges();
        var onRateValue;
        var onCancelRate;
        var thirdStarEl = fixture.debugElement.queryAll(By.css('a'))[3].nativeElement;
        var cancelEl = fixture.debugElement.queryAll(By.css('a'))[0].nativeElement;
        rating.onRate.subscribe(function (value) { return onRateValue = value; });
        rating.onCancel.subscribe(function (value) { return onCancelRate = value; });
        thirdStarEl.click();
        cancelEl.click();
        fixture.detectChanges();
        expect(onRateValue.value).toEqual(3);
        expect(onCancelRate).toBeTruthy();
    });
    it('should clear value', function () {
        fixture.detectChanges();
        var thirdStarEl = fixture.debugElement.queryAll(By.css('a'))[3].nativeElement;
        var cancelEl = fixture.debugElement.queryAll(By.css('a'))[0].nativeElement;
        thirdStarEl.click();
        cancelEl.click();
        fixture.detectChanges();
        expect(rating.value).toEqual(null);
    });
});
//# sourceMappingURL=rating.spec.js.map