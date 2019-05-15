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
var accordion_1 = require("./accordion");
var accordion_2 = require("./accordion");
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("../../../../node_modules/@angular/core");
var TestAccordionComponent = /** @class */ (function () {
    function TestAccordionComponent() {
    }
    TestAccordionComponent = __decorate([
        core_1.Component({
            template: "<p-accordion>\n  <p-accordionTab header=\"Godfather I\" >\n      The story begins as Don Vito Corleone, the head of a New York Mafia family, overseeshis daughter's wedding. His beloved son ichael has just come home from the war, but does not intend to become part of his father's business. T hrough Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family, kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the family.\n  </p-accordionTab>\n  <p-accordionTab header=\"Godfather II\" >\n      The story begins as Don Vito Corleone, the head of a New York Mafia family, overseeshis daughter's wedding. His beloved son ichael has just come home from the war, but does not intend to become part of his father's business. T hrough Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family, kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the family.\n  </p-accordionTab>\n</p-accordion>"
        })
    ], TestAccordionComponent);
    return TestAccordionComponent;
}());
describe('Accordion', function () {
    var accordion;
    var firstAccordionTab;
    var secondAccordionTab;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            schemas: [core_1.NO_ERRORS_SCHEMA],
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                accordion_1.Accordion,
                accordion_2.AccordionTab,
                TestAccordionComponent
            ],
        });
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(TestAccordionComponent);
        accordion = fixture.debugElement.children[0].componentInstance;
        firstAccordionTab = fixture.debugElement.children[0].children[0].children[0].componentInstance;
        secondAccordionTab = fixture.debugElement.children[0].children[0].children[1].componentInstance;
        fixture.detectChanges();
    });
    it('should have a two accordionTab', function () {
        fixture.detectChanges();
        expect(accordion.tabs.length).toBe(2);
    });
    it('should change header', function () {
        firstAccordionTab.header = "Primeng ROCKS";
        fixture.detectChanges();
        var accordionTabHeaderEl = fixture.debugElement.children[0].children[0].children[0].query(platform_browser_1.By.css('.ui-accordion-header-text'));
        expect(accordionTabHeaderEl.nativeElement.textContent).toContain("Primeng ROCKS");
    });
    it('should have selected first accordionTab and second accordionTab should be unselected', function () {
        firstAccordionTab.selected = true;
        fixture.detectChanges();
        var firstAccordionTabHeaderEl = fixture.debugElement.children[0].children[0].children[0].query(platform_browser_1.By.css('.ui-accordion-header')).nativeElement;
        var secondAccordionTabHeaderEl = fixture.debugElement.children[0].children[0].children[1].query(platform_browser_1.By.css('.ui-accordion-header')).nativeElement;
        expect(firstAccordionTabHeaderEl.className).toContain('ui-state-active');
        expect(secondAccordionTabHeaderEl.className).not.toContain('ui-state-active');
    });
    it('should have a multiple select and all accordionTabs should be selected', function () {
        accordion.multiple = true;
        fixture.detectChanges();
        var firstAccordionTabOpenEl = fixture.debugElement.children[0].children[0].children[0].query(platform_browser_1.By.css('a')).nativeElement;
        var secondAccordionTabOpenEl = fixture.debugElement.children[0].children[0].children[1].query(platform_browser_1.By.css('a')).nativeElement;
        secondAccordionTabOpenEl.click();
        firstAccordionTabOpenEl.click();
        fixture.detectChanges();
        var firstAccordionTabHeaderEl = fixture.debugElement.children[0].children[0].children[0].query(platform_browser_1.By.css('.ui-accordion-header')).nativeElement;
        var secondAccordionTabHeaderEl = fixture.debugElement.children[0].children[0].children[1].query(platform_browser_1.By.css('.ui-accordion-header')).nativeElement;
        expect(firstAccordionTabHeaderEl.className).toContain('ui-state-active');
        expect(secondAccordionTabHeaderEl.className).toContain('ui-state-active');
    });
    it('should disabled', function () {
        firstAccordionTab.disabled = true;
        fixture.detectChanges();
        var firstAccordionTabOpenEl = fixture.debugElement.children[0].children[0].children[0].query(platform_browser_1.By.css('a')).nativeElement;
        var accordionTabHeaderEl = fixture.debugElement.children[0].children[0].children[0].query(platform_browser_1.By.css('.ui-accordion-header')).nativeElement;
        firstAccordionTabOpenEl.click();
        expect(accordionTabHeaderEl.className).toContain('ui-state-disabled');
        expect(accordionTabHeaderEl.className).not.toContain("ui-state-active");
    });
    it('should change expandIcon and collapseIcon', function () {
        accordion.collapseIcon = "pi pi-fw pi-caret-left";
        accordion.expandIcon = "pi pi-fw pi-caret-up";
        fixture.detectChanges();
        var firstAccordionTabOpenEl = fixture.debugElement.children[0].children[0].children[0].query(platform_browser_1.By.css('.ui-accordion-toggle-icon')).nativeElement;
        expect(firstAccordionTabOpenEl.className).toContain('pi pi-fw pi-caret-up');
        firstAccordionTab.selected = true;
        fixture.detectChanges();
        expect(firstAccordionTabOpenEl.className).toContain('pi pi-fw pi-caret-left');
    });
    it('should get styleClass', function () {
        accordion.styleClass = "alwaysbetonprime";
        fixture.detectChanges();
        var accordionEl = fixture.debugElement.children[0].query(platform_browser_1.By.css('.ui-accordion')).nativeElement;
        expect(accordionEl.className).toContain('alwaysbetonprime');
    });
    it('should get style', function () {
        accordion.style = { "prime": 'Rocks' };
        fixture.detectChanges();
        var accordionEl = fixture.debugElement.children[0].query(platform_browser_1.By.css('.ui-accordion')).nativeElement;
        expect(accordionEl.style.prime).toContain('Rocks');
    });
    it('should active index change', function () {
        fixture.detectChanges();
        var activeIndex;
        var secondAccordionTabOpenEl = fixture.debugElement.children[0].children[0].children[1].query(platform_browser_1.By.css('a')).nativeElement;
        accordion.onOpen.subscribe(function (value) { return activeIndex = value.index; });
        secondAccordionTabOpenEl.click();
        expect(activeIndex).toEqual(1);
    });
    it('should be closed', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        var activeIndex;
        var secondAccordionTabOpenEl = fixture.debugElement.children[0].children[0].children[1].query(platform_browser_1.By.css('a')).nativeElement;
        accordion.onOpen.subscribe(function (value) { return activeIndex = value.index; });
        secondAccordionTabOpenEl.click();
        fixture.detectChanges();
        testing_1.tick(150);
        secondAccordionTabOpenEl.click();
        fixture.detectChanges();
        var secondAccordionTabHeaderEl = fixture.debugElement.children[0].children[0].children[1].query(platform_browser_1.By.css('.ui-accordion-header')).nativeElement;
        expect(secondAccordionTabHeaderEl.className).not.toContain('ui-state-active');
    }));
    it('should have an activeIndex', function () {
        fixture.detectChanges();
        accordion.activeIndex = 1;
        fixture.detectChanges();
        var secondAccordionTabHeaderEl = fixture.debugElement.children[0].children[0].children[1].query(platform_browser_1.By.css('.ui-accordion-header')).nativeElement;
        expect(secondAccordionTabHeaderEl.className).toContain('ui-state-active');
    });
    it('should be closed', function () {
        fixture.detectChanges();
        var secondAccordionTabOpenEl = fixture.debugElement.children[0].children[0].children[1].query(platform_browser_1.By.css('a')).nativeElement;
        var spaceEvent = { 'which': 32, preventDefault: function () { } };
        secondAccordionTab.onKeydown(spaceEvent);
        fixture.detectChanges();
        var secondAccordionTabHeaderEl = fixture.debugElement.children[0].children[0].children[1].query(platform_browser_1.By.css('.ui-accordion-header')).nativeElement;
        expect(secondAccordionTabHeaderEl.className).toContain('ui-state-active');
    });
});
//# sourceMappingURL=accordion.spec.js.map