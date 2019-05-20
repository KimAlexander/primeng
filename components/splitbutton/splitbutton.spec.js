"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var splitbutton_1 = require("./splitbutton");
var animations_1 = require("@angular/platform-browser/animations");
var button_1 = require("../button/button");
var testing_2 = require("../../../../node_modules/@angular/router/testing");
describe('SplitButton', function () {
    var splitbutton;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule,
                testing_2.RouterTestingModule,
                button_1.ButtonModule
            ],
            declarations: [
                splitbutton_1.SplitButton,
            ],
        });
        fixture = testing_1.TestBed.createComponent(splitbutton_1.SplitButton);
        splitbutton = fixture.componentInstance;
    });
    it('should open dropdown menu when click dropdown button and call onDropdownButtonClick', function () {
        var dropDownEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-splitbutton-menubutton')).nativeElement;
        var dropdownClickSpy = spyOn(splitbutton, 'onDropdownButtonClick').and.callThrough();
        var showSpy = spyOn(splitbutton, 'show').and.callThrough();
        dropDownEl.click();
        fixture.detectChanges();
        var dropdownMenuEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-menu-dynamic')).nativeElement;
        expect(splitbutton.dropdownClick).toEqual(true);
        expect(splitbutton.overlayVisible).toEqual(true);
        expect(dropdownClickSpy).toHaveBeenCalled();
        expect(showSpy).toHaveBeenCalled();
        expect(dropdownMenuEl).toBeTruthy();
    });
    it('should close dropdown menu when click dropdown button and call onDropdownButtonClick', function () {
        var dropDownEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-splitbutton-menubutton')).nativeElement;
        var dropdownClickSpy = spyOn(splitbutton, 'onDropdownButtonClick').and.callThrough();
        var showSpy = spyOn(splitbutton, 'show').and.callThrough();
        dropDownEl.click();
        dropDownEl.click();
        fixture.detectChanges();
        var dropdownMenuEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-menu-dynamic'));
        expect(splitbutton.dropdownClick).toEqual(true);
        expect(splitbutton.overlayVisible).toEqual(false);
        expect(dropdownClickSpy).toHaveBeenCalledTimes(2);
        expect(showSpy).toHaveBeenCalledTimes(2);
        expect(dropdownMenuEl).toBeFalsy();
    });
    it('should close dropdown menu when click dropdown menu item and call itemClick', function () {
        splitbutton.model = [{ label: 'Update', icon: 'fa fa-refresh', command: function () { } }];
        var dropDownEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-splitbutton-menubutton')).nativeElement;
        var itemClickSpy = spyOn(splitbutton, 'itemClick').and.callThrough();
        dropDownEl.click();
        fixture.detectChanges();
        var menuEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-menuitem')).children[0].nativeElement;
        menuEl.click();
        fixture.detectChanges();
        var dropdownMenuEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-menu-dynamic'));
        expect(itemClickSpy).toHaveBeenCalled();
        expect(splitbutton.overlayVisible).toEqual(false);
        expect(dropdownMenuEl).toBeFalsy();
    });
    it('should disabled and not called onDropdownButtonClick & show', function () {
        splitbutton.disabled = true;
        var dropdownClickSpy = spyOn(splitbutton, 'onDropdownButtonClick').and.callThrough();
        var showSpy = spyOn(splitbutton, 'show').and.callThrough();
        fixture.detectChanges();
        var defaultButtonEl = fixture.debugElement.query(platform_browser_1.By.css('button')).nativeElement;
        var dropdownEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-splitbutton-menubutton')).nativeElement;
        var containerEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-splitbutton')).nativeElement;
        defaultButtonEl.click();
        dropdownEl.click();
        fixture.detectChanges();
        expect(containerEl.className).toContain("ui-state-disabled");
        expect(dropdownEl.disabled).toBeTruthy();
        expect(defaultButtonEl.disabled).toBeTruthy();
        expect(dropdownClickSpy).not.toHaveBeenCalled();
        expect(showSpy).not.toHaveBeenCalled();
    });
    it('should add label and change icon and iconPosition', function () {
        splitbutton.label = "Primeng ROCKS!";
        splitbutton.icon = "Primeng ROCKS!";
        splitbutton.iconPos = "right";
        fixture.detectChanges();
        var defaultButton = fixture.debugElement.query(platform_browser_1.By.css('button'));
        expect(defaultButton.attributes["ng-reflect-icon"]).toEqual("Primeng ROCKS!");
        expect(defaultButton.attributes["ng-reflect-label"]).toEqual("Primeng ROCKS!");
        expect(defaultButton.attributes["ng-reflect-icon-pos"]).toEqual("right");
    });
    it('should change style and styleClass', function () {
        splitbutton.style = { 'primeng': 'rock' };
        splitbutton.styleClass = "Primeng ROCKS!";
        fixture.detectChanges();
        var containerEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-splitbutton')).nativeElement;
        expect(containerEl.className).toContain("Primeng ROCKS!");
        expect(containerEl.style.primeng).toContain("rock");
    });
    it('should change menuStyle and stylemenuStyleClassClass', function () {
        splitbutton.menuStyle = { 'primeng': 'rock' };
        splitbutton.menuStyleClass = "Primeng ROCKS!";
        fixture.detectChanges();
        var dropdownEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-splitbutton-menubutton')).nativeElement;
        dropdownEl.click();
        fixture.detectChanges();
        var containerEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-menu')).nativeElement;
        expect(containerEl.className).toContain("Primeng ROCKS!");
        expect(containerEl.style.primeng).toContain("rock");
    });
    it('should change directon of elements', function () {
        splitbutton.dir = "ltr";
        fixture.detectChanges();
        var dropdownButton = fixture.debugElement.query(platform_browser_1.By.css('.ui-splitbutton-menubutton'));
        var defaultButton = fixture.debugElement.query(platform_browser_1.By.css('button'));
        expect(defaultButton.attributes["ng-reflect-corner-style-class"]).toEqual("ui-corner-left");
        expect(dropdownButton.attributes["ng-reflect-corner-style-class"]).toEqual("ui-corner-right");
    });
    it('should have a tabindex', function () {
        splitbutton.tabindex = 1;
        fixture.detectChanges();
        var defaultButton = fixture.debugElement.query(platform_browser_1.By.css('button'));
        expect(defaultButton.nativeElement.tabIndex).toEqual(1);
    });
});
//# sourceMappingURL=splitbutton.spec.js.map