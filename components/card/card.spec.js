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
var card_1 = require("./card");
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("@angular/core");
var shared_1 = require("../common/shared");
var TestCardComponent = /** @class */ (function () {
    function TestCardComponent() {
    }
    TestCardComponent = __decorate([
        core_1.Component({
            template: "<p-card>\n  <p-header>\n      <img src=\"Card\" src=\"assets/showcase/images/usercard.png\">\n  </p-header>\n  <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt\n      quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</div>\n  <p-footer>\n      <button  type=\"button\" label=\"Save\" icon=\"pi pi-check\" style=\"margin-right: .25em\"></button>\n      <button  type=\"button\" label=\"Cancel\" icon=\"pi pi-times\" class=\"ui-button-secondary\"></button>\n  </p-footer>\n</p-card>"
        })
    ], TestCardComponent);
    return TestCardComponent;
}());
describe('Card', function () {
    var card;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                card_1.Card,
                TestCardComponent,
                shared_1.Header,
                shared_1.Footer
            ],
        });
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(TestCardComponent);
        card = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });
    it('should display by default', function () {
        fixture.detectChanges();
        var cardEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        expect(cardEl.nativeElement).toBeTruthy();
    });
    it('should display the title', function () {
        card.header = "Primeng ROCKS!";
        fixture.detectChanges();
        var cardEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-card-title')).nativeElement;
        expect(cardEl.textContent).toEqual("Primeng ROCKS!");
    });
    it('should display the subtitle', function () {
        card.subheader = "Primeng ROCKS!";
        fixture.detectChanges();
        var cardEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-card-subtitle')).nativeElement;
        expect(cardEl.textContent).toEqual("Primeng ROCKS!");
    });
    it('should change style and styleClass', function () {
        card.styleClass = "Primeng ROCKS!";
        card.style = { 'primeng': 'rocks!' };
        fixture.detectChanges();
        var cardEl = fixture.debugElement.query(platform_browser_1.By.css('div')).nativeElement;
        expect(cardEl.className).toContain("Primeng ROCKS!");
        expect(cardEl.style.primeng).toEqual("rocks!");
    });
    it('should have a header', function () {
        fixture.detectChanges();
        var headerEl = fixture.debugElement.query(platform_browser_1.By.css('p-header')).nativeElement;
        var cardHeaderEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-card-header')).nativeElement;
        expect(headerEl).toBeTruthy();
        expect(cardHeaderEl).toBeTruthy();
        expect(cardHeaderEl.children[0].children.length).toEqual(1);
    });
    it('should have a  footer', function () {
        fixture.detectChanges();
        var footerEl = fixture.debugElement.query(platform_browser_1.By.css('p-footer')).nativeElement;
        var cardFooterEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-card-footer')).nativeElement;
        expect(footerEl).toBeTruthy();
        expect(cardFooterEl).toBeTruthy();
        expect(cardFooterEl.children[0].children.length).toEqual(2);
    });
    it('should not have a header', function () {
        card.headerFacet = null;
        fixture.detectChanges();
        var cardHeaderEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-card-header'));
        expect(cardHeaderEl).toBeFalsy();
    });
    it('should not have a  footer', function () {
        card.footerFacet = null;
        fixture.detectChanges();
        var cardFooterEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-card-footer'));
        expect(cardFooterEl).toBeFalsy();
    });
});
//# sourceMappingURL=card.spec.js.map