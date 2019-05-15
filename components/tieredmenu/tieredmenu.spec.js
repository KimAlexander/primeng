"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var tieredmenu_1 = require("./tieredmenu");
var animations_1 = require("@angular/platform-browser/animations");
var testing_2 = require("../../../../node_modules/@angular/router/testing");
describe('TieredMenu', function () {
    var tieredmenu;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule,
                testing_2.RouterTestingModule
            ],
            declarations: [
                tieredmenu_1.TieredMenu,
                tieredmenu_1.TieredMenuSub
            ]
        });
        fixture = testing_1.TestBed.createComponent(tieredmenu_1.TieredMenu);
        tieredmenu = fixture.componentInstance;
    });
    it('should created by default', function () {
        fixture.detectChanges();
        var tieredmenuEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        expect(tieredmenuEl).toBeTruthy();
    });
    it('should not created', function () {
        tieredmenu.popup = true;
        fixture.detectChanges();
        var tieredmenuEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        expect(tieredmenuEl).toBeFalsy();
    });
    it('should change style and styleClass', function () {
        tieredmenu.styleClass = "Primeng ROCKS!";
        tieredmenu.style = { 'primeng': 'rocks!' };
        fixture.detectChanges();
        var tieredmenuEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        var styleEl = tieredmenuEl.styles.primeng;
        expect(tieredmenuEl.nativeElement.className).toContain("Primeng ROCKS!");
        expect(styleEl).toEqual("rocks!");
    });
    it('should change autoZindex', function () {
        tieredmenu.model = [
            {
                label: 'File',
                items: [{
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            { label: 'Project' },
                            { label: 'Other' },
                        ]
                    },
                    { label: 'Open' },
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
        tieredmenu.autoZIndex = true;
        fixture.detectChanges();
        var subMenuEl = fixture.debugElement.query(platform_browser_1.By.css('p-tieredMenuSub')).componentInstance;
        expect(subMenuEl.autoZIndex).toEqual(true);
    });
    it('should change hideDelay', function () {
        tieredmenu.model = [
            {
                label: 'File',
                items: [{
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            { label: 'Project' },
                            { label: 'Other' },
                        ]
                    },
                    { label: 'Open' },
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
        tieredmenu.hideDelay = 500;
        fixture.detectChanges();
        var subMenuEl = fixture.debugElement.query(platform_browser_1.By.css('p-tieredMenuSub')).componentInstance;
        expect(subMenuEl.hideDelay).toEqual(500);
    });
    it('should change baseZIndex', function () {
        tieredmenu.model = [
            {
                label: 'File',
                items: [{
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            { label: 'Project' },
                            { label: 'Other' },
                        ]
                    },
                    { label: 'Open' },
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
        tieredmenu.baseZIndex = 500;
        fixture.detectChanges();
        var subMenuEl = fixture.debugElement.query(platform_browser_1.By.css('p-tieredMenuSub')).componentInstance;
        expect(subMenuEl.baseZIndex).toEqual(500);
    });
    it('should show items', function () {
        tieredmenu.model = [
            {
                label: 'File',
                items: [{
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            { label: 'Project' },
                            { label: 'Other' },
                        ]
                    },
                    { label: 'Open' },
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
        var items = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        expect(items.children.length).toEqual(2);
    });
    it('should call itemClick when click', function () {
        tieredmenu.model = [
            {
                label: 'File',
                items: [{
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            { label: 'Project' },
                            { label: 'Other' },
                        ],
                        command: function () { }
                    },
                    { label: 'Open' },
                    { label: 'Quit' }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    { label: 'Delete', icon: 'pi pi-fw pi-trash' },
                    { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
                ],
                disabled: true
            }
        ];
        fixture.detectChanges();
        var subMenuComponent = fixture.debugElement.query(platform_browser_1.By.css('p-tieredMenuSub')).componentInstance;
        var itemClickSpy = spyOn(subMenuComponent, 'itemClick').and.callThrough();
        var items = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        var fileItemEl = items.children[0].query(platform_browser_1.By.css('a')).nativeElement;
        var editItemEl = items.children[1].query(platform_browser_1.By.css('a')).nativeElement;
        var newItemEl = items.children[0].queryAll(platform_browser_1.By.css('a'))[1].nativeElement;
        fileItemEl.click();
        fixture.detectChanges();
        newItemEl.click();
        fixture.detectChanges();
        editItemEl.click();
        fixture.detectChanges();
        expect(itemClickSpy).toHaveBeenCalled();
    });
    it('should select with popup', function () {
        tieredmenu.model = [
            {
                label: 'File',
                items: [{
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            { label: 'Project' },
                            { label: 'Other' },
                        ]
                    },
                    { label: 'Open' },
                    { label: 'Quit' }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
            }
        ];
        tieredmenu.popup = true;
        tieredmenu.appendTo = "body";
        fixture.detectChanges();
        var showSpy = spyOn(tieredmenu, 'show').and.callThrough();
        var hideSpy = spyOn(tieredmenu, 'hide').and.callThrough();
        var event = { 'currentTarget': document.body };
        tieredmenu.toggle(event);
        fixture.detectChanges();
        var tieredmenuEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        expect(tieredmenuEl).toBeTruthy();
        var subMenuComponent = fixture.debugElement.query(platform_browser_1.By.css('p-tieredMenuSub')).componentInstance;
        var itemClickSpy = spyOn(subMenuComponent, 'itemClick').and.callThrough();
        var items = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        var editItemEl = items.children[1].query(platform_browser_1.By.css('a')).nativeElement;
        editItemEl.click();
        fixture.detectChanges();
        expect(itemClickSpy).toHaveBeenCalled();
        expect(showSpy).toHaveBeenCalled();
        expect(hideSpy).toHaveBeenCalled();
    });
    it('should use popup with diffrent appendTo', function () {
        tieredmenu.model = [
            {
                label: 'File',
                items: [{
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            { label: 'Project' },
                            { label: 'Other' },
                        ]
                    },
                    { label: 'Open' },
                    { label: 'Quit' }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
            }
        ];
        tieredmenu.popup = true;
        tieredmenu.appendTo = document.body;
        fixture.detectChanges();
        var showSpy = spyOn(tieredmenu, 'show').and.callThrough();
        var hideSpy = spyOn(tieredmenu, 'hide').and.callThrough();
        var event = { 'currentTarget': document.body };
        tieredmenu.toggle(event);
        fixture.detectChanges();
        var tieredmenuEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        expect(tieredmenuEl).toBeTruthy();
        var subMenuComponent = fixture.debugElement.query(platform_browser_1.By.css('p-tieredMenuSub')).componentInstance;
        var itemClickSpy = spyOn(subMenuComponent, 'itemClick').and.callThrough();
        var items = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        var editItemEl = items.children[1].query(platform_browser_1.By.css('a')).nativeElement;
        editItemEl.click();
        fixture.detectChanges();
        expect(itemClickSpy).toHaveBeenCalled();
        expect(showSpy).toHaveBeenCalled();
        expect(hideSpy).toHaveBeenCalled();
    });
    it('should call onItemMouseEnter when mouseenter', function () {
        tieredmenu.hideDelay;
        tieredmenu.model = [
            {
                label: 'File',
                items: [{
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            { label: 'Project' },
                            { label: 'Other' },
                        ]
                    },
                    { label: 'Open' },
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
        var subMenuComponent = fixture.debugElement.query(platform_browser_1.By.css('p-tieredMenuSub')).componentInstance;
        var onItemMouseEnter = spyOn(subMenuComponent, 'onItemMouseEnter').and.callThrough();
        var items = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        var fileItemEl = items.children[0].nativeElement;
        var secondSubMenu = items.children[0].query(platform_browser_1.By.css("p-tieredMenuSub")).query(platform_browser_1.By.css('ul'));
        var event = new Event('mouseenter');
        fileItemEl.dispatchEvent(event);
        fixture.detectChanges();
        expect(onItemMouseEnter).toHaveBeenCalled();
        expect(fileItemEl.className).toContain("ui-menuitem-active");
        expect(secondSubMenu.children.length).toEqual(3);
        expect(subMenuComponent.activeItem).toBeTruthy();
    });
    it('should call onItemMouseEnter and do nothing', function () {
        tieredmenu.hideDelay;
        tieredmenu.model = [
            {
                label: 'File',
                items: [{
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            { label: 'Project' },
                            { label: 'Other' },
                        ]
                    },
                    { label: 'Open' },
                    { label: 'Quit' }
                ],
                disabled: true
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
        var subMenuComponent = fixture.debugElement.query(platform_browser_1.By.css('p-tieredMenuSub')).componentInstance;
        var onItemMouseEnter = spyOn(subMenuComponent, 'onItemMouseEnter').and.callThrough();
        var items = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        var fileItemEl = items.children[0].nativeElement;
        var event = new Event('mouseenter');
        fileItemEl.dispatchEvent(event);
        fixture.detectChanges();
        expect(onItemMouseEnter).toHaveBeenCalled();
        expect(fileItemEl.className).not.toContain("ui-menuitem-active");
        expect(subMenuComponent.activeItem).toBeUndefined();
    });
    it('should call onItemMouseLeave when mouseleave', testing_1.fakeAsync(function () {
        tieredmenu.model = [
            {
                label: 'File',
                items: [{
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            { label: 'Project' },
                            { label: 'Other' },
                        ]
                    },
                    { label: 'Open' },
                    { label: 'Quit' }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    { label: 'Delete', icon: 'pi pi-fw pi-trash' },
                    { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
                ],
                disabled: true
            }
        ];
        fixture.detectChanges();
        var subMenuComponent = fixture.debugElement.query(platform_browser_1.By.css('p-tieredMenuSub')).componentInstance;
        var onItemMouseLeave = spyOn(subMenuComponent, 'onItemMouseLeave').and.callThrough();
        var items = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        var fileItemEl = items.children[0].nativeElement;
        var mouseenter = new Event('mouseenter');
        fileItemEl.dispatchEvent(mouseenter);
        fixture.detectChanges();
        var mouseleave = new Event('mouseleave');
        fileItemEl.dispatchEvent(mouseleave);
        testing_1.tick(250);
        fixture.detectChanges();
        expect(onItemMouseLeave).toHaveBeenCalled();
        expect(fileItemEl.className).not.toContain("ui-menuitem-active");
        expect(subMenuComponent.activeItem).toEqual(null);
        fileItemEl.dispatchEvent(mouseenter);
        fixture.detectChanges();
        expect(fileItemEl.className).toContain("ui-menuitem-active");
        expect(subMenuComponent.activeItem).toBeTruthy();
    }));
});
//# sourceMappingURL=tieredmenu.spec.js.map