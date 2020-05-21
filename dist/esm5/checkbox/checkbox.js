var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { NgModule, Component, Input, Output, EventEmitter, forwardRef, ChangeDetectorRef, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var CHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Checkbox; }),
    multi: true
};
var Checkbox = /** @class */ (function () {
    function Checkbox(cd) {
        this.cd = cd;
        this.checkboxIcon = 'pi pi-check';
        this.onChange = new EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.focused = false;
        this.checked = false;
    }
    Checkbox.prototype.onClick = function (event, checkbox, focus) {
        event.preventDefault();
        if (this.disabled || this.readonly) {
            return;
        }
        this.checked = !this.checked;
        this.updateModel(event);
        if (focus) {
            checkbox.focus();
        }
    };
    Checkbox.prototype.updateModel = function (event) {
        if (!this.binary) {
            if (this.checked)
                this.addValue();
            else
                this.removeValue();
            this.onModelChange(this.model);
            if (this.formControl) {
                this.formControl.setValue(this.model);
            }
        }
        else {
            this.onModelChange(this.checked);
        }
        this.onChange.emit({ checked: this.checked, originalEvent: event });
    };
    Checkbox.prototype.handleChange = function (event) {
        if (!this.readonly) {
            this.checked = event.target.checked;
            this.updateModel(event);
        }
    };
    Checkbox.prototype.isChecked = function () {
        if (this.binary)
            return this.model;
        else
            return this.model && this.model.indexOf(this.value) > -1;
    };
    Checkbox.prototype.removeValue = function () {
        var _this = this;
        this.model = this.model.filter(function (val) { return val !== _this.value; });
    };
    Checkbox.prototype.addValue = function () {
        if (this.model)
            this.model = __spread(this.model, [this.value]);
        else
            this.model = [this.value];
    };
    Checkbox.prototype.onFocus = function () {
        this.focused = true;
    };
    Checkbox.prototype.onBlur = function () {
        this.focused = false;
        this.onModelTouched();
    };
    Checkbox.prototype.focus = function () {
        this.inputViewChild.nativeElement.focus();
    };
    Checkbox.prototype.writeValue = function (model) {
        this.model = model;
        this.checked = this.isChecked();
        this.cd.markForCheck();
    };
    Checkbox.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Checkbox.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Checkbox.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    Checkbox.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], Checkbox.prototype, "value", void 0);
    __decorate([
        Input()
    ], Checkbox.prototype, "name", void 0);
    __decorate([
        Input()
    ], Checkbox.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], Checkbox.prototype, "binary", void 0);
    __decorate([
        Input()
    ], Checkbox.prototype, "label", void 0);
    __decorate([
        Input()
    ], Checkbox.prototype, "ariaLabelledBy", void 0);
    __decorate([
        Input()
    ], Checkbox.prototype, "tabindex", void 0);
    __decorate([
        Input()
    ], Checkbox.prototype, "inputId", void 0);
    __decorate([
        Input()
    ], Checkbox.prototype, "style", void 0);
    __decorate([
        Input()
    ], Checkbox.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], Checkbox.prototype, "labelStyleClass", void 0);
    __decorate([
        Input()
    ], Checkbox.prototype, "formControl", void 0);
    __decorate([
        Input()
    ], Checkbox.prototype, "checkboxIcon", void 0);
    __decorate([
        Input()
    ], Checkbox.prototype, "readonly", void 0);
    __decorate([
        Input()
    ], Checkbox.prototype, "required", void 0);
    __decorate([
        ViewChild('cb')
    ], Checkbox.prototype, "inputViewChild", void 0);
    __decorate([
        Output()
    ], Checkbox.prototype, "onChange", void 0);
    Checkbox = __decorate([
        Component({
            selector: 'p-checkbox',
            template: "\n        <div [ngStyle]=\"style\" [ngClass]=\"{'ui-chkbox ui-widget': true,'ui-chkbox-readonly': readonly}\" [class]=\"styleClass\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #cb type=\"checkbox\" [attr.id]=\"inputId\" [attr.name]=\"name\" [readonly]=\"readonly\" [value]=\"value\" [checked]=\"checked\" (focus)=\"onFocus()\" (blur)=\"onBlur()\"\n                [ngClass]=\"{'ui-state-focus':focused}\" (change)=\"handleChange($event)\" [disabled]=\"disabled\" [attr.tabindex]=\"tabindex\" [attr.aria-labelledby]=\"ariaLabelledBy\" [attr.required]=\"required\">\n            </div>\n            <div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" (click)=\"onClick($event,cb,true)\"\n                        [ngClass]=\"{'ui-state-active':checked,'ui-state-disabled':disabled,'ui-state-focus':focused}\" role=\"checkbox\" [attr.aria-checked]=\"checked\">\n                <span class=\"ui-chkbox-icon ui-clickable\" [ngClass]=\"checked ? checkboxIcon : null\"></span>\n            </div>\n        </div>\n        <label (click)=\"onClick($event,cb,true)\" [class]=\"labelStyleClass\"\n                [ngClass]=\"{'ui-chkbox-label': true, 'ui-label-active':checked, 'ui-label-disabled':disabled, 'ui-label-focus':focused}\"\n                *ngIf=\"label\" [attr.for]=\"inputId\">{{label}}</label>\n    ",
            providers: [CHECKBOX_VALUE_ACCESSOR],
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], Checkbox);
    return Checkbox;
}());
export { Checkbox };
var CheckboxModule = /** @class */ (function () {
    function CheckboxModule() {
    }
    CheckboxModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Checkbox],
            declarations: [Checkbox]
        })
    ], CheckboxModule);
    return CheckboxModule;
}());
export { CheckboxModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2NoZWNrYm94LyIsInNvdXJjZXMiOlsiY2hlY2tib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsaUJBQWlCLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNySixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGlCQUFpQixFQUFvQyxNQUFNLGdCQUFnQixDQUFDO0FBRXBGLE1BQU0sQ0FBQyxJQUFNLHVCQUF1QixHQUFRO0lBQzFDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsUUFBUSxFQUFSLENBQVEsQ0FBQztJQUN2QyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFzQkY7SUE4Q0ksa0JBQW9CLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBcEJoQyxpQkFBWSxHQUFXLGFBQWEsQ0FBQztRQVFwQyxhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFJM0Qsa0JBQWEsR0FBYSxjQUFPLENBQUMsQ0FBQztRQUVuQyxtQkFBYyxHQUFhLGNBQU8sQ0FBQyxDQUFDO1FBRXBDLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFFekIsWUFBTyxHQUFZLEtBQUssQ0FBQztJQUVtQixDQUFDO0lBRTdDLDBCQUFPLEdBQVAsVUFBUSxLQUFLLEVBQUMsUUFBUSxFQUFDLEtBQWE7UUFDaEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXZCLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hDLE9BQU87U0FD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QVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztZQUN2QixPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDbkIsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDO1NBQzNCLENBQUM7T0FDVyxjQUFjLENBQUk7SUFBRCxxQkFBQztDQUFBLEFBQS9CLElBQStCO1NBQWxCLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyLGZvcndhcmRSZWYsQ2hhbmdlRGV0ZWN0b3JSZWYsVmlld0NoaWxkLEVsZW1lbnRSZWYsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEZvcm1Db250cm9sfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5leHBvcnQgY29uc3QgQ0hFQ0tCT1hfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcclxuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBDaGVja2JveCksXHJcbiAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLWNoZWNrYm94JyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBbbmdTdHlsZV09XCJzdHlsZVwiIFtuZ0NsYXNzXT1cInsndWktY2hrYm94IHVpLXdpZGdldCc6IHRydWUsJ3VpLWNoa2JveC1yZWFkb25seSc6IHJlYWRvbmx5fVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1oZWxwZXItaGlkZGVuLWFjY2Vzc2libGVcIj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCAjY2IgdHlwZT1cImNoZWNrYm94XCIgW2F0dHIuaWRdPVwiaW5wdXRJZFwiIFthdHRyLm5hbWVdPVwibmFtZVwiIFtyZWFkb25seV09XCJyZWFkb25seVwiIFt2YWx1ZV09XCJ2YWx1ZVwiIFtjaGVja2VkXT1cImNoZWNrZWRcIiAoZm9jdXMpPVwib25Gb2N1cygpXCIgKGJsdXIpPVwib25CbHVyKClcIlxyXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1mb2N1cyc6Zm9jdXNlZH1cIiAoY2hhbmdlKT1cImhhbmRsZUNoYW5nZSgkZXZlbnQpXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgW2F0dHIudGFiaW5kZXhdPVwidGFiaW5kZXhcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkQnlcIiBbYXR0ci5yZXF1aXJlZF09XCJyZXF1aXJlZFwiPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWNoa2JveC1ib3ggdWktd2lkZ2V0IHVpLWNvcm5lci1hbGwgdWktc3RhdGUtZGVmYXVsdFwiIChjbGljayk9XCJvbkNsaWNrKCRldmVudCxjYix0cnVlKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtYWN0aXZlJzpjaGVja2VkLCd1aS1zdGF0ZS1kaXNhYmxlZCc6ZGlzYWJsZWQsJ3VpLXN0YXRlLWZvY3VzJzpmb2N1c2VkfVwiIHJvbGU9XCJjaGVja2JveFwiIFthdHRyLmFyaWEtY2hlY2tlZF09XCJjaGVja2VkXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWNoa2JveC1pY29uIHVpLWNsaWNrYWJsZVwiIFtuZ0NsYXNzXT1cImNoZWNrZWQgPyBjaGVja2JveEljb24gOiBudWxsXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8bGFiZWwgKGNsaWNrKT1cIm9uQ2xpY2soJGV2ZW50LGNiLHRydWUpXCIgW2NsYXNzXT1cImxhYmVsU3R5bGVDbGFzc1wiXHJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLWNoa2JveC1sYWJlbCc6IHRydWUsICd1aS1sYWJlbC1hY3RpdmUnOmNoZWNrZWQsICd1aS1sYWJlbC1kaXNhYmxlZCc6ZGlzYWJsZWQsICd1aS1sYWJlbC1mb2N1cyc6Zm9jdXNlZH1cIlxyXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJsYWJlbFwiIFthdHRyLmZvcl09XCJpbnB1dElkXCI+e3tsYWJlbH19PC9sYWJlbD5cclxuICAgIGAsXHJcbiAgICBwcm92aWRlcnM6IFtDSEVDS0JPWF9WQUxVRV9BQ0NFU1NPUl0sXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHRcclxufSlcclxuZXhwb3J0IGNsYXNzIENoZWNrYm94IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG5cclxuICAgIEBJbnB1dCgpIHZhbHVlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSBiaW5hcnk6IGJvb2xlYW47XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgYXJpYUxhYmVsbGVkQnk6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSB0YWJpbmRleDogbnVtYmVyO1xyXG5cclxuICAgIEBJbnB1dCgpIGlucHV0SWQ6IHN0cmluZztcclxuICAgIFxyXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgbGFiZWxTdHlsZUNsYXNzOiBzdHJpbmc7XHJcbiAgICBcclxuICAgIEBJbnB1dCgpIGZvcm1Db250cm9sOiBGb3JtQ29udHJvbDtcclxuICAgIFxyXG4gICAgQElucHV0KCkgY2hlY2tib3hJY29uOiBzdHJpbmcgPSAncGkgcGktY2hlY2snO1xyXG4gICAgXHJcbiAgICBASW5wdXQoKSByZWFkb25seTogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcclxuXHJcbiAgICBAVmlld0NoaWxkKCdjYicpIGlucHV0Vmlld0NoaWxkOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIEBPdXRwdXQoKSBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBcclxuICAgIG1vZGVsOiBhbnk7XHJcbiAgICBcclxuICAgIG9uTW9kZWxDaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XHJcbiAgICBcclxuICAgIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xyXG4gICAgICAgIFxyXG4gICAgZm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgXHJcbiAgICBjaGVja2VkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XHJcblxyXG4gICAgb25DbGljayhldmVudCxjaGVja2JveCxmb2N1czpib29sZWFuKSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLnJlYWRvbmx5KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jaGVja2VkID0gIXRoaXMuY2hlY2tlZDtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKGV2ZW50KTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoZm9jdXMpIHtcclxuICAgICAgICAgICAgY2hlY2tib3guZm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVwZGF0ZU1vZGVsKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmJpbmFyeSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jaGVja2VkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRWYWx1ZSgpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVZhbHVlKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5tb2RlbCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAodGhpcy5mb3JtQ29udHJvbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zZXRWYWx1ZSh0aGlzLm1vZGVsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMuY2hlY2tlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7Y2hlY2tlZDp0aGlzLmNoZWNrZWQsIG9yaWdpbmFsRXZlbnQ6IGV2ZW50fSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGhhbmRsZUNoYW5nZShldmVudCnCoHtcclxuICAgICAgICBpZiAoIXRoaXMucmVhZG9ubHkpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja2VkID0gZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpc0NoZWNrZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuYmluYXJ5KVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGVsICYmIHRoaXMubW9kZWwuaW5kZXhPZih0aGlzLnZhbHVlKSA+IC0xO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZVZhbHVlKCkge1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSB0aGlzLm1vZGVsLmZpbHRlcih2YWwgPT4gdmFsICE9PSB0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRWYWx1ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5tb2RlbClcclxuICAgICAgICAgICAgdGhpcy5tb2RlbCA9IFsuLi50aGlzLm1vZGVsLCB0aGlzLnZhbHVlXTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMubW9kZWwgPSBbdGhpcy52YWx1ZV07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG9uRm9jdXMoKSB7XHJcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBvbkJsdXIoKSB7XHJcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvY3VzKCkge1xyXG4gICAgICAgIHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgfVxyXG4gICAgIFxyXG4gICAgd3JpdGVWYWx1ZShtb2RlbDogYW55KSA6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB0aGlzLmNoZWNrZWQgPSB0aGlzLmlzQ2hlY2tlZCgpO1xyXG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzZXREaXNhYmxlZFN0YXRlKHZhbDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB2YWw7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICAgIGV4cG9ydHM6IFtDaGVja2JveF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtDaGVja2JveF1cclxufSlcclxuZXhwb3J0IGNsYXNzIENoZWNrYm94TW9kdWxlIHsgfVxyXG4iXX0=