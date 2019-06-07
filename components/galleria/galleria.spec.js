import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Galleria } from './galleria';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('Galleria', function () {
    var galleria;
    var fixture;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                Galleria
            ]
        });
        fixture = TestBed.createComponent(Galleria);
        galleria = fixture.componentInstance;
        galleria.images = [];
        galleria.images.push({ source: 'galleria1.jpg', alt: 'Description for Image 1', title: 'Title 1' });
        galleria.images.push({ source: 'galleria1.jpg', alt: 'Description for Image 2', title: 'Title 2' });
        galleria.images.push({ source: 'galleria1.jpg', alt: 'Description for Image 3', title: 'Title 3' });
        galleria.images.push({ source: 'galleria1.jpg', alt: 'Description for Image 4', title: 'Title 4' });
        galleria.images.push({ source: 'galleria1.jpg', alt: 'Description for Image 5', title: 'Title 5' });
    });
    it('should created', function () {
        fixture.detectChanges();
        var galleriaEl = fixture.debugElement.query(By.css('.ui-galleria'));
        expect(galleriaEl.nativeElement).toBeTruthy();
    });
    it('should call next after 100ms', function (done) {
        var nextSpy = spyOn(galleria, "next").and.callThrough();
        galleria.transitionInterval = 100;
        fixture.detectChanges();
        setTimeout(function () {
            expect(nextSpy).toHaveBeenCalled();
            done();
        }, 300);
    });
    it('should call clickNavRight and change the activeIndex', function () {
        fixture.detectChanges();
        expect(galleria.activeIndex).toEqual(0);
        var rightButton = fixture.debugElement.query(By.css('.pi-chevron-right'));
        var clickNavRightSpy = spyOn(galleria, "clickNavRight").and.callThrough();
        rightButton.nativeElement.click();
        fixture.detectChanges();
        expect(clickNavRightSpy).toHaveBeenCalled();
        expect(galleria.activeIndex).toEqual(1);
    });
    it('should call clickNavLeft and change the activeIndex', function () {
        fixture.detectChanges();
        expect(galleria.activeIndex).toEqual(0);
        var rightButton = fixture.debugElement.query(By.css('.pi-chevron-right'));
        var clickNavLeftSpy = spyOn(galleria, "clickNavLeft").and.callThrough();
        rightButton.nativeElement.click();
        fixture.detectChanges();
        var leftButton = fixture.debugElement.query(By.css('.pi-chevron-left'));
        leftButton.nativeElement.click();
        fixture.detectChanges();
        expect(clickNavLeftSpy).toHaveBeenCalled();
        expect(galleria.activeIndex).toEqual(0);
    });
    it('should emit imageClickEvent', function () {
        fixture.detectChanges();
        var x = 0;
        galleria.onImageClicked.subscribe(function (event) {
            x = 1;
        });
        var imageEl = fixture.debugElement.query(By.css('.ui-galleria-panel'));
        var clickNavLeftSpy = spyOn(galleria, "clickNavLeft").and.callThrough();
        imageEl.nativeElement.click();
        fixture.detectChanges();
        expect(x).toEqual(1);
    });
});
//# sourceMappingURL=galleria.spec.js.map