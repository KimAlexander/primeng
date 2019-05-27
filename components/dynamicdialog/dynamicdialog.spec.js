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
var dynamicdialog_1 = require("./dynamicdialog");
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("@angular/core");
var shared_1 = require("../common/shared");
var api_1 = require("../common/api");
var common_1 = require("@angular/common");
var TestComponent = /** @class */ (function () {
    function TestComponent(ref, config) {
        this.ref = ref;
        this.config = config;
    }
    TestComponent = __decorate([
        core_1.Component({
            template: "\n        <h2>\n            PrimeNG ROCKS!\n        </h2>\n    "
        }),
        __metadata("design:paramtypes", [api_1.DynamicDialogRef, api_1.DynamicDialogConfig])
    ], TestComponent);
    return TestComponent;
}());
var TestDynamicDialogComponent = /** @class */ (function () {
    function TestDynamicDialogComponent(dialogService) {
        this.dialogService = dialogService;
    }
    TestDynamicDialogComponent.prototype.show = function () {
        var ref = this.dialogService.open(TestComponent, {
            header: 'Demo Header',
            width: '70%',
            contentStyle: { "max-height": "350px", "overflow": "auto" },
            dismissableMask: true
        });
        ref.onClose.subscribe(function (car) {
            if (car) {
            }
        });
    };
    TestDynamicDialogComponent = __decorate([
        core_1.Component({
            template: "\n    <div class=\"TestDynamicDialog\">\n    </div>\n    "
        }),
        __metadata("design:paramtypes", [api_1.DialogService])
    ], TestDynamicDialogComponent);
    return TestDynamicDialogComponent;
}());
var FakeTestDialogModule = /** @class */ (function () {
    function FakeTestDialogModule() {
    }
    FakeTestDialogModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, dynamicdialog_1.DynamicDialogModule],
            declarations: [
                TestComponent,
                TestDynamicDialogComponent
            ],
            entryComponents: [TestComponent],
            exports: [TestComponent],
            providers: [api_1.DialogService]
        })
    ], FakeTestDialogModule);
    return FakeTestDialogModule;
}());
exports.FakeTestDialogModule = FakeTestDialogModule;
describe('DynamicDialog', function () {
    var fixture;
    var testDynamicDialogComponent;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule,
                FakeTestDialogModule
            ],
            declarations: [
                shared_1.Footer,
            ],
        });
        fixture = testing_1.TestBed.createComponent(TestDynamicDialogComponent);
        testDynamicDialogComponent = fixture.debugElement.componentInstance;
    });
    it('should open dialog and close dialog', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        testDynamicDialogComponent.show();
        fixture.detectChanges();
        testing_1.tick(300);
        var dynamicDialogEl = document.getElementsByClassName("ui-dynamicdialog")[0];
        expect(dynamicDialogEl).toBeTruthy();
        var titleEl = dynamicDialogEl.getElementsByClassName("ui-dialog-title")[0];
        var testComponentHeader = dynamicDialogEl.getElementsByTagName("h2")[0];
        expect(titleEl.textContent).toEqual("Demo Header");
        expect(testComponentHeader.textContent).toEqual(" PrimeNG ROCKS! ");
        var dynamicDialogTitlebarIconEl = document.querySelector(".ui-dialog-titlebar-icon");
        dynamicDialogTitlebarIconEl.click();
        testing_1.tick(300);
        fixture.detectChanges();
        dynamicDialogEl = document.getElementsByClassName("ui-dynamicdialog")[0];
        expect(dynamicDialogEl).toBeUndefined();
    }));
    it('should close dialog with esc key', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        testDynamicDialogComponent.show();
        fixture.detectChanges();
        testing_1.tick(300);
        var dynamicDialogEl = document.getElementsByClassName("ui-dynamicdialog")[0];
        expect(dynamicDialogEl).toBeTruthy();
        var titleEl = dynamicDialogEl.getElementsByClassName("ui-dialog-title")[0];
        var testComponentHeader = dynamicDialogEl.getElementsByTagName("h2")[0];
        expect(titleEl.textContent).toEqual("Demo Header");
        expect(testComponentHeader.textContent).toEqual(" PrimeNG ROCKS! ");
        var escapeEvent = document.createEvent('CustomEvent');
        escapeEvent.which = 27;
        escapeEvent.initEvent('keydown', true, true);
        document.dispatchEvent(escapeEvent);
        testing_1.tick(300);
        fixture.detectChanges();
        dynamicDialogEl = document.getElementsByClassName("ui-dynamicdialog")[0];
        expect(dynamicDialogEl).toBeUndefined();
    }));
    it('should close dialog with mask click', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        testDynamicDialogComponent.show();
        fixture.detectChanges();
        testing_1.tick(300);
        var dynamicDialogEl = document.getElementsByClassName("ui-dynamicdialog")[0];
        expect(dynamicDialogEl).toBeTruthy();
        var titleEl = dynamicDialogEl.getElementsByClassName("ui-dialog-title")[0];
        var testComponentHeader = dynamicDialogEl.getElementsByTagName("h2")[0];
        expect(titleEl.textContent).toEqual("Demo Header");
        expect(testComponentHeader.textContent).toEqual(" PrimeNG ROCKS! ");
        var maskEl = document.querySelector(".ui-dialog-mask");
        maskEl.click();
        testing_1.tick(300);
        fixture.detectChanges();
        dynamicDialogEl = document.getElementsByClassName("ui-dynamicdialog")[0];
        expect(dynamicDialogEl).toBeUndefined();
    }));
});
//# sourceMappingURL=dynamicdialog.spec.js.map