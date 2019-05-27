"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var fileupload_1 = require("./fileupload");
var animations_1 = require("@angular/platform-browser/animations");
var progressbar_1 = require("../progressbar/progressbar");
var button_1 = require("../button/button");
var shared_1 = require("../common/shared");
var messages_1 = require("../messages/messages");
var http_1 = require("@angular/common/http");
describe('FileUpload', function () {
    var fileupload;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                animations_1.NoopAnimationsModule,
                progressbar_1.ProgressBarModule,
                messages_1.MessagesModule,
                button_1.ButtonModule,
                http_1.HttpClientModule
            ],
            declarations: [
                fileupload_1.FileUpload,
                shared_1.PrimeTemplate,
            ]
        });
        fixture = testing_1.TestBed.createComponent(fileupload_1.FileUpload);
        fileupload = fixture.componentInstance;
    });
    it('should display by default (basic)', function () {
        fileupload.mode = "basic";
        fixture.detectChanges();
        var fileuploadEl = fixture.debugElement.query(platform_browser_1.By.css('span'));
        expect(fileuploadEl).toBeTruthy();
        expect(fileuploadEl.nativeElement.className).toContain("ui-fileupload-choose");
        expect(fileuploadEl.nativeElement.className).toContain("ui-button");
        expect(fixture.debugElement.query(platform_browser_1.By.css('div'))).toBeFalsy();
    });
    it('should display by default (advanced)', function () {
        fixture.detectChanges();
        var fileuploadEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        expect(fileuploadEl).toBeTruthy();
        expect(fileuploadEl.nativeElement.className).toContain("ui-fileupload ui-widget");
        expect(fileuploadEl.children.length).toEqual(2);
    });
    it('should change style, styleClass, chooseLabel, uploadLabel, cancelLabel, showUploadButton and showCancelButton (advanced)', function () {
        fileupload.style = { 'primeng': 'rocks!' };
        fileupload.styleClass = "Primeng ROCKS!";
        fileupload.chooseLabel = "primeng";
        fileupload.uploadLabel = "primeng";
        fileupload.cancelLabel = "primeng";
        fixture.detectChanges();
        var fileuploadEl = fixture.debugElement.query(platform_browser_1.By.css('div'));
        var uploadButton = fixture.debugElement.queryAll(platform_browser_1.By.css('button'))[0];
        var cancelButton = fixture.debugElement.queryAll(platform_browser_1.By.css('button'))[1];
        var chooseButton = fixture.debugElement.query(platform_browser_1.By.css(".ui-fileupload-choose"));
        expect(fileuploadEl).toBeTruthy();
        expect(fileuploadEl.nativeElement.className).toContain("Primeng ROCKS!");
        expect(fileuploadEl.nativeElement.style.primeng).toContain("rocks!");
        expect(uploadButton).toBeTruthy();
        expect(cancelButton).toBeTruthy();
        expect(uploadButton.nativeElement.textContent).toEqual("primeng");
        expect(cancelButton.nativeElement.textContent).toEqual("primeng");
        expect(chooseButton.nativeElement.textContent).toEqual("primeng");
    });
    it('should call onFileSelect (advanced)', function () {
        fixture.detectChanges();
        var event;
        event = {
            'target': { files: [{
                        'lastModified': 1533276674178,
                        'name': 'primeng.txt',
                        'size': 179,
                        'type': "text/plain"
                    }] }
        };
        fileupload.onFileSelect(event);
        fixture.detectChanges();
        var uploadButton = fixture.debugElement.queryAll(platform_browser_1.By.css('button'))[0];
        var cancelButton = fixture.debugElement.queryAll(platform_browser_1.By.css('button'))[1];
        var fileUploadRow = fixture.debugElement.query(platform_browser_1.By.css('.ui-fileupload-row'));
        var fileNameEl = fileUploadRow.children[1];
        var fileSizeEl = fileUploadRow.children[2];
        var removeButtonEl = fileUploadRow.query(platform_browser_1.By.css('button'));
        expect(fileUploadRow).toBeTruthy();
        expect(fileNameEl).toBeTruthy();
        expect(fileNameEl).toBeTruthy();
        expect(removeButtonEl).toBeTruthy();
        expect(fileNameEl.nativeElement.textContent).toEqual('primeng.txt');
        expect(fileSizeEl.nativeElement.textContent).toEqual('179 B');
        expect(fileupload.hasFiles()).toEqual(true);
        expect(uploadButton.nativeElement.disabled).toEqual(false);
        expect(cancelButton.nativeElement.disabled).toEqual(false);
    });
    it('should call upload (advanced)', function () {
        fileupload.auto = true;
        fileupload.url = " ";
        fixture.detectChanges();
        var event;
        event = {
            'target': { files: [{
                        'lastModified': 1533276674178,
                        'name': 'primeng.txt',
                        'size': 179,
                        'type': "text/plain"
                    }] }
        };
        var uploadSpy = spyOn(fileupload, "upload").and.callThrough();
        fileupload.onFileSelect(event);
        fixture.detectChanges();
        expect(uploadSpy).toHaveBeenCalled();
    });
    it('should call upload with customUpload (advanced)', function () {
        fileupload.auto = true;
        fileupload.customUpload = true;
        fileupload.url = " ";
        var data;
        fileupload.uploadHandler.subscribe(function (value) { return data = value; });
        fixture.detectChanges();
        var event;
        event = {
            'target': { files: [{
                        'lastModified': 1533276674178,
                        'name': 'primeng.txt',
                        'size': 179,
                        'type': "text/plain"
                    }] }
        };
        var uploadSpy = spyOn(fileupload, "upload").and.callThrough();
        fileupload.onFileSelect(event);
        fixture.detectChanges();
        expect(uploadSpy).toHaveBeenCalled();
        expect(data.files).toEqual(event.target.files);
    });
    it('should call onDrageEnter onDragLeave onDrop and onFileSelect (advanced)', function () {
        fileupload.customUpload = true;
        fileupload.url = " ";
        fileupload.multiple = true;
        fixture.detectChanges();
        var event;
        event = {
            'target': { files: [{
                        'lastModified': 1533276674178,
                        'name': 'primeng.txt',
                        'size': 179,
                        'type': "text/plain"
                    }] },
            stopPropagation: function () { },
            preventDefault: function () { }
        };
        var event2;
        event2 = {
            'target': { files: [{
                        'lastModified': 1533276684178,
                        'name': 'prime.txt',
                        'size': 179,
                        'type': "text/plain"
                    }] },
            stopPropagation: function () { },
            preventDefault: function () { }
        };
        fileupload.onFileSelect(event);
        fixture.detectChanges();
        var onDragEnterSpy = spyOn(fileupload, "onDragEnter").and.callThrough();
        var onDragLeaveSpy = spyOn(fileupload, "onDragLeave").and.callThrough();
        var onDropSpy = spyOn(fileupload, "onDrop").and.callThrough();
        var onFileSelectSpy = spyOn(fileupload, "onFileSelect").and.callThrough();
        fileupload.onDragEnter(event);
        fileupload.onDragOver(event);
        fixture.detectChanges();
        var contentEl = fixture.debugElement.query(platform_browser_1.By.css(".ui-fileupload-content"));
        expect(fileupload.dragHighlight).toEqual(true);
        expect(contentEl.nativeElement.className).toContain("ui-fileupload-highlight");
        expect(onDragEnterSpy).toHaveBeenCalled();
        fileupload.onDragLeave(event);
        fixture.detectChanges();
        expect(onDragLeaveSpy).toHaveBeenCalled();
        expect(contentEl.nativeElement.className).not.toContain("ui-fileupload-highlight");
        fileupload.onDrop(event2);
        fixture.detectChanges();
        expect(onDropSpy).toHaveBeenCalled();
        expect(onFileSelectSpy).toHaveBeenCalled();
        expect(fileupload.files.length).toEqual(2);
    });
    it('should call clear and remove (advanced)', function () {
        fileupload.customUpload = true;
        fileupload.url = " ";
        fileupload.multiple = true;
        fixture.detectChanges();
        var event;
        event = {
            'target': { files: [{
                        'lastModified': 1533276674178,
                        'name': 'primeng.txt',
                        'size': 179,
                        'type': "text/plain"
                    }] },
            stopPropagation: function () { },
            preventDefault: function () { }
        };
        var event2;
        event2 = {
            'target': { files: [{
                        'lastModified': 1533276684178,
                        'name': 'prime.txt',
                        'size': 179,
                        'type': "text/plain"
                    }] },
            stopPropagation: function () { },
            preventDefault: function () { }
        };
        var removeSpy = spyOn(fileupload, "remove").and.callThrough();
        var clearSpy = spyOn(fileupload, "clear").and.callThrough();
        fileupload.onFileSelect(event);
        fileupload.onFileSelect(event2);
        fixture.detectChanges();
        var buttons = fixture.debugElement.queryAll(platform_browser_1.By.css("button"));
        var firstElRemoveButton = buttons[2];
        firstElRemoveButton.nativeElement.click();
        fixture.detectChanges();
        expect(fileupload.files.length).toEqual(1);
        expect(removeSpy).toHaveBeenCalled();
        fileupload.onFileSelect(event);
        fixture.detectChanges();
        var clearButton = buttons[1];
        clearButton.nativeElement.click();
        fixture.detectChanges();
        expect(fileupload.files.length).toEqual(0);
        expect(clearSpy).toHaveBeenCalled();
    });
    it('should display by default (basic)', function () {
        fileupload.mode = "basic";
        fileupload.url = " ";
        fixture.detectChanges();
        var event;
        event = {
            'target': { files: [{
                        'lastModified': 1533276674178,
                        'name': 'primeng.txt',
                        'size': 179,
                        'type': "text/plain"
                    }] },
            stopPropagation: function () { },
            preventDefault: function () { }
        };
        var uploadSpy = spyOn(fileupload, "upload").and.callThrough();
        var onSimpleUploaderClickSpy = spyOn(fileupload, "onSimpleUploaderClick").and.callThrough();
        fileupload.onFileSelect(event);
        fixture.detectChanges();
        fileupload.onSimpleUploaderClick(event);
        fixture.detectChanges();
        expect(uploadSpy).toHaveBeenCalled();
        expect(onSimpleUploaderClickSpy).toHaveBeenCalled();
    });
    it('should accept all of multiple given MIME types', function () {
        var mockFile1 = { type: "application/pdf", name: "test.pdf" };
        var mockFile2 = { type: "image/png", name: "test.png" };
        fileupload.accept = "application/pdf, image/png";
        expect(fileupload.isFileTypeValid(mockFile1)).toBe(true);
        expect(fileupload.isFileTypeValid(mockFile2)).toBe(true);
    });
    it('should handle wildcards in MIME subtypes', function () {
        var mockFile1 = { type: "application/pdf", name: "test.pdf" };
        var mockFile2 = { type: "image/png", name: "test.png" };
        fileupload.accept = "image/*";
        expect(fileupload.isFileTypeValid(mockFile1)).toBe(false);
        expect(fileupload.isFileTypeValid(mockFile2)).toBe(true);
    });
});
//# sourceMappingURL=fileupload.spec.js.map