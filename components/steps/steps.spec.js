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
var steps_1 = require("./steps");
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("@angular/core");
var toast_1 = require("../toast/toast");
var testing_2 = require("../../../../node_modules/@angular/router/testing");
var TestStpesComponent = /** @class */ (function () {
    function TestStpesComponent() {
        this.activeIndex = 1;
    }
    TestStpesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.items = [{
                label: 'Personal',
                command: function (event) {
                    _this.activeIndex = 0;
                }
            },
            {
                label: 'Seat',
                command: function (event) {
                    _this.activeIndex = 1;
                }
            },
            {
                label: 'Payment',
                command: function (event) {
                    _this.activeIndex = 2;
                }
            },
            {
                label: 'Confirmation',
                command: function (event) {
                    _this.activeIndex = 3;
                }
            }
        ];
    };
    TestStpesComponent = __decorate([
        core_1.Component({
            template: "<p-steps [model]=\"items\"></p-steps>\n  ",
        }),
        __metadata("design:paramtypes", [])
    ], TestStpesComponent);
    return TestStpesComponent;
}());
describe('Steps', function () {
    var steps;
    var testComponent;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                animations_1.NoopAnimationsModule,
                testing_2.RouterTestingModule,
            ],
            declarations: [
                steps_1.Steps,
                toast_1.Toast,
                TestStpesComponent
            ],
        });
        fixture = testing_1.TestBed.createComponent(TestStpesComponent);
        steps = fixture.debugElement.children[0].componentInstance;
        testComponent = fixture.debugElement.componentInstance;
    });
    it('should change style & styleClass', function () {
        steps.style = { 'primeng': 'rocks!' };
        steps.styleClass = "Primeng ROCKS!";
        fixture.detectChanges();
        var stepsEl = fixture.debugElement.children[0].query(platform_browser_1.By.css('div')).nativeElement;
        expect(stepsEl.className).toContain("Primeng ROCKS!");
        expect(stepsEl.style.primeng).toContain("rocks!");
    });
    it('should readonly by default', function () {
        fixture.detectChanges();
        var items = fixture.debugElement.children[0].queryAll(platform_browser_1.By.css('li'));
        for (var x = 0; x < testComponent.items.length; x++) {
            if (x == 0)
                expect(items[x].nativeElement.className).not.toContain("ui-state-disabled ui-steps-incomplete");
            else
                expect(items[x].nativeElement.className).toContain("ui-state-disabled ui-steps-incomplete");
        }
    });
    it('should not readonly', function () {
        steps.readonly = false;
        fixture.detectChanges();
        var stepsEl = fixture.debugElement.children[0].query(platform_browser_1.By.css('div')).nativeElement;
        var items = fixture.debugElement.children[0].queryAll(platform_browser_1.By.css('li'));
        expect(stepsEl.className).not.toContain("ui-steps-readonly");
        for (var x = 0; x < testComponent.items.length; x++) {
            expect(items[x].nativeElement.className).not.toContain("ui-state-disabled ui-steps-incomplete");
        }
    });
    it('should show the step number', function () {
        fixture.detectChanges();
        var stepsEl = fixture.debugElement.children[0].query(platform_browser_1.By.css('div')).nativeElement;
        var items = fixture.debugElement.children[0].queryAll(platform_browser_1.By.css('li'));
        for (var x = 0; x < testComponent.items.length; x++) {
            expect(items[x].query(platform_browser_1.By.css('.ui-steps-number')).nativeElement.textContent).toEqual((x + 1).toString());
        }
    });
    it('should activate first item', function () {
        fixture.detectChanges();
        var items = fixture.debugElement.children[0].queryAll(platform_browser_1.By.css('li'));
        for (var x = 0; x < testComponent.items.length; x++) {
            if (x == 0)
                expect(items[x].nativeElement.className).toContain("ui-state-highlight ui-steps-current");
            else
                expect(items[x].nativeElement.className).toContain("ui-state-default");
        }
    });
    it('should change activeItem', function () {
        steps.activeIndex = 2;
        fixture.detectChanges();
        var items = fixture.debugElement.children[0].queryAll(platform_browser_1.By.css('li'));
        for (var x = 0; x < testComponent.items.length; x++) {
            if (x == 2)
                expect(items[x].nativeElement.className).toContain("ui-state-highlight ui-steps-current");
            else
                expect(items[x].nativeElement.className).toContain("ui-state-default");
        }
    });
    it('should change activeItem when click', function () {
        steps.readonly = false;
        var itemClickSpy = spyOn(steps, 'itemClick').and.callThrough();
        fixture.detectChanges();
        var items = fixture.debugElement.children[0].queryAll(platform_browser_1.By.css('li'));
        steps.activeIndexChange.subscribe(function (value) { return steps.activeIndex = value; });
        items[2].query(platform_browser_1.By.css('a')).nativeElement.click();
        fixture.detectChanges();
        expect(itemClickSpy).toHaveBeenCalled();
        for (var x = 0; x < testComponent.items.length; x++) {
            if (x == 2)
                expect(items[x].nativeElement.className).toContain("ui-state-highlight ui-steps-current");
            else
                expect(items[x].nativeElement.className).toContain("ui-state-default");
        }
    });
    it('should listen even emitter', function () {
        steps.readonly = false;
        var data = 0;
        fixture.detectChanges();
        var items = fixture.debugElement.children[0].queryAll(platform_browser_1.By.css('li'));
        steps.activeIndexChange.subscribe(function (value) { return data = value; });
        items[2].query(platform_browser_1.By.css('a')).nativeElement.click();
        fixture.detectChanges();
        expect(data).toEqual(2);
    });
});
//# sourceMappingURL=steps.spec.js.map