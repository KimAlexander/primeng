var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, Output, EventEmitter, forwardRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var TRISTATECHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return TriStateCheckbox; }),
    multi: true
};
var TriStateCheckbox = /** @class */ (function () {
    function TriStateCheckbox(cd) {
        this.cd = cd;
        this.onChange = new EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    TriStateCheckbox.prototype.onClick = function (event, input) {
        if (!this.disabled && !this.readonly) {
            this.toggle(event);
            this.focus = true;
            input.focus();
        }
    };
    TriStateCheckbox.prototype.onKeydown = function (event) {
        if (event.keyCode == 32) {
            event.preventDefault();
        }
    };
    TriStateCheckbox.prototype.onKeyup = function (event) {
        if (event.keyCode == 32 && !this.readonly) {
            this.toggle(event);
            event.preventDefault();
        }
    };
    TriStateCheckbox.prototype.toggle = function (event) {
        if (this.value == null || this.value == undefined)
            this.value = true;
        else if (this.value == true)
            this.value = false;
        else if (this.value == false)
            this.value = null;
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    };
    TriStateCheckbox.prototype.onFocus = function () {
        this.focus = true;
    };
    TriStateCheckbox.prototype.onBlur = function () {
        this.focus = false;
        this.onModelTouched();
    };
    TriStateCheckbox.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    TriStateCheckbox.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    TriStateCheckbox.prototype.writeValue = function (value) {
        this.value = value;
        this.cd.markForCheck();
    };
    TriStateCheckbox.prototype.setDisabledState = function (disabled) {
        this.disabled = disabled;
    };
    TriStateCheckbox.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], TriStateCheckbox.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], TriStateCheckbox.prototype, "name", void 0);
    __decorate([
        Input()
    ], TriStateCheckbox.prototype, "ariaLabelledBy", void 0);
    __decorate([
        Input()
    ], TriStateCheckbox.prototype, "tabindex", void 0);
    __decorate([
        Input()
    ], TriStateCheckbox.prototype, "inputId", void 0);
    __decorate([
        Input()
    ], TriStateCheckbox.prototype, "style", void 0);
    __decorate([
        Input()
    ], TriStateCheckbox.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], TriStateCheckbox.prototype, "label", void 0);
    __decorate([
        Input()
    ], TriStateCheckbox.prototype, "readonly", void 0);
    __decorate([
        Output()
    ], TriStateCheckbox.prototype, "onChange", void 0);
    TriStateCheckbox = __decorate([
        Component({
            selector: 'p-triStateCheckbox',
            template: "\n        <div [ngStyle]=\"style\" [ngClass]=\"{'ui-chkbox ui-tristatechkbox ui-widget': true,'ui-chkbox-readonly': readonly}\" [class]=\"styleClass\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #input type=\"text\" [attr.id]=\"inputId\" [name]=\"name\" [attr.tabindex]=\"tabindex\" [readonly]=\"readonly\" [disabled]=\"disabled\" (keyup)=\"onKeyup($event)\" (keydown)=\"onKeydown($event)\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" [attr.aria-labelledby]=\"ariaLabelledBy\">\n            </div>\n            <div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" (click)=\"onClick($event,input)\"  role=\"checkbox\" [attr.aria-checked]=\"value === true\"\n                [ngClass]=\"{'ui-state-active':value!=null,'ui-state-disabled':disabled,'ui-state-focus':focus}\">\n                <span class=\"ui-chkbox-icon pi ui-clickable\" [ngClass]=\"{'pi-check':value==true,'pi-times':value==false}\"></span>\n            </div>\n        </div>\n        <label class=\"ui-chkbox-label\" (click)=\"onClick($event,input)\"\n               [ngClass]=\"{'ui-label-active':value!=null, 'ui-label-disabled':disabled, 'ui-label-focus':focus}\"\n               *ngIf=\"label\" [attr.for]=\"inputId\">{{label}}</label>\n    ",
            providers: [TRISTATECHECKBOX_VALUE_ACCESSOR],
            changeDetection: ChangeDetectionStrategy.Default
        })
    ], TriStateCheckbox);
    return TriStateCheckbox;
}());
export { TriStateCheckbox };
var TriStateCheckboxModule = /** @class */ (function () {
    function TriStateCheckboxModule() {
    }
    TriStateCheckboxModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [TriStateCheckbox],
            declarations: [TriStateCheckbox]
        })
    ], TriStateCheckboxModule);
    return TriStateCheckboxModule;
}());
export { TriStateCheckboxModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpc3RhdGVjaGVja2JveC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvdHJpc3RhdGVjaGVja2JveC8iLCJzb3VyY2VzIjpbInRyaXN0YXRlY2hlY2tib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLGlCQUFpQixFQUFDLHVCQUF1QixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2hJLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsaUJBQWlCLEVBQXVCLE1BQU0sZ0JBQWdCLENBQUM7QUFFdkUsTUFBTSxDQUFDLElBQU0sK0JBQStCLEdBQVE7SUFDbEQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxnQkFBZ0IsRUFBaEIsQ0FBZ0IsQ0FBQztJQUMvQyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFxQkY7SUFFSSwwQkFBb0IsRUFBcUI7UUFBckIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFvQi9CLGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQU0zRCxrQkFBYSxHQUFhLGNBQU8sQ0FBQyxDQUFDO1FBRW5DLG1CQUFjLEdBQWEsY0FBTyxDQUFDLENBQUM7SUE1QlEsQ0FBQztJQThCN0Msa0NBQU8sR0FBUCxVQUFRLEtBQVksRUFBRSxLQUF1QjtRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNsQixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDakI7SUFDTCxDQUFDO0lBRUQsb0NBQVMsR0FBVCxVQUFVLEtBQW9CO1FBQzFCLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxFQUFFLEVBQUU7WUFDckIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztJQUVELGtDQUFPLEdBQVAsVUFBUSxLQUFvQjtRQUN4QixJQUFJLEtBQUssQ0FBQyxPQUFPLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUMxQjtJQUNMLENBQUM7SUFFRCxpQ0FBTSxHQUFOLFVBQU8sS0FBWTtRQUNmLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTO1lBQzdDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2FBQ2pCLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2FBQ2xCLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLO1lBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRXRCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ2YsYUFBYSxFQUFFLEtBQUs7WUFDcEIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1NBQ3BCLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxrQ0FBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVELGlDQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELDJDQUFnQixHQUFoQixVQUFpQixFQUFZO1FBQ3pCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCw0Q0FBaUIsR0FBakIsVUFBa0IsRUFBWTtRQUMxQixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQscUNBQVUsR0FBVixVQUFXLEtBQVU7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsMkNBQWdCLEdBQWhCLFVBQWlCLFFBQWlCO1FBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzdCLENBQUM7O2dCQTFGdUIsaUJBQWlCOztJQUVoQztRQUFSLEtBQUssRUFBRTtzREFBbUI7SUFFbEI7UUFBUixLQUFLLEVBQUU7a0RBQWM7SUFFYjtRQUFSLEtBQUssRUFBRTs0REFBd0I7SUFFdkI7UUFBUixLQUFLLEVBQUU7c0RBQWtCO0lBRWpCO1FBQVIsS0FBSyxFQUFFO3FEQUFpQjtJQUVoQjtRQUFSLEtBQUssRUFBRTttREFBWTtJQUVYO1FBQVIsS0FBSyxFQUFFO3dEQUFvQjtJQUVuQjtRQUFSLEtBQUssRUFBRTttREFBZTtJQUVkO1FBQVIsS0FBSyxFQUFFO3NEQUFtQjtJQUVqQjtRQUFULE1BQU0sRUFBRTtzREFBa0Q7SUF0QmxELGdCQUFnQjtRQW5CNUIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLG9CQUFvQjtZQUM5QixRQUFRLEVBQUUsb3ZDQWFUO1lBQ0QsU0FBUyxFQUFFLENBQUMsK0JBQStCLENBQUM7WUFDNUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE9BQU87U0FDbkQsQ0FBQztPQUNXLGdCQUFnQixDQTZGNUI7SUFBRCx1QkFBQztDQUFBLEFBN0ZELElBNkZDO1NBN0ZZLGdCQUFnQjtBQW9HN0I7SUFBQTtJQUFzQyxDQUFDO0lBQTFCLHNCQUFzQjtRQUxsQyxRQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdkIsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7WUFDM0IsWUFBWSxFQUFFLENBQUMsZ0JBQWdCLENBQUM7U0FDbkMsQ0FBQztPQUNXLHNCQUFzQixDQUFJO0lBQUQsNkJBQUM7Q0FBQSxBQUF2QyxJQUF1QztTQUExQixzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyLGZvcndhcmRSZWYsQ2hhbmdlRGV0ZWN0b3JSZWYsQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmV4cG9ydCBjb25zdCBUUklTVEFURUNIRUNLQk9YX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XHJcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gVHJpU3RhdGVDaGVja2JveCksXHJcbiAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdwLXRyaVN0YXRlQ2hlY2tib3gnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IFtuZ1N0eWxlXT1cInN0eWxlXCIgW25nQ2xhc3NdPVwieyd1aS1jaGtib3ggdWktdHJpc3RhdGVjaGtib3ggdWktd2lkZ2V0JzogdHJ1ZSwndWktY2hrYm94LXJlYWRvbmx5JzogcmVhZG9ubHl9XCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWhlbHBlci1oaWRkZW4tYWNjZXNzaWJsZVwiPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0ICNpbnB1dCB0eXBlPVwidGV4dFwiIFthdHRyLmlkXT1cImlucHV0SWRcIiBbbmFtZV09XCJuYW1lXCIgW2F0dHIudGFiaW5kZXhdPVwidGFiaW5kZXhcIiBbcmVhZG9ubHldPVwicmVhZG9ubHlcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiAoa2V5dXApPVwib25LZXl1cCgkZXZlbnQpXCIgKGtleWRvd24pPVwib25LZXlkb3duKCRldmVudClcIiAoZm9jdXMpPVwib25Gb2N1cygpXCIgKGJsdXIpPVwib25CbHVyKClcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkQnlcIj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1jaGtib3gtYm94IHVpLXdpZGdldCB1aS1jb3JuZXItYWxsIHVpLXN0YXRlLWRlZmF1bHRcIiAoY2xpY2spPVwib25DbGljaygkZXZlbnQsaW5wdXQpXCIgIHJvbGU9XCJjaGVja2JveFwiIFthdHRyLmFyaWEtY2hlY2tlZF09XCJ2YWx1ZSA9PT0gdHJ1ZVwiXHJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWFjdGl2ZSc6dmFsdWUhPW51bGwsJ3VpLXN0YXRlLWRpc2FibGVkJzpkaXNhYmxlZCwndWktc3RhdGUtZm9jdXMnOmZvY3VzfVwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1jaGtib3gtaWNvbiBwaSB1aS1jbGlja2FibGVcIiBbbmdDbGFzc109XCJ7J3BpLWNoZWNrJzp2YWx1ZT09dHJ1ZSwncGktdGltZXMnOnZhbHVlPT1mYWxzZX1cIj48L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxsYWJlbCBjbGFzcz1cInVpLWNoa2JveC1sYWJlbFwiIChjbGljayk9XCJvbkNsaWNrKCRldmVudCxpbnB1dClcIlxyXG4gICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLWxhYmVsLWFjdGl2ZSc6dmFsdWUhPW51bGwsICd1aS1sYWJlbC1kaXNhYmxlZCc6ZGlzYWJsZWQsICd1aS1sYWJlbC1mb2N1cyc6Zm9jdXN9XCJcclxuICAgICAgICAgICAgICAgKm5nSWY9XCJsYWJlbFwiIFthdHRyLmZvcl09XCJpbnB1dElkXCI+e3tsYWJlbH19PC9sYWJlbD5cclxuICAgIGAsXHJcbiAgICBwcm92aWRlcnM6IFtUUklTVEFURUNIRUNLQk9YX1ZBTFVFX0FDQ0VTU09SXSxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVHJpU3RhdGVDaGVja2JveCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yICB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XHJcblxyXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlcjtcclxuXHJcbiAgICBASW5wdXQoKSBpbnB1dElkOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcclxuXHJcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgbGFiZWw6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSByZWFkb25seTogYm9vbGVhbjtcclxuXHJcbiAgICBAT3V0cHV0KCkgb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIGZvY3VzOiBib29sZWFuO1xyXG5cclxuICAgIHZhbHVlOiBhbnk7XHJcblxyXG4gICAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcclxuXHJcbiAgICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcclxuXHJcbiAgICBvbkNsaWNrKGV2ZW50OiBFdmVudCwgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQgJiYgIXRoaXMucmVhZG9ubHkpIHtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGUoZXZlbnQpO1xyXG4gICAgICAgICAgICB0aGlzLmZvY3VzID0gdHJ1ZTtcclxuICAgICAgICAgICAgaW5wdXQuZm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT0gMzIpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25LZXl1cChldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09IDMyICYmICF0aGlzLnJlYWRvbmx5KSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlKGV2ZW50KTtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlKGV2ZW50OiBFdmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLnZhbHVlID09IG51bGwgfHwgdGhpcy52YWx1ZSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0cnVlO1xyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMudmFsdWUgPT0gdHJ1ZSlcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGZhbHNlO1xyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMudmFsdWUgPT0gZmFsc2UpXHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHtcclxuICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvbkZvY3VzKCkge1xyXG4gICAgICAgIHRoaXMuZm9jdXMgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQmx1cigpIHtcclxuICAgICAgICB0aGlzLmZvY3VzID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkgOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREaXNhYmxlZFN0YXRlKGRpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGRpc2FibGVkO1xyXG4gICAgfVxyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgICBleHBvcnRzOiBbVHJpU3RhdGVDaGVja2JveF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtUcmlTdGF0ZUNoZWNrYm94XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVHJpU3RhdGVDaGVja2JveE1vZHVsZSB7IH1cclxuIl19