"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var tabmenu_1 = require("./tabmenu");
var animations_1 = require("@angular/platform-browser/animations");
var testing_2 = require("../../../../node_modules/@angular/router/testing");
describe('TabMenu', function () {
    var tabmenu;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule,
                testing_2.RouterTestingModule.withRoutes([
                    { path: 'test', component: tabmenu_1.TabMenu }
                ]),
            ],
            declarations: [
                tabmenu_1.TabMenu
            ]
        });
        fixture = testing_1.TestBed.createComponent(tabmenu_1.TabMenu);
        tabmenu = fixture.componentInstance;
    });
    it('should created by default', function () {
        fixture.detectChanges();
        var tabmenuEl = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
        expect(tabmenuEl).toBeTruthy();
    });
    it('should change style and styleClass', function () {
        tabmenu.style = { 'primeng': 'rocks!' };
        tabmenu.styleClass = "Primeng ROCKS!";
        fixture.detectChanges();
        var tabmenuEl = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
        expect(tabmenuEl.className).toContain("Primeng ROCKS!");
        expect(tabmenuEl.style.primeng).toContain("rocks!");
    });
    it('should not show items ', function () {
        tabmenu.model = [
            { label: 'Stats', icon: 'fa fa-fw fa-bar-chart', visible: false },
            { label: 'Calendar', icon: 'fa fa-fw fa-calendar', visible: false }
        ];
        fixture.detectChanges();
        var itemList = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        expect(itemList.children[0].nativeElement.className).toContain("ui-helper-hidden");
        expect(itemList.children[1].nativeElement.className).toContain("ui-helper-hidden");
    });
    it('should show disabled items ', function () {
        tabmenu.model = [
            { label: 'Stats', icon: 'fa fa-fw fa-bar-chart', disabled: true },
            { label: 'Calendar', icon: 'fa fa-fw fa-calendar', disabled: true }
        ];
        fixture.detectChanges();
        var itemList = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        expect(itemList.children[0].nativeElement.className).toContain("ui-state-disabled");
        expect(itemList.children[1].nativeElement.className).toContain("ui-state-disabled");
    });
    it('should show items and icons (url)', function () {
        tabmenu.model = [
            { label: 'Stats', icon: 'fa fa-fw fa-bar-chart' },
            { label: 'Calendar', icon: 'fa fa-fw fa-calendar' },
            { label: 'Documentation', icon: 'fa fa-fw fa-book' },
            { label: 'Support', icon: 'fa fa-fw fa-support' },
            { label: 'Social', icon: 'fa fa-fw fa-twitter' }
        ];
        fixture.detectChanges();
        var itemList = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        expect(itemList.children.length).toEqual(5);
        expect(itemList.query(platform_browser_1.By.css('.ui-menuitem-icon'))).toBeTruthy();
        expect(itemList.query(platform_browser_1.By.css('.ui-menuitem-text'))).toBeTruthy();
    });
    it('should show items and icons (routerLink)', function () {
        tabmenu.model = [
            { label: 'Stats', icon: 'fa fa-fw fa-bar-chart', routerLink: 'test' },
            { label: 'Calendar', icon: 'fa fa-fw fa-calendar', routerLink: 'test' },
            { label: 'Documentation', icon: 'fa fa-fw fa-book', routerLink: 'test' },
            { label: 'Support', icon: 'fa fa-fw fa-support', routerLink: 'test' },
            { label: 'Social', icon: 'fa fa-fw fa-twitter', routerLink: 'test' }
        ];
        fixture.detectChanges();
        var itemList = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        expect(itemList.children.length).toEqual(5);
        for (var x = 0; x < 5; x++) {
            expect(itemList.children[x].nativeElement.innerHTML).toContain("ng-reflect-router-link");
        }
        expect(itemList.query(platform_browser_1.By.css('.ui-menuitem-icon'))).toBeTruthy();
        expect(itemList.query(platform_browser_1.By.css('.ui-menuitem-text'))).toBeTruthy();
    });
    it('should select item when click (url)', function () {
        tabmenu.model = [
            { label: 'Stats', icon: 'fa fa-fw fa-bar-chart' },
            { label: 'Calendar', icon: 'fa fa-fw fa-calendar' },
            { label: 'Documentation', icon: 'fa fa-fw fa-book' },
            { label: 'Support', icon: 'fa fa-fw fa-support' },
            { label: 'Social', icon: 'fa fa-fw fa-twitter' }
        ];
        var itemClickSpy = spyOn(tabmenu, 'itemClick').and.callThrough();
        fixture.detectChanges();
        var itemList = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        var calenderItem = itemList.children[1].children[0].nativeElement;
        calenderItem.click();
        fixture.detectChanges();
        expect(itemList.children[1].nativeElement.className).toContain("ui-state-active");
        expect(tabmenu.activeItem.label).toEqual('Calendar');
        expect(tabmenu.activeItem.icon).toContain('fa-calendar');
        expect(itemClickSpy).toHaveBeenCalled();
    });
    it('should select item and highlight with routerLinkActive when click (routerLink)', function () {
        tabmenu.model = [
            { label: 'Stats', icon: 'fa fa-fw fa-bar-chart', routerLink: 'test' },
            { label: 'Calendar', icon: 'fa fa-fw fa-calendar', routerLink: 'test' },
            { label: 'Documentation', icon: 'fa fa-fw fa-book', routerLink: 'test' },
            { label: 'Support', icon: 'fa fa-fw fa-support', routerLink: 'test' },
            { label: 'Social', icon: 'fa fa-fw fa-twitter', routerLink: 'test' }
        ];
        var itemClickSpy = spyOn(tabmenu, 'itemClick').and.callThrough();
        fixture.detectChanges();
        var itemList = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        var calenderItem = itemList.children[1].children[0].nativeElement;
        calenderItem.click();
        fixture.detectChanges();
        expect(itemList.children[1].nativeElement.className).toContain("ui-state-active");
        expect(tabmenu.activeItem.label).toEqual('Calendar');
        expect(tabmenu.activeItem.icon).toContain('fa-calendar');
        expect(itemClickSpy).toHaveBeenCalled();
    });
    it('shouldn\'t show content', function () {
        tabmenu.model = [
            { label: 'Stats', icon: 'fa fa-fw fa-bar-chart', disabled: true },
            { label: 'Calendar', icon: 'fa fa-fw fa-calendar', disabled: true }
        ];
        fixture.detectChanges();
        var itemList = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        expect(itemList.children[0].nativeElement.className).toContain("ui-state-disabled");
        expect(itemList.children[1].nativeElement.className).toContain("ui-state-disabled");
        var calenderItem = itemList.children[1].children[0].nativeElement;
        calenderItem.click();
        fixture.detectChanges();
        expect(itemList.children[1].nativeElement.className).not.toContain("ui-state-active");
    });
    it('should use command', function () {
        var x;
        tabmenu.model = [
            { label: 'Stats', icon: 'fa fa-fw fa-bar-chart', disabled: true },
            { label: 'Calendar', icon: 'fa fa-fw fa-calendar', command: function () {
                    x = "PRIMENG!";
                } }
        ];
        fixture.detectChanges();
        var itemList = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        var calenderItem = itemList.children[1].children[0].nativeElement;
        calenderItem.click();
        fixture.detectChanges();
        expect(x).toEqual("PRIMENG!");
    });
});
//# sourceMappingURL=tabmenu.spec.js.map