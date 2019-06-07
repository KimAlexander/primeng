var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CodeHighlighter } from './codehighlighter';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
var TestCodeHighlighterComponent = /** @class */ (function () {
    function TestCodeHighlighterComponent() {
    }
    TestCodeHighlighterComponent = __decorate([
        Component({
            template: "\n  <pre>\n    <code  pCode ngNonBindable class=\"language-css\">\n    .ui-datatable table &#123;\n        border-collapse:collapse;\n        width: 100%;\n        table-layout: fixed;\n    &#125;\n    </code>\n  </pre>"
        })
    ], TestCodeHighlighterComponent);
    return TestCodeHighlighterComponent;
}());
describe('CodeHighlighter', function () {
    var codehighlighter;
    var fixture;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                CodeHighlighter,
                TestCodeHighlighterComponent
            ]
        });
        fixture = TestBed.createComponent(TestCodeHighlighterComponent);
        codehighlighter = fixture.debugElement.children[0].componentInstance;
    });
    it('should display by default', function () {
        fixture.detectChanges();
        var codeEl = fixture.debugElement.query(By.css('code'));
        expect(codeEl.nativeElement).toBeTruthy();
    });
});
//# sourceMappingURL=codehighlighter.spec.js.map