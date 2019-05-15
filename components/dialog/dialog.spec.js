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
var dialog_1 = require("./dialog");
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("@angular/core");
var shared_1 = require("../common/shared");
var TestDialogComponent = /** @class */ (function () {
    function TestDialogComponent() {
        this.display = false;
    }
    TestDialogComponent.prototype.showDialog = function () {
        this.display = true;
    };
    TestDialogComponent = __decorate([
        core_1.Component({
            template: "\n    <p-dialog [(visible)]=\"display\">\n    <p-footer>\n            <button type=\"button\" pButton icon=\"pi pi-check\" (click)=\"display=false\" label=\"Yes\"></button>\n            <button type=\"button\" pButton icon=\"pi pi-close\" (click)=\"display=false\" label=\"No\" class=\"ui-button-secondary\"></button>\n    </p-footer>\n    </p-dialog>\n    <button type=\"button\" (click)=\"showDialog()\" pButton icon=\"pi pi-info-circle\" label=\"Show\"></button>\n    "
        })
    ], TestDialogComponent);
    return TestDialogComponent;
}());
describe('Dialog', function () {
    var dialog;
    var fixture;
    var testComponent;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                dialog_1.Dialog,
                shared_1.Footer,
                TestDialogComponent
            ]
        });
        fixture = testing_1.TestBed.createComponent(TestDialogComponent);
        dialog = fixture.debugElement.children[0].componentInstance;
        testComponent = fixture.debugElement.componentInstance;
    });
    it('should display the header', function () {
        dialog.header = 'PrimeNG Dialog Header';
        fixture.detectChanges();
        var buttonEl = fixture.debugElement.query(platform_browser_1.By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();
        var headerEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-dialog-title'));
        expect(headerEl.nativeElement.textContent).toContain('PrimeNG Dialog Header');
    });
    it('should display the close icon when closable', function () {
        var buttonEl = fixture.debugElement.query(platform_browser_1.By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();
        var closeEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-dialog-titlebar-close'));
        expect(closeEl).not.toBeNull();
    });
    it('should display the resizer when resizable is true', function () {
        var buttonEl = fixture.debugElement.query(platform_browser_1.By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();
        var resizeEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-resizable-handle'));
        expect(resizeEl).not.toBeNull();
    });
    it('should not create the container element by default', function () {
        fixture.detectChanges();
        expect(fixture.debugElement.children[0].nativeElement.childElementCount).toEqual(0);
        expect(dialog.visible).toEqual(false);
    });
    it('should add rtl class when rtl is enabled', function () {
        dialog.rtl = true;
        var buttonEl = fixture.debugElement.query(platform_browser_1.By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();
        expect(fixture.debugElement.children[0].children[0].classes['ui-dialog-rtl']).toEqual(true);
    });
    it('should add draggable class when dragging is enabled', function () {
        var buttonEl = fixture.debugElement.query(platform_browser_1.By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();
        expect(fixture.debugElement.children[0].children[0].classes['ui-dialog-draggable']).toEqual(true);
    });
    it('should update visible as false binding when close icon is clicked', function () {
        var show = true;
        var buttonEl = fixture.debugElement.query(platform_browser_1.By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();
        dialog.visibleChange.subscribe(function (value) { return show = value; });
        var closeEl = fixture.nativeElement.querySelector('.ui-dialog-titlebar-close');
        closeEl.click();
        expect(show).toEqual(false);
    });
    it('should maximizable', testing_1.fakeAsync(function () {
        dialog.maximizable = true;
        fixture.detectChanges();
        var buttonEl = fixture.debugElement.query(platform_browser_1.By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();
        dialog.container = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
        fixture.detectChanges();
        var maximizeSpy = spyOn(dialog, 'maximize').and.callThrough();
        var revertMaximizSpy = spyOn(dialog, 'revertMaximize').and.callThrough();
        var maximizableEl = fixture.nativeElement.querySelector('.ui-dialog-titlebar-maximize ');
        expect(maximizableEl).toBeTruthy();
        maximizableEl.click();
        fixture.detectChanges();
        var minIconEl = fixture.debugElement.query(platform_browser_1.By.css('.pi-window-minimize'));
        expect(maximizeSpy).toHaveBeenCalled();
        expect(dialog.maximized).toEqual(true);
        expect(minIconEl).toBeTruthy();
        dialog.container = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
        fixture.detectChanges();
        maximizableEl.click();
        testing_1.tick(350);
        fixture.detectChanges();
        expect(revertMaximizSpy).toHaveBeenCalled();
        expect(dialog.maximized).toEqual(false);
    }));
    it('should close (maximized)', testing_1.fakeAsync(function () {
        dialog.maximizable = true;
        fixture.detectChanges();
        var buttonEl = fixture.debugElement.query(platform_browser_1.By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();
        dialog.container = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
        fixture.detectChanges();
        var maximizableEl = fixture.nativeElement.querySelector('.ui-dialog-titlebar-maximize ');
        expect(maximizableEl).toBeTruthy();
        maximizableEl.click();
        fixture.detectChanges();
        var closeEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-dialog-titlebar-close'));
        dialog.visibleChange.subscribe(function (value) { return dialog.visible = value; });
        closeEl.nativeElement.click();
        testing_1.tick(350);
        fixture.detectChanges();
        expect(dialog.visible).toEqual(false);
    }));
    it('should change modal blockScroll and dismissableMask ', testing_1.fakeAsync(function () {
        var closeSpy = spyOn(dialog, 'close').and.callThrough();
        dialog.modal = true;
        dialog.blockScroll = true;
        dialog.dismissableMask = true;
        fixture.detectChanges();
        dialog.visible = true;
        fixture.detectChanges();
        var dialogEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        var onCloseMouseDownSpy = spyOn(dialog, 'onCloseMouseDown').and.callThrough();
        var closeEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-dialog-titlebar-close'));
        expect(dialogEl).toBeTruthy();
        dialog.visibleChange.subscribe(function (value) { return dialog.visible = value; });
        closeEl.nativeElement.click();
        closeEl.nativeElement.dispatchEvent(new Event('mousedown'));
        testing_1.tick(350);
        fixture.detectChanges();
        expect(dialog.mask.classList).toContain('ui-dialog-mask-scrollblocker');
        expect(dialog.visible).toEqual(false);
        expect(closeSpy).toHaveBeenCalled();
        expect(onCloseMouseDownSpy).toHaveBeenCalled();
    }));
    it('should open with focusOnShow', function () {
        dialog.focusOnShow = true;
        fixture.detectChanges();
        var buttonEl = fixture.debugElement.query(platform_browser_1.By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();
        expect(dialog.visible).toEqual(true);
    });
    it('should change appendTo (body)', function () {
        dialog.appendTo = "body";
        fixture.detectChanges();
        var buttonEl = fixture.debugElement.query(platform_browser_1.By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();
        expect(dialog.visible).toEqual(true);
    });
    it('should change appendTo (button)', function () {
        dialog.appendTo = fixture.debugElement.query(platform_browser_1.By.css('button')).nativeElement;
        fixture.detectChanges();
        var buttonEl = fixture.debugElement.query(platform_browser_1.By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();
        expect(dialog.visible).toEqual(true);
    });
    it('should open with change height width minWidth minHeight (deprecated)  positionLeft and positionTop', testing_1.fakeAsync(function () {
        dialog.height = 250;
        dialog.width = 250;
        dialog.minWidth = 200;
        dialog.minHeight = 200;
        dialog.positionLeft = 25;
        dialog.positionTop = 25;
        fixture.detectChanges();
        var buttonEl = fixture.debugElement.query(platform_browser_1.By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();
        testing_1.tick(300);
        expect(dialog.container.style.height).toEqual('250px');
        expect(dialog.container.style.width).toEqual('250px');
        expect(dialog.container.style.minWidth).toEqual('200px');
        expect(dialog.container.style.minHeight).toEqual('200px');
        expect(dialog.container.style.left).toEqual('25px');
        expect(dialog.container.style.top).toEqual('25px');
    }));
    it('should open with change just positionTop', testing_1.fakeAsync(function () {
        dialog.positionTop = 25;
        fixture.detectChanges();
        var buttonEl = fixture.debugElement.query(platform_browser_1.By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();
        testing_1.tick(300);
        expect(dialog.container.style.top).toEqual('25px');
    }));
    it('should call ngOnDestroy', testing_1.fakeAsync(function () {
        dialog.maximizable = true;
        dialog.modal = true;
        dialog.appendTo = "body";
        fixture.detectChanges();
        var restoreAppendSpy = spyOn(dialog, 'restoreAppend').and.callThrough();
        var onOverlayHideSpy = spyOn(dialog, 'onContainerDestroy').and.callThrough();
        var disableModalitySpy = spyOn(dialog, 'disableModality').and.callThrough();
        var buttonEl = fixture.debugElement.query(platform_browser_1.By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();
        dialog.container = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
        fixture.detectChanges();
        var maximizableEl = fixture.nativeElement.querySelector('.ui-dialog-titlebar-maximize ');
        maximizableEl.click();
        fixture.detectChanges();
        dialog.container = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
        fixture.detectChanges();
        maximizableEl.click();
        testing_1.tick(350);
        fixture.detectChanges();
        dialog.ngOnDestroy();
        fixture.detectChanges();
        expect(restoreAppendSpy).toHaveBeenCalled();
        expect(onOverlayHideSpy).toHaveBeenCalled();
        expect(disableModalitySpy).toHaveBeenCalled();
        expect(dialog.container).toEqual(null);
    }));
    it('should change location with drag actions', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        var buttonEl = fixture.debugElement.query(platform_browser_1.By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();
        testing_1.tick(300);
        var firstLeft = dialog.container.style.left;
        var firstTop = dialog.container.style.top;
        var event = {
            'pageX': 500,
            'pageY': 500
        };
        dialog.initDrag(event);
        expect(dialog.dragging).toEqual(true);
        event.pageX = 505;
        event.pageY = 505;
        dialog.onDrag(event);
        dialog.endDrag(event);
        fixture.detectChanges();
        expect(dialog.container.style.left).not.toEqual(firstLeft);
        expect(dialog.container.style.top).not.toEqual(firstTop);
        expect(parseInt(dialog.container.style.top) - parseInt(firstTop)).toEqual(5);
        expect(parseInt(dialog.container.style.left) - parseInt(firstLeft)).toEqual(5);
        expect(dialog.dragging).toEqual(false);
        var mousedown;
        dialog.onCloseMouseDown(mousedown);
        dialog.initDrag(event);
        fixture.detectChanges();
        expect(dialog.dragging).toEqual(false);
    }));
    it('should change location with resize actions', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        var buttonEl = fixture.debugElement.query(platform_browser_1.By.css('button'));
        buttonEl.nativeElement.click();
        fixture.detectChanges();
        testing_1.tick(300);
        var firstWidth = dialog.container.offsetWidth;
        var firstHeight = dialog.container.offsetHeight;
        var event = {
            'pageX': 500,
            'pageY': 500
        };
        dialog.initResize(event);
        expect(dialog.resizing).toEqual(true);
        event.pageX = 505;
        event.pageY = 505;
        dialog.onResize(event);
        dialog.onResizeEnd();
        fixture.detectChanges();
        expect(parseInt(dialog.container.style.width)).not.toEqual(firstWidth);
        expect(parseInt(dialog.container.style.height)).not.toEqual(firstHeight);
        expect(parseInt(dialog.container.style.height) - firstHeight).toEqual(5);
        expect(parseInt(dialog.container.style.width) - firstWidth).toEqual(5);
        expect(dialog.resizing).toEqual(false);
    }));
    it('should close when press esc key', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        var buttonEl = fixture.debugElement.query(platform_browser_1.By.css('button'));
        buttonEl.nativeElement.click();
        var closeSpy = spyOn(dialog, "close").and.callThrough();
        fixture.detectChanges();
        testing_1.tick(300);
        var escapeEvent = document.createEvent('CustomEvent');
        escapeEvent.which = 27;
        escapeEvent.initEvent('keydown', true, true);
        document.dispatchEvent(escapeEvent);
        document.dispatchEvent(escapeEvent);
        fixture.detectChanges();
        expect(closeSpy).toHaveBeenCalled();
    }));
    it('should call onWindowResize when resize', testing_1.fakeAsync(function () {
        var buttonEl = fixture.debugElement.query(platform_browser_1.By.css('button')).nativeElement;
        buttonEl.click();
        var onWindowResizeSpy = spyOn(dialog, "onWindowResize").and.callThrough();
        fixture.detectChanges();
        testing_1.tick(300);
        window.dispatchEvent(new Event('resize'));
        fixture.detectChanges();
        expect(onWindowResizeSpy).toHaveBeenCalled();
    }));
    it('should set container height %100 with breakpoint', testing_1.fakeAsync(function () {
        dialog.breakpoint = 100000000;
        var buttonEl = fixture.debugElement.query(platform_browser_1.By.css('button')).nativeElement;
        buttonEl.click();
        var onWindowResizeSpy = spyOn(dialog, "onWindowResize").and.callThrough();
        fixture.detectChanges();
        testing_1.tick(300);
        window.dispatchEvent(new Event('resize'));
        fixture.detectChanges();
        var container = fixture.debugElement.query(platform_browser_1.By.css("div"));
        expect(onWindowResizeSpy).toHaveBeenCalled();
        expect(container.nativeElement.style.width).toEqual('100%');
        expect(container.nativeElement.style.left).toEqual('0px');
    }));
});
//# sourceMappingURL=dialog.spec.js.map