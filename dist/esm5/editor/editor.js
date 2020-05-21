var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, AfterViewInit, Input, Output, EventEmitter, ContentChild, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, Header } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as Quill from "quill";
export var EDITOR_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Editor; }),
    multi: true
};
var Editor = /** @class */ (function () {
    function Editor(el) {
        this.el = el;
        this.onTextChange = new EventEmitter();
        this.onSelectionChange = new EventEmitter();
        this.onInit = new EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    Editor.prototype.ngAfterViewInit = function () {
        var _this = this;
        var editorElement = DomHandler.findSingle(this.el.nativeElement, 'div.ui-editor-content');
        var toolbarElement = DomHandler.findSingle(this.el.nativeElement, 'div.ui-editor-toolbar');
        var defaultModule = { toolbar: toolbarElement };
        var modules = this.modules ? __assign(__assign({}, defaultModule), this.modules) : defaultModule;
        this.quill = new Quill(editorElement, {
            modules: modules,
            placeholder: this.placeholder,
            readOnly: this.readonly,
            theme: 'snow',
            formats: this.formats,
            bounds: this.bounds,
            debug: this.debug,
            scrollingContainer: this.scrollingContainer
        });
        if (this.value) {
            this.quill.pasteHTML(this.value);
        }
        this.quill.on('text-change', function (delta, oldContents, source) {
            if (source === 'user') {
                var html = editorElement.children[0].innerHTML;
                var text = _this.quill.getText().trim();
                if (html === '<p><br></p>') {
                    html = null;
                }
                _this.onTextChange.emit({
                    htmlValue: html,
                    textValue: text,
                    delta: delta,
                    source: source
                });
                _this.onModelChange(html);
                _this.onModelTouched();
            }
        });
        this.quill.on('selection-change', function (range, oldRange, source) {
            _this.onSelectionChange.emit({
                range: range,
                oldRange: oldRange,
                source: source
            });
        });
        this.onInit.emit({
            editor: this.quill
        });
    };
    Editor.prototype.writeValue = function (value) {
        this.value = value;
        if (this.quill) {
            if (value)
                this.quill.pasteHTML(value);
            else
                this.quill.setText('');
        }
    };
    Editor.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Editor.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Editor.prototype.getQuill = function () {
        return this.quill;
    };
    Object.defineProperty(Editor.prototype, "readonly", {
        get: function () {
            return this._readonly;
        },
        set: function (val) {
            this._readonly = val;
            if (this.quill) {
                if (this._readonly)
                    this.quill.disable();
                else
                    this.quill.enable();
            }
        },
        enumerable: true,
        configurable: true
    });
    Editor.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Output()
    ], Editor.prototype, "onTextChange", void 0);
    __decorate([
        Output()
    ], Editor.prototype, "onSelectionChange", void 0);
    __decorate([
        ContentChild(Header)
    ], Editor.prototype, "toolbar", void 0);
    __decorate([
        Input()
    ], Editor.prototype, "style", void 0);
    __decorate([
        Input()
    ], Editor.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], Editor.prototype, "placeholder", void 0);
    __decorate([
        Input()
    ], Editor.prototype, "formats", void 0);
    __decorate([
        Input()
    ], Editor.prototype, "modules", void 0);
    __decorate([
        Input()
    ], Editor.prototype, "bounds", void 0);
    __decorate([
        Input()
    ], Editor.prototype, "scrollingContainer", void 0);
    __decorate([
        Input()
    ], Editor.prototype, "debug", void 0);
    __decorate([
        Output()
    ], Editor.prototype, "onInit", void 0);
    __decorate([
        Input()
    ], Editor.prototype, "readonly", null);
    Editor = __decorate([
        Component({
            selector: 'p-editor',
            template: "\n        <div [ngClass]=\"'ui-widget ui-editor-container ui-corner-all'\" [class]=\"styleClass\">\n            <div class=\"ui-editor-toolbar ui-widget-header ui-corner-top\" *ngIf=\"toolbar\">\n                <ng-content select=\"p-header\"></ng-content>\n            </div>\n            <div class=\"ui-editor-toolbar ui-widget-header ui-corner-top\" *ngIf=\"!toolbar\">\n                <span class=\"ql-formats\">\n                    <select class=\"ql-header\">\n                      <option value=\"1\">Heading</option>\n                      <option value=\"2\">Subheading</option>\n                      <option selected>Normal</option>\n                    </select>\n                    <select class=\"ql-font\">\n                      <option selected>Sans Serif</option>\n                      <option value=\"serif\">Serif</option>\n                      <option value=\"monospace\">Monospace</option>\n                    </select>\n                </span>\n                <span class=\"ql-formats\">\n                    <button class=\"ql-bold\" aria-label=\"Bold\"></button>\n                    <button class=\"ql-italic\" aria-label=\"Italic\"></button>\n                    <button class=\"ql-underline\" aria-label=\"Underline\"></button>\n                </span>\n                <span class=\"ql-formats\">\n                    <select class=\"ql-color\"></select>\n                    <select class=\"ql-background\"></select>\n                </span>\n                <span class=\"ql-formats\">\n                    <button class=\"ql-list\" value=\"ordered\" aria-label=\"Ordered List\"></button>\n                    <button class=\"ql-list\" value=\"bullet\" aria-label=\"Unordered List\"></button>\n                    <select class=\"ql-align\">\n                        <option selected></option>\n                        <option value=\"center\"></option>\n                        <option value=\"right\"></option>\n                        <option value=\"justify\"></option>\n                    </select>\n                </span>\n                <span class=\"ql-formats\">\n                    <button class=\"ql-link\" aria-label=\"Insert Link\"></button>\n                    <button class=\"ql-image\" aria-label=\"Insert Image\"></button>\n                    <button class=\"ql-code-block\" aria-label=\"Insert Code Block\"></button>\n                </span>\n                <span class=\"ql-formats\">\n                    <button class=\"ql-clean\" aria-label=\"Remove Styles\"></button>\n                </span>\n            </div>\n            <div class=\"ui-editor-content\" [ngStyle]=\"style\"></div>\n        </div>\n    ",
            providers: [EDITOR_VALUE_ACCESSOR],
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], Editor);
    return Editor;
}());
export { Editor };
var EditorModule = /** @class */ (function () {
    function EditorModule() {
    }
    EditorModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Editor, SharedModule],
            declarations: [Editor]
        })
    ], EditorModule);
    return EditorModule;
}());
export { EditorModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9lZGl0b3IvIiwic291cmNlcyI6WyJlZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsYUFBYSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDcEosT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxFQUFDLE1BQU0sYUFBYSxDQUFBO0FBQy9DLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTyxFQUFDLGlCQUFpQixFQUF1QixNQUFNLGdCQUFnQixDQUFDO0FBQ3ZFLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBRS9CLE1BQU0sQ0FBQyxJQUFNLHFCQUFxQixHQUFRO0lBQ3hDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsTUFBTSxFQUFOLENBQU0sQ0FBQztJQUNyQyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUF3REY7SUFvQ0ksZ0JBQW1CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBbEN2QixpQkFBWSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXJELHNCQUFpQixHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBb0IxRCxXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFNekQsa0JBQWEsR0FBYSxjQUFPLENBQUMsQ0FBQztRQUVuQyxtQkFBYyxHQUFhLGNBQU8sQ0FBQyxDQUFDO0lBSUEsQ0FBQztJQUVyQyxnQ0FBZSxHQUFmO1FBQUEsaUJBb0RDO1FBbkRHLElB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QUFRLEVBQUUsVUFBVTtZQUNwQixRQUFRLEVBQUUsd25GQWdEVDtZQUNELFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDO1lBQ2xDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxPQUFPO1NBQ25ELENBQUM7T0FDVyxNQUFNLENBaUlsQjtJQUFELGFBQUM7Q0FBQSxBQWpJRCxJQWlJQztTQWpJWSxNQUFNO0FBd0luQjtJQUFBO0lBQTRCLENBQUM7SUFBaEIsWUFBWTtRQUx4QixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdkIsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFDLFlBQVksQ0FBQztZQUM5QixZQUFZLEVBQUUsQ0FBQyxNQUFNLENBQUM7U0FDekIsQ0FBQztPQUNXLFlBQVksQ0FBSTtJQUFELG1CQUFDO0NBQUEsQUFBN0IsSUFBNkI7U0FBaEIsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LEVsZW1lbnRSZWYsQWZ0ZXJWaWV3SW5pdCxJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyLENvbnRlbnRDaGlsZCxmb3J3YXJkUmVmLENoYW5nZURldGVjdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7U2hhcmVkTW9kdWxlLEhlYWRlcn0gZnJvbSAncHJpbWVuZy9hcGknXHJcbmltcG9ydCB7RG9tSGFuZGxlcn0gZnJvbSAncHJpbWVuZy9kb20nO1xyXG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgKiBhcyBRdWlsbCBmcm9tIFwicXVpbGxcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBFRElUT1JfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcclxuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBFZGl0b3IpLFxyXG4gIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAncC1lZGl0b3InLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cIid1aS13aWRnZXQgdWktZWRpdG9yLWNvbnRhaW5lciB1aS1jb3JuZXItYWxsJ1wiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1lZGl0b3ItdG9vbGJhciB1aS13aWRnZXQtaGVhZGVyIHVpLWNvcm5lci10b3BcIiAqbmdJZj1cInRvb2xiYXJcIj5cclxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtaGVhZGVyXCI+PC9uZy1jb250ZW50PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWVkaXRvci10b29sYmFyIHVpLXdpZGdldC1oZWFkZXIgdWktY29ybmVyLXRvcFwiICpuZ0lmPVwiIXRvb2xiYXJcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicWwtZm9ybWF0c1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJxbC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIxXCI+SGVhZGluZzwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjJcIj5TdWJoZWFkaW5nPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHNlbGVjdGVkPk5vcm1hbDwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJxbC1mb250XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHNlbGVjdGVkPlNhbnMgU2VyaWY8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJzZXJpZlwiPlNlcmlmPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwibW9ub3NwYWNlXCI+TW9ub3NwYWNlPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInFsLWZvcm1hdHNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicWwtYm9sZFwiIGFyaWEtbGFiZWw9XCJCb2xkXCI+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInFsLWl0YWxpY1wiIGFyaWEtbGFiZWw9XCJJdGFsaWNcIj48L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicWwtdW5kZXJsaW5lXCIgYXJpYS1sYWJlbD1cIlVuZGVybGluZVwiPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJxbC1mb3JtYXRzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cInFsLWNvbG9yXCI+PC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cInFsLWJhY2tncm91bmRcIj48L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicWwtZm9ybWF0c1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJxbC1saXN0XCIgdmFsdWU9XCJvcmRlcmVkXCIgYXJpYS1sYWJlbD1cIk9yZGVyZWQgTGlzdFwiPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJxbC1saXN0XCIgdmFsdWU9XCJidWxsZXRcIiBhcmlhLWxhYmVsPVwiVW5vcmRlcmVkIExpc3RcIj48L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwicWwtYWxpZ25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBzZWxlY3RlZD48L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImNlbnRlclwiPjwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicmlnaHRcIj48L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImp1c3RpZnlcIj48L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicWwtZm9ybWF0c1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJxbC1saW5rXCIgYXJpYS1sYWJlbD1cIkluc2VydCBMaW5rXCI+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInFsLWltYWdlXCIgYXJpYS1sYWJlbD1cIkluc2VydCBJbWFnZVwiPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJxbC1jb2RlLWJsb2NrXCIgYXJpYS1sYWJlbD1cIkluc2VydCBDb2RlIEJsb2NrXCI+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInFsLWZvcm1hdHNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicWwtY2xlYW5cIiBhcmlhLWxhYmVsPVwiUmVtb3ZlIFN0eWxlc1wiPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWVkaXRvci1jb250ZW50XCIgW25nU3R5bGVdPVwic3R5bGVcIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGAsXHJcbiAgICBwcm92aWRlcnM6IFtFRElUT1JfVkFMVUVfQUNDRVNTT1JdLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBFZGl0b3IgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuICAgICAgICBcclxuICAgIEBPdXRwdXQoKSBvblRleHRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgXHJcbiAgICBAT3V0cHV0KCkgb25TZWxlY3Rpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgXHJcbiAgICBAQ29udGVudENoaWxkKEhlYWRlcikgdG9vbGJhcjtcclxuICAgIFxyXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcclxuICAgICAgICBcclxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcclxuICAgIFxyXG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcclxuICAgIFxyXG4gICAgQElucHV0KCkgZm9ybWF0czogc3RyaW5nW107XHJcblxyXG4gICAgQElucHV0KCkgbW9kdWxlczogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIGJvdW5kczogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIHNjcm9sbGluZ0NvbnRhaW5lcjogYW55O1xyXG5cclxuICAgIEBJbnB1dCgpIGRlYnVnOiBzdHJpbmc7XHJcbiAgICBcclxuICAgIEBPdXRwdXQoKSBvbkluaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgXHJcbiAgICB2YWx1ZTogc3RyaW5nO1xyXG4gICAgXHJcbiAgICBfcmVhZG9ubHk6IGJvb2xlYW47XHJcbiAgICBcclxuICAgIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XHJcbiAgICBcclxuICAgIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xyXG4gICAgXHJcbiAgICBxdWlsbDogYW55O1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYpIHt9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIGxldCBlZGl0b3JFbGVtZW50ID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuZWwubmF0aXZlRWxlbWVudCAsJ2Rpdi51aS1lZGl0b3ItY29udGVudCcpOyBcclxuICAgICAgICBsZXQgdG9vbGJhckVsZW1lbnQgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5lbC5uYXRpdmVFbGVtZW50ICwnZGl2LnVpLWVkaXRvci10b29sYmFyJyk7IFxyXG4gICAgICAgIGxldCBkZWZhdWx0TW9kdWxlICA9IHt0b29sYmFyOiB0b29sYmFyRWxlbWVudH07XHJcbiAgICAgICAgbGV0IG1vZHVsZXMgPSB0aGlzLm1vZHVsZXMgPyB7Li4uZGVmYXVsdE1vZHVsZSwgLi4udGhpcy5tb2R1bGVzfSA6IGRlZmF1bHRNb2R1bGU7XHJcblxyXG4gICAgICAgIHRoaXMucXVpbGwgPSBuZXcgUXVpbGwoZWRpdG9yRWxlbWVudCwge1xyXG4gICAgICAgICAgbW9kdWxlczogbW9kdWxlcyxcclxuICAgICAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnBsYWNlaG9sZGVyLFxyXG4gICAgICAgICAgcmVhZE9ubHk6IHRoaXMucmVhZG9ubHksXHJcbiAgICAgICAgICB0aGVtZTogJ3Nub3cnLFxyXG4gICAgICAgICAgZm9ybWF0czogdGhpcy5mb3JtYXRzLFxyXG4gICAgICAgICAgYm91bmRzOiB0aGlzLmJvdW5kcyxcclxuICAgICAgICAgIGRlYnVnOiB0aGlzLmRlYnVnLFxyXG4gICAgICAgICAgc2Nyb2xsaW5nQ29udGFpbmVyOiB0aGlzLnNjcm9sbGluZ0NvbnRhaW5lclxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMudmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5xdWlsbC5wYXN0ZUhUTUwodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucXVpbGwub24oJ3RleHQtY2hhbmdlJywgKGRlbHRhLCBvbGRDb250ZW50cywgc291cmNlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzb3VyY2UgPT09ICd1c2VyJykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGh0bWwgPSBlZGl0b3JFbGVtZW50LmNoaWxkcmVuWzBdLmlubmVySFRNTDtcclxuICAgICAgICAgICAgICAgIGxldCB0ZXh0ID0gdGhpcy5xdWlsbC5nZXRUZXh0KCkudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGh0bWwgPT09ICc8cD48YnI+PC9wPicpIHtcclxuICAgICAgICAgICAgICAgICAgICBodG1sID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uVGV4dENoYW5nZS5lbWl0KHtcclxuICAgICAgICAgICAgICAgICAgICBodG1sVmFsdWU6IGh0bWwsXHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dFZhbHVlOiB0ZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgIGRlbHRhOiBkZWx0YSxcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IHNvdXJjZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZShodG1sKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucXVpbGwub24oJ3NlbGVjdGlvbi1jaGFuZ2UnLCAocmFuZ2UsIG9sZFJhbmdlLCBzb3VyY2UpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vblNlbGVjdGlvbkNoYW5nZS5lbWl0KHtcclxuICAgICAgICAgICAgICAgIHJhbmdlOiByYW5nZSxcclxuICAgICAgICAgICAgICAgIG9sZFJhbmdlOiBvbGRSYW5nZSxcclxuICAgICAgICAgICAgICAgIHNvdXJjZTogc291cmNlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMub25Jbml0LmVtaXQoe1xyXG4gICAgICAgICAgICBlZGl0b3I6IHRoaXMucXVpbGxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgICAgICBcclxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkgOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5xdWlsbCkge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnF1aWxsLnBhc3RlSFRNTCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMucXVpbGwuc2V0VGV4dCgnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0UXVpbGwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucXVpbGw7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGdldCByZWFkb25seSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVhZG9ubHk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHJlYWRvbmx5KHZhbDpib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fcmVhZG9ubHkgPSB2YWw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMucXVpbGwpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3JlYWRvbmx5KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5xdWlsbC5kaXNhYmxlKCk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMucXVpbGwuZW5hYmxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgICBleHBvcnRzOiBbRWRpdG9yLFNoYXJlZE1vZHVsZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtFZGl0b3JdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBFZGl0b3JNb2R1bGUgeyB9XHJcbiJdfQ==