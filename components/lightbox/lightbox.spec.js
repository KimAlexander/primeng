"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var lightbox_1 = require("./lightbox");
var animations_1 = require("@angular/platform-browser/animations");
describe('Lightbox', function () {
    var lightbox;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule,
            ],
            declarations: [
                lightbox_1.Lightbox
            ]
        });
        fixture = testing_1.TestBed.createComponent(lightbox_1.Lightbox);
        lightbox = fixture.componentInstance;
        lightbox.images = [];
        lightbox.images.push({ source: 'sopranos1.jpg', thumbnail: 'sopranos1_small.jpg', title: 'Sopranos 1' });
        lightbox.images.push({ source: 'sopranos2.jpg', thumbnail: 'sopranos2_small.jpg', title: 'Sopranos 2' });
        lightbox.images.push({ source: 'sopranos3.jpg', thumbnail: 'sopranos3_small.jpg', title: 'Sopranos 3' });
        lightbox.images.push({ source: 'sopranos4.jpg', thumbnail: 'sopranos4_small.jpg', title: 'Sopranos 4' });
    });
    it('should display by default', function () {
        lightbox.appendTo = 'body';
        fixture.detectChanges();
        var lightboxClickEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        expect(lightboxClickEl.nativeElement).toBeTruthy();
    });
    it('should call imageClick', function () {
        lightbox.appendTo = 'body';
        fixture.detectChanges();
        var imageClickSpy = spyOn(lightbox, "onImageClick").and.callThrough();
        var lightboxClickEl = fixture.debugElement.query(platform_browser_1.By.css('a'));
        lightboxClickEl.nativeElement.click();
        fixture.detectChanges();
        expect(imageClickSpy).toHaveBeenCalled();
    });
    it('should call imageClick', function () {
        lightbox.appendTo = 'body';
        fixture.detectChanges();
        var imageClickSpy = spyOn(lightbox, "onImageClick").and.callThrough();
        var hideSpy = spyOn(lightbox, "hide").and.callThrough();
        var lightboxClickEl = fixture.debugElement.query(platform_browser_1.By.css('a'));
        lightboxClickEl.nativeElement.click();
        fixture.detectChanges();
        expect(imageClickSpy).toHaveBeenCalled();
        document.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(hideSpy).toHaveBeenCalled();
    });
    it('should call next', function () {
        lightbox.appendTo = 'body';
        fixture.detectChanges();
        var imageClickSpy = spyOn(lightbox, "onImageClick").and.callThrough();
        var nextSpy = spyOn(lightbox, "next").and.callThrough();
        var lightboxClickEl = fixture.debugElement.query(platform_browser_1.By.css('a'));
        var nextEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-lightbox-nav-right'));
        lightboxClickEl.nativeElement.click();
        fixture.detectChanges();
        expect(imageClickSpy).toHaveBeenCalled();
        expect(lightbox.index).toEqual(0);
        nextEl.nativeElement.click();
        fixture.detectChanges();
        expect(nextSpy).toHaveBeenCalled();
        expect(lightbox.index).toEqual(1);
    });
    it('should call prev', function () {
        lightbox.appendTo = 'body';
        fixture.detectChanges();
        var imageClickSpy = spyOn(lightbox, "onImageClick").and.callThrough();
        var prevSpy = spyOn(lightbox, "prev").and.callThrough();
        var lightboxClickEl = fixture.debugElement.query(platform_browser_1.By.css('a'));
        var nextEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-lightbox-nav-right'));
        lightboxClickEl.nativeElement.click();
        fixture.detectChanges();
        expect(imageClickSpy).toHaveBeenCalled();
        expect(lightbox.index).toEqual(0);
        nextEl.nativeElement.click();
        fixture.detectChanges();
        var prevEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-lightbox-nav-left'));
        expect(lightbox.index).toEqual(1);
        prevEl.nativeElement.click();
        fixture.detectChanges();
        expect(prevSpy).toHaveBeenCalled();
        expect(lightbox.index).toEqual(0);
    });
});
//# sourceMappingURL=lightbox.spec.js.map