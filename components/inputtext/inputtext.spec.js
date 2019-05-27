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
var inputtext_1 = require("./inputtext");
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("@angular/core");
var TestInputTextComponent = /** @class */ (function () {
    function TestInputTextComponent() {
    }
    TestInputTextComponent = __decorate([
        core_1.Component({
            template: "<input id=\"input\" type=\"text\" pInputText> "
        })
    ], TestInputTextComponent);
    return TestInputTextComponent;
}());
describe('InputText', function () {
    var inputtext;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                inputtext_1.InputText,
                TestInputTextComponent
            ]
        });
        fixture = testing_1.TestBed.createComponent(TestInputTextComponent);
        inputtext = fixture.debugElement.children[0].componentInstance;
    });
    it('should display by default', function () {
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        expect(inputEl.nativeElement).toBeTruthy();
        expect(inputEl.nativeElement.className).toContain("ui-inputtext");
        expect(inputEl.nativeElement.className).toContain("ui-corner-all");
        expect(inputEl.nativeElement.className).toContain("ui-state-default");
        expect(inputEl.nativeElement.className).toContain("ui-widget");
    });
    it('should call updateFilledState', function () {
        fixture.detectChanges();
        var inputEl = fixture.debugElement.query(platform_browser_1.By.css('input'));
        inputEl.nativeElement.value = "primeng";
        inputEl.nativeElement.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        expect(inputEl.nativeElement.className).toContain("ui-state-filled");
    });
});
//# sourceMappingURL=inputtext.spec.js.map