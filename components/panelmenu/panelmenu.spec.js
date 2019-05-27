"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var panelmenu_1 = require("./panelmenu");
var animations_1 = require("@angular/platform-browser/animations");
var testing_2 = require("../../../../node_modules/@angular/router/testing");
describe('PanelMenu', function () {
    var panelmenu;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule,
                testing_2.RouterTestingModule
            ],
            declarations: [
                panelmenu_1.PanelMenu,
                panelmenu_1.PanelMenuSub
            ]
        });
        fixture = testing_1.TestBed.createComponent(panelmenu_1.PanelMenu);
        panelmenu = fixture.componentInstance;
    });
    it('should display by default', function () {
        fixture.detectChanges();
        var panelMenuEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-panelmenu'));
        expect(panelMenuEl).toBeTruthy();
    });
    it('should change style and styleClass', function () {
        panelmenu.style = { 'primeng': 'rocks!' };
        panelmenu.styleClass = "Primeng ROCKS!";
        fixture.detectChanges();
        var panelMenuEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-panelmenu'));
        expect(panelMenuEl.nativeElement.className).toContain("Primeng ROCKS!");
        expect(panelMenuEl.nativeElement.style.primeng).toContain("rocks!");
    });
    it('should change item visible ', function () {
        panelmenu.model = [
            {
                label: 'File',
                icon: 'pi pi-pw pi-file',
                items: [{
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            { label: 'User', icon: 'pi pi-fw pi-user-plus' },
                            { label: 'Filter', icon: 'pi pi-fw pi-filter' }
                        ]
                    },
                    { label: 'Open', icon: 'pi pi-fw pi-external-link' },
                    { separator: true },
                    { label: 'Quit', icon: 'pi pi-fw pi-times' }
                ],
                visible: false
            }
        ];
        fixture.detectChanges();
        var panelEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-panelmenu-panel'));
        expect(panelEl.nativeElement.className).toContain("ui-helper-hidden");
    });
    it('should change item style styleClass and disable ', function () {
        panelmenu.model = [
            {
                label: 'File',
                icon: 'pi pi-pw pi-file',
                items: [{
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            { label: 'User', icon: 'pi pi-fw pi-user-plus' },
                            { label: 'Filter', icon: 'pi pi-fw pi-filter' }
                        ]
                    },
                    { label: 'Open', icon: 'pi pi-fw pi-external-link' },
                    { separator: true },
                    { label: 'Quit', icon: 'pi pi-fw pi-times' }
                ],
                style: { 'primeng': 'rocks!' },
                styleClass: "Primeng ROCKS!",
                disabled: true
            }
        ];
        fixture.detectChanges();
        var panelHeaderEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-panelmenu-header'));
        expect(panelHeaderEl.nativeElement.className).toContain("ui-state-disabled");
        expect(panelHeaderEl.nativeElement.className).toContain("Primeng ROCKS!");
        expect(panelHeaderEl.nativeElement.style.primeng).toContain("rocks!");
    });
    it('should change item url target item and title', function () {
        panelmenu.model = [
            {
                label: 'File',
                icon: 'Primeng ROCKS!',
                items: [{
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            { label: 'User', icon: 'pi pi-fw pi-user-plus' },
                            { label: 'Filter', icon: 'pi pi-fw pi-filter' }
                        ]
                    },
                    { label: 'Open', icon: 'pi pi-fw pi-external-link' },
                    { separator: true },
                    { label: 'Quit', icon: 'pi pi-fw pi-times' }
                ],
                title: "primeng",
                target: "primeng",
                url: "primeng",
            }
        ];
        fixture.detectChanges();
        var panelHeaderLinkEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-panelmenu-header-link'));
        expect(panelHeaderLinkEl.nativeElement.href).toContain('primeng');
        expect(panelHeaderLinkEl.nativeElement.title).toEqual('primeng');
        expect(panelHeaderLinkEl.nativeElement.target).toEqual('primeng');
        expect(panelHeaderLinkEl.query(platform_browser_1.By.css('.ui-menuitem-icon')).nativeElement.className).toContain("Primeng ROCKS!");
    });
    it('should change child visible ', function () {
        panelmenu.model = [
            {
                label: 'File',
                icon: 'pi pi-pw pi-file',
                items: [{
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        visible: false
                    },
                    { label: 'Open', icon: 'pi pi-fw pi-external-link', visible: false },
                    { separator: true, visible: false },
                    { label: 'Quit', icon: 'pi pi-fw pi-times', visible: false }
                ],
            }
        ];
        fixture.detectChanges();
        var menuItems = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-menuitem'));
        for (var _i = 0, menuItems_1 = menuItems; _i < menuItems_1.length; _i++) {
            var menuItem = menuItems_1[_i];
            expect(menuItem.nativeElement.className).toContain("ui-helper-hidden");
        }
    });
    it('should change child style and styleClass', function () {
        panelmenu.model = [
            {
                label: 'File',
                icon: 'pi pi-pw pi-file',
                items: [{
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        style: { 'primeng': 'rocks!' },
                        styleClass: "Primeng ROCKS!",
                    },
                    { label: 'Open', icon: 'pi pi-fw pi-external-link', style: { 'primeng': 'rocks!' }, styleClass: "Primeng ROCKS!" },
                    { separator: true },
                    { label: 'Quit', icon: 'pi pi-fw pi-times', style: { 'primeng': 'rocks!' }, styleClass: "Primeng ROCKS!" }
                ],
            }
        ];
        fixture.detectChanges();
        var menuItemLinks = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-menuitem'));
        for (var _i = 0, menuItemLinks_1 = menuItemLinks; _i < menuItemLinks_1.length; _i++) {
            var menuItemLink = menuItemLinks_1[_i];
            expect(menuItemLink.nativeElement.className).toContain("Primeng ROCKS!");
            expect(menuItemLink.nativeElement.style.primeng).toContain("rocks!");
        }
    });
    it('should change child url target icon disabled and title', function () {
        panelmenu.model = [
            {
                label: 'File',
                icon: 'Primeng ROCKS!',
                items: [{
                        label: 'New',
                        icon: 'Primeng ROCKS!',
                        title: "primeng",
                        target: "primeng",
                        url: "primeng",
                        disabled: true
                    },
                    {
                        label: 'Open',
                        icon: 'Primeng ROCKS!',
                        title: "primeng",
                        target: "primeng",
                        url: "primeng",
                        disabled: true
                    },
                    {
                        label: 'Quit',
                        icon: 'Primeng ROCKS!',
                        title: "primeng",
                        target: "primeng",
                        url: "primeng",
                        disabled: true
                    }
                ],
            }
        ];
        fixture.detectChanges();
        var panelHeaderLinkEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-menuitem-link'));
        expect(panelHeaderLinkEl.nativeElement.href).toContain('primeng');
        expect(panelHeaderLinkEl.nativeElement.title).toEqual('primeng');
        expect(panelHeaderLinkEl.nativeElement.target).toEqual('primeng');
        expect(panelHeaderLinkEl.query(platform_browser_1.By.css('.ui-menuitem-icon')).nativeElement.className).toContain("Primeng ROCKS!");
    });
    it('should show items and call toggle', function () {
        panelmenu.model = [
            {
                label: 'File',
                icon: 'pi pi-pw pi-file',
                items: [
                    { label: 'Open', icon: 'pi pi-fw pi-external-link' },
                    { separator: true },
                    { label: 'Quit', icon: 'pi pi-fw pi-times' }
                ],
            },
            {
                label: 'Edit',
                icon: 'pi pi-pw pi-pencil',
                items: [
                    { label: 'Delete', icon: 'pi pi-fw pi-trash' },
                    { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
                ],
            }
        ];
        fixture.detectChanges();
        var handleClickSpy = spyOn(panelmenu, 'handleClick').and.callThrough();
        var headerLinks = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-panelmenu-header-link'));
        expect(headerLinks.length).toEqual(2);
        headerLinks[0].nativeElement.click();
        fixture.detectChanges();
        var iconSpanEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-panelmenu-icon'));
        var firstSubMenuComponent = fixture.debugElement.query(platform_browser_1.By.css('.ui-panelmenu-root-submenu')).componentInstance;
        expect(handleClickSpy).toHaveBeenCalled();
        expect(panelmenu.animating).toEqual(true);
        expect(panelmenu.model[0].expanded).toEqual(true);
        expect(iconSpanEl.nativeElement.className).toContain('pi-chevron-down');
        expect(firstSubMenuComponent.expanded).toEqual(true);
    });
    it('should select multiple', function () {
        panelmenu.model = [
            {
                label: 'File',
                icon: 'pi pi-pw pi-file',
                items: [
                    { label: 'Open', icon: 'pi pi-fw pi-external-link' },
                    { separator: true },
                    { label: 'Quit', icon: 'pi pi-fw pi-times' }
                ],
            },
            {
                label: 'Edit',
                icon: 'pi pi-pw pi-pencil',
                items: [
                    { label: 'Delete', icon: 'pi pi-fw pi-trash' },
                    { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
                ],
            }
        ];
        fixture.detectChanges();
        var headerLinks = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-panelmenu-header-link'));
        headerLinks[0].nativeElement.click();
        headerLinks[1].nativeElement.click();
        fixture.detectChanges();
        var subMenuEls = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-panelmenu-root-submenu'));
        var firstSubMenuComponent = subMenuEls[0].componentInstance;
        var seconSubMenuComponent = subMenuEls[1].componentInstance;
        var activeEls = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-state-active'));
        expect(activeEls.length).toEqual(2);
        var x = 0;
        for (var _i = 0, activeEls_1 = activeEls; _i < activeEls_1.length; _i++) {
            var activeEl = activeEls_1[_i];
            expect(activeEl.query(platform_browser_1.By.css('.ui-menuitem-text')).nativeElement.textContent).toEqual(panelmenu.model[x].label);
            x++;
        }
        expect(panelmenu.model[0].expanded).toEqual(true);
        expect(panelmenu.model[1].expanded).toEqual(true);
        expect(subMenuEls.length).toEqual(2);
        expect(firstSubMenuComponent.expanded).toEqual(true);
        expect(seconSubMenuComponent.expanded).toEqual(true);
    });
    it('should not select multiple', function () {
        panelmenu.model = [
            {
                label: 'File',
                icon: 'pi pi-pw pi-file',
                items: [
                    { label: 'Open', icon: 'pi pi-fw pi-external-link' },
                    { separator: true },
                    { label: 'Quit', icon: 'pi pi-fw pi-times' }
                ],
            },
            {
                label: 'Edit',
                icon: 'pi pi-pw pi-pencil',
                items: [
                    { label: 'Delete', icon: 'pi pi-fw pi-trash' },
                    { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
                ],
            }
        ];
        panelmenu.multiple = false;
        fixture.detectChanges();
        var headerLinks = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-panelmenu-header-link'));
        headerLinks[0].nativeElement.click();
        headerLinks[1].nativeElement.click();
        fixture.detectChanges();
        var activeEls = fixture.debugElement.queryAll(platform_browser_1.By.css('.ui-state-active'));
        expect(activeEls.length).toEqual(1);
        expect(activeEls[0].query(platform_browser_1.By.css('.ui-menuitem-text')).nativeElement.textContent).toEqual(panelmenu.model[1].label);
        expect(panelmenu.model[0].expanded).toEqual(false);
        expect(panelmenu.model[1].expanded).toEqual(true);
    });
});
//# sourceMappingURL=panelmenu.spec.js.map