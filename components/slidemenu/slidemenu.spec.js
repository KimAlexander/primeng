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
var slidemenu_1 = require("./slidemenu");
var animations_1 = require("@angular/platform-browser/animations");
var testing_2 = require("../../../../node_modules/@angular/router/testing");
var core_1 = require("@angular/core");
var SlideMenuTestComponent = /** @class */ (function () {
    function SlideMenuTestComponent() {
    }
    SlideMenuTestComponent = __decorate([
        core_1.Component({
            template: "<p-slideMenu #menu></p-slideMenu>\n  <button #btn type=\"button\" pButton icon=\"pi pi-bars\" label=\"Show\" (click)=\"menu.toggle($event)\"></button>\n  "
        })
    ], SlideMenuTestComponent);
    return SlideMenuTestComponent;
}());
describe('SlideMenu', function () {
    var slidemenu;
    var slidemenuSub;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                animations_1.NoopAnimationsModule,
                testing_2.RouterTestingModule,
            ],
            declarations: [
                slidemenu_1.SlideMenu,
                slidemenu_1.SlideMenuSub,
                SlideMenuTestComponent
            ]
        });
        fixture = testing_1.TestBed.createComponent(SlideMenuTestComponent);
        slidemenu = fixture.debugElement.children[0].componentInstance;
        slidemenu.model = [
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                items: [{
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        command: function () { }
                    },
                    { label: 'Open' },
                    { separator: true },
                    { label: 'Quit' }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                disabled: true
            }
        ];
        fixture.detectChanges();
        slidemenuSub = fixture.debugElement.children[0].query(platform_browser_1.By.css('p-slideMenuSub')).componentInstance;
    });
    it('should created by default', function () {
        fixture.detectChanges();
        var containerEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-slidemenu'));
        var slideMenuSubEl = fixture.debugElement.query(platform_browser_1.By.css('ul'));
        expect(containerEl.nativeElement).toBeTruthy();
        expect(slideMenuSubEl).toBeTruthy();
    });
    it('should change style and styleClass', function () {
        slidemenu.style = { 'primeng': 'rocks!' };
        slidemenu.styleClass = "Primeng ROCKS!";
        fixture.detectChanges();
        var containerEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-slidemenu'));
        expect(containerEl.nativeElement.className).toContain("Primeng ROCKS!");
        expect(containerEl.nativeElement.style.primeng).toEqual("rocks!");
    });
    it('should change viewportHeight', function () {
        slidemenu.viewportHeight = 400;
        fixture.detectChanges();
        var wrapperEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-slidemenu-wrapper'));
        expect(wrapperEl.nativeElement.style.height).toEqual(slidemenu.viewportHeight.toString() + "px");
    });
    it('should change backlabel', function () {
        slidemenu.backLabel = "ALWAYS BET ON PRIME";
        fixture.detectChanges();
        var backwardSpanEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-slidemenu-backward')).queryAll(platform_browser_1.By.css('span'))[1];
        expect(backwardSpanEl.nativeElement.textContent).toEqual("ALWAYS BET ON PRIME");
    });
    it('should change menuWidth effectDuration and easing', function () {
        slidemenu.menuWidth = 400;
        slidemenu.effectDuration = 400;
        slidemenu.easing = 'ease-in';
        fixture.detectChanges();
        var slideMenuSubEl = fixture.debugElement.query(platform_browser_1.By.css('p-slideMenuSub')).query(platform_browser_1.By.css('ul'));
        expect(slidemenuSub.easing).toEqual(slidemenu.easing);
        expect(slidemenuSub.effectDuration).toEqual(slidemenu.effectDuration);
        expect(slidemenuSub.easing).toEqual(slidemenu.easing);
        expect(slideMenuSubEl.nativeElement.style.transitionTimingFunction).toEqual(slidemenu.easing);
        expect(slideMenuSubEl.nativeElement.style.transitionDuration).toEqual(slidemenu.effectDuration + "ms");
        expect(slideMenuSubEl.nativeElement.style.width).toEqual(slidemenu.menuWidth + "px");
    });
    it('should show items', function () {
        fixture.detectChanges();
        var firstSlidemenuSubEl = fixture.debugElement.query(platform_browser_1.By.css('p-slideMenuSub')).query(platform_browser_1.By.css('ul'));
        var itemsEl = fixture.debugElement.query(platform_browser_1.By.css('p-slideMenuSub')).queryAll(platform_browser_1.By.css('li'));
        expect(firstSlidemenuSubEl.children.length).toEqual(slidemenu.model.length);
        expect(itemsEl.length).toEqual(6);
        var i = 0;
        for (var _i = 0, _a = slidemenu.model; _i < _a.length; _i++) {
            var item = _a[_i];
            expect(item.label).toEqual(itemsEl[i].query(platform_browser_1.By.css('.ui-menuitem-text')).nativeElement.textContent);
            i++;
            if (item.items) {
                for (var _b = 0, _c = item.items; _b < _c.length; _b++) {
                    var child = _c[_b];
                    if (child.label)
                        expect(child.label).toEqual(itemsEl[i].query(platform_browser_1.By.css('.ui-menuitem-text')).nativeElement.textContent);
                    i++;
                }
            }
        }
    });
    it('should call itemClick when click and change menu from root to submenu', function () {
        fixture.detectChanges();
        var listsEl = fixture.debugElement.queryAll(platform_browser_1.By.css('ul'));
        var itemsEl = fixture.debugElement.query(platform_browser_1.By.css('p-slideMenuSub')).queryAll(platform_browser_1.By.css('li'));
        var fileItemEl = itemsEl[0].query(platform_browser_1.By.css('a'));
        var itemClickSpy = spyOn(slidemenuSub, 'itemClick').and.callThrough();
        fileItemEl.nativeElement.click();
        fixture.detectChanges();
        var activeItem = fixture.debugElement.query(platform_browser_1.By.css('.ui-menuitem-active'));
        expect(activeItem.query(platform_browser_1.By.css('.ui-menuitem-text')).nativeElement.textContent).toEqual('File');
        expect(itemClickSpy).toHaveBeenCalled();
        expect(activeItem.query(platform_browser_1.By.css('ul')).nativeElement.className).toContain('ui-submenu-list ui-active-submenu');
        expect(slidemenu.left).toEqual(-190);
    });
    it('should call goBack when click and change menu from subMenu to root', function () {
        fixture.detectChanges();
        var listsEl = fixture.debugElement.queryAll(platform_browser_1.By.css('ul'));
        var itemsEl = fixture.debugElement.query(platform_browser_1.By.css('p-slideMenuSub')).queryAll(platform_browser_1.By.css('li'));
        var fileItemEl = itemsEl[0].query(platform_browser_1.By.css('a'));
        var goBackSpy = spyOn(slidemenu, 'goBack').and.callThrough();
        fileItemEl.nativeElement.click();
        fixture.detectChanges();
        var backEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-slidemenu-backward'));
        backEl.nativeElement.click();
        fixture.detectChanges();
        var rootMenu = listsEl[0];
        var subMenu = listsEl[1];
        expect(goBackSpy).toHaveBeenCalled();
        expect(subMenu.nativeElement.className).not.toContain('ui-submenu-list ui-active-submenu');
        expect(rootMenu.nativeElement.className).toContain('ui-slidemenu-rootlist ui-active-submenu');
        expect(slidemenu.left).toEqual(0);
    });
    it('should click disabled item', function () {
        fixture.detectChanges();
        var listsEl = fixture.debugElement.queryAll(platform_browser_1.By.css('ul'));
        var itemsEl = fixture.debugElement.query(platform_browser_1.By.css('p-slideMenuSub')).queryAll(platform_browser_1.By.css('li'));
        var itemClickSpy = spyOn(slidemenuSub, 'itemClick').and.callThrough();
        var editItemEl = itemsEl[5].query(platform_browser_1.By.css('a'));
        editItemEl.nativeElement.click();
        fixture.detectChanges();
        var rootMenu = listsEl[0];
        var subMenu = listsEl[1];
        expect(subMenu.nativeElement.className).not.toContain('ui-submenu-list ui-active-submenu');
        expect(rootMenu.nativeElement.className).toContain('ui-slidemenu-rootlist ui-active-submenu');
        expect(slidemenu.left).toEqual(0);
        expect(slidemenuSub.activeItem).toEqual(undefined);
        expect(itemClickSpy).toHaveBeenCalled();
    });
    it('should click item (command)', function () {
        fixture.detectChanges();
        var itemsEl = fixture.debugElement.query(platform_browser_1.By.css('p-slideMenuSub')).queryAll(platform_browser_1.By.css('li'));
        var newItemEl = itemsEl[1].query(platform_browser_1.By.css('a'));
        newItemEl.nativeElement.click();
        fixture.detectChanges();
        expect(slidemenu.left).toEqual(0);
        expect(slidemenuSub.activeItem).toEqual(undefined);
    });
    it('should open popup', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        var toggleButton = fixture.debugElement.children[1].nativeElement;
        slidemenu.popup = true;
        slidemenu.target = toggleButton;
        slidemenu.visible = true;
        fixture.detectChanges();
        var slideMenuEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-slidemenu'));
        expect(slidemenu.visible).toEqual(true);
        expect(slideMenuEl).toBeTruthy();
    }));
    it('should use appendTo', testing_1.fakeAsync(function () {
        slidemenu.appendTo = "body";
        fixture.detectChanges();
        var toggleButton = fixture.debugElement.children[1].nativeElement;
        slidemenu.popup = true;
        slidemenu.target = toggleButton;
        slidemenu.visible = true;
        fixture.detectChanges();
        var slideMenuEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-slidemenu'));
        expect(slidemenu.visible).toEqual(true);
        expect(slideMenuEl).toBeTruthy();
    }));
    it('should use appendTo with elemntRef', testing_1.fakeAsync(function () {
        slidemenu.appendTo = document.body;
        fixture.detectChanges();
        var toggleButton = fixture.debugElement.children[1].nativeElement;
        slidemenu.popup = true;
        slidemenu.target = toggleButton;
        slidemenu.visible = true;
        fixture.detectChanges();
        var slideMenuEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-slidemenu'));
        expect(slidemenu.visible).toEqual(true);
        expect(slideMenuEl).toBeTruthy();
    }));
});
//# sourceMappingURL=slidemenu.spec.js.map