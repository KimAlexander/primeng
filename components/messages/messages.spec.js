var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Messages } from './messages';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { Button } from '../button/button';
import { FormsModule } from '../../../../node_modules/@angular/forms';
import { MessageService } from '../common/messageservice';
var TestMessagesComponent = /** @class */ (function () {
    function TestMessagesComponent(messageService) {
        this.messageService = messageService;
        this.msgs = [];
    }
    TestMessagesComponent.prototype.showSuccess = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Order submitted' });
    };
    TestMessagesComponent.prototype.showInfo = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks' });
    };
    TestMessagesComponent.prototype.showWarn = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes' });
    };
    TestMessagesComponent.prototype.showError = function () {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
    };
    TestMessagesComponent.prototype.showDefault = function () {
        this.msgs = [];
        this.msgs.push({ summary: 'Default Message', detail: 'Default detail' });
    };
    TestMessagesComponent.prototype.showViaService = function () {
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
    };
    TestMessagesComponent.prototype.showAllViaService = function () {
        this.messageService.addAll([{ severity: 'success', key: 'primeng', summary: 'Service Message', detail: 'Via MessageService' }, { severity: 'success', summary: 'Service Message', detail: 'Via MessageService' }]);
    };
    TestMessagesComponent.prototype.clearWithService = function () {
        this.messageService.clear();
    };
    TestMessagesComponent.prototype.clearWithServiceAndKey = function () {
        this.messageService.clear("primeng");
    };
    TestMessagesComponent = __decorate([
        Component({
            template: "\n    <p-messages [(value)]=\"msgs\"></p-messages>\n    <p-messages></p-messages>\n    <button type=\"button\" pButton (click)=\"showSuccess()\" label=\"Success\" class=\"ui-button-success\"></button>\n    <button type=\"button\" pButton (click)=\"showInfo()\" label=\"Info\" class=\"ui-button-info\"></button>\n    <button type=\"button\" pButton (click)=\"showWarn()\" label=\"Warn\" class=\"ui-button-warning\"></button>\n    <button type=\"button\" pButton (click)=\"showError()\" label=\"Error\" class=\"ui-button-danger\"></button>\n    <button type=\"button\" pButton (click)=\"showDefault()\"></button>\n    <button type=\"button\" pButton (click)=\"showViaService()\" label=\"Use Service\"></button>\n    <button type=\"button\" pButton (click)=\"showAllViaService()\" label=\"Use Service\"></button>\n    <button type=\"button\" pButton (click)=\"clearWithService()\" label=\"Use Service\"></button>\n    <button type=\"button\" pButton (click)=\"clearWithServiceAndKey()\" label=\"Use Service\"></button>\n    "
        }),
        __metadata("design:paramtypes", [MessageService])
    ], TestMessagesComponent);
    return TestMessagesComponent;
}());
describe('Messages', function () {
    var messages;
    var fixture;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                FormsModule
            ],
            declarations: [
                Messages,
                Button,
                TestMessagesComponent
            ],
            providers: [MessageService]
        });
        fixture = TestBed.createComponent(TestMessagesComponent);
        messages = fixture.debugElement.children[0].componentInstance;
    });
    it('should not display by default', function () {
        fixture.detectChanges();
        var messageEl = fixture.debugElement.query(By.css('div'));
        expect(messageEl).not.toBeTruthy();
    });
    it('should show success', function () {
        fixture.detectChanges();
        var successButton = fixture.debugElement.query(By.css('button'));
        successButton.nativeElement.click();
        fixture.detectChanges();
        var messageEl = fixture.debugElement.query(By.css('div'));
        var iconEl = fixture.debugElement.query(By.css('.ui-messages-icon'));
        var summaryEl = fixture.debugElement.query(By.css('.ui-messages-summary'));
        var detailEl = fixture.debugElement.query(By.css('.ui-messages-detail'));
        expect(messageEl).toBeTruthy();
        expect(iconEl).toBeTruthy();
        expect(summaryEl).toBeTruthy();
        expect(detailEl).toBeTruthy();
        expect(messageEl.nativeElement.className).toContain('ui-messages-success');
        expect(iconEl.nativeElement.className).toContain('pi-check');
        expect(summaryEl.nativeElement.innerHTML).toEqual('Success Message');
        expect(detailEl.nativeElement.innerHTML).toContain('Order submitted');
    });
    it('should show info', function () {
        fixture.detectChanges();
        var successButton = fixture.debugElement.queryAll(By.css('button'))[1];
        successButton.nativeElement.click();
        fixture.detectChanges();
        var messageEl = fixture.debugElement.query(By.css('div'));
        var iconEl = fixture.debugElement.query(By.css('.ui-messages-icon'));
        var summaryEl = fixture.debugElement.query(By.css('.ui-messages-summary'));
        var detailEl = fixture.debugElement.query(By.css('.ui-messages-detail'));
        expect(messageEl).toBeTruthy();
        expect(iconEl).toBeTruthy();
        expect(summaryEl).toBeTruthy();
        expect(detailEl).toBeTruthy();
        expect(messageEl.nativeElement.className).toContain('ui-messages-info');
        expect(iconEl.nativeElement.className).toContain('pi-info-circle');
        expect(summaryEl.nativeElement.innerHTML).toEqual('Info Message');
        expect(detailEl.nativeElement.innerHTML).toContain('PrimeNG rocks');
    });
    it('should show warning', function () {
        fixture.detectChanges();
        var successButton = fixture.debugElement.queryAll(By.css('button'))[2];
        successButton.nativeElement.click();
        fixture.detectChanges();
        var messageEl = fixture.debugElement.query(By.css('div'));
        var iconEl = fixture.debugElement.query(By.css('.ui-messages-icon'));
        var summaryEl = fixture.debugElement.query(By.css('.ui-messages-summary'));
        var detailEl = fixture.debugElement.query(By.css('.ui-messages-detail'));
        expect(messageEl).toBeTruthy();
        expect(iconEl).toBeTruthy();
        expect(summaryEl).toBeTruthy();
        expect(detailEl).toBeTruthy();
        expect(messageEl.nativeElement.className).toContain('ui-messages-warn');
        expect(iconEl.nativeElement.className).toContain('pi-exclamation-triangle');
        expect(summaryEl.nativeElement.innerHTML).toEqual('Warn Message');
        expect(detailEl.nativeElement.innerHTML).toContain('There are unsaved changes');
    });
    it('should show error', function () {
        fixture.detectChanges();
        var successButton = fixture.debugElement.queryAll(By.css('button'))[3];
        successButton.nativeElement.click();
        fixture.detectChanges();
        var messageEl = fixture.debugElement.query(By.css('div'));
        var iconEl = fixture.debugElement.query(By.css('.ui-messages-icon'));
        var summaryEl = fixture.debugElement.query(By.css('.ui-messages-summary'));
        var detailEl = fixture.debugElement.query(By.css('.ui-messages-detail'));
        expect(messageEl).toBeTruthy();
        expect(iconEl).toBeTruthy();
        expect(summaryEl).toBeTruthy();
        expect(detailEl).toBeTruthy();
        expect(messageEl.nativeElement.className).toContain('ui-messages-error');
        expect(iconEl.nativeElement.className).toContain('pi-times');
        expect(summaryEl.nativeElement.innerHTML).toEqual('Error Message');
        expect(detailEl.nativeElement.innerHTML).toContain('Validation failed');
    });
    it('should show default', function () {
        fixture.detectChanges();
        var successButton = fixture.debugElement.queryAll(By.css('button'))[4];
        successButton.nativeElement.click();
        fixture.detectChanges();
        var messageEl = fixture.debugElement.query(By.css('div'));
        var iconEl = fixture.debugElement.query(By.css('.ui-messages-icon'));
        var summaryEl = fixture.debugElement.query(By.css('.ui-messages-summary'));
        var detailEl = fixture.debugElement.query(By.css('.ui-messages-detail'));
        expect(messageEl).toBeTruthy();
        expect(iconEl).toBeTruthy();
        expect(summaryEl).toBeTruthy();
        expect(detailEl).toBeTruthy();
        expect(iconEl.nativeElement.className).toContain('pi-info-circle');
        expect(summaryEl.nativeElement.innerHTML).toEqual('Default Message');
        expect(detailEl.nativeElement.innerHTML).toContain('Default detail');
    });
    it('should show with service', function () {
        fixture.detectChanges();
        var successButton = fixture.debugElement.queryAll(By.css('button'))[5];
        successButton.nativeElement.click();
        fixture.detectChanges();
        var messageEl = fixture.debugElement.query(By.css('div'));
        var iconEl = fixture.debugElement.query(By.css('.ui-messages-icon'));
        var summaryEl = fixture.debugElement.query(By.css('.ui-messages-summary'));
        var detailEl = fixture.debugElement.query(By.css('.ui-messages-detail'));
        expect(messageEl).toBeTruthy();
        expect(iconEl).toBeTruthy();
        expect(summaryEl).toBeTruthy();
        expect(detailEl).toBeTruthy();
        expect(iconEl.nativeElement.className).toContain('pi-check');
        expect(summaryEl.nativeElement.innerHTML).toEqual('Service Message');
        expect(detailEl.nativeElement.innerHTML).toContain('Via MessageService');
    });
    it('should show multiple with service', function () {
        messages.key = "primeng";
        fixture.detectChanges();
        var successButton = fixture.debugElement.queryAll(By.css('button'))[6];
        successButton.nativeElement.click();
        fixture.detectChanges();
        var messageEl = fixture.debugElement.queryAll(By.css('.ui-messages'));
        expect(messageEl.length).toEqual(2);
    });
    it('should clear with service', function () {
        messages.key = "primeng";
        fixture.detectChanges();
        var successButton = fixture.debugElement.queryAll(By.css('button'))[6];
        var clearButton = fixture.debugElement.queryAll(By.css('button'))[7];
        successButton.nativeElement.click();
        fixture.detectChanges();
        clearButton.nativeElement.click();
        fixture.detectChanges();
        var messageEl = fixture.debugElement.queryAll(By.css('.ui-messages'));
        expect(messageEl.length).toEqual(0);
    });
    it('should clear with service and key', function () {
        messages.key = "primeng";
        fixture.detectChanges();
        var successButton = fixture.debugElement.queryAll(By.css('button'))[6];
        var clearButton = fixture.debugElement.queryAll(By.css('button'))[8];
        successButton.nativeElement.click();
        fixture.detectChanges();
        clearButton.nativeElement.click();
        fixture.detectChanges();
        var messageEl = fixture.debugElement.queryAll(By.css('.ui-messages'));
        expect(messageEl.length).toEqual(1);
    });
});
//# sourceMappingURL=messages.spec.js.map