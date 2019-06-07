var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ContextMenu, ContextMenuSub } from './contextmenu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
var TestContextMenuTest = /** @class */ (function () {
    function TestContextMenuTest() {
        this.items1 = [
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                items: [{
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            { label: 'Project' },
                            { label: 'Other' },
                        ]
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
            },
            {
                label: 'Help',
                icon: 'pi pi-fw pi-question',
                items: [
                    {
                        label: 'Contents'
                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-fw pi-search',
                        items: [
                            {
                                label: 'Text',
                                items: [
                                    {
                                        label: 'Workspace'
                                    }
                                ]
                            },
                            {
                                label: 'File'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Actions',
                icon: 'pi pi-fw pi-cog',
                items: [
                    {
                        label: 'Edit',
                        icon: 'pi pi-fw pi-pencil',
                        items: [
                            { label: 'Save', icon: 'pi pi-fw pi-save' },
                            { label: 'Update', icon: 'pi pi-fw pi-save' },
                        ]
                    },
                    {
                        label: 'Other',
                        icon: 'pi pi-fw pi-tags',
                        items: [
                            { label: 'Delete', icon: 'pi pi-fw pi-minus' }
                        ]
                    }
                ]
            },
            { separator: true },
            {
                label: 'Quit', icon: 'pi pi-fw pi-times'
            }
        ];
    }
    TestContextMenuTest = __decorate([
        Component({
            template: "\n    <p-contextMenu [global]=\"true\" [model]=\"items1\"></p-contextMenu>\n    <p-contextMenu [target]=\"p\" [model]=\"items1\" [appendTo]=\"p\"></p-contextMenu>\n    <p #p>PrimeNG ROCKS!</p>\n    "
        })
    ], TestContextMenuTest);
    return TestContextMenuTest;
}());
describe('ConextMenu', function () {
    var contextmenu;
    var contextmenuP;
    var fixture;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                RouterTestingModule.withRoutes([
                    { path: 'test', component: ContextMenu }
                ]),
            ],
            declarations: [
                ContextMenu,
                ContextMenuSub,
                TestContextMenuTest
            ]
        });
        fixture = TestBed.createComponent(TestContextMenuTest);
        contextmenu = fixture.debugElement.children[0].componentInstance;
        contextmenuP = fixture.debugElement.children[1].componentInstance;
    });
    it('should create container by default', function () {
        fixture.detectChanges();
        var containerEls = fixture.debugElement.queryAll(By.css('.ui-contextmenu'));
        expect(containerEls.length).toEqual(2);
    });
    it('should open contextmenu (global)', function () {
        fixture.detectChanges();
        var showSpy = spyOn(contextmenu, "show").and.callThrough();
        var contextmenuEvent = document.createEvent('CustomEvent');
        contextmenuEvent.pageX = 20;
        contextmenuEvent.pageY = 20;
        contextmenuEvent.initEvent('contextmenu', true, true);
        document.dispatchEvent(contextmenuEvent);
        fixture.detectChanges();
        expect(showSpy).toHaveBeenCalled();
    });
    it('should close contextmenu when outside click (global)', function () {
        fixture.detectChanges();
        var contextmenuEvent = document.createEvent('CustomEvent');
        contextmenuEvent.pageX = 20;
        contextmenuEvent.pageY = 20;
        contextmenuEvent.initEvent('contextmenu', true, true);
        document.dispatchEvent(contextmenuEvent);
        fixture.detectChanges();
        var closeSpy = spyOn(contextmenu, "hide").and.callThrough();
        document.dispatchEvent(new Event("click"));
        fixture.detectChanges();
        expect(closeSpy).toHaveBeenCalled();
    });
    it('should close contextmenu when outside window resize (global)', function () {
        contextmenu.appendTo = "body";
        fixture.detectChanges();
        var contextmenuEvent = document.createEvent('CustomEvent');
        contextmenuEvent.pageX = 20;
        contextmenuEvent.pageY = 20;
        contextmenuEvent.initEvent('contextmenu', true, true);
        document.dispatchEvent(contextmenuEvent);
        fixture.detectChanges();
        var hideSpy = spyOn(contextmenu, "hide").and.callThrough();
        window.dispatchEvent(new Event("resize"));
        fixture.detectChanges();
        expect(hideSpy).toHaveBeenCalled();
    });
    it('should open and close programaticly', function () {
        fixture.detectChanges();
        var showSpy = spyOn(contextmenu, "show").and.callThrough();
        contextmenu.toggle();
        fixture.detectChanges();
        expect(showSpy).toHaveBeenCalled();
        var hideSpy = spyOn(contextmenu, "hide").and.callThrough();
        contextmenu.toggle();
        fixture.detectChanges();
        expect(hideSpy).toHaveBeenCalled();
    });
    it('should open contextmenu (target)', function () {
        fixture.detectChanges();
        var showSpy = spyOn(contextmenuP, "show").and.callThrough();
        var target = fixture.debugElement.query(By.css('p'));
        var contextmenuEvent = document.createEvent('CustomEvent');
        contextmenuEvent.pageX = 20;
        contextmenuEvent.pageY = 20;
        contextmenuEvent.initEvent('contextmenu', true, true);
        target.nativeElement.dispatchEvent(contextmenuEvent);
        fixture.detectChanges();
        expect(showSpy).toHaveBeenCalled();
    });
    it('should close contextmenu when outside click (target)', function () {
        fixture.detectChanges();
        var target = fixture.debugElement.query(By.css('p'));
        var contextmenuEvent = document.createEvent('CustomEvent');
        contextmenuEvent.pageX = 20;
        contextmenuEvent.pageY = 20;
        contextmenuEvent.initEvent('contextmenu', true, true);
        target.nativeElement.dispatchEvent(contextmenuEvent);
        fixture.detectChanges();
        var closeSpy = spyOn(contextmenuP, "hide").and.callThrough();
        document.dispatchEvent(new Event("click"));
        fixture.detectChanges();
        expect(closeSpy).toHaveBeenCalled();
    });
    it('should close contextmenu when outside window resize (target)', function () {
        contextmenu.appendTo = "body";
        fixture.detectChanges();
        var target = fixture.debugElement.query(By.css('p'));
        var contextmenuEvent = document.createEvent('CustomEvent');
        contextmenuEvent.pageX = 20;
        contextmenuEvent.pageY = 20;
        contextmenuEvent.initEvent('contextmenu', true, true);
        target.nativeElement.dispatchEvent(contextmenuEvent);
        fixture.detectChanges();
        var hideSpy = spyOn(contextmenuP, "hide").and.callThrough();
        window.dispatchEvent(new Event("resize"));
        fixture.detectChanges();
        expect(hideSpy).toHaveBeenCalled();
    });
    it('should change activeitem when mouseenter', function () {
        fixture.detectChanges();
        var contextmenuEvent = document.createEvent('CustomEvent');
        contextmenuEvent.pageX = 20;
        contextmenuEvent.pageY = 20;
        contextmenuEvent.initEvent('contextmenu', true, true);
        document.dispatchEvent(contextmenuEvent);
        fixture.detectChanges();
        var menuItems = fixture.debugElement.queryAll(By.css('.ui-menuitem'));
        expect(menuItems[0].componentInstance.activeItem).toEqual(undefined);
        menuItems[0].nativeElement.dispatchEvent(new Event("mouseenter"));
        fixture.detectChanges();
        menuItems = fixture.debugElement.queryAll(By.css('.ui-menuitem'));
        expect(menuItems[0].componentInstance.activeItem.textContent).toEqual("FileNewProjectOtherOpenQuit");
    });
    it('should change activeitem to null when mouseleave', fakeAsync(function () {
        fixture.detectChanges();
        var contextmenuEvent = document.createEvent('CustomEvent');
        contextmenuEvent.pageX = 20;
        contextmenuEvent.pageY = 20;
        contextmenuEvent.initEvent('contextmenu', true, true);
        document.dispatchEvent(contextmenuEvent);
        fixture.detectChanges();
        var menuItems = fixture.debugElement.queryAll(By.css('.ui-menuitem'));
        expect(menuItems[0].componentInstance.activeItem).toEqual(undefined);
        menuItems[0].nativeElement.dispatchEvent(new Event("mouseenter"));
        fixture.detectChanges();
        menuItems = fixture.debugElement.queryAll(By.css('.ui-menuitem'));
        expect(menuItems[0].componentInstance.activeItem.textContent).toEqual("FileNewProjectOtherOpenQuit");
        menuItems[0].nativeElement.dispatchEvent(new Event("mouseleave"));
        tick(1000);
        fixture.detectChanges();
        menuItems = fixture.debugElement.queryAll(By.css('.ui-menuitem'));
        expect(menuItems[0].componentInstance.activeItem).toEqual(null);
    }));
    it('should change activeitem to new activeitem', function () {
        fixture.detectChanges();
        var contextmenuEvent = document.createEvent('CustomEvent');
        contextmenuEvent.pageX = 20;
        contextmenuEvent.pageY = 20;
        contextmenuEvent.initEvent('contextmenu', true, true);
        document.dispatchEvent(contextmenuEvent);
        fixture.detectChanges();
        var menuItems = fixture.debugElement.queryAll(By.css('.ui-menuitem'));
        expect(menuItems[0].componentInstance.activeItem).toEqual(undefined);
        menuItems[0].nativeElement.dispatchEvent(new Event("mouseenter"));
        fixture.detectChanges();
        menuItems = fixture.debugElement.queryAll(By.css('.ui-menuitem'));
        expect(menuItems[0].componentInstance.activeItem.textContent).toEqual("FileNewProjectOtherOpenQuit");
        menuItems[0].nativeElement.dispatchEvent(new Event("mouseleave"));
        fixture.detectChanges();
        menuItems = fixture.debugElement.queryAll(By.css('.ui-menuitem'));
        menuItems[6].nativeElement.dispatchEvent(new Event("mouseenter"));
        fixture.detectChanges();
        expect(menuItems[0].componentInstance.activeItem.textContent).not.toEqual("FileNewProjectOtherOpenQuit");
        expect(menuItems[0].componentInstance.activeItem.textContent).toEqual("EditDeleteRefresh");
    });
});
//# sourceMappingURL=contextmenu.spec.js.map