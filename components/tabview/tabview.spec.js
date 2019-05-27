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
var tabview_1 = require("./tabview");
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("../../../../node_modules/@angular/core");
var tooltip_1 = require("../tooltip/tooltip");
var shared_1 = require("../common/shared");
var TestTabViewComponent = /** @class */ (function () {
    function TestTabViewComponent() {
    }
    TestTabViewComponent = __decorate([
        core_1.Component({
            template: "<p-tabView>\n        <p-tabPanel header=\"Godfather I\" leftIcon=\"pi pi-calendar\">\n            The story begins as Don Vito Corleone, the head of a New York Mafia family, overseeshis daughter's wedding. His beloved son ichael has just come home from the war, but does not intend to become part of his father's business. T hrough Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family, kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the family.\n        </p-tabPanel>\n        <p-tabPanel header=\"Godfather II\" leftIcon=\"pi pi-inbox\">\n            Francis Ford Coppola's legendary continuation and sequel to his landmark 1972 film, The_Godfather parallels the young Vito Corleone's rise with his son Michael's spiritual fall, deepening The_Godfather's depiction of the dark side of the American dream. In the early 1900s, the child Vito flees his Sicilian village for America after the local Mafia kills his family. Vito struggles to make a living, legally or illegally, for his wife and growing brood in Little Italy, killing the local Black Hand Fanucci after he demands his customary cut of the tyro's business. With Fanucci gone, Vito's communal stature grows.\n        </p-tabPanel>\n        <p-tabPanel>\n            <ng-template pTemplate=\"header\">Godfather III</ng-template>\n            <ng-template pTemplate=\"content\">\n                After a break of more than  15 years, director Francis Ford Coppola and writer Mario Puzo returned to the well for this third and final story of the fictional Corleone crime family. Two decades have passed, and crime kingpin Michael Corleone, now divorced from his wife Kay has nearly succeeded in keeping his promise that his family would one day be completely legitimate.\n            </ng-template>\n        </p-tabPanel>\n    </p-tabView>"
        })
    ], TestTabViewComponent);
    return TestTabViewComponent;
}());
describe('TabView', function () {
    var tabview;
    var firstTabPanel;
    var secondTabPanel;
    var thirdTabPanel;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                tabview_1.TabView,
                tabview_1.TabPanel,
                tabview_1.TabViewNav,
                tooltip_1.Tooltip,
                TestTabViewComponent,
                shared_1.PrimeTemplate
            ]
        }).compileComponents();
        fixture = testing_1.TestBed.createComponent(TestTabViewComponent);
        tabview = fixture.debugElement.children[0].componentInstance;
        firstTabPanel = fixture.debugElement.children[0].children[0].children[0].children[0].componentInstance;
        secondTabPanel = fixture.debugElement.children[0].children[0].children[0].children[1].componentInstance;
        thirdTabPanel = fixture.debugElement.children[0].children[0].children[0].children[2].componentInstance;
        fixture.detectChanges();
    });
    it('should have a three tabPanel', function () {
        fixture.detectChanges();
        expect(tabview.tabs.length).toEqual(3);
    });
    it('should change the orientation', function () {
        tabview.orientation = "left";
        fixture.detectChanges();
        var tabPanelEl = fixture.debugElement.children[0].query(platform_browser_1.By.css('.ui-tabview')).nativeElement;
        var tabviewEl = fixture.debugElement.children[0].query(platform_browser_1.By.css('.ui-tabview')).nativeElement;
        expect(tabviewEl.className).toContain("ui-tabview-left");
        expect(tabPanelEl.className).toContain("ui-tabview-left");
    });
    it('should change the header', function () {
        fixture.detectChanges();
        firstTabPanel.header = "Primeng ROCKS!";
        secondTabPanel.header = "Primeng ROCKS!";
        fixture.detectChanges();
        var firstTabViewNavEl = fixture.debugElement.children[0].children[0].children[0].children[0].nativeElement;
        var secondTabViewNavEl = fixture.debugElement.children[0].children[0].children[0].children[1].nativeElement;
        expect(firstTabViewNavEl.textContent).toContain("Primeng ROCKS!");
        expect(secondTabViewNavEl.textContent).toContain("Primeng ROCKS!");
    });
    it('should disabled', function () {
        fixture.detectChanges();
        firstTabPanel.disabled = true;
        fixture.detectChanges();
        var firstTabViewNavEl = fixture.debugElement.children[0].children[0].children[0].children[0].nativeElement;
        expect(firstTabViewNavEl.className).toContain("ui-state-disabled");
    });
    it('should closable and element count should be 2', function () {
        fixture.detectChanges();
        firstTabPanel.closable = true;
        fixture.detectChanges();
        var firstTabViewNavEl = fixture.debugElement.children[0].children[0].children[0].children[0].query(platform_browser_1.By.css('.ui-tabview-close')).nativeElement;
        expect(firstTabViewNavEl.className).toContain("ui-tabview-close");
        firstTabViewNavEl.click();
        fixture.detectChanges();
        var tabviewElCount = fixture.debugElement.children[0].children[0].children[0].children.length;
        expect(firstTabPanel.closed).toEqual(true);
        expect(tabviewElCount).toEqual(2);
    });
    it('should change left and right icon', function () {
        fixture.detectChanges();
        firstTabPanel.leftIcon = "PrimeNg ROCKS!";
        firstTabPanel.rightIcon = "ALWAYS BET ON PRIME";
        fixture.detectChanges();
        var firstTabViewLeftIconEl = fixture.debugElement.children[0].children[0].children[0].children[0].query(platform_browser_1.By.css('.ui-tabview-left-icon')).nativeElement;
        var firstTabViewRightIconEl = fixture.debugElement.children[0].children[0].children[0].children[0].query(platform_browser_1.By.css('.ui-tabview-right-icon')).nativeElement;
        expect(firstTabViewLeftIconEl.className).toContain("PrimeNg ROCKS!");
        expect(firstTabViewRightIconEl.className).toContain("ALWAYS BET ON PRIME");
    });
    it('should change headerStyle and headerStyleClass', function () {
        fixture.detectChanges();
        firstTabPanel.headerStyle = { "prime": "rock" };
        firstTabPanel.headerStyleClass = "Primeng ROCKS!";
        fixture.detectChanges();
        var firstTabViewNavEl = fixture.debugElement.children[0].children[0].children[0].children[0].nativeElement;
        expect(firstTabViewNavEl.className).toContain("Primeng ROCKS!");
        expect(firstTabViewNavEl.style.prime).toContain("rock");
    });
    it('should change style and styleClass', function () {
        fixture.detectChanges();
        tabview.style = { "prime": "rock" };
        tabview.styleClass = "Primeng ROCKS!";
        fixture.detectChanges();
        var firstTabViewNavEl = fixture.debugElement.children[0].children[0].nativeElement;
        expect(firstTabViewNavEl.className).toContain("Primeng ROCKS!");
        expect(firstTabViewNavEl.style.prime).toContain("rock");
    });
    it('should cache true by default', function () {
        fixture.detectChanges();
        expect(firstTabPanel.cache).toEqual(true);
        expect(secondTabPanel.cache).toEqual(true);
        expect(thirdTabPanel.cache).toEqual(true);
    });
    it('should open by activeIndex', function () {
        tabview.activeIndex = 1;
        fixture.detectChanges();
        var firstTabViewNavEl = fixture.debugElement.children[0].children[0].children[0].children[0].nativeElement;
        var secondTabViewNavEl = fixture.debugElement.children[0].children[0].children[0].children[1].nativeElement;
        var thirdTabViewNavEl = fixture.debugElement.children[0].children[0].children[0].children[2].nativeElement;
        expect(firstTabViewNavEl.className).not.toContain('ui-tabview-selected ui-state-active');
        expect(secondTabViewNavEl.className).toContain('ui-tabview-selected ui-state-active');
        expect(thirdTabViewNavEl.className).not.toContain('ui-tabview-selected ui-state-active');
    });
    it('should change activeIndex', function () {
        tabview.activeIndex = 1;
        fixture.detectChanges();
        var activeIndex;
        var firstTabViewNavEl = fixture.debugElement.children[0].children[0].children[0].children[0].nativeElement;
        tabview.activeIndexChange.subscribe(function (value) { return activeIndex = value; });
        firstTabViewNavEl.click();
        expect(activeIndex).toEqual(0);
    });
    it('should display header template', function () {
        tabview.activeIndex = 2;
        fixture.detectChanges();
        var thirdTabViewNavEl = fixture.debugElement.children[0].children[0].children[0].children[2].nativeElement;
        expect(thirdTabViewNavEl.textContent).toContain("Godfather III");
    });
});
//# sourceMappingURL=tabview.spec.js.map