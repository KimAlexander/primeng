"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var menubar_1 = require("./menubar");
var animations_1 = require("@angular/platform-browser/animations");
var testing_2 = require("../../../../node_modules/@angular/router/testing");
describe('Menubar', function () {
    var menubar;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule,
                testing_2.RouterTestingModule.withRoutes([
                    { path: 'test', component: menubar_1.Menubar }
                ])
            ],
            declarations: [
                menubar_1.Menubar,
                menubar_1.MenubarSub
            ]
        });
        fixture = testing_1.TestBed.createComponent(menubar_1.Menubar);
        menubar = fixture.componentInstance;
    });
    it('should created by default', function () {
        fixture.detectChanges();
        var menuEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-menubar'));
        var subMenuEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-menubar-root-list'));
        expect(menuEl).toBeTruthy();
        expect(subMenuEl).toBeTruthy();
    });
    it('should change style and styleClass', function () {
        menubar.style = { 'primeng': 'rocks!' };
        menubar.styleClass = "Primeng ROCKS!";
        fixture.detectChanges();
        var menuEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-menubar'));
        expect(menuEl.nativeElement.className).toContain("Primeng ROCKS!");
        expect(menuEl.nativeElement.style.primeng).toContain("rocks!");
    });
    it('should change autoDisplay baseZIndex and autoZIndex', function () {
        menubar.autoDisplay = false;
        menubar.autoZIndex = false;
        menubar.baseZIndex = 20;
        fixture.detectChanges();
        var subMenu = fixture.debugElement.query(platform_browser_1.By.css('.ui-menubar-root-list')).componentInstance;
        expect(subMenu.baseZIndex).toEqual(20);
        expect(subMenu.autoZIndex).toEqual(false);
        expect(subMenu.autoDisplay).toEqual(false);
        expect(subMenu.autoDisplay).toEqual(menubar.autoDisplay);
        expect(subMenu.autoZIndex).toEqual(menubar.autoZIndex);
        expect(subMenu.baseZIndex).toEqual(menubar.baseZIndex);
    });
    it('should show items', function () {
        menubar.model = [
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                items: [{
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                    },
                    { label: 'Open' },
                    { separator: true },
                    { label: 'Quit' }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    { label: 'Delete', icon: 'pi pi-fw pi-trash' },
                    { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
                ]
            }
        ];
        fixture.detectChanges();
        var menuEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-menubar-root-list'));
        expect(menuEl.children.length).toEqual(menubar.model.length);
        var parentMenuEls = menuEl.queryAll(platform_browser_1.By.css('.ui-menu-parent'));
        var i = 0;
        for (var _i = 0, parentMenuEls_1 = parentMenuEls; _i < parentMenuEls_1.length; _i++) {
            var parentMenu = parentMenuEls_1[_i];
            if (menubar.model[i].label) {
                expect(parentMenu.query(platform_browser_1.By.css('.ui-menuitem-text')).nativeElement.textContent).toEqual(menubar.model[i].label);
            }
            if (menubar.model[i].icon) {
                expect(parentMenu.query(platform_browser_1.By.css('.ui-menuitem-icon')).nativeElement.className).toContain(menubar.model[i].icon);
            }
            i++;
        }
    });
    it('should call onItemMouseEnter and show firstParentMenu', function () {
        menubar.model = [
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                items: [{
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                    },
                    { label: 'Open' },
                    { separator: true },
                    { label: 'Quit' }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    { label: 'Delete', icon: 'pi pi-fw pi-trash' },
                    { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
                ]
            }
        ];
        fixture.detectChanges();
        var parentEls = fixture.debugElement.query(platform_browser_1.By.css('.ui-menubar-root-list')).children;
        var firstParentEl = parentEls[0];
        var secondParentEl = parentEls[1];
        var onItemMouseEnterSpy = spyOn(firstParentEl.componentInstance, 'onItemMouseEnter').and.callThrough();
        firstParentEl.nativeElement.dispatchEvent(new Event('mouseenter'));
        fixture.detectChanges();
        expect(firstParentEl.componentInstance.activeMenu.textContent).toEqual(firstParentEl.nativeElement.textContent);
        expect(firstParentEl.componentInstance.activeItem).toBeTruthy();
        expect(onItemMouseEnterSpy).toHaveBeenCalled();
        expect(firstParentEl.nativeElement.className).toContain('ui-menuitem-active');
        expect(secondParentEl.nativeElement.className).not.toContain('ui-menuitem-active');
    });
    it('should call onItemMouseLeave and close firstParentMenu', testing_1.fakeAsync(function () {
        menubar.model = [
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                items: [{
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                    },
                    { label: 'Open' },
                    { separator: true },
                    { label: 'Quit' }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    { label: 'Delete', icon: 'pi pi-fw pi-trash' },
                    { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
                ]
            }
        ];
        fixture.detectChanges();
        var parentEls = fixture.debugElement.query(platform_browser_1.By.css('.ui-menubar-root-list')).children;
        var firstParentEl = parentEls[0];
        var secondParentEl = parentEls[1];
        var onItemMouseLeaveSpy = spyOn(firstParentEl.componentInstance, 'onItemMouseLeave').and.callThrough();
        firstParentEl.nativeElement.dispatchEvent(new Event('mouseenter'));
        fixture.detectChanges();
        firstParentEl.nativeElement.dispatchEvent(new Event('mouseleave'));
        testing_1.tick(300);
        fixture.detectChanges();
        expect(firstParentEl.componentInstance.activeItem).toEqual(null);
        expect(secondParentEl.componentInstance.activeItem).toEqual(null);
        expect(onItemMouseLeaveSpy).toHaveBeenCalled();
        expect(firstParentEl.nativeElement.className).not.toContain('ui-menuitem-active');
    }));
    it('should call itemClick', function () {
        menubar.model = [
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                items: [{
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                    },
                    { label: 'Open' },
                    { separator: true },
                    { label: 'Quit' }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    { label: 'Delete', icon: 'pi pi-fw pi-trash' },
                    { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
                ]
            }
        ];
        fixture.detectChanges();
        var parentEls = fixture.debugElement.query(platform_browser_1.By.css('.ui-menubar-root-list')).children;
        var firstParentEl = parentEls[0];
        var secondParentEl = parentEls[1];
        var onItemMenuClickSpy = spyOn(firstParentEl.componentInstance, 'onItemMenuClick').and.callThrough();
        var bindEventListenerSpy = spyOn(firstParentEl.componentInstance, 'bindEventListener').and.callThrough();
        firstParentEl.nativeElement.dispatchEvent(new Event('mouseenter'));
        fixture.detectChanges();
        var firstSubmenuList = firstParentEl.query(platform_browser_1.By.css('ul'));
        var firstSubItem = firstSubmenuList.children[0];
        firstSubItem.nativeElement.click();
        fixture.detectChanges();
        expect(onItemMenuClickSpy).toHaveBeenCalled();
        expect(bindEventListenerSpy).not.toHaveBeenCalled();
        expect(firstParentEl.componentInstance.activeItem).toEqual(null);
        expect(secondParentEl.componentInstance.activeItem).toEqual(null);
        expect(firstParentEl.nativeElement.className).not.toContain('ui-menuitem-active');
    });
    it('should call onItemMouseEnter and not show firstParentMenu', function () {
        menubar.model = [
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                items: [{
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                    },
                    { label: 'Open' },
                    { separator: true },
                    { label: 'Quit' }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    { label: 'Delete', icon: 'pi pi-fw pi-trash' },
                    { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
                ]
            }
        ];
        menubar.autoDisplay = false;
        fixture.detectChanges();
        var parentEls = fixture.debugElement.query(platform_browser_1.By.css('.ui-menubar-root-list')).children;
        var firstParentEl = parentEls[0];
        var onItemMouseEnterSpy = spyOn(firstParentEl.componentInstance, 'onItemMouseEnter').and.callThrough();
        firstParentEl.nativeElement.dispatchEvent(new Event('mouseenter'));
        fixture.detectChanges();
        expect(firstParentEl.componentInstance.activeItem).toBeFalsy();
        expect(onItemMouseEnterSpy).toHaveBeenCalled();
        expect(firstParentEl.nativeElement.className).not.toContain('ui-menuitem-active');
    });
    it('should call onItemMouseLeave and not close firstParentMenu', testing_1.fakeAsync(function () {
        menubar.model = [
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                items: [{
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                    },
                    { label: 'Open' },
                    { separator: true },
                    { label: 'Quit' }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    { label: 'Delete', icon: 'pi pi-fw pi-trash' },
                    { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
                ]
            }
        ];
        menubar.autoDisplay = false;
        fixture.detectChanges();
        var parentEls = fixture.debugElement.query(platform_browser_1.By.css('.ui-menubar-root-list')).children;
        var firstParentEl = parentEls[0];
        var onItemMouseLeaveSpy = spyOn(firstParentEl.componentInstance, 'onItemMouseLeave').and.callThrough();
        firstParentEl.nativeElement.click();
        fixture.detectChanges();
        firstParentEl.nativeElement.dispatchEvent(new Event('mouseleave'));
        testing_1.tick(300);
        fixture.detectChanges();
        expect(firstParentEl.componentInstance.activeItem).toBeTruthy();
        expect(onItemMouseLeaveSpy).toHaveBeenCalled();
        expect(firstParentEl.nativeElement.className).toContain('ui-menuitem-active');
    }));
    it('should call itemClick and bindEventListener', function () {
        menubar.model = [
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                items: [{
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                    },
                    { label: 'Open' },
                    { separator: true },
                    { label: 'Quit' }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    { label: 'Delete', icon: 'pi pi-fw pi-trash' },
                    { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
                ]
            }
        ];
        menubar.autoDisplay = false;
        fixture.detectChanges();
        var parentEls = fixture.debugElement.query(platform_browser_1.By.css('.ui-menubar-root-list')).children;
        var firstParentEl = parentEls[0];
        var secondParentEl = parentEls[1];
        var onItemMenuClickSpy = spyOn(firstParentEl.componentInstance, 'onItemMenuClick').and.callThrough();
        var bindEventListenerSpy = spyOn(firstParentEl.componentInstance, 'bindEventListener').and.callThrough();
        firstParentEl.nativeElement.click();
        fixture.detectChanges();
        var firstSubmenuList = firstParentEl.query(platform_browser_1.By.css('ul'));
        var firstSubItem = firstSubmenuList.children[0];
        firstSubItem.nativeElement.click();
        fixture.detectChanges();
        expect(onItemMenuClickSpy).toHaveBeenCalled();
        expect(bindEventListenerSpy).toHaveBeenCalled();
        expect(firstParentEl.componentInstance.activeItem).toBeTruthy();
        expect(secondParentEl.componentInstance.activeItem).toBeTruthy();
        expect(firstParentEl.nativeElement.className).toContain('ui-menuitem-active');
    });
    it('should show router items', function () {
        menubar.model = [
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                items: [{
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: 'test'
                    },
                    { label: 'Open' },
                    { separator: true },
                    { label: 'Quit' }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    { label: 'Delete', icon: 'pi pi-fw pi-trash' },
                    { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
                ]
            }
        ];
        fixture.detectChanges();
        var parentEls = fixture.debugElement.query(platform_browser_1.By.css('.ui-menubar-root-list')).children;
        var firstParentEl = parentEls[0];
        firstParentEl.nativeElement.dispatchEvent(new Event('mouseenter'));
        fixture.detectChanges();
        expect(firstParentEl.componentInstance.activeMenu.textContent).toEqual(firstParentEl.nativeElement.textContent);
        expect(firstParentEl.componentInstance.activeItem).toBeTruthy();
    });
    it('should call itemClick', function () {
        menubar.model = [
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                items: [{
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: 'test'
                    },
                    { label: 'Open' },
                    { separator: true },
                    { label: 'Quit' }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    { label: 'Delete', icon: 'pi pi-fw pi-trash' },
                    { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
                ]
            }
        ];
        fixture.detectChanges();
        var parentEls = fixture.debugElement.query(platform_browser_1.By.css('.ui-menubar-root-list')).children;
        var firstParentEl = parentEls[0];
        firstParentEl.nativeElement.dispatchEvent(new Event('mouseenter'));
        fixture.detectChanges();
        var firstSubmenuList = firstParentEl.query(platform_browser_1.By.css('ul'));
        var firstSubItem = firstSubmenuList.children[0].query(platform_browser_1.By.css('a'));
        var itemClickSpy = spyOn(firstSubItem.componentInstance, 'itemClick').and.callThrough();
        firstSubItem.nativeElement.click();
        fixture.detectChanges();
        expect(itemClickSpy).toHaveBeenCalled();
    });
    it('should change item style and styleClass', function () {
        menubar.model = [
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                style: { 'primeng': 'rocks!' },
                styleClass: "Primeng ROCKS!",
                items: [{
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                    },
                    { label: 'Open' },
                    { separator: true },
                    { label: 'Quit' }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    { label: 'Delete', icon: 'pi pi-fw pi-trash' },
                    { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
                ]
            }
        ];
        fixture.detectChanges();
        var parentEls = fixture.debugElement.query(platform_browser_1.By.css('.ui-menubar-root-list')).children;
        var firstParentEl = parentEls[0];
        firstParentEl.nativeElement.dispatchEvent(new Event('mouseenter'));
        fixture.detectChanges();
        var firstItem = firstParentEl.query(platform_browser_1.By.css('a'));
        expect(firstItem.nativeElement.className).toContain("Primeng ROCKS!");
        expect(firstItem.nativeElement.style.primeng).toContain("rocks!");
    });
    it('should change item disable', function () {
        menubar.model = [
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                disabled: true,
                items: [{
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                    },
                    { label: 'Open' },
                    { separator: true },
                    { label: 'Quit' }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    { label: 'Delete', icon: 'pi pi-fw pi-trash' },
                    { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
                ]
            }
        ];
        fixture.detectChanges();
        var parentEls = fixture.debugElement.query(platform_browser_1.By.css('.ui-menubar-root-list')).children;
        var firstParentEl = parentEls[0];
        firstParentEl.nativeElement.dispatchEvent(new Event('mouseenter'));
        fixture.detectChanges();
        var firstItem = firstParentEl.query(platform_browser_1.By.css('a'));
        expect(firstItem.nativeElement.className).toContain('ui-state-disabled');
    });
});
//# sourceMappingURL=menubar.spec.js.map