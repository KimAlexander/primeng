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
var scrollpanel_1 = require("./scrollpanel");
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("../../../../node_modules/@angular/core");
var TestScrollPanelComponent = /** @class */ (function () {
    function TestScrollPanelComponent() {
    }
    TestScrollPanelComponent = __decorate([
        core_1.Component({
            template: "\n\t<div class=\"ui-g\">\n\t\t<div class=\"ui-g-12 ui-md-4\" style=\"width:200px\">\n\t\t\t<p-scrollPanel [style]=\"{width: '100%', height: '200px'}\" styleClass=\"custombar1\">\n\t\t\t\t<div style=\"padding:1em;line-height:1.5;width:600px;\">\n\t\t\t\t\tThe story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter's wedding. His beloved\n\t\t\t\t\tson Michael has just come home from the war, but does not intend to become part of his father's business.\n\t\t\t\t\tThrough Michael's life the nature of the family business becomes clear. The business of the family is just\n\t\t\t\t\tlike the head of the family, kind and benevolent to those who give respect, but given to ruthless violence\n\t\t\t\t\twhenever anything stands against the good of the family. The story begins as Don Vito Corleone, the head\n\t\t\t\t\tof a New York Mafia family, oversees his daughter's wedding. His beloved son Michael has just come home from\n\t\t\t\t\tthe war, but does not intend to become part of his father's business. Through Michael's life the nature of\n\t\t\t\t\tthe family business becomes clear. The business of the family is just like the head of the family, kind and\n\t\t\t\t\tbenevolent to those who give respect, but given to ruthless violence whenever anything stands against the\n\t\t\t\t\tgood of the family.\n\t\t\t\t</div>\n\t\t\t</p-scrollPanel>\n\t\t</div>\n\t</div>\n\t"
        })
    ], TestScrollPanelComponent);
    return TestScrollPanelComponent;
}());
describe('ScrollPanel', function () {
    var scrollpanel;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                scrollpanel_1.ScrollPanel,
                TestScrollPanelComponent
            ]
        });
        fixture = testing_1.TestBed.createComponent(TestScrollPanelComponent);
        scrollpanel = fixture.debugElement.children[0].children[0].children[0].componentInstance;
    });
    it('should created by default', function () {
        fixture.detectChanges();
        var scrollPanelEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-scrollpanel'));
        expect(scrollPanelEl.nativeElement).toBeTruthy();
    });
    it('should scroll when mousedown and move (y)', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        var scrollTopVal = scrollpanel.contentViewChild.nativeElement.scrollTop;
        var barYEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-scrollpanel-bar-y'));
        var mousedownEvent = document.createEvent('CustomEvent');
        mousedownEvent.pageY = 201;
        mousedownEvent.initEvent('mousedown', true, true);
        var mouseMoveEvent = document.createEvent('CustomEvent');
        mouseMoveEvent.pageY = 250;
        mouseMoveEvent.initEvent('mousemove', true, true);
        barYEl.nativeElement.dispatchEvent(mousedownEvent);
        fixture.detectChanges();
        expect(document.body.className).toContain("ui-scrollpanel-grabbed");
        document.dispatchEvent(mouseMoveEvent);
        testing_1.tick(150);
        fixture.detectChanges();
        expect(scrollTopVal).not.toEqual(scrollpanel.contentViewChild.nativeElement.scrollTop);
        var mouseUpEvent = document.createEvent('CustomEvent');
        mouseUpEvent.pageY = 201;
        mouseUpEvent.initEvent('mouseup', true, true);
        barYEl.nativeElement.dispatchEvent(mouseUpEvent);
    }));
    it('should scroll when mousedown and move (x)', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        var scrollLeftVal = scrollpanel.contentViewChild.nativeElement.scrollLeft;
        var barXEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-scrollpanel-bar-x'));
        var mousedownEvent = document.createEvent('CustomEvent');
        mousedownEvent.pageX = 201;
        mousedownEvent.initEvent('mousedown', true, true);
        var mouseMoveEvent = document.createEvent('CustomEvent');
        mouseMoveEvent.pageX = 250;
        mouseMoveEvent.initEvent('mousemove', true, true);
        barXEl.nativeElement.dispatchEvent(mousedownEvent);
        fixture.detectChanges();
        expect(document.body.className).toContain("ui-scrollpanel-grabbed");
        document.dispatchEvent(mouseMoveEvent);
        testing_1.tick(150);
        fixture.detectChanges();
        expect(scrollLeftVal).not.toEqual(scrollpanel.contentViewChild.nativeElement.scrollLeft);
        var mouseUpEvent = document.createEvent('CustomEvent');
        mouseUpEvent.pageY = 201;
        mouseUpEvent.initEvent('mouseup', true, true);
        barXEl.nativeElement.dispatchEvent(mouseUpEvent);
    }));
    it('should scroll with scrollTop', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        var scrollTopVal = scrollpanel.contentViewChild.nativeElement.scrollTop;
        scrollpanel.scrollTop(150);
        fixture.detectChanges();
        expect(scrollTopVal).not.toEqual(scrollpanel.contentViewChild.nativeElement.scrollTop);
    }));
});
//# sourceMappingURL=scrollpanel.spec.js.map