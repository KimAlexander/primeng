import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Editor } from './editor';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
describe('Editor', function () {
    var editor;
    var fixture;
    beforeEach(function () {
        TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule
            ],
            declarations: [
                Editor
            ]
        });
        fixture = TestBed.createComponent(Editor);
        editor = fixture.componentInstance;
    });
    it('should display by default', function () {
        fixture.detectChanges();
        var editorEl = fixture.debugElement.query(By.css('.ui-editor-container'));
        expect(editorEl.nativeElement).toBeTruthy();
    });
    it('should show value', function () {
        editor.value = "V";
        fixture.detectChanges();
        fixture.detectChanges();
        var paragraphEl = fixture.debugElement.query(By.css('.ui-editor-content')).nativeElement.children[0].children[0];
        expect(paragraphEl.textContent).toEqual("V");
    });
    it('should call quill paste event and setText event', function () {
        fixture.detectChanges();
        var quillPasteSpy = spyOn(editor.quill, "pasteHTML").and.callThrough();
        var setTextSpy = spyOn(editor.quill, "setText").and.callThrough();
        editor.writeValue("V");
        fixture.detectChanges();
        var paragraphEl = fixture.debugElement.query(By.css('.ui-editor-content')).nativeElement.children[0].children[0];
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