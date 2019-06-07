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
import { Toast, ToastItem } from './toast';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { MessageService } from '../common/api';
var TestToastComponent = /** @class */ (function () {
    function TestToastComponent(messageService) {
        this.messageService = messageService;
    }
    TestToastComponent.prototype.showDefaultToast = function (severity) {
        this.messageService.add({ severity: severity, summary: "summary", detail: "detail" });
    };
    TestToastComponent.prototype.showWithKey = function (key) {
        this.messageService.add({ key: key, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed' });
    };
    TestToastComponent.prototype.showMultipleToast = function () {
        this.messageService.addAll([
            { severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed' },
            { severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed' }
        ]);
    };
    TestToastComponent.prototype.onClearWithKey = function (key) {
        this.messageService.clear(key);
    };
    TestToastComponent.prototype.onClear = function () {
        this.messageService.clear();
    };
    TestToastComponent = __decorate([
        Component({
            template: "\n        <p-toast></p-toast>\n    ",
            providers: [MessageService]
        }),
        __metadata("design:paramtypes", [MessageService])
    ], TestToastComponent);
    return TestToastComponent;
}());
describe('Toast', function () {
    var toast;
    var fixture;
    var component;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                Toast,
                ToastItem,
                TestToastComponent
            ],
        });
        fixture = TestBed.createComponent(TestToastComponent);
        toast = fixture.debugElement.children[0].componentInstance;
        component = fixture.componentInstance;
    });
    it('should create container', function () {
        fixture.detectChanges();
        var toastContainer = fixture.debugElement.query(By.css('.ui-toast'));
        expect(toastContainer.nativeElement).toBeTruthy();
    });
    it('should create success toast', function () {
        toast.modal = true;
        fixture.detectChanges();
        component.showDefaultToast('success');
        fixture.detectChanges();
        var toastMessage = fixture.debugElement.query(By.css('.ui-toast-message'));
        expect(toastMessage.nativeElement).toBeTruthy();
        expect(toastMessage.nativeElement.classList).toContain("ui-toast-message-success");
    });
    it('should close toast', function () {
        toast.modal = true;
        fixture.detectChanges();
        component.showDefaultToast('success');
        fixture.detectChanges();
        var toastMessage = fixture.debugElement.query(By.css('.ui-toast-message'));
        expect(toastMessage.nativeElement).toBeTruthy();
        expect(toastMessage.nativeElement.classList).toContain("ui-toast-message-success");
        var closeEl = fixture.debugElement.query(By.css(".ui-toast-close-icon"));
        toastMessage.nativeElement.dispatchEvent(new Event("mouseenter"));
        toastMessage.nativeElement.dispatchEvent(new Event("mouseleave"));
        closeEl.nativeElement.click();
        fixture.detectChanges();
        toastMessage = fixture.debugElement.query(By.css('.ui-toast-message'));
        expect(toastMessage).toBeFalsy();
    });
    it('should create warn toast with key', function () {
        toast.key = "vv";
        fixture.detectChanges();
        component.showWithKey('vv');
        fixture.detectChanges();
        var toastMessage = fixture.debugElement.query(By.css('.ui-toast-message'));
        expect(toastMessage.nativeElement).toBeTruthy();
        expect(toastMessage.nativeElement.classList).toContain("ui-toast-message-warn");
    });
    it('should clear toast', function () {
        toast.modal = true;
        fixture.detectChanges();
        component.showDefaultToast('success');
        fixture.detectChanges();
        var toastMessage = fixture.debugElement.query(By.css('.ui-toast-message'));
        expect(toastMessage.nativeElement).toBeTruthy();
        expect(toastMessage.nativeElement.classList).toContain("ui-toast-message-success");
        component.onClear();
        fixture.detectChanges();
        toastMessage = fixture.debugElement.query(By.css('.ui-toast-message'));
        expect(toastMessage).toBeFalsy();
    });
    it('should clear toast with key', function () {
        toast.key = "vv";
        toast.modal = true;
        fixture.detectChanges();
        component.showWithKey('vv');
        fixture.detectChanges();
        var toastMessage = fixture.debugElement.query(By.css('.ui-toast-message'));
        expect(toastMessage.nativeElement).toBeTruthy();
        expect(toastMessage.nativeElement.classList).toContain("ui-toast-message-warn");
        component.onClearWithKey('vv');
        fixture.detectChanges();
        toastMessage = fixture.debugElement.query(By.css('.ui-toast-message'));
        expect(toastMessage).toBeFalsy();
    });
    it('should create multiple toast', function () {
        toast.modal = true;
        fixture.detectChanges();
        component.showMultipleToast();
        fixture.detectChanges();
        var toastMessage = fixture.debugElement.queryAll(By.css('.ui-toast-message'));
        expect(toastMessage.length).toEqual(2);
    });
});
//# sourceMappingURL=toast.spec.js.map