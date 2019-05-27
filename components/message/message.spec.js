"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var message_1 = require("./message");
var animations_1 = require("@angular/platform-browser/animations");
describe('UIMessage', function () {
    var message;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                message_1.UIMessage
            ]
        });
        fixture = testing_1.TestBed.createComponent(message_1.UIMessage);
        message = fixture.componentInstance;
    });
    it('should change severity to success and text', function () {
        message.severity = "success";
        message.text = "Primeng Rocks!";
        fixture.detectChanges();
        var messageEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        var iconEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-message-icon'));
        var textEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-message-text'));
        expect(messageEl.nativeElement).toBeTruthy();
        expect(messageEl.nativeElement.className).toContain("ui-message-success");
        expect(iconEl.nativeElement.className).toContain("pi pi-check");
        expect(textEl.nativeElement.textContent).toContain("Primeng Rocks!");
    });
    it('should change severity to info', function () {
        message.severity = "info";
        fixture.detectChanges();
        var messageEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        var iconEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-message-icon'));
        expect(messageEl.nativeElement).toBeTruthy();
        expect(messageEl.nativeElement.className).toContain("ui-message-info");
        expect(iconEl.nativeElement.className).toContain("pi pi-info-circle");
    });
    it('should change severity to error', function () {
        message.severity = "error";
        fixture.detectChanges();
        var messageEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        var iconEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-message-icon'));
        expect(messageEl.nativeElement).toBeTruthy();
        expect(messageEl.nativeElement.className).toContain("ui-message-error");
        expect(iconEl.nativeElement.className).toContain("pi pi-times");
    });
    it('should change severity to warning', function () {
        message.severity = "warn";
        fixture.detectChanges();
        var messageEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        var iconEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-message-icon'));
        expect(messageEl.nativeElement).toBeTruthy();
        expect(messageEl.nativeElement.className).toContain("ui-message-warn");
        expect(iconEl.nativeElement.className).toContain("pi pi-exclamation-triangle");
    });
    it('should change severity to default', function () {
        message.severity = " ";
        fixture.detectChanges();
        var messageEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        var iconEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-message-icon'));
        expect(messageEl.nativeElement).toBeTruthy();
        expect(iconEl.nativeElement.className).toContain("pi pi-info-circle");
    });
});
//# sourceMappingURL=message.spec.js.map