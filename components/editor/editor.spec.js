"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var editor_1 = require("./editor");
var animations_1 = require("@angular/platform-browser/animations");
describe('Editor', function () {
    var editor;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule
            ],
            declarations: [
                editor_1.Editor
            ]
        });
        fixture = testing_1.TestBed.createComponent(editor_1.Editor);
        editor = fixture.componentInstance;
    });
    it('should display by default', function () {
        fixture.detectChanges();
        var editorEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-editor-container'));
        expect(editorEl.nativeElement).toBeTruthy();
    });
    it('should show value', function () {
        editor.value = "V";
        fixture.detectChanges();
        fixture.detectChanges();
        var paragraphEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-editor-content')).nativeElement.children[0].children[0];
        expect(paragraphEl.textContent).toEqual("V");
    });
    it('should call quill paste event and setText event', function () {
        fixture.detectChanges();
        var quillPasteSpy = spyOn(editor.quill, "pasteHTML").and.callThrough();
        var setTextSpy = spyOn(editor.quill, "setText").and.callThrough();
        editor.writeValue("V");
        fixture.detectChanges();
        var paragraphEl = fixture.debugElement.query(platform_browser_1.By.css('.ui-editor-content')).nativeElement.children[0].children[0];
        expect(paragraphEl.textContent).toEqual("V");
        expect(quillPasteSpy).toHaveBeenCalled();
        editor.writeValue("");
        fixture.detectChanges();
        expect(setTextSpy).toHaveBeenCalled();
    });
    it('should call enable and disable', function () {
        fixture.detectChanges();
        var disableSpy = spyOn(editor.quill, "disable").and.callThrough();
        var enableSpy = spyOn(editor.quill, "enable").and.callThrough();
        editor.readonly = true;
        fixture.detectChanges();
        editor.readonly = false;
        fixture.detectChanges();
        expect(disableSpy).toHaveBeenCalled();
        expect(enableSpy).toHaveBeenCalled();
    });
    it('should get quill', function () {
        fixture.detectChanges();
        var quill = editor.getQuill();
        expect(quill.container.className).toContain("ui-editor-content");
    });
});
//# sourceMappingURL=editor.spec.js.map