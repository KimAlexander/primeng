var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { NgModule, Component, OnDestroy, Input, Output, EventEmitter, TemplateRef, AfterViewInit, AfterContentInit, ContentChildren, QueryList, ViewChild, ElementRef, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { ProgressBarModule } from 'primeng/progressbar';
import { DomHandler } from 'primeng/dom';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from "@angular/common/http";
var FileUpload = /** @class */ (function () {
    function FileUpload(el, sanitizer, zone, http) {
        this.el = el;
        this.sanitizer = sanitizer;
        this.zone = zone;
        this.http = http;
        this.method = 'POST';
        this.invalidFileSizeMessageSummary = '{0}: Invalid file size, ';
        this.invalidFileSizeMessageDetail = 'maximum upload size is {0}.';
        this.invalidFileTypeMessageSummary = '{0}: Invalid file type, ';
        this.invalidFileTypeMessageDetail = 'allowed file types: {0}.';
        this.invalidFileLimitMessageDetail = 'limit is {0} at most.';
        this.invalidFileLimitMessageSummary = 'Maximum number of files exceeded, ';
        this.previewWidth = 50;
        this.chooseLabel = 'Choose';
        this.uploadLabel = 'Upload';
        this.cancelLabel = 'Cancel';
        this.chooseIcon = 'pi pi-plus';
        this.uploadIcon = 'pi pi-upload';
        this.cancelIcon = 'pi pi-times';
        this.showUploadButton = true;
        this.showCancelButton = true;
        this.mode = 'advanced';
        this.onBeforeUpload = new EventEmitter();
        this.onSend = new EventEmitter();
        this.onUpload = new EventEmitter();
        this.onError = new EventEmitter();
        this.onClear = new EventEmitter();
        this.onRemove = new EventEmitter();
        this.onSelect = new EventEmitter();
        this.onProgress = new EventEmitter();
        this.uploadHandler = new EventEmitter();
        this._files = [];
        this.progress = 0;
        this.uploadedFileCount = 0;
    }
    Object.defineProperty(FileUpload.prototype, "files", {
        get: function () {
            return this._files;
        },
        set: function (files) {
            this._files = [];
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if (this.validate(file)) {
                    if (this.isImage(file)) {
                        file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
                    }
                    this._files.push(files[i]);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    FileUpload.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'file':
                    _this.fileTemplate = item.template;
                    break;
                case 'content':
                    _this.contentTemplate = item.template;
                    break;
                case 'toolbar':
                    _this.toolbarTemplate = item.template;
                    break;
                default:
                    _this.fileTemplate = item.template;
                    break;
            }
        });
    };
    FileUpload.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.mode === 'advanced') {
            this.zone.runOutsideAngular(function () {
                if (_this.content)
                    _this.content.nativeElement.addEventListener('dragover', _this.onDragOver.bind(_this));
            });
        }
    };
    FileUpload.prototype.onFileSelect = function (event) {
        if (event.type !== 'drop' && this.isIE11() && this.duplicateIEEvent) {
            this.duplicateIEEvent = false;
            return;
        }
        this.msgs = [];
        if (!this.multiple) {
            this.files = [];
        }
        var files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (!this.isFileSelected(file)) {
                if (this.validate(file)) {
                    if (this.isImage(file)) {
                        file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
                    }
                    this.files.push(files[i]);
                }
            }
        }
        this.onSelect.emit({ originalEvent: event, files: files, currentFiles: this.files });
        if (this.fileLimit && this.mode == "advanced") {
            this.checkFileLimit();
        }
        if (this.hasFiles() && this.auto && (!(this.mode === "advanced") || !this.isFileLimitExceeded())) {
            this.upload();
        }
        if (event.type !== 'drop' && this.isIE11()) {
            this.clearIEInput();
        }
        else {
            this.clearInputElement();
        }
    };
    FileUpload.prototype.isFileSelected = function (file) {
        var e_1, _a;
        try {
            for (var _b = __values(this.files), _c = _b.next(); !_c.done; _c = _b.next()) {
                var sFile = _c.value;
                if ((sFile.name + sFile.type + sFile.size) === (file.name + file.type + file.size)) {
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
    };
    FileUpload.prototype.isIE11 = function () {
        return !!window['MSInputMethodContext'] && !!document['documentMode'];
    };
    FileUpload.prototype.validate = function (file) {
        if (this.accept && !this.isFileTypeValid(file)) {
            this.msgs.push({
                severity: 'error',
                summary: this.invalidFileTypeMessageSummary.replace('{0}', file.name),
                detail: this.invalidFileTypeMessageDetail.replace('{0}', this.accept)
            });
            return false;
        }
        if (this.maxFileSize && file.size > this.maxFileSize) {
            this.msgs.push({
                severity: 'error',
                summary: this.invalidFileSizeMessageSummary.replace('{0}', file.name),
                detail: this.invalidFileSizeMessageDetail.replace('{0}', this.formatSize(this.maxFileSize))
            });
            return false;
        }
        return true;
    };
    FileUpload.prototype.isFileTypeValid = function (file) {
        var e_2, _a;
        var acceptableTypes = this.accept.split(',').map(function (type) { return type.trim(); });
        try {
            for (var acceptableTypes_1 = __values(acceptableTypes), acceptableTypes_1_1 = acceptableTypes_1.next(); !acceptableTypes_1_1.done; acceptableTypes_1_1 = acceptableTypes_1.next()) {
                var type = acceptableTypes_1_1.value;
                var acceptable = this.isWildcard(type) ? this.getTypeClass(file.type) === this.getTypeClass(type)
                    : file.type == type || this.getFileExtension(file).toLowerCase() === type.toLowerCase();
                if (acceptable) {
                    return true;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (acceptableTypes_1_1 && !acceptableTypes_1_1.done && (_a = acceptableTypes_1.return)) _a.call(acceptableTypes_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return false;
    };
    FileUpload.prototype.getTypeClass = function (fileType) {
        return fileType.substring(0, fileType.indexOf('/'));
    };
    FileUpload.prototype.isWildcard = function (fileType) {
        return fileType.indexOf('*') !== -1;
    };
    FileUpload.prototype.getFileExtension = function (file) {
        return '.' + file.name.split('.').pop();
    };
    FileUpload.prototype.isImage = function (file) {
        return /^image\//.test(file.type);
    };
    FileUpload.prototype.onImageLoad = function (img) {
        window.URL.revokeObjectURL(img.src);
    };
    FileUpload.prototype.upload = function () {
        var _this = this;
        if (this.customUpload) {
            if (this.fileLimit) {
                this.uploadedFileCount += this.files.length;
            }
            this.uploadHandler.emit({
                files: this.files
            });
        }
        else {
            this.uploading = true;
            this.msgs = [];
            var formData_1 = new FormData();
            this.onBeforeUpload.emit({
                'formData': formData_1
            });
            for (var i = 0; i < this.files.length; i++) {
                formData_1.append(this.name, this.files[i], this.files[i].name);
            }
            this.http.post(this.url, formData_1, {
                headers: this.headers, reportProgress: true, observe: 'events', withCredentials: this.withCredentials
            }).subscribe(function (event) {
                switch (event.type) {
                    case HttpEventType.Sent:
                        _this.onSend.emit({
                            originalEvent: event,
                            'formData': formData_1
                        });
                        break;
                    case HttpEventType.Response:
                        _this.uploading = false;
                        _this.progress = 0;
                        if (event['status'] >= 200 && event['status'] < 300) {
                            if (_this.fileLimit) {
                                _this.uploadedFileCount += _this.files.length;
                            }
                            _this.onUpload.emit({ originalEvent: event, files: _this.files });
                        }
                        else {
                            _this.onError.emit({ files: _this.files });
                        }
                        _this.clear();
                        break;
                    case HttpEventType.UploadProgress: {
                        if (event['loaded']) {
                            _this.progress = Math.round((event['loaded'] * 100) / event['total']);
                        }
                        _this.onProgress.emit({ originalEvent: event, progress: _this.progress });
                        break;
                    }
                }
            }, function (error) {
                _this.uploading = false;
                _this.onError.emit({ files: _this.files, error: error });
            });
        }
    };
    FileUpload.prototype.clear = function () {
        this.files = [];
        this.onClear.emit();
        this.clearInputElement();
    };
    FileUpload.prototype.remove = function (event, index) {
        this.clearInputElement();
        this.onRemove.emit({ originalEvent: event, file: this.files[index] });
        this.files.splice(index, 1);
    };
    FileUpload.prototype.isFileLimitExceeded = function () {
        if (this.fileLimit && this.fileLimit <= this.files.length + this.uploadedFileCount && this.focus) {
            this.focus = false;
        }
        return this.fileLimit && this.fileLimit < this.files.length + this.uploadedFileCount;
    };
    FileUpload.prototype.isChooseDisabled = function () {
        return this.fileLimit && this.fileLimit <= this.files.length + this.uploadedFileCount;
    };
    FileUpload.prototype.checkFileLimit = function () {
        if (this.isFileLimitExceeded()) {
            this.msgs.push({
                severity: 'error',
                summary: this.invalidFileLimitMessageSummary.replace('{0}', this.fileLimit.toString()),
                detail: this.invalidFileLimitMessageDetail.replace('{0}', this.fileLimit.toString())
            });
        }
    };
    FileUpload.prototype.clearInputElement = function () {
        if (this.advancedFileInput && this.advancedFileInput.nativeElement) {
            this.advancedFileInput.nativeElement.value = '';
        }
        if (this.basicFileInput && this.basicFileInput.nativeElement) {
            this.basicFileInput.nativeElement.value = '';
        }
    };
    FileUpload.prototype.clearIEInput = function () {
        if (this.advancedFileInput && this.advancedFileInput.nativeElement) {
            this.duplicateIEEvent = true; //IE11 fix to prevent onFileChange trigger again
            this.advancedFileInput.nativeElement.value = '';
        }
    };
    FileUpload.prototype.hasFiles = function () {
        return this.files && this.files.length > 0;
    };
    FileUpload.prototype.onDragEnter = function (e) {
        if (!this.disabled) {
            e.stopPropagation();
            e.preventDefault();
        }
    };
    FileUpload.prototype.onDragOver = function (e) {
        if (!this.disabled) {
            DomHandler.addClass(this.content.nativeElement, 'ui-fileupload-highlight');
            this.dragHighlight = true;
            e.stopPropagation();
            e.preventDefault();
        }
    };
    FileUpload.prototype.onDragLeave = function (event) {
        if (!this.disabled) {
            DomHandler.removeClass(this.content.nativeElement, 'ui-fileupload-highlight');
        }
    };
    FileUpload.prototype.onDrop = function (event) {
        if (!this.disabled) {
            DomHandler.removeClass(this.content.nativeElement, 'ui-fileupload-highlight');
            event.stopPropagation();
            event.preventDefault();
            var files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
            var allowDrop = this.multiple || (files && files.length === 1);
            if (allowDrop) {
                this.onFileSelect(event);
            }
        }
    };
    FileUpload.prototype.onFocus = function () {
        this.focus = true;
    };
    FileUpload.prototype.onBlur = function () {
        this.focus = false;
    };
    FileUpload.prototype.formatSize = function (bytes) {
        if (bytes == 0) {
            return '0 B';
        }
        var k = 1024, dm = 3, sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };
    FileUpload.prototype.onSimpleUploaderClick = function (event) {
        if (this.hasFiles()) {
            this.upload();
        }
    };
    FileUpload.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    FileUpload.prototype.ngOnDestroy = function () {
        if (this.content && this.content.nativeElement) {
            this.content.nativeElement.removeEventListener('dragover', this.onDragOver);
        }
    };
    FileUpload.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DomSanitizer },
        { type: NgZone },
        { type: HttpClient }
    ]; };
    __decorate([
        Input()
    ], FileUpload.prototype, "name", void 0);
    __decorate([
        Input()
    ], FileUpload.prototype, "url", void 0);
    __decorate([
        Input()
    ], FileUpload.prototype, "method", void 0);
    __decorate([
        Input()
    ], FileUpload.prototype, "multiple", void 0);
    __decorate([
        Input()
    ], FileUpload.prototype, "accept", void 0);
    __decorate([
        Input()
    ], FileUpload.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], FileUpload.prototype, "auto", void 0);
    __decorate([
        Input()
    ], FileUpload.prototype, "withCredentials", void 0);
    __decorate([
        Input()
    ], FileUpload.prototype, "maxFileSize", void 0);
    __decorate([
        Input()
    ], FileUpload.prototype, "invalidFileSizeMessageSummary", void 0);
    __decorate([
        Input()
    ], FileUpload.prototype, "invalidFileSizeMessageDetail", void 0);
    __decorate([
        Input()
    ], FileUpload.prototype, "invalidFileTypeMessageSummary", void 0);
    __decorate([
        Input()
    ], FileUpload.prototype, "invalidFileTypeMessageDetail", void 0);
    __decorate([
        Input()
    ], FileUpload.prototype, "invalidFileLimitMessageDetail", void 0);
    __decorate([
        Input()
    ], FileUpload.prototype, "invalidFileLimitMessageSummary", void 0);
    __decorate([
        Input()
    ], FileUpload.prototype, "style", void 0);
    __decorate([
        Input()
    ], FileUpload.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], FileUpload.prototype, "previewWidth", void 0);
    __decorate([
        Input()
    ], FileUpload.prototype, "chooseLabel", void 0);
    __decorate([
        Input()
    ], FileUpload.prototype, "uploadLabel", void 0);
    __decorate([
        Input()
    ], FileUpload.prototype, "cancelLabel", void 0);
    __decorate([
        Input()
    ], FileUpload.prototype, "chooseIcon", void 0);
    __decorate([
        Input()
    ], FileUpload.prototype, "uploadIcon", void 0);
    __decorate([
        Input()
    ], FileUpload.prototype, "cancelIcon", void 0);
    __decorate([
        Input()
    ], FileUpload.prototype, "showUploadButton", void 0);
    __decorate([
        Input()
    ], FileUpload.prototype, "showCancelButton", void 0);
    __decorate([
        Input()
    ], FileUpload.prototype, "mode", void 0);
    __decorate([
        Input()
    ], FileUpload.prototype, "headers", void 0);
    __decorate([
        Input()
    ], FileUpload.prototype, "customUpload", void 0);
    __decorate([
        Input()
    ], FileUpload.prototype, "fileLimit", void 0);
    __decorate([
        Output()
    ], FileUpload.prototype, "onBeforeUpload", void 0);
    __decorate([
        Output()
    ], FileUpload.prototype, "onSend", void 0);
    __decorate([
        Output()
    ], FileUpload.prototype, "onUpload", void 0);
    __decorate([
        Output()
    ], FileUpload.prototype, "onError", void 0);
    __decorate([
        Output()
    ], FileUpload.prototype, "onClear", void 0);
    __decorate([
        Output()
    ], FileUpload.prototype, "onRemove", void 0);
    __decorate([
        Output()
    ], FileUpload.prototype, "onSelect", void 0);
    __decorate([
        Output()
    ], FileUpload.prototype, "onProgress", void 0);
    __decorate([
        Output()
    ], FileUpload.prototype, "uploadHandler", void 0);
    __decorate([
        ContentChildren(PrimeTemplate)
    ], FileUpload.prototype, "templates", void 0);
    __decorate([
        ViewChild('advancedfileinput')
    ], FileUpload.prototype, "advancedFileInput", void 0);
    __decorate([
        ViewChild('basicfileinput')
    ], FileUpload.prototype, "basicFileInput", void 0);
    __decorate([
        ViewChild('content')
    ], FileUpload.prototype, "content", void 0);
    __decorate([
        Input()
    ], FileUpload.prototype, "files", null);
    FileUpload = __decorate([
        Component({
            selector: 'p-fileUpload',
            template: "\n        <div [ngClass]=\"'ui-fileupload ui-widget'\" [ngStyle]=\"style\" [class]=\"styleClass\" *ngIf=\"mode === 'advanced'\">\n            <div class=\"ui-fileupload-buttonbar ui-widget-header ui-corner-top\">\n                <span class=\"ui-fileupload-choose\" [label]=\"chooseLabel\" [icon]=\"chooseIcon\" pButton [ngClass]=\"{'ui-state-focus': focus, 'ui-state-disabled':disabled || isChooseDisabled()}\"> \n                    <input #advancedfileinput type=\"file\" (change)=\"onFileSelect($event)\" [multiple]=\"multiple\" [accept]=\"accept\" [disabled]=\"disabled || isChooseDisabled()\" (focus)=\"onFocus()\" (blur)=\"onBlur()\">\n                </span>\n\n                <p-button *ngIf=\"!auto&&showUploadButton\" type=\"button\" [label]=\"uploadLabel\" [icon]=\"uploadIcon\" (onClick)=\"upload()\" [disabled]=\"!hasFiles() || isFileLimitExceeded()\"></p-button>\n                <p-button *ngIf=\"!auto&&showCancelButton\" type=\"button\" [label]=\"cancelLabel\" [icon]=\"cancelIcon\" (onClick)=\"clear()\" [disabled]=\"!hasFiles() ||\u00A0uploading\"></p-button>\n\n                <ng-container *ngTemplateOutlet=\"toolbarTemplate\"></ng-container>\n            </div>\n            <div #content [ngClass]=\"{'ui-fileupload-content ui-widget-content ui-corner-bottom':true}\"\n                 (dragenter)=\"onDragEnter($event)\" (dragleave)=\"onDragLeave($event)\" (drop)=\"onDrop($event)\">\n                <p-progressBar [value]=\"progress\" [showValue]=\"false\" *ngIf=\"hasFiles()\"></p-progressBar>\n\n                <p-messages [value]=\"msgs\" [enableService]=\"false\"></p-messages>\n\n                <div class=\"ui-fileupload-files\" *ngIf=\"hasFiles()\">\n                    <div *ngIf=\"!fileTemplate\">\n                        <div class=\"ui-fileupload-row\" *ngFor=\"let file of files; let i = index;\">\n                            <div><img [src]=\"file.objectURL\" *ngIf=\"isImage(file)\" [width]=\"previewWidth\" /></div>\n                            <div>{{file.name}}</div>\n                            <div>{{formatSize(file.size)}}</div>\n                            <div>\n                                <button type=\"button\" icon=\"pi pi-times\" pButton (click)=\"remove($event,i)\" [disabled]=\"uploading\"></button>\n                            </div>\n                        </div>\n                    </div>\n                    <div *ngIf=\"fileTemplate\">\n                        <ng-template ngFor [ngForOf]=\"files\" [ngForTemplate]=\"fileTemplate\"></ng-template>\n                    </div>\n                </div>\n                <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n            </div>\n        </div>\n        <span *ngIf=\"mode === 'basic'\" [ngClass]=\"{'ui-button ui-fileupload-choose ui-widget ui-state-default ui-corner-all ui-button-text-icon-left': true, \n                'ui-fileupload-choose-selected': hasFiles(),'ui-state-focus': focus, 'ui-state-disabled':disabled}\"\n              [ngStyle]=\"style\" [class]=\"styleClass\" (mouseup)=\"onSimpleUploaderClick($event)\">\n            <span class=\"ui-button-icon-left pi\" [ngClass]=\"{'pi-plus': !hasFiles()||auto, 'pi-upload': hasFiles()&&!auto}\"></span>\n            <span class=\"ui-button-text ui-clickable\">{{auto ? chooseLabel : hasFiles() ? files[0].name : chooseLabel}}</span>\n            <input #basicfileinput type=\"file\" [accept]=\"accept\" [multiple]=\"multiple\" [disabled]=\"disabled\"\n                   (change)=\"onFileSelect($event)\" *ngIf=\"!hasFiles()\" (focus)=\"onFocus()\" (blur)=\"onBlur()\">\n        </span>\n    ",
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], FileUpload);
    return FileUpload;
}());
export { FileUpload };
var FileUploadModule = /** @class */ (function () {
    function FileUploadModule() {
    }
    FileUploadModule = __decorate([
        NgModule({
            imports: [CommonModule, SharedModule, ButtonModule, ProgressBarModule, MessagesModule],
            exports: [FileUpload, SharedModule, ButtonModule, ProgressBarModule, MessagesModule],
            declarations: [FileUpload]
        })
    ], FileUploadModule);
    return FileUploadModule;
}());
export { FileUploadModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXVwbG9hZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvZmlsZXVwbG9hZC8iLCJzb3VyY2VzIjpbImZpbGV1cGxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsV0FBVyxFQUFDLGFBQWEsRUFBQyxnQkFBZ0IsRUFDN0YsZUFBZSxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNoSCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUV2QyxPQUFPLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUV2RCxPQUFPLEVBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFtRHZGO0lBa0lJLG9CQUFvQixFQUFjLEVBQVMsU0FBdUIsRUFBUyxJQUFZLEVBQVUsSUFBZ0I7UUFBN0YsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBWTtRQTVIeEcsV0FBTSxHQUFXLE1BQU0sQ0FBQztRQWN4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Z0IsQ0FBSTtJQUFELHVCQUFDO0NBQUEsQUFBakMsSUFBaUM7U0FBcEIsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsT25EZXN0cm95LElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXIsVGVtcGxhdGVSZWYsQWZ0ZXJWaWV3SW5pdCxBZnRlckNvbnRlbnRJbml0LFxyXG4gICAgICAgICAgICBDb250ZW50Q2hpbGRyZW4sUXVlcnlMaXN0LFZpZXdDaGlsZCxFbGVtZW50UmVmLE5nWm9uZSxDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge0RvbVNhbml0aXplcn0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmltcG9ydCB7QnV0dG9uTW9kdWxlfSBmcm9tICdwcmltZW5nL2J1dHRvbic7XHJcbmltcG9ydCB7TWVzc2FnZXNNb2R1bGV9IGZyb20gJ3ByaW1lbmcvbWVzc2FnZXMnO1xyXG5pbXBvcnQge1Byb2dyZXNzQmFyTW9kdWxlfSBmcm9tICdwcmltZW5nL3Byb2dyZXNzYmFyJztcclxuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICdwcmltZW5nL2RvbSc7XHJcbmltcG9ydCB7TWVzc2FnZX0gZnJvbSAncHJpbWVuZy9hcGknO1xyXG5pbXBvcnQge1ByaW1lVGVtcGxhdGUsU2hhcmVkTW9kdWxlfSBmcm9tICdwcmltZW5nL2FwaSc7XHJcbmltcG9ydCB7QmxvY2thYmxlVUl9IGZyb20gJ3ByaW1lbmcvYXBpJztcclxuaW1wb3J0IHtIdHRwQ2xpZW50LCBIdHRwRXZlbnQsIEh0dHBFdmVudFR5cGUsIEh0dHBIZWFkZXJzfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLWZpbGVVcGxvYWQnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cIid1aS1maWxldXBsb2FkIHVpLXdpZGdldCdcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgKm5nSWY9XCJtb2RlID09PSAnYWR2YW5jZWQnXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1maWxldXBsb2FkLWJ1dHRvbmJhciB1aS13aWRnZXQtaGVhZGVyIHVpLWNvcm5lci10b3BcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktZmlsZXVwbG9hZC1jaG9vc2VcIiBbbGFiZWxdPVwiY2hvb3NlTGFiZWxcIiBbaWNvbl09XCJjaG9vc2VJY29uXCIgcEJ1dHRvbiBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWZvY3VzJzogZm9jdXMsICd1aS1zdGF0ZS1kaXNhYmxlZCc6ZGlzYWJsZWQgfHwgaXNDaG9vc2VEaXNhYmxlZCgpfVwiPiBcclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgI2FkdmFuY2VkZmlsZWlucHV0IHR5cGU9XCJmaWxlXCIgKGNoYW5nZSk9XCJvbkZpbGVTZWxlY3QoJGV2ZW50KVwiIFttdWx0aXBsZV09XCJtdWx0aXBsZVwiIFthY2NlcHRdPVwiYWNjZXB0XCIgW2Rpc2FibGVkXT1cImRpc2FibGVkIHx8IGlzQ2hvb3NlRGlzYWJsZWQoKVwiIChmb2N1cyk9XCJvbkZvY3VzKClcIiAoYmx1cik9XCJvbkJsdXIoKVwiPlxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG5cclxuICAgICAgICAgICAgICAgIDxwLWJ1dHRvbiAqbmdJZj1cIiFhdXRvJiZzaG93VXBsb2FkQnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiIFtsYWJlbF09XCJ1cGxvYWRMYWJlbFwiIFtpY29uXT1cInVwbG9hZEljb25cIiAob25DbGljayk9XCJ1cGxvYWQoKVwiIFtkaXNhYmxlZF09XCIhaGFzRmlsZXMoKSB8fCBpc0ZpbGVMaW1pdEV4Y2VlZGVkKClcIj48L3AtYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPHAtYnV0dG9uICpuZ0lmPVwiIWF1dG8mJnNob3dDYW5jZWxCdXR0b25cIiB0eXBlPVwiYnV0dG9uXCIgW2xhYmVsXT1cImNhbmNlbExhYmVsXCIgW2ljb25dPVwiY2FuY2VsSWNvblwiIChvbkNsaWNrKT1cImNsZWFyKClcIiBbZGlzYWJsZWRdPVwiIWhhc0ZpbGVzKCkgfHzCoHVwbG9hZGluZ1wiPjwvcC1idXR0b24+XHJcblxyXG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRvb2xiYXJUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiAjY29udGVudCBbbmdDbGFzc109XCJ7J3VpLWZpbGV1cGxvYWQtY29udGVudCB1aS13aWRnZXQtY29udGVudCB1aS1jb3JuZXItYm90dG9tJzp0cnVlfVwiXHJcbiAgICAgICAgICAgICAgICAgKGRyYWdlbnRlcik9XCJvbkRyYWdFbnRlcigkZXZlbnQpXCIgKGRyYWdsZWF2ZSk9XCJvbkRyYWdMZWF2ZSgkZXZlbnQpXCIgKGRyb3ApPVwib25Ecm9wKCRldmVudClcIj5cclxuICAgICAgICAgICAgICAgIDxwLXByb2dyZXNzQmFyIFt2YWx1ZV09XCJwcm9ncmVzc1wiIFtzaG93VmFsdWVdPVwiZmFsc2VcIiAqbmdJZj1cImhhc0ZpbGVzKClcIj48L3AtcHJvZ3Jlc3NCYXI+XHJcblxyXG4gICAgICAgICAgICAgICAgPHAtbWVzc2FnZXMgW3ZhbHVlXT1cIm1zZ3NcIiBbZW5hYmxlU2VydmljZV09XCJmYWxzZVwiPjwvcC1tZXNzYWdlcz5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZmlsZXVwbG9hZC1maWxlc1wiICpuZ0lmPVwiaGFzRmlsZXMoKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhZmlsZVRlbXBsYXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1maWxldXBsb2FkLXJvd1wiICpuZ0Zvcj1cImxldCBmaWxlIG9mIGZpbGVzOyBsZXQgaSA9IGluZGV4O1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj48aW1nIFtzcmNdPVwiZmlsZS5vYmplY3RVUkxcIiAqbmdJZj1cImlzSW1hZ2UoZmlsZSlcIiBbd2lkdGhdPVwicHJldmlld1dpZHRoXCIgLz48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+e3tmaWxlLm5hbWV9fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj57e2Zvcm1hdFNpemUoZmlsZS5zaXplKX19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGljb249XCJwaSBwaS10aW1lc1wiIHBCdXR0b24gKGNsaWNrKT1cInJlbW92ZSgkZXZlbnQsaSlcIiBbZGlzYWJsZWRdPVwidXBsb2FkaW5nXCI+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImZpbGVUZW1wbGF0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgW25nRm9yT2ZdPVwiZmlsZXNcIiBbbmdGb3JUZW1wbGF0ZV09XCJmaWxlVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29udGVudFRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxzcGFuICpuZ0lmPVwibW9kZSA9PT0gJ2Jhc2ljJ1wiIFtuZ0NsYXNzXT1cInsndWktYnV0dG9uIHVpLWZpbGV1cGxvYWQtY2hvb3NlIHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGwgdWktYnV0dG9uLXRleHQtaWNvbi1sZWZ0JzogdHJ1ZSwgXHJcbiAgICAgICAgICAgICAgICAndWktZmlsZXVwbG9hZC1jaG9vc2Utc2VsZWN0ZWQnOiBoYXNGaWxlcygpLCd1aS1zdGF0ZS1mb2N1cyc6IGZvY3VzLCAndWktc3RhdGUtZGlzYWJsZWQnOmRpc2FibGVkfVwiXHJcbiAgICAgICAgICAgICAgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIChtb3VzZXVwKT1cIm9uU2ltcGxlVXBsb2FkZXJDbGljaygkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktYnV0dG9uLWljb24tbGVmdCBwaVwiIFtuZ0NsYXNzXT1cInsncGktcGx1cyc6ICFoYXNGaWxlcygpfHxhdXRvLCAncGktdXBsb2FkJzogaGFzRmlsZXMoKSYmIWF1dG99XCI+PC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWJ1dHRvbi10ZXh0IHVpLWNsaWNrYWJsZVwiPnt7YXV0byA/IGNob29zZUxhYmVsIDogaGFzRmlsZXMoKSA/IGZpbGVzWzBdLm5hbWUgOiBjaG9vc2VMYWJlbH19PC9zcGFuPlxyXG4gICAgICAgICAgICA8aW5wdXQgI2Jhc2ljZmlsZWlucHV0IHR5cGU9XCJmaWxlXCIgW2FjY2VwdF09XCJhY2NlcHRcIiBbbXVsdGlwbGVdPVwibXVsdGlwbGVcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgKGNoYW5nZSk9XCJvbkZpbGVTZWxlY3QoJGV2ZW50KVwiICpuZ0lmPVwiIWhhc0ZpbGVzKClcIiAoZm9jdXMpPVwib25Gb2N1cygpXCIgKGJsdXIpPVwib25CbHVyKClcIj5cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICBgLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGaWxlVXBsb2FkIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCxBZnRlckNvbnRlbnRJbml0LE9uRGVzdHJveSxCbG9ja2FibGVVSSB7XHJcblxyXG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIHVybDogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIG1ldGhvZDogc3RyaW5nID0gJ1BPU1QnO1xyXG5cclxuICAgIEBJbnB1dCgpIG11bHRpcGxlOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIGFjY2VwdDogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIGF1dG86IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgd2l0aENyZWRlbnRpYWxzOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIG1heEZpbGVTaXplOiBudW1iZXI7XHJcblxyXG4gICAgQElucHV0KCkgaW52YWxpZEZpbGVTaXplTWVzc2FnZVN1bW1hcnk6IHN0cmluZyA9ICd7MH06IEludmFsaWQgZmlsZSBzaXplLCAnO1xyXG5cclxuICAgIEBJbnB1dCgpIGludmFsaWRGaWxlU2l6ZU1lc3NhZ2VEZXRhaWw6IHN0cmluZyA9ICdtYXhpbXVtIHVwbG9hZCBzaXplIGlzIHswfS4nO1xyXG5cclxuICAgIEBJbnB1dCgpIGludmFsaWRGaWxlVHlwZU1lc3NhZ2VTdW1tYXJ5OiBzdHJpbmcgPSAnezB9OiBJbnZhbGlkIGZpbGUgdHlwZSwgJztcclxuXHJcbiAgICBASW5wdXQoKSBpbnZhbGlkRmlsZVR5cGVNZXNzYWdlRGV0YWlsOiBzdHJpbmcgPSAnYWxsb3dlZCBmaWxlIHR5cGVzOiB7MH0uJztcclxuXHJcbiAgICBASW5wdXQoKSBpbnZhbGlkRmlsZUxpbWl0TWVzc2FnZURldGFpbDogc3RyaW5nID0gJ2xpbWl0IGlzIHswfSBhdCBtb3N0Lic7XHJcblxyXG4gICAgQElucHV0KCkgaW52YWxpZEZpbGVMaW1pdE1lc3NhZ2VTdW1tYXJ5OiBzdHJpbmcgPSAnTWF4aW11bSBudW1iZXIgb2YgZmlsZXMgZXhjZWVkZWQsICc7XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgcHJldmlld1dpZHRoOiBudW1iZXIgPSA1MDtcclxuXHJcbiAgICBASW5wdXQoKSBjaG9vc2VMYWJlbDogc3RyaW5nID0gJ0Nob29zZSc7XHJcblxyXG4gICAgQElucHV0KCkgdXBsb2FkTGFiZWw6IHN0cmluZyA9ICdVcGxvYWQnO1xyXG5cclxuICAgIEBJbnB1dCgpIGNhbmNlbExhYmVsOiBzdHJpbmcgPSAnQ2FuY2VsJztcclxuXHJcbiAgICBASW5wdXQoKSBjaG9vc2VJY29uOiBzdHJpbmcgPSAncGkgcGktcGx1cyc7XHJcblxyXG4gICAgQElucHV0KCkgdXBsb2FkSWNvbjogc3RyaW5nID0gJ3BpIHBpLXVwbG9hZCc7XHJcblxyXG4gICAgQElucHV0KCkgY2FuY2VsSWNvbjogc3RyaW5nID0gJ3BpIHBpLXRpbWVzJztcclxuXHJcbiAgICBASW5wdXQoKSBzaG93VXBsb2FkQnV0dG9uOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBASW5wdXQoKSBzaG93Q2FuY2VsQnV0dG9uOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBASW5wdXQoKSBtb2RlOiBzdHJpbmcgPSAnYWR2YW5jZWQnO1xyXG5cclxuICAgIEBJbnB1dCgpIGhlYWRlcnM6IEh0dHBIZWFkZXJzO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBjdXN0b21VcGxvYWQ6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgZmlsZUxpbWl0OiBudW1iZXI7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uQmVmb3JlVXBsb2FkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25TZW5kOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25VcGxvYWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkVycm9yOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25DbGVhcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQE91dHB1dCgpIG9uUmVtb3ZlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvblByb2dyZXNzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBAT3V0cHV0KCkgdXBsb2FkSGFuZGxlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ2FkdmFuY2VkZmlsZWlucHV0JykgYWR2YW5jZWRGaWxlSW5wdXQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnYmFzaWNmaWxlaW5wdXQnKSBiYXNpY0ZpbGVJbnB1dDogRWxlbWVudFJlZjtcclxuXHJcbiAgICBAVmlld0NoaWxkKCdjb250ZW50JykgY29udGVudDogRWxlbWVudFJlZjtcclxuXHJcbiAgICBASW5wdXQoKSBzZXQgZmlsZXMoZmlsZXMpIHtcclxuICAgICAgICB0aGlzLl9maWxlcyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGZpbGUgPSBmaWxlc1tpXTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZhbGlkYXRlKGZpbGUpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0ltYWdlKGZpbGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKDxhbnk+ZmlsZSkub2JqZWN0VVJMID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFVybCgod2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZXNbaV0pKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZmlsZXMucHVzaChmaWxlc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGZpbGVzKCk6IEZpbGVbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbGVzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBfZmlsZXM6IEZpbGVbXSA9IFtdO1xyXG5cclxuICAgIHB1YmxpYyBwcm9ncmVzczogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwdWJsaWMgZHJhZ0hpZ2hsaWdodDogYm9vbGVhbjtcclxuXHJcbiAgICBwdWJsaWMgbXNnczogTWVzc2FnZVtdO1xyXG5cclxuICAgIHB1YmxpYyBmaWxlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgcHVibGljIGNvbnRlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgICBwdWJsaWMgdG9vbGJhclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAgIHB1YmxpYyB1cGxvYWRlZEZpbGVDb3VudDogbnVtYmVyID0gMDtcclxuXHJcbiAgICBmb2N1czogYm9vbGVhbjtcclxuXHJcbiAgICB1cGxvYWRpbmc6IGJvb2xlYW47XHJcblxyXG4gICAgZHVwbGljYXRlSUVFdmVudDogYm9vbGVhbjsgIC8vIGZsYWcgdG8gcmVjb2duaXplIGR1cGxpY2F0ZSBvbmNoYW5nZSBldmVudCBmb3IgZmlsZSBpbnB1dFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyBzYW5pdGl6ZXI6IERvbVNhbml0aXplciwgcHVibGljIHpvbmU6IE5nWm9uZSwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KXt9XHJcblxyXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoKGl0ZW0uZ2V0VHlwZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdmaWxlJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbGVUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdjb250ZW50JzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICd0b29sYmFyJzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvb2xiYXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsZVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdhZHZhbmNlZCcpIHtcclxuICAgICAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLm9uRHJhZ092ZXIuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkZpbGVTZWxlY3QoZXZlbnQpIHtcclxuICAgICAgICBpZiAoZXZlbnQudHlwZSAhPT0gJ2Ryb3AnICYmIHRoaXMuaXNJRTExKCkgJiYgdGhpcy5kdXBsaWNhdGVJRUV2ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHVwbGljYXRlSUVFdmVudCA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm1zZ3MgPSBbXTtcclxuICAgICAgICBpZiAoIXRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgICAgICAgdGhpcy5maWxlcyA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGZpbGVzID0gZXZlbnQuZGF0YVRyYW5zZmVyID8gZXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzIDogZXZlbnQudGFyZ2V0LmZpbGVzO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZmlsZSA9IGZpbGVzW2ldO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzRmlsZVNlbGVjdGVkKGZpbGUpKXtcclxuICAgICAgICAgICAgICBpZiAodGhpcy52YWxpZGF0ZShmaWxlKSkge1xyXG4gICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0ltYWdlKGZpbGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBmaWxlLm9iamVjdFVSTCA9IHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RVcmwoKHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGVzW2ldKSkpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICB0aGlzLmZpbGVzLnB1c2goZmlsZXNbaV0pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5vblNlbGVjdC5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgZmlsZXM6IGZpbGVzLCBjdXJyZW50RmlsZXM6IHRoaXMuZmlsZXN9KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZmlsZUxpbWl0ICYmIHRoaXMubW9kZSA9PSBcImFkdmFuY2VkXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja0ZpbGVMaW1pdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaGFzRmlsZXMoKSAmJiB0aGlzLmF1dG8gJiYgKCEodGhpcy5tb2RlID09PSBcImFkdmFuY2VkXCIpIHx8ICF0aGlzLmlzRmlsZUxpbWl0RXhjZWVkZWQoKSkpIHtcclxuICAgICAgICAgICAgdGhpcy51cGxvYWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChldmVudC50eXBlICE9PSAnZHJvcCcgJiYgdGhpcy5pc0lFMTEoKSkge1xyXG4gICAgICAgICAgdGhpcy5jbGVhcklFSW5wdXQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5jbGVhcklucHV0RWxlbWVudCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpc0ZpbGVTZWxlY3RlZChmaWxlOiBGaWxlKTogYm9vbGVhbntcclxuICAgICAgICBmb3IobGV0IHNGaWxlIG9mIHRoaXMuZmlsZXMpe1xyXG4gICAgICAgICAgICBpZiAoKHNGaWxlLm5hbWUgKyBzRmlsZS50eXBlICsgc0ZpbGUuc2l6ZSkgPT09IChmaWxlLm5hbWUgKyBmaWxlLnR5cGUrZmlsZS5zaXplKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpc0lFMTEoKSB7XHJcbiAgICAgICAgcmV0dXJuICEhd2luZG93WydNU0lucHV0TWV0aG9kQ29udGV4dCddICYmICEhZG9jdW1lbnRbJ2RvY3VtZW50TW9kZSddO1xyXG4gICAgfVxyXG5cclxuICAgIHZhbGlkYXRlKGZpbGU6IEZpbGUpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5hY2NlcHQgJiYgIXRoaXMuaXNGaWxlVHlwZVZhbGlkKGZpbGUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubXNncy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHNldmVyaXR5OiAnZXJyb3InLFxyXG4gICAgICAgICAgICAgICAgc3VtbWFyeTogdGhpcy5pbnZhbGlkRmlsZVR5cGVNZXNzYWdlU3VtbWFyeS5yZXBsYWNlKCd7MH0nLCBmaWxlLm5hbWUpLFxyXG4gICAgICAgICAgICAgICAgZGV0YWlsOiB0aGlzLmludmFsaWRGaWxlVHlwZU1lc3NhZ2VEZXRhaWwucmVwbGFjZSgnezB9JywgdGhpcy5hY2NlcHQpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5tYXhGaWxlU2l6ZSAgJiYgZmlsZS5zaXplID4gdGhpcy5tYXhGaWxlU2l6ZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1zZ3MucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBzZXZlcml0eTogJ2Vycm9yJyxcclxuICAgICAgICAgICAgICAgIHN1bW1hcnk6IHRoaXMuaW52YWxpZEZpbGVTaXplTWVzc2FnZVN1bW1hcnkucmVwbGFjZSgnezB9JywgZmlsZS5uYW1lKSxcclxuICAgICAgICAgICAgICAgIGRldGFpbDogdGhpcy5pbnZhbGlkRmlsZVNpemVNZXNzYWdlRGV0YWlsLnJlcGxhY2UoJ3swfScsIHRoaXMuZm9ybWF0U2l6ZSh0aGlzLm1heEZpbGVTaXplKSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNGaWxlVHlwZVZhbGlkKGZpbGU6IEZpbGUpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgYWNjZXB0YWJsZVR5cGVzID0gdGhpcy5hY2NlcHQuc3BsaXQoJywnKS5tYXAodHlwZSA9PiB0eXBlLnRyaW0oKSk7XHJcbiAgICAgICAgZm9yKGxldCB0eXBlIG9mIGFjY2VwdGFibGVUeXBlcykge1xyXG4gICAgICAgICAgICBsZXQgYWNjZXB0YWJsZSA9IHRoaXMuaXNXaWxkY2FyZCh0eXBlKSA/IHRoaXMuZ2V0VHlwZUNsYXNzKGZpbGUudHlwZSkgPT09IHRoaXMuZ2V0VHlwZUNsYXNzKHR5cGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGZpbGUudHlwZSA9PSB0eXBlIHx8IHRoaXMuZ2V0RmlsZUV4dGVuc2lvbihmaWxlKS50b0xvd2VyQ2FzZSgpID09PSB0eXBlLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoYWNjZXB0YWJsZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUeXBlQ2xhc3MoZmlsZVR5cGU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGZpbGVUeXBlLnN1YnN0cmluZygwLCBmaWxlVHlwZS5pbmRleE9mKCcvJykpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzV2lsZGNhcmQoZmlsZVR5cGU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBmaWxlVHlwZS5pbmRleE9mKCcqJykgIT09IC0xO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEZpbGVFeHRlbnNpb24oZmlsZTogRmlsZSk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuICcuJyArIGZpbGUubmFtZS5zcGxpdCgnLicpLnBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzSW1hZ2UoZmlsZTogRmlsZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAvXmltYWdlXFwvLy50ZXN0KGZpbGUudHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25JbWFnZUxvYWQoaW1nOiBhbnkpIHtcclxuICAgICAgICB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTChpbWcuc3JjKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGxvYWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tVXBsb2FkKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZpbGVMaW1pdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGxvYWRlZEZpbGVDb3VudCArPSB0aGlzLmZpbGVzLmxlbmd0aDsgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMudXBsb2FkSGFuZGxlci5lbWl0KHtcclxuICAgICAgICAgICAgICAgIGZpbGVzOiB0aGlzLmZpbGVzXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy51cGxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1zZ3MgPSBbXTtcclxuICAgICAgICAgICAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm9uQmVmb3JlVXBsb2FkLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgJ2Zvcm1EYXRhJzogZm9ybURhdGFcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZmlsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCh0aGlzLm5hbWUsIHRoaXMuZmlsZXNbaV0sIHRoaXMuZmlsZXNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuaHR0cC5wb3N0KHRoaXMudXJsLCBmb3JtRGF0YSwge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLCByZXBvcnRQcm9ncmVzczogdHJ1ZSwgb2JzZXJ2ZTogJ2V2ZW50cycsIHdpdGhDcmVkZW50aWFsczogdGhpcy53aXRoQ3JlZGVudGlhbHNcclxuICAgICAgICAgICAgfSkuc3Vic2NyaWJlKCAoZXZlbnQ6IEh0dHBFdmVudDxhbnk+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgSHR0cEV2ZW50VHlwZS5TZW50OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblNlbmQuZW1pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2Zvcm1EYXRhJzogZm9ybURhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgSHR0cEV2ZW50VHlwZS5SZXNwb25zZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnRbJ3N0YXR1cyddID49IDIwMCAmJiBldmVudFsnc3RhdHVzJ10gPCAzMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5maWxlTGltaXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGxvYWRlZEZpbGVDb3VudCArPSB0aGlzLmZpbGVzLmxlbmd0aDsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uVXBsb2FkLmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBmaWxlczogdGhpcy5maWxlc30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IuZW1pdCh7ZmlsZXM6IHRoaXMuZmlsZXN9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBIdHRwRXZlbnRUeXBlLlVwbG9hZFByb2dyZXNzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnRbJ2xvYWRlZCddKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcyA9IE1hdGgucm91bmQoKGV2ZW50Wydsb2FkZWQnXSAqIDEwMCkgLyBldmVudFsndG90YWwnXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblByb2dyZXNzLmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBwcm9ncmVzczogdGhpcy5wcm9ncmVzc30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkVycm9yLmVtaXQoe2ZpbGVzOiB0aGlzLmZpbGVzLCBlcnJvcjogZXJyb3J9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGVhcigpIHtcclxuICAgICAgICB0aGlzLmZpbGVzID0gW107XHJcbiAgICAgICAgdGhpcy5vbkNsZWFyLmVtaXQoKTtcclxuICAgICAgICB0aGlzLmNsZWFySW5wdXRFbGVtZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlKGV2ZW50OiBFdmVudCwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuY2xlYXJJbnB1dEVsZW1lbnQoKTtcclxuICAgICAgICB0aGlzLm9uUmVtb3ZlLmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBmaWxlOiB0aGlzLmZpbGVzW2luZGV4XX0pO1xyXG4gICAgICAgIHRoaXMuZmlsZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0ZpbGVMaW1pdEV4Y2VlZGVkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmZpbGVMaW1pdCAmJiB0aGlzLmZpbGVMaW1pdCA8PSB0aGlzLmZpbGVzLmxlbmd0aCArIHRoaXMudXBsb2FkZWRGaWxlQ291bnQgJiYgdGhpcy5mb2N1cykge1xyXG4gICAgICAgICAgICB0aGlzLmZvY3VzID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5maWxlTGltaXQgJiYgdGhpcy5maWxlTGltaXQgPCB0aGlzLmZpbGVzLmxlbmd0aCArIHRoaXMudXBsb2FkZWRGaWxlQ291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgaXNDaG9vc2VEaXNhYmxlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5maWxlTGltaXQgJiYgdGhpcy5maWxlTGltaXQgPD0gdGhpcy5maWxlcy5sZW5ndGggKyB0aGlzLnVwbG9hZGVkRmlsZUNvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrRmlsZUxpbWl0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRmlsZUxpbWl0RXhjZWVkZWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLm1zZ3MucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBzZXZlcml0eTogJ2Vycm9yJyxcclxuICAgICAgICAgICAgICAgIHN1bW1hcnk6IHRoaXMuaW52YWxpZEZpbGVMaW1pdE1lc3NhZ2VTdW1tYXJ5LnJlcGxhY2UoJ3swfScsIHRoaXMuZmlsZUxpbWl0LnRvU3RyaW5nKCkpLFxyXG4gICAgICAgICAgICAgICAgZGV0YWlsOiB0aGlzLmludmFsaWRGaWxlTGltaXRNZXNzYWdlRGV0YWlsLnJlcGxhY2UoJ3swfScsIHRoaXMuZmlsZUxpbWl0LnRvU3RyaW5nKCkpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGVhcklucHV0RWxlbWVudCgpIHtcclxuICAgICAgICBpZiAodGhpcy5hZHZhbmNlZEZpbGVJbnB1dCAmJiB0aGlzLmFkdmFuY2VkRmlsZUlucHV0Lm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5hZHZhbmNlZEZpbGVJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5iYXNpY0ZpbGVJbnB1dCAmJiB0aGlzLmJhc2ljRmlsZUlucHV0Lm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5iYXNpY0ZpbGVJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsZWFySUVJbnB1dCgpIHtcclxuICAgICAgICBpZiAodGhpcy5hZHZhbmNlZEZpbGVJbnB1dCAmJiB0aGlzLmFkdmFuY2VkRmlsZUlucHV0Lm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5kdXBsaWNhdGVJRUV2ZW50ID0gdHJ1ZTsgLy9JRTExIGZpeCB0byBwcmV2ZW50IG9uRmlsZUNoYW5nZSB0cmlnZ2VyIGFnYWluXHJcbiAgICAgICAgICAgIHRoaXMuYWR2YW5jZWRGaWxlSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYXNGaWxlcygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5maWxlcyAmJiB0aGlzLmZpbGVzLmxlbmd0aCA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgb25EcmFnRW50ZXIoZSkge1xyXG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRHJhZ092ZXIoZSkge1xyXG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50LCAndWktZmlsZXVwbG9hZC1oaWdobGlnaHQnKTtcclxuICAgICAgICAgICAgdGhpcy5kcmFnSGlnaGxpZ2h0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkRyYWdMZWF2ZShldmVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50LCAndWktZmlsZXVwbG9hZC1oaWdobGlnaHQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Ecm9wKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQsICd1aS1maWxldXBsb2FkLWhpZ2hsaWdodCcpO1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBmaWxlcyA9IGV2ZW50LmRhdGFUcmFuc2ZlciA/IGV2ZW50LmRhdGFUcmFuc2Zlci5maWxlcyA6IGV2ZW50LnRhcmdldC5maWxlcztcclxuICAgICAgICAgICAgbGV0IGFsbG93RHJvcCA9IHRoaXMubXVsdGlwbGV8fChmaWxlcyAmJiBmaWxlcy5sZW5ndGggPT09IDEpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGFsbG93RHJvcCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkZpbGVTZWxlY3QoZXZlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRm9jdXMoKSB7XHJcbiAgICAgICAgdGhpcy5mb2N1cyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgb25CbHVyKCkge1xyXG4gICAgICAgIHRoaXMuZm9jdXMgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBmb3JtYXRTaXplKGJ5dGVzKSB7XHJcbiAgICAgICAgaWYgKGJ5dGVzID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuICcwIEInO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgayA9IDEwMjQsXHJcbiAgICAgICAgZG0gPSAzLFxyXG4gICAgICAgIHNpemVzID0gWydCJywgJ0tCJywgJ01CJywgJ0dCJywgJ1RCJywgJ1BCJywgJ0VCJywgJ1pCJywgJ1lCJ10sXHJcbiAgICAgICAgaSA9IE1hdGguZmxvb3IoTWF0aC5sb2coYnl0ZXMpIC8gTWF0aC5sb2coaykpO1xyXG5cclxuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCgoYnl0ZXMgLyBNYXRoLnBvdyhrLCBpKSkudG9GaXhlZChkbSkpICsgJyAnICsgc2l6ZXNbaV07XHJcbiAgICB9XHJcblxyXG4gICAgb25TaW1wbGVVcGxvYWRlckNsaWNrKGV2ZW50OiBFdmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLmhhc0ZpbGVzKCkpIHtcclxuICAgICAgICAgICAgdGhpcy51cGxvYWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QmxvY2thYmxlRWxlbWVudCgpOiBIVE1MRWxlbWVudMKge1xyXG4gICAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnQgJiYgdGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLm9uRHJhZ092ZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsU2hhcmVkTW9kdWxlLEJ1dHRvbk1vZHVsZSxQcm9ncmVzc0Jhck1vZHVsZSxNZXNzYWdlc01vZHVsZV0sXHJcbiAgICBleHBvcnRzOiBbRmlsZVVwbG9hZCxTaGFyZWRNb2R1bGUsQnV0dG9uTW9kdWxlLFByb2dyZXNzQmFyTW9kdWxlLE1lc3NhZ2VzTW9kdWxlXSxcclxuICAgIGRlY2xhcmF0aW9uczogW0ZpbGVVcGxvYWRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGaWxlVXBsb2FkTW9kdWxlIHsgfVxyXG4iXX0=