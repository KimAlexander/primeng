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
var toolbar_1 = require("./toolbar");
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("@angular/core");
var TestToolbarComponent = /** @class */ (function () {
    function TestToolbarComponent() {
    }
    TestToolbarComponent = __decorate([
        core_1.Component({
            template: "<p-toolbar>\n  <div class=\"ui-toolbar-group-left\">\n      <button  type=\"button\" label=\"New\" icon=\"pi pi-plus\"></button>\n      <button  type=\"button\" label=\"Upload\" icon=\"pi pi-upload\" class=\"ui-button-success\"></button>\n  </div>\n  \n  <div class=\"ui-toolbar-group-right\">\n      <button  type=\"button\" icon=\"pi pi-search\"></button>\n      <button  type=\"button\" icon=\"pi pi-calendar\" class=\"ui-button-success\"></button>\n      <button  type=\"button\" icon=\"pi pi-times\" class=\"ui-button-danger\"></button>\n  </div>\n</p-toolbar>"
        })
    ], TestToolbarComponent);
    return TestToolbarComponent;
}());
describe('Toolbar', function () {
    var toolbar;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                toolbar_1.Toolbar,
                TestToolbarComponent,
            ]
        });
        fixture = testing_1.TestBed.createComponent(TestToolbarComponent);
        toolbar = fixture.debugElement.children[0].componentInstance;
    });
    it('should display by default', function () {
        fixture.detectChanges();
        var toolbarEl = fixture.debugElement.query(platform_browser_1.By.css('p-toolbar'));
        expect(toolbarEl.nativeElement).toBeTruthy();
        expect(toolbarEl.nativeElement.children[0].children.length).toEqual(2);
    });
    it('should change style and styleClass', function () {
        toolbar.style = { 'primeng': 'rocks!' };
        toolbar.styleClass = "Primeng ROCKS!";
        fixture.detectChanges();
        var toolbarEl = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
        expect(toolbarEl.className).toContain("Primeng ROCKS!");
        expect(toolbarEl.style.primeng).toEqual("rocks!");
    });
    it('should show ng-content', function () {
        fixture.detectChanges();
        var contentEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-toolbar-group-left')).nativeElement;
        expect(contentEl).toBeTruthy();
    });
});
//# sourceMappingURL=toolbar.spec.js.map