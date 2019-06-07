var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OverlayPanel } from './overlaypanel';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
var TestOverlayPanelComponent = /** @class */ (function () {
    function TestOverlayPanelComponent() {
    }
    TestOverlayPanelComponent.prototype.outSideClick = function () {
    };
    TestOverlayPanelComponent = __decorate([
        Component({
            template: "<button type=\"text\" (click)=\"op1.toggle($event)\"></button>\n  <p-overlayPanel #op1>\n      <img src=\"assets/showcase/images/demo/galleria/galleria1.jpg\" alt=\"Galleria 1\" />\n  </p-overlayPanel>\n  <a (click)=\"outSideClick()\"></a>\n  "
        })
    ], TestOverlayPanelComponent);
    return TestOverlayPanelComponent;
}());
describe('OverlayPanel', function () {
    var overlaypanel;
    var fixture;
    beforeEach(function () {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                OverlayPanel,
                TestOverlayPanelComponent
            ],
        });
        fixture = TestBed.createComponent(TestOverlayPanelComponent);
        overlaypanel = fixture.debugElement.query(By.css('p-overlayPanel')).componentInstance;
    });
    it('should change style and styleClass', function () {
        overlaypanel.style = { 'primeng': 'rocks!' };
        overlaypanel.styleClass = "Primeng rocks!";
        var buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
        buttonEl.click();
        fixture.detectChanges();
        var containerEl = fixture.debugElement.query(By.css('div')).nativeElement;
        expect(containerEl.className).toContain("Primeng rocks!");
        expect(containerEl.style.primeng).toContain('rocks!');
    });
    it('should show icon', function () {
        overlaypanel.showCloseIcon = true;
        var buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
        buttonEl.click();
        fixture.detectChanges();
        var closeEl = fixture.debugElement.query(By.css('a'));
        expect(closeEl).toBeTruthy();
    });
    it('should open', function () {
        overlaypanel.showCloseIcon = true;
        var buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
        var toggleSpy = spyOn(overlaypanel, 'toggle').and.callThrough();
        buttonEl.click();
        fixture.detectChanges();
        var overlaypanelEl = fixture.debugElement.query(By.css('div'));
        expect(toggleSpy).toHaveBeenCalled();
        expect(overlaypanelEl).toBeTruthy();
    });
    it('should close', function () {
        overlaypanel.showCloseIcon = true;
        var buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
        var closeSpy = spyOn(overlaypanel, 'onCloseClick').and.callThrough();
        var overlaypanelEl = fixture.debugElement.query(By.css('div'));
        buttonEl.click();
        fixture.detectChanges();
        var closeEl = fixture.debugElement.query(By.css('div')).query(By.css('a')).nativeElement;
        closeEl.click();
        fixture.detectChanges();
        expect(closeSpy).toHaveBeenCalled();
        expect(overlaypanelEl).toBeFalsy();
    });
    it('should close when outside click', function () {
        overlaypanel.showCloseIcon = true;
        var buttonEl = fixture.debugElement.query(By.css('button')).nativeElement;
        var hide = spyOn(overlaypanel, 'hide').and.callThrough();
        var overlaypanelEl = fixture.debugElement.query(By.css('div'));
        buttonEl.click();
        fixture.detectChanges();
        var outsideEl = fixture.debugElement.query(By.css('a')).nativeElement;
        outsideEl.click();
        fixture.detectChanges();
        expect(hide).toHaveBeenCalled();
        expect(overlaypanelEl).toBeFalsy();
    });
});
//# sourceMappingURL=overlaypanel.spec.js.map