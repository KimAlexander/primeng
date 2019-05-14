"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var sidebar_1 = require("./sidebar");
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("@angular/core");
var TestSideBarComponent = /** @class */ (function () {
    function TestSideBarComponent() {
    }
    TestSideBarComponent = __decorate([
        core_1.Component({
            template: "<p-sidebar [(visible)]=\"visibleSidebar1\">\n  <h1 style=\"font-weight:normal\">Full Screen Sidebar</h1>\n  <button type=\"button\" (click)=\"visibleSidebar1 = false\" label=\"Save\" class=\"ui-button-success\"></button>\n  <button type=\"button\" (click)=\"visibleSidebar1 = false\" label=\"Cancel\" class=\"ui-button-secondary\"></button>\n  </p-sidebar>\n  <button type=\"button\" (click)=\"visibleSidebar1 = true\" icon=\"pi pi-arrow-right\"></button>"
        })
    ], TestSideBarComponent);
    return TestSideBarComponent;
}());
describe('Sidebar', function () {
    var sidebar;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                sidebar_1.Sidebar,
                TestSideBarComponent
            ],
        });
        fixture = testing_1.TestBed.createComponent(TestSideBarComponent);
        sidebar = fixture.debugElement.query(platform_browser_1.By.css('p-sidebar')).componentInstance;
    });
    it('should change style and styleClass', function () {
        sidebar.style = { 'primeng': 'rocks!' };
        sidebar.styleClass = "Primeng rocks!";
        fixture.detectChanges();
        var containerEl = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
        expect(containerEl.className).toContain("Primeng rocks!");
        expect(containerEl.style.primeng).toContain('rocks!');
    });
    it('should not show icon', function () {
        sidebar.showCloseIcon = false;
        fixture.detectChanges();
        var closeEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-sidebar-close'));
        expect(closeEl).toBeFalsy();
    });
    it('should set positions', function () {
        fixture.detectChanges();
        var containerEl = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
        expect(containerEl.className).toContain('ui-sidebar-left');
        sidebar.position = 'right';
        fixture.detectChanges();
        expect(containerEl.className).toContain('ui-sidebar-right');
        sidebar.position = 'bottom';
        fixture.detectChanges();
        expect(containerEl.className).toContain('ui-sidebar-bottom');
        sidebar.position = 'top';
        fixture.detectChanges();
        expect(containerEl.className).toContain('ui-sidebar-top');
    });
    it('should open', function () {
        var buttonEl = fixture.debugElement.children[1].nativeElement;
        var sidebarOpenSpy = spyOn(sidebar, 'show').and.callThrough();
        buttonEl.click();
        fixture.detectChanges();
        var containerEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        expect(containerEl.nativeElement.style.opacity).toEqual('1');
        expect(sidebarOpenSpy).toHaveBeenCalled();
    });
    it('should open fullscreen', function () {
        sidebar.fullScreen = true;
        var buttonEl = fixture.debugElement.children[1].nativeElement;
        var sidebarOpenSpy = spyOn(sidebar, 'show').and.callThrough();
        buttonEl.click();
        fixture.detectChanges();
        var containerEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        expect(containerEl.nativeElement.style.opacity).toEqual('1');
        expect(sidebarOpenSpy).toHaveBeenCalled();
        expect(containerEl.nativeElement.className).toContain('ui-sidebar-full');
    });
    it('should close', function () {
        var buttonEl = fixture.debugElement.children[1].nativeElement;
        var sidebarCloseSpy = spyOn(sidebar, 'close').and.callThrough();
        buttonEl.click();
        fixture.detectChanges();
        var closeEl = fixture.debugElement.query(platform_browser_1.By.css('div')).query(platform_browser_1.By.css('a')).nativeElement;
        closeEl.click();
        fixture.detectChanges();
        var containerEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        expect(containerEl.nativeElement.style.opacity).toBeFalsy();
        expect(sidebarCloseSpy).toHaveBeenCalled();
    });
    it('should listen emitters', function () {
        fixture.detectChanges();
        var buttonEl = fixture.debugElement.children[1].nativeElement;
        var visibleChangeCount = 0;
        var visibleOption;
        sidebar.onShow.subscribe(function (value) { return visibleOption = "visible"; });
        sidebar.onHide.subscribe(function (value) { return visibleOption = "hide"; });
        sidebar.visibleChange.subscribe(function (value) { return visibleChangeCount++; });
        buttonEl.click();
        fixture.detectChanges();
        expect(visibleOption).toEqual("visible");
        expect(visibleChangeCount).toEqual(0);
        var closeEl = fixture.debugElement.query(platform_browser_1.By.css('div')).query(platform_browser_1.By.css('a')).nativeElement;
        closeEl.click();
        fixture.detectChanges();
        expect(visibleOption).toEqual("hide");
        expect(visibleChangeCount).toEqual(1);
    });
    it('should not use modal', function () {
        sidebar.modal = false;
        var buttonEl = fixture.debugElement.children[1].nativeElement;
        var enableModalitySpy = spyOn(sidebar, 'enableModality').and.callThrough();
        buttonEl.click();
        fixture.detectChanges();
        expect(enableModalitySpy).not.toHaveBeenCalled();
        expect(sidebar.mask).toEqual(undefined);
        var disableModalitySpy = spyOn(sidebar, 'disableModality').and.callThrough();
        var closeEl = fixture.debugElement.query(platform_browser_1.By.css('div')).query(platform_browser_1.By.css('a')).nativeElement;
        closeEl.click();
        fixture.detectChanges();
        expect(enableModalitySpy).not.toHaveBeenCalled();
        expect(sidebar.mask).toEqual(undefined);
    });
});
//# sourceMappingURL=sidebar.spec.js.map