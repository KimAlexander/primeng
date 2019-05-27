"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var confirmdialog_1 = require("./confirmdialog");
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("@angular/core");
var api_1 = require("../common/api");
var TestConfirmDialogComponent = /** @class */ (function () {
    function TestConfirmDialogComponent(confirmationService) {
        this.confirmationService = confirmationService;
    }
    TestConfirmDialogComponent.prototype.confirm1 = function () {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: function () {
                _this.header = "accept";
            },
            reject: function () {
                _this.header = "reject";
            }
        });
    };
    TestConfirmDialogComponent = __decorate([
        core_1.Component({
            template: "<p-confirmDialog></p-confirmDialog>\n\n  <button type=\"button\" (click)=\"confirm1()\" pButton icon=\"pi pi-check\" label=\"Confirm\"></button>"
        }),
        __metadata("design:paramtypes", [api_1.ConfirmationService])
    ], TestConfirmDialogComponent);
    return TestConfirmDialogComponent;
}());
describe('ConfirmDialog', function () {
    var confirmDialog;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                confirmdialog_1.ConfirmDialog,
                TestConfirmDialogComponent,
            ],
            providers: [
                api_1.ConfirmationService
            ]
        });
        fixture = testing_1.TestBed.createComponent(TestConfirmDialogComponent);
        confirmDialog = fixture.debugElement.query(platform_browser_1.By.css('p-confirmDialog')).componentInstance;
    });
    it('should display the header', function () {
        confirmDialog.header = "PrimengRocks!";
        confirmDialog.visible = true;
        fixture.detectChanges();
        var confirmDialogEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-dialog-title')).nativeElement;
        expect(confirmDialogEl).toBeTruthy();
        expect(confirmDialogEl.textContent).toContain('PrimengRocks!');
    });
    it('should display the close icon when closable is true', function () {
        confirmDialog.visible = true;
        fixture.detectChanges();
        var closeEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-dialog-titlebar-icon'));
        expect(closeEl).not.toBeNull();
    });
    it('should not create the container element by default', function () {
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css('.ui-dialog'))).toBeFalsy;
        expect(confirmDialog.visible).toEqual(undefined);
    });
    it('should add rtl class when rtl is enabled', function () {
        confirmDialog.visible = true;
        confirmDialog.rtl = true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css('div')).classes['ui-dialog-rtl']).toEqual(true);
    });
    it('should not have a close icon', function () {
        confirmDialog.visible = true;
        confirmDialog.closable = false;
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css('a'))).toBeFalsy();
    });
    it('should change buttonStyles', function () {
        confirmDialog.visible = true;
        confirmDialog.rejectButtonStyleClass = "Primeng ROCKS!";
        confirmDialog.acceptButtonStyleClass = "Primeng ROCKS!";
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css('.ui-dialog-footer')).children[0].nativeElement.className).toContain("Primeng ROCKS!");
        expect(fixture.debugElement.query(platform_browser_1.By.css('.ui-dialog-footer')).children[1].nativeElement.className).toContain("Primeng ROCKS!");
    });
    it('should change icons', function () {
        confirmDialog.visible = true;
        confirmDialog.icon = "Primeng ROCKS!";
        confirmDialog.acceptIcon = "Primeng ROCKS!";
        confirmDialog.rejectIcon = "Primeng ROCKS!";
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css('.ui-confirmdialog-icon')).nativeElement.className).toContain("Primeng ROCKS!");
        expect(fixture.debugElement.query(platform_browser_1.By.css('.ui-dialog-footer')).children[0].nativeElement.icon).toContain("Primeng ROCKS!");
        expect(fixture.debugElement.query(platform_browser_1.By.css('.ui-dialog-footer')).children[1].nativeElement.icon).toContain("Primeng ROCKS!");
    });
    it('should not show accept button', function () {
        confirmDialog.visible = true;
        confirmDialog.acceptVisible = false;
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css('.ui-dialog-footer')).children[1]).toBeFalsy();
    });
    it('should not show reject button', function () {
        confirmDialog.visible = true;
        confirmDialog.rejectVisible = false;
        fixture.detectChanges();
        expect(fixture.debugElement.query(platform_browser_1.By.css('.ui-dialog-footer')).children[1]).toBeFalsy();
    });
    it('should run accept', function () {
        var confirmEl = fixture.debugElement.query(platform_browser_1.By.css('button')).nativeElement;
        confirmEl.click();
        fixture.detectChanges();
        var acceptButtonEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-dialog-footer')).children[0].nativeElement;
        acceptButtonEl.click();
        expect(fixture.componentInstance.header).toEqual("accept");
    });
    it('should run reject', function () {
        var confirmEl = fixture.debugElement.query(platform_browser_1.By.css('button')).nativeElement;
        confirmEl.click();
        fixture.detectChanges();
        var rejectButtonEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-dialog-footer')).children[1].nativeElement;
        rejectButtonEl.click();
        expect(fixture.componentInstance.header).toEqual("reject");
    });
    it('should close when click close icon', testing_1.fakeAsync(function () {
        var buttonEl = fixture.debugElement.query(platform_browser_1.By.css('button')).nativeElement;
        buttonEl.click();
        fixture.detectChanges();
        var closeEl = fixture.debugElement.query(platform_browser_1.By.css(".ui-dialog-titlebar-close")).nativeElement;
        closeEl.click();
        testing_1.tick(300);
        fixture.detectChanges();
        var confirmDialogEl = fixture.debugElement.query(platform_browser_1.By.css("div"));
        expect(confirmDialogEl).toBeFalsy();
    }));
    it('should set width and height (deprecated)', testing_1.fakeAsync(function () {
        confirmDialog.width = 250;
        confirmDialog.height = 250;
        var buttonEl = fixture.debugElement.query(platform_browser_1.By.css('button')).nativeElement;
        buttonEl.click();
        fixture.detectChanges();
        testing_1.tick(300);
        var container = fixture.debugElement.query(platform_browser_1.By.css(".ui-dialog"));
        expect(container.nativeElement.style.height).toEqual("250px");
        expect(container.nativeElement.style.width).toEqual("250px");
    }));
    it('should close with esc', testing_1.fakeAsync(function () {
        var buttonEl = fixture.debugElement.query(platform_browser_1.By.css('button')).nativeElement;
        buttonEl.click();
        var closeSpy = spyOn(confirmDialog, "close").and.callThrough();
        fixture.detectChanges();
        testing_1.tick(300);
        var escapeEvent = document.createEvent('CustomEvent');
        escapeEvent.which = 27;
        escapeEvent.initEvent('keydown', true, true);
        document.dispatchEvent(escapeEvent);
        fixture.detectChanges();
        expect(closeSpy).toHaveBeenCalled();
    }));
});
//# sourceMappingURL=confirmdialog.spec.js.map