import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UIMessage } from './message';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('UIMessage', function () {
    var message;
    var fixture;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                UIMessage
            ]
        });
        fixture = TestBed.createComponent(UIMessage);
        message = fixture.componentInstance;
    });
    it('should change severity to success and text', function () {
        message.severity = "success";
        message.text = "Primeng Rocks!";
        fixture.detectChanges();
        var messageEl = fixture.debugElement.query(By.css('div'));
        var iconEl = fixture.debugElement.query(By.css('.ui-message-icon'));
        var textEl = fixture.debugElement.query(By.css('.ui-message-text'));
        expect(messageEl.nativeElement).toBeTruthy();
        expect(messageEl.nativeElement.className).toContain("ui-message-success");
        expect(iconEl.nativeElement.className).toContain("pi pi-check");
        expect(textEl.nativeElement.textContent).toContain("Primeng Rocks!");
    });
    it('should change severity to info', function () {
        message.severity = "info";
        fixture.detectChanges();
        var messageEl = fixture.debugElement.query(By.css('div'));
        var iconEl = fixture.debugElement.query(By.css('.ui-message-icon'));
        expect(messageEl.nativeElement).toBeTruthy();
        expect(messageEl.nativeElement.className).toContain("ui-message-info");
        expect(iconEl.nativeElement.className).toContain("pi pi-info-circle");
    });
    it('should change severity to error', function () {
        message.severity = "error";
        fixture.detectChanges();
        var messageEl = fixture.debugElement.query(By.css('div'));
        var iconEl = fixture.debugElement.query(By.css('.ui-message-icon'));
        expect(messageEl.nativeElement).toBeTruthy();
        expect(messageEl.nativeElement.className).toContain("ui-message-error");
        expect(iconEl.nativeElement.className).toContain("pi pi-times");
    });
    it('should change severity to warning', function () {
        message.severity = "warn";
        fixture.detectChanges();
        var messageEl = fixture.debugElement.query(By.css('div'));
        var iconEl = fixture.debugElement.query(By.css('.ui-message-icon'));
        expect(messageEl.nativeElement).toBeTruthy();
        expect(messageEl.nativeElement.className).toContain("ui-message-warn");
        expect(iconEl.nativeElement.className).toContain("pi pi-exclamation-triangle");
    });
    it('should change severity to default', function () {
        message.severity = " ";
        fixture.detectChanges();
        var messageEl = fixture.debugElement.query(By.css('div'));
        var iconEl = fixture.debugElement.query(By.css('.ui-message-icon'));
        expect(messageEl.nativeElement).toBeTruthy();
        expect(iconEl.nativeElement.className).toContain("pi pi-info-circle");
    });
});
//# sourceMappingURL=message.spec.js.map