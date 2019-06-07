import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Carousel } from './carousel';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('Carousel', function () {
    var carousel;
    var fixture;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                Carousel
            ]
        });
        fixture = TestBed.createComponent(Carousel);
        carousel = fixture.componentInstance;
        carousel.value = [
            { vin: 'r3278r2', year: 2010, brand: 'Audi', color: 'Black' },
            { vin: 'jhto2g2', year: 2015, brand: 'BMW', color: 'White' },
            { vin: 'h453w54', year: 2012, brand: 'Honda', color: 'Blue' },
            { vin: 'g43gwwg', year: 1998, brand: 'Renault', color: 'White' },
            { vin: 'gf45wg5', year: 2011, brand: 'VW', color: 'Red' },
            { vin: 'bhv5y5w', year: 2015, brand: 'Jaguar', color: 'Blue' },
            { vin: 'ybw5fsd', year: 2012, brand: 'Ford', color: 'Yellow' },
            { vin: '45665e5', year: 2011, brand: 'Mercedes', color: 'Brown' },
            { vin: 'he6sb5v', year: 2015, brand: 'Ford', color: 'Black' }
        ];
    });
    it('should created by default', function () {
        fixture.detectChanges();
        var containerEl = fixture.debugElement.query(By.css('.ui-carousel'));
        expect(containerEl.nativeElement).toBeTruthy();
    });
    it('should create 9 elements', function () {
        fixture.detectChanges();
        var containerEl = fixture.debugElement.queryAll(By.css('.ui-carousel-item'));
        expect(containerEl.length).toEqual(9);
    });
    it('should call the onNextNav (circular)', function () {
        carousel.circular = true;
        fixture.detectChanges();
        var onNextNavSpy = spyOn(carousel, "onNextNav").and.callThrough();
        var nextEl = fixture.debugElement.query(By.css('.ui-carousel-next-button'));
        expect(carousel.page).toEqual(0);
        nextEl.nativeElement.click();
        fixture.detectChanges();
        expect(onNextNavSpy).toHaveBeenCalled();
        expect(carousel.page).toEqual(1);
        nextEl.nativeElement.click();
        nextEl.nativeElement.click();
        fixture.detectChanges();
        expect(carousel.page).toEqual(0);
    });
    it('should call the onPrevNav (circular)', function () {
        carousel.circular = true;
        fixture.detectChanges();
        var onPrevNavSpy = spyOn(carousel, "onPrevNav").and.callThrough();
        var prevEl = fixture.debugElement.query(By.css('.ui-carousel-prev-button'));
        expect(carousel.page).toEqual(0);
        prevEl.nativeElement.click();
        fixture.detectChanges();
        expect(onPrevNavSpy).toHaveBeenCalled();
        expect(carousel.page).toEqual(2);
        prevEl.nativeElement.click();
        fixture.detectChanges();
        expect(carousel.page).toEqual(1);
    });
    it('should call the setPageWithLink', function () {
        carousel.circular = true;
        fixture.detectChanges();
        var setPageWithLinkSpy = spyOn(carousel, "setPageWithLink").and.callThrough();
        var linkEls = fixture.debugElement.queryAll(By.css('.ui-carousel-page-link'));
        var secondPage = linkEls[1];
        secondPage.nativeElement.click();
        fixture.detectChanges();
        expect(setPageWithLinkSpy).toHaveBeenCalled();
        expect(carousel.page).toEqual(1);
    });
    it('should call updateState when window resize', function () {
        fixture.detectChanges();
        expect(carousel.totalPages).toEqual(3);
        window.innerWidth = 490;
        var updateStateSpy = spyOn(carousel, "updateState").and.callThrough();
        window.dispatchEvent(new Event("resize"));
        fixture.detectChanges();
        expect(carousel.totalPages).toEqual(9);
        expect(updateStateSpy).toHaveBeenCalled();
        window.dispatchEvent(new Event("resize"));
        fixture.detectChanges();
        window.innerWidth = 1000;
        window.dispatchEvent(new Event("resize"));
        fixture.detectChanges();
        expect(carousel.totalPages).toEqual(3);
    });
    it('should show with autoPlay', function (done) {
        carousel.autoplayInterval = 100;
        fixture.detectChanges();
        expect(carousel.page).toEqual(0);
        fixture.detectChanges();
        setTimeout(function () {
            expect(carousel.page).toEqual(1);
            done();
        }, 102);
    });
});
//# sourceMappingURL=carousel.spec.js.map