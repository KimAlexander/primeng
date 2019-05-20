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
var menu_1 = require("./menu");
var animations_1 = require("@angular/platform-browser/animations");
var testing_2 = require("@angular/router/testing");
var core_1 = require("@angular/core");
var button_1 = require("../button/button");
var TestMenuComponent = /** @class */ (function () {
    function TestMenuComponent() {
    }
    TestMenuComponent = __decorate([
        core_1.Component({
            template: "<p-menu #menu></p-menu>\n  <button type=\"button\" pButton icon=\"pi pi-bars\" label=\"Show\" (click)=\"menu.toggle($event)\"></button>\n  "
        })
    ], TestMenuComponent);
    return TestMenuComponent;
}());
describe('Menu', function () {
    var menu;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule,
                testing_2.RouterTestingModule
            ],
            declarations: [
                menu_1.Menu,
                menu_1.MenuItemContent,
                TestMenuComponent,
                button_1.Button
            ]
        });
        fixture = testing_1.TestBed.createComponent(TestMenuComponent);
        menu = fixture.debugElement.children[0].componentInstance;
    });
    it('should display by default', function () {
        fixture.detectChanges();
        var containerEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-menu'));
        expect(containerEl).toBeTruthy();
    });
    it('should not display container', function () {
        menu.popup = true;
        fixture.detectChanges();
        var containerEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-menu'));
        expect(containerEl).toBeFalsy();
    });
    it('should change style and styleClass', function () {
        menu.style = { 'primeng': 'rocks!' };
        menu.styleClass = "Primeng ROCKS!";
        fixture.detectChanges();
        var containerEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-menu'));
        expect(containerEl.nativeElement.className).toContain("Primeng ROCKS!");
        expect(containerEl.nativeElement.className).toContain(menu.styleClass);
        expect(containerEl.nativeElement.style.primeng).toEqual(menu.style.primeng);
        expect(containerEl.nativeElement.style.primeng).toEqual("rocks!");
    });
    it('should call hasSubMenu and return false', function () {
        var hasSubMenuSpy = spyOn(menu, 'hasSubMenu').and.callThrough();
        menu.model = [{
                label: 'File',
            }];
        fixture.detectChanges();
        expect(hasSubMenuSpy).toHaveBeenCalled();
        expect(menu.hasSubMenu()).toEqual(false);
    });
    it('should call hasSubMenu and return true', function () {
        var hasSubMenuSpy = spyOn(menu, 'hasSubMenu').and.callThrough();
        menu.model = [{
                label: 'File',
                items: [
                    { label: 'New', icon: 'pi pi-fw pi-plus' },
                    { label: 'Download', icon: 'pi pi-fw pi-download' }
                ]
            }];
        fixture.detectChanges();
        expect(hasSubMenuSpy).toHaveBeenCalled();
        expect(menu.hasSubMenu()).toEqual(true);
    });
    it('should show items', function () {
        menu.model = [{
                label: 'File',
                items: [
                    { label: 'New', icon: 'pi pi-fw pi-plus' },
                    { label: 'Download', icon: 'pi pi-fw pi-download' }
                ]
            }];
        fixture.detectChanges();
        var itemsEl = fixture.debugElement.queryAll(platform_browser_1.By.css('a'));
        expect(itemsEl.length).toEqual(2);
    });
    it('should not show items (menu visible false)', function () {
        menu.model = [{
                label: 'File',
                items: [
                    { label: 'New', icon: 'pi pi-fw pi-plus' },
                    { label: 'Download', icon: 'pi pi-fw pi-download' }
                ],
                visible: false
            }];
        fixture.detectChanges();
        var menuItemsEl = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-menuitem'));
        expect(menuItemsEl.length).toEqual(2);
        for (var _i = 0, menuItemsEl_1 = menuItemsEl; _i < menuItemsEl_1.length; _i++) {
            var menuItem = menuItemsEl_1[_i];
            expect(menuItem.nativeElement.className).toContain("ui-helper-hidden");
        }
    });
    it('should not show items (subMenu visible false)', function () {
        menu.model = [{
                label: 'File',
                items: [
                    { label: 'New', icon: 'pi pi-fw pi-plus', visible: false },
                    { label: 'Download', icon: 'pi pi-fw pi-download', visible: false }
                ]
            }];
        fixture.detectChanges();
        var menuItemsEl = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-menuitem'));
        expect(menuItemsEl.length).toEqual(2);
        for (var _i = 0, menuItemsEl_2 = menuItemsEl; _i < menuItemsEl_2.length; _i++) {
            var menuItem = menuItemsEl_2[_i];
            expect(menuItem.nativeElement.className).toContain("ui-helper-hidden");
        }
    });
    it('should change menuItemStyle and menuItemStyleClass', function () {
        menu.model = [{
                label: 'File',
                items: [
                    { label: 'New', icon: 'pi pi-fw pi-plus', style: { 'primeng': 'rocks!' }, styleClass: "Primeng ROCKS!" },
                    { label: 'Download', icon: 'pi pi-fw pi-download', style: { 'primeng': 'rocks!' }, styleClass: "Primeng ROCKS!" }
                ]
            }];
        fixture.detectChanges();
        var menuItemsEl = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-menuitem'));
        expect(menuItemsEl.length).toEqual(2);
        for (var _i = 0, menuItemsEl_3 = menuItemsEl; _i < menuItemsEl_3.length; _i++) {
            var menuItem = menuItemsEl_3[_i];
            expect(menuItem.nativeElement.className).toContain("Primeng ROCKS!");
            expect(menuItem.nativeElement.style.primeng).toContain("rocks!");
        }
    });
    it('should show seperator', function () {
        menu.model = [{
                label: 'File',
                items: [
                    { label: 'New', icon: 'pi pi-fw pi-plus' },
                    { separator: true },
                    { label: 'Download', icon: 'pi pi-fw pi-download' }
                ]
            }];
        fixture.detectChanges();
        var seperatorEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-menu-separator'));
        var menuItemsEl = fixture.debugElement.queryAll(platform_browser_1.By.css('li'));
        expect(seperatorEl).toBeTruthy();
        expect(menuItemsEl.length).toEqual(4);
    });
    it('should change target title icon and url', function () {
        menu.model = [{
                label: 'File',
                items: [
                    { label: 'New', icon: 'primeng', target: "primeng", title: "primeng", url: "primeng" },
                ]
            }];
        fixture.detectChanges();
        var menuItemLink = fixture.debugElement.query(platform_browser_1.By.css('.ui-menuitem-link'));
        var iconEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-menuitem-icon'));
        expect(menuItemLink.nativeElement.href).toContain("primeng");
        expect(menuItemLink.nativeElement.target).toContain("primeng");
        expect(menuItemLink.nativeElement.title).toContain("primeng");
        expect(iconEl.nativeElement.className).toContain("primeng");
    });
    it('should have a disabled item', function () {
        menu.model = [{
                label: 'File',
                items: [
                    { label: 'New', icon: 'pi pi-fw pi-plus', disabled: true },
                ]
            }];
        fixture.detectChanges();
        var menuItemLink = fixture.debugElement.query(platform_browser_1.By.css('.ui-menuitem-link'));
        expect(menuItemLink.nativeElement.className).toContain("ui-state-disabled");
    });
    it('should call itemClick', function () {
        menu.model = [{
                label: 'File',
                items: [
                    { label: 'New', icon: 'pi pi-fw pi-plus' },
                ]
            }];
        var itemClickSpy = spyOn(menu, 'itemClick').and.callThrough();
        fixture.detectChanges();
        var menuItemLink = fixture.debugElement.query(platform_browser_1.By.css('.ui-menuitem-link'));
        menuItemLink.nativeElement.click();
        expect(itemClickSpy).toHaveBeenCalled();
    });
    it('should use popup and call call toggle', function () {
        menu.popup = true;
        menu.model = [{
                label: 'File',
                items: [
                    { label: 'New', icon: 'pi pi-fw pi-plus' },
                ]
            }];
        fixture.detectChanges();
        var toggleSpy = spyOn(menu, 'toggle').and.callThrough();
        var popupButtonEl = fixture.debugElement.query(platform_browser_1.By.css('button'));
        popupButtonEl.nativeElement.click();
        fixture.detectChanges();
        var containerEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-menu'));
        var headerEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-submenu-header'));
        var menuItem = fixture.debugElement.query(platform_browser_1.By.css('.ui-menuitem-link'));
        expect(toggleSpy).toHaveBeenCalled();
        expect(containerEl).toBeTruthy();
        expect(headerEl).toBeTruthy();
        expect(headerEl.nativeElement.textContent).toEqual("File");
        expect(menuItem).toBeTruthy();
        expect(menuItem.query(platform_browser_1.By.css('.ui-menuitem-text')).nativeElement.textContent).toEqual('New');
    });
    it('should call hide when item click', function () {
        menu.popup = true;
        menu.model = [{
                label: 'File',
                items: [
                    { label: 'New', icon: 'pi pi-fw pi-plus' },
                ]
            }];
        fixture.detectChanges();
        var itemClickSpy = spyOn(menu, 'itemClick').and.callThrough();
        var hideSpy = spyOn(menu, 'hide').and.callThrough();
        var popupButtonEl = fixture.debugElement.query(platform_browser_1.By.css('button'));
        popupButtonEl.nativeElement.click();
        fixture.detectChanges();
        var menuItem = fixture.debugElement.query(platform_browser_1.By.css('.ui-menuitem-link'));
        menuItem.nativeElement.click();
        fixture.detectChanges();
        expect(itemClickSpy).toHaveBeenCalled();
        expect(hideSpy).toHaveBeenCalled();
        expect(menu.visible).toEqual(false);
    });
});
//# sourceMappingURL=menu.spec.js.map